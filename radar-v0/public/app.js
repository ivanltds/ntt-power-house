import { $, $$, esc, md, pct, brl, api, state, userId, currentUser, tipoLabel, openTab, openDoc, onTab, notifyUserChange, trustBadge, matchLabel, copyText, toast, pode } from './common.js';
import { icon, hydrateIcons } from './icons.js';
import { initProjects, openProject, openProjectForm } from './projetos.js';
import { initUploads } from './upload.js';
import { initInsights } from './insights.js';
import { showGuide, showTech } from './ajuda.js';
import { showSdlc } from './sdlc.js';
import { VERSAO, showReleaseNotes } from './versao.js';
import { initActivities } from './atividades.js';
import { welcomeOnFirstVisit, showPolicy } from './aviso.js';
import { renderTyped, bindTyped, typeTag, citeNames } from './respostas.js';

// Sugestões por tipo de pedido (adendo 5, opção E): parecidos, listagem, contagem, ficha e comparação.
const SUGESTOES = {
  consultor: ['Já fizemos fraude em seguros?', 'Quais segmentos já atendemos?', 'Liste os projetos entregues em 2025', 'Compare o P001 com o P002'],
  gestor: ['Propostas perdidas e o que aprendemos', 'Quantos projetos por status?', 'Qual o prazo, o valor e a margem do P001?', 'Liste os projetos de varejo e compare os dois'],
};
const INTRO = [
  ['message', 'Pergunte', 'Descreva a proposta que você está montando. O Radar mostra projetos parecidos e de onde veio cada informação.'],
  ['briefcase', 'Dê contexto', 'Em “Responder para…”, no topo, escolha o projeto que você está montando e as respostas passam a considerar aquele cliente.'],
  ['folder', 'Explore', 'Em Projetos, filtre por segmento, tecnologia ou status e abra os documentos originais.'],
  ['upload', 'Alimente', 'Envie propostas, atas e cases. O Radar extrai os dados e você só confere.'],
];
const MOTIVOS = ['Não é parecido', 'Informação errada', 'Desatualizado', 'Outro'];
const INTRO_KEY = 'radar.intro.visto';

async function init() {
  hydrateIcons();
  state.ctx = await api('/api/contexto');
  const reloadContext = async () => { state.ctx = { ...state.ctx, ...(await api(`/api/contexto?userId=${userId()}`)) }; };
  $('#user').innerHTML = state.ctx.usuarios.map((u) => `<option value="${u.id}">${esc(u.perfil.charAt(0).toUpperCase() + u.perfil.slice(1))}</option>`).join('');
  $('#user').onchange = async () => { await reloadContext(); setFocus(null); newConversation(); loadDocs(); loadConversations(); notifyUserChange(); };
  setupFocus();
  setupTheme();
  // A IA só aparece no topo quando está fora do ar: ligada é o normal.
  const ia = state.ctx.base.llmProvedor === 'deepseek';
  if (!ia) {
    $('#ia-badge').innerHTML = `${icon('alert', { size: 14 })}IA offline`;
    $('#ia-badge').title = 'Sem IA: as respostas usam só regras e busca por palavras.';
    $('#ia-badge').classList.remove('hidden');
  }
  $$('.tabs button').forEach((b) => (b.onclick = () => openTab(b.dataset.tab)));
  $('#ask').onsubmit = onAsk;
  $('#filter').oninput = renderDocs;
  setupMenu();
  setupViews();
  setupConversations();
  onTab('metricas', loadMetrics);
  initProjects();
  initUploads();
  initInsights();
  initActivities();
  newConversation();
  loadConversations();
  // Links "Política de dados" em qualquer tela.
  document.addEventListener('click', (e) => { const a = e.target.closest('[data-politica-link]'); if (a) { e.preventDefault(); showPolicy(); } });
  welcomeOnFirstVisit().catch(() => {});
}

