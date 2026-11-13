// Revisão e aprovação de arquivos enviados (V0.0.2, ticket de melhoria do envio).
// O envio acontece só dentro de um projeto (bloco "Enviar arquivo" da ficha) ou pelo clipe do chat; não há mais
// a aba Enviar nem a detecção automática de projeto. A revisão é enxuta e abre numa janela, em sequência (1 de N);
// no chat, cada arquivo vira um cartão com Aprovar, Descartar e Mais detalhes.

import { $, $$, esc, api, state, userId, toast, tipoLabel, brl } from './common.js';
import { icon } from './icons.js';
import { reviewForm, bindReview, garantirProjetos } from './upload.js';

const LOW = 0.6;
export const PROCESSANDO = ['enviado', 'processando'];
export const situacao = (id) => api(`/api/upload?id=${encodeURIComponent(id)}&userId=${userId()}`);
export const meusEnvios = () => api(`/api/uploads?userId=${userId()}`);

// Espera o Radar terminar de ler o arquivo (para cartões e para a janela de revisão).
export async function quandoPronto(id, aCada) {
  for (;;) {
    const j = await situacao(id);
    if (!PROCESSANDO.includes(j.status)) return j;
    aCada?.(j);
    await new Promise((r) => setTimeout(r, 900));
  }
}

// O que precisa de olho humano: alertas, campos essenciais com pouca confiança e dados que mudam a ficha do projeto.
export async function pontosDeAtencao(job) {
  const s = job.sugestao;
  if (!s) return [];
  const c = s.campos;
  const pontos = s.alertas.filter((a) => a.nivel !== 'info').map((a) => a.mensagem);
  for (const [k, rot] of [['tipo_documental', 'Tipo'], ['titulo', 'Título'], ['confidencialidade', 'Acesso']]) {
    const f = c[k];
    if (f?.valor != null && (f.confianca ?? 0) < LOW) pontos.push(`Confira o ${rot.toLowerCase()}: ${k === 'tipo_documental' ? tipoLabel(f.valor) : f.valor}`);
  }
  if (job.projeto_alvo_id) {
    const p = (await api(`/api/projeto?id=${encodeURIComponent(job.projeto_alvo_id)}&userId=${userId()}`).catch(() => null))?.projeto;
    if (p) {
      const dif = (novo, antigo) => novo != null && novo !== '' && String(novo) !== String(antigo ?? '');
      if (dif(c.prazo_meses.valor, p.prazo_meses) && !pontos.some((x) => /prazo/i.test(x))) pontos.push(`Prazo: ${c.prazo_meses.valor} meses (a ficha diz ${p.prazo_meses ?? '—'})`);
      if (p.valor !== undefined && dif(c.valor?.valor, p.valor) && !pontos.some((x) => /valor/i.test(x))) pontos.push(`Valor: ${brl(c.valor.valor)} (a ficha diz ${p.valor != null ? brl(p.valor) : '—'})`);
    }
  }
  return pontos;
}

// Aprovação rápida com as sugestões do Radar (para arquivos sem pontos de atenção).
export async function aprovarRapido(job) {
  const c = job.sugestao.campos;
  return api('/api/upload/confirmar', {
    id: job.id, userId: userId(), metadados: {}, projeto: { modo: 'existente', id: job.projeto_alvo_id },
    tecnologias: c.tecnologias.map((t) => t.valor), servicos: c.servicos.map((t) => t.valor), atualizarProjeto: true, extras: {},
  });
}
export const descartar = (id) => api('/api/upload/rejeitar', { id, userId: userId() });

// Janela de revisão em sequência: ids na ordem; aprovar ou descartar avança; no fim chama onFim.
export async function abrirRevisao(ids, { onFim, criarProjeto = false } = {}) {
  const dlg = $('#dlg-revisao');
  const fila = [...ids];
  const total = fila.length;
  let feitos = 0;
  await garantirProjetos();
  const proximo = async () => {
    const id = fila.shift();
    if (!id) { dlg.close(); onFim?.(); return; }
    $('#rev-pos', dlg).textContent = total > 1 ? `${feitos + 1} de ${total}` : '';
    $('#rev-corpo', dlg).innerHTML = `<p class="muted">${icon('loader', { size: 16, cls: 'spin' })} Extraindo os dados…</p>`;
    if (!dlg.open) dlg.showModal();
    const job = await quandoPronto(id);
    $('#rev-nome', dlg).textContent = job.nome_arquivo;
    if (job.status !== 'aguardando_revisao') { feitos++; proximo(); return; }
    $('#rev-corpo', dlg).innerHTML = reviewForm(job, '', { enxuta: true, criarProjeto });
    bindReview(job, { onDone: (r, info) => { feitos++; if (criarProjeto && r === 'aprovado') { dlg.close(); onFim?.(info); return; } proximo(); } });
  };
  dlg.onclose = () => { fila.length = 0; };
  $('#rev-fechar', dlg).onclick = () => { dlg.close(); onFim?.(); };
  proximo();
}

