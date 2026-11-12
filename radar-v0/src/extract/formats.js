// Extração de texto multiformato, só com módulos nativos do Node (RNF10).
// Suporta: .md .txt .csv .json .html .vtt .srt .eml .docx .pptx .xlsx .pdf
// Devolve texto normalizado em Markdown leve, mais metadados do arquivo e avisos de qualidade.

import zlib from 'node:zlib';
import path from 'node:path';
import { readZip } from './zip.js';
import { parseDocument } from '../corpus.js';

export const SUPPORTED = ['md', 'txt', 'csv', 'json', 'html', 'htm', 'vtt', 'srt', 'eml', 'docx', 'pptx', 'xlsx', 'pdf'];

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
export const decodeEntities = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (m, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (m, d) => String.fromCodePoint(Number(d)))
  .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);

const tidy = (text) => text.replace(/\r\n?/g, '\n').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();

function decodeText(buf) {
  if (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) buf = buf.subarray(3);
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(buf);
  } catch {
    return buf.toString('latin1');
  }
}

export function detectFormat(buf, filename) {
  const ext = path.extname(filename).slice(1).toLowerCase();
  if (buf.subarray(0, 4).toString('latin1') === '%PDF') return 'pdf';
  if (buf.readUInt32LE?.(0) === 0x04034b50) {
    const entries = readZip(buf);
    if (entries.has('word/document.xml')) return 'docx';
    if (entries.has('ppt/presentation.xml')) return 'pptx';
    if (entries.has('xl/workbook.xml')) return 'xlsx';
    throw new Error('Arquivo compactado não reconhecido (esperado DOCX, PPTX ou XLSX).');
  }
  if (ext === 'htm') return 'html';
  if (SUPPORTED.includes(ext)) return ext;
  throw new Error(`Formato .${ext || '?'} não suportado. Formatos aceitos: ${SUPPORTED.join(', ')}.`);
}

function coreProps(entries) {
  const xml = entries.get('docProps/core.xml')?.().toString('utf8') ?? '';
  const tag = (t) => {
    const m = xml.match(new RegExp(`<${t}[^>]*>([^<]*)</${t}>`));
    return m ? decodeEntities(m[1]).trim() || null : null;
  };
  return { titulo: tag('dc:title'), autor: tag('dc:creator'), criadoEm: tag('dcterms:created')?.slice(0, 10) ?? null };
}

const xmlTexts = (xml, tag) => [...xml.matchAll(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'g'))].map((m) => decodeEntities(m[1]));

function docx(buf) {
  const entries = readZip(buf);
  const xml = entries.get('word/document.xml')().toString('utf8');
  const lines = [];
  for (const p of xml.split(/<\/w:p>/)) {
    const text = p
      .replace(/<w:tab\/>/g, '\t')
      .replace(/<w:br\/>/g, '\n')
      .match(/<w:t(?:\s[^>]*)?>[\s\S]*?<\/w:t>|\t|\n/g)
      ?.map((t) => (t.startsWith('<') ? decodeEntities(t.replace(/<[^>]+>/g, '')) : t))
      .join('') ?? '';
    if (!text.trim()) { lines.push(''); continue; }
    const style = p.match(/<w:pStyle w:val="([^"]+)"/)?.[1] ?? '';
    const heading = style.match(/^(?:Heading|Ttulo|Titulo|Título)(\d)?$/i) || style === 'Title';
    if (heading) lines.push(`${'#'.repeat(Math.min(3, Number(heading[1] ?? 1)))} ${text.trim()}`);
    else if (/<w:numPr>/.test(p)) lines.push(`- ${text.trim()}`);
    else lines.push(text.trim());
  }
  return { texto: tidy(lines.join('\n\n').replace(/\n\n(- )/g, '\n$1')), arquivo: coreProps(entries) };
}

