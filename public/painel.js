// Aba "Insights (novo)": cinco lentes sobre a mesma base (discovery r3, jornada Ver → Entender → Provar → Agir).
// Ver: manchetes geradas por regra. Entender: cartões com uma pergunta cada. Provar: "ver projetos" abre Projetos
// filtrado. Agir: perguntar ao Radar, copiar o resumo ou, na Curadoria, marcar cadastro de teste (gestor).

import { $, $$, esc, brl, api, userId, currentUser, tipoLabel, onTab, onUserChange, openTab, copyText, toast, dateBR } from './common.js';
import { icon } from './icons.js';
import { openProject } from './projetos.js';

// [chave, nome curto, ícone, o que responde, pergunta de entrada, para quem]
const LENTES = [
  ['negocio', 'Negócio', 'briefcase', 'Onde ganhamos, onde crescer e o que mostrar ao cliente.', 'Onde estamos ganhando e onde crescer?', 'Diretoria e comercial'],
  ['tecnica', 'Técnica', 'cpu', 'Sabemos entregar o que vendemos? Onde investir em capacidade?', 'Sabemos entregar o que vendemos?', 'Liderança técnica e arquitetura'],
  ['pipeline', 'Pipeline', 'trending', 'O que está parado, fora do padrão ou em risco.', 'Que propostas precisam de atenção agora?', 'Gestão comercial, toda semana'],
  ['prevenda', 'Pré-venda', 'search', 'Estamos prontos para a oportunidade? O que reaproveitar?', 'Estamos prontos para uma nova oportunidade?', 'Quem está montando uma proposta'],
  ['curadoria', 'Curadoria', 'shield', 'O que está sujo, faltando ou esperando revisão.', 'Dá para confiar nos dados da base?', 'Quem cuida da base'],
];
// Lente sugerida pelo perfil (só um destaque na tela inicial; a pessoa escolhe).
const sugerida = () => (currentUser()?.perfil === 'consultor' ? 'prevenda' : currentUser()?.perfil === 'gestor' ? 'negocio' : null);
const KEY = 'radar.painel.lente';
const view = { lente: null, filtros: { segmento: '', area: '', desde: '' }, dados: null, oportunidade: null };

// Desde o CR-069 as visões moram na aba Insights (aba interna "Visões"); quem chama é public/insights.js.
export function initPainel() {
  onUserChange(() => { view.lente = null; });
}
export const carregarPainel = () => load();

// Primeira visita: tela inicial com as perguntas. Depois, volta para a última lente escolhida.
const lenteInicial = () => localStorage.getItem(KEY) || 'inicio';
const irPara = (lente) => { view.lente = lente; if (lente !== 'inicio') localStorage.setItem(KEY, lente); render(); window.scrollTo({ top: 0 }); };

// Entrada (CR-070): na primeira carga, a "flor" (oito pétalas nas cores da paleta) surge girando no centro;
// quando os dados chegam, as pétalas se espalham para fora e os cartões entram em sequência.
// Ao voltar para a aba (mesmo recorte), mostra na hora o que já tinha e atualiza em segundo plano, sem piscar.
let ultimaChave = null;
const FLOR_MIN_MS = 650; // tempo mínimo da flor na primeira carga, para a animação não virar um piscar
const flor = () => `<div class="pn-flor-palco" aria-busy="true" role="status" aria-label="Carregando as visões">
    <div class="pn-flor">${Array.from({ length: 8 }, (_, i) => `<span class="pn-petala" style="--a:${i * 45}deg;--c:var(--viz-${i + 1});--i:${i}"></span>`).join('')}<span class="pn-miolo"></span></div>
    <p class="muted small">Preparando as visões…</p>
  </div>`;
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
// Espalha as pétalas e espera a animação terminar (sem espera para quem prefere menos movimento).
async function espalharFlor() {
  const f = $('#painel .pn-flor-palco');
  if (!f) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  f.classList.add('abrir');
  await espera(420);
}

async function load() {
  view.lente ??= lenteInicial();
  const q = new URLSearchParams({ userId: userId(), ...Object.fromEntries(Object.entries(view.filtros).filter(([, v]) => v)) });
  const chave = q.toString();
  const temCache = view.dados && ultimaChave === chave;
  const primeira = !view.dados; // flor só na primeira carga; trocar filtro mantém a tela, esmaecida
  const inicio = Date.now();
  if (temCache) render(); else if (primeira) $('#painel').innerHTML = flor(); else $('#painel').classList.add('pn-atualizando');
  let dados;
  try {
    dados = await api(`/api/painel?${q}`);
    if (primeira) { await espera(Math.max(0, FLOR_MIN_MS - (Date.now() - inicio))); await espalharFlor(); }
  } catch (err) {
    $('#painel').classList.remove('pn-atualizando');
    if (!temCache) $('#painel').innerHTML = `<p class="error">${icon('alert', { size: 16 })}${esc(err.message)}</p>`;
    return;
  }
  const mudou = !temCache || JSON.stringify(dados) !== JSON.stringify(view.dados);
  view.dados = dados;
  ultimaChave = chave;
  $('#painel').classList.remove('pn-atualizando');
  if (!mudou) return;
  render();
  if (primeira) animarEntrada();
}

// Cartões entram em sequência (opacidade + leve subida); quem prefere menos movimento não vê animação (CSS).
function animarEntrada() {
  const raiz = $('#painel');
  raiz.classList.remove('pn-entrando');
  void raiz.offsetWidth; // reinicia a animação
  raiz.classList.add('pn-entrando');
  $$('.pn-porta, .pn-heroi, .pn-card', raiz).forEach((el, i) => el.style.setProperty('--atraso', `${Math.min(i, 10) * 45}ms`));
  setTimeout(() => raiz.classList.remove('pn-entrando'), 1200);
}

// ---------- Peças visuais ----------
const num = (v, d = 1) => (v == null ? '—' : Number(v).toLocaleString('pt-BR', { maximumFractionDigits: d }));
const mi = (v) => (v == null ? '—' : `R$ ${num(v / 1e6)} mi`);
const pequena = (n) => n < (view.dados?.amostraMinima ?? 3);
const nTag = (n, amostra = false) => `<span class="pn-n${amostra && pequena(n) ? ' pequena' : ''}" title="Quantos itens da base entram neste cálculo">${amostra && pequena(n) ? `${icon('alert', { size: 12 })}poucos dados (${n}): leia como indício` : `com base em ${n}`}</span>`;
const SELO = { calculado: ['Calculado da base', 'Conta feita sobre os cadastros, sem interpretação.'], 'IA · sugerido': ['IA · confira antes de usar', 'Extraído dos documentos por IA, sem revisão de uma pessoa.'], 'IA · revisado': ['IA · revisado', 'Extraído por IA e conferido por uma pessoa.'] };
const selo = (s) => { const [rot, dica] = SELO[s] ?? [s, '']; return `<span class="pn-selo ${s.startsWith('IA') ? 'ia' : ''}" title="${esc(dica)}">${esc(rot)}</span>`; };
const plural = (n, um, varios) => `${n} ${n === 1 ? um : varios}`;
const vazio = (txt = 'Sem dados suficientes neste recorte.') => `<p class="muted small">${esc(txt)}</p>`;
const semValores = () => `<p class="muted small">${icon('lock', { size: 14 })} Valores e margens aparecem só para quem tem permissão de ver valores.</p>`;

