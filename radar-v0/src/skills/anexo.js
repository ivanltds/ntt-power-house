// Skill "anexo" (UC15.1–15.3): ler e resumir o arquivo anexado, responder perguntas sobre ele e usá-lo como briefing.
// Skill "enviar_arquivo" (UC15.4): o envio à base só acontece por pedido explícito; o servidor decide o destino.

import { normalize } from '../text.js';
import { PERSONA } from './persona.js';

// ---------- Reconhecimento por regras (só vale com arquivo anexado na conversa) ----------
const REFERE_ARQUIVO = /\b(arquivo|documento|anexo|pdf|docx|pptx|planilha|apresentacao|isso|esse|este|desse|deste|nele|dele|ele)\b/;
const PARECIDOS_RE = /\b(parecid\w*|semelhant\w*|similar\w*|ja fizemos|ja fez|algo assim|algo parecido|igual a (esse|este)|na base|referencias?)\b/;
const RESUMIR_RE = /^(leia|le|ler|resuma|resumir|resumo|analise|analisar|explique|explica|me (diga|fala|explica|conta)|do que se trata|sobre o que|o que (e|eh|tem|diz|fala)|veja|abra|interprete)\b|\b(leia|resuma|resumir|resumo do|do que se trata|sobre o que (e|eh|fala)|o que (e|eh) (isso|esse|este|ele)|o que ele (e|eh|diz|fala))\b/;
const PERGUNTA_RE = /\b(qual|quais|quanto|quantos|quem|quando|onde|tem|existe|cita|menciona|fala)\b/;
const CAMPO_RE = /\b(prazo|valor|preco|custo|cliente|riscos?|escopo|objetivo|tecnologias?|equipe|time|cronograma|premissas?|entregas?|entregaveis|fases?|kpis?|resultados?|beneficios?|investimento|margem|duracao|data|contato|responsavel)\b/;
export const QUER_ENVIAR_RE = /\b(coloc|envi|sub|adicion|mand|guard|salv|inclu|vincul|associ)\w*\b.*\b(projeto|base|p\d{3})\b|\b(e|eh|sao|vai|vao) (do|da|de|para o|pro|no) projeto\b|\b(arquivo|pdf|documento|anexo|planilha|apresenta\w*)\b.*\bprojeto\b|^(no|para o|pro) (projeto|p\d{3})\b/;

// acao: 'resumir' | 'perguntar' | 'parecidos' | 'enviar' | null. ctx: { anexos, pendentes }
// Destino do arquivo: "de qual projeto é esse arquivo?", "é de um cliente novo" também são assunto de envio.
const DESTINO_RE = /\b(qual|que|para qual|pra qual) projeto\b|\b(cliente novo|novo cliente|projeto novo|novo projeto|ainda nao (existe|tem projeto)|nao tem projeto)\b/;

export function acaoComAnexo(query, ctx = {}) {
  const norm = normalize(query);
  if (ctx.pendentes > 0 && (QUER_ENVIAR_RE.test(norm) || DESTINO_RE.test(norm))) return 'enviar';
  if (!ctx.anexos?.length) return null;
  if (!norm) return 'resumir';
  if (PARECIDOS_RE.test(norm) && (REFERE_ARQUIVO.test(norm) || /\b(base|ja fizemos|algo assim)\b/.test(norm))) return 'parecidos';
  if (RESUMIR_RE.test(norm)) return 'resumir';
  // Pergunta sobre um campo, sem citar a base nem um projeto: vale para o arquivo.
  const citaBase = /\b(base|projetos|outros projetos|p\d{3})\b/.test(norm);
  if (!citaBase && ((PERGUNTA_RE.test(norm) && CAMPO_RE.test(norm)) || (REFERE_ARQUIVO.test(norm) && PERGUNTA_RE.test(norm)))) return 'perguntar';
  return null;
}

