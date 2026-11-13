// Insights por lente (discovery r3: NB-01-discovery-r3-jornada-insights.md).
// Cinco lentes de leitura sobre a mesma base: Negócio, Técnica, Pipeline, Pré-venda e Curadoria.
// Lente não é permissão: tudo é calculado só com o que o usuário pode ver (confidencialidade),
// e valor e margem só entram com verValores. Projetos marcados como teste ficam fora dos números.
// A base é pequena: todo indicador leva o "n" e as manchetes saem de regras, nunca de texto livre de IA.

import { normalize } from './text.js';
import { STATUS_GANHO, STATUS_ANDAMENTO, faixaValor } from './db/repo.js';

export const LENTES = ['negocio', 'tecnica', 'pipeline', 'prevenda', 'curadoria'];
export const AMOSTRA_MINIMA = 3;
const DIAS_PARADA = 7;
const ANOS_ESFRIANDO = 2;

const r1 = (v) => (v == null || !Number.isFinite(v) ? null : Math.round(v * 10) / 10);
const pct = (n, d) => (d ? r1((100 * n) / d) : null);
const soma = (xs) => xs.reduce((a, b) => a + (Number(b) || 0), 0);
const media = (xs) => (xs.length ? soma(xs) / xs.length : null);
const conta = (xs, key) => xs.reduce((m, x) => m.set(key(x), (m.get(key(x)) ?? 0) + 1), new Map());
const jaccard = (a, b) => { const A = new Set(a), B = new Set(b); const i = [...A].filter((x) => B.has(x)).length; const u = new Set([...A, ...B]).size; return u ? i / u : 0; };
const margemPond = (ps) => { const v = ps.filter((p) => p.valor > 0 && p.margem != null); const t = soma(v.map((p) => p.valor)); return t ? r1((100 * soma(v.map((p) => p.valor * p.margem))) / t) : null; };
const ano = (p) => (p.data_referencia ? Number(String(p.data_referencia).slice(0, 4)) : null);
const ganho = (p) => STATUS_GANHO.includes(p.status_proposta);
const perdido = (p) => p.status_proposta === 'Perdida';
const andamento = (p) => STATUS_ANDAMENTO.includes(p.status_proposta);
const temCase = (p) => p.docs.some((d) => d.tipo === 'case_sucesso');
const PALAVRAS_VAZIAS = new Set('a o e de da do das dos em no na nos nas para por com sem um uma que se os as ao foi mais menos entre sobre como'.split(' '));
const ACONTECEU = /atras|estend|precisou|mudaram|caminho cr[ií]tico|retrabalho|custou|\bextras?\b|aument/i;
const termos = (s) => normalize(s).split(' ').filter((t) => t.length > 3 && !PALAVRAS_VAZIAS.has(t));

// Valores em R$ citados num KPI ("R$ 18 milhões", "R$ 9 mi", "R$ 450 mil").
export function reaisCitados(texto) {
  let total = 0;
  for (const m of String(texto).matchAll(/R\$\s*([\d.,]+)\s*(milh(?:ão|ões|oes)|mi\b|mil\b)?/gi)) {
    const n = Number(m[1].replace(/\./g, '').replace(',', '.'));
    if (!Number.isFinite(n)) continue;
    const u = (m[2] ?? '').toLowerCase();
    total += u.startsWith('milh') || u === 'mi' ? n * 1e6 : u === 'mil' ? n * 1e3 : n;
  }
  return total || null;
}

// Heurística para sugerir cadastros de teste ao curador (quem marca é o gestor).
export function pareceTeste(p) {
  const t = String(p.titulo ?? '').trim();
  if (/\b(teste|test|testando|xxx+|asdf|lorem|exemplo|fake|dummy)\b/i.test(t)) return 'Título com cara de teste';
  const letras = t.replace(/[^a-záéíóúâêôãõç]/gi, '');
  const vogais = letras.replace(/[^aeiouáéíóúâêôãõ]/gi, '').length;
  if (letras.length >= 6 && !/\s/.test(t) && vogais / letras.length < 0.25) return 'Título sem palavras (texto aleatório)';
  if (t.length < 4) return 'Título curto demais';
  return null;
}

