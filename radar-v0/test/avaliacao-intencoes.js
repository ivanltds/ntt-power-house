// Conjunto de avaliação do roteamento por intenção (adendo 5, seção 3.6 — spike B × C).
// Uso: node --disable-warning=ExperimentalWarning test/avaliacao-intencoes.js [--ia]
//   sem --ia: só regras (modo offline);  com --ia: DeepSeek, se DEEPSEEK_API_KEY estiver no .env.
// As 5 primeiras são as perguntas reais do teste com o time (2026-11-03, 14h–15h30).

import path from 'node:path';
import { RadarEngine } from '../src/search.js';
import { MockLLM } from '../src/llm.js';
import { createLLM } from '../src/deepseek.js';
import { loadEnv } from '../src/env.js';
import { ROOT } from '../src/config.js';

export const CASOS = [
  ['já fizemos algum projeto relacionado com seguros?', 'semelhantes', 'u-consultor'],
  ['faça um consolidado de todos os projetos que estão no seu banco', 'listagem', 'u-consultor'],
  ['preciso de uma listagem de todas às areas que existem projetos', 'contagem', 'u-consultor'],
  ['preciso saber quais são as áreas que possuem projetos salvos', 'contagem', 'u-consultor'],
  ['Quais são o prazo, o valor estimado, a margem e o responsável pelo projeto Plataforma de dados para redução de perdas não técnicas? Informe também o link do repositório.', 'ficha', 'u-gestor'],
  // Variações de listagem
  ['liste todos os projetos', 'listagem'],
  ['quantos projetos temos na base?', 'listagem'],
  ['liste as propostas perdidas', 'listagem'],
  ['quais projetos foram entregues em 2025?', 'listagem'],
  ['mostre todos os projetos de varejo', 'listagem'],
  ['inventário de projetos de Utilities / Energia', 'listagem'],
  // Variações de contagem
  ['quais segmentos já atendemos?', 'contagem'],
  ['quantos projetos por tecnologia?', 'contagem'],
  ['quais clientes temos na base?', 'contagem'],
  ['quantos projetos por status', 'contagem'],
  ['liste as tecnologias usadas nos projetos', 'contagem'],
  ['distribuição de projetos por ano', 'contagem'],
  // Ficha
  ['qual o prazo do projeto P003?', 'ficha'],
  ['quem é o responsável pelo P008?', 'ficha'],
  ['ficha do projeto Predição de churn em tempo real para banda larga', 'ficha'],
  ['qual a margem do P001?', 'ficha', 'u-consultor'],
  // Comparação
  ['compare o P006 com o P001', 'comparacao'],
  ['qual a diferença entre P001 e P002?', 'comparacao'],
  // Parecidos (não podem virar listagem)
  ['projetos de churn em telecom', 'semelhantes'],
  ['liste projetos de previsão de demanda', 'semelhantes'],
  ['Propostas de utilities com Databricks', 'semelhantes'],
  ['Quanto custou um projeto de antifraude?', 'semelhantes', 'u-gestor'],
  ['migração de data warehouse para Azure Synapse com LGPD', 'semelhantes', 'u-gestor'],
  ['que riscos costumam aparecer em projetos de IA generativa?', 'semelhantes'],
  ['tem algum case de manutenção preditiva?', 'semelhantes'],
];

const tipo = (r) => r.tipoResposta ?? 'semelhantes';

export async function avaliar(engine, casos = CASOS) {
  const linhas = [];
  for (const [pergunta, esperado, usuario = 'u-consultor'] of casos) {
    const t0 = Date.now();
    const r = await engine.search(pergunta, { userId: usuario });
    linhas.push({ pergunta, esperado, obtido: tipo(r), ok: tipo(r) === esperado, ms: Date.now() - t0, resposta: r.resposta, ia: r.ia });
  }
  return linhas;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1'))) {
  loadEnv(path.join(ROOT, '.env'));
  const comIA = process.argv.includes('--ia');
  const engine = new RadarEngine({ llm: comIA ? createLLM() : new MockLLM() });
  const linhas = await avaliar(engine);
  for (const l of linhas) console.log(`${l.ok ? 'OK ' : 'ERR'} ${l.esperado.padEnd(12)} ${l.obtido.padEnd(14)} ${String(l.ms).padStart(5)} ms  ${l.pergunta.slice(0, 80)}${process.argv.includes('-v') ? `\n      ${l.resposta}` : ''}`);
  const ok = linhas.filter((l) => l.ok).length;
  const tempo = linhas.reduce((s, l) => s + l.ms, 0) / linhas.length;
  console.log(`\n${comIA ? 'Com IA' : 'Só regras'}: ${ok}/${linhas.length} intenções certas (${Math.round((ok / linhas.length) * 100)}%) · tempo médio ${Math.round(tempo)} ms · IA: ${linhas[0].ia?.provedor}${linhas.some((l) => l.ia?.fallback) ? ' (com fallback)' : ''}`);
}