const RESUMO_PROMPT = `${PERSONA}
Tarefa: explicar o que é um arquivo que o usuário anexou na conversa, usando só o texto fornecido.
Devolva SOMENTE um JSON: {"tipo": string (ex.: proposta comercial, apresentação técnica, transcrição de reunião), "tema": string (até 15 palavras), "cliente": string | null, "pontos": string[] (3 a 5 pontos principais, até 25 palavras cada), "tecnologias": string[], "resposta": string (até 70 palavras: o que é o documento e para que serve)}
Não invente cliente, valores nem prazos que não estejam no texto.`;

const PERGUNTA_PROMPT = `${PERSONA}
Tarefa: responder a uma pergunta sobre um arquivo anexado pelo usuário, usando exclusivamente os trechos numerados do arquivo.
Devolva SOMENTE um JSON: {"resposta": string (até 80 palavras), "evidencia": string (id do trecho que sustenta a resposta) | null, "achou": boolean}
Se os trechos não trazem a informação, use "achou": false e diga que o arquivo não traz essa informação.`;

const contem = (texto, valor) => valor && normalize(texto).includes(normalize(valor));

// Resumo do arquivo (o mais recente, ou todos se forem até 3).
export async function resumirAnexos({ anexos, llm, user, pendentes = 0, podeCriar = false }) {
  const alvo = anexos[anexos.length - 1];
  const a = alvo.analise ?? {};
  const regras = {
    tipo: a.tipo, tema: a.titulo, cliente: a.cliente, segmento: a.segmento, tecnologias: a.tecnologias ?? [],
    prazoMeses: a.prazoMeses, pontos: [a.objetivo, ...(String(a.resumo ?? '').split(/(?<=[.!?])\s+/))].filter((x) => x && x.length > 25).slice(0, 4),
  };
  let ia = null;
  try {
    const texto = alvo.texto.length > 9000 ? `${alvo.texto.slice(0, 7000)}\n[…]\n${alvo.texto.slice(-2000)}` : alvo.texto;
    ia = await llm.grounded?.({ sistema: RESUMO_PROMPT, payload: { arquivo: alvo.nome, texto }, maxTokens: 700 });
  } catch { ia = null; }
  const resumo = { ...regras };
  let resposta;
  if (ia && typeof ia.resposta === 'string' && ia.resposta.trim()) {
    resumo.tipo = typeof ia.tipo === 'string' && ia.tipo.trim() ? ia.tipo.trim() : regras.tipo;
    resumo.tema = typeof ia.tema === 'string' && ia.tema.trim() ? ia.tema.trim() : regras.tema;
    resumo.cliente = typeof ia.cliente === 'string' && contem(alvo.texto, ia.cliente) ? ia.cliente : regras.cliente; // proteção contra cliente inventado
    resumo.pontos = Array.isArray(ia.pontos) ? ia.pontos.filter((p) => typeof p === 'string' && p.trim()).slice(0, 5) : regras.pontos;
    resumo.tecnologias = [...new Set([...(Array.isArray(ia.tecnologias) ? ia.tecnologias.filter((t) => typeof t === 'string' && contem(alvo.texto, t)) : []), ...regras.tecnologias])].slice(0, 10);
    resposta = ia.resposta.trim();
  } else {
    const partes = [
      `Li o arquivo "${alvo.nome}".`,
      resumo.tipo ? `Parece ser ${/^[aeiou]/i.test(resumo.tipo) ? 'uma' : 'um(a)'} ${resumo.tipo.toLowerCase()}` : 'Não identifiquei o tipo do documento',
    ];
    resposta = `${partes[0]} ${partes[1]}${resumo.cliente ? `, do cliente ${resumo.cliente}` : ''}${resumo.tema ? `, sobre "${resumo.tema}"` : ''}.`;
  }
  resposta += '\n\nO arquivo fica só nesta conversa e não entra na base. Posso responder perguntas sobre ele ou buscar projetos parecidos.';
  const acoes = [
    { acao: 'perguntar', rotulo: 'Buscar projetos parecidos', pergunta: 'Tem algo parecido com esse arquivo na base?', icone: 'radar' },
    { acao: 'focar', rotulo: 'Perguntar algo sobre o arquivo', icone: 'message' },
    ...(pendentes > 0 ? [{ acao: 'enviar', rotulo: 'Enviar para um projeto', icone: 'upload' }] : []),
    ...(pendentes > 0 && podeCriar ? [{ acao: 'criar', rotulo: 'Criar projeto com este arquivo', icone: 'plus' }] : []),
  ];
  return {
    resposta,
    dados: { acao: 'resumir', anexo: { id: alvo.id, nome: alvo.nome, formato: alvo.formato, truncado: alvo.truncado }, resumo, acoes, outros: anexos.length - 1 },
    semEvidencia: false,
    ia: ia ? { provedor: 'deepseek', fallback: false } : null,
    usuario: user?.id,
  };
}

