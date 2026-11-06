// PPTX e DOCX (OOXML) gerados à mão, sem dependências: XML + o escritor ZIP nativo (UC10).
// A apresentação usa a mesma geometria do PDF (modelo.js); o resumo usa estilos do Word e deixa o Word paginar.

import { writeZip } from '../extract/zip.js';
import { SLIDE } from './modelo.js';

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  // Caracteres de controle são inválidos em XML.
  .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '');
const XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n';
const NS_A = 'http://schemas.openxmlformats.org/drawingml/2006/main';
const NS_R = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
const NS_P = 'http://schemas.openxmlformats.org/presentationml/2006/main';
const REL = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
const PKG = 'http://schemas.openxmlformats.org/package/2006';
const EMU = 12700;
const emu = (pt) => Math.round(pt * EMU);

const rels = (list) => `${XML}<Relationships xmlns="${PKG}/relationships">${list.map(([id, type, target]) => `<Relationship Id="${id}" Type="${type}" Target="${target}"/>`).join('')}</Relationships>`;

function coreProps(title) {
  const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
  return `${XML}<cp:coreProperties xmlns:cp="${PKG}/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<dc:title>${esc(title)}</dc:title><dc:creator>Radar de Propostas &amp; Cases</dc:creator><cp:lastModifiedBy>Radar</cp:lastModifiedBy>
<dcterms:created xsi:type="dcterms:W3CDTF">${now}</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">${now}</dcterms:modified></cp:coreProperties>`;
}
const appProps = (app) => `${XML}<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>${app}</Application></Properties>`;

// ---------- PPTX ----------

const THEME = `${XML}<a:theme xmlns:a="${NS_A}" name="Radar"><a:themeElements>
<a:clrScheme name="Radar"><a:dk1><a:srgbClr val="111827"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="0B1B3F"/></a:dk2><a:lt2><a:srgbClr val="EEF4FF"/></a:lt2>
<a:accent1><a:srgbClr val="155EEF"/></a:accent1><a:accent2><a:srgbClr val="11E3F0"/></a:accent2><a:accent3><a:srgbClr val="067647"/></a:accent3><a:accent4><a:srgbClr val="D97706"/></a:accent4><a:accent5><a:srgbClr val="6941C6"/></a:accent5><a:accent6><a:srgbClr val="B42318"/></a:accent6>
<a:hlink><a:srgbClr val="155EEF"/></a:hlink><a:folHlink><a:srgbClr val="6941C6"/></a:folHlink></a:clrScheme>
<a:fontScheme name="Radar"><a:majorFont><a:latin typeface="Arial"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont><a:minorFont><a:latin typeface="Arial"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont></a:fontScheme>
<a:fmtScheme name="Radar">
<a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst>
<a:lnStyleLst><a:ln w="6350"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln><a:ln w="12700"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln><a:ln w="19050"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln></a:lnStyleLst>
<a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst>
<a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst>
</a:fmtScheme></a:themeElements><a:objectDefaults/><a:extraClrSchemeLst/></a:theme>`;

const GRP = '<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>';
const NS = `xmlns:a="${NS_A}" xmlns:r="${NS_R}" xmlns:p="${NS_P}"`;

function shapeXml(el, id) {
  const xfrm = `<a:xfrm><a:off x="${emu(el.x)}" y="${emu(el.y)}"/><a:ext cx="${emu(el.w)}" cy="${emu(el.h)}"/></a:xfrm>`;
  if (el.t === 'rect') {
    return `<p:sp><p:nvSpPr><p:cNvPr id="${id}" name="Forma ${id}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr>${xfrm}<a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:solidFill><a:srgbClr val="${el.fill}"/></a:solidFill><a:ln><a:noFill/></a:ln></p:spPr></p:sp>`;
  }
  const paras = el.paras.map((p) => {
    const r = p.runs[0];
    const size = r.size ?? 12;
    const algn = p.align === 'r' ? ' algn="r"' : p.align === 'c' ? ' algn="ctr"' : '';
    const bullet = p.bullet
      ? `<a:buClr><a:srgbClr val="155EEF"/></a:buClr><a:buFont typeface="Arial"/><a:buChar char="&#9632;"/>`
      : '<a:buNone/>';
    const mar = p.bullet ? ` marL="${emu(size * 1.1)}" indent="-${emu(size * 1.1)}"` : '';
    const ppr = `<a:pPr${mar}${algn}><a:lnSpc><a:spcPct val="${Math.round((p.lineHeight ?? 1.2) * 100000 / 1.2)}"/></a:lnSpc><a:spcAft><a:spcPts val="${Math.round((p.spaceAfter ?? 0) * 100)}"/></a:spcAft>${bullet}</a:pPr>`;
    const runs = p.runs.map((x) => `<a:r><a:rPr lang="pt-BR" sz="${Math.round((x.size ?? size) * 100)}"${x.bold ? ' b="1"' : ''} dirty="0"><a:solidFill><a:srgbClr val="${x.color ?? '111827'}"/></a:solidFill><a:latin typeface="Arial"/><a:cs typeface="Arial"/></a:rPr><a:t>${esc(x.text)}</a:t></a:r>`).join('');
    return `<a:p>${ppr}${runs}</a:p>`;
  }).join('');
  return `<p:sp><p:nvSpPr><p:cNvPr id="${id}" name="Texto ${id}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr><p:spPr>${xfrm}<a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/></p:spPr>
<p:txBody><a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" anchor="t"><a:noAutofit/></a:bodyPr><a:lstStyle/>${paras}</p:txBody></p:sp>`;
}

