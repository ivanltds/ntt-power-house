// Gera arquivos de amostra (fictícios) em vários formatos para testar o upload: DOCX, PPTX, XLSX,
// PDF, VTT, EML, HTML e CSV. São arquivos mínimos, montados sem dependências.
// Uso: node scripts/generate-samples.js   → pasta amostras/

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { writeZip } from '../src/extract/zip.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'amostras');
fs.mkdirSync(OUT, { recursive: true });

const x = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const CORE = (title, author) => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<dc:title>${x(title)}</dc:title><dc:creator>${x(author)}</dc:creator><dcterms:created xsi:type="dcterms:W3CDTF">2026-09-15T10:00:00Z</dcterms:created></cp:coreProperties>`;

// ---------- DOCX: proposta para um cliente novo ----------
function docx(file, title, author, blocks) {
  const body = blocks.map(([kind, text]) => {
    const style = kind === 'h1' ? 'Heading1' : kind === 'h2' ? 'Heading2' : null;
    const props = style ? `<w:pPr><w:pStyle w:val="${style}"/></w:pPr>` : kind === 'li' ? '<w:pPr><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr></w:pPr>' : '';
    return `<w:p>${props}<w:r><w:t xml:space="preserve">${x(text)}</w:t></w:r></w:p>`;
  }).join('');
  fs.writeFileSync(path.join(OUT, file), writeZip({
    '[Content_Types].xml': '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>',
    '_rels/.rels': '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>',
    'word/document.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${body}</w:body></w:document>`,
    'docProps/core.xml': CORE(title, author),
  }));
}

docx('proposta-banco-aurora-antifraude.docx', 'Proposta — Prevenção a fraudes em transações PIX', 'Rafael Lima', [
  ['h1', 'Proposta Comercial — Prevenção a fraudes em transações PIX'],
  ['p', 'Cliente: Banco Aurora S.A.'],
  ['p', 'Gerente de projeto: Rafael Lima'],
  ['p', 'Documento confidencial — uso restrito às equipes envolvidas na negociação.'],
  ['h2', 'Contexto e desafio'],
  ['p', 'O Banco Aurora registrou crescimento de 40% nas tentativas de fraude em transações PIX em 2026. As regras atuais geram muitos falsos positivos e bloqueiam clientes legítimos, prejudicando a experiência.'],
  ['h2', 'Objetivo'],
  ['p', 'Implantar um motor de detecção de fraude em tempo real, com modelos de machine learning sobre streaming de transações, reduzindo perdas e falsos positivos.'],
  ['h2', 'Escopo'],
  ['li', 'Ingestão de transações em tempo real com Kafka e lakehouse em Databricks sobre Azure.'],
  ['li', 'Modelos de machine learning em Python para score de risco por transação.'],
  ['li', 'Painéis em Power BI para a equipe de prevenção a fraudes.'],
  ['li', 'Governança de dados e aderência à LGPD.'],
  ['h2', 'Cronograma'],
  ['p', 'Prazo total estimado de 7 meses, em três ondas de entrega.'],
  ['h2', 'Riscos e premissas'],
  ['li', 'Dependência da liberação de acesso aos dados de transações pelo time de segurança do banco.'],
  ['li', 'Risco de atraso na homologação do modelo pelo comitê de risco.'],
  ['h2', 'Investimento'],
  ['p', 'Investimento total: R$ 3,2 milhões. Margem praticada: 31%.'],
]);

// ---------- PPTX: apresentação de fase 2 para cliente existente ----------
function pptx(file, title, author, slides) {
  const files = {
    '[Content_Types].xml': '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="xml" ContentType="application/xml"/></Types>',
    'ppt/presentation.xml': '<?xml version="1.0" encoding="UTF-8"?><p:presentation xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"/>',
    'docProps/core.xml': CORE(title, author),
  };
  const para = (t) => `<a:p><a:r><a:t>${x(t)}</a:t></a:r></a:p>`;
  slides.forEach(({ titulo, itens, notas }, i) => {
    files[`ppt/slides/slide${i + 1}.xml`] = `<?xml version="1.0" encoding="UTF-8"?><p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:spTree><p:sp><p:txBody>${para(titulo)}</p:txBody></p:sp><p:sp><p:txBody>${itens.map(para).join('')}</p:txBody></p:sp></p:spTree></p:cSld></p:sld>`;
    if (notas) files[`ppt/notesSlides/notesSlide${i + 1}.xml`] = `<?xml version="1.0" encoding="UTF-8"?><p:notes xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:spTree><p:sp><p:txBody>${para(notas)}${para(String(i + 1))}</p:txBody></p:sp></p:spTree></p:cSld></p:notes>`;
  });
  fs.writeFileSync(path.join(OUT, file), writeZip(files));
}