// Pergunta sobre o conteúdo do arquivo: busca nos trechos (RAG efêmero) e responde com a frase literal como evidência.
export async function perguntarAnexo({ query, indice, llm }) {
  const trechos = indice.buscar(query, { limite: 4 });
  if (!trechos.length) {
    return { resposta: 'Não encontrei essa informação no arquivo anexado. Tente perguntar de outro jeito ou peça um resumo do arquivo.', dados: { acao: 'perguntar', evidencias: [] }, semEvidencia: true };
  }
  let ia = null;
  try { ia = await llm.grounded?.({ sistema: PERGUNTA_PROMPT, payload: { pergunta: query, trechos: trechos.map((t) => ({ id: t.id, arquivo: t.nome, texto: t.texto })) }, maxTokens: 450 }); } catch { ia = null; }
  const ev = (t) => ({ id: t.id, arquivo: t.nome, trecho: t.texto.slice(0, 500) });
  if (ia && typeof ia.resposta === 'string' && ia.resposta.trim()) {
    const t = trechos.find((x) => x.id === ia.evidencia);
    return { resposta: ia.resposta.trim(), dados: { acao: 'perguntar', evidencias: ia.achou === false || !t ? [] : [ev(t)] }, semEvidencia: ia.achou === false };
  }
  const t = trechos[0];
  return { resposta: `No arquivo "${t.nome}", o trecho mais relacionado à sua pergunta é este:`, dados: { acao: 'perguntar', evidencias: trechos.slice(0, 2).map(ev) }, semEvidencia: false };
}

// Consulta de busca a partir do arquivo (vira o briefing da busca de parecidos).
export function consultaDoAnexo(anexos) {
  const a = anexos[anexos.length - 1];
  const x = a.analise ?? {};
  return [x.titulo, x.objetivo, x.segmento, ...(x.tecnologias ?? []), ...(x.servicos ?? []), x.resumo].filter(Boolean).join('. ').slice(0, 600) || a.texto.slice(0, 600);
}

// Destino do envio (UC15.4): código do projeto é certeza; nome ou segmento viram opções para confirmar; foco vale se nada for citado.
export function destinoDoEnvio(query, { projetos, foco }) {
  const norm = normalize(query);
  const cod = /\bp\d{3}\b/.exec(norm)?.[0].toUpperCase();
  if (cod) {
    const p = projetos.find((x) => x.id === cod);
    return { projeto: p ?? null, opcoes: p ? [p] : [], codigoInvalido: p ? null : cod };
  }
  const ignorar = new Set(['projeto', 'projetos', 'cliente', 'dados', 'para', 'com', 'arquivo', 'documento', 'coloca', 'coloque', 'envia', 'envie', 'esse', 'este']);
  const palavras = (x) => normalize(x).split(/[^a-z0-9]+/).filter((w) => w.length > 3 && !ignorar.has(w));
  const pontos = projetos.map((p) => ({ p, n: [...new Set([...palavras(p.cliente), ...palavras(p.titulo), ...palavras(p.segmento ?? '')])].filter((w) => ` ${norm} `.includes(` ${w}`)).length }))
    .filter((x) => x.n).sort((a, b) => b.n - a.n);
  if (pontos.length) return { projeto: null, opcoes: pontos.slice(0, 4).map((x) => x.p) };
  return { projeto: foco ?? null, opcoes: [] };
}
