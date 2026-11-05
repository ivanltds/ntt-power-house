// Respostas por intenção (adendo 5, UC03.17–UC03.23). As mesmas funções servem ao roteador (opção B) e às
// ferramentas que a IA pode chamar em perguntas compostas (opção C). Todas aplicam as permissões do usuário
// da sessão, são só leitura e devolvem números tirados do banco, nunca da IA.

import { normalize, tokenize, sentences } from './text.js';
import { STATUS_PROPOSTA, STATUS_GANHO, STATUS_ANDAMENTO } from './db/repo.js';
import { SEGMENTS, TECHNOLOGIES, SERVICES } from './lexicon.js';

const list = (items) => (items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} e ${items[items.length - 1]}`);

export const CAMPOS_FICHA = {
  cliente: 'Cliente', segmento: 'Segmento', status_proposta: 'Status', prazo_meses: 'Prazo', valor: 'Valor', margem: 'Margem',
  dono: 'Responsável', area: 'Prática NTT', data_referencia: 'Data de referência', link_sharepoint: 'Link do repositório',
  tecnologias: 'Tecnologias', servicos: 'Serviços', objetivo: 'Objetivo', descricao: 'Descrição', confidencialidade: 'Acesso',
};
const CAMPOS_PADRAO = ['cliente', 'segmento', 'status_proposta', 'prazo_meses', 'valor', 'margem', 'dono', 'data_referencia', 'tecnologias', 'servicos', 'objetivo'];
const RESTRITOS = new Set(['valor', 'margem']);

export const AGRUPAVEIS = { segmento: 'Segmento', status: 'Status', tecnologia: 'Tecnologia', servico: 'Serviço', cliente: 'Cliente', ano: 'Ano', area: 'Prática NTT' };

export const LIMITE_LISTA = 20;
export const VOCAB = { segmentos: Object.keys(SEGMENTS), tecnologias: Object.keys(TECHNOLOGIES), servicos: Object.keys(SERVICES) };

// ---------- Leitura da pergunta (regras; usadas sem IA e para completar o que a IA devolve) ----------

// Palavras que indicam campos da ficha do projeto.
const CAMPO_RE = [
  [/\bprazo|duracao|quanto tempo|meses\b/, 'prazo_meses'],
  [/\bvalor|custo|custou|preco|investimento|quanto (custa|foi|vale)/, 'valor'],
  [/\bmargem/, 'margem'],
  [/\bresponsavel|dono|gerente|lider|quem (cuida|e o responsavel|toca)/, 'dono'],
  [/\blink|repositorio|sharepoint|pasta|url\b/, 'link_sharepoint'],
  [/\b(qual|quais) (e |foi )?a data|data de (referencia|inicio|envio|entrega)|quando (foi|comecou|aconteceu)/, 'data_referencia'],
  [/\bstatus|situacao|ganhamos|perdemos|fechou/, 'status_proposta'],
  [/\bpratica|area\b/, 'area'],
  [/\btecnologia|stack|ferramentas/, 'tecnologias'],
  [/\bservico/, 'servicos'],
  [/\bobjetivo|meta\b/, 'objetivo'],
  [/\bdescricao|escopo|do que se trata|sobre o que/, 'descricao'],
];
export function camposPedidos(norm) {
  return [...new Set(CAMPO_RE.filter(([re]) => re.test(norm)).map(([, c]) => c))];
}

const AGRUPA_RE = [
  [/\b(segmentos?|areas?|setores?|industrias?|mercados?|verticais?)\b/, 'segmento'],
  [/\bclientes?\b/, 'cliente'],
  [/\btecnologias?|stacks?\b/, 'tecnologia'],
  [/\bservicos?\b/, 'servico'],
  [/\bstatus|situac(ao|oes)\b/, 'status'],
  [/\banos?\b/, 'ano'],
  [/\bpraticas?\b/, 'area'],
];
export function agrupamentoPedido(norm) {
  const por = norm.match(/\bpor (segmento|area|setor|cliente|tecnologia|servico|status|ano|pratica)\b/);
  if (por) return AGRUPA_RE.find(([re]) => re.test(por[1]))?.[1] ?? null;
  for (const [re, campo] of AGRUPA_RE) if (re.test(norm)) return campo;
  return null;
}

// Status e período citados na pergunta ("perdidas", "ganhas em 2025", "desde 2024").
export function filtrosDaPergunta(norm) {
  const status = new Set();
  if (/\bperdid|perdemos/.test(norm)) status.add('Perdida');
  if (/\b(ganh|vendid|fechad|vencemos)/.test(norm)) STATUS_GANHO.forEach((s) => status.add(s));
  if (/\b(em andamento|abert[ao]s|em negociacao|pipeline)\b/.test(norm)) STATUS_ANDAMENTO.forEach((s) => status.add(s));
  if (/\bentregue/.test(norm)) status.add('Entregue');
  if (/\bem execucao/.test(norm)) status.add('Em execução');
  if (/\bcancelad/.test(norm)) status.add('Cancelada');
  const desde = norm.match(/\b(?:desde|a partir de)\s+(20\d{2})\b/);
  const ano = norm.match(/\b(?:em|de|no ano de)\s+(20\d{2})\b/);
  return {
    status: [...status],
    anoDe: desde ? Number(desde[1]) : ano ? Number(ano[1]) : null,
    anoAte: !desde && ano ? Number(ano[1]) : null,
  };
}

// Sobrou assunto na pergunta além de filtros e palavras de pedido? ("liste projetos de churn" tem assunto: churn.)
const PALAVRAS_DE_PEDIDO = new Set(('liste listar listagem lista listem relacao consolidado consolide consolida inventario mostre mostrar quero preciso gostaria saber '
  + 'todos todas os as de do da dos das no na nos nas em para por com que quais qual quantos quantas sao e um uma ja temos tem existe existem '
  + 'projetos projeto propostas proposta cases case base banco seu sua nossa nosso nossos salvos cadastrados registrados disponiveis visiveis '
  + 'segmentos segmento areas area setores clientes cliente tecnologias servicos status anos ano possuem possui ha fizemos feitos me faca faz '
  + 'perdidas perdidos perdemos ganhas ganhos vendidas entregues andamento abertas execucao canceladas desde partir '
  + 'foram foi sao estao esta estavam aqui sistema radar existentes atuais hoje agora ate').split(' '));
export function temAssunto(query, entidades) {
  const termos = new Set([...entidades.segmentos, ...entidades.tecnologias, ...entidades.servicos].flatMap((t) => normalize(t).split(' ')));
  const dicionario = new Set([SEGMENTS, TECHNOLOGIES, SERVICES].flatMap((d) => Object.values(d).flat()).flatMap((t) => t.split(' ')));
  return normalize(query).split(' ').some((w) => w.length > 2 && !/^20\d{2}$/.test(w) && !PALAVRAS_DE_PEDIDO.has(w) && !termos.has(w) && !dicionario.has(w));
}

// Classificação por regras (sem IA, ou quando a IA falha). Conservadora: na dúvida, fica em "buscar".
export function classificar(query) {
  const norm = normalize(query);
  if (/\bcompar|diferenca entre|\bversus\b|\bvs\b/.test(norm)) return { intencao: 'comparar' };
  const campos = camposPedidos(norm);
  const agrupa = agrupamentoPedido(norm);
  const pedeLista = /\b(quais|liste|listar|listagem|lista|relacao|todos|todas|consolidado|inventario|mostre)\b/.test(norm);
  const nomePlural = /\b(segmentos|areas|setores|industrias|mercados|clientes|tecnologias|servicos|anos|praticas)\b/.test(norm);
  if (/\bpor (segmento|area|setor|cliente|tecnologia|servico|status|ano|pratica)\b/.test(norm) || (pedeLista && nomePlural && agrupa)) {
    return { intencao: 'agregar', agruparPor: agrupa };
  }
  if (/\bquant[oa]s\b/.test(norm) && agrupa && nomePlural) return { intencao: 'agregar', agruparPor: agrupa };
  if (/\b(consolidado|consolide|inventario|todos os projetos|todas as propostas|todos os cases|liste|listar|listagem|relacao de projetos|quant[oa]s projetos|quant[oa]s propostas)\b/.test(norm)) {
    return { intencao: 'listar' };
  }
  // "Quais projetos foram entregues em 2025?": pergunta por atributos (status ou período) também é inventário.
  const f = filtrosDaPergunta(norm);
  if (/\bquais (sao )?(os |as )?(projetos|propostas|cases)\b/.test(norm) && (f.status.length || f.anoDe)) return { intencao: 'listar' };
  // Ficha: pergunta sobre campos ("qual o prazo…", "quem é o responsável…") ou pedido explícito da ficha.
  const pergunta = /\b(qual|quais|quanto|quanta|quem|quando|informe|informar|me (diga|passe|mostre|traga)|mostre|traga)\b/.test(norm);
  if ((campos.length && pergunta) || /\bficha|detalhes do projeto|dados do projeto|informacoes do projeto/.test(norm)) return { intencao: 'ficha', campos };
  return { intencao: 'buscar' };
}

// ---------- Executores (ferramentas) ----------

export class IntentTools {
  constructor(engine) {
    this.engine = engine;
  }

  get repo() {
    return this.engine.repo;
  }

  // Filtros no formato da exploração (UC08), a partir do formato simples das intenções.
  repoFilters(f = {}) {
    return {
      q: '', segmentos: f.segmentos ?? [], status: f.status ?? [], tecnologias: f.tecnologias ?? [], modoTecnologias: 'qualquer',
      servicos: f.servicos ?? [], modoServicos: 'qualquer', tiposDocumento: [], cliente: f.cliente ?? '',
      dataDe: f.anoDe ? `${f.anoDe}-01-01` : null, dataAte: f.anoAte ? `${f.anoAte}-12-31` : null,
    };
  }

  // Todos os projetos visíveis ao usuário com os filtros (a base do piloto é pequena; pagina de 100 em 100).
  visible(user, filtros = {}) {
    const out = [];
    for (let pagina = 1; pagina < 50; pagina++) {
      const r = this.repo.searchProjects(this.repoFilters(filtros), user, { ordenar: 'data', pagina, tamanho: 100 });
      out.push(...r.itens);
      if (out.length >= r.total || !r.itens.length) return { total: r.total, itens: out };
    }
    return { total: out.length, itens: out };
  }

  listar(user, filtros = {}, { limite = LIMITE_LISTA } = {}) {
    const { total, itens } = this.visible(user, filtros);
    const conta = (fn) => [...itens.reduce((m, p) => { const k = fn(p) ?? 'Não informado'; m.set(k, (m.get(k) ?? 0) + 1); return m; }, new Map())]
      .map(([valor, quantidade]) => ({ valor, quantidade })).sort((a, b) => b.quantidade - a.quantidade || String(a.valor).localeCompare(String(b.valor)));
    return {
      total,
      filtros: limpaFiltros(filtros),
      itens: itens.slice(0, Math.min(limite, LIMITE_LISTA)).map((p) => ({
        projeto_id: p.id, titulo: p.titulo, cliente: p.cliente, segmento: p.segmento, status: p.status_proposta,
        ano: p.data_referencia ? Number(p.data_referencia.slice(0, 4)) : null, prazo_meses: p.prazo_meses,
      })),
      porStatus: conta((p) => p.status_proposta),
      porSegmento: conta((p) => p.segmento),
    };
  }

  contar(user, campo, filtros = {}) {
    const por = AGRUPAVEIS[campo] ? campo : 'segmento';
    const { total, itens } = this.visible(user, filtros);
    const chaves = (p) => ({
      segmento: [p.segmento], status: [p.status_proposta], cliente: [p.cliente], area: [p.area],
      ano: [p.data_referencia?.slice(0, 4)], tecnologia: p.tecnologias, servico: p.servicos,
    }[por]);
    const m = new Map();
    for (const p of itens) {
      const ks = chaves(p).filter(Boolean);
      for (const k of ks.length ? ks : ['Não informado']) m.set(k, (m.get(k) ?? 0) + 1);
    }
    const linhas = [...m].map(([valor, quantidade]) => ({ valor, quantidade }))
      .sort((a, b) => (por === 'ano' ? String(b.valor).localeCompare(String(a.valor)) : b.quantidade - a.quantidade || String(a.valor).localeCompare(String(b.valor))));
    return { campo: por, rotulo: AGRUPAVEIS[por], total, filtros: limpaFiltros(filtros), linhas };
  }

  // Acha projetos pelo código, pelo título ou pelo cliente. Grau de 0 a 1.
  localizar(user, texto, { limite = 5 } = {}) {
    if (!texto?.trim()) return [];
    const { itens } = this.visible(user);
    const codigos = [...texto.matchAll(/\bP\d{3}\b/gi)].map((m) => m[0].toUpperCase());
    const q = new Set(tokenize(texto));
    const nq = ` ${normalize(texto)} `;
    return itens.map((p) => {
      if (codigos.includes(p.id)) return { p, grau: 1 };
      const tt = [...new Set(tokenize(p.titulo))];
      const comuns = tt.filter((t) => q.has(t)).length;
      let grau = tt.length ? comuns / tt.length : 0;
      if (nq.includes(` ${normalize(p.titulo)} `)) grau = Math.max(grau, 0.98);
      if (nq.includes(` ${normalize(p.cliente)} `)) grau = Math.max(grau, 0.7);
      return { p, grau };
    })
      .filter((x) => x.grau >= 0.6)
      .sort((a, b) => b.grau - a.grau)
      .slice(0, limite)
      .map(({ p, grau }) => ({ projeto_id: p.id, titulo: p.titulo, cliente: p.cliente, status: p.status_proposta, grau: Math.round(grau * 100) / 100 }));
  }

  ficha(user, projetoId, campos = []) {
    const d = this.repo.projectDetail(projetoId, user);
    if (!d) return null;
    const p = d.projeto;
    const pedidos = (campos.length ? campos : CAMPOS_PADRAO).filter((c) => CAMPOS_FICHA[c]);
    return {
      projeto_id: p.id, titulo: p.titulo, cliente: p.cliente,
      campos: pedidos.map((c) => {
        const restrito = RESTRITOS.has(c) && !user.verValores;
        const valor = restrito ? null : p[c];
        const vazio = valor == null || valor === '' || (Array.isArray(valor) && !valor.length);
        return { campo: c, rotulo: CAMPOS_FICHA[c], valor: vazio ? null : valor, texto: restrito ? 'restrito ao seu perfil' : vazio ? 'não informado' : formatar(c, valor), restrito, fonte: 'cadastro' };
      }),
      documentos: d.documentos.length,
      conflitos: d.conflitos.map((x) => x.campo),
    };
  }

  // Frases dos documentos de um projeto sobre um assunto (resultados, riscos, lições, escopo…).
  trechos(user, projetoId, assunto, limite = 4) {
    const e = this.engine;
    if (!e.repo.projectDetail(projetoId, user)) return null;
    const [qv] = e.embedder.embed([assunto || 'resultados riscos lições escopo']);
    const where = { $and: [{ projeto_id: projetoId }, e.permissionWhere(user)] };
    const hits = e.collection.query({ queryEmbeddings: [qv], nResults: 6, where });
    const frases = [];
    hits.documents[0].forEach((texto, i) => {
      for (const s of sentences(texto.replace(/^#+\s.*$/gm, ''))) {
        const t = s.replace(/^[-*]\s*/, '').trim();
        if (t.length > 30 && !frases.some((f) => f.texto === t)) frases.push({ texto: t.slice(0, 300), documento: hits.metadatas[0][i].doc_id, tipo: hits.metadatas[0][i].tipo_documental });
      }
    });
    return { projeto_id: projetoId, assunto, frases: frases.slice(0, limite) };
  }
}

function limpaFiltros(f = {}) {
  const out = {};
  for (const k of ['segmentos', 'tecnologias', 'servicos', 'status']) if (f[k]?.length) out[k] = f[k];
  for (const k of ['cliente', 'anoDe', 'anoAte']) if (f[k]) out[k] = f[k];
  return out;
}

export function formatar(campo, v) {
  if (v == null || v === '') return 'não informado';
  if (campo === 'valor') return Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  if (campo === 'margem') return `${Math.round(Number(v) * 1000) / 10}%`.replace('.', ',');
  if (campo === 'prazo_meses') return `${String(v).replace('.', ',')} ${Number(v) === 1 ? 'mês' : 'meses'}`;
  if (campo === 'data_referencia') return new Date(`${String(v).slice(0, 10)}T12:00:00`).toLocaleDateString('pt-BR');
  if (Array.isArray(v)) return v.join(', ');
  return String(v);
}

// ---------- Textos das respostas (determinísticos: os números vêm do banco) ----------

const plural = (n, um, varios) => `${n} ${n === 1 ? um : varios}`;
// "5 entregues", "1 perdida", "2 em execução".
const statusN = (s) => `${s.quantidade} ${s.quantidade > 1 && /[aeo]$/i.test(s.valor) ? `${s.valor.toLowerCase()}s` : s.valor.toLowerCase()}`;
const ROTULO_MIN = { segmento: 'segmento', status: 'status', tecnologia: 'tecnologia', servico: 'serviço', cliente: 'cliente', ano: 'ano', area: 'prática NTT' };
const semPonto = (t) => String(t).replace(/[.\s]+$/, '');
const top = (linhas, n = 3) => list(linhas.slice(0, n).map((l) => `${l.valor} (${l.quantidade})`));

export function descreverFiltros(f = {}) {
  const partes = [];
  if (f.segmentos?.length) partes.push(`em ${list(f.segmentos)}`);
  if (f.status?.length) partes.push(`com status ${list(f.status.map((s) => s.toLowerCase()))}`);
  if (f.tecnologias?.length) partes.push(`com ${list(f.tecnologias)}`);
  if (f.servicos?.length) partes.push(`de ${list(f.servicos)}`);
  if (f.cliente) partes.push(`do cliente ${f.cliente}`);
  if (f.anoDe && f.anoAte && f.anoDe === f.anoAte) partes.push(`em ${f.anoDe}`);
  else if (f.anoDe) partes.push(`desde ${f.anoDe}`);
  else if (f.anoAte) partes.push(`até ${f.anoAte}`);
  return partes.join(' ');
}

export function textoListagem(r) {
  const filtro = descreverFiltros(r.filtros);
  if (!r.total) return `Não há projetos visíveis para você${filtro ? ` ${filtro}` : ''}. Tente tirar algum filtro ou explore a tela de Projetos.`;
  let t = `Há ${plural(r.total, 'projeto', 'projetos')} na base${filtro ? ` ${filtro}` : ''} ${r.total === 1 ? 'visível' : 'visíveis'} para o seu perfil.`;
  if (r.porStatus.length > 1) t += ` Por status: ${list(r.porStatus.map(statusN))}.`;
  if (r.porSegmento.length > 1 && !r.filtros.segmentos) t += ` Segmentos com mais projetos: ${top(r.porSegmento)}.`;
  if (r.total > r.itens.length) t += ` A tabela mostra os ${r.itens.length} mais recentes; abra em Projetos para ver todos.`;
  return t;
}

export function textoContagem(r, { alternativas = [] } = {}) {
  const filtro = descreverFiltros(r.filtros);
  if (!r.total) return `Não há projetos visíveis para você${filtro ? ` ${filtro}` : ''}.`;
  const rot = ROTULO_MIN[r.campo];
  const plu = { segmento: 'segmentos', status: 'status', tecnologia: 'tecnologias', servico: 'serviços', cliente: 'clientes', ano: 'anos', area: 'práticas da NTT' }[r.campo];
  let t = `Os ${plural(r.total, 'projeto', 'projetos')}${filtro ? ` ${filtro}` : ''} visíveis para você se distribuem em ${plural(r.linhas.length, rot, plu)}. Os principais: ${top(r.linhas)}.`;
  if (['tecnologia', 'servico'].includes(r.campo)) t += ' Um projeto pode contar em mais de um item.';
  if (alternativas.length) t += ` Mostrei por ${rot}; também dá para ver por ${list(alternativas.map((a) => ROTULO_MIN[a]))}.`;
  return t;
}

// Pergunta que retoma os projetos da resposta anterior ("quais os resultados neles?", "qual o prazo desses?").
const REFERENCIA_RE = /\b(neles|nelas|deles|delas|desses|dessas|destes|destas|nesses|nessas|nestes|nestas|naqueles|daqueles)\b|\b(esses|estes|aqueles|os mesmos) (projetos|clientes|casos|cases|trabalhos)\b/;
const RESULTADO_RE = /\b(resultados?|ganhos?|beneficios?|impactos?|retorno|roi|economia|licoes|aprendizados?|deu certo|como (foi|foram|terminou|terminaram))\b/;
export const referenciaAnterior = (norm) => REFERENCIA_RE.test(norm);
export const pedeResultados = (norm) => RESULTADO_RE.test(norm);

const st = (i) => String(i.status ?? 'sem status').toLowerCase();

export function textoResultados(itens, { origem }) {
  const com = itens.filter((i) => i.resultados.length);
  const sem = itens.filter((i) => !i.resultados.length);
  const n = itens.length;
  const cab = `${n === 1 ? 'Do projeto' : `Dos ${n} projetos`} ${origem}`;
  if (!com.length) return `${cab}, nenhum tem resultados registrados ainda: não há case de sucesso nem ata de encerramento na base. ${list(sem.map((i) => `${i.titulo} (${i.cliente}, ${st(i)})`))}.`;
  const partes = [`${cab}, ${com.length === 1 ? '1 tem resultados registrados' : `${com.length} têm resultados registrados`}: ${list(com.map((i) => `${i.titulo} (${i.cliente})`))}.`];
  if (sem.length) partes.push(`${sem.length === 1 ? 'O outro ainda não tem' : `Os outros ${sem.length} ainda não têm`} case nem ata de encerramento: ${list(sem.map((i) => `${i.titulo} (${st(i)})`))}.`);
  return partes.join(' ');
}

export function textoFichas(fichas, { origem }) {
  return `${fichas.length === 1 ? 'Projeto' : `Os ${fichas.length} projetos`} ${origem}: ${fichas.map((f) => `${f.titulo} (${f.campos.filter((c) => c.campo !== 'cliente').map((c) => `${c.rotulo.toLowerCase()}: ${c.texto}`).join('; ')})`).join('. ')}.`;
}

export function textoFicha(f) {
  const vistos = f.campos.filter((c) => c.valor != null).map((c) => `${c.rotulo.toLowerCase()}: ${semPonto(c.texto)}`);
  const restritos = f.campos.filter((c) => c.restrito).map((c) => c.rotulo.toLowerCase());
  const vazios = f.campos.filter((c) => !c.restrito && c.valor == null).map((c) => c.rotulo.toLowerCase());
  let t = `Ficha de “${f.titulo}” (${f.cliente}, ${f.projeto_id})`;
  t += vistos.length ? `: ${vistos.join('; ')}.` : '.';
  if (restritos.length) t += ` Restrito ao seu perfil: ${list(restritos)}.`;
  if (vazios.length) t += ` Não ${vazios.length > 1 ? 'estão informados' : 'está informado'} no cadastro: ${list(vazios)}.`;
  return t;
}

export function textoComparacao(fichas) {
  const [a, b] = fichas;
  const val = (f, c) => f.campos.find((x) => x.campo === c);
  const partes = [];
  const seg = [val(a, 'segmento')?.texto, val(b, 'segmento')?.texto];
  partes.push(seg[0] === seg[1] ? `os dois são de ${seg[0]}` : `segmentos diferentes (${seg[0]} × ${seg[1]})`);
  const st = [val(a, 'status_proposta')?.texto, val(b, 'status_proposta')?.texto];
  if (st[0] !== st[1]) partes.push(`status ${st[0]} × ${st[1]}`);
  const pz = [val(a, 'prazo_meses')?.valor, val(b, 'prazo_meses')?.valor];
  if (pz[0] && pz[1] && pz[0] !== pz[1]) partes.push(`prazo de ${formatar('prazo_meses', pz[0])} × ${formatar('prazo_meses', pz[1])}`);
  const ta = val(a, 'tecnologias')?.valor ?? [];
  const tb = val(b, 'tecnologias')?.valor ?? [];
  const comuns = ta.filter((t) => tb.includes(t));
  if (comuns.length) partes.push(`tecnologias em comum: ${list(comuns)}`);
  const so = [ta.filter((t) => !tb.includes(t)), tb.filter((t) => !ta.includes(t))];
  if (so[0].length || so[1].length) partes.push(`só em um deles: ${list([...so[0], ...so[1]])}`);
  const nomes = list(fichas.map((f) => `[${f.projeto_id}]`));
  return `Comparei ${nomes}: ${partes.join('; ')}.${fichas.length > 2 ? ' A tabela traz todos lado a lado.' : ''}`;
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// ---------- Catálogo para a IA (opção C) ----------

const FILTROS_SCHEMA = (vocab) => ({
  type: 'object',
  description: 'Filtros opcionais. Use só valores das listas.',
  properties: {
    segmentos: { type: 'array', items: { type: 'string', enum: vocab.segmentos } },
    tecnologias: { type: 'array', items: { type: 'string', enum: vocab.tecnologias } },
    servicos: { type: 'array', items: { type: 'string', enum: vocab.servicos } },
    status: { type: 'array', items: { type: 'string', enum: STATUS_PROPOSTA } },
    cliente: { type: 'string', description: 'Parte do nome do cliente' },
    anoDe: { type: 'integer' },
    anoAte: { type: 'integer' },
  },
});

export function toolSchemas(vocab) {
  const fn = (name, description, properties, required = []) => ({ type: 'function', function: { name, description, parameters: { type: 'object', properties, required } } });
  return [
    fn('listar_projetos', 'Lista projetos da base com filtros. Devolve o total, até 20 projetos e a distribuição por status e segmento.', { filtros: FILTROS_SCHEMA(vocab) }),
    fn('contar_por', 'Conta projetos agrupados por um campo (lista distinta com quantidade).', { campo: { type: 'string', enum: Object.keys(AGRUPAVEIS) }, filtros: FILTROS_SCHEMA(vocab) }, ['campo']),
    fn('localizar_projeto', 'Acha projetos pelo código (P001), pelo título ou pelo nome do cliente.', { nome: { type: 'string' } }, ['nome']),
    fn('ficha_projeto', 'Campos cadastrados de um projeto. Use depois de localizar_projeto.', { projeto_id: { type: 'string' }, campos: { type: 'array', items: { type: 'string', enum: Object.keys(CAMPOS_FICHA) } } }, ['projeto_id']),
    fn('buscar_semelhantes', 'Projetos parecidos com um tema, problema ou proposta (busca semântica).', { texto: { type: 'string' }, filtros: FILTROS_SCHEMA(vocab) }, ['texto']),
    fn('buscar_trechos', 'Frases dos documentos de um projeto sobre um assunto (resultados, riscos, lições, escopo).', { projeto_id: { type: 'string' }, assunto: { type: 'string' } }, ['projeto_id', 'assunto']),
  ];
}

// Valida os filtros pedidos pela IA contra os vocabulários (nada fora das listas passa).
export function filtrosValidos(f = {}, vocab) {
  const keep = (vs, ok) => (Array.isArray(vs) ? vs.filter((v) => ok.includes(v)) : []);
  return {
    segmentos: keep(f.segmentos, vocab.segmentos), tecnologias: keep(f.tecnologias, vocab.tecnologias), servicos: keep(f.servicos, vocab.servicos),
    status: keep(f.status, STATUS_PROPOSTA), cliente: typeof f.cliente === 'string' ? f.cliente.slice(0, 80) : '',
    anoDe: Number.isInteger(f.anoDe) ? f.anoDe : null, anoAte: Number.isInteger(f.anoAte) ? f.anoAte : null,
  };
}