export function buildPptx(slides, { title }) {
  const files = {};
  const n = slides.length;
  files['[Content_Types].xml'] = `${XML}<Types xmlns="${PKG}/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
<Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>
<Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>
<Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
<Override PartName="/ppt/presProps.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presProps+xml"/>
<Override PartName="/ppt/viewProps.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.viewProps+xml"/>
<Override PartName="/ppt/tableStyles.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.tableStyles+xml"/>
<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
${slides.map((_, i) => `<Override PartName="/ppt/slides/slide${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`).join('')}</Types>`;
  files['_rels/.rels'] = rels([['rId1', `${REL}/officeDocument`, 'ppt/presentation.xml'], ['rId2', `${PKG}/relationships/metadata/core-properties`, 'docProps/core.xml'], ['rId3', `${REL}/extended-properties`, 'docProps/app.xml']]);
  files['docProps/core.xml'] = coreProps(title);
  files['docProps/app.xml'] = appProps('Microsoft Office PowerPoint');
  files['ppt/presentation.xml'] = `${XML}<p:presentation ${NS} saveSubsetFonts="1"><p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst>
<p:sldIdLst>${slides.map((_, i) => `<p:sldId id="${256 + i}" r:id="rId${10 + i}"/>`).join('')}</p:sldIdLst>
<p:sldSz cx="${emu(SLIDE.w)}" cy="${emu(SLIDE.h)}"/><p:notesSz cx="6858000" cy="9144000"/></p:presentation>`;
  files['ppt/_rels/presentation.xml.rels'] = rels([
    ['rId1', `${REL}/slideMaster`, 'slideMasters/slideMaster1.xml'], ['rId2', `${REL}/theme`, 'theme/theme1.xml'],
    ['rId3', `${REL}/presProps`, 'presProps.xml'], ['rId4', `${REL}/viewProps`, 'viewProps.xml'], ['rId5', `${REL}/tableStyles`, 'tableStyles.xml'],
    ...slides.map((_, i) => [`rId${10 + i}`, `${REL}/slide`, `slides/slide${i + 1}.xml`]),
  ]);
  files['ppt/presProps.xml'] = `${XML}<p:presentationPr ${NS}/>`;
  files['ppt/viewProps.xml'] = `${XML}<p:viewPr ${NS}><p:normalViewPr><p:restoredLeft sz="15620"/><p:restoredTop sz="94660"/></p:normalViewPr><p:gridSpacing cx="76200" cy="76200"/></p:viewPr>`;
  files['ppt/tableStyles.xml'] = `${XML}<a:tblStyleLst xmlns:a="${NS_A}" def="{5C22544A-7EE6-4342-B048-85BDC9FD1C3A}"/>`;
  files['ppt/theme/theme1.xml'] = THEME;
  files['ppt/slideMasters/slideMaster1.xml'] = `${XML}<p:sldMaster ${NS}><p:cSld><p:bg><p:bgRef idx="1001"><a:schemeClr val="bg1"/></p:bgRef></p:bg><p:spTree>${GRP}</p:spTree></p:cSld>
<p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>
<p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst>
<p:txStyles><p:titleStyle><a:lvl1pPr><a:defRPr sz="4000"/></a:lvl1pPr></p:titleStyle><p:bodyStyle><a:lvl1pPr><a:defRPr sz="1800"/></a:lvl1pPr></p:bodyStyle><p:otherStyle><a:lvl1pPr><a:defRPr sz="1800"/></a:lvl1pPr></p:otherStyle></p:txStyles></p:sldMaster>`;
  files['ppt/slideMasters/_rels/slideMaster1.xml.rels'] = rels([['rId1', `${REL}/slideLayout`, '../slideLayouts/slideLayout1.xml'], ['rId2', `${REL}/theme`, '../theme/theme1.xml']]);
  files['ppt/slideLayouts/slideLayout1.xml'] = `${XML}<p:sldLayout ${NS} type="blank" preserve="1"><p:cSld name="Em branco"><p:spTree>${GRP}</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>`;
  files['ppt/slideLayouts/_rels/slideLayout1.xml.rels'] = rels([['rId1', `${REL}/slideMaster`, '../slideMasters/slideMaster1.xml']]);
  slides.forEach((els, i) => {
    files[`ppt/slides/slide${i + 1}.xml`] = `${XML}<p:sld ${NS}><p:cSld><p:spTree>${GRP}${els.map((el, j) => shapeXml(el, j + 2)).join('')}</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>`;
    files[`ppt/slides/_rels/slide${i + 1}.xml.rels`] = rels([['rId1', `${REL}/slideLayout`, '../slideLayouts/slideLayout1.xml']]);
  });
  if (!n) throw new Error('Nenhum slide para gerar.');
  return writeZip(files);
}

