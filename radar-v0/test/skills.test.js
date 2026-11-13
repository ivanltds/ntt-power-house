// Adendo 6: registro de skills, conversa cordial, dúvidas de uso e arquivo anexado na conversa.
// O primeiro teste percorre os exemplos de TODAS as skills do registro: uma skill nova entra no teste sozinha.
import './setup.js';
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { ingest, ROOT, STORE_PATH } from '../src/ingest.js';
import { RadarEngine } from '../src/search.js';
import { SKILLS, INTENCOES, capacidades, preRotear, regrasDoRoteador } from '../src/skills/index.js';
import { toolSchemas, executarFerramenta, FERRAMENTAS } from '../src/skills/ferramentas.js';
import { AnexoStore } from '../src/skills/anexos.js';
import { BaseDeAjuda } from '../src/skills/conhecimento.js';
import { VOCAB } from '../src/intents.js';

let engine;
let anexos;
const CONV = 'conv-teste-anexo';
const ARQUIVO = [
  '# Proposta comercial — Previsão de churn',
  '',
  'Cliente: Rede Bom Preço Supermercados',
  '',
  'Objetivo: prever o cancelamento de clientes do programa de fidelidade e priorizar ações de retenção com modelos de machine learning.',
  '',
  'Prazo estimado de 6 meses, em três fases: diagnóstico, modelo e operação assistida.',
  '',
  'Tecnologias: Databricks, Azure e Power BI.',
  '',
  'Riscos: dependência da qualidade dos dados de transações e disponibilidade do time de CRM do cliente.',
].join('\n');

before(() => {
  execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'generate-corpus.js')]);
  ingest({ reset: true });
  engine = new RadarEngine({ storePath: STORE_PATH });
  anexos = new AnexoStore(fs.mkdtempSync(path.join(os.tmpdir(), 'radar-anexos-')));
  const r = anexos.add(CONV, 'u-gestor', { nome: 'proposta-churn.md', buffer: Buffer.from(ARQUIVO, 'utf8'), clientes: engine.repo.clients() });
  assert.ok(r.anexo, r.erro);
});

const skillDe = (r) => r.entendimento?.skill ?? r.entendimento?.intencao;
const comAnexo = () => ({ anexos: anexos.list(CONV, 'u-gestor'), indiceAnexos: anexos.indice(CONV, 'u-gestor') });

test('registro: exemplos e contraexemplos de todas as skills (golden set gerado do registro)', async () => {
  const erros = [];
  for (const s of SKILLS.filter((x) => x.intencao)) {
    for (const q of s.exemplos) {
      const r = await engine.search(q, { userId: 'u-gestor' });
      if (skillDe(r) !== s.intencao) erros.push(`"${q}" deveria ativar ${s.intencao}, ativou ${skillDe(r)}`);
    }
    for (const q of s.naoAtiva) {
      const r = await engine.search(q, { userId: 'u-gestor' });
      if (skillDe(r) === s.intencao) erros.push(`"${q}" NÃO deveria ativar ${s.intencao}`);
    }
    for (const q of s.exemplosComAnexo ?? []) {
      const r = await engine.search(q, { userId: 'u-gestor', ...comAnexo() });
      if (skillDe(r) !== s.intencao) erros.push(`"${q}" (com arquivo) deveria ativar ${s.intencao}, ativou ${skillDe(r)}`);
    }
  }
  assert.deepEqual(erros, []);
});

test('registro gera o enum de intenções, as regras do roteador e os schemas das ferramentas', () => {
  for (const i of ['buscar', 'conversa', 'ajuda', 'anexo', 'enviar_arquivo', 'esclarecer']) assert.ok(INTENCOES.includes(i), i);
  assert.match(regrasDoRoteador(), /"conversa":/);
  const schemas = toolSchemas(VOCAB);
  assert.equal(schemas.length, FERRAMENTAS.length);
  assert.ok(schemas.every((t) => t.type === 'function' && t.function.name && t.function.parameters.type === 'object'));
  assert.equal(executarFerramenta({ engine, user: engine.user('u-gestor'), vocab: VOCAB }, 'nao_existe').paraIA.erro, 'Ferramenta desconhecida.');
});