// Cartões de aprovação (chat e ficha): um por arquivo, com situação, pontos de atenção e ações.
export function cartoesDeEnvio(container, ids, { aoMudar } = {}) {
  const estado = new Map();
  const pintar = () => {
    const prontos = ids.filter((id) => { const e = estado.get(id); return e?.pronto && !e.fim && e.job?.status === 'aguardando_revisao' && !e.pontos?.length; });
    container.innerHTML = `<ul class="env-cards">${ids.map((id) => {
      const e = estado.get(id);
      if (!e) return `<li class="env-card">${icon('loader', { size: 14, cls: 'spin' })}<span class="env-nome">Enviando…</span></li>`;
      if (e.fim) return `<li class="env-card fim">${icon(e.fim === 'aprovado' ? 'checkCircle' : 'x', { size: 15 })}<span class="env-nome">${esc(e.job.nome_arquivo)}</span><span class="muted small">${e.fim === 'aprovado' ? 'aprovado e na base' : 'descartado'}</span></li>`;
      if (!e.pronto) return `<li class="env-card">${icon('loader', { size: 14, cls: 'spin' })}<span class="env-nome">${esc(e.job.nome_arquivo)}</span><span class="muted small">extraindo os dados</span></li>`;
      if (e.job.status === 'erro') return `<li class="env-card erro">${icon('xCircle', { size: 15 })}<span class="env-nome">${esc(e.job.nome_arquivo)}</span><span class="small">${esc(e.job.erro)}</span><button type="button" class="btn sm ghost" data-env-desc="${id}">Remover</button></li>`;
      const c = e.job.sugestao.campos;
      return `<li class="env-card ${e.pontos.length ? 'atencao' : 'ok'}">
        <div class="env-top">${icon('file', { size: 15 })}<span class="env-nome">${esc(e.job.nome_arquivo)}</span>
          <span class="env-sit">${e.pontos.length ? `${icon('alert', { size: 13 })}${e.pontos.length} ponto${e.pontos.length > 1 ? 's' : ''} para conferir` : `${icon('checkCircle', { size: 13 })}tudo certo`}</span></div>
        <div class="env-meta muted small">${esc(tipoLabel(c.tipo_documental.valor))} · ${esc(c.titulo.valor ?? '')} · ${esc(c.confidencialidade.valor ?? '')}</div>
        ${e.pontos.length ? `<ul class="env-pontos">${e.pontos.map((p) => `<li>${icon('alert', { size: 12 })}${esc(p)}</li>`).join('')}</ul>` : ''}
        <div class="env-acoes"><button type="button" class="btn sm ghost" data-env-det="${id}">Mais detalhes</button><button type="button" class="btn sm" data-env-desc="${id}">Descartar</button><button type="button" class="btn sm primary" data-env-ok="${id}"${e.pontos.length ? ' title="Há pontos para conferir: confira em Mais detalhes ou aprove assim mesmo"' : ''}>Aprovar</button></div>
      </li>`;
    }).join('')}</ul>${prontos.length > 1 ? `<div class="env-lote"><button type="button" class="btn sm primary" data-env-lote>${icon('check', { size: 14 })}Aprovar os ${prontos.length} prontos</button></div>` : ''}`;
    $$('[data-env-ok]', container).forEach((b) => (b.onclick = () => acao(b.dataset.envOk, 'ok')));
    $$('[data-env-desc]', container).forEach((b) => (b.onclick = () => acao(b.dataset.envDesc, 'desc')));
    $$('[data-env-det]', container).forEach((b) => (b.onclick = () => abrirRevisao([b.dataset.envDet], { onFim: () => atualizar(b.dataset.envDet) })));
    $('[data-env-lote]', container)?.addEventListener('click', async () => { for (const id of prontos) await acao(id, 'ok', true); toast(`${prontos.length} arquivos aprovados`); });
  };
  const atualizar = async (id) => {
    const job = await situacao(id);
    const e = estado.get(id) ?? {};
    if (job.status === 'indexado') e.fim = 'aprovado';
    if (job.status === 'rejeitado') e.fim = 'descartado';
    estado.set(id, { ...e, job, pronto: !PROCESSANDO.includes(job.status) });
    pintar();
    aoMudar?.(e.fim ?? null);
  };
  const acao = async (id, tipo, silencioso = false) => {
    const e = estado.get(id);
    try {
      if (tipo === 'ok') { await aprovarRapido(e.job); e.fim = 'aprovado'; if (!silencioso) toast(`${e.job.nome_arquivo} aprovado`); state.ctx = await api(`/api/contexto?userId=${userId()}`); }
      else { await descartar(id); e.fim = 'descartado'; if (!silencioso) toast(`${e.job.nome_arquivo} descartado`); }
    } catch (err) { toast(err.message, 'error'); }
    pintar();
    aoMudar?.(e.fim ?? null);
  };
  pintar();
  for (const id of ids) {
    quandoPronto(id, (j) => { estado.set(id, { job: j, pronto: false, pontos: [] }); pintar(); })
      .then(async (job) => { estado.set(id, { job, pronto: true, pontos: job.status === 'aguardando_revisao' ? await pontosDeAtencao(job) : [], fim: job.status === 'indexado' ? 'aprovado' : job.status === 'rejeitado' ? 'descartado' : null }); pintar(); });
  }
}

// Ordem dos formatos para executivos: os mais comuns primeiro.
const ORDEM_FORMATOS = ['pdf', 'pptx', 'docx', 'xlsx', 'csv', 'txt', 'md', 'html', 'eml', 'vtt', 'srt', 'json'];
export const formatosOrdenados = () => [...state.ctx.catalogo.formatosUpload].sort((a, b) => {
  const [x, y] = [ORDEM_FORMATOS.indexOf(a.toLowerCase()), ORDEM_FORMATOS.indexOf(b.toLowerCase())];
  return (x < 0 ? 99 : x) - (y < 0 ? 99 : y);
});