// amostra: o cartão mostra uma taxa ou média; com n pequeno, o 'n' fica em destaque (indício, não conclusão).
// Nomes das skills do chat para o painel (adendo 6).
const ROTULO_SKILL = { buscar: 'parecidos', listar: 'listagem', agregar: 'contagem', ficha: 'ficha', comparar: 'comparação', composta: 'em etapas', detalhar: 'detalhe', conversa: 'conversa', ajuda: 'dúvida de uso', anexo: 'arquivo', enviar_arquivo: 'envio de arquivo', esclarecer: 'pergunta de volta', fora_dominio: 'fora do escopo' };

function card({ id, pergunta, corpo, origem = 'calculado', n = null, como = '', dica = '', drill = null, perguntar = null, largo = false, amostra = false }) {
  return `<section class="pn-card${largo ? ' largo' : ''}" id="pn-${id}" data-card="${id}">
    <header><h4>${esc(pergunta)}</h4>${como ? `<button type="button" class="icon-btn pn-info" title="${esc(`Como calculamos: ${como}`)}" aria-label="Como calculamos">${icon('info', { size: 15 })}</button>` : ''}</header>
    ${dica ? `<p class="pn-dica">${esc(dica)}</p>` : ''}
    <div class="pn-corpo">${corpo}</div>
    <footer>${selo(origem)}${n != null ? nTag(n, amostra) : ''}<span class="pn-acoes">
      ${perguntar ? `<button type="button" class="btn sm ghost" data-perguntar="${esc(perguntar)}" title="Abrir o chat com esta pergunta">${icon('message', { size: 14 })}Perguntar</button>` : ''}
      ${drill ? `<button type="button" class="btn sm ghost" data-drill='${esc(JSON.stringify(drill))}' title="Ver os projetos que formam este número">Ver projetos ${icon('chevronRight', { size: 14 })}</button>` : ''}
    </span></footer>
  </section>`;
}

// Barras horizontais ordenadas, com o rótulo e o "n" ao lado (nunca só a cor).
function barras(itens, { max = null, fmt = (v) => num(v), drill = null } = {}) {
  if (!itens.length) return vazio();
  const m = max ?? Math.max(1, ...itens.map((i) => i.valor ?? 0));
  return `<ul class="pn-barras">${itens.map((i) => `<li${i.n != null && i.n < (view.dados.amostraMinima ?? 3) ? ' class="pequena"' : ''}>
    <span class="pn-rot" title="${esc(i.rotulo)}">${drill ? `<a href="#" data-drill='${esc(JSON.stringify(drill(i)))}'>${esc(i.rotulo)}</a>` : esc(i.rotulo)}</span>
    <span class="pn-trilho"><span style="width:${i.valor == null ? 0 : Math.max(2, (100 * i.valor) / m)}%"></span></span>
    <span class="pn-val">${i.valor == null ? '—' : fmt(i.valor)}${i.extra ? ` <small class="muted">${esc(i.extra)}</small>` : ''}</span>
  </li>`).join('')}</ul>`;
}

// Matriz de calor: uma cor só, do claro ao escuro; o número fica escrito na célula.
function matriz(mx, { drill }) {
  if (!mx.linhas.length || !mx.colunas.length) return vazio();
  const max = Math.max(1, ...mx.celulas.flat().map((c) => c.length));
  return `<div class="pn-mx-wrap"><table class="pn-mx"><thead><tr><th></th>${mx.colunas.map((c) => `<th scope="col" title="${esc(c)}">${esc(c)}</th>`).join('')}</tr></thead><tbody>
    ${mx.linhas.map((l, i) => `<tr><th scope="row">${esc(l)}</th>${mx.colunas.map((c, j) => {
      const ids = mx.celulas[i][j];
      return ids.length
        ? `<td><a href="#" class="pn-cel" style="--i:${Math.round(18 + (47 * ids.length) / max)}%" data-drill='${esc(JSON.stringify(drill(l, c)))}' title="${esc(`${l} × ${c}: ${ids.join(', ')}`)}">${ids.length}</a></td>`
        : '<td><span class="pn-cel vazia">·</span></td>';
    }).join('')}</tr>`).join('')}
  </tbody></table></div>`;
}

// Quadrante "ganhamos onde sabemos entregar?" como grade 2 × 2: com poucos dados, pontos se sobrepõem;
// a grade lista cada segmento na sua zona, com os números escritos (prova = entregas com case; taxa de ganho).
const ZONAS = [
  ['risco', 'Risco', 'Ganha sem ter prova: vendendo além da capacidade?'],
  ['nucleo', 'Núcleo', 'Ganha e tem prova: defender e virar acelerador.'],
  ['aposta', 'Aposta', 'Ganha pouco e sem prova: investir ou sair?'],
  ['conversao', 'Conversão', 'Tem prova e ganha pouco: problema comercial.'],
];
function quadrante(pontos) {
  if (!pontos.length) return vazio();
  const chip = (p) => `<a href="#" class="pn-qchip${p.n < (view.dados.amostraMinima ?? 3) ? ' pequena' : ''}" data-drill='${esc(JSON.stringify({ segmentos: [p.segmento] }))}' title="${esc(`${p.segmento}: ${p.prova} entrega(s) com case · ${p.taxa}% de ganho · n = ${p.n}`)}"><b>${esc(p.segmento)}</b><small>ganha ${p.taxa}% · ${p.prova} case${p.prova === 1 ? '' : 's'} entregue${p.prova === 1 ? '' : 's'}${p.n < (view.dados.amostraMinima ?? 3) ? ' · poucos dados' : ''}</small></a>`;
  return `<div class="pn-quad" role="table" aria-label="Segmentos por zona: taxa de ganho (vertical) e entregas com case (horizontal)">
    <span class="pn-q-y">Taxa de ganho ≥ 50% ↑</span>
    ${ZONAS.map(([z, rot, dica]) => { const ps = pontos.filter((p) => p.zona === z); return `<div class="pn-q-zona z-${z}"><header title="${esc(dica)}"><b>${rot}</b><span class="muted small">${esc(dica)}</span></header>${ps.map(chip).join('') || '<span class="muted small">—</span>'}</div>`; }).join('')}
    <span class="pn-q-x">← sem case entregue · com case entregue →</span>
  </div>`;
}

