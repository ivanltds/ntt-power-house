// Qualidade da versão (menu Versão): enviar feedback, acompanhar tickets, roteiro de testes e acompanhamento.
// Os dados vêm de /api/qualidade. Imagens anexadas vão para a IA descrever o problema e não são guardadas.
// Os resultados do roteiro são da versão atual; uma versão nova começa zerada e os tickets continuam.

import { $, $$, esc, api, dateBR, toast } from './common.js';
import { icon } from './icons.js';
import { montarTickets } from './tickets-ui.js';

// O login do Radar é um só, usado por várias pessoas ao mesmo tempo: o nome é pedido em cada registro
// (feedback, retorno de ticket e resultado de cenário) e nunca vem preenchido. A lista só sugere nomes já usados.

let cache = null;
async function dados(forcar = false) {
  if (!cache || forcar) cache = await api('/api/qualidade');
  return cache;
}
// Versão escolhida no seletor do Roteiro e do Acompanhamento (a atual por padrão; as anteriores são só leitura).
let versaoVista = null;
const dadosDaVersao = async (v) => (v ? api(`/api/qualidade?versao=${encodeURIComponent(v)}`) : dados(true));
const seletorVersao = (q) => q.versoes.length < 2 ? '' : `<label class="qa-versao"><span>Versão</span><select class="qa-versao-sel">${q.versoes.map((v) => `<option value="${esc(v.versao)}"${v.versao === q.versaoVista ? ' selected' : ''}>${esc(v.versao)} · ${v.atual ? 'atual' : 'arquivada'}</option>`).join('')}</select></label>`;
const avisoArquivada = (q) => (q.arquivada ? `<p class="alert info qa-arquivada">${icon('lock', { size: 16 })}<span>A <b>${esc(q.versaoVista)}</b> está arquivada: o roteiro e os resultados dela ficam só para consulta e não podem mais ser alterados. Os testes de agora são da <b>${esc(q.versao)}</b>.</span></p>` : '');
// Monta uma seção com seletor de versão: troca a versão e redesenha só o conteúdo, sem fechar a janela.
function comVersao(body, montar) {
  const box = document.createElement('div');
  body.append(box);
  const desenhar = async () => {
    box.innerHTML = carregando();
    const q = await dadosDaVersao(versaoVista && versaoVista !== cache?.versao ? versaoVista : null);
    box.innerHTML = '';
    montar(box, q);
    const sel = $('.qa-versao-sel', box);
    if (sel) sel.onchange = () => { versaoVista = sel.value; desenhar(); };
  };
  return desenhar();
}

const carregando = () => `<p class="muted">${icon('loader', { size: 16 })} Carregando…</p>`;
const NOMES_ID = 'qa-nomes';
const campoNome = (attrs, rotulo = 'Seu nome') => `<label class="qa-field qa-nome"><span>${rotulo}</span><input ${attrs} type="text" maxlength="80" autocomplete="off" list="${NOMES_ID}" required placeholder="Ex.: Ana Souza"></label>`;
// Nomes já registrados nesta base, como sugestão ao digitar.
function listaNomes(q) {
  const nomes = new Set(q.tickets.flatMap((t) => [t.nome, ...t.historico.map((h) => h.autor)]));
  for (const r of Object.values(q.execucao.resultados)) for (const n of Object.keys(r)) nomes.add(n);
  return `<datalist id="${NOMES_ID}">${[...nomes].filter(Boolean).sort().map((n) => `<option value="${esc(n)}">`).join('')}</datalist>`;
}
const horaBR = (iso) => (iso ? `${dateBR(iso)} ${new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}` : '');

// ---------- Gráfico de pizza (SVG) ----------
// Cores de status fixas; cada fatia tem rótulo, número e porcentagem na legenda, então a cor nunca é o único sinal.
const COR = {
  ok: 'var(--qa-ok)', falha: 'var(--qa-falha)', bloqueado: 'var(--qa-bloq)', pendente: 'var(--qa-pend)',
  aberto: 'var(--qa-falha)', em_correcao: 'var(--qa-bloq)', corrigido: 'var(--qa-corr)', validado: 'var(--qa-ok)', nao_procede: 'var(--qa-pend)', nao_priorizado: 'var(--qa-adiado)',
};

