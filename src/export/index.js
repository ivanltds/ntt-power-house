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
  const rodape = `Radar · ${m.nome} · ${opts.para} · dados simulados`;
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

// ---------- One page de case (CR-075) e apresentação de cases (CR-076) ----------
import { onePageContent, aplicarEdicoes, onePageSlide, deckSlides, consolidar, ehCase, anonimizar, MAX_CASES_DECK } from './onepage.js';
import { STATUS_GANHO } from '../db/repo.js';
import { normalize } from '../text.js';

const limpaNome = (s) => String(s).replace(/[\/:*?"<>|]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 60);

export function onePagePreview(engine, id, user, { citar = false } = {}) {
  return onePageContent(engine, id, user, { citar }) ?? { naoEncontrado: true };
}

// pedido: { formato, citar, blocos (edições da prévia), investimento (incluir o bloco), interno (gerar mesmo sem ser case) }
export function exportOnePage(engine, id, user, { formato = 'pptx', citar = false, blocos = {}, investimento = false, interno = false } = {}) {
  if (!['pptx', 'pdf'].includes(formato)) return { erro: 'Formato inválido para a one page. Use pptx ou pdf.' };
  const c = onePageContent(engine, id, user, { citar });
  if (!c) return { naoEncontrado: true };
  // R1P4: projeto que não é case só sai como referência interna, com o selo.
  if (!c.ehCase && !interno) return { erro: `Este projeto não é um case (status: ${c.projeto.status}). Escolha "Gerar mesmo assim como referência interna".`, naoCase: true };
  aplicarEdicoes(c, blocos && typeof blocos === 'object' ? blocos : {}, engine.repo.project(id)?.cliente);
  const slides = [onePageSlide(c, { interno: !c.ehCase, incluirInvestimento: Boolean(investimento) && c.verValores })];
  // Metadados do arquivo sem o nome do cliente quando ele não é citado.
  const title = `One page — ${c.projeto.titulo}`;
  const buffer = formato === 'pptx' ? buildPptx(slides, { title }) : slidesToPdf(slides, { title });
  const nome = `${c.citado ? limpaNome(c.projeto.cliente) : 'Case'} - ${limpaNome(c.projeto.titulo)} - One page.${formato}`;
  return { buffer, nome, mime: MIME[formato], citado: c.citado, interno: !c.ehCase };
}

// Similaridade em escala absoluta, como na busca (CR-064): ~0,10 é ruído e ~0,22 já é muito parecido.
const escala = (sim) => Math.max(0, Math.min(1, (sim - 0.1) / 0.12));
const MIN_PALAVRAS = 0.1; // semelhança bruta mínima para entrar como "ampliado"

// Cases para a apresentação: por tema ou por uma lista de projetos (ex.: a última resposta).
// Por tema, usa a busca de semelhantes do Radar (com a análise da IA quando ligada). Se vierem menos de 3 cases
// ganhos, amplia com a semelhança de palavras; esses vêm desmarcados e com o aviso "confira" (UC-P2.3: sem prova,
// o Radar não monta o material sozinho). Só entram status ganho (R2P1); os demais são contados à parte.
export async function casesParaApresentacao(engine, user, { tema = '', ids = [] } = {}) {
  let itens;
  const t = String(tema).trim();
  if (ids?.length) {
    itens = [...new Set(ids)].map((id) => engine.repo.projectDetail(id, user)?.projeto).filter(Boolean)
      .map((p) => ({ projeto_id: p.id, titulo: p.titulo, cliente: p.cliente, segmento: p.segmento, status: p.status_proposta, similaridade: null, origem: 'lista' }));
  } else {
    if (!t) return { erro: 'Diga o tema da apresentação (ex.: "fraude em seguros").' };
    const r = await engine.search(t, { userId: user.id, history: [] });
    itens = (r.resultados ?? []).map((x) => ({ projeto_id: x.projeto_id, titulo: x.titulo, cliente: x.cliente, segmento: x.segmento, status: x.status, similaridade: x.score, motivo: x.justificativa?.split(' Evidência:')[0], origem: 'busca' }));
    if (itens.filter((x) => STATUS_GANHO.includes(x.status)).length < 3) {
      const vistos = new Set(itens.map((x) => x.projeto_id));
      for (const x of engine.quickSimilar(t, user, {}, 12)) {
        if (vistos.has(x.projeto_id) || x.similaridade < MIN_PALAVRAS) continue;
        itens.push({ ...x, similaridade: escala(x.similaridade), origem: 'ampliado' });
      }
    }
  }
  const tokens = new Set(normalize(t).split(/\s+/).filter((w) => w.length > 3));
  const motivo = (p) => {
    if (p.motivo) return p.motivo;
    const m = [];
    if (p.segmento && normalize(p.segmento).split(/[\s/]+/).some((w) => tokens.has(w))) m.push(`mesmo setor (${p.segmento})`);
    const tecs = (engine.repo.project(p.projeto_id)?.tecnologias ?? []).filter((x) => normalize(x).split(/\s+/).some((w) => tokens.has(w)));
    if (tecs.length) m.push(`usa ${tecs.join(', ')}`);
    if (p.origem === 'ampliado') m.push('parecido só nas palavras: confira se serve');
    return m.length ? m.join(' · ') : p.origem === 'lista' ? 'veio da lista anterior' : 'escopo e descrição parecidos';
  };
  // Bônus no ranking: entregue com resultado e documento marcado como bom modelo.
  const bonus = (p) => {
    const d = engine.repo.projectDetail(p.projeto_id, user);
    const resultado = (d?.entidades.kpi ?? []).length > 0 || d?.documentos.some((x) => x.tipo_documental === 'case_sucesso');
    return (p.status === 'Entregue' && resultado ? 0.05 : 0) + (d?.documentos.some((x) => x.reutilizavel) ? 0.03 : 0);
  };
  const ganhos = itens.filter((p) => STATUS_GANHO.includes(p.status)).map((p) => ({ ...p, motivo: motivo(p), ordem: (p.origem === 'ampliado' ? -1 : 0) + (p.similaridade ?? 1) + bonus(p) }))
    .sort((a, b) => b.ordem - a.ordem).slice(0, 12);
  let marcados = 0;
  for (const p of ganhos) { p.marcado = p.origem !== 'ampliado' && marcados < 5; if (p.marcado) marcados++; delete p.ordem; }
  const fora = itens.filter((p) => !STATUS_GANHO.includes(p.status));
  return { tema: t, candidatos: ganhos, removidos: fora.length, internos: fora.slice(0, 5).map(({ projeto_id, titulo, cliente, status }) => ({ projeto_id, titulo, cliente, status })), semGanhos: !ganhos.some((p) => p.origem !== 'ampliado'), ampliado: ganhos.some((p) => p.origem === 'ampliado') };
}

// pedido: { ids, tema, para, formato, aprendizados }
export function exportApresentacao(engine, user, { ids = [], tema = '', para = '', formato = 'pptx', aprendizados = false } = {}) {
  if (!['pptx', 'pdf'].includes(formato)) return { erro: 'Formato inválido para a apresentação. Use pptx ou pdf.' };
  const lista = [...new Set(Array.isArray(ids) ? ids.map(String) : [])];
  if (!lista.length) return { erro: 'Escolha ao menos um case.' };
  if (lista.length > MAX_CASES_DECK) return { erro: `No máximo ${MAX_CASES_DECK} cases por apresentação.` };
  const cases = lista.map((id) => onePageContent(engine, id, user, { citar: false })).filter(Boolean);
  const naoCases = cases.filter((c) => !ehCase(c.projeto.status));
  const validos = cases.filter((c) => ehCase(c.projeto.status));
  if (!validos.length) return { erro: 'Nenhum dos projetos escolhidos é um case ganho (Vendida, Em execução ou Entregue).' };
  const titulo = String(tema).trim().slice(0, 80) || 'projetos parecidos';
  // Aprendizados (opcional, uso interno): lições dos cases escolhidos.
  const licoes = aprendizados ? validos.flatMap((c) => (engine.repo.projectDetail(c.projeto.id, user)?.entidades.licao ?? []).slice(0, 2).map((e) => `${c.projeto.cliente}: ${anonimizar(e.valor, engine.repo.project(c.projeto.id)?.cliente, c.projeto.segmento)}`)) : null;
  const slides = deckSlides({ tema: titulo, para: String(para).trim().slice(0, 80), cases: validos, consolidado: consolidar(validos), aprendizados: licoes });
  const title = `Cases — ${titulo}`;
  const buffer = formato === 'pptx' ? buildPptx(slides, { title }) : slidesToPdf(slides, { title });
  return { buffer, nome: `Cases - ${limpaNome(titulo)}.${formato}`, mime: MIME[formato], ids: validos.map((c) => c.projeto.id), fora: naoCases.map((c) => c.projeto.id), slides: slides.length };
}
