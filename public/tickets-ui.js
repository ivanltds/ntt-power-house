// Quadro de tickets: lista com filtros, kanban por situação e janela de detalhe com edição.
// Usado no menu Versão → Tickets. Dados de /api/qualidade;
// toda mudança vai para /api/tickets/editar e entra no histórico do ticket com o nome de quem fez.
// O login do Radar é compartilhado: o nome é pedido em cada formulário e nunca vem preenchido.

import { $, $$, esc, api, dateBR, toast } from './common.js';
import { icon } from './icons.js';

const ABERTOS = ['aberto', 'em_correcao', 'corrigido'];
const ORDEM_PRIO = ['critica', 'alta', 'media', 'baixa', null];
const ORDENAR = { prioridade: 'Prioridade', recentes: 'Mais recentes', antigos: 'Mais antigos', atualizados: 'Atualizados por último' };
const SITUACOES = { abertos: 'Em aberto', corrigido: 'Aguardando reteste', fora_mvp: 'Fora do MVP', resolvidos: 'Resolvidos', todos: 'Todos' };
const CAMPO = { titulo: 'Título', texto: 'Descrição', area: 'Área', tipo: 'Tipo', prioridade: 'Prioridade', imagens: 'Imagens', proposta: 'Proposta de solução' };

const horaBR = (iso) => (iso ? `${dateBR(iso)} ${new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}` : '');
const atualizadoEm = (t) => t.atualizadoEm ?? t.historico.at(-1)?.em ?? t.criadoEm;
const rotPrio = (p, rot) => (p ? rot.prioridades[p] : 'A definir');
export const chipPrio = (p, rot) => `<span class="tk-prio tk-p-${p ?? 'nd'}" title="Prioridade: ${esc(rotPrio(p, rot))}">${esc(rotPrio(p, rot))}</span>`;
const chipStatus = (s, rot) => `<span class="qa-chip qa-${s}">${esc(rot.status[s] ?? s)}</span>`;
const ADIADOS = ['nao_priorizado'];
const passaSituacao = (t, f) => f === 'todos' || (f === 'abertos' ? ABERTOS.includes(t.status) : f === 'corrigido' ? t.status === 'corrigido'
  : f === 'fora_mvp' ? ADIADOS.includes(t.status) : !ABERTOS.includes(t.status) && !ADIADOS.includes(t.status));

async function reduzir(file) {
  // Captura reduzida a no máximo 1600 px de largura: mais leve para a IA e para o ImgBB.
  const img = await createImageBitmap(file);
  const escala = Math.min(1, 1600 / img.width);
  const c = Object.assign(document.createElement('canvas'), { width: Math.round(img.width * escala), height: Math.round(img.height * escala) });
  c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
  return c.toDataURL('image/jpeg', 0.85);
}

function alteracaoHtml(a, rot) {
  if (a.campo === 'texto') return 'editou a descrição';
  if (a.campo === 'proposta') return a.vazia ? 'apagou a proposta de solução' : 'registrou a proposta de solução';
  if (a.campo === 'imagens') return [a.adicionadas && `anexou ${a.adicionadas} imagem(ns)`, a.removidas && `removeu ${a.removidas} imagem(ns)`].filter(Boolean).join(' e ');
  const v = (x) => (a.campo === 'area' ? rot.areas[x] : a.campo === 'tipo' ? rot.tipos[x] : a.campo === 'prioridade' ? rotPrio(x, rot) : x) ?? '—';
  return `${CAMPO[a.campo] ?? a.campo}: ${esc(v(a.de))} → <b>${esc(v(a.para))}</b>`;
}

export function historicoHtml(t, rot) {
  if (!t.historico.length) return '<p class="muted small">Sem retornos ainda.</p>';
  return `<ol class="qa-hist">${[...t.historico].reverse().map((h) => `<li>
    <span class="muted small">${horaBR(h.em)} · ${esc(h.autor)}${h.versao ? ` · ${esc(h.versao)}` : ''}</span>
    ${h.de !== h.para ? `<span class="small">${esc(rot.status[h.de])} → <b>${esc(rot.status[h.para])}</b></span>` : ''}
    ${(h.alteracoes ?? []).map((a) => `<span class="small">${alteracaoHtml(a, rot)}</span>`).join('')}
    ${h.texto ? `<p>${esc(h.texto)}</p>` : ''}</li>`).join('')}</ol>`;
}

