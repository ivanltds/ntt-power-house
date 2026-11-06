import './setup.js';
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { matchesWhere, LocalVectorStore } from '../src/vectorstore.js';
import { HashingEmbedder } from '../src/embedder.js';
import { trustLevel, parseDocument } from '../src/corpus.js';
import { ingest, ROOT, STORE_PATH } from '../src/ingest.js';
import { RadarEngine } from '../src/search.js';
import { ConversationStore } from '../src/conversations.js';
import { DeepSeekLLM, createLLM } from '../src/deepseek.js';
import { createAuth } from '../src/auth.js';
import { QualityStore, ROTEIRO, lerImagens } from '../src/qualidade.js';
import { VERSAO } from '../src/version.js';
import { AuditLog } from '../src/audit.js';
import { criarHospedagem, hospedarTodas } from '../src/imagens.js';

let engine;
before(() => {
  execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'generate-corpus.js')]);
  ingest({ reset: true });
  engine = new RadarEngine({ storePath: STORE_PATH });
});

test('filtro where no estilo Chroma', () => {
  const m = { confidencialidade: 'interna', tecnologias: ['Azure', 'Databricks'], prazo: 6 };
  assert.ok(matchesWhere(m, { confidencialidade: 'interna' }));
  assert.ok(matchesWhere(m, { tecnologias: { $in: ['Databricks'] } }));
  assert.ok(!matchesWhere(m, { confidencialidade: { $in: ['confidencial'] } }));
  assert.ok(matchesWhere(m, { $and: [{ prazo: { $gte: 5 } }, { prazo: { $lte: 6 } }] }));
  assert.ok(matchesWhere(m, { $or: [{ prazo: 1 }, { tecnologias: 'Azure' }] }));
});

test('base vetorial persiste e recupera por similaridade', () => {
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'radar-')), 'db.json');
  const texts = ['lakehouse databricks para energia', 'robôs rpa para faturamento de fretes'];
  const emb = new HashingEmbedder().fit(texts);
  const store = new LocalVectorStore(file);
  store.getOrCreateCollection({ name: 'c' }).add({ ids: ['a', 'b'], embeddings: emb.embed(texts), documents: texts, metadatas: [{ k: 1 }, { k: 2 }] });
  store.persist();
  const reloaded = new LocalVectorStore(file).getCollection({ name: 'c' });
  const r = reloaded.query({ queryEmbeddings: emb.embed(['plataforma databricks']), nResults: 1 });
  assert.equal(r.ids[0][0], 'a');
});

test('hierarquia de confiança das fontes', () => {
  assert.equal(trustLevel('proposta_comercial', 'final_aprovada'), 5);
  assert.ok(trustLevel('case_sucesso', 'aprovado') > trustLevel('estimativa_preliminar', 'preliminar'));
  assert.ok(trustLevel('estimativa_preliminar', 'preliminar') > trustLevel('transcricao_reuniao', 'bruta'));
});

test('frontmatter com listas e números', () => {
  const { meta, body } = parseDocument('---\nid: X\ntecnologias: ["A","B"]\nprazo_meses: 6\n---\n\nTexto');
  assert.deepEqual(meta, { id: 'X', tecnologias: ['A', 'B'], prazo_meses: 6 });
  assert.equal(body, 'Texto');
});

test('busca retorna referências de utilities com Databricks no topo', async () => {
  const r = await engine.search('propostas de utilities com plataforma de dados Databricks', { userId: 'u-consultor' });
  assert.ok(r.resultados.length >= 2 && r.resultados.length <= 5);
  const top2 = r.resultados.slice(0, 2).map((x) => x.projeto_id).sort();
  assert.deepEqual(top2, ['P001', 'P011']);
  // Referências de outro segmento podem aparecer (ex.: mesma tecnologia), mas sempre abaixo das do segmento pedido.
  const segs = r.resultados.map((x) => x.segmento === 'Utilities / Energia');
  assert.ok(segs.indexOf(false) === -1 || !segs.slice(segs.indexOf(false)).includes(true));
});

test('documento confidencial não aparece para perfil sem permissão (UC03.5)', async () => {
  const q = 'migração de data warehouse para Azure Synapse com LGPD';
  const consultor = await engine.search(q, { userId: 'u-consultor' });
  const gestor = await engine.search(q, { userId: 'u-gestor' });
  assert.ok(!JSON.stringify(consultor).includes('P005'));
  assert.equal(gestor.resultados[0].projeto_id, 'P005');
});

test('valor e margem ficam ocultos para o perfil consultor', async () => {
  const r = await engine.search('plataforma de dados para perdas de energia', { userId: 'u-consultor' });
  const p001 = r.resultados.find((x) => x.projeto_id === 'P001');
  assert.equal(p001.detalhes.valor, undefined);
  const json = JSON.stringify(r);
  assert.ok(!/Investimento total|Margem praticada|Valor preliminar/i.test(json));
  assert.ok(!json.includes('2.400.000'));
});

test('conflito de prazo resolvido pela proposta final (UC03.8)', async () => {
  const r = await engine.search('redução de perdas não técnicas em distribuidora', { userId: 'u-consultor' });
  const p001 = r.resultados.find((x) => x.projeto_id === 'P001');
  assert.equal(p001.detalhes.prazoMeses, 6);
  assert.ok(p001.conflitos.some((c) => c.campo === 'prazo_meses' && c.motivo.includes('P001-PROP')));
});

test('evidência citada existe literalmente na fonte (UC03.9)', async () => {
  const r = await engine.search('detecção de fraude em sinistros de seguro', { userId: 'u-consultor' });
  const top = r.resultados[0];
  assert.equal(top.projeto_id, 'P006');
  const evidence = top.justificativa.split('Evidência: “')[1]?.replace(/”$/, '');
  assert.ok(evidence, 'justificativa deve citar um trecho');
  assert.ok(top.evidencias.some((e) => e.trecho.includes(evidence)));
});

test('pergunta fora do domínio não inventa resultados (UC03.12)', async () => {
  const r = await engine.search('receita de bolo de chocolate', { userId: 'u-consultor' });
  assert.equal(r.resultados.length, 0);
  assert.ok(r.semEvidencia);
});

test('score explica cada fator individualmente (UC03.6)', async () => {
  const r = await engine.search('churn em telecom com Kafka', { userId: 'u-consultor' });
  const top = r.resultados[0];
  assert.equal(top.projeto_id, 'P008');
  const fatores = top.fatores.map((f) => f.fator);
  assert.ok(fatores.includes('Segmento') && fatores.includes('Tecnologias'));
  const soma = top.fatores.reduce((s, f) => s + f.peso, 0);
  assert.ok(Math.abs(soma - 1) < 0.02);
});

test('briefing da oportunidade entra como contexto (RF14)', async () => {
  const r = await engine.search('quais referências temos?', { userId: 'u-consultor', opportunityId: 'O-2026-02' });
  assert.equal(r.resultados[0].projeto_id, 'P006');
});

// ---- Memória da conversa (UC03.3 / UC03.14), modo offline ----

async function converse(questions, opts = { userId: 'u-consultor' }) {
  const store = new ConversationStore(path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'conv-')), 'c.json'));
  const conv = store.open(null, opts);
  const out = [];
  for (const q of questions) {
    const r = await engine.search(q, { ...opts, history: store.history(conv) });
    store.addTurn(conv, { turnoId: String(out.length), pergunta: q, resultado: r });
    out.push(r);
  }
  return { out, store, conv };
}

test('follow-up herda o contexto do turno anterior (UC03.3)', async () => {
  const { out } = await converse(['propostas de utilities com plataforma de dados', 'e só com Databricks?']);
  const r = out[1];
  assert.ok(r.entendimento.continuacao);
  assert.ok(r.entidades.segmentos.includes('Utilities / Energia'));
  assert.ok(r.entidades.tecnologias.includes('Databricks'));
  for (const x of r.resultados) assert.ok(x.tecnologias.includes('Databricks') || x.segmento === 'Utilities / Energia');
});

