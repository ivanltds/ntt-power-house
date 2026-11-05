// Inteligência de metadados (UC02.3 a UC02.9): regras, vocabulário controlado e estatística de texto.
// Cada sugestão traz valor, confiança (0 a 1), método e o trecho que a sustenta, para a revisão humana.
// A IA (DeepSeek), quando disponível, complementa estas regras; ver mergeAI.

import { normalize, tokenize, sentences } from './text.js';
import { SEGMENTS, TECHNOLOGIES, SERVICES } from './lexicon.js';

export const TIPOS_DOCUMENTAIS = {
  proposta_comercial: 'Proposta comercial',
  apresentacao_comercial: 'Apresentação comercial',
  estimativa_preliminar: 'Estimativa preliminar',
  transcricao_reuniao: 'Transcrição de reunião',
  case_sucesso: 'Case de sucesso',
  ata_validada: 'Ata / lições aprendidas',
  sow: 'SOW / contrato',
  email: 'E-mail',
  documento_tecnico: 'Documento técnico',
  ficha_cadastro: 'Ficha do projeto (cadastro)',
  outro: 'Outro',
};

// Tecnologias conhecidas fora da taxonomia: quando aparecem, viram sugestão "pendente de curadoria" (RNF11).
const KNOWN_TECH = ['Oracle', 'Tableau', 'Looker', 'Qlik', 'dbt', 'Airflow', 'Spark', 'Hadoop', 'MongoDB', 'PostgreSQL', 'MySQL', 'SQL Server', 'Terraform',
  'Docker', 'Java', '.NET', 'React', 'Angular', 'Node.js', 'Informatica', 'Talend', 'Microsoft Fabric', 'Copilot', 'Dynamics 365', 'MuleSoft', 'Pega',
  'OutSystems', 'Elasticsearch', 'Redis', 'Teradata', 'Cloudera', 'Alteryx', 'Collibra', 'Purview', 'Vertex AI', 'Azure OpenAI', 'Bedrock', 'LangChain',
  'OpenShift', 'Jenkins', 'GitHub Actions', 'Grafana', 'Datadog', 'Splunk', 'Zendesk', 'HubSpot', 'Totvs', 'Protheus', 'Genesys', 'Twilio', 'Fivetran'];

const STOP = {
  pt: ['de', 'que', 'nao', 'para', 'com', 'uma', 'os', 'das', 'dos', 'como', 'mais', 'foi', 'pela', 'pelo', 'sao', 'tambem', 'ao', 'no', 'na'],
  en: ['the', 'and', 'of', 'to', 'in', 'for', 'is', 'with', 'that', 'on', 'are', 'this', 'by', 'be', 'we', 'will'],
  es: ['el', 'los', 'del', 'las', 'que', 'por', 'con', 'una', 'para', 'como', 'pero', 'esta', 'tambien', 'muy'],
};

const field = (valor, confianca, metodo, evidencia = null, extra = {}) => ({ valor, confianca: Math.round(confianca * 100) / 100, metodo, evidencia, ...extra });
const clip = (s, n = 220) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
const padded = (t) => ` ${normalize(t).replace(/[.,;:!?)(]+(?=\s|$)/g, '')} `;

function lineWith(text, normTerm) {
  return text.split('\n').find((l) => padded(l).includes(` ${normTerm} `))?.trim() ?? null;
}

export function detectLanguage(text) {
  const words = normalize(text).split(' ').slice(0, 3000);
  const scores = Object.fromEntries(Object.entries(STOP).map(([lang, list]) => [lang, words.filter((w) => list.includes(w)).length]));
  const [lang, hits] = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
  return field(hits ? lang : 'pt', hits ? hits / total : 0.3, 'estatistica');
}