pptx('apresentacao-energisul-fase2.pptx', 'Energisul — Fase 2: medição inteligente', 'Marina Costa', [
  { titulo: 'Energisul Distribuidora — Fase 2: medição inteligente e balanço energético', itens: ['Apresentação comercial', 'Outubro de 2026'] },
  { titulo: 'Onde estamos', itens: ['Plataforma de dados lakehouse em Databricks e Azure em produção desde 2025', 'Modelo de priorização de inspeções reduziu as perdas não técnicas em 2,1 p.p.'], notas: 'Reforçar que a fase 1 foi entregue no prazo de 6 meses.' },
  { titulo: 'Proposta da fase 2', itens: ['Integração dos medidores inteligentes via Kafka em tempo real', 'Balanço energético por alimentador com alertas automáticos', 'Painéis em Power BI para as regionais'] },
  { titulo: 'Cronograma e investimento', itens: ['Prazo estimado: 5 meses', 'Equipe: 1 arquiteto, 3 engenheiros de dados, 1 cientista de dados'], notas: 'Não apresentar valores neste encontro; o comercial envia a proposta depois.' },
  { titulo: 'Próximos passos', itens: ['Workshop técnico com a equipe de medição', 'Envio da proposta comercial até 30/11/2026'] },
]);

// ---------- XLSX: estimativa de horas ----------
function xlsx(file, title, rows) {
  const strings = [];
  const idx = (s) => { const i = strings.indexOf(s); return i >= 0 ? i : strings.push(s) - 1; };
  const col = (i) => String.fromCharCode(65 + i);
  const sheet = rows.map((r, ri) => `<row r="${ri + 1}">${r.map((v, ci) => (typeof v === 'number'
    ? `<c r="${col(ci)}${ri + 1}"><v>${v}</v></c>` : `<c r="${col(ci)}${ri + 1}" t="s"><v>${idx(v)}</v></c>`)).join('')}</row>`).join('');
  fs.writeFileSync(path.join(OUT, file), writeZip({
    '[Content_Types].xml': '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="xml" ContentType="application/xml"/></Types>',
    'xl/workbook.xml': '<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheets><sheet name="Estimativa" sheetId="1"/></sheets></workbook>',
    'xl/sharedStrings.xml': `<?xml version="1.0" encoding="UTF-8"?><sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">${strings.map((s) => `<si><t>${x(s)}</t></si>`).join('')}</sst>`,
    'xl/worksheets/sheet1.xml': `<?xml version="1.0" encoding="UTF-8"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${sheet}</sheetData></worksheet>`,
    'docProps/core.xml': CORE(title, 'Pré-vendas'),
  }));
}

const est = [['Fase', 'Perfil', 'Horas', 'Semanas', 'Observação']];
est.push(['Discovery', 'Arquiteto de dados', 160, 4, 'Estimativa preliminar para Banco Aurora']);
est.push(['Ingestão Kafka', 'Engenheiro de dados', 640, 8, 'Streaming de transações PIX']);
est.push(['Modelos de fraude', 'Cientista de dados', 720, 10, 'Machine learning em Python']);
est.push(['Painéis', 'Analista de BI', 240, 6, 'Power BI']);
xlsx('estimativa-preliminar-banco-aurora.xlsx', 'Estimativa preliminar — Banco Aurora', est);

// ---------- PDF: case de resultados ----------
function pdf(file, title, lines) {
  // Fonte padrão em WinAnsi (Latin-1): o travessão vira hífen.
  const esc = (s) => s.replace(/—/g, '-').replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  const content = ['BT', '/F1 11 Tf', '50 790 Td', '14 TL', ...lines.map((l, i) => `${i ? 'T* ' : ''}(${esc(l)}) Tj`), 'ET'].join('\n');
  const stream = zlib.deflateSync(Buffer.from(content, 'latin1'));
  const objs = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>',
    null,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
    `<< /Title (${esc(title)}) /Author (Marketing NTT) >>`,
  ];
  const parts = [Buffer.from('%PDF-1.4\n', 'latin1')];
  const offsets = [];
  let size = parts[0].length;
  objs.forEach((o, i) => {
    const head = Buffer.from(`${i + 1} 0 obj\n`, 'latin1');
    const body = o === null
      ? Buffer.concat([Buffer.from(`<< /Length ${stream.length} /Filter /FlateDecode >>\nstream\n`, 'latin1'), stream, Buffer.from('\nendstream', 'latin1')])
      : Buffer.from(o, 'latin1');
    const chunk = Buffer.concat([head, body, Buffer.from('\nendobj\n', 'latin1')]);
    offsets.push(size);
    parts.push(chunk);
    size += chunk.length;
  });
  const xref = `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n${offsets.map((o) => `${String(o).padStart(10, '0')} 00000 n \n`).join('')}trailer\n<< /Size ${objs.length + 1} /Root 1 0 R /Info 6 0 R >>\nstartxref\n${size}\n%%EOF\n`;
  parts.push(Buffer.from(xref, 'latin1'));
  fs.writeFileSync(path.join(OUT, file), Buffer.concat(parts));
}