test('mudança de assunto não carrega contexto antigo (UC03.3)', async () => {
  const { out } = await converse(['propostas de utilities com Databricks', 'detecção de fraude em sinistros de seguro']);
  assert.ok(!out[1].entendimento.continuacao);
  assert.ok(!out[1].entidades.segmentos.includes('Utilities / Energia'));
  assert.equal(out[1].resultados[0].projeto_id, 'P006');
});

test('"e o segundo?" detalha o 2º resultado da resposta anterior (UC03.14)', async () => {
  const { out } = await converse(['propostas de utilities com plataforma de dados Databricks', 'detalhe o segundo']);
  assert.equal(out[1].entendimento.intencao, 'detalhar');
  assert.equal(out[1].resultados.length, 1);
  assert.equal(out[1].resultados[0].projeto_id, out[0].resultados[1].projeto_id);
});

// ---- Conversas salvas e favoritas (UC05 / UC06) ----

test('salvar, favoritar, listar e reabrir conversa (UC05 / UC06)', async () => {
  const { store, conv } = await converse(['churn em telecom']);
  assert.deepEqual(store.list('u-consultor'), [], 'conversa não salva não aparece na lista');
  store.save(conv.id, 'u-consultor', 'Referências de churn');
  const reloaded = new ConversationStore(store.file);
  const [item] = reloaded.list('u-consultor');
  assert.equal(item.titulo, 'Referências de churn');
  assert.equal(item.turnos, 1);
  reloaded.favorite(conv.id, 'u-consultor', true);
  assert.equal(reloaded.list('u-consultor', { soFavoritas: true }).length, 1);
  assert.equal(reloaded.get(conv.id, 'u-consultor').turnos[0].resultado.resultados[0].projeto_id, 'P008');
});

test('favoritar conversa não salva também a salva (UC06)', async () => {
  const { store, conv } = await converse(['churn em telecom']);
  store.favorite(conv.id, 'u-consultor', true);
  assert.ok(new ConversationStore(store.file).get(conv.id, 'u-consultor').salva);
});

test('conversa de um usuário não é visível nem continuável por outro', async () => {
  const { store, conv } = await converse(['migração de data warehouse para Azure Synapse com LGPD'], { userId: 'u-gestor' });
  store.save(conv.id, 'u-gestor');
  assert.equal(store.get(conv.id, 'u-consultor'), null);
  assert.deepEqual(store.list('u-consultor'), []);
  assert.equal(store.save(conv.id, 'u-consultor'), null);
  assert.notEqual(store.open(conv.id, { userId: 'u-consultor' }).id, conv.id);
});

// ---- IA real com fallback ----

test('sem chave usa o mock; com chave usa DeepSeek', () => {
  assert.equal(createLLM({}).provider, 'mock');
  assert.equal(createLLM({ DEEPSEEK_API_KEY: 'x' }).provider, 'deepseek');
  assert.equal(createLLM({ DEEPSEEK_API_KEY: 'x', LLM_PROVIDER: 'mock' }).provider, 'mock');
});

test('DeepSeek indisponível cai para o modo offline sem quebrar a busca', async () => {
  const offline = new RadarEngine({ storePath: STORE_PATH, repo: engine.repo, llm: new DeepSeekLLM({ apiKey: 'x', baseUrl: 'http://127.0.0.1:9', timeoutMs: 2000 }) });
  const r = await offline.search('churn em telecom com Kafka', { userId: 'u-consultor' });
  assert.ok(r.ia.fallback);
  assert.equal(r.resultados[0].projeto_id, 'P008');
});

test('IA recebe só trechos permitidos e sem preço para o consultor (UC03.5)', async () => {
  const seen = [];
  const spy = new (class extends DeepSeekLLM {
    async chat(system, user) { seen.push(user); return system.includes('interpretação') ? { intencao: 'buscar', consulta: 'migração de data warehouse' } : { avaliacoes: [], resposta: '' }; }
  })({ apiKey: 'x' });
  const e = new RadarEngine({ storePath: STORE_PATH, repo: engine.repo, llm: spy });
  await e.search('migração de data warehouse para Azure Synapse com LGPD perdas de energia', { userId: 'u-consultor' });
  const sent = seen.join(' ');
  assert.ok(!sent.includes('P005'));
  assert.ok(!/Investimento total|Margem praticada|Valor preliminar/i.test(sent));
});

// ---- Upload, extração e metadados (UC02) ----
const { extractText } = await import('../src/extract/formats.js');
const { analyzeText, mergeAI } = await import('../src/analysis.js');
const { UploadService } = await import('../src/uploads.js');
const { createProject, updateProject } = await import('../src/projects.js');
const { buildIndex } = await import('../src/ingest.js');

const SAMPLES = path.join(ROOT, 'amostras');
const sample = (f) => fs.readFileSync(path.join(SAMPLES, f));
let uploads;
before(() => {
  execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'generate-samples.js')]);
  uploads = new UploadService(engine, { reindex: () => { const r = buildIndex(engine.repo, STORE_PATH); engine.reload(); return r; } });
});

async function processed(nome, user = 'u-gestor', projetoId = null) {
  const { id } = uploads.submit({ nome, buffer: sample(nome), user: engine.user(user), projetoId });
  for (let i = 0; i < 200; i++) {
    const job = engine.repo.job(id);
    if (!['enviado', 'processando'].includes(job.status)) return job;
    await new Promise((r) => setTimeout(r, 10));
  }
  throw new Error('processamento não terminou');
}

test('extrai texto de DOCX, PPTX, XLSX, PDF, VTT, EML, HTML e CSV (RNF10)', () => {
  const expect = {
    'proposta-banco-aurora-antifraude.docx': ['docx', 'Investimento total: R$ 3,2 milhões'],
    'apresentacao-energisul-fase2.pptx': ['pptx', 'Notas do apresentador'],
    'estimativa-preliminar-banco-aurora.xlsx': ['xlsx', 'Perfil: Cientista de dados'],
    'case-segura-mais-resultados.pdf': ['pdf', 'Redução de 37% nas fraudes pagas'],
    'kickoff-logistica-expressa-norte.vtt': ['vtt', 'Juliana Prado: Bom dia'],
    'email-rede-bom-preco-ampliacao.eml': ['eml', 'Ampliação da previsão de demanda'],
    'levantamento-requisitos-hospital.html': ['html', '- Integração com o prontuário'],
    'pipeline-oportunidades.csv': ['csv', 'Cliente: Banco Aurora S.A.'],
  };
  for (const [f, [formato, trecho]] of Object.entries(expect)) {
    const r = extractText({ buffer: sample(f), filename: f });
    assert.equal(r.formato, formato, f);
    assert.ok(r.texto.includes(trecho), `${f}: "${trecho}" não extraído`);
    assert.ok(!r.texto.includes('console.log'), 'script do HTML não pode ir para o texto');
  }
});

test('regras extraem tipo, cliente, valor, prazo, pessoas e confidencialidade', () => {
  const ex = extractText({ buffer: sample('proposta-banco-aurora-antifraude.docx'), filename: 'proposta-banco-aurora-antifraude.docx' });
  const s = analyzeText({ texto: ex.texto, filename: 'proposta-banco-aurora-antifraude.docx', extracao: ex, clients: engine.repo.clients() });
  assert.equal(s.tipo_documental.valor, 'proposta_comercial');
  assert.equal(s.cliente.valor, 'Banco Aurora S.A.');
  assert.equal(s.valor.valor, 3200000);
  assert.equal(s.margem.valor, 0.31);
  assert.equal(s.prazo_meses.valor, 7);
  assert.equal(s.segmento.valor, 'Serviços Financeiros');
  assert.ok(['Databricks', 'Azure', 'Kafka'].every((t) => s.tecnologias.some((x) => x.valor === t)));
  assert.ok(s.entidades.pessoas.some((p) => p.valor === 'Rafael Lima' && /gerente/i.test(p.papel)));
  assert.equal(s.confidencialidade.valor, 'confidencial');
  assert.ok(s.entidades.riscos.length >= 2);
});