function numeros(itens) {
  return `<div class="pn-nums">${itens.map(([v, rot, sub, drill]) => `<div class="pn-num">${drill ? `<a href="#" data-drill='${esc(JSON.stringify(drill))}'><strong>${v}</strong></a>` : `<strong>${v}</strong>`}<span>${esc(rot)}</span>${sub ? `<small class="muted">${esc(sub)}</small>` : ''}</div>`).join('')}</div>`;
}

const frases = (itens, fmt) => (itens.length ? `<ul class="pn-frases">${itens.map(fmt).join('')}</ul>` : vazio());
const projLink = (id, txt = id) => `<a href="#" data-proj="${esc(id)}">${esc(txt)}</a>`;
const NIVEL = { alto: ['bad', 'alert', 'Alta'], medio: ['warn', 'clock', 'Média'], baixo: ['info', 'info', 'Baixa'] };
const TIPO_ALERTA = { fora_da_curva: 'Fora da curva', parada: 'Parada', incompleta: 'Incompleta', parecida_com_perdida: 'Parecida com perdida' };

// ---------- Lentes ----------
function lenteNegocio(n, v) {
  const c = n.carteira;
  const cards = [];
  cards.push(card({
    id: 'carteira', pergunta: 'Quanto temos?', n: c.ganho.n + c.aberto.n + c.perdido.n,
    como: 'Ganho = Vendida, Em execução e Entregue; aberto = Em elaboração, Enviada e Em negociação. Valor = valor proposto, não receita realizada.',
    corpo: numeros(v
      ? [[mi(c.ganho.valor), 'ganhos', plural(c.ganho.n, 'projeto', 'projetos'), { status: ['Vendida', 'Em execução', 'Entregue'] }], [mi(c.aberto.valor), 'em aberto', plural(c.aberto.n, 'projeto', 'projetos'), { status: ['Em elaboração', 'Enviada', 'Em negociação'] }], [mi(c.perdido.valor), 'perdidos', plural(c.perdido.n, 'projeto', 'projetos'), { status: ['Perdida'] }]]
      : [[c.ganho.n, 'ganhos', '', { status: ['Vendida', 'Em execução', 'Entregue'] }], [c.aberto.n, 'em aberto', '', { status: ['Em elaboração', 'Enviada', 'Em negociação'] }], [c.perdido.n, 'perdidos', '', { status: ['Perdida'] }]]) + (v ? (n.concentracao ? `<p class="muted small">Os 3 maiores clientes somam ${num(n.concentracao.top3)}% da carteira ganha (${n.concentracao.clientes} clientes).</p>` : '') : semValores()),
  }));
  cards.push(card({
    id: 'segmentos', amostra: true, dica: 'De cada 100 propostas decididas no segmento, quantas ganhamos.', pergunta: 'Onde ganhamos?', n: n.porSegmento.reduce((a, s) => a + s.decididos, 0),
    como: 'Taxa de ganho = ganhas ÷ (ganhas + perdidas), por segmento. Barras cinza: menos de 3 propostas decididas.',
    corpo: barras(n.porSegmento.filter((s) => s.decididos).map((s) => ({ rotulo: s.segmento, valor: s.taxa, n: s.decididos, extra: `${s.ganhos} de ${s.decididos}` })), { max: 100, fmt: (x) => `${num(x, 0)}%`, drill: (i) => ({ segmentos: [i.rotulo] }) }),
    perguntar: 'Em quais segmentos mais ganhamos propostas e por quê?',
  }));
  cards.push(card({
    id: 'quadrante', amostra: true, dica: 'Cada segmento cai numa zona. Núcleo é o ideal; Risco e Conversão pedem ação.', pergunta: 'Ganhamos onde sabemos entregar?', largo: false, n: n.quadrante.reduce((a, q) => a + q.n, 0),
    como: 'Cada ponto é um segmento. Horizontal: projetos entregues com case de sucesso. Vertical: taxa de ganho. Pontos menores: menos de 3 propostas decididas.',
    corpo: quadrante(n.quadrante),
  }));
  cards.push(card({
    id: 'margem', amostra: true, pergunta: 'Onde ganhamos melhor?', n: n.porSegmento.filter((s) => s.margem != null).length,
    como: 'Margem ponderada pelo valor dos projetos decididos de cada segmento.',
    corpo: v ? barras(n.porSegmento.filter((s) => s.margem != null).sort((a, b) => b.margem - a.margem).map((s) => ({ rotulo: s.segmento, valor: s.margem, n: s.decididos })), { fmt: (x) => `${num(x)}%`, drill: (i) => ({ segmentos: [i.rotulo] }) }) : semValores(),
  }));
  cards.push(card({
    id: 'duracao', amostra: true, pergunta: 'Projetos longos rendem mais?', n: n.margemPorDuracao?.reduce((a, x) => a + x.n, 0) ?? null,
    como: 'Margem ponderada dos projetos decididos, por faixa de prazo.',
    corpo: v ? barras(n.margemPorDuracao.filter((x) => x.n).map((x) => ({ rotulo: x.faixa, valor: x.margem, n: x.n, extra: `n = ${x.n}` })), { fmt: (x) => `${num(x)}%` }) : semValores(),
  }));
  cards.push(card({
    id: 'pacotes', pergunta: 'Que pacotes de serviço mais vendemos?', n: n.pacotes.reduce((a, p) => Math.max(a, p.n), 0),
    como: 'Pares de serviços no mesmo projeto decidido (2 ou mais ocorrências). Valor médio só com permissão.',
    corpo: barras(n.pacotes.map((p) => ({ rotulo: p.servicos.join(' + '), valor: p.n, servicos: p.servicos, extra: `${p.ganhos} ganho(s)${p.valorMedio ? ` · média ${mi(p.valorMedio)}` : ''}` })), { fmt: (x) => `${x} proj.`, drill: (i) => ({ servicos: i.servicos }) }),
  }));
  cards.push(card({
    id: 'resultados', pergunta: 'Que resultado posso citar?', origem: 'IA · sugerido', n: n.resultados.length, largo: true,
    como: 'KPIs extraídos automaticamente dos cases de sucesso. Confira no documento antes de citar; a autorização de uso do nome do cliente ainda não está na base.',
    corpo: frases(n.resultados, (r) => `<li>${esc(r.texto)} <span class="muted">· ${projLink(r.projeto, r.cliente)} · ${esc(r.segmento ?? '')}</span> ${selo(r.selo)}</li>`)
      + (n.impacto?.multiplo ? `<p class="pn-destaque">${icon('trending', { size: 16 })}Nos projetos com ganho em R$ citado, o cliente reporta ${mi(n.impacto.reais)} para ${mi(n.impacto.contratos)} de contrato: cerca de ${num(n.impacto.multiplo)}× o valor.</p>` : ''),
    perguntar: 'Que cases com resultado em número posso citar numa reunião?',
  }));
  return cards.join('');
}

