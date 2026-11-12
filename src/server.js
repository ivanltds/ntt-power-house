// Servidor HTTP do V0 usando apenas módulos nativos do Node.
// Uso: node src/server.js  (porta padrão 3000; altere com PORT=8080)

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { RadarEngine, PRICE_LINE } from './search.js';
import { AuditLog } from './audit.js';
import { ConversationStore } from './conversations.js';
import { ingest, buildIndex } from './ingest.js';
import { matchesWhere } from './vectorstore.js';
import { loadEnv } from './env.js';
import { createAuth } from './auth.js';
import { createLLM } from './deepseek.js';
import { UploadService, MAX_UPLOAD_BYTES } from './uploads.js';
import { createProject, updateProject, suggestProject } from './projects.js';
import { documentForEdit, updateDocument } from './documents.js';
import { can, capabilities, PROIBIDO } from './permissions.js';
import { proposalExportOptions, exportProposal } from './export/index.js';
import { MODELOS, SECOES } from './export/modelo.js';
import { TIPOS_DOCUMENTAIS } from './analysis.js';
import { STATUS_PROPOSTA, CONFIDENCIALIDADES } from './db/repo.js';
import { SUPPORTED } from './extract/formats.js';
import { maskSensitive, maskFields, TERMO_VERSAO } from './sensitive.js';
import { ROOT, DB_PATH, STORE_PATH, AUDITORIA_DIR, CONVERSAS_PATH, CORPUS_DIR, DATA_DIR } from './config.js';
import { QualityStore, roteiroDe, AREAS, TIPOS, STATUS, RESULTADOS, MAX_IMAGENS, MAX_IMAGENS_TICKET, PRIORIDADES, lerImagens } from './qualidade.js';
import { criarHospedagem, hospedarTodas } from './imagens.js';
import { VERSAO } from './version.js';
import { criarAcessoRelatorio, montarRelatorio, RELATORIO_PATH, RELATORIO_INSIGHTS_PATH, usuarioRelatorio } from './relatorio.js';
import { resumoCampanha } from './campanha.js';
import { montarPainel, resumoExecutivo } from './painel.js';

loadEnv(path.join(ROOT, '.env'));

const PORT = Number(process.env.PORT ?? 3000);
const PUBLIC = path.join(ROOT, 'public');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png' };

// Primeira execução: cria o banco com a massa piloto e o índice vetorial.
if (!fs.existsSync(DB_PATH) || !fs.existsSync(STORE_PATH)) {
  const r = ingest();
  console.log(`Base preparada: ${r.projects} projetos, ${r.documents} documentos, ${r.chunks} trechos`);
}

const engine = new RadarEngine({ llm: createLLM() });
const audit = new AuditLog(AUDITORIA_DIR);
const conversations = new ConversationStore(CONVERSAS_PATH);
const auth = createAuth();
const relatorio = criarAcessoRelatorio();

// Reindexa a base vetorial a partir do banco e recarrega o motor (após upload confirmado ou cadastro).
function reindex() {
  const r = buildIndex(engine.repo, engine.storePath);
  engine.reload();
  return r;
}
const uploads = new UploadService(engine, { reindex });

// Filtros da exploração vêm na query string; listas separadas por vírgula.
function filtersFrom(url) {
  const p = url.searchParams;
  const list = (k) => (p.get(k) ? p.get(k).split(',').map((x) => x.trim()).filter(Boolean) : []);
  const num = (k) => (p.get(k) === null || p.get(k) === '' ? null : Number(p.get(k)));
  const entidadeTipo = p.get('entidadeTipo');
  return {
    q: p.get('q') ?? '', modoTexto: p.get('modoTexto') ?? 'todas', segmentos: list('segmentos'), status: list('status'), tecnologias: list('tecnologias'),
    modoTecnologias: p.get('modoTecnologias') ?? 'todas', servicos: list('servicos'), modoServicos: p.get('modoServicos') ?? 'todas',
    tiposDocumento: list('tiposDocumento'), cliente: p.get('cliente') ?? '', prazoMin: num('prazoMin'), prazoMax: num('prazoMax'),
    valorMin: num('valorMin'), valorMax: num('valorMax'), dataDe: p.get('dataDe') || null, dataAte: p.get('dataAte') || null,
    entidade: entidadeTipo ? { tipo: entidadeTipo, valor: p.get('entidadeValor') ?? '' } : null,
    meus: p.get('meus') === '1',
  };
}

