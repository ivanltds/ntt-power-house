// Skill "conversa" (UC14): saudação, papo, o que o Radar sabe fazer, agradecimento, crítica, fora do escopo e "não entendi".
// CR-061: saudação, papo, agradecimento, despedida e fora do escopo são escritos pela IA (curtos, naturais, sem se
// reapresentar no meio da conversa e sem inventar nada sobre a base); sem IA, ficam os modelos de texto abaixo.
// "O que sei fazer", crítica, "não entendi" e "sem anexo" continuam por modelo (têm cartões e botões).

import { normalize } from '../text.js';
import { primeiroNome, PERSONA } from './persona.js';

// ---------- Reconhecimento por regras ----------
const SAUDACAO_RE = /^(?:(?:ola|oi+e?|opa|hey|hello|hi|salve|e ai|eai|bom dia|boa tarde|boa noite|bom dia a todos|tudo bem|tudo bom|tudo certo|como vai|como voce esta|como vc esta|beleza|blz|radar)\b[\s,!.?]*)+/;
const CAPACIDADES_RE = /\b(o que (voce|vc|tu|o radar) (pode|sabe|consegue) fazer|o que (voce|vc|o radar) faz|como (voce|vc) funciona|como funciona (o radar|isso aqui|isso)|quem (e|eh) voce|quem (voce|vc) (e|eh)|para que (voce|vc|o radar)? ?serve|pra que (voce|vc|o radar)? ?serve|o que (da|posso|eu posso) (pra |para )?(perguntar|fazer|pedir)|quais (sao )?(as )?(suas )?(funcoes|funcionalidades|habilidades|capacidades|skills)|^(me )?(ajuda|ajude|help|socorro)( (ai|por favor|pf|pfv))?$|^preciso de ajuda$|^menu$|^comecar$|por onde (eu )?comeco)\b/;
// Agradecimento e despedida só quando a mensagem é SÓ isso ("ok, liste os projetos" segue para a listagem).
const EXTRA = '(?: (?:pela ajuda|mesmo|demais|ai|viu|radar|muito|entao|por enquanto|e isso|era isso|so isso))*';
const AGRADECIMENTO_RE = new RegExp(`^(?:muito )?(?:obrigad[oa]s?|valeu|vlw|brigad[oa]|obg|agradeco|grat[oa]|show|otimo|perfeito|massa|top|legal|entendi|ok|certo|beleza|blz|show de bola)${EXTRA}$`);
const DESPEDIDA_RE = new RegExp(`^(?:(?:obrigad[oa]|valeu) )?(?:tchau|ate mais|ate logo|ate amanha|falou|flw|fui|bye)${EXTRA}$`);
const CRITICA_RE = /\b(nao gostei|nao ajudou|nao me ajudou|(resposta|isso) (esta |ta )?errad[oa]|esta errad|ta errad|errou|nao e isso|nao era isso|pessim[oa]|horrivel|inutil|nao entendeu|voce nao entendeu|vc nao entendeu|que resposta ruim|resposta ruim)\b/;
const FORA_RE = /\b(previsao do tempo|como esta o tempo|clima (hoje|amanha)|piada|poema|poesia|receita de|futebol|jogo de ontem|resultado do jogo|horoscopo|cotacao do dolar|bitcoin|letra da musica|quem ganhou|noticias de hoje)\b/;
// Papo curto, sem pedido: "tudo bem com você?", "qual seu nome?", "você é uma IA?", "kkkk", "bom trabalho".
const PAPO_RE = /\b(tudo (bem|bom|certo|tranquilo)|como (vai|voce esta|vc esta|vc ta|voce ta|anda|foi seu dia)|qual (e )?(o )?seu nome|como (voce|vc) se chama|quem (te criou|criou voce|fez voce|te fez)|(voce|vc) e (uma? )?(ia|robo|humano|pessoa|gente|inteligente|chatgpt|bot)|(voce|vc) (gosta|curte|dorme|come|sente)|k{3,}|(ha){2,}|rs{2,}|^rs$|que legal|legal demais|bom trabalho|parabens|(voce|vc) e (bom|boa|otimo|otima|incrivel|demais)|sinto muito|desculpa|foi mal|bom fim de semana|boa semana|bom descanso)\b/;
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
  // Sobra só um complemento da saudação ("tudo bem com você?", "e aí, e você?"): continua sendo saudação.
  if (s && /^(com (voce|vc)|contigo|e (voce|vc)|por ai|ai|radar|pessoal|gente|time)$/.test(normalize(s.resto))) return 'saudacao';
  const texto = s?.resto ? normalize(s.resto) : norm;
  if (CAPACIDADES_RE.test(texto) && palavras(texto) <= 12) return 'capacidades';
  if (DESPEDIDA_RE.test(texto)) return 'despedida';
  if (AGRADECIMENTO_RE.test(texto)) return 'agradecimento';
  if (CRITICA_RE.test(texto) && palavras(texto) <= 12) return 'critica';
  if (PAPO_RE.test(texto) && palavras(texto) <= 10) return 'papo';
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

// Período do dia em Brasília (o servidor roda em UTC).
export function periodo(data = new Date()) {
  const h = Number(new Intl.DateTimeFormat('pt-BR', { hour: 'numeric', hourCycle: 'h23', timeZone: 'America/Sao_Paulo' }).format(data));
  return h < 5 ? 'Boa noite' : h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite'; // madrugada ainda é "boa noite"
}

