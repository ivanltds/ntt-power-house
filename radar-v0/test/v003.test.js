// V0.0.3 (adendo 7 e melhorias de 19/11): one page, apresentação de cases, conversa na ficha, ano fiscal,
// ganhamos × perdemos, sinais do setor e "com quem falar".
import './setup.js';
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { ingest, ROOT, STORE_PATH } from '../src/ingest.js';
import { RadarEngine } from '../src/search.js';
import { onePageContent, onePageSlide, anonimizar, numerosEmDestaque, secaoDoc, aplicarEdicoes } from '../src/export/onepage.js';
import { exportOnePage, exportApresentacao, casesParaApresentacao } from '../src/export/index.js';
import { pedeOnePage, pedeApresentacao, temaDoPedido } from '../src/skills/cases.js';
import { fyDe, rotuloFY, montarPainel } from '../src/painel.js';
import { sugerirMotivos } from '../src/motivos.js';
import { SinaisStore, lerFeed, classificar } from '../src/sinais.js';
import { ConversationStore } from '../src/conversations.js';

let engine;
const gestor = () => engine.user('u-gestor');
const consultor = () => engine.user('u-consultor');

before(() => {
  execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'generate-corpus.js')]);
  ingest({ reset: true });
  engine = new RadarEngine({ storePath: STORE_PATH });
});

test('one page: blocos com fonte, cliente anônimo por padrão e sem número inventado (CR-075)', () => {
  const c = onePageContent(engine, 'P001', gestor());
  assert.equal(c.ehCase, true);
  assert.equal(c.projeto.cliente, 'grande cliente do setor Utilities / Energia');
  const tudo = JSON.stringify({ blocos: c.blocos, fontes: c.fontes, titulo: c.projeto.titulo });
  assert.doesNotMatch(tudo, /Energisul/, 'o nome do cliente não aparece em nenhum bloco nem nas fontes');
  const r = c.blocos.find((b) => b.key === 'resultados');
  assert.deepEqual(r.numeros, ['14%', '41%', 'R$ 18 milhões']);
  assert.ok(c.fontes.some((f) => f.tipo === 'Case de sucesso'));
  // Citar o cliente: só o gestor, e nunca em projeto confidencial.
  assert.equal(onePageContent(engine, 'P001', gestor(), { citar: true }).projeto.cliente, 'Energisul Distribuidora');
  assert.equal(onePageContent(engine, 'P005', gestor(), { citar: true }).citado, false, 'P005 é confidencial');
  assert.equal(onePageContent(engine, 'P001', consultor(), { citar: true }).citado, false);
});

test('one page: consultor sem investimento, confidencial invisível, não-case só como interno (R1P1, R1P4)', () => {
  const c = onePageContent(engine, 'P001', consultor());
  assert.ok(!c.blocos.some((b) => b.key === 'investimento'));
  assert.equal(onePageContent(engine, 'P005', consultor()), null);
  assert.equal(exportOnePage(engine, 'P005', consultor(), { formato: 'pdf' }).naoEncontrado, true);
  const naoCase = exportOnePage(engine, 'P007', gestor(), { formato: 'pdf' });
  assert.equal(naoCase.naoCase, true);
  const interno = exportOnePage(engine, 'P007', gestor(), { formato: 'pdf', interno: true });
  assert.equal(interno.interno, true);
  const textos = (els) => els.filter((e) => e.t === 'text').flatMap((e) => e.paras.flatMap((p) => p.runs.map((r) => r.text))).join(' ');
  assert.match(textos(onePageSlide(onePageContent(engine, 'P007', gestor()), { interno: true })), /USO INTERNO/);
  assert.doesNotMatch(textos(onePageSlide(onePageContent(engine, 'P001', gestor()))), /Energisul/);
  const pptx = exportOnePage(engine, 'P001', gestor(), { formato: 'pptx' });
  assert.equal(pptx.nome, 'Case - Plataforma de dados para redução de perdas não técnicas - One page.pptx');
});