// Política de dados (UC13): o usuário aceita o termo uma vez por versão; depois disso, envio, cadastro e sugestão
// seguem sem confirmação. Os dados sensíveis são mascarados no servidor (src/sensitive.js) antes de gravar ou de ir à IA.
const TERMOS_PATH = path.join(DATA_DIR, 'termos.json');
const termos = fs.existsSync(TERMOS_PATH) ? JSON.parse(fs.readFileSync(TERMOS_PATH, 'utf8')) : {};
const termoAceito = (user) => termos[user.id]?.versao === TERMO_VERSAO;
const TERMO_PENDENTE = [428, { erro: 'Antes de começar, leia as boas práticas de uso do Radar.', termo: true }];
function aceitarTermo(user) {
  termos[user.id] = { versao: TERMO_VERSAO, em: new Date().toISOString() };
  fs.writeFileSync(TERMOS_PATH, JSON.stringify(termos, null, 2));
  audit.logEvent({ tipo: 'aceite_termo', versao: TERMO_VERSAO, usuario: user.id });
}
// Registra só o tipo e a quantidade do que foi mascarado, nunca o valor.
function registrarMascaramento(contexto, user, achados) {
  if (achados?.length) audit.logEvent({ tipo: 'mascaramento', contexto, achados, usuario: user.id });
}
// Qualidade da versão: feedbacks com código de correção e roteiro regressivo (só texto em disco).
const qualidade = new QualityStore(path.join(DATA_DIR, 'qualidade.json'));

function painelPara(user, filtros = {}) {
  return montarPainel(engine.repo, user, { oportunidades: engine.opportunities, turnos: audit.read(audit.turnsFile), eventos: audit.read(audit.eventsFile), filtros });
}
// Imagens dos tickets vão para o ImgBB (IMGBB_API_KEY); sem a chave, não são guardadas.
const hospedagem = criarHospedagem();
const AMOSTRAS = path.join(ROOT, 'amostras');
const invalido = (fn) => { try { return fn(); } catch (err) { return [400, { erro: err.message }]; } };

const CAMPOS_TEXTO_PROJETO = ['titulo', 'descricao', 'objetivo', 'dono', 'area', 'link_sharepoint'];
const CAMPOS_TEXTO_DOCUMENTO = ['titulo', 'resumo', 'observacoes', 'autor', 'versao'];

function send(res, status, body, headers = {}) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', ...headers });
  res.end(JSON.stringify(body));
}

async function readJson(req, limit = 2_000_000) {
  // Junta os Buffers antes de decodificar para não quebrar caracteres UTF-8 entre pacotes.
  const parts = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > limit) throw new Error('Corpo da requisição muito grande');
    parts.push(chunk);
  }
  const raw = Buffer.concat(parts).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

// Formatos de texto: dá para ocultar valores antes de entregar o arquivo.
const TEXT_FORMATS = new Set(['md', 'txt', 'csv', 'vtt', 'srt', 'json', 'html']);
const DOWNLOAD_MIME = { md: 'text/markdown; charset=utf-8', txt: 'text/plain; charset=utf-8', csv: 'text/csv; charset=utf-8', json: 'application/json; charset=utf-8', html: 'text/plain; charset=utf-8', pdf: 'application/pdf',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' };

// Baixa o arquivo original de um documento, respeitando confidencialidade e visibilidade de valores do perfil.
function download(res, url) {
  const user = engine.user(url.searchParams.get('userId'));
  const doc = engine.repo.get('SELECT id, titulo, arquivo, formato, origem, valor, margem, confidencialidade FROM documento WHERE id = $id', { $id: url.searchParams.get('id') ?? '' });
  if (!doc || !user.confidencialidades.includes(doc.confidencialidade)) return send(res, 404, { erro: 'Documento não encontrado ou sem permissão.' });
  // Uploads ficam em DATA_DIR/uploads; a massa piloto, em data/corpus.
  const base = doc.arquivo.startsWith('uploads/') ? DATA_DIR : CORPUS_DIR;
  const file = path.resolve(base, doc.arquivo);
  if (!file.startsWith(base + path.sep) || !fs.existsSync(file)) return send(res, 404, { erro: 'Arquivo original não está disponível no servidor.' });
  const formato = (doc.formato || path.extname(file).slice(1)).toLowerCase();
  const nome = path.basename(file).replace(/^[0-9a-f-]{36}-/, '');
  let corpo = fs.readFileSync(file);
  // Original em formato de texto sai mascarado como o resto da base. Binários seguem como foram enviados (questão 2.5 do adendo 5).
  if (TEXT_FORMATS.has(formato)) corpo = Buffer.from(maskSensitive(corpo.toString('utf8')).texto);
  if (!user.verValores) {
    if (TEXT_FORMATS.has(formato)) {
      corpo = Buffer.from(corpo.toString('utf8').replace(PRICE_LINE, '[valor oculto para o seu perfil]').replace(/^(valor|margem):.*$/gm, '$1: [oculto]'));
    } else if (doc.valor != null || doc.margem != null) {
      return send(res, 403, { erro: 'Este arquivo contém valores comerciais que o seu perfil não pode ver. Peça o original ao gestor do projeto.' });
    }
  }
  audit.logEvent({ tipo: 'baixar_documento', doc_id: doc.id, usuario: user.id });
  res.writeHead(200, {
    'Content-Type': DOWNLOAD_MIME[formato] ?? 'application/octet-stream',
    'Content-Length': corpo.length,
    'Content-Disposition': `attachment; filename="${nome.replace(/[^\w.-]/g, '_')}"; filename*=UTF-8''${encodeURIComponent(nome)}`,
    'X-Content-Type-Options': 'nosniff',
  });
  res.end(corpo);
}

// UC10: gera a apresentação ou o resumo executivo e entrega o arquivo; nada fica guardado no servidor.
async function exportFile(req, res) {
  const { id, userId, ...pedido } = await readJson(req, 50_000);
  const user = engine.user(userId);
  const r = exportProposal(engine, id, user, pedido);
  if (r.naoEncontrado) return send(res, 404, { erro: 'Projeto não encontrado ou sem permissão.' });
  if (r.erro) return send(res, 400, { erro: r.erro });
  engine.repo.logActivity({ acao: 'exportar', entidade: 'projeto', entidade_id: id, campo: `${MODELOS[pedido.modelo].nome} · ${pedido.formato.toUpperCase()}`, depois: r.secoes.map((k) => SECOES[k]).join(', '), usuario_id: user.id });
  audit.logEvent({ tipo: 'exportar', projeto_id: id, modelo: pedido.modelo, formato: pedido.formato, usuario: user.id });
  const ascii = r.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w .-]/g, '_');
  res.writeHead(200, {
    'Content-Type': r.mime,
    'Content-Length': r.buffer.length,
    'Content-Disposition': `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(r.nome)}`,
    'X-Content-Type-Options': 'nosniff',
  });
  res.end(r.buffer);
}