export function pizza(titulo, partes, { tamanho = 150 } = {}) {
  const total = partes.reduce((s, p) => s + p.valor, 0);
  const r = tamanho / 2;
  const fatias = [];
  if (!total) {
    fatias.push(`<circle cx="${r}" cy="${r}" r="${r - 2}" fill="var(--qa-pend)" opacity=".45"><title>Sem dados</title></circle>`);
  } else {
    let ang = -Math.PI / 2;
    for (const p of partes.filter((x) => x.valor)) {
      const frac = p.valor / total;
      const dica = `${p.rotulo}: ${p.valor} (${Math.round(frac * 100)}%)`;
      if (frac >= 0.9999) {
        fatias.push(`<circle cx="${r}" cy="${r}" r="${r - 2}" fill="${COR[p.chave]}"><title>${esc(dica)}</title></circle>`);
        break;
      }
      const fim = ang + frac * 2 * Math.PI;
      const [x1, y1, x2, y2] = [r + (r - 2) * Math.cos(ang), r + (r - 2) * Math.sin(ang), r + (r - 2) * Math.cos(fim), r + (r - 2) * Math.sin(fim)];
      fatias.push(`<path d="M${r},${r} L${x1.toFixed(2)},${y1.toFixed(2)} A${r - 2},${r - 2} 0 ${frac > 0.5 ? 1 : 0} 1 ${x2.toFixed(2)},${y2.toFixed(2)} Z" fill="${COR[p.chave]}" data-fatia="${esc(dica)}"><title>${esc(dica)}</title></path>`);
      ang = fim;
    }
  }
  return `<figure class="qa-pizza">
    <figcaption>${esc(titulo)}</figcaption>
    <div class="qa-pizza-row">
      <svg viewBox="0 0 ${tamanho} ${tamanho}" width="${tamanho}" height="${tamanho}" role="img" aria-label="${esc(`${titulo}: ${partes.map((p) => `${p.rotulo} ${p.valor}`).join(', ')}`)}">${fatias.join('')}</svg>
      <ul class="qa-legenda">${partes.map((p) => `<li><i style="background:${COR[p.chave]}"></i><span>${esc(p.rotulo)}</span><b>${p.valor}</b><em>${total ? Math.round((p.valor / total) * 100) : 0}%</em></li>`).join('')}</ul>
    </div>
  </figure>`;
}

export const partesResultado = (c, R) => [
  { chave: 'ok', rotulo: R.ok, valor: c.ok }, { chave: 'falha', rotulo: R.falha, valor: c.falha },
  { chave: 'bloqueado', rotulo: R.bloqueado, valor: c.bloqueado }, { chave: 'pendente', rotulo: 'Não executado', valor: c.pendente },
];


// ---------- Enviar feedback ----------
async function reduzir(file) {
  // Captura de tela reduzida a no máximo 1600 px de largura para ir mais leve à IA.
  const img = await createImageBitmap(file);
  const escala = Math.min(1, 1600 / img.width);
  const c = Object.assign(document.createElement('canvas'), { width: Math.round(img.width * escala), height: Math.round(img.height * escala) });
  c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
  return c.toDataURL('image/jpeg', 0.85);
}

