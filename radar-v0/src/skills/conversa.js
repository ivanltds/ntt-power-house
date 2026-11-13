// Skill "conversa" (UC14): saudação, o que o Radar sabe fazer, agradecimento, crítica, fora do escopo e "não entendi".
// Respostas por modelo (sem IA): rápidas, previsíveis e sem risco de inventar. A lista de capacidades vem do registro.

import { normalize } from '../text.js';
import { primeiroNome } from './persona.js';

// ---------- Reconhecimento por regras ----------
const SAUDACAO_RE = /^(?:(?:ola|oi+e?|opa|hey|hello|hi|salve|e ai|eai|bom dia|boa tarde|boa noite|bom dia a todos|tudo bem|tudo bom|tudo certo|como vai|como voce esta|como vc esta|beleza|blz|radar)\b[\s,!.?]*)+/;
const CAPACIDADES_RE = /\b(o que (voce|vc|tu|o radar) (pode|sabe|consegue) fazer|o que (voce|vc|o radar) faz|como (voce|vc) funciona|como funciona (o radar|isso aqui|isso)|quem (e|eh) voce|quem (voce|vc) (e|eh)|para que (voce|vc|o radar)? ?serve|pra que (voce|vc|o radar)? ?serve|o que (da|posso|eu posso) (pra |para )?(perguntar|fazer|pedir)|quais (sao )?(as )?(suas )?(funcoes|funcionalidades|habilidades|capacidades|skills)|^(me )?(ajuda|ajude|help|socorro)( (ai|por favor|pf|pfv))?$|^preciso de ajuda$|^menu$|^comecar$|por onde (eu )?comeco)\b/;
// Agradecimento e despedida só quando a mensagem é SÓ isso ("ok, liste os projetos" segue para a listagem).
const EXTRA = '(?: (?:pela ajuda|mesmo|demais|ai|viu|radar|muito|entao|por enquanto|e isso|era isso|so isso))*';
const AGRADECIMENTO_RE = new RegExp(`^(?:muito )?(?:obrigad[oa]s?|valeu|vlw|brigad[oa]|obg|agradeco|grat[oa]|show|otimo|perfeito|massa|top|legal|entendi|ok|certo|beleza|blz|show de bola)${EXTRA}$`);
const DESPEDIDA_RE = new RegExp(`^(?:(?:obrigad[oa]|valeu) )?(?:tchau|ate mais|ate logo|ate amanha|falou|flw|fui|bye)${EXTRA}$`);
const CRITICA_RE = /\b(nao gostei|nao ajudou|nao me ajudou|(resposta|isso) (esta |ta )?errad[oa]|esta errad|ta errad|errou|nao e isso|nao era isso|pessim[oa]|horrivel|inutil|nao entendeu|voce nao entendeu|vc nao entendeu|que resposta ruim|resposta ruim)\b/;
const FORA_RE = /\b(previsao do tempo|como esta o tempo|clima (hoje|amanha)|piada|poema|poesia|receita de|futebol|jogo de ontem|resultado do jogo|horoscopo|cotacao do dolar|bitcoin|letra da musica|quem ganhou|noticias de hoje)\b/;
const ARQUIVO_SEM_ANEXO_RE = /\b(leia|ler|le|resuma|resumir|analise|analisar|explique|abra)\b.*\b(arquivo|documento|anexo|pdf|docx|pptx|planilha|apresentacao)\b|\b(esse|este|o) (arquivo|documento|anexo)\b/;

const palavras = (norm) => norm.split(' ').filter(Boolean).length;

// Separa uma saudação do início da mensagem ("bom dia, liste os projetos de varejo").
export function separarSaudacao(query) {
  const norm = normalize(query);
  const m = norm.match(SAUDACAO_RE);
  if (!m) return null;
  const resto = norm.slice(m[0].length).trim();
  const ecoa = /\bboa noite\b/.test(m[0]) ? 'Boa noite' : /\bboa tarde\b/.test(m[0]) ? 'Boa tarde' : /\bbom dia\b/.test(m[0]) ? 'Bom dia' : 'Olá';
  // Mantém o texto original (com acentos) do que vem depois da saudação.
  const original = query.trim().split(/\s+/).slice(m[0].trim().split(' ').length).join(' ').replace(/^[\s,!.?:;-]+/, '');
  return { saudacao: ecoa, resto: resto ? original : '' };
}

