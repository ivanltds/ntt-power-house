// Base vetorial local em JavaScript puro, persistida em um arquivo JSON.
// A API imita a do Chroma (collections, add, query com `where`) para que a troca por
// `chromadb` seja direta quando houver um servidor disponível.

import fs from 'node:fs';
import path from 'node:path';

// Vetores guardados esparsos (só as posições diferentes de zero): o embedder por hashing gera ~100 valores
// em 1.024, então cada trecho ocupa ~1 KB em vez de ~9 KB. Permite uma base de milhares de trechos no servidor pequeno.
// No arquivo, cada vetor vai em base64 (bytes de Uint16 e Float32): ler milhões de números em JSON reservava
// ~100 MB de memória só para a leitura; strings base64 são lidas sem esse pico.
const deB64 = (s, Tipo) => { const b = Buffer.from(s, 'base64'); return new Tipo(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)); };
const paraB64 = (arr) => Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength).toString('base64');
export function esparso(v) {
  if (v && typeof v.i === 'string') { const val = deB64(v.v, Float32Array); return { i: deB64(v.i, Uint16Array), v: val, n: v.n ?? normaDe(val) }; }
  if (v && v.i && v.v) return { i: Uint16Array.from(v.i), v: Float32Array.from(v.v), n: v.n ?? normaDe(v.v) };
  const idx = [];
  const val = [];
  for (let k = 0; k < v.length; k++) if (v[k] !== 0) { idx.push(k); val.push(v[k]); }
  return { i: Uint16Array.from(idx), v: Float32Array.from(val), n: normaDe(val) };
}
function normaDe(vals) {
  let n = 0;
  for (const x of vals) n += x * x;
  return Math.sqrt(n);
}

// Cosseno entre a consulta (densa) e um trecho (esparso).
function cosine(q, r, nq) {
  let dot = 0;
  for (let k = 0; k < r.i.length; k++) dot += q[r.i[k]] * r.v[k];
  return dot / ((nq * r.n) || 1);
}

// Filtro de metadados no estilo Chroma: { campo: valor }, { campo: { $eq|$ne|$in|$nin|$gte|$lte: v } },
// { $and: [...] }, { $or: [...] }. Campos de array casam se qualquer elemento casar.
export function matchesWhere(metadata, where) {
  if (!where) return true;
  if (where.$and) return where.$and.every((w) => matchesWhere(metadata, w));
  if (where.$or) return where.$or.some((w) => matchesWhere(metadata, w));
  return Object.entries(where).every(([key, cond]) => {
    const value = metadata[key];
    const values = Array.isArray(value) ? value : [value];
    if (cond === null || typeof cond !== 'object' || Array.isArray(cond)) return values.includes(cond);
    return Object.entries(cond).every(([op, arg]) => {
      switch (op) {
        case '$eq': return values.includes(arg);
        case '$ne': return !values.includes(arg);
        case '$in': return values.some((v) => arg.includes(v));
        case '$nin': return !values.some((v) => arg.includes(v));
        case '$gte': return values.some((v) => v >= arg);
        case '$lte': return values.some((v) => v <= arg);
        default: throw new Error(`Operador não suportado: ${op}`);
      }
    });
  });
}

class Collection {
  constructor(name, data = {}) {
    this.name = name;
    this.metadata = data.metadata ?? {};
    this.records = (data.records ?? []).map((r) => ({ ...r, embedding: esparso(r.embedding) }));
  }

  count() {
    return this.records.length;
  }

  add({ ids, embeddings, documents, metadatas }) {
    ids.forEach((id, i) => {
      const record = { id, embedding: esparso(embeddings[i]), document: documents[i], metadata: metadatas[i] ?? {} };
      const existing = this.records.findIndex((r) => r.id === id);
      if (existing >= 0) this.records[existing] = record;
      else this.records.push(record);
    });
  }

  get({ where } = {}) {
    const rows = this.records.filter((r) => matchesWhere(r.metadata, where));
    return { ids: rows.map((r) => r.id), documents: rows.map((r) => r.document), metadatas: rows.map((r) => r.metadata) };
  }

  // O filtro `where` é aplicado ANTES do cálculo de similaridade: itens não permitidos nunca são ranqueados.
  query({ queryEmbeddings, nResults = 10, where }) {
    const allowed = this.records.filter((r) => matchesWhere(r.metadata, where));
    const out = { ids: [], distances: [], documents: [], metadatas: [] };
    for (const q of queryEmbeddings) {
      const nq = normaDe(q);
      const ranked = allowed
        .map((r) => ({ r, sim: cosine(q, r.embedding, nq) }))
        .sort((a, b) => b.sim - a.sim)
        .slice(0, nResults);
      out.ids.push(ranked.map((x) => x.r.id));
      out.distances.push(ranked.map((x) => 1 - x.sim));
      out.documents.push(ranked.map((x) => x.r.document));
      out.metadatas.push(ranked.map((x) => x.r.metadata));
    }
    return out;
  }

  toJSON() {
    return {
      metadata: this.metadata,
      records: this.records.map((r) => ({ ...r, embedding: { i: paraB64(r.embedding.i), v: paraB64(r.embedding.v), n: r.embedding.n } })),
    };
  }
}

export class LocalVectorStore {
  constructor(filePath) {
    this.filePath = filePath;
    this.collections = new Map();
    if (filePath && fs.existsSync(filePath)) {
      const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      for (const [name, data] of Object.entries(raw.collections ?? {})) this.collections.set(name, new Collection(name, data));
    }
  }

  getOrCreateCollection({ name, metadata = {} }) {
    if (!this.collections.has(name)) this.collections.set(name, new Collection(name, { metadata }));
    const col = this.collections.get(name);
    Object.assign(col.metadata, metadata);
    return col;
  }

  getCollection({ name }) {
    const col = this.collections.get(name);
    if (!col) throw new Error(`Coleção "${name}" não existe. Rode "npm run ingest" primeiro.`);
    return col;
  }

  deleteCollection({ name }) {
    this.collections.delete(name);
  }

  persist() {
    fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
    const collections = Object.fromEntries([...this.collections].map(([n, c]) => [n, c.toJSON()]));
    // Grava num arquivo temporário e troca no fim: se o processo cair no meio, a base anterior continua inteira.
    const tmp = `${this.filePath}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify({ version: 3, collections }));
    fs.renameSync(tmp, this.filePath);
  }
}
