// Massa de testes V0.0.3: a IA escreve os textos de cada projeto planejado (scripts/massa/planejar.js).
// Os fatos (setor, tema, status, valores, motivo de perda…) vêm do planejamento; a IA só redige, sem mudar fatos.
// Um arquivo por projeto em data/massa/textos/<id>.json: dá para interromper e retomar (pula o que já existe).
// Uso: node scripts/massa/escrever.js [--limite 20] [--paralelo 6]

import fs from 'node:fs';
import path from 'node:path';
import { loadEnv } from '../../src/env.js';
import { MASSA_DIR, ROTULO_MOTIVO, ROTULO_GANHO } from './planejar.js';

const ROOT = path.resolve(MASSA_DIR, '..', '..');
loadEnv(path.join(ROOT, '.env'));
const KEY = process.env.DEEPSEEK_API_KEY;
const BASE = process.env.DEEPSEEK_BASE_URL ?? 'https://api.deepseek.com';
const MODELO = process.env.DEEPSEEK_MODEL ?? 'deepseek-chat';
if (!KEY) throw new Error('DEEPSEEK_API_KEY ausente no .env');

const arg = (nome, padrao) => { const i = process.argv.indexOf(`--${nome}`); return i > 0 ? Number(process.argv[i + 1]) : padrao; };
const LIMITE = arg('limite', Infinity);
const PARALELO = arg('paralelo', 6);
const DIR = path.join(MASSA_DIR, 'textos');
fs.mkdirSync(DIR, { recursive: true });

const SISTEMA = `Você escreve documentos FICTÍCIOS e realistas de propostas comerciais de uma consultoria de TI brasileira (NTT DATA Brasil), para uma base de testes.
Regras:
- Português do Brasil, tom profissional, frases concretas com números plausíveis (volumes, percentuais, prazos). Nada genérico.
- Use EXATAMENTE os fatos dados (cliente, setor, tema, status, prazo, tecnologias, serviços, motivo). Não invente outro cliente nem outras tecnologias principais.
- Nomes de pessoas do cliente são inventados. Nunca cite empresas reais.
- Responda SOMENTE com um JSON válido no formato pedido.`;

function pedido(p) {
  const ganho = ['Entregue', 'Em execução', 'Vendida'].includes(p.status);
  const campos = {
    titulo: 'título curto do projeto (até 90 caracteres), específico do tema e do cliente, sem o nome do cliente',
    problema: 'contexto e desafio do cliente em 2 a 3 frases, com números do negócio',
    objetivo: 'objetivo do projeto em 1 a 2 frases',
    escopo: 'lista de 4 a 5 itens do escopo técnico, citando as tecnologias',
    entregaveis: 'lista de 4 a 5 entregáveis',
    fases: 'lista de 3 a 4 fases com duração em semanas, somando o prazo',
    equipe: 'composição da equipe em uma frase (ex.: "1 arquiteto de dados, 2 engenheiros de dados e 1 gerente de projeto")',
    riscos: 'lista de 3 riscos do projeto, curtos',
    pessoas: 'objeto { "cliente": "Nome Sobrenome (cargo no cliente)", "tecnico": "Nome Sobrenome (papel técnico na NTT DATA)" }',
  };
  if (p.status === 'Entregue' || p.status === 'Em execução') campos.resultados = p.status === 'Entregue' ? 'resultados alcançados em 1 a 2 frases, com 2 números concretos (percentual e/ou valor em R$)' : 'resultados parciais até agora, em 1 frase com 1 número';
  if (p.status === 'Entregue') campos.licoes = 'lições aprendidas em 2 frases: 1 coisa que atrasou ou custou mais e 1 que foi decisiva para dar certo';
  if (p.status === 'Perdida') {
    campos.resultados = `por que a proposta foi perdida, em 1 a 2 frases, deixando claro o motivo: ${ROTULO_MOTIVO[p.motivoPerda]}`;
    campos.licoes = 'lição aprendida da perda em 1 a 2 frases, prática, para a próxima proposta parecida';
    campos.retorno = 'e-mail curto (3 a 4 frases) do cliente comunicando a decisão e o motivo, assinado pela pessoa do cliente';
  }
  if (p.status === 'Cancelada') campos.resultados = 'por que a oportunidade foi cancelada pelo cliente, em 1 frase';
  if (ganho) campos.diferencial = `por que ganhamos, em 1 frase, coerente com: ${ROTULO_GANHO[p.motivoGanho]}`;
  const fatos = {
    cliente: p.cliente, setor: p.setor, tema: p.temaNome, status: p.status, prazo_meses: p.prazo, tecnologias: p.tecnologias, servicos: p.servicos,
    continuidade_de_projeto_anterior_no_cliente: p.continuidade, area_ntt: p.area,
  };
  return `Fatos do projeto (não altere): ${JSON.stringify(fatos)}\nDevolva um JSON com estas chaves:\n${Object.entries(campos).map(([k, v]) => `- "${k}": ${v}`).join('\n')}`;
}

async function escrever(p, tentativa = 1) {
  const res = await fetch(`${BASE}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${KEY}` },
    body: JSON.stringify({ model: MODELO, temperature: 0.8, response_format: { type: 'json_object' }, max_tokens: 1800, messages: [{ role: 'system', content: SISTEMA }, { role: 'user', content: pedido(p) }] }),
    signal: AbortSignal.timeout(90_000),
  });
  if (!res.ok) {
    if (tentativa < 4) { await new Promise((ok) => setTimeout(ok, 3000 * tentativa)); return escrever(p, tentativa + 1); }
    throw new Error(`HTTP ${res.status}`);
  }
  const j = await res.json();
  const t = JSON.parse(j.choices[0].message.content);
  for (const k of ['titulo', 'problema', 'objetivo', 'escopo', 'entregaveis', 'fases', 'equipe', 'riscos']) if (!t[k]) throw new Error(`faltou ${k}`);
  if (/NTT DATA/i.test(t.titulo)) t.titulo = t.titulo.replace(/\s*[-–—|]?\s*NTT DATA\s*/gi, ' ').trim();
  return { ...t, uso: j.usage };
}

const plano = JSON.parse(fs.readFileSync(path.join(MASSA_DIR, 'planejamento.json'), 'utf8'));
const fila = plano.projetos.filter((p) => !fs.existsSync(path.join(DIR, `${p.id}.json`))).slice(0, LIMITE);
console.log(`a escrever: ${fila.length} de ${plano.total}`);
let feitos = 0, falhas = 0, tokens = 0;
const t0 = Date.now();
async function trabalhador() {
  while (fila.length) {
    const p = fila.shift();
    try {
      const t = await escrever(p);
      tokens += t.uso?.total_tokens ?? 0;
      delete t.uso;
      fs.writeFileSync(path.join(DIR, `${p.id}.json`), JSON.stringify(t, null, 1));
      feitos += 1;
    } catch (err) {
      falhas += 1;
      console.log(`falhou ${p.id}: ${err.message}`);
    }
    if ((feitos + falhas) % 25 === 0) console.log(`${feitos} feitos, ${falhas} falhas, ${tokens} tokens, ${Math.round((Date.now() - t0) / 1000)} s`);
  }
}
await Promise.all(Array.from({ length: PARALELO }, trabalhador));
console.log(`fim: ${feitos} feitos, ${falhas} falhas, ${tokens} tokens, ${Math.round((Date.now() - t0) / 1000)} s`);