// Tipo de conversa reconhecido por regras, ou null. ctx: { anexos }
export function tipoDeConversa(query, ctx = {}) {
  const norm = normalize(query);
  if (!norm) return null;
  const s = separarSaudacao(query);
  if (s && !s.resto) return 'saudacao';
  const texto = s?.resto ? normalize(s.resto) : norm;
  if (CAPACIDADES_RE.test(texto) && palavras(texto) <= 12) return 'capacidades';
  if (DESPEDIDA_RE.test(texto)) return 'despedida';
  if (AGRADECIMENTO_RE.test(texto)) return 'agradecimento';
  if (CRITICA_RE.test(texto) && palavras(texto) <= 12) return 'critica';
  if (FORA_RE.test(texto)) return 'fora_escopo';
  if (!ctx.anexos?.length && ARQUIVO_SEM_ANEXO_RE.test(texto)) return 'sem_anexo';
  return null;
}

// ---------- Respostas ----------
const LINKS_AJUDA = [
  { tipo: 'guia', secao: 'inicio', rotulo: 'Como usar o Radar' },
  { tipo: 'guia', secao: 'perguntar', rotulo: 'Bons exemplos de pergunta' },
  { tipo: 'tecnico', secao: null, rotulo: 'Como o Radar funciona' },
];

const sugestoesPadrao = (capacidades) => capacidades.filter((c) => c.clicavel).slice(0, 4).map((c) => c.exemplo);

// tipo: saudacao | capacidades | agradecimento | despedida | critica | fora_escopo | nao_entendi | sem_anexo
// prefixo: saudação ecoada quando veio junto com outro pedido.
export function responderConversa(tipo, { user, capacidades, query = '', prefixo = '' }) {
  const nome = primeiroNome(user);
  const ola = (separarSaudacao(query)?.saudacao ?? 'Olá') + (nome ? `, ${nome}` : '');
  const abre = prefixo ? `${prefixo}! ` : '';
  const sugestoes = sugestoesPadrao(capacidades);
  const base = { conversa: tipo, sugestoes, ajuda: LINKS_AJUDA.slice(0, 2) };
  switch (tipo) {
    case 'saudacao':
      return { resposta: `${ola}! Sou o Radar, o assistente de propostas e cases da equipe. Encontro projetos parecidos, listo, conto e comparo projetos da base, leio arquivos que você anexar e tiro dúvidas sobre como usar o Radar.\n\nComo posso ajudar?`, dados: base };
    case 'capacidades':
      return {
        resposta: `${abre}Posso ajudar com estas tarefas. Clique num exemplo para experimentar ou veja o guia completo em "Como usar o Radar".`,
        dados: { ...base, capacidades, sugestoes: [], ajuda: LINKS_AJUDA },
      };
    case 'agradecimento':
      return { resposta: 'Por nada! Se precisar de mais alguma coisa, é só perguntar.', dados: { ...base, sugestoes: sugestoes.slice(0, 2), ajuda: [] } };
    case 'despedida':
      return { resposta: `Até logo${nome ? `, ${nome}` : ''}! Quando precisar, é só voltar aqui.`, dados: { ...base, sugestoes: [], ajuda: [] } };
    case 'critica':
      return {
        resposta: 'Desculpe, essa resposta não ajudou. Você pode reformular a pergunta com mais detalhes (cliente, segmento, tecnologia ou período) ou me contar o que esperava em "Enviar feedback": o relato vai direto para o time.',
        dados: { ...base, feedback: true, sugestoes: [], ajuda: [] },
      };
    case 'fora_escopo':
      return { resposta: `${abre}Isso foge do que eu consigo fazer: respondo sobre propostas, cases e projetos da base e sobre o uso do Radar. Posso ajudar com algo assim?`, dados: base, semEvidencia: true };
    case 'sem_anexo':
      return {
        resposta: 'Não encontrei nenhum arquivo anexado nesta conversa. Para eu ler um arquivo, clique no clipe ao lado da caixa de pergunta, escolha o arquivo e escreva "resuma" (ou só envie). Ele fica só nesta conversa e não entra na base.',
        dados: { ...base, anexar: true, sugestoes: [], ajuda: [{ tipo: 'guia', secao: 'enviar', rotulo: 'Enviar documentos' }] },
      };
    default: // nao_entendi
      return {
        resposta: `${abre}Não entendi bem o que você precisa. Posso, por exemplo, fazer uma destas coisas:`,
        dados: { ...base, conversa: 'nao_entendi', capacidades: capacidades.slice(0, 4) },
      };
  }
}