function allowedDocs(user) {
  return [...engine.docs.values()].filter((d) => matchesWhere(d.meta, { confidencialidade: { $in: user.confidencialidades } }));
}

const routes = {
  'GET /api/contexto': (req, url) => {
    const user = engine.user(url.searchParams.get('userId'));
    const docs = [...engine.docs.values()];
    return {
      usuarios: engine.users.map((u) => ({ ...u, pode: capabilities(u) })),
      oportunidades: engine.opportunities,
      base: {
        projetos: new Set(docs.map((d) => d.meta.projeto_id)).size,
        documentos: docs.length,
        trechos: engine.collection.count(),
        embedder: engine.embedder.name,
        llm: engine.llm.name,
        llmProvedor: engine.llm.provider,
        ingeridoEm: engine.collection.metadata.ingested_at,
        banco: 'SQLite (node:sqlite) + FTS5',
      },
      catalogo: {
        ...engine.repo.taxonomy(),
        status: STATUS_PROPOSTA,
        confidencialidades: CONFIDENCIALIDADES,
        tiposDocumentais: TIPOS_DOCUMENTAIS,
        clientes: engine.repo.clients(user).map((c) => c.nome),
        formatosUpload: SUPPORTED,
        maxUploadMb: MAX_UPLOAD_BYTES / 1024 / 1024,
      },
    };
  },

  // A conversa dá a memória da busca: os turnos anteriores entram como contexto (UC03.3 / UC03.14).
  'POST /api/buscar': async (req) => {
    const { query: bruta, userId, opportunityId, conversaId } = await readJson(req);
    if (!bruta?.trim()) return [400, { erro: 'Informe uma pergunta.' }];
    const user = engine.user(userId);
    // A pergunta também vai à IA externa: dados sensíveis saem antes (UC13.2).
    const { texto: query, achados } = maskSensitive(bruta);
    registrarMascaramento('pergunta', user, achados);
    const conversa = conversations.open(conversaId, { userId: user.id, opportunityId });
    const result = await engine.search(query, { userId: user.id, opportunityId, history: conversations.history(conversa) });
    const turnoId = audit.logTurn({ sessionId: conversa.id, result });
    conversations.addTurn(conversa, { turnoId, pergunta: query, resultado: result });
    // Toda conversa com pergunta fica salva: o usuário só decide se é favorita.
    if (!conversa.salva) conversations.save(conversa.id, user.id);
    return { ...result, turnoId, conversa: { id: conversa.id, titulo: conversa.titulo, salva: conversa.salva, favorita: conversa.favorita, turnos: conversa.turnos.length } };
  },

  // UC05 / UC06 — conversas salvas e favoritas.
  'GET /api/conversas': (req, url) =>
    conversations.list(engine.user(url.searchParams.get('userId')).id, {
      soFavoritas: url.searchParams.get('favoritas') === '1',
      busca: url.searchParams.get('busca') ?? '',
    }),

  'GET /api/conversa': (req, url) => {
    const c = conversations.get(url.searchParams.get('id'), engine.user(url.searchParams.get('userId')).id);
    return c ? c : [404, { erro: 'Conversa não encontrada.' }];
  },

  'POST /api/conversa/salvar': async (req) => {
    const { id, userId, titulo } = await readJson(req);
    const c = conversations.save(id, engine.user(userId).id, titulo);
    return c ? { id: c.id, titulo: c.titulo, salva: c.salva, favorita: c.favorita } : [404, { erro: 'Conversa não encontrada ou ainda sem perguntas.' }];
  },

  'POST /api/conversa/favoritar': async (req) => {
    const { id, userId, favorita } = await readJson(req);
    const c = conversations.favorite(id, engine.user(userId).id, favorita);
    return c ? { id: c.id, titulo: c.titulo, salva: c.salva, favorita: c.favorita } : [404, { erro: 'Conversa não encontrada ou ainda sem perguntas.' }];
  },

  'POST /api/conversa/grupo': async (req) => {
    const { id, userId, grupo } = await readJson(req);
    const c = conversations.group(id, engine.user(userId).id, grupo);
    return c ? { id: c.id, grupo: c.grupo } : [404, { erro: 'Conversa não encontrada ou ainda sem perguntas.' }];
  },

  'POST /api/conversa/arquivar': async (req) => {
    const { id, userId, arquivada } = await readJson(req);
    const c = conversations.archive(id, engine.user(userId).id, arquivada);
    return c ? { id: c.id, arquivada: c.arquivada } : [404, { erro: 'Conversa não encontrada ou ainda sem perguntas.' }];
  },

  'POST /api/conversa/desfazer-ultima': async (req) => {
    const { id, userId } = await readJson(req);
    const pergunta = conversations.dropLastTurn(id, engine.user(userId).id);
    return pergunta != null ? { pergunta } : [404, { erro: 'Conversa não encontrada ou sem perguntas.' }];
  },

  'POST /api/conversa/excluir': async (req) => {
    const { id, userId } = await readJson(req);
    return conversations.remove(id, engine.user(userId).id) ? { ok: true } : [404, { erro: 'Conversa não encontrada.' }];
  },

  'POST /api/evento': async (req) => {
    const { tipo, turnoId, projeto_id, doc_id, util, motivo, acao, userId, campanha, navegador } = await readJson(req);
    if (!['feedback', 'feedback_motivo', 'abrir_detalhe', 'abrir_fonte', 'reaproveitar', 'campanha'].includes(tipo)) return [400, { erro: 'Tipo de evento inválido.' }];
    audit.logEvent({ tipo, turnoId, projeto_id, doc_id, util, motivo: motivo ? String(motivo).slice(0, 60) : undefined, acao: acao ? String(acao).slice(0, 30) : undefined, campanha: campanha ? String(campanha).slice(0, 40) : undefined, navegador: navegador ? String(navegador).slice(0, 40) : undefined, usuario: userId });
    return { ok: true };
  },

  // Chamada temporária de alcance (public/campanha.js): navegadores que viram, clicaram, fecharam e tickets enviados.
  'GET /api/campanha': (req, url) => resumoCampanha(audit.read(audit.eventsFile), url.searchParams.get('id')),

  'GET /api/metricas': () => audit.metrics(),

  'GET /api/documentos': (req, url) => {
    const user = engine.user(url.searchParams.get('userId'));
    return allowedDocs(user).map(({ meta }) => ({
      id: meta.id,
      projeto_id: meta.projeto_id,
      cliente: meta.cliente,
      titulo: meta.titulo,
      documento: meta.documento_titulo,
      origem: meta.origem,
      tipo: meta.tipo_documental,
      confianca: meta.nivel_confianca,
      segmento: meta.segmento,
      tecnologias: meta.tecnologias,
      status: meta.status_proposta,
      arquivo: meta.arquivo,
    }));
  },

  'GET /api/documento': (req, url) => {
    const user = engine.user(url.searchParams.get('userId'));
    const doc = allowedDocs(user).find((d) => d.meta.id === url.searchParams.get('id'));
    if (!doc) return [404, { erro: 'Documento não encontrado ou sem permissão.' }];
    const body = user.verValores ? doc.body : doc.body.replace(PRICE_LINE, '[valor oculto para o seu perfil]');
    return { meta: { id: doc.meta.id, arquivo: doc.meta.arquivo, tipo: doc.meta.tipo_documental, cliente: doc.meta.cliente, titulo: doc.meta.documento_titulo, link: doc.meta.link_sharepoint }, conteudo: body };
  },

  // ---------- UC13: termo de uso (uma vez por usuário e por versão) ----------
  // ---------- Qualidade: feedbacks, tickets e roteiro de testes ----------
  // ?versao=V0.0.1 mostra o roteiro e os resultados de uma versão anterior (arquivada, só leitura).
  'GET /api/qualidade': (req, url) => {
    const pedida = url.searchParams.get('versao');
    const v = pedida && qualidade.versoes(VERSAO).some((x) => x.versao === pedida) ? pedida : VERSAO;
    return {
    versao: VERSAO,
    versaoVista: v,
    arquivada: v !== VERSAO,
    versoes: qualidade.versoes(VERSAO),
    roteiro: roteiroDe(v),
    rotulos: { areas: AREAS, tipos: TIPOS, status: STATUS, resultados: RESULTADOS, prioridades: PRIORIDADES },
    maxImagens: MAX_IMAGENS,
    maxImagensTicket: MAX_IMAGENS_TICKET,
    hospedagemImagens: hospedagem?.nome ?? null,
    analiseImagens: typeof engine.llm.describeFeedback === 'function',
    tickets: qualidade.tickets(),
    execucao: qualidade.execucao(v),
    resumo: qualidade.resumo(v),
    };
  },

  'POST /api/feedback': async (req) => {
    const b = await readJson(req, 8_000_000);
    if (!String(b.nome ?? '').trim()) return [400, { erro: 'Informe o seu nome.' }];
    if (String(b.texto ?? '').trim().length < 10) return [400, { erro: 'Descreva o que aconteceu (pelo menos uma frase).' }];
    const imagens = invalido(() => lerImagens(b.imagens));
    if (!Array.isArray(imagens) || typeof imagens[0] === 'number') return imagens;
    // As imagens vão para a IA descrever o problema e, com hospedagem configurada, para o ImgBB (em paralelo).
    // O servidor não grava imagem: o ticket guarda a descrição e os links.
    let analise = null;
    let aviso = null;
    let avisoHospedagem = null;
    const analisar = async () => {
      if (typeof engine.llm.describeFeedback !== 'function') { aviso = 'Imagens não analisadas: a IA está desligada neste ambiente.'; return; }
      try {
        analise = await engine.llm.describeFeedback({ texto: maskSensitive(b.texto).texto, area: AREAS[b.area] ?? 'Outro', imagens });
      } catch (err) {
        aviso = `Não foi possível analisar as imagens agora (${err.name === 'TimeoutError' ? 'tempo esgotado' : err.message}). O texto foi registrado.`;
      }
    };
    const hospedar = async () => {
      if (!hospedagem) return [];
      try { return await hospedarTodas(hospedagem, imagens, 'novo'); } catch (err) { avisoHospedagem = `As imagens não foram guardadas (${err.message}). Anexe de novo editando o ticket.`; return []; }
    };
    const [, anexos] = imagens.length ? await Promise.all([analisar(), hospedar()]) : [null, []];
    const descricaoImagens = analise ? [...analise.imagens, analise.problema && `Problema identificado pela IA: ${analise.problema}`].filter(Boolean) : aviso ? [aviso] : [];
    const ticket = qualidade.abrir({ nome: b.nome, texto: b.texto, area: b.area, tipo: b.tipo, titulo: analise?.titulo, descricaoImagens, versao: VERSAO, imagens: anexos });
    audit.logEvent({ tipo: 'feedback_aberto', codigo: ticket.codigo, area: ticket.area, imagens: imagens.length, hospedadas: anexos.length });
    return { ticket, aviso: [aviso, avisoHospedagem].filter(Boolean).join(' ') || null };
  },

  'POST /api/feedback/atualizar': async (req) => {
    const b = await readJson(req);
    return invalido(() => qualidade.atualizar(b.codigo, { status: b.status || undefined, texto: b.texto, autor: b.autor, versao: VERSAO }) ?? [404, { erro: 'Ticket não encontrado.' }]);
  },

  // Edição pela triagem (menu Versão → Tickets: lista e kanban): campos, prioridade, situação, retorno e imagens numa só chamada.
  'POST /api/tickets/editar': async (req) => {
    const b = await readJson(req, 8_000_000);
    const t = qualidade.ticket(b.codigo);
    if (!t) return [404, { erro: 'Ticket não encontrado.' }];
    if (!String(b.autor ?? '').trim()) return [400, { erro: 'Informe o seu nome.' }];
    const novas = invalido(() => lerImagens(b.imagens));
    if (!Array.isArray(novas) || typeof novas[0] === 'number') return novas;
    const remover = Array.isArray(b.remover) ? b.remover.map(String) : [];
    if (novas.length && !hospedagem) return [400, { erro: 'O envio de imagens está desligado neste ambiente (falta IMGBB_API_KEY).' }];
    if ((t.imagens ?? []).filter((i) => !remover.includes(i.url)).length + novas.length > MAX_IMAGENS_TICKET) return [400, { erro: `No máximo ${MAX_IMAGENS_TICKET} imagens por ticket.` }];
    let imagensNovas = [];
    if (novas.length) {
      try { imagensNovas = await hospedarTodas(hospedagem, novas, t.codigo); } catch (err) { return [502, { erro: `Não foi possível guardar a imagem (${err.message}). Nada foi alterado.` }]; }
    }
    const campos = Object.fromEntries(['status', 'prioridade', 'titulo', 'texto', 'area', 'tipo', 'proposta'].filter((k) => b[k] !== undefined).map((k) => [k, b[k]]));
    const r = invalido(() => qualidade.editar(t.codigo, { ...campos, autor: b.autor, nota: b.nota, versao: VERSAO, imagensNovas, remover }));
    if (Array.isArray(r)) return r;
    audit.logEvent({ tipo: 'ticket_editado', codigo: t.codigo, campos: r.historico.at(-1).alteracoes?.map((a) => a.campo) ?? [], status: r.status });
    return { ticket: r };
  },

  'POST /api/tickets/excluir': async (req) => {
    const b = await readJson(req, 20_000);
    const r = invalido(() => qualidade.excluir(String(b.codigo ?? ''), { autor: b.autor, motivo: b.motivo, versao: VERSAO }) ?? [404, { erro: 'Ticket não encontrado.' }]);
    if (!Array.isArray(r)) audit.logEvent({ tipo: 'ticket_apagado', codigo: r.codigo });
    return r;
  },

  'POST /api/testes/resultado': async (req) => {
    const b = await readJson(req, 8_000_000);
    // Evidências (capturas) de Falhou/Bloqueado vão para o ImgBB e ficam anexadas ao ticket do cenário.
    const imgs = b.resultado === 'ok' ? [] : invalido(() => lerImagens(b.imagens));
    if (!Array.isArray(imgs) || typeof imgs[0] === 'number') return imgs;
    if (imgs.length && !hospedagem) return [400, { erro: 'O envio de imagens está desligado neste ambiente (falta IMGBB_API_KEY).' }];
    if (b.resultado !== 'ok' && !String(b.comentario ?? '').trim()) return [400, { erro: 'Conte o que aconteceu de diferente do esperado.' }];
    let imagens = [];
    if (imgs.length) {
      try { imagens = await hospedarTodas(hospedagem, imgs, String(b.cenario ?? 'roteiro')); } catch (err) { return [502, { erro: `Não foi possível guardar a imagem (${err.message}). O resultado não foi salvo; tente de novo.` }]; }
    }
    const r = invalido(() => qualidade.registrar({ versao: VERSAO, cenario: b.cenario, analista: b.analista, resultado: b.resultado, comentario: b.comentario, imagens }));
    if (Array.isArray(r)) return r;
    return { resultado: r, resumo: qualidade.resumo(VERSAO) };
  },

  'GET /api/termo': (req, url) => ({ versao: TERMO_VERSAO, aceito: termoAceito(engine.user(url.searchParams.get('userId'))) }),

  'POST /api/termo/aceitar': async (req) => {
    const { userId, versao } = await readJson(req, 10_000);
    if (versao !== TERMO_VERSAO) return [409, { erro: 'O termo foi atualizado. Recarregue a página.' }];
    aceitarTermo(engine.user(userId));
    return { versao: TERMO_VERSAO, aceito: true };
  },

  // ---------- UC02: upload, processamento e revisão ----------
  'POST /api/upload': async (req) => {
    const { nome, conteudoBase64, userId, projetoId } = await readJson(req, Math.ceil(MAX_UPLOAD_BYTES * 1.4) + 10_000);
    if (!termoAceito(engine.user(userId))) return TERMO_PENDENTE;
    const r = uploads.submit({ nome, buffer: Buffer.from(conteudoBase64 ?? '', 'base64'), user: engine.user(userId), projetoId: projetoId || null });
    return r.erro ? [400, r] : r;
  },

  'GET /api/uploads': (req, url) => engine.repo.jobs(engine.user(url.searchParams.get('userId')).id),

  'GET /api/upload': (req, url) => {
    const job = engine.repo.job(url.searchParams.get('id'));
    return job && job.enviado_por === engine.user(url.searchParams.get('userId')).id ? job : [404, { erro: 'Processamento não encontrado.' }];
  },

  'POST /api/upload/confirmar': async (req) => {
    const { id, userId, ...payload } = await readJson(req);
    // O revisor pode digitar texto novo: passa pelo mesmo mascaramento antes de gravar.
    const md = maskFields(payload.metadados, CAMPOS_TEXTO_DOCUMENTO);
    const ex = maskFields(payload.extras, ['autor', 'versao', 'observacoes']);
    const pj = maskFields(payload.projeto?.dados, CAMPOS_TEXTO_PROJETO);
    registrarMascaramento('revisao', engine.user(userId), [...md.achados, ...ex.achados, ...pj.achados]);
    const corpo = { ...payload, metadados: md.dados ?? payload.metadados, extras: ex.dados ?? payload.extras };
    if (payload.projeto) corpo.projeto = { ...payload.projeto, dados: pj.dados };
    return uploads.confirm(id, engine.user(userId), corpo);
  },

  'POST /api/upload/rejeitar': async (req) => {
    const { id, userId } = await readJson(req);
    return uploads.reject(id, engine.user(userId));
  },

  // ---------- UC07: cadastro e edição de projetos ----------
  'POST /api/projetos': async (req) => {
    const { userId, dados, forcar } = await readJson(req);
    const user = engine.user(userId);
    if (!termoAceito(user)) return TERMO_PENDENTE;
    const m = maskFields(dados ?? {}, CAMPOS_TEXTO_PROJETO);
    const r = createProject(engine, m.dados, user, { forcar });
    if (r.projeto) registrarMascaramento('cadastro', user, m.achados);
    if (r.erros) return [r.proibido ? 403 : 400, { erro: r.erros.join(' '), erros: r.erros }];
    if (r.duplicatas) return [409, { erro: r.aviso, duplicatas: r.duplicatas }];
    reindex();
    return { ...r, mascaramento: m.achados };
  },

  // UC07.4: editar as informações de um documento já indexado.
  'GET /api/documento/editar': (req, url) => documentForEdit(engine, url.searchParams.get('id'), engine.user(url.searchParams.get('userId')))
    ?? [404, { erro: 'Documento não encontrado ou sem permissão.' }],

  // Seletor de foco do chat: busca entre todos os projetos visíveis; com id, devolve só aquele.
  'GET /api/foco': (req, url) => {
    const user = engine.user(url.searchParams.get('userId'));
    const id = url.searchParams.get('id');
    if (id) return engine.focus(id, user) ?? [404, { erro: 'Projeto não encontrado ou sem permissão.' }];
    return engine.repo.focusOptions(user, url.searchParams.get('q') ?? '');
  },

  // UC10: seções disponíveis para exportar um projeto com o modelo escolhido.
  'GET /api/projeto/exportar/opcoes': (req, url) => {
    const p = url.searchParams;
    const r = proposalExportOptions(engine, p.get('id'), engine.user(p.get('userId')), p.get('modelo'));
    if (r.naoEncontrado) return [404, { erro: 'Projeto não encontrado ou sem permissão.' }];
    return r.erro ? [400, r] : r;
  },

  // UC11: registro de atividades, somente leitura e só para o gestor.
  'GET /api/atividades': (req, url) => {
    if (!can(engine.user(url.searchParams.get('userId')), 'verAtividades')) return [403, { erro: PROIBIDO.verAtividades }];
    const p = url.searchParams;
    const filtros = Object.fromEntries(['acao', 'entidade', 'usuario', 'de', 'ate', 'q'].map((k) => [k, p.get(k) ?? '']));
    return engine.repo.activities(filtros, { pagina: p.get('pagina') ?? 1, tamanho: p.get('tamanho') ?? 50 });
  },

  'POST /api/documento/atualizar': async (req) => {
    const { id, userId, dados } = await readJson(req);
    const m = maskFields(dados ?? {}, CAMPOS_TEXTO_DOCUMENTO);
    registrarMascaramento('editar_documento', engine.user(userId), m.achados);
    const r = updateDocument(engine, id, m.dados, engine.user(userId));
    if (r.naoEncontrado) return [404, { erro: 'Documento não encontrado ou sem permissão.' }];
    if (r.erros) return [400, { erro: r.erros.join(' '), erros: r.erros }];
    if (r.alteracoes) reindex();
    return r;
  },

  'POST /api/projeto/atualizar': async (req) => {
    const { id, userId, dados } = await readJson(req);
    const m = maskFields(dados ?? {}, CAMPOS_TEXTO_PROJETO);
    registrarMascaramento('editar_projeto', engine.user(userId), m.achados);
    const r = updateProject(engine, id, m.dados, engine.user(userId));
    if (r.naoEncontrado) return [404, { erro: 'Projeto não encontrado.' }];
    if (r.erros) return [400, { erro: r.erros.join(' '), erros: r.erros }];
    if (r.alteracoes) reindex();
    return r;
  },

  'POST /api/projetos/sugerir': async (req) => {
    const { userId, texto } = await readJson(req);
    if (!texto?.trim()) return [400, { erro: 'Descreva o projeto para receber sugestões.' }];
    const user = engine.user(userId);
    if (!termoAceito(user)) return TERMO_PENDENTE;
    // A descrição é mascarada antes de chegar à IA externa (UC13.2).
    const m = maskSensitive(texto);
    registrarMascaramento('sugestao', user, m.achados);
    return { ...(await suggestProject(engine, m.texto, user)), mascaramento: m.achados };
  },

  'GET /api/projeto': (req, url) => {
    const d = engine.repo.projectDetail(url.searchParams.get('id'), engine.user(url.searchParams.get('userId')));
    return d ?? [404, { erro: 'Projeto não encontrado ou sem permissão.' }];
  },

  // ---------- UC08 / UC09: exploração com filtros combinados e insights ----------
  'GET /api/projetos': (req, url) => engine.repo.searchProjects(filtersFrom(url), engine.user(url.searchParams.get('userId')), {
    ordenar: url.searchParams.get('ordenar') ?? 'relevancia',
    pagina: url.searchParams.get('pagina') ?? 1,
    tamanho: url.searchParams.get('tamanho') ?? 20,
  }),

  'GET /api/insights': (req, url) => engine.repo.insights(engine.user(url.searchParams.get('userId'))),

  // Insights por lente (discovery r3): Negócio, Técnica, Pipeline, Pré-venda e Curadoria.
  'GET /api/painel': (req, url) => painelPara(engine.user(url.searchParams.get('userId')), {
    segmento: url.searchParams.get('segmento') || null,
    area: url.searchParams.get('area') || null,
    desde: url.searchParams.get('desde') || null,
  }),

  'POST /api/projeto/teste': async (req) => {
    const b = await readJson(req, 10_000);
    const user = engine.user(b.userId);
    if (!can(user, 'marcarTeste')) return [403, { erro: PROIBIDO.marcarTeste }];
    const r = engine.repo.marcarTeste(String(b.id ?? ''), Boolean(b.teste), user);
    if (!r) return [404, { erro: 'Projeto não encontrado.' }];
    audit.logEvent({ tipo: 'projeto_teste', projeto_id: r.id, teste: r.teste, usuario: user.id });
    return r;
  },
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const handler = routes[`${req.method} ${url.pathname}`];
  try {
    if (req.method === 'POST' && url.pathname === '/api/login') {
      const { usuario, senha } = await readJson(req, 10_000);
      const cookie = auth.login(usuario, senha);
      // Atraso fixo em caso de erro para dificultar tentativas em série.
      if (!cookie) return setTimeout(() => send(res, 401, { erro: 'Usuário ou senha incorretos' }), 800);
      return send(res, 200, { ok: true }, { 'Set-Cookie': cookie });
    }
    // Leitura para agentes de relatório: chave própria, independente do login da tela.
    if (url.pathname === RELATORIO_PATH || url.pathname === RELATORIO_INSIGHTS_PATH) {
      if (!relatorio.ativo) return send(res, 404, { erro: 'Rota não encontrada' });
      if (req.method !== 'GET') return send(res, 405, { erro: 'Use GET.' });
      if (!relatorio.autorizado(req, url)) return setTimeout(() => send(res, 401, { erro: 'Chave de relatório ausente ou inválida.' }, { 'WWW-Authenticate': 'Bearer' }), 500);
      const insights = url.pathname === RELATORIO_INSIGHTS_PATH;
      audit.logEvent({ tipo: 'relatorio_lido', rota: insights ? 'insights' : 'qualidade' });
      const corpo = insights ? { formato: 1, versao: VERSAO, ...resumoExecutivo(painelPara(usuarioRelatorio())) } : montarRelatorio(qualidade, VERSAO);
      return send(res, 200, corpo, { 'Cache-Control': 'no-store' });
    }
    if (req.method === 'POST' && url.pathname === '/api/logout') return send(res, 200, { ok: true }, { 'Set-Cookie': auth.logout() });
    if (!auth.isPublic(url.pathname) && !auth.allowed(req)) {
      if (url.pathname.startsWith('/api/')) return send(res, 401, { erro: 'Sessão expirada. Entre novamente.' });
      const volta = { '/status': 'status', '/insights-novo': 'insights-novo', '/insigths-novo': 'insights-novo' }[url.pathname];
      res.writeHead(302, { Location: volta ? `/login?volta=${volta}` : '/login' });
      return res.end();
    }
    if (url.pathname === '/login') url.pathname = '/login.html';
    if (url.pathname === '/status') url.pathname = '/status.html';
    // Insights (novo) fica fora das abas: só por este endereço, enquanto é avaliado (abre a mesma página, direto nele).
    if (url.pathname === '/insights-novo' || url.pathname === '/insigths-novo') url.pathname = '/index.html';
    if (url.pathname === '/api/sessao') return send(res, 200, { login: auth.enabled });
    if (req.method === 'GET' && url.pathname === '/api/documento/baixar') return download(res, url);
    if (req.method === 'POST' && url.pathname === '/api/projeto/exportar') return exportFile(req, res);
    if (handler) {
      const out = await handler(req, url);
      // Handlers devolvem o corpo (200) ou [status, corpo].
      return Array.isArray(out) && typeof out[0] === 'number' ? send(res, out[0], out[1]) : send(res, 200, out);
    }
    if (req.method !== 'GET') return send(res, 404, { erro: 'Rota não encontrada' });
    // Arquivos de exemplo (fictícios) usados no roteiro de testes.
    if (url.pathname.startsWith('/amostras/')) {
      const nome = path.basename(decodeURIComponent(url.pathname));
      const f = path.join(AMOSTRAS, nome);
      if (!fs.existsSync(f)) return send(res, 404, { erro: 'Arquivo de exemplo não encontrado' });
      res.writeHead(200, { 'Content-Type': 'application/octet-stream', 'Content-Disposition': `attachment; filename="${nome}"` });
      return fs.createReadStream(f).pipe(res);
    }
    const file = path.join(PUBLIC, url.pathname === '/' ? 'index.html' : path.normalize(url.pathname));
    if (!file.startsWith(PUBLIC) || !fs.existsSync(file)) return send(res, 404, { erro: 'Não encontrado' });
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  } catch (err) {
    send(res, 500, { erro: err.message });
  }
});

// HOST=127.0.0.1 mantém o app acessível só pelo proxy reverso (padrão: todas as interfaces).
server.listen(PORT, process.env.HOST, () => {
  console.log(`Radar V0 em http://localhost:${PORT}`);
  console.log(`Login: ${auth.enabled ? 'ativo' : 'desligado (defina RADAR_LOGIN_USER e RADAR_LOGIN_PASS para exigir)'}`);
  console.log(`IA: ${engine.llm.provider === 'deepseek' ? `DeepSeek (${engine.llm.name})` : 'mock offline (defina DEEPSEEK_API_KEY no .env para usar a DeepSeek)'}`);
});