export function galeriaHtml(t) {
  const imgs = t.imagens ?? [];
  // A miniatura usa a imagem inteira (a do ImgBB é um recorte quadrado do canto, ilegível em captura de celular).
  // O clique abre a imagem dentro da própria tela: link em aba nova costuma não abrir no navegador do WhatsApp/Teams.
  return imgs.length ? `<div class="tk-galeria">${imgs.map((i, n) => `<a href="${esc(i.url)}" target="_blank" rel="noopener noreferrer" data-zoom="${n}" data-cod="${esc(t.codigo)}" title="Ver a imagem ${n + 1} em tamanho real"><img src="${esc(i.url)}" alt="Imagem ${n + 1} do ${esc(t.codigo)}" loading="lazy"></a>`).join('')}</div>` : '';
}

// Visualizador de imagem dos tickets (quadro e página de status): um só, ligado por delegação.
function verImagem(link) {
  const links = [...link.closest('.tk-galeria').querySelectorAll('a[data-zoom]')];
  let n = links.indexOf(link);
  let dlg = document.querySelector('dialog.tk-zoom');
  if (!dlg) {
    dlg = Object.assign(document.createElement('dialog'), { className: 'tk-zoom' });
    document.body.appendChild(dlg);
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  }
  const pintar = () => {
    const a = links[n];
    dlg.innerHTML = `<div class="tk-zoom-head"><b>${esc(a.dataset.cod)} · imagem ${n + 1} de ${links.length}</b>
      ${links.length > 1 ? '<button type="button" class="btn sm" data-z="-1" aria-label="Imagem anterior">‹</button><button type="button" class="btn sm" data-z="1" aria-label="Próxima imagem">›</button>' : ''}
      <a class="btn sm" href="${esc(a.href)}" target="_blank" rel="noopener noreferrer">Abrir em nova aba</a>
      <button type="button" class="icon-btn" data-z-fechar title="Fechar" aria-label="Fechar imagem">${icon('x')}</button></div>
      <img class="tk-zoom-img" src="${esc(a.href)}" alt="Imagem ${n + 1} do ${esc(a.dataset.cod)}">`;
    $('img', dlg).onerror = (e) => e.target.replaceWith(Object.assign(document.createElement('p'), { className: 'tk-zoom-erro muted', textContent: 'A imagem não carregou. O serviço de imagens (ImgBB) pode estar bloqueado nesta rede; tente "Abrir em nova aba" ou outra rede.' }));
    $('[data-z-fechar]', dlg).onclick = () => dlg.close();
    $$('[data-z]', dlg).forEach((b) => (b.onclick = () => { n = (n + Number(b.dataset.z) + links.length) % links.length; pintar(); }));
  };
  pintar();
  dlg.onkeydown = (e) => {
    if (links.length < 2 || (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft')) return;
    n = (n + (e.key === 'ArrowRight' ? 1 : -1) + links.length) % links.length;
    pintar();
  };
  if (!dlg.open) dlg.showModal();
}
if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    const a = e.target.closest?.('a[data-zoom]');
    if (!a || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    verImagem(a);
  });
}

// Filtros do quadro guardados no navegador (localStorage): sobrevivem a voltar de um ticket, fechar a janela,
// ir para outra tela, abrir o Radar em outra aba ou fechar o navegador. "Limpar" volta ao padrão.
// sessionStorage não servia: vale só para a aba e some no navegador do WhatsApp/Teams a cada abertura.
const FILTROS_KEY = 'radar.tickets.filtros';
const lerFiltros = () => { try { const x = JSON.parse(localStorage.getItem(FILTROS_KEY)); return x && typeof x === 'object' ? x : null; } catch { return null; } };
const gravarFiltros = (f) => { try { localStorage.setItem(FILTROS_KEY, JSON.stringify({ ...f, nomes: [...f.nomes] })); } catch { /* navegação privada: segue sem lembrar */ } };