// Classificação do tipo documental por pistas do nome do arquivo, formato e conteúdo.
export function classifyType(text, filename, extracao = {}) {
  const name = normalize(filename);
  const norm = normalize(text.slice(0, 20000));
  const count = (re) => (norm.match(re) ?? []).length;
  const speakerLines = text.split('\n').filter((l) => /^(\[\d+:\d+\]\s*)?[A-ZÀ-Ú][\wÀ-ú.]+(?: [A-ZÀ-Ú][\wÀ-ú.]+){0,3}:\s/.test(l)).length;
  const scores = {
    transcricao_reuniao: (extracao.transcricao ? 6 : 0) + (/transcri|reuniao|kickoff|meeting|call/.test(name) ? 4 : 0) + Math.min(5, speakerLines / 3) + count(/\[\d+:\d+\]/g) * 0.3 + count(/\btranscri/g),
    apresentacao_comercial: (extracao.formato === 'pptx' ? 5 : 0) + (/apresenta|deck|pitch|slides?/.test(name) ? 4 : 0) + count(/\bslide\b/g) * 0.5 + count(/\bagenda\b/g),
    proposta_comercial: (/proposta|proposal/.test(name) ? 4 : 0) + count(/\bproposta\b/g) * 0.6 + count(/\bescopo\b/g) * 0.5 + count(/entregave/g) * 0.5 + count(/investimento|condicoes comerciais|cronograma/g) * 0.7,
    estimativa_preliminar: (/estimativa|estimate|orcamento/.test(name) ? 5 : 0) + count(/\bestimativa/g) + count(/\bpreliminar/g) + count(/\bpremissas?\b/g) * 0.5 + count(/\bhoras\b|esforco/g) * 0.5,
    case_sucesso: (/\bcase\b|sucesso|success/.test(name) ? 5 : 0) + count(/\bcase\b/g) + count(/resultados? (alcancado|obtido)|ganhos?|depoimento/g) + count(/\d+ ?%/g) * 0.2,
    ata_validada: (/\bata\b|licoes|lessons|retrospectiva|perda/.test(name) ? 5 : 0) + count(/\bata\b/g) + count(/licoes aprendidas|motivo da perda|analise de perda|retrospectiva/g) * 1.5,
    sow: (/\bsow\b|contrato|statement/.test(name) ? 5 : 0) + count(/statement of work|clausula|contratante|contratada/g),
    email: (extracao.email ? 8 : 0) + (/\.eml$/.test(filename) ? 3 : 0),
    documento_tecnico: (/arquitetura|tecnic|design|spec|requisit/.test(name) ? 4 : 0) + count(/arquitetura|componente|integracao|api\b/g) * 0.3 + count(/requisito/g) * 0.8,
  };
  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [best, top] = ranked[0];
  const total = ranked.reduce((s, [, v]) => s + v, 0) || 1;
  if (top < 1.5) return field('outro', 0.3, 'regras', null, { alternativas: ranked.slice(0, 3).map(([v, s]) => ({ valor: v, score: Math.round((s / total) * 100) / 100 })) });
  return field(best, Math.min(0.95, 0.45 + top / total / 1.5), 'regras', null, {
    alternativas: ranked.slice(1, 4).filter(([, s]) => s > 0).map(([v, s]) => ({ valor: v, score: Math.round((s / total) * 100) / 100 })),
  });
}

export function documentStatus(tipo, text) {
  const norm = normalize(text.slice(0, 15000));
  if (/\brascunho\b|\bdraft\b|minuta/.test(norm)) return field('rascunho', 0.7, 'regras');
  const map = { transcricao_reuniao: 'bruta', estimativa_preliminar: 'preliminar', case_sucesso: 'aprovado', ata_validada: 'validada', email: 'bruta', apresentacao_comercial: 'final' };
  if (tipo === 'proposta_comercial' || tipo === 'sow') {
    if (/aprovad|assinad|aceite/.test(norm)) return field('final_aprovada', 0.7, 'regras');
    return field('final_enviada', 0.55, 'regras');
  }
  return field(map[tipo] ?? 'final', 0.6, 'regras');
}

// Status da proposta (do projeto) inferido pelo conteúdo, para pré-preencher um projeto novo.
export function proposalStatus(text) {
  const norm = normalize(text.slice(0, 20000));
  const rules = [
    ['Perdida', /perdemos|proposta perdida|motivo da perda|nao fomos selecionados|cliente optou por outro/],
    ['Entregue', /projeto (foi )?entregue|resultados alcancados|apos a entrega|go-live realizado|encerramento do projeto/],
    ['Em execução', /em execucao|sprint atual|andamento do projeto|kickoff/],
    ['Vendida', /proposta aprovada|contrato assinado|pedido de compra|aceite da proposta/],
    ['Em negociação', /em negociacao|contraproposta|revisao comercial/],
    ['Enviada', /proposta enviada|submetida|aguardando retorno/],
  ];
  const hit = rules.find(([, re]) => re.test(norm));
  return hit ? field(hit[0], 0.6, 'regras', lineWith(text, normalize(norm.match(hit[1])[0]))) : field('Em elaboração', 0.3, 'padrao');
}

function lexicon(text, dictionary) {
  const lines = text.split('\n');
  const norm = padded(text);
  return Object.entries(dictionary).map(([canon, terms]) => {
    let n = 0;
    let evid = null;
    for (const t of terms) {
      const c = norm.split(` ${t} `).length - 1;
      if (c && !evid) evid = lines.find((l) => padded(l).includes(` ${t} `))?.trim() ?? null;
      n += c;
    }
    return { canon, n, evid };
  }).filter((x) => x.n > 0).sort((a, b) => b.n - a.n);
}

const conf = (n) => (n >= 3 ? 0.9 : n === 2 ? 0.75 : 0.6);

