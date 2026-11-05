// Reproduz a conversa de 05/11 12h46 (consultor) que terminou com resposta incoerente.
import path from 'node:path';
import os from 'node:os';
import { RadarEngine } from '../src/search.js';
import { MockLLM } from '../src/llm.js';
import { createLLM } from '../src/deepseek.js';
import { loadEnv } from '../src/env.js';
import { ROOT } from '../src/config.js';
import { ConversationStore } from '../src/conversations.js';

export const CONVERSA = [
  'Quais segmentos já atendemos?',
  'quais de utilities ou energia já estão entregues',
  'quais as principais empresas de energia que trabalhamos?',
  'quais os resultados neles?',
];

export async function rodar(engine, perguntas = CONVERSA, userId = 'u-consultor') {
  const store = new ConversationStore(path.join(os.tmpdir(), `radar-repro-${process.pid}.json`));
  const c = store.open(null, { userId });
  const out = [];
  for (const q of perguntas) {
    const r = await engine.search(q, { userId, history: store.history(c) });
    store.addTurn(c, { turnoId: String(out.length), pergunta: q, resultado: r });
    out.push(r);
  }
  return out;
}

if (process.argv[1]?.endsWith('repro-conversa.js')) {
  loadEnv(path.join(ROOT, '.env'));
  const engine = new RadarEngine({ llm: process.argv.includes('--ia') ? createLLM() : new MockLLM() });
  const rs = await rodar(engine);
  rs.forEach((r, i) => console.log(`\n### ${CONVERSA[i]}\n[${r.tipoResposta ?? 'semelhantes'} | ${r.entendimento?.intencao} | ${r.entendimento?.consulta}] campo=${r.dados?.campo ?? ''}\n${r.resposta}\nprojetos: ${(r.resultados ?? []).map((x) => x.projeto_id).join(',')} ${(r.dados?.itens ?? []).map((x) => x.projeto_id ?? x.valor).join(',')}`));
}
