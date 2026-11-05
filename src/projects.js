// Cadastro e edição de projetos (UC07), com sugestão inteligente de metadados e detecção de duplicatas.
// Projetos cadastrados ganham uma "ficha" indexada, para aparecerem na busca conversacional mesmo sem documentos.

import { analyzeText, mergeAI } from './analysis.js';
import { STATUS_PROPOSTA, CONFIDENCIALIDADES } from './db/repo.js';
import { trechoRows } from './ingest.js';
import { trustLevel } from './corpus.js';
import { can, PROIBIDO } from './permissions.js';

const cosine = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);

export function validateProject(d, user, { parcial = false } = {}) {
  const erros = [];
  const required = { cliente: 'Cliente', titulo: 'Título', segmento: 'Segmento', status_proposta: 'Status da proposta' };
  if (!parcial) for (const [k, label] of Object.entries(required)) if (!String(d[k] ?? '').trim()) erros.push(`${label} é obrigatório.`);
  if (d.status_proposta && !STATUS_PROPOSTA.includes(d.status_proposta)) erros.push(`Status inválido. Use: ${STATUS_PROPOSTA.join(', ')}.`);
  if (d.confidencialidade && !CONFIDENCIALIDADES.includes(d.confidencialidade)) erros.push('Confidencialidade inválida.');
  if (d.confidencialidade && !user.confidencialidades.includes(d.confidencialidade)) erros.push(`Seu perfil não pode classificar projetos como "${d.confidencialidade}".`);
  if (d.prazo_meses != null && d.prazo_meses !== '' && !(Number(d.prazo_meses) > 0 && Number(d.prazo_meses) <= 120)) erros.push('Prazo deve estar entre 0 e 120 meses.');
  if (d.valor != null && d.valor !== '' && !(Number(d.valor) >= 0)) erros.push('Valor deve ser positivo.');
  if (d.margem != null && d.margem !== '' && !(Number(d.margem) >= -1 && Number(d.margem) <= 1)) erros.push('Margem deve estar entre -100% e 100% (use fração, ex.: 0.25).');
  if (d.data_referencia && !/^\d{4}-\d{2}-\d{2}$/.test(d.data_referencia)) erros.push('Data de referência deve estar no formato AAAA-MM-DD.');
  return erros;
}

// Normaliza a entrada do formulário. Perfis sem permissão de valores não gravam valor nem margem.
export function cleanProject(d, user) {
  const num = (v) => (v === '' || v == null ? null : Number(v));
  const list = (v) => (Array.isArray(v) ? v : String(v ?? '').split(',')).map((x) => String(x).trim()).filter(Boolean);
  const out = {};
  for (const k of ['cliente', 'titulo', 'segmento', 'area', 'dono', 'status_proposta', 'confidencialidade', 'descricao', 'objetivo', 'link_sharepoint', 'data_referencia']) {
    if (k in d) out[k] = String(d[k] ?? '').trim() || null;
  }
  if ('prazo_meses' in d) out.prazo_meses = num(d.prazo_meses);
  if (user.verValores) {
    if ('valor' in d) out.valor = num(d.valor);
    if ('margem' in d) out.margem = num(d.margem);
  }
  if ('tecnologias' in d) out.tecnologias = list(d.tecnologias);
  if ('servicos' in d) out.servicos = list(d.servicos);
  return out;
}

export function fichaText(p) {
  const lines = [`# Ficha do projeto — ${p.titulo}`, '', `**Cliente:** ${p.cliente}`, `**Segmento:** ${p.segmento ?? '—'}`, `**Status:** ${p.status_proposta}`];
  if (p.area) lines.push(`**Área:** ${p.area}`);
  if (p.dono) lines.push(`**Responsável:** ${p.dono}`);
  if (p.prazo_meses) lines.push(`**Prazo:** ${p.prazo_meses} meses`);
  if (p.tecnologias?.length) lines.push(`**Tecnologias:** ${p.tecnologias.join(', ')}`);
  if (p.servicos?.length) lines.push(`**Serviços:** ${p.servicos.join(', ')}`);
  if (p.descricao) lines.push('', '## Contexto e desafio', '', p.descricao);
  if (p.objetivo) lines.push('', '## Objetivo', '', p.objetivo);
  return lines.join('\n');
}

