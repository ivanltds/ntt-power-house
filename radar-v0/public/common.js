// Utilitários compartilhados pelas telas do Radar.

import { icon } from './icons.js';

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const md = (s) => esc(s).replace(/^- (.*)$/gm, '• $1').replace(/\n/g, '<br>');
export const pct = (v) => `${Math.round(v * 100)}%`;
export const brl = (v) => Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
export const dateBR = (iso) => (iso ? new Date(iso.length === 10 ? `${iso}T12:00:00` : iso).toLocaleDateString('pt-BR') : '—');
// Trechos de busca textual chegam marcados com [[termo]]; o texto é escapado antes de virar <mark>.
export const highlight = (s) => esc(String(s ?? '').replace(/\*\*/g, '').replace(/(^|\n)#+\s*/g, '$1').replace(/\s*\n+\s*/g, ' ')).replace(/\[\[/g, '<mark>').replace(/\]\]/g, '</mark>');

// ctx: contexto do servidor (usuários, oportunidades, catálogo); conv: conversa atual do chat.
export const state = { ctx: null, conv: null };
export const userId = () => $('#user').value;
export const currentUser = () => state.ctx.usuarios.find((u) => u.id === userId());
export const tipoLabel = (t) => state.ctx?.catalogo?.tiposDocumentais?.[t] ?? t;

// Nível de confiança da fonte (1 a 5) como rótulo curto; o detalhe fica no title.
const TRUST = {
  5: ['Oficial', 'Proposta final aprovada ou SOW'],
  4: ['Enviado', 'Case, apresentação ou proposta enviada ao cliente'],
  3: ['Interno', 'Estimativa, ata ou ficha cadastrada'],
  2: ['Informal', 'Transcrição, e-mail ou documento técnico'],
  1: ['Rascunho', 'Rascunho, ainda não validado'],
};
export const trustBadge = (n) => (TRUST[n] ? `<span class="trust t${n}" title="${TRUST[n][1]}">${TRUST[n][0]}</span>` : '');

// Aderência de um resultado em palavras; o percentual fica no title.
export const matchLabel = (score) => {
  const [cls, label] = score >= 0.75 ? ['m3', 'Muito parecido'] : score >= 0.5 ? ['m2', 'Parecido'] : ['m1', 'Relacionado'];
  return `<span class="match ${cls}" title="Aderência à pergunta: ${Math.round(score * 100)}%">${label}</span>`;
};

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = Object.assign(document.createElement('textarea'), { value: text });
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
}

export async function api(path, body) {
  const res = await fetch(path, body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : undefined);
  // Sessão de login expirada: volta para a tela de entrada.
  if (res.status === 401) { location.replace('/login'); throw new Error('Sessão expirada'); }
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.erro ?? res.statusText);
    err.data = data;
    err.status = res.status;
    throw err;
  }
  return data;
}

// Abas e troca de perfil: cada tela registra o que fazer ao ser exibida ou quando o perfil muda.
const tabHandlers = new Map();
const userHandlers = [];
export const onTab = (name, fn) => tabHandlers.set(name, fn);
export const onUserChange = (fn) => userHandlers.push(fn);
export const notifyUserChange = () => userHandlers.forEach((fn) => fn());

export function openTab(name) {
  $$('.tabs button').forEach((b) => {
    b.classList.toggle('active', b.dataset.tab === name);
    b.toggleAttribute('aria-current', b.dataset.tab === name);
  });
  $$('.tab').forEach((t) => t.classList.toggle('active', t.id === `tab-${name}`));
  tabHandlers.get(name)?.();
}

export async function openDoc(id) {
  const d = await api(`/api/documento?id=${encodeURIComponent(id)}&userId=${userId()}`);
  $('#viewer-title').textContent = `${d.meta.cliente} — ${d.meta.titulo ?? tipoLabel(d.meta.tipo)} (${d.meta.arquivo})`;
  $('#viewer-body').textContent = d.conteudo;
  $('#viewer-download').onclick = () => downloadDoc(id);
  $('#viewer').showModal();
}

