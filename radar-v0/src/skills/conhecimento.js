// Fonte de conhecimento "ajuda" (UC14.3): o guia de uso, a explicação técnica e as notas da versão.
// Usa os MESMOS módulos que a tela de ajuda (public/ajuda-conteudo.js e public/notas-versao.js),
// para o chat e a tela nunca divergirem. Fica numa coleção própria, separada da base de projetos.

import { GUIA, TECNICO } from '../../public/ajuda-conteudo.js';
import { NOTAS } from '../../public/notas-versao.js';
import { decodeEntities } from '../extract/formats.js';
import { chunkText } from '../text.js';
import { IndiceLexical } from './lexical.js';

// HTML da ajuda → texto corrido (sem ícones SVG nem marcação).
export function htmlParaTexto(html) {
  return decodeEntities(String(html)
    .replace(/<svg[\s\S]*?<\/svg>/g, '')
    .replace(/<(br|\/p|\/li|\/h[1-6]|\/tr|\/ol|\/ul|\/blockquote|\/small)\s*\/?>/gi, '\n')
    .replace(/<\/t[dh]>\s*(?=<t[dh])/gi, ': ') // células da mesma linha: "Favoritar: Clique na estrela…"
    .replace(/<thead[\s\S]*?<\/thead>/gi, '') // cabeçalho de tabela ("Quero… / Como") não ajuda a responder
    .replace(/<\/?(b|i|em|strong|span|a|code|kbd|small|u)\b[^>]*>/gi, '') // marcação dentro da frase não vira espaço
    .replace(/<[^>]+>/g, ' '))
    .replace(/[ \t]+/g, ' ')
    .replace(/ ?\n ?/g, '\n')
    .replace(/\n{2,}/g, '\n\n')
    .replace(/\(\s*\)/g, '') // ícone que estava entre parênteses
    .replace(/\s+([,.;:)])/g, '$1').replace(/\(\s+/g, '(')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function secoes() {
  const out = [];
  const add = (tipo, rotulo, lista) => {
    for (const [secao, , titulo, html] of lista) {
      let texto = '';
      try { texto = htmlParaTexto(html()); } catch { continue; } // seção interativa que precisa da tela: fica de fora
      if (texto) out.push({ fonte: { tipo, secao, titulo, onde: `${rotulo} › ${titulo}` }, texto });
    }
  };
  add('guia', 'Como usar o Radar', GUIA);
  add('tecnico', 'Como o Radar funciona', TECNICO);
  // Cada item das notas é um trecho próprio: "o que mudou no envio?" acha o item certo.
  for (const n of NOTAS) {
    for (const i of n.itens ?? []) {
      out.push({ fonte: { tipo: 'notas', secao: n.versao, titulo: i.titulo, onde: `Notas da ${n.versao} › ${i.titulo}` }, texto: `${i.titulo}. ${i.depois ?? ''}` });
    }
  }
  return out;
}

// O guia descreve o uso atual; as notas contam a história (as da versão em curso valem mais que as antigas).
const pesoDa = (fonte) => (fonte.tipo === 'notas' ? (fonte.secao === NOTAS[0]?.versao ? 0.75 : 0.4) : fonte.tipo === 'tecnico' ? 0.85 : 1);

export class BaseDeAjuda {
  constructor() {
    const trechos = [];
    for (const s of secoes()) {
      for (const [i, texto] of chunkText(s.texto, { maxChars: 600 }).entries()) {
        trechos.push({ id: `${s.fonte.tipo}:${s.fonte.secao}:${i}`, fonte: s.fonte, titulo: s.fonte.titulo, texto, peso: pesoDa(s.fonte) });
      }
    }
    this.indice = new IndiceLexical(trechos);
  }

  get tamanho() {
    return this.indice.tamanho;
  }

  buscar(pergunta, { limite = 4 } = {}) {
    return this.indice.buscar(pergunta, { limite }).map(({ id, fonte, texto, score }) => ({ id, fonte, texto, score }));
  }
}

// Novidades de uma versão (a mais recente por padrão), para "o que mudou nesta versão?".
export function novidades(versao = NOTAS[0]?.versao) {
  const n = NOTAS.find((x) => x.versao === versao) ?? NOTAS[0];
  return n ? { versao: n.versao, itens: (n.itens ?? []).map((i) => ({ titulo: i.titulo, tipo: i.tipo, area: i.area })) } : null;
}
