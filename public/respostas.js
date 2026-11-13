// Respostas do chat por tipo (adendo 5): listagem, contagem, ficha, comparação, esclarecimento e composta.
// Tabelas e números vêm dos dados devolvidos pelo servidor (consultas ao banco); o texto da IA é só a síntese.

import { $$, esc, openTab } from './common.js';
import { icon } from './icons.js';
import { openProject, statusDot } from './projetos.js';

export const TIPO_LABEL = {
  semelhantes: ['radar', 'Projetos parecidos'],
  listagem: ['files', 'Listagem'],
  contagem: ['chart', 'Contagem'],
  ficha: ['file', 'Ficha do projeto'],
  comparacao: ['layout', 'Comparação'],
  esclarecimento: ['message', 'Pergunta de volta'],
  composta: ['layers', 'Resposta em etapas'],
  resultados: ['star', 'Resultados'],
  conversa: ['message', 'Conversa'],
  ajuda: ['help', 'Dúvida de uso'],
  anexo: ['paperclip', 'Arquivo da conversa'],
  enviar_arquivo: ['upload', 'Envio de arquivo'],
};

const FERRAMENTA = {
  listar_projetos: 'listou projetos', contar_por: 'contou por campo', localizar_projeto: 'localizou o projeto', ficha_projeto: 'leu a ficha',
  buscar_semelhantes: 'buscou parecidos', buscar_trechos: 'leu trechos dos documentos',
};

export const tipoDe = (r) => r.tipoResposta ?? 'semelhantes';

export function typeTag(r) {
  const [ic, label] = TIPO_LABEL[tipoDe(r)] ?? TIPO_LABEL.semelhantes;
  const passos = r.ferramentas?.length ? `\nEtapas: ${r.ferramentas.map((f) => FERRAMENTA[f.ferramenta] ?? f.ferramenta).join(' → ')}` : '';
  return `<span class="tag tipo" title="Tipo de resposta${passos}">${icon(ic, { size: 14 })}${label}</span>`;
}

// Nomes de cliente para as citações [P001], vindos de qualquer bloco da resposta.
export function citeNames(r) {
  const names = new Map(r.resultados.map((x) => [x.projeto_id, x.cliente]));
  const add = (id, cliente) => id && cliente && !names.has(id) && names.set(id, cliente);
  const d = r.dados ?? {};
  for (const i of d.itens ?? []) add(i.projeto_id, i.cliente);
  if (d.ficha) add(d.ficha.projeto_id, d.ficha.cliente);
  for (const f of d.fichas ?? []) add(f.projeto_id, f.cliente);
  for (const p of d.projetos ?? []) add(p.projeto_id, p.cliente);
  for (const b of d.blocos ?? []) {
    for (const i of b.dados?.itens ?? []) add(i.projeto_id, i.cliente);
    if (b.dados?.ficha) add(b.dados.ficha.projeto_id, b.dados.ficha.cliente);
  }
  return names;
}

// Filtros do chat no formato da tela de Projetos (evento radar:filtrar).
function paraProjetos(f = {}) {
  const out = {};
  if (f.segmentos?.length) out.segmentos = [...f.segmentos];
  if (f.status?.length) out.status = [...f.status];
  if (f.tecnologias?.length) { out.tecnologias = [...f.tecnologias]; out.modoTecnologias = 'qualquer'; }
  if (f.servicos?.length) { out.servicos = [...f.servicos]; out.modoServicos = 'qualquer'; }
  if (f.cliente) out.cliente = f.cliente;
  if (f.anoDe) out.dataDe = `${f.anoDe}-01-01`;
  if (f.anoAte) out.dataAte = `${f.anoAte}-12-31`;
  return out;
}
const POR_CAMPO = {
  segmento: (v) => ({ segmentos: [v] }), status: (v) => ({ status: [v] }), tecnologia: (v) => ({ tecnologias: [v], modoTecnologias: 'qualquer' }),
  servico: (v) => ({ servicos: [v], modoServicos: 'qualquer' }), cliente: (v) => ({ cliente: v }), ano: (v) => ({ dataDe: `${v}-01-01`, dataAte: `${v}-12-31` }),
};
function abrirProjetos(filtros) {
  openTab('projetos');
  document.dispatchEvent(new CustomEvent('radar:filtrar', { detail: filtros }));
}

// ---------- Blocos ----------