function lenteTecnica(t, v) {
  const cards = [];
  cards.push(card({
    id: 'matriz', dica: 'Quanto mais escuro, mais projetos entregues naquele cruzamento. Clique num número para ver os projetos.', pergunta: 'Onde temos profundidade?', n: t.matriz.n, largo: true,
    como: 'Projetos ENTREGUES por tecnologia e segmento. Frequência de uso não é competência: por isso só entram entregas.',
    corpo: matriz(t.matriz, { drill: (tec, seg) => ({ tecnologias: [tec], segmentos: [seg], status: ['Entregue'] }) }),
  }));
  cards.push(card({
    id: 'tendencia', dica: 'Leia cada linha da esquerda para a direita: números subindo indicam tecnologia em alta.', pergunta: 'O que está crescendo ou sumindo?', n: t.tendencia.celulas.flat().length ? new Set(t.tendencia.celulas.flat(2)).size : 0, largo: true,
    como: 'Projetos decididos por tecnologia e ano da data de referência.',
    corpo: matriz(t.tendencia, { drill: (tec, a) => ({ tecnologias: [tec], dataDe: `${a}-01-01`, dataAte: `${a}-12-31` }) }),
  }));
  cards.push(card({
    id: 'licoes', pergunta: 'Que problema se repete?', origem: 'IA · sugerido', n: t.licoes.length,
    como: 'Lições extraídas dos documentos. Destacadas: as que citam legado, saneamento, cadastro ou integração.',
    corpo: frases([...t.licoes].sort((a, b) => b.legado - a.legado), (l) => `<li class="${l.legado ? 'pn-legado' : ''}">${l.legado ? `<span class="pn-tag">${icon('alert', { size: 12 })}legado</span> ` : ''}${esc(l.texto)} <span class="muted">· ${projLink(l.projeto, l.cliente)}</span></li>`),
    perguntar: 'Quais riscos e lições se repetem entre os projetos entregues?',
  }));
  cards.push(card({
    id: 'riscos', dica: 'Riscos escritos na proposta que viraram problema de verdade no projeto.', pergunta: 'Os riscos que previmos aconteceram?', origem: 'IA · sugerido', n: t.riscosQueAconteceram.length,
    como: 'Risco declarado na proposta que reaparece numa lição do mesmo projeto relatando atraso, extensão ou mudança (2 ou mais palavras em comum).',
    corpo: frases(t.riscosQueAconteceram, (r) => `<li><b>${esc(r.risco)}</b> ${icon('arrowRight', { size: 12 })} ${esc(r.licao)} <span class="muted">· ${projLink(r.projeto, r.cliente)}</span></li>`),
  }));
  cards.push(card({
    id: 'estimativa', amostra: true, dica: 'Quanto a proposta final ficou acima da primeira estimativa.', pergunta: 'Nossas estimativas se sustentam?', n: t.estimativa.n,
    como: 'Compara a estimativa preliminar com a proposta comercial do mesmo projeto.',
    corpo: numeros([
      [t.estimativa.variacaoValor ? `+${num(t.estimativa.variacaoValor.media)}%` : '—', 'proposta × estimativa (valor)', t.estimativa.variacaoValor ? `de ${num(t.estimativa.variacaoValor.min)}% a ${num(t.estimativa.variacaoValor.max)}%` : 'só com permissão de valores'],
      [`${t.estimativa.prazoCresceu.length} de ${t.estimativa.n}`, 'com prazo maior na proposta', t.estimativa.prazoCresceu.map((p) => `${p.projeto}: ${p.de}→${p.para}m`).slice(0, 3).join(' · ')],
    ]),
  }));
  cards.push(card({
    id: 'esfriando', pergunta: 'Que capacidade está esfriando?', n: t.esfriando.length,
    como: 'Tecnologias e serviços sem projeto há 2 anos ou mais (pela data de referência).',
    corpo: t.esfriando.length ? `<ul class="pn-lista">${t.esfriando.map((e) => `<li><span class="chip">${esc(e.nome)}</span><span class="muted small">${esc(e.tipo)} · último em ${e.ultimo} · ${e.n} projeto(s)</span></li>`).join('')}</ul>` : vazio('Nenhuma capacidade parada há 2 anos ou mais.'),
  }));
  cards.push(card({
    id: 'plataforma', amostra: true, pergunta: 'Que plataforma rende mais?', n: t.plataforma?.length ?? null,
    como: 'Margem ponderada dos projetos decididos por tecnologia (2 ou mais projetos).',
    corpo: v ? barras(t.plataforma.map((p) => ({ rotulo: p.tecnologia, valor: p.margem, n: p.n, extra: `n = ${p.n}` })), { fmt: (x) => `${num(x)}%`, drill: (i) => ({ tecnologias: [i.rotulo] }) }) : semValores(),
  }));
  cards.push(card({
    id: 'especialistas', pergunta: 'Com quem eu falo?', n: t.especialistas.length,
    como: 'Donos dos projetos, ordenados por entregas. Ponto único: área com um só dono.',
    corpo: `<ul class="pn-lista">${t.especialistas.map((e) => `<li><b>${esc(e.dono)}</b><span class="muted small">${e.entregues} entregue(s) de ${e.n} · ${esc(e.areas.join(', '))}</span></li>`).join('')}</ul>`
      + (t.pontoUnico.length ? `<p class="pn-alerta warn">${icon('alert', { size: 14 })}Ponto único de conhecimento: ${t.pontoUnico.map((p) => `${esc(p.area)} (${esc(p.donos[0])})`).join(', ')}.</p>` : ''),
  }));
  return cards.join('');
}

