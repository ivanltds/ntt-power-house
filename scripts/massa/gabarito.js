// Gabarito da massa de testes: 60 perguntas com a resposta esperada, tirada do planejamento (os fatos são conhecidos).
// Tipos: tema (25), tema + setor (20), com quem falar (5), motivo de perda (5) e contagem por setor (5).
// Uso: node scripts/massa/gabarito.js   → data/massa/gabarito.json

import fs from 'node:fs';
import path from 'node:path';
import { MASSA_DIR, TEMAS, ROTULO_MOTIVO } from './planejar.js';

const plano = JSON.parse(fs.readFileSync(path.join(MASSA_DIR, 'planejamento.json'), 'utf8')).projetos;
const conta = (lista, f) => [...lista.reduce((m, x) => m.set(f(x), (m.get(f(x)) ?? 0) + 1), new Map())].sort((a, b) => b[1] - a[1]);
const GANHO = ['Vendida', 'Em execução', 'Entregue'];
const perguntas = [];

// 1) Tema: "já fizemos X?" — esperados = projetos do tema; os ganhos são os mais úteis.
for (const t of TEMAS) {
  const ps = plano.filter((p) => p.tema === t.id);
  perguntas.push({ id: `T-${t.id}`, tipo: 'tema', pergunta: `Já fizemos projetos de ${t.nome}?`, tema: t.id, esperados: ps.map((p) => p.id), ganhos: ps.filter((p) => GANHO.includes(p.status)).map((p) => p.id) });
}
// 2) Tema + setor: as 20 combinações com mais projetos (todas com 3 ou mais).
const combos = conta(plano, (p) => `${p.tema}|${p.setor}`).filter(([, n]) => n >= 3).slice(0, 20);
for (const [k] of combos) {
  const [tema, setor] = k.split('|');
  const t = TEMAS.find((x) => x.id === tema);
  const ps = plano.filter((p) => p.tema === tema && p.setor === setor);
  perguntas.push({ id: `TS-${tema}-${setor}`, tipo: 'tema_setor', pergunta: `Temos projetos de ${t.nome} em ${setor}?`, tema, setor, esperados: ps.map((p) => p.id), ganhos: ps.filter((p) => GANHO.includes(p.status)).map((p) => p.id) });
}
// 3) Com quem falar: a resposta deve citar alguém que conduziu projeto do tema.
for (const t of TEMAS.filter((x) => plano.filter((p) => p.tema === x.id).length >= 15).slice(0, 5)) {
  const ps = plano.filter((p) => p.tema === t.id);
  perguntas.push({ id: `Q-${t.id}`, tipo: 'quem', pergunta: `Quem já fez projetos de ${t.nome} e com quem posso falar?`, tema: t.id, esperados: ps.map((p) => p.id), pessoas: [...new Set(ps.map((p) => p.dono))] });
}
// 4) Motivo de perda por tema: o motivo mais comum entre as perdidas do tema.
for (const t of TEMAS.filter((x) => plano.filter((p) => p.tema === x.id && p.status === 'Perdida').length >= 6).slice(0, 5)) {
  const perdidas = plano.filter((p) => p.tema === t.id && p.status === 'Perdida');
  const [motivo, n] = conta(perdidas, (p) => p.motivoPerda)[0];
  perguntas.push({ id: `M-${t.id}`, tipo: 'motivo', pergunta: `Por que perdemos propostas de ${t.nome}?`, tema: t.id, esperados: perdidas.map((p) => p.id), motivo, motivoRotulo: ROTULO_MOTIVO[motivo], ocorrencias: n });
}
// 5) Contagem por setor (só a massa; a base real soma também a piloto e os cadastros).
for (const [setor, n] of conta(plano, (p) => p.setor).slice(0, 5)) {
  perguntas.push({ id: `C-${setor}`, tipo: 'contagem', pergunta: `Quantos projetos temos em ${setor}?`, setor, total: n, ganhos: plano.filter((p) => p.setor === setor && GANHO.includes(p.status)).length });
}

fs.writeFileSync(path.join(MASSA_DIR, 'gabarito.json'), JSON.stringify({ geradoEm: '2026-11-23', perguntas }, null, 1));
console.log(`gabarito: ${perguntas.length} perguntas`, conta(perguntas, (q) => q.tipo));
