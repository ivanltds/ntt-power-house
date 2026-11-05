// Mascaramento de dados sensíveis (UC13.2, RN-V0-01 revisada): roda no servidor antes de gravar qualquer texto
// e antes de qualquer chamada ao provedor de IA. Nunca bloqueia: troca o trecho por um marcador e conta o que achou.
// O registro guarda só o tipo e a quantidade, nunca o valor encontrado.

export const TERMO_VERSAO = 1;

// Luhn: evita mascarar como cartão qualquer sequência de 16 dígitos.
function luhn(digits) {
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let d = Number(digits[digits.length - 1 - i]);
    if (i % 2) { d *= 2; if (d > 9) d -= 9; }
    sum += d;
  }
  return sum % 10 === 0;
}

// Ordem importa: segredos e cartões antes de telefone, para um número não ser lido como outro.
const PADROES = [
  {
    tipo: 'senha ou chave',
    re: /\b(senha|password|passwd|pwd|token|api[_ -]?key|secret|chave(?: de api| secreta)?)\b(\s*[:=]\s*)(\S{4,})/gi,
    troca: (m, rotulo, sep) => `${rotulo}${sep}[senha ou chave removida]`,
  },
  { tipo: 'senha ou chave', re: /\b(?:sk|pk|rk)[-_](?:live[-_]|test[-_])?[A-Za-z0-9]{16,}\b/g },
  { tipo: 'senha ou chave', re: /\bAKIA[0-9A-Z]{16}\b/g },
  { tipo: 'senha ou chave', re: /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g },
  { tipo: 'cartão', re: /\b(?:\d{4}[ .-]?){3}\d{4}\b/g, valido: (m) => luhn(m.replace(/\D/g, '')) },
  { tipo: 'CPF', re: /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/g },
  { tipo: 'CPF', re: /\bCPF\s*(?:n[ºo°.]*\s*)?:?\s*\d{11}\b/gi },
  { tipo: 'RG', re: /\bRG\s*(?:n[ºo°.]*\s*)?:?\s*\d{1,2}\.?\d{3}\.?\d{3}-?[\dXx]\b/gi },
  { tipo: 'e-mail', re: /\b[\w.+-]+@[\w-]+(?:\.[\w-]+)+\b/g },
  { tipo: 'telefone', re: /(?:\+55\s?)?(?:\(\d{2}\)\s?|\b\d{2}\s)9?\d{4}[- ]?\d{4}\b/g },
];

const MARCADOR = { 'senha ou chave': '[senha ou chave removida]', 'cartão': '[cartão removido]', CPF: '[CPF removido]', RG: '[RG removido]', 'e-mail': '[e-mail removido]', telefone: '[telefone removido]' };

// Devolve o texto mascarado e o resumo do que foi removido: [{ tipo, quantidade }].
export function maskSensitive(texto) {
  if (typeof texto !== 'string' || !texto) return { texto: texto ?? '', achados: [] };
  const contagem = new Map();
  let out = texto;
  for (const p of PADROES) {
    out = out.replace(p.re, (...args) => {
      const m = args[0];
      if (p.valido && !p.valido(m)) return m;
      contagem.set(p.tipo, (contagem.get(p.tipo) ?? 0) + 1);
      return p.troca ? p.troca(...args) : MARCADOR[p.tipo];
    });
  }
  return { texto: out, achados: [...contagem].map(([tipo, quantidade]) => ({ tipo, quantidade })) };
}

// Mascara os campos de texto de um objeto (ex.: dados do cadastro) e soma os achados.
export function maskFields(obj, campos) {
  if (!obj || typeof obj !== 'object') return { dados: obj, achados: [] };
  const dados = { ...obj };
  const todos = [];
  for (const k of campos) {
    if (typeof dados[k] !== 'string') continue;
    const r = maskSensitive(dados[k]);
    dados[k] = r.texto;
    todos.push(...r.achados);
  }
  return { dados, achados: somar(todos) };
}

export function somar(lista) {
  const m = new Map();
  for (const a of lista) m.set(a.tipo, (m.get(a.tipo) ?? 0) + a.quantidade);
  return [...m].map(([tipo, quantidade]) => ({ tipo, quantidade }));
}

// Texto curto para a nota leve da interface: "2 dados pessoais removidos (e-mail, telefone)".
export function resumoAchados(achados) {
  const total = achados.reduce((s, a) => s + a.quantidade, 0);
  if (!total) return null;
  return `${total} ${total === 1 ? 'dado sensível removido' : 'dados sensíveis removidos'} (${achados.map((a) => a.tipo).join(', ')})`;
}
