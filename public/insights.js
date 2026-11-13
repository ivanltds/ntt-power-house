// Aba "Insights" (CR-069, opção A + B): duas abas internas.
// - "Visões": as cinco perguntas sobre a base (Negócio, Técnica, Pipeline, Pré-venda, Curadoria), em public/painel.js,
//   cada uma abrindo com manchetes em cartões (número em destaque, tom, gráfico pequeno e link para os números).
// - "Métricas do piloto": uso do Radar, utilidade das respostas e reaproveitamento (antes, tela separada).
// A última aba aberta fica guardada neste navegador. A visão antiga ("Base de projetos") saiu: as visões a substituem.

import { $, $$, esc, api, onTab, onUserChange, openTab, state } from './common.js';
import { icon } from './icons.js';
import { carregarPainel } from './painel.js';

const ABA_KEY = 'radar.insights.aba';
const abaAtual = () => (localStorage.getItem(ABA_KEY) === 'metricas' ? 'metricas' : 'visoes');

function mostrar() {
  const aba = abaAtual();
  $$('[data-ins-aba]').forEach((b) => { const on = b.dataset.insAba === aba; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); });
  $('#painel').hidden = aba !== 'visoes';
  $('#ins-metricas').hidden = aba !== 'metricas';
  return aba === 'metricas' ? carregarMetricas() : carregarPainel();
}

// Abre a aba Insights já numa aba interna (menu "Métricas do piloto" e o endereço antigo /insights-novo).
export function abrirInsights(aba = 'visoes') {
  localStorage.setItem(ABA_KEY, aba);
  openTab('insights');
}

export function initInsights() {
  onTab('insights', mostrar);
  onUserChange(() => $('#tab-insights').classList.contains('active') && mostrar());
  $$('[data-ins-aba]').forEach((b) => (b.onclick = () => { localStorage.setItem(ABA_KEY, b.dataset.insAba); mostrar(); }));
}

// ---------- Métricas do piloto ----------
const SKILL = { buscar: 'Projetos parecidos', listar: 'Listagem', agregar: 'Contagem', ficha: 'Ficha do projeto', comparar: 'Comparação', composta: 'Resposta em etapas', detalhar: 'Detalhe de um resultado', conversa: 'Conversa (saudação, ajuda, não entendi)', ajuda: 'Dúvida de uso', anexo: 'Arquivo da conversa', enviar_arquivo: 'Envio de arquivo', esclarecer: 'Pergunta de volta', fora_dominio: 'Fora do escopo' };
async function carregarMetricas() {
  const m = await api('/api/metricas');
  const tile = (ic, label, value, hint = '') => `<div class="tile" title="${esc(hint)}">${icon(ic, { size: 20 })}<strong>${value}</strong><span>${label}</span></div>`;
  $('#metrics').innerHTML = [
    tile('search', 'buscas', m.buscas, `${m.sessoes} conversas`),
    tile('xCircle', 'sem resultado', m.percentualSemResultado != null ? `${m.percentualSemResultado}%` : '—', `${m.buscasSemResultado} buscas sem resultado`),
    tile('thumbsUp', 'úteis entre os 3 primeiros', m.percentualUtilTop3 != null ? `${m.percentualUtilTop3}%` : '—', `${m.feedbacks} avaliações · ${m.percentualUtil ?? '—'}% úteis no geral`),
    tile('clock', 'até a 1ª referência útil', m.tempoMedioAtePrimeiraReferenciaUtilSeg != null ? `${m.tempoMedioAtePrimeiraReferenciaUtilSeg}s` : '—'),
    tile('duplicate', 'reaproveitamentos', m.reaproveitamentos ?? 0, 'Abrir projeto, copiar escopo ou usar como base a partir de uma resposta'),
    tile('eye', 'fontes abertas', m.aberturasDeFonte, `${m.aberturasDeDetalhe} detalhes abertos`),
    tile('gauge', 'tempo de resposta', m.tempoMedioRespostaMs != null ? `${(m.tempoMedioRespostaMs / 1000).toFixed(1)}s` : '—'),
  ].join('');
  $('#metrics-extra').innerHTML = (m.motivosNaoUtil?.length
    ? `<section class="panel"><h4>${icon('thumbsDown', { size: 17 })}Por que não ajudou</h4><table class="tbl">${m.motivosNaoUtil.map((x) => `<tr><td>${esc(x.valor)}</td><td class="num">${x.n}</td></tr>`).join('')}</table></section>`
    : '')
    + (m.porSkill?.length
      ? `<section class="panel"><h4>${icon('message', { size: 17 })}O que pedem ao chat</h4><table class="tbl"><thead><tr><th>Tipo de pedido</th><th class="num">Perguntas</th><th class="num">Sem resposta</th></tr></thead>${m.porSkill.map((x) => `<tr><td>${esc(SKILL[x.skill] ?? x.skill)}</td><td class="num">${x.n}</td><td class="num">${x.semResposta}</td></tr>`).join('')}</table></section>`
      : '');
  const b = state.ctx?.base;
  if (b) $('#base-info').textContent = `${b.projetos} projetos · ${b.documentos} documentos · ${b.trechos} trechos · ${b.banco}`;
}
