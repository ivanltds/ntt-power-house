// One page de case (CR-075, adendo 7 ponto 1) e apresentação de cases (CR-076, ponto 2).
// O conteúdo vem só da base (documentos e ficha do projeto, já filtrados pelo perfil): nada é inventado.
// Bloco sem evidência sai como "Não há registro de …" e a prévia pede para completar antes de enviar.
// Cliente que não pode ser citado vira "grande cliente do setor <segmento>", inclusive dentro do texto dos blocos.

import { TIPOS_DOCUMENTAIS } from '../analysis.js';
import { STATUS_GANHO } from '../db/repo.js';
import { maskSensitive } from '../sensitive.js';
import { normalize } from '../text.js';
import { SLIDE, COR } from './modelo.js';
import { wrap } from './pdf.js';

const TRUST = { 5: 'Oficial', 4: 'Enviado', 3: 'Interno', 2: 'Informal', 1: 'Rascunho' };

// Blocos da one page na ordem que a Kelly listou (investimento só para quem vê valores).
export const BLOCOS = {
  contexto: 'Contexto',
  desafio: 'Desafio',
  objetivo: 'Objetivo',
  solucao: 'Solução',
  beneficios: 'Benefícios',
  resultados: 'Resultados',
  investimento: 'Investimento',
};
const LIMITE_EDICAO = 700;
export const MAX_CASES_DECK = 8; // R2P4: limite inicial por deck (tempo de geração e memória do servidor)

const plain = (s) => String(s ?? '').replace(/\*\*|__|`/g, '').replace(/^#+\s*/gm, '').replace(/^\s*[-*]\s+/gm, '').replace(/\[(.*?)\]\((.*?)\)/g, '$1')
  .replace(/[ \t]+/g, ' ').replace(/\n{2,}/g, '\n').trim();
const brl = (v) => (v == null ? null : v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }));
const meses = (n) => (n == null ? null : `${String(n).replace('.', ',')} ${Number(n) === 1 ? 'mês' : 'meses'}`);
const dataBR = (iso) => (iso ? new Date(`${String(iso).slice(0, 10)}T12:00:00`).toLocaleDateString('pt-BR') : null);
const esc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Seção de um documento: cabeçalho Markdown ("## 2. Desafio", "## Slide 2 — O desafio") ou, em texto extraído de
// PDF/Word, uma linha que é só o nome da seção ("Desafio" ou "Desafio:").
export function secaoDoc(body, nomes) {
  const texto = `\n${String(body ?? '').replace(/\r/g, '')}`;
  for (const nome of nomes) {
    const md = texto.match(new RegExp(String.raw`\n#{1,4}[ \t]*(?:\d+\.[ \t]*)?(?:Slide \d+[ \t]*[—-][ \t]*)?${nome}[^\n]*\n([\s\S]*?)(?=\n#{1,4}[ \t]|(?![\s\S]))`, 'i'));
    if (md && md[1].trim()) return md[1].trim();
    const linha = texto.match(new RegExp(String.raw`\n[ \t]*${nome}[ \t]*:?[ \t]*\n([\s\S]*?)(?=\n[ \t]*\n[ \t]*[A-ZÀ-Ú][^\n]{0,40}:?[ \t]*\n|(?![\s\S]))`, 'i'));
    if (linha && linha[1].trim()) return linha[1].trim();
  }
  return null;
}

// Nomes pelos quais o cliente pode aparecer no texto: o nome completo, as duas primeiras palavras e a primeira
// palavra quando ela é distintiva (ex.: "Energisul"). A troca da primeira palavra só vale com inicial maiúscula.
function nomesDoCliente(cliente) {
  const nome = String(cliente ?? '').trim();
  if (!nome) return [];
  const palavras = nome.split(/\s+/);
  const out = [{ re: new RegExp(esc(nome), 'gi') }];
  if (palavras.length > 2) out.push({ re: new RegExp(`\\b${esc(palavras.slice(0, 2).join(' '))}\\b`, 'gi') });
  if (palavras.length > 1 && palavras[0].length >= 5 && !/^(grupo|banco|rede|hospital|cooperativa|transportes|companhia|instituto)$/i.test(palavras[0])) {
    out.push({ re: new RegExp(`(?<![\\wÀ-ú])${esc(palavras[0])}(?![\\wÀ-ú])`, 'g') });
  }
  return out;
}