function listagem(d) {
  if (!d.itens?.length) return '';
  return `<div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Projeto</th><th>Cliente</th><th>Segmento</th><th>Status</th><th>Ano</th></tr></thead>
    <tbody>${d.itens.map((i) => `<tr data-proj="${esc(i.projeto_id)}" tabindex="0"><td><b>${esc(i.titulo)}</b></td><td>${esc(i.cliente)}</td><td>${esc(i.segmento ?? '—')}</td><td>${statusDot(i.status)}</td><td>${i.ano ?? '—'}</td></tr>`).join('')}</tbody>
  </table></div>
  <div class="resp-acoes"><button type="button" class="chip-btn" data-abrir-projetos='${esc(JSON.stringify(paraProjetos(d.filtros)))}'>${icon('folder', { size: 14 })}${d.total > d.itens.length ? `Ver os ${d.total} em Projetos` : 'Abrir em Projetos'}</button></div>`;
}

const ALT = { segmento: 'segmento', area: 'prática NTT', servico: 'serviço', tecnologia: 'tecnologia', status: 'status', cliente: 'cliente', ano: 'ano' };

function contagem(d) {
  if (!d.linhas?.length) return '';
  const max = Math.max(...d.linhas.map((l) => l.quantidade));
  const clicavel = Boolean(POR_CAMPO[d.campo]);
  return `<ul class="contagem">${d.linhas.slice(0, 25).map((l) => `<li>
      ${clicavel && l.valor !== 'Não informado' ? `<button type="button" class="link-btn" data-filtro='${esc(JSON.stringify({ ...paraProjetos(d.filtros), ...POR_CAMPO[d.campo](l.valor) }))}' title="Abrir esses projetos">${esc(l.valor)}</button>` : `<span>${esc(l.valor)}</span>`}
      <div class="bar" aria-hidden="true"><div style="width:${Math.round((l.quantidade / max) * 100)}%"></div></div><em>${l.quantidade}</em></li>`).join('')}</ul>
    ${d.linhas.length > 25 ? `<p class="muted small">e mais ${d.linhas.length - 25}.</p>` : ''}
    ${d.alternativas?.length ? `<div class="resp-acoes">${d.alternativas.map((a) => `<button type="button" class="chip-btn" data-perguntar="Quantos projetos por ${ALT[a]}?">${icon('chart', { size: 14 })}Ver por ${ALT[a]}</button>`).join('')}</div>` : ''}`;
}