pdf('case-segura-mais-resultados.pdf', 'Case Segura Mais Seguros — resultados após 12 meses', [
  'Case de sucesso — Segura Mais Seguros',
  'Detecção de fraude em sinistros com IA generativa: resultados após 12 meses',
  '',
  'Desafio',
  'A Segura Mais Seguros analisava manualmente todos os sinistros de automóveis.',
  '',
  'Resultados',
  '- Redução de 37% nas fraudes pagas no primeiro ano.',
  '- Triagem de documentos 5 vezes mais rápida com IA generativa.',
  '- Economia estimada de R$ 9 milhões por ano em indenizações indevidas.',
  '',
  'Lições aprendidas',
  '- Envolver os analistas de sinistros desde o início acelerou a adoção.',
  '- A qualidade das fotos dos sinistros limitou o modelo nos primeiros meses.',
]);

// ---------- VTT: transcrição de kickoff com cliente novo ----------
fs.writeFileSync(path.join(OUT, 'kickoff-logistica-expressa-norte.vtt'), `WEBVTT

1
00:00:05.000 --> 00:00:18.000
<v Juliana Prado>Bom dia a todos. Sou gerente de operações da Expressa Norte Logística e vou conduzir pelo lado do cliente.

2
00:00:19.000 --> 00:00:40.000
<v Carlos Menezes>Obrigado, Juliana. Eu sou o gerente de projeto pela NTT. O objetivo é otimizar as rotas de entrega last mile com previsão de demanda por região.

3
00:01:02.000 --> 00:01:30.000
<v Juliana Prado>Hoje roteirizamos em planilha. Nossa meta é reduzir 15% do custo de frete e o atraso nas entregas.

4
00:02:10.000 --> 00:02:45.000
<v Carlos Menezes>A proposta prevê dados em AWS com modelos de machine learning em Python e painéis em Power BI. O prazo estimado é de 16 semanas.

5
00:03:00.000 --> 00:03:20.000
<v Juliana Prado>Um risco é a qualidade dos endereços no cadastro, que tem muitos erros.
`);

// ---------- EML: e-mail de cliente existente, com dados de contato (PII) ----------
fs.writeFileSync(path.join(OUT, 'email-rede-bom-preco-ampliacao.eml'), [
  'From: "Eduardo Nunes" <eduardo.nunes@bompreco.exemplo>',
  'To: comercial@ntt.exemplo',
  'Subject: =?UTF-8?Q?Amplia=C3=A7=C3=A3o_da_previs=C3=A3o_de_demanda_para_hortifruti?=',
  'Date: Tue, 06 Oct 2026 09:12:00 -0300',
  'Content-Type: text/plain; charset=utf-8',
  'Content-Transfer-Encoding: quoted-printable',
  '',
  'Ol=C3=A1, time NTT.',
  '',
  'A previs=C3=A3o de demanda e a reposi=C3=A7=C3=A3o autom=C3=A1tica de estoque da Rede Bom Pre=C3=A7o =',
  'Supermercados reduziram a ruptura em 22% nas lojas piloto.',
  'Queremos ampliar para a categoria de hortifruti, que tem alta perecibilidade, nas 120 lojas.',
  'Podem nos enviar uma proposta? A ideia =C3=A9 manter Snowflake e Power BI.',
  '',
  'Atenciosamente,',
  'Eduardo Nunes =E2=80=94 Diretor de Supply Chain',
  'Telefone: (11) 98765-4321',
].join('\r\n'));

// ---------- HTML: levantamento de requisitos ----------
fs.writeFileSync(path.join(OUT, 'levantamento-requisitos-hospital.html'), `<!DOCTYPE html><html><head><title>Levantamento de requisitos — Hospital Santa Aurora</title><style>p{}</style></head><body>
<h1>Levantamento de requisitos — Assistente virtual fase 2</h1>
<p><strong>Cliente:</strong> Hospital Santa Aurora</p>
<h2>Objetivo</h2><p>Ampliar o assistente virtual com IA generativa para agendamento de exames e orientações pré-operatórias.</p>
<h2>Requisitos</h2><ul><li>Integração com o prontuário eletrônico via API</li><li>Respostas com RAG sobre os protocolos clínicos aprovados</li><li>Atendimento 24x7 pelo WhatsApp</li></ul>
<h2>Riscos</h2><ul><li>Dependência da equipe de TI do hospital para liberar as APIs do prontuário</li></ul>
<script>console.log('ignorar')</script></body></html>`);

// ---------- CSV: lista de oportunidades ----------
fs.writeFileSync(path.join(OUT, 'pipeline-oportunidades.csv'), `Cliente;Oportunidade;Segmento;Tecnologias;Prazo
Banco Aurora S.A.;Prevenção a fraudes PIX;Serviços Financeiros;Databricks, Kafka;7 meses
Expressa Norte Logística;Roteirização last mile;Logística;AWS, Python;16 semanas
Hospital Santa Aurora;Assistente virtual fase 2;Saúde;IA Generativa;4 meses
`);

console.log(`Amostras geradas em ${path.relative(ROOT, OUT)}: ${fs.readdirSync(OUT).join(', ')}`);
