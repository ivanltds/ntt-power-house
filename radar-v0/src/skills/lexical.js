// Índice lexical (BM25) para coleções pequenas e específicas: a base de ajuda e o arquivo anexado na conversa.
// Nessas coleções as palavras exatas ("favoritar", "prazo", nome do cliente) funcionam melhor que vetores genéricos.
// trechos: [{ id, texto, titulo?, peso?, ...qualquer metadado }]

import { tokenize } from '../text.js';

export class IndiceLexical {
  constructor(trechos) {
    this.trechos = trechos.map((t) => {
      const tokens = tokenize(`${t.titulo ?? ''} ${t.texto}`);
      const tf = new Map();
      for (const k of tokens) tf.set(k, (tf.get(k) ?? 0) + 1);
      return { ...t, _n: tokens.length, _tf: tf, _titulo: new Set(tokenize(t.titulo ?? '')) };
    });
    this.df = new Map();
    for (const t of this.trechos) for (const k of t._tf.keys()) this.df.set(k, (this.df.get(k) ?? 0) + 1);
    this.media = this.trechos.reduce((s, t) => s + t._n, 0) / Math.max(1, this.trechos.length);
  }

  get tamanho() {
    return this.trechos.length;
  }

  buscar(pergunta, { limite = 4, filtro = null } = {}) {
    const q = [...new Set(tokenize(pergunta))];
    const N = this.trechos.length;
    const k1 = 1.2;
    const b = 0.75;
    return this.trechos
      .filter((t) => !filtro || filtro(t))
      .map((t) => {
        let score = 0;
        for (const k of q) {
          const f = t._tf.get(k);
          if (!f) continue;
          const df = this.df.get(k) ?? 0;
          const idf = Math.log(1 + (N - df + 0.5) / (df + 0.5));
          score += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * t._n) / this.media)));
          if (t._titulo.has(k)) score += idf * 0.5; // termo no título pesa mais
        }
        return { t, score: score * (t.peso ?? 1) };
      })
      .filter((x) => x.score > 0)
      .sort((x, y) => y.score - x.score)
      .slice(0, limite)
      .map(({ t, score }) => {
        const { _n, _tf, _titulo, ...resto } = t;
        return { ...resto, score: Math.round(score * 100) / 100 };
      });
  }
}
