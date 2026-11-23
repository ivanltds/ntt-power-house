// Conversa dentro da ficha do projeto (CR-077, adendo 7 ponto 3).
// É a mesma conversa das Conversas (mesmo armazenamento e mesmas skills), com o foco fixo no projeto:
// "parecidos" quer dizer parecidos com este, "one page" é a deste projeto. "Abrir em Conversas" continua em tela cheia.

import { $, $$, esc, api, userId, toast, pct } from './common.js';
import { icon } from './icons.js';
import { renderTyped, bindTyped, citeNames } from './respostas.js';
import { toBase64 } from './upload.js';

const ANDAMENTO = ['Em elaboração', 'Enviada', 'Em negociação'];
const GANHO = ['Vendida', 'Em execução', 'Entregue'];

// Atalhos de acordo com o status do projeto.
function atalhos(p) {
  if (ANDAMENTO.includes(p.status_proposta)) {
    return [
      ['radar', 'Projetos parecidos', 'Quais projetos são parecidos com este?'],
      ['alert', 'Riscos de projetos parecidos', 'Que riscos aconteceram em projetos parecidos com este?'],
      ['users', 'Quem já fez algo parecido', 'Quem já fez algo parecido com este projeto e com quem posso falar?'],
      ['layout', 'Montar apresentação de cases', 'Monte uma apresentação de cases parecidos com este projeto'],
      ['paperclip', 'Comparar com a RFP anexada', null],
    ];
  }
  if (GANHO.includes(p.status_proposta)) {
    return [
      ['star', 'Gerar one page', 'Gera a one page deste projeto'],
      ['chart', 'Resumir resultados', 'Quais foram os resultados deste projeto?'],
      ['radar', 'Projetos parecidos', 'Quais projetos são parecidos com este?'],
      ['layout', 'Montar apresentação de cases', 'Monte uma apresentação de cases parecidos com este projeto'],
    ];
  }
  return [
    ['bulb', 'O que aprendemos', 'O que aprendemos com este projeto?'],
    ['radar', 'Projetos parecidos', 'Quais projetos são parecidos com este?'],
  ];
}

function textoResposta(r) {
  const names = citeNames(r);
  return String(r.resposta ?? '').split(/\n\s*\n/).map((b) => `<span class="ans-par">${esc(b.trim())
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/\[(P\d{3})\]/g, (m, id) => `<span class="cite" title="${id}">${esc(names.get(id) ?? id)}</span>`)}</span>`).join('');
}

// Resposta compacta: texto, blocos tipados (one page, apresentação, listas) e, para "parecidos", a lista de projetos.
function turnoHtml(t) {
  const r = t.resultado;
  const tipado = renderTyped(r);
  const cards = !tipado && r.resultados?.length
    ? `<ul class="cf-res">${r.resultados.map((x) => `<li><a href="#" data-proj="${esc(x.projeto_id)}">${esc(x.titulo)}</a><small>${esc(x.cliente)} · ${esc(x.status)} · ${pct(x.score)} parecido${x.detalhes?.responsavel || x.contatos?.length ? ` · fale com ${esc((x.contatos ?? []).map((c) => c.nome).join(', ') || x.detalhes.responsavel)}` : ''}</small></li>`).join('')}</ul>` : '';
  return `<div class="cf-turno"><p class="cf-q">${icon('user', { size: 13 })}${esc(t.pergunta)}</p>
    <div class="cf-a"><p class="answer">${textoResposta(r)}</p>${tipado ?? ''}${cards}</div></div>`;
}