test('one page: edição da prévia é mascarada e não reintroduz o cliente', () => {
  const c = onePageContent(engine, 'P001', gestor());
  aplicarEdicoes(c, { beneficios: 'A Energisul reduziu perdas. Contato: ana@exemplo.com' }, 'Energisul Distribuidora');
  const b = c.blocos.find((x) => x.key === 'beneficios');
  assert.doesNotMatch(b.texto, /Energisul|ana@exemplo/);
  assert.equal(b.vazio, false);
  assert.equal(anonimizar('A Energisul Distribuidora e a Energisul', 'Energisul Distribuidora', 'Energia'), 'A grande cliente do setor Energia e a grande cliente do setor Energia');
  assert.deepEqual(numerosEmDestaque('R$ 300 mil e 3 p.p.'), ['R$ 300 mil', '3 p.p.']);
  assert.equal(secaoDoc('# T\n\n## Desafio\n\nTexto do desafio.\n\n## Solução\n\nOutro.', ['Desafio']), 'Texto do desafio.');
});

test('apresentação de cases: só ganhos, consolidado e uma one page por case (CR-076)', async () => {
  const r = await casesParaApresentacao(engine, gestor(), { ids: ['P001', 'P004', 'P006'] });
  assert.deepEqual(r.candidatos.map((c) => c.projeto_id).sort(), ['P001', 'P006']);
  assert.equal(r.removidos, 1, 'a perdida sai e é contada');
  const d = exportApresentacao(engine, gestor(), { ids: ['P001', 'P006', 'P004'], tema: 'dados e IA', formato: 'pdf', aprendizados: true });
  assert.deepEqual(d.ids, ['P001', 'P006']);
  assert.deepEqual(d.fora, ['P004']);
  assert.equal(d.slides, 2 + 2 + 1 + 1, 'capa, consolidado, 2 one pages, aprendizados e fontes');
  assert.match(exportApresentacao(engine, gestor(), { ids: Array.from({ length: 9 }, (_, i) => `P00${i + 1}`) }).erro, /No máximo 8/);
});

test('chat: one page e apresentação pelo registro de skills', async () => {
  assert.ok(pedeOnePage('gera a one page do P003') && !pedeOnePage('como gero uma one page?'));
  assert.ok(pedeApresentacao('monta uma apresentação sobre fraude em seguros') && !pedeApresentacao('qual a apresentação comercial do P003?'));
  assert.equal(temaDoPedido('monta uma apresentação de uns 10 slides sobre fraude em seguros com nossos cases'), 'fraude em seguros');
  assert.equal(temaDoPedido('tem algum case de antifraude em seguros? gera uma one page'), 'antifraude em seguros');
  const op = await engine.search('gera a one page do P001', { userId: 'u-gestor' });
  assert.equal(op.tipoResposta, 'onepage');
  assert.equal(op.dados.projeto.id, 'P001');
  assert.doesNotMatch(op.resposta, /Energisul/);
  const negado = await engine.search('gera a one page do P005', { userId: 'u-consultor' });
  assert.match(negado.resposta, /Não encontrei o P005/);
  const ap = await engine.search('monta uma apresentação sobre churn em telecom com nossos cases', { userId: 'u-gestor' });
  assert.equal(ap.tipoResposta, 'apresentacao');
  assert.ok(ap.dados.candidatos.every((c) => ['Vendida', 'Em execução', 'Entregue'].includes(c.status)));
});

test('conversa na ficha: foco fixo no projeto e retomada da última conversa (CR-077)', async () => {
  const store = new ConversationStore(path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'radar-cf-')), 'c.json'));
  const c = store.open(null, { userId: 'u-gestor', projetoId: 'P003' });
  assert.equal(c.oportunidadeId, 'P003');
  const r = await engine.search('Quais projetos são parecidos com este?', { userId: 'u-gestor', opportunityId: 'P003' });
  assert.ok(!r.resultados.some((x) => x.projeto_id === 'P003'), 'o projeto em foco não aparece no próprio resultado');
  store.addTurn(c, { turnoId: 't1', pergunta: 'x', resultado: r });
  store.save(c.id, 'u-gestor');
  assert.equal(store.ultimaDoProjeto('u-gestor', 'P003').id, c.id);
  assert.equal(store.ultimaDoProjeto('u-consultor', 'P003'), null);
  assert.equal(store.list('u-gestor')[0].projetoId, 'P003');
});