function carregar(repo, user) {
  const params = {};
  const confIn = user.confidencialidades.map((c, i) => { params[`$c${i}`] = c; return `$c${i}`; }).join(', ');
  const projetos = repo.all(`SELECT p.id, p.titulo, p.cliente_id, c.nome AS cliente, s.nome AS segmento, p.area, p.dono, p.status_proposta, p.confidencialidade,
      p.prazo_meses, p.valor, p.margem, p.data_referencia, p.origem, p.criado_em, p.atualizado_em, p.teste
    FROM projeto p JOIN cliente c ON c.id = p.cliente_id LEFT JOIN segmento s ON s.id = p.segmento_id WHERE p.confidencialidade IN (${confIn})`, params);
  const porId = new Map(projetos.map((p) => [p.id, Object.assign(p, { tecnologias: [], servicos: [], docs: [], kpis: [], licoes: [], riscos: [], relacionados: [] })]));
  for (const r of repo.all('SELECT x.projeto_id, t.nome FROM projeto_tecnologia x JOIN tecnologia t ON t.id = x.tecnologia_id')) porId.get(r.projeto_id)?.tecnologias.push(r.nome);
  for (const r of repo.all('SELECT x.projeto_id, s.nome FROM projeto_servico x JOIN servico s ON s.id = x.servico_id')) porId.get(r.projeto_id)?.servicos.push(r.nome);
  for (const d of repo.all(`SELECT id, projeto_id, tipo_documental AS tipo, revisado_em, nivel_confianca, prazo_meses, valor FROM documento WHERE confidencialidade IN (${confIn})`, params)) {
    porId.get(d.projeto_id)?.docs.push({ id: d.id, tipo: d.tipo, revisado: Boolean(d.revisado_em), confianca: d.nivel_confianca, prazo: d.prazo_meses, valor: d.valor });
  }
  const ents = repo.all(`SELECT e.tipo, e.valor, e.metodo, d.projeto_id, d.tipo_documental AS doc_tipo, d.revisado_em FROM documento_entidade e JOIN documento d ON d.id = e.documento_id
    WHERE e.tipo IN ('kpi', 'licao', 'risco') AND d.confidencialidade IN (${confIn})`, params);
  for (const e of ents) {
    const p = porId.get(e.projeto_id);
    if (!p) continue;
    const item = { texto: e.valor, doc: e.doc_tipo, revisado: Boolean(e.revisado_em), metodo: e.metodo };
    if (e.tipo === 'kpi' && !p.kpis.some((k) => normalize(k.texto) === normalize(e.valor))) p.kpis.push(item);
    if (e.tipo === 'licao' && !p.licoes.some((k) => normalize(k.texto) === normalize(e.valor))) p.licoes.push(item);
    // Riscos: só os declarados como risco na proposta ("Risco: ..."); o resto é ruído da extração.
    if (e.tipo === 'risco' && e.doc_tipo === 'proposta_comercial' && /^risco\s*:/i.test(e.valor)) p.riscos.push({ ...item, texto: e.valor.replace(/^risco\s*:\s*/i, '') });
  }
  for (const r of repo.all('SELECT projeto_id, relacionado_id, similaridade FROM projeto_relacionado')) porId.get(r.projeto_id)?.relacionados.push({ id: r.relacionado_id, sim: r.similaridade });
  return projetos;
}

function aplicarFiltros(ps, { segmento, area, desde } = {}) {
  return ps.filter((p) => (!segmento || p.segmento === segmento) && (!area || p.area === area) && (!desde || (ano(p) ?? 0) >= Number(desde)));
}

