// Tela "Projetos": exploração com filtros combinados e facetas (UC08), detalhe (UC07) e cadastro/edição.

import { enviarParaProjeto, situacaoEnvio, revisarEnvio } from './upload.js';
import { $, $$, esc, md, brl, api, state, userId, currentUser, tipoLabel, openTab, openDoc, onTab, onUserChange, toast, highlight, dateBR, chipPicker, bindChipPickers, readChips, trustBadge, matchLabel, downloadDoc, userName, pode, normalizeText, iconeSegmento } from './common.js';
import { icon } from './icons.js';
import { ELISTS, elist, bindEntityLists, readEntityLists } from './entidades.js';
import { ensureTerms, handleTermsError, maskNote, policyLine } from './aviso.js';

const FACETS = [
  ['segmentos', 'Segmento'],
  ['status', 'Status'],
  ['tecnologias', 'Tecnologias', 'modoTecnologias'],
  ['servicos', 'Serviços', 'modoServicos'],
  ['tiposDocumento', 'Tem documento'],
];
const ENTITY_TYPES = { pessoa: 'Pessoa', organizacao: 'Organização', kpi: 'Resultado', risco: 'Risco', licao: 'Lição', palavra_chave: 'Palavra-chave' };
const STATUS_DOC = ['rascunho', 'preliminar', 'bruta', 'final', 'final_enviada', 'final_aprovada', 'aprovado', 'validada'];
const empty = () => ({ meus: false, q: '', modoTexto: 'todas', cliente: '', segmentos: [], status: [], tecnologias: [], modoTecnologias: 'todas', servicos: [], modoServicos: 'todas', tiposDocumento: [], prazoMin: '', prazoMax: '', valorMin: '', valorMax: '', dataDe: '', dataAte: '', entidadeTipo: '', entidadeValor: '' });
const PAGE_SIZE = 20;
const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const view = { filtros: empty(), ordenar: 'relevancia', pagina: 1 };
let timer;

export const statusDot = (s) => `<i class="dot s-${esc(s).replace(/\s/g, '')}"></i>${esc(s)}`;

export function initProjects() {
  onTab('projetos', search);
  onUserChange(() => { reset(); if ($('#tab-projetos').classList.contains('active')) search(); });
  renderStaticFilters();
  $('#new-project').onclick = () => openProjectForm();
  $('#proj-order').onchange = (e) => { view.ordenar = e.target.value; search(); };
  $('#proj-clear').onclick = () => { reset(); search(); };
  $('#proj-toggle-filters').onclick = () => $('#proj-filters').classList.toggle('hidden');
  // CR-005: o filtro é aplicado na hora; "Ver N projetos" (ou Esc) fecha o painel. Fechar a cada clique impediria marcar
  // duas opções nos filtros de várias escolhas (Segmento, Tecnologias).
  $('#proj-ver').onclick = () => $('#proj-filters').classList.add('hidden');
  $('#proj-filters').addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.stopPropagation(); $('#proj-filters').classList.add('hidden'); $('#proj-toggle-filters').focus(); } });
  $('#proj-q').oninput = (e) => { view.filtros.q = e.target.value; view.pagina = 1; debounce(); };
  // Atalho vindo dos Insights: abre a exploração já filtrada.
  // CR-041: os filtros vindos de fora (chat, Insights, tags do card) entram antes da busca e aparecem nos controles e nos chips.
  document.addEventListener('radar:filtrar', (e) => { reset(); Object.assign(view.filtros, e.detail); renderStaticFilters(); search(); });
}

function reset() {
  view.filtros = empty();
  view.pagina = 1;
  $('#proj-q').value = '';
  renderStaticFilters();
}

function renderStaticFilters() {
  const f = view.filtros;
  const valores = currentUser()?.verValores;
  $('#proj-static').innerHTML = `
    <button type="button" class="mine${f.meus ? ' on' : ''}" data-meus aria-pressed="${f.meus}" title="Projetos em que você é o responsável ou em que enviou documentos (na demonstração, cada perfil representa uma pessoa responsável)">${icon('user', { size: 15 })}Meus projetos</button>
    <div class="seg" title="Como combinar as palavras da busca"><label><input type="radio" name="modoTexto" value="todas"${f.modoTexto === 'todas' ? ' checked' : ''}>todas as palavras</label>
      <label><input type="radio" name="modoTexto" value="qualquer"${f.modoTexto === 'qualquer' ? ' checked' : ''}>qualquer</label></div>
    <div class="field-icon"><i>${icon('building', { size: 15 })}</i><input data-f="cliente" value="${esc(f.cliente)}" placeholder="Cliente"></div>
    <div class="range" title="Prazo em meses">${icon('clock', { size: 15 })}<input data-f="prazoMin" type="number" min="0" value="${esc(f.prazoMin)}" placeholder="meses de"><input data-f="prazoMax" type="number" min="0" value="${esc(f.prazoMax)}" placeholder="até"></div>
    ${valores ? `<div class="range" title="Valor em R$">${icon('money', { size: 15 })}<input data-f="valorMin" type="number" min="0" value="${esc(f.valorMin)}" placeholder="R$ de"><input data-f="valorMax" type="number" min="0" value="${esc(f.valorMax)}" placeholder="até"></div>` : ''}
    <div class="range" title="Data de referência">${icon('calendar', { size: 15 })}<input data-f="dataDe" type="date" value="${esc(f.dataDe)}"><input data-f="dataAte" type="date" value="${esc(f.dataAte)}"></div>
    <div class="range" title="Citado nos documentos">${icon('tag', { size: 15 })}<select data-f="entidadeTipo"><option value="">Citado…</option>${Object.entries(ENTITY_TYPES).map(([k, v]) => `<option value="${k}"${f.entidadeTipo === k ? ' selected' : ''}>${v}</option>`).join('')}</select><input data-f="entidadeValor" value="${esc(f.entidadeValor)}" placeholder="ex.: Marina"></div>`;
  $$('[data-f]', $('#proj-static')).forEach((el) => (el.oninput = () => { f[el.dataset.f] = el.value; view.pagina = 1; debounce(); }));
  $$('input[name=modoTexto]').forEach((el) => (el.onchange = () => { f.modoTexto = el.value; search(); }));
  $('[data-meus]').onclick = (e) => { f.meus = !f.meus; e.currentTarget.classList.toggle('on', f.meus); e.currentTarget.setAttribute('aria-pressed', f.meus); view.pagina = 1; search(); };
}

const debounce = () => { clearTimeout(timer); timer = setTimeout(search, 300); };

function query() {
  const p = new URLSearchParams({ userId: userId(), ordenar: view.ordenar, pagina: view.pagina, tamanho: PAGE_SIZE });
  for (const [k, v] of Object.entries(view.filtros)) {
    if (Array.isArray(v)) { if (v.length) p.set(k, v.join(',')); } else if (typeof v === 'boolean') { if (v) p.set(k, '1'); } else if (v !== '' && v != null) p.set(k, v);
  }
  return p;
}

// CR-041: só a resposta da busca mais recente é desenhada (abrir a aba e aplicar um filtro disparam duas buscas;
// sem isso, a primeira, sem filtro, podia chegar depois e apagar o resultado filtrado).
let ultimaBusca = 0;
async function search() {
  const minha = ++ultimaBusca;
  // Cadastro de projeto só para o gestor (UC07.5).
  $('#new-project').classList.toggle('hidden', !pode('cadastrarProjeto'));
  // Ordenar por valor só para quem vê valores (o servidor já ignora para os demais).
  const optValor = $('#proj-order option[value="valor"]');
  optValor.hidden = optValor.disabled = !currentUser()?.verValores;
  if (optValor.disabled && view.ordenar === 'valor') { view.ordenar = 'relevancia'; $('#proj-order').value = 'relevancia'; }
  const r = await api(`/api/projetos?${query()}`);
  if (minha !== ultimaBusca) return;
  renderFacets(r.facetas);
  renderResults(r);
  renderChips();
}

// CR-013: filtros ativos como chips acima da lista, cada um com X para tirar; "Limpar tudo" no fim.
const ROTULO_FILTRO = { segmentos: 'Segmento', status: 'Status', tecnologias: 'Tecnologia', servicos: 'Serviço', tiposDocumento: 'Documento', cliente: 'Cliente', prazoMin: 'Prazo de', prazoMax: 'Prazo até', valorMin: 'Valor de', valorMax: 'Valor até', dataDe: 'Desde', dataAte: 'Até', entidadeValor: 'Citado' };
function renderChips() {
  const f = view.filtros;
  const chips = [];
  if (f.meus) chips.push({ k: 'meus', rot: 'Meus projetos' });
  for (const [k, rot] of Object.entries(ROTULO_FILTRO)) {
    const v = f[k];
    if (Array.isArray(v)) v.forEach((x) => chips.push({ k, v: x, rot: `${rot}: ${k === 'tiposDocumento' ? tipoLabel(x) : x}` }));
    else if (v) chips.push({ k, rot: `${rot}: ${k.startsWith('data') ? String(v).split('-').reverse().join('/') : v}` });
  }
  $('#proj-chips').innerHTML = chips.length ? `${chips.map((c, i) => `<span class="fchip">${esc(c.rot)}<button type="button" data-tirar="${i}" title="Tirar este filtro" aria-label="Tirar o filtro ${esc(c.rot)}">${icon('x', { size: 12 })}</button></span>`).join('')}
    <button type="button" class="link-btn" data-tirar="todos">Limpar tudo</button>` : '';
  $$('[data-tirar]', $('#proj-chips')).forEach((b) => (b.onclick = () => {
    if (b.dataset.tirar === 'todos') { const q = f.q; reset(); view.filtros.q = q; $('#proj-q').value = q; search(); return; }
    const c = chips[Number(b.dataset.tirar)];
    if (c.k === 'meus') f.meus = false; else if (Array.isArray(f[c.k])) f[c.k].splice(f[c.k].indexOf(c.v), 1); else f[c.k] = '';
    if (c.k === 'entidadeValor') f.entidadeTipo = '';
    view.pagina = 1;
    renderStaticFilters();
    search();
  }));
}

