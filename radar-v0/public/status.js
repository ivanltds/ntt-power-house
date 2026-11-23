// Página de status (/status): link próprio, só de leitura, para acompanhar versões, tickets e feedbacks de melhoria.
// Usa os mesmos dados do menu Versão (/api/qualidade e as notas em versao.js). Fica atrás do mesmo login do Radar.

import { $, $$, esc, api, dateBR } from './common.js';
import { icon, hydrateIcons } from './icons.js';
import { NOTAS, TIPO, STATUS as SIT_NOTA } from './versao.js';
import { pizza, partesResultado } from './qualidade.js';
import { chipPrio, galeriaHtml } from './tickets-ui.js';

const ORDEM_PRIO = ['critica', 'alta', 'media', 'baixa', null];

const ABERTOS = ['aberto', 'em_correcao', 'corrigido'];
const FILTROS = { abertos: 'Em aberto', corrigido: 'Aguardando reteste', fora_mvp: 'Fora do MVP', resolvidos: 'Resolvidos', todos: 'Todos' };
const filtro = { tickets: 'abertos', melhorias: 'abertos', roteiro: 'todos' };
const busca = { tickets: '', melhorias: '', roteiro: '' };
// Filtro do roteiro da versão: pela situação de cada cenário (o resultado mais recente).
const FILTROS_ROTEIRO = { todos: 'Todos', pendente: 'Pendentes', problema: 'Falhou ou bloqueado', ok: 'OK' };
// Filtros e busca das tabelas guardados no navegador, como no quadro de tickets.
const FILTROS_KEY = 'radar.status.filtros';
try {
  const s = JSON.parse(localStorage.getItem(FILTROS_KEY)) ?? {};
  for (const k of Object.keys(filtro)) {
    if ((k === 'roteiro' ? FILTROS_ROTEIRO : FILTROS)[s.filtro?.[k]]) filtro[k] = s.filtro[k];
    if (typeof s.busca?.[k] === 'string') busca[k] = s.busca[k];
  }
} catch { /* sem localStorage: começa no padrão */ }
const gravarFiltros = () => { try { localStorage.setItem(FILTROS_KEY, JSON.stringify({ filtro, busca })); } catch { /* navegação privada */ } };
let q = null;

const chip = (s, rot) => `<span class="qa-chip qa-${s}">${esc(rot[s] ?? s)}</span>`;
const ultimo = (t) => t.historico.at(-1);
const passa = (t, f) => f === 'todos' || (f === 'abertos' ? ABERTOS.includes(t.status) : f === 'corrigido' ? t.status === 'corrigido' : f === 'fora_mvp' ? t.status === 'nao_priorizado' : !ABERTOS.includes(t.status) && t.status !== 'nao_priorizado');

function tile(rotulo, valor, detalhe = '') {
  return `<div class="st-tile"><span class="muted small">${esc(rotulo)}</span><b>${esc(valor)}</b>${detalhe ? `<span class="muted small">${esc(detalhe)}</span>` : ''}</div>`;
}

function versoes() {
  return NOTAS.map((n, i) => {
    const cont = Object.keys(SIT_NOTA).map((s) => [s, n.itens.filter((x) => x.status === s).length]).filter(([, c]) => c);
    return `<article class="st-card">
      <header class="st-card-head">
        <h3>${esc(n.versao)}</h3>
        <span class="rn-chip ${i === 0 ? 'rn-run' : 'rn-ok'}">${esc(n.estado)}</span>
        <span class="muted small">Iniciada em ${esc(n.data)} · ${cont.map(([s, c]) => `${c} ${SIT_NOTA[s][0].toLowerCase()}`).join(' · ')}</span>
      </header>
      <p>${esc(n.resumo)}</p>
      <ul class="st-itens">${n.itens.map((x) => `<li>
        <details><summary><span class="rn-chip rn-${SIT_NOTA[x.status][1]}">${SIT_NOTA[x.status][0]}</span><span class="muted small">${TIPO[x.tipo][0]} · ${esc(x.area)}</span><b>${esc(x.titulo)}</b>${x.tickets?.length ? `<span class="rn-tks">${x.tickets.map((c) => `<code>${esc(c)}</code>`).join(" ")}</span>` : ""}</summary>
        <dl><dt>Antes</dt><dd>${esc(x.antes)}</dd><dt>${x.substituido ? 'Na época' : x.status === 'feito' ? 'Agora' : 'Próximo passo'}</dt><dd>${esc(x.depois)}</dd>${x.substituido ? `<dt>Hoje</dt><dd>${esc(x.substituido)}</dd>` : ''}</dl></details>
      </li>`).join('')}</ul>
    </article>`;
  }).join('');
}

