// Leitura dos documentos da base piloto (Markdown com frontmatter) e regras de classificação.

import fs from 'node:fs';
import path from 'node:path';

// Hierarquia de confiança de fontes (NB-02, UC03.8): quanto maior, mais confiável.
export function trustLevel(tipo, status) {
  if (status === 'rascunho') return 1;
  if (tipo === 'proposta_comercial' && status === 'final_aprovada') return 5;
  if (tipo === 'sow' || tipo === 'contrato') return 5;
  if (tipo === 'proposta_comercial') return 4;
  if (tipo === 'case_sucesso' || tipo === 'apresentacao_comercial') return 4;
  if (tipo === 'estimativa_preliminar' || tipo === 'ata_validada' || tipo === 'ficha_cadastro') return 3;
  if (tipo === 'transcricao_reuniao' || tipo === 'email' || tipo === 'documento_tecnico') return 2;
  return 1;
}

export const TRUST_LABEL = {
  5: 'Proposta final aprovada / SOW',
  4: 'Case aprovado / apresentação final / proposta enviada',
  3: 'Estimativa preliminar / ata validada / ficha cadastrada',
  2: 'Transcrição / e-mail / documento técnico',
  1: 'Rascunho não validado',
};

export function parseDocument(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx < 0) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value.startsWith('[')) value = JSON.parse(value);
    else if (value !== '' && !Number.isNaN(Number(value))) value = Number(value);
    meta[key] = value;
  }
  return { meta, body: match[2].trim() };
}

export function readCorpus(dir) {
  const docs = [];
  const walk = (d) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(md|txt)$/i.test(entry.name)) {
        const { meta, body } = parseDocument(fs.readFileSync(full, 'utf8'));
        if (!meta.id) continue;
        meta.arquivo = path.relative(dir, full).replace(/\\/g, '/');
        meta.nivel_confianca = trustLevel(meta.tipo_documental, meta.status_documento);
        docs.push({ meta, body });
      }
    }
  };
  walk(dir);
  return docs;
}
