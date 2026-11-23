// Massa de testes V0.0.3: planejamento determinístico de 500 projetos FICTÍCIOS (P101 a P600).
// Os FATOS (setor, tema, cliente, responsável, status, datas, valores, motivos e documentos) saem daqui, com semente fixa.
// A IA só escreve os textos depois (scripts/massa/escrever.js), em cima destes fatos — assim o gabarito é conhecido.
// Proporções espelham o que a Qualidade de Propostas relatou em 19/11: taxa de ganho entre 38% e 60%,
// toda oportunidade com proposta e documento financeiro, perdas com motivo (preço, escopo, concorrente…).
// Uso: node scripts/massa/planejar.js   → data/massa/planejamento.json

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const MASSA_DIR = path.join(ROOT, 'data', 'massa');
export const TOTAL = 500;
export const PRIMEIRO = 101;

// Gerador pseudoaleatório com semente (mulberry32): a mesma massa sai sempre igual.
function rng(seed) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const r = rng(20261123);
const escolher = (lista) => lista[Math.floor(r() * lista.length)];
const pesado = (pares) => { const total = pares.reduce((s, [, p]) => s + p, 0); let x = r() * total; for (const [v, p] of pares) { if ((x -= p) <= 0) return v; } return pares.at(-1)[0]; };
const varios = (lista, min, max) => { const n = min + Math.floor(r() * (max - min + 1)); return [...lista].sort(() => r() - 0.5).slice(0, Math.min(n, lista.length)); };
const entre = (a, b) => a + r() * (b - a);
const normal = () => Math.sqrt(-2 * Math.log(r() || 1e-9)) * Math.cos(2 * Math.PI * r());

// Setores (os 10 da base) com peso: os 3 maiores somam ~50%.
export const SETORES = [
  ['Serviços Financeiros', 0.2], ['Varejo', 0.15], ['Telecom', 0.13], ['Seguros', 0.1], ['Utilities / Energia', 0.09],
  ['Saúde', 0.09], ['Manufatura', 0.08], ['Setor Público', 0.06], ['Logística', 0.05], ['Agronegócio', 0.05],
];

