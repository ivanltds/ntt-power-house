// Skill "por que perdemos" (CR-080, melhoria levantada pela massa de testes e ligada ao R19-06).
// Em vez de devolver projetos parecidos de qualquer status, olha só as propostas PERDIDAS parecidas com o tema,
// agrupa os motivos, traz a lição de cada uma e quem conduziu (com quem falar).
// Motivo "registrado": a ata de análise de perda diz "Motivo principal registrado: …".
// Motivo "sugerido": classificado pelo Radar a partir do resultado, das lições e do e-mail do cliente (confira).

import { normalize } from '../text.js';
import { sugerirMotivos, MOTIVOS_PERDA } from '../motivos.js';

// "perdas" sozinho não basta: "redução de perdas não técnicas" é tema de projeto de energia, não pergunta de perda.
const PERDA_RE = /\b(por que|porque|pq|motivos?|razao|razoes|causas?)\b.*\b(perdemos|perdeu|perderam|perdidas|nao ganhamos)\b|\b(motivos?|razoes|causas?) (das|de|da) (perdas?|propostas perdidas)\b|\b(o que|que) (aprendemos|aprender) com (as )?(perdas|propostas perdidas|perdidas)\b|\bperdemos\b.*\b(por que|porque|motivo)\b/;
const PERGUNTA_DE_USO = /\b(radar|tela|botao|cartao|ganhamos (x|×) perdemos|insights?)\b/;

export function pedePerdas(texto) {
  const n = normalize(texto);
  return PERDA_RE.test(n) && !PERGUNTA_DE_USO.test(n);
}

// Tema: o que sobra depois de tirar a pergunta sobre perdas ("por que perdemos propostas de fraude?" → "fraude").
// Palavra a palavra (a fronteira \b do JavaScript não entende letras acentuadas, como em "detecção").
const FORA = new Set(['por', 'que', 'porque', 'pq', 'quais', 'qual', 'sao', 'é', 'e', 'o', 'a', 'os', 'as', 'motivo', 'motivos', 'razao', 'razoes', 'causa', 'causas',
  'principal', 'principais', 'mais', 'comum', 'comuns', 'perdemos', 'perdeu', 'perderam', 'nao', 'ganhamos', 'aprendemos', 'aprender', 'propostas', 'proposta', 'projetos',
  'oportunidades', 'perdas', 'perda', 'perdidas', 'perdida', 'com', 'de', 'da', 'do', 'das', 'dos', 'em', 'no', 'na', 'nos', 'nas', 'sobre', 'para', 'temos', 'tivemos',
  'nossa', 'nossas', 'nosso', 'nossos', 'tantas', 'tanto']);
const semAcento = (w) => w.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
export function temaDasPerdas(texto) {
  const palavras = String(texto ?? '').replace(/[?!.,;:]+/g, ' ').split(/\s+/).filter(Boolean);
  const t = palavras.filter((w) => !FORA.has(semAcento(w))).join(' ');
  return t.length >= 3 ? t : '';
}

// Motivos de uma proposta perdida a partir dos documentos dela que o usuário pode ver.
export function motivosDoProjeto(docs) {
  const textos = docs.map((d) => d.body);
  const linha = textos.map((b) => b.match(/Motivo principal registrado:\s*([^\n]+)/i)?.[1]).find(Boolean);
  if (linha) {
    const m = sugerirMotivos(linha);
    if (m.length) return { motivos: m.slice(0, 1), origem: 'registrado' };
  }
  // Sem o motivo registrado: só o que descreve a decisão (seção Resultado da ata e o e-mail do cliente), não as lições,
  // que falam de prazo e escopo de forma genérica.
  const corpo = docs.map((d) => (d.meta.tipo_documental === 'email' ? d.body : (secao(d.body, 'Resultados?') ?? ''))).join(' ');
  return { motivos: sugerirMotivos(corpo).slice(0, 2), origem: 'sugerido' };
}