const INFORMAIS = new Set(['saudacao', 'papo', 'agradecimento', 'despedida', 'fora_escopo']);
const prompt = (capacidades) => `${PERSONA}
Tarefa: responder a uma mensagem informal (saudação, papo, agradecimento, despedida ou pedido fora do escopo) como um colega simpático, atencioso e profissional.
Regras:
- No máximo 40 palavras, em português do Brasil, tom caloroso e natural. Use emoji só se a pessoa tiver usado.
- Responda ao que a pessoa disse: a um "boa noite, tudo bem?" responda o boa noite, diga que está tudo bem e pergunte de volta; a um elogio, agradeça; a "qual seu nome?", diga que é o Radar.
- Cumprimente ("bom dia/boa noite" e o primeiro nome) SÓ se "pessoa_cumprimentou" for true ou se for a primeira mensagem. Nas outras, responda direto, sem abrir com cumprimento nem com o nome.
- Se "primeira_mensagem" for true e for uma saudação, apresente-se em uma frase curta e diga em poucas palavras o que você faz. Se for false, NÃO se reapresente.
- Pedido fora do escopo: diga com leveza que isso você não faz e sugira algo que faz.
- Termine se colocando à disposição de forma natural, sem listas e sem repetir frases prontas.
- Não invente nada sobre projetos, clientes, números ou funcionalidades.
O que você sabe fazer: ${capacidades.map((c) => c.titulo.toLowerCase()).join('; ')}.
Devolva SOMENTE um JSON: {"resposta": string}`;

// CR-061: versão assíncrona, com a IA para os tipos informais. history: turnos anteriores da conversa.
export async function responderConversaIA(tipo, { user, capacidades, query = '', prefixo = '', llm = null, history = [] }) {
  const base = responderConversa(tipo, { user, capacidades, query, prefixo, history });
  if (!INFORMAIS.has(tipo) || !llm?.grounded) return { ...base, ia: null };
  try {
    const out = await llm.grounded({
      sistema: prompt(capacidades),
      payload: { mensagem: query, tipo, primeira_mensagem: !history.length, pessoa_cumprimentou: Boolean(separarSaudacao(query)), nome: primeiroNome(user) || null, periodo_do_dia: periodo() },
      maxTokens: 220,
    });
    // Emoji só se a pessoa usou (a IA tende a colocar em toda resposta, o que soa artificial).
    const emoji = /\p{Extended_Pictographic}/u;
    let texto = typeof out?.resposta === 'string' ? out.resposta.trim() : '';
    if (!emoji.test(query)) texto = texto.replace(/\s*\p{Extended_Pictographic}️?/gu, '').trim();
    if (texto && texto.split(/\s+/).length <= 70) return { ...base, resposta: texto, ia: { provedor: 'deepseek', fallback: false } };
  } catch { /* sem IA: fica o modelo de texto */ }
  return { ...base, ia: null };
}

// tipo: saudacao | papo | capacidades | agradecimento | despedida | critica | fora_escopo | nao_entendi | sem_anexo
// prefixo: saudação ecoada quando veio junto com outro pedido. history: para não se reapresentar no meio da conversa.
export function responderConversa(tipo, { user, capacidades, query = '', prefixo = '', history = [] }) {
  const nome = primeiroNome(user);
  const norm = normalize(query);
  const perguntaComoVai = /\b(tudo (bem|bom|certo)|como (vai|voce esta|vc esta|vc ta|voce ta))\b/.test(norm);
  const ola = (separarSaudacao(query)?.saudacao ?? 'Olá') + (nome ? `, ${nome}` : '');
  const abre = prefixo ? `${prefixo}! ` : '';
  const sugestoes = sugestoesPadrao(capacidades);
  const base = { conversa: tipo, sugestoes, ajuda: LINKS_AJUDA.slice(0, 2) };
  switch (tipo) {
    case 'saudacao':
      // No meio da conversa não se reapresenta; a um "tudo bem?" responde e pergunta de volta.
      if (history.length) return { resposta: `${ola}! ${perguntaComoVai ? 'Tudo ótimo por aqui, obrigado por perguntar. E com você? ' : ''}Em que posso ajudar agora?`, dados: { ...base, sugestoes: [], ajuda: [] } };
      return { resposta: `${ola}! ${perguntaComoVai ? 'Tudo ótimo por aqui, obrigado por perguntar. ' : ''}Sou o Radar, o assistente de propostas e cases da equipe. Encontro projetos parecidos, listo, conto e comparo projetos da base, leio arquivos que você anexar e tiro dúvidas sobre como usar o Radar.\n\nComo posso ajudar?`, dados: base };
    case 'papo':
      return {
        resposta: perguntaComoVai ? `Tudo ótimo por aqui${nome ? `, ${nome}` : ''}, obrigado por perguntar! E com você? Se quiser, já começo a procurar alguma referência.`
          : /\b(nome|chama|ia|robo|bot|humano|pessoa)\b/.test(norm) ? 'Eu sou o Radar, um assistente com IA da equipe de pré-vendas: encontro propostas e cases parecidos, comparo projetos e tiro dúvidas sobre a base. Em que posso ajudar?'
            : `Obrigado${nome ? `, ${nome}` : ''}! Fico feliz em ajudar. Quer que eu procure alguma coisa na base?`,
        dados: { ...base, sugestoes: sugestoes.slice(0, 2), ajuda: [] },
      };
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