export function segmentOf(text) {
  const found = lexicon(text, SEGMENTS);
  if (!found.length) return field(null, 0, 'lexico');
  const [best, ...rest] = found;
  return field(best.canon, conf(best.n), 'lexico', clip(best.evid ?? ''), { alternativas: rest.slice(0, 2).map((x) => ({ valor: x.canon, score: x.n })) });
}

export function termsOf(text, dictionary) {
  return lexicon(text, dictionary).map((x) => field(x.canon, conf(x.n), 'lexico', clip(x.evid ?? ''), { ocorrencias: x.n }));
}

// Tecnologias citadas que não existem na taxonomia: sugeridas para curadoria.
export function newTechnologies(text) {
  const norm = padded(text);
  const known = new Set(Object.keys(TECHNOLOGIES).map((t) => t.toLowerCase()));
  return KNOWN_TECH.filter((t) => !known.has(t.toLowerCase()) && norm.includes(` ${normalize(t)} `))
    .map((t) => field(t, 0.55, 'lexico_ampliado', clip(lineWith(text, normalize(t)) ?? ''), { novaNaTaxonomia: true }));
}

// Prazos ("6 meses", "24 semanas", "10 sprints") convertidos para meses.
export function durations(text) {
  const out = [];
  const re = /(\d+(?:[.,]\d+)?)\s*(meses|mes|mês|semanas|semana|sprints?|dias)\b/gi;
  for (const line of text.split('\n')) {
    for (const m of line.matchAll(re)) {
      const n = Number(m[1].replace(',', '.'));
      const unit = normalize(m[2]);
      const meses = unit.startsWith('mes') ? n : unit.startsWith('semana') ? n / 4.345 : unit.startsWith('sprint') ? (n * 2) / 4.345 : n / 30;
      const norm = normalize(line);
      const peso = 1 + (/prazo|duracao|cronograma/.test(norm) ? 1 : 0) + (/estimad|previst|total|proposto/.test(norm) ? 1 : 0) - (/fase 1|anterior|apos|depois de/.test(norm) ? 1 : 0);
      if (meses >= 0.5 && meses <= 60) out.push({ meses: Math.round(meses * 10) / 10, trecho: clip(line.trim()), peso });
    }
  }
  return out;
}

export function bestDuration(text) {
  const all = durations(text);
  // Planilhas de estimativa: a soma da coluna "Semanas" é o prazo total.
  const weeks = [...text.matchAll(/\bsemanas:\s*(\d+(?:[.,]\d+)?)/gi)].map((m) => Number(m[1].replace(',', '.')));
  if (weeks.length >= 2) {
    const total = weeks.reduce((a, b) => a + b, 0);
    all.push({ meses: Math.round((total / 4.345) * 10) / 10, trecho: `Soma da coluna Semanas: ${total} semanas`, peso: 3 });
  }
  if (!all.length) return field(null, 0, 'regras');
  const tally = new Map();
  for (const d of all) tally.set(d.meses, (tally.get(d.meses) ?? 0) + d.peso);
  const [meses, peso] = [...tally.entries()].sort((a, b) => b[1] - a[1])[0];
  const ev = all.find((d) => d.meses === meses);
  const confianca = peso <= 1 ? 0.4 : tally.size === 1 ? 0.8 : 0.65;
  return field(meses, confianca, 'regras', ev.trecho, { alternativas: [...tally.keys()].filter((m) => m !== meses).map((m) => ({ valor: m })) });
}

// Valores monetários em reais, com escala (mil, milhões).
export function money(text) {
  const out = [];
  const re = /R\$\s?(\d{1,3}(?:\.\d{3})*(?:,\d{1,2})?|\d+(?:,\d{1,2})?)\s*(milh(?:ão|ões|ao|oes)|mil|mi\b|bi(?:lh(?:ão|ões))?|k\b)?/gi;
  for (const line of text.split('\n')) {
    for (const m of line.matchAll(re)) {
      let v = Number(m[1].replace(/\./g, '').replace(',', '.'));
      const scale = normalize(m[2] ?? '');
      if (scale.startsWith('mil') && !scale.startsWith('milh')) v *= 1e3;
      else if (scale === 'k') v *= 1e3;
      else if (scale.startsWith('milh') || scale === 'mi') v *= 1e6;
      else if (scale.startsWith('bi')) v *= 1e9;
      const total = /investimento|valor total|preco|total da proposta|valor da proposta|valor preliminar|orcamento/.test(normalize(line));
      out.push({ valor: v, trecho: clip(line.trim()), total });
    }
  }
  return out;
}

export function proposalValue(text) {
  const all = money(text);
  const totals = all.filter((m) => m.total);
  if (!totals.length) return field(null, 0, 'regras', null, { outrosValores: all.length });
  const best = totals.sort((a, b) => b.valor - a.valor)[0];
  return field(best.valor, totals.length === 1 ? 0.8 : 0.6, 'regras', best.trecho);
}