// ---------- DOCX ----------

const NS_W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
const pt2 = (pt) => Math.round(pt * 2); // meio-ponto
const tw = (pt) => Math.round(pt * 20); // twip

const run = (text, { bold = false, size = 10.5, color = '374151' } = {}) =>
  `<w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/>${bold ? '<w:b/>' : ''}<w:color w:val="${color}"/><w:sz w:val="${pt2(size)}"/><w:szCs w:val="${pt2(size)}"/></w:rPr><w:t xml:space="preserve">${esc(text)}</w:t></w:r>`;
const para = (runs, { style = null, after = 6, before = 0, shading = null, keepNext = false, numbered = false, indent = null, spacingLine = 300 } = {}) =>
  `<w:p><w:pPr>${style ? `<w:pStyle w:val="${style}"/>` : ''}${keepNext ? '<w:keepNext/>' : ''}${numbered ? '<w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr>' : ''}${shading ? `<w:shd w:val="clear" w:color="auto" w:fill="${shading}"/>` : ''}<w:spacing w:before="${tw(before)}" w:after="${tw(after)}" w:line="${spacingLine}" w:lineRule="auto"/>${indent != null ? `<w:ind w:left="${tw(indent)}" w:right="${tw(indent)}"/>` : ''}</w:pPr>${runs}</w:p>`;

function fichaTable(pares) {
  const cols = 3;
  const rows = [];
  for (let i = 0; i < pares.length; i += cols) rows.push(pares.slice(i, i + cols));
  const w = 9638 / cols;
  const cell = (par) => `<w:tc><w:tcPr><w:tcW w:w="${w}" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="EEF4FF"/><w:tcMar><w:top w:w="120" w:type="dxa"/><w:left w:w="160" w:type="dxa"/><w:bottom w:w="120" w:type="dxa"/></w:tcMar></w:tcPr>
${par ? para(run(par[0].toUpperCase(), { bold: true, size: 7.5, color: '5B6271' }), { after: 2 }) + para(run(par[1], { bold: true, size: 12, color: '111827' }), { after: 0 }) : para('', { after: 0 })}</w:tc>`;
  return `<w:tbl><w:tblPr><w:tblW w:w="9638" w:type="dxa"/><w:tblBorders><w:left w:val="single" w:sz="24" w:color="155EEF"/><w:top w:val="nil"/><w:bottom w:val="nil"/><w:right w:val="nil"/><w:insideH w:val="nil"/><w:insideV w:val="nil"/></w:tblBorders><w:tblLayout w:type="fixed"/></w:tblPr>
<w:tblGrid>${Array.from({ length: cols }, () => `<w:gridCol w:w="${w}"/>`).join('')}</w:tblGrid>
${rows.map((r) => `<w:tr>${Array.from({ length: cols }, (_, i) => cell(r[i])).join('')}</w:tr>`).join('')}</w:tbl>${para('', { after: 10 })}`;
}

