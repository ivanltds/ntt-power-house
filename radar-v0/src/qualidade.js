// Qualidade da versão: feedbacks com código de correção, roteiro de testes regressivos e acompanhamento.
// Persistência em DATA_DIR/qualidade.json, só texto. As imagens anexadas a um feedback vão para a IA
// descrever o problema; se a hospedagem externa estiver configurada (src/imagens.js), elas também vão para lá e o
// ticket guarda só os links. Nada de imagem é gravado no disco do servidor.
// Os resultados do roteiro ficam por versão: uma versão nova começa zerada; os tickets atravessam versões.

import fs from 'node:fs';
import path from 'node:path';
import { maskSensitive } from './sensitive.js';
import { ROTEIRO } from './roteiro.js';

// Cada cenário do roteiro é executado UMA vez por versão (os analistas dividem as áreas entre si).
// A situação do cenário é o resultado mais recente registrado nele; sem resultado, fica pendente.
export const REGRA_METRICA = 'Cada cenário conta uma vez por versão: vale o resultado mais recente registrado nele (um reteste substitui o anterior). Sem resultado, o cenário está pendente. Os analistas dividem as áreas entre si; não se espera que cada um execute todos os cenários.';
const maisRecente = (porAnalista = {}) => Object.entries(porAnalista).map(([nome, v]) => ({ ...v, analista: nome })).sort((a, b) => b.em.localeCompare(a.em))[0] ?? null;
export const AREAS = { conversas: 'Conversas', projetos: 'Projetos', upload: 'Envio de arquivos', outro: 'Outro' };
export const TIPOS = { problema: 'Problema', sugestao: 'Sugestão', duvida: 'Dúvida' };
export const STATUS = {
  aberto: 'Aberto', em_correcao: 'Em correção', corrigido: 'Corrigido, aguardando reteste', validado: 'Validado', nao_procede: 'Não procede',
};
export const STATUS_ABERTOS = ['aberto', 'em_correcao', 'corrigido'];
export const RESULTADOS = { ok: 'OK', falha: 'Falhou', bloqueado: 'Bloqueado' };
export const MAX_IMAGENS = 3;
export const MAX_IMAGEM_BYTES = 1_500_000;
// Prioridade definida na triagem; sem valor = "A definir". A ordem é a da listagem.
export const PRIORIDADES = { critica: 'Crítica', alta: 'Alta', media: 'Média', baixa: 'Baixa' };
export const MAX_IMAGENS_TICKET = 6;
export const MAX_PROPOSTA = 4000;
const limpo = (s) => maskSensitive(String(s ?? '').trim()).texto;
// Anexo hospedado fora: só links https entram no ticket.
const anexo = (a) => {
  const ok = (u) => typeof u === 'string' && /^https:\/\/[^\s"'<>]+$/.test(u);
  if (!a || !ok(a.url)) throw new Error('Link de imagem inválido.');
  return { url: a.url, thumb: ok(a.thumb) ? a.thumb : a.url, apagar: ok(a.apagar) ? a.apagar : null, servico: String(a.servico ?? '').slice(0, 20), em: new Date().toISOString() };
};

// O roteiro (cenários passo a passo) fica em src/roteiro.js.
export { ROTEIRO };

const RESULTADO_KEYS = Object.keys(RESULTADOS);

export class QualityStore {
  constructor(file) {
    this.file = file;
    this.data = { seq: 0, tickets: [], execucoes: {} };
    if (fs.existsSync(file)) this.data = { ...this.data, ...JSON.parse(fs.readFileSync(file, 'utf8')) };
  }

  save() {
    fs.mkdirSync(path.dirname(this.file), { recursive: true });
    const tmp = `${this.file}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(this.data, null, 1));
    fs.renameSync(tmp, this.file);
  }

  novoCodigo() {
    this.data.seq += 1;
    return `CR-${String(this.data.seq).padStart(3, '0')}`;
  }

  // Abre um ticket. Todo texto passa pelo mascaramento antes de ser gravado.
  abrir({ nome, texto, area = 'outro', tipo = 'problema', titulo, descricaoImagens = [], versao, origem = 'feedback', cenario = null, prioridade = null, imagens = [] }) {
    const t = limpo(texto);
    const ticket = {
      codigo: this.novoCodigo(),
      criadoEm: new Date().toISOString(),
      versao, origem, cenario,
      nome: limpo(nome).slice(0, 80),
      area: AREAS[area] ? area : 'outro',
      tipo: TIPOS[tipo] ? tipo : 'problema',
      titulo: limpo(titulo || t.split(/[.!?\n]/)[0]).slice(0, 90),
      texto: t.slice(0, 4000),
      descricaoImagens: descricaoImagens.map(limpo).filter(Boolean),
      status: 'aberto',
      prioridade: PRIORIDADES[prioridade] ? prioridade : null,
      imagens: imagens.slice(0, MAX_IMAGENS_TICKET).map(anexo),
      historico: [],
    };
    this.data.tickets.push(ticket);
    this.save();
    return ticket;
  }

  atualizar(codigo, { status, texto, autor, versao }) {
    const t = this.ticket(codigo);
    if (!t) return null;
    if (status && !STATUS[status]) throw new Error('Situação inválida.');
    const nota = maskSensitive(String(texto ?? '').trim()).texto.slice(0, 2000);
    if (!nota && (!status || status === t.status)) throw new Error('Escreva um retorno ou mude a situação.');
    t.historico.push({ em: new Date().toISOString(), autor: maskSensitive(String(autor ?? '').trim()).texto.slice(0, 80) || 'Sem nome', de: t.status, para: status ?? t.status, texto: nota, versao });
    if (status) {
      t.status = status;
      if (status === 'corrigido') t.versaoCorrecao = versao;
    }
    t.atualizadoEm = new Date().toISOString();
    this.save();
    return t;
  }

  // Tickets apagados ficam no arquivo (marcados com "excluido") e somem de todas as listas e números.
  ticket(codigo) {
    return this.data.tickets.find((x) => x.codigo === codigo && !x.excluido) ?? null;
  }

  // Apagar = esconder: o registro fica no arquivo com quem apagou, quando e por quê (dá para recuperar à mão).
  // O código não é reaproveitado.
  excluir(codigo, { autor, motivo, versao }) {
    const t = this.ticket(codigo);
    if (!t) return null;
    const quem = limpo(autor).slice(0, 80);
    if (!quem) throw new Error('Informe o seu nome.');
    const porque = limpo(motivo).slice(0, 500);
    const em = new Date().toISOString();
    t.excluido = { em, autor: quem, motivo: porque, versao };
    t.historico.push({ em, autor: quem, de: t.status, para: t.status, texto: `Ticket apagado.${porque ? ` Motivo: ${porque}` : ''}`, versao });
    t.atualizadoEm = em;
    this.save();
    return { codigo: t.codigo, excluido: t.excluido };
  }

  // Edição completa de um ticket por quem faz a triagem: campos, prioridade, situação, retorno e imagens.
  // Valida tudo antes de mudar qualquer coisa; cada edição vira uma entrada no histórico com o que mudou.
  editar(codigo, { autor, versao, status, nota, prioridade, titulo, texto, area, tipo, proposta, imagensNovas = [], remover = [] }) {
    const t = this.ticket(codigo);
    if (!t) return null;
    const quem = limpo(autor).slice(0, 80);
    if (!quem) throw new Error('Informe o seu nome.');
    if (status !== undefined && !STATUS[status]) throw new Error('Situação inválida.');
    if (area !== undefined && !AREAS[area]) throw new Error('Área inválida.');
    if (tipo !== undefined && !TIPOS[tipo]) throw new Error('Tipo inválido.');
    const prio = prioridade === undefined ? undefined : prioridade || null;
    if (prio && !PRIORIDADES[prio]) throw new Error('Prioridade inválida.');
    const novoTitulo = titulo === undefined ? undefined : limpo(titulo).slice(0, 90);
    if (novoTitulo === '') throw new Error('O título não pode ficar vazio.');
    const novoTexto = texto === undefined ? undefined : limpo(texto).slice(0, 4000);
    if (novoTexto !== undefined && novoTexto.length < 10) throw new Error('Descreva o ticket (pelo menos uma frase).');
    // Proposta de solução definida pelo time (saída da discussão do ticket); vazio apaga.
    const novaProposta = proposta === undefined ? undefined : limpo(proposta).slice(0, MAX_PROPOSTA);
    const imagens = (t.imagens ?? []).filter((i) => !remover.includes(i.url));
    const novas = imagensNovas.map(anexo);
    if (imagens.length + novas.length > MAX_IMAGENS_TICKET) throw new Error(`No máximo ${MAX_IMAGENS_TICKET} imagens por ticket.`);
    const retorno = limpo(nota).slice(0, 2000);

    const alteracoes = [];
    for (const [campo, valor] of [['titulo', novoTitulo], ['area', area], ['tipo', tipo], ['prioridade', prio]]) {
      if (valor !== undefined && valor !== (t[campo] ?? null)) alteracoes.push({ campo, de: t[campo] ?? null, para: valor });
    }
    if (novoTexto !== undefined && novoTexto !== t.texto) alteracoes.push({ campo: 'texto' });
    if (novaProposta !== undefined && novaProposta !== (t.proposta ?? '')) alteracoes.push({ campo: 'proposta', vazia: !novaProposta });
    const removidas = (t.imagens ?? []).length - imagens.length;
    if (novas.length || removidas) alteracoes.push({ campo: 'imagens', adicionadas: novas.length, removidas });
    const novoStatus = status ?? t.status;
    if (!alteracoes.length && !retorno && novoStatus === t.status) throw new Error('Nada foi alterado.');

    for (const a of alteracoes) if ('para' in a) t[a.campo] = a.para;
    if (novoTexto !== undefined) t.texto = novoTexto;
    if (novaProposta !== undefined && novaProposta !== (t.proposta ?? '')) {
      if (novaProposta) { t.proposta = novaProposta; t.propostaEm = new Date().toISOString(); t.propostaPor = quem; } else { delete t.proposta; delete t.propostaEm; delete t.propostaPor; }
    }
    t.imagens = [...imagens, ...novas];
    t.historico.push({ em: new Date().toISOString(), autor: quem, de: t.status, para: novoStatus, texto: retorno, versao, ...(alteracoes.length ? { alteracoes } : {}) });
    if (novoStatus !== t.status) {
      t.status = novoStatus;
      if (novoStatus === 'corrigido') t.versaoCorrecao = versao;
    }
    t.atualizadoEm = new Date().toISOString();
    this.save();
    return t;
  }

  tickets({ abertos = false } = {}) {
    const vivos = this.data.tickets.filter((t) => !t.excluido);
    const lista = abertos ? vivos.filter((t) => STATUS_ABERTOS.includes(t.status)) : vivos;
    return [...lista].sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));
  }

  // Resultado de um analista em um cenário da versão. Falha abre (ou reaproveita) um ticket ligado ao cenário.
  // imagens: evidências já hospedadas (links do ImgBB), só para Falhou ou Bloqueado.
  registrar({ versao, cenario, analista, resultado, comentario = '', imagens = [] }) {
    const c = ROTEIRO.find((x) => x.id === cenario);
    if (!c) throw new Error('Cenário não encontrado.');
    if (!RESULTADO_KEYS.includes(resultado)) throw new Error('Resultado inválido.');
    const nome = maskSensitive(String(analista ?? '').trim()).texto.slice(0, 80);
    if (!nome) throw new Error('Informe o seu nome.');
    const nota = maskSensitive(String(comentario ?? '').trim()).texto.slice(0, 2000);
    if (resultado !== 'ok' && !nota) throw new Error('Conte o que aconteceu de diferente do esperado.');
    const evidencias = resultado === 'ok' ? [] : imagens.map(anexo);
    const exec = (this.data.execucoes[versao] ??= { inicio: new Date().toISOString(), resultados: {} });
    const porCenario = (exec.resultados[cenario] ??= {});
    const anterior = porCenario[nome];
    let ticket = anterior?.ticket ?? null;
    if (resultado !== 'ok') {
      const aberto = ticket && this.data.tickets.find((t) => t.codigo === ticket && !t.excluido && STATUS_ABERTOS.includes(t.status));
      if (aberto) {
        const cabem = evidencias.slice(0, Math.max(0, MAX_IMAGENS_TICKET - (aberto.imagens ?? []).length));
        aberto.imagens = [...(aberto.imagens ?? []), ...cabem];
        aberto.historico.push({ em: new Date().toISOString(), autor: nome, de: aberto.status, para: aberto.status, texto: `Novo resultado no reteste: ${RESULTADOS[resultado]}. ${nota}`, versao, ...(cabem.length ? { alteracoes: [{ campo: 'imagens', adicionadas: cabem.length, removidas: 0 }] } : {}) });
        aberto.atualizadoEm = new Date().toISOString();
      } else ticket = this.abrir({ nome, texto: nota, area: c.area, tipo: 'problema', titulo: `${c.id} · ${c.titulo}: ${RESULTADOS[resultado].toLowerCase()}`, versao, origem: 'roteiro', cenario: c.id, imagens: evidencias }).codigo;
    }
    porCenario[nome] = { resultado, comentario: nota, em: new Date().toISOString(), ticket };
    this.save();
    return { ...porCenario[nome], ticket };
  }

  execucao(versao) {
    return this.data.execucoes[versao] ?? { inicio: null, resultados: {} };
  }

  // Números do acompanhamento (REGRA_METRICA): cada cenário conta uma vez, pelo resultado mais recente.
  // porCenario traz a situação já calculada de cada cenário, para telas e agentes (MCP) não recalcularem.
  resumo(versao) {
    const { resultados } = this.execucao(versao);
    const analistas = [...new Set(Object.values(resultados).flatMap((r) => Object.keys(r)))].sort();
    const porCenario = ROTEIRO.map((c) => {
      const u = maisRecente(resultados[c.id]);
      return { id: c.id, titulo: c.titulo, area: c.area, prioridade: c.prioridade, situacao: u?.resultado ?? 'pendente', analista: u?.analista ?? null, em: u?.em ?? null, ticket: u?.ticket ?? null, registros: Object.keys(resultados[c.id] ?? {}).length };
    });
    const conta = (filtro) => {
      const out = { ok: 0, falha: 0, bloqueado: 0, pendente: 0 };
      for (const c of porCenario.filter(filtro)) out[c.situacao] += 1;
      return out;
    };
    const porArea = Object.fromEntries(['conversas', 'projetos', 'upload'].map((a) => [a, conta((c) => c.area === a)]));
    const porPrioridade = { alta: conta((c) => c.prioridade === 'alta'), media: conta((c) => c.prioridade !== 'alta') };
    // Por analista: o que cada um registrou (contribuição), sem meta de "todos os cenários".
    const porAnalista = analistas.map((nome) => {
      const out = { nome, ok: 0, falha: 0, bloqueado: 0 };
      const areas = new Set();
      for (const c of ROTEIRO) { const v = resultados[c.id]?.[nome]; if (v) { out[v.resultado] += 1; areas.add(c.area); } }
      return { ...out, feitos: out.ok + out.falha + out.bloqueado, areas: [...areas] };
    });
    const tickets = Object.fromEntries(Object.keys(STATUS).map((s) => [s, 0]));
    for (const t of this.data.tickets) if (!t.excluido) tickets[t.status] += 1;
    const anteriores = Object.keys(this.data.execucoes).filter((v) => v !== versao).map((v) => {
      const r = Object.values(this.data.execucoes[v].resultados).map(maisRecente).filter(Boolean);
      return { versao: v, ok: r.filter((x) => x.resultado === 'ok').length, falha: r.filter((x) => x.resultado === 'falha').length, bloqueado: r.filter((x) => x.resultado === 'bloqueado').length };
    });
    return { versao, regra: REGRA_METRICA, cenarios: ROTEIRO.length, geral: conta(() => true), porArea, porPrioridade, porAnalista, porCenario, tickets, anteriores };
  }
}

// Converte data URLs em imagens validadas; nada é gravado.
export function lerImagens(lista = []) {
  if (!Array.isArray(lista)) return [];
  if (lista.length > MAX_IMAGENS) throw new Error(`Envie no máximo ${MAX_IMAGENS} imagens.`);
  return lista.map((url) => {
    const m = /^data:(image\/(png|jpeg|webp|gif));base64,([A-Za-z0-9+/=]+)$/.exec(String(url));
    if (!m) throw new Error('Formato de imagem não aceito. Use PNG, JPG ou WEBP.');
    if (Buffer.byteLength(m[3], 'base64') > MAX_IMAGEM_BYTES) throw new Error('Imagem grande demais. Use uma captura de tela menor.');
    return url;
  });
}
