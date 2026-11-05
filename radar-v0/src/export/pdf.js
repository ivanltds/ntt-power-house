// Gerador de PDF mínimo, sem dependências: fontes padrão Helvetica (regular e negrito) com codificação
// WinAnsi (acentos do português), textos, retângulos e linhas. Usado pelos dois templates da exportação (UC10).

import zlib from 'node:zlib';
import { SLIDE } from './modelo.js';

// Larguras (em milésimos do corpo) da Helvetica e Helvetica-Bold para ASCII 32–126 (métricas AFM padrão).
const W_REG = [278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278, 556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556,
  1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556,
  333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556, 556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584];
const W_BOLD = [278, 333, 474, 556, 556, 889, 722, 238, 333, 333, 389, 584, 278, 333, 278, 278, 556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 333, 333, 584, 584, 584, 611,
  975, 722, 722, 722, 722, 667, 611, 778, 722, 278, 556, 722, 611, 833, 722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 333, 278, 333, 584, 556,
  333, 556, 611, 556, 611, 556, 333, 611, 611, 278, 278, 556, 278, 889, 611, 611, 611, 611, 389, 556, 333, 611, 556, 778, 556, 556, 500, 389, 280, 389, 584];
// Caracteres fora do Latin-1 que a WinAnsi tem, com seu byte e largura (regular, negrito).
const WIN_EXTRA = { '€': [0x80, 556, 556], '…': [0x85, 1000, 1000], '•': [0x95, 350, 350], '–': [0x96, 556, 556], '—': [0x97, 1000, 1000], '‘': [0x91, 222, 278], '’': [0x92, 222, 278], '“': [0x93, 333, 500], '”': [0x94, 333, 500], '™': [0x99, 1000, 1000] };
// Sem equivalente na WinAnsi: troca por algo legível.
const SUBST = { '→': '->', '←': '<-', '≥': '>=', '≤': '<=', '✔': 'v', '✓': 'v', '×': 'x', ' ': ' ', ' ': ' ' };

const clean = (s) => String(s ?? '').replace(/[\r\t]/g, ' ').replace(/[→←≥≤✔✓ ]/g, (c) => SUBST[c] ?? ' ');

function charWidth(ch, bold) {
  const code = ch.charCodeAt(0);
  if (code >= 32 && code <= 126) return (bold ? W_BOLD : W_REG)[code - 32];
  if (WIN_EXTRA[ch]) return WIN_EXTRA[ch][bold ? 2 : 1];
  // Letras acentuadas têm a largura da letra base.
  const base = ch.normalize('NFD')[0];
  if (base !== ch && base.charCodeAt(0) >= 32 && base.charCodeAt(0) <= 126) return (bold ? W_BOLD : W_REG)[base.charCodeAt(0) - 32];
  return 556;
}

export const textWidth = (s, size, bold = false) => [...clean(s)].reduce((w, ch) => w + charWidth(ch, bold), 0) * size / 1000;

// Quebra em linhas que cabem em maxWidth (palavras muito longas são cortadas).
export function wrap(text, size, maxWidth, bold = false) {
  const lines = [];
  for (const para of clean(text).split('\n')) {
    let line = '';
    for (const word of para.split(/\s+/).filter(Boolean)) {
      const test = line ? `${line} ${word}` : word;
      if (textWidth(test, size, bold) <= maxWidth) { line = test; continue; }
      if (line) lines.push(line);
      line = word;
      while (textWidth(line, size, bold) > maxWidth && line.length > 1) {
        let cut = line.length - 1;
        while (cut > 1 && textWidth(line.slice(0, cut), size, bold) > maxWidth) cut--;
        lines.push(line.slice(0, cut));
        line = line.slice(cut);
      }
    }
    lines.push(line);
  }
  return lines;
}

// Texto para dentro de ( ) no PDF, em bytes WinAnsi.
function pdfString(s) {
  const bytes = [];
  for (const ch of clean(s)) {
    const code = ch.charCodeAt(0);
    let b;
    if (code < 128 || (code >= 0xa0 && code <= 0xff)) b = code;
    else if (WIN_EXTRA[ch]) b = WIN_EXTRA[ch][0];
    else b = 0x3f; // '?'
    if (b === 0x28 || b === 0x29 || b === 0x5c) bytes.push(0x5c);
    bytes.push(b);
  }
  return Buffer.from(bytes).toString('latin1');
}

const rgb = (hex) => [0, 2, 4].map((i) => (parseInt(hex.slice(i, i + 2), 16) / 255).toFixed(3)).join(' ');
const n = (v) => Number(v.toFixed(2));

export class PdfDoc {
  constructor({ title = 'Documento' } = {}) {
    this.title = title;
    this.pages = [];
  }

  addPage(w, h) {
    const page = { w, h, ops: [] };
    this.pages.push(page);
    this.page = page;
    return page;
  }