test('IA não pode inventar: valores ausentes do texto são descartados', () => {
  const texto = 'Proposta para a Energisul Distribuidora com prazo de 6 meses. Investimento total: R$ 2,4 milhões.';
  const s = analyzeText({ texto, filename: 'p.txt', clients: engine.repo.clients() });
  const out = mergeAI(s, { cliente: 'Empresa Fantasma', prazo_meses: 9, valor: 2400000, pessoas: [{ nome: 'Fulano Inexistente' }], tecnologias: ['Databricks'] }, texto);
  assert.equal(out.cliente.valor, 'Energisul Distribuidora');
  assert.equal(out.prazo_meses.valor, 6);
  assert.equal(out.valor.metodo, 'regras+ia');
  assert.ok(!out.entidades.pessoas.some((p) => p.valor === 'Fulano Inexistente'));
  assert.equal(out.descartesIA.length, 3);
});

test('upload sugere vínculo com projeto do mesmo cliente e aponta conflito de prazo', async () => {
  const job = await processed('apresentacao-energisul-fase2.pptx');
  assert.equal(job.status, 'aguardando_revisao');
  assert.equal(job.sugestao.vinculo.recomendacao, 'existente');
  assert.equal(job.sugestao.vinculo.sugestoes[0].projeto_id, 'P001');
  assert.ok(job.sugestao.alertas.some((a) => a.codigo === 'conflito' && /5 meses/.test(a.mensagem)));
  assert.ok(job.etapas.length >= 6 && job.etapas.every((e) => e.status !== 'erro'));
});

test('documento só entra na busca depois da revisão; projeto novo nasce do upload (UC02)', async () => {
  const job = await processed('proposta-banco-aurora-antifraude.docx');
  const antes = await engine.search('fraude em transações PIX de banco', { userId: 'u-gestor' });
  assert.ok(!antes.resultados.some((r) => r.cliente === 'Banco Aurora S.A.'), 'não revisado não pode aparecer');
  const r = await uploads.confirm(job.id, engine.user('u-gestor'), {
    metadados: { titulo: 'Proposta antifraude PIX' },
    projeto: { modo: 'novo', dados: { ...job.sugestao.vinculo.projetoNovo } },
    tecnologias: ['Databricks', 'Azure', 'Kafka', 'Python'],
  });
  assert.ok(r.documento && r.projeto, JSON.stringify(r));
  const depois = await engine.search('fraude em transações PIX de banco', { userId: 'u-gestor' });
  assert.equal(depois.resultados[0].projeto_id, r.projeto);
  // Projeto e documento confidenciais: invisíveis para o consultor em todas as consultas.
  const consultor = engine.user('u-consultor');
  assert.ok(!(await engine.search('fraude em transações PIX de banco', { userId: 'u-consultor' })).resultados.some((x) => x.projeto_id === r.projeto));
  assert.equal(engine.repo.projectDetail(r.projeto, consultor), null);
  assert.ok(!engine.repo.searchProjects({ q: 'PIX' }, consultor).itens.length);
  assert.ok(!engine.repo.clients(consultor).some((c) => c.nome === 'Banco Aurora S.A.'));
  // Correções humanas registradas (RNF08) e duplicata exata bloqueada.
  assert.ok(engine.repo.all('SELECT campo FROM correcao_metadado').some((c) => c.campo === 'titulo'));
  const again = await processed('proposta-banco-aurora-antifraude.docx');
  assert.ok(again.sugestao.alertas.some((a) => a.codigo === 'duplicado'));
  const [status] = await uploads.confirm(again.id, engine.user('u-gestor'), { projeto: { modo: 'existente', id: r.projeto } });
  assert.equal(status, 409);
});

test('revisor complementa o envio com autor, notas, modelo reaproveitável e entidades (UC02.15)', async () => {
  const job = await processed('apresentacao-energisul-fase2.pptx');
  const gestor = engine.user('u-gestor');
  const [erro] = await uploads.confirm(job.id, gestor, { projeto: { modo: 'existente', id: 'P001' }, extras: { link_origem: 'javascript:alert(1)' } });
  assert.equal(erro, 400);
  const r = await uploads.confirm(job.id, gestor, {
    projeto: { modo: 'existente', id: 'P001' },
    extras: {
      autor: 'Marina Costa', versao: 'v2', link_origem: 'https://sharepoint.exemplo/fase2.pptx', reutilizavel: true,
      observacoes: 'Usar como referência de roadmap trimestral para utilities.',
      entidades: { licoes: [{ valor: 'Envolver a operação de campo desde o piloto' }], riscos: [] },
    },
  });
  assert.ok(r.documento, JSON.stringify(r));
  const d = engine.repo.projectDetail('P001', gestor);
  const doc = d.documentos.find((x) => x.id === r.documento);
  assert.equal(doc.autor, 'Marina Costa');
  assert.equal(doc.reutilizavel, 1);
  assert.equal(doc.link_origem, 'https://sharepoint.exemplo/fase2.pptx');
  assert.ok(d.entidades.licao.some((e) => e.valor === 'Envolver a operação de campo desde o piloto' && e.documentos.includes(r.documento)));
  assert.ok(!engine.repo.all('SELECT documento_id FROM documento_entidade WHERE tipo = $t', { $t: 'risco' }).some((e) => e.documento_id === r.documento));
  // As notas do revisor entram na busca.
  const busca = await engine.search('referência de roadmap trimestral', { userId: 'u-gestor' });
  assert.equal(busca.resultados[0].projeto_id, 'P001');
});

test('edição de documento já indexado grava histórico, entidades e respeita permissões (UC07.4)', async () => {
  const { documentForEdit, updateDocument } = await import('../src/documents.js');
  const gestor = engine.user('u-gestor');
  const consultor = engine.user('u-consultor');
  const antes = documentForEdit(engine, 'P001-CASE', gestor);
  assert.ok(antes.entidades && 'licoes' in antes.entidades);
  assert.ok(updateDocument(engine, 'P001-CASE', { link_origem: 'ftp://x' }, gestor).erros);
  const r = updateDocument(engine, 'P001-CASE', {
    autor: 'Marina Costa', versao: 'final', reutilizavel: true, status_documento: 'validada',
    entidades: { ...antes.entidades, licoes: [...antes.entidades.licoes, { valor: 'Começar pelo cadastro de medidores' }] },
  }, gestor);
  assert.ok(r.alteracoes >= 4, JSON.stringify(r));
  assert.equal(r.documento.reutilizavel, 1);
  assert.ok(r.documento.entidades.licoes.some((e) => e.valor === 'Começar pelo cadastro de medidores' && e.metodo === 'manual'));
  // Itens mantidos preservam o método original.
  assert.ok(r.documento.entidades.licoes.filter((e) => e.metodo !== 'manual').length === antes.entidades.licoes.length);
  const hist = engine.repo.projectDetail('P001', gestor).historico;
  assert.ok(hist.some((h) => h.campo === 'P001-CASE · autor'));
  // Consultor não edita valores; documento confidencial é invisível para ele.
  const rc = updateDocument(engine, 'P001-PROP', { valor: 1 }, consultor);
  assert.equal(rc.alteracoes, 0);
  assert.equal(engine.repo.documentForEdit('P001-PROP').valor, 2400000);
  const conf = engine.repo.all("SELECT id FROM documento WHERE confidencialidade = 'confidencial' LIMIT 1")[0];
  if (conf) assert.ok(updateDocument(engine, conf.id, { autor: 'x' }, consultor).naoEncontrado);
});