export function buildDocx(blocos, { title, rodape }) {
  const body = blocos.map((b) => {
    if (b.t === 'cabecalho') {
      return para(run('RESUMO EXECUTIVO', { bold: true, size: 9, color: '11E3F0' }), { shading: '0B1B3F', after: 0, before: 0, indent: 6 })
        + para(run(b.titulo, { bold: true, size: 22, color: 'FFFFFF' }), { shading: '0B1B3F', after: 0, spacingLine: 276, indent: 6 })
        + para(run(b.linha, { size: 10.5, color: 'C7D7FE' }), { shading: '0B1B3F', after: 0, indent: 6 })
        + para('', { after: 12 });
    }
    if (b.t === 'ficha') return fichaTable(b.pares);
    if (b.t === 'h') return para(run(b.texto, { bold: true, size: 13, color: '155EEF' }), { style: 'Heading1', before: 10, after: 6, keepNext: true });
    if (b.t === 'p') {
      if (b.rotulo) return para(run(`${b.rotulo}: `, { bold: true, color: '111827' }) + run(b.texto.replace(new RegExp(`^${b.rotulo}:\\s*`), '')), { after: 6 });
      return para(run(b.texto), { after: 8 });
    }
    if (b.t === 'ul') return b.itens.map((i) => para(run(i), { numbered: true, after: 3 })).join('');
    if (b.t === 'fontes') return para(run(b.titulo.toUpperCase(), { bold: true, size: 8, color: '5B6271' }), { before: 12, after: 4, keepNext: true }) + b.itens.map((i) => para(run(`• ${i}`, { size: 8.5, color: '5B6271' }), { after: 1 })).join('');
    return '';
  }).join('');
  const files = {};
  files['[Content_Types].xml'] = `${XML}<Types xmlns="${PKG}/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
<Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>
<Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>
<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>`;
  files['_rels/.rels'] = rels([['rId1', `${REL}/officeDocument`, 'word/document.xml'], ['rId2', `${PKG}/relationships/metadata/core-properties`, 'docProps/core.xml'], ['rId3', `${REL}/extended-properties`, 'docProps/app.xml']]);
  files['docProps/core.xml'] = coreProps(title);
  files['docProps/app.xml'] = appProps('Microsoft Office Word');
  files['word/_rels/document.xml.rels'] = rels([['rId1', `${REL}/styles`, 'styles.xml'], ['rId2', `${REL}/numbering`, 'numbering.xml'], ['rId3', `${REL}/footer`, 'footer1.xml']]);
  files['word/styles.xml'] = `${XML}<w:styles xmlns:w="${NS_W}"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:sz w:val="21"/><w:szCs w:val="21"/><w:lang w:val="pt-BR"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="300" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>
<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>
<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:pBdr><w:bottom w:val="single" w:sz="4" w:space="4" w:color="E5E7EB"/></w:pBdr><w:outlineLvl w:val="0"/></w:pPr><w:rPr><w:b/><w:color w:val="155EEF"/><w:sz w:val="26"/></w:rPr></w:style>
<w:style w:type="table" w:default="1" w:styleId="TableNormal"><w:name w:val="Normal Table"/><w:tblPr><w:tblCellMar><w:left w:w="108" w:type="dxa"/><w:right w:w="108" w:type="dxa"/></w:tblCellMar></w:tblPr></w:style></w:styles>`;
  files['word/numbering.xml'] = `${XML}<w:numbering xmlns:w="${NS_W}"><w:abstractNum w:abstractNumId="0"><w:multiLevelType w:val="singleLevel"/><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="&#9632;"/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="360" w:hanging="300"/></w:pPr><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:color w:val="155EEF"/><w:sz w:val="14"/></w:rPr></w:lvl></w:abstractNum><w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num></w:numbering>`;
  files['word/footer1.xml'] = `${XML}<w:ftr xmlns:w="${NS_W}" xmlns:r="${NS_R}"><w:p><w:pPr><w:pBdr><w:top w:val="single" w:sz="4" w:space="4" w:color="E5E7EB"/></w:pBdr><w:tabs><w:tab w:val="right" w:pos="9638"/></w:tabs></w:pPr>
${run(rodape, { size: 8, color: '5B6271' })}<w:r><w:rPr><w:sz w:val="16"/><w:color w:val="5B6271"/></w:rPr><w:tab/></w:r><w:r><w:rPr><w:sz w:val="16"/><w:color w:val="5B6271"/></w:rPr><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:rPr><w:sz w:val="16"/><w:color w:val="5B6271"/></w:rPr><w:instrText xml:space="preserve"> PAGE </w:instrText></w:r><w:r><w:rPr><w:sz w:val="16"/><w:color w:val="5B6271"/></w:rPr><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:rPr><w:sz w:val="16"/><w:color w:val="5B6271"/></w:rPr><w:t>1</w:t></w:r><w:r><w:rPr><w:sz w:val="16"/><w:color w:val="5B6271"/></w:rPr><w:fldChar w:fldCharType="end"/></w:r></w:p></w:ftr>`;
  files['word/document.xml'] = `${XML}<w:document xmlns:w="${NS_W}" xmlns:r="${NS_R}"><w:body>${body}
<w:sectPr><w:footerReference w:type="default" r:id="rId3"/><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="567" w:footer="567" w:gutter="0"/></w:sectPr></w:body></w:document>`;
  return writeZip(files);
}