export const clienteAnonimo = (segmento) => (segmento ? `grande cliente do setor ${segmento}` : 'grande cliente');

export function anonimizar(texto, cliente, segmento) {
  let t = String(texto ?? '');
  for (const { re } of nomesDoCliente(cliente)) t = t.replace(re, clienteAnonimo(segmento));
  // Início de frase com o nome trocado ganha maiúscula ("Grande cliente do setor …").
  return t.replace(/(^|[.!?]\s+)grande cliente/g, '$1Grande cliente');
}

// Primeiras frases do texto até o limite de caracteres (corta em fim de frase quando dá).
function resumoCurto(texto, limite) {
  // Itens de lista viram uma frase separada por ponto e vírgula.
  const t = plain(String(texto ?? '').replace(/\n[ \t]*[-*][ \t]+/g, '; ').replace(/^[ \t]*[-*][ \t]+/, '')).replace(/:\s*;\s*/g, ': ').replace(/\n/g, ' ');
  if (t.length <= limite) return t;
  const frases = t.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [];
  let out = '';
  for (const f of frases) {
    if ((out + f).length > limite) break;
    out += f;
  }
  return (out.trim() || `${t.slice(0, limite - 1).replace(/\s+\S*$/, '')}…`);
}

// Números em destaque nos resultados (percentuais, valores e reduções), no máximo 3.
export function numerosEmDestaque(texto) {
  const achados = String(texto ?? '').match(/(?:R\$\s?[\d.,]+(?:\s?(?:milh(?:ão|ões)|bilh(?:ão|ões)|mil|mi|bi)(?![\wÀ-ú]))?|[+-]?\d+(?:[.,]\d+)?\s?(?:%|p\.p\.|pontos percentuais|x\b|vezes))/gi) ?? [];
  return [...new Set(achados.map((x) => x.trim()))].slice(0, 3);
}

// Pode citar o nome do cliente? Só se o projeto não for confidencial e o perfil for gestor (R1P2, a confirmar com a Kelly).
export const podeCitarCliente = (projeto, user) => projeto.confidencialidade !== 'confidencial' && user?.perfil === 'gestor';
export const ehCase = (status) => STATUS_GANHO.includes(status);