function lentePipeline(p, v) {
  const cards = [];
  const maxN = Math.max(1, ...p.funil.map((f) => f.n));
  cards.push(card({
    id: 'alertas', dica: 'Comece por aqui: cada linha é uma proposta e o motivo do alerta. Use "Copiar aviso" para mandar ao dono.', pergunta: 'O que precisa de atenção agora?', n: p.alertas.length, largo: true,
    como: `Fora da curva: margem 3 p.p. fora da faixa dos projetos ganhos${p.faixaMargem ? ` (${Math.round(p.faixaMargem.min * 100)}% a ${Math.round(p.faixaMargem.max * 100)}%)` : ''}. Parada: 7 dias sem alteração. Incompleta: falta valor, margem, prazo, dono, data ou segmento. Parecida com perdida: similaridade de 50% ou mais com uma proposta perdida.`,
    corpo: p.alertas.length ? `<ul class="pn-alertas">${p.alertas.map((a) => { const [cls, ic, rot] = NIVEL[a.nivel]; return `<li class="${cls}">
      <span class="pn-nivel">${icon(ic, { size: 14 })}${rot}</span><span class="pn-tipo">${TIPO_ALERTA[a.tipo]}</span>
      <span>${projLink(a.projeto, `${a.projeto} · ${a.titulo}`)} <span class="muted">· ${esc(a.cliente)}${a.dono ? ` · dono: ${esc(a.dono)}` : ''}</span><br><small>${esc(a.texto)}</small></span>
      <button type="button" class="btn sm ghost" data-copiar="${esc(`${a.projeto} (${a.titulo}) · ${TIPO_ALERTA[a.tipo]}: ${a.texto}`)}" title="Copiar um texto pronto para avisar o dono">${icon('copy', { size: 13 })}Copiar aviso</button></li>`; }).join('')}</ul>` : vazio('Nenhum alerta. O pipeline está em dia.'),
  }));
  cards.push(card({
    id: 'funil', pergunta: 'Como está o funil?', n: p.funil.reduce((a, f) => a + f.n, 0),
    como: 'Projetos por status da proposta. Valor = valor proposto (com permissão).',
    corpo: barras(p.funil.map((f) => ({ rotulo: f.status, valor: f.n, extra: v && f.valor ? mi(f.valor) : '' })), { max: maxN, fmt: (x) => `${x}`, drill: (i) => ({ status: [i.rotulo] }) }),
  }));
  cards.push(card({
    id: 'perdas', pergunta: 'Por que perdemos?', origem: 'IA · sugerido', n: p.licoesDePerdas.length,
    como: 'Lições e frases sobre concorrente ou perda extraídas dos documentos das propostas perdidas. O motivo de perda ainda não é um campo estruturado.',
    corpo: frases(p.licoesDePerdas, (l) => `<li>${esc(l.texto)} <span class="muted">· ${projLink(l.projeto, l.cliente)} · ${esc(l.segmento ?? '')}</span></li>`),
    perguntar: 'Propostas perdidas e o que aprendemos',
  }));
  return cards.join('');
}

const NIVEL_PRONT = { forte: ['ok', 'checkCircle', 'Forte'], parcial: ['warn', 'alert', 'Parcial'], fraca: ['bad', 'xCircle', 'Fraca'] };
function lentePrevenda(lista) {
  if (!lista.length) return card({ id: 'prontidao', dica: 'Escolha a oportunidade abaixo. Mostramos o quanto já fizemos de parecido e o que dá para reaproveitar.', pergunta: 'Estamos prontos?', corpo: vazio('Nenhuma oportunidade cadastrada.') });
  view.oportunidade = lista.some((o) => o.oportunidade.id === view.oportunidade) ? view.oportunidade : lista[0].oportunidade.id;
  const o = lista.find((x) => x.oportunidade.id === view.oportunidade);
  const [cls, ic, rot] = NIVEL_PRONT[o.nivel];
  const seletor = `<div class="pn-ops" role="tablist" aria-label="Oportunidades">${lista.map((x) => `<button type="button" role="tab" class="pn-op${x.oportunidade.id === o.oportunidade.id ? ' ativo' : ''}" aria-selected="${x.oportunidade.id === o.oportunidade.id}" data-op="${esc(x.oportunidade.id)}"><b>${esc(x.oportunidade.id)}</b><span>${esc(x.oportunidade.cliente)}</span><small class="muted">${esc(x.oportunidade.segmento ?? '')}</small></button>`).join('')}</div>`;
  const cards = [card({
    id: 'prontidao', pergunta: `Estamos prontos para ${o.oportunidade.titulo}?`, largo: true, n: o.similares.length,
    como: 'Parecidos = mesmo segmento (40%), serviços (35%) e tecnologias (25%) em comum. Forte: 2 ou mais entregues com case e entrega no segmento. Parcial: 1 entregue com case ou algum projeto ganho. Fraca: nenhum.',
    corpo: `${seletor}<p class="pn-pront ${cls}">${icon(ic, { size: 18 })}<b>Prontidão ${rot}</b><span>${o.entregues} entregue(s) parecido(s) · ${o.comCase} com case · ${o.comKpi} com KPI · ${o.entreguesNoSegmento} entrega(s) no segmento ${esc(o.oportunidade.segmento ?? '')}</span></p>
      ${o.perdidas.length ? `<p class="pn-alerta bad">${icon('alert', { size: 14 })}Parecida com proposta perdida: ${o.perdidas.map((x) => `${projLink(x.id, `${x.id} · ${x.cliente}`)}${x.licao ? ` — ${esc(x.licao)}` : ''}`).join('; ')}</p>` : ''}
      <ul class="pn-frases">${o.similares.map((s) => `<li>${projLink(s.id, `${s.id} · ${s.titulo}`)} <span class="muted">· ${esc(s.cliente)} · ${esc(s.status)} · ${s.score}% parecido${s.case ? ' · com case' : ''}</span>${s.kpi ? `<br><small>${esc(s.kpi)}</small>` : ''}</li>`).join('') || '<li class="muted">Nenhum projeto parecido.</li>'}</ul>`,
    perguntar: `Projetos parecidos com: ${o.oportunidade.titulo} (${o.oportunidade.segmento})`,
  }), card({
    id: 'kit', pergunta: 'O que posso reaproveitar?', n: o.kit.length,
    como: 'Tipos de documento disponíveis nos projetos parecidos.',
    corpo: o.kit.length ? `<p>${o.kit.map((k) => `<span class="chip">${esc(tipoLabel(k))}</span>`).join(' ')}</p>` : vazio(),
  }), card({
    id: 'porte', pergunta: 'Qual o porte de referência?', n: o.similares.length,
    como: 'Faixa de prazo e faixa de valor (P, M, G, GG) dos projetos parecidos, sem expor o valor.',
    corpo: numeros([[o.prazo ? `${num(o.prazo.min)}–${num(o.prazo.max)} m` : '—', 'prazo'], [o.faixaValor ? [...new Set(o.faixaValor)].join('–') : '—', 'faixa de valor']]),
  }), card({
    id: 'quem', pergunta: 'Com quem eu falo?', n: o.especialistas.length,
    como: 'Donos dos projetos parecidos.',
    corpo: o.especialistas.length ? `<p>${o.especialistas.map((e) => `<span class="chip">${icon('user', { size: 12 })}${esc(e)}</span>`).join(' ')}</p>` : vazio(),
  })];
  return cards.join('');
}