// ---------------- Negócio ----------------
function negocio(ps, valores) {
  const grupos = { ganho: ps.filter(ganho), aberto: ps.filter(andamento), perdido: ps.filter(perdido) };
  const carteira = Object.fromEntries(Object.entries(grupos).map(([k, g]) => [k, { n: g.length, valor: valores ? soma(g.map((p) => p.valor)) : null, ids: g.map((p) => p.id) }]));

  const segs = [...new Set(ps.map((p) => p.segmento).filter(Boolean))];
  const porSegmento = segs.map((s) => {
    const g = ps.filter((p) => p.segmento === s);
    const ganhos = g.filter(ganho).length, perdidos = g.filter(perdido).length;
    const entregues = g.filter((p) => p.status_proposta === 'Entregue');
    return {
      segmento: s, n: g.length, ganhos, perdidos, decididos: ganhos + perdidos, taxa: pct(ganhos, ganhos + perdidos),
      provas: entregues.filter(temCase).length, entregues: entregues.length,
      valorGanho: valores ? soma(g.filter(ganho).map((p) => p.valor)) : null,
      margem: valores ? margemPond(g.filter((p) => !andamento(p))) : null,
    };
  }).sort((a, b) => (b.valorGanho ?? b.ganhos) - (a.valorGanho ?? a.ganhos) || b.n - a.n);

  const decididos = ps.filter((p) => !andamento(p) && p.status_proposta !== 'Cancelada');
  const faixas = [['até 4 meses', (m) => m <= 4], ['5 a 6 meses', (m) => m > 4 && m <= 6], ['7 meses ou mais', (m) => m > 6]];
  const margemPorDuracao = valores ? faixas.map(([rotulo, f]) => { const g = decididos.filter((p) => p.prazo_meses != null && f(p.prazo_meses)); return { faixa: rotulo, n: g.length, margem: margemPond(g) }; }) : null;

  const totalGanho = carteira.ganho.valor;
  const porCliente = [...conta(grupos.ganho, (p) => p.cliente).keys()].map((c) => ({ cliente: c, valor: soma(grupos.ganho.filter((p) => p.cliente === c).map((p) => p.valor)) })).sort((a, b) => b.valor - a.valor);
  const concentracao = valores && totalGanho ? { top3: r1((100 * soma(porCliente.slice(0, 3).map((c) => c.valor))) / totalGanho), clientes: porCliente.length, maiorSegmento: porSegmento[0] ? { segmento: porSegmento[0].segmento, pct: r1((100 * porSegmento[0].valorGanho) / totalGanho) } : null } : null;

  // Pacotes: pares de serviços vendidos juntos (I7).
  const pares = new Map();
  for (const p of ps.filter((x) => !andamento(x))) {
    const s = [...new Set(p.servicos)].sort();
    for (let i = 0; i < s.length; i++) for (let j = i + 1; j < s.length; j++) {
      const k = `${s[i]}|${s[j]}`;
      const e = pares.get(k) ?? { servicos: [s[i], s[j]], n: 0, ganhos: 0, valores: [] };
      e.n += 1; if (ganho(p)) e.ganhos += 1; if (p.valor > 0) e.valores.push(p.valor);
      pares.set(k, e);
    }
  }
  const pacotes = [...pares.values()].filter((e) => e.n >= 2).sort((a, b) => b.n - a.n).slice(0, 6)
    .map(({ valores: vs, ...e }) => ({ ...e, valorMedio: valores && vs.length ? Math.round(media(vs)) : null }));

  // Quadrante "ganhamos onde sabemos entregar?": prova (entregas com case) × taxa de ganho.
  const quadrante = porSegmento.filter((s) => s.decididos > 0).map((s) => ({
    segmento: s.segmento, prova: s.provas, taxa: s.taxa, n: s.decididos,
    zona: s.provas > 0 ? (s.taxa >= 50 ? 'nucleo' : 'conversao') : (s.taxa >= 50 ? 'risco' : 'aposta'),
  }));

  const resultados = ps.filter((p) => p.kpis.length && p.docs.some((d) => d.tipo === 'case_sucesso')).flatMap((p) => p.kpis.filter((k) => k.doc === 'case_sucesso').map((k) => ({
    projeto: p.id, cliente: p.cliente, segmento: p.segmento, texto: k.texto, reais: reaisCitados(k.texto), selo: k.revisado ? 'IA · revisado' : 'IA · sugerido',
  })));
  const comReais = ps.filter((p) => p.kpis.some((k) => reaisCitados(k.texto)));
  const impacto = comReais.length ? {
    projetos: comReais.map((p) => p.id),
    reais: soma(comReais.map((p) => Math.max(...p.kpis.map((k) => reaisCitados(k.texto) ?? 0)))),
    contratos: valores ? soma(comReais.map((p) => p.valor)) : null,
  } : null;
  if (impacto?.contratos) impacto.multiplo = r1(impacto.reais / impacto.contratos);

  return { carteira, porSegmento, margemPorDuracao, concentracao, pacotes, quadrante, resultados, impacto };
}