// Monta a one page de um projeto. opts.citar: pedido de citar o cliente (só vale se for permitido).
export function onePageContent(engine, id, user, { citar = false } = {}) {
  const detail = engine.repo.projectDetail(id, user);
  if (!detail) return null;
  const p = detail.projeto;
  const docs = detail.documentos.filter((d) => d.tipo_documental !== 'ficha_cadastro');
  const corpo = (d) => engine.docs.get(d.id)?.body ?? '';
  // Prioridade das fontes: case, apresentação comercial, proposta (e SOW), depois a ficha do projeto.
  const PRIORIDADE = ['case_sucesso', 'apresentacao_comercial', 'proposta_comercial', 'sow', 'ata_validada', 'documento_tecnico'];
  const porTipo = (tipo) => docs.filter((d) => d.tipo_documental === tipo).sort((a, b) => b.nivel_confianca - a.nivel_confianca);
  const usados = new Map();
  // Textos já usados num bloco não se repetem em outro (ex.: objetivo da ficha = "Nossa proposta" da apresentação).
  const chave = (t) => normalize(plain(t)).slice(0, 80);
  const ja = new Set();
  const usar = (t) => { if (t) ja.add(chave(t)); return t; };
  // Procura a seção nos documentos dos tipos pedidos, na ordem; marca o documento como fonte.
  const achar = (tipos, nomes) => {
    for (const tipo of tipos) {
      for (const d of porTipo(tipo)) {
        for (const nome of nomes) {
          const s = secaoDoc(corpo(d), [nome]);
          if (s && !ja.has(chave(s))) { usados.set(d.id, d); return usar(s); }
        }
      }
    }
    return null;
  };
  const daFicha = (campo) => { const v = p[campo]; if (!v || ja.has(chave(v))) return null; usados.set('ficha', null); return usar(v); };

  const desafio = achar(['case_sucesso', 'apresentacao_comercial', 'proposta_comercial'], ['Desafio', 'O desafio', 'Contexto e desafio']);
  const contexto = achar(['proposta_comercial', 'sow'], ['Contexto e desafio', 'Contexto']) ?? daFicha('descricao');
  const objetivo = daFicha('objetivo') ?? achar(['proposta_comercial', 'sow', 'apresentacao_comercial'], ['Objetivo']);
  const solucao = achar(['case_sucesso', 'apresentacao_comercial', 'proposta_comercial', 'sow'], ['Solução', 'Nossa proposta', 'Escopo da solução', 'Escopo']);
  const beneficios = achar(PRIORIDADE, ['Benefícios', 'Beneficios', 'Ganhos esperados', 'Ganhos']);
  const kpis = (detail.entidades.kpi ?? []).map((e) => plain(e.valor)).filter(Boolean);
  const resultadosTxt = achar(['case_sucesso', 'ata_validada', 'apresentacao_comercial'], ['Resultados', 'Resultado']) ?? (kpis.length ? kpis.slice(0, 3).join('. ') : null);

  const verValores = Boolean(user.verValores);
  const pode = podeCitarCliente(p, user);
  const citado = pode && Boolean(citar);
  const limpar = (t, n) => (t ? (citado ? resumoCurto(t, n) : anonimizar(resumoCurto(t, n), p.cliente, p.segmento)) : null);
  const bloco = (key, texto, n, extra = {}) => ({ key, titulo: BLOCOS[key], texto: limpar(texto, n), vazio: !texto, ...extra });

  const blocos = [
    bloco('contexto', contexto, 330),
    bloco('desafio', desafio, 360),
    bloco('objetivo', objetivo, 320),
    bloco('solucao', solucao, 520, { selos: [...new Set([...p.servicos, ...p.tecnologias])].slice(0, 10) }),
    bloco('beneficios', beneficios, 330),
    bloco('resultados', resultadosTxt, 360, { numeros: numerosEmDestaque(resultadosTxt) }),
  ];
  // Investimento: só para quem vê valores (consultor nem vê o bloco). Vem desmarcado por padrão no arquivo.
  if (verValores) blocos.push({ key: 'investimento', titulo: BLOCOS.investimento, texto: p.valor != null ? [brl(p.valor), meses(p.prazo_meses)].filter(Boolean).join(' · ') : null, vazio: p.valor == null });

  const fontes = [...usados.values()].filter(Boolean).map((d) => ({
    doc_id: d.id, titulo: citado ? d.titulo : anonimizar(d.titulo, p.cliente, p.segmento), tipo: TIPOS_DOCUMENTAIS[d.tipo_documental] ?? d.tipo_documental,
    confianca: TRUST[d.nivel_confianca] ?? '', versao: d.versao ?? null, data: dataBR(d.data_conteudo),
  }));
  const so = !docs.length;
  const vazios = blocos.filter((b) => b.vazio && b.key !== 'investimento').map((b) => b.titulo);
  const avisos = [];
  if (!ehCase(p.status_proposta)) avisos.push(`Este projeto não é um case (status: ${p.status_proposta}). Se gerar mesmo assim, a one page sai com o selo "Uso interno".`);
  if (so) avisos.push(`Só há dados da ficha do projeto${vazios.length ? `: ${vazios.join(', ')} ficarão vazios` : ''}. Envie um documento (case, apresentação ou proposta) para completar, ou gere mesmo assim.`);
  else if (vazios.length) avisos.push(`Sem registro na base para: ${vazios.join(', ')}. Complete na prévia antes de enviar.`);
  if (!citado) avisos.push(p.confidencialidade === 'confidencial' ? 'Projeto confidencial: o cliente aparece como "' + clienteAnonimo(p.segmento) + '".' : `O cliente aparece como "${clienteAnonimo(p.segmento)}"${pode ? '. Marque "Citar o nome do cliente" se ele autorizou.' : '.'}`);

  return {
    projeto: {
      id: p.id, titulo: citado ? p.titulo : anonimizar(p.titulo, p.cliente, p.segmento), segmento: p.segmento, status: p.status_proposta,
      duracao: meses(p.prazo_meses), confidencial: p.confidencialidade === 'confidencial',
      cliente: citado ? p.cliente : clienteAnonimo(p.segmento), clienteReal: pode ? p.cliente : null,
    },
    citado, podeCitar: pode, ehCase: ehCase(p.status_proposta), soFicha: so,
    blocos, fontes, avisos, verValores, tecnologias: p.tecnologias,
  };
}