function renderFacets(facetas) {
  const f = view.filtros;
  $('#proj-facets').innerHTML = FACETS.map(([key, label, modeKey]) => {
    const counts = new Map((facetas[key] ?? []).map((x) => [x.valor, x.n]));
    for (const v of f[key]) if (!counts.has(v)) counts.set(v, 0);
    if (!counts.size) return '';
    const mode = modeKey ? `<span class="mode" title="Projetos com todas as marcadas ou com qualquer uma delas"><label><input type="radio" name="${modeKey}" value="todas"${f[modeKey] === 'todas' ? ' checked' : ''}>todas</label><label><input type="radio" name="${modeKey}" value="qualquer"${f[modeKey] === 'qualquer' ? ' checked' : ''}>qualquer</label></span>` : '';
    return `<fieldset><legend>${label}${mode}</legend>${[...counts.entries()].map(([v, n]) => `
      <label class="facet${f[key].includes(v) ? ' on' : ''}"><input type="checkbox" data-facet="${key}" value="${esc(v)}"${f[key].includes(v) ? ' checked' : ''}>
        <span>${esc(key === 'tiposDocumento' ? tipoLabel(v) : v)}</span><em>${n}</em></label>`).join('')}</fieldset>`;
  }).join('');
  $$('[data-facet]', $('#proj-facets')).forEach((el) => (el.onchange = () => {
    const list = f[el.dataset.facet];
    if (el.checked) list.push(el.value); else list.splice(list.indexOf(el.value), 1);
    view.pagina = 1;
    search();
  }));
  $$('#proj-facets input[type=radio]').forEach((el) => (el.onchange = () => { f[el.name] = el.value; search(); }));
}

function renderResults(r) {
  const active = Object.entries(view.filtros).filter(([k, v]) => k !== 'q' && (Array.isArray(v) ? v.length : v !== '' && v !== 'todas' && v !== false)).length;
  $('#proj-filter-count').textContent = active;
  $('#proj-filter-count').classList.toggle('hidden', !active);
  $('#proj-ver').textContent = `Ver ${r.total} projeto${r.total === 1 ? '' : 's'}`;
  const de = (r.pagina - 1) * r.tamanho + 1;
  const ate = Math.min(r.total, r.pagina * r.tamanho);
  $('#proj-summary').innerHTML = `${r.total > r.tamanho ? `${de}–${ate} de ` : ''}${r.total} projeto${r.total === 1 ? '' : 's'}<span title="Tempo da consulta no banco">${icon('clock', { size: 13 })}${r.tempoMs} ms</span>`;
  $('#proj-list').innerHTML = r.itens.length ? r.itens.map((p) => `
    <article class="pcard" data-id="${p.id}" tabindex="0">
      <div class="ptop"><span class="sub">${statusDot(p.status_proposta)}</span>
        <span class="icons">${p.confidencialidade === 'confidencial' ? `<span title="Confidencial">${icon('lock', { size: 15 })}</span>` : ''}${p.origem !== 'seed' ? `<span title="${p.origem === 'upload' ? 'Criado por upload' : 'Cadastrado manualmente'}">${icon(p.origem === 'upload' ? 'upload' : 'edit', { size: 15 })}</span>` : ''}</span></div>
      <h4 title="${esc(p.tecnologias.length ? `Tecnologias: ${p.tecnologias.join(', ')}` : '')}">${esc(p.titulo)}</h4>
      <p class="sub">${esc(p.cliente)}${p.projetos_cliente > 1 ? ` <span class="relacao" title="Projetos com este cliente na base">· ${p.projetos_cliente} projetos com o cliente</span>` : ''}</p>
      <p class="pseg"><span class="seg-ico" aria-hidden="true">${icon(iconeSegmento(p.segmento), { size: 14 })}</span>${esc(p.segmento ?? 'Segmento não informado')}</p>
      ${p.trecho ? `<p class="snippet">${highlight(p.trecho)}</p>` : ''}
      <div class="pfoot">
        <span class="pmeta">${porte(p)}${p.prazo_meses ? `<span title="Prazo">${icon('clock', { size: 14 })}${String(p.prazo_meses).replace('.', ',')} m</span>` : ''}${p.data_referencia ? `<span title="Data de referência: ${esc(p.data_referencia.split('-').reverse().join('/'))}">${icon('calendar', { size: 14 })}${p.data_referencia.length >= 7 ? `${MESES[Number(p.data_referencia.slice(5, 7)) - 1]}/` : ''}${p.data_referencia.slice(0, 4)}</span>` : ''}</span>
        ${kit(p)}
      </div>
    </article>`).join('') : `<div class="empty-state">${icon('search', { size: 32 })}<p>Nenhum projeto ${active || view.filtros.q ? 'com esses critérios' : 'cadastrado ainda'}</p>${view.filtros.meus ? '<p class="muted small">"Meus projetos" mostra os projetos em que você é o responsável ou em que enviou documentos.</p>' : ''}
      <div class="suggest">${active ? `<button type="button" class="chip-btn" data-empty="limpar">${icon('x', { size: 14 })}Limpar filtros</button>` : ''}
        ${view.filtros.q ? `<button type="button" class="chip-btn" data-empty="perguntar">${icon('message', { size: 14 })}Perguntar ao Radar sobre “${esc(view.filtros.q)}”</button>` : ''}
        ${pode('cadastrarProjeto') ? `<button type="button" class="chip-btn" data-empty="novo">${icon('plus', { size: 14 })}Cadastrar projeto</button>` : ''}</div></div>`;
  $$('[data-empty]', $('#proj-list')).forEach((b) => (b.onclick = () => {
    if (b.dataset.empty === 'limpar') { const q = view.filtros.q; reset(); view.filtros.q = q; $('#proj-q').value = q; search(); }
    if (b.dataset.empty === 'perguntar') { openTab('busca'); $('#query').value = view.filtros.q; $('#ask').requestSubmit(); }
    if (b.dataset.empty === 'novo') openProjectForm();
  }));
  $$('.pcard', $('#proj-list')).forEach((c) => {
    c.onclick = () => openProject(c.dataset.id);
    c.onkeydown = (e) => e.key === 'Enter' && openProject(c.dataset.id);
  });
  renderPager(r);
}

// Card rápido (adendo 5): kit de documentos disponível e porte (valor para quem pode ver; faixa para os demais).
const KIT = [
  ['proposta_comercial', 'P', 'Proposta'], ['apresentacao_comercial', 'A', 'Apresentação'], ['estimativa_preliminar', 'E', 'Estimativa'],
  ['case_sucesso', 'C', 'Case'], ['transcricao_reuniao', 'T', 'Transcrição de reunião'], ['ata_validada', 'At', 'Ata'],
];
function kit(p) {
  const tem = new Set(p.tiposDocumento ?? []);
  const itens = KIT.filter(([t]) => tem.has(t));
  const outros = (p.tiposDocumento ?? []).filter((t) => !KIT.some(([k]) => k === t)).length;
  if (!itens.length && !outros) return `<span class="kit vazio" title="Sem documentos">${icon('file', { size: 14 })}0</span>`;
  return `<span class="kit" title="Documentos disponíveis: ${esc([...itens.map(([, , n]) => n), ...(outros ? [`+${outros} outro(s)`] : [])].join(', '))} · ${p.documentos} no total">${itens.map(([t, s]) => `<i class="k-${t === 'case_sucesso' ? 'case' : 'doc'}">${s}</i>`).join('')}${outros ? `<i>+${outros}</i>` : ''}</span>`;
}
function porte(p) {
  if (p.valor != null) return `<span title="Valor">${icon('money', { size: 14 })}${brl(p.valor)}</span>`;
  if (p.faixaValor) return `<span class="faixa" title="Porte: ${esc(p.faixaValor.descricao)}">${icon('money', { size: 14 })}Porte ${esc(p.faixaValor.sigla)}</span>`;
  return '';
}

// Primeira, última e vizinhas da atual; o resto vira reticências.
function renderPager(r) {
  const pages = Math.ceil(r.total / r.tamanho);
  const cur = r.pagina;
  const nums = [...new Set([1, cur - 1, cur, cur + 1, pages])].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);
  const btn = (n, label, extra = '') => `<button type="button" data-p="${n}"${extra}>${label}</button>`;
  $('#proj-pages').innerHTML = pages > 1 ? [
    btn(cur - 1, icon('chevronRight', { size: 16 }), ` class="prev" aria-label="Página anterior"${cur === 1 ? ' disabled' : ''}`),
    ...nums.flatMap((n, i) => [...(i && n - nums[i - 1] > 1 ? ['<span class="gap">…</span>'] : []), btn(n, n, n === cur ? ' class="on" aria-current="page"' : ` aria-label="Página ${n}"`)]),
    btn(cur + 1, icon('chevronRight', { size: 16 }), ` aria-label="Próxima página"${cur === pages ? ' disabled' : ''}`),
  ].join('') : '';
  $$('[data-p]', $('#proj-pages')).forEach((b) => (b.onclick = () => {
    view.pagina = Number(b.dataset.p);
    search().then(() => $('#tab-projetos').scrollIntoView({ block: 'start', behavior: 'smooth' }));
  }));
}