// ---------------- Técnica ----------------
function tecnica(ps, valores, anoAtual) {
  const entregues = ps.filter((p) => p.status_proposta === 'Entregue');
  const techsEnt = [...conta(entregues.flatMap((p) => p.tecnologias), (t) => t)].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([t]) => t);
  const segsEnt = [...new Set(entregues.map((p) => p.segmento).filter(Boolean))].sort();
  const matriz = { linhas: techsEnt, colunas: segsEnt, n: entregues.length,
    celulas: techsEnt.map((t) => segsEnt.map((s) => entregues.filter((p) => p.segmento === s && p.tecnologias.includes(t)).map((p) => p.id))) };

  const comAno = ps.filter((p) => ano(p) && !andamento(p));
  const anos = [...new Set(comAno.map(ano))].sort();
  const topTec = [...conta(comAno.flatMap((p) => p.tecnologias), (t) => t)].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([t]) => t);
  const tendencia = { linhas: topTec, colunas: anos, celulas: topTec.map((t) => anos.map((a) => comAno.filter((p) => ano(p) === a && p.tecnologias.includes(t)).map((p) => p.id))) };

  const ultimo = (lista) => { const m = new Map(); for (const p of comAno) for (const t of lista(p)) { const e = m.get(t) ?? { ultimo: 0, n: 0 }; e.ultimo = Math.max(e.ultimo, ano(p)); e.n += 1; m.set(t, e); } return m; };
  const esfriando = [...[...ultimo((p) => p.tecnologias)].map(([nome, e]) => ({ tipo: 'tecnologia', nome, ...e })), ...[...ultimo((p) => p.servicos)].map(([nome, e]) => ({ tipo: 'serviço', nome, ...e }))]
    .filter((e) => e.ultimo <= anoAtual - ANOS_ESFRIANDO).sort((a, b) => a.ultimo - b.ultimo || a.nome.localeCompare(b.nome));

  // Estimativa preliminar × proposta do mesmo projeto (T3).
  const pares = ps.map((p) => ({ p, e: p.docs.find((d) => d.tipo === 'estimativa_preliminar'), pr: p.docs.find((d) => d.tipo === 'proposta_comercial') })).filter((x) => x.e && x.pr);
  const dv = pares.filter((x) => x.e.valor > 0 && x.pr.valor > 0).map((x) => (x.pr.valor / x.e.valor - 1) * 100);
  const estimativa = { n: pares.length,
    variacaoValor: valores && dv.length ? { media: r1(media(dv)), min: r1(Math.min(...dv)), max: r1(Math.max(...dv)) } : null,
    prazoCresceu: pares.filter((x) => x.e.prazo && x.pr.prazo && x.pr.prazo > x.e.prazo).map((x) => ({ projeto: x.p.id, de: x.e.prazo, para: x.pr.prazo })) };

  const plataforma = valores ? [...new Set(ps.flatMap((p) => p.tecnologias))].map((t) => { const g = ps.filter((p) => !andamento(p) && p.tecnologias.includes(t)); return { tecnologia: t, n: g.length, margem: margemPond(g) }; })
    .filter((x) => x.n >= 2 && x.margem != null).sort((a, b) => b.margem - a.margem) : null;

  const donos = [...new Set(ps.map((p) => p.dono).filter(Boolean))];
  const especialistas = donos.map((d) => { const g = ps.filter((p) => p.dono === d); return { dono: d, n: g.length, entregues: g.filter((p) => p.status_proposta === 'Entregue').length, areas: [...new Set(g.map((p) => p.area).filter(Boolean))], segmentos: [...new Set(g.map((p) => p.segmento).filter(Boolean))] }; })
    .sort((a, b) => b.entregues - a.entregues || b.n - a.n);
  const pontoUnico = [...new Set(ps.map((p) => p.area).filter(Boolean))].map((a) => ({ area: a, donos: [...new Set(ps.filter((p) => p.area === a).map((p) => p.dono).filter(Boolean))] })).filter((x) => x.donos.length === 1);

  // Riscos previstos na proposta que aparecem nas lições do mesmo projeto (I9): 2+ termos em comum.
  const riscosQueAconteceram = ps.flatMap((p) => p.riscos.flatMap((r) => {
    const tr = new Set(termos(r.texto));
    // Só conta se a lição relata um efeito negativo (atraso, extensão, mudança, retrabalho).
    const l = p.licoes.find((x) => ACONTECEU.test(x.texto) && termos(x.texto).filter((t) => tr.has(t)).length >= 2);
    return l ? [{ projeto: p.id, cliente: p.cliente, risco: r.texto, licao: l.texto }] : [];
  }));
  const LEGADO = /legad|saneament|sem documenta|cadastro|integra[cç][aã]o com/i;
  const licoes = ps.flatMap((p) => p.licoes.map((l) => ({ projeto: p.id, cliente: p.cliente, texto: l.texto, legado: LEGADO.test(l.texto), selo: l.revisado ? 'IA · revisado' : 'IA · sugerido' })));

  return { matriz, tendencia, esfriando, estimativa, plataforma, especialistas, pontoUnico, riscosQueAconteceram, licoes };
}

