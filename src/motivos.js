// Motivo estruturado de ganho e de perda (R19-06, adendo 7 ponto 4).
// Lista controlada; o Radar SUGERE o motivo a partir das lições e dos documentos (palavras-chave) e marca como
// "sugerido": a confirmação é do curador. Nada de texto inventado — só a classificação do que já está escrito.

import { normalize } from './text.js';

export const MOTIVOS_PERDA = {
  preco: ['Preço acima do mercado', /\b(preco|caro|cara|custo|orcamento|desconto|valor (alto|acima)|mais barat\w*|precific\w*)\b/],
  escopo: ['Escopo maior que a necessidade', /\b(escopo (maior|grande|amplo|demais)|mais simples|superdimension\w*|complex\w* demais|enxut\w*)\b/],
  concorrente: ['Concorrente', /\b(concorr\w*|outro fornecedor|competid\w*|incumbente)\b/],
  relacionamento: ['Relacionamento', /\b(relacionamento|sponsor|patrocinador\w*|confianca|decisor\w*)\b/],
  prazo: ['Prazo', /\b(prazo|cronograma|demor\w*|urgenc\w*|tempo de entrega)\b/],
  capacidade: ['Capacidade técnica', /\b(capacidade tecnica|sem experiencia|falta de (referencia|experiencia|case)|equipe (pequena|insuficiente)|competencia)\b/],
  desistencia: ['Cliente desistiu', /\b(desist\w*|congel\w*|suspens\w*|adiad\w*|cancel\w*|sem orcamento)\b/],
};

export const MOTIVOS_GANHO = {
  case: ['Case de referência', /\b(case|referencia|ja (fizemos|entregamos)|experiencia anterior)\b/],
  relacionamento: ['Relacionamento', /\b(relacionamento|sponsor|confianca|parceria|continuidade|extensao)\b/],
  preco: ['Preço competitivo', /\b(preco competitivo|custo menor|mais barat\w*|desconto)\b/],
  capacidade: ['Capacidade técnica', /\b(capacidade tecnica|especialist\w*|arquitetura|prova de conceito|poc|piloto)\b/],
  prazo: ['Prazo', /\b(prazo curto|rapid\w*|entrega rapida|time to market)\b/],
};

// Motivos sugeridos para um texto (lições, notas, documentos), na ordem da lista.
export function sugerirMotivos(texto, lista = MOTIVOS_PERDA) {
  const n = normalize(texto);
  return Object.entries(lista).filter(([, [, re]]) => re.test(n)).map(([k, [rotulo]]) => ({ motivo: k, rotulo }));
}
