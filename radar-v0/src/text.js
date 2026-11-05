// Utilitários de texto em português: normalização, tokenização, stemming leve e chunking.

const STOPWORDS = new Set(`
a o as os um uma uns umas de do da dos das no na nos nas em por para pra com sem sob sobre entre
e ou mas que se como mais menos muito muita muitos muitas ja nao sim tambem so ate apos antes depois
ao aos à às este esta estes estas esse essa esses essas isso isto aquilo aquele aquela seu sua seus suas
meu minha nosso nossa voce voces ele ela eles elas eu nos lhe lhes foi ser sao era eram sera tem ter
tinha havia ha esta estao estava pelo pela pelos pelas qual quais quando onde quem cujo cuja
the of and to in for on with is are be by an at from this that it as or
`.split(/\s+/).filter(Boolean));

export function normalize(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9+#.\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Stemming leve: suficiente para aproximar plural/singular e algumas flexões comuns.
export function stem(token) {
  if (token.length <= 4) return token;
  const suffixes = ['amentos', 'imentos', 'amento', 'imento', 'acoes', 'icoes', 'acao', 'icao',
    'mente', 'idades', 'idade', 'ivos', 'ivas', 'ivo', 'iva', 'ores', 'ais', 'eis', 'oes', 'aes',
    'res', 'es', 's'];
  for (const s of suffixes) {
    if (token.endsWith(s) && token.length - s.length >= 4) return token.slice(0, -s.length);
  }
  return token;
}

export function tokenize(text) {
  return normalize(text)
    .split(' ')
    .map((t) => t.replace(/^[.-]+|[.-]+$/g, ''))
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))
    .map(stem);
}

// Divide o texto em trechos por parágrafo, agrupando até ~maxChars, com sobreposição de 1 parágrafo.
export function chunkText(text, { maxChars = 700 } = {}) {
  const paragraphs = String(text)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const chunks = [];
  let current = [];
  let size = 0;
  for (const p of paragraphs) {
    if (size + p.length > maxChars && current.length) {
      chunks.push(current.join('\n\n'));
      current = [current[current.length - 1]];
      size = current[0].length;
    }
    current.push(p);
    size += p.length;
  }
  if (current.length) chunks.push(current.join('\n\n'));
  return [...new Set(chunks)];
}

// Divide em frases para escolher trechos literais de evidência. Cada linha (item de lista,
// fala de transcrição) é uma unidade; títulos e linhas de metadados em negrito são ignorados.
export function sentences(text) {
  return String(text)
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#') && !/^\*\*[^*]+:\*\*/.test(line))
    .map((line) => line.replace(/^[-*]\s+/, '').replace(/^\[\d{2}:\d{2}\]\s*/, ''))
    .flatMap((line) => line.split(/(?<=[.!?])\s+/))
    .map((s) => s.trim())
    .filter((s) => s.length > 25);
}
