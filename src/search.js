// Motor de busca do Radar (UC03): entidades -> consulta enriquecida -> filtro de permissão ->
// recuperação semântica -> score multi-fator -> ranking -> conflito de fontes -> justificativa.

import { LocalVectorStore } from './vectorstore.js';
import { HashingEmbedder } from './embedder.js';
import { MockLLM } from './llm.js';
import { TRUST_LABEL } from './corpus.js';
import { SYNONYMS, STATUS_WEIGHT } from './lexicon.js';
import { normalize, tokenize, sentences } from './text.js';
import { STORE_PATH, COLLECTION, PRICE_PATTERN, documentFrequency, documentVectors } from './ingest.js';
import { Repo } from './db/repo.js';
import { DB_PATH } from './config.js';
import { toolSchemas, executarFerramenta } from './skills/ferramentas.js';
import { preRotear, capacidades } from './skills/index.js';
import { responderConversaIA } from './skills/conversa.js';
import { responderAjuda } from './skills/ajuda.js';
import { resumirAnexos, perguntarAnexo, consultaDoAnexo, destinoDoEnvio } from './skills/anexo.js';
import { can } from './permissions.js';
import {
  IntentTools, VOCAB, CAMPOS_FICHA, classificar, camposPedidos, agrupamentoPedido, temAssunto, filtrosValidos,
  textoListagem, textoContagem, textoFicha, textoComparacao, referenciaAnterior, pedeResultados, textoResultados, textoFichas,
} from './intents.js';

// Pesos iniciais do score (NB-02, RF19).
export const WEIGHTS = { conteudo: 0.4, segmento: 0.15, tecnologias: 0.15, servicos: 0.15, porte: 0.1, status: 0.05 };
const FACTOR_LABEL = {
  conteudo: 'Descrição / objetivo / escopo',
  segmento: 'Segmento',
  tecnologias: 'Tecnologias',
  servicos: 'Serviços / área',
  porte: 'Prazo / porte',
  status: 'Status / resultado',
};
const MIN_SCORE = 0.4;
const MIN_CONTENT = 0.12;
const MAX_RESULTS = 5;
// Análise semântica (IA real): quantos candidatos a IA reavalia, quanto a relevância dela pesa no fator
// de conteúdo e a relevância mínima para um resultado aparecer.
const SEMANTIC_POOL = 8;
const SEMANTIC_BLEND = 0.65;
const MIN_RELEVANCE = 0.4;
// Linhas com preço/margem, ocultadas para perfis sem permissão de ver valores.
export const PRICE_LINE = /^.*(investimento total|margem praticada|valor preliminar).*$/gim;

// Reforço da busca textual (BM25) sobre a similaridade vetorial.
const FTS_LIMIT = 40;
const FTS_BOOST = 0.25;
// Roteamento (adendo 5): abaixo desta confiança a IA pode pedir esclarecimento; grau mínimo para achar um projeto pelo nome.
const MIN_CONFIANCA = 0.45;
const GRAU_PROJETO = 0.75;

// Remove da resposta da IA as frases que citam projetos fora dos resultados exibidos.
// Remove frases que citam projetos fora dos resultados, preservando os blocos (parágrafos) da resposta (CR-027).
export function onlyCitedResults(text, results) {
  const ids = new Set(results.map((r) => r.projeto_id));
  return text
    .split(/\n\s*\n/)
    .map((bloco) => bloco
      .split(/(?<=[.!?])\s+/)
      .filter((sentence) => [...sentence.matchAll(/\[(P\d{3})\]/g)].every((m) => ids.has(m[1])))
      .join(' ')
      .trim())
    // CR-060: blocos de recomendação e de perfis não entram mais na resposta (mesmo que a IA os escreva).
    .filter((bloco) => bloco && !/^(Recomendação|Perfis sugeridos)\b/i.test(bloco))
    .join('\n\n');
}

const scoreOf = (factors) => factors.reduce((s, f) => s + f.weight * f.value, 0);

function expandQuery(query) {
  const norm = normalize(query);
  const extra = Object.entries(SYNONYMS)
    .filter(([term]) => ` ${norm} `.includes(` ${term} `))
    .flatMap(([, syns]) => syns);
  return extra.length ? `${query} ${extra.join(' ')}` : query;
}

function overlapRatio(wanted, have) {
  if (!wanted.length) return null;
  const matches = wanted.filter((w) => have.includes(w));
  return { value: matches.length / wanted.length, matches };
}

