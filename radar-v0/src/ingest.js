// Carga e indexação da base.
//   seed:   importa a massa piloto (data/corpus + usuários + oportunidades) para o banco relacional.
//   índice: lê os documentos do banco, gera trechos e embeddings, grava a base vetorial e calcula
//           vetores por documento/projeto e projetos relacionados.
// Uso: node src/ingest.js            (cria o banco com a massa piloto se estiver vazio e reindexa)
//      node src/ingest.js --reset    (apaga o banco e recomeça só com a massa piloto)

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { readCorpus } from './corpus.js';
import { chunkText, tokenize } from './text.js';
import { HashingEmbedder } from './embedder.js';
import { LocalVectorStore } from './vectorstore.js';
import { Repo } from './db/repo.js';
import { analyzeText } from './analysis.js';
import { SEGMENTS, TECHNOLOGIES, SERVICES } from './lexicon.js';
import { ROOT, SEED_DIR, CORPUS_DIR, DB_PATH, STORE_PATH } from './config.js';

export { ROOT, STORE_PATH };
export const COLLECTION = 'propostas_cases';

// Trechos com preço/margem da proposta (não resultados do cliente) ficam restritos a perfis com verValores.
export const PRICE_PATTERN = /investimento total|margem praticada|valor preliminar|valor de refer/i;

export function buildChunks(docs) {
  const chunks = [];
  for (const { meta, body } of docs) {
    chunkText(body).forEach((text, i) => {
      chunks.push({
        id: `${meta.id}#${i}`,
        text,
        // O cabeçalho dá contexto ao embedding de cada trecho (cliente, tipo e título).
        embedText: `${meta.cliente}. ${meta.titulo}. ${meta.segmento}. ${(meta.tecnologias ?? []).join(' ')}.\n${text}`,
        metadata: {
          doc_id: meta.id,
          projeto_id: meta.projeto_id,
          cliente: meta.cliente,
          titulo: meta.titulo,
          tipo_documental: meta.tipo_documental,
          status_documento: meta.status_documento,
          nivel_confianca: meta.nivel_confianca,
          confidencialidade: meta.confidencialidade,
          segmento: meta.segmento,
          tecnologias: meta.tecnologias ?? [],
          servicos: meta.servicos ?? [],
          area: meta.area,
          status_proposta: meta.status_proposta,
          data: meta.data,
          prazo_meses: meta.prazo_meses ?? null,
          valor: meta.valor ?? null,
          margem: meta.margem ?? null,
          arquivo: meta.arquivo,
          link_sharepoint: meta.link_sharepoint,
          chunk_index: i,
          contem_valores: PRICE_PATTERN.test(text),
        },
      });
    });
  }
  return chunks;
}

// Converte a análise de metadados em linhas de documento_entidade.
export function entityRows(s) {
  const rows = [];
  const add = (tipo, list) => {
    for (const e of list ?? []) {
      if (e?.valor == null || e.valor === '') continue;
      rows.push({ tipo, valor: e.papel ? `${e.valor} (${e.papel})` : e.valor, trecho: e.evidencia ?? null, confianca: e.confianca, metodo: e.metodo });
    }
  };
  const e = s.entidades ?? {};
  add('pessoa', e.pessoas);
  add('organizacao', e.organizacoes);
  add('kpi', e.kpis);
  add('risco', e.riscos);
  add('licao', e.licoes);
  add('data', e.datas);
  add('prazo', e.prazos);
  add('valor_monetario', e.valores);
  add('palavra_chave', (s.palavras_chave ?? []).map((k) => ({ valor: k, confianca: 0.6, metodo: 'tfidf' })));
  for (const p of s.pii ?? []) rows.push({ tipo: 'pii', valor: `${p.tipo}: ${p.valor}`, confianca: 0.9, metodo: 'regras' });
  return rows;
}

export const trechoRows = (texto) => chunkText(texto).map((t) => ({ texto: t, contem_valores: PRICE_PATTERN.test(t) }));

// Estatística de documentos por radical (para palavras-chave e resumo por TF-IDF).
export function documentFrequency(texts) {
  const df = new Map();
  for (const t of texts) for (const tok of new Set(tokenize(t))) df.set(tok, (df.get(tok) ?? 0) + 1);
  return df;
}