// Aplica as edições feitas na prévia (valem só para o arquivo): texto curto, mascarado e sem o nome do cliente
// quando ele não pode ser citado.
export function aplicarEdicoes(conteudo, edicoes = {}, cliente = null) {
  const p = conteudo.projeto;
  for (const b of conteudo.blocos) {
    if (!Object.hasOwn(edicoes, b.key)) continue;
    let t = String(edicoes[b.key] ?? '').replace(/\s+/g, ' ').trim().slice(0, LIMITE_EDICAO);
    t = maskSensitive(t).texto;
    if (!conteudo.citado && cliente) t = anonimizar(t, cliente, p.segmento);
    b.texto = t || null;
    b.vazio = !t;
    if (b.key === 'resultados') b.numeros = numerosEmDestaque(t);
  }
  return conteudo;
}

// ---------- Layout (16:9, 960 × 540 pt, mesmo desenho no PPTX e no PDF) ----------
const run = (text, o = {}) => ({ text, ...o });
const box = (x, y, w, h, paras, o = {}) => ({ t: 'text', x, y, w, h, paras, ...o });
const rect = (x, y, w, h, fill) => ({ t: 'rect', x, y, w, h, fill });

// Corta o texto para caber em maxLinhas na largura dada (mede com as métricas do PDF).
export function caber(texto, size, largura, maxLinhas, bold = false) {
  const linhas = wrap(texto, size, largura, bold);
  if (linhas.length <= maxLinhas) return texto;
  const corte = linhas.slice(0, maxLinhas);
  corte[maxLinhas - 1] = `${corte[maxLinhas - 1].replace(/\s+\S*$/, '')}…`;
  return corte.join(' ');
}

const VAZIO = (titulo) => `Não há registro de ${titulo.toLowerCase()} neste projeto.`;

function cartao(x, y, w, h, b, { destaque = false } = {}) {
  const pad = 14;
  const els = [rect(x, y, w, h, destaque ? COR.fundoSuave : 'F7F8FA'), rect(x, y, 4, h, b.vazio ? 'D1D5DB' : COR.marca),
    box(x + pad, y + 10, w - pad * 2, 16, [{ runs: [run(b.titulo.toUpperCase(), { size: 10, color: COR.marca, bold: true })] }])];
  let topo = y + 30;
  if (b.numeros?.length && !b.vazio) {
    const nw = (w - pad * 2) / b.numeros.length;
    b.numeros.forEach((n, i) => els.push(box(x + pad + i * nw, topo, nw - 6, 24, [{ runs: [run(caber(n, 17, nw - 6, 1, true), { size: 17, color: COR.tinta, bold: true })] }])));
    topo += 28;
  }
  const linhas = Math.max(1, Math.floor((y + h - 10 - topo) / 13));
  const texto = b.vazio ? VAZIO(b.titulo) : caber(b.texto, 10, w - pad * 2, linhas);
  els.push(box(x + pad, topo, w - pad * 2, y + h - topo - 8, [{ runs: [run(texto, { size: 10, color: b.vazio ? '9CA3AF' : COR.texto })], lineHeight: 1.3 }]));
  return els;
}