const FEEDBACK = ['feedback', 'message', 'Enviar feedback', () => carregando(), async (body) => {
  const q = await dados();
  const { areas, tipos } = q.rotulos;
  const imagens = [];
  body.insertAdjacentHTML('beforeend', `
    <p>Conte o que aconteceu. Cada envio recebe um <b>código</b> (ex.: CR-001), que o time usa para acompanhar o que você relatou.</p>
    <form id="qa-fb" class="qa-form">
      ${campoNome('id="qa-fb-nome"')}${listaNomes(q)}
      <div class="qa-row">
        <label class="qa-field"><span>Onde aconteceu</span><select id="qa-fb-area">${Object.entries(areas).map(([k, v]) => `<option value="${k}">${esc(v)}</option>`).join('')}</select></label>
        <label class="qa-field"><span>Tipo</span><select id="qa-fb-tipo">${Object.entries(tipos).map(([k, v]) => `<option value="${k}">${esc(v)}</option>`).join('')}</select></label>
      </div>
      <label class="qa-field"><span>O que aconteceu</span><textarea id="qa-fb-texto" rows="5" maxlength="4000" placeholder="Ex.: Perguntei &quot;quais os resultados neles?&quot; e a resposta trouxe projetos que não estavam na conversa."></textarea></label>
      <div class="qa-imgs">
        <label class="btn sm">${icon('upload', { size: 14 })}Anexar imagem<input id="qa-fb-img" type="file" accept="image/png,image/jpeg,image/webp" multiple hidden></label>
        <span class="muted small">Até ${q.maxImagens} capturas de tela. Você também pode colar com Ctrl+V. ${q.analiseImagens ? 'A IA examina e descreve o problema.' : 'A IA está desligada neste ambiente: as imagens não serão analisadas.'} ${q.hospedagemImagens ? `A imagem fica anexada ao ticket (guardada no ${esc(q.hospedagemImagens)}, acessível a quem tiver o link): use só telas com dados fictícios.` : 'A imagem <b>não é guardada</b>, só o texto.'}</span>
        <div id="qa-fb-prev" class="qa-prev"></div>
      </div>
      <div class="qa-acoes"><button type="submit" class="btn primary" id="qa-fb-enviar">${icon('send', { size: 15 })}Enviar feedback</button></div>
      <div id="qa-fb-out"></div>
    </form>`);
  $('.help-body > p.muted', body)?.remove();
  const prev = $('#qa-fb-prev', body);
  const pintar = () => {
    prev.innerHTML = imagens.map((src, i) => `<figure><img src="${src}" alt="Imagem ${i + 1}"><button type="button" class="icon-btn sm" data-tirar="${i}" title="Remover">${icon('x', { size: 12 })}</button></figure>`).join('');
    $$('[data-tirar]', prev).forEach((b) => (b.onclick = () => { imagens.splice(Number(b.dataset.tirar), 1); pintar(); }));
  };
  const anexar = async (files) => {
    for (const f of files) {
      if (!f.type.startsWith('image/')) continue;
      if (imagens.length >= q.maxImagens) { toast(`No máximo ${q.maxImagens} imagens.`, 'error'); break; }
      imagens.push(await reduzir(f));
    }
    pintar();
  };
  $('#qa-fb-img', body).onchange = (e) => anexar([...e.target.files]).then(() => { e.target.value = ''; });
  $('#qa-fb', body).onpaste = (e) => { const fs = [...(e.clipboardData?.files ?? [])]; if (fs.length) { e.preventDefault(); anexar(fs); } };
  $('#qa-fb', body).onsubmit = async (e) => {
    e.preventDefault();
    const nome = $('#qa-fb-nome', body).value.trim();
    const btn = $('#qa-fb-enviar', body);
    const out = $('#qa-fb-out', body);
    btn.disabled = true;
    btn.innerHTML = `${icon('loader', { size: 15 })}${imagens.length ? 'Analisando as imagens…' : 'Enviando…'}`;
    try {
      const r = await api('/api/feedback', { nome, texto: $('#qa-fb-texto', body).value, area: $('#qa-fb-area', body).value, tipo: $('#qa-fb-tipo', body).value, imagens });
      cache = null;
      document.dispatchEvent(new CustomEvent('radar:feedback-enviado'));
      $('#qa-fb-nome', body).value = '';
      const t = r.ticket;
      out.innerHTML = `<div class="qa-ok-box">${icon('check', { size: 18 })}<div><b>Ticket ${esc(t.codigo)} aberto.</b> Obrigado! Guarde o código se quiser falar com o time sobre ele.
        ${t.descricaoImagens.length ? `<p class="small"><b>O que a IA viu nas imagens:</b></p><ul class="small">${t.descricaoImagens.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>` : ''}</div></div>`;
      $('#qa-fb-texto', body).value = '';
      imagens.length = 0;
      pintar();
    } catch (err) {
      out.innerHTML = `<p class="alert warn">${icon('alert', { size: 16 })}<span>${esc(err.message)}</span></p>`;
    } finally {
      btn.disabled = false;
      btn.innerHTML = `${icon('send', { size: 15 })}Enviar feedback`;
    }
  };
}];

// ---------- Tickets: lista, kanban e edição (public/tickets-ui.js) ----------
const TICKETS = ['tickets', 'files', 'Tickets', () => carregando(), async (body) => {
  $('.help-body > p.muted', body)?.remove();
  body.insertAdjacentHTML('beforeend', `<p>Tickets abertos por feedback ou por falha no roteiro de testes. Defina a prioridade, edite, anexe imagens e mude a situação; quem abriu retesta e marca "Validado".</p><div class="tk-embed"></div>`);
  await montarTickets($('.tk-embed', body));
}];

// ---------- Roteiro de testes ----------
// Cenário que não passou na versão anterior (destaque e filtro no roteiro da versão atual).
const antes = (q, id) => q.naoPassaramAntes?.cenarios?.[id] ?? null;
const AREA_ICON = { conversas: 'message', projetos: 'folder', upload: 'upload', insights: 'chart' };
const PRIORIDADE = { alta: 'Prioridade alta', media: 'Prioridade média' };

// Registros do cenário por resultado: o que foi feito e por quem (a métrica usa só o mais recente).
function situacao(res, R) {
  const vs = Object.values(res);
  if (!vs.length) return '<span class="qa-chip qa-pendente">A fazer</span>';
  return Object.keys(R).map((k) => [k, vs.filter((v) => v.resultado === k).length]).filter(([, n]) => n)
    .map(([k, n]) => `<span class="qa-chip qa-${k}">${n} ${esc(R[k])}</span>`).join('');
}

function cenarioHtml(c, q) {
  const R = q.rotulos.resultados;
  const res = q.execucao.resultados[c.id] ?? {};
  const pior = ['falha', 'bloqueado', 'ok'].find((k) => Object.values(res).some((v) => v.resultado === k));
  const arquivos = [c.arquivo, c.arquivo2].filter(Boolean);
  return `<li class="qa-cen${pior ? ` feito qa-r-${pior}` : ''}" data-cen="${c.id}">
    <button type="button" class="qa-cen-head" aria-expanded="false">
      <b class="qa-cod">${c.id}</b><span class="qa-tt">${esc(c.titulo)}</span>
      ${antes(q, c.id) ? `<span class="qa-antes qa-antes-${antes(q, c.id).resultado}" title="Último resultado na ${esc(q.naoPassaramAntes.versao)}${antes(q, c.id).ticket ? ` · ticket ${esc(antes(q, c.id).ticket)}` : ''}">${icon('alert', { size: 12 })}${antes(q, c.id).resultado === 'falha' ? 'Falhou' : 'Bloqueado'} na ${esc(q.naoPassaramAntes.versao)}</span>` : ''}
      <span class="qa-prio qa-prio-${c.prioridade}" title="${PRIORIDADE[c.prioridade]}">${c.prioridade === 'alta' ? 'Alta' : 'Média'}</span>
      <span class="qa-sit">${situacao(res, R)}</span>
    </button>
    <div class="qa-cen-body hidden">
      <p><b>Objetivo:</b> ${esc(c.objetivo)}</p>
      ${c.preparo.length ? `<h5>Antes de começar</h5><ol>${c.preparo.map((p) => `<li>${esc(p)}</li>`).join('')}</ol>` : ''}
      ${arquivos.length ? `<p class="qa-arq">${arquivos.map((a) => `<a class="btn sm" href="/amostras/${encodeURIComponent(a)}" download>${icon('download', { size: 14 })}Baixar ${esc(a)}</a>`).join(' ')}</p>` : ''}
      <h5>Passo a passo</h5><ol>${c.passos.map((p) => `<li>${esc(p)}</li>`).join('')}</ol>
      <h5>O que deve acontecer</h5><ul class="qa-esperado">${c.esperado.map((p) => `<li>${icon('check', { size: 14 })}${esc(p)}</li>`).join('')}</ul>
      ${q.arquivada ? '' : `<form class="qa-form qa-res">
        ${campoNome('name="analista"', 'Seu nome (quem executou este cenário)')}
        <fieldset class="qa-botoes"><legend>Resultado</legend>
          ${Object.entries(R).map(([k, v]) => `<label class="qa-opcao qa-op-${k}"><input type="radio" name="r" value="${k}"><span>${esc(v)}</span></label>`).join('')}
        </fieldset>
        <p class="muted small">OK = tudo o que deve acontecer aconteceu. Falhou = algo foi diferente. Bloqueado = não deu para fazer o teste (ex.: a tela não abriu). Se você já registrou este cenário, salvar de novo com o mesmo nome substitui o seu resultado.</p>
        <label class="qa-field"><span>O que aconteceu de diferente <em class="muted">(obrigatório se Falhou ou Bloqueado)</em></span><textarea name="c" rows="2" maxlength="2000"></textarea></label>
        ${q.hospedagemImagens ? `<div class="qa-imgs qa-evid" hidden>
          <label class="btn sm">${icon('upload', { size: 14 })}Anexar evidência<input type="file" accept="image/png,image/jpeg,image/webp" multiple hidden></label>
          <span class="muted small">Até ${q.maxImagens} capturas de tela; também dá para colar com Ctrl+V. Ficam anexadas ao ticket (guardadas no ${esc(q.hospedagemImagens)}, acessíveis a quem tiver o link): use só telas com dados fictícios.</span>
          <div class="qa-prev"></div>
        </div>` : ''}
        <div class="qa-acoes"><button type="submit" class="btn sm primary">${icon('check', { size: 14 })}Salvar resultado</button></div>
      </form>`}
      ${c.tickets?.length ? `<p class="muted small">${icon('files', { size: 13 })} Este cenário retesta a correção de ${c.tickets.map(esc).join(', ')}: marcar OK valida esses tickets.</p>` : ''}
      ${Object.keys(res).length ? `<h5>Resultados na ${esc(q.versaoVista)}</h5><ul class="qa-quem">${Object.entries(res).map(([n, v]) => `<li><span class="qa-chip qa-${v.resultado}">${esc(R[v.resultado])}</span><b>${esc(n)}</b><span class="muted small">${horaBR(v.em)}${v.ticket ? ` · ticket ${esc(v.ticket)}` : ''}</span>${v.comentario ? `<span class="small qa-com">${esc(v.comentario)}</span>` : ''}</li>`).join('')}</ul>` : ''}
    </div>
  </li>`;
}

const ROTEIRO = ['roteiro', 'check', 'Roteiro de testes', () => carregando(), async (body0) => {
  $('.help-body > p.muted', body0)?.remove();
  await comVersao(body0, (body, q) => montarRoteiro(body, q));
}];

function montarRoteiro(body, q) {
  const AREAS = Object.fromEntries(['conversas', 'projetos', 'upload', 'insights'].filter((a) => q.roteiro.some((c) => c.area === a)).map((a) => [a, q.rotulos.areas[a]]));
  const filtro = { area: 'todas', prioridade: 'todas', situacao: 'todos' };
  // Filtros em linhas rotuladas, com ícone e quantidade em cada opção (V0.0.2).
  const temAntes = Object.keys(q.naoPassaramAntes?.cenarios ?? {}).length > 0;
  const grupo = (chave, ic, rotulo, ops) => `<div class="flt-row" role="group" aria-label="${rotulo}"><span class="flt-lab">${icon(ic, { size: 14 })}${rotulo}</span><div class="flt-chips">${ops.map(([k, r, oi, cls]) => `<button type="button" class="flt-chip${cls ? ` ${cls}` : ''}" data-f-${chave}="${k}" aria-pressed="false">${oi ? icon(oi, { size: 13 }) : ''}<span>${esc(r)}</span><em></em></button>`).join('')}</div></div>`;
  const passaR = (c, fx = filtro) => {
    const res = Object.values(q.execucao.resultados[c.id] ?? {});
    return (fx.area === 'todas' || c.area === fx.area) && (fx.prioridade === 'todas' || c.prioridade === fx.prioridade)
      && (fx.situacao === 'todos' || (fx.situacao === 'antes' ? Boolean(antes(q, c.id)) : fx.situacao === 'afazer' ? !res.length : res.some((v) => v.resultado !== 'ok')));
  };
  body.insertAdjacentHTML('beforeend', `
    <div class="qa-versao-bar">${seletorVersao(q)}</div>${avisoArquivada(q)}
    <p>Roteiro regressivo da <b>${esc(q.versaoVista)}</b>: ${q.roteiro.length} cenários de ${Object.values(AREAS).map(esc).join(', ')}.${q.arquivada ? '' : ' Comece pelos de <b>prioridade alta</b>. Abra o cenário, siga o passo a passo exatamente como está escrito, escreva <b>o seu nome</b> e marque o resultado. Se algo falhar, conte o que aconteceu: o Radar abre um ticket automaticamente. Se um cenário que falhou antes passar agora, o ticket dele é validado automaticamente.'}</p>
    ${q.arquivada ? '' : '<p class="muted small">O usuário do Radar é compartilhado: o nome que você escreve em cada cenário é o que identifica quem testou.</p>'}
    <div class="flt qa-filtros">
      ${grupo('area', 'grid', 'Tela', [['todas', 'Todas', 'layers'], ...Object.entries(AREAS).map(([k, v]) => [k, v, AREA_ICON[k]])])}
      ${grupo('prioridade', 'trending', 'Prioridade', [['todas', 'Todas', 'layers'], ['alta', 'Alta', null, 'prio-alta'], ['media', 'Média', null, 'prio-media']])}
      ${grupo('situacao', 'tag', 'Situação', [['todos', 'Todos', 'layers'], ['afazer', 'A fazer', 'clock'], ['falha', 'Com falha ou bloqueio', 'alert'], ...(temAntes ? [['antes', `Não passaram na ${q.naoPassaramAntes.versao}`, 'history', 'antes']] : [])])}
      <div class="flt-resumo" aria-live="polite"><span id="qa-r-conta"></span><span class="flt-ativos" id="qa-r-ativos"></span><button type="button" class="link-btn" id="qa-r-limpar">${icon('x', { size: 13 })}Limpar filtros</button></div>
    </div>
    <p id="qa-r-prog" class="small"></p>
    <div id="qa-r-lista"></div>${listaNomes(q)}`);
  const pintar = () => {
    const PADRAO = { area: 'todas', prioridade: 'todas', situacao: 'todos' };
    for (const k of Object.keys(filtro)) $$(`[data-f-${k}]`, body).forEach((b) => {
      const v = b.dataset[`f${k[0].toUpperCase()}${k.slice(1)}`];
      const on = v === filtro[k];
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on);
      $('em', b).textContent = q.roteiro.filter((c) => passaR(c, { ...filtro, [k]: v })).length;
    });
    const visiveis = q.roteiro.filter((c) => passaR(c));
    const ROT = { area: (v) => AREAS[v], prioridade: (v) => ({ alta: 'Alta', media: 'Média' })[v], situacao: (v) => ({ afazer: 'A fazer', falha: 'Com falha ou bloqueio', antes: `Não passaram na ${q.naoPassaramAntes?.versao}` })[v] };
    const ativos = Object.keys(filtro).filter((k) => filtro[k] !== PADRAO[k]);
    $('#qa-r-conta', body).textContent = `Mostrando ${visiveis.length} de ${q.roteiro.length} cenários`;
    $('#qa-r-ativos', body).innerHTML = ativos.map((k) => `<span class="fchip"><span class="muted">${({ area: 'Tela', prioridade: 'Prioridade', situacao: 'Situação' })[k]}:</span>&nbsp;${esc(ROT[k](filtro[k]))}<button type="button" data-tirar-f="${k}" title="Tirar este filtro" aria-label="Tirar o filtro">${icon('x', { size: 11 })}</button></span>`).join('');
    $$('[data-tirar-f]', body).forEach((b) => (b.onclick = () => { filtro[b.dataset.tirarF] = PADRAO[b.dataset.tirarF]; pintar(); }));
    $('#qa-r-limpar', body).hidden = !ativos.length;
    $('#qa-r-limpar', body).onclick = () => { Object.assign(filtro, PADRAO); pintar(); };
    $('#qa-r-lista', body).innerHTML = Object.entries(AREAS).map(([a, rotulo]) => {
      const cs = visiveis.filter((c) => c.area === a);
      return cs.length ? `<h4>${icon(AREA_ICON[a], { size: 16 })} ${esc(rotulo)} <span class="muted small">${cs.length} cenário${cs.length > 1 ? 's' : ''}</span></h4><ul class="qa-cens">${cs.map((c) => cenarioHtml(c, q)).join('')}</ul>` : '';
    }).join('') || '<p class="muted">Nenhum cenário com esses filtros.</p>';
    const comResultado = q.roteiro.filter((c) => Object.keys(q.execucao.resultados[c.id] ?? {}).length).length;
    const execucoes = Object.values(q.execucao.resultados).reduce((n, r) => n + Object.keys(r).length, 0);
    $('#qa-r-prog', body).innerHTML = `<b>${comResultado} de ${q.roteiro.length}</b> cenários executados na ${esc(q.versaoVista)} · ${execucoes} registro${execucoes === 1 ? '' : 's'} no total. Cada cenário é executado uma vez; os analistas dividem as áreas entre si.`;
    $$('.qa-cen', body).forEach((li) => {
      const head = $('.qa-cen-head', li);
      head.onclick = () => { const ab = head.getAttribute('aria-expanded') !== 'true'; head.setAttribute('aria-expanded', ab); $('.qa-cen-body', li).classList.toggle('hidden', !ab); };
      // Evidências: aparecem ao marcar Falhou ou Bloqueado; vão junto com o resultado.
      const evid = $('.qa-evid', li);
      const imagens = [];
      if (evid) {
        const prev = $('.qa-prev', evid);
        const pintarEvid = () => {
          prev.innerHTML = imagens.map((src, i) => `<figure><img src="${src}" alt="Evidência ${i + 1}"><button type="button" class="icon-btn sm" data-tirar="${i}" title="Remover">${icon('x', { size: 12 })}</button></figure>`).join('');
          $$('[data-tirar]', prev).forEach((b) => (b.onclick = () => { imagens.splice(Number(b.dataset.tirar), 1); pintarEvid(); }));
        };
        const anexar = async (files) => {
          for (const fl of files) {
            if (!fl.type.startsWith('image/')) continue;
            if (imagens.length >= q.maxImagens) { toast(`No máximo ${q.maxImagens} imagens.`, 'error'); break; }
            imagens.push(await reduzir(fl));
          }
          pintarEvid();
        };
        $('input[type=file]', evid).onchange = (e) => anexar([...e.target.files]).then(() => { e.target.value = ''; });
        $('.qa-res', li).onpaste = (e) => { const fs = [...(e.clipboardData?.files ?? [])]; if (fs.length && !evid.hidden) { e.preventDefault(); anexar(fs); } };
        $$('input[name=r]', li).forEach((r) => (r.onchange = () => { evid.hidden = $('.qa-res', li).r.value === 'ok'; }));
      }
      if (!$('.qa-res', li)) return;
      $('.qa-res', li).onsubmit = async (e) => {
        e.preventDefault();
        const f = e.target;
        const analista = f.analista.value.trim();
        if (!analista) { toast('Escreva o seu nome neste cenário.', 'error'); f.analista.focus(); return; }
        if (!f.r.value) { toast('Escolha OK, Falhou ou Bloqueado.', 'error'); return; }
        try {
          const btn = $('button[type=submit]', f);
          btn.disabled = true;
          if (imagens.length && f.r.value !== 'ok') btn.innerHTML = `${icon('loader', { size: 14 })}Enviando evidências…`;
          let r;
          try { r = await api('/api/testes/resultado', { cenario: li.dataset.cen, analista, resultado: f.r.value, comentario: f.c.value, imagens: f.r.value === 'ok' ? [] : imagens }); } finally { btn.disabled = false; btn.innerHTML = `${icon('check', { size: 14 })}Salvar resultado`; }
          q.execucao.resultados[li.dataset.cen] = { ...(q.execucao.resultados[li.dataset.cen] ?? {}), [analista]: r.resultado };
          cache = null;
          const val = r.resultado.validados ?? [];
          toast(r.resultado.ticket && f.r.value !== 'ok' ? `Resultado de ${analista} salvo. Ticket ${r.resultado.ticket} aberto para correção.`
            : `Resultado de ${analista} salvo.${val.length ? ` Ticket${val.length > 1 ? 's' : ''} ${val.join(', ')} validado${val.length > 1 ? 's' : ''}.` : ''}`);
          const id = li.dataset.cen;
          pintar();
          const atual = $(`.qa-cen[data-cen="${id}"]`, body);
          const prox = atual?.nextElementSibling;
          (prox ?? atual)?.scrollIntoView({ block: 'nearest' });
          if (prox) $('.qa-cen-head', prox).click();
        } catch (err) { toast(err.message, 'error'); }
      };
    });
  };
  for (const k of Object.keys(filtro)) $$(`[data-f-${k}]`, body).forEach((b) => (b.onclick = () => { filtro[k] = b.dataset[`f${k[0].toUpperCase()}${k.slice(1)}`]; pintar(); }));
  pintar();
}