function pptx(buf) {
  const entries = readZip(buf);
  const num = (n) => Number(n.match(/(\d+)\.xml$/)[1]);
  const slides = [...entries.keys()].filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n)).sort((a, b) => num(a) - num(b));
  const parts = slides.map((name, i) => {
    const xml = entries.get(name)().toString('utf8');
    const paras = xml.split(/<\/a:p>/).map((p) => xmlTexts(p, 'a:t').join('').trim()).filter(Boolean);
    const notesXml = entries.get(`ppt/notesSlides/notesSlide${num(name)}.xml`)?.().toString('utf8');
    const notes = notesXml ? notesXml.split(/<\/a:p>/).map((p) => xmlTexts(p, 'a:t').join('').trim()).filter((t) => t && !/^\d+$/.test(t)) : [];
    const [title, ...body] = paras;
    return [`## Slide ${i + 1}${title ? ` — ${title}` : ''}`, ...body.map((b) => `- ${b}`), ...(notes.length ? [`Notas do apresentador: ${notes.join(' ')}`] : [])].join('\n');
  });
  return { texto: tidy(parts.join('\n\n')), arquivo: { ...coreProps(entries), slides: slides.length } };
}

function xlsx(buf) {
  const entries = readZip(buf);
  const shared = (entries.get('xl/sharedStrings.xml')?.().toString('utf8') ?? '')
    .split(/<\/si>/).slice(0, -1).map((si) => xmlTexts(si, 't').join(''));
  const wb = entries.get('xl/workbook.xml')().toString('utf8');
  const names = [...wb.matchAll(/<sheet [^>]*name="([^"]+)"/g)].map((m) => decodeEntities(m[1]));
  const sheets = [...entries.keys()].filter((n) => /^xl\/worksheets\/sheet\d+\.xml$/.test(n)).sort();
  const out = sheets.map((name, i) => {
    const xml = entries.get(name)().toString('utf8');
    const rows = [...xml.matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)].map((r) => [...r[1].matchAll(/<c ([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)].map((c) => {
      const inner = c[2] ?? '';
      if (/t="s"/.test(c[1])) return shared[Number(inner.match(/<v>(\d+)<\/v>/)?.[1])] ?? '';
      if (/t="inlineStr"/.test(c[1])) return xmlTexts(inner, 't').join('');
      return decodeEntities(inner.match(/<v>([^<]*)<\/v>/)?.[1] ?? '');
    }));
    return `## Planilha ${names[i] ?? i + 1}\n${tableToLines(rows)}`;
  });
  return { texto: tidy(out.join('\n\n')), arquivo: { ...coreProps(entries), planilhas: sheets.length } };
}

// Linhas de tabela viram frases "Coluna: valor; ...", que funcionam melhor na busca.
function tableToLines(rows) {
  const [header, ...data] = rows.filter((r) => r.some((c) => String(c).trim()));
  if (!header) return '';
  if (!data.length) return header.join(' | ');
  return data.map((r) => `- ${header.map((h, i) => (r[i] ? `${h || `Coluna ${i + 1}`}: ${r[i]}` : null)).filter(Boolean).join('; ')}`).join('\n');
}

function csv(text) {
  const first = text.split('\n')[0];
  const delim = [';', ',', '\t'].sort((a, b) => first.split(b).length - first.split(a).length)[0];
  const rows = [];
  let row = [''];
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { row[row.length - 1] += '"'; i++; } else if (ch === '"') quoted = false;
      else row[row.length - 1] += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === delim) row.push('');
    else if (ch === '\n') { rows.push(row); row = ['']; } else if (ch !== '\r') row[row.length - 1] += ch;
  }
  rows.push(row);
  return { texto: tableToLines(rows.map((r) => r.map((c) => c.trim()))), arquivo: { linhas: rows.length } };
}