function tabela(chave, lista) {
  const rot = q.rotulos;
  const termo = busca[chave].toLowerCase();
  const ts = lista.filter((t) => passa(t, filtro[chave]) && (!termo || `${t.codigo} ${t.nome} ${t.titulo} ${t.texto}`.toLowerCase().includes(termo)))
    .sort((a, b) => ORDEM_PRIO.indexOf(a.prioridade ?? null) - ORDEM_PRIO.indexOf(b.prioridade ?? null) || b.criadoEm.localeCompare(a.criadoEm));
  if (!ts.length) return `<p class="muted">Nenhum registro ${filtro[chave] === 'todos' ? 'ainda' : 'nesta situação'}.</p>`;
  return `<div class="tbl-wrap"><table class="guide-tbl st-tbl"><thead><tr><th>Código</th><th>Prioridade</th><th>Situação</th><th>Assunto</th><th>Área</th><th>Aberto por</th><th>Aberto em</th><th>Corrigido em</th><th>Último retorno</th></tr></thead><tbody>
    ${ts.map((t) => {
      const u = ultimo(t);
      return `<tr>
        <td><b>${esc(t.codigo)}</b></td>
        <td>${chipPrio(t.prioridade, rot)}</td>
        <td>${chip(t.status, rot.status)}</td>
        <td><details><summary>${esc(t.titulo || t.texto.slice(0, 80))}</summary><p class="small">${esc(t.texto)}</p>${galeriaHtml(t)}${t.descricaoImagens?.length ? `<p class="small muted">Imagens (descrição da IA): ${t.descricaoImagens.map(esc).join(' · ')}</p>` : ''}${t.cenario ? `<p class="small muted">Cenário ${esc(t.cenario)} do roteiro</p>` : ''}</details></td>
        <td>${esc(rot.areas[t.area] ?? t.area)}</td>
        <td>${esc(t.nome)}</td>
        <td>${esc(t.versao)} · ${dateBR(t.criadoEm)}</td>
        <td>${t.versaoCorrecao ? esc(t.versaoCorrecao) : '<span class="muted">—</span>'}</td>
        <td>${u ? `<span class="small">${u.texto ? esc(u.texto) : esc(rot.status[u.para] ?? '')}</span><br><span class="muted small">${esc(u.autor)} · ${dateBR(u.em)}</span>` : '<span class="muted small">Sem retorno</span>'}</td>
      </tr>`;
    }).join('')}</tbody></table></div>`;
}

// Roteiro de testes da versão no ar: cada cenário com a situação atual, quem testou e o passo a passo completo.
const passaRoteiro = (sit, f) => f === 'todos' || (f === 'problema' ? sit === 'falha' || sit === 'bloqueado' : sit === f);
const listaPassos = (titulo, itens) => (itens?.length ? `<dt>${titulo}</dt><dd><ol class="st-passos">${itens.map((x) => `<li>${esc(x)}</li>`).join('')}</ol></dd>` : '');

