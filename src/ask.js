// Consulta pela linha de comando.
// Uso: node src/ask.js "pergunta" [--user u-gestor] [--oportunidade O-2026-01] [--json]

import path from 'node:path';
import { RadarEngine } from './search.js';
import { ROOT } from './ingest.js';
import { loadEnv } from './env.js';
import { createLLM } from './deepseek.js';

loadEnv(path.join(ROOT, '.env'));

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args.splice(i, 2)[1] : undefined;
};
const userId = flag('--user');
const opportunityId = flag('--oportunidade');
const asJson = args.includes('--json') && args.splice(args.indexOf('--json'), 1);
const query = args.join(' ').trim();
if (!query) {
  console.error('Uso: npm run ask -- "sua pergunta" [--user u-gestor] [--oportunidade O-2026-01] [--json]');
  process.exit(1);
}

const r = await new RadarEngine({ llm: createLLM() }).search(query, { userId, opportunityId });
if (asJson) {
  console.log(JSON.stringify(r, null, 2));
  process.exit(0);
}

console.log(`\nPergunta: ${r.query}`);
console.log(`Usuário: ${r.usuario.nome}${r.oportunidade ? ` · Oportunidade: ${r.oportunidade.id} (${r.oportunidade.cliente})` : ''}`);
console.log(`IA: ${r.ia.provedor}${r.ia.fallback ? ` — ${r.ia.erro}` : ''}`);
console.log(`Consulta interpretada: ${r.entendimento.consulta}`);
console.log(`Entidades: ${JSON.stringify(r.entidades)}`);
console.log(`\n${r.resposta}\n`);
r.resultados.forEach((x, i) => {
  console.log(`${i + 1}. [${Math.round(x.score * 100)}%] ${x.titulo} — ${x.cliente} (${x.status})`);
  console.log(`   ${x.fatores.map((f) => `${f.fator}: ${Math.round(f.valor * 100)}%×${f.peso}`).join(' | ')}`);
  console.log(`   ${x.justificativa}`);
  for (const c of x.conflitos) console.log(`   ⚠ Conflito em ${c.campo}: ${c.motivo}`);
  console.log(`   Fontes: ${x.fontes.map((f) => f.arquivo).join(', ')}`);
});
if (r.complementares.length) {
  console.log(`\nÁreas complementares: ${r.complementares.map((c) => `${c.servico} (${c.projetos.length})`).join(', ')}`);
}
console.log(`\n${r.candidatosAvaliados} projetos avaliados em ${r.tempoMs} ms`);