test('foco do chat aceita qualquer projeto visível e não o devolve como referência dele mesmo', async () => {
  const gestor = engine.user('u-gestor');
  const opcoes = engine.repo.focusOptions(gestor, 'energisul');
  assert.ok(opcoes.length >= 1 && opcoes.every((p) => /energisul/i.test(p.cliente + p.titulo)));
  const todas = engine.repo.focusOptions(gestor);
  const primeiroOutro = todas.findIndex((p) => !p.emAndamento);
  assert.ok(primeiroOutro === -1 || todas.slice(primeiroOutro).every((p) => !p.emAndamento), 'em andamento vêm primeiro');
  const r = await engine.search('algum case parecido?', { userId: 'u-gestor', opportunityId: 'P001' });
  assert.equal(r.oportunidade.cliente, opcoes[0].cliente);
  assert.ok(!r.resultados.some((x) => x.projeto_id === 'P001'));
  // Projeto confidencial não serve de foco para quem não o enxerga.
  const conf = engine.repo.all("SELECT id FROM projeto WHERE confidencialidade = 'confidencial' LIMIT 1")[0];
  if (conf) assert.equal(engine.focus(conf.id, engine.user('u-consultor')), null);
});

test('cadastro de projeto, cliente novo e termos novos só para o gestor; criações vão para o registro (adendo 4)', () => {
  const gestor = engine.user('u-gestor');
  const consultor = engine.user('u-consultor');
  const base = { titulo: 'Portal do corretor com IA', segmento: 'Seguros', status_proposta: 'Em elaboração', tecnologias: ['Azure'] };
  const negado = createProject(engine, { ...base, cliente: 'Segura Mais Seguros' }, consultor);
  assert.ok(negado.proibido && /gestor/.test(negado.erros[0]));
  // Consultor não troca para cliente inexistente nem cria tecnologia nova ao editar.
  assert.ok(updateProject(engine, 'P001', { cliente: 'Cliente Que Não Existe SA' }, consultor).erros.some((e) => /Cliente não encontrado/.test(e)));
  assert.ok(updateProject(engine, 'P001', { tecnologias: ['Databricks', 'TecnologiaInventada'] }, consultor).erros.some((e) => /TecnologiaInventada/.test(e)));
  // Gestor cadastra com cliente e tecnologia novos; tudo fica registrado com o usuário.
  const r = createProject(engine, { ...base, cliente: 'Corretora Nova Aliança', tecnologias: ['Azure', 'Copilot Studio'] }, gestor);
  assert.ok(r.projeto, JSON.stringify(r));
  const log = engine.repo.activities({ usuario: 'u-gestor', acao: 'criar' }).itens;
  assert.ok(log.some((h) => h.entidade === 'projeto' && h.entidade_id === r.projeto.id));
  assert.ok(log.some((h) => h.entidade === 'cliente' && h.depois === 'Corretora Nova Aliança'));
  assert.ok(log.some((h) => h.entidade === 'tecnologia' && h.depois === 'Copilot Studio'));
  assert.equal(engine.repo.activities({ usuario: '__base' }).itens.filter((h) => h.entidade === 'projeto' && h.acao === 'criar').length, 0, 'carga piloto não entra no registro');
});

test('consultor não recebe valores sugeridos no upload', async () => {
  const job = await processed('proposta-banco-aurora-antifraude.docx', 'u-consultor');
  assert.equal(job.sugestao.campos.valor.valor, null);
  assert.ok(!JSON.stringify(job.sugestao).includes('3200000'));
  // Documento que se declara confidencial não pode ser rebaixado por quem não enxerga esse nível.
  const [status] = await uploads.confirm(job.id, engine.user('u-consultor'), { metadados: { confidencialidade: 'interna' }, projeto: { modo: 'existente', id: 'P001' } });
  assert.equal(status, 403);
});

// ---- Cadastro e consultas (UC07 / UC08 / UC09) ----
test('cadastro valida, detecta duplicata, versiona alterações e indexa a ficha', async () => {
  const gestor = engine.user('u-gestor');
  assert.ok(createProject(engine, { titulo: 'X' }, gestor).erros.length >= 2);
  const dados = { cliente: 'Expressa Norte Logística', titulo: 'Roteirização last mile com previsão de demanda', segmento: 'Logística', status_proposta: 'Em elaboração', prazo_meses: 4, tecnologias: ['AWS', 'Python'], servicos: ['Data Science / ML'], descricao: 'Otimizar rotas de entrega last mile da transportadora com previsão de demanda por região.' };
  const { projeto } = createProject(engine, dados, gestor);
  assert.match(projeto.id, /^P\d{3}$/);
  assert.ok(createProject(engine, dados, gestor).duplicatas.length);
  const upd = updateProject(engine, projeto.id, { prazo_meses: 5, status_proposta: 'Enviada' }, gestor);
  assert.equal(upd.alteracoes, 2);
  const det = engine.repo.projectDetail(projeto.id, gestor);
  assert.deepEqual(det.historico.filter((h) => h.acao === 'editar').map((h) => h.campo).sort(), ['prazo_meses', 'status_proposta']);
  assert.ok(det.historico.some((h) => h.acao === 'criar' && h.usuario_id === 'u-gestor'));
  assert.ok(det.documentos.some((d) => d.tipo_documental === 'ficha_cadastro'));
  buildIndex(engine.repo, STORE_PATH);
  engine.reload();
  const r = await engine.search('roteirização de entregas last mile', { userId: 'u-consultor' });
  assert.equal(r.resultados[0].projeto_id, projeto.id);
  assert.equal(updateProject(engine, projeto.id, { confidencialidade: 'confidencial' }, engine.user('u-consultor')).erros.length, 1);
});

test('consulta combinada: texto + facetas + modo todas/qualquer + permissão (UC08)', () => {
  const c = engine.user('u-consultor');
  const todas = engine.repo.searchProjects({ tecnologias: ['Databricks', 'Azure'] }, c);
  const qualquer = engine.repo.searchProjects({ tecnologias: ['Databricks', 'Azure'], modoTecnologias: 'qualquer' }, c);
  assert.ok(qualquer.total > todas.total);
  for (const p of todas.itens) assert.ok(p.tecnologias.includes('Databricks') && p.tecnologias.includes('Azure'));
  const txt = engine.repo.searchProjects({ q: 'perdas nao tecnicas', segmentos: ['Utilities / Energia'], status: ['Entregue'] }, c);
  assert.deepEqual(txt.itens.map((p) => p.id), ['P001']);
  assert.ok(txt.itens[0].trecho.includes('[['));
  assert.ok(txt.facetas.tecnologias.some((f) => f.valor === 'Databricks'));
  assert.ok(!engine.repo.searchProjects({ q: 'Synapse' }, c).itens.some((p) => p.id === 'P005'));
  assert.ok(engine.repo.searchProjects({ q: 'Synapse' }, engine.user('u-gestor')).itens.some((p) => p.id === 'P005'));
  assert.equal(engine.repo.searchProjects({ valorMin: 1 }, c).total, engine.repo.searchProjects({}, c).total, 'filtro de valor ignorado sem permissão');
  assert.ok(engine.repo.searchProjects({ entidade: { tipo: 'pessoa', valor: 'Marina' } }, c).total >= 1);
});

test('insights agregam só o que o perfil pode ver (UC09)', () => {
  const c = engine.repo.insights(engine.user('u-consultor'));
  const g = engine.repo.insights(engine.user('u-gestor'));
  assert.ok(g.totais.projetos > c.totais.projetos);
  assert.ok(g.totais.clientes > c.totais.clientes);
  assert.ok(!('valor_medio' in c.porSegmento[0]));
  assert.ok('valor_medio' in g.porSegmento[0]);
  assert.ok(c.porTecnologia.length && c.coocorrencia.length);
});

