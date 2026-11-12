// Tela "Insights": indicadores agregados da base para apoiar novas propostas (UC09).
// V0.0.2 (CR-009): refeita como paliativo do "efeito uau" — números grandes no topo, pipeline por status em
// barra empilhada, top 10 de segmentos e tecnologias em barras, projetos por ano, e o que reaproveitar
// (resultados e lições). Só métricas que já existem na base; cada barra tem dica com o número e leva aos projetos.
// Cores: paleta categórica validada (dataviz) em ordem fixa; os gráficos de uma série usam uma cor só.

import { $, $$, esc, brl, api, userId, currentUser, tipoLabel, onTab, onUserChange, openTab } from './common.js';
import { icon } from './icons.js';
import { openProject } from './projetos.js';

export function initInsights() {
  onTab('insights', load);
  onUserChange(() => $('#tab-insights').classList.contains('active') && load());
}

// Ordem do funil comercial; a cor de cada status é fixa (não muda com filtro ou perfil).
const FUNIL = ['Em elaboração', 'Enviada', 'Em negociação', 'Vendida', 'Em execução', 'Entregue', 'Perdida', 'Cancelada'];
const corStatus = (s) => `var(--viz-${FUNIL.indexOf(s) + 1})`;
const num = (n) => Number(n ?? 0).toLocaleString('pt-BR');
const pctTxt = (v) => (v == null ? '—' : `${String(v).replace('.', ',')}%`);

const cartao = (ic, titulo, pergunta, corpo, extra = '') => `<section class="ins-card${extra}">
  <header><h4>${icon(ic, { size: 16 })}${titulo}</h4><p class="muted small">${pergunta}</p></header>${corpo}</section>`;

// Barras horizontais de uma série (top 10). Rótulo à esquerda, número no fim da barra, dica com o detalhe.
function barras(itens, { chave, rotulo, valor, dica, cor = 'var(--viz-1)', link }) {
  if (!itens.length) return '<p class="muted">Sem dados para o seu perfil.</p>';
  const max = Math.max(1, ...itens.map(valor));
  return `<ol class="ins-bars">${itens.map((x, i) => `<li title="${esc(dica(x))}">
    <span class="ins-rank">${i + 1}</span>
    ${link ? `<a href="#" class="ins-lab" data-${link}="${esc(x[chave])}">${esc(rotulo(x))}</a>` : `<span class="ins-lab">${esc(rotulo(x))}</span>`}
    <span class="ins-track"><span class="ins-fill" style="width:${Math.max(4, (valor(x) / max) * 100)}%;background:${cor}"></span></span>
    <b class="ins-val">${num(valor(x))}</b></li>`).join('')}</ol>`;
}

// Funil: uma barra empilhada com todos os projetos, um segmento por status, e a legenda com número e %.
function funil(porStatus) {
  const itens = FUNIL.map((s) => ({ s, n: porStatus.find((x) => x.status === s)?.projetos ?? 0 })).filter((x) => x.n);
  const total = itens.reduce((a, x) => a + x.n, 0);
  if (!total) return '<p class="muted">Sem projetos visíveis para o seu perfil.</p>';
  return `<div class="ins-stack" role="img" aria-label="${esc(itens.map((x) => `${x.s}: ${x.n}`).join(', '))}">${itens.map((x) => `<span style="flex:${x.n};background:${corStatus(x.s)}" title="${esc(`${x.s}: ${x.n} projeto(s), ${Math.round((x.n / total) * 100)}%`)}"></span>`).join('')}</div>
    <ul class="ins-leg">${itens.map((x) => `<li><i style="background:${corStatus(x.s)}"></i><a href="#" data-status="${esc(x.s)}">${esc(x.s)}</a><b>${x.n}</b><em>${Math.round((x.n / total) * 100)}%</em></li>`).join('')}</ul>`;
}

// Colunas por ano (uma série).
function colunas(porAno) {
  if (!porAno.length) return '<p class="muted">Sem datas cadastradas.</p>';
  const max = Math.max(1, ...porAno.map((x) => x.projetos));
  return `<div class="ins-cols">${porAno.map((x) => `<div class="ins-col" title="${esc(`${x.ano}: ${x.projetos} projeto(s)`)}">
    <b>${x.projetos}</b><span class="ins-colbar" style="height:${Math.max(6, (x.projetos / max) * 100)}%"></span><small>${esc(x.ano)}</small></div>`).join('')}</div>`;
}