export function margin(text) {
  const m = text.match(/margem[^\n\d]{0,40}(\d{1,2}(?:[.,]\d+)?)\s*%/i);
  return m ? field(Number(m[1].replace(',', '.')) / 100, 0.75, 'regras', clip(m[0])) : field(null, 0, 'regras');
}

const MONTHS = { janeiro: 1, fevereiro: 2, marco: 3, abril: 4, maio: 5, junho: 6, julho: 7, agosto: 8, setembro: 9, outubro: 10, novembro: 11, dezembro: 12 };

export function dates(text) {
  const out = [];
  const iso = (y, m, d) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  for (const m of text.matchAll(/\b(\d{4})-(\d{2})-(\d{2})\b/g)) out.push(iso(m[1], m[2], m[3]));
  for (const m of text.matchAll(/\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g)) if (Number(m[2]) <= 12) out.push(iso(m[3], m[2], m[1]));
  for (const m of normalize(text).matchAll(/\b(?:(\d{1,2}) de )?(janeiro|fevereiro|marco|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro) de (\d{4})\b/g)) {
    out.push(iso(m[3], MONTHS[m[2]], m[1] ?? 1));
  }
  return [...new Set(out)].filter((d) => d >= '1990' && d <= '2100').sort();
}

// Pessoas: falantes de transcrição, remetente de e-mail, papéis declarados ("Gerente de projeto: Nome").
export function people(text) {
  const found = new Map();
  const add = (nome, papel, trecho, confianca) => {
    const n = nome.replace(/\s+/g, ' ').trim();
    if (n.split(' ').length < 2 || n.length > 50 || /\d/.test(n)) return;
    const key = normalize(n);
    const prev = found.get(key);
    if (!prev || (!prev.papel && papel)) found.set(key, field(n, confianca, 'regras', clip(trecho), { papel: papel ?? prev?.papel ?? null }));
  };
  const NAME = "[A-ZÀ-Ú][a-zà-ú]+(?: (?:d[aeo]s? )?[A-ZÀ-Ú][a-zà-ú]+){1,3}";
  for (const line of text.split('\n')) {
    let m = line.match(new RegExp(`^(?:\\[\\d+:\\d+\\]\\s*)?(${NAME})(?:\\s*\\(([^)]{3,40})\\))?:\\s`));
    if (m) add(m[1], m[2] ?? null, line, 0.85);
    m = line.match(new RegExp(`(?:respons[aá]vel|gerente(?: de projeto| comercial)?|dono|sponsor|patrocinador|diretor[a]?|arquiteto[a]?|l[ií]der t[eé]cnico|account|executivo[a]? de contas?)\\s*(?:\\*\\*)?[:—-]\\s*(?:\\*\\*)?\\s*(${NAME})`, 'i'));
    if (m) add(m[1], line.slice(0, line.search(/[:—-]/)).replace(/\*|-/g, '').trim(), line, 0.8);
    m = line.match(new RegExp(`(${NAME})\\s+[—–-]\\s+([A-Za-zÀ-ú ]{4,40})$`));
    if (m && /gerente|diretor|arquitet|consultor|analista|cientista|engenheir|lider|head|cto|cio|ceo|coordenador/i.test(m[2])) add(m[1], m[2].trim(), line, 0.7);
    m = line.match(/^\*\*De:\*\*\s*"?([^"<]+?)"?\s*</);
    if (m) add(m[1], 'remetente', line, 0.8);
  }
  return [...found.values()];
}

export function organizations(text) {
  const re = /\b([A-ZÀ-Ú][\wÀ-ú&]+(?: [A-ZÀ-Ú][\wÀ-ú&]+){0,3} (?:S\.?A\.?|Ltda\.?|Distribuidora|Seguros|Seguradora|Telecom|Energia|Saneamento|Bank|Banco|Varejo|Logística|Saúde|Hospital|Agro|Transmissora|Cooperativa))\b/g;
  const prefixed = /\b((?:Banco|Hospital|Grupo|Rede|Cooperativa|Companhia|Seguradora|Construtora|Laborat[óo]rio|Universidade|Prefeitura) (?:d[aeo]s? )?[A-ZÀ-Ú][\wÀ-ú]+(?: [A-ZÀ-Ú][\wÀ-ú]+){0,2}(?: S\.A\.)?)/g;
  const counts = new Map();
  // Variações do mesmo nome ("S.A" e "S.A.") contam juntas; fica a forma mais longa.
  for (const m of [...text.matchAll(re), ...text.matchAll(prefixed)]) {
    const nome = m[1].trim();
    const key = normalize(nome).replace(/./g, '');
    const cur = counts.get(key) ?? { nome, n: 0 };
    counts.set(key, { nome: nome.length > cur.nome.length ? nome : cur.nome, n: cur.n + 1 });
  }
  return [...counts.values()].sort((a, b) => b.n - a.n).slice(0, 8).map(({ nome, n }) => field(nome, conf(n), 'regras', null, { ocorrencias: n }));
}