test('"olá" recebe saudação com o que o Radar faz e sugestões, sem "Não encontrei" (UC14.1)', async () => {
  const r = await engine.search('olá', { userId: 'u-consultor' });
  assert.equal(r.tipoResposta, 'conversa');
  assert.match(r.resposta, /^Olá, Marina! Sou o Radar/);
  assert.doesNotMatch(r.resposta, /Não encontrei/);
  assert.ok(r.dados.sugestoes.length >= 3);
  assert.equal(r.resultados.length, 0);
});

test('"Boa noite, o que vc pode fazer?" lista capacidades por perfil, com links para a ajuda (UC14.2)', async () => {
  const c = await engine.search('Boa noite, o que vc pode fazer ?', { userId: 'u-consultor' });
  assert.equal(c.dados.conversa, 'capacidades');
  assert.match(c.resposta, /^Boa noite! Posso ajudar/);
  assert.ok(!c.dados.capacidades.some((x) => x.id === 'criar_projeto'), 'consultor não cria projeto');
  assert.ok(c.dados.ajuda.some((l) => l.tipo === 'guia'));
  const g = await engine.search('o que você pode fazer?', { userId: 'u-gestor' });
  assert.ok(g.dados.capacidades.some((x) => x.id === 'criar_projeto'), 'gestor vê criar projeto');
  // Toda skill com capacidade aparece sozinha (lista gerada do registro).
  assert.equal(capacidades(engine.user('u-gestor')).length, SKILLS.filter((s) => s.capacidade).length);
});

test('saudação junto com um pedido cumprimenta e atende o pedido (UC14.1)', async () => {
  const r = await engine.search('bom dia, liste os projetos de varejo', { userId: 'u-gestor' });
  assert.equal(r.tipoResposta, 'listagem');
  assert.match(r.resposta, /^Bom dia! /);
});

test('agradecimento, crítica e fora do escopo têm resposta cordial e com caminho (UC14.4 / UC14.5)', async () => {
  const a = await engine.search('valeu', { userId: 'u-consultor' });
  assert.equal(a.dados.conversa, 'agradecimento');
  const c = await engine.search('essa resposta está errada', { userId: 'u-consultor' });
  assert.ok(c.dados.feedback, 'oferece enviar feedback');
  const f = await engine.search('qual a previsão do tempo?', { userId: 'u-consultor' });
  assert.equal(f.dados.conversa, 'fora_escopo');
  assert.ok(f.semEvidencia && f.dados.sugestoes.length);
});

test('frase sem assunto vira "não entendi" com exemplos, não busca vazia (UC14.6)', async () => {
  const r = await engine.search('faz aí', { userId: 'u-consultor' });
  assert.equal(r.dados.conversa, 'nao_entendi');
  assert.ok(r.dados.capacidades.length > 0);
});

test('dúvida de uso responde com a ajuda e cita a seção (UC14.3)', async () => {
  const r = await engine.search('como favorito uma conversa?', { userId: 'u-consultor' });
  assert.equal(r.tipoResposta, 'ajuda');
  assert.ok(r.dados.fontes.length > 0 && r.dados.ajuda.length > 0);
  assert.match(r.dados.fontes[0].onde, /Conversas/);
  const n = await engine.search('o que mudou nesta versão?', { userId: 'u-consultor' });
  assert.ok(n.dados.novidades.itens.length > 0);
  // A base de ajuda é a mesma fonte da tela (ajuda-conteudo.js e notas-versao.js).
  assert.ok(new BaseDeAjuda().tamanho > 50);
});

test('arquivo anexado: "leia esse arquivo" resume sem pedir projeto e sem enviar à base (UC15.1)', async () => {
  const antes = engine.repo.jobs('u-gestor').length;
  const r = await engine.search('leia esse arquivo', { userId: 'u-gestor', ...comAnexo(), pendentes: 1 });
  assert.equal(r.tipoResposta, 'anexo');
  assert.equal(r.dados.acao, 'resumir');
  assert.match(r.resposta, /não entra na base/);
  assert.equal(r.dados.resumo.prazoMeses, 6);
  assert.ok(r.dados.resumo.tecnologias.includes('Databricks'));
  assert.ok(r.dados.acoes.some((a) => a.acao === 'enviar') && r.dados.acoes.some((a) => a.acao === 'criar'));
  assert.equal(engine.repo.jobs('u-gestor').length, antes, 'nada foi enviado');
  // Sem arquivo na conversa, o Radar explica como anexar.
  const s = await engine.search('leia esse arquivo', { userId: 'u-gestor' });
  assert.equal(s.dados.conversa, 'sem_anexo');
});