// Monta a seção na ficha. p: projeto; opts.fecharFicha: fecha o diálogo do projeto.
export async function montarConversaFicha(container, p, { fecharFicha } = {}) {
  const st = { conversa: null, turnos: [], anexos: [], enviando: false };
  try {
    const r = await api(`/api/conversa/projeto?id=${encodeURIComponent(p.id)}&userId=${userId()}`);
    if (r.conversa) Object.assign(st, { conversa: r.conversa, turnos: r.conversa.turnos, anexos: r.conversa.anexos ?? [] });
  } catch { /* sem conversa ainda */ }

  const render = () => {
    const total = st.conversa?.total ?? 0;
    container.innerHTML = `
      <div class="cf-top">
        <span class="tag ctx" title="As perguntas daqui consideram este projeto">${icon('target', { size: 13 })}Foco: ${esc(p.id)} · ${esc(p.cliente)}</span>
        ${total ? `<span class="muted small">${total} ${total === 1 ? 'pergunta' : 'perguntas'}${total > 3 ? ' · mostrando as 3 últimas' : ''}</span>` : ''}
        <span class="cf-top-acoes">
          ${st.conversa ? `<button type="button" class="link-btn" data-cf="abrir">${icon('arrowRight', { size: 13 })}Abrir em Conversas</button><button type="button" class="link-btn" data-cf="nova">${icon('plus', { size: 13 })}Nova conversa</button>` : ''}
        </span>
      </div>
      <div class="cf-turnos">${st.turnos.length ? st.turnos.map(turnoHtml).join('') : '<p class="muted small">Pergunte algo sobre este projeto ou use um atalho. A conversa fica salva em Conversas, com o selo do projeto.</p>'}</div>
      <div class="resp-acoes cf-atalhos">${atalhos(p).map(([ic, rot, q]) => `<button type="button" class="chip-btn" ${q ? `data-q="${esc(q)}"` : 'data-cf="rfp"'}>${icon(ic, { size: 14 })}${esc(rot)}</button>`).join('')}</div>
      ${st.anexos.length ? `<p class="cf-anexos">${icon('paperclip', { size: 13 })}Nesta conversa (não vai para a base): ${st.anexos.map((a) => `<b>${esc(a.nome)}</b>`).join(', ')}</p>` : ''}
      <form class="cf-form">
        <label class="icon-btn sm cf-clip" title="Anexar um arquivo à conversa (ex.: a RFP nova). Ele fica só nesta conversa e não entra na base.">${icon('paperclip', { size: 16 })}<input type="file" hidden></label>
        <textarea rows="1" maxlength="2000" placeholder="Pergunte sobre este projeto…" aria-label="Pergunta sobre este projeto"></textarea>
        <button type="submit" class="btn sm primary" disabled>${icon('send', { size: 14 })}</button>
      </form>`;
    bindTyped(container, {
      ask: (q) => perguntar(q),
      ajuda: () => {}, feedback: () => {}, anexar: () => $('.cf-clip input', container).click(), acaoAnexo: () => {},
    });
    const ta = $('.cf-form textarea', container);
    const btn = $('.cf-form button[type=submit]', container);
    ta.oninput = () => { btn.disabled = !ta.value.trim() || st.enviando; ta.style.height = 'auto'; ta.style.height = `${Math.min(ta.scrollHeight, 140)}px`; };
    ta.onkeydown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (ta.value.trim()) perguntar(ta.value); } };
    $('.cf-form', container).onsubmit = (e) => { e.preventDefault(); if (ta.value.trim()) perguntar(ta.value); };
    $$('[data-q]', container).forEach((b) => (b.onclick = () => perguntar(b.dataset.q)));
    $('[data-cf=rfp]', container)?.addEventListener('click', () => {
      if (st.anexos.length) perguntar('O que esta RFP pede e quais projetos nossos já fizeram algo parecido?');
      else { toast('Anexe a RFP pelo clipe da conversa; depois clique de novo em "Comparar com a RFP anexada".'); $('.cf-clip input', container).click(); }
    });
    $('.cf-clip input', container).onchange = (e) => { const f = e.target.files[0]; e.target.value = ''; if (f) anexar(f); };
    $('[data-cf=abrir]', container)?.addEventListener('click', () => {
      fecharFicha?.();
      document.dispatchEvent(new CustomEvent('radar:abrir-conversa', { detail: { id: st.conversa.id } }));
    });
    $('[data-cf=nova]', container)?.addEventListener('click', () => { Object.assign(st, { conversa: null, turnos: [], anexos: [] }); render(); $('.cf-form textarea', container).focus(); });
  };

  const aguardando = (txt) => $('.cf-turnos', container).insertAdjacentHTML('beforeend', `<div class="cf-turno cf-pend"><p class="muted small">${icon('loader', { size: 14, cls: 'spin' })} ${esc(txt)}</p></div>`);

  async function perguntar(q) {
    if (st.enviando) return;
    st.enviando = true;
    aguardando('Buscando…');
    $('.cf-turnos', container).lastElementChild.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    try {
      const r = await api('/api/buscar', { query: q, userId: userId(), projetoId: p.id, conversaId: st.conversa?.id });
      st.conversa = { ...(st.conversa ?? {}), id: r.conversa.id, titulo: r.conversa.titulo, total: r.conversa.turnos };
      st.turnos = [...st.turnos, { turnoId: r.turnoId, pergunta: q, resultado: r }].slice(-3);
      document.dispatchEvent(new CustomEvent('radar:conversas-mudaram'));
    } catch (err) {
      toast(err.message, 'error');
    }
    st.enviando = false;
    render();
    $('.cf-turnos', container).lastElementChild?.scrollIntoView({ block: 'nearest' });
  }

  async function anexar(file) {
    aguardando(`Lendo ${file.name}…`);
    try {
      const r = await api('/api/conversa/anexo', { nome: file.name, conteudoBase64: toBase64(await file.arrayBuffer()), userId: userId(), projetoId: p.id, conversaId: st.conversa?.id });
      st.conversa = { ...(st.conversa ?? { total: 0 }), id: r.conversa.id };
      st.anexos = [...st.anexos, r.anexo];
      toast(`${file.name} anexado à conversa (não vai para a base)`);
    } catch (err) {
      toast(err.message, 'error');
    }
    render();
  }

  render();
}
