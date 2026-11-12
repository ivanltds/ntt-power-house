// Exportação de proposta (UC10): conteúdo e templates de layout, independentes do formato do arquivo.
// O conteúdo vem só da base (projeto, documentos e entidades) e já respeita as permissões do perfil (R1, R2).
// Os renderizadores (pptx.js, docx.js, pdf.js) só desenham o que este módulo monta.

import { TIPOS_DOCUMENTAIS } from '../analysis.js';

const TRUST = { 5: 'Oficial', 4: 'Enviado', 3: 'Interno', 2: 'Informal', 1: 'Rascunho' };

export const SECOES = {
  capa: 'Capa',
  contexto: 'Contexto e desafio',
  objetivo: 'Objetivo',
  solucao: 'Solução proposta',
  escopo: 'Escopo e prazo',
  investimento: 'Investimento',
  resultados: 'Resultados',
  cases: 'Cases de referência',
  riscos: 'Riscos e mitigação',
  licoes: 'Lições aprendidas',
  fontes: 'Fontes',
};

export const MODELOS = {
  apresentacao: { nome: 'Apresentação para o cliente', formatos: ['pptx', 'pdf'], desmarcadas: ['licoes'], arquivo: 'Apresentacao' },
  resumo: { nome: 'Resumo executivo', formatos: ['docx', 'pdf'], desmarcadas: [], arquivo: 'Resumo executivo' },
};

