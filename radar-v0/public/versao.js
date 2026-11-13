// Versão do Radar e notas da versão (release notes).
// A cada correção entregue, acrescente um item em NOTAS (a versão mais nova primeiro) e, ao fechar
// uma versão, crie uma nova entrada e atualize VERSAO. O selo ao lado do título abre esta tela.
// status do item: 'feito' (no ar) | 'andamento' (sendo corrigido) | 'analise' (investigando a causa)

import { icon } from './icons.js';
import { render, table, tip } from './ajuda.js';
import { SECOES_QUALIDADE } from './qualidade.js';

export const VERSAO = 'V0.0.2';

export { NOTAS } from './notas-versao.js';
import { NOTAS } from './notas-versao.js';

export const TIPO = { correcao: ['Correção', 'bug'], melhoria: ['Melhoria', 'sparkle'] };
export const STATUS = { feito: ['No ar', 'ok'], andamento: ['Corrigindo', 'run'], analise: ['Em análise', 'wait'] };

const chip = (s) => `<span class="rn-chip rn-${STATUS[s][1]}">${STATUS[s][0]}</span>`;

const item = (i) => `
  <li class="rn-item">
    <div class="rn-top">${chip(i.status)}<span class="rn-tipo">${TIPO[i.tipo][0]} · ${i.area}</span></div>
    <b>${i.titulo}</b>${i.tickets?.length ? `<span class="rn-tks">${i.tickets.map((c) => `<code>${c}</code>`).join(' ')}</span>` : ''}
    <dl><dt>Antes</dt><dd>${i.antes}</dd><dt>${i.status === 'feito' ? 'Agora' : 'Próximo passo'}</dt><dd>${i.depois}</dd></dl>
  </li>`;

const secao = (n) => [n.versao, 'tag', `${n.versao} · ${n.estado}`, () => {
  const cont = Object.keys(STATUS).map((s) => [STATUS[s][0], n.itens.filter((i) => i.status === s).length]).filter(([, q]) => q);
  return `
    <p class="muted small">Iniciada em ${n.data} · ${cont.map(([t, q]) => `${q} ${t.toLowerCase()}`).join(' · ')}</p>
    <p>${n.resumo}</p>
    <ul class="rn-list">${n.itens.map(item).join('')}</ul>`;
}];

const COMO = ['como', 'info', 'Como ler', () => `
  <p>Cada versão lista o que mudou no Radar, com o comportamento <b>antes</b> e <b>agora</b>.</p>
  ${table(['Situação', 'Significado'], Object.values(STATUS).map(([t, c]) => [`<span class="rn-chip rn-${c}">${t}</span>`, { ok: 'Já está no ambiente publicado.', run: 'Causa conhecida, correção em desenvolvimento.', wait: 'Problema relatado, causa ainda em investigação.' }[c]]))}
  <h4>Feedbacks e testes</h4>
  <p><b>Enviar feedback</b> abre um ticket com código (CR-001, CR-002…). <b>Tickets</b> mostra os abertos e o retorno de cada correção. <b>Roteiro de testes</b> é o checklist regressivo da versão: cada analista marca OK, Falhou ou Bloqueado; uma falha abre um ticket automaticamente. <b>Acompanhamento</b> mostra o andamento em gráficos.</p>
  ${tip('Ao publicar uma versão nova, o roteiro começa zerado para ela. Os tickets não resolvidos continuam abertos e o histórico das versões anteriores fica no Acompanhamento.')}`];

// Só o formulário de feedback, sem as seções de versão, tickets e testes (lateral das conversas e convite de opinião).
export function showFeedback() {
  render('Enviar feedback', 'Conte o que aconteceu ou o que você mudaria', [SECOES_QUALIDADE.find(([id]) => id === 'feedback')]);
}

export function showReleaseNotes(v = NOTAS[0].versao) {
  render(`Versão ${VERSAO}`, 'Notas da versão, feedbacks e testes regressivos · protótipo com dados fictícios', [...NOTAS.map(secao), ...SECOES_QUALIDADE, COMO], v);
}
