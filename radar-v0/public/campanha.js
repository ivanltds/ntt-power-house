// Chamada TEMPORÁRIA para medir alcance: faixa no topo convidando a abrir um feedback (ticket).
// Sem prêmio e sem promessa: o texto é chamativo, mas honesto. Para desligar, apague a CAMPANHA
// (ou deixe a data vencer). Mede, por navegador anônimo: viu, clicou, fechou e enviou ticket.
// O resultado sai em GET /api/campanha.

import { $, api, userId } from './common.js';
import { icon } from './icons.js';

export const CAMPANHA = { id: 'opiniao-2026-11', ate: '2026-11-24' };

const chave = (k) => `radar.campanha.${CAMPANHA.id}.${k}`;
// Id aleatório por navegador: o login é compartilhado, então contamos aparelhos, não pessoas.
const navegador = () => {
  let id = localStorage.getItem('radar.navegador');
  if (!id) { id = crypto.randomUUID?.() ?? String(Math.random()).slice(2); localStorage.setItem('radar.navegador', id); }
  return id;
};
const registrar = (etapa) => api('/api/evento', { tipo: 'campanha', acao: etapa, campanha: CAMPANHA.id, navegador: navegador(), userId: userId() }).catch(() => {});

export function initCampanha(abrirFeedback) {
  if (new Date().toISOString().slice(0, 10) > CAMPANHA.ate || localStorage.getItem(chave('fechada'))) return;
  const faixa = document.createElement('div');
  faixa.className = 'campanha';
  faixa.setAttribute('role', 'region');
  faixa.setAttribute('aria-label', 'Convite');
  faixa.innerHTML = `<span class="campanha-emoji" aria-hidden="true">🎮</span>
    <span class="campanha-txt"><b>Desbloqueie a próxima fase do Radar.</b> Em 1 minuto, conte o que funcionou bem, o que faltou ou o que você mudaria.</span>
    <button type="button" class="btn sm primary" id="campanha-ir">${icon('message', { size: 14 })}Dar minha opinião</button>
    <button type="button" class="icon-btn sm" id="campanha-fechar" title="Fechar" aria-label="Fechar">${icon('x', { size: 14 })}</button>`;
  $('#main').before(faixa);
  if (!sessionStorage.getItem(chave('vista'))) { sessionStorage.setItem(chave('vista'), '1'); registrar('visto'); }
  $('#campanha-ir').onclick = () => { sessionStorage.setItem(chave('clicou'), '1'); registrar('clique'); abrirFeedback(); };
  $('#campanha-fechar').onclick = () => { localStorage.setItem(chave('fechada'), '1'); registrar('fechar'); faixa.remove(); };
  // Ticket enviado depois de clicar na faixa, na mesma sessão, conta como resposta à chamada.
  document.addEventListener('radar:feedback-enviado', () => { if (sessionStorage.getItem(chave('clicou'))) registrar('ticket'); });
}

