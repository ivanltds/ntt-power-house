// Exportação de proposta (UC10): valida o pedido, monta o conteúdo com as permissões do perfil e gera o arquivo.

import { buildContent, exportOptions, fileName, slidesModel, resumoModel, MODELOS } from './modelo.js';
import { slidesToPdf, resumoToPdf } from './pdf.js';
import { buildPptx, buildDocx } from './ooxml.js';

const MIME = {
  pdf: 'application/pdf',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

function content(engine, id, user) {
  const detail = engine.repo.projectDetail(id, user);
  return detail ? buildContent(detail, user) : null;
}

export function proposalExportOptions(engine, id, user, modelo) {
  if (!MODELOS[modelo]) return { erro: 'Modelo inválido.' };
  const c = content(engine, id, user);
  return c ? exportOptions(c, modelo) : { naoEncontrado: true };
}

export function exportProposal(engine, id, user, { modelo, formato, secoes = [], titulo = '', para = '' }) {
  const m = MODELOS[modelo];
  if (!m) return { erro: 'Modelo inválido.' };
  if (!m.formatos.includes(formato)) return { erro: `Formato inválido para ${m.nome}. Use ${m.formatos.join(' ou ')}.` };
  const c = content(engine, id, user);
  if (!c) return { naoEncontrado: true };
  // Só seções que existem para este perfil (ex.: "investimento" não existe para quem não vê valores).
  const validas = (Array.isArray(secoes) ? secoes : []).filter((k) => c.secoes[k]?.disponivel);
  if (!validas.some((k) => k !== 'capa')) return { erro: 'Escolha ao menos uma seção com conteúdo.' };
  const opts = { titulo: String(titulo).trim().slice(0, 160) || c.projeto.titulo, para: String(para).trim().slice(0, 120) || c.projeto.cliente };
  const nomeDoc = `${m.nome} — ${opts.titulo}`;
  const rodape = `Radar · ${m.nome} · ${opts.para} · dados fictícios`;
  let buffer;
  if (modelo === 'apresentacao') {
    const slides = slidesModel(c, validas, opts);
    buffer = formato === 'pptx' ? buildPptx(slides, { title: nomeDoc }) : slidesToPdf(slides, { title: nomeDoc });
  } else {
    const blocos = resumoModel(c, validas, opts);
    buffer = formato === 'docx' ? buildDocx(blocos, { title: nomeDoc, rodape }) : resumoToPdf(blocos, { title: nomeDoc, rodape });
  }
  return { buffer, nome: fileName(c, modelo, formato), mime: MIME[formato], secoes: validas };
}