// root: elemento onde o quadro é montado; visao inicial: 'lista' ou 'kanban'.
export async function montarTickets(root, { visao = 'lista' } = {}) {
  let q = await api('/api/qualidade');
  const rot = q.rotulos;
  const f = { visao, situacao: 'abertos', tipo: '', area: '', prioridade: '', ordenar: 'prioridade', busca: '', nomes: new Set() };
  const salvos = lerFiltros();
  if (salvos) {
    for (const k of ['visao', 'situacao', 'tipo', 'area', 'prioridade', 'ordenar', 'busca']) if (typeof salvos[k] === 'string') f[k] = salvos[k];
    if (!SITUACOES[f.situacao]) f.situacao = 'abertos';
    if (f.visao !== 'kanban') f.visao = 'lista';
    if (Array.isArray(salvos.nomes)) f.nomes = new Set(salvos.nomes.map(String));
  }
  // Quem abriu: lista de nomes para o filtro de multisseleção (com a quantidade de tickets de cada um).
  const contaNomes = () => q.tickets.reduce((m, t) => m.set(t.nome, (m.get(t.nome) ?? 0) + 1), new Map());
  const opts = (obj, todos) => `<option value="">${todos}</option>${Object.entries(obj).map(([k, v]) => `<option value="${k}">${esc(v)}</option>`).join('')}`;

  root.innerHTML = `
    <div id="tk-quadro">
    <div class="tk-barra">
      <div class="theme-seg tk-visao" role="radiogroup" aria-label="Visualização">
        <button type="button" role="radio" data-visao="lista">${icon('layers', { size: 14 })}Lista</button>
        <button type="button" role="radio" data-visao="kanban">${icon('layout', { size: 14 })}Kanban</button>
      </div>
      <label class="tk-quem"><span>Seu nome</span><input id="tk-nome" type="text" maxlength="80" autocomplete="off" list="tk-nomes" placeholder="Para mover cartões entre colunas"></label>
    </div>
    <div class="tk-filtros">
      <div class="theme-seg tk-sit" role="radiogroup" aria-label="Situação">${Object.entries(SITUACOES).map(([k, v]) => `<button type="button" role="radio" data-sit="${k}">${v}</button>`).join('')}</div>
      <input id="tk-busca" type="search" placeholder="Buscar por código, título, nome ou texto" aria-label="Buscar tickets">
      <select id="tk-tipo" aria-label="Tipo">${opts(rot.tipos, 'Todos os tipos')}</select>
      <select id="tk-area" aria-label="Área">${opts(rot.areas, 'Todas as áreas')}</select>
      <details class="tk-multi" id="tk-nomes-f"><summary class="btn sm"><span id="tk-nomes-rot">Aberto por: todos</span>${icon('chevronDown', { size: 13 })}</summary><div class="tk-multi-pop" role="group" aria-label="Filtrar por quem abriu"></div></details>
      <select id="tk-prio" aria-label="Prioridade">${opts({ ...rot.prioridades, nd: 'A definir' }, 'Todas as prioridades')}</select>
      <select id="tk-ordem" aria-label="Ordenar">${Object.entries(ORDENAR).map(([k, v]) => `<option value="${k}">Ordenar: ${v}</option>`).join('')}</select>
      <button type="button" class="btn sm ghost" id="tk-limpar">${icon('x', { size: 13 })}Limpar</button>
    </div>
    <p class="tk-conta muted small" id="tk-conta" aria-live="polite"></p>
    <div id="tk-area-lista"></div>
    </div>
    <div id="tk-detalhe" class="tk-dlg" hidden></div>
    <datalist id="tk-nomes">${[...new Set(q.tickets.flatMap((t) => [t.nome, ...t.historico.map((h) => h.autor)]))].filter(Boolean).sort().map((n) => `<option value="${esc(n)}">`).join('')}</datalist>`;

  // O nome é pedido em cada formulário (login compartilhado) e no alto do kanban, para arrastar cartões.
  let autor = '';
  const pedirNome = (input) => {
    autor = input.value.trim();
    if (autor) return true;
    toast('Escreva o seu nome para registrar a mudança.', 'error');
    input.focus();
    return false;
  };

  const filtrados = () => {
    const termo = f.busca.toLowerCase();
    const lista = q.tickets.filter((t) => (f.visao === 'kanban' || passaSituacao(t, f.situacao))
      && (!f.tipo || t.tipo === f.tipo) && (!f.area || t.area === f.area)
      && (!f.prioridade || (f.prioridade === 'nd' ? !t.prioridade : t.prioridade === f.prioridade))
      && (!f.nomes.size || f.nomes.has(t.nome))
      && (!termo || `${t.codigo} ${t.titulo} ${t.nome} ${t.texto} ${t.proposta ?? ''}`.toLowerCase().includes(termo)));
    const prio = (t) => ORDEM_PRIO.indexOf(t.prioridade ?? null);
    const cmp = {
      prioridade: (a, b) => prio(a) - prio(b) || b.criadoEm.localeCompare(a.criadoEm),
      recentes: (a, b) => b.criadoEm.localeCompare(a.criadoEm),
      antigos: (a, b) => a.criadoEm.localeCompare(b.criadoEm),
      atualizados: (a, b) => atualizadoEm(b).localeCompare(atualizadoEm(a)),
    }[f.ordenar];
    return lista.sort(cmp);
  };

  const meta = (t) => `${esc(rot.tipos[t.tipo] ?? t.tipo)} · ${esc(rot.areas[t.area] ?? t.area)} · ${esc(t.nome)} · ${dateBR(t.criadoEm)}`;
  const clipe = (t) => (t.imagens?.length ? `<span class="tk-clip" title="${t.imagens.length} imagem(ns)">${icon('file', { size: 13 })}${t.imagens.length}</span>` : '')
    + (t.proposta ? `<span class="tk-clip tk-tem-proposta" title="Proposta de solução definida pelo time">${icon('bulb', { size: 13 })}</span>` : '');

  function lista(ts) {
    if (!ts.length) return '<p class="muted tk-vazio">Nenhum ticket com esses filtros.</p>';
    return `<div class="tk-tabela" role="table" aria-label="Tickets">
      <div class="tk-linha tk-cab" role="row"><span role="columnheader">Prioridade</span><span role="columnheader">Ticket</span><span role="columnheader">Situação</span><span role="columnheader">Atualizado</span></div>
      ${ts.map((t) => `<button type="button" class="tk-linha" role="row" data-abrir="${esc(t.codigo)}">
        <span role="cell">${chipPrio(t.prioridade, rot)}</span>
        <span role="cell" class="tk-tit"><b class="qa-cod">${esc(t.codigo)}</b> <span>${esc(t.titulo || t.texto.slice(0, 80))}</span>${clipe(t)}<span class="muted small tk-meta">${meta(t)}</span></span>
        <span role="cell">${chipStatus(t.status, rot)}${t.versaoCorrecao && t.status === 'corrigido' ? `<span class="muted small"> ${esc(t.versaoCorrecao)}</span>` : ''}</span>
        <span role="cell" class="muted small">${dateBR(atualizadoEm(t))}</span>
      </button>`).join('')}
    </div>`;
  }

  function kanban(ts) {
    return `<div class="tk-kanban">${Object.keys(rot.status).map((s) => {
      const col = ts.filter((t) => t.status === s);
      return `<section class="tk-col" data-col="${s}" aria-label="${esc(rot.status[s])}">
        <header>${chipStatus(s, rot)}<span class="muted small">${col.length}</span></header>
        <div class="tk-cards">${col.map((t) => `<article class="tk-card" draggable="true" data-card="${esc(t.codigo)}" tabindex="0" aria-label="${esc(`${t.codigo}: ${t.titulo}`)}">
          <div class="tk-card-top"><b class="qa-cod">${esc(t.codigo)}</b>${chipPrio(t.prioridade, rot)}${clipe(t)}</div>
          <p>${esc(t.titulo || t.texto.slice(0, 80))}</p>
          <span class="muted small">${esc(rot.tipos[t.tipo] ?? t.tipo)} · ${esc(rot.areas[t.area] ?? t.area)}</span>
        </article>`).join('') || '<p class="muted small tk-col-vazia">Arraste um ticket para cá</p>'}</div>
      </section>`;
    }).join('')}</div>
    <p class="muted small">Arraste um cartão para mudar a situação, ou abra o cartão e escolha a situação.</p>`;
  }

  async function salvar(codigo, corpo, msg) {
    const r = await api('/api/tickets/editar', { codigo, autor, ...corpo });
    const i = q.tickets.findIndex((t) => t.codigo === codigo);
    q.tickets[i] = r.ticket;
    toast(msg ?? `${codigo} atualizado.`);
    pintar();
    return r.ticket;
  }

  function pintar() {
    gravarFiltros(f);
    $$('[data-visao]', root).forEach((b) => { const on = b.dataset.visao === f.visao; b.classList.toggle('on', on); b.setAttribute('aria-checked', on); });
    $$('[data-sit]', root).forEach((b) => { const on = b.dataset.sit === f.situacao; b.classList.toggle('on', on); b.setAttribute('aria-checked', on); });
    $('.tk-sit', root).hidden = f.visao === 'kanban';
    $('.tk-quem', root).hidden = f.visao !== 'kanban';
    const ts = filtrados();
    const ativos = [f.tipo, f.area, f.prioridade, f.busca].filter(Boolean).length + (f.nomes.size ? 1 : 0) + (f.visao === 'lista' && f.situacao !== 'abertos' ? 1 : 0);
    $('#tk-nomes-rot', root).textContent = !f.nomes.size ? 'Aberto por: todos' : f.nomes.size === 1 ? `Aberto por: ${[...f.nomes][0]}` : `Aberto por: ${f.nomes.size} pessoas`;
    $('#tk-conta', root).textContent = `${ts.length} ticket${ts.length === 1 ? '' : 's'}${ativos ? ` · ${ativos} filtro${ativos > 1 ? 's' : ''} ativo${ativos > 1 ? 's' : ''}` : ''}`;
    $('#tk-limpar', root).hidden = !ativos;
    const area = $('#tk-area-lista', root);
    area.innerHTML = f.visao === 'kanban' ? kanban(ts) : lista(ts);
    $$('[data-abrir]', area).forEach((b) => (b.onclick = () => detalhe(b.dataset.abrir)));
    $$('.tk-card', area).forEach((c) => {
      c.onclick = () => detalhe(c.dataset.card);
      c.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); detalhe(c.dataset.card); } };
      c.ondragstart = (e) => { e.dataTransfer.setData('text/plain', c.dataset.card); c.classList.add('arrastando'); };
      c.ondragend = () => c.classList.remove('arrastando');
    });
    $$('.tk-col', area).forEach((col) => {
      col.ondragover = (e) => { e.preventDefault(); col.classList.add('alvo'); };
      col.ondragleave = () => col.classList.remove('alvo');
      col.ondrop = async (e) => {
        e.preventDefault();
        col.classList.remove('alvo');
        const codigo = e.dataTransfer.getData('text/plain');
        const t = q.tickets.find((x) => x.codigo === codigo);
        if (!t || t.status === col.dataset.col || !pedirNome($('#tk-nome', root))) return;
        try { await salvar(codigo, { status: col.dataset.col }, `${codigo} → ${rot.status[col.dataset.col]}`); } catch (err) { toast(err.message, 'error'); }
      };
    });
  }

  // ---------- Detalhe dentro da própria aba: ver, mudar situação/prioridade com retorno, editar campos e imagens ----------
  const dlg = $('#tk-detalhe', root);
  const quadro = $('#tk-quadro', root);
  const rolarTopo = () => (root.closest('.help-body') ?? document.scrollingElement)?.scrollTo({ top: 0 });
  const rolador = () => root.closest('.help-body') ?? document.scrollingElement;
  // Voltar: reabre o quadro com a mesma visão, filtros e posição de rolagem, e marca o ticket de onde se veio.
  let posicao = 0;
  let aberto = null;
  const voltar = () => {
    dlg.hidden = true;
    quadro.hidden = false;
    pintar();
    const r = rolador();
    if (r) r.scrollTop = posicao;
    const el = aberto && $(`[data-abrir="${aberto}"], [data-card="${aberto}"]`, quadro);
    if (el) { el.classList.add('tk-volta'); el.focus({ preventScroll: true }); setTimeout(() => el.classList.remove('tk-volta'), 2500); }
    aberto = null;
  };
  const destinoVolta = () => (f.visao === 'kanban' ? 'Voltar para o kanban' : 'Voltar para a lista');
  // Esc dentro de um ticket volta para o quadro em vez de fechar a janela inteira.
  const naEsc = (e) => {
    if (!root.isConnected) { document.removeEventListener('keydown', naEsc, true); return; }
    if (e.key !== 'Escape' || dlg.hidden || document.querySelector('dialog.tk-zoom[open]')) return;
    e.preventDefault();
    e.stopPropagation();
    voltar();
  };
  document.addEventListener('keydown', naEsc, true);
  root.closest('dialog')?.addEventListener('cancel', (e) => { if (root.isConnected && !dlg.hidden) { e.preventDefault(); voltar(); } });
  const campoNome = () => `<label class="qa-field qa-nome"><span>Seu nome</span><input name="autor" type="text" maxlength="80" autocomplete="off" list="tk-nomes" required placeholder="Ex.: Ana Souza"></label>`;

  function detalhe(codigo, editando = false) {
    const t = q.tickets.find((x) => x.codigo === codigo);
    if (!t) return;
    const sel = (nomeCampo, obj, atual, vazio) => `<select name="${nomeCampo}">${vazio !== undefined ? `<option value="">${vazio}</option>` : ''}${Object.entries(obj).map(([k, v]) => `<option value="${k}"${k === (atual ?? '') ? ' selected' : ''}>${esc(v)}</option>`).join('')}</select>`;
    const imgs = t.imagens ?? [];
    const podeAnexar = Boolean(q.hospedagemImagens);
    dlg.innerHTML = `
      <header class="tk-dlg-head">
        <button type="button" class="btn sm tk-fechar" title="Volta com os mesmos filtros (atalho: Esc)">${icon('chevronRight', { size: 14, cls: 'tk-voltar-ic' })}${destinoVolta()}</button>
        <b class="qa-cod">${esc(t.codigo)}</b>${chipStatus(t.status, rot)}${chipPrio(t.prioridade, rot)}
      </header>
      ${editando ? `
      <form class="qa-form tk-editar">
        <label class="qa-field"><span>Título</span><input name="titulo" maxlength="90" required value="${esc(t.titulo)}"></label>
        <label class="qa-field"><span>Descrição</span><textarea name="texto" rows="6" maxlength="4000">${esc(t.texto)}</textarea></label>
        <div class="qa-row">
          <label class="qa-field"><span>Tipo</span>${sel('tipo', rot.tipos, t.tipo)}</label>
          <label class="qa-field"><span>Área</span>${sel('area', rot.areas, t.area)}</label>
          <label class="qa-field"><span>Prioridade</span>${sel('prioridade', rot.prioridades, t.prioridade, 'A definir')}</label>
        </div>
        <div class="qa-field"><span>Imagens</span>
          <div class="qa-prev" id="tk-imgs">${imgs.map((i, n) => `<figure data-url="${esc(i.url)}"><img src="${esc(i.thumb || i.url)}" alt="Imagem ${n + 1}"><button type="button" class="icon-btn sm" data-tirar title="Remover do ticket">${icon('x', { size: 12 })}</button></figure>`).join('')}</div>
          ${podeAnexar ? `<label class="btn sm tk-anexar">${icon('upload', { size: 14 })}Anexar imagem<input type="file" accept="image/png,image/jpeg,image/webp" multiple hidden></label>
          <span class="muted small">Até ${q.maxImagensTicket} por ticket; também dá para colar com Ctrl+V. As imagens vão para o ${esc(q.hospedagemImagens)} e ficam acessíveis a quem tiver o link: use só telas com dados fictícios.</span>`
          : '<span class="muted small">Anexo de imagens desligado neste ambiente (falta configurar a chave do ImgBB).</span>'}
        </div>
        ${campoNome()}
        <div class="dialog-actions"><button type="button" class="btn" data-cancelar>Cancelar</button><button type="submit" class="btn primary">${icon('check', { size: 15 })}Salvar alterações</button></div>
      </form>` : `
      <h3 class="tk-dlg-tit">${esc(t.titulo || t.texto.slice(0, 80))}</h3>
      <p class="muted small">${meta(t)} · ${esc(t.versao)}${t.cenario ? ` · cenário ${esc(t.cenario)} do roteiro` : ''}${t.versaoCorrecao ? ` · corrigido na ${esc(t.versaoCorrecao)}` : ''}</p>
      <p class="qa-texto">${esc(t.texto)}</p>
      ${galeriaHtml(t)}
      ${t.descricaoImagens?.length ? `<details class="small"><summary>Descrição das imagens feita pela IA</summary><ul>${t.descricaoImagens.map((d) => `<li>${esc(d)}</li>`).join('')}</ul></details>` : ''}
      <section class="tk-proposta" aria-labelledby="tk-prop-tit">
        <h4 id="tk-prop-tit">${icon('bulb', { size: 15 })}Proposta de solução <span class="muted small">(definida pelo time)</span></h4>
        ${t.proposta ? `<p class="qa-texto">${esc(t.proposta)}</p><p class="muted small">Registrada por ${esc(t.propostaPor ?? '—')} em ${horaBR(t.propostaEm)}</p>` : '<p class="muted small">Ainda não definida.</p>'}
        <button type="button" class="btn sm" data-proposta>${icon('edit', { size: 14 })}${t.proposta ? 'Editar proposta' : 'Registrar proposta'}</button>
        <form class="qa-form tk-prop-form" hidden>
          <label class="qa-field"><span>Proposta de solução</span><textarea name="proposta" rows="6" maxlength="4000" placeholder="O que o time decidiu: solução, escopo, responsáveis, versão prevista. Deixe vazio para apagar.">${esc(t.proposta ?? '')}</textarea></label>
          ${campoNome()}
          <div class="qa-acoes"><button type="submit" class="btn sm primary">${icon('check', { size: 14 })}Salvar proposta</button><button type="button" class="btn sm" data-prop-cancelar>Cancelar</button></div>
        </form>
      </section>
      <form class="qa-form tk-mover">
        <div class="qa-row">
          <label class="qa-field"><span>Situação</span>${sel('status', rot.status, t.status)}</label>
          <label class="qa-field"><span>Prioridade</span>${sel('prioridade', rot.prioridades, t.prioridade, 'A definir')}</label>
        </div>
        <label class="qa-field"><span>Retorno <em class="muted">(opcional ao mudar situação ou prioridade)</em></span><textarea name="nota" rows="2" maxlength="2000" placeholder="Ex.: Corrigido na V0.0.2: a pergunta agora mantém os projetos da resposta anterior. Pode retestar."></textarea></label>
        ${campoNome()}
        <div class="qa-acoes"><button type="submit" class="btn sm primary">${icon('check', { size: 14 })}Registrar</button><button type="button" class="btn sm" data-editar>${icon('edit', { size: 14 })}Editar ticket</button><button type="button" class="btn sm tk-apagar" data-apagar>${icon('trash', { size: 14 })}Apagar ticket</button></div>
      </form>
      <form class="qa-form tk-excluir" hidden>
        <p class="alert error">${icon('alert', { size: 16 })}<span>O ${esc(t.codigo)} vai sumir da lista, do kanban, da página de status e dos números. O registro fica guardado no servidor com o seu nome e o motivo.</span></p>
        <label class="qa-field"><span>Motivo <em class="muted">(opcional)</em></span><input name="motivo" maxlength="500" placeholder="Ex.: Duplicado do CR-004; aberto por engano."></label>
        ${campoNome()}
        <div class="qa-acoes"><button type="submit" class="btn sm tk-apagar-ok">${icon('trash', { size: 14 })}Apagar ${esc(t.codigo)}</button><button type="button" class="btn sm" data-nao-apagar>Cancelar</button></div>
      </form>
      <h4>Histórico</h4>
      ${historicoHtml(t, rot)}
      <div class="tk-dlg-pe"><button type="button" class="btn sm tk-fechar">${icon('chevronRight', { size: 14, cls: 'tk-voltar-ic' })}${destinoVolta()}</button></div>`}`;
    if (dlg.hidden) { posicao = rolador()?.scrollTop ?? 0; aberto = codigo; quadro.hidden = true; dlg.hidden = false; rolarTopo(); }
    $$('.tk-fechar', dlg).forEach((b) => (b.onclick = voltar));

    if (!editando) {
      $('[data-editar]', dlg).onclick = () => detalhe(codigo, true);
      const fp = $('.tk-prop-form', dlg);
      const btnProp = $('[data-proposta]', dlg);
      btnProp.onclick = () => { fp.hidden = false; btnProp.hidden = true; fp.proposta.focus(); };
      $('[data-prop-cancelar]', dlg).onclick = () => { fp.hidden = true; btnProp.hidden = false; fp.proposta.value = t.proposta ?? ''; };
      fp.onsubmit = async (e) => {
        e.preventDefault();
        if (!pedirNome(fp.autor)) return;
        try {
          await salvar(codigo, { proposta: fp.proposta.value }, `Proposta de solução do ${codigo} salva.`);
          detalhe(codigo);
        } catch (err) { toast(err.message, 'error'); }
      };
      const fx = $('.tk-excluir', dlg);
      $('[data-apagar]', dlg).onclick = () => { fx.hidden = false; $('.tk-mover', dlg).hidden = true; fx.motivo.focus(); };
      $('[data-nao-apagar]', dlg).onclick = () => { fx.hidden = true; $('.tk-mover', dlg).hidden = false; };
      fx.onsubmit = async (e) => {
        e.preventDefault();
        if (!pedirNome(fx.autor)) return;
        try {
          await api('/api/tickets/excluir', { codigo, autor, motivo: fx.motivo.value });
          q.tickets = q.tickets.filter((x) => x.codigo !== codigo);
          toast(`${codigo} apagado.`);
          voltar();
        } catch (err) { toast(err.message, 'error'); }
      };
      $('.tk-mover', dlg).onsubmit = async (e) => {
        e.preventDefault();
        const fm = e.target;
        if (!pedirNome(fm.autor)) return;
        try {
          await salvar(codigo, { status: fm.status.value, prioridade: fm.prioridade.value, nota: fm.nota.value });
          detalhe(codigo);
        } catch (err) { toast(err.message, 'error'); }
      };
      return;
    }

    const novas = [];
    const remover = new Set();
    const prev = $('#tk-imgs', dlg);
    const pintarNovas = () => {
      $$('figure.nova', prev).forEach((x) => x.remove());
      prev.insertAdjacentHTML('beforeend', novas.map((src, n) => `<figure class="nova"><img src="${src}" alt="Nova imagem ${n + 1}"><button type="button" class="icon-btn sm" data-tirar-nova="${n}" title="Remover">${icon('x', { size: 12 })}</button></figure>`).join(''));
      $$('[data-tirar-nova]', prev).forEach((b) => (b.onclick = () => { novas.splice(Number(b.dataset.tirarNova), 1); pintarNovas(); }));
    };
    $$('[data-tirar]', prev).forEach((b) => (b.onclick = () => { const fig = b.closest('figure'); remover.add(fig.dataset.url); fig.remove(); }));
    const total = () => imgs.length - remover.size + novas.length;
    const anexar = async (files) => {
      for (const fl of files) {
        if (!fl.type.startsWith('image/')) continue;
        if (total() >= q.maxImagensTicket) { toast(`No máximo ${q.maxImagensTicket} imagens por ticket.`, 'error'); break; }
        if (novas.length >= q.maxImagens) { toast(`Envie no máximo ${q.maxImagens} imagens por vez.`, 'error'); break; }
        novas.push(await reduzir(fl));
      }
      pintarNovas();
    };
    const inp = $('.tk-anexar input', dlg);
    if (inp) inp.onchange = (e) => anexar([...e.target.files]).then(() => { e.target.value = ''; });
    const form = $('.tk-editar', dlg);
    if (podeAnexar) form.onpaste = (e) => { const fs = [...(e.clipboardData?.files ?? [])]; if (fs.length) { e.preventDefault(); anexar(fs); } };
    $('[data-cancelar]', dlg).onclick = () => detalhe(codigo);
    form.onsubmit = async (e) => {
      e.preventDefault();
      if (!pedirNome(form.autor)) return;
      const btn = $('button[type=submit]', form);
      btn.disabled = true;
      btn.innerHTML = `${icon('loader', { size: 15 })}${novas.length ? 'Enviando imagens…' : 'Salvando…'}`;
      try {
        await salvar(codigo, { titulo: form.titulo.value, texto: form.texto.value, tipo: form.tipo.value, area: form.area.value, prioridade: form.prioridade.value, imagens: novas, remover: [...remover] });
        detalhe(codigo);
      } catch (err) {
        toast(err.message, 'error');
        btn.disabled = false;
        btn.innerHTML = `${icon('check', { size: 15 })}Salvar alterações`;
      }
    };
  }

  // ---------- Filtros ----------
  const pintarNomes = () => {
    const pop = $('.tk-multi-pop', root);
    const nomes = [...contaNomes()].sort(([a], [b]) => a.localeCompare(b, 'pt-BR'));
    pop.innerHTML = `<div class="tk-multi-acoes"><button type="button" class="btn sm ghost" data-nomes="todos">Todos</button><button type="button" class="btn sm ghost" data-nomes="nenhum">Limpar</button></div>
      ${nomes.map(([n, c]) => `<label><input type="checkbox" value="${esc(n)}"${f.nomes.has(n) ? ' checked' : ''}><span>${esc(n)}</span><em class="muted small">${c}</em></label>`).join('') || '<p class="muted small">Nenhum nome ainda.</p>'}`;
    $$('input[type=checkbox]', pop).forEach((c) => (c.onchange = () => { if (c.checked) f.nomes.add(c.value); else f.nomes.delete(c.value); pintar(); }));
    $('[data-nomes=todos]', pop).onclick = () => { nomes.forEach(([n]) => f.nomes.add(n)); pintarNomes(); pintar(); };
    $('[data-nomes=nenhum]', pop).onclick = () => { f.nomes.clear(); pintarNomes(); pintar(); };
  };
  pintarNomes();
  // Fecha a lista de nomes ao clicar fora dela.
  (root.closest('dialog') ?? document).addEventListener('click', (e) => { const d = $('#tk-nomes-f', root); if (d.open && !d.contains(e.target)) d.open = false; });
  $$('[data-visao]', root).forEach((b) => (b.onclick = () => { f.visao = b.dataset.visao; pintar(); }));
  $$('[data-sit]', root).forEach((b) => (b.onclick = () => { f.situacao = b.dataset.sit; pintar(); }));
  $('#tk-busca', root).oninput = (e) => { f.busca = e.target.value.trim(); pintar(); };
  for (const [id, k] of [['#tk-tipo', 'tipo'], ['#tk-area', 'area'], ['#tk-prio', 'prioridade'], ['#tk-ordem', 'ordenar']]) $(id, root).onchange = (e) => { f[k] = e.target.value; pintar(); };
  $('#tk-limpar', root).onclick = () => {
    Object.assign(f, { situacao: 'abertos', tipo: '', area: '', prioridade: '', busca: '' });
    f.nomes.clear();
    pintarNomes();
    $('#tk-busca', root).value = '';
    for (const id of ['#tk-tipo', '#tk-area', '#tk-prio']) $(id, root).value = '';
    pintar();
  };
  $('#tk-busca', root).value = f.busca;
  for (const [id, k] of [['#tk-tipo', 'tipo'], ['#tk-area', 'area'], ['#tk-prio', 'prioridade'], ['#tk-ordem', 'ordenar']]) $(id, root).value = f[k];
  pintar();

  return { recarregar: async () => { q = await api('/api/qualidade'); pintar(); } };
}