// ---------------- Pipeline ----------------
function pipeline(ps, valores, hoje) {
  const ordem = ['Em elaboração', 'Enviada', 'Em negociação', 'Vendida', 'Em execução', 'Entregue', 'Perdida', 'Cancelada'];
  const funil = ordem.map((s) => { const g = ps.filter((p) => p.status_proposta === s); return { status: s, n: g.length, valor: valores ? soma(g.map((p) => p.valor)) : null }; }).filter((x) => x.n);
  const hist = ps.filter((p) => ganho(p) && p.margem != null).map((p) => p.margem);
  const faixaMargem = hist.length >= AMOSTRA_MINIMA ? { min: Math.min(...hist), max: Math.max(...hist) } : null;
  const porId = new Map(ps.map((p) => [p.id, p]));
  const alertas = [];
  for (const p of ps.filter(andamento)) {
    const base = { projeto: p.id, titulo: p.titulo, cliente: p.cliente, status: p.status_proposta, dono: p.dono };
    if (valores && faixaMargem && p.margem != null && (p.margem < faixaMargem.min - 0.03 || p.margem > faixaMargem.max + 0.03)) {
      alertas.push({ ...base, tipo: 'fora_da_curva', nivel: 'alto', texto: `Margem de ${Math.round(p.margem * 100)}%; os projetos ganhos vão de ${Math.round(faixaMargem.min * 100)}% a ${Math.round(faixaMargem.max * 100)}%.` });
    }
    const dias = Math.floor((hoje - new Date(p.atualizado_em)) / 86_400_000);
    if (dias >= DIAS_PARADA) alertas.push({ ...base, tipo: 'parada', nivel: 'medio', dias, texto: `Sem alteração há ${dias} dias.` });
    const faltando = [['valor', p.valor], ['margem', p.margem], ['prazo', p.prazo_meses], ['dono', p.dono], ['data de referência', p.data_referencia], ['segmento', p.segmento]].filter(([, v]) => v == null || v === '').map(([k]) => k);
    if (faltando.length) alertas.push({ ...base, tipo: 'incompleta', nivel: faltando.length >= 3 ? 'medio' : 'baixo', faltando, texto: `Falta ${faltando.join(', ')}.` });
    const perdida = p.relacionados.filter((r) => r.sim >= 0.5).map((r) => porId.get(r.id)).find((x) => x && perdido(x));
    if (perdida) alertas.push({ ...base, tipo: 'parecida_com_perdida', nivel: 'medio', referencia: perdida.id, texto: `Parecida com ${perdida.id} (${perdida.cliente}), perdida.${perdida.licoes[0] ? ` Lição: ${perdida.licoes[0].texto}` : ''}` });
  }
  const peso = { alto: 0, medio: 1, baixo: 2 };
  alertas.sort((a, b) => peso[a.nivel] - peso[b.nivel] || a.projeto.localeCompare(b.projeto));
  const licoesDePerdas = ps.filter(perdido).flatMap((p) => p.licoes.concat(p.kpis.filter((k) => /perdid|concorrente/i.test(k.texto))).map((l) => ({ projeto: p.id, cliente: p.cliente, segmento: p.segmento, texto: l.texto })));
  return { funil, faixaMargem: valores ? faixaMargem : null, alertas, licoesDePerdas };
}

// ---------------- Pré-venda ----------------
export function prontidao(op, ps) {
  const sim = ps.filter((p) => !p.teste).map((p) => ({ p, score: (p.segmento === op.segmento ? 0.4 : 0) + 0.35 * jaccard(op.servicos ?? [], p.servicos) + 0.25 * jaccard(op.tecnologias ?? [], p.tecnologias) }))
    .filter((x) => x.score >= 0.25).sort((a, b) => b.score - a.score).slice(0, 5);
  const ps2 = sim.map((x) => x.p);
  const entregues = ps2.filter((p) => p.status_proposta === 'Entregue');
  const comCase = entregues.filter(temCase);
  const noSegmento = ps.filter((p) => p.segmento === op.segmento && p.status_proposta === 'Entregue').length;
  const nivel = comCase.length >= 2 && noSegmento ? 'forte' : comCase.length >= 1 || ps2.some(ganho) ? 'parcial' : 'fraca';
  const prazos = ps2.map((p) => p.prazo_meses).filter(Boolean);
  const valoresP = ps2.map((p) => p.valor).filter((v) => v > 0);
  return {
    oportunidade: { id: op.id, cliente: op.cliente, titulo: op.titulo, segmento: op.segmento, servicos: op.servicos, tecnologias: op.tecnologias },
    nivel, entreguesNoSegmento: noSegmento,
    similares: sim.map(({ p, score }) => ({ id: p.id, titulo: p.titulo, cliente: p.cliente, segmento: p.segmento, status: p.status_proposta, score: Math.round(score * 100), case: temCase(p), kpi: p.kpis[0]?.texto ?? null })),
    entregues: entregues.length, comCase: comCase.length, comKpi: ps2.filter((p) => p.kpis.length).length,
    perdidas: ps2.filter(perdido).map((p) => ({ id: p.id, cliente: p.cliente, licao: p.licoes[0]?.texto ?? null })),
    kit: [...new Set(ps2.flatMap((p) => p.docs.map((d) => d.tipo)))],
    especialistas: [...new Set(ps2.map((p) => p.dono).filter(Boolean))],
    prazo: prazos.length ? { min: Math.min(...prazos), max: Math.max(...prazos) } : null,
    faixaValor: valoresP.length ? [faixaValor(Math.min(...valoresP))?.sigla, faixaValor(Math.max(...valoresP))?.sigla] : null,
  };
}

