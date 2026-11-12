// Upload e processamento de documentos (UC02): cada arquivo vira um processamento com etapas
// registradas no banco, termina em "aguardando revisão" e só entra na base depois da confirmação humana.

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { extractText } from './extract/formats.js';
import { analyzeText, mergeAI } from './analysis.js';
import { entityRows, trechoRows } from './ingest.js';
import { trustLevel, TRUST_LABEL } from './corpus.js';
import { stricterConf } from './db/repo.js';
import { createProject, similarProjects, refreshFicha } from './projects.js';
import { normalize } from './text.js';
import { UPLOADS_DIR } from './config.js';
import { can } from './permissions.js';
import { maskSensitive, resumoAchados } from './sensitive.js';

export const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;
const NEAR_DUPLICATE = 0.9;
const cosine = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
const now = () => new Date().toISOString();

// Campos escalares revisáveis do documento (comparados com a sugestão para registrar correções, RNF08).
const DOC_FIELDS = ['tipo_documental', 'titulo', 'status_documento', 'confidencialidade', 'data_conteudo', 'prazo_meses', 'valor', 'margem', 'resumo', 'idioma'];

export class UploadService {
  constructor(engine, { reindex }) {
    this.engine = engine;
    this.repo = engine.repo;
    this.reindex = reindex;
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  // Recebe o arquivo, registra o processamento e dispara a análise em segundo plano.
  submit({ nome, buffer, user, projetoId = null }) {
    if (!nome || !buffer?.length) return { erro: 'Arquivo vazio.' };
    if (buffer.length > MAX_UPLOAD_BYTES) return { erro: `Arquivo maior que ${MAX_UPLOAD_BYTES / 1024 / 1024} MB.` };
    if (projetoId) {
      const p = this.repo.project(projetoId);
      if (!p || !user.confidencialidades.includes(p.confidencialidade)) return { erro: 'Projeto de destino não encontrado.' };
    }
    const id = crypto.randomUUID();
    const safe = path.basename(nome).replace(/[^\w.\-À-ú ]+/g, '_');
    const caminho = path.join(UPLOADS_DIR, `${id}-${safe}`);
    fs.writeFileSync(caminho, buffer);
    this.repo.insertJob({
      id, nome_arquivo: safe, formato: path.extname(safe).slice(1).toLowerCase(), tamanho_bytes: buffer.length,
      hash_sha256: crypto.createHash('sha256').update(buffer).digest('hex'), caminho_arquivo: caminho, projeto_alvo_id: projetoId, enviado_por: user.id,
    });
    this.process(id, buffer, user).catch((err) => this.repo.updateJob(id, { status: 'erro', erro: err.message, concluido_em: now() }));
    return { id };
  }

  async process(id, buffer, user) {
    const job = this.repo.job(id);
    const etapas = [];
    const alertas = [];
    const step = async (nome, fn) => {
      const e = { nome, status: 'executando', inicio: now() };
      etapas.push(e);
      this.repo.updateJob(id, { status: 'processando', etapas_json: JSON.stringify(etapas) });
      const t0 = performance.now();
      try {
        const out = await fn();
        Object.assign(e, { status: out?.status ?? 'ok', detalhe: out?.detalhe ?? null, ms: Math.round(performance.now() - t0) });
        return out;
      } catch (err) {
        Object.assign(e, { status: 'erro', detalhe: err.message, ms: Math.round(performance.now() - t0) });
        throw err;
      } finally {
        this.repo.updateJob(id, { etapas_json: JSON.stringify(etapas) });
      }
    };

    // 1. Recebimento: integridade, formato e duplicidade exata (mesmo hash).
    await step('Recebimento e verificação', () => {
      const dup = this.repo.documentByHash(job.hash_sha256);
      if (dup) {
        // Só identifica o documento existente se o usuário puder vê-lo.
        const visivel = user.confidencialidades.includes(this.engine.docs.get(dup.id)?.meta.confidencialidade);
        alertas.push({ nivel: 'erro', codigo: 'duplicado', mensagem: visivel ? `Arquivo idêntico já está na base: ${dup.titulo} (${dup.id}).` : 'Arquivo idêntico já está na base.', documento: visivel ? dup.id : null });
      }
      return { detalhe: `${(job.tamanho_bytes / 1024).toFixed(1)} KB · SHA-256 ${job.hash_sha256.slice(0, 12)}…${dup ? ' · duplicado' : ''}` };
    });

    // 2. Extração de texto conforme o formato real do arquivo.
    const extracao = await step('Extração de texto', () => {
      const r = extractText({ buffer, filename: job.nome_arquivo });
      // UC13.2: dados sensíveis saem do texto antes de gravar, indexar ou enviar à IA. O envio nunca é bloqueado.
      const m = maskSensitive(r.texto);
      r.texto = m.texto;
      r.mascaramento = m.achados;
      for (const a of r.avisos) alertas.push({ nivel: 'aviso', codigo: 'extracao', mensagem: a });
      const partes = [r.arquivo.paginas && `${r.arquivo.paginas} página(s)`, r.arquivo.slides && `${r.arquivo.slides} slide(s)`, r.arquivo.planilhas && `${r.arquivo.planilhas} planilha(s)`,
        r.arquivo.falas && `${r.arquivo.falas} falas`, r.arquivo.linhas && `${r.arquivo.linhas} linhas`].filter(Boolean);
      this.repo.updateJob(id, { texto_extraido: r.texto });
      return { ...r, detalhe: `${r.formato.toUpperCase()} · ${r.texto.length.toLocaleString('pt-BR')} caracteres${partes.length ? ` · ${partes.join(' · ')}` : ''}` };
    });
    if (!extracao.texto.trim()) throw new Error('Nenhum texto pôde ser extraído do arquivo.');
    const nota = resumoAchados(extracao.mascaramento);
    if (nota) alertas.push({ nivel: 'info', codigo: 'mascaramento', mensagem: `${nota.charAt(0).toUpperCase()}${nota.slice(1)} antes de processar. Eles não ficam nos metadados nem na busca.` });

    // 3. Regras, vocabulário controlado e estatística de texto.
    const clients = this.repo.clients();
    let s = await step('Classificação e metadados por regras', () => {
      const r = analyzeText({ texto: extracao.texto, filename: job.nome_arquivo, extracao, clients, df: this.engine.df, docCount: this.engine.docs.size });
      return { ...r, detalhe: `tipo ${r.tipo_documental.valor} · ${r.tecnologias.length} tecnologias · ${r.servicos.length} serviços · ${r.entidades.pessoas.length} pessoas` };
    });
    if (s.pii.length) alertas.push({ nivel: 'aviso', codigo: 'pii', mensagem: `Dados pessoais detectados (${[...new Set(s.pii.map((p) => p.tipo))].join(', ')}). Avalie a confidencialidade antes de indexar.` });
    if (s.cliente.multiplos) alertas.push({ nivel: 'aviso', codigo: 'varios_clientes', mensagem: `O documento cita vários clientes (${s.cliente.multiplos.join(', ')}). Confirme o cliente e o projeto de destino.` });
    for (const t of s.tecnologias.filter((x) => x.novaNaTaxonomia)) alertas.push({ nivel: 'info', codigo: 'taxonomia', mensagem: `"${t.valor}" não está na taxonomia; se confirmado, entra como termo pendente de curadoria.` });

    // 4. IA: extração semântica complementar, validada contra o texto.
    const ia = await step('Análise com IA', async () => {
      if (this.engine.llm.provider !== 'deepseek') return { status: 'ignorada', detalhe: 'Dados extraídos pelas regras do Radar.' };
      const ai = await this.engine.llm.extractMetadata({ texto: extracao.texto, filename: job.nome_arquivo });
      if (ai?.ia?.fallback) return { status: 'aviso', detalhe: ai.ia.erro, ia: ai.ia };
      s = mergeAI(s, ai, extracao.texto);
      return { detalhe: `metadados complementados pela IA${s.descartesIA?.length ? ` · ${s.descartesIA.length} sugestão(ões) descartada(s) por não aparecerem no texto` : ''}`, ia: ai.ia };
    });
    for (const d of s.descartesIA ?? []) alertas.push({ nivel: 'info', codigo: 'ia_descartada', mensagem: `IA: ${d}.` });

    // 5. Vínculo com projeto existente ou proposta de projeto novo.
    const vinculo = await step('Vínculo com projeto', () => {
      const v = this.linkSuggestions(s, extracao.texto, user, job.projeto_alvo_id);
      return { ...v, detalhe: job.projeto_alvo_id ? `destino escolhido: ${job.projeto_alvo_id}` : v.sugestoes[0] ? `mais provável: ${v.sugestoes[0].projeto_id} (${Math.round(v.sugestoes[0].score * 100)}%)` : 'nenhum projeto parecido: sugerido projeto novo' };
    });

    // 6. Duplicidade aproximada e conflitos com o que a base já sabe.
    await step('Duplicidade e conflitos', () => {
      const v = this.engine.embedder.embedOne(`${s.cliente.valor ?? ''}. ${s.titulo.valor ?? ''}.\n${extracao.texto.slice(0, 6000)}`);
      const near = [...this.engine.docVectors.entries()]
        .map(([docId, d]) => ({ docId, sim: cosine(v, d.vector) }))
        .filter((x) => x.sim >= NEAR_DUPLICATE && this.engine.docs.has(x.docId))
        .filter((x) => user.confidencialidades.includes(this.engine.docs.get(x.docId).meta.confidencialidade))
        .sort((a, b) => b.sim - a.sim);
      for (const n of near.slice(0, 2)) alertas.push({ nivel: 'aviso', codigo: 'quase_duplicado', mensagem: `Conteúdo ${Math.round(n.sim * 100)}% parecido com ${n.docId}. Pode ser outra versão do mesmo documento.`, documento: n.docId });
      const alvo = job.projeto_alvo_id ?? (vinculo.sugestoes[0]?.score >= 0.6 ? vinculo.sugestoes[0].projeto_id : null);
      const conflitos = alvo ? this.conflicts(alvo, s, user) : [];
      for (const c of conflitos) alertas.push({ nivel: 'aviso', codigo: 'conflito', mensagem: c });
      return { detalhe: `${near.length} documento(s) muito parecido(s) · ${conflitos.length} conflito(s) com ${alvo ?? 'nenhum projeto'}` };
    });

    // 7. Qualidade e confidencialidade final da sugestão.
    await step('Qualidade dos metadados', () => {
      const projeto = job.projeto_alvo_id ? this.repo.project(job.projeto_alvo_id) : null;
      if (projeto && stricterConf(projeto.confidencialidade, s.confidencialidade.valor) !== s.confidencialidade.valor) {
        s.confidencialidade = { ...s.confidencialidade, valor: projeto.confidencialidade, motivos: [...(s.confidencialidade.motivos ?? []), `o projeto ${projeto.id} é ${projeto.confidencialidade}`] };
      }
      if (s.qualidade.faltando.length) alertas.push({ nivel: 'info', codigo: 'qualidade', mensagem: `Metadados a completar na revisão: ${s.qualidade.faltando.join(', ')}.` });
      return { detalhe: `completude ${s.qualidade.percentual}%` };
    });

    const sugestao = {
      campos: s,
      vinculo,
      alertas,
      arquivo: { ...extracao.arquivo, formato: extracao.formato },
      mascaramento: extracao.mascaramento,
      ia: ia?.ia ?? { provedor: this.engine.llm.provider, fallback: false },
      nivelConfianca: { valor: trustLevel(s.tipo_documental.valor, s.status_documento.valor), rotulo: TRUST_LABEL[trustLevel(s.tipo_documental.valor, s.status_documento.valor)] },
      previa: extracao.texto.slice(0, 4000),
    };
    if (!user.verValores) {
      sugestao.campos = { ...s, valor: { ...s.valor, valor: null, oculto: true }, margem: { ...s.margem, valor: null, oculto: true }, entidades: { ...s.entidades, valores: [] } };
    }
    this.repo.updateJob(id, { status: 'aguardando_revisao', sugestao_json: JSON.stringify(sugestao), concluido_em: now() });
  }

  // Pontua projetos visíveis: cliente igual, conteúdo parecido e título parecido.
  linkSuggestions(s, texto, user, alvoId) {
    // Cliente incerto (baixa confiança ou vários clientes citados) não pesa no vínculo.
    const clientKey = s.cliente.valor && s.cliente.confianca >= 0.5 ? normalize(s.cliente.valor) : null;
    const sims = similarProjects(this.engine, texto, user, 20);
    const sugestoes = sims.map((p) => {
      const motivos = [];
      let score = p.similaridade * 0.6;
      if (clientKey && normalize(p.cliente) === clientKey) { score += 0.45; motivos.push('mesmo cliente'); }
      const words = new Set(normalize(s.titulo.valor ?? '').split(' ').filter((w) => w.length > 4));
      const common = normalize(p.titulo).split(' ').filter((w) => words.has(w));
      if (common.length >= 2) { score += 0.1; motivos.push(`título parecido (${common.slice(0, 3).join(', ')})`); }
      motivos.push(`conteúdo ${Math.round(p.similaridade * 100)}% semelhante`);
      return { ...p, score: Math.min(1, Math.round(score * 1000) / 1000), motivos };
    }).sort((a, b) => b.score - a.score).slice(0, 3);
    return {
      recomendacao: alvoId || sugestoes[0]?.score >= 0.6 ? 'existente' : 'novo',
      projetoAlvo: alvoId ?? null,
      sugestoes,
      projetoNovo: {
        cliente: s.cliente.valor, titulo: s.titulo.valor, segmento: s.segmento.valor, status_proposta: s.status_proposta.valor,
        confidencialidade: s.confidencialidade.valor, tecnologias: s.tecnologias.map((t) => t.valor), servicos: s.servicos.map((t) => t.valor),
        prazo_meses: s.prazo_meses.valor, valor: user.verValores ? s.valor.valor : null, descricao: s.resumo.valor, objetivo: s.objetivo.valor,
        data_referencia: s.data_conteudo.valor,
      },
    };
  }

  // Divergências entre o documento enviado e o que a base já registra para o projeto (hierarquia de confiança).
  conflicts(projetoId, s, user) {
    const p = this.repo.project(projetoId);
    if (!p) return [];
    const nivel = trustLevel(s.tipo_documental.valor, s.status_documento.valor);
    const out = [];
    const check = (campo, label, novo, atual, fmt = (x) => x) => {
      if (novo == null || atual == null || Number(novo) === Number(atual)) return;
      const prevalece = nivel >= 4 ? 'o novo documento tende a prevalecer' : `o valor atual prevalece (o novo documento tem confiança ${nivel}: ${TRUST_LABEL[nivel]})`;
      out.push(`${label} diverge do projeto ${projetoId}: documento indica ${fmt(novo)}, base registra ${fmt(atual)} — ${prevalece}.`);
    };
    // Prazo sem pista no texto (ex.: "resultados após 12 meses") não gera conflito.
    if (s.prazo_meses.confianca >= 0.6) check('prazo_meses', 'Prazo', s.prazo_meses.valor, p.prazo_meses, (x) => `${x} meses`);
    if (user.verValores) check('valor', 'Valor', s.valor.valor, p.valor, (x) => Number(x).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    if (s.cliente.valor && normalize(s.cliente.valor) !== normalize(p.cliente)) out.push(`Cliente do documento (${s.cliente.valor}) é diferente do cliente do projeto ${projetoId} (${p.cliente}).`);
    return out;
  }

  // Revisão humana: confirma (com correções) e indexa, ou rejeita.
  async confirm(id, user, { metadados = {}, projeto = {}, tecnologias, servicos, atualizarProjeto = false, atualizarCampos = [], extras = {} }) {
    const job = this.repo.job(id);
    if (!job || job.enviado_por !== user.id) return [404, { erro: 'Processamento não encontrado.' }];
    if (job.status !== 'aguardando_revisao') return [409, { erro: `Processamento está "${job.status}" e não pode ser confirmado.` }];
    const s = job.sugestao.campos;
    // Documento que se declara confidencial só pode ser revisado por quem enxerga esse nível.
    if (s.confidencialidade.valor === 'confidencial' && !user.confidencialidades.includes('confidencial')) {
      return [403, { erro: 'O documento foi classificado como confidencial. Peça a um gestor com acesso a conteúdo confidencial para revisá-lo.' }];
    }
    // Não revela qual documento é idêntico se ele não for visível para o usuário.
    const dup = this.repo.documentByHash(job.hash_sha256);
    if (dup) return [409, { erro: 'Arquivo idêntico já está indexado na base.' }];
    const texto = this.repo.jobText(id);

    // Projeto de destino: existente (visível ao usuário) ou novo, criado com os dados revisados.
    let projetoId = projeto.id;
    if (projeto.modo === 'novo') {
      const r = createProject(this.engine, projeto.dados ?? {}, user, { forcar: projeto.forcar, origem: 'upload' });
      if (r.erros) return [400, { erro: r.erros.join(' ') }];
      if (r.duplicatas) return [409, { erro: r.aviso, duplicatas: r.duplicatas }];
      projetoId = r.projeto.id;
      this.logProjectCorrections(id, job.sugestao.vinculo.projetoNovo, projeto.dados ?? {}, user);
    }
    const alvo = projetoId && this.repo.project(projetoId);
    if (!alvo || !user.confidencialidades.includes(alvo.confidencialidade)) return [400, { erro: 'Escolha um projeto de destino válido.' }];

    const final = Object.fromEntries(DOC_FIELDS.map((k) => [k, k in metadados ? metadados[k] : s[k]?.valor ?? null]));
    if (!user.verValores) { final.valor = null; final.margem = null; }
    final.confidencialidade = stricterConf(final.confidencialidade ?? 'interna', alvo.confidencialidade);
    if (!user.confidencialidades.includes(final.confidencialidade)) return [400, { erro: 'Seu perfil não pode indexar documentos com essa confidencialidade.' }];
    for (const k of ['prazo_meses', 'valor', 'margem']) final[k] = final[k] === '' || final[k] == null ? null : Number(final[k]);
    const palavras = metadados.palavras_chave ?? s.palavras_chave;
    const info = extraInfo(extras);
    if (info.erro) return [400, { erro: info.erro }];
    const entidades = mergeEntities(s.entidades, extras.entidades);

    const docId = this.repo.tx(() => {
      for (const k of DOC_FIELDS) {
        const sugerido = s[k]?.valor ?? null;
        if (k in metadados && String(metadados[k] ?? '') !== String(sugerido ?? '') && !(s[k]?.oculto)) {
          this.repo.logCorrection({ processamento_id: id, campo: k, valor_sugerido: sugerido == null ? null : String(sugerido), valor_final: metadados[k] == null ? null : String(metadados[k]), metodo_sugestao: s[k]?.metodo, usuario_id: user.id });
        }
      }
      for (const [k, list] of [['tecnologias', tecnologias], ['servicos', servicos]]) {
        if (!list) continue;
        const sug = s[k].map((x) => x.valor).sort().join(', ');
        if ([...list].sort().join(', ') !== sug) this.repo.logCorrection({ processamento_id: id, campo: k, valor_sugerido: sug, valor_final: [...list].sort().join(', '), metodo_sugestao: 'lexico/ia', usuario_id: user.id });
      }
      const docId = this.repo.nextDocumentId(projetoId);
      for (const tipo of Object.keys(ENTITY_LISTS)) {
        const antes = (s.entidades[tipo] ?? []).map(entityLabel).sort().join('; ');
        const depois = entidades[tipo].map(entityLabel).sort().join('; ');
        if (antes !== depois) this.repo.logCorrection({ processamento_id: id, campo: `entidades.${tipo}`, valor_sugerido: antes || null, valor_final: depois || null, metodo_sugestao: 'regras/ia', usuario_id: user.id });
      }
      const rows = entityRows({ ...s, palavras_chave: palavras, entidades: user.verValores ? entidades : { ...entidades, valores: [] } });
      this.repo.insertDocument({
        id: docId, projeto_id: projetoId, titulo: final.titulo || job.nome_arquivo, tipo_documental: final.tipo_documental, status_documento: final.status_documento,
        nivel_confianca: trustLevel(final.tipo_documental, final.status_documento), confidencialidade: final.confidencialidade,
        arquivo: `uploads/${path.basename(job.caminho_arquivo)}`, formato: job.sugestao.arquivo.formato, tamanho_bytes: job.tamanho_bytes, hash_sha256: job.hash_sha256,
        idioma: final.idioma, data_conteudo: final.data_conteudo, prazo_meses: final.prazo_meses, valor: final.valor, margem: final.margem, resumo: final.resumo,
        palavras_chave: palavras, qualidade_metadados: s.qualidade.percentual / 100, contem_pii: s.pii.length > 0, texto, origem: 'upload',
        enviado_por: user.id, criado_em: job.criado_em, revisado_por: user.id, revisado_em: now(),
        ...info.campos,
      }, { entidades: rows, trechos: trechoRows(texto) });
      this.repo.logActivity({ acao: 'criar', entidade: 'documento', entidade_id: docId, campo: 'titulo', depois: final.titulo || job.nome_arquivo, usuario_id: user.id });
      // Opcional: acrescenta ao projeto as tecnologias e serviços confirmados no documento.
      // Termos novos de quem não é gestor ficam só como sugestão no registro (UC07.6).
      if (!can(user, 'criarTermo')) {
        for (const [table, list] of [['tecnologia', tecnologias], ['servico', servicos]]) {
          for (const t of (list ?? []).filter((x) => !this.repo.termExists(table, x))) {
            this.repo.logActivity({ acao: 'sugerir', entidade: table, entidade_id: docId, campo: 'nome', depois: t, usuario_id: user.id });
          }
        }
        tecnologias = tecnologias?.filter((t) => this.repo.termExists('tecnologia', t));
        servicos = servicos?.filter((t) => this.repo.termExists('servico', t));
      }
      if (atualizarProjeto && (tecnologias?.length || servicos?.length)) {
        const p = this.repo.project(projetoId);
        this.repo.updateProject(projetoId, { tecnologias: [...new Set([...p.tecnologias, ...(tecnologias ?? [])])], servicos: [...new Set([...p.servicos, ...(servicos ?? [])])] }, user.id);
        refreshFicha(this.repo, projetoId, user.id);
      }
      // CR-047: dados da ficha do projeto atualizados com o que veio do arquivo, campo a campo, só os que o revisor marcou.
      // Valor e margem só para quem pode ver valores. Cada mudança entra no histórico do projeto (antes → depois).
      const PARA_PROJETO = { prazo_meses: 'prazo_meses', data_conteudo: 'data_referencia', valor: 'valor', margem: 'margem' };
      const mudancas = {};
      for (const k of Array.isArray(atualizarCampos) ? atualizarCampos : []) {
        if (!PARA_PROJETO[k] || final[k] == null || final[k] === '') continue;
        if (['valor', 'margem'].includes(k) && !user.verValores) continue;
        mudancas[PARA_PROJETO[k]] = final[k];
      }
      if (Object.keys(mudancas).length) {
        this.repo.updateProject(projetoId, mudancas, user.id);
        refreshFicha(this.repo, projetoId, user.id);
      }
      this.repo.updateJob(id, { status: 'indexado', documento_id: docId });
      return docId;
    });
    const indice = this.reindex();
    return { documento: docId, projeto: projetoId, indice };
  }

  logProjectCorrections(jobId, sugerido, final, user) {
    for (const k of ['cliente', 'titulo', 'segmento', 'status_proposta', 'confidencialidade', 'prazo_meses']) {
      if (k in final && String(final[k] ?? '') !== String(sugerido[k] ?? '')) {
        this.repo.logCorrection({ processamento_id: jobId, campo: `projeto.${k}`, valor_sugerido: sugerido[k] == null ? null : String(sugerido[k]), valor_final: final[k] == null ? null : String(final[k]), metodo_sugestao: 'regras/ia', usuario_id: user.id });
      }
    }
  }

  reject(id, user) {
    const job = this.repo.job(id);
    if (!job || job.enviado_por !== user.id) return [404, { erro: 'Processamento não encontrado.' }];
    if (!['aguardando_revisao', 'erro'].includes(job.status)) return [409, { erro: `Processamento está "${job.status}".` }];
    this.repo.updateJob(id, { status: 'rejeitado', concluido_em: now() });
    this.repo.logActivity({ acao: 'excluir', entidade: 'processamento', entidade_id: id, campo: 'arquivo', antes: job.nome_arquivo, usuario_id: user.id });
    return { ok: true };
  }
}

// ---------- Informações complementares informadas na revisão (UC02.15) ----------
const ENTITY_LISTS = { pessoas: 'Pessoas', organizacoes: 'Organizações', kpis: 'Resultados', riscos: 'Riscos', licoes: 'Lições' };
const entityLabel = (e) => (e.papel ? `${e.valor} (${e.papel})` : e.valor);
const clip = (v, n) => (v == null ? '' : String(v).trim().slice(0, n));

function extraInfo(x = {}) {
  const link = clip(x.link_origem, 500);
  if (link && !/^https?:\/\//i.test(link)) return { erro: 'O link de origem precisa começar com http:// ou https://.' };
  return {
    campos: {
      autor: clip(x.autor, 120) || null,
      versao: clip(x.versao, 40) || null,
      link_origem: link || null,
      observacoes: clip(x.observacoes, 2000) || null,
      reutilizavel: Boolean(x.reutilizavel),
    },
  };
}

// A lista revisada substitui a sugerida; itens mantidos preservam evidência e método, os novos ficam como "manual".
function mergeEntities(sugeridas = {}, revisadas) {
  const out = { ...sugeridas };
  if (!revisadas) return out;
  for (const tipo of Object.keys(ENTITY_LISTS)) {
    if (!Array.isArray(revisadas[tipo])) continue;
    const orig = new Map((sugeridas[tipo] ?? []).map((e) => [entityLabel(e).toLowerCase(), e]));
    out[tipo] = revisadas[tipo].slice(0, 50).map((e) => ({ valor: clip(e.valor, 300), papel: clip(e.papel, 80) || undefined }))
      .filter((e) => e.valor)
      .map((e) => orig.get(entityLabel(e).toLowerCase()) ?? { ...e, confianca: 1, metodo: 'manual' });
  }
  return out;
}