// ---- Menu "Mais opções": perfil de demonstração, documentos, métricas e ajuda ----
// Tema: Auto (sistema), Claro ou Escuro; tema.js aplica e guarda a escolha.
function setupTheme() {
  const paint = () => $$('[data-tema]').forEach((b) => { const on = b.dataset.tema === window.radarTema.get(); b.classList.toggle('on', on); b.setAttribute('aria-checked', on); });
  $$('[data-tema]').forEach((b) => (b.onclick = (e) => { e.stopPropagation(); window.radarTema.set(b.dataset.tema); }));
  document.addEventListener('radar:tema', paint);
  paint();
}

function setupMenu() {
  const btn = $('#menu-btn');
  const pop = $('#menu');
  const toggle = (open = pop.classList.contains('hidden')) => { pop.classList.toggle('hidden', !open); btn.setAttribute('aria-expanded', open); };
  btn.onclick = (e) => { e.stopPropagation(); toggle(); };
  const v = $('#versao');
  v.textContent = VERSAO;
  v.onclick = () => showReleaseNotes();
  document.addEventListener('click', (e) => { if (!e.target.closest('.menu')) toggle(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') toggle(false); });
  $$('[data-menu]', pop).forEach((b) => (b.onclick = () => {
    toggle(false);
    if (b.dataset.menu === 'docs') { openTab('projetos'); showView('docs'); }
    if (b.dataset.menu === 'metricas') openTab('metricas');
    if (b.dataset.menu === 'atividades') openTab('atividades');
    if (b.dataset.menu === 'sobre') showGuide();
    if (b.dataset.menu === 'tecnico') showTech();
    if (b.dataset.menu === 'sdlc') showSdlc();
    if (b.dataset.menu === 'politica') showPolicy();
    if (b.dataset.menu === 'notas') showReleaseNotes();
    if (b.dataset.menu === 'sair') fetch('/api/logout', { method: 'POST' }).then(() => location.replace('/login'));
  }));
  // 'Sair' só faz sentido quando o servidor exige login.
  api('/api/sessao').then((s) => $('[data-menu=sair]', pop).classList.toggle('hidden', !s.login)).catch(() => {});
}

const introSteps = () => `<ol class="intro">${INTRO.map(([ic, t, d]) => `<li>${icon(ic, { size: 18 })}<div><b>${t}</b><span>${d}</span></div></li>`).join('')}</ol>`;

// ---- Projetos | Documentos na mesma aba ----
function setupViews() {
  $$('.segmented [data-view]').forEach((b) => (b.onclick = () => showView(b.dataset.view)));
}

function showView(name) {
  $$('.segmented [data-view]').forEach((b) => { b.classList.toggle('on', b.dataset.view === name); b.setAttribute('aria-selected', b.dataset.view === name); });
  $('#proj-view').classList.toggle('hidden', name !== 'projetos');
  $('#docs-view').classList.toggle('hidden', name !== 'docs');
  if (name === 'docs') loadDocs();
}

// ---- Foco do chat: um projeto qualquer da base vira o contexto das respostas ----

// f: { id, cliente, titulo, ... } ou null para busca geral.
function setFocus(f) {
  state.foco = f;
  $('#focus-label').textContent = f ? f.cliente : 'Responder para…';
  $('#focus-btn').classList.toggle('on', Boolean(f));
  $('#focus-btn').title = f ? `Foco: ${f.cliente} · ${f.titulo}` : 'Escolha um projeto para o chat responder pensando nele';
  renderBriefing();
}

function setupFocus() {
  const btn = $('#focus-btn');
  const pop = $('#focus-pop');
  const q = $('#focus-q');
  let timer;
  let itens = [];
  let ativo = 0;
  const toggle = (open = pop.classList.contains('hidden')) => {
    pop.classList.toggle('hidden', !open);
    btn.setAttribute('aria-expanded', open);
    if (open) { q.value = ''; load(); q.focus(); }
  };
  const choose = (f) => { toggle(false); setFocus(f); if (!state.conv) newConversation(); btn.focus(); };
  const paint = () => {
    const opcoes = [{ id: '', geral: true }, ...itens];
    $('#focus-list').innerHTML = opcoes.map((p, i) => (p.geral
      ? `<li role="option" data-i="${i}" class="geral${state.foco ? '' : ' sel'}${i === ativo ? ' ativo' : ''}" aria-selected="${!state.foco}">${icon('search', { size: 15 })}<span><b>Sem foco</b><small>busca geral em toda a base</small></span></li>`
      : `${i === 1 || (p.emAndamento !== opcoes[i - 1].emAndamento) ? `<li class="grupo" role="presentation">${p.emAndamento ? 'Em andamento' : 'Outros projetos'}</li>` : ''}
        <li role="option" data-i="${i}" class="${state.foco?.id === p.id ? 'sel' : ''}${i === ativo ? ' ativo' : ''}" aria-selected="${state.foco?.id === p.id}">
          <i class="dot s-${esc(p.status_proposta).replace(/\s/g, '')}" title="${esc(p.status_proposta)}"></i><span><b>${esc(p.cliente)}</b><small>${esc(p.titulo)} · ${esc(p.id)}</small></span></li>`)).join('')
      + (itens.length ? '' : `<li class="vazio" role="presentation">Nenhum projeto com “${esc(q.value)}”</li>`);
    $$('[data-i]', $('#focus-list')).forEach((li) => {
      li.onclick = () => { const p = opcoes[Number(li.dataset.i)]; choose(p.geral ? null : p); };
    });
    $('#focus-list .ativo')?.scrollIntoView({ block: 'nearest' });
  };
  const load = async () => {
    itens = await api(`/api/foco?userId=${userId()}&q=${encodeURIComponent(q.value)}`);
    ativo = q.value ? 1 : 0;
    if (ativo > itens.length) ativo = 0;
    paint();
  };
  btn.onclick = (e) => { e.stopPropagation(); toggle(); };
  q.oninput = () => { clearTimeout(timer); timer = setTimeout(load, 150); };
  // Setas navegam, Enter escolhe, Esc fecha.
  q.onkeydown = (e) => {
    const total = itens.length + 1;
    if (e.key === 'ArrowDown') { e.preventDefault(); ativo = (ativo + 1) % total; paint(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); ativo = (ativo - 1 + total) % total; paint(); }
    if (e.key === 'Enter') { e.preventDefault(); choose(ativo === 0 ? null : itens[ativo - 1]); }
  };
  document.addEventListener('click', (e) => { if (!e.target.closest('.focus')) toggle(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !pop.classList.contains('hidden')) { toggle(false); btn.focus(); } });
}

function renderBriefing() {
  const o = state.foco;
  $('#briefing').classList.toggle('hidden', !o);
  if (o) {
    $('#briefing').innerHTML = `${icon('briefcase', { size: 16 })}<span title="${esc(o.descricao ?? '')}">Respondendo com foco em <strong>${esc(o.cliente)}</strong> · ${esc(o.titulo)}</span>
      <button class="icon-btn sm" title="Tirar o foco: voltar à busca geral">${icon('x', { size: 14 })}</button>`;
    $('#briefing button').onclick = () => { setFocus(null); if (!state.conv) newConversation(); };
  }
}

async function onAsk(e) {
  e?.preventDefault();
  const query = $('#query').value.trim();
  if (!query) return;
  $('#query').value = '';
  $('#chat .welcome')?.remove();
  addMsg('user', esc(query));
  const pending = addMsg('bot', `<span class="typing">${icon('loader', { cls: 'spin' })}Buscando…</span>`);
  try {
    const r = await api('/api/buscar', { query, userId: userId(), opportunityId: state.foco?.id || undefined, conversaId: state.conv?.id });
    pending.innerHTML = renderAnswer(r);
    bindAnswer(pending, r);
    state.conv = r.conversa;
    renderConvBar();
    renderMemory();
    loadConversations();
  } catch (err) {
    pending.innerHTML = `<p class="error">${icon('alert', { size: 16 })}${esc(err.message)}</p>`;
  }
  pending.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function addMsg(kind, html) {
  const el = document.createElement('div');
  el.className = `msg ${kind}`;
  el.innerHTML = html;
  $('#chat').appendChild(el);
  return el;
}

// Citações [P001] da resposta da IA viram etiquetas com o nome do cliente.
function renderText(r) {
  const names = citeNames(r);
  return esc(r.resposta)
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/\[(P\d{3})\]/g, (m, id) => `<span class="cite" title="${id}">${esc(names.get(id) ?? id)}</span>`);
}

function renderAnswer(r) {
  const e = r.entendimento ?? {};
  const reescrita = e.consulta && e.consulta.trim().toLowerCase() !== r.query.trim().toLowerCase();
  const info = `${r.candidatosAvaliados ? `${r.candidatosAvaliados} projetos avaliados · ` : ''}${r.tempoMs} ms · IA: ${r.ia?.fallback ? 'offline' : r.ia?.provedor === 'deepseek' ? 'DeepSeek' : 'regras'}${reescrita ? `\nEntendi como: ${e.consulta}` : ''}`;
  const opp = state.foco;
  const tipado = renderTyped(r);
  return `
    <div class="answer-head">
      ${typeTag(r)}
      ${e.continuacao ? `<span class="tag ctx" title="${esc(reescrita ? `Entendi como: ${e.consulta}` : 'Usei as perguntas anteriores desta conversa')}">${icon('layers', { size: 14 })}continuando a conversa</span>` : ''}
      ${r.ia?.fallback ? `<span class="tag warn" title="${esc(r.ia.erro)}">${icon('alert', { size: 14 })}IA offline: resposta simplificada</span>` : ''}
      <span class="info" title="${esc(info)}">${icon('info', { size: 15 })}</span>
    </div>
    <p class="answer">${renderText(r)}</p>
    ${tipado !== null ? tipado : r.resultados.length ? `<div class="rcards">${r.resultados.map(renderCard).join('')}</div>` : `
      <div class="noresult">
        <span>Tente:</span>
        <button type="button" class="chip-btn" data-act="explorar">${icon('folder', { size: 14 })}Explorar projetos</button>
        ${opp ? `<button type="button" class="chip-btn" data-act="sem-contexto">${icon('x', { size: 14 })}Perguntar sem o foco em ${esc(opp?.cliente ?? '')}</button>` : ''}
        ${state.conv?.turnos ? `<button type="button" class="chip-btn" data-act="nova">${icon('plus', { size: 14 })}Nova conversa, sem o contexto anterior</button>` : ''}
      </div>`}
    ${r.complementares.length ? `<p class="also" title="Serviços que aparecem com frequência em projetos parecidos">${icon('grid', { size: 15 })}Também costumam entrar: ${r.complementares.slice(0, 3).map((c) => `<b>${esc(c.servico)}</b>`).join(', ')}</p>` : ''}`;
}

const statusDot = (s) => `<i class="dot s-${esc(s).replace(/\s/g, '')}"></i>${esc(s)}`;

function renderCard(x) {
  const d = x.detalhes;
  return `
  <article class="rcard" data-projeto="${x.projeto_id}">
    <div class="rhead" data-toggle>
      <div class="rt"><h4>${esc(x.titulo)}</h4><span class="sub">${matchLabel(x.score)} ${esc(x.cliente)} · ${statusDot(x.status)}</span></div>
      ${x.conflitos.length ? `<span class="tag warn" title="${esc(x.conflitos.map((c) => c.motivo).join(' '))}">${icon('alert', { size: 14 })}dados divergentes</span>` : ''}
      <span class="fb">
        <button class="icon-btn sm" data-util="1" title="Útil" aria-label="Útil">${icon('thumbsUp', { size: 16 })}</button>
        <button class="icon-btn sm" data-util="0" title="Não ajudou" aria-label="Não ajudou">${icon('thumbsDown', { size: 16 })}</button>
      </span>
      <span class="chev">${icon('chevronDown', { size: 18 })}</span>
    </div>
    <div class="fb-why hidden"><span>O que não ajudou?</span>${MOTIVOS.map((m) => `<button type="button" class="pick" data-motivo="${esc(m)}">${esc(m)}</button>`).join('')}</div>
    <div class="rbody">
      <p class="why">${esc(x.justificativa)}</p>
      <div class="reuse">
        <button type="button" class="btn sm" data-reuse="abrir">${icon('folder', { size: 15 })}Abrir projeto</button>
        ${d.escopo ? `<button type="button" class="btn sm" data-reuse="copiar">${icon('copy', { size: 15 })}Copiar escopo</button>` : ''}
        ${pode('cadastrarProjeto') ? `<button type="button" class="btn sm" data-reuse="base">${icon('duplicate', { size: 15 })}Usar como base</button>` : ''}
      </div>
      <div class="chips">${x.tecnologias.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>
      <div class="facts">
        <span title="Prazo">${icon('clock', { size: 15 })}${d.prazoMeses ? `${d.prazoMeses} meses` : '—'}</span>
        ${d.valor ? `<span title="Valor">${icon('money', { size: 15 })}${brl(d.valor)}</span>` : d.valor === undefined ? `<span title="Valor oculto para o seu perfil">${icon('lock', { size: 15 })}valor restrito</span>` : ''}
        <span title="Segmento">${icon('building', { size: 15 })}${esc(x.segmento)}</span>
      </div>
      ${x.resumo ? `<p>${esc(x.resumo)}</p>` : ''}
      ${d.resultados || d.licoes || d.escopo ? `<details><summary>${icon('bulb', { size: 14 })}Escopo, resultados e lições</summary>
        ${d.escopo ? `<h5>Escopo</h5><p>${md(d.escopo)}</p>` : ''}${d.resultados ? `<h5>Resultados</h5><p>${md(d.resultados)}</p>` : ''}${d.licoes ? `<h5>Lições</h5><p>${md(d.licoes)}</p>` : ''}</details>` : ''}
      <details><summary>${icon('eye', { size: 14 })}Trechos que sustentam a resposta</summary>${x.evidencias.map((e) => `<blockquote><small>${esc(tipoLabel(e.tipo))}</small>${md(e.trecho)}</blockquote>`).join('')}</details>
      <details><summary>${icon('chart', { size: 14 })}Por que apareceu nesta posição</summary>
        <div class="factors">${x.fatores.map((f) => `<span>${esc(f.fator)}</span><div class="bar"><div style="width:${pct(f.valor)}"></div></div><em>${pct(f.peso)}</em>`).join('')}</div>
      </details>
      <div class="sources"><span class="muted">Fontes:</span>${x.fontes.map((f) => `<a href="#" data-doc="${f.doc_id}" title="${esc(f.arquivo)}">${icon('file', { size: 14 })}${esc(tipoLabel(f.tipo))}</a>`).join('')}</div>
    </div>
  </article>`;
}

function bindAnswer(container, r) {
  bindTyped(container, { ask: (q) => { $('#query').value = q; onAsk(); } });
  $$('[data-act]', container).forEach((b) => (b.onclick = () => {
    const last = $$('#chat .msg.user').pop()?.textContent ?? '';
    if (b.dataset.act === 'explorar') { openTab('projetos'); showView('projetos'); }
    if (b.dataset.act === 'sem-contexto') { setFocus(null); $('#query').value = last; onAsk(); }
    if (b.dataset.act === 'nova') { newConversation(); $('#query').value = last; onAsk(); }
  }));
  $$('.rcard', container).forEach((card) => {
    const projeto_id = card.dataset.projeto;
    const x = r.resultados.find((y) => y.projeto_id === projeto_id);
    const evento = (tipo, extra = {}) => api('/api/evento', { tipo, turnoId: r.turnoId, projeto_id, userId: userId(), ...extra });
    let opened = false;
    $('[data-toggle]', card).onclick = (e) => {
      if (e.target.closest('[data-util]')) return;
      card.classList.toggle('open');
      if (card.classList.contains('open') && !opened) { opened = true; evento('abrir_detalhe'); }
    };
    if (x?.expandir) card.classList.add('open');
    $$('[data-doc]', card).forEach((a) => (a.onclick = (e) => {
      e.preventDefault();
      evento('abrir_fonte', { doc_id: a.dataset.doc });
      openDoc(a.dataset.doc);
    }));
    $$('[data-util]', card).forEach((b) => (b.onclick = async () => {
      const util = b.dataset.util === '1';
      await evento('feedback', { util });
      $$('[data-util]', card).forEach((y) => y.classList.toggle('on', y === b));
      $('.fb-why', card).classList.toggle('hidden', util);
      if (util) toast('Obrigado! Isso melhora as próximas buscas.');
    }));
    $$('[data-motivo]', card).forEach((b) => (b.onclick = async () => {
      await evento('feedback_motivo', { motivo: b.dataset.motivo });
      $('.fb-why', card).classList.add('hidden');
      toast('Obrigado! Vamos usar isso para ajustar a busca.');
    }));
    $$('[data-reuse]', card).forEach((b) => (b.onclick = async () => {
      const acao = b.dataset.reuse;
      evento('reaproveitar', { acao });
      if (acao === 'abrir') openProject(projeto_id);
      if (acao === 'copiar') { await copyText(`${x.titulo} (${x.cliente})\n\n${x.detalhes.escopo}`); toast('Escopo copiado'); }
      if (acao === 'base') useAsBase(projeto_id);
    }));
  });
}

// "Usar como base": abre o cadastro de projeto novo já com segmento, tecnologias, serviços e escopo do projeto escolhido.
async function useAsBase(id) {
  const { projeto: p } = await api(`/api/projeto?id=${encodeURIComponent(id)}&userId=${userId()}`);
  const o = state.foco;
  openProjectForm({
    cliente: o?.cliente ?? '',
    titulo: o?.titulo ?? '',
    segmento: p.segmento,
    tecnologias: p.tecnologias,
    servicos: p.servicos,
    prazo_meses: p.prazo_meses,
    objetivo: p.objetivo,
    descricao: `Baseado em ${p.id} — ${p.titulo} (${p.cliente}).`,
  }, { base: p });
}

async function loadDocs() {
  state.docs = await api(`/api/documentos?userId=${userId()}`);
  renderDocs();
}

function renderDocs() {
  const f = $('#filter').value.toLowerCase();
  const docs = state.docs.filter((d) => !f || JSON.stringify(d).toLowerCase().includes(f) || tipoLabel(d.tipo).toLowerCase().includes(f));
  $('#docs').innerHTML = docs.length ? docs
    .map((d) => `<tr>
      <td><a href="#" data-doc="${d.id}" class="doc-link">${icon('file', { size: 16 })}<span>${esc(d.documento ?? tipoLabel(d.tipo))}<small>${esc(d.cliente)}</small></span></a></td>
      <td><a href="#" data-proj="${d.projeto_id}" class="mono" title="Abrir projeto">${d.projeto_id}</a></td>
      <td>${esc(tipoLabel(d.tipo))}${d.origem === 'upload' ? ` <span title="Enviado por upload">${icon('upload', { size: 13 })}</span>` : ''}</td>
      <td>${trustBadge(d.confianca)}</td></tr>`)
    .join('') : `<tr><td colspan="4" class="empty-state">${icon('search', { size: 28 })}<p>Nenhum documento com “${esc(f)}”</p></td></tr>`;
  $$('[data-doc]', $('#docs')).forEach((a) => (a.onclick = (e) => { e.preventDefault(); openDoc(a.dataset.doc); }));
  $$('[data-proj]', $('#docs')).forEach((a) => (a.onclick = (e) => { e.preventDefault(); openProject(a.dataset.proj); }));
}

async function loadMetrics() {
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
  $('#metrics-extra').innerHTML = m.motivosNaoUtil?.length
    ? `<section class="panel"><h4>${icon('thumbsDown', { size: 17 })}Por que não ajudou</h4><table class="tbl">${m.motivosNaoUtil.map((x) => `<tr><td>${esc(x.valor)}</td><td class="num">${x.n}</td></tr>`).join('')}</table></section>`
    : '';
  const b = state.ctx.base;
  $('#base-info').textContent = `${b.projetos} projetos · ${b.documentos} documentos · ${b.trechos} trechos · ${b.banco}`;
}

// ---- Conversas: memória, salvamento automático (UC05) e favoritas (UC06) ----

function newConversation() {
  state.conv = null;
  const perfil = currentUser()?.perfil;
  const o = state.foco;
  const sugestoes = o
    ? [`Projetos parecidos com ${o.titulo}`, `O que já fizemos para ${o.cliente}?`, 'Que riscos costumam aparecer nesse tipo de projeto?']
    : SUGESTOES[perfil] ?? SUGESTOES.consultor;
  const primeiraVez = !localStorage.getItem(INTRO_KEY);
  const b = state.ctx.base;
  $('#chat').innerHTML = `<div class="welcome">${icon('radar', { size: 44 })}<h2>${o ? `Montando a proposta para ${esc(o.cliente)}?` : 'O que você procura?'}</h2>
    <p class="lead-in">Encontre propostas, cases e lições de ${b.projetos} projetos, sempre com as fontes.</p>
    ${primeiraVez ? `<div class="intro-card">${introSteps()}<div class="intro-actions"><button type="button" id="intro-guide" class="link-btn">${icon('info', { size: 15 })}Ver o guia completo</button><button type="button" id="intro-ok" class="btn sm">${icon('check', { size: 15 })}Entendi</button></div></div>` : ''}
    <div class="suggest">${sugestoes.map((s) => `<button type="button" class="chip-btn">${esc(s)}</button>`).join('')}</div>
    <p class="hint-tipos">${icon('sparkles', { size: 14 })}Peça projetos parecidos, listas, contagens, a ficha de um projeto ou comparações.</p></div>`;
  $$('#chat .suggest .chip-btn').forEach((btn) => (btn.onclick = () => { $('#query').value = btn.textContent; onAsk(); }));
  if (primeiraVez) $('#intro-guide').onclick = () => showGuide();
  if (primeiraVez) $('#intro-ok').onclick = () => { localStorage.setItem(INTRO_KEY, '1'); $('.intro-card').remove(); };
  renderMemory();
  renderConvBar();
  highlightConv();
  $('#query').focus();
}

function renderConvBar() {
  const c = state.conv;
  $('#conv-title').value = c?.titulo ?? '';
  $('#conv-title').placeholder = 'Nova conversa';
  $('#conv-title').disabled = !c;
  $('#fav-conv').disabled = !c;
  $('#fav-conv').classList.toggle('on', Boolean(c?.favorita));
  $('#fav-conv').title = c?.favorita ? 'Remover dos favoritos' : 'Favoritar';
  $('#fav-conv').setAttribute('aria-pressed', Boolean(c?.favorita));
}

// A memória vale para as próximas perguntas da conversa; "esquecer" começa uma conversa nova.
function renderMemory() {
  const n = Math.min(state.conv?.turnos ?? 0, 8);
  $('#memory').classList.toggle('hidden', !n);
  $('#memory').innerHTML = `${icon('layers', { size: 14 })}lembrando ${n} pergunta${n > 1 ? 's' : ''}<button type="button" class="forget" title="Esquecer e começar do zero" aria-label="Esquecer e começar do zero">${icon('x', { size: 12 })}</button>`;
  $('#memory').title = 'As próximas perguntas consideram o que já foi perguntado nesta conversa';
  $('#memory .forget').onclick = newConversation;
}

async function renameConversation() {
  if (!state.conv) return;
  const r = await api('/api/conversa/salvar', { id: state.conv.id, userId: userId(), titulo: $('#conv-title').value });
  Object.assign(state.conv, r);
  renderConvBar();
  loadConversations();
  toast('Conversa renomeada');
}

async function toggleFavorite(id, favorita) {
  const r = await api('/api/conversa/favoritar', { id, userId: userId(), favorita });
  if (state.conv?.id === id) { Object.assign(state.conv, r); renderConvBar(); }
  loadConversations();
}

async function loadConversations() {
  const params = new URLSearchParams({ userId: userId(), busca: $('#conv-search').value });
  const list = await api(`/api/conversas?${params}`);
  const item = (c) => `
      <li data-id="${c.id}" title="${c.turnos} pergunta${c.turnos > 1 ? 's' : ''} · ${new Date(c.atualizadaEm).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}">
        <button class="icon-btn sm star${c.favorita ? ' on' : ''}" data-fav="${c.favorita ? 0 : 1}" title="${c.favorita ? 'Remover dos favoritos' : 'Favoritar'}" aria-pressed="${c.favorita}">${icon('star', { size: 15 })}</button>
        <a href="#" class="open">${esc(c.titulo)}</a>
        <button class="icon-btn sm del" title="Excluir" aria-label="Excluir conversa">${icon('trash', { size: 15 })}</button>
      </li>`;
  // Favoritas primeiro, depois as recentes; cada conversa aparece uma vez só.
  const favs = list.filter((c) => c.favorita);
  const recentes = list.filter((c) => !c.favorita);
  const grupo = (ic, titulo, itens) => (itens.length ? `<li class="conv-group" role="presentation">${icon(ic, { size: 14 })}${titulo}</li>${itens.map(item).join('')}` : '');
  $('#conv-list').innerHTML = list.length
    ? grupo('star', 'Favoritas', favs) + grupo('clock', 'Recentes', recentes)
    : `<li class="empty">${icon('message', { size: 16 })}${$('#conv-search').value ? 'Nenhuma conversa com essa busca' : 'Suas conversas aparecem aqui'}</li>`;
  $$('#conv-list li[data-id]').forEach((li) => {
    const id = li.dataset.id;
    $('.open', li).onclick = (e) => { e.preventDefault(); openConversation(id); };
    $('.star', li).onclick = (e) => toggleFavorite(id, e.currentTarget.dataset.fav === '1');
    // Exclusão em dois cliques, sem diálogo modal do navegador.
    $('.del', li).onclick = async (e) => {
      const btn = e.currentTarget;
      if (!btn.classList.contains('confirm')) {
        btn.classList.add('confirm');
        btn.title = 'Toque de novo para excluir';
        setTimeout(() => { btn.classList.remove('confirm'); btn.title = 'Excluir'; }, 3000);
        return;
      }
      await api('/api/conversa/excluir', { id, userId: userId() });
      if (state.conv?.id === id) newConversation();
      loadConversations();
    };
  });
  highlightConv();
}

function highlightConv() {
  $$('#conv-list li[data-id]').forEach((li) => li.classList.toggle('active', li.dataset.id === state.conv?.id));
}

// Reabre a conversa salva com todo o histórico; a memória continua valendo nas próximas perguntas.
async function openConversation(id) {
  const c = await api(`/api/conversa?id=${encodeURIComponent(id)}&userId=${userId()}`);
  state.conv = { id: c.id, titulo: c.titulo, salva: c.salva, favorita: c.favorita, turnos: c.turnos.length };
  setFocus(c.oportunidadeId ? await api(`/api/foco?id=${encodeURIComponent(c.oportunidadeId)}&userId=${userId()}`).catch(() => null) : null);
  $('#chat').innerHTML = '';
  for (const t of c.turnos) {
    addMsg('user', esc(t.pergunta));
    const el = addMsg('bot', '');
    const r = { ...t.resultado, turnoId: t.turnoId };
    el.innerHTML = renderAnswer(r);
    bindAnswer(el, r);
  }
  renderMemory();
  renderConvBar();
  highlightConv();
  openTab('busca');
}

function setupConversations() {
  $('#new-conv').onclick = newConversation;
  $('#fav-conv').onclick = () => state.conv && toggleFavorite(state.conv.id, !state.conv.favorita);
  const layout = $('.chat-layout');
  $('#toggle-convs').onclick = () => layout.classList.toggle('no-side');
  // No celular a lista de conversas é uma gaveta: fecha ao escolher uma conversa ou tocar fora dela.
  const mobile = matchMedia('(max-width: 720px)');
  layout.addEventListener('click', (e) => {
    if (mobile.matches && (e.target === layout || e.target.closest('#new-conv, #conv-list .open'))) layout.classList.remove('no-side');
  });
  // Renomear: Enter no título grava o novo nome.
  $('#conv-title').onkeydown = (e) => { if (e.key === 'Enter' && state.conv) { e.preventDefault(); renameConversation(); e.target.blur(); } };
  $('#conv-search').oninput = loadConversations;
}

init();