function ficha(f) {
  return `<div class="ficha-chat">
    <dl>${f.campos.map((c) => `<dt>${esc(c.rotulo)}</dt><dd class="${c.restrito ? 'restrito' : c.valor == null ? 'vazio' : ''}">${c.restrito ? icon('lock', { size: 13 }) : ''}${c.campo === 'link_sharepoint' && c.valor && /^https?:\/\//.test(c.valor) ? `<a href="${esc(c.valor)}" target="_blank" rel="noopener">${esc(c.valor)}</a>` : esc(c.texto)}</dd>`).join('')}</dl>
    <p class="muted small">${icon('info', { size: 13 })}Fonte: cadastro do projeto${f.documentos ? ` · ${f.documentos} documento(s)` : ''}${f.conflitos?.length ? ' · há valores divergentes entre os documentos, veja o detalhe' : ''}</p>
    <div class="resp-acoes"><button type="button" class="chip-btn" data-proj="${esc(f.projeto_id)}">${icon('folder', { size: 14 })}Abrir projeto</button></div>
  </div>`;
}

function comparacao(fichas) {
  if (!fichas?.length) return '';
  const linhas = fichas[0].campos.map((c) => c.campo);
  return `<div class="tbl-wrap"><table class="tbl comparar">
    <thead><tr><th></th>${fichas.map((f) => `<th><button type="button" class="link-btn" data-proj="${esc(f.projeto_id)}">${esc(f.titulo)}</button><span class="sub">${esc(f.cliente)}</span></th>`).join('')}</tr></thead>
    <tbody>${linhas.map((campo) => `<tr><th>${esc(fichas[0].campos.find((c) => c.campo === campo).rotulo)}</th>${fichas.map((f) => {
      const c = f.campos.find((x) => x.campo === campo);
      return `<td class="${c?.restrito ? 'restrito' : ''}">${c?.restrito ? icon('lock', { size: 13 }) : ''}${esc(c?.texto ?? '—')}</td>`;
    }).join('')}</tr>`).join('')}</tbody>
  </table></div>`;
}

const DOC_NOME = { case_sucesso: 'case de sucesso', ata_validada: 'ata de encerramento' };
function resultados(d) {
  if (!d.projetos?.length) return '';
  return `<ul class="resultados-lista">${d.projetos.map((p) => `<li>
      <div class="rl-head"><button type="button" class="link-btn" data-proj="${esc(p.projeto_id)}">${esc(p.titulo)}</button><span class="sub">${esc(p.cliente)} · ${statusDot(p.status)}</span></div>
      ${p.resultados.length
        ? `<ul>${p.resultados.map((r) => `<li>${esc(r)}</li>`).join('')}</ul><p class="muted small">${icon('info', { size: 13 })}Fonte: ${DOC_NOME[p.fonte?.tipo] ?? 'documento'} ${esc(p.fonte?.doc_id ?? '')}</p>`
        : `<p class="muted small">Sem resultados registrados: não há case de sucesso nem ata de encerramento.</p>`}
    </li>`).join('')}</ul>`;
}

function semelhantes(d) {
  if (!d.itens?.length) return '';
  return `<ul class="mini-lista">${d.itens.map((i) => `<li><button type="button" class="link-btn" data-proj="${esc(i.projeto_id)}">${esc(i.titulo)}</button><span class="sub">${esc(i.cliente)} · ${statusDot(i.status)}</span></li>`).join('')}</ul>`;
}

function trechos(d) {
  if (!d.frases?.length) return '';
  return d.frases.map((f) => `<blockquote>${esc(f.texto)}</blockquote>`).join('');
}

const BLOCO = {
  listagem: (d) => listagem(d), contagem: (d) => contagem(d), ficha: (d) => ficha(d.ficha), semelhantes: (d) => semelhantes(d), trechos: (d) => trechos(d),
};

// ---------- Adendo 6: conversa, dúvida de uso e arquivo da conversa ----------
const linksAjuda = (links = []) => links.map((l) => `<button type="button" class="chip-btn ghost" data-ajuda="${esc(l.tipo)}:${esc(l.secao ?? '')}">${icon(l.tipo === 'notas' ? 'sparkles' : 'info', { size: 14 })}${esc(l.rotulo)}</button>`).join('');
const chipsPerguntar = (lista = []) => lista.map((q) => `<button type="button" class="chip-btn" data-perguntar="${esc(q)}">${icon('message', { size: 14 })}${esc(q)}</button>`).join('');
const botaoFeedback = '<button type="button" class="chip-btn ghost" data-feedback>' + icon('message', { size: 14 }) + 'Enviar feedback</button>';

function conversa(d) {
  const caps = (d.capacidades ?? []).map((c) => `<li class="cap">
      <span class="cap-ic">${icon(c.icone, { size: 18 })}</span>
      <span class="cap-txt"><b>${esc(c.titulo)}</b><small>${esc(c.descricao)}</small>
        ${c.clicavel ? `<button type="button" class="link-btn cap-ex" data-perguntar="${esc(c.exemplo)}">${icon('chevronRight', { size: 13 })}${esc(c.exemplo)}</button>` : `<span class="cap-ex muted">${esc(c.exemplo)}</span>`}</span></li>`).join('');
  const acoes = [chipsPerguntar(d.sugestoes), d.anexar ? `<button type="button" class="chip-btn" data-anexar>${icon('paperclip', { size: 14 })}Anexar um arquivo</button>` : '', d.feedback ? botaoFeedback : '', linksAjuda(d.ajuda)].join('');
  return `${caps ? `<ul class="caps">${caps}</ul>` : ''}${acoes ? `<div class="resp-acoes">${acoes}</div>` : ''}`;
}

function ajuda(d) {
  const fontes = (d.fontes ?? []).map((f) => `<blockquote class="fonte-ajuda"><small>${icon('info', { size: 12 })}${esc(f.onde)}</small>${esc(f.trecho)}${f.trecho.length >= 420 ? '…' : ''}</blockquote>`).join('');
  const nov = d.novidades ? `<ul class="nov">${d.novidades.itens.slice(0, 8).map((i) => `<li>${icon(i.tipo === 'correcao' ? 'check' : 'sparkles', { size: 13 })}${esc(i.titulo)}</li>`).join('')}</ul>` : '';
  return `${nov}${fontes}<div class="resp-acoes">${linksAjuda(d.ajuda)}${d.feedback ? botaoFeedback : ''}</div>`;
}

function anexo(d) {
  if (d.acao === 'perguntar') {
    const ev = (d.evidencias ?? []).map((e) => `<blockquote class="fonte-ajuda"><small>${icon('paperclip', { size: 12 })}${esc(e.arquivo)}</small>${esc(e.trecho)}</blockquote>`).join('');
    return ev;
  }
  const r = d.resumo ?? {};
  const fatos = [
    r.tipo ? `<span title="Tipo de documento">${icon('file', { size: 14 })}${esc(r.tipo)}</span>` : '',
    r.cliente ? `<span title="Cliente">${icon('briefcase', { size: 14 })}${esc(r.cliente)}</span>` : '',
    r.segmento ? `<span title="Segmento">${icon('grid', { size: 14 })}${esc(r.segmento)}</span>` : '',
    r.prazoMeses ? `<span title="Prazo citado">${icon('clock', { size: 14 })}${esc(r.prazoMeses)} meses</span>` : '',
  ].join('');
  return `<div class="anexo-card">
    <div class="anexo-top">${icon('paperclip', { size: 16 })}<b>${esc(d.anexo?.nome ?? '')}</b>${d.anexo?.truncado ? '<span class="muted small"> · arquivo longo: li o início</span>' : ''}</div>
    ${r.tema ? `<p class="anexo-tema">${esc(r.tema)}</p>` : ''}
    ${fatos ? `<div class="facts">${fatos}</div>` : ''}
    ${r.pontos?.length ? `<h5>Pontos principais</h5><ul>${r.pontos.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
    ${r.tecnologias?.length ? `<div class="tec-tags"><span class="muted small">Tecnologias:</span>${r.tecnologias.map((t) => `<span class="tec-tag">${esc(t)}</span>`).join('')}</div>` : ''}
  </div>
  <div class="resp-acoes">${(d.acoes ?? []).map((a) => (a.acao === 'perguntar'
    ? `<button type="button" class="chip-btn" data-perguntar="${esc(a.pergunta)}">${icon(a.icone, { size: 14 })}${esc(a.rotulo)}</button>`
    : `<button type="button" class="chip-btn" data-acao-anexo="${esc(a.acao)}">${icon(a.icone, { size: 14 })}${esc(a.rotulo)}</button>`)).join('')}</div>`;
}

// Corpo da resposta para os tipos novos. Devolve null para "semelhantes" (cards do fluxo original).
export function renderTyped(r) {
  const d = r.dados ?? {};
  switch (tipoDe(r)) {
    case 'listagem': return listagem(d);
    case 'contagem': return contagem(d);
    case 'ficha': return d.ficha ? ficha(d.ficha) : '';
    case 'comparacao': return comparacao(d.fichas);
    case 'resultados': return resultados(d);
    case 'conversa': return conversa(d);
    case 'ajuda': return ajuda(d);
    case 'anexo': return anexo(d);
    case 'enviar_arquivo': return '<div class="envio-destino"></div>';
    case 'esclarecimento': return d.opcoes?.length ? `<div class="resp-acoes opcoes">${d.opcoes.map((o) => `<button type="button" class="chip-btn" data-perguntar="${esc(o)}">${icon('message', { size: 14 })}${esc(o)}</button>`).join('')}</div>` : '';
    case 'composta': {
      // Uma ficha por projeto e só o último bloco de cada tipo de lista, para não repetir tabelas.
      const blocos = d.blocos ?? [];
      const vistos = new Set();
      const uteis = blocos.filter((b, i) => {
        const chave = b.tipo === 'ficha' ? `ficha:${b.dados.ficha.projeto_id}` : b.tipo;
        if (b.tipo !== 'ficha' && blocos.slice(i + 1).some((x) => x.tipo === b.tipo)) return false;
        if (vistos.has(chave)) return false;
        vistos.add(chave);
        return true;
      });
      const fichas = uteis.filter((b) => b.tipo === 'ficha').map((b) => b.dados.ficha);
      const outros = uteis.filter((b) => b.tipo !== 'ficha');
      return `${outros.map((b) => (BLOCO[b.tipo] ? BLOCO[b.tipo](b.dados) : '')).join('')}${fichas.length >= 2 ? comparacao(fichas) : fichas.map(ficha).join('')}`;
    }
    default: return null;
  }
}

// Liga os botões dos blocos: abrir projeto, abrir a tela de Projetos filtrada e perguntar de novo.
export function bindTyped(container, { ask, ajuda: abrirAjuda, feedback, anexar, acaoAnexo } = {}) {
  $$('[data-ajuda]', container).forEach((b) => (b.onclick = () => { const [tipo, secao] = b.dataset.ajuda.split(':'); abrirAjuda?.(tipo, secao || undefined); }));
  $$('[data-feedback]', container).forEach((b) => (b.onclick = () => feedback?.()));
  $$('[data-anexar]', container).forEach((b) => (b.onclick = () => anexar?.()));
  $$('[data-acao-anexo]', container).forEach((b) => (b.onclick = () => acaoAnexo?.(b.dataset.acaoAnexo, container)));
  $$('[data-proj]', container).forEach((el) => {
    const abrir = (e) => { e.preventDefault?.(); openProject(el.dataset.proj); };
    el.onclick = abrir;
    if (el.tagName === 'TR') el.onkeydown = (e) => e.key === 'Enter' && abrir(e);
  });
  $$('[data-abrir-projetos], [data-filtro]', container).forEach((b) => (b.onclick = () => abrirProjetos(JSON.parse(b.dataset.abrirProjetos ?? b.dataset.filtro))));
  $$('[data-perguntar]', container).forEach((b) => (b.onclick = () => ask(b.dataset.perguntar)));
}
