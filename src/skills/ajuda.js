// Skill "ajuda" (UC14.3): dúvidas sobre como usar o Radar, respondidas com a base de ajuda e citando a seção.

import { normalize } from '../text.js';
import { BaseDeAjuda, novidades } from './conhecimento.js';
import { PERSONA } from './persona.js';

// Pergunta de uso: começa como dúvida e fala de uma parte do produto (telas, botões, envio, permissões…).
const DUVIDA_RE = /^(como|onde|quem pode|quem consegue|o que (e|eh|significa|quer dizer)|pra que serve|para que serve|posso|da (pra|para)|tem como|consigo|existe|qual a diferenca)\b/;
const PRODUTO_RE = /\b(radar|conversas?|favorit\w*|grupos?|arquiv(ar|ada|adas|o morto)|proposta em foco|foco|envi(ar|o|ou)\w*|anex\w*|upload|clipe|export\w*|planilha|excel|insights?|ficha|edit\w*|exclu\w*|apag\w*|permiss\w*|perfil|perfis|gestor|consultor|tema|modo escuro|escuro|claro|login|sair|sessao|tickets?|feedback|roteiro|versao|novidades?|tela|botao|menu|filtros?|kanban|aprov\w*|revis\w*|report\w*|relatar|bugs?|historico|comentar\w*|coment\w*|tags?|termo|privacidade|dados sensiveis|mascar\w*|metricas|atividades|registro de atividades|cards?|cartoes?|lista de projetos|novo projeto|criar projeto|cadastr\w*|documentos?)\b/;
const NOVIDADES_RE = /\b(o que (mudou|ha de novo|tem de novo|e novo)|novidades?|notas da versao|ultima versao|nesta versao|nessa versao|versao atual)\b/;

export function ehDuvidaDeUso(query) {
  const norm = normalize(query);
  if (NOVIDADES_RE.test(norm)) return true;
  // "como foi o projeto X?" é pergunta sobre a base, não sobre o produto.
  return DUVIDA_RE.test(norm) && PRODUTO_RE.test(norm) && !/\bP\d{3}\b/i.test(query) && !/\bcomo (foi|foram|ficou|terminou)\b/.test(norm);
}

const PROMPT = `${PERSONA}
Tarefa: responder a uma dúvida sobre COMO USAR o Radar, usando exclusivamente os trechos da ajuda fornecidos.
Devolva SOMENTE um JSON: {"resposta": string (até 80 palavras, passos curtos em texto corrido, sem markdown), "fonte": string (o id do trecho que mais sustenta a resposta), "achou": boolean}
Se os trechos não respondem à dúvida, use "achou": false e diga que a ajuda não traz essa informação. Não invente telas, botões nem funções.`;

const MIN_SCORE = 2.5;

// Sinônimos do produto: aproximam a pergunta das palavras que a ajuda usa (a busca da ajuda é lexical).
const SINONIMOS = [
  [/\b(parecid\w*|semelhan\w*|escolh\w*|ranking|ordena\w*|relevan\w*|score|nota|posicao|calcula\w*)\b/, 'busca semântica score fatores pesos similaridade ranking'],
  [/\bfavorit\w*/, 'favorita estrela conversas salvas'],
  [/\b(anex\w*|clipe)\b/, 'clipe anexar arquivo conversa enviar'],
  [/\b(exclu\w*|apag\w*|remov\w*)\b/, 'excluir apagar'],
  [/\b(quem pode|quem consegue|permiss\w*|perfil|perfis|consultor|gestor|preco|margem|confidencia\w*)\b/, 'permissões perfil consultor gestor preço margem confidencial'],
  [/\b(export\w*|pdf|pptx|docx|word|powerpoint)\b/, 'exportar formato modelo PDF PPTX DOCX'],
  [/\b(foco|focad\w*)\b/, 'proposta em foco'],
  [/\b(edit\w*|alter\w*|corrig\w*|mud(ar|o|e) (o|um|a) (campo|prazo|responsavel|status))\b/, 'editar no lugar lápis campo ficha Enter salva'],
  [/\b(grupos?|arquiv(ar|ada|adas)|renome\w*|organiz\w*)\b/, 'mover para grupo arquivar renomear menu conversas'],
  [/\b(tickets?|feedback|problema|bug|roteiro|testes?|cenarios?)\b/, 'enviar feedback tickets roteiro de testes versão'],
  [/\b(ler|leia|resum\w*|entender) (um |o |esse |este )?(arquivo|documento)\b/, 'ler um arquivo na conversa clipe resumo'],
];
const expandir = (query) => {
  const norm = normalize(query);
  return [query, ...SINONIMOS.filter(([re]) => re.test(norm)).map(([, extra]) => extra)].join(' ');
};
let base = null;
const baseDeAjuda = () => (base ??= new BaseDeAjuda());

export async function responderAjuda({ query, llm }) {
  const norm = normalize(query);
  if (NOVIDADES_RE.test(norm)) {
    const n = novidades();
    const itens = n.itens.slice(0, 6).map((i) => i.titulo);
    return {
      resposta: `Na ${n.versao}, as principais novidades são: ${itens.join('; ')}.\n\nA lista completa, com o antes e o depois de cada item, está nas notas da versão.`,
      dados: { fontes: [], ajuda: [{ tipo: 'notas', secao: n.versao, rotulo: `Notas da ${n.versao}` }], novidades: n },
      semEvidencia: false,
    };
  }
  const trechos = baseDeAjuda().buscar(expandir(query), { limite: 4 });
  const fora = { resposta: 'Não encontrei essa informação na ajuda do Radar. Veja o guia "Como usar o Radar" ou registre a dúvida em "Enviar feedback", que o time responde e melhora a ajuda.', dados: { fontes: [], ajuda: [{ tipo: 'guia', secao: 'inicio', rotulo: 'Como usar o Radar' }], feedback: true }, semEvidencia: true };
  if (!trechos.length || trechos[0].score < MIN_SCORE) return fora;

  const link = (t) => ({ tipo: t.fonte.tipo, secao: t.fonte.secao, rotulo: t.fonte.onde });
  const fontesDe = (lista) => lista.map((t) => ({ id: t.id, onde: t.fonte.onde, tipo: t.fonte.tipo, secao: t.fonte.secao, trecho: t.texto.slice(0, 420) }));
  let out = null;
  try { out = await llm.grounded?.({ sistema: PROMPT, payload: { duvida: query, trechos: trechos.map((t) => ({ id: t.id, secao: t.fonte.onde, texto: t.texto })) }, maxTokens: 400 }); } catch { out = null; }
  if (out && typeof out.resposta === 'string' && out.resposta.trim()) {
    if (out.achou === false) return fora;
    const principal = trechos.find((t) => t.id === out.fonte) ?? trechos[0];
    return { resposta: out.resposta.trim(), dados: { fontes: fontesDe([principal]), ajuda: [link(principal)] }, semEvidencia: false };
  }
  // Sem IA: mostra o trecho mais relevante, literal, com a seção de origem.
  const t = trechos[0];
  const frase = t.texto.replace(/\s+/g, ' ').slice(0, 320);
  return { resposta: `Pela ajuda do Radar (${t.fonte.onde}): ${frase}${t.texto.length > 320 ? '…' : ''}`, dados: { fontes: fontesDe(trechos.slice(0, 2)), ajuda: [link(t)] }, semEvidencia: false };
}