// ---------------- Curadoria ----------------
function curadoria(todos, repo, areasPadrao) {
  const vivos = todos.filter((p) => !p.teste);
  const testes = todos.filter((p) => p.teste).map((p) => ({ id: p.id, titulo: p.titulo, cliente: p.cliente }));
  const suspeitos = vivos.map((p) => ({ p, motivo: pareceTeste(p) })).filter((x) => x.motivo).map(({ p, motivo }) => ({ id: p.id, titulo: p.titulo, cliente: p.cliente, origem: p.origem, motivo }));
  const idsSuspeitos = new Set([...testes.map((t) => t.id), ...suspeitos.map((s) => s.id)]);
  const termosSuspeitos = [];
  for (const [campo, chave] of [['tecnologia', 'tecnologias'], ['serviço', 'servicos']]) {
    for (const nome of new Set(todos.flatMap((p) => p[chave]))) {
      const usos = todos.filter((p) => p[chave].includes(nome));
      if (usos.every((p) => idsSuspeitos.has(p.id))) termosSuspeitos.push({ tipo: campo, nome, motivo: 'Usado só em cadastros de teste', projetos: usos.map((p) => p.id) });
    }
  }
  for (const t of repo.all("SELECT 'tecnologia' AS tipo, nome FROM tecnologia WHERE status = 'pendente_curadoria' UNION ALL SELECT 'serviço', nome FROM servico WHERE status = 'pendente_curadoria'")) {
    if (!termosSuspeitos.some((x) => x.nome === t.nome)) termosSuspeitos.push({ ...t, motivo: 'Termo novo aguardando curadoria', projetos: [] });
  }
  const areasFora = [...conta(vivos.filter((p) => p.area && !areasPadrao.includes(p.area)), (p) => p.area)].map(([area, n]) => ({ area, n }));
  const CAMPOS = ['segmento', 'area', 'dono', 'prazo_meses', 'valor', 'margem', 'data_referencia'];
  const incompletos = vivos.map((p) => ({ id: p.id, titulo: p.titulo, faltando: CAMPOS.filter((c) => p[c] == null || p[c] === '') })).filter((x) => x.faltando.length);
  const docs = vivos.flatMap((p) => p.docs);
  const semRevisao = [...conta(docs.filter((d) => !d.revisado), (d) => d.tipo)].map(([tipo, n]) => ({ tipo, n })).sort((a, b) => b.n - a.n);
  const correcoes = repo.all('SELECT campo, count(*) AS n FROM correcao_metadado GROUP BY campo ORDER BY n DESC');
  const completude = vivos.length ? r1(100 - (100 * soma(incompletos.map((x) => x.faltando.length))) / (vivos.length * CAMPOS.length)) : null;
  return {
    saude: { completude, documentos: docs.length, revisados: docs.filter((d) => d.revisado).length, pctRevisados: pct(docs.filter((d) => d.revisado).length, docs.length), testesOcultos: testes.length, aguardandoRevisao: repo.get("SELECT count(*) AS n FROM processamento WHERE status = 'aguardando_revisao'").n },
    testes, suspeitos, termosSuspeitos, areasPadrao, areasFora, incompletos, semRevisao, correcoes,
  };
}

// ---------------- Uso do Radar e demanda (transversal) ----------------
function uso(turnos, eventos, ps) {
  const ev = (t) => eventos.filter((e) => e.tipo === t).length;
  const funil = [['Perguntas', turnos.length], ['Projetos abertos', ev('abrir_detalhe')], ['Usados como base', ev('reaproveitar')], ['Propostas exportadas', ev('exportar')]].map(([etapa, n]) => ({ etapa, n }));
  const procurados = [...conta(turnos.flatMap((t) => t.entidades?.servicos ?? []), (s) => s)].map(([servico, citacoes]) => ({ servico, citacoes, projetos: ps.filter((p) => p.servicos.includes(servico)).length, ganhos: ps.filter((p) => ganho(p) && p.servicos.includes(servico)).length }))
    .sort((a, b) => b.citacoes / (b.ganhos + 1) - a.citacoes / (a.ganhos + 1)).slice(0, 6);
  const reuso = [...conta(eventos.filter((e) => e.tipo === 'reaproveitar' && e.projeto_id), (e) => e.projeto_id)].map(([id, n]) => ({ id, n, titulo: ps.find((p) => p.id === id)?.titulo ?? null })).filter((x) => x.titulo).sort((a, b) => b.n - a.n).slice(0, 5);
  const semResposta = turnos.filter((t) => t.semEvidencia).length;
  // Adendo 6: uso por skill (o que as pessoas pedem e onde o Radar fica sem resposta). Turnos antigos usam a intenção.
  const porSkill = [...conta(turnos, (t) => t.skill ?? t.intencao ?? 'buscar')].map(([skill, n]) => ({
    skill, n, semResposta: turnos.filter((t) => (t.skill ?? t.intencao ?? 'buscar') === skill && t.semEvidencia).length,
  })).sort((a, b) => b.n - a.n);
  return { funil, procurados, reuso, perguntas: turnos.length, semResposta, porSkill };
}