test('com quem falar: o resultado traz o responsável e a resposta cita os contatos (R19-05)', async () => {
  const r = await engine.search('quem já fez projetos de churn em telecom?', { userId: 'u-gestor' });
  assert.ok(r.resultados.length);
  assert.ok(r.resultados.every((x) => Array.isArray(x.contatos)));
  assert.match(r.resposta, /Com quem falar:/);
});

test('Insights no ano fiscal (abr–mar) e Ganhamos × perdemos (CR-078, R19-06)', () => {
  assert.equal(fyDe('2027-03-15'), 2026);
  assert.equal(fyDe('2027-04-01'), 2027);
  assert.equal(rotuloFY(2026), 'FY26');
  const p = montarPainel(engine.repo, gestor(), { hoje: new Date('2026-11-23T12:00:00Z') });
  assert.equal(p.opcoes.fyAtual, 'FY26');
  const gp = p.lentes.negocio.ganhasPerdas;
  assert.ok(gp.ganhas.n > 0 && gp.perdidas.n > 0);
  assert.ok(gp.motivosPerda.some((m) => m.motivo === 'preco'));
  assert.equal(montarPainel(engine.repo, consultor(), {}).lentes.negocio.ganhasPerdas.ganhas.valorMediano, null, 'consultor não vê valor');
  const fy25 = montarPainel(engine.repo, gestor(), { filtros: { fy: 'FY25' } });
  assert.ok(fy25.base.projetos < p.base.projetos);
  assert.deepEqual(sugerirMotivos('Perdemos por preço: o cliente precisava de algo mais simples').map((m) => m.motivo), ['preco', 'escopo']);
});

test('sinais do setor: lê RSS, classifica, isola falhas, expira em 90 dias e não guarda texto integral (CR-079)', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'radar-sinais-'));
  fs.writeFileSync(path.join(dir, 'sinais-fontes.json'), JSON.stringify([
    { id: 'a', nome: 'Fonte A', url: 'https://a.exemplo/rss', dono: 'Time', motivo: 'teste' },
    { id: 'b', nome: 'Fonte B', url: 'https://b.exemplo/rss', dono: 'Time', motivo: 'teste' },
  ]));
  const longo = 'x '.repeat(600);
  const xml = `<rss><channel>
    <item><title>Nova regulação antifraude em Seguros</title><link>https://a.exemplo/1</link><pubDate>Mon, 16 Nov 2026 10:00:00 GMT</pubDate><description><![CDATA[<p>Regra nova com Machine Learning ${longo}</p>]]></description></item>
    <item><title>Energisul Distribuidora anuncia expansão</title><link>https://a.exemplo/2</link><pubDate>Tue, 17 Nov 2026 10:00:00 GMT</pubDate><description>Expansão</description></item>
    <item><title>Notícia antiga</title><link>https://a.exemplo/3</link><pubDate>Mon, 01 Jun 2026 10:00:00 GMT</pubDate></item>
  </channel></rss>`;
  assert.equal(lerFeed(xml).length, 3);
  const vocab = { segmentos: ['Seguros', 'Varejo'], tecnologias: ['Machine Learning', 'Azure'] };
  assert.deepEqual(classificar(lerFeed(xml)[0], vocab).setores, ['Seguros']);
  const store = new SinaisStore(dir);
  const fetchFn = async (url) => (url.startsWith('https://a.') ? { ok: true, text: async () => xml } : { ok: false, status: 503 });
  const r = await store.coletar(vocab, { fetchFn, hoje: new Date('2026-11-23T03:00:00Z') });
  assert.equal(r.novos, 3);
  assert.equal(r.falhas.length, 1, 'a fonte B falhou sem derrubar a A');
  assert.equal(store.data.itens.length, 2, 'o item de junho passou de 90 dias');
  assert.ok(store.data.itens.every((i) => i.resumo.length <= 280));
  const projetos = engine.tools.visible(gestor()).itens.map((p) => ({ id: p.id, cliente: p.cliente, segmento: p.segmento, status_proposta: p.status_proposta, tecnologias: p.tecnologias, dono: p.dono }));
  const rel = store.relevantes(projetos);
  assert.equal(rel[0].relevancia.nivel, 'alta', 'notícia de cliente da carteira vem primeiro');
  assert.deepEqual(store.relevantes(projetos, { segmento: 'Seguros' }).map((i) => i.titulo), ['Nova regulação antifraude em Seguros']);
});