async function load() {
  const r = await api(`/api/insights?userId=${userId()}`);
  const valores = currentUser()?.verValores;
  const t = r.totais;
  const correcoes = r.correcoes.reduce((s, c) => s + c.correcoes, 0);
  const destaque = (ic, valor, rotulo, detalhe, cor) => `<div class="ins-kpi" style="--kpi:${cor}">${icon(ic, { size: 18 })}<strong>${valor}</strong><span>${rotulo}</span><small class="muted">${detalhe}</small></div>`;
  const topSeg = r.porSegmento.slice(0, 10);
  const lista = (items, fmt) => (items.length ? `<ul class="ins-list">${items.map(fmt).join('')}</ul>` : '<p class="muted">Nada registrado ainda.</p>');

  $('#insights').innerHTML = `<div class="ins-root">
    <div class="ins-kpis">
      ${destaque('folder', num(t.projetos), 'projetos na base', `${num(t.clientes)} clientes · ${num(t.documentos)} documentos`, 'var(--viz-1)')}
      ${destaque('trending', pctTxt(t.taxa_conversao), 'taxa de conversão', `${num(t.ganhos)} ganhos · ${num(t.perdidos)} perdidos`, 'var(--viz-3)')}
      ${destaque('building', num(r.porSegmento.length), 'segmentos atendidos', topSeg[0] ? `mais projetos: ${esc(topSeg[0].segmento)}` : '', 'var(--viz-2)')}
      ${destaque('cpu', num(r.totalTecnologias ?? r.porTecnologia.length), 'tecnologias usadas', r.porTecnologia[0] ? `mais usada: ${esc(r.porTecnologia[0].tecnologia)}` : '', 'var(--viz-7)')}
    </div>
    <div class="ins-grid">
      ${cartao('layers', 'Funil das propostas', 'Em que etapa estão os projetos da base?', funil(r.porStatus ?? []), ' ins-wide')}
      ${cartao('building', 'Top 10 segmentos', 'Onde temos mais experiência? (clique para ver os projetos)', barras(topSeg, {
        chave: 'segmento', rotulo: (x) => x.segmento, valor: (x) => x.projetos, link: 'seg', cor: 'var(--viz-1)',
        dica: (x) => `${x.segmento}: ${x.projetos} projeto(s) · conversão ${pctTxt(x.taxa_conversao)} · prazo médio ${x.prazo_medio ?? '—'} meses${valores && x.valor_medio ? ` · valor médio ${brl(x.valor_medio)}` : ''}`,
      }))}
      ${cartao('cpu', 'Top 10 tecnologias', 'Quais tecnologias mais aparecem nos projetos?', barras(r.porTecnologia.slice(0, 10), {
        chave: 'tecnologia', rotulo: (x) => x.tecnologia, valor: (x) => x.projetos, link: 'tec', cor: 'var(--viz-3)',
        dica: (x) => `${x.tecnologia}: ${x.projetos} projeto(s) · conversão ${pctTxt(x.taxa_conversao)}`,
      }))}
      ${cartao('clock', 'Projetos por ano', 'Como a base se distribui no tempo?', colunas(r.porAno ?? []))}
      ${cartao('grid', 'Tecnologias que andam juntas', 'Pares que aparecem nos mesmos projetos: candidatos a pacote de oferta.', lista(r.coocorrencia, (c) => `<li><span class="chip">${esc(c.tecnologia_a)}</span>${icon('plus', { size: 12 })}<span class="chip">${esc(c.tecnologia_b)}</span><b class="ins-n">${c.projetos} projetos</b></li>`))}
      ${cartao('trending', 'Resultados comprovados', 'O que já entregamos e podemos citar numa proposta.', lista(r.resultados, (x) => `<li>${esc(x.resultado)} <a href="#" data-proj="${x.projeto_id}" class="muted">${esc(x.cliente)}</a></li>`), ' ins-wide')}
      ${cartao('bulb', 'Lições das propostas perdidas', 'O que evitar na próxima.', lista(r.licoesDePerdas, (x) => `<li>${esc(x.licao)} <a href="#" data-proj="${x.projeto_id}" class="muted">${esc(x.cliente)}</a></li>`), ' ins-wide')}
    </div>
    <details class="ins-saude">
      <summary>${icon('shield', { size: 15 })}Saúde da base (curadoria)</summary>
      <div class="ins-grid">
        ${cartao('files', 'Documentos por tipo', 'Quantidade e completude média dos dados extraídos.', `<table class="tbl">${r.documentosPorTipo.map((d) => `<tr><td>${esc(tipoLabel(d.tipo))}</td><td class="num">${d.documentos}</td><td class="num muted" title="Completude média dos metadados">${d.qualidade_media != null ? `${Math.round(d.qualidade_media * 100)}%` : '—'}</td></tr>`).join('')}</table>`)}
        ${cartao('eye', 'Pendências', `${num(r.curadoria.aguardandoRevisao)} envio(s) aguardando revisão · ${num(correcoes)} correção(ões) nas sugestões automáticas.`, `
          <p title="Termos novos aguardando validação">${icon('tag', { size: 15 })}${r.curadoria.termosPendentes.map((x) => `<span class="chip nova">${esc(x.nome)}</span>`).join('') || '<span class="muted">nenhum termo pendente</span>'}</p>
          <p title="Projetos sem proposta final, case ou apresentação">${icon('alert', { size: 15 })}${r.curadoria.projetosSemFonteForte.map((p) => `<a href="#" data-proj="${p.id}">${esc(p.titulo)}</a>`).join(', ') || '<span class="muted">todos com fonte forte</span>'}</p>`)}
      </div>
    </details>
  </div>`;
  const root = $('#insights');
  $$('[data-proj]', root).forEach((a) => (a.onclick = (e) => { e.preventDefault(); openProject(a.dataset.proj); }));
  const drill = (key, value) => { openTab('projetos'); document.dispatchEvent(new CustomEvent('radar:filtrar', { detail: { [key]: [value] } })); };
  $$('[data-seg]', root).forEach((a) => (a.onclick = (e) => { e.preventDefault(); drill('segmentos', a.dataset.seg); }));
  $$('[data-tec]', root).forEach((a) => (a.onclick = (e) => { e.preventDefault(); drill('tecnologias', a.dataset.tec); }));
  $$('[data-status]', root).forEach((a) => (a.onclick = (e) => { e.preventDefault(); drill('status', a.dataset.status); }));
}