export function seed(repo) {
  const users = JSON.parse(fs.readFileSync(path.join(SEED_DIR, 'usuarios.json'), 'utf8'));
  const opps = JSON.parse(fs.readFileSync(path.join(SEED_DIR, 'oportunidades.json'), 'utf8'));
  const docs = readCorpus(CORPUS_DIR);
  if (!docs.length) throw new Error(`Nenhum documento em ${CORPUS_DIR}. Rode "npm run generate" primeiro.`);
  const df = documentFrequency(docs.map((d) => d.body));
  repo.tx(() => {
    for (const n of Object.keys(SEGMENTS)) repo.termId('segmento', n);
    for (const n of Object.keys(TECHNOLOGIES)) repo.termId('tecnologia', n);
    for (const n of Object.keys(SERVICES)) repo.termId('servico', n);
    for (const u of users) repo.upsertUser(u);
    for (const o of opps) repo.upsertOpportunity(o);
    const byProject = new Map();
    for (const d of docs) byProject.set(d.meta.projeto_id, [...(byProject.get(d.meta.projeto_id) ?? []), d]);
    for (const [projetoId, list] of byProject) {
      const main = list.find((d) => d.meta.tipo_documental === 'proposta_comercial') ?? list[0];
      const m = main.meta;
      const objetivo = main.body.match(/##\s*\d*\.?\s*Objetivo[^\n]*\n([\s\S]*?)(?=\n##\s|$)/i)?.[1]?.trim() ?? null;
      const contexto = main.body.match(/##\s*\d*\.?\s*Contexto[^\n]*\n([\s\S]*?)(?=\n##\s|$)/i)?.[1]?.trim() ?? null;
      repo.insertProject({
        id: projetoId, cliente: m.cliente, titulo: m.titulo, segmento: m.segmento, area: m.area, dono: m.dono, status_proposta: m.status_proposta,
        confidencialidade: m.confidencialidade, prazo_meses: m.prazo_meses, valor: m.valor, margem: m.margem, data_referencia: m.data,
        descricao: contexto, objetivo, link_sharepoint: m.link_sharepoint, tecnologias: m.tecnologias, servicos: m.servicos,
      }, { origem: 'seed' });
      for (const d of list) {
        const s = analyzeText({ texto: d.body, filename: d.meta.arquivo, extracao: { frontmatter: d.meta }, df, docCount: docs.length });
        repo.insertDocument({
          id: d.meta.id, projeto_id: projetoId, titulo: d.body.match(/^#\s+(.+)$/m)?.[1] ?? d.meta.titulo, tipo_documental: d.meta.tipo_documental,
          status_documento: d.meta.status_documento, nivel_confianca: d.meta.nivel_confianca, confidencialidade: d.meta.confidencialidade,
          arquivo: d.meta.arquivo, formato: 'md', tamanho_bytes: Buffer.byteLength(d.body), idioma: s.idioma.valor, data_conteudo: d.meta.data ?? null,
          prazo_meses: d.meta.prazo_meses ?? null, valor: d.meta.valor ?? null, margem: d.meta.margem ?? null, resumo: s.resumo.valor,
          palavras_chave: s.palavras_chave, qualidade_metadados: s.qualidade.percentual / 100, contem_pii: s.pii.length > 0, texto: d.body, origem: 'seed',
        }, { entidades: entityRows(s), trechos: trechoRows(d.body) });
      }
    }
  });
  return { projetos: new Set(docs.map((d) => d.meta.projeto_id)).size, documentos: docs.length };
}

const cosine = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
const normalizeVec = (v) => {
  const n = Math.sqrt(v.reduce((s, x) => s + x * x, 0)) || 1;
  return v.map((x) => x / n);
};
const jaccard = (a, b) => (a.length || b.length ? a.filter((x) => b.includes(x)).length / new Set([...a, ...b]).size : 0);

// Vetores por documento e centroides por projeto (vínculo de uploads, duplicidade, relacionados).
export function documentVectors(embedder, docs) {
  const docVectors = new Map();
  const groups = new Map();
  for (const { meta, body } of docs) {
    const v = embedder.embedOne(`${meta.cliente}. ${meta.titulo}. ${meta.segmento}.\n${body.slice(0, 6000)}`);
    docVectors.set(meta.id, { projeto_id: meta.projeto_id, vector: v });
    const g = groups.get(meta.projeto_id) ?? { meta, vectors: [] };
    g.vectors.push(v);
    groups.set(meta.projeto_id, g);
  }
  const projectVectors = new Map([...groups].map(([id, g]) => [id, { meta: g.meta, vector: normalizeVec(g.vectors[0].map((_, i) => g.vectors.reduce((s, v) => s + v[i], 0))) }]));
  return { docVectors, projectVectors };
}

export function relatedProjects(projectVectors) {
  const rows = [];
  const list = [...projectVectors.values()];
  for (const a of list) {
    const scored = list.filter((b) => b !== a).map((b) => {
      const tec = (a.meta.tecnologias ?? []).filter((t) => (b.meta.tecnologias ?? []).includes(t));
      const srv = (a.meta.servicos ?? []).filter((t) => (b.meta.servicos ?? []).includes(t));
      const seg = a.meta.segmento === b.meta.segmento;
      const sim = 0.6 * cosine(a.vector, b.vector) + 0.2 * jaccard(a.meta.tecnologias ?? [], b.meta.tecnologias ?? []) + 0.1 * jaccard(a.meta.servicos ?? [], b.meta.servicos ?? []) + (seg ? 0.1 : 0);
      const motivo = [seg && 'mesmo segmento', tec.length && `tecnologias em comum: ${tec.join(', ')}`, srv.length && `serviços em comum: ${srv.join(', ')}`].filter(Boolean).join('; ') || 'conteúdo semelhante';
      return { projeto_id: a.meta.projeto_id, relacionado_id: b.meta.projeto_id, similaridade: Math.round(sim * 1000) / 1000, motivo };
    }).filter((r) => r.similaridade >= 0.2).sort((x, y) => y.similaridade - x.similaridade).slice(0, 5);
    rows.push(...scored);
  }
  return rows;
}

export function buildIndex(repo, storePath = STORE_PATH) {
  const docs = repo.documentsForIndex();
  const chunks = buildChunks(docs);
  const embedder = new HashingEmbedder().fit(chunks.map((c) => c.embedText));
  const store = new LocalVectorStore(storePath);
  store.deleteCollection({ name: COLLECTION });
  const col = store.getOrCreateCollection({ name: COLLECTION, metadata: { embedder: embedder.toJSON(), ingested_at: new Date().toISOString() } });
  col.add({
    ids: chunks.map((c) => c.id),
    embeddings: embedder.embed(chunks.map((c) => c.embedText)),
    documents: chunks.map((c) => c.text),
    metadatas: chunks.map((c) => c.metadata),
  });
  store.persist();
  const { projectVectors } = documentVectors(embedder, docs);
  repo.tx(() => repo.replaceRelated(relatedProjects(projectVectors)));
  return { documents: docs.length, chunks: chunks.length, projects: new Set(docs.map((d) => d.meta.projeto_id)).size };
}

export function ingest({ reset = false, dbPath = DB_PATH, storePath = STORE_PATH } = {}) {
  if (reset) for (const f of [dbPath, `${dbPath}-wal`, `${dbPath}-shm`]) fs.rmSync(f, { force: true });
  const repo = new Repo(dbPath);
  try {
    const seeded = repo.isEmpty() ? seed(repo) : null;
    return { ...buildIndex(repo, storePath), seeded };
  } finally {
    repo.close();
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const t0 = Date.now();
  const r = ingest({ reset: process.argv.includes('--reset') });
  if (r.seeded) console.log(`Massa piloto importada no banco: ${r.seeded.projetos} projetos, ${r.seeded.documentos} documentos`);
  console.log(`Indexação concluída: ${r.projects} projetos, ${r.documents} documentos, ${r.chunks} trechos em ${Date.now() - t0} ms`);
  console.log(`Banco: ${path.relative(ROOT, DB_PATH)} · Base vetorial: ${path.relative(ROOT, STORE_PATH)}`);
}