test('pergunta sobre o arquivo responde com o trecho dele; "parecido na base" busca projetos (UC15.2 / UC15.3)', async () => {
  const p = await engine.search('quais os riscos?', { userId: 'u-gestor', ...comAnexo() });
  assert.equal(p.dados.acao, 'perguntar');
  assert.match(p.dados.evidencias[0].trecho, /qualidade dos dados/);
  const s = await engine.search('tem algo parecido com isso na base?', { userId: 'u-gestor', ...comAnexo() });
  assert.equal(s.entendimento.skill, 'anexo');
  assert.ok(s.resultados.length > 0, 'trouxe projetos parecidos');
  assert.match(s.resposta, /proposta-churn\.md/);
});

test('envio à base só por pedido explícito e com destino decidido no servidor (UC15.4)', async () => {
  const r = await engine.search('coloca no projeto P003', { userId: 'u-gestor', ...comAnexo(), pendentes: 1 });
  assert.equal(r.tipoResposta, 'enviar_arquivo');
  assert.equal(r.dados.projeto.id, 'P003');
  const o = await engine.search('coloca no projeto de energia', { userId: 'u-gestor', ...comAnexo(), pendentes: 1 });
  assert.ok(!o.dados.projeto && o.dados.opcoes.length >= 1, 'nome vira opções para confirmar');
  assert.equal(preRotear('coloca no projeto P003', { anexos: [], pendentes: 0 })?.skill, undefined, 'sem arquivo pendente não há envio');
});

test('arquivo da conversa é só de quem anexou e some com a conversa (D2)', () => {
  assert.equal(anexos.list(CONV, 'u-consultor').length, 0);
  const tmp = new AnexoStore(fs.mkdtempSync(path.join(os.tmpdir(), 'radar-anexos-')));
  tmp.add('c1', 'u-gestor', { nome: 'a.txt', buffer: Buffer.from('Texto qualquer com conteúdo suficiente para ler.') });
  assert.equal(tmp.list('c1', 'u-gestor').length, 1);
  tmp.remove('c1');
  assert.equal(tmp.list('c1', 'u-gestor').length, 0);
  assert.ok(tmp.add('c2', 'u-gestor', { nome: 'vazio.txt', buffer: Buffer.from('   ') }).erro, 'arquivo sem texto é recusado com aviso');
});

test('trecho da ajuda traz as linhas da pergunta, sem buracos de ícone (CR-056)', async () => {
  const { responderAjuda, destaque } = await import('../src/skills/ajuda.js');
  const { htmlParaTexto } = await import('../src/skills/conhecimento.js');
  const { MockLLM } = await import('../src/llm.js');
  const r = await responderAjuda({ query: 'como favorito uma conversa?', llm: new MockLLM() });
  assert.match(r.dados.fontes[0].trecho, /^Favoritar/, 'começa pela linha que responde, não pelo começo da seção');
  assert.doesNotMatch(r.dados.fontes[0].trecho, /Toda conversa é salva/);
  assert.equal(destaque('linha sem relação nenhuma aqui\nComo exportar o projeto em PDF pelo botão', 'exportar pdf', 1), 'Como exportar o projeto em PDF pelo botão');
  const t = htmlParaTexto('<p>A lista (no celular, no botão <svg><path/></svg>) tem <b>Favoritas</b> , <b>Grupos</b> .</p>');
  assert.doesNotMatch(t, /\s[),.]|\(\s*\)/);
});

test('chat não mostra "dados divergentes"; o aviso fica só na ficha do projeto (CR-055)', () => {
  const ler = (f) => fs.readFileSync(path.join(ROOT, 'public', f), 'utf8');
  assert.doesNotMatch(ler('app.js'), /dados divergentes/);
  assert.doesNotMatch(ler('respostas.js'), /valores divergentes/);
  assert.match(ler('projetos.js'), /diverge entre fontes/);
});