// Baixa o arquivo original; erros (ex.: valores ocultos para o perfil) aparecem como aviso, sem sair da tela.
export async function downloadDoc(id) {
  const res = await fetch(`/api/documento/baixar?id=${encodeURIComponent(id)}&userId=${userId()}`);
  if (res.status === 401) return location.replace('/login');
  if (!res.ok) return toast((await res.json().catch(() => ({}))).erro ?? 'Não foi possível baixar o arquivo.', 'error');
  const nome = decodeURIComponent(res.headers.get('Content-Disposition')?.match(/filename\*=UTF-8''([^;]+)/)?.[1] ?? id);
  const url = URL.createObjectURL(await res.blob());
  const a = Object.assign(document.createElement('a'), { href: url, download: nome });
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Nome do usuário para logs e históricos; sem usuário, o item veio da carga da base piloto.
export const userName = (id) => (id ? state.ctx?.usuarios?.find((u) => u.id === id)?.nome ?? id : 'Base piloto');

// action: { label, run } mostra um botão no aviso (ex.: "Revisar").
export function toast(msg, kind = 'ok', action = null) {
  const el = document.createElement('div');
  el.className = `toast ${kind}`;
  el.setAttribute('role', 'status');
  el.innerHTML = `${icon(kind === 'error' ? 'xCircle' : kind === 'info' ? 'info' : 'checkCircle', { size: 18 })}<span>${esc(msg)}</span>${action ? `<button type="button">${esc(action.label)}</button>` : ''}`;
  if (action) el.querySelector('button').onclick = () => { el.remove(); action.run(); };
  // Com uma janela modal aberta, o aviso vai dentro dela; no body ele ficaria atrás do fundo escurecido.
  ([...document.querySelectorAll('dialog[open]')].filter((d) => d.matches(':modal')).at(-1) ?? document.body).appendChild(el);
  setTimeout(() => el.remove(), action ? 9000 : 4500);
}

// Seletor de termos da taxonomia em "chips" clicáveis, com campo para termo novo (vai para curadoria).
// meta: { [termo]: texto do title }, usado para mostrar confiança e método da sugestão.
// Comparação de nomes sem diferenciar acentos, maiúsculas e espaços extras.
export const normalizeText = (s) => String(s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();

// Capacidade do perfil atual (cadastrarProjeto, cadastrarCliente, criarTermo, verAtividades).
export const pode = (c) => Boolean(currentUser()?.pode?.[c]);

// Sem permissão para criar termos, o campo "+ outro" some e termos novos sugeridos ficam só como sugestão ao gestor.
export function chipPicker(name, selected = [], options = [], meta = {}) {
  const all = [...new Set([...options, ...selected])];
  const criar = pode('criarTermo');
  const novaTitle = criar ? 'termo novo: pendente de curadoria' : 'termo novo: sugestão para o gestor, não entra no projeto';
  return `<div class="chips" data-picker="${name}">
    ${all.map((o) => `<label class="pick${selected.includes(o) ? ' on' : ''}${options.includes(o) ? '' : ' nova'}" title="${esc(meta[o] ?? (options.includes(o) ? '' : novaTitle))}">
      <input type="checkbox" value="${esc(o)}"${selected.includes(o) ? ' checked' : ''}>${esc(o)}</label>`).join('')}
    ${criar ? '<input class="pick-new" placeholder="+ outro">' : ''}
  </div>`;
}

export function bindChipPickers(root) {
  $$('[data-picker]', root).forEach((box) => {
    box.addEventListener('change', (e) => e.target.type === 'checkbox' && e.target.closest('.pick').classList.toggle('on', e.target.checked));
    const input = $('.pick-new', box);
    if (!input) return;
    input.onkeydown = (e) => {
      if (e.key !== 'Enter' || !input.value.trim()) return;
      e.preventDefault();
      input.insertAdjacentHTML('beforebegin', `<label class="pick on nova" title="termo novo: pendente de curadoria"><input type="checkbox" value="${esc(input.value.trim())}" checked>${esc(input.value.trim())}</label>`);
      input.value = '';
    };
  });
}

export const readChips = (root, name) => $$(`[data-picker="${name}"] input[type=checkbox]:checked`, root).map((i) => i.value);