// Texto simples: sem marcação Markdown, espaços normalizados.
const plain = (s) => String(s ?? '').replace(/\*\*|__|`|^#+\s*/gm, '').replace(/\[(.*?)\]\((.*?)\)/g, '$1').replace(/[ \t]+/g, ' ').trim();
const meses = (n) => (n == null ? null : `${String(n).replace('.', ',')} ${Number(n) === 1 ? 'mês' : 'meses'}`);
const brl = (v) => (v == null ? null : v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }));
const dataBR = (iso) => (iso ? new Date(`${String(iso).slice(0, 10)}T12:00:00`).toLocaleDateString('pt-BR') : null);

// Monta o conteúdo de cada seção a partir do detalhe do projeto (já filtrado por permissão).
// Cada seção: { titulo, disponivel, motivo?, tipo: 'texto' | 'lista' | 'pares' | 'grupos', ... }.
export function buildContent(detail, user) {
  const p = detail.projeto;
  const ents = (tipo) => (detail.entidades[tipo] ?? []).map((e) => plain(e.valor)).filter(Boolean);
  const secao = (key, conteudo, motivo) => ({ titulo: SECOES[key], disponivel: Boolean(conteudo), motivo: conteudo ? null : motivo, ...(conteudo ?? {}) });
  const lista = (itens) => (itens.length ? { tipo: 'lista', itens } : null);
  const pares = (list) => { const ok = list.filter(([, v]) => v != null && v !== ''); return ok.length ? { tipo: 'pares', pares: ok } : null; };
  const docs = detail.documentos.filter((d) => d.tipo_documental !== 'ficha_cadastro');

  const secoes = {
    capa: secao('capa', { tipo: 'capa' }),
    contexto: secao('contexto', p.descricao ? { tipo: 'texto', texto: plain(p.descricao) } : null, 'sem contexto cadastrado'),
    objetivo: secao('objetivo', p.objetivo ? { tipo: 'texto', texto: plain(p.objetivo) } : null, 'sem objetivo cadastrado'),
    solucao: secao('solucao', p.tecnologias.length || p.servicos.length
      ? { tipo: 'grupos', grupos: [['Serviços', p.servicos], ['Tecnologias', p.tecnologias]].filter(([, l]) => l.length) }
      : null, 'sem tecnologias nem serviços'),
    escopo: secao('escopo', pares([['Prazo', meses(p.prazo_meses)], ['Status', p.status_proposta], ['Responsável', p.dono], ['Área', p.area], ['Referência', dataBR(p.data_referencia)]]), 'sem dados de escopo'),
    investimento: user.verValores
      ? secao('investimento', p.valor != null ? pares([['Valor', brl(p.valor)], ['Margem', p.margem != null ? `${Math.round(p.margem * 100)}%` : null], ['Prazo', meses(p.prazo_meses)]]) : null, 'sem valor cadastrado')
      : null,
    resultados: secao('resultados', lista(ents('kpi')), 'sem resultados nos documentos'),
    cases: secao('cases', lista(detail.relacionados.map((r) => `${plain(r.titulo)} — ${r.cliente}${r.status_proposta ? ` (${r.status_proposta})` : ''}`)), 'sem projetos parecidos'),
    // CR-033: fala de transcrição (pergunta ou "Nome: fala") não é risco; fica fora do documento exportado.
    riscos: secao('riscos', lista(ents('risco').filter((r) => !/\?\s*$/.test(r) && !/^[A-ZÀ-Ú][\wÀ-ú]+( [A-ZÀ-Ú][\wÀ-ú]+)+:\s/.test(r) && !/^A ideia é/i.test(r))), 'sem riscos nos documentos'),
    licoes: secao('licoes', lista(ents('licao')), 'sem lições nos documentos'),
    fontes: secao('fontes', lista(docs.map((d) => `${plain(d.titulo)} · ${TIPOS_DOCUMENTAIS[d.tipo_documental] ?? d.tipo_documental} · ${TRUST[d.nivel_confianca] ?? ''}`)), 'sem documentos'),
  };
  // Investimento nem é oferecido para quem não vê valores.
  if (!secoes.investimento) delete secoes.investimento;
  return {
    projeto: { id: p.id, titulo: plain(p.titulo), cliente: p.cliente, segmento: p.segmento, status: p.status_proposta },
    secoes,
  };
}

// Opções para o diálogo: seções com disponibilidade e marcação padrão do modelo.
export function exportOptions(content, modelo) {
  const m = MODELOS[modelo];
  return {
    modelo, nome: m.nome, formatos: m.formatos, titulo: content.projeto.titulo, para: content.projeto.cliente,
    secoes: Object.entries(content.secoes).map(([key, s]) => ({ key, titulo: s.titulo, disponivel: s.disponivel, motivo: s.motivo, marcada: s.disponivel && !m.desmarcadas.includes(key) })),
  };
}

export const fileName = (content, modelo, formato) => {
  const limpa = (s) => String(s).replace(/[\\/:*?"<>|]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 60);
  return `${limpa(content.projeto.cliente)} - ${limpa(content.projeto.titulo)} - ${MODELOS[modelo].arquivo}.${formato}`;
};

// Seções escolhidas, na ordem do template, sem as indisponíveis.
const chosen = (content, secoes) => Object.keys(content.secoes).filter((k) => k !== 'capa' && secoes.includes(k) && content.secoes[k].disponivel);

// ---------- Template: apresentação (16:9, 960 × 540 pt) ----------
// Cada slide é uma lista de elementos posicionados (origem no canto superior esquerdo, em pontos),
// desenhados igualmente no PPTX e no PDF.
export const SLIDE = { w: 960, h: 540 };
export const COR = { marca: '155EEF', marcaEscura: '0B1B3F', ciano: '11E3F0', tinta: '111827', texto: '374151', suave: '5B6271', linha: 'E5E7EB', fundoSuave: 'EEF4FF', branco: 'FFFFFF' };
const MAX_ITENS = 6;

const run = (text, o = {}) => ({ text, ...o });
const box = (x, y, w, h, paras, o = {}) => ({ t: 'text', x, y, w, h, paras, ...o });
const rect = (x, y, w, h, fill) => ({ t: 'rect', x, y, w, h, fill });

// Quebra listas longas em blocos de até MAX_ITENS e textos longos em partes de ~700 caracteres.
function chunks(s) {
  if (s.tipo === 'lista') {
    const out = [];
    for (let i = 0; i < s.itens.length; i += MAX_ITENS) out.push({ ...s, itens: s.itens.slice(i, i + MAX_ITENS) });
    return out;
  }
  if (s.tipo === 'texto' && s.texto.length > 700) {
    const frases = s.texto.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) ?? [s.texto];
    const out = [];
    let atual = '';
    for (const f of frases) {
      if (atual && (atual + f).length > 700) { out.push(atual.trim()); atual = ''; }
      atual += f;
    }
    if (atual.trim()) out.push(atual.trim());
    return out.map((texto) => ({ ...s, texto }));
  }
  return [s];
}

function slideBody(s) {
  const area = { x: 64, y: 150, w: 832, h: 320 };
  if (s.tipo === 'texto') {
    return [box(area.x, area.y, area.w, area.h, [{ runs: [run(s.texto, { size: 20, color: COR.texto })], lineHeight: 1.35 }])];
  }
  if (s.tipo === 'lista') {
    return [box(area.x, area.y, area.w, area.h, s.itens.map((i) => ({ runs: [run(i, { size: 18, color: COR.texto })], bullet: true, spaceAfter: 10, lineHeight: 1.25 })))];
  }
  if (s.tipo === 'pares') {
    // Cartões com rótulo pequeno e valor grande.
    const n = s.pares.length;
    const gap = 18;
    const w = (area.w - gap * (Math.min(n, 3) - 1)) / Math.min(n, 3);
    return s.pares.flatMap(([k, v], i) => {
      const x = area.x + (i % 3) * (w + gap);
      const y = area.y + Math.floor(i / 3) * 130;
      return [rect(x, y, w, 110, COR.fundoSuave), rect(x, y, 5, 110, COR.marca),
        box(x + 22, y + 18, w - 36, 22, [{ runs: [run(k.toUpperCase(), { size: 12, color: COR.suave, bold: true })] }]),
        box(x + 22, y + 46, w - 36, 52, [{ runs: [run(v, { size: 26, color: COR.tinta, bold: true })] }])];
    });
  }
  if (s.tipo === 'grupos') {
    const w = (area.w - 32) / s.grupos.length;
    return s.grupos.flatMap(([titulo, itens], i) => [
      box(area.x + i * (w + 32), area.y, w, 26, [{ runs: [run(titulo, { size: 15, color: COR.marca, bold: true })] }]),
      box(area.x + i * (w + 32), area.y + 36, w, area.h - 36, itens.slice(0, 9).map((t) => ({ runs: [run(t, { size: 17, color: COR.texto })], bullet: true, spaceAfter: 7 }))),
    ]);
  }
  return [];
}

export function slidesModel(content, secoes, { titulo, para }) {
  const p = content.projeto;
  const hoje = new Date().toLocaleDateString('pt-BR');
  const lista = chosen(content, secoes).flatMap((k) => chunks(content.secoes[k]).map((s, i) => ({ ...s, cont: i > 0 })));
  const slides = [];
  if (secoes.includes('capa')) {
    slides.push([
      rect(0, 0, SLIDE.w, SLIDE.h, COR.marcaEscura),
      rect(0, 0, 14, SLIDE.h, COR.ciano),
      rect(64, 96, 64, 5, COR.ciano),
      box(64, 60, 700, 24, [{ runs: [run('PROPOSTA', { size: 13, color: COR.ciano, bold: true })] }]),
      box(64, 124, 780, 210, [{ runs: [run(titulo || p.titulo, { size: 40, color: COR.branco, bold: true })], lineHeight: 1.15 }]),
      box(64, 350, 780, 60, [{ runs: [run(`Para ${para || p.cliente}`, { size: 20, color: 'C7D7FE' })] }, { runs: [run([p.segmento, hoje].filter(Boolean).join(' · '), { size: 15, color: '9DB4E8' })] }]),
      box(64, 470, 780, 24, [{ runs: [run('Preparado com o Radar de Propostas & Cases · ImpactAI', { size: 12, color: '9DB4E8' })] }]),
    ]);
  }
  lista.forEach((s, i) => {
    slides.push([
      rect(0, 0, SLIDE.w, SLIDE.h, COR.branco),
      rect(64, 64, 6, 44, COR.marca),
      box(84, 60, 760, 52, [{ runs: [run(`${s.titulo}${s.cont ? ' (cont.)' : ''}`, { size: 30, color: COR.tinta, bold: true })] }]),
      box(820, 30, 80, 20, [{ runs: [run(`${String(i + 1).padStart(2, '0')} / ${String(lista.length).padStart(2, '0')}`, { size: 11, color: COR.suave })], align: 'r' }]),
      ...slideBody(s),
      rect(64, 496, 832, 1, COR.linha),
      box(64, 504, 500, 18, [{ runs: [run(para || p.cliente, { size: 10, color: COR.suave })] }]),
      box(560, 504, 336, 18, [{ runs: [run('Radar · dados fictícios', { size: 10, color: COR.suave })], align: 'r' }]),
    ]);
  });
  return slides;
}

// ---------- Template: resumo executivo (A4) ----------
// Blocos em fluxo: o DOCX deixa o Word paginar; o PDF pagina com a mesma ordem e estilos.
export function resumoModel(content, secoes, { titulo, para }) {
  const p = content.projeto;
  const blocos = [{ t: 'cabecalho', titulo: titulo || p.titulo, linha: [`Para ${para || p.cliente}`, p.segmento, new Date().toLocaleDateString('pt-BR')].filter(Boolean).join(' · ') }];
  const keys = chosen(content, secoes);
  // Escopo e investimento juntos formam a "Ficha" logo após o cabeçalho.
  const ficha = ['escopo', 'investimento'].filter((k) => keys.includes(k)).flatMap((k) => content.secoes[k].pares);
  if (ficha.length) blocos.push({ t: 'ficha', pares: [...new Map(ficha).entries()] });
  for (const k of keys) {
    if (k === 'escopo' || k === 'investimento') continue;
    const s = content.secoes[k];
    if (k === 'fontes') { blocos.push({ t: 'fontes', titulo: s.titulo, itens: s.itens }); continue; }
    blocos.push({ t: 'h', texto: s.titulo });
    if (s.tipo === 'texto') blocos.push({ t: 'p', texto: s.texto });
    if (s.tipo === 'lista') blocos.push({ t: 'ul', itens: s.itens });
    if (s.tipo === 'grupos') for (const [g, itens] of s.grupos) blocos.push({ t: 'p', texto: `${g}: ${itens.join(', ')}.`, rotulo: g });
  }
  return blocos;
}
