// Listas editáveis de pessoas, organizações, resultados, lições e riscos.
// Usadas na revisão do upload (UC02.15) e na edição de documento (UC07.4).

import { $, $$, esc } from './common.js';
import { icon } from './icons.js';

// Listas editáveis de entidades: o revisor remove o que não procede e acrescenta o que faltou.
export const ELISTS = [
  ['pessoas', 'users', 'Pessoas', 'Nome', true],
  ['organizacoes', 'building', 'Organizações', 'Cliente, parceiro, concorrente…'],
  ['kpis', 'trending', 'Resultados', 'Ex.: redução de 30% no tempo de atendimento'],
  ['licoes', 'bulb', 'Lições aprendidas', 'O que funcionou ou faria diferente'],
  ['riscos', 'alert', 'Riscos', 'Ex.: dependência de dados do cliente'],
];
const elItem = (e) => `<li data-valor="${esc(e.valor)}" data-papel="${esc(e.papel ?? '')}"${e.evidencia ? ` title="${esc(`Trecho: “${e.evidencia}”`)}"` : ''}>
  <span>${esc(e.valor)}${e.papel ? ` <small>${esc(e.papel)}</small>` : ''}</span>
  <button type="button" class="icon-btn sm" data-rm title="Remover" aria-label="Remover ${esc(e.valor)}">${icon('x', { size: 14 })}</button></li>`;
export const elist = ([tipo, ic, label, ph, papel], items = []) => `<div class="elist" data-elist="${tipo}">
  <h6>${icon(ic, { size: 14 })}${label}<em>${items.length || ''}</em></h6>
  <ul>${items.map(elItem).join('')}</ul>
  <div class="elist-add"><input data-add placeholder="${esc(ph)}" aria-label="Adicionar em ${label}">${papel ? '<input data-papel placeholder="Papel" aria-label="Papel">' : ''}<button type="button" class="icon-btn sm" data-addbtn title="Adicionar" aria-label="Adicionar em ${label}">${icon('plus', { size: 15 })}</button></div>
</div>`;

export function bindEntityLists(form) {
  const count = (box) => { $('h6 em', box).textContent = $$('li', box).length || ''; };
  for (const box of $$('[data-elist]', form)) {
    const input = $('[data-add]', box);
    const papel = $('[data-papel]', box);
    const add = () => {
      const valor = input.value.trim();
      if (!valor) return input.focus();
      const dup = $$('li', box).some((li) => li.dataset.valor.toLowerCase() === valor.toLowerCase());
      if (!dup) $('ul', box).insertAdjacentHTML('beforeend', elItem({ valor, papel: papel?.value.trim() || null }));
      input.value = '';
      if (papel) papel.value = '';
      input.focus();
      count(box);
    };
    $('[data-addbtn]', box).onclick = add;
    // Enter adiciona o item em vez de enviar o formulário.
    for (const el of [input, papel].filter(Boolean)) el.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } };
    box.addEventListener('click', (e) => { const rm = e.target.closest('[data-rm]'); if (rm) { rm.closest('li').remove(); count(box); } });
  }
}

// { pessoas: [{ valor, papel }], ... } a partir das listas do formulário.
export const readEntityLists = (form) => Object.fromEntries($$('[data-elist]', form).map((box) => [box.dataset.elist, $$('li', box).map((li) => ({ valor: li.dataset.valor, papel: li.dataset.papel || null }))]));
