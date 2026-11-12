// Base vetorial local em JavaScript puro, persistida em um arquivo JSON.
// A API imita a do Chroma (collections, add, query com `where`) para que a troca por
// `chromadb` seja direta quando houver um servidor disponível.

import fs from 'node:fs';
import path from 'node:path';

function cosine(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / ((Math.sqrt(na) * Math.sqrt(nb)) || 1);
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
    this.records = data.records ?? [];
  }

  count() {
    return this.records.length;
  }

  add({ ids, embeddings, documents, metadatas }) {
    ids.forEach((id, i) => {
      const record = { id, embedding: embeddings[i], document: documents[i], metadata: metadatas[i] ?? {} };
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
      const ranked = allowed
        .map((r) => ({ r, sim: cosine(q, r.embedding) }))
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
      records: this.records.map((r) => ({ ...r, embedding: r.embedding.map((v) => Math.round(v * 1e5) / 1e5) })),
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
    fs.writeFileSync(this.filePath, JSON.stringify({ version: 1, collections }));
  }
}