const ROTULO = Object.fromEntries(Object.entries(MOTIVOS_PERDA).map(([k, [r]]) => [k, r]));
const secao = (body, nome) => body.match(new RegExp(`##\\s*${nome}[^\\n]*\\n([\\s\\S]*?)(?=\\n##\\s|$)`, 'i'))?.[1]?.trim() ?? null;

// engine: RadarEngine. Devolve { resposta, dados } no formato das skills.
export function responderPerdas(engine, query, user, { limite = 8 } = {}) {
  const tema = temaDasPerdas(query);
  // Perdidas visíveis ao perfil: com tema, as mais parecidas; sem tema, todas (as mais recentes primeiro).
  let ids;
  if (tema) {
    ids = engine.quickSimilar(tema, user, { status: ['Perdida'] }, 30).filter((x) => x.similaridade >= 0.1).map((x) => x.projeto_id).slice(0, limite);
  } else {
    ids = [...new Set([...engine.docs.values()].filter((d) => d.meta.status_proposta === 'Perdida' && user.confidencialidades.includes(d.meta.confidencialidade)).map((d) => d.meta.projeto_id))];
  }
  const projetos = ids.map((id) => {
    const p = engine.repo.project(id);
    if (!p || !user.confidencialidades.includes(p.confidencialidade)) return null;
    const docs = [...engine.docs.values()].filter((d) => d.meta.projeto_id === id && user.confidencialidades.includes(d.meta.confidencialidade) && (user.verValores || !d.meta.contem_valores));
    const perda = docs.filter((d) => ['ata_validada', 'email', 'case_sucesso'].includes(d.meta.tipo_documental));
    const { motivos, origem } = motivosDoProjeto(perda.length ? perda : docs);
    const licao = perda.map((d) => secao(d.body, 'Lições')).find(Boolean) ?? null;
    return { projeto_id: id, titulo: p.titulo, cliente: p.cliente, segmento: p.segmento, data: p.data_referencia, motivos: motivos.map((m) => m.motivo), origem, licao, contato: p.dono ?? null };
  }).filter(Boolean);
  const sorted = tema ? projetos : projetos.sort((a, b) => String(b.data ?? '').localeCompare(String(a.data ?? ''))).slice(0, 30);
  const contagem = new Map();
  for (const p of sorted) for (const m of p.motivos) contagem.set(m, [...(contagem.get(m) ?? []), p.projeto_id]);
  const motivos = [...contagem].map(([motivo, idsM]) => ({ motivo, rotulo: ROTULO[motivo], n: idsM.length, ids: idsM })).sort((a, b) => b.n - a.n);
  const semMotivo = sorted.filter((p) => !p.motivos.length).length;
  const alvo = tema ? `parecidas com "${tema}"` : 'da base';
  if (!sorted.length) {
    return { resposta: `Não encontrei propostas perdidas ${alvo} entre os projetos que você pode ver. Tente outro tema ou pergunte "por que perdemos propostas?" para ver todas.`, semEvidencia: true, dados: { tema, motivos: [], projetos: [] } };
  }
  const top = motivos.slice(0, 3).map((m) => `${m.rotulo.toLowerCase()} (${m.n})`).join(', ');
  const pessoas = [...new Set(sorted.filter((p) => p.contato).slice(0, 3).map((p) => `${p.contato} ([${p.projeto_id}])`))];
  const resposta = [
    `Olhei ${sorted.length} ${sorted.length === 1 ? 'proposta perdida' : 'propostas perdidas'} ${alvo}.${top ? ` Os motivos mais comuns foram: ${top}.` : ''}${semMotivo ? ` ${semMotivo} sem motivo claro nos documentos.` : ''}`,
    sorted.some((p) => p.licao) ? `Lição registrada${tema ? ' na perda mais parecida' : ' na perda mais recente'}: ${sorted.find((p) => p.licao).licao}` : '',
    pessoas.length ? `Com quem falar: ${pessoas.join('; ')}.` : '',
  ].filter(Boolean).join('\n\n');
  return { resposta, semEvidencia: false, dados: { tema, motivos, projetos: sorted } };
}