test('métricas contam motivos de "não ajudou" e reaproveitamentos', async () => {
  const { AuditLog } = await import('../src/audit.js');
  const audit = new AuditLog(fs.mkdtempSync(path.join(os.tmpdir(), 'radar-audit-')));
  audit.logEvent({ tipo: 'feedback_motivo', motivo: 'Desatualizado' });
  audit.logEvent({ tipo: 'feedback_motivo', motivo: 'Não é parecido' });
  audit.logEvent({ tipo: 'feedback_motivo', motivo: 'Desatualizado' });
  audit.logEvent({ tipo: 'reaproveitar', acao: 'copiar' });
  const m = audit.metrics();
  assert.deepEqual(m.motivosNaoUtil[0], { valor: 'Desatualizado', n: 2 });
  assert.equal(m.reaproveitamentos, 1);
});

test('login: sem credenciais no ambiente o app fica aberto; com elas exige cookie assinado', () => {
  assert.equal(createAuth({}).allowed({ headers: {} }), true);
  const auth = createAuth({ RADAR_LOGIN_USER: 'ntt', RADAR_LOGIN_PASS: 'segredo', RADAR_LOGIN_SECRET: 'x' });
  assert.equal(auth.allowed({ headers: {} }), false);
  assert.equal(auth.login('ntt', 'errada'), null);
  const cookie = auth.login(' NTT ', 'segredo');
  assert.match(cookie, /HttpOnly/);
  const valor = cookie.split(';')[0];
  assert.equal(auth.allowed({ headers: { cookie: valor } }), true);
  assert.equal(auth.allowed({ headers: { cookie: valor.slice(0, -2) + 'xx' } }), false);
  const [exp] = valor.split('=')[1].split('.');
  assert.equal(auth.allowed({ headers: { cookie: valor.replace(exp, String(Number(exp) + 999)) } }), false);
  assert.equal(auth.isPublic('/login'), true);
  assert.equal(auth.isPublic('/app.js'), false);
});

test('filtro "Meus projetos" traz o que criei, em que sou responsável ou em que enviei documento (UC08.6)', () => {
  const gestor = engine.user('u-gestor');
  const meus = engine.repo.searchProjects({ meus: true }, gestor, { tamanho: 100 }).itens.map((p) => p.id);
  const criados = engine.repo.all("SELECT id FROM projeto WHERE criado_por = 'u-gestor'").map((p) => p.id);
  assert.ok(criados.length && criados.every((id) => meus.includes(id)));
  const comDoc = engine.repo.all("SELECT DISTINCT projeto_id FROM documento WHERE enviado_por = 'u-gestor'").map((p) => p.projeto_id);
  assert.ok(comDoc.every((id) => meus.includes(id)));
  assert.ok(!meus.includes('P002') || criados.includes('P002') || comDoc.includes('P002'));
  const consultor = engine.repo.searchProjects({ meus: true }, engine.user('u-consultor'), { tamanho: 100 }).itens.map((p) => p.id);
  assert.ok(consultor.every((id) => !criados.includes(id) || comDoc.includes(id)));
});

test('exportação gera PPTX, PDF e DOCX válidos, respeita seções escolhidas e esconde valores do consultor (UC10)', async () => {
  const { exportProposal, proposalExportOptions } = await import('../src/export/index.js');
  const { readZip } = await import('../src/extract/zip.js');
  const zlib = await import('node:zlib');
  const gestor = engine.user('u-gestor');
  const consultor = engine.user('u-consultor');
  const todas = ['capa', 'contexto', 'objetivo', 'solucao', 'escopo', 'investimento', 'resultados', 'cases', 'riscos', 'licoes', 'fontes'];
  const pdfText = (buf) => {
    let txt = '';
    let i = 0;
    while ((i = buf.indexOf('stream\n', i)) >= 0) {
      const s = i + 7;
      const e = buf.indexOf('\nendstream', s);
      try { txt += zlib.inflateSync(buf.subarray(s, e)).toString('latin1'); } catch { /* stream não compactado */ }
      i = e;
    }
    return [...txt.matchAll(/\((.*?)\) Tj/g)].map((m) => m[1]).join(' ');
  };

  const pptx = exportProposal(engine, 'P001', gestor, { modelo: 'apresentacao', formato: 'pptx', secoes: todas });
  const z = readZip(pptx.buffer);
  assert.ok(z.has('ppt/presentation.xml') && z.has('ppt/slides/slide1.xml'));
  assert.match(pptx.nome, /Apresentacao\.pptx$/);
  assert.match(z.get('ppt/slides/slide1.xml')().toString(), /Plataforma de dados/);

  const docx = exportProposal(engine, 'P001', gestor, { modelo: 'resumo', formato: 'docx', secoes: ['capa', 'objetivo', 'riscos'] });
  const doc = readZip(docx.buffer).get('word/document.xml')().toString();
  assert.ok(doc.includes('Riscos e mitigação') && !doc.includes('Contexto e desafio'), 'só as seções escolhidas');

  const pdfGestor = exportProposal(engine, 'P001', gestor, { modelo: 'resumo', formato: 'pdf', secoes: todas });
  assert.equal(pdfGestor.buffer.subarray(0, 5).toString(), '%PDF-');
  assert.match(pdfText(pdfGestor.buffer), /R\$ 2\.400\.000/);
  assert.match(pdfText(pdfGestor.buffer), /redu\u00e7\u00e3o/, 'acentos em WinAnsi');

  // Consultor: investimento nem é oferecido e o valor do projeto não sai, mesmo pedindo a seção.
  assert.ok(!proposalExportOptions(engine, 'P001', consultor, 'resumo').secoes.some((s) => s.key === 'investimento'));
  const pdfCons = exportProposal(engine, 'P001', consultor, { modelo: 'apresentacao', formato: 'pdf', secoes: todas });
  assert.ok(!/2\.400\.000|MARGEM/.test(pdfText(pdfCons.buffer)));
  assert.ok(!pdfCons.secoes.includes('investimento'));

  assert.ok(exportProposal(engine, 'P001', gestor, { modelo: 'resumo', formato: 'pptx', secoes: todas }).erro);
  assert.ok(exportProposal(engine, 'P001', gestor, { modelo: 'resumo', formato: 'pdf', secoes: ['capa'] }).erro);
  const conf = engine.repo.all("SELECT id FROM projeto WHERE confidencialidade = 'confidencial' LIMIT 1")[0];
  if (conf) assert.ok(exportProposal(engine, conf.id, consultor, { modelo: 'resumo', formato: 'pdf', secoes: todas }).naoEncontrado);
});

test('sugestão de cadastro extrai os campos declarados na descrição, inclusive responsável e área (UC07)', async () => {
  const { suggestProject } = await import('../src/projects.js');
  const texto = 'Proposta para a Viação Rota Sul, transporte rodoviário de passageiros. Projeto: Previsão de demanda e precificação dinâmica de passagens. '
    + 'Segmento logística. Tecnologias: Databricks, Azure, Python e Power BI. Serviços: Data Science / ML e Analytics & BI. Prazo de 5 meses, valor estimado de R$ 1,8 milhão. '
    + 'Status: em negociação. Objetivo: aumentar a ocupação média dos ônibus em 12% ajustando preços por rota e horário. Responsável: Carla Mendes. Área: Data & Analytics.';
  const { sugestao: s } = await suggestProject(engine, texto, engine.user('u-gestor'));
  assert.equal(s.prazo_meses, 5);
  assert.equal(s.valor, 1800000);
  assert.equal(s.status_proposta, 'Em negociação');
  assert.equal(s.segmento, 'Logística');
  assert.ok(['Databricks', 'Azure', 'Python', 'Power BI'].every((t) => s.tecnologias.includes(t)), JSON.stringify(s.tecnologias));
  assert.ok(['Data Science / ML', 'Analytics & BI'].every((t) => s.servicos.includes(t)), JSON.stringify(s.servicos));
  assert.equal(s.dono, 'Carla Mendes');
  assert.equal(s.area, 'Data & Analytics');
  assert.ok(s.objetivo && !/^objetivo/i.test(s.objetivo), s.objetivo);
  // Consultor não recebe valor sugerido.
  assert.equal((await suggestProject(engine, texto, engine.user('u-consultor'))).sugestao.valor, null);
});