// ---------------- Manchetes (regras sobre os números) ----------------
const pl = (n, um, varios) => `${n} ${n === 1 ? um : varios}`;
const br = (v) => Number(v).toLocaleString('pt-BR', { maximumFractionDigits: 1 });
const fmtMi = (v) => `R$ ${(v / 1e6).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mi`;
function manchetes(l, valores) {
  const out = { negocio: [], tecnica: [], pipeline: [], prevenda: [], curadoria: [] };
  const n = l.negocio;
  if (valores && n.carteira.ganho.valor) out.negocio.push({ texto: `Carteira ganha de ${fmtMi(n.carteira.ganho.valor)} em ${n.carteira.ganho.n} projetos; ${fmtMi(n.carteira.aberto.valor)} em aberto.`, card: 'carteira' });
  else out.negocio.push({ texto: `${pl(n.carteira.ganho.n, "projeto ganho", "projetos ganhos")}, ${n.carteira.aberto.n} em aberto e ${pl(n.carteira.perdido.n, "perdido", "perdidos")}.`, card: 'carteira' });
  if (n.concentracao?.maiorSegmento) out.negocio.push({ texto: `${n.concentracao.maiorSegmento.segmento} concentra ${br(n.concentracao.maiorSegmento.pct)}% da carteira ganha.`, card: 'segmentos', filtro: { segmentos: [n.concentracao.maiorSegmento.segmento] } });
  const md = n.margemPorDuracao?.filter((x) => x.margem != null && x.n);
  if (md?.length >= 2) { const lo = md[0], hi = md.at(-1); const d = r1(hi.margem - lo.margem); if (Math.abs(d) >= 3) out.negocio.push({ texto: `Projetos de ${hi.faixa} têm margem ${br(Math.abs(d))} p.p. ${d > 0 ? 'acima' : 'abaixo'} dos de ${lo.faixa} (n = ${lo.n} e ${hi.n}).`, card: 'duracao' }); }
  const fraca = l.prevenda.find((p) => p.nivel === 'fraca') ?? l.prevenda.find((p) => !p.entreguesNoSegmento);
  if (fraca) out.negocio.push({ texto: `Oportunidade ${fraca.oportunidade.id} (${fraca.oportunidade.segmento}) sem entrega no segmento para usar como prova.`, card: 'prevenda', lente: 'prevenda' });

  const t = l.tecnica;
  const leg = t.licoes.filter((x) => x.legado).length;
  if (leg) out.tecnica.push({ texto: `${leg} de ${t.licoes.length} lições citam atraso ou retrabalho por sistema, cadastro ou dado legado.`, card: 'licoes' });
  if (t.riscosQueAconteceram.length) out.tecnica.push({ texto: `${t.riscosQueAconteceram.length} risco(s) previsto(s) na proposta aconteceram de fato (ex.: ${t.riscosQueAconteceram[0].projeto}).`, card: 'riscos' });
  const tec = t.esfriando.filter((e) => e.tipo === 'tecnologia');
  if (tec.length) out.tecnica.push({ texto: `${tec.slice(0, 4).map((e) => e.nome).join(', ')} sem projeto desde ${Math.max(...tec.slice(0, 4).map((e) => e.ultimo))}.`, card: 'esfriando' });
  if (t.estimativa.variacaoValor) out.tecnica.push({ texto: `A proposta sai em média ${br(t.estimativa.variacaoValor.media)}% acima da estimativa preliminar (n = ${t.estimativa.n}).`, card: 'estimativa' });
  else if (t.estimativa.prazoCresceu.length) out.tecnica.push({ texto: `O prazo cresceu entre estimativa e proposta em ${t.estimativa.prazoCresceu.length} de ${t.estimativa.n} projetos.`, card: 'estimativa' });

  const a = l.pipeline.alertas;
  const conta2 = (tipo) => a.filter((x) => x.tipo === tipo).length;
  if (conta2('fora_da_curva')) out.pipeline.push({ texto: `${conta2('fora_da_curva')} proposta(s) com margem fora da faixa dos projetos ganhos.`, card: 'alertas' });
  if (conta2('parada')) out.pipeline.push({ texto: `${conta2('parada')} proposta(s) sem alteração há ${DIAS_PARADA} dias ou mais.`, card: 'alertas' });
  if (conta2('incompleta')) out.pipeline.push({ texto: `${conta2('incompleta')} proposta(s) em andamento com cadastro incompleto.`, card: 'alertas' });
  if (conta2('parecida_com_perdida')) out.pipeline.push({ texto: `${conta2('parecida_com_perdida')} proposta(s) parecida(s) com uma perdida.`, card: 'alertas' });
  if (!a.length) out.pipeline.push({ texto: 'Nenhum alerta no pipeline.', card: 'alertas' });

  for (const p of l.prevenda) out.prevenda.push({ texto: `${p.oportunidade.id} · ${p.oportunidade.cliente}: prontidão ${p.nivel} (${p.entregues} entregue(s) parecido(s), ${p.comCase} com case${p.perdidas.length ? `, ${p.perdidas.length} perdida(s) parecida(s)` : ''}).`, card: 'prontidao', oportunidade: p.oportunidade.id });

  const c = l.curadoria;
  out.curadoria.push({ texto: `${c.saude.documentos - c.saude.revisados} de ${c.saude.documentos} documentos sem revisão humana.`, card: 'revisao' });
  if (c.suspeitos.length) out.curadoria.push({ texto: `${c.suspeitos.length} cadastro(s) parecem teste e ainda entram nos números.`, card: 'testes' });
  if (c.termosSuspeitos.length) out.curadoria.push({ texto: `${c.termosSuspeitos.length} termo(s) suspeito(s) na taxonomia.`, card: 'termos' });
  if (c.areasFora.length) out.curadoria.push({ texto: `${c.areasFora.length} área(s) fora da lista padrão.`, card: 'areas' });
  for (const k of Object.keys(out)) out[k] = out[k].slice(0, 4);
  return out;
}