// Itens listados sob títulos de seção (ex.: "## Lições aprendidas", "## Riscos", "## Resultados").
function sectionItems(text, headingRe) {
  const items = [];
  let inside = false;
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    const heading = line.match(/^#{1,4}\s+(.*)$/) ?? line.match(/^\*\*([^*]{3,60})\*\*:?$/)
      ?? (line.length < 45 && /^[A-ZÀ-Ú][^.;,!?]*$/.test(line) && !/^[-*•]/.test(line) ? [line, line] : null);
    if (heading) { inside = headingRe.test(normalize(heading[1])); continue; }
    if (inside && line.length > 15) items.push(line.replace(/^[-*\d.)\s]+/, '').trim());
  }
  return items;
}

// Primeiro os itens das seções correspondentes; depois frases soltas com as palavras-chave.
function collect(text, headingRe, sentenceRe, limit, accept = () => true) {
  const fromSections = sectionItems(text, headingRe).filter(accept).map((x) => field(clip(x, 260), 0.8, 'estrutura', clip(x, 260)));
  const seen = new Set(fromSections.map((x) => normalize(x.valor)));
  const fromSentences = sentences(text)
    .filter((x) => sentenceRe.test(normalize(x)) && accept(x) && !seen.has(normalize(clip(x, 260))))
    .map((x) => field(clip(x, 260), 0.65, 'regras', clip(x, 260)));
  return [...fromSections, ...fromSentences].slice(0, limit);
}

const isKpi = (x) => /\d/.test(x) && /%|r\$|\bx\b|\d+ ?(horas|dias|pontos|mil|milh|vezes|p\.p\.)/i.test(x);
export const kpis = (text) => collect(text, /resultado|ganho|beneficio|impacto|indicador/, /(reduc|aument|ganho|econom|queda|crescimento|roi|melhori|diminui|acelera|recuper)/, 8, isKpi);
export const risks = (text) => collect(text, /risco|premissa|ponto de atencao|restric|dependencia/, /\brisco|atras|dependencia|bloquei|premissa critica|ponto de atencao|impedimento/, 6);
export const lessons = (text) => collect(text, /lic(ao|oes)|aprendizad|retrospectiva|motivo|o que faria|recomenda/, /lic(ao|oes)|aprendizad|aprendemos|deveriamos|recomenda-se|motivo da perda|perdemos|faria diferente|proxima vez/, 6);

// Dados pessoais e sensíveis (LGPD): ficam mascarados nas entidades e elevam a confidencialidade sugerida.
export function pii(text) {
  const found = [];
  const mask = (s) => s.replace(/\d(?=\d{2})/g, '•');
  for (const m of text.matchAll(/\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/g)) found.push({ tipo: 'CPF', valor: mask(m[0]) });
  for (const m of text.matchAll(/\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/g)) found.push({ tipo: 'CNPJ', valor: mask(m[0]) });
  for (const m of text.matchAll(/\b[\w.+-]+@[\w-]+\.[\w.-]+\b/g)) found.push({ tipo: 'e-mail', valor: m[0].replace(/^(.).*(@.*)$/, '$1•••$2') });
  for (const m of text.matchAll(/(?:\(\d{2}\)\s?|\b\d{2}\s)9?\d{4}-?\d{4}\b/g)) found.push({ tipo: 'telefone', valor: mask(m[0]) });
  return found;
}

export function confidentiality(text, { piiFound = [], valor = null, projeto = null } = {}) {
  const norm = normalize(text.slice(0, 30000));
  const motivos = [];
  if (/\bconfidencial|restrito|sigiloso|\bnda\b|nao divulgar|uso interno restrito/.test(norm)) motivos.push('o documento se declara confidencial/restrito');
  if (piiFound.some((p) => p.tipo === 'CPF')) motivos.push('contém CPF');
  if (projeto?.confidencialidade === 'confidencial') motivos.push(`o projeto ${projeto.id} é confidencial`);
  if (motivos.length) return field('confidencial', 0.85, 'regras', null, { motivos });
  const notes = [];
  if (valor) notes.push('contém valores comerciais: os trechos com preço ficam restritos a perfis com permissão');
  if (piiFound.length) notes.push('contém dados de contato pessoais');
  return field('interna', 0.7, 'regras', null, { motivos: notes });
}