function cenarios() {
  const rot = q.rotulos;
  const sit = { ...rot.resultados, pendente: 'Pendente' };
  const porId = Object.fromEntries(q.resumo.porCenario.map((c) => [c.id, c]));
  const termo = busca.roteiro.toLowerCase();
  const vis = q.roteiro.filter((c) => passaRoteiro(porId[c.id]?.situacao ?? 'pendente', filtro.roteiro) && (!termo || `${c.id} ${c.titulo} ${c.objetivo}`.toLowerCase().includes(termo)));
  if (!vis.length) return '<p class="muted">Nenhum cenário nesta situação.</p>';
  const areas = [...new Set(vis.map((c) => c.area))];
  return areas.map((a) => {
    const daArea = vis.filter((c) => c.area === a);
    return `<h3 class="st-area">${esc(rot.areas[a] ?? a)} <span class="muted small">· ${daArea.length} cenário${daArea.length === 1 ? '' : 's'}</span></h3>
    <ul class="st-itens">${daArea.map((c) => {
      const r = porId[c.id] ?? { situacao: 'pendente' };
      return `<li><details><summary>${chip(r.situacao, sit)}<code>${esc(c.id)}</code><b>${esc(c.titulo)}</b><span class="muted small">Prioridade ${esc(rot.prioridades?.[c.prioridade] ?? c.prioridade)}${r.analista ? ` · ${esc(r.analista)} em ${dateBR(r.em)}` : ''}${r.ticket ? ` · ticket ${esc(r.ticket)}` : ''}</span></summary>
        <dl><dt>Objetivo</dt><dd>${esc(c.objetivo)}</dd>${listaPassos('Antes de começar', c.preparo)}${listaPassos('Passo a passo', c.passos)}${listaPassos('O que deve acontecer', c.esperado)}${c.tickets?.length ? `<dt>Tickets que este cenário retesta</dt><dd>${c.tickets.map((t) => `<code>${esc(t)}</code>`).join(' ')}</dd>` : ''}</dl></details></li>`;
    }).join('')}</ul>`;
  }).join('');
}

function blocoRoteiro() {
  const s = q.resumo;
  return `<section class="st-sec" id="sec-roteiro"><h2>Roteiro de testes · ${esc(s.versao)}</h2>
    <p class="muted">${q.roteiro.length} cenários da versão no ar. Clique num cenário para ver o objetivo, o passo a passo e o que deve acontecer. Para registrar um resultado, use o menu Versão → Roteiro de testes no Radar.</p>
    <div class="qa-toolbar"><div class="theme-seg" role="radiogroup" aria-label="Filtro do roteiro">${Object.entries(FILTROS_ROTEIRO).map(([k, v]) => `<button type="button" role="radio" data-sec="roteiro" data-f="${k}" class="${filtro.roteiro === k ? 'on' : ''}" aria-checked="${filtro.roteiro === k}">${v}</button>`).join('')}</div>
      <input type="search" data-busca="roteiro" value="${esc(busca.roteiro)}" placeholder="Buscar por código, título ou objetivo" aria-label="Buscar no roteiro"></div>
    <div data-tabela="roteiro">${cenarios()}</div>
  </section>`;
}

function blocoTickets(chave, titulo, descricao, lista) {
  const st = q.rotulos.status;
  const partes = Object.keys(st).map((k) => ({ chave: k, rotulo: st[k], valor: lista.filter((t) => t.status === k).length }));
  return `<section class="st-sec" id="sec-${chave}">
    <h2>${titulo}</h2>
    <p class="muted">${descricao}</p>
    <div class="qa-pizzas">${pizza(`${titulo} por situação`, partes, { tamanho: 150 })}</div>
    <div class="qa-toolbar"><div class="theme-seg" role="radiogroup" aria-label="Filtro de ${esc(titulo)}">${Object.entries(FILTROS).map(([k, v]) => `<button type="button" role="radio" data-sec="${chave}" data-f="${k}" class="${filtro[chave] === k ? 'on' : ''}" aria-checked="${filtro[chave] === k}">${v}</button>`).join('')}</div>
      <input type="search" data-busca="${chave}" value="${esc(busca[chave])}" placeholder="Buscar por código, nome ou texto" aria-label="Buscar em ${esc(titulo)}"></div>
    <div data-tabela="${chave}">${tabela(chave, lista)}</div>
  </section>`;
}