test('fonte da dúvida de uso aparece uma vez só, com "Abrir no guia" dentro; campo sem texto de exemplo (CR-058 / CR-059)', () => {
  const resp = fs.readFileSync(path.join(ROOT, 'public', 'respostas.js'), 'utf8');
  assert.match(resp, /fonte-abrir[^\n]*Abrir no guia/);
  assert.match(resp, /\$\{fontes \? '' : linksAjuda\(d\.ajuda\)\}/, 'sem fonte, os links soltos continuam; com fonte, saem');
  assert.doesNotMatch(fs.readFileSync(path.join(ROOT, 'public', 'index.html'), 'utf8'), /id="query"[^>]*placeholder/);
});

test('conversa informal: IA escreve a resposta; sem IA, modelo natural que não se reapresenta no meio da conversa (CR-061)', async () => {
  const { MockLLM } = await import('../src/llm.js');
  const { responderConversa } = await import('../src/skills/conversa.js');
  class LLMConversa extends MockLLM {
    async grounded({ payload }) { this.ultimo = payload; return { resposta: 'Boa noite, Marina! Tudo ótimo por aqui, e com você? Se quiser, já procuro uma referência para a sua proposta.' }; }
  }
  const llm = new LLMConversa();
  const e2 = new RadarEngine({ storePath: STORE_PATH, llm });
  const r = await e2.search('boa noite, tudo bem?', { userId: 'u-consultor' });
  assert.equal(r.tipoResposta, 'conversa');
  assert.match(r.resposta, /^Boa noite, Marina! Tudo ótimo/);
  assert.equal(llm.ultimo.primeira_mensagem, true);
  const meio = await e2.search('tudo bem com você?', { userId: 'u-consultor', history: [{ pergunta: 'liste os projetos', resultados: [] }] });
  assert.equal(llm.ultimo.primeira_mensagem, false, 'a IA sabe que a conversa já começou');
  assert.equal(meio.dados.conversa, 'saudacao');
  // Sem IA (modelo de texto): no meio da conversa não se reapresenta e responde ao "tudo bem?".
  const user = engine.user('u-consultor');
  const t = responderConversa('saudacao', { user, capacidades: [], query: 'boa noite, tudo bem?', history: [{}] });
  assert.doesNotMatch(t.resposta, /Sou o Radar/);
  assert.match(t.resposta, /Tudo ótimo por aqui/);
  assert.match(responderConversa('papo', { user, capacidades: [], query: 'qual seu nome?' }).resposta, /Eu sou o Radar/);
});

test('percentual realista: escala absoluta, status como desempate e teto pela relevância da IA (CR-064)', async () => {
  const { MockLLM } = await import('../src/llm.js');
  // Sem IA: pergunta sem referência boa não vira "Muito parecido"; a forte continua alta.
  const fraca = await engine.search('sistema de gestão para uma padaria', { userId: 'u-gestor' });
  assert.ok(fraca.resultados.every((r) => r.score < 0.6), `fraca: ${fraca.resultados.map((r) => r.score)}`);
  const forte = await engine.search('Já fizemos projetos de churn em telecom?', { userId: 'u-gestor' });
  assert.equal(forte.resultados[0].projeto_id, 'P008');
  assert.ok(forte.resultados[0].score >= 0.85);
  // Com IA: relevância 0,45 limita o percentual a 0,55, mesmo com segmento e status a favor.
  class IAMorna extends MockLLM {
    async analyze({ candidates }) {
      return { avaliacoes: Object.fromEntries(candidates.map((c) => [c.projeto_id, { relevancia: 0.45, justificativa: 'semelhança parcial', evidencia: null }])), resposta: 'Há uma referência parcial [P006].', ia: { provedor: 'deepseek', fallback: false } };
    }
  }
  const e3 = new RadarEngine({ storePath: STORE_PATH, llm: new IAMorna() });
  const r = await e3.search('projetos de fraude em seguros', { userId: 'u-gestor' });
  assert.ok(r.resultados.length && r.resultados.every((x) => x.score <= 0.55 + 1e-9), `teto: ${r.resultados.map((x) => x.score)}`);
  // Status só desempata: vale na proporção do conteúdo.
  const st = forte.resultados[0].fatores.find((f) => /Status/.test(f.fator));
  const ct = forte.resultados[0].fatores[0];
  assert.ok(st.valor <= ct.valor + 1e-9);
});