function lenteCuradoria(c, pode) {
  const cards = [];
  const s = c.saude;
  cards.push(card({
    id: 'revisao', pergunta: 'Dá para confiar nos números?', n: s.documentos,
    como: 'Completude: campos-chave preenchidos (segmento, área, dono, prazo, valor, margem, data). Revisados: documentos conferidos por uma pessoa.',
    corpo: numeros([[`${num(s.completude, 0)}%`, 'completude das fichas'], [`${num(s.pctRevisados ?? 0, 0)}%`, 'documentos revisados', `${s.revisados} de ${s.documentos}`], [s.testesOcultos, 'testes ocultos'], [s.aguardandoRevisao, 'uploads a revisar']])
      + barras(c.semRevisao.map((d) => ({ rotulo: tipoLabel(d.tipo), valor: d.n })), { fmt: (x) => `${x} sem revisão` }),
  }));
  const linhaTeste = (p, marcado) => `<li><span>${projLink(p.id, `${p.id} · ${p.titulo || '(sem título)'}`)} <span class="muted">· ${esc(p.cliente)}${p.motivo ? ` · ${esc(p.motivo)}` : ''}</span></span>
    ${pode ? `<button type="button" class="btn sm${marcado ? '' : ' ghost'}" data-teste="${esc(p.id)}" data-valor="${marcado ? '0' : '1'}">${marcado ? 'Voltar aos números' : 'Marcar como teste'}</button>` : ''}</li>`;
  cards.push(card({
    id: 'testes', dica: 'Cadastros de teste distorcem os números. Marcar não apaga nada e dá para desfazer.', pergunta: 'Que cadastros são de teste?', n: c.suspeitos.length + c.testes.length, largo: true,
    como: 'Sugestão por regra: título com "teste", texto aleatório ou curto demais. Marcar como teste tira o projeto dos insights; nada é apagado e dá para desfazer.',
    corpo: `${c.suspeitos.length ? `<h5>Parecem teste (ainda entram nos números)</h5><ul class="pn-testes">${c.suspeitos.map((p) => linhaTeste(p, false)).join('')}</ul>` : '<p class="muted small">Nenhum cadastro com cara de teste.</p>'}
      ${c.testes.length ? `<h5>Marcados como teste (fora dos números)</h5><ul class="pn-testes">${c.testes.map((p) => linhaTeste(p, true)).join('')}</ul>` : ''}
      ${pode ? '' : `<p class="muted small">${icon('lock', { size: 14 })} Só o gestor pode marcar cadastros como teste.</p>`}`,
  }));
  cards.push(card({
    id: 'termos', pergunta: 'A taxonomia está limpa?', n: c.termosSuspeitos.length + c.areasFora.length,
    como: 'Termos usados só em cadastros de teste ou aguardando curadoria, e áreas fora da lista da base piloto.',
    corpo: `${c.termosSuspeitos.length ? `<ul class="pn-lista">${c.termosSuspeitos.map((t) => `<li><span class="chip nova">${esc(t.nome)}</span><span class="muted small">${esc(t.tipo)} · ${esc(t.motivo)}</span></li>`).join('')}</ul>` : '<p class="muted small">Nenhum termo suspeito.</p>'}
      ${c.areasFora.length ? `<p class="pn-alerta warn">${icon('alert', { size: 14 })}Áreas fora da lista: ${c.areasFora.map((a) => `"${esc(a.area)}" (${a.n})`).join(', ')}. Lista atual: ${esc(c.areasPadrao.join(', '))}.</p>` : ''}`,
  }));
  cards.push(card({
    id: 'incompletos', pergunta: 'Que fichas estão incompletas?', n: c.incompletos.length,
    como: 'Projetos fora do teste sem algum campo-chave.',
    corpo: frases(c.incompletos, (p) => `<li>${projLink(p.id, `${p.id} · ${p.titulo}`)} <span class="muted small">· falta ${esc(p.faltando.join(', ').replace('prazo_meses', 'prazo').replace('data_referencia', 'data'))}</span></li>`),
  }));
  if (c.correcoes.length) cards.push(card({
    id: 'correcoes', pergunta: 'Onde a IA mais erra no envio?', n: c.correcoes.reduce((a, x) => a + x.n, 0),
    como: 'Campos que o revisor corrigiu nas sugestões automáticas do upload.',
    corpo: barras(c.correcoes.map((x) => ({ rotulo: x.campo, valor: x.n })), { fmt: (x) => `${x}` }),
  }));
  return cards.join('');
}

function transversal(u) {
  const max = Math.max(1, ...u.funil.map((f) => f.n));
  return `<details class="pn-uso"><summary>${icon('gauge', { size: 16 })}Uso do Radar e o que o time procura</summary><div class="pn-grid">
    ${card({ id: 'uso', pergunta: 'O Radar está sendo usado para montar propostas?', n: u.perguntas, como: 'Registro de uso: perguntas no chat, projetos abertos, "usar como base" e exportações.', corpo: barras(u.funil.map((f) => ({ rotulo: f.etapa, valor: f.n })), { max, fmt: (x) => `${x}` }) + `<p class="muted small">${u.semResposta} pergunta(s) sem resposta.</p>`
      + (u.porSkill?.length ? `<p class="muted small" title="Skill do chat que atendeu cada pergunta (adendo 6)">Por tipo de pedido: ${u.porSkill.map((x) => `${esc(ROTULO_SKILL[x.skill] ?? x.skill)} ${x.n}${x.semResposta ? ` (${x.semResposta} sem resposta)` : ''}`).join(' · ')}</p>` : '') })}
    ${card({ id: 'procurados', pergunta: 'O que procuram mais do que temos?', n: u.procurados.reduce((a, p) => a + p.citacoes, 0), como: 'Serviços citados nas perguntas do chat comparados aos projetos ganhos com o mesmo serviço. O uso atual é do time em teste e segue o roteiro.', corpo: barras(u.procurados.map((p) => ({ rotulo: p.servico, valor: p.citacoes, extra: `${p.ganhos} ganho(s)` })), { fmt: (x) => `${x} citações`, drill: (i) => ({ servicos: [i.rotulo] }) }) })}
    ${card({ id: 'reuso', pergunta: 'O que mais é reaproveitado?', n: u.reuso.reduce((a, r) => a + r.n, 0), como: 'Projetos com mais "usar como base".', corpo: frases(u.reuso, (r) => `<li>${projLink(r.id, `${r.id} · ${r.titulo}`)} <span class="muted">· ${r.n}×</span></li>`) })}
  </div></details>`;
}