// 25 temas recorrentes. setores: onde o tema faz sentido (o primeiro é o mais comum).
export const TEMAS = [
  { id: 'fraude', nome: 'detecção de fraude', area: 'AI & Automation', setores: ['Serviços Financeiros', 'Seguros', 'Varejo', 'Utilities / Energia', 'Telecom'], tec: ['Machine Learning', 'Python', 'Azure', 'Databricks', 'Kafka'], srv: ['Data Science / ML', 'Engenharia de Dados'], prazo: [4, 9] },
  { id: 'churn', nome: 'predição de churn e retenção', area: 'Data & Analytics', setores: ['Telecom', 'Serviços Financeiros', 'Varejo', 'Seguros', 'Saúde'], tec: ['Machine Learning', 'Python', 'Salesforce', 'Databricks', 'AWS'], srv: ['Data Science / ML', 'CRM', 'Analytics & BI'], prazo: [3, 7] },
  { id: 'demanda', nome: 'previsão de demanda e reposição', area: 'Data & Analytics', setores: ['Varejo', 'Manufatura', 'Logística', 'Agronegócio', 'Utilities / Energia'], tec: ['Machine Learning', 'Python', 'Databricks', 'Snowflake', 'SAP'], srv: ['Data Science / ML', 'Engenharia de Dados'], prazo: [4, 8] },
  { id: 'preditiva', nome: 'manutenção preditiva de ativos', area: 'AI & Automation', setores: ['Utilities / Energia', 'Manufatura', 'Logística', 'Agronegócio', 'Telecom'], tec: ['Machine Learning', 'Databricks', 'Azure', 'SAP', 'Kafka', 'Python'], srv: ['Data Science / ML', 'Engenharia de Dados'], prazo: [5, 10] },
  { id: 'lakehouse', nome: 'plataforma de dados lakehouse', area: 'Data & Analytics', setores: ['Serviços Financeiros', 'Varejo', 'Telecom', 'Saúde', 'Manufatura', 'Setor Público'], tec: ['Databricks', 'Azure', 'AWS', 'Snowflake', 'Python', 'Kafka'], srv: ['Engenharia de Dados', 'Governança de Dados', 'Migração para Nuvem'], prazo: [5, 12] },
  { id: 'migracao_dw', nome: 'migração de data warehouse para a nuvem', area: 'Cloud & Infra', setores: ['Serviços Financeiros', 'Seguros', 'Varejo', 'Setor Público', 'Telecom'], tec: ['Snowflake', 'Azure', 'AWS', 'GCP', 'Databricks'], srv: ['Migração para Nuvem', 'Engenharia de Dados'], prazo: [4, 10] },
  { id: 'bi_executivo', nome: 'painéis executivos e BI', area: 'Data & Analytics', setores: ['Saúde', 'Setor Público', 'Varejo', 'Logística', 'Agronegócio', 'Manufatura'], tec: ['Power BI', 'Azure', 'Snowflake', 'SAP'], srv: ['Analytics & BI', 'Engenharia de Dados'], prazo: [2, 6] },
  { id: 'genai_atendimento', nome: 'assistente virtual com IA generativa no atendimento', area: 'AI & Automation', setores: ['Telecom', 'Saúde', 'Serviços Financeiros', 'Seguros', 'Varejo', 'Setor Público'], tec: ['IA Generativa', 'Azure', 'Python', 'Salesforce', 'ServiceNow'], srv: ['IA Generativa', 'Automação de Processos'], prazo: [3, 7] },
  { id: 'genai_documentos', nome: 'leitura e triagem de documentos com IA generativa', area: 'AI & Automation', setores: ['Seguros', 'Serviços Financeiros', 'Setor Público', 'Saúde', 'Logística'], tec: ['IA Generativa', 'Azure', 'AWS', 'Python', 'RPA'], srv: ['IA Generativa', 'Automação de Processos'], prazo: [3, 6] },
  { id: 'rpa_backoffice', nome: 'automação de back-office com RPA', area: 'AI & Automation', setores: ['Logística', 'Serviços Financeiros', 'Seguros', 'Utilities / Energia', 'Manufatura'], tec: ['RPA', 'ServiceNow', 'SAP', 'Python'], srv: ['Automação de Processos', 'Sustentação / AMS'], prazo: [2, 6] },
  { id: 'lgpd', nome: 'governança de dados e LGPD', area: 'Data & Analytics', setores: ['Serviços Financeiros', 'Saúde', 'Seguros', 'Telecom', 'Setor Público'], tec: ['Azure', 'Databricks', 'Snowflake', 'Python'], srv: ['Governança de Dados', 'Change Management'], prazo: [3, 8] },
  { id: 'credito', nome: 'modelo de risco de crédito', area: 'AI & Automation', setores: ['Serviços Financeiros', 'Varejo', 'Agronegócio', 'Telecom'], tec: ['Machine Learning', 'Python', 'AWS', 'Snowflake'], srv: ['Data Science / ML', 'Governança de Dados'], prazo: [4, 8] },
  { id: 'precificacao', nome: 'precificação dinâmica', area: 'Data & Analytics', setores: ['Varejo', 'Seguros', 'Logística', 'Telecom'], tec: ['Machine Learning', 'Python', 'GCP', 'Databricks'], srv: ['Data Science / ML', 'Analytics & BI'], prazo: [3, 7] },
  { id: 'crm', nome: 'implantação de CRM e jornada do cliente', area: 'Digital & CRM', setores: ['Varejo', 'Seguros', 'Serviços Financeiros', 'Telecom', 'Saúde'], tec: ['Salesforce', 'Azure', 'Kafka'], srv: ['CRM', 'Change Management', 'Engenharia de Dados'], prazo: [5, 12] },
  { id: 'sap_s4', nome: 'migração para SAP S/4HANA', area: 'Enterprise Apps', setores: ['Manufatura', 'Agronegócio', 'Utilities / Energia', 'Logística', 'Varejo'], tec: ['SAP', 'Azure', 'AWS'], srv: ['ERP', 'Migração para Nuvem', 'Change Management'], prazo: [8, 18] },
  { id: 'ams', nome: 'sustentação de aplicações (AMS)', area: 'Enterprise Apps', setores: ['Utilities / Energia', 'Manufatura', 'Setor Público', 'Serviços Financeiros', 'Varejo'], tec: ['SAP', 'ServiceNow', 'Azure', 'Kubernetes'], srv: ['Sustentação / AMS'], prazo: [12, 36] },
  { id: 'kubernetes', nome: 'modernização de aplicações com containers', area: 'Cloud & Infra', setores: ['Telecom', 'Serviços Financeiros', 'Varejo', 'Setor Público'], tec: ['Kubernetes', 'AWS', 'Azure', 'GCP', 'Kafka'], srv: ['Migração para Nuvem', 'Sustentação / AMS'], prazo: [5, 12] },
  { id: 'streaming', nome: 'dados em tempo real com streaming', area: 'Data & Analytics', setores: ['Telecom', 'Serviços Financeiros', 'Logística', 'Utilities / Energia'], tec: ['Kafka', 'Databricks', 'AWS', 'Azure', 'Python'], srv: ['Engenharia de Dados', 'Analytics & BI'], prazo: [4, 9] },
  { id: 'roteirizacao', nome: 'otimização de rotas e frota', area: 'AI & Automation', setores: ['Logística', 'Varejo', 'Agronegócio', 'Utilities / Energia'], tec: ['Machine Learning', 'Python', 'GCP', 'Power BI'], srv: ['Data Science / ML', 'Analytics & BI'], prazo: [3, 7] },
  { id: 'safra', nome: 'previsão de safra e agricultura de precisão', area: 'Data & Analytics', setores: ['Agronegócio'], tec: ['Machine Learning', 'Python', 'AWS', 'Power BI'], srv: ['Data Science / ML', 'Analytics & BI'], prazo: [4, 8] },
  { id: 'saude_populacional', nome: 'gestão de saúde populacional', area: 'Data & Analytics', setores: ['Saúde', 'Seguros', 'Setor Público'], tec: ['Machine Learning', 'Azure', 'Power BI', 'Python'], srv: ['Data Science / ML', 'Analytics & BI', 'Governança de Dados'], prazo: [5, 10] },
  { id: 'perdas_energia', nome: 'redução de perdas não técnicas de energia', area: 'Data & Analytics', setores: ['Utilities / Energia'], tec: ['Databricks', 'Machine Learning', 'Azure', 'Power BI'], srv: ['Data Science / ML', 'Engenharia de Dados'], prazo: [5, 9] },
  { id: 'atendimento_omni', nome: 'atendimento omnicanal e service desk', area: 'Digital & CRM', setores: ['Setor Público', 'Telecom', 'Utilities / Energia', 'Saúde'], tec: ['ServiceNow', 'Salesforce', 'IA Generativa', 'Azure'], srv: ['CRM', 'Automação de Processos', 'Sustentação / AMS'], prazo: [4, 10] },
  { id: 'esg', nome: 'indicadores ESG e emissões', area: 'Data & Analytics', setores: ['Manufatura', 'Utilities / Energia', 'Agronegócio', 'Serviços Financeiros'], tec: ['Power BI', 'Snowflake', 'Azure', 'Python'], srv: ['Analytics & BI', 'Governança de Dados'], prazo: [3, 6] },
  { id: 'finops', nome: 'FinOps e otimização de custos de nuvem', area: 'Cloud & Infra', setores: ['Varejo', 'Telecom', 'Serviços Financeiros', 'Logística'], tec: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Power BI'], srv: ['Migração para Nuvem', 'Analytics & BI'], prazo: [2, 5] },
];

// Clientes fictícios por setor (qualquer semelhança com empresas reais é coincidência).
const CLIENTES = {
  'Serviços Financeiros': ['Banco Aurora', 'Banco Meridiano', 'Cooperativa Sicrédito Planalto', 'Financeira Rumo Certo', 'Banco Atlântida Digital', 'Corretora Valor Alto', 'Banco Horizonte Sul', 'Fintech Pagaí', 'Consórcio União Nacional', 'Banco Ponte Firme', 'Crédito Fácil Brasil', 'Banco Cidadela'],
  Varejo: ['Rede Supermercados Bom Lar', 'Magazine Estrela Azul', 'Farmácias Vida Plena', 'Moda Leve Store', 'Atacadão Popular Sul', 'Casa & Construção Prime', 'Eletro Mais', 'Livrarias Página Viva', 'Calçados Passo Firme'],
  Telecom: ['TeleNorte Conecta', 'FibraMax Internet', 'Operadora Sinal Forte', 'Conecta Brasil Telecom', 'NetVale Provedor', 'Ondas Móvel', 'Tríade Telecom'],
  Seguros: ['Seguradora Vértice', 'Proteja Seguros', 'Mútua Previdência Sul', 'Seguradora Amparo', 'Escudo Auto Seguros', 'Saúde Garantida Seguros'],
  'Utilities / Energia': ['Distribuidora Luz do Cerrado', 'Companhia de Saneamento Rio Claro', 'Geradora Ventos do Nordeste', 'Energia Paulista Distribuição', 'Gás Canalizado Litoral'],
  Saúde: ['Hospital São Lucas do Vale', 'Rede de Clínicas Bem Viver', 'Laboratório Diagnóstico Preciso', 'Operadora Saúde Total', 'Hospital Infantil Esperança', 'Rede Hospitalar Santa Clara'],
  Manufatura: ['Metalúrgica Forja Forte', 'Indústria de Embalagens Plastipack', 'Autopeças Motriz', 'Química Fênix', 'Têxtil Fio de Ouro', 'Cimentos Rocha Firme'],
  'Setor Público': ['Secretaria Estadual de Saúde do Planalto', 'Prefeitura de Nova Esperança', 'Tribunal Regional de Contas do Sul', 'Agência Estadual de Trânsito', 'Instituto de Previdência Municipal'],
  Logística: ['Transportadora Rota Livre', 'Operador Logístico Armazém Brasil', 'Porto Seco Interior', 'Entregas Expressas Já', 'Cargas Rodo Sul'],
  Agronegócio: ['Cooperativa Agro Vale Verde', 'Usina Canaviais do Oeste', 'Agropecuária Terra Boa', 'Grãos do Cerrado Trading', 'Frigorífico Campo Nobre'],
};

// Responsáveis (gerentes e pré-vendas) fictícios: setor de origem e prática. ~30% dos projetos atravessam setores.
const PESSOAS = [
  ['Ana Beatriz Lopes', 'Serviços Financeiros', 'Data & Analytics'], ['Bruno Tavares', 'Serviços Financeiros', 'AI & Automation'], ['Carla Menezes', 'Serviços Financeiros', 'Cloud & Infra'], ['Diego Albuquerque', 'Serviços Financeiros', 'Digital & CRM'],
  ['Eduarda Prado', 'Varejo', 'Data & Analytics'], ['Fábio Nunes', 'Varejo', 'AI & Automation'], ['Gabriela Rocha', 'Varejo', 'Digital & CRM'],
  ['Henrique Matos', 'Telecom', 'Data & Analytics'], ['Isabela Freitas', 'Telecom', 'Cloud & Infra'], ['João Pedro Sales', 'Telecom', 'AI & Automation'],
  ['Karina Duarte', 'Seguros', 'AI & Automation'], ['Leonardo Pires', 'Seguros', 'Data & Analytics'], ['Mariana Teixeira', 'Seguros', 'Digital & CRM'],
  ['Nelson Barbosa', 'Utilities / Energia', 'Data & Analytics'], ['Olívia Cardoso', 'Utilities / Energia', 'Enterprise Apps'], ['Paulo Henrique Dias', 'Utilities / Energia', 'AI & Automation'],
  ['Quésia Ramos', 'Saúde', 'Data & Analytics'], ['Rafael Gonçalves', 'Saúde', 'AI & Automation'], ['Sabrina Moura', 'Saúde', 'Digital & CRM'],
  ['Tiago Fernandes', 'Manufatura', 'Enterprise Apps'], ['Úrsula Campos', 'Manufatura', 'Data & Analytics'], ['Vinícius Batista', 'Manufatura', 'AI & Automation'],
  ['Wesley Araújo', 'Setor Público', 'Digital & CRM'], ['Xênia Lacerda', 'Setor Público', 'Data & Analytics'],
  ['Yuri Monteiro', 'Logística', 'AI & Automation'], ['Zilda Correia', 'Logística', 'Data & Analytics'],
  ['André Vasconcelos', 'Agronegócio', 'Data & Analytics'], ['Bianca Siqueira', 'Agronegócio', 'Enterprise Apps'],
  ['César Brandão', 'Serviços Financeiros', 'Enterprise Apps'], ['Débora Castilho', 'Varejo', 'Cloud & Infra'], ['Emerson Viana', 'Telecom', 'Digital & CRM'],
  ['Flávia Guimarães', 'Saúde', 'Cloud & Infra'], ['Gustavo Lemos', 'Manufatura', 'Cloud & Infra'], ['Helena Bastos', 'Logística', 'Enterprise Apps'], ['Igor Peixoto', 'Setor Público', 'Cloud & Infra'],
].map(([nome, setor, area]) => ({ nome, setor, area }));

// Status: 500 projetos, taxa de ganho ~53% sobre as decididas (dentro dos 38% a 60% citados).
const STATUS = [['Entregue', 95], ['Em execução', 60], ['Vendida', 35], ['Perdida', 165], ['Em elaboração', 30], ['Enviada', 40], ['Em negociação', 30], ['Cancelada', 45]];
const MOTIVOS_PERDA = [['preco', 35], ['escopo', 20], ['concorrente', 15], ['relacionamento', 10], ['prazo', 8], ['capacidade', 7], ['desistencia', 5]];
export const ROTULO_MOTIVO = { preco: 'preço acima do mercado', escopo: 'escopo maior que a necessidade do cliente', concorrente: 'concorrente com solução já instalada', relacionamento: 'relacionamento fraco com o decisor', prazo: 'prazo de entrega longo demais', capacidade: 'falta de experiência comprovada no tema', desistencia: 'cliente desistiu ou congelou o orçamento' };
const MOTIVOS_GANHO = [['case', 40], ['relacionamento', 25], ['capacidade', 20], ['preco', 10], ['prazo', 5]];
export const ROTULO_GANHO = { case: 'case de referência parecido', relacionamento: 'relacionamento e continuidade com o cliente', capacidade: 'capacidade técnica demonstrada em prova de conceito', preco: 'preço competitivo', prazo: 'prazo de entrega curto' };

// Datas (data de referência da proposta) por status, de abr/2024 a nov/2026.
const JANELA = {
  Entregue: ['2024-04-01', '2026-03-31'], 'Em execução': ['2025-07-01', '2026-09-30'], Vendida: ['2026-03-01', '2026-10-31'],
  Perdida: ['2024-04-01', '2026-10-31'], Cancelada: ['2024-06-01', '2026-09-30'],
  'Em elaboração': ['2026-09-15', '2026-11-20'], Enviada: ['2026-07-01', '2026-11-15'], 'Em negociação': ['2026-05-01', '2026-11-10'],
};
const dataEntre = ([a, b]) => {
  // Mais volume nos anos recentes (a base cresce): sorteio puxado para o fim da janela.
  const t0 = Date.parse(a), t1 = Date.parse(b);
  return new Date(t0 + (t1 - t0) * Math.pow(r(), 0.75)).toISOString().slice(0, 10);
};

export function planejar() {
  const lista = STATUS.flatMap(([s, n]) => Array(n).fill(s)).sort(() => r() - 0.5);
  const temasPorSetor = (setor) => TEMAS.filter((t) => t.setores.includes(setor));
  const usados = new Map();
  const projetos = lista.map((status, k) => {
    const setor = pesado(SETORES);
    const tema = escolher(temasPorSetor(setor).flatMap((t) => (t.setores[0] === setor ? [t, t] : [t])));
    // Clientes recorrentes: ~30% dos projetos voltam a um cliente já atendido no setor.
    const doSetor = CLIENTES[setor];
    const jaAtendidos = [...usados.keys()].filter((c) => doSetor.includes(c));
    const cliente = jaAtendidos.length && r() < 0.35 ? escolher(jaAtendidos) : escolher(doSetor);
    usados.set(cliente, (usados.get(cliente) ?? 0) + 1);
    // Responsável: 70% da casa (setor), 30% de outro setor com a mesma prática.
    const daCasa = PESSOAS.filter((p) => p.setor === setor && p.area === tema.area);
    const mesmaPratica = PESSOAS.filter((p) => p.area === tema.area);
    const dono = (daCasa.length && r() < 0.7 ? escolher(daCasa) : escolher(mesmaPratica.length ? mesmaPratica : PESSOAS)).nome;
    const data = dataEntre(JANELA[status]);
    const prazo = Math.max(2, Math.round(entre(...tema.prazo)));
    // Valor: log-normal (mediana ~R$ 1,2 mi), proporcional ao prazo; de R$ 150 mil a R$ 12 mi.
    let valor = Math.exp(Math.log(1_200_000) + 0.75 * normal()) * (0.6 + prazo / 15);
    const motivoPerda = status === 'Perdida' ? pesado(MOTIVOS_PERDA) : null;
    if (motivoPerda === 'preco') valor *= 1.2;
    if (motivoPerda === 'escopo') valor *= 1.35;
    valor = Math.round(Math.min(12_000_000, Math.max(150_000, valor)) / 10_000) * 10_000;
    const margem = Math.round(entre(motivoPerda === 'preco' ? 0.28 : 0.18, motivoPerda === 'preco' ? 0.38 : 0.34) * 100) / 100;
    const ganho = ['Entregue', 'Em execução', 'Vendida'].includes(status);
    const tecnologias = varios(tema.tec, 2, 4);
    const servicos = [...new Set([...varios(tema.srv, 1, tema.srv.length), ...(r() < 0.15 ? ['Change Management'] : [])])];
    const enviada = !['Em elaboração'].includes(status);
    const docs = ['proposta', 'financeiro'];
    if (enviada) docs.push('apresentacao');
    if (r() < 0.6) docs.push('transcricao');
    if (ganho && r() < 0.7) docs.push('sow');
    if (status === 'Entregue' && r() < 0.6) docs.push('case');
    else if (status === 'Entregue' && r() < 0.7) docs.push('licoes');
    if (status === 'Perdida' && r() < 0.7) docs.push('analise_perda');
    if (status === 'Perdida' && r() < 0.4) docs.push('email_retorno');
    // Casos difíceis de propósito: versão anterior da proposta com prazo/valor diferente (10%),
    // cadastro incompleto (15%) e dados pessoais para mascarar (8%).
    const conflito = r() < 0.1;
    if (conflito) docs.push('proposta_v1');
    return {
      id: `P${PRIMEIRO + k}`, cliente, setor, tema: tema.id, temaNome: tema.nome, area: tema.area, dono, status, data, prazo,
      prazoEstimativa: Math.max(2, prazo - Math.round(entre(0, 2))), valor, margem,
      confidencialidade: r() < 0.2 ? 'confidencial' : 'interna', tecnologias, servicos,
      motivoPerda, motivoGanho: ganho ? pesado(MOTIVOS_GANHO) : null,
      continuidade: usados.get(cliente) > 1, docs, conflito, incompleto: r() < 0.15, pii: r() < 0.08,
    };
  });
  return { geradoEm: '2026-11-23', semente: 20261123, total: projetos.length, projetos };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const p = planejar();
  fs.mkdirSync(MASSA_DIR, { recursive: true });
  fs.writeFileSync(path.join(MASSA_DIR, 'planejamento.json'), JSON.stringify(p, null, 1));
  const conta = (f) => Object.entries(p.projetos.reduce((m, x) => ({ ...m, [f(x)]: (m[f(x)] ?? 0) + 1 }), {})).sort((a, b) => b[1] - a[1]);
  console.log('projetos', p.total, 'documentos', p.projetos.reduce((s, x) => s + x.docs.length, 0));
  console.log('status', conta((x) => x.status));
  console.log('setor', conta((x) => x.setor));
  console.log('tema', conta((x) => x.tema).map(([k, n]) => `${k}:${n}`).join(' '));
  console.log('clientes', new Set(p.projetos.map((x) => x.cliente)).size, 'donos', new Set(p.projetos.map((x) => x.dono)).size);
  console.log('ano', conta((x) => x.data.slice(0, 4)));
  const v = p.projetos.map((x) => x.valor).sort((a, b) => a - b);
  console.log('valor mediana', v[250], 'min', v[0], 'max', v.at(-1), '>=500k', v.filter((x) => x >= 500000).length);
}
