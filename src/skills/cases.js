// Skills de material comercial (adendo 7): one page de case (CR-075) e apresentação de cases (CR-076).
// O pré-roteamento por regras reconhece os pedidos claros; a IA também pode escolher essas intenções.

import { normalize } from '../text.js';

const ONEPAGE_RE = /\b(one ?pages?|onepages?|uma pagina|pagina unica|folha unica)\b/;
const APRESENTACAO_RE = /\b(apresentac(ao|oes)|deck|slides?|powerpoint)\b/;
const PEDIDO_RE = /\b(gera|gere|gerar|monta|monte|montar|faz|faca|fazer|cria|crie|criar|prepara|prepare|preparar|quero|preciso|precisava|transforma|transforme|transformar|vira|virar|me (da|de|manda)|tem como)\b/;
// Pedido sobre a lista da resposta anterior ("transforma esses em apresentação").
const LISTA_ANTERIOR_RE = /\b(esses|estes|essas|estas|desses|destes|eles|elas|lista (acima|anterior)|acima|dessa lista|da lista)\b/;
const FOCO_RE = /\b(deste|desse|este|esse|nest[ea]|ness[ea]) (projeto|proposta|oportunidade|case)\b|\bparecid[oa]s com (este|esse|ele|ela)\b/;
const PERGUNTA_DE_USO = /^(como|onde|o que|qual|quais|quem|por que|pra que|para que)\b/;

export function pedeOnePage(texto) {
  const n = normalize(texto);
  return ONEPAGE_RE.test(n) && !PERGUNTA_DE_USO.test(n);
}

export function pedeApresentacao(texto) {
  const n = normalize(texto);
  if (!APRESENTACAO_RE.test(n) || PERGUNTA_DE_USO.test(n)) return false;
  // "apresentação comercial do P003" (documento) não é pedido de montar material: precisa de verbo de pedido, "cases" ou "sobre".
  return PEDIDO_RE.test(n) || /\b(cases?|sobre)\b/.test(n);
}

export const refereListaAnterior = (texto) => LISTA_ANTERIOR_RE.test(normalize(texto));
export const refereFoco = (texto) => FOCO_RE.test(normalize(texto));

// Tema do pedido: o que vem depois de "sobre" ou, sem ele, o texto sem os verbos de pedido, sem o nome do material
// ("apresentação", "one page"), sem o tamanho do deck e sem "com nossos cases".
const RUIDO = [
  /\b(com|usando|a partir d[eo]s?|baseado em)\s+(os\s+|nossos\s+|as\s+|nossas\s+)?(cases?|projetos?|propostas?)(\s+(internos?|ganh[oa]s|nossos|da base))?(?![\wÀ-ú])/gi,
  /\b(de\s+)?(uns|umas|cerca de|até)?\s*\d+\s*(slides?|p[aá]ginas?)(?![\wÀ-ú])/gi,
  /\b(por favor|pfv|pf)\b/gi,
  /\b(tem|temos|há|existe|existem)\s+(algum|alguma|algo|um|uma)?(?![\wÀ-ú])/gi,
  /\b(gera|gere|gerar|monta|monte|montar|faz|faça|faca|fazer|cria|crie|criar|prepara|prepare|preparar|quero|preciso|precisava|transforma|transforme|transformar|me (dá|da|de|manda))(?![\wÀ-ú])/gi,
  /\bem uma p[aá]gina(?![\wÀ-ú])/gi,
  /(?<![\wÀ-ú])(apresenta[cç](ão|ao|ões|oes)|deck|slides?|powerpoint|one ?pages?|onepages?|p[aá]gina [uú]nica|folha [uú]nica)(?![\wÀ-ú])/gi,
  /\b(cases?|case de sucesso)\b/gi,
  /\bparecid[oa]s com (este|esse|ele|ela)( projeto| proposta)?\b/gi,
];
const CONECTOR = /^(de|do|da|dos|das|em|no|na|para|pra|sobre|e|com|um|uma|o|a|algum|alguma)$/i;

export function temaDoPedido(texto) {
  let t = String(texto ?? '').replace(/[?!]/g, ' ');
  const sobre = t.match(/\bsobre\s+(.+)/i);
  if (sobre) t = sobre[1];
  for (const re of RUIDO) t = t.replace(re, ' ');
  const palavras = t.replace(/[.,;:]+/g, ' ').split(/\s+/).filter(Boolean);
  while (palavras.length && CONECTOR.test(palavras[0])) palavras.shift();
  while (palavras.length && CONECTOR.test(palavras.at(-1))) palavras.pop();
  const out = palavras.join(' ');
  return out.length >= 3 && !/^P\d{3}$/i.test(out) ? out : '';
}

// Projeto citado pelo código (P003).
export const codigoNoTexto = (texto) => /\bP\d{3}\b/i.exec(texto)?.[0].toUpperCase() ?? null;
