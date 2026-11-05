// Tela "Insights": indicadores agregados da base para apoiar novas propostas (UC09).

import { $, $$, esc, brl, api, userId, currentUser, tipoLabel, onTab, onUserChange, openTab } from './common.js';
import { icon } from './icons.js';
import { openProject } from './projetos.js';

export function initInsights() {
  onTab('insights', load);
  onUserChange(() => $('#tab-insights').classList.contains('active') && load());
}

const bar = (v, max = 100, title = '') => (v == null ? '<span class="muted">—</span>' : `<div class="meter" title="${esc(title)}"><div style="width:${Math.max(3, (v / max) * 100)}%"></div><span>${v}${max === 100 ? '%' : ''}</span></div>`);
const panel = (ic, title, body, hint = '') => `<section class="panel"><h4 title="${esc(hint)}">${icon(ic, { size: 17 })}${title}</h4>${body}</section>`;

async function load() {
  const r = await api(`/api/insights?userId=${userId()}`);
  const valores = currentUser()?.verValores;
  const t = r.totais;
  const maxTec = Math.max(1, ...r.porTecnologia.map((x) => x.projetos));
  const correcoes = r.correcoes.reduce((s, c) => s + c.correcoes, 0);
  const tile = (ic, value, label, hint = '') => `<div class="tile" title="${esc(hint)}">${icon(ic, { size: 20 })}<strong>${value}</strong><span>${label}</span></div>`;
  const list = (items, fmt, cls = 'ents') => (items.length ? `<ul class="${cls}">${items.map(fmt).join('')}</ul>` : '<p class="muted">—</p>');
  $('#insights').innerHTML = `
    <div class="tiles">
      ${tile('folder', t.projetos, 'projetos', `${t.clientes} clientes`)}
      ${tile('files', t.documentos, 'documentos')}
      ${tile('trending', t.taxa_conversao != null ? `${t.taxa_conversao}%` : '—', 'conversão', `${t.ganhos} ganhos · ${t.perdidos} perdidos`)}
      ${tile('eye', r.curadoria.aguardandoRevisao, 'a revisar', 'Uploads aguardando revisão')}
      ${tile('edit', correcoes, 'correções', `${r.revisados} uploads revisados. Correções feitas nas sugestões automáticas (RNF08).`)}
    </div>
    <div class="panels">
      ${panel('building', 'Segmentos', `<table class="tbl">${r.porSegmento.map((s) => `<tr><td><a href="#" data-seg="${esc(s.segmento)}">${esc(s.segmento)}</a></td><td class="num">${s.projetos}</td><td>${bar(s.taxa_conversao, 100, 'Conversão')}</td><td class="num muted" title="Prazo médio">${s.prazo_medio ?? '—'}m</td>${valores ? `<td class="num muted" title="Valor médio">${s.valor_medio ? brl(s.valor_medio) : '—'}</td>` : ''}</tr>`).join('')}</table>`, 'Projetos, conversão e prazo médio')}
      ${panel('cpu', 'Tecnologias', `<table class="tbl">${r.porTecnologia.map((s) => `<tr><td><a href="#" data-tec="${esc(s.tecnologia)}">${esc(s.tecnologia)}</a></td><td>${bar(s.projetos, maxTec, 'Projetos')}</td><td>${bar(s.taxa_conversao, 100, 'Conversão')}</td></tr>`).join('')}</table>`, 'Uso e conversão por tecnologia')}
      ${panel('layers', 'Andam juntas', list(r.coocorrencia, (c) => `<li><span class="chip">${esc(c.tecnologia_a)}</span>${icon('plus', { size: 12 })}<span class="chip">${esc(c.tecnologia_b)}</span><small>${c.projetos}</small></li>`, 'pairs'), 'Pares de tecnologias que aparecem nos mesmos projetos: candidatos a pacotes de oferta')}
      ${panel('trending', 'Resultados comprovados', list(r.resultados, (x) => `<li>${esc(x.resultado)} <a href="#" data-proj="${x.projeto_id}" class="muted">${esc(x.cliente)}</a></li>`))}
      ${panel('bulb', 'Lições de perdas', list(r.licoesDePerdas, (x) => `<li>${esc(x.licao)} <a href="#" data-proj="${x.projeto_id}" class="muted">${esc(x.cliente)}</a></li>`))}
      ${panel('files', 'Documentos', `<table class="tbl">${r.documentosPorTipo.map((d) => `<tr><td>${esc(tipoLabel(d.tipo))}</td><td class="num">${d.documentos}</td><td>${bar(d.qualidade_media != null ? Math.round(d.qualidade_media * 100) : null, 100, 'Completude média dos metadados')}</td></tr>`).join('')}</table>`)}
      ${panel('shield', 'Curadoria', `
        <p title="Termos novos aguardando validação">${icon('tag', { size: 15 })}${r.curadoria.termosPendentes.map((x) => `<span class="chip nova">${esc(x.nome)}</span>`).join('') || '<span class="muted">nenhum termo pendente</span>'}</p>
        <p title="Projetos sem proposta final, case ou apresentação">${icon('alert', { size: 15 })}${r.curadoria.projetosSemFonteForte.map((p) => `<a href="#" data-proj="${p.id}">${esc(p.titulo)}</a>`).join(', ') || '<span class="muted">todos com fonte forte</span>'}</p>`)}
      ${r.correcoes.length ? panel('edit', 'Correções', `<table class="tbl">${r.correcoes.map((c) => `<tr><td>${esc(c.campo)}</td><td class="muted">${esc(c.metodo ?? '—')}</td><td class="num">${c.correcoes}</td></tr>`).join('')}</table>`, 'Campos que o revisor corrigiu, por método de sugestão') : ''}
    </div>`;
  $$('[data-proj]', $('#insights')).forEach((a) => (a.onclick = (e) => { e.preventDefault(); openProject(a.dataset.proj); }));
  const drill = (key, value) => { openTab('projetos'); document.dispatchEvent(new CustomEvent('radar:filtrar', { detail: { [key]: [value] } })); };
  $$('[data-seg]', $('#insights')).forEach((a) => (a.onclick = (e) => { e.preventDefault(); drill('segmentos', a.dataset.seg); }));
  $$('[data-tec]', $('#insights')).forEach((a) => (a.onclick = (e) => { e.preventDefault(); drill('tecnologias', a.dataset.tec); }));
}