// Ponto de entrada: todas as lentes de uma vez (a base é pequena e as lentes se citam).
export function montarPainel(repo, user, { oportunidades = [], turnos = [], eventos = [], filtros = {}, hoje = new Date() } = {}) {
  const valores = Boolean(user.verValores);
  const todos = carregar(repo, user);
  const vivos = todos.filter((p) => !p.teste);
  const ps = aplicarFiltros(vivos, filtros);
  const areasPadrao = [...new Set(todos.filter((p) => p.origem === 'seed' && p.area).map((p) => p.area))].sort();
  const anoAtual = hoje.getFullYear();
  const l = {
    negocio: negocio(ps, valores),
    tecnica: tecnica(ps, valores, anoAtual),
    pipeline: pipeline(ps, valores, hoje),
    prevenda: oportunidades.map((op) => prontidao(op, vivos)),
    curadoria: curadoria(todos, repo, areasPadrao),
  };
  return {
    geradoEm: hoje.toISOString(),
    valores,
    amostraMinima: AMOSTRA_MINIMA,
    base: { projetos: ps.length, visiveis: vivos.length, testesOcultos: todos.length - vivos.length },
    opcoes: { segmentos: [...new Set(vivos.map((p) => p.segmento).filter(Boolean))].sort(), areas: areasPadrao, anos: [...new Set(vivos.map(ano).filter(Boolean))].sort() },
    filtros,
    manchetes: manchetes(l, valores),
    lentes: l,
    uso: uso(turnos, eventos, vivos),
  };
}

// Resumo para agentes de relatório (endpoint com chave): manchetes por lente e números-chave, sem listas de projetos.
export function resumoExecutivo(painel) {
  const n = painel.lentes.negocio, t = painel.lentes.tecnica, c = painel.lentes.curadoria;
  return {
    geradoEm: painel.geradoEm,
    incluiValores: painel.valores,
    base: painel.base,
    manchetes: painel.manchetes,
    numeros: {
      carteira: Object.fromEntries(Object.entries(n.carteira).map(([k, v]) => [k, { n: v.n, valor: v.valor }])),
      taxaPorSegmento: n.porSegmento.map(({ segmento, ganhos, perdidos, taxa, n: total }) => ({ segmento, n: total, ganhos, perdidos, taxa })),
      alertasPipeline: conta(painel.lentes.pipeline.alertas, (a) => a.tipo).size ? Object.fromEntries(conta(painel.lentes.pipeline.alertas, (a) => a.tipo)) : {},
      prontidao: painel.lentes.prevenda.map((p) => ({ oportunidade: p.oportunidade.id, segmento: p.oportunidade.segmento, nivel: p.nivel })),
      capacidadesEsfriando: t.esfriando.map(({ tipo, nome, ultimo }) => ({ tipo, nome, ultimo })),
      saudeDaBase: c.saude,
      usoDoRadar: painel.uso.funil,
    },
  };
}