test('sugestão lê valor, margem e área em formatos comuns de escrita (UC07)', async () => {
  const { declaredValue, declaredMargin, declaredArea, suggestProject } = await import('../src/projects.js');
  const casos = [
    ['Valor: R$ 2.000.000. Margem: 30%. Área: Data & Analytics.', 2000000, 0.3, 'Data & Analytics'],
    ['Valor de R$ 2 milhões, margem de 30%, área de Data & Analytics.', 2000000, 0.3, 'Data & Analytics'],
    ['Valor 2 milhões, margem 30%, área Data & Analytics.', 2000000, 0.3, 'Data & Analytics'],
    ['O valor do projeto é R$ 1,5 mi com margem de 25 por cento. Área responsável: Dados.', 1500000, 0.25, 'Dados'],
    ['Investimento total: R$ 900 mil. Margem prevista: 22%. Área: Engenharia de Dados.', 900000, 0.22, 'Engenharia de Dados'],
    ['valor: 1500000, margem: 0,3, area: Data e Analytics', 1500000, 0.3, 'Data e Analytics'],
    ['Sem valores aqui, só uma área de cobertura ampla.', null, null, null],
  ];
  for (const [txt, valor, margem, area] of casos) {
    assert.equal(declaredValue(txt), valor, txt);
    assert.equal(declaredMargin(txt), margem, txt);
    assert.equal(declaredArea(txt), area, txt);
  }
  const gestor = await suggestProject(engine, `Projeto para a Viação Rota Sul. ${casos[2][0]}`, engine.user('u-gestor'));
  assert.equal(gestor.sugestao.margem, 0.3);
  const consultor = await suggestProject(engine, `Projeto para a Viação Rota Sul. ${casos[2][0]}`, engine.user('u-consultor'));
  assert.equal(consultor.sugestao.margem, null, 'consultor não recebe margem');
  assert.equal(consultor.sugestao.valor, null, 'consultor não recebe valor');
});

test('sugestão lê data de referência e área em formatos comuns (UC07)', async () => {
  const { declaredArea, declaredDate, suggestProject } = await import('../src/projects.js');
  for (const [txt, area] of [['Área: Data & Analytics.', 'Data & Analytics'], ['área de dados.', 'Dados'], ['Área responsável - engenharia de dados.', 'Engenharia de dados'],
    ['Departamento: Inovação.', 'Inovação'], ['setor de TI.', 'TI'], ['Uma área de cobertura ampla.', null], ['Projeto com Databricks.', null]]) {
    assert.equal(declaredArea(`Projeto da Viação Rota Sul. ${txt}`), area, txt);
  }
  for (const [txt, data] of [['Data: 15/11/2026.', '2026-11-15'], ['Início em 15 de novembro de 2026.', '2026-11-15'], ['kickoff previsto para 2026-12-01', '2026-12-01'],
    ['Proposta de novembro de 2026.', '2026-11-01'], ['enviada em 03/11/26', '2026-11-03'], ['Prazo de 5 meses.', null], ['Data 31/02/2026 inválida', null]]) {
    assert.equal(declaredDate(`Projeto da Viação Rota Sul. ${txt}`), data, txt);
  }
  const { sugestao } = await suggestProject(engine, 'Projeto para a Viação Rota Sul com Databricks. Data: 15/11/2026. Área de dados.', engine.user('u-gestor'));
  assert.equal(sugestao.data_referencia, '2026-11-15');
  assert.equal(sugestao.area, 'Dados');
});

// ---- Política de dados: mascaramento sem bloqueio (adendo 5, UC13.2) ----
const { maskSensitive, maskFields } = await import('../src/sensitive.js');

test('mascaramento troca dados pessoais e chaves por marcadores e mantém valores de negócio (UC13.2)', () => {
  const r = maskSensitive('Contato: ana@cliente.com.br, (11) 98765-4321, CPF 123.456.789-09, senha: s3cr3t0! Valor R$ 2.000.000 em 15/11/2026, prazo de 6 meses.');
  assert.ok(!/ana@|98765|123\.456|s3cr3t0/.test(r.texto));
  assert.match(r.texto, /\[e-mail removido\].*\[telefone removido\].*\[CPF removido\].*\[senha ou chave removida\]/);
  assert.match(r.texto, /R\$ 2\.000\.000 em 15\/11\/2026, prazo de 6 meses/);
  assert.deepEqual(r.achados.map((a) => a.tipo).sort(), ['CPF', 'e-mail', 'senha ou chave', 'telefone']);
  // Cartão só com dígito verificador válido.
  assert.equal(maskSensitive('pedido 1234 5678 9012 3456').achados.length, 0);
  assert.equal(maskSensitive('cartão 4111 1111 1111 1111').achados[0].tipo, 'cartão');
  const f = maskFields({ titulo: 'Projeto X', descricao: 'falar com joao@x.com', prazo_meses: 3 }, ['titulo', 'descricao']);
  assert.equal(f.dados.descricao, 'falar com [e-mail removido]');
  assert.equal(f.dados.prazo_meses, 3);
});

test('upload com dados pessoais segue sem bloqueio e grava só o texto mascarado (UC13.2)', async () => {
  const texto = 'Proposta comercial para Expressa Norte Logística.\nContato do cliente: maria.souza@expressanorte.com.br, telefone (21) 99876-5432.\nObjetivo: previsão de demanda com AWS em 4 meses.';
  const { id } = uploads.submit({ nome: 'proposta-contato.txt', buffer: Buffer.from(texto), user: engine.user('u-gestor') });
  let job;
  for (let i = 0; i < 200; i++) { job = engine.repo.job(id); if (!['enviado', 'processando'].includes(job.status)) break; await new Promise((r) => setTimeout(r, 10)); }
  assert.equal(job.status, 'aguardando_revisao');
  const gravado = engine.repo.jobText(id);
  assert.ok(!gravado.includes('maria.souza') && !gravado.includes('99876'));
  assert.ok(!JSON.stringify(job.sugestao).includes('maria.souza'));
  assert.deepEqual(job.sugestao.mascaramento.map((a) => a.tipo).sort(), ['e-mail', 'telefone']);
  assert.ok(job.sugestao.alertas.some((a) => a.codigo === 'mascaramento' && a.nivel === 'info'));
});

// ---- Roteamento por intenção no chat (adendo 5, UC03.17–UC03.23) ----
const { CASOS, avaliar } = await import('./avaliacao-intencoes.js');
const { MockLLM } = await import('../src/llm.js');

test('roteador responde listagem, contagem, ficha, comparação e parecidos conforme a intenção (UC03.17–UC03.21)', async () => {
  const e = new RadarEngine({ storePath: STORE_PATH, repo: engine.repo, llm: new MockLLM() });
  const linhas = await avaliar(e, CASOS.filter(([q]) => !/P015/.test(q)));
  const erros = linhas.filter((l) => !l.ok).map((l) => `${l.pergunta} → ${l.obtido} (esperado ${l.esperado})`);
  assert.deepEqual(erros, []);
});