// Escolhe a frase literal do trecho que mais compartilha termos com a consulta.
function bestSentence(texts, queryTokens) {
  const q = new Set(queryTokens);
  let best = null;
  for (const text of texts) {
    for (const s of sentences(text.replace(/^#+\s.*$/gm, ''))) {
      const hits = new Set(tokenize(s).filter((t) => q.has(t))).size;
      if (!best || hits > best.hits) best = { text: s.replace(/^[-*]\s*/, ''), hits };
    }
  }
  return best && best.hits > 0 ? best.text : null;
}

function section(body, title) {
  const m = body.match(new RegExp(`##\\s*\\d*\\.?\\s*${title}[^\\n]*\\n([\\s\\S]*?)(?=\\n##\\s|$)`, 'i'));
  return m ? m[1].trim() : null;
}

// Busca sem nada relevante (D06): até 3 buscas próximas que trazem resultado, tiradas dos projetos mais
// parecidos que o usuário pode ver (os candidatos já passaram pelo filtro de permissão). Não repete o que já foi pedido.
export function sugerirBuscas(candidates, entities = {}) {
  const pedidos = new Set([...(entities.segmentos ?? []), ...(entities.tecnologias ?? [])]);
  const out = [];
  const add = (q, chave) => { if (!pedidos.has(chave) && !out.some((o) => o.chave === chave) && out.length < 3) out.push({ chave, pergunta: q }); };
  const ordem = [...candidates].sort((a, b) => b.score - a.score);
  for (const c of ordem) if (c.meta.segmento) add(`Liste os projetos de ${c.meta.segmento}`, c.meta.segmento);
  for (const c of ordem) for (const t of c.meta.tecnologias ?? []) add(`Liste os projetos com ${t}`, t);
  return out.map((o) => o.pergunta);
}

// Saudação que veio junto com um pedido ("bom dia, liste…"): cumprimenta em meia frase antes da resposta (UC14.1).
export const comPrefixo = (prefixo, resposta) => (prefixo && resposta && !String(resposta).startsWith(prefixo) ? `${prefixo}! ${resposta}` : resposta);

export function semResultado(query, sugestoes) {
  const base = `Não encontrei nada relevante na base para "${query}".`;
  return sugestoes.length ? `${base} Buscas próximas que trazem resultado: ${sugestoes.map((s) => `"${s}"`).join(', ')}.`
    : `${base} Tente outro segmento, tecnologia ou tipo de serviço, ou envie mais referências para a base.`;
}

export class RadarEngine {
  constructor({ storePath = STORE_PATH, repo = null, dbPath = DB_PATH, llm = new MockLLM() } = {}) {
    this.storePath = storePath;
    this.repo = repo ?? new Repo(dbPath);
    this.llm = llm;
    this.tools = new IntentTools(this);
    this.reload();
  }

  // Recarrega índice vetorial e catálogo depois de uma nova indexação (upload ou cadastro).
  reload() {
    const store = new LocalVectorStore(this.storePath);
    this.collection = store.getCollection({ name: COLLECTION });
    this.embedder = HashingEmbedder.fromJSON(this.collection.metadata.embedder);
    const docs = this.repo.documentsForIndex();
    this.docs = new Map(docs.map((d) => [d.meta.id, d]));
    this.users = this.repo.users();
    this.opportunities = this.repo.opportunities();
    this.df = documentFrequency(docs.map((d) => d.body));
    Object.assign(this, documentVectors(this.embedder, docs));
  }

  // Documento mais confiável de um projeto entre os tipos pedidos (ex.: proposta, case).
  projectDoc(projetoId, tipos) {
    return [...this.docs.values()]
      .filter((d) => d.meta.projeto_id === projetoId && tipos.includes(d.meta.tipo_documental))
      .sort((a, b) => b.meta.nivel_confianca - a.meta.nivel_confianca)[0] ?? null;
  }

  user(id) {
    return this.users.find((u) => u.id === id) ?? this.users[0];
  }

  // Filtro de permissão (UC03.5) aplicado na própria consulta à base vetorial.
  permissionWhere(user) {
    const rules = [{ confidencialidade: { $in: user.confidencialidades } }];
    if (!user.verValores) rules.push({ contem_valores: { $ne: true } });
    return { $and: rules };
  }

  // Foco do chat: qualquer projeto visível ao usuário (ou uma oportunidade cadastrada) vira o contexto das respostas.
  focus(id, user) {
    if (!id) return null;
    const o = this.opportunities.find((x) => x.id === id);
    if (o) return o;
    const p = this.repo.project(id);
    if (!p || !user.confidencialidades.includes(p.confidencialidade)) return null;
    return {
      id: p.id, projetoId: p.id, cliente: p.cliente, titulo: p.titulo, segmento: p.segmento, status: p.status_proposta,
      descricao: [p.objetivo, p.descricao].filter(Boolean).join('\n') || p.titulo, prazoMeses: p.prazo_meses, tecnologias: p.tecnologias, servicos: p.servicos,
    };
  }

  // history: turnos anteriores da conversa (memória — UC03.3 / UC03.14), do mais antigo ao mais recente.
  // anexos: arquivos lidos nesta conversa (UC15); indiceAnexos: busca nos trechos deles; pendentes: anexos ainda não enviados à base.
  async search(query, { userId, opportunityId, history = [], anexos = [], indiceAnexos = null, pendentes = 0 } = {}) {
    const t0 = Date.now();
    const user = this.user(userId);
    const opp = this.focus(opportunityId, user);
    const original = query;

    // Adendo 6: pré-roteamento por regras. Saudação, agradecimento, dúvida de uso e pedidos sobre o arquivo anexado
    // são resolvidos sem a IA; "bom dia, liste…" cumprimenta e segue com o pedido.
    const pre = preRotear(query, { anexos, pendentes });
    const prefixo = pre?.saudacao && (pre.resto || (pre.skill && pre.skill !== 'conversa')) ? pre.saudacao : null;
    if (pre?.resto) query = pre.resto;
    const ctxSkill = { original, user, opp, history, anexos, indiceAnexos, pendentes, prefixo };
    if (pre?.skill) return this.runSkill(pre, { ...ctxSkill, query, t0 });

    // UC03.2 / UC03.3 — interpretação da pergunta considerando o histórico da conversa.
    const u = await this.llm.understand({ query, history, opportunity: opp, anexos, pendentes });
    const entendimento = {
      intencao: u.intencao,
      confianca: u.confianca ?? 1,
      continuacao: u.continuacao,
      consulta: u.consulta,
      termos: u.termos ?? [],
      entidades: { segmentos: u.segmentos, tecnologias: u.tecnologias, servicos: u.servicos, prazoMeses: u.prazoMeses },
    };
    const iaStatus = [u.ia];
    const base = { query: original, entendimento, oportunidade: opp, usuario: { id: user.id, nome: user.nome, perfil: user.perfil } };
    const finish = (out) => ({ ...base, complementares: [], candidatosAvaliados: 0, poucasReferencias: false, ...out, resposta: comPrefixo(prefixo, out.resposta), ia: this.iaSummary(iaStatus), tempoMs: Date.now() - t0 });

    // Skills do registro escolhidas pela IA (adendo 6).
    const pelaIA = { conversa: { skill: 'conversa', tipo: u.conversa ?? 'nao_entendi' }, fora_dominio: { skill: 'conversa', tipo: 'fora_escopo' }, ajuda: { skill: 'ajuda' } }[u.intencao]
      ?? (u.intencao === 'anexo' && anexos.length ? { skill: 'anexo', acao: u.acao ?? 'perguntar' } : null)
      ?? (u.intencao === 'enviar_arquivo' && pendentes > 0 ? { skill: 'enviar_arquivo' } : null);
    if (pelaIA) return this.runSkill(pelaIA, { ...ctxSkill, query, t0, iaStatus, entendimento });

    // UC03.14 — pedido de detalhe de um resultado da resposta anterior.
    if (u.intencao === 'detalhar' && u.referencia) {
      const last = [...history].reverse().find((t) => t.resultadosCompletos?.length);
      const result = last?.resultadosCompletos?.[u.referencia - 1];
      if (result) {
        return finish({
          entidades: last.entidades ?? entendimento.entidades,
          resposta: this.llm.describe({ result, position: u.referencia }),
          semEvidencia: false,
          resultados: [{ ...result, expandir: true }],
        });
      }
    }

    // Adendo 5: listagem, contagem, ficha, comparação, esclarecimento e perguntas compostas têm resposta própria.
    // Só "buscar" segue para a busca de projetos parecidos.
    const roteada = await this.route(u, { query, history, user, finish, entendimento, iaStatus });
    if (roteada) return roteada;
    entendimento.intencao = 'buscar';

    // UC14.6: sem assunto, sem contexto e sem foco não há o que buscar — "não entendi" com exemplos, em vez de "Não encontrei".
    const temEntidades = u.segmentos.length + u.tecnologias.length + u.servicos.length > 0;
    if (!u.continuacao && !opp && !temEntidades && !temAssunto(query, { segmentos: [], tecnologias: [], servicos: [] })) {
      return this.runSkill({ skill: 'conversa', tipo: 'nao_entendi' }, { ...ctxSkill, query, t0, iaStatus, entendimento });
    }

    const entities = {
      segmentos: [...new Set([...u.segmentos, ...(opp ? [opp.segmento] : [])])],
      tecnologias: [...new Set([...u.tecnologias, ...(opp?.tecnologias ?? [])])],
      servicos: [...new Set([...u.servicos, ...(opp?.servicos ?? [])])],
      prazoMeses: u.prazoMeses ?? opp?.prazoMeses ?? null,
    };
    const effectiveQuery = expandQuery([u.consulta, entendimento.termos.join(' '), opp?.descricao].filter(Boolean).join('\n'));

    // UC03.4 + UC03.5 — recuperação semântica já filtrada por permissão.
    const where = this.permissionWhere(user);
    const [qv] = this.embedder.embed([effectiveQuery]);
    const hits = this.collection.query({ queryEmbeddings: [qv], nResults: 80, where });
    // Busca híbrida: trechos que também aparecem no índice textual (BM25) têm a similaridade ampliada conforme a posição.
    // O reforço é multiplicativo: amplia similaridade que já existe, sem criar relevância para trechos sem relação.
    const fts = this.repo.ftsChunks([u.consulta, ...entendimento.termos].join(' '), user, FTS_LIMIT);

    const byProject = new Map();
    hits.ids[0].forEach((id, i) => {
      const meta = hits.metadatas[0][i];
      if (opp?.projetoId && meta.projeto_id === opp.projetoId) return;
      const pos = fts.get(id);
      const sim = (1 - hits.distances[0][i]) * (pos == null ? 1 : 1 + FTS_BOOST * (1 - pos / FTS_LIMIT));
      const entry = byProject.get(meta.projeto_id) ?? { meta, chunks: [] };
      entry.chunks.push({ id, sim, text: hits.documents[0][i], meta, bm25: pos != null });
      byProject.set(meta.projeto_id, entry);
    });
    for (const e of byProject.values()) e.chunks.sort((a, b) => b.sim - a.sim);
    const maxSim = Math.max(0.0001, ...[...byProject.values()].map((e) => e.chunks[0].sim));

    // UC03.6 — score multi-fator; fatores sem sinal na pergunta não entram e os pesos são renormalizados.
    const candidates = [...byProject.values()].map(({ meta, chunks }) => {
      const top = chunks.slice(0, 3);
      const contentRaw = top[0].sim * 0.7 + (top.reduce((s, c) => s + c.sim, 0) / top.length) * 0.3;
      const factors = [{ key: 'conteudo', value: Math.min(1, contentRaw / maxSim), raw: contentRaw }];
      const seg = overlapRatio(entities.segmentos, [meta.segmento]);
      if (seg) factors.push({ key: 'segmento', value: seg.value > 0 ? 1 : 0, matches: seg.matches });
      const tec = overlapRatio(entities.tecnologias, meta.tecnologias);
      if (tec) factors.push({ key: 'tecnologias', ...tec });
      const srv = overlapRatio(entities.servicos, meta.servicos);
      if (srv) factors.push({ key: 'servicos', ...srv });
      const prazo = this.projectFacts(meta.projeto_id, where).prazo;
      if (entities.prazoMeses && prazo) {
        const diff = Math.abs(prazo.value - entities.prazoMeses);
        factors.push({ key: 'porte', value: Math.max(0, 1 - diff / Math.max(prazo.value, entities.prazoMeses)) });
      }
      factors.push({ key: 'status', value: STATUS_WEIGHT[meta.status_proposta] ?? 0.5 });
      const totalWeight = factors.reduce((s, f) => s + WEIGHTS[f.key], 0);
      const weighted = factors.map((f) => ({ ...f, label: FACTOR_LABEL[f.key], weight: WEIGHTS[f.key] / totalWeight }));
      return { meta, chunks, factors: weighted, score: scoreOf(weighted) };
    });

    // Análise semântica pela IA: reavalia os melhores candidatos pelo significado e escreve a resposta.
    const queryTokens = tokenize(effectiveQuery);
    const pool = candidates
      .filter((c) => c.factors[0].raw >= MIN_CONTENT / 2)
      .sort((a, b) => b.score - a.score)
      .slice(0, SEMANTIC_POOL);
    const briefs = pool.map((c) => this.candidateBrief(c, user));
    const analysis = await this.llm.analyze({ query: u.consulta, history, candidates: briefs, user });
    if (analysis?.ia) iaStatus.push(analysis.ia);
    const semantic = analysis && Object.keys(analysis.avaliacoes ?? {}).length > 0;

    let ranked;
    if (semantic) {
      pool.forEach((c, i) => {
        const a = analysis.avaliacoes[c.meta.projeto_id] ?? { relevancia: 0 };
        const evidence = briefs[i].frases.find((f) => f.id === a.evidencia)?.texto ?? null;
        const content = c.factors[0];
        content.value = Math.round(((1 - SEMANTIC_BLEND) * content.value + SEMANTIC_BLEND * a.relevancia) * 1000) / 1000;
        content.label = `${FACTOR_LABEL.conteudo} (análise semântica)`;
        c.semantic = { ...a, evidence };
        c.score = scoreOf(c.factors);
      });
      // UC03.7 — a IA pode descartar candidatos irrelevantes; o corte mínimo de score continua valendo.
      ranked = pool
        .filter((c) => c.semantic.relevancia >= MIN_RELEVANCE && c.score >= MIN_SCORE)
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_RESULTS);
    } else {
      // UC03.7 — ranking com corte mínimo; nunca completa a lista com resultados fracos.
      ranked = candidates
        .filter((c) => c.score >= MIN_SCORE && c.factors[0].raw >= MIN_CONTENT)
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_RESULTS);
    }
    const results = ranked.map((c) => this.toResult(c, queryTokens, user, where));

    // UC04 — áreas/serviços complementares recorrentes nos resultados.
    const counts = new Map();
    for (const r of results) {
      for (const s of r.servicos) {
        if (entities.servicos.includes(s)) continue;
        const item = counts.get(s) ?? { servico: s, projetos: [] };
        item.projetos.push({ projeto_id: r.projeto_id, cliente: r.cliente });
        counts.set(s, item);
      }
    }
    const complementares = [...counts.values()].filter((c) => c.projetos.length >= 2 || results.length <= 2).sort((a, b) => b.projetos.length - a.projetos.length);

    const lowEvidence = results.length > 0 && results.length < 3;
    // Sem resultados (UC03.12, decisão D06 de 12/11): diz que não achou nada relevante e sugere buscas próximas
    // que trazem resultado. Cada sugestão é um segmento ou tecnologia de projetos que o usuário pode ver.
    // CR-042 / D07: pedido de um projeto específico (ex.: "ficha do P005") que o perfil não pode ver ou que não existe:
    // avisa e oferece, em uma frase, buscar projetos parecidos pelo tema; não lista referências que não foram pedidas
    // e não revela se o projeto existe (projeto confidencial é invisível para quem não tem permissão).
    const codigo = !results.length && /\bP\d{3}\b/i.exec(query)?.[0].toUpperCase();
    if (codigo) {
      return finish({ entidades: entities, resposta: `Não encontrei o ${codigo} entre os projetos que o seu perfil pode ver. Se quiser, me diga o tema e eu busco projetos parecidos que você pode ver.`, sugestoes: [], semEvidencia: true, resultados: [], candidatosAvaliados: candidates.length });
    }
    const sugestoes = results.length ? [] : sugerirBuscas(candidates, entities);
    const resposta = results.length && semantic && analysis.resposta
      ? onlyCitedResults(analysis.resposta, results) || this.llm.compose({ query, results, complementares, lowEvidence })
      : results.length ? this.llm.compose({ query, results, complementares, lowEvidence }) : semResultado(query, sugestoes);
    return finish({
      entidades: entities,
      resposta,
      sugestoes,
      poucasReferencias: lowEvidence,
      semEvidencia: results.length === 0,
      resultados: results,
      complementares,
      candidatosAvaliados: candidates.length,
    });
  }

  // ---------- Skills do registro (adendo 6): conversa, ajuda, arquivo na conversa e envio ----------
  async runSkill(d, { query, original, user, opp, history, anexos, indiceAnexos, pendentes, prefixo, t0, iaStatus = [], entendimento = null }) {
    const ent = entendimento ?? { intencao: d.skill, confianca: 1, continuacao: false, consulta: query, termos: [], entidades: { segmentos: [], tecnologias: [], servicos: [], prazoMeses: null } };
    ent.intencao = d.skill;
    ent.skill = d.skill;
    if (!entendimento) iaStatus.push({ provedor: 'regras', fallback: false, regras: true });
    const responder = (tipoResposta, out) => {
      ent.tipoResposta = tipoResposta;
      return {
        query: original, entendimento: ent, oportunidade: opp, usuario: { id: user.id, nome: user.nome, perfil: user.perfil },
        complementares: [], candidatosAvaliados: 0, poucasReferencias: false, entidades: ent.entidades, semEvidencia: false, resultados: [], tipoResposta,
        ...out, resposta: comPrefixo(prefixo, out.resposta), ia: this.iaSummary(iaStatus), tempoMs: Date.now() - t0,
      };
    };
    if (d.skill === 'conversa') {
      const r = await responderConversaIA(d.tipo, { user, capacidades: capacidades(user), query: original, prefixo: d.tipo === 'saudacao' ? '' : d.saudacao, llm: this.llm, history });
      if (r.ia) iaStatus.push(r.ia);
      const { ia, ...resto } = r;
      return responder('conversa', resto);
    }
    if (d.skill === 'ajuda') return responder('ajuda', await responderAjuda({ query, llm: this.llm }));
    if (d.skill === 'anexo') {
      if (!anexos.length) return this.runSkill({ skill: 'conversa', tipo: 'sem_anexo' }, { query, original, user, opp, history, anexos, indiceAnexos, pendentes, prefixo, t0, iaStatus, entendimento });
      if (d.acao === 'parecidos') {
        const consulta = consultaDoAnexo(anexos);
        const r = await this.search(consulta, { userId: user.id, history: [] });
        const nome = anexos[anexos.length - 1].nome;
        return { ...r, query: original, entendimento: { ...r.entendimento, skill: 'anexo', consulta }, resposta: comPrefixo(prefixo, `Busquei na base projetos parecidos com o arquivo "${nome}".\n\n${r.resposta}`), tempoMs: Date.now() - t0 };
      }
      if (d.acao === 'perguntar' && indiceAnexos) return responder('anexo', await perguntarAnexo({ query, indice: indiceAnexos, llm: this.llm }));
      const r = await resumirAnexos({ anexos, llm: this.llm, user, pendentes, podeCriar: can(user, 'cadastrarProjeto') });
      if (r.ia) iaStatus.push(r.ia);
      return responder('anexo', r);
    }
    if (d.skill === 'enviar_arquivo') {
      const projetos = this.tools.visible(user).itens.map((p) => ({ id: p.id, titulo: p.titulo, cliente: p.cliente, segmento: p.segmento }));
      const foco = opp?.projetoId ? projetos.find((p) => p.id === opp.projetoId) ?? null : null;
      const dest = destinoDoEnvio(query, { projetos, foco });
      const n = pendentes > 1 ? `os ${pendentes} arquivos` : 'o arquivo';
      const resposta = dest.codigoInvalido ? `Não encontrei o ${dest.codigoInvalido} entre os projetos que você pode ver. Para qual projeto vai ${n}? Nada foi enviado ainda.`
        : dest.projeto ? `Vou enviar ${n} para ${dest.projeto.titulo} (${dest.projeto.cliente}). ${pendentes > 1 ? 'Eles só entram' : 'Ele só entra'} na base depois da sua aprovação.`
          : dest.opcoes.length ? `Encontrei ${dest.opcoes.length > 1 ? `${dest.opcoes.length} projetos que combinam` : 'este projeto'}. Para qual vai ${n}? Nada foi enviado ainda.`
            : `Para qual projeto vai ${n}? Diga o cliente ou o código (ex.: "coloca no projeto P003") ou escolha um em "Proposta em foco". Nada foi enviado ainda.${can(user, 'cadastrarProjeto') ? ' Se for um projeto novo, use "Criar projeto com este arquivo".' : ' Se for um projeto que ainda não existe, peça ao gestor para cadastrá-lo e envie depois.'}`;
      return responder('enviar_arquivo', { resposta, dados: { projeto: dest.projeto, opcoes: dest.opcoes, podeCriar: can(user, 'cadastrarProjeto') } });
    }
    return null;
  }

  // ---------- Roteamento por intenção (UC03.17–UC03.23) ----------
  async route(u, { query, history, user, finish, entendimento, iaStatus }) {
    const norm = normalize(query);
    const ultimo = history[history.length - 1];
    let intencao = u.intencao;
    // Segunda opinião por regras: um pedido claro de listagem ou contagem não vira busca de parecidos.
    if (intencao === 'buscar' && !u.continuacao) {
      const r = classificar(query).intencao;
      if (['listar', 'agregar'].includes(r)) intencao = r;
    }
    const filtros = {
      segmentos: u.segmentos ?? [], tecnologias: u.tecnologias ?? [], servicos: u.servicos ?? [],
      status: u.filtros?.status ?? [], cliente: u.filtros?.cliente ?? '', anoDe: u.filtros?.anoDe ?? null, anoAte: u.filtros?.anoAte ?? null,
    };
    const responder = (tipoResposta, out) => {
      entendimento.intencao = intencao;
      entendimento.tipoResposta = tipoResposta;
      return finish({ entidades: entendimento.entidades, semEvidencia: false, resultados: [], tipoResposta, ...out });
    };

    // UC03.22: esclarecer só com opções e nunca duas vezes seguidas.
    const opcoes = (u.opcoes ?? []).filter(Boolean);
    if ((intencao === 'esclarecer' || ((u.confianca ?? 1) < MIN_CONFIANCA && intencao !== 'buscar')) && opcoes.length >= 2 && ultimo?.tipoResposta !== 'esclarecimento') {
      return responder('esclarecimento', { resposta: 'Quero ter certeza de que entendi. Qual destas perguntas você quis fazer?', dados: { opcoes } });
    }
    if (intencao === 'esclarecer') intencao = classificar(query).intencao;

    // Retomada da resposta anterior ("quais os resultados neles?"): responde sobre os mesmos projetos,
    // em vez de fazer uma busca nova que troca o conjunto.
    if (ultimo && !['comparar', 'composta'].includes(intencao) && referenciaAnterior(norm)) {
      const r = this.followUp(u, norm, user, ultimo);
      if (r) return responder(r.tipo, r.out);
    }

    // UC03.23: pergunta composta, a IA escolhe as ferramentas. Sem suporte ou com falha, volta para o roteador.
    if (intencao === 'composta') {
      if (typeof this.llm.runTools === 'function') {
        try {
          return await this.composite(query, { history, user, responder, iaStatus });
        } catch (err) {
          iaStatus.push(this.llm.fallbackStatus?.(err) ?? { provedor: 'mock', fallback: true, erro: err.message });
        }
      }
      intencao = classificar(query).intencao;
      if (intencao === 'composta') intencao = 'buscar';
    }

    if (intencao === 'comparar') {
      const ids = this.resolveProjects(u, query, user, ultimo, { max: 4 });
      if (ids.length >= 2) {
        const fichas = ids.map((id) => this.tools.ficha(user, id, ['cliente', 'segmento', 'status_proposta', 'prazo_meses', 'valor', 'tecnologias', 'servicos', 'objetivo'])).filter(Boolean);
        return responder('comparacao', { resposta: textoComparacao(fichas), dados: { fichas } });
      }
      return responder('esclarecimento', { resposta: 'Quais projetos você quer comparar? Diga os nomes ou os códigos (ex.: P006 e P015), ou peça depois de uma resposta com projetos.', dados: { opcoes: [] } });
    }

    if (intencao === 'ficha') {
      const candidatos = this.findProjects(u, query, user);
      const campos = u.campos?.length ? u.campos : camposPedidos(norm);
      if (candidatos.length > 1 && candidatos[0].grau - candidatos[1].grau < 0.1) {
        return responder('esclarecimento', {
          resposta: 'Encontrei mais de um projeto com esse nome. De qual você quer a ficha?',
          dados: { opcoes: candidatos.slice(0, 3).map((c) => `Ficha do projeto ${c.projeto_id} (${c.titulo}, ${c.cliente})`) },
        });
      }
      if (candidatos.length) {
        const f = this.tools.ficha(user, candidatos[0].projeto_id, campos);
        if (f) return responder('ficha', { resposta: textoFicha(f), dados: { ficha: f } });
      }
      intencao = 'buscar';
    }

    if (intencao === 'agregar') {
      const campo = u.agruparPor ?? agrupamentoPedido(norm) ?? 'segmento';
      // "Áreas" é ambíguo (segmento do cliente, prática NTT ou serviço): responde por um e oferece os outros.
      const alternativas = /\b(areas?|setores?)\b/.test(norm) ? ['segmento', 'area', 'servico'].filter((c) => c !== campo) : [];
      const r = this.tools.contar(user, campo, filtros);
      return responder('contagem', { resposta: textoContagem(r, { alternativas }), dados: { ...r, alternativas }, semEvidencia: r.total === 0 });
    }

    if (intencao === 'listar') {
      // Pedido por tema ("liste projetos de churn") é busca de parecidos, não inventário.
      const viaRegras = u.intencao !== 'listar' || !u.ia || u.ia.fallback;
      if (!(viaRegras && temAssunto(query, filtros))) {
        const r = this.tools.listar(user, filtros);
        return responder('listagem', { resposta: textoListagem(r), dados: r, semEvidencia: r.total === 0 });
      }
    }
    return null;
  }

  // Projetos da resposta anterior: os mostrados nela ou, se era uma contagem, os que entraram na conta.
  previousSet(user, ultimo, max = 8) {
    let ids = [...new Set(ultimo.mostrados ?? [])];
    let total = ids.length;
    if (!ids.length && ultimo.tipoResposta === 'contagem') {
      const r = this.tools.listar(user, ultimo.filtros ?? {});
      ids = r.itens.map((i) => i.projeto_id);
      total = r.total;
    }
    return { ids: ids.filter((id) => this.repo.projectDetail(id, user)).slice(0, max), total };
  }

  // Resultados registrados de um projeto: seção "Resultados" do case ou da ata que o usuário pode ver.
  projectResults(id, user) {
    const f = this.tools.ficha(user, id, ['status_proposta']);
    if (!f) return null;
    const p = { titulo: f.titulo, cliente: f.cliente, status_proposta: f.campos[0].valor };
    const doc = [...this.docs.values()]
      .filter((d) => d.meta.projeto_id === id && ['case_sucesso', 'ata_validada'].includes(d.meta.tipo_documental) && user.confidencialidades.includes(d.meta.confidencialidade))
      .sort((a, b) => b.meta.nivel_confianca - a.meta.nivel_confianca)[0];
    const secao = doc ? section(doc.body, 'Resultados') : null;
    const resultados = (secao ?? '').split('\n').map((l) => l.replace(/^[-*\d.)\s]+/, '').trim()).filter((l) => l.length > 3).slice(0, 4);
    return { projeto_id: id, titulo: p.titulo, cliente: p.cliente, status: p.status_proposta, resultados, fonte: resultados.length ? { doc_id: doc.meta.doc_id, tipo: doc.meta.tipo_documental } : null };
  }

  followUp(u, norm, user, ultimo) {
    const { ids, total } = this.previousSet(user, ultimo);
    if (!ids.length) return null;
    const origem = `da resposta anterior${total > ids.length ? ` (os ${ids.length} primeiros de ${total})` : ''}`;
    if (pedeResultados(norm)) {
      const itens = ids.map((id) => this.projectResults(id, user)).filter(Boolean).sort((x, y) => (y.resultados.length > 0) - (x.resultados.length > 0));
      return { tipo: 'resultados', out: { resposta: textoResultados(itens, { origem }), dados: { projetos: itens, total } } };
    }
    const campos = u.campos?.length ? u.campos : camposPedidos(norm);
    if (campos.length) {
      const fichas = ids.map((id) => this.tools.ficha(user, id, ['cliente', ...campos.filter((c) => c !== 'cliente')])).filter(Boolean);
      return { tipo: 'comparacao', out: { resposta: textoFichas(fichas, { origem }), dados: { fichas } } };
    }
    return null;
  }

  // Projetos citados na pergunta: códigos, nomes devolvidos pela IA ou o próprio texto.
  findProjects(u, query, user) {
    const textos = [...(u.projetos ?? []), query];
    const vistos = new Map();
    for (const t of textos) {
      for (const c of this.tools.localizar(user, t)) if (!vistos.has(c.projeto_id) || vistos.get(c.projeto_id).grau < c.grau) vistos.set(c.projeto_id, c);
    }
    return [...vistos.values()].filter((c) => c.grau >= GRAU_PROJETO).sort((a, b) => b.grau - a.grau);
  }

  // Para comparar: projetos citados ou, se a pergunta se refere à resposta anterior ("os dois", "1 e 3"), os mostrados nela.
  resolveProjects(u, query, user, ultimo, { max = 4 } = {}) {
    const norm = normalize(query);
    const ids = [];
    for (const nome of u.projetos ?? []) {
      const c = this.tools.localizar(user, nome)[0];
      if (c && c.grau >= GRAU_PROJETO) ids.push(c.projeto_id);
    }
    for (const m of query.matchAll(/\bP\d{3}\b/gi)) ids.push(m[0].toUpperCase());
    const mostrados = ultimo?.mostrados ?? [];
    if (ids.length < 2 && mostrados.length >= 2) {
      const posicoes = [...norm.matchAll(/\b([1-5])\b/g)].map((m) => Number(m[1]));
      if (posicoes.length >= 2) ids.push(...posicoes.map((p) => mostrados[p - 1]).filter(Boolean));
      else if (/\b(os dois|as duas|ambos|esses|estes|eles|os tres|todos)\b/.test(norm)) ids.push(...mostrados.slice(0, /\btres\b/.test(norm) ? 3 : 2));
    }
    if (ids.length < 2) for (const c of this.findProjects(u, query, user)) ids.push(c.projeto_id);
    return [...new Set(ids)].filter((id) => this.repo.projectDetail(id, user)).slice(0, max);
  }

  // UC03.23: a IA chama as ferramentas; o servidor executa com as permissões do usuário.
  async composite(query, { history, user, responder, iaStatus }) {
    // Despachante único (adendo 6): o mesmo registro de ferramentas para todas as skills.
    const exec = async (nome, a = {}) => executarFerramenta({ engine: this, user, vocab: VOCAB }, nome, a);
    const out = await this.llm.runTools({ query, history, tools: toolSchemas(VOCAB), execute: exec });
    if (out.ia) iaStatus.push(out.ia);
    const ids = [...new Set(out.passos.flatMap((p) => p.ids ?? []))];
    const blocos = out.passos.filter((p) => p.tipo).map((p) => ({ tipo: p.tipo, ferramenta: p.ferramenta, dados: p.dados }));
    const texto = onlyCitedResults(out.resposta || '', ids.map((projeto_id) => ({ projeto_id })))
      || (blocos.length ? 'Reuni as informações abaixo a partir da base.' : 'Para essa pergunta, a resposta fica melhor em partes: peça primeiro a lista e depois a comparação ou o detalhe.');
    return responder('composta', {
      resposta: texto,
      dados: { blocos },
      ferramentas: out.passos.map((p) => ({ ferramenta: p.ferramenta, parametros: p.parametros, itens: p.ids?.length ?? 0 })),
      semEvidencia: !blocos.length,
    });
  }

  // Busca de parecidos sem a análise da IA (usada como ferramenta dentro da pergunta composta).
  quickSimilar(texto, user, filtros = {}, limite = 5) {
    if (!texto.trim()) return [];
    const [qv] = this.embedder.embed([expandQuery(texto)]);
    const hits = this.collection.query({ queryEmbeddings: [qv], nResults: 60, where: this.permissionWhere(user) });
    const best = new Map();
    hits.ids[0].forEach((id, i) => {
      const m = hits.metadatas[0][i];
      const sim = 1 - hits.distances[0][i];
      if (filtros.segmentos?.length && !filtros.segmentos.includes(m.segmento)) return;
      if (filtros.status?.length && !filtros.status.includes(m.status_proposta)) return;
      if (!best.has(m.projeto_id) || best.get(m.projeto_id).similaridade < sim) {
        best.set(m.projeto_id, { projeto_id: m.projeto_id, titulo: m.titulo, cliente: m.cliente, segmento: m.segmento, status: m.status_proposta, similaridade: Math.round(sim * 1000) / 1000 });
      }
    });
    return [...best.values()].sort((a, b) => b.similaridade - a.similaridade).slice(0, limite);
  }

  iaSummary(statuses) {
    const list = statuses.filter(Boolean);
    const failed = list.find((s) => s.fallback);
    if (failed) return failed;
    // Resposta resolvida só pelas regras do registro de skills (sem chamar a IA).
    if (list.length && list.every((s) => s.regras)) return { provedor: 'regras', modelo: 'skills', fallback: false };
    return { provedor: this.llm.provider ?? 'mock', modelo: this.llm.name, fallback: false };
  }

  // Resumo de um candidato para a IA. Só usa trechos já filtrados por permissão; linhas de preço são
  // removidas para perfis sem acesso a valores.
  candidateBrief(c, user) {
    const { meta } = c;
    const clean = (text) => (text && !user.verValores ? text.replace(PRICE_LINE, '') : text);
    const seen = new Set();
    const frases = [];
    for (const chunk of c.chunks.slice(0, 3)) {
      for (const s of sentences(chunk.text.replace(/^#+\s.*$/gm, ''))) {
        const texto = s.replace(/^[-*]\s*/, '');
        if (texto.length < 25 || seen.has(texto) || (!user.verValores && PRICE_PATTERN.test(texto))) continue;
        seen.add(texto);
        frases.push({ id: `${meta.projeto_id}-${frases.length + 1}`, texto: texto.slice(0, 320) });
        if (frases.length >= 8) break;
      }
      if (frases.length >= 8) break;
    }
    const proposta = this.projectDoc(meta.projeto_id, ['proposta_comercial', 'sow', 'ficha_cadastro']);
    const lessonsDoc = this.projectDoc(meta.projeto_id, ['ata_validada', 'case_sucesso']);
    return {
      projeto_id: meta.projeto_id,
      titulo: meta.titulo,
      cliente: meta.cliente,
      segmento: meta.segmento,
      status: meta.status_proposta,
      tecnologias: meta.tecnologias,
      servicos: meta.servicos,
      objetivo: clean(proposta ? section(proposta.body, 'Objetivo') : null),
      licoes: clean(lessonsDoc ? section(lessonsDoc.body, 'Lições')?.slice(0, 600) : null),
      frases,
    };
  }

  // Fatos por projeto com resolução de conflito pela hierarquia de confiança (UC03.8).
  projectFacts(projetoId, where) {
    const rows = this.collection.get({ where: { $and: [{ projeto_id: projetoId }, where] } }).metadatas;
    const perDoc = new Map(rows.map((m) => [m.doc_id, m]));
    const resolve = (field) => {
      const values = [...perDoc.values()].filter((m) => m[field] != null).sort((a, b) => b.nivel_confianca - a.nivel_confianca);
      if (!values.length) return null;
      const chosen = values[0];
      const divergent = values.filter((m) => m[field] !== chosen[field]);
      return {
        value: chosen[field],
        fonte: chosen.doc_id,
        tipoFonte: chosen.tipo_documental,
        conflito: divergent.length
          ? {
              valores: values.map((m) => ({ doc: m.doc_id, tipo: m.tipo_documental, valor: m[field], confianca: m.nivel_confianca })),
              motivo: `Usado ${chosen[field]} de ${chosen.doc_id} (${TRUST_LABEL[chosen.nivel_confianca]}), que tem precedência sobre ${divergent.map((d) => `${d[field]} em ${d.doc_id} (${TRUST_LABEL[d.nivel_confianca]})`).join('; ')}.`,
            }
          : null,
      };
    };
    return { prazo: resolve('prazo_meses'), valor: resolve('valor') };
  }

  toResult(c, queryTokens, user, where) {
    const { meta } = c;
    const facts = this.projectFacts(meta.projeto_id, where);
    const evidenceChunks = c.chunks.slice(0, 3);
    const evidence = bestSentence(evidenceChunks.map((x) => x.text), queryTokens);
    const proposta = this.projectDoc(meta.projeto_id, ['proposta_comercial', 'sow', 'ficha_cadastro']);
    const caseDoc = this.projectDoc(meta.projeto_id, ['case_sucesso', 'ata_validada']);
    const body = proposta?.body ?? '';
    const fontes = [...new Map(c.chunks.map((x) => [x.meta.doc_id, x.meta])).values()].map((m) => ({
      doc_id: m.doc_id,
      tipo: m.tipo_documental,
      confianca: m.nivel_confianca,
      arquivo: m.arquivo,
      link: m.link_sharepoint,
    }));
    return {
      projeto_id: meta.projeto_id,
      titulo: meta.titulo,
      cliente: meta.cliente,
      segmento: meta.segmento,
      tecnologias: meta.tecnologias,
      servicos: meta.servicos,
      status: meta.status_proposta,
      score: Math.round(c.score * 1000) / 1000,
      fatores: c.factors.map((f) => ({ fator: f.label, peso: Math.round(f.weight * 100) / 100, valor: Math.round(f.value * 100) / 100, matches: f.matches ?? [] })),
      resumo: section(body, 'Objetivo'),
      justificativa: c.semantic?.justificativa
        ? `${c.semantic.justificativa}${(c.semantic.evidence ?? evidence) ? ` Evidência: “${c.semantic.evidence ?? evidence}”` : ''}`
        : this.llm.justify({ factors: c.factors, evidence }),
      relevanciaSemantica: c.semantic ? c.semantic.relevancia : null,
      evidencias: evidenceChunks.map((x) => ({ doc_id: x.meta.doc_id, tipo: x.meta.tipo_documental, trecho: x.text, similaridade: Math.round(x.sim * 1000) / 1000 })),
      fontes,
      detalhes: {
        problema: section(body, 'Contexto'),
        escopo: section(body, 'Escopo'),
        entregaveis: section(body, 'Entregáveis'),
        equipe: section(body, 'Equipe'),
        resultados: caseDoc ? section(caseDoc.body, 'Resultados') : null,
        licoes: caseDoc ? section(caseDoc.body, 'Lições') : null,
        prazoMeses: facts.prazo?.value ?? null,
        valor: user.verValores ? facts.valor?.value ?? null : undefined,
      },
      conflitos: [facts.prazo?.conflito && { campo: 'prazo_meses', ...facts.prazo.conflito }, user.verValores && facts.valor?.conflito && { campo: 'valor', ...facts.valor.conflito }].filter(Boolean),
    };
  }
}
