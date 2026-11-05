// Tela "Registro de atividades" (UC11): quem criou, editou, excluiu ou exportou o quê. Só para o gestor.

import { $, $$, esc, api, state, userId, onTab, onUserChange, userName, pode } from './common.js';
import { icon } from './icons.js';
import { openProject } from './projetos.js';

const ACOES = { criar: ['plus', 'Criou'], editar: ['edit', 'Editou'], excluir: ['trash', 'Excluiu'], exportar: ['download', 'Exportou'], sugerir: ['bulb', 'Sugeriu'] };
const ENTIDADES = { projeto: 'Projeto', documento: 'Documento', cliente: 'Cliente', tecnologia: 'Tecnologia', servico: 'Serviço', segmento: 'Segmento', processamento: 'Envio' };
const view = { filtros: { acao: '', entidade: '', usuario: '', de: '', ate: '', q: '' }, pagina: 1 };
let timer;

export function initActivities() {
  onTab('atividades', () => { renderFilters(); load(); });
  // O item do menu só aparece para quem pode consultar.
  const sync = () => $('[data-menu=atividades]').classList.toggle('hidden', !pode('verAtividades'));
  onUserChange(() => {
    sync();
    if ($('#tab-atividades').classList.contains('active') && !pode('verAtividades')) $('#atividades').innerHTML = denied();
  });
  sync();
}

const denied = () => `<div class="empty-state">${icon('lock', { size: 32 })}<p>Só o gestor pode consultar o registro de atividades.</p></div>`;
const opt = (map, cur, todos) => `<option value="">${todos}</option>${Object.entries(map).map(([k, v]) => `<option value="${k}"${k === cur ? ' selected' : ''}>${Array.isArray(v) ? v[1] : v}</option>`).join('')}`;

function renderFilters() {
  const f = view.filtros;
  const usuarios = Object.fromEntries([...state.ctx.usuarios.map((u) => [u.id, u.nome]), ['__base', 'Base piloto']]);
  $('#atv-filtros').innerHTML = `
    <div class="field-icon grow"><i>${icon('search', { size: 16 })}</i><input data-af="q" type="search" value="${esc(f.q)}" placeholder="Buscar por código, campo ou valor" aria-label="Buscar no registro"></div>
    <label class="pill" title="Ação">${icon('layers', { size: 15 })}<select data-af="acao" aria-label="Ação">${opt(ACOES, f.acao, 'Todas as ações')}</select></label>
    <label class="pill" title="Tipo de item">${icon('tag', { size: 15 })}<select data-af="entidade" aria-label="Tipo de item">${opt(ENTIDADES, f.entidade, 'Todos os itens')}</select></label>
    <label class="pill" title="Usuário">${icon('user', { size: 15 })}<select data-af="usuario" aria-label="Usuário">${opt(usuarios, f.usuario, 'Todos os usuários')}</select></label>
    <span class="range" title="Período">${icon('calendar', { size: 15 })}<input data-af="de" type="date" value="${esc(f.de)}" aria-label="De"><input data-af="ate" type="date" value="${esc(f.ate)}" aria-label="Até"></span>`;
  $$('[data-af]', $('#atv-filtros')).forEach((el) => {
    const go = () => { f[el.dataset.af] = el.value; view.pagina = 1; load(); };
    if (el.dataset.af === 'q') el.oninput = () => { clearTimeout(timer); timer = setTimeout(go, 300); };
    else el.onchange = go;
  });
}

async function load() {
  if (!pode('verAtividades')) { $('#atividades').innerHTML = denied(); return; }
  const p = new URLSearchParams({ userId: userId(), pagina: view.pagina, ...view.filtros });
  const r = await api(`/api/atividades?${p}`);
  const de = (r.pagina - 1) * r.tamanho + 1;
  const ate = Math.min(r.total, r.pagina * r.tamanho);
  const pages = Math.ceil(r.total / r.tamanho);
  const valor = (v) => (v == null ? '<span class="muted">—</span>' : esc(v.length > 140 ? `${v.slice(0, 140)}…` : v));
  $('#atividades').innerHTML = r.itens.length ? `
    <p class="summary">${r.total > r.tamanho ? `${de}–${ate} de ` : ''}${r.total} evento${r.total === 1 ? '' : 's'}</p>
    <div class="tbl-wrap"><table class="atv">
      <thead><tr><th>Quando</th><th>Quem</th><th>Ação</th><th>Item</th><th>Campo</th><th>Antes → depois</th></tr></thead>
      <tbody>${r.itens.map((h) => {
        const [ic, label] = ACOES[h.acao] ?? ['info', h.acao];
        const item = `${esc(ENTIDADES[h.entidade] ?? h.entidade)} <b>${esc(h.entidade_id)}</b>`;
        return `<tr>
          <td data-l="Quando">${new Date(h.em).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</td>
          <td data-l="Quem">${esc(h.usuario_nome ?? userName(h.usuario_id))}</td>
          <td data-l="Ação"><span class="acao a-${esc(h.acao)}">${icon(ic, { size: 13 })}${esc(label)}</span></td>
          <td data-l="Item">${h.projeto_id ? `<a href="#" data-proj="${esc(h.projeto_id)}">${item}</a>` : item}</td>
          <td data-l="Campo">${valor(h.campo)}</td>
          <td data-l="Valores" class="vals">${h.acao === 'editar' ? `${valor(h.antes)} <span class="arrow">→</span> ${valor(h.depois)}` : valor(h.depois ?? h.antes)}</td>
        </tr>`;
      }).join('')}</tbody>
    </table></div>
    ${pages > 1 ? `<div class="pages"><button type="button" data-ap="${r.pagina - 1}"${r.pagina === 1 ? ' disabled' : ''} aria-label="Página anterior" class="prev">${icon('chevronRight', { size: 16 })}</button>
      <span class="muted">Página ${r.pagina} de ${pages}</span>
      <button type="button" data-ap="${r.pagina + 1}"${r.pagina === pages ? ' disabled' : ''} aria-label="Próxima página">${icon('chevronRight', { size: 16 })}</button></div>` : ''}`
    : `<div class="empty-state">${icon('history', { size: 32 })}<p>Nenhuma atividade ${Object.values(view.filtros).some(Boolean) ? 'com esses filtros' : 'registrada ainda'}.</p></div>`;
  $$('[data-proj]', $('#atividades')).forEach((a) => (a.onclick = (e) => { e.preventDefault(); openProject(a.dataset.proj); }));
  $$('[data-ap]', $('#atividades')).forEach((b) => (b.onclick = () => { view.pagina = Number(b.dataset.ap); load(); }));
}
