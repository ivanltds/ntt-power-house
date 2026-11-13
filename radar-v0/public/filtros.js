// Campo de filtro em lista suspensa (V0.0.2): rótulo com ícone em cima e um botão que mostra o valor atual.
// Clicar abre a lista de opções, cada uma com ícone e quantidade. Seleção única (radio) ou múltipla (checkbox),
// no mesmo estilo do "Aberto por". Usado nos Tickets e no Roteiro de testes.
import { $, $$, esc } from './common.js';
import { icon } from './icons.js';

let seq = 0;

// Fecha a lista aberta ao clicar fora dela ou com Esc; abrir uma fecha as outras.
document.addEventListener('click', (e) => {
  $$('details.fsel-dd[open]').forEach((d) => { if (!d.contains(e.target)) d.open = false; });
});
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const d = e.target.closest?.('details.fsel-dd[open]');
  if (!d) return;
  e.stopPropagation();
  d.open = false;
  $('summary', d).focus();
}, true);

// el: elemento onde o campo é montado.
// cfg: { rotulo, icone, multi, todos (texto quando nada está escolhido; só multi), padrao (valor padrão; só única),
//        opcoes: () => [{ v, r, ic?, marca? }], valor: () => Set | string, mudar: (novo) => void, conta?: (v) => number }
export function campoFiltro(el, cfg) {
  const id = `fsel-${++seq}`;
  el.classList.add('fsel');
  el.innerHTML = `<span class="fsel-lab" id="${id}-lab">${icon(cfg.icone, { size: 13 })}${esc(cfg.rotulo)}</span>
    <details class="fsel-dd"><summary class="fsel-btn" aria-labelledby="${id}-lab ${id}-val"><span class="fsel-val" id="${id}-val"></span><span class="fsel-chev">${icon('chevronDown', { size: 14 })}</span></summary>
    <div class="fsel-pop" role="${cfg.multi ? 'group' : 'radiogroup'}" aria-labelledby="${id}-lab"></div></details>`;
  const dd = $('details', el);
  const pop = $('.fsel-pop', el);
  dd.addEventListener('toggle', () => {
    if (!dd.open) return;
    $$('details.fsel-dd[open]').forEach((d) => { if (d !== dd) d.open = false; });
    ($('input:checked', pop) ?? $('input', pop))?.focus({ preventScroll: true });
  });

  const marcado = (v) => (cfg.multi ? cfg.valor().has(v) : cfg.valor() === v);
  function pintar() {
    const ops = cfg.opcoes();
    const val = cfg.valor();
    const escolhidas = ops.filter((o) => marcado(o.v));
    const ativo = cfg.multi ? val.size > 0 : val !== cfg.padrao;
    const marca = (o) => (o.ic ? icon(o.ic, { size: 14 }) : o.marca ? `<i class="${o.marca}"></i>` : '');
    $('.fsel-val', el).innerHTML = cfg.multi
      ? (!escolhidas.length ? esc(cfg.todos) : `${marca(escolhidas[0])}<span>${esc(escolhidas[0].r)}</span>${escolhidas.length > 1 ? `<em>+${escolhidas.length - 1}</em>` : ''}`)
      : (escolhidas[0] ? `${marca(escolhidas[0])}<span>${esc(escolhidas[0].r)}</span>` : '');
    $('summary', el).classList.toggle('on', ativo);
    // Mantém o foco do teclado na mesma opção depois de redesenhar a lista.
    const focado = pop.contains(document.activeElement) ? document.activeElement.value : null;
    pop.innerHTML = (cfg.multi ? `<div class="fsel-acoes"><button type="button" class="link-btn" data-fsel="limpar"${val.size ? '' : ' disabled'}>${icon('x', { size: 12 })}Limpar seleção</button></div>` : '')
      + ops.map((o) => `<label class="fsel-op"><input type="${cfg.multi ? 'checkbox' : 'radio'}" name="${id}" value="${esc(o.v)}"${marcado(o.v) ? ' checked' : ''}>${marca(o)}<span>${esc(o.r)}</span>${cfg.conta ? `<em>${cfg.conta(o.v)}</em>` : ''}</label>`).join('');
    if (focado !== null) $$('input', pop).find((i) => i.value === focado)?.focus({ preventScroll: true });
    $$('input', pop).forEach((i) => (i.onchange = () => {
      if (cfg.multi) {
        const s = new Set(cfg.valor());
        if (i.checked) s.add(i.value); else s.delete(i.value);
        cfg.mudar(s);
      } else {
        dd.open = false;
        cfg.mudar(i.value);
        $('summary', el).focus({ preventScroll: true });
      }
    }));
    const limpar = $('[data-fsel=limpar]', pop);
    if (limpar) limpar.onclick = () => cfg.mudar(new Set());
  }
  return { pintar, el };
}

// Texto curto de uma seleção, para as etiquetas de filtro ativo: "Alta", "Alta, Média" ou "Alta e mais 2".
export const resumoSelecao = (rotulos) => (rotulos.length <= 2 ? rotulos.join(', ') : `${rotulos[0]} e mais ${rotulos.length - 1}`);