// Um slide de one page. opts.interno: selo "Uso interno"; opts.incluirInvestimento: bloco de investimento.
export function onePageSlide(c, { interno = false, incluirInvestimento = false, rodape = '' } = {}) {
  const p = c.projeto;
  const b = Object.fromEntries(c.blocos.map((x) => [x.key, x]));
  const X = 48, W = SLIDE.w - 96, G = 12;
  const col = (W - 2 * G) / 3;
  const els = [
    rect(0, 0, SLIDE.w, SLIDE.h, COR.branco),
    rect(0, 0, SLIDE.w, 96, COR.marcaEscura),
    rect(0, 0, 10, 96, COR.ciano),
    box(X, 16, 400, 14, [{ runs: [run(interno ? 'REFERÊNCIA INTERNA · NÃO É UM CASE' : 'CASE', { size: 10, color: COR.ciano, bold: true })] }]),
    box(X, 32, W - 150, 34, [{ runs: [run(caber(p.titulo, 22, W - 150, 1, true), { size: 22, color: COR.branco, bold: true })] }]),
    box(X, 66, W - 150, 18, [{ runs: [run([p.cliente, p.segmento && `Setor: ${p.segmento}`, p.duracao && `Duração: ${p.duracao}`, p.status].filter(Boolean).join('  ·  '), { size: 11, color: 'C7D7FE' })] }]),
  ];
  if (interno) els.push(rect(SLIDE.w - 170, 30, 122, 26, 'B4232C'), box(SLIDE.w - 170, 36, 122, 16, [{ runs: [run('USO INTERNO', { size: 11, color: COR.branco, bold: true })], align: 'c' }]));
  // Linha 1: contexto, desafio, objetivo.
  let y = 108;
  ['contexto', 'desafio', 'objetivo'].forEach((k, i) => els.push(...cartao(X + i * (col + G), y, col, 118, b[k])));
  // Linha 2: solução (duas colunas) + tecnologias e serviços.
  y += 118 + G;
  els.push(...cartao(X, y, col * 2 + G, 104, b.solucao));
  const selos = b.solucao.selos ?? [];
  els.push(rect(X + 2 * (col + G), y, col, 104, 'F7F8FA'),
    box(X + 2 * (col + G) + 14, y + 10, col - 28, 16, [{ runs: [run('TECNOLOGIAS E SERVIÇOS', { size: 10, color: COR.marca, bold: true })] }]),
    box(X + 2 * (col + G) + 14, y + 30, col - 28, 70, [{ runs: [run(selos.length ? caber(selos.join(' · '), 10, col - 28, 5) : 'Não há registro de tecnologias neste projeto.', { size: 10, color: selos.length ? COR.texto : '9CA3AF' })], lineHeight: 1.35 }]));
  // Linha 3: benefícios, resultados (com números em destaque) e investimento (se pedido).
  y += 104 + G;
  const inv = incluirInvestimento && b.investimento;
  els.push(...cartao(X, y, col, 130, b.beneficios));
  els.push(...cartao(X + col + G, y, inv ? col : col * 2 + G, 130, b.resultados, { destaque: true }));
  if (inv) els.push(...cartao(X + 2 * (col + G), y, col, 130, b.investimento));
  // Rodapé: fontes usadas (tipo, versão e data) e a origem no Radar.
  const fontes = c.fontes.length ? `Fonte: ${c.fontes.map((f) => [f.titulo, f.tipo, f.confianca, f.versao, f.data].filter(Boolean).join(', ')).join(' · ')} · ficha ${p.id} no Radar` : `Fonte: ficha ${p.id} no Radar (sem documentos)`;
  els.push(rect(X, 500, W, 1, COR.linha),
    box(X, 506, W - 200, 26, [{ runs: [run(caber(fontes, 8, W - 200, 2), { size: 8, color: COR.suave })], lineHeight: 1.25 }]),
    box(SLIDE.w - 48 - 190, 506, 190, 14, [{ runs: [run(rodape || 'Radar · dados fictícios', { size: 8, color: COR.suave })], align: 'r' }]));
  return els;
}

// ---------- Apresentação de cases (CR-076): capa, consolidado, uma one page por case, aprendizados e fontes ----------
function slideTitulo(titulo, n, total) {
  return [rect(0, 0, SLIDE.w, SLIDE.h, COR.branco), rect(64, 56, 6, 40, COR.marca),
    box(84, 54, 720, 46, [{ runs: [run(titulo, { size: 26, color: COR.tinta, bold: true })] }]),
    box(800, 28, 100, 16, [{ runs: [run(`${String(n).padStart(2, '0')} / ${String(total).padStart(2, '0')}`, { size: 10, color: COR.suave })], align: 'r' }])];
}