// ---------- Acompanhamento ----------
const ACOMPANHAMENTO = ['acompanhamento', 'chart', 'Acompanhamento', () => carregando(), async (body0) => {
  $('.help-body > p.muted', body0)?.remove();
  await comVersao(body0, (body, q) => montarAcompanhamento(body, q));
}];

function montarAcompanhamento(body, q) {
  const s = q.resumo;
  const R = q.rotulos.resultados;
  const st = q.rotulos.status;
  const feitos = s.geral.ok + s.geral.falha + s.geral.bloqueado;
  const previsto = feitos + s.geral.pendente;
  body.insertAdjacentHTML('beforeend', `
    <div class="qa-versao-bar">${seletorVersao(q)}</div>${avisoArquivada(q)}
    <p class="muted small">${esc(s.versao)} · ${feitos} de ${previsto} cenários executados. ${esc(s.regra)} Os resultados zeram a cada versão nova; os tickets continuam.</p>
    <div class="qa-pizzas">
      ${pizza('Roteiro da versão (todas as áreas)', partesResultado(s.geral, R), { tamanho: 170 })}
      ${pizza('Tickets por situação (todas as versões)', Object.keys(st).map((k) => ({ chave: k, rotulo: st[k], valor: s.tickets[k] })), { tamanho: 170 })}
    </div>
    <h4>Por prioridade</h4>
    <div class="qa-pizzas">${pizza('Prioridade alta', partesResultado(s.porPrioridade.alta, R), { tamanho: 120 })}${pizza('Prioridade média', partesResultado(s.porPrioridade.media, R), { tamanho: 120 })}</div>
    <h4>Por área</h4>
    <div class="qa-pizzas">${Object.entries(s.porArea).map(([a, c]) => pizza(q.rotulos.areas[a], partesResultado(c, R), { tamanho: 120 })).join('')}</div>
    <h4>Por analista</h4>
    ${s.porAnalista.length ? `<div class="tbl-wrap"><table class="guide-tbl"><thead><tr><th>Analista</th><th>Cenários registrados</th><th>Áreas</th><th>${R.ok}</th><th>${R.falha}</th><th>${R.bloqueado}</th></tr></thead>
      <tbody>${s.porAnalista.map((a) => `<tr><td>${esc(a.nome)}</td><td>${a.feitos}</td><td>${a.areas.map((x) => esc(q.rotulos.areas[x] ?? x)).join(", ")}</td><td>${a.ok}</td><td>${a.falha}</td><td>${a.bloqueado}</td></tr>`).join('')}</tbody></table></div>`
      : '<p class="muted">Nenhum analista registrou resultados nesta versão ainda.</p>'}
    ${s.anteriores.length ? `<h4>Versões anteriores</h4><div class="tbl-wrap"><table class="guide-tbl"><thead><tr><th>Versão</th><th>${R.ok}</th><th>${R.falha}</th><th>${R.bloqueado}</th></tr></thead>
      <tbody>${s.anteriores.map((v) => `<tr><td>${esc(v.versao)}</td><td>${v.ok}</td><td>${v.falha}</td><td>${v.bloqueado}</td></tr>`).join('')}</tbody></table></div>` : ''}`);
}

export const SECOES_QUALIDADE = [FEEDBACK, TICKETS, ROTEIRO, ACOMPANHAMENTO];
