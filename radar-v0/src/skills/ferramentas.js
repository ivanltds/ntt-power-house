// Registro único de ferramentas (adendo 6, fase 0): nome, descrição, parâmetros e executor no mesmo lugar,
// no formato de ferramentas do MCP / OpenAI. A IA só pede; o servidor executa com as permissões do usuário.
// Usado pela pergunta composta (UC03.23); os schemas enviados à IA saem daqui.

import { AGRUPAVEIS, CAMPOS_FICHA, filtrosValidos } from '../intents.js';
import { STATUS_PROPOSTA } from '../db/repo.js';

const filtrosSchema = (vocab) => ({
  type: 'object',
  description: 'Filtros opcionais. Use só valores das listas.',
  properties: {
    segmentos: { type: 'array', items: { type: 'string', enum: vocab.segmentos } },
    tecnologias: { type: 'array', items: { type: 'string', enum: vocab.tecnologias } },
    servicos: { type: 'array', items: { type: 'string', enum: vocab.servicos } },
    status: { type: 'array', items: { type: 'string', enum: STATUS_PROPOSTA } },
    cliente: { type: 'string', description: 'Parte do nome do cliente' },
    anoDe: { type: 'integer' },
    anoAte: { type: 'integer' },
  },
});

// executar(ctx, args) → { tipo (bloco da tela) | null, dados, ids (projetos citados), paraIA (o que volta para a IA) }
// ctx: { engine, user, vocab }
export const FERRAMENTAS = [
  {
    nome: 'listar_projetos',
    descricao: 'Lista projetos da base com filtros. Devolve o total, até 20 projetos e a distribuição por status e segmento.',
    parametros: (v) => ({ filtros: filtrosSchema(v) }),
    executar({ engine, user, vocab }, a) {
      const r = engine.tools.listar(user, filtrosValidos(a.filtros, vocab));
      return { tipo: 'listagem', dados: r, ids: r.itens.map((i) => i.projeto_id), paraIA: { total: r.total, itens: r.itens.map((i) => ({ id: i.projeto_id, titulo: i.titulo, cliente: i.cliente, segmento: i.segmento, status: i.status, ano: i.ano })), porStatus: r.porStatus, porSegmento: r.porSegmento.slice(0, 8) } };
    },
  },
  {
    nome: 'contar_por',
    descricao: 'Conta projetos agrupados por um campo (lista distinta com quantidade).',
    parametros: (v) => ({ campo: { type: 'string', enum: Object.keys(AGRUPAVEIS) }, filtros: filtrosSchema(v) }),
    obrigatorios: ['campo'],
    executar({ engine, user, vocab }, a) {
      const r = engine.tools.contar(user, a.campo, filtrosValidos(a.filtros, vocab));
      return { tipo: 'contagem', dados: r, ids: [], paraIA: { campo: r.rotulo, total: r.total, linhas: r.linhas.slice(0, 30) } };
    },
  },
  {
    nome: 'localizar_projeto',
    descricao: 'Acha projetos pelo código (P001), pelo título ou pelo nome do cliente.',
    parametros: () => ({ nome: { type: 'string' } }),
    obrigatorios: ['nome'],
    executar({ engine, user }, a) {
      const c = engine.tools.localizar(user, String(a.nome ?? ''));
      return { tipo: null, dados: { candidatos: c }, ids: c.map((x) => x.projeto_id), paraIA: { candidatos: c } };
    },
  },
  {
    nome: 'ficha_projeto',
    descricao: 'Campos cadastrados de um projeto. Use depois de localizar_projeto.',
    parametros: () => ({ projeto_id: { type: 'string' }, campos: { type: 'array', items: { type: 'string', enum: Object.keys(CAMPOS_FICHA) } } }),
    obrigatorios: ['projeto_id'],
    executar({ engine, user }, a) {
      const campos = Array.isArray(a.campos) ? a.campos.filter((c) => CAMPOS_FICHA[c]) : [];
      const f = engine.tools.ficha(user, String(a.projeto_id ?? '').toUpperCase(), campos);
      if (!f) return { tipo: null, ids: [], paraIA: { erro: 'Projeto não encontrado ou sem permissão.' } };
      return { tipo: 'ficha', dados: { ficha: f }, ids: [f.projeto_id], paraIA: { projeto_id: f.projeto_id, titulo: f.titulo, cliente: f.cliente, campos: f.campos.map((c) => ({ campo: c.rotulo, valor: c.texto })) } };
    },
  },
  {
    nome: 'buscar_semelhantes',
    descricao: 'Projetos parecidos com um tema, problema ou proposta (busca semântica).',
    parametros: (v) => ({ texto: { type: 'string' }, filtros: filtrosSchema(v) }),
    obrigatorios: ['texto'],
    executar({ engine, user, vocab }, a) {
      const itens = engine.quickSimilar(String(a.texto ?? ''), user, filtrosValidos(a.filtros, vocab));
      return { tipo: 'semelhantes', dados: { itens }, ids: itens.map((i) => i.projeto_id), paraIA: { projetos: itens } };
    },
  },
  {
    nome: 'buscar_trechos',
    descricao: 'Frases dos documentos de um projeto sobre um assunto (resultados, riscos, lições, escopo).',
    parametros: () => ({ projeto_id: { type: 'string' }, assunto: { type: 'string' } }),
    obrigatorios: ['projeto_id', 'assunto'],
    executar({ engine, user }, a) {
      const r = engine.tools.trechos(user, String(a.projeto_id ?? '').toUpperCase(), String(a.assunto ?? ''));
      if (!r) return { tipo: null, ids: [], paraIA: { erro: 'Projeto não encontrado ou sem permissão.' } };
      return { tipo: 'trechos', dados: r, ids: [r.projeto_id], paraIA: { frases: r.frases.map((f) => f.texto) } };
    },
  },
];

// Schemas no formato de chamada de ferramenta (OpenAI / DeepSeek). O mesmo registro pode virar um servidor MCP.
export function toolSchemas(vocab) {
  return FERRAMENTAS.map((f) => ({
    type: 'function',
    function: { name: f.nome, description: f.descricao, parameters: { type: 'object', properties: f.parametros(vocab), required: f.obrigatorios ?? [] } },
  }));
}

// Despachante único: valida o nome e executa com as permissões do usuário.
export function executarFerramenta(ctx, nome, args = {}) {
  const f = FERRAMENTAS.find((x) => x.nome === nome);
  if (!f) return { tipo: null, ids: [], paraIA: { erro: 'Ferramenta desconhecida.' } };
  return f.executar(ctx, args && typeof args === 'object' ? args : {});
}