// Resumo extrativo: frases com maior peso TF-IDF, mantendo a ordem original.
export function summarize(text, df, docCount, n = 3) {
  const sents = sentences(text).filter((s) => s.length > 40 && s.length < 400);
  if (!sents.length) return field(clip(text.replace(/\s+/g, ' '), 300) || null, 0.3, 'extrativo');
  const idf = (t) => Math.log((1 + docCount) / (1 + (df.get(t) ?? 0))) + 1;
  const scored = sents.map((s, i) => {
    const toks = tokenize(s);
    const score = toks.reduce((acc, t) => acc + idf(t), 0) / Math.sqrt(toks.length || 1) + (i < 3 ? 0.5 : 0);
    return { s, i, score };
  });
  const top = scored.sort((a, b) => b.score - a.score).slice(0, n).sort((a, b) => a.i - b.i);
  return field(top.map((x) => x.s).join(' '), 0.55, 'extrativo');
}

// Palavras-chave por TF-IDF contra a base, devolvendo a forma mais frequente de cada radical.
export function keywords(text, df, docCount, n = 10, exclude = new Set()) {
  const surface = new Map();
  const tf = new Map();
  for (const raw of normalize(text).split(' ')) {
    const word = raw.replace(/\.+$/, '');
    if (/[.@]|^-/.test(word) || exclude.has(word)) continue;
    const toks = tokenize(word);
    if (toks.length !== 1 || word.length < 4 || /^\d/.test(word)) continue;
    const t = toks[0];
    tf.set(t, (tf.get(t) ?? 0) + 1);
    const forms = surface.get(t) ?? new Map();
    forms.set(word, (forms.get(word) ?? 0) + 1);
    surface.set(t, forms);
  }
  return [...tf.entries()]
    .map(([t, f]) => ({ t, score: (1 + Math.log(f)) * (Math.log((1 + docCount) / (1 + (df.get(t) ?? 0))) + 1) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map(({ t }) => [...surface.get(t).entries()].sort((a, b) => b[1] - a[1])[0][0]);
}

export function titleOf(text, filename, extracao = {}) {
  if (extracao.frontmatter?.titulo) return field(String(extracao.frontmatter.titulo), 0.9, 'frontmatter');
  if (extracao.arquivo?.titulo) return field(extracao.arquivo.titulo, 0.8, 'propriedades do arquivo');
  const heading = text.match(/^#{1,2}\s+(.+)$/m)?.[1]?.replace(/^Slide \d+ — /, '').trim();
  if (heading) return field(clip(heading, 120), 0.65, 'estrutura');
  const base = filename.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').trim();
  return field(base.charAt(0).toUpperCase() + base.slice(1), 0.4, 'nome do arquivo');
}

// Cliente: frontmatter, rótulo "Cliente:", clientes já cadastrados citados no texto ou organizações detectadas.
export function clientOf(text, clients, extracao = {}) {
  if (extracao.frontmatter?.cliente) return field(String(extracao.frontmatter.cliente), 0.9, 'frontmatter');
  const label = text.match(/(?:^|\n)\s*(?:\*\*)?(?:cliente|client|empresa|conta)(?:\*\*)?\s*[:—-]\s*(?:\*\*)?\s*([^\n*|;]{3,80})/i);
  const norm = padded(text);
  const mentioned = clients
    .map((c) => ({ c, n: norm.split(` ${c.nome_normalizado} `).length - 1 }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n);
  if (label) {
    const nome = label[1].trim().replace(/[,;]$/, '').replace(/(?<!\b[A-Z])\.$/, '');
    const existing = clients.find((c) => c.nome_normalizado === normalize(nome));
    return field(existing?.nome ?? nome, existing ? 0.9 : 0.75, 'regras', clip(label[0].trim()), { clienteExistente: Boolean(existing) });
  }
  // Vários clientes citados com o mesmo peso (ex.: planilha de pipeline): cliente incerto.
  const others = organizations(text).filter((o) => !mentioned.some((m) => normalize(o.valor) === m.c.nome_normalizado));
  if ((mentioned.length > 1 && mentioned[0].n === mentioned[1].n) || (mentioned.length && mentioned[0].n === 1 && others.length >= 2)) {
    const multiplos = [...mentioned.map((x) => x.c.nome), ...others.map((o) => o.valor)].slice(0, 4);
    return field(mentioned[0].c.nome, 0.35, 'base de clientes', null, { clienteExistente: true, multiplos });
  }
  if (mentioned.length) {
    return field(mentioned[0].c.nome, Math.min(0.85, 0.55 + mentioned[0].n * 0.1), 'base de clientes', clip(lineWith(text, mentioned[0].c.nome_normalizado) ?? ''), { clienteExistente: true });
  }
  const orgs = organizations(text);
  const fromTitle = extracao.arquivo?.titulo ? organizations(extracao.arquivo.titulo)[0] : null;
  const org = fromTitle ?? orgs[0];
  if (!org) return field(null, 0, 'regras');
  return field(org.valor, orgs.length > 2 && !fromTitle ? 0.35 : 0.55, 'regras', null, { clienteExistente: false, ...(orgs.length > 2 ? { multiplos: orgs.slice(0, 4).map((o) => o.valor) } : {}) });
}

export function objective(text) {
  const sec = text.match(/#{1,3}\s*(?:\d+\.?\s*)?(?:objetivo|objetivos|objective)[^\n]*\n+([\s\S]*?)(?=\n#{1,3}\s|$)/i)?.[1]?.trim();
  if (sec) return field(clip(sec.replace(/\s+/g, ' '), 500), 0.75, 'estrutura');
  const s = sentences(text).find((x) => /\bobjetivo\b|\bqueremos\b|\bprecisamos\b|\bmeta\b/.test(normalize(x)));
  return s ? field(clip(s, 400), 0.5, 'regras', clip(s)) : field(null, 0, 'regras');
}

// Completude dos metadados: o que falta para o documento ser uma boa referência.
export function quality(s) {
  const checks = [
    ['tipo_documental', s.tipo_documental?.valor && s.tipo_documental.valor !== 'outro'],
    ['cliente', s.cliente?.valor],
    ['titulo', s.titulo?.valor],
    ['segmento', s.segmento?.valor],
    ['tecnologias', s.tecnologias?.length],
    ['servicos', s.servicos?.length],
    ['data_conteudo', s.data_conteudo?.valor],
    ['resumo', s.resumo?.valor],
  ];
  if (['proposta_comercial', 'estimativa_preliminar', 'sow'].includes(s.tipo_documental?.valor)) checks.push(['prazo_meses', s.prazo_meses?.valor]);
  const faltando = checks.filter(([, ok]) => !ok).map(([k]) => k);
  return { percentual: Math.round((1 - faltando.length / checks.length) * 100), faltando };
}

// Análise completa por regras (sem IA e sem vínculo com a base).
export function analyzeText({ texto, filename, extracao = {}, clients = [], df = new Map(), docCount = 1 }) {
  const tipo = extracao.frontmatter?.tipo_documental ? field(extracao.frontmatter.tipo_documental, 0.95, 'frontmatter') : classifyType(texto, filename, extracao);
  const piiFound = pii(texto);
  const valor = proposalValue(texto);
  const allDates = dates(texto);
  const fm = extracao.frontmatter ?? {};
  const s = {
    idioma: detectLanguage(texto),
    tipo_documental: tipo,
    status_documento: fm.status_documento ? field(fm.status_documento, 0.95, 'frontmatter') : documentStatus(tipo.valor, texto),
    status_proposta: fm.status_proposta ? field(fm.status_proposta, 0.95, 'frontmatter') : proposalStatus(texto),
    titulo: titleOf(texto, filename, extracao),
    cliente: clientOf(texto, clients, extracao),
    segmento: fm.segmento ? field(fm.segmento, 0.95, 'frontmatter') : segmentOf(texto),
    tecnologias: fm.tecnologias ? fm.tecnologias.map((t) => field(t, 0.95, 'frontmatter')) : [...termsOf(texto, TECHNOLOGIES), ...newTechnologies(texto)],
    servicos: fm.servicos ? fm.servicos.map((t) => field(t, 0.95, 'frontmatter')) : termsOf(texto, SERVICES),
    prazo_meses: fm.prazo_meses ? field(fm.prazo_meses, 0.95, 'frontmatter') : bestDuration(texto),
    valor: fm.valor ? field(fm.valor, 0.95, 'frontmatter') : valor,
    margem: fm.margem ? field(fm.margem, 0.95, 'frontmatter') : margin(texto),
    data_conteudo: fm.data ? field(String(fm.data), 0.95, 'frontmatter')
      : extracao.arquivo?.criadoEm ? field(extracao.arquivo.criadoEm, 0.7, 'propriedades do arquivo')
        : allDates.length ? field(allDates[allDates.length - 1], 0.5, 'regras', null, { alternativas: allDates.slice(-4, -1).map((v) => ({ valor: v })) }) : field(null, 0, 'regras'),
    objetivo: objective(texto),
    resumo: summarize(texto, df, docCount),
    palavras_chave: [],
    entidades: {
      pessoas: people(texto),
      organizacoes: organizations(texto),
      kpis: kpis(texto),
      riscos: risks(texto),
      licoes: lessons(texto),
      datas: allDates.map((d) => field(d, 0.8, 'regras')),
      prazos: durations(texto).slice(0, 6).map((d) => field(`${d.meses} meses`, 0.7, 'regras', d.trecho)),
      valores: money(texto).slice(0, 6).map((m) => field(m.valor, 0.7, 'regras', m.trecho)),
    },
    pii: piiFound,
  };
  if (extracao.arquivo?.autor && !/[@<]/.test(extracao.arquivo.autor)) {
    const autor = extracao.arquivo.autor.trim();
    if (autor.split(' ').length >= 2 && !s.entidades.pessoas.some((p) => normalize(p.valor) === normalize(autor))) s.entidades.pessoas.push(field(autor, 0.7, 'propriedades do arquivo', null, { papel: 'autor do arquivo' }));
  }
  s.palavras_chave = keywords(texto, df, docCount, 10, new Set(s.entidades.pessoas.flatMap((p) => normalize(p.valor).split(' '))));
  s.confidencialidade = fm.confidencialidade ? field(fm.confidencialidade, 0.95, 'frontmatter') : confidentiality(texto, { piiFound, valor: valor.valor });
  s.qualidade = quality(s);
  return s;
}

// Combina a extração da IA com as regras. Valores da IA que não aparecem no texto são descartados
// (proteção contra alucinação); concordância entre os dois métodos aumenta a confiança.
export function mergeAI(s, ai, texto) {
  if (!ai) return s;
  const norm = padded(texto);
  const appears = (v) => v && norm.includes(padded(v));
  const descartes = [];
  const scalar = (key, value, { verify = false, confidence = 0.7 } = {}) => {
    if (value == null || value === '') return;
    if (verify && !appears(value)) { descartes.push(`${key}: "${value}" não aparece no documento`); return; }
    const cur = s[key];
    if (cur?.valor == null || cur.valor === 'outro') s[key] = field(value, confidence, 'ia');
    else if (normalize(cur.valor) === normalize(value)) s[key] = { ...cur, confianca: Math.min(0.98, Math.round((cur.confianca + 0.15) * 100) / 100), metodo: `${cur.metodo}+ia` };
    else if (cur.metodo !== 'frontmatter') {
      const alternativas = [...(cur.alternativas ?? []), { valor: cur.valor, metodo: cur.metodo }];
      s[key] = cur.confianca >= 0.8 ? { ...cur, alternativas: [{ valor: value, metodo: 'ia' }, ...(cur.alternativas ?? [])] } : field(value, confidence, 'ia', cur.evidencia, { alternativas });
    }
  };
  scalar('tipo_documental', TIPOS_DOCUMENTAIS[ai.tipo_documental] ? ai.tipo_documental : null, { confidence: 0.75 });
  scalar('cliente', ai.cliente, { verify: true });
  scalar('titulo', ai.titulo, { confidence: 0.6 });
  scalar('segmento', ai.segmento);
  scalar('status_proposta', ai.status_proposta, { confidence: 0.6 });
  // Prazo e valor da IA só são aceitos se baterem com um número encontrado pelas regras.
  const durs = durations(texto).map((d) => d.meses);
  if (ai.prazo_meses != null) (durs.includes(Number(ai.prazo_meses)) ? scalar('prazo_meses', Number(ai.prazo_meses)) : descartes.push(`prazo ${ai.prazo_meses} meses não encontrado no texto`));
  const vals = money(texto).map((m) => m.valor);
  if (ai.valor != null) (vals.includes(Number(ai.valor)) ? scalar('valor', Number(ai.valor)) : descartes.push(`valor ${ai.valor} não encontrado no texto`));
  if (ai.resumo) s.resumo = field(ai.resumo, 0.8, 'ia');
  if (ai.objetivo && !s.objetivo?.valor) s.objetivo = field(ai.objetivo, 0.65, 'ia');
  for (const [key, list] of [['tecnologias', ai.tecnologias], ['servicos', ai.servicos]]) {
    for (const v of list ?? []) {
      const cur = s[key].find((x) => normalize(x.valor) === normalize(v));
      if (cur) Object.assign(cur, { confianca: Math.min(0.98, Math.round((cur.confianca + 0.15) * 100) / 100), metodo: `${cur.metodo}+ia` });
      else s[key].push(field(v, 0.6, 'ia'));
    }
  }
  for (const p of ai.pessoas ?? []) {
    if (!p?.nome || !appears(p.nome)) { if (p?.nome) descartes.push(`pessoa "${p.nome}" não aparece no documento`); continue; }
    const cur = s.entidades.pessoas.find((x) => normalize(x.valor) === normalize(p.nome));
    if (cur) cur.papel ??= p.papel ?? null;
    else s.entidades.pessoas.push(field(p.nome, 0.7, 'ia', null, { papel: p.papel ?? null }));
  }
  for (const [key, list] of [['riscos', ai.riscos], ['licoes', ai.licoes], ['kpis', ai.resultados]]) {
    for (const v of (list ?? []).slice(0, 5)) if (typeof v === 'string' && v.trim()) s.entidades[key].push(field(clip(v, 260), 0.6, 'ia'));
  }
  if (Array.isArray(ai.palavras_chave)) s.palavras_chave = [...new Set([...ai.palavras_chave.slice(0, 6), ...s.palavras_chave])].slice(0, 12);
  s.descartesIA = descartes;
  s.qualidade = quality(s);
  return s;
}
