// Embedder local, sem rede e sem dependências: vetorização por feature hashing com TF-IDF.
// Substitui um modelo de embeddings real no V0. Para trocar por um modelo neural no futuro,
// basta implementar a mesma interface: fit(texts), embed(texts), toJSON(), name, dimension.

import { tokenize } from './text.js';

function fnv1a(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function features(text) {
  const tokens = tokenize(text);
  const feats = [...tokens];
  for (let i = 0; i < tokens.length - 1; i++) feats.push(`${tokens[i]}_${tokens[i + 1]}`);
  return feats;
}

export class HashingEmbedder {
  constructor({ dimension = 1024, idf = null, docCount = 0 } = {}) {
    this.name = 'hashing-tfidf-v1';
    this.dimension = dimension;
    this.idf = idf ? Float32Array.from(idf) : null;
    this.docCount = docCount;
  }

  static fromJSON(json) {
    return new HashingEmbedder(json);
  }

  toJSON() {
    return { name: this.name, dimension: this.dimension, docCount: this.docCount, idf: Array.from(this.idf ?? []) };
  }

  bucket(feature) {
    return fnv1a(feature) % this.dimension;
  }

  // Calcula o IDF por bucket a partir do corpus indexado.
  fit(texts) {
    const df = new Float32Array(this.dimension);
    for (const text of texts) {
      const seen = new Set(features(text).map((f) => this.bucket(f)));
      for (const b of seen) df[b] += 1;
    }
    this.docCount = texts.length;
    this.idf = df.map((d) => Math.log((1 + this.docCount) / (1 + d)) + 1);
    return this;
  }

  embedOne(text) {
    const vec = new Float32Array(this.dimension);
    const counts = new Map();
    for (const f of features(text)) {
      const b = this.bucket(f);
      counts.set(b, (counts.get(b) ?? 0) + 1);
    }
    for (const [b, tf] of counts) vec[b] = (1 + Math.log(tf)) * (this.idf ? this.idf[b] : 1);
    let norm = 0;
    for (const v of vec) norm += v * v;
    norm = Math.sqrt(norm) || 1;
    return Array.from(vec, (v) => v / norm);
  }

  embed(texts) {
    return texts.map((t) => this.embedOne(t));
  }
}