  // Coordenadas com origem no canto superior esquerdo, como no restante do layout.
  rect(x, y, w, h, fill) {
    this.page.ops.push(`${rgb(fill)} rg ${n(x)} ${n(this.page.h - y - h)} ${n(w)} ${n(h)} re f`);
  }

  line(x1, y1, x2, y2, color, width = 0.75) {
    const H = this.page.h;
    this.page.ops.push(`${rgb(color)} RG ${width} w ${n(x1)} ${n(H - y1)} m ${n(x2)} ${n(H - y2)} l S`);
  }

  // y é o topo da linha; a linha de base fica a ~80% do corpo abaixo.
  text(x, y, s, { size = 11, bold = false, color = '111827' } = {}) {
    if (!s) return;
    const base = this.page.h - y - size * 0.8;
    this.page.ops.push(`BT /${bold ? 'F2' : 'F1'} ${size} Tf ${rgb(color)} rg ${n(x)} ${n(base)} Td (${pdfString(s)}) Tj ET`);
  }

  toBuffer() {
    const objs = [];
    const add = (body) => { objs.push(body); return objs.length; };
    const catalog = add(null);
    const pagesId = add(null);
    const f1 = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
    const f2 = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
    const kids = [];
    for (const p of this.pages) {
      const data = zlib.deflateSync(Buffer.from(p.ops.join('\n'), 'latin1'));
      const content = add({ stream: data });
      kids.push(add(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${p.w} ${p.h}] /Resources << /Font << /F1 ${f1} 0 R /F2 ${f2} 0 R >> >> /Contents ${content} 0 R >>`));
    }
    objs[catalog - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
    objs[pagesId - 1] = `<< /Type /Pages /Kids [${kids.map((k) => `${k} 0 R`).join(' ')}] /Count ${kids.length} >>`;
    // Metadados usam PDFDocEncoding, não WinAnsi: o título vai em UTF-16BE para manter acentos e travessão.
    const utf16 = Buffer.from(`﻿${this.title}`, 'utf16le').swap16().toString('hex').toUpperCase();
    const info = add(`<< /Title <${utf16}> /Producer (Radar V0) /CreationDate (D:${new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)}) >>`);

    const parts = [Buffer.from('%PDF-1.4\n%\xe2\xe3\xcf\xd3\n', 'latin1')];
    const offsets = [];
    let size = parts[0].length;
    objs.forEach((o, i) => {
      offsets.push(size);
      const head = `${i + 1} 0 obj\n`;
      const buf = o?.stream
        ? Buffer.concat([Buffer.from(`${head}<< /Length ${o.stream.length} /Filter /FlateDecode >>\nstream\n`, 'latin1'), o.stream, Buffer.from('\nendstream\nendobj\n', 'latin1')])
        : Buffer.from(`${head}${o}\nendobj\n`, 'latin1');
      parts.push(buf);
      size += buf.length;
    });
    const xref = [`xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`, ...offsets.map((o) => `${String(o).padStart(10, '0')} 00000 n \n`)].join('');
    parts.push(Buffer.from(`${xref}trailer\n<< /Size ${objs.length + 1} /Root ${catalog} 0 R /Info ${info} 0 R >>\nstartxref\n${size}\n%%EOF\n`, 'latin1'));
    return Buffer.concat(parts);
  }
}

// Desenha uma caixa de texto do layout (parágrafos com marcador, alinhamento e entrelinha).
export function drawTextBox(pdf, el) {
  let y = el.y;
  for (const para of el.paras) {
    const r = para.runs[0];
    const size = r.size ?? 12;
    const lh = size * (para.lineHeight ?? 1.2);
    const indent = para.bullet ? size * 1.1 : 0;
    const lines = wrap(para.runs.map((x) => x.text).join(''), size, el.w - indent, r.bold);
    lines.forEach((ln, i) => {
      if (para.bullet && i === 0) pdf.rect(el.x + 2, y + size * 0.42, size * 0.32, size * 0.32, '155EEF');
      const w = textWidth(ln, size, r.bold);
      const x = para.align === 'r' ? el.x + el.w - w : para.align === 'c' ? el.x + (el.w - w) / 2 : el.x + indent;
      pdf.text(x, y, ln, { size, bold: r.bold, color: r.color });
      y += lh;
    });
    y += para.spaceAfter ?? 0;
  }
}

// ---------- Apresentação em PDF: um slide por página, mesma geometria do PPTX ----------
export function slidesToPdf(slides, { title }) {
  const pdf = new PdfDoc({ title });
  for (const els of slides) {
    pdf.addPage(SLIDE.w, SLIDE.h);
    for (const el of els) {
      if (el.t === 'rect') pdf.rect(el.x, el.y, el.w, el.h, el.fill);
      if (el.t === 'text') drawTextBox(pdf, el);
    }
  }
  return pdf.toBuffer();
}

// ---------- Resumo executivo em PDF: A4 com paginação, cabeçalho e rodapé ----------
const A4 = { w: 595.28, h: 841.89, m: 56 };

export function resumoToPdf(blocos, { title, rodape }) {
  const pdf = new PdfDoc({ title });
  const larg = A4.w - A4.m * 2;
  let y = 0;
  const novaPagina = () => { pdf.addPage(A4.w, A4.h); y = A4.m; };
  const cabe = (h) => { if (y + h > A4.h - A4.m - 20) novaPagina(); };
  const paragrafo = (texto, { size = 10.5, bold = false, color = '374151', indent = 0, lh = 1.45, rotulo = null } = {}) => {
    const corpo = rotulo ? texto.replace(new RegExp(`^${rotulo}:\\s*`), '') : texto;
    const pref = rotulo ? `${rotulo}: ` : '';
    const lines = wrap(pref + corpo, size, larg - indent, bold);
    for (const [i, ln] of lines.entries()) {
      cabe(size * lh);
      if (i === 0 && pref) {
        pdf.text(A4.m + indent, y, pref, { size, bold: true, color: '111827' });
        pdf.text(A4.m + indent + textWidth(pref, size, true), y, ln.slice(pref.length), { size, bold, color });
      } else pdf.text(A4.m + indent, y, ln, { size, bold, color });
      y += size * lh;
    }
  };

  novaPagina();
  for (const b of blocos) {
    if (b.t === 'cabecalho') {
      const lines = wrap(b.titulo, 22, larg, true);
      const h = 52 + lines.length * 27;
      pdf.rect(0, 0, A4.w, h + 24, '0B1B3F');
      pdf.rect(0, 0, 8, h + 24, '11E3F0');
      pdf.text(A4.m, 30, 'RESUMO EXECUTIVO', { size: 9, bold: true, color: '11E3F0' });
      lines.forEach((ln, i) => pdf.text(A4.m, 48 + i * 27, ln, { size: 22, bold: true, color: 'FFFFFF' }));
      pdf.text(A4.m, 50 + lines.length * 27, b.linha, { size: 10.5, color: 'C7D7FE' });
      y = h + 24 + 26;
    }
    if (b.t === 'ficha') {
      const cols = 3;
      const linhas = Math.ceil(b.pares.length / cols);
      const h = 18 + linhas * 40;
      cabe(h + 14);
      pdf.rect(A4.m, y, larg, h, 'EEF4FF');
      pdf.rect(A4.m, y, 4, h, '155EEF');
      b.pares.forEach(([k, v], i) => {
        const x = A4.m + 20 + (i % cols) * ((larg - 30) / cols);
        const yy = y + 12 + Math.floor(i / cols) * 40;
        pdf.text(x, yy, k.toUpperCase(), { size: 7.5, bold: true, color: '5B6271' });
        pdf.text(x, yy + 12, wrap(v, 12, (larg - 40) / cols - 8, true)[0], { size: 12, bold: true, color: '111827' });
      });
      y += h + 22;
    }
    if (b.t === 'h') {
      cabe(40);
      y += 6;
      pdf.text(A4.m, y, b.texto, { size: 13, bold: true, color: '155EEF' });
      pdf.line(A4.m, y + 19, A4.m + larg, y + 19, 'E5E7EB');
      y += 28;
    }
    if (b.t === 'p') { paragrafo(b.texto, { rotulo: b.rotulo }); y += 8; }
    if (b.t === 'ul') {
      for (const item of b.itens) {
        const lines = wrap(item, 10.5, larg - 16);
        cabe(15.5);
        pdf.rect(A4.m + 3, y + 5, 3.6, 3.6, '155EEF');
        lines.forEach((ln) => { cabe(15.5); pdf.text(A4.m + 16, y, ln, { size: 10.5, color: '374151' }); y += 15.2; });
        y += 3;
      }
      y += 6;
    }
    if (b.t === 'fontes') {
      cabe(40);
      y += 10;
      pdf.text(A4.m, y, b.titulo.toUpperCase(), { size: 8, bold: true, color: '5B6271' });
      y += 14;
      for (const item of b.itens) paragrafo(`• ${item}`, { size: 8.5, color: '5B6271', lh: 1.4 });
    }
  }
  // Rodapé com numeração em todas as páginas.
  pdf.pages.forEach((p, i) => {
    pdf.page = p;
    pdf.line(A4.m, A4.h - 40, A4.w - A4.m, A4.h - 40, 'E5E7EB', 0.5);
    pdf.text(A4.m, A4.h - 34, rodape, { size: 8, color: '5B6271' });
    const pg = `${i + 1} / ${pdf.pages.length}`;
    pdf.text(A4.w - A4.m - textWidth(pg, 8), A4.h - 34, pg, { size: 8, color: '5B6271' });
  });
  return pdf.toBuffer();
}
