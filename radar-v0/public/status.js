// Página de status (/status): link próprio, só de leitura, para acompanhar versões, tickets e feedbacks de melhoria.
// Usa os mesmos dados do menu Versão (/api/qualidade e as notas em versao.js). Fica atrás do mesmo login do Radar.

import { $, $$, esc, api, dateBR } from './common.js';
import { icon, hydrateIcons } from './icons.js';
import { NOTAS, TIPO, STATUS as SIT_NOTA } from './versao.js';
import { pizza, partesResultado } from './qualidade.js';
import { chipPrio, galeriaHtml } from './tickets-ui.js';

const ORDEM_PRIO = ['critica', 'alta', 'media', 'baixa', null];

const ABERTOS = ['aberto', 'em_correcao', 'corrigido'];
const FILTROS = { abertos: 'Em aberto', corrigido: 'Aguardando reteste', resolvidos: 'Resolvidos', todos: 'Todos' };
const filtro = { tickets: 'abertos', melhorias: 'abertos' };
const busca = { tickets: '', melhorias: '' };
let q = null;

const chip = (s, rot) => `<span class="qa-chip qa-${s}">${esc(rot[s] ?? s)}</span>`;
const ultimo = (t) => t.historico.at(-1);
const passa = (t, f) => f === 'todos' || (f === 'abertos' ? ABERTOS.includes(t.status) : f === 'corrigido' ? t.status === 'corrigido' : !ABERTOS.includes(t.status));

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
        <details><summary><span class="rn-chip rn-${SIT_NOTA[x.status][1]}">${SIT_NOTA[x.status][0]}</span><span class="muted small">${TIPO[x.tipo][0]} · ${esc(x.area)}</span><b>${esc(x.titulo)}</b></summary>
        <dl><dt>Antes</dt><dd>${esc(x.antes)}</dd><dt>${x.status === 'feito' ? 'Agora' : 'Próximo passo'}</dt><dd>${esc(x.depois)}</dd></dl></details>
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
    <nav class="st-nav" aria-label="Seções"><a href="#sec-versoes">Versões</a><a href="#sec-tickets">Tickets</a><a href="#sec-melhorias">Feedbacks de melhoria</a><a href="#sec-testes">Testes da versão</a></nav>
    <section class="st-sec" id="sec-versoes"><h2>Versões</h2><p class="muted">O que mudou em cada versão. Clique num item para ver o antes e o agora.</p>${versoes()}</section>
    ${blocoTickets('tickets', 'Tickets', 'Problemas e dúvidas relatados por feedback ou por falha no roteiro de testes, de todas as versões.', problemas)}
    ${blocoTickets('melhorias', 'Feedbacks de melhoria', 'Sugestões enviadas pelo menu Versão → Enviar feedback (tipo "Sugestão").', melhorias)}
    <section class="st-sec" id="sec-testes"><h2>Testes regressivos · ${esc(s.versao)}</h2>
      <p class="muted">${feitos} de ${previsto} cenários executados. ${esc(s.regra)} Zera a cada versão nova.</p>
      <div class="qa-pizzas">${pizza('Roteiro (todas as áreas)', partesResultado(s.geral, R), { tamanho: 150 })}${Object.entries(s.porArea).map(([a, c]) => pizza(q.rotulos.areas[a], partesResultado(c, R), { tamanho: 110 })).join('')}</div>
      ${s.anteriores.length ? `<h3>Versões anteriores</h3><div class="tbl-wrap"><table class="guide-tbl"><thead><tr><th>Versão</th><th>${R.ok}</th><th>${R.falha}</th><th>${R.bloqueado}</th></tr></thead><tbody>${s.anteriores.map((v) => `<tr><td>${esc(v.versao)}</td><td>${v.ok}</td><td>${v.falha}</td><td>${v.bloqueado}</td></tr>`).join('')}</tbody></table></div>` : ''}
    </section>`;
  $$('[data-sec]').forEach((b) => (b.onclick = () => {
    const k = b.dataset.sec;
    filtro[k] = b.dataset.f;
    $$(`[data-sec="${k}"]`).forEach((x) => { const on = x.dataset.f === filtro[k]; x.classList.toggle('on', on); x.setAttribute('aria-checked', on); });
    $(`[data-tabela="${k}"]`).innerHTML = tabela(k, listas[k]);
  }));
  $$('[data-busca]').forEach((inp) => (inp.oninput = () => { const k = inp.dataset.busca; busca[k] = inp.value.trim(); $(`[data-tabela="${k}"]`).innerHTML = tabela(k, listas[k]); }));
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