// Recria a ficha indexável do projeto (documento <id>-FICHA) a partir do cadastro atual.
export function refreshFicha(repo, projetoId, usuarioId) {
  const p = repo.project(projetoId);
  if (!p || p.origem === 'seed') return;
  const texto = fichaText(p);
  repo.deleteDocument(`${projetoId}-FICHA`);
  repo.insertDocument({
    id: `${projetoId}-FICHA`, projeto_id: projetoId, titulo: `Ficha do projeto — ${p.titulo}`, tipo_documental: 'ficha_cadastro', status_documento: 'cadastro',
    nivel_confianca: trustLevel('ficha_cadastro'), confidencialidade: p.confidencialidade, arquivo: `cadastro/${projetoId}.md`, formato: 'cadastro',
    tamanho_bytes: Buffer.byteLength(texto), data_conteudo: p.data_referencia, prazo_meses: p.prazo_meses, resumo: p.descricao ?? p.objetivo, texto,
    origem: 'cadastro', enviado_por: usuarioId, revisado_por: usuarioId, revisado_em: new Date().toISOString(),
  }, { trechos: trechoRows(texto) });
}

// Projetos parecidos com um texto (centroide de conteúdo), restritos ao que o usuário pode ver.
export function similarProjects(engine, texto, user, limit = 3) {
  const v = engine.embedder.embedOne(texto.slice(0, 8000));
  return [...engine.projectVectors.entries()]
    .filter(([, p]) => user.confidencialidades.includes(p.meta.confidencialidade))
    .map(([id, p]) => ({ projeto_id: id, titulo: p.meta.titulo, cliente: p.meta.cliente, status: p.meta.status_proposta, similaridade: Math.round(cosine(v, p.vector) * 1000) / 1000 }))
    .sort((a, b) => b.similaridade - a.similaridade)
    .slice(0, limit);
}

// Número escrito em português: "2.000.000", "1,5", "1500000", "1.8".
function numeroBR(txt) {
  if (txt.includes(',')) return Number(txt.replace(/\./g, '').replace(',', '.'));
  if (/^\d{1,3}(\.\d{3})+$/.test(txt)) return Number(txt.replace(/\./g, ''));
  return Number(txt);
}

// Valor declarado na descrição, com ou sem "R$": "Valor: R$ 2.000.000", "valor de 2 milhões", "orçamento de 900 mil".
export function declaredValue(texto) {
  const m = texto.match(/(?:valor|investimento|or[cç]amento|pre[cç]o|custo)(?:\s+(?:total|estimado|previsto|do projeto|da proposta|aproximado))*\s*(?:[:=]|é|de|em torno de|de cerca de)?\s*(?:R\$\s*)?(\d[\d.,]*)\s*(milh(?:ão|ões|ao|oes)|mil\b|mi\b|bi(?:lh(?:ão|ões))?|k\b|reais)?/i);
  if (!m) return null;
  let v = numeroBR(m[1].replace(/[.,]$/, ''));
  const escala = (m[2] ?? '').toLowerCase();
  if (/^milh|^mi$/.test(escala)) v *= 1e6;
  else if (/^mil$|^k$/.test(escala)) v *= 1e3;
  else if (/^bi/.test(escala)) v *= 1e9;
  return Number.isFinite(v) && v > 0 ? Math.round(v) : null;
}

// Margem como fração: "margem de 30%", "margem: 25 por cento", "margem: 0,3".
export function declaredMargin(texto) {
  const pct = texto.match(/margem[^\d\n]{0,30}(\d{1,2}(?:[.,]\d+)?)\s*(?:%|por\s*cento)/i);
  if (pct) return numeroBR(pct[1]) / 100;
  const fr = texto.match(/margem[^\d\n]{0,15}(0[.,]\d+)/i);
  return fr ? numeroBR(fr[1].replace('.', ',')) : null;
}

// Área (ou departamento, setor, diretoria, prática): "Área: Dados", "área de Data & Analytics", "Área responsável - dados",
// "área de dados". Com dois-pontos/traço vale qualquer texto; sem eles, nome com inicial maiúscula ou área conhecida.
const AREAS_CONHECIDAS = 'dados|data|analytics|engenharia|ia\\b|intelig[eê]ncia|cloud|nuvem|infraestrutura|seguran[cç]a|comercial|vendas|ti\\b|tecnologia|opera[cç][oõ]es|financeir[ao]|rh\\b|marketing|produto|consultoria|inova[cç][aã]o|digital|automa[cç][aã]o|crm|erp|sap';
export function declaredArea(texto) {
  const ROTULO = '(?:[ÁáAa]rea|[Dd]epartamento|[Ss]etor|[Dd]iretoria|[Pp]r[aá]tica|[Vv]ertical)';
  const QUAL = '(?:\\s+(?:respons[aá]vel|de atua[cç][aã]o|demandante|solicitante|t[eé]cnica|de neg[oó]cio))?';
  const limpa = (v) => v.trim().replace(/\s+(?:e|com|para|no|na)$/i, '').replace(/^\p{Ll}/u, (c) => c.toUpperCase());
  const comSeparador = texto.match(new RegExp(`(?:^|[\\s.;,(])${ROTULO}${QUAL}\\s*[:\\-–=]\\s*([^\\n.;,]{2,50})`));
  if (comSeparador) return limpa(comSeparador[1]);
  const nomeProprio = texto.match(new RegExp(`(?:^|[\\s.;,(])${ROTULO}${QUAL}\\s+(?:de\\s+|da\\s+|do\\s+)?([A-ZÀ-Ú][^\\n.;,]{1,50})`));
  if (nomeProprio) return limpa(nomeProprio[1]);
  const conhecida = texto.match(new RegExp(`(?:^|[\\s.;,(])${ROTULO}${QUAL}\\s+(?:de\\s+|da\\s+|do\\s+)?((?:${AREAS_CONHECIDAS})[^\\n.;,]{0,40})`, 'i'));
  return conhecida ? limpa(conhecida[1]) : null;
}

