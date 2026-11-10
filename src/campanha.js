// Resumo da chamada temporária de alcance (public/campanha.js) a partir dos eventos de uso.
// O login é compartilhado: contamos navegadores anônimos, não pessoas.
export function resumoCampanha(eventos, id = null) {
  const todas = eventos.filter((e) => e.tipo === 'campanha' && e.campanha);
  const alvo = id || todas.at(-1)?.campanha || null;
  const ev = todas.filter((e) => e.campanha === alvo);
  const unicos = (etapa) => new Set(ev.filter((e) => e.acao === etapa).map((e) => e.navegador)).size;
  const inicio = ev[0]?.ts ?? null;
  const viram = unicos('visto');
  const clicaram = unicos('clique');
  return {
    campanha: alvo,
    inicio,
    navegadoresQueViram: viram,
    navegadoresQueClicaram: clicaram,
    taxaDeClique: viram ? Math.round((100 * clicaram) / viram) : null,
    navegadoresQueFecharam: unicos('fechar'),
    ticketsPelaChamada: ev.filter((e) => e.acao === 'ticket').length,
    ticketsNoPeriodo: inicio ? eventos.filter((e) => e.tipo === 'feedback_aberto' && e.ts >= inicio).length : 0,
  };
}
