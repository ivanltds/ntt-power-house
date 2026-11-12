import { $, $$, esc, md, pct, brl, api, state, userId, currentUser, tipoLabel, openTab, openDoc, onTab, notifyUserChange, trustBadge, matchLabel, copyText, toast, pode, iconeSegmento, normalizeText } from './common.js';
import { enviarParaProjeto, situacaoEnvio, revisarEnvio } from './upload.js';
import { icon, hydrateIcons } from './icons.js';
import { initProjects, openProject, openProjectForm } from './projetos.js';
import { initUploads } from './upload.js';
import { initInsights } from './insights.js';
import { initPainel } from './painel.js';
import { initCampanha } from './campanha.js';
import { showGuide, showTech } from './ajuda.js';
import { showSdlc } from './sdlc.js';
import { VERSAO, showReleaseNotes, showFeedback } from './versao.js';
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
  // CR-031: a etiqueta "Visão: …" mostra sempre qual usuário de demonstração está ativo; clicar abre o menu para trocar.
  const pintarVisao = () => {
    const u = state.ctx.usuarios.find((x) => x.id === $('#user').value);
    $('#visao-nome').textContent = `Visão: ${$('#user').selectedOptions[0]?.textContent ?? ''}${u?.pessoa ? ` · ${u.pessoa}` : ''}`;
  };
  pintarVisao();
  $('#visao-tag').onclick = (e) => { e.stopPropagation(); $('#menu-btn').click(); $('#user').focus(); };
  $('#user').onchange = async () => { pintarVisao(); await reloadContext(); setFocus(null); newConversation(); loadDocs(); loadConversations(); notifyUserChange(); toast(`Agora você vê o Radar como ${$('#user').selectedOptions[0]?.textContent}.`); };
  setupFocus();
  setupTheme();
  // A IA só aparece no topo quando está fora do ar: ligada é o normal.
  const ia = state.ctx.base.llmProvedor === 'deepseek';
  if (!ia) {
    $('#ia-badge').innerHTML = `${icon('cpu', { size: 14 })}Modo regras`;
    $('#ia-badge').title = 'Neste ambiente, as respostas usam as regras e a busca por palavras do Radar.';
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
  initPainel();
  initCampanha(() => showFeedback());
  initActivities();
  newConversation();
  loadConversations();
  // Links "Política de dados" em qualquer tela.
  document.addEventListener('click', (e) => { const a = e.target.closest('[data-politica-link]'); if (a) { e.preventDefault(); showPolicy(); } });
  welcomeOnFirstVisit().catch(() => {});
  // Insights (novo) não tem aba: abre só pelo endereço /insights-novo, enquanto é avaliado.
  if (/^\/insig(ht|th)s-novo\/?$/.test(location.pathname)) openTab('painel');
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
  // CR-006: botão X no menu (depois de trocar o "Ver como" o menu fica aberto para mostrar as opções do perfil).
  // CR-026: Ajuda, versão e feedback visíveis na lateral das conversas (antes só no menu ⋮).
  $$('[data-side]').forEach((b) => (b.onclick = () => ({ ajuda: showGuide, feedback: showFeedback })[b.dataset.side]()));
  $('#menu-fechar').onclick = (e) => { e.stopPropagation(); toggle(false); btn.focus(); };
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

// ---- CR-049 / CR-050: arquivos pelo chat ----
// O clipe anexa arquivos à conversa. Eles ficam pendentes (não entram na base) até a pessoa dizer o projeto, na mesma
// mensagem ("coloca essa proposta no projeto da Energisul") ou depois ("aquele PDF é do projeto P003"). Com o projeto
// definido, o arquivo vai para o envio normal (mascaramento, revisão humana) já com o destino fixo.
const QUER_ENVIAR = /\b(coloc|envi|sub|adicion|anex|mand|guard|salv|inclu|vincul|associ)\w*\b|\b(é|eh|sao|são|vai|vão|vao) (do|da|de|para o|pro|no) projeto\b|\b(arquivo|pdf|documento|anexo|planilha|apresenta\w*)\b.*\bprojeto\b/i;
let projetosChat = null;
async function projetoCitado(texto) {
  projetosChat ??= (await api(`/api/projetos?userId=${userId()}&tamanho=100&ordenar=titulo`)).itens;
  const t = normalizeText(texto);
  const cod = /\bp\d{3}\b/.exec(t)?.[0].toUpperCase();
  if (cod) return projetosChat.find((p) => p.id === cod) ?? null;
  const palavras = (x) => normalizeText(x).split(/[^a-z0-9]+/).filter((w) => w.length > 3 && !['projeto', 'cliente', 'dados', 'para', 'com'].includes(w));
  const pontos = projetosChat.map((p) => ({ p, n: [...new Set([...palavras(p.cliente), ...palavras(p.titulo)])].filter((w) => t.includes(w)).length })).sort((a, b) => b.n - a.n);
  return pontos[0]?.n ? pontos[0].p : null;
}
function pintarAnexos() {
  const a = state.anexos ?? [];
  $('#anexos').innerHTML = a.map((f, i) => `<span class="anexo">${icon('paperclip', { size: 13 })}${esc(f.name)}<button type="button" data-tirar-anexo="${i}" title="Tirar o anexo" aria-label="Tirar ${esc(f.name)}">${icon('x', { size: 12 })}</button></span>`).join('');
  $('#anexos').classList.toggle('hidden', !a.length);
  $$('[data-tirar-anexo]').forEach((b) => (b.onclick = () => { state.anexos.splice(Number(b.dataset.tirarAnexo), 1); pintarAnexos(); }));
  atualizarEnviar();
}
async function enviarAnexos(texto) {
  const projeto = await projetoCitado(texto) ?? (QUER_ENVIAR.test(texto) && state.foco ? { id: state.foco.id, titulo: state.foco.titulo, cliente: state.foco.cliente } : null);
  $('#chat .welcome')?.remove();
  addMsg('user', `${esc(texto)}<span class="anexos-msg">${state.anexos.map((f) => `${icon('paperclip', { size: 12 })}${esc(f.name)}`).join(' ')}</span>`);
  if (!projeto) {
    addMsg('bot', `<p class="answer"><span class="ans-par">Para qual projeto vão ${state.anexos.length > 1 ? `os ${state.anexos.length} arquivos` : `o arquivo <b>${esc(state.anexos[0].name)}</b>`}? Diga o cliente ou o código do projeto (ex.: "é do projeto P003" ou "coloca no projeto da Energisul"). Até lá ${state.anexos.length > 1 ? 'eles ficam' : 'ele fica'} só nesta conversa, fora da base.</span></p>`);
    return;
  }
  const arquivos = state.anexos.splice(0);
  pintarAnexos();
  const bot = addMsg('bot', `<p class="answer"><span class="ans-par">${icon('loader', { size: 14, cls: 'spin' })}Enviando para <b>${esc(projeto.titulo)}</b> (${esc(projeto.cliente)})</span></p>`);
  const ids = await enviarParaProjeto(arquivos, projeto.id);
  if (!ids.length) { bot.innerHTML = '<p class="error">Nenhum arquivo foi enviado.</p>'; return; }
  bot.innerHTML = `<p class="answer"><span class="ans-par">${ids.length > 1 ? `${ids.length} arquivos enviados` : 'Arquivo enviado'} para <b>${esc(projeto.titulo)}</b> (${esc(projeto.cliente)}). O Radar extrai os dados e você confere antes de ${ids.length > 1 ? 'entrarem' : 'entrar'} na base.</span></p><ul class="chat-envios"></ul>`;
  for (const id of ids) {
    const li = document.createElement('li');
    $('.chat-envios', bot).appendChild(li);
    const acompanhar = async () => {
      const j = await situacaoEnvio(id).catch(() => null);
      if (!j || !li.isConnected) return;
      if (['enviado', 'processando'].includes(j.status)) { li.innerHTML = `${icon('loader', { size: 14, cls: 'spin' })}${esc(j.nome_arquivo)}: extraindo os dados`; setTimeout(acompanhar, 900); return; }
      li.innerHTML = j.status === 'erro' ? `${icon('xCircle', { size: 14 })}${esc(j.nome_arquivo)}: ${esc(j.erro)}`
        : `${icon('eye', { size: 14 })}<b>${esc(j.nome_arquivo)}</b> pronto para conferir <button type="button" class="btn sm primary">Revisar</button>`;
      $('button', li)?.addEventListener('click', () => revisarEnvio(id));
    };
    acompanhar();
  }
}

async function onAsk(e) {
  e?.preventDefault();
  const query = $('#query').value.trim();
  if (!query) return;
  if (state.anexos?.length && (QUER_ENVIAR.test(query) || await projetoCitado(query))) {
    $('#query').value = '';
    atualizarEnviar();
    return enviarAnexos(query);
  }
  // CR-044: editar a última pergunta — a pergunta e a resposta anteriores saem da conversa e a nova entra no lugar.
  if (state.editando && state.conv?.id) {
    try { await api('/api/conversa/desfazer-ultima', { id: state.conv.id, userId: userId() }); } catch { /* conversa nova: segue como pergunta normal */ }
    const ultimas = $$('#chat .msg');
    ultimas.slice(-2).forEach((m) => m.remove());
    state.conv.turnos = Math.max(0, (state.conv.turnos ?? 1) - 1);
  }
  pararEdicao();
  $('#query').value = '';
  atualizarEnviar();
  $('#chat .welcome')?.remove();
  $$('#chat .msg.user .msg-editar').forEach((b) => b.remove());
  const msgUser = addMsg('user', esc(query));
  msgUser.insertAdjacentHTML('beforeend', `<button type="button" class="icon-btn sm msg-editar" title="Editar esta pergunta e reenviar" aria-label="Editar a última pergunta">${icon('edit', { size: 14 })}</button>`);
  $('.msg-editar', msgUser).onclick = () => editarUltima(query);
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

// CR-044: a última pergunta tem um lápis; ao editar, a caixa de texto recebe a pergunta e um aviso com "Cancelar".
function editarUltima(texto) {
  state.editando = true;
  $('#query').value = texto;
  atualizarEnviar();
  $('#editando').classList.remove('hidden');
  $('#query').focus();
  $('#query').select();
}
function pararEdicao() {
  state.editando = false;
  $('#editando')?.classList.add('hidden');
}
// CR-037: enviar só fica habilitado com texto de verdade (não vale vazio nem só espaços).
function atualizarEnviar() {
  const vazio = !$('#query').value.trim();
  $('#ask .send').disabled = vazio;
  $('#ask .send').title = vazio ? 'Escreva uma pergunta para enviar' : 'Enviar';
}

function addMsg(kind, html) {
  const el = document.createElement('div');
  el.className = `msg ${kind}`;
  el.innerHTML = html;
  $('#chat').appendChild(el);
  return el;
}

// Citações [P001] da resposta da IA viram etiquetas com o nome do cliente.
// Resposta em blocos (CR-027): cada parágrafo vira um bloco; "Recomendação:" e "Perfis sugeridos:" ganham destaque.
function renderText(r) {
  const names = citeNames(r);
  return String(r.resposta ?? '').split(/\n\s*\n/).map((bloco) => `<span class="ans-par">${esc(bloco.trim())
    .replace(/^(Recomendação|Perfis sugeridos):/, '<b class="ans-rot">$1:</b>')
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/\[(P\d{3})\]/g, (m, id) => `<span class="cite" title="${id}">${esc(names.get(id) ?? id)}</span>`)}</span>`).join('');
}

function renderAnswer(r) {
  const e = r.entendimento ?? {};
  const reescrita = e.consulta && e.consulta.trim().toLowerCase() !== r.query.trim().toLowerCase();
  const info = `${r.candidatosAvaliados ? `${r.candidatosAvaliados} projetos avaliados · ` : ''}${r.tempoMs} ms · IA: ${r.ia?.fallback ? 'regras do Radar' : r.ia?.provedor === 'deepseek' ? 'DeepSeek' : 'regras'}${reescrita ? `\nEntendi como: ${e.consulta}` : ''}`;
  const opp = state.foco;
  const tipado = renderTyped(r);
  return `
    <div class="answer-head">
      ${typeTag(r)}
      ${e.continuacao ? `<span class="tag ctx" title="${esc(reescrita ? `Entendi como: ${e.consulta}` : 'Usei as perguntas anteriores desta conversa')}">${icon('layers', { size: 14 })}continuando a conversa</span>` : ''}
      ${r.ia?.fallback ? `<span class="tag" title="Resposta montada pelas regras e pela busca por palavras do Radar">${icon('cpu', { size: 14 })}resposta direta da base</span>` : ''}
      <span class="info" title="${esc(info)}">${icon('info', { size: 15 })}</span>
    </div>
    <p class="answer">${renderText(r)}</p>
    ${tipado !== null ? tipado : r.resultados.length ? `<div class="rcards">${r.resultados.map(renderCard).join('')}</div>` : `
      <div class="noresult">
        <span>Tente:</span>
        ${(r.sugestoes ?? []).map((q) => `<button type="button" class="chip-btn" data-ask="${esc(q)}">${icon('search', { size: 14 })}${esc(q)}</button>`).join('')}
        <button type="button" class="chip-btn" data-act="explorar">${icon('folder', { size: 14 })}Explorar projetos</button>
        ${opp ? `<button type="button" class="chip-btn" data-act="sem-contexto">${icon('x', { size: 14 })}Perguntar sem o foco em ${esc(opp?.cliente ?? '')}</button>` : ''}
        ${state.conv?.turnos ? `<button type="button" class="chip-btn" data-act="nova">${icon('plus', { size: 14 })}Nova conversa, sem o contexto anterior</button>` : ''}
      </div>`}
    ${r.complementares.length ? `<p class="also" title="Serviços que aparecem com frequência em projetos parecidos">${icon('grid', { size: 15 })}Também costumam entrar: ${r.complementares.slice(0, 3).map((c) => `<b>${esc(c.servico)}</b>`).join(', ')}</p>` : ''}`;
}

const statusDot = (s) => `<i class="dot s-${esc(s).replace(/\s/g, '')}"></i>${esc(s)}`;

// Card do projeto na resposta (V0.0.2):
// CR-030: hierarquia nova — o que importa para decidir vem primeiro (cliente, segmento, status, prazo, por que é parecido,
// resumo); tecnologias aparecem uma vez só, no fim, discretas e clicáveis (CR-013: abrem Projetos filtrado).
// CR-029: itens que abrem e fecham com setinha (chevron) e um aberto por vez (atributo name do <details>).
// CR-028: cada barra de "Por que apareceu" é a contribuição do critério para este projeto, numa escala única de 0 a 100%.
// CR-051: o que fica oculto para o consultor é o preço e a margem da proposta, não os resultados em reais.
const acordeon = (grupo, ic, titulo, corpo) => `<details class="acc" name="${grupo}"><summary>${icon(ic, { size: 14 })}<span>${titulo}</span><span class="acc-chev">${icon('chevronDown', { size: 15 })}</span></summary><div class="acc-body">${corpo}</div></details>`;

function renderCard(x) {
  const d = x.detalhes;
  const grupo = `acc-${x.projeto_id}`;
  const fatores = x.fatores.map((f) => ({ ...f, contribuicao: f.valor * f.peso }));
  return `
  <article class="rcard" data-projeto="${x.projeto_id}">
    <div class="rhead" data-toggle>
      <span class="seg-ico lg" title="${esc(x.segmento)}" aria-hidden="true">${icon(iconeSegmento(x.segmento), { size: 18 })}</span>
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
      <div class="facts">
        <span title="Segmento">${icon(iconeSegmento(x.segmento), { size: 15 })}${esc(x.segmento)}</span>
        <span title="Prazo">${icon('clock', { size: 15 })}${d.prazoMeses ? `${d.prazoMeses} meses` : '—'}</span>
        ${d.valor ? `<span title="Preço da proposta">${icon('money', { size: 15 })}${brl(d.valor)}</span>` : d.valor === undefined ? `<span title="O preço e a margem da proposta não aparecem para o seu perfil. Resultados dos cases (ex.: economia gerada para o cliente) aparecem para todos.">${icon('lock', { size: 15 })}preço e margem restritos</span>` : ''}
      </div>
      <p class="why">${esc(x.justificativa)}</p>
      ${x.resumo ? `<p class="resumo">${esc(x.resumo)}</p>` : ''}
      <div class="reuse">
        <button type="button" class="btn sm" data-reuse="abrir">${icon('folder', { size: 15 })}Abrir projeto</button>
        ${d.escopo ? `<button type="button" class="btn sm" data-reuse="copiar">${icon('copy', { size: 15 })}Copiar escopo</button>` : ''}
        ${pode('cadastrarProjeto') ? `<button type="button" class="btn sm" data-reuse="base">${icon('duplicate', { size: 15 })}Usar como base</button>` : ''}
      </div>
      <div class="accs">
        ${d.resultados || d.licoes || d.escopo ? acordeon(grupo, 'bulb', 'Escopo, resultados e lições', `${d.escopo ? `<h5>Escopo</h5><p>${md(d.escopo)}</p>` : ''}${d.resultados ? `<h5>Resultados</h5><p>${md(d.resultados)}</p>` : ''}${d.licoes ? `<h5>Lições</h5><p>${md(d.licoes)}</p>` : ''}`) : ''}
        ${acordeon(grupo, 'eye', 'Trechos que sustentam a resposta', x.evidencias.map((e) => `<blockquote><small>${esc(tipoLabel(e.tipo))}</small>${md(e.trecho)}</blockquote>`).join(''))}
        ${acordeon(grupo, 'chart', 'Por que apareceu nesta posição', `<p class="muted small">Quanto cada critério somou para a semelhança de ${pct(x.score)} deste projeto.</p>
          <div class="factors">${fatores.map((f) => `<span>${esc(f.fator)}</span><div class="bar" title="${esc(`${f.fator}: nota ${pct(f.valor)} × peso ${pct(f.peso)} = ${pct(f.contribuicao)}`)}"><div style="width:${pct(f.contribuicao)}"></div></div><em>${pct(f.contribuicao)}</em>`).join('')}</div>`)}
      </div>
      ${x.tecnologias.length ? `<div class="tec-tags"><span class="muted small">Tecnologias:</span>${x.tecnologias.map((t) => `<button type="button" class="tec-tag" data-tec="${esc(t)}" title="Ver projetos com ${esc(t)}">${esc(t)}</button>`).join('')}</div>` : ''}
      <div class="sources"><span class="muted">Fontes:</span>${x.fontes.map((f) => `<a href="#" data-doc="${f.doc_id}" title="${esc(f.arquivo)}">${icon('file', { size: 14 })}${esc(tipoLabel(f.tipo))}</a>`).join('')}</div>
    </div>
  </article>`;
}

function bindAnswer(container, r) {
  bindTyped(container, { ask: (q) => { $('#query').value = q; onAsk(); } });
  $$('.noresult [data-ask]', container).forEach((b) => (b.onclick = () => { $('#query').value = b.dataset.ask; onAsk(); }));
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
    $$('[data-tec]', card).forEach((b) => (b.onclick = () => { openTab('projetos'); document.dispatchEvent(new CustomEvent('radar:filtrar', { detail: { tecnologias: [b.dataset.tec] } })); }));
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
  pararEdicao();
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
  $('#edit-title').disabled = !c;
  $('#conv-title').value = c?.titulo ?? '';
  $('#conv-title').dataset.original = c?.titulo ?? '';
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

// Lista de conversas (V0.0.2):
// CR-017: Favoritas, um bloco por grupo (cliente ou proposta, nome livre), Avulsas e Arquivadas (recolhidas no fim).
// CR-004: a estrela só aparece ao passar o mouse, e fica fixa (colorida) nas favoritas.
// CR-018: menu ⋯ de cada conversa com Renomear, Mover para grupo, Arquivar e Excluir.
// CR-035: excluir pede confirmação num diálogo com o título da conversa.
let conversas = [];
async function loadConversations() {
  const params = new URLSearchParams({ userId: userId(), busca: $('#conv-search').value });
  conversas = await api(`/api/conversas?${params}`);
  const item = (c) => `
      <li data-id="${c.id}" class="${c.favorita ? 'fav' : ''}" title="${c.turnos} pergunta${c.turnos > 1 ? 's' : ''} · ${new Date(c.atualizadaEm).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}">
        <a href="#" class="open">${esc(c.titulo)}</a>
        <button class="icon-btn sm star${c.favorita ? ' on' : ''}" data-fav="${c.favorita ? 0 : 1}" title="${c.favorita ? 'Remover dos favoritos' : 'Favoritar'}" aria-pressed="${c.favorita}">${icon('star', { size: 15 })}</button>
        <button class="icon-btn sm mais" title="Mais opções" aria-label="Mais opções da conversa ${esc(c.titulo)}" aria-haspopup="menu">${icon('more', { size: 15 })}</button>
      </li>`;
  const ativas = conversas.filter((c) => !c.arquivada);
  const favs = ativas.filter((c) => c.favorita);
  // Favorita que está num grupo aparece nos dois lugares: em Favoritas e no bloco do grupo.
  const grupos = [...new Set(ativas.filter((c) => c.grupo).map((c) => c.grupo))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  const avulsas = ativas.filter((c) => !c.favorita && !c.grupo);
  const arquivadas = conversas.filter((c) => c.arquivada);
  const bloco = (ic, titulo, itens, extra = '') => (itens.length ? `<li class="conv-group${extra}" role="presentation">${icon(ic, { size: 14 })}<span>${esc(titulo)}</span><em>${itens.length}</em></li>${itens.map(item).join('')}` : '');
  $('#conv-list').innerHTML = conversas.length
    ? bloco('star', 'Favoritas', favs)
      + grupos.map((g) => bloco('folder', g, ativas.filter((c) => c.grupo === g), ' grupo')).join('')
      + bloco('clock', grupos.length ? 'Avulsas' : 'Recentes', avulsas)
      + (arquivadas.length ? `<li class="conv-arq" role="presentation"><details><summary>${icon('archive', { size: 14 })}<span>Arquivadas</span><em>${arquivadas.length}</em></summary><ul>${arquivadas.map(item).join('')}</ul></details></li>` : '')
    : `<li class="empty">${icon('message', { size: 16 })}${$('#conv-search').value ? 'Nenhuma conversa com essa busca' : 'Suas conversas aparecem aqui'}</li>`;
  $$('#conv-list li[data-id]').forEach((li) => {
    const id = li.dataset.id;
    $('.open', li).onclick = (e) => { e.preventDefault(); openConversation(id); };
    $('.star', li).onclick = (e) => toggleFavorite(id, e.currentTarget.dataset.fav === '1');
    $('.mais', li).onclick = (e) => { e.stopPropagation(); abrirMenuConversa(id, e.currentTarget); };
  });
  highlightConv();
}

function fecharMenuConversa() {
  $('#conv-menu')?.remove();
  document.removeEventListener('click', fecharMenuConversa);
}

function abrirMenuConversa(id, botao) {
  fecharMenuConversa();
  const c = conversas.find((x) => x.id === id);
  if (!c) return;
  const grupos = [...new Set(conversas.map((x) => x.grupo).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  const menu = document.createElement('div');
  menu.id = 'conv-menu';
  menu.className = 'conv-menu';
  menu.setAttribute('role', 'menu');
  menu.innerHTML = `
    <button type="button" role="menuitem" data-m="renomear">${icon('edit', { size: 14 })}Renomear</button>
    <div class="conv-menu-sec" role="group" aria-label="Mover para grupo"><span>${icon('folder', { size: 14 })}Mover para grupo</span>
      ${grupos.map((g) => `<button type="button" role="menuitemradio" aria-checked="${c.grupo === g}" data-grupo="${esc(g)}">${c.grupo === g ? icon('check', { size: 13 }) : '<i class="sp"></i>'}${esc(g)}</button>`).join('')}
      ${c.grupo ? `<button type="button" role="menuitem" data-grupo="">${'<i class="sp"></i>'}Tirar do grupo</button>` : ''}
      <form class="conv-novo-grupo"><input name="g" maxlength="40" placeholder="Novo grupo (ex.: cliente ou proposta)" aria-label="Nome do novo grupo"><button type="submit" class="icon-btn sm" title="Criar grupo e mover">${icon('plus', { size: 14 })}</button></form>
    </div>
    <button type="button" role="menuitem" data-m="arquivar">${icon('archive', { size: 14 })}${c.arquivada ? 'Desarquivar' : 'Arquivar'}</button>
    <button type="button" role="menuitem" data-m="excluir" class="perigo">${icon('trash', { size: 14 })}Excluir</button>`;
  document.body.appendChild(menu);
  const r = botao.getBoundingClientRect();
  menu.style.top = `${Math.min(r.bottom + 4, innerHeight - menu.offsetHeight - 8)}px`;
  menu.style.left = `${Math.max(8, Math.min(r.right - menu.offsetWidth, innerWidth - menu.offsetWidth - 8))}px`;
  menu.onclick = (e) => e.stopPropagation();
  menu.onkeydown = (e) => { if (e.key === 'Escape') { fecharMenuConversa(); botao.focus(); } };
  setTimeout(() => document.addEventListener('click', fecharMenuConversa), 0);
  const mover = async (grupo) => {
    await api('/api/conversa/grupo', { id, userId: userId(), grupo });
    fecharMenuConversa();
    toast(grupo ? `Conversa movida para "${grupo}"` : 'Conversa tirada do grupo');
    loadConversations();
  };
  $$('[data-grupo]', menu).forEach((b) => (b.onclick = () => mover(b.dataset.grupo)));
  $('.conv-novo-grupo', menu).onsubmit = (e) => { e.preventDefault(); const g = e.target.g.value.trim(); if (g) mover(g); };
  $('[data-m="renomear"]', menu).onclick = () => { fecharMenuConversa(); renomearNaLista(id, botao.closest('li')); };
  $('[data-m="arquivar"]', menu).onclick = async () => {
    await api('/api/conversa/arquivar', { id, userId: userId(), arquivada: !c.arquivada });
    fecharMenuConversa();
    toast(c.arquivada ? 'Conversa desarquivada' : 'Conversa arquivada');
    loadConversations();
  };
  $('[data-m="excluir"]', menu).onclick = () => { fecharMenuConversa(); confirmarExclusao(c); };
  $('button', menu).focus();
}

// Renomear direto na lista: Enter salva, Esc cancela.
// A conversa pode aparecer duas vezes (favorita e no grupo): edita a linha cujo menu foi aberto.
function renomearNaLista(id, linha) {
  const li = linha?.isConnected ? linha : $(`#conv-list li[data-id="${id}"]`);
  const a = li && $('.open', li);
  if (!a) return;
  const input = Object.assign(document.createElement('input'), { value: a.textContent, maxLength: 80, className: 'conv-rename' });
  input.setAttribute('aria-label', 'Novo nome da conversa');
  a.replaceWith(input);
  input.focus();
  input.select();
  let feito = false;
  const fim = async (salvar) => {
    if (feito) return;
    feito = true;
    if (salvar && input.value.trim() && input.value.trim() !== a.textContent) {
      const r = await api('/api/conversa/salvar', { id, userId: userId(), titulo: input.value });
      if (state.conv?.id === id) { Object.assign(state.conv, r); renderConvBar(); }
      toast('Conversa renomeada');
    }
    loadConversations();
  };
  input.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); fim(true); } if (e.key === 'Escape') { e.preventDefault(); fim(false); } };
  input.onblur = () => fim(true);
}

function confirmarExclusao(c) {
  const dlg = $('#dlg-excluir-conv');
  $('#dlg-excluir-titulo', dlg).textContent = c.titulo;
  dlg.returnValue = '';
  dlg.showModal();
  $('[value="cancelar"]', dlg).focus();
  dlg.onclose = async () => {
    if (dlg.returnValue !== 'excluir') return;
    await api('/api/conversa/excluir', { id: c.id, userId: userId() });
    if (state.conv?.id === c.id) newConversation();
    toast('Conversa excluída');
    loadConversations();
  };
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
  // Renomear (CR-034): lápis ao lado do título; Enter salva, Esc cancela e volta o nome anterior.
  $('#conv-title').onkeydown = (e) => {
    if (e.key === 'Enter' && state.conv) { e.preventDefault(); renameConversation(); e.target.blur(); }
    if (e.key === 'Escape') { e.preventDefault(); e.target.value = e.target.dataset.original ?? ''; e.target.blur(); }
  };
  $('#edit-title').onclick = () => { $('#conv-title').focus(); $('#conv-title').select(); };
  // CR-037: botão enviar só com texto; Enter com a caixa vazia não faz nada.
  $('#query').addEventListener('input', atualizarEnviar);
  atualizarEnviar();
  $('#anexar').onchange = (e) => { state.anexos = [...(state.anexos ?? []), ...e.target.files]; e.target.value = ''; pintarAnexos(); $('#query').focus(); };
  $('#editando-cancelar').onclick = () => { pararEdicao(); $('#query').value = ''; atualizarEnviar(); };
  // CR-035: clicar fora do diálogo de excluir cancela.
  $('#dlg-excluir-conv').addEventListener('click', (e) => { if (e.target === e.currentTarget) e.currentTarget.close('cancelar'); });
  $('#conv-search').oninput = loadConversations;
}

init();
