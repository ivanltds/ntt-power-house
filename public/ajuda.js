// Ajuda do Radar: diálogo com o guia de uso e a explicação técnica. O conteúdo fica em ajuda-conteudo.js,
// a mesma fonte que o chat usa para responder dúvidas de uso (UC14.3).

import { $, $$, state } from './common.js';
import { icon } from './icons.js';
import { GUIA, TECNICO } from './ajuda-conteudo.js';

export { flow, steps, tip, table } from './ajuda-conteudo.js';

// ---------- Diálogo ----------

export function render(titulo, subtitulo, secoes, inicial) {
  const dlg = $('#help');
  const ativa = secoes.some(([id]) => id === inicial) ? inicial : secoes[0][0];
  dlg.innerHTML = `
    <header class="dlg-head help-head"><div><span class="sub">${subtitulo}</span><h3>${titulo}</h3></div>
      <button type="button" class="icon-btn" data-close title="Fechar">${icon('x')}</button></header>
    <div class="help-grid${secoes.length === 1 ? ' solo' : ''}">
      <nav class="help-nav" aria-label="Seções">${secoes.map(([id, ic, t]) => `<button type="button" data-sec="${id}">${icon(ic, { size: 16 })}<span>${t}</span></button>`).join('')}</nav>
      <article class="help-body" tabindex="-1"></article>
    </div>`;
  const show = (id) => {
    const [, ic, t, html, bind] = secoes.find(([x]) => x === id);
    const body = $('.help-body', dlg);
    body.innerHTML = `<h2>${icon(ic, { size: 20 })}${t}</h2>${html()}`;
    // Seções interativas (formulários, listas) ligam os eventos depois de desenhadas.
    bind?.(body, show);
    $('.help-body', dlg).scrollTop = 0;
    $$('[data-sec]', dlg).forEach((b) => b.classList.toggle('on', b.dataset.sec === id));
    $(`[data-sec="${id}"]`, dlg).setAttribute('aria-current', 'true');
  };
  $$('[data-sec]', dlg).forEach((b) => (b.onclick = () => show(b.dataset.sec)));
  $('[data-close]', dlg).onclick = () => dlg.close();
  show(ativa);
  if (!dlg.open) dlg.showModal();
}

export function showGuide(secao) {
  const b = state.ctx.base;
  render('Como usar o Radar', `${b.projetos} projetos · ${b.documentos} documentos na base`, GUIA, secao);
}

export function showTech(secao) {
  render('Como o Radar funciona', 'Extração, persistência e busca semântica', TECNICO, secao);
}