// consolidado: { projetos, setores: [[nome, n]], tecnologias: [[nome, n]], destaques: [texto] }
export function deckSlides({ tema, para, cases, consolidado, aprendizados = null }) {
  const total = cases.length + 3 + (aprendizados ? 1 : 0);
  const hoje = new Date().toLocaleDateString('pt-BR');
  const slides = [[
    rect(0, 0, SLIDE.w, SLIDE.h, COR.marcaEscura), rect(0, 0, 14, SLIDE.h, COR.ciano), rect(64, 96, 64, 5, COR.ciano),
    box(64, 60, 700, 24, [{ runs: [run('CASES NTT DATA', { size: 13, color: COR.ciano, bold: true })] }]),
    box(64, 124, 800, 200, [{ runs: [run(caber(`O que já fizemos em ${tema}`, 40, 800, 3, true), { size: 40, color: COR.branco, bold: true })], lineHeight: 1.15 }]),
    box(64, 350, 800, 60, [{ runs: [run(para ? `Para ${para}` : `${cases.length} ${cases.length === 1 ? 'case' : 'cases'} da nossa base`, { size: 20, color: 'C7D7FE' })] }, { runs: [run(hoje, { size: 15, color: '9DB4E8' })] }]),
    box(64, 470, 800, 24, [{ runs: [run('Preparado com o Radar de Propostas & Cases · ImpactAI', { size: 12, color: '9DB4E8' })] }]),
  ]];
  // Consolidado: só números contados na base (R2P3).
  const c = consolidado;
  const cartaoNum = (x, rotulo, valor) => [rect(x, 150, 250, 100, COR.fundoSuave), rect(x, 150, 5, 100, COR.marca),
    box(x + 20, 166, 220, 16, [{ runs: [run(rotulo.toUpperCase(), { size: 11, color: COR.suave, bold: true })] }]),
    box(x + 20, 190, 220, 50, [{ runs: [run(String(valor), { size: 30, color: COR.tinta, bold: true })] }])];
  const lista = (x, y, w, titulo, itens) => [box(x, y, w, 20, [{ runs: [run(titulo, { size: 14, color: COR.marca, bold: true })] }]),
    box(x, y + 26, w, 180, (itens.length ? itens : ['—']).slice(0, 6).map((t) => ({ runs: [run(caber(t, 13, w - 20, 2), { size: 13, color: COR.texto })], bullet: true, spaceAfter: 6 })))];
  slides.push([
    ...slideTitulo(`O que a NTT DATA já fez em ${caber(tema, 26, 500, 1, true)}`, 2, total),
    ...cartaoNum(64, 'Cases nesta apresentação', c.projetos),
    ...cartaoNum(355, 'Setores', c.setores.length),
    ...cartaoNum(646, 'Tecnologias', c.tecnologias.length),
    ...lista(64, 280, 260, 'Setores', c.setores.map(([n, q]) => `${n} (${q})`)),
    ...lista(355, 280, 260, 'Tecnologias recorrentes', c.tecnologias.map(([n, q]) => `${n} (${q})`)),
    ...lista(646, 280, 250, 'Resultados em destaque', c.destaques),
  ]);
  cases.forEach((oc, i) => {
    const els = onePageSlide(oc, { rodape: `Case ${i + 1} de ${cases.length} · Radar` });
    slides.push(els);
  });
  if (aprendizados) {
    slides.push([
      ...slideTitulo('Aprendizados que se repetem', slides.length + 1, total),
      rect(64, 112, 210, 22, 'B4232C'), box(64, 116, 210, 16, [{ runs: [run('USO INTERNO · NÃO ENVIAR', { size: 10, color: COR.branco, bold: true })], align: 'c' }]),
      box(64, 150, 832, 320, (aprendizados.length ? aprendizados : ['Sem lições registradas nos cases escolhidos.']).slice(0, 7).map((t) => ({ runs: [run(caber(t, 15, 800, 3), { size: 15, color: COR.texto })], bullet: true, spaceAfter: 10, lineHeight: 1.25 }))),
    ]);
  }
  const fontes = cases.flatMap((oc) => (oc.fontes.length ? oc.fontes.map((f) => `${oc.projeto.id} · ${f.titulo} (${[f.tipo, f.confianca, f.data].filter(Boolean).join(', ')})`) : [`${oc.projeto.id} · ficha do projeto no Radar`]));
  slides.push([
    ...slideTitulo('Fontes', total, total),
    box(64, 120, 832, 380, fontes.slice(0, 16).map((t) => ({ runs: [run(caber(t, 11, 800, 1), { size: 11, color: COR.texto })], bullet: true, spaceAfter: 4 }))),
  ]);
  return slides;
}

// Números do slide consolidado a partir das one pages (só o que está na base).
export function consolidar(cases) {
  const conta = (lista) => [...lista.reduce((m, x) => m.set(x, (m.get(x) ?? 0) + 1), new Map())].sort((a, b) => b[1] - a[1]);
  return {
    projetos: cases.length,
    setores: conta(cases.map((c) => c.projeto.segmento).filter(Boolean)),
    tecnologias: conta(cases.flatMap((c) => c.tecnologias ?? [])).slice(0, 6),
    destaques: cases.map((c) => {
      const r = c.blocos.find((b) => b.key === 'resultados');
      return r && !r.vazio ? `${c.projeto.cliente}: ${resumoCurto(r.texto, 120)}` : null;
    }).filter(Boolean).slice(0, 5),
  };
}