// ---------- Manchetes em cartões (CR-069, opção B) ----------
// Tom é estado (ícone + rótulo + cor reservada); as marcas dos gráficos usam a paleta categórica em ordem fixa
// (--viz-1, --viz-2…); textos e números ficam nas cores de texto, nunca na cor da série.
const TOM = { bom: ['checkCircle', 'Ponto forte'], atencao: ['alert', 'Atenção'], info: ['info', 'Para saber'] };
const fmtV = (v, suf = '') => `${Number(v).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}${suf}`;
// Cor da parte: a indicada pelo servidor (número da paleta ou 'neutra') ou a da posição, em ordem fixa.
const corDe = (i, k) => (i.cor === 'neutra' ? 'var(--line-strong)' : `var(--viz-${((i.cor ?? k + 1) - 1) % 8 + 1})`);
function miniGrafico(x) {
  if (!x) return '';
  if (x.tipo === 'fracao') {
    const p = x.total ? Math.round((x.parte / x.total) * 100) : 0;
    return `<div class="pn-h-frac" role="img" aria-label="${x.parte} de ${x.total}" title="${x.parte} de ${x.total} (${p}%)"><span style="width:${Math.max(p, x.parte ? 3 : 0)}%"></span></div>`;
  }
  const itens = (x.itens ?? []).filter((i) => i.valor != null);
  if (!itens.length) return '';
  if (x.tipo === 'pilha') {
    const total = itens.reduce((t, i) => t + i.valor, 0) || 1;
    return `<div class="pn-h-pilha" role="img" aria-label="${esc(itens.map((i) => `${i.rotulo}: ${i.valor}`).join(', '))}">${itens.filter((i) => i.valor).map((i, k) => `<span style="flex:${i.valor};background:${corDe(i, itens.indexOf(i))}" title="${esc(`${i.rotulo}: ${i.valor} (${Math.round((i.valor / total) * 100)}%)`)}"></span>`).join('')}</div>
      <ul class="pn-h-leg">${itens.map((i, k) => `<li><i style="background:${corDe(i, k)}"></i>${esc(i.rotulo)} <b>${fmtV(i.valor)}</b></li>`).join('')}</ul>`;
  }
  const max = Math.max(...itens.map((i) => i.valor), 0) || 1;
  return `<ol class="pn-h-barras">${itens.map((i) => `<li title="${esc(`${i.rotulo}: ${fmtV(i.valor, i.sufixo)}`)}"><span class="pn-h-rot">${esc(i.rotulo)}</span><span class="pn-h-trilho"><span style="width:${Math.max((i.valor / max) * 100, i.valor ? 4 : 0)}%"></span></span><b>${fmtV(i.valor, i.sufixo)}</b></li>`).join('')}</ol>`;
}
function heroi(m) {
  const [ic, rot] = TOM[m.tom] ?? TOM.info;
  return `<button type="button" class="pn-heroi tom-${esc(m.tom ?? 'info')}" data-ir="${esc(m.card)}"${m.lente ? ` data-lente-ir="${esc(m.lente)}"` : ''}${m.oportunidade ? ` data-op-ir="${esc(m.oportunidade)}"` : ''} title="${esc(m.texto)}">
    <span class="pn-h-tom">${icon(ic, { size: 13 })}${rot}</span>
    <strong class="pn-h-num">${esc(m.destaque ?? '')}</strong>
    <span class="pn-h-legenda">${esc(m.legenda ?? '')}</span>
    ${miniGrafico(m.mini)}
    <span class="pn-h-txt">${esc(m.texto)}</span>
    <span class="pn-h-ir">Ver os números ${icon('arrowRight', { size: 13 })}</span>
  </button>`;
}

// ---------- Tela ----------
// Tela inicial: "O que você quer saber?" com as cinco perguntas, o primeiro destaque de cada uma e como ler os números.
function inicio(d) {
  const sug = sugerida();
  return `<header class="pn-inicio-topo">
      <h2>O que você quer saber hoje?</h2>
      <p class="muted">Escolha uma pergunta. Cada uma abre uma visão com os números da base de propostas e cases, explicados e com os projetos por trás.</p>
    </header>
    <div class="pn-portas">${[...LENTES].sort((a, b) => (b[0] === sug) - (a[0] === sug)).map(([k, nome, ic, , pergunta, para]) => { const m = d.manchetes[k] ?? []; return `<button type="button" class="pn-porta${k === sug ? ' sugerida' : ''}" data-lente="${k}">
        <span class="pn-porta-ic">${icon(ic, { size: 20 })}</span>
        <span class="pn-porta-txt"><span class="pn-porta-para">${esc(para)}${k === sug ? '<b class="pn-sug">sugerido para você</b>' : ''}</span>
          <strong>${esc(pergunta)}</strong>
          ${m[0] ? `<span class="pn-porta-m">${m[0].destaque ? `<b class="pn-porta-num">${esc(m[0].destaque)}</b> ` : ''}${esc(m[0].legenda ?? m[0].texto)}</span>` : ''}
          <span class="pn-porta-ir">Abrir ${esc(nome)}${m.length > 1 ? ` · ${m.length} destaques` : ''} ${icon('arrowRight', { size: 14 })}</span></span>
      </button>`; }).join('')}
    <section class="pn-comoler" aria-label="Como ler os números">
      <h3>${icon('info', { size: 15 })}Como ler os números</h3>
      <ul>
        <li><b>Em resumo</b>, no topo de cada visão, traz o que pede atenção. Clique num destaque para ir ao gráfico.</li>
        <li><b>"com base em 5"</b> diz quantos itens entram na conta. Com <span class="pn-n pequena">${icon('alert', { size: 12 })}poucos dados</span>, trate como indício.</li>
        <li><span class="pn-selo">Calculado da base</span> é conta feita sobre os cadastros. <span class="pn-selo ia">IA · confira antes de usar</span> foi extraído dos documentos.</li>
        <li><b>Ver projetos</b> abre a lista de projetos que formam aquele número.</li>
      </ul>
    </section></div>`;
}