// Data de referência em formato ISO: "Data: 15/11/2026", "início em 15 de novembro de 2026", "2026-11-15", "novembro de 2026", "11/2026".
const MESES = ['janeiro', 'fevereiro', 'mar[cç]o', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
export function declaredDate(texto) {
  const iso = (a, m, d = 1) => {
    const ano = Number(a) < 100 ? 2000 + Number(a) : Number(a);
    const dt = new Date(Date.UTC(ano, Number(m) - 1, Number(d)));
    return dt.getUTCMonth() === Number(m) - 1 && ano >= 1990 && ano <= 2100 ? dt.toISOString().slice(0, 10) : null;
  };
  const mesNum = (nome) => MESES.findIndex((re) => new RegExp(`^${re}$`, 'i').test(nome)) + 1;
  const MES = MESES.join('|');
  const candidatos = [];
  for (const m of texto.matchAll(/\b(\d{4})-(\d{1,2})-(\d{1,2})\b/g)) candidatos.push([m.index, iso(m[1], m[2], m[3])]);
  for (const m of texto.matchAll(/\b(\d{1,2})[/.-](\d{1,2})[/.-](\d{4}|\d{2})\b/g)) candidatos.push([m.index, iso(m[3], m[2], m[1])]);
  for (const m of texto.matchAll(new RegExp(`\\b(\\d{1,2})(?:º)?\\s+de\\s+(${MES})(?:\\s+de)?\\s+(\\d{4})\\b`, 'gi'))) candidatos.push([m.index, iso(m[3], mesNum(m[2]), m[1])]);
  for (const m of texto.matchAll(new RegExp(`\\b(${MES})(?:\\s+de|\\s*/)\\s*(\\d{4})\\b`, 'gi'))) candidatos.push([m.index, iso(m[2], mesNum(m[1]))]);
  for (const m of texto.matchAll(/(?<![\d/.-])(\d{1,2})\/(\d{4})\b/g)) candidatos.push([m.index, iso(m[2], m[1])]);
  const validos = candidatos.filter(([, v]) => v).sort((a, b) => a[0] - b[0]);
  if (!validos.length) return null;
  // Prefere a data mais próxima depois de uma palavra como "data", "referência", "início", "kickoff", "envio".
  const chave = /\b(?:data|refer[eê]ncia|in[ií]cio|kick-?off|assinatura|envio|entrega da proposta)\b/gi;
  for (const k of texto.matchAll(chave)) {
    const perto = validos.find(([pos]) => pos >= k.index && pos - k.index < 40);
    if (perto) return perto[1];
  }
  return validos[0][1];
}

// Sugere os campos do cadastro a partir de uma descrição livre (regras + IA) e mostra projetos parecidos.
export async function suggestProject(engine, texto, user) {
  const clients = engine.repo.clients();
  let s = analyzeText({ texto, filename: 'descricao.txt', clients, df: engine.df, docCount: engine.docs.size });
  const ai = await engine.llm.extractMetadata({ texto, filename: 'descricao.txt' });
  if (ai && !ai.ia?.fallback) s = mergeAI(s, ai, texto);
  // Campos declarados como "Rótulo: valor" na descrição valem como estão escritos.
  const rotulo = (re) => texto.match(re)?.[1]?.trim().replace(/[.;,]+$/, '') || null;
  const dono = rotulo(/(?:respons[aá]vel|dono|gerente(?: d[eo])?(?: projeto)?|l[ií]der(?: do projeto)?)\s*:\s*([A-ZÀ-Ú][^\n.;,]{2,60})/i)
    ?? s.entidades.pessoas.find((p) => /respons|dono|gerente|l[ií]der|sponsor/i.test(p.papel ?? ''))?.valor ?? null;
  return {
    sugestao: {
      cliente: s.cliente.valor, titulo: s.titulo.metodo === 'nome do arquivo' ? null : s.titulo.valor, segmento: s.segmento.valor,
      tecnologias: s.tecnologias.map((t) => t.valor), servicos: s.servicos.map((t) => t.valor), prazo_meses: s.prazo_meses.valor,
      // Valor e margem declarados na descrição têm prioridade; só para quem pode ver valores.
      valor: user.verValores ? declaredValue(texto) ?? s.valor.valor : null,
      margem: user.verValores ? declaredMargin(texto) ?? s.margem.valor ?? null : null,
      status_proposta: s.status_proposta.valor,
      objetivo: s.objetivo.valor?.replace(/^\s*objetivos?\s*:\s*/i, '').replace(/^\p{Ll}/u, (c) => c.toUpperCase()) ?? null, descricao: s.resumo.valor,
      confidencialidade: s.confidencialidade.valor, dono,
      area: declaredArea(texto),
      data_referencia: declaredDate(texto),
      link_sharepoint: rotulo(/(https?:\/\/\S+)/i),
    },
    detalhes: s,
    similares: similarProjects(engine, texto, user),
    ia: ai?.ia ?? { provedor: 'mock', fallback: false },
  };
}

// Cliente, segmento, tecnologias e serviços que ainda não existem só podem ser criados pelo gestor (UC07.6).
export function newOptionErrors(repo, d, user) {
  const erros = [];
  if (d.cliente && !repo.clientExists(d.cliente) && !can(user, 'cadastrarCliente')) erros.push(PROIBIDO.cadastrarCliente);
  if (!can(user, 'criarTermo')) {
    const novos = [
      ...(d.segmento && !repo.termExists('segmento', d.segmento) ? [d.segmento] : []),
      ...(d.tecnologias ?? []).filter((t) => !repo.termExists('tecnologia', t)),
      ...(d.servicos ?? []).filter((t) => !repo.termExists('servico', t)),
    ];
    if (novos.length) erros.push(`${PROIBIDO.criarTermo} Novas: ${novos.join(', ')}.`);
  }
  return erros;
}

export function createProject(engine, dados, user, { forcar = false, origem = 'cadastro' } = {}) {
  if (!can(user, 'cadastrarProjeto')) return { erros: [PROIBIDO.cadastrarProjeto], proibido: true };
  const d = cleanProject(dados, user);
  d.confidencialidade ??= 'interna';
  const erros = [...validateProject(d, user), ...newOptionErrors(engine.repo, d, user)];
  if (erros.length) return { erros };
  const duplicatas = engine.repo.similarProjectsByTitle(d.cliente, d.titulo, user);
  if (duplicatas.length && !forcar) return { duplicatas, aviso: 'Já existe projeto parecido para este cliente. Confirme para cadastrar mesmo assim.' };
  const id = engine.repo.tx(() => {
    const novo = engine.repo.insertProject(d, { origem, usuarioId: user.id });
    refreshFicha(engine.repo, novo, user.id);
    return novo;
  });
  return { projeto: engine.repo.project(id) };
}

export function updateProject(engine, id, dados, user) {
  const atual = engine.repo.project(id);
  if (!atual || !user.confidencialidades.includes(atual.confidencialidade)) return { naoEncontrado: true };
  const d = cleanProject(dados, user);
  // Só o que mudou passa pela regra de opções novas: manter um termo antigo do projeto é permitido.
  const mudou = { ...d };
  if (mudou.cliente && mudou.cliente === atual.cliente) delete mudou.cliente;
  if (mudou.segmento === atual.segmento) delete mudou.segmento;
  if (mudou.tecnologias) mudou.tecnologias = mudou.tecnologias.filter((t) => !atual.tecnologias.includes(t));
  if (mudou.servicos) mudou.servicos = mudou.servicos.filter((t) => !atual.servicos.includes(t));
  const erros = [...validateProject({ ...atual, ...d }, user, { parcial: false }), ...newOptionErrors(engine.repo, mudou, user)];
  if (erros.length) return { erros };
  const alteracoes = engine.repo.tx(() => {
    const n = engine.repo.updateProject(id, d, user.id);
    // Documento nunca fica menos restrito que o projeto: ao tornar o projeto confidencial, os documentos acompanham.
    if (d.confidencialidade === 'confidencial' && atual.confidencialidade !== 'confidencial') {
      engine.repo.run("UPDATE documento SET confidencialidade = 'confidencial' WHERE projeto_id = $id", { $id: id });
    }
    if (n) refreshFicha(engine.repo, id, user.id);
    return n;
  });
  return { projeto: engine.repo.project(id), alteracoes };
}