test('listagem e contagem vêm do banco e respeitam a confidencialidade (UC03.18 / UC03.19)', async () => {
  const consultor = await engine.search('faça um consolidado de todos os projetos que estão no seu banco', { userId: 'u-consultor' });
  const gestor = await engine.search('faça um consolidado de todos os projetos que estão no seu banco', { userId: 'u-gestor' });
  assert.equal(consultor.tipoResposta, 'listagem');
  assert.ok(gestor.dados.total > consultor.dados.total, 'o gestor enxerga projetos confidenciais');
  assert.ok(!JSON.stringify(consultor).includes('P005'));
  const areas = await engine.search('preciso saber quais são as áreas que possuem projetos salvos', { userId: 'u-consultor' });
  assert.equal(areas.tipoResposta, 'contagem');
  assert.equal(areas.dados.linhas.reduce((s, l) => s + l.quantidade, 0), consultor.dados.total);
  assert.ok(areas.dados.alternativas.length, 'oferece outras leituras de "áreas"');
  assert.ok(!/reaproveite/i.test(areas.resposta));
});

test('ficha usa os campos do cadastro e restringe valor e margem por perfil (UC03.20)', async () => {
  const q = 'Quais são o prazo, o valor, a margem e o responsável pelo projeto Plataforma de dados para redução de perdas não técnicas?';
  const g = await engine.search(q, { userId: 'u-gestor' });
  assert.equal(g.tipoResposta, 'ficha');
  const campo = (r, c) => r.dados.ficha.campos.find((x) => x.campo === c);
  assert.equal(campo(g, 'prazo_meses').valor, 6);
  assert.ok(campo(g, 'valor').valor > 0 && campo(g, 'margem').valor > 0);
  assert.ok(campo(g, 'dono').valor);
  const c = await engine.search(q, { userId: 'u-consultor' });
  assert.equal(campo(c, 'valor').restrito, true);
  assert.equal(campo(c, 'valor').valor, null);
  assert.match(c.resposta, /Restrito ao seu perfil: valor e margem/);
  assert.ok(!JSON.stringify(c).includes('2400000'));
});

test('comparação usa os projetos mostrados na resposta anterior ("compare os dois")', async () => {
  const conv = new ConversationStore(path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'radar-')), 'c.json'));
  const c = conv.open(null, { userId: 'u-gestor' });
  const r1 = await engine.search('mostre todos os projetos de varejo', { userId: 'u-gestor' });
  assert.equal(r1.tipoResposta, 'listagem');
  conv.addTurn(c, { turnoId: 't1', pergunta: 'mostre todos os projetos de varejo', resultado: r1 });
  const r2 = await engine.search('compare os dois', { userId: 'u-gestor', history: conv.history(c) });
  assert.equal(r2.tipoResposta, 'comparacao');
  assert.deepEqual(r2.dados.fichas.map((f) => f.projeto_id).sort(), r1.dados.itens.map((i) => i.projeto_id).sort());
});

test('pergunta que retoma a resposta anterior ("resultados neles") usa os mesmos projetos (V0.0.1)', async () => {
  const conv = new ConversationStore(path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'radar-')), 'c.json'));
  const c = conv.open(null, { userId: 'u-consultor' });
  const q1 = 'quais clientes de Utilities / Energia temos na base?';
  const r1 = await engine.search(q1, { userId: 'u-consultor' });
  assert.equal(r1.tipoResposta, 'contagem');
  conv.addTurn(c, { turnoId: 't1', pergunta: q1, resultado: r1 });
  const r2 = await engine.search('quais os resultados neles?', { userId: 'u-consultor', history: conv.history(c) });
  assert.equal(r2.tipoResposta, 'resultados');
  assert.equal(r2.dados.projetos.length, r1.dados.total, 'mesmo conjunto da contagem, sem busca nova');
  assert.ok(r2.dados.projetos.every((p) => p.titulo && p.cliente));
  assert.ok(r2.dados.projetos.some((p) => p.resultados.length && p.fonte), 'traz a seção Resultados do case');
  assert.ok(r2.dados.projetos.some((p) => !p.resultados.length), 'diz quando não há resultado registrado');
  conv.addTurn(c, { turnoId: 't2', pergunta: 'quais os resultados neles?', resultado: r2 });
  const r3 = await engine.search('qual o prazo deles?', { userId: 'u-consultor', history: conv.history(c) });
  assert.equal(r3.tipoResposta, 'comparacao');
  assert.deepEqual(r3.dados.fichas.map((f) => f.projeto_id), r2.dados.projetos.map((p) => p.projeto_id));
  // Sem resposta anterior, a mesma pergunta não inventa um conjunto.
  assert.notEqual((await engine.search('quais os resultados neles?', { userId: 'u-consultor' })).tipoResposta, 'resultados');
});

test('pergunta composta: a IA escolhe ferramentas, o servidor aplica as permissões e remove citações sem fonte (UC03.23)', async () => {
  const chamadas = [];
  const fake = new (class extends MockLLM {
    async understand(a) { return { ...(await super.understand(a)), intencao: 'composta', ia: { provedor: 'deepseek', fallback: false } }; }
    async runTools({ execute, tools }) {
      chamadas.push(tools.map((t) => t.function.name));
      const lista = await execute('listar_projetos', { filtros: { segmentos: ['Varejo'], status: ['Inexistente'] } });
      const ficha = await execute('ficha_projeto', { projeto_id: lista.dados.itens[0].projeto_id, campos: ['valor', 'margem', 'prazo_meses'] });
      const negado = await execute('ficha_projeto', { projeto_id: 'P005' });
      return { resposta: `Em varejo há [${lista.dados.itens[0].projeto_id}]. O [P999] não existe.`, passos: [{ ferramenta: 'listar_projetos', ...lista }, { ferramenta: 'ficha_projeto', ...ficha }, { ferramenta: 'ficha_projeto', ...negado }], ia: { provedor: 'deepseek', fallback: false } };
    }
  })();
  const e = new RadarEngine({ storePath: STORE_PATH, repo: engine.repo, llm: fake });
  const r = await e.search('liste os projetos de varejo e compare os dois', { userId: 'u-consultor' });
  assert.equal(r.tipoResposta, 'composta');
  assert.deepEqual(chamadas[0].sort(), ['buscar_semelhantes', 'buscar_trechos', 'contar_por', 'ficha_projeto', 'listar_projetos', 'localizar_projeto']);
  const ficha = r.dados.blocos.find((b) => b.tipo === 'ficha').dados.ficha;
  assert.equal(ficha.campos.find((c) => c.campo === 'valor').restrito, true, 'consultor não recebe valor nem pela ferramenta');
  assert.equal(r.ferramentas.length, 3);
  assert.equal(r.ferramentas[2].itens, 0, 'projeto confidencial não é devolvido ao consultor');
  assert.ok(!r.resposta.includes('P999'), 'citação de projeto que nenhuma ferramenta devolveu é removida');
  // Sem suporte a ferramentas, a mesma pergunta cai no roteador por regras.
  const semTools = new RadarEngine({ storePath: STORE_PATH, repo: engine.repo, llm: new (class extends MockLLM {
    async understand(a) { return { ...(await super.understand(a)), intencao: 'composta' }; }
  })() });
  assert.notEqual((await semTools.search('liste todos os projetos e compare', { userId: 'u-consultor' })).tipoResposta, 'composta');
});