function render() {
  const d = view.dados;
  if (view.lente === 'inicio') {
    $('#painel').innerHTML = inicio(d) + `<p class="muted small pn-rodape">${icon('info', { size: 13 })} ${d.base.projetos} projetos na base${d.base.testesOcultos ? ` (${d.base.testesOcultos} de teste fora dos números)` : ''} · atualizado ${dateBR(d.geradoEm)}.</p>`;
    bind();
    return;
  }
  const pode = Boolean(currentUser()?.pode?.marcarTeste);
  const [, nome, ic, desc, pergunta, para] = LENTES.find(([k]) => k === view.lente);
  const sel = (id, rot, opcoes, valor) => `<label class="pn-filtro"><span>${rot}</span><select id="${id}"><option value="">${id === 'pn-desde' ? 'todo o período' : 'todos'}</option>${opcoes.map((o) => `<option${String(o) === String(valor) ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select></label>`;
  const filtrosAtivos = view.lente !== 'curadoria' && view.lente !== 'prevenda';
  const L = d.lentes;
  const corpo = { negocio: () => lenteNegocio(L.negocio, d.valores), tecnica: () => lenteTecnica(L.tecnica, d.valores), pipeline: () => lentePipeline(L.pipeline, d.valores), prevenda: () => lentePrevenda(L.prevenda), curadoria: () => lenteCuradoria(L.curadoria, pode) }[view.lente]();
  $('#painel').innerHTML = `
    <nav class="pn-trilha"><button type="button" class="btn sm ghost" data-lente="inicio">← Todas as perguntas</button></nav>
    <header class="pn-topo">
      <div><p class="pn-porta-para">${icon(ic, { size: 14 })}${esc(nome)} · para ${esc(para.toLowerCase())}</p><h2>${esc(pergunta)}</h2><p class="muted small">${esc(desc)}</p></div>
      <div class="pn-lentes" role="tablist" aria-label="Trocar de visão">${LENTES.map(([k, rot, ic]) => `<button type="button" role="tab" aria-selected="${k === view.lente}" class="${k === view.lente ? 'ativo' : ''}" data-lente="${k}">${icon(ic, { size: 15 })}${rot}</button>`).join('')}</div>
    </header>
    <div class="pn-barra">
      ${filtrosAtivos ? `${sel('pn-seg', 'Segmento', d.opcoes.segmentos, view.filtros.segmento)}${sel('pn-area', 'Prática', d.opcoes.areas, view.filtros.area)}${sel('pn-desde', 'Desde', d.opcoes.anos, view.filtros.desde)}` : `<span class="muted small">${view.lente === 'curadoria' ? 'A curadoria olha a base inteira, inclusive os testes.' : 'A prontidão compara cada oportunidade com a base inteira.'}</span>`}
      <span class="pn-meta muted small" title="${d.base.testesOcultos} cadastro(s) de teste fora dos números">${d.base.projetos} projetos${d.base.testesOcultos ? ` · ${d.base.testesOcultos} teste(s) ocultos` : ''} · atualizado ${dateBR(d.geradoEm)} ${new Date(d.geradoEm).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
      <button type="button" class="btn sm" id="pn-copiar" title="Copiar as manchetes desta lente para colar num e-mail ou no Teams">${icon('copy', { size: 14 })}Copiar resumo</button>
    </div>
    <h3 class="pn-sec">Em resumo</h3>
    <section class="pn-herois" aria-label="Resumo de ${esc(nome)}">${d.manchetes[view.lente].map(heroi).join('') || '<p class="muted small">Nada a destacar neste recorte.</p>'}</section>
    <h3 class="pn-sec">Os números por trás</h3>
    <div class="pn-grid">${corpo}</div>
    ${transversal(d.uso)}
    <p class="muted small pn-rodape">${icon('info', { size: 13 })} Dados fictícios do piloto. Barras hachuradas e o aviso "poucos dados" marcam contas com menos de ${d.amostraMinima} itens. "IA · confira antes de usar": extraído automaticamente, sem revisão humana.</p>`;
  bind();
}

function drill(det) {
  openTab('projetos');
  document.dispatchEvent(new CustomEvent('radar:filtrar', { detail: det }));
}

function bind() {
  const root = $('#painel');
  $$('[data-lente]', root).forEach((b) => (b.onclick = () => irPara(b.dataset.lente)));
  for (const [id, k] of [['#pn-seg', 'segmento'], ['#pn-area', 'area'], ['#pn-desde', 'desde']]) {
    const el = $(id, root);
    if (el) el.onchange = () => { view.filtros[k] = el.value; load(); };
  }
  $$('[data-drill]', root).forEach((a) => {
    const go = (e) => { e.preventDefault(); drill(JSON.parse(a.dataset.drill)); };
    a.onclick = go;
    a.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') go(e); };
  });
  $$('[data-proj]', root).forEach((a) => (a.onclick = (e) => { e.preventDefault(); openProject(a.dataset.proj); }));
  $$('[data-perguntar]', root).forEach((b) => (b.onclick = () => { openTab('busca'); const q = $('#query'); q.value = b.dataset.perguntar; q.focus(); }));
  $$('[data-copiar]', root).forEach((b) => (b.onclick = async () => { await copyText(b.dataset.copiar); toast('Aviso copiado.'); }));
  $$('[data-op]', root).forEach((b) => (b.onclick = () => { view.oportunidade = b.dataset.op; render(); }));
  $$('[data-ir]', root).forEach((b) => (b.onclick = () => {
    if (b.dataset.lenteIr) { view.lente = b.dataset.lenteIr; localStorage.setItem(KEY, view.lente); }
    if (b.dataset.opIr) view.oportunidade = b.dataset.opIr;
    if (b.dataset.lenteIr || b.dataset.opIr) render();
    const alvo = $(`#pn-${b.dataset.ir}`, root) ?? $(`#pn-${b.dataset.ir}`);
    alvo?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    alvo?.classList.add('pn-foco');
    setTimeout(() => alvo?.classList.remove('pn-foco'), 1600);
  }));
  if ($('#pn-copiar', root)) $('#pn-copiar', root).onclick = async () => {
    const [, nome] = LENTES.find(([k]) => k === view.lente);
    const f = Object.entries(view.filtros).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join(', ');
    const txt = [`Radar · Insights ${nome} · ${dateBR(view.dados.geradoEm)}${f ? ` (${f})` : ''}`, ...view.dados.manchetes[view.lente].map((m) => `• ${m.texto}`), '(protótipo com dados fictícios)'].join('\n');
    await copyText(txt);
    toast('Resumo copiado.');
  };
  $$('[data-teste]', root).forEach((b) => (b.onclick = async () => {
    b.disabled = true;
    try {
      await api('/api/projeto/teste', { userId: userId(), id: b.dataset.teste, teste: b.dataset.valor === '1' });
      toast(b.dataset.valor === '1' ? `${b.dataset.teste} marcado como teste e fora dos números.` : `${b.dataset.teste} voltou aos números.`);
      load();
    } catch (err) { b.disabled = false; toast(err.message, 'error'); }
  }));
}