function jsonText(text) {
  const lines = [];
  const walk = (v, key) => {
    if (lines.length > 2000) return;
    if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${key}[${i}]`));
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(x, key ? `${key}.${k}` : k);
    else if (v != null && v !== '') lines.push(`- ${key}: ${v}`);
  };
  walk(JSON.parse(text), '');
  return { texto: lines.join('\n'), arquivo: {} };
}

function html(text) {
  const title = text.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  const body = text
    .replace(/<(script|style|head)[\s\S]*?<\/\1>/gi, '')
    .replace(/<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/gi, (m, n, t) => `\n\n${'#'.repeat(Number(n))} ${t.replace(/<[^>]+>/g, '').trim()}\n\n`)
    .replace(/<li[^>]*>/gi, '\n- ')
    .replace(/<(br|\/p|\/div|\/tr|\/li|\/ul|\/ol|\/table)[^>]*>/gi, '\n')
    .replace(/<\/t[dh]>/gi, ' | ')
    .replace(/<[^>]+>/g, '');
  return { texto: tidy(decodeEntities(body).replace(/[ \t]+/g, ' ').replace(/\n /g, '\n')), arquivo: { titulo: title ? decodeEntities(title).trim() : null } };
}

// Legendas de reunião (Teams, Zoom, Meet): mantém falante e minuto, descarta numeração e tempos.
function captions(text) {
  const lines = [];
  for (const block of text.replace(/\r/g, '').split(/\n\s*\n/)) {
    const rows = block.split('\n').filter((l) => l.trim() && l.trim() !== 'WEBVTT' && !/^\d+$/.test(l.trim()) && !/^NOTE\b/.test(l));
    const time = rows.find((l) => /-->/.test(l));
    const content = rows.filter((l) => !/-->/.test(l)).join(' ').trim();
    if (!content) continue;
    const [, hh, mm, ss] = time?.match(/^(?:(\d{1,2}):)?(\d{2}):(\d{2})/) ?? [];
    const stamp = time ? `[${String(Number(hh ?? 0) * 60 + Number(mm)).padStart(2, '0')}:${ss}] ` : '';
    const voice = content.match(/^<v\s+([^>]+)>([\s\S]*?)(?:<\/v>)?$/);
    const clean = (s) => s.replace(/<[^>]+>/g, '').trim();
    lines.push(voice ? `${stamp}${clean(voice[1])}: ${clean(voice[2])}` : `${stamp}${clean(content)}`);
  }
  // Junta falas consecutivas do mesmo falante.
  const merged = [];
  for (const l of lines) {
    const speaker = l.match(/^(?:\[\d+:\d+\] )?([^:]{2,40}):/)?.[1];
    const prev = merged[merged.length - 1];
    if (speaker && prev?.speaker === speaker) prev.text += ` ${l.slice(l.indexOf(':', l.indexOf(speaker)) + 1).trim()}`;
    else merged.push({ speaker, text: l });
  }
  return { texto: merged.map((m) => m.text).join('\n'), arquivo: { falas: lines.length }, transcricao: true };
}

function decodeTransfer(body, encoding = '', charset = 'utf-8') {
  let buf;
  if (/base64/i.test(encoding)) buf = Buffer.from(body.replace(/\s+/g, ''), 'base64');
  else if (/quoted-printable/i.test(encoding)) {
    buf = Buffer.from(body.replace(/=\r?\n/g, '').replace(/=([0-9A-F]{2})/gi, (m, h) => String.fromCharCode(parseInt(h, 16))), 'latin1');
  } else return body;
  return /utf-?8/i.test(charset) ? buf.toString('utf8') : buf.toString('latin1');
}

function eml(text) {
  const split = (raw) => {
    const i = raw.search(/\r?\n\r?\n/);
    const head = (i < 0 ? raw : raw.slice(0, i)).replace(/\r?\n[ \t]+/g, ' ');
    const headers = Object.fromEntries(head.split(/\r?\n/).map((l) => [l.slice(0, l.indexOf(':')).toLowerCase(), l.slice(l.indexOf(':') + 1).trim()]));
    return { headers, body: i < 0 ? '' : raw.slice(i).trim() };
  };
  const { headers, body } = split(text);
  let content = body;
  let { 'content-transfer-encoding': enc = '', 'content-type': type = 'text/plain' } = headers;
  const boundary = type.match(/boundary="?([^";]+)"?/)?.[1];
  if (boundary) {
    const parts = body.split(`--${boundary}`).map((p) => split(p.trim())).filter((p) => p.headers['content-type']);
    const part = parts.find((p) => /text\/plain/i.test(p.headers['content-type'])) ?? parts.find((p) => /text\/html/i.test(p.headers['content-type']));
    if (part) { content = part.body; enc = part.headers['content-transfer-encoding'] ?? ''; type = part.headers['content-type']; }
  }
  content = decodeTransfer(content, enc, type.match(/charset="?([^";]+)/i)?.[1]);
  if (/text\/html/i.test(type)) content = html(content).texto;
  const decodeHeader = (v = '') => v.replace(/=\?([^?]+)\?([BQ])\?([^?]*)\?=/gi, (m, cs, mode, data) => (mode.toUpperCase() === 'B'
    ? decodeTransfer(data, 'base64', cs) : decodeTransfer(data.replace(/_/g, ' '), 'quoted-printable', cs)));
  const head = [['Assunto', 'subject'], ['De', 'from'], ['Para', 'to'], ['Cc', 'cc'], ['Data', 'date']]
    .filter(([, k]) => headers[k]).map(([label, k]) => `**${label}:** ${decodeHeader(headers[k])}`);
  const sent = headers.date ? new Date(headers.date) : null;
  return {
    texto: tidy(`${head.join('\n')}\n\n${content}`),
    arquivo: { titulo: decodeHeader(headers.subject) || null, autor: decodeHeader(headers.from) || null, criadoEm: sent && !Number.isNaN(sent.getTime()) ? sent.toISOString().slice(0, 10) : null },
    email: true,
  };
}

// PDF: descompacta os content streams e lê os operadores de texto (Tj, TJ, ', ").
// PDFs escaneados (imagem) ou com fontes sem mapa Unicode geram pouco texto: o aviso orienta revisão.
function pdf(buf) {
  const raw = buf.toString('latin1');
  const avisos = [];
  const chunks = [];
  const re = /<<((?:(?!>>\s*stream)[\s\S])*?)>>\s*stream\r?\n/g;
  let m;
  while ((m = re.exec(raw))) {
    const start = m.index + m[0].length;
    const end = raw.indexOf('endstream', start);
    if (end < 0) break;
    // A captura pode começar no dicionário de um objeto anterior; o dicionário do stream vem depois do último "obj".
    const dict = m[1].split(/\bobj\b/).pop();
    if (/\/Subtype\s*\/Image|DCTDecode|\/Type\s*\/(XObject|Font|Metadata)/.test(dict)) continue;
    let data = buf.subarray(start, end);
    if (/FlateDecode/.test(dict)) {
      try { data = zlib.inflateSync(data); } catch { try { data = zlib.inflateSync(data.subarray(0, data.length - 2)); } catch { continue; } }
    }
    const text = pdfContentText(data.toString('latin1'));
    if (text.trim()) chunks.push(text);
  }
  const texto = tidy(chunks.join('\n\n'));
  const pages = (raw.match(/\/Type\s*\/Page(?!s)/g) ?? []).length;
  const readable = (texto.match(/[a-zA-ZÀ-ú0-9\s.,;:]/g) ?? []).length / Math.max(1, texto.length);
  if (texto.length < 40 * Math.max(1, pages)) avisos.push('Pouco texto extraído do PDF: pode ser um documento escaneado. OCR não está disponível no V0; revise os metadados manualmente.');
  if (texto && readable < 0.8) avisos.push('Parte do texto do PDF usa fontes sem mapa de caracteres e pode estar ilegível.');
  const title = raw.match(/\/Title\s*\(((?:\\.|[^\\)])*)\)/)?.[1];
  const author = raw.match(/\/Author\s*\(((?:\\.|[^\\)])*)\)/)?.[1];
  return { texto, arquivo: { titulo: title ? unescapePdf(title) : null, autor: author ? unescapePdf(author) : null, paginas: pages }, avisos };
}

function unescapePdf(s) {
  return s.replace(/\\([nrtbf()\\]|[0-7]{1,3})/g, (m, c) => ({ n: '\n', r: '\r', t: '\t', b: '\b', f: '\f', '(': '(', ')': ')', '\\': '\\' }[c] ?? String.fromCharCode(parseInt(c, 8))));
}

function pdfContentText(content) {
  let out = '';
  let i = 0;
  const operands = [];
  while (i < content.length) {
    const ch = content[i];
    if (ch === '(') {
      let depth = 1;
      let s = '';
      i++;
      while (i < content.length && depth) {
        const c = content[i];
        if (c === '\\') { s += c + content[i + 1]; i += 2; continue; }
        if (c === '(') depth++;
        if (c === ')' && --depth === 0) break;
        s += c;
        i++;
      }
      operands.push({ str: unescapePdf(s) });
      i++;
    } else if (ch === '<' && content[i + 1] !== '<') {
      const end = content.indexOf('>', i);
      const hex = content.slice(i + 1, end).replace(/\s/g, '');
      operands.push({ str: Buffer.from(hex.length % 2 ? `${hex}0` : hex, 'hex').toString('latin1') });
      i = end + 1;
    } else if (ch === '[') {
      operands.push({ arrayStart: true });
      i++;
    } else if (ch === ']') {
      const items = [];
      while (operands.length && !operands[operands.length - 1].arrayStart) items.unshift(operands.pop());
      operands.pop();
      operands.push({ array: items });
      i++;
    } else if (/[\s]/.test(ch)) {
      i++;
    } else if (ch === '%') {
      while (i < content.length && content[i] !== '\n') i++;
    } else {
      const token = content.slice(i).match(/^[^\s()<>[\]/%]+|^\/[^\s()<>[\]/%]*/)?.[0] ?? ch;
      i += token.length;
      if (/^-?[\d.]+$/.test(token)) { operands.push({ num: Number(token) }); continue; }
      if (token.startsWith('/')) { operands.push({ name: token }); continue; }
      switch (token) {
        case 'Tj': out += operands.pop()?.str ?? ''; break;
        case "'": case '"': out += `\n${operands.pop()?.str ?? ''}`; break;
        case 'TJ':
          for (const it of operands.pop()?.array ?? []) out += it.str ?? (it.num < -200 ? ' ' : '');
          break;
        case 'Td': case 'TD': { const ty = operands[operands.length - 1]?.num; if (ty) out += '\n'; break; }
        case 'T*': out += '\n'; break;
        case 'ET': out += '\n'; break;
        default: break;
      }
      operands.length = 0;
    }
  }
  return out.replace(/[ \t]+/g, ' ');
}

export function extractText({ buffer, filename }) {
  const formato = detectFormat(buffer, filename);
  let out;
  switch (formato) {
    case 'docx': out = docx(buffer); break;
    case 'pptx': out = pptx(buffer); break;
    case 'xlsx': out = xlsx(buffer); break;
    case 'pdf': out = pdf(buffer); break;
    case 'csv': out = csv(decodeText(buffer)); break;
    case 'json': out = jsonText(decodeText(buffer)); break;
    case 'html': out = html(decodeText(buffer)); break;
    case 'vtt': case 'srt': out = captions(decodeText(buffer)); break;
    case 'eml': out = eml(decodeText(buffer)); break;
    default: {
      const { meta, body } = parseDocument(decodeText(buffer));
      out = { texto: tidy(body), arquivo: {}, frontmatter: Object.keys(meta).length ? meta : null };
    }
  }
  const avisos = [...(out.avisos ?? [])];
  if (!out.texto?.trim()) avisos.push('Nenhum texto foi extraído do arquivo.');
  return { formato, texto: out.texto ?? '', arquivo: out.arquivo ?? {}, frontmatter: out.frontmatter ?? null, transcricao: Boolean(out.transcricao), email: Boolean(out.email), avisos };
}
