// Arquivos anexados na conversa (UC15): contexto efêmero, só de quem anexou e só desta conversa.
// Não entram na base nem aparecem para outras pessoas; são apagados junto com a conversa (decisão D2 do adendo 6).
// Guardamos só o texto extraído (já mascarado) e a análise por regras, não o arquivo original.

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { extractText } from '../extract/formats.js';
import { analyzeText, TIPOS_DOCUMENTAIS } from '../analysis.js';
import { maskSensitive } from '../sensitive.js';
import { chunkText } from '../text.js';
import { IndiceLexical } from './lexical.js';

export const MAX_TEXTO_ANEXO = 200_000; // caracteres guardados por arquivo
export const MAX_ANEXOS_CONVERSA = 5;

const seguro = (id) => String(id ?? '').replace(/[^a-zA-Z0-9_-]/g, '');

export class AnexoStore {
  constructor(dir) {
    this.dir = dir;
    this.cache = new Map(); // conversaId → índice lexical dos trechos
  }

  arquivo(conversaId) {
    return path.join(this.dir, `${seguro(conversaId)}.json`);
  }

  ler(conversaId) {
    try { return JSON.parse(fs.readFileSync(this.arquivo(conversaId), 'utf8')); } catch { return []; }
  }

  // Só o dono da conversa vê os anexos dela.
  list(conversaId, userId) {
    if (!conversaId) return [];
    return this.ler(conversaId).filter((a) => a.userId === userId);
  }

  // Extrai, mascara e analisa. Devolve { anexo } ou { erro }.
  add(conversaId, userId, { nome, buffer, clientes = [] }) {
    if (!conversaId) return { erro: 'Conversa não informada.' };
    const atuais = this.ler(conversaId);
    if (atuais.length >= MAX_ANEXOS_CONVERSA) return { erro: `Esta conversa já tem ${MAX_ANEXOS_CONVERSA} arquivos. Comece uma conversa nova para ler outros.` };
    let ext;
    try { ext = extractText({ buffer, filename: nome }); } catch (err) { return { erro: `Não consegui ler o arquivo: ${err.message}` }; }
    if (!ext.texto?.trim()) return { erro: 'Não encontrei texto neste arquivo (pode ser uma imagem escaneada).' };
    const { texto, achados } = maskSensitive(ext.texto.slice(0, MAX_TEXTO_ANEXO));
    const s = analyzeText({ texto, filename: nome, extracao: ext, clients: clientes });
    const anexo = {
      id: `ANX-${crypto.randomUUID().slice(0, 8)}`,
      userId,
      nome: String(nome).slice(0, 160),
      formato: ext.formato,
      criadoEm: new Date().toISOString(),
      caracteres: texto.length,
      truncado: ext.texto.length > MAX_TEXTO_ANEXO,
      mascarados: achados?.length ?? 0,
      analise: {
        tipo: TIPOS_DOCUMENTAIS[s.tipo_documental?.valor] ?? null,
        titulo: s.titulo?.valor ?? null,
        cliente: s.cliente?.valor ?? null,
        segmento: s.segmento?.valor ?? null,
        tecnologias: (s.tecnologias ?? []).map((t) => t.valor).filter(Boolean).slice(0, 10),
        servicos: (s.servicos ?? []).map((t) => t.valor).filter(Boolean).slice(0, 6),
        prazoMeses: s.prazo_meses?.valor ?? null,
        objetivo: s.objetivo?.valor ?? null,
        resumo: s.resumo?.valor ?? null,
      },
      texto,
    };
    fs.mkdirSync(this.dir, { recursive: true });
    fs.writeFileSync(this.arquivo(conversaId), JSON.stringify([...atuais, anexo]));
    this.limparCache(conversaId);
    return { anexo };
  }

  limparCache(conversaId) {
    for (const k of this.cache.keys()) if (k.startsWith(`${conversaId}:`)) this.cache.delete(k);
  }

  remove(conversaId) {
    this.limparCache(conversaId);
    fs.rmSync(this.arquivo(conversaId), { force: true });
  }

  // Trechos dos anexos da conversa para responder perguntas sobre eles (RAG efêmero).
  indice(conversaId, userId) {
    const chave = `${conversaId}:${userId}`;
    if (!this.cache.has(chave)) {
      const trechos = this.list(conversaId, userId).flatMap((a) => chunkText(a.texto, { maxChars: 700 })
        .map((texto, i) => ({ id: `${a.id}-${i + 1}`, anexo: a.id, nome: a.nome, texto })));
      this.cache.set(chave, new IndiceLexical(trechos));
    }
    return this.cache.get(chave);
  }
}

// Visão pública de um anexo (sem o texto inteiro).
export const resumoPublico = (a) => ({ id: a.id, nome: a.nome, formato: a.formato, criadoEm: a.criadoEm, analise: a.analise, truncado: a.truncado });
