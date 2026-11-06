// Camada de IA do Radar. Interface comum aos provedores (mock e DeepSeek):
//   understand({ query, history, opportunity }) -> { intencao, consulta, continuacao, segmentos, tecnologias,
//                                                    servicos, prazoMeses, termos, referencia }
//   analyze({ query, history, candidates, user }) -> { avaliacoes: { [projeto_id]: { relevancia, justificativa,
//                                                    evidencia } }, resposta } | null
//   extractMetadata({ texto, filename, clientes }) -> { ...metadados sugeridos, ia } | null   (UC02)
//   justify({ factors, evidence }) -> string        (fallback determinístico)
//   compose({ query, results, complementares, lowEvidence }) -> string
// O mock é determinístico e offline: usa o vocabulário de domínio e heurísticas simples de memória,
// e só monta frases a partir de dados reais da base, então não inventa informação (RNF04).

import { normalize } from './text.js';
import { SEGMENTS, TECHNOLOGIES, SERVICES } from './lexicon.js';
import { classificar, filtrosDaPergunta } from './intents.js';

function findTerms(normText, dictionary) {
  const padded = ` ${normText} `;
  return Object.entries(dictionary)
    .filter(([, terms]) => terms.some((t) => padded.includes(` ${t} `)))
    .map(([canonical]) => canonical);
}

export const list = (items) => (items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} e ${items[items.length - 1]}`);

const ORDINALS = { primeir: 1, segund: 2, terceir: 3, quart: 4, quint: 5 };
const FOLLOW_UP = /^(e |e\?|so |somente|apenas|agora|desses|dessas|deles|delas|mas |tem algum|algum mais|filtr|e quanto|e os|e as|e com|e sem|sem )/;
const DETAIL = /detalh|mais sobre|fale|fala|explique|explica|conte|mostre|mostra|abr|ver o|ver a|quero ver|^e o |^e a |^o |^a /;

// Posição de um resultado citado na pergunta ("o segundo", "resultado 3", "#2").
export function resultReference(norm) {
  const ord = norm.match(/\b(primeir|segund|terceir|quart|quint)[oa]s?\b/);
  if (ord) return ORDINALS[ord[1]];
  const num = norm.match(/(?:resultado|opcao|item|numero|#)\s*(\d)\b/);
  return num ? Number(num[1]) : null;
}

export class MockLLM {
  constructor() {
    this.name = 'mock-llm-v0';
    this.provider = 'mock';
  }

  extractEntities(text) {
    // "seu banco", "banco de dados": é a base do Radar, não o segmento bancário.
    const norm = normalize(text).replace(/\b(?:(?:seu|sua|nosso|nossa|no|na|do|da|neste|nesse|deste|desse|o|a) banco(?: de dados)?|banco de dados)\b/g, 'base');
    const prazo = norm.match(/(\d+)\s*mes/);
    return {
      segmentos: findTerms(norm, SEGMENTS),
      tecnologias: findTerms(norm, TECHNOLOGIES),
      servicos: findTerms(norm, SERVICES),
      prazoMeses: prazo ? Number(prazo[1]) : null,
    };
  }

  // Memória por heurística (UC03.3 / UC03.14): continuação herda as entidades do turno anterior;
  // um novo segmento diferente do anterior indica mudança de assunto.
  async understand({ query, history = [] }) {
    const norm = normalize(query);
    const own = this.extractEntities(query);
    const prev = [...history].reverse().find((t) => t.intencao !== 'detalhar' && t.intencao !== 'fora_dominio');
    const last = history[history.length - 1];
    // Intenção por regras (adendo 5): listar, agregar, ficha, comparar ou buscar (projetos parecidos).
    const base = { intencao: 'buscar', consulta: query, continuacao: false, termos: [], referencia: null, confianca: 1, filtros: filtrosDaPergunta(norm), ...own, ...classificar(query) };

    const ref = resultReference(norm);
    if (ref && last?.resultados?.length && (DETAIL.test(norm) || norm.split(' ').length <= 6)) {
      return { ...base, intencao: 'detalhar', referencia: ref, continuacao: true };
    }
    if (!prev) return base;

    const ownSignal = own.segmentos.length + own.tecnologias.length + own.servicos.length;
    const newTopic = own.segmentos.length > 0 && !own.segmentos.some((s) => prev.entidades?.segmentos?.includes(s));
    const isFollowUp = FOLLOW_UP.test(norm) || (ownSignal <= 1 && norm.split(' ').length <= 5);
    if (newTopic || !isFollowUp) return base;

    const merge = (key) => [...new Set([...(prev.entidades?.[key] ?? []), ...own[key]])];
    // "E só de seguros?" depois de uma listagem ou contagem continua sendo listagem ou contagem.
    const herdada = ['listar', 'agregar'].includes(prev.intencao) && base.intencao === 'buscar' ? { intencao: prev.intencao, agruparPor: prev.agruparPor } : {};
    return {
      ...base,
      ...herdada,
      continuacao: true,
      consulta: `${prev.consulta} ${query}`,
      segmentos: merge('segmentos'),
      tecnologias: merge('tecnologias'),
      servicos: merge('servicos'),
      prazoMeses: own.prazoMeses ?? prev.entidades?.prazoMeses ?? null,
    };
  }

  // Sem IA real não há reavaliação semântica: o ranking fica com o score lexical/vetorial.
  async analyze() {
    return null;
  }

  // Sem IA real a extração de metadados fica só com as regras (src/analysis.js).
  async extractMetadata() {
    return null;
  }

  justify({ factors, evidence }) {
    const reasons = [];
    const seg = factors.find((f) => f.key === 'segmento' && f.value > 0);
    const tec = factors.find((f) => f.key === 'tecnologias' && f.matches?.length);
    const srv = factors.find((f) => f.key === 'servicos' && f.matches?.length);
    if (seg) reasons.push(`atua no mesmo segmento (${seg.matches.join(', ')})`);
    if (tec) reasons.push(`usa ${list(tec.matches)}`);
    if (srv) reasons.push(`envolveu ${list(srv.matches)}`);
    const head = reasons.length ? `Relacionado porque ${list(reasons)}.` : 'Relacionado pelo conteúdo do escopo e do objetivo.';
    return evidence ? `${head} Evidência: “${evidence}”` : head;
  }

  compose({ results, complementares, lowEvidence }) {
    if (!results.length) {
      return 'Não encontrei evidência suficiente na base para responder a essa pergunta. Tente refinar a busca (segmento, tecnologia ou tipo de serviço), completar o briefing da oportunidade ou enviar mais referências para a base.';
    }
    const top = results[0];
    let text = `Encontrei ${results.length} referência${results.length > 1 ? 's' : ''} relevante${results.length > 1 ? 's' : ''}. A mais próxima é “${top.titulo}” (${top.cliente}, ${top.status}), com score ${Math.round(top.score * 100)}%.`;
    if (lowEvidence) text += ' Há poucas referências fortes para essa busca; os resultados abaixo são os únicos acima do corte mínimo de relevância.';
    if (complementares.length) {
      text += ` Em projetos semelhantes também apareceram: ${list(complementares.slice(0, 3).map((c) => c.servico))} — vale avaliar como possibilidade de escopo.`;
    }
    return text;
  }

  describe({ result, position }) {
    const d = result.detalhes;
    return `Detalhes do resultado ${position} da resposta anterior: “${result.titulo}” (${result.cliente}, ${result.status})${d.prazoMeses ? `, prazo de ${d.prazoMeses} meses` : ''}. ${result.resumo ?? ''}`.trim();
  }
}