function pintar() {
  const s = q.resumo;
  const R = q.rotulos.resultados;
  const problemas = q.tickets.filter((t) => t.tipo !== 'sugestao');
  const melhorias = q.tickets.filter((t) => t.tipo === 'sugestao');
  const feitos = s.geral.ok + s.geral.falha + s.geral.bloqueado;
  const previsto = feitos + s.geral.pendente;
  const listas = { tickets: problemas, melhorias };
  $('#st-versao').textContent = q.versao;
  $('#st-main').innerHTML = `
    <div class="st-tiles">
      ${tile('Versão no ar', q.versao, NOTAS[0]?.estado ?? '')}
      ${tile('Tickets em aberto', problemas.filter((t) => ABERTOS.includes(t.status)).length, `${problemas.filter((t) => t.status === 'corrigido').length} aguardando reteste`)}
      ${tile('Melhorias em aberto', melhorias.filter((t) => ABERTOS.includes(t.status)).length, `${melhorias.length} sugeridas no total`)}
      ${tile('Roteiro da versão', `${previsto ? Math.round((feitos / previsto) * 100) : 0}%`, `${feitos} de ${previsto} cenários · ${s.geral.falha} com falha`)}
    </div>
    <nav class="st-nav" aria-label="Seções"><a href="#sec-versoes">Versões</a><a href="#sec-tickets">Tickets</a><a href="#sec-melhorias">Feedbacks de melhoria</a><a href="#sec-testes">Testes da versão</a><a href="#sec-roteiro">Roteiro da ${esc(q.versao)}</a></nav>
    <section class="st-sec" id="sec-versoes"><h2>Versões</h2><p class="muted">O que mudou em cada versão. Clique num item para ver o antes e o agora.</p>${versoes()}</section>
    ${blocoTickets('tickets', 'Tickets', 'Problemas e dúvidas relatados por feedback ou por falha no roteiro de testes, de todas as versões.', problemas)}
    ${blocoTickets('melhorias', 'Feedbacks de melhoria', 'Sugestões enviadas pelo menu Versão → Enviar feedback (tipo "Sugestão").', melhorias)}
    <section class="st-sec" id="sec-testes"><h2>Testes regressivos · ${esc(s.versao)}</h2>
      <p class="muted">${feitos} de ${previsto} cenários executados. ${esc(s.regra)} Zera a cada versão nova.</p>
      <div class="qa-pizzas">${pizza('Roteiro (todas as áreas)', partesResultado(s.geral, R), { tamanho: 150 })}${Object.entries(s.porArea).map(([a, c]) => pizza(q.rotulos.areas[a], partesResultado(c, R), { tamanho: 110 })).join('')}</div>
      ${s.anteriores.length ? `<h3>Versões anteriores</h3><div class="tbl-wrap"><table class="guide-tbl"><thead><tr><th>Versão</th><th>${R.ok}</th><th>${R.falha}</th><th>${R.bloqueado}</th></tr></thead><tbody>${s.anteriores.map((v) => `<tr><td>${esc(v.versao)}</td><td>${v.ok}</td><td>${v.falha}</td><td>${v.bloqueado}</td></tr>`).join('')}</tbody></table></div>` : ''}
    </section>
    ${blocoRoteiro()}`;
  const render = (k) => (k === 'roteiro' ? cenarios() : tabela(k, listas[k]));
  $$('[data-sec]').forEach((b) => (b.onclick = () => {
    const k = b.dataset.sec;
    filtro[k] = b.dataset.f;
    gravarFiltros();
    $$(`[data-sec="${k}"]`).forEach((x) => { const on = x.dataset.f === filtro[k]; x.classList.toggle('on', on); x.setAttribute('aria-checked', on); });
    $(`[data-tabela="${k}"]`).innerHTML = render(k);
  }));
  $$('[data-busca]').forEach((inp) => (inp.oninput = () => { const k = inp.dataset.busca; busca[k] = inp.value.trim(); gravarFiltros(); $(`[data-tabela="${k}"]`).innerHTML = render(k); }));
  $('#st-atualizado').textContent = `Atualizado às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
}

async function carregar() {
  try {
    q = await api('/api/qualidade');
    pintar();
  } catch (err) {
    $('#st-main').innerHTML = `<p class="login-erro">${icon('alert', { size: 16 })} Não foi possível carregar o status: ${esc(err.message)}</p>`;
  }
}

hydrateIcons();
$('#st-atualizar').onclick = carregar;
carregar();