// ---------- Detalhe do projeto ----------
const ORIGEM = { seed: 'Base piloto', upload: 'Criado por upload', manual: 'Cadastro manual' };
const kb = (n) => (n == null ? '' : n < 1024 ? `${n} B` : `${Math.round(n / 1024)} KB`);
const when = (iso) => (iso ? new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : '—');

// Campos da ficha que editam no lugar (V0.0.2): passar o mouse mostra o lápis; clicar troca o texto por um campo.
// tipo: texto | numero | data | url | area (texto longo) | lista (opções fixas) | sugestao (lista com opções; o gestor cria novas)
const CAMPOS_PROJETO = {
  titulo: { rotulo: 'Título', tipo: 'texto' },
  cliente: { rotulo: 'Cliente', tipo: 'sugestao', opcoes: () => state.ctx.catalogo.clientes, novo: 'cadastrarCliente' },
  segmento: { rotulo: 'Segmento', tipo: 'sugestao', opcoes: () => state.ctx.catalogo.segmentos.map((s) => s.nome), novo: 'criarTermo' },
  area: { rotulo: 'Área', tipo: 'texto' },
  dono: { rotulo: 'Responsável', tipo: 'texto' },
  status_proposta: { rotulo: 'Status', tipo: 'lista', opcoes: () => state.ctx.catalogo.status },
  confidencialidade: { rotulo: 'Acesso', tipo: 'lista', opcoes: () => currentUser()?.confidencialidades ?? ['interna'] },
  prazo_meses: { rotulo: 'Prazo (meses)', tipo: 'numero' },
  valor: { rotulo: 'Valor (R$)', tipo: 'numero' },
  margem: { rotulo: 'Margem (%)', tipo: 'numero', paraTela: (v) => (v == null ? '' : Math.round(v * 1000) / 10), paraBanco: (v) => (v === '' ? '' : Number(v) / 100) },
  data_referencia: { rotulo: 'Data de referência', tipo: 'data' },
  link_sharepoint: { rotulo: 'Pasta no SharePoint', tipo: 'url' },
  objetivo: { rotulo: 'Objetivo', tipo: 'area' },
  descricao: { rotulo: 'Contexto', tipo: 'area' },
};
const ROTULO_HIST = { ...Object.fromEntries(Object.entries(CAMPOS_PROJETO).map(([k, v]) => [k, v.rotulo.replace(/ \(.*\)$/, '')])), tecnologias: 'Tecnologias', servicos: 'Serviços', teste: 'Marcado como teste' };

// Quem fez: na demonstração, cada perfil representa uma pessoa.
const autorDe = (id) => {
  if (id === '__base') return 'Base piloto';
  const u = state.ctx.usuarios.find((x) => x.id === id);
  return u?.pessoa ?? u?.nome ?? userName(id) ?? 'Alguém';
};
const iniciais = (nome) => String(nome).split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase();

// Linha do tempo da ficha: comentários como balões de conversa e alterações como cartões com antes → depois.
// Alterações do mesmo autor no mesmo minuto (uma mesma edição) ficam num cartão só.
function linhaDoTempo(historico) {
  const grupos = [];
  for (const h of historico) {
    const ult = grupos.at(-1);
    const mesmo = ult && ult.tipo === 'edicao' && h.acao === 'editar' && h.entidade === 'projeto' && ult.usuario_id === h.usuario_id && ult.em.slice(0, 16) === h.em.slice(0, 16);
    if (mesmo) ult.itens.push(h);
    else grupos.push(h.acao === 'comentar' ? { tipo: 'comentario', ...h } : h.acao === 'editar' && h.entidade === 'projeto' ? { tipo: 'edicao', usuario_id: h.usuario_id, em: h.em, itens: [h] } : { tipo: 'evento', ...h });
  }
  const valor = (campo, v) => {
    if (v == null || v === '') return '<span class="muted">vazio</span>';
    if (campo === 'margem') return `${Math.round(Number(v) * 100)}%`;
    if (campo === 'valor') return brl(Number(v));
    if (campo === 'prazo_meses') return `${String(v).replace('.', ',')} meses`;
    if (campo === 'data_referencia') return dateBR(v);
    return esc(String(v).length > 160 ? `${String(v).slice(0, 160)}…` : v);
  };
  const lista = (a, b) => {
    const antes = String(a ?? '').split(',').map((x) => x.trim()).filter(Boolean);
    const depois = String(b ?? '').split(',').map((x) => x.trim()).filter(Boolean);
    const add = depois.filter((x) => !antes.includes(x));
    const rem = antes.filter((x) => !depois.includes(x));
    return `${add.map((x) => `<span class="tl-chip add">+ ${esc(x)}</span>`).join('')}${rem.map((x) => `<span class="tl-chip rem">− ${esc(x)}</span>`).join('')}` || '<span class="muted">sem mudança</span>';
  };
  const cab = (id, em, txt) => `<div class="tl-cab"><span class="tl-av">${esc(iniciais(autorDe(id)))}</span><b>${esc(autorDe(id))}</b><span class="muted">${txt}</span><time>${when(em)}</time></div>`;
  return grupos.map((g) => {
    if (g.tipo === 'comentario') return `<li class="tl-item tl-com">${cab(g.usuario_id, g.em, 'comentou')}<div class="tl-balao">${esc(g.depois ?? '')}</div></li>`;
    if (g.tipo === 'edicao') {
      return `<li class="tl-item tl-ed">${cab(g.usuario_id, g.em, `editou ${g.itens.length > 1 ? `${g.itens.length} campos` : 'um campo'}`)}<div class="tl-card">${g.itens.map((h) => `<div class="tl-mud">
        <span class="tl-campo">${esc(ROTULO_HIST[h.campo] ?? h.campo)}</span>
        ${['tecnologias', 'servicos'].includes(h.campo) ? `<span class="tl-chips">${lista(h.antes, h.depois)}</span>`
          : `<span class="tl-antes" title="Antes">${valor(h.campo, h.antes)}</span><span class="tl-seta" aria-label="mudou para">→</span><span class="tl-depois" title="Depois">${valor(h.campo, h.depois)}</span>`}</div>`).join('')}</div></li>`;
    }
    const txt = { criar: 'criou', exportar: 'exportou', excluir: 'excluiu', sugerir: 'sugeriu' }[g.acao] ?? g.acao;
    const doc = g.entidade === 'documento';
    return `<li class="tl-item tl-ev">${cab(g.usuario_id, g.em, `${txt}${doc ? ' um documento' : g.acao === 'criar' ? ' o projeto' : ''}`)}<div class="tl-ev-txt">${icon(doc ? 'file' : g.acao === 'exportar' ? 'download' : 'info', { size: 13 })}${esc([g.campo && !['titulo', 'nome'].includes(String(g.campo).split(' · ').pop()) ? ROTULO_HIST[g.campo] ?? g.campo : '', g.depois ?? g.antes ?? ''].filter(Boolean).join(': '))}</div></li>`;
  }).join('');
}