test('qualidade: ticket com código, mascaramento, falha no roteiro abre ticket e versão nova começa zerada', () => {
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'radar-qa-')), 'qualidade.json');
  const q = new QualityStore(file);
  const t1 = q.abrir({ nome: 'Ana', texto: 'A resposta veio errada. Meu e-mail é ana.teste@exemplo.com', area: 'conversas', versao: 'V0.0.1' });
  assert.equal(t1.codigo, 'CR-001');
  assert.ok(!JSON.stringify(t1).includes('ana.teste@exemplo.com'), 'e-mail mascarado antes de gravar');
  const r = q.registrar({ versao: 'V0.0.1', cenario: 'C02', analista: 'Bruno', resultado: 'falha', comentario: 'Veio projetos parecidos em vez da lista.' });
  assert.equal(r.ticket, 'CR-002');
  assert.equal(q.data.tickets.find((t) => t.codigo === 'CR-002').cenario, 'C02');
  assert.throws(() => q.registrar({ versao: 'V0.0.1', cenario: 'C03', analista: 'Bruno', resultado: 'falha' }), /Conte o que aconteceu/);
  q.registrar({ versao: 'V0.0.1', cenario: 'C01', analista: 'Bruno', resultado: 'ok' });
  const s1 = q.resumo('V0.0.1');
  assert.equal(s1.geral.ok, 1);
  assert.equal(s1.geral.falha, 1);
  assert.equal(s1.geral.pendente, ROTEIRO.length * 3 - 2);
  q.atualizar('CR-002', { status: 'corrigido', texto: 'Corrigido, pode retestar.', autor: 'Claude', versao: 'V0.0.2' });
  // Versão nova: roteiro zerado; tickets continuam e o histórico da anterior fica disponível.
  const q2 = new QualityStore(file);
  const s2 = q2.resumo('V0.0.2');
  assert.equal(s2.geral.ok + s2.geral.falha + s2.geral.bloqueado, 0);
  assert.equal(q2.tickets({ abertos: true }).length, 2);
  assert.equal(q2.tickets().find((t) => t.codigo === 'CR-002').versaoCorrecao, 'V0.0.2');
  assert.deepEqual(s2.anteriores.map((v) => v.versao), ['V0.0.1']);
  assert.equal(q2.abrir({ nome: 'Ana', texto: 'Outro problema aqui.', versao: 'V0.0.2' }).codigo, 'CR-003');
});

test('qualidade: imagens só PNG/JPG/WEBP, no máximo 3; versão do selo igual à do package.json; arquivos do roteiro existem', () => {
  const png = `data:image/png;base64,${fs.readFileSync(path.join(ROOT, 'public', 'img', 'impactai-claro.png')).toString('base64')}`;
  assert.equal(lerImagens([png]).length, 1);
  assert.throws(() => lerImagens([png, png, png, png]), /no máximo 3/);
  assert.throws(() => lerImagens(['data:text/html;base64,PGI+']), /Formato/);
  const selo = fs.readFileSync(path.join(ROOT, 'public', 'versao.js'), 'utf8').match(/VERSAO = '([^']+)'/)[1];
  assert.equal(selo, VERSAO);
  for (const c of ROTEIRO) for (const a of [c.arquivo, c.arquivo2].filter(Boolean)) assert.ok(fs.existsSync(path.join(ROOT, 'amostras', a)), a);
  assert.equal(new Set(ROTEIRO.map((c) => c.id)).size, ROTEIRO.length);
});

test('métricas sobrevivem a uma linha de auditoria cortada (disco cheio)', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'radar-audit-'));
  const a = new AuditLog(dir);
  a.logEvent({ tipo: 'abrir_fonte' });
  fs.appendFileSync(a.turnsFile, '{"turnoId":"x","sessionId":"s","resul');
  a.logEvent({ tipo: 'abrir_fonte' });
  a.append(a.turnsFile, { turnoId: 't1', sessionId: 's1', ts: new Date().toISOString(), semEvidencia: false, resultados: [], tempoMs: 100 });
  const m = a.metrics();
  assert.equal(m.buscas, 1);
  assert.equal(m.aberturasDeFonte, 2);
  assert.equal(fs.readFileSync(a.turnsFile, 'utf8').split('\n').filter(Boolean).length, 2, 'registro novo não pode colar na linha quebrada');
});

test('tickets: edição com prioridade, situação e imagens fica no histórico; valida antes de mudar', () => {
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'radar-tk-')), 'qualidade.json');
  const q = new QualityStore(file);
  const t = q.abrir({ nome: 'Ana', texto: 'O filtro de segmento não limpa.', area: 'projetos', versao: 'V0.0.1' });
  assert.equal(t.prioridade, null);
  assert.deepEqual(t.imagens, []);
  assert.throws(() => q.editar(t.codigo, { autor: '', prioridade: 'alta' }), /seu nome/);
  assert.throws(() => q.editar(t.codigo, { autor: 'Bia', prioridade: 'urgentissima' }), /Prioridade inválida/);
  assert.throws(() => q.editar(t.codigo, { autor: 'Bia', imagensNovas: [{ url: 'javascript:alert(1)' }] }), /Link de imagem/);
  assert.throws(() => q.editar(t.codigo, { autor: 'Bia', prioridade: null }), /Nada foi alterado/);
  assert.equal(q.ticket(t.codigo).historico.length, 0, 'tentativas inválidas não deixam rastro');
  const img = { url: 'https://i.ibb.co/abc/tela.jpg', thumb: 'https://i.ibb.co/abc/tela-t.jpg', apagar: 'https://ibb.co/abc/del', servico: 'imgbb' };
  const r = q.editar(t.codigo, { autor: 'Bia', versao: 'V0.0.1', prioridade: 'alta', titulo: 'Filtro de segmento não limpa', status: 'em_correcao', nota: 'Vou olhar.', imagensNovas: [img] });
  assert.equal(r.prioridade, 'alta');
  assert.equal(r.status, 'em_correcao');
  assert.equal(r.imagens[0].url, img.url);
  const h = r.historico.at(-1);
  assert.deepEqual(h.alteracoes.map((a) => a.campo).sort(), ['imagens', 'prioridade', 'titulo']);
  assert.equal(h.de, 'aberto');
  assert.equal(h.para, 'em_correcao');
  assert.throws(() => q.editar(t.codigo, { autor: 'Bia', imagensNovas: Array(6).fill(img) }), /No máximo 6/);
  const r2 = new QualityStore(file).editar(t.codigo, { autor: 'Bia', remover: [img.url], prioridade: '' });
  assert.equal(r2.imagens.length, 0);
  assert.equal(r2.prioridade, null);
});

test('tickets: hospedagem de imagens no ImgBB só com chave, sem expor a chave no erro', async () => {
  assert.equal(criarHospedagem({}), null);
  const chamadas = [];
  const ok = criarHospedagem({ IMGBB_API_KEY: 'chave-teste' }, async (url, init) => {
    chamadas.push({ url, corpo: String(init.body) });
    return new Response(JSON.stringify({ success: true, data: { url: 'https://i.ibb.co/x/a.jpg', thumb: { url: 'https://i.ibb.co/x/a-t.jpg' }, delete_url: 'https://ibb.co/x/d' } }));
  });
  const [a] = await hospedarTodas(ok, ['data:image/png;base64,iVBORw0KGgo='], 'CR-009');
  assert.equal(a.url, 'https://i.ibb.co/x/a.jpg');
  assert.equal(a.thumb, 'https://i.ibb.co/x/a-t.jpg');
  assert.match(chamadas[0].url, /^https:\/\/api\.imgbb\.com\/1\/upload\?key=chave-teste$/);
  assert.match(chamadas[0].corpo, /image=iVBORw0KGgo%3D/);
  assert.match(chamadas[0].corpo, /name=radar-CR-009-/);
  const falha = criarHospedagem({ IMGBB_API_KEY: 'chave-teste' }, async () => new Response(JSON.stringify({ success: false, error: { message: 'Invalid API v1 key.' } }), { status: 400 }));
  await assert.rejects(hospedarTodas(falha, ['data:image/png;base64,AA=='], 'CR-1'), (err) => /Invalid API/.test(err.message) && !err.message.includes('chave-teste'));
});
