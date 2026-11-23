// Avalia o Radar contra o gabarito da massa (scripts/massa/gabarito.js). Mede a hipótese com números:
//   acerto@3: a pergunta tem ao menos 1 projeto certo entre os 3 primeiros;
//   precisão@3: fração dos 3 primeiros que é do tema (e do setor, quando pedido);
//   pessoa citada (com quem falar), motivo de perda citado e contagem correta.
// Uso: node scripts/massa/avaliar.js [--ia]   (sem --ia usa as regras locais; com --ia, o DeepSeek do .env)
// O banco e a base vetorial usados são os do RADAR_DATA_DIR (ou data/).

import fs from 'node:fs';
import path from 'node:path';
import { MASSA_DIR } from './planejar.js';
import { loadEnv } from '../../src/env.js';

const ROOT = path.resolve(MASSA_DIR, '..', '..');
if (process.argv.includes('--ia')) loadEnv(path.join(ROOT, '.env'));
const { RadarEngine } = await import('../../src/search.js');
const { createLLM } = await import('../../src/deepseek.js');
const { MockLLM } = await import('../../src/llm.js');
const { normalize } = await import('../../src/text.js');

const engine = new RadarEngine({ llm: process.argv.includes('--ia') ? createLLM() : new MockLLM() });
const plano = new Map(JSON.parse(fs.readFileSync(path.join(MASSA_DIR, 'planejamento.json'), 'utf8')).projetos.map((p) => [p.id, p]));
const { perguntas } = JSON.parse(fs.readFileSync(path.join(MASSA_DIR, 'gabarito.json'), 'utf8'));

const linhas = [];
const soma = {};
const acc = (tipo, k, v) => { soma[tipo] ??= { n: 0 }; soma[tipo][k] = (soma[tipo][k] ?? 0) + v; };
for (const q of perguntas) {
  const t0 = Date.now();
  const r = await engine.search(q.pergunta, { userId: 'u-gestor' });
  const ms = Date.now() - t0;
  const ids = [...(r.resultados ?? []).map((x) => x.projeto_id), ...(r.dados?.itens ?? []).map((x) => x.projeto_id), ...(r.dados?.projetos ?? []).map((x) => x.projeto_id)];
  const top3 = ids.slice(0, 3);
  const certo = (id) => { const p = plano.get(id); return p && p.tema === q.tema && (!q.setor || p.setor === q.setor); };
  const texto = normalize(r.resposta ?? '');
  const l = { id: q.id, tipo: q.tipo, tipoResposta: r.tipoResposta ?? 'semelhantes', ms, top3 };
  soma[q.tipo] ??= { n: 0 };
  soma[q.tipo].n += 1;
  acc(q.tipo, 'ms', ms);
  if (['tema', 'tema_setor', 'quem', 'motivo'].includes(q.tipo)) {
    l.acerto3 = top3.some(certo);
    l.precisao3 = top3.length ? top3.filter(certo).length / top3.length : 0;
    acc(q.tipo, 'acerto3', l.acerto3 ? 1 : 0);
    acc(q.tipo, 'precisao3', l.precisao3);
  }
  if (q.tipo === 'quem') { l.pessoa = q.pessoas.some((n) => texto.includes(normalize(n))); acc(q.tipo, 'pessoa', l.pessoa ? 1 : 0); }
  if (q.tipo === 'motivo') { l.motivo = normalize(q.motivoRotulo).split(' ').filter((w) => w.length > 4).some((w) => texto.includes(w)); acc(q.tipo, 'motivo', l.motivo ? 1 : 0); }
  if (q.tipo === 'contagem') { l.total = r.dados?.total ?? null; l.esperadoMassa = q.total; }
  linhas.push(l);
}

const pc = (v, n) => `${Math.round((100 * v) / n)}%`;
console.log('\nResultado por tipo de pergunta');
for (const [tipo, s] of Object.entries(soma)) {
  console.log(`- ${tipo}: ${s.n} perguntas · tempo médio ${Math.round(s.ms / s.n)} ms${s.acerto3 != null ? ` · acerto@3 ${pc(s.acerto3, s.n)} · precisão@3 ${pc(s.precisao3, s.n)}` : ''}${s.pessoa != null ? ` · pessoa citada ${pc(s.pessoa, s.n)}` : ''}${s.motivo != null ? ` · motivo citado ${pc(s.motivo, s.n)}` : ''}`);
}
const erros = linhas.filter((l) => l.acerto3 === false).map((l) => l.id);
if (erros.length) console.log(`Sem projeto certo entre os 3 primeiros: ${erros.join(', ')}`);
const contagens = linhas.filter((l) => l.tipo === 'contagem');
if (contagens.length) console.log(`Contagem (base total × só a massa): ${contagens.map((l) => `${l.id.slice(2)} ${l.total} × ${l.esperadoMassa}`).join(' · ')}`);
fs.writeFileSync(path.join(MASSA_DIR, `avaliacao-${process.argv.includes('--ia') ? 'ia' : 'regras'}.json`), JSON.stringify({ em: new Date().toISOString(), soma, linhas }, null, 1));