// Modal grande: conteúdo do projeto à esquerda, ficha e conexões à direita.
export async function openProject(id) {
  const d = await api(`/api/projeto?id=${encodeURIComponent(id)}&userId=${userId()}`);
  const p = d.projeto;
  const valores = currentUser()?.verValores;
  const q = d.qualidade;
  const docTitle = new Map(d.documentos.map((doc) => [doc.id, doc.titulo]));
  const ents = (tipo) => d.entidades[tipo] ?? [];
  const fontes = (e) => e.documentos.map((id) => `<a href="#" data-doc="${id}">${esc(docTitle.get(id) ?? id)}</a>`).join(', ');

  // Campo editável no lugar: o lápis aparece ao passar o mouse; vazio mostra "Adicionar …".
  const ed = (campo, html) => `<span class="ed" data-ed="${campo}">${html || `<span class="ed-vazio">Adicionar ${esc(CAMPOS_PROJETO[campo].rotulo.toLowerCase().replace(/ \(.*\)$/, ''))}</span>`}<button type="button" class="ed-btn" data-ed-btn="${campo}" title="Editar ${esc(CAMPOS_PROJETO[campo].rotulo)}" aria-label="Editar ${esc(CAMPOS_PROJETO[campo].rotulo)}">${icon('edit', { size: 13 })}</button></span>`;
  // Resultados, lições, riscos e documentos: seções que recolhem e já vêm fechadas (o título mostra quantos itens há).
  const recolhivel = (ic, label, n, corpo, id = '') => `<details class="pd-sec pd-acc"${id ? ` id="${id}"` : ''}><summary><h5 class="sect-title">${icon(ic, { size: 16 })}${label}<em>${n}</em><span class="pd-acc-chev">${icon('chevronDown', { size: 16 })}</span></h5></summary>${corpo}</details>`;
  // Resultados, lições e riscos com o trecho de onde vieram.
  const insight = (tipo, ic, label) => (ents(tipo).length ? recolhivel(ic, label, ents(tipo).length,
    `<ul class="pd-insights ${tipo}">${ents(tipo).map((e) => `<li><b>${esc(e.valor)}</b>${e.trecho && e.trecho !== e.valor ? `<q>${esc(e.trecho)}</q>` : ''}<small>${icon('file', { size: 12 })}${fontes(e)}</small></li>`).join('')}</ul>`) : '');
  const tags = (list, cls = '') => list.map((t) => `<span class="chip${cls}">${esc(t)}</span>`).join('');
  const side = (ic, label, body, n) => (body ? `<section class="pd-card"><h6>${icon(ic, { size: 15 })}${label}${n ? `<em>${n}</em>` : ''}</h6>${body}</section>` : '');
  // Card lateral que recolhe e vem fechado (Tecnologias, Palavras-chave, Projetos parecidos).
  const sideAcc = (ic, label, body, n, extra = '') => (body ? `<details class="pd-card pd-card-acc"${extra}><summary><h6>${icon(ic, { size: 15 })}${label}${n ? `<em>${n}</em>` : ''}<span class="pd-acc-chev">${icon('chevronDown', { size: 14 })}</span></h6></summary>${body}</details>` : '');
  // Tags editáveis: lápis abre o editor de chips (consultor escolhe entre as existentes; gestor também cria novas).
  const tagsEd = (campo, lista, cls = '') => `<div class="tags-ed" data-tags="${campo}"><div class="chips">${tags(lista, cls) || '<span class="ed-vazio">Nenhuma ainda</span>'}</div><button type="button" class="ed-btn" data-tags-btn="${campo}" title="Editar ${campo === 'tecnologias' ? 'tecnologias' : 'serviços'}" aria-label="Editar ${campo === 'tecnologias' ? 'tecnologias' : 'serviços'}">${icon('edit', { size: 13 })}</button></div>`;
  const row = (label, value) => `<dt>${label}</dt><dd>${value || '—'}</dd>`;

  $('#project-body').innerHTML = `
    <header class="dlg-head pd-head">
      <div class="pd-title">
        <span class="sub">${p.id} · ${statusDot(p.status_proposta)}${p.confidencialidade === 'confidencial' ? ` · ${icon('lock', { size: 13 })}confidencial` : ''}</span>
        <h3>${ed('titulo', esc(p.titulo))}</h3>
        <span class="sub">${icon('building', { size: 14 })}${ed('cliente', esc(p.cliente))} · ${ed('segmento', esc(p.segmento ?? ''))}</span>
      </div>
      <div class="actions">
        <button id="pd-export" class="btn sm" title="Gerar apresentação ou resumo executivo">${icon('download', { size: 15 })}<span>Exportar</span></button>
        <button id="pd-ask" class="btn sm ghost" title="Perguntar ao Radar sobre este projeto">${icon('message', { size: 15 })}<span>Perguntar</span></button>
        <button id="pd-base" class="btn sm ghost${pode('cadastrarProjeto') ? '' : ' hidden'}" title="Usar como base para nova proposta">${icon('duplicate', { size: 15 })}<span>Usar como base</span></button>
        <button id="pd-upload" class="icon-btn" title="Enviar documento para este projeto">${icon('upload')}</button>
        <button id="pd-edit" class="icon-btn" title="Editar tudo num formulário">${icon('edit')}</button>
        ${pode('excluirProjeto') ? `<button id="pd-excluir" class="icon-btn pd-excluir" title="Excluir projeto (só gestor)" aria-label="Excluir projeto">${icon('trash')}</button>` : ''}
        <button id="pd-close" class="icon-btn" title="Fechar">${icon('x')}</button>
      </div>
    </header>
    <div class="pd-kpis">
      <div><small>${icon('clock', { size: 14 })}Prazo</small><b>${ed('prazo_meses', p.prazo_meses ? `${String(p.prazo_meses).replace('.', ',')} meses` : '')}</b></div>
      ${valores ? `<div><small>${icon('money', { size: 14 })}Valor</small><b>${ed('valor', p.valor ? brl(p.valor) : '')}</b><span class="sub">margem ${ed('margem', p.margem != null ? `${Math.round(p.margem * 100)}%` : '')}</span></div>`
        : `<div title="O preço e a margem da proposta não aparecem para o seu perfil"><small>${icon('lock', { size: 14 })}Valor</small><b>restrito</b></div>`}
      <div><small>${icon('user', { size: 14 })}Responsável</small><b>${ed('dono', esc(p.dono ?? ''))}</b></div>
      <div><small>${icon('calendar', { size: 14 })}Referência</small><b>${ed('data_referencia', p.data_referencia ? dateBR(p.data_referencia) : '')}</b></div>
      <div><small>${icon('files', { size: 14 })}Documentos</small><b>${d.documentos.length}</b></div>
      <div title="${q.faltando.length ? `Falta: ${esc(q.faltando.join(', '))}` : 'Cadastro completo'}"><small>${icon('checkCircle', { size: 14 })}Cadastro</small><b>${q.percentual}%</b><span class="bar"><i style="width:${q.percentual}%"></i></span></div>
    </div>
    ${d.conflitos.map((c) => `<p class="alert warn">${icon('alert', { size: 16 })}<span><b>${c.campo === 'prazo_meses' ? 'Prazo' : 'Valor'} diverge entre fontes.</b> Prevalece ${esc(tipoLabel(c.escolhido.tipo))}: ${c.campo === 'valor' ? brl(c.escolhido.valor) : `${c.escolhido.valor} meses`}.
      <small class="pd-fontes">${c.fontes.map((f) => `${esc(f.fonte === 'cadastro' ? 'Cadastro' : docTitle.get(f.fonte) ?? f.fonte)}: ${c.campo === 'valor' ? brl(f.valor) : `${f.valor} meses`}`).join(' · ')}</small></span></p>`).join('')}
    <div class="pd-grid">
      <div class="pd-main">
        <section class="pd-sec"><h5 class="sect-title">${icon('trending', { size: 16 })}Objetivo</h5><div class="pd-text">${ed('objetivo', p.objetivo ? md(p.objetivo) : '')}</div></section>
        <section class="pd-sec"><h5 class="sect-title">${icon('info', { size: 16 })}Contexto</h5><div class="pd-text">${ed('descricao', p.descricao ? md(p.descricao) : '')}</div></section>
        ${insight('kpi', 'chart', 'Resultados')}${insight('licao', 'bulb', 'Lições aprendidas')}${insight('risco', 'alert', 'Riscos')}
        ${recolhivel('files', 'Documentos', d.documentos.length, `
          <div class="pd-envio" id="pd-envio"><label class="btn sm">${icon('upload', { size: 14 })}Enviar arquivo para este projeto<input type="file" id="pd-file" multiple hidden></label><span class="muted small">O arquivo já entra neste projeto; você só confere os dados.</span></div>
          <ul class="pd-envios" id="pd-envios"></ul>
          ${d.documentos.length ? `<ul class="pd-docs">${d.documentos.map((doc) => `<li>
            <div class="pd-doc-top"><a href="#" data-doc="${doc.id}">${icon('file', { size: 16 })}${esc(doc.titulo)}</a>${trustBadge(doc.nivel_confianca)}<button type="button" class="icon-btn sm" data-edit-doc="${doc.id}" title="Editar informações" aria-label="Editar informações de ${esc(doc.titulo)}">${icon('edit', { size: 15 })}</button><button type="button" class="icon-btn sm" data-dl="${doc.id}" title="Baixar arquivo" aria-label="Baixar ${esc(doc.titulo)}">${icon('download', { size: 16 })}</button></div>
            <span class="sub">${esc(tipoLabel(doc.tipo_documental))}${doc.status_documento ? ` · ${esc(doc.status_documento.replace(/_/g, ' '))}` : ''} · ${dateBR(doc.data_conteudo)}${doc.formato ? ` · ${esc(doc.formato.toUpperCase())}` : ''}${doc.tamanho_bytes ? ` · ${kb(doc.tamanho_bytes)}` : ''}
              ${doc.contem_pii ? ` · <span title="Contém dados pessoais">${icon('shield', { size: 13 })}dados pessoais</span>` : ''}${doc.origem === 'upload' ? ` · ${icon('upload', { size: 13 })}enviado${doc.revisado_por ? ` e revisado por ${esc(doc.revisado_por)}` : ''}` : ''}</span>
            ${doc.autor || doc.versao || doc.link_origem || doc.reutilizavel ? `<div class="pd-doc-meta">
              ${doc.reutilizavel ? `<span class="tag reuse" title="Marcado na revisão como bom modelo para novas propostas">${icon('star', { size: 12 })}bom modelo</span>` : ''}
              ${doc.autor ? `<span title="Autor">${icon('user', { size: 13 })}${esc(doc.autor)}</span>` : ''}
              ${doc.versao ? `<span title="Versão">${icon('history', { size: 13 })}${esc(doc.versao)}</span>` : ''}
              ${doc.link_origem ? `<a href="${esc(doc.link_origem)}" target="_blank" rel="noopener">${icon('link', { size: 13 })}original</a>` : ''}
            </div>` : ''}
            ${doc.resumo ? `<p>${esc(doc.resumo)}</p>` : ''}
            ${doc.observacoes ? `<p class="pd-note" title="Nota de quem revisou o envio">${icon('info', { size: 13 })} ${esc(doc.observacoes)}</p>` : ''}
            ${doc.palavras_chave?.length ? `<div class="chips">${tags(doc.palavras_chave.slice(0, 8))}</div>` : ''}
          </li>`).join('')}</ul>` : `<p class="muted">Nenhum documento visível para o seu perfil. <a href="#" id="pd-upload-2">Enviar o primeiro</a></p>`}`, 'pd-docs-sec')}
        <section class="pd-sec pd-tl">
          <h5 class="sect-title">${icon('message', { size: 16 })}Comentários e histórico</h5>
          <form class="tl-form" id="pd-comentar">
            <span class="tl-av">${esc(iniciais(autorDe(userId())))}</span>
            <textarea name="texto" rows="2" maxlength="2000" placeholder="Escreva um comentário sobre o projeto (ex.: combinado com o cliente, próximos passos)…" aria-label="Comentário"></textarea>
            <button type="submit" class="btn sm primary" disabled>${icon('send', { size: 14 })}Comentar</button>
          </form>
          ${d.historico.length ? `<ul class="tl">${linhaDoTempo(d.historico)}</ul>` : '<p class="muted small">Nenhum comentário ou alteração ainda.</p>'}
        </section>
      </div>
      <aside class="pd-side">
        ${side('briefcase', 'Ficha', `<dl class="pd-dl">
          ${row('Cliente', esc(p.cliente))}${row('Segmento', esc(p.segmento ?? ''))}${row('Área', ed('area', esc(p.area ?? '')))}
          ${row('Status', ed('status_proposta', statusDot(p.status_proposta)))}${row('Acesso', ed('confidencialidade', esc(p.confidencialidade)))}${row('Origem', esc(ORIGEM[p.origem] ?? p.origem))}
          ${row('Criado por', p.origem === 'seed' ? 'Base piloto' : `${esc(autorDe(p.criado_por))} · ${when(p.criado_em)}`)}
          ${row('Atualizado', when(p.atualizado_em))}
          ${row('Pasta', ed('link_sharepoint', p.link_sharepoint ? `<a href="${esc(p.link_sharepoint)}" target="_blank" rel="noopener">${icon('link', { size: 13 })}SharePoint</a>` : ''))}
        </dl>`)}
        ${sideAcc('cpu', 'Tecnologias', tagsEd('tecnologias', p.tecnologias), p.tecnologias.length, ' data-acc="tecnologias"')}
        ${side('layers', 'Serviços', tagsEd('servicos', p.servicos, ' alt'), p.servicos.length)}
        ${side('users', 'Pessoas', ents('pessoa').length ? `<ul class="pd-list">${ents('pessoa').map((e) => `<li>${esc(e.valor)}</li>`).join('')}</ul>` : '', ents('pessoa').length)}
        ${side('building', 'Organizações', ents('organizacao').length ? `<div class="chips">${tags(ents('organizacao').map((e) => e.valor))}</div>` : '', ents('organizacao').length)}
        ${sideAcc('tag', 'Palavras-chave', ents('palavra_chave').length ? `<div class="chips">${tags(ents('palavra_chave').map((e) => e.valor))}</div>` : '', ents('palavra_chave').length)}
        ${sideAcc('link', 'Projetos parecidos', d.relacionados.length ? `<ul class="pd-related">${d.relacionados.map((r) => `<li><a href="#" data-proj="${r.id}" title="${esc(r.motivo)}">${esc(r.titulo)}</a><small>${esc(r.cliente)} · ${matchLabel(r.similaridade)}</small></li>`).join('')}</ul>` : '', d.relacionados.length)}
        ${q.faltando.length ? side('alert', 'Falta no cadastro', `<ul class="pd-list muted">${q.faltando.map((f) => `<li>${esc(f.replace(/_/g, ' '))}</li>`).join('')}</ul><button id="pd-complete" class="link-btn">Completar cadastro</button>`) : ''}
      </aside>
    </div>`;
  const body = $('#project-body');
  body.scrollTop = 0;
  $$('[data-doc]', body).forEach((a) => (a.onclick = (e) => { e.preventDefault(); openDoc(a.dataset.doc); }));
  $$('[data-dl]', body).forEach((b) => (b.onclick = () => downloadDoc(b.dataset.dl)));
  $$('[data-edit-doc]', body).forEach((b) => (b.onclick = () => openDocumentForm(b.dataset.editDoc)));
  $$('[data-proj]', body).forEach((a) => (a.onclick = (e) => { e.preventDefault(); openProject(a.dataset.proj); }));
  const close = () => $('#project-dialog').close();
  const edit = () => { close(); openProjectForm(p); };
  // Grava uma mudança e redesenha a ficha (o histórico ganha o cartão com antes → depois).
  const salvar = async (dados, aviso) => {
    try {
      const r = await api('/api/projeto/atualizar', { id: p.id, userId: userId(), dados });
      if (r.alteracoes) toast(aviso);
      state.ctx = await api(`/api/contexto?userId=${userId()}`);
      await openProject(p.id);
      if (!$('#tab-projetos').classList.contains('hidden')) search();
      return true;
    } catch (err) { toast(err.message, 'error'); return false; }
  };
  // Edição no lugar de um campo.
  $$('[data-ed-btn]', body).forEach((b) => (b.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const campo = b.dataset.edBtn;
    const cfg = CAMPOS_PROJETO[campo];
    const alvo = b.closest('.ed');
    const atual = cfg.paraTela ? cfg.paraTela(p[campo]) : p[campo] ?? '';
    const listaId = `ed-lista-${campo}`;
    const opcoes = cfg.opcoes?.() ?? [];
    const controle = cfg.tipo === 'area' ? `<textarea name="v" rows="4">${esc(atual)}</textarea>`
      : cfg.tipo === 'lista' ? `<select name="v">${opcoes.map((o) => `<option${String(o) === String(atual) ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select>`
      : `<input name="v" type="${{ numero: 'number', data: 'date', url: 'url' }[cfg.tipo] ?? 'text'}"${cfg.tipo === 'numero' ? ' step="any" min="0"' : ''} value="${esc(atual)}"${cfg.tipo === 'sugestao' ? ` list="${listaId}"` : ''}>${cfg.tipo === 'sugestao' ? `<datalist id="${listaId}">${opcoes.map((o) => `<option value="${esc(o)}">`).join('')}</datalist>` : ''}`;
    alvo.classList.add('editando');
    alvo.innerHTML = `<form class="ed-form">${controle}<button type="submit" class="icon-btn sm ed-ok" title="Salvar (Enter)" aria-label="Salvar">${icon('check', { size: 14 })}</button><button type="button" class="icon-btn sm ed-cancel" title="Cancelar (Esc)" aria-label="Cancelar">${icon('x', { size: 14 })}</button>${cfg.tipo === 'sugestao' && !pode(cfg.novo) ? `<small class="ed-dica muted">Escolha uma opção da lista${cfg.novo === 'criarTermo' ? '; só o gestor cria opções novas' : '; só o gestor cadastra clientes novos'}.</small>` : ''}</form>`;
    const form = $('form', alvo);
    const input = form.v;
    input.focus();
    input.select?.();
    const cancelar = () => openProject(p.id);
    $('.ed-cancel', form).onclick = cancelar;
    form.onkeydown = (ev) => {
      if (ev.key === 'Escape') { ev.preventDefault(); ev.stopPropagation(); cancelar(); }
      if (ev.key === 'Enter' && cfg.tipo === 'area' && (ev.ctrlKey || ev.metaKey)) { ev.preventDefault(); form.requestSubmit(); }
    };
    form.onsubmit = async (ev) => {
      ev.preventDefault();
      let v = input.value.trim();
      if (cfg.tipo === 'sugestao' && v && !opcoes.includes(v) && !pode(cfg.novo)) { toast(cfg.novo === 'criarTermo' ? 'Escolha uma opção da lista: só o gestor cria opções novas.' : 'Escolha um cliente da lista: só o gestor cadastra clientes novos.', 'error'); return; }
      if (cfg.paraBanco) v = cfg.paraBanco(v);
      await salvar({ [campo]: v }, `${cfg.rotulo.replace(/ \(.*\)$/, '')} atualizado`);
    };
  }));
  // Edição das tags (tecnologias e serviços) no próprio card.
  $$('[data-tags-btn]', body).forEach((b) => (b.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const campo = b.dataset.tagsBtn;
    const box = b.closest('.tags-ed');
    const catalogo = state.ctx.catalogo[campo].map((t) => t.nome);
    const gestor = pode('criarTermo');
    const lista = [...p[campo]];
    const pintar = () => {
      box.classList.add('editando');
      box.innerHTML = `<div class="chips">${lista.map((t, i) => `<span class="chip${campo === 'servicos' ? ' alt' : ''}">${esc(t)}<button type="button" class="chip-x" data-tirar="${i}" title="Tirar ${esc(t)}" aria-label="Tirar ${esc(t)}">${icon('x', { size: 11 })}</button></span>`).join('')}</div>
        <form class="tags-form"><input name="t" list="tags-${campo}" placeholder="${gestor ? 'Escolha ou crie uma opção' : 'Escolha uma opção da lista'}" aria-label="Adicionar"><datalist id="tags-${campo}">${catalogo.filter((t) => !lista.includes(t)).map((t) => `<option value="${esc(t)}">`).join('')}</datalist><button type="submit" class="icon-btn sm" title="Adicionar (Enter)" aria-label="Adicionar">${icon('plus', { size: 14 })}</button></form>
        <small class="muted">${gestor ? 'Se não existir na lista, a opção é criada.' : 'Só o gestor cria opções novas.'}</small>
        <div class="tags-acoes"><button type="button" class="btn sm" data-t="cancelar">Cancelar</button><button type="button" class="btn sm primary" data-t="salvar">Salvar</button></div>`;
      $$('[data-tirar]', box).forEach((x) => (x.onclick = () => { lista.splice(Number(x.dataset.tirar), 1); pintar(); }));
      const form = $('.tags-form', box);
      form.onsubmit = (ev) => {
        ev.preventDefault();
        const t = form.t.value.trim();
        if (!t) return;
        const existente = catalogo.find((c) => c.toLowerCase() === t.toLowerCase());
        if (!existente && !gestor) { toast('Escolha uma opção da lista: só o gestor cria opções novas.', 'error'); return; }
        const nome = existente ?? t;
        if (!lista.includes(nome)) lista.push(nome);
        pintar();
        $('.tags-form input', box).focus();
      };
      form.onkeydown = (ev) => { if (ev.key === 'Escape') { ev.preventDefault(); ev.stopPropagation(); openProject(p.id); } };
      $('[data-t="cancelar"]', box).onclick = () => openProject(p.id);
      $('[data-t="salvar"]', box).onclick = () => salvar({ [campo]: lista }, `${campo === 'tecnologias' ? 'Tecnologias atualizadas' : 'Serviços atualizados'}`);
      $('.tags-form input', box).focus();
    };
    box.closest('details')?.setAttribute('open', '');
    pintar();
  }));
  // Comentários: entram na linha do tempo, acima do histórico.
  const fc = $('#pd-comentar');
  fc.texto.oninput = () => { $('button', fc).disabled = !fc.texto.value.trim(); };
  fc.texto.onkeydown = (ev) => { if (ev.key === 'Enter' && (ev.ctrlKey || ev.metaKey)) { ev.preventDefault(); fc.requestSubmit(); } };
  fc.onsubmit = async (ev) => {
    ev.preventDefault();
    const texto = fc.texto.value.trim();
    if (!texto) return;
    try {
      await api('/api/projeto/comentar', { id: p.id, userId: userId(), texto });
      toast('Comentário publicado');
      await openProject(p.id);
      $('#project-body .pd-tl')?.scrollIntoView({ block: 'start' });
    } catch (err) { toast(err.message, 'error'); }
  };
  // Exclusão (só gestor): confirma com o nome do projeto.
  $('#pd-excluir')?.addEventListener('click', () => {
    const dlg = $('#dlg-excluir-proj');
    $('#dlg-excluir-proj-titulo', dlg).textContent = `${p.titulo} (${p.cliente})`;
    dlg.returnValue = '';
    dlg.showModal();
    $('[value="cancelar"]', dlg).focus();
    dlg.onclose = async () => {
      if (dlg.returnValue !== 'excluir') return;
      try {
        await api('/api/projeto/excluir', { id: p.id, userId: userId() });
        close();
        toast(`Projeto ${p.id} excluído`);
        state.ctx = await api(`/api/contexto?userId=${userId()}`);
        search();
      } catch (err) { toast(err.message, 'error'); }
    };
  });
  // CR-046: envio pela própria ficha, já vinculado a este projeto. O andamento aparece aqui; "Revisar" abre a conferência
  // (com o destino fixo) e, ao aprovar, "Abrir projeto" volta para esta ficha.
  const upload = (e) => { e?.preventDefault(); $('#pd-docs-sec').open = true; $('#pd-file').click(); };
  $('#pd-file').onchange = async (e) => {
    const files = [...e.target.files];
    e.target.value = '';
    if (!files.length) return;
    const ids = await enviarParaProjeto(files, p.id);
    const lista = $('#pd-envios');
    for (const id of ids) {
      const li = document.createElement('li');
      li.innerHTML = `${icon('loader', { size: 14, cls: 'spin' })}<span>Extraindo os dados</span>`;
      lista.appendChild(li);
      const acompanhar = async () => {
        if (!li.isConnected) return;
        const j = await situacaoEnvio(id).catch(() => null);
        if (!j) return;
        if (['enviado', 'processando'].includes(j.status)) { setTimeout(acompanhar, 900); return; }
        li.innerHTML = j.status === 'erro'
          ? `${icon('xCircle', { size: 14 })}<span><b>${esc(j.nome_arquivo)}</b>: ${esc(j.erro)}</span>`
          : `${icon('eye', { size: 14 })}<span><b>${esc(j.nome_arquivo)}</b> pronto para conferir</span><button type="button" class="btn sm primary">Revisar</button>`;
        $('button', li)?.addEventListener('click', () => { close(); revisarEnvio(id); });
      };
      acompanhar();
    }
  };
  $('#pd-close').onclick = close;
  $('#pd-export').onclick = () => openExportDialog(p);
  $('#pd-edit').onclick = edit;
  $('#pd-complete')?.addEventListener('click', edit);
  $('#pd-base').onclick = () => {
    close();
    openProjectForm({ segmento: p.segmento, tecnologias: p.tecnologias, servicos: p.servicos, prazo_meses: p.prazo_meses, objetivo: p.objetivo, descricao: `Baseado em ${p.id} — ${p.titulo} (${p.cliente}).` }, { base: p });
  };
  $('#pd-upload').onclick = upload;
  $('#pd-upload-2')?.addEventListener('click', upload);
  $('#pd-ask').onclick = () => { close(); openTab('busca'); $('#query').value = `${p.titulo} (${p.cliente})`; $('#query').focus(); };
  if (!$('#project-dialog').open) $('#project-dialog').showModal();
}

// ---------- Edição das informações de um documento (UC07.4) ----------
async function openDocumentForm(id) {
  const d = await api(`/api/documento/editar?id=${encodeURIComponent(id)}&userId=${userId()}`);
  const cat = state.ctx.catalogo;
  const user = currentUser();
  const opt = (list, cur, label = (x) => x) => list.map((v) => `<option value="${esc(v)}"${v === cur ? ' selected' : ''}>${esc(label(v))}</option>`).join('');
  const form = $('#doc-form');
  form.innerHTML = `
    <header class="dlg-head"><div><span class="sub">${esc(d.id)} · ${esc(d.formato?.toUpperCase() ?? '')}</span><h3>Editar informações</h3></div>
      <button type="button" class="icon-btn" data-close title="Fechar">${icon('x')}</button></header>
    <div class="form-grid">
      <label class="span2">Título<input name="titulo" value="${esc(d.titulo)}" required maxlength="200"></label>
      <label>Tipo<select name="tipo_documental">${opt(Object.keys(cat.tiposDocumentais), d.tipo_documental, tipoLabel)}</select></label>
      <label>Status<select name="status_documento"><option value=""></option>${opt(STATUS_DOC, d.status_documento, (s) => s.replace(/_/g, ' '))}</select></label>
      <label>Data<input name="data_conteudo" type="date" value="${esc(d.data_conteudo ?? '')}"></label>
      <label title="Nunca fica mais aberto que o projeto">Acesso<select name="confidencialidade">${opt(cat.confidencialidades.filter((x) => user.confidencialidades.includes(x)), d.confidencialidade)}</select></label>
    </div>
    <h5 class="sect-title">${icon('info', { size: 16 })}Sobre o documento</h5>
    <div class="form-grid">
      <label>Autor<input name="autor" value="${esc(d.autor ?? '')}" maxlength="120" placeholder="Quem escreveu"></label>
      <label>Versão<input name="versao" value="${esc(d.versao ?? '')}" maxlength="40" placeholder="Ex.: v2, final"></label>
      <label>Link do original<input name="link_origem" type="url" inputmode="url" value="${esc(d.link_origem ?? '')}" maxlength="500" placeholder="https://…"></label>
      <label class="span3">Por que este documento é relevante?<textarea name="observacoes" rows="2" maxlength="2000" placeholder="Quando reaproveitar, o que mudou, cuidados… (entra na busca)">${esc(d.observacoes ?? '')}</textarea></label>
      <label class="check span3"><input type="checkbox" name="reutilizavel"${d.reutilizavel ? ' checked' : ''}>${icon('star', { size: 15 })}Bom modelo para reaproveitar em novas propostas</label>
    </div>
    <details class="sec"><summary>${icon('edit', { size: 16 })}Resumo, palavras-chave, prazo e idioma</summary>
      <div class="form-grid">
        <label>Prazo (meses)<input name="prazo_meses" type="number" step="0.1" min="0" value="${esc(d.prazo_meses ?? '')}"></label>
        ${user.verValores ? `<label>Valor (R$)<input name="valor" type="number" min="0" value="${esc(d.valor ?? '')}"></label><label>Margem (0 a 1)<input name="margem" type="number" step="0.01" value="${esc(d.margem ?? '')}"></label>` : ''}
        <label>Idioma<select name="idioma">${opt(['pt', 'en', 'es'], d.idioma)}</select></label>
        <label class="span3">Resumo<textarea name="resumo" rows="3" maxlength="2000">${esc(d.resumo ?? '')}</textarea></label>
        <label class="span3">Palavras-chave <small class="muted">separadas por vírgula</small><input name="palavras_chave" value="${esc(d.palavras_chave.join(', '))}"></label>
      </div>
    </details>
    <details class="sec" open><summary>${icon('users', { size: 16 })}Pessoas, resultados, lições e riscos</summary>
      <div class="ents-grid">${ELISTS.map((l) => elist(l, d.entidades[l[0]])).join('')}</div>
    </details>
    <div id="doc-form-msg"></div>
    <div class="dialog-actions">
      <button type="button" class="btn ghost" data-close>Cancelar</button>
      <button type="submit" class="btn primary">${icon('check', { size: 16 })}Salvar</button>
    </div>`;
  bindEntityLists(form);
  const dlg = $('#doc-form-dialog');
  $$('[data-close]', form).forEach((b) => (b.onclick = () => dlg.close()));
  form.onsubmit = async (e) => {
    e.preventDefault();
    const dados = Object.fromEntries(['titulo', 'tipo_documental', 'status_documento', 'data_conteudo', 'confidencialidade', 'autor', 'versao', 'link_origem', 'observacoes', 'prazo_meses', 'valor', 'margem', 'idioma', 'resumo', 'palavras_chave']
      .filter((k) => form.elements[k]).map((k) => [k, form.elements[k].value]));
    dados.reutilizavel = form.reutilizavel.checked;
    dados.entidades = readEntityLists(form);
    try {
      const r = await api('/api/documento/atualizar', { id, userId: userId(), dados });
      dlg.close();
      toast(r.alteracoes ? 'Informações do documento atualizadas' : 'Nada mudou');
      if (r.alteracoes) openProject(d.projeto_id);
    } catch (err) {
      $('#doc-form-msg').innerHTML = `<p class="alert error">${icon('alert', { size: 16 })}<span>${esc(err.message)}</span></p>`;
    }
  };
  dlg.showModal();
  form.titulo.focus();
}

// ---------- Exportar proposta (UC10) ----------
const MODELOS_UI = {
  apresentacao: { icon: 'layout', nome: 'Apresentação para o cliente', desc: 'Slides 16:9 para apresentar ou enviar ao cliente.', formatos: { pptx: 'PowerPoint', pdf: 'PDF' } },
  resumo: { icon: 'file', nome: 'Resumo executivo', desc: 'Documento A4 de 1 a 2 páginas para decisores.', formatos: { docx: 'Word', pdf: 'PDF' } },
};

async function openExportDialog(p) {
  const dlg = $('#export-dialog');
  const form = $('#export-form');
  const st = { modelo: 'apresentacao', formato: 'pptx', titulo: p.titulo, para: p.cliente };
  const render = async () => {
    const o = await api(`/api/projeto/exportar/opcoes?id=${encodeURIComponent(p.id)}&userId=${userId()}&modelo=${st.modelo}`);
    const m = MODELOS_UI[st.modelo];
    if (!m.formatos[st.formato]) st.formato = Object.keys(m.formatos)[0];
    form.innerHTML = `
      <header class="dlg-head"><div><span class="sub">${esc(p.id)} · ${esc(p.cliente)}</span><h3>Exportar proposta</h3></div>
        <button type="button" class="icon-btn" data-close title="Fechar">${icon('x')}</button></header>
      <h5 class="sect-title">${icon('layers', { size: 16 })}Modelo</h5>
      <div class="exp-modelos" role="radiogroup" aria-label="Modelo">${Object.entries(MODELOS_UI).map(([k, x]) => `
        <label class="exp-modelo${k === st.modelo ? ' on' : ''}"><input type="radio" name="modelo" value="${k}"${k === st.modelo ? ' checked' : ''}>
          ${icon(x.icon, { size: 20 })}<span><b>${x.nome}</b><small>${x.desc}</small><em>${Object.values(x.formatos).join(' ou ')}</em></span></label>`).join('')}</div>
      <div class="form-grid">
        <div class="exp-campo"><span>Formato</span><span class="exp-formatos" role="radiogroup" aria-label="Formato">${Object.entries(m.formatos).map(([k, label]) => `<label class="${k === st.formato ? 'on' : ''}"><input type="radio" name="formato" value="${k}"${k === st.formato ? ' checked' : ''}>${label}</label>`).join('')}</span></div>
        <label class="span2">Título do documento<input name="titulo" value="${esc(st.titulo)}" maxlength="160"></label>
        <label class="span3">Para quem é<input name="para" value="${esc(st.para)}" maxlength="120" placeholder="Cliente ou área"></label>
      </div>
      <h5 class="sect-title">${icon('check', { size: 16 })}O que levar para o documento
        <span class="exp-acoes"><button type="button" class="link-btn" data-todas>Marcar todas</button><button type="button" class="link-btn" data-nenhuma>Limpar</button></span></h5>
      <ul class="exp-secoes">${o.secoes.map((s) => `
        <li class="${s.disponivel ? '' : 'off'}"><label><input type="checkbox" name="secao" value="${s.key}"${s.marcada ? ' checked' : ''}${s.disponivel ? '' : ' disabled'}>
          <span>${esc(s.titulo)}${s.disponivel ? '' : `<small>${esc(s.motivo ?? 'sem conteúdo')}</small>`}</span></label></li>`).join('')}</ul>
      ${o.secoes.some((s) => s.key === 'investimento') ? '' : `<p class="muted small">${icon('lock', { size: 13 })} Valores e margens não entram para o seu perfil.</p>`}
      <div id="exp-msg"></div>
      <div class="dialog-actions">
        <button type="button" class="btn ghost" data-close>Cancelar</button>
        <button type="submit" class="btn primary">${icon('download', { size: 16 })}Gerar ${m.formatos[st.formato]}</button>
      </div>`;
    $$('[data-close]', form).forEach((b) => (b.onclick = () => dlg.close()));
    // Guarda título e destinatário digitados ao trocar de modelo ou formato.
    const keep = () => { st.titulo = form.titulo.value; st.para = form.para.value; };
    $$('input[name=modelo]', form).forEach((r) => (r.onchange = () => { keep(); st.modelo = r.value; render(); }));
    $$('input[name=formato]', form).forEach((r) => (r.onchange = () => { keep(); st.formato = r.value; render(); }));
    $('[data-todas]', form).onclick = () => $$('input[name=secao]:not(:disabled)', form).forEach((c) => (c.checked = true));
    $('[data-nenhuma]', form).onclick = () => $$('input[name=secao]', form).forEach((c) => (c.checked = false));
  };
  form.onsubmit = async (e) => {
    e.preventDefault();
    const secoes = $$('input[name=secao]:checked', form).map((c) => c.value);
    const btn = $('button[type=submit]', form);
    btn.disabled = true;
    btn.innerHTML = `${icon('loader', { size: 16, cls: 'spin' })}Gerando…`;
    try {
      const res = await fetch('/api/projeto/exportar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: p.id, userId: userId(), modelo: st.modelo, formato: st.formato, secoes, titulo: form.titulo.value, para: form.para.value }) });
      if (res.status === 401) return location.replace('/login');
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).erro ?? 'Não foi possível gerar o arquivo.');
      const nome = decodeURIComponent(res.headers.get('Content-Disposition')?.match(/filename\*=UTF-8''([^;]+)/)?.[1] ?? `proposta.${st.formato}`);
      const url = URL.createObjectURL(await res.blob());
      const a = Object.assign(document.createElement('a'), { href: url, download: nome });
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      dlg.close();
      toast(`${MODELOS_UI[st.modelo].nome} gerado`);
    } catch (err) {
      $('#exp-msg').innerHTML = `<p class="alert error">${icon('alert', { size: 16 })}<span>${esc(err.message)}</span></p>`;
      btn.disabled = false;
      btn.innerHTML = `${icon('download', { size: 16 })}Gerar ${MODELOS_UI[st.modelo].formatos[st.formato]}`;
    }
  };
  await render();
  dlg.showModal();
}

// ---------- Seletor de cliente (UC07.6) ----------
// Busca entre os clientes existentes; cliente novo só para o gestor.
export function bindClientCombo(root) {
  for (const box of $$('[data-combo]', root)) {
    const input = $('input', box);
    const list = $('.combo-list', box);
    const hint = $('.combo-hint', box);
    const clientes = state.ctx.catalogo.clientes;
    let ativo = -1;
    const exato = () => clientes.find((n) => normalizeText(n) === normalizeText(input.value));
    const status = () => {
      const v = input.value.trim();
      const novo = v && !exato();
      hint.innerHTML = novo ? (pode('cadastrarCliente') ? `${icon('plus', { size: 13 })}Cliente novo: será cadastrado ao salvar` : `${icon('alert', { size: 13 })}Cliente não encontrado. Peça a um gestor para cadastrar.`) : '';
      hint.className = `combo-hint${novo ? (pode('cadastrarCliente') ? ' novo' : ' erro') : ''}`;
      input.setCustomValidity(novo && !pode('cadastrarCliente') ? 'Escolha um cliente da lista' : '');
    };
    const close = () => { list.classList.add('hidden'); input.setAttribute('aria-expanded', 'false'); ativo = -1; };
    const choose = (nome) => { input.value = nome; close(); status(); input.dispatchEvent(new Event('change', { bubbles: true })); };
    const paint = () => {
      const termos = normalizeText(input.value).split(' ').filter(Boolean);
      const achados = clientes.filter((n) => termos.every((t) => normalizeText(n).includes(t))).slice(0, 8);
      const v = input.value.trim();
      const extra = v && !exato()
        ? (pode('cadastrarCliente') ? `<li role="option" class="combo-new" data-novo>${icon('plus', { size: 14 })}Cadastrar cliente “${esc(v)}”</li>` : '<li class="combo-empty" role="presentation">Cliente não encontrado. Só o gestor cadastra clientes novos.</li>')
        : '';
      list.innerHTML = achados.map((n, i) => `<li role="option" data-nome="${esc(n)}"${i === ativo ? ' class="ativo"' : ''}>${esc(n)}</li>`).join('') + extra;
      list.classList.toggle('hidden', !list.innerHTML);
      input.setAttribute('aria-expanded', String(Boolean(list.innerHTML)));
    };
    input._comboStatus = status;
    input.onfocus = paint;
    input.oninput = () => { ativo = -1; paint(); status(); };
    input.onblur = () => setTimeout(close, 150);
    input.onkeydown = (e) => {
      const opcoes = $$('[data-nome]', list);
      if (e.key === 'ArrowDown') { e.preventDefault(); ativo = Math.min(opcoes.length - 1, ativo + 1); paint(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); ativo = Math.max(0, ativo - 1); paint(); }
      if (e.key === 'Enter' && !list.classList.contains('hidden')) {
        e.preventDefault();
        if (ativo >= 0 && opcoes[ativo]) choose(opcoes[ativo].dataset.nome); else close();
      }
      if (e.key === 'Escape') close();
    };
    list.onmousedown = (e) => {
      e.preventDefault();
      const li = e.target.closest('li[role=option]');
      if (li) choose(li.dataset.nome ?? input.value.trim());
    };
    status();
  }
}

// ---------- Cadastro / edição ----------
// Campos essenciais à vista; o restante fica em "Mais detalhes".
export function projectFields(p = {}, { prefix = '', comValores = currentUser()?.verValores } = {}) {
  const c = state.ctx.catalogo;
  const user = currentUser();
  const opt = (list, cur) => list.map((v) => `<option${v === cur ? ' selected' : ''}>${esc(v)}</option>`).join('');
  return `
    <div class="form-grid">
      <label class="combo" data-combo>Cliente<input name="${prefix}cliente" value="${esc(p.cliente ?? '')}" autocomplete="off" role="combobox" aria-expanded="false" aria-autocomplete="list" placeholder="Buscar cliente…"><ul class="combo-list hidden" role="listbox"></ul><small class="combo-hint"></small></label>
      <label class="span2">Título<input name="${prefix}titulo" value="${esc(p.titulo ?? '')}"></label>
      <label>Segmento<select name="${prefix}segmento"><option value=""></option>${opt(c.segmentos.map((s) => s.nome), p.segmento)}</select></label>
      <label>Status<select name="${prefix}status_proposta">${opt(c.status, p.status_proposta ?? 'Em elaboração')}</select></label>
      <label>Acesso<select name="${prefix}confidencialidade">${opt(c.confidencialidades.filter((x) => user.confidencialidades.includes(x)), p.confidencialidade ?? 'interna')}</select></label>
    </div>
    <details class="more"><summary>${icon('chevronRight', { size: 15 })}Mais detalhes</summary>
      <div class="form-grid">
        <label>Prazo (meses)<input name="${prefix}prazo_meses" type="number" step="0.5" min="0" value="${esc(p.prazo_meses ?? '')}"></label>
        ${comValores ? `<label>Valor (R$)<input name="${prefix}valor" type="number" min="0" value="${esc(p.valor ?? '')}"></label><label>Margem (0 a 1)<input name="${prefix}margem" type="number" step="0.01" value="${esc(p.margem ?? '')}"></label>` : ''}
        <label>Responsável<input name="${prefix}dono" value="${esc(p.dono ?? '')}"></label>
        <label>Área<input name="${prefix}area" value="${esc(p.area ?? '')}"></label>
        <label>Data<input name="${prefix}data_referencia" type="date" value="${esc(p.data_referencia ?? '')}"></label>
        <label class="span3">Link<input name="${prefix}link_sharepoint" value="${esc(p.link_sharepoint ?? '')}"></label>
        <label class="span3">Contexto<textarea name="${prefix}descricao" rows="3">${esc(p.descricao ?? '')}</textarea></label>
        <label class="span3">Objetivo<textarea name="${prefix}objetivo" rows="2">${esc(p.objetivo ?? '')}</textarea></label>
      </div>
    </details>
`;
}

export function readProjectFields(form, prefix = '') {
  const out = {};
  for (const el of $$('[name]', form)) {
    if (!el.name.startsWith(prefix) || el.type === 'radio') continue;
    out[el.name.slice(prefix.length)] = el.value;
  }
  return out;
}

// base: projeto usado como ponto de partida ("Usar como base"); os campos já vêm preenchidos.
export function openProjectForm(p = null, { base = null } = {}) {
  const c = state.ctx.catalogo;
  const editing = Boolean(p?.id);
  $('#project-form').innerHTML = `
    <header class="dlg-head"><div><h3>${editing ? `Editar ${p.id}` : 'Novo projeto'}</h3>${base ? `<span class="sub">${icon('duplicate', { size: 14 })}a partir de ${esc(base.titulo)}</span>` : ''}</div><button type="button" id="pf-cancel" class="icon-btn" title="Fechar">${icon('x')}</button></header>
    ${editing || base ? '' : `<div class="assist">
      <textarea id="pf-desc" rows="2" placeholder="Descreva o projeto em uma frase e deixe o Radar preencher…"></textarea>
      <button type="button" id="pf-suggest" class="icon-btn magic" title="Sugerir campos">${icon('sparkles')}</button>
    </div><div id="pf-assist"></div>`}
    ${projectFields(p ?? {})}
    <h5 class="sect-title">${icon('cpu', { size: 16 })}Tecnologias</h5>${chipPicker('tecnologias', p?.tecnologias ?? [], c.tecnologias.map((t) => t.nome))}
    <h5 class="sect-title">${icon('briefcase', { size: 16 })}Serviços</h5>${chipPicker('servicos', p?.servicos ?? [], c.servicos.map((t) => t.nome))}
    <div id="pf-msg"></div>
    ${editing ? '' : policyLine()}
    <div class="dialog-actions"><button type="submit" class="btn primary">${icon('check', { size: 16 })}${editing ? 'Salvar' : 'Cadastrar'}</button></div>`;
  bindChipPickers($('#project-form'));
  bindClientCombo($('#project-form'));
  const markTouched = (e) => { if (e.isTrusted && e.target.name) e.target.dataset.touched = '1'; };
  $('#project-form').addEventListener('input', markTouched);
  $('#project-form').addEventListener('change', markTouched);
  $('#pf-cancel').onclick = () => $('#project-form-dialog').close();
  if (!editing && !base) $('#pf-suggest').onclick = suggest;
  $('#project-form').onsubmit = (e) => { e.preventDefault(); save(p, false); };
  $('#project-form-dialog').showModal();
}

async function suggest() {
  const texto = $('#pf-desc').value.trim();
  if (!texto) return;
  // Termo aceito uma vez; o servidor mascara a descrição antes de enviá-la à IA (UC13).
  if (!(await ensureTerms())) return;
  $('#pf-suggest').innerHTML = icon('loader', { cls: 'spin' });
  try {
    const pedir = () => api('/api/projetos/sugerir', { userId: userId(), texto });
    const r = await pedir().catch(async (err) => { if (await handleTermsError(err)) return pedir(); throw err; });
    const s = r.sugestao;
    const form = $('#project-form');
    // Preenche o que o usuário ainda não editou, inclusive listas com valor padrão (status, acesso).
    const preenchidos = [];
    $$('.ia-preenchido', form).forEach((el) => el.classList.remove('ia-preenchido'));
    for (const [k, v] of Object.entries(s)) {
      const el = form.querySelector(`[name="${k}"]`);
      if (!el || v == null || v === '' || Array.isArray(v) || el.dataset.touched) continue;
      if (el.tagName === 'SELECT' && ![...el.options].some((o) => o.value === String(v))) {
        if (k !== 'segmento') continue;
        el.add(new Option(v, v));
      }
      el.value = v;
      el.classList.add('ia-preenchido');
      el.closest('details')?.setAttribute('open', '');
      el._comboStatus?.();
      preenchidos.push(el.closest('label')?.firstChild?.textContent?.trim() || k);
    }
    const nTermos = s.tecnologias.length + s.servicos.length;
    const c = state.ctx.catalogo;
    form.querySelector('[data-picker="tecnologias"]').outerHTML = chipPicker('tecnologias', s.tecnologias, c.tecnologias.map((t) => t.nome));
    form.querySelector('[data-picker="servicos"]').outerHTML = chipPicker('servicos', s.servicos, c.servicos.map((t) => t.nome));
    bindChipPickers(form);
    $('#pf-assist').innerHTML = `<p class="ia-resumo">${icon('sparkles', { size: 15 })}<span>${preenchidos.length ? `A IA preencheu <b>${preenchidos.length} campo${preenchidos.length > 1 ? 's' : ''}</b>${nTermos ? ` e marcou <b>${nTermos}</b> tecnologias/serviços` : ''}. Confira os destacados antes de cadastrar.` : 'A IA não encontrou campos novos para preencher: os que você já editou foram mantidos.'}</span></p>${maskNote(r.mascaramento)}`
      + (r.similares.length
      ? `<p class="similar">${icon('link', { size: 15 })}Parecidos: ${r.similares.map((x) => `<a href="#" data-proj="${x.projeto_id}" title="${esc(x.cliente)} · ${Math.round(x.similaridade * 100)}%">${esc(x.titulo)}</a>`).join(' · ')}</p>`
      : '');
    $$('[data-proj]', $('#pf-assist')).forEach((a) => (a.onclick = (e) => { e.preventDefault(); openProject(a.dataset.proj); }));
  } catch (err) {
    $('#pf-assist').innerHTML = `<p class="error">${icon('alert', { size: 15 })}${esc(err.message)}</p>`;
  }
  $('#pf-suggest').innerHTML = icon('sparkles');
}

async function save(p, forcar) {
  const form = $('#project-form');
  if (!p?.id && !(await ensureTerms())) return;
  const dados = { ...readProjectFields(form), tecnologias: readChips(form, 'tecnologias'), servicos: readChips(form, 'servicos') };
  try {
    const r = p?.id
      ? await api('/api/projeto/atualizar', { id: p.id, userId: userId(), dados })
      : await api('/api/projetos', { userId: userId(), dados, forcar }).catch(async (err) => {
        if (await handleTermsError(err)) return api('/api/projetos', { userId: userId(), dados, forcar });
        throw err;
      });
    $('#project-form-dialog').close();
    const removidos = (r.mascaramento ?? []).reduce((n, a) => n + a.quantidade, 0);
    toast(p?.id ? `${p.id} atualizado` : `${r.projeto.id} cadastrado${removidos ? ` · ${removidos} dado(s) sensível(is) removido(s)` : ''}`);
    state.ctx = await api(`/api/contexto?userId=${userId()}`);
    search();
    openProject(r.projeto.id);
  } catch (err) {
    if (err.status === 409 && err.data?.duplicatas) {
      $('#pf-msg').innerHTML = `<p class="alert warn">${icon('alert', { size: 16 })}<span>Já existe: ${err.data.duplicatas.map((d) => `<b>${esc(d.titulo)}</b>`).join(', ')}</span><button type="button" id="pf-force" class="btn sm">Cadastrar mesmo assim</button></p>`;
      $('#pf-force').onclick = () => save(p, true);
    } else {
      $('#pf-msg').innerHTML = `<p class="alert error">${icon('alert', { size: 16 })}<span>${esc(err.message)}</span></p>`;
    }
  }
}

export { STATUS_DOC, ENTITY_TYPES };
