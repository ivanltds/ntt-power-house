// Conversas do chat (UC03.1, UC05, UC06). Toda conversa tem memória enquanto o servidor está no ar;
// só as conversas salvas são gravadas em disco (data/conversas/conversas.json) e aparecem na lista.
// Cada conversa pertence a um usuário: outro perfil não lê, não altera e não continua a conversa.

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const TITLE_MAX = 80;
const MEMORY_TURNS = 8;

const title = (text) => {
  const t = String(text ?? '').replace(/\s+/g, ' ').trim();
  return t.length > TITLE_MAX ? `${t.slice(0, TITLE_MAX - 1)}…` : t;
};

export class ConversationStore {
  constructor(file) {
    this.file = file;
    this.items = new Map();
    if (fs.existsSync(file)) {
      for (const c of JSON.parse(fs.readFileSync(file, 'utf8'))) this.items.set(c.id, c);
    }
  }

  persist() {
    fs.mkdirSync(path.dirname(this.file), { recursive: true });
    const saved = [...this.items.values()].filter((c) => c.salva);
    const tmp = `${this.file}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(saved));
    fs.renameSync(tmp, this.file);
  }

  // Retorna a conversa do usuário ou null; nunca entrega a conversa de outro usuário.
  get(id, userId) {
    const c = this.items.get(id);
    return c && c.userId === userId ? c : null;
  }

  // Continua a conversa informada ou cria uma nova quando o id não existe ou é de outro usuário.
  open(id, { userId, opportunityId }) {
    const existing = id && this.get(id, userId);
    if (existing) return existing;
    const now = new Date().toISOString();
    const c = { id: crypto.randomUUID(), userId, oportunidadeId: opportunityId ?? null, titulo: null, salva: false, favorita: false, criadaEm: now, atualizadaEm: now, turnos: [] };
    this.items.set(c.id, c);
    return c;
  }

  // Histórico usado como memória pelo motor de busca.
  history(c) {
    return c.turnos.slice(-MEMORY_TURNS).map((t) => ({
      pergunta: t.pergunta,
      consulta: t.resultado.entendimento?.consulta ?? t.pergunta,
      intencao: t.resultado.entendimento?.intencao,
      tipoResposta: t.resultado.tipoResposta ?? null,
      agruparPor: t.resultado.dados?.campo ?? null,
      filtros: t.resultado.dados?.filtros ?? null,
      // Projetos mostrados no turno (cards, listagem, ficha ou comparação): base para "compare os dois".
      mostrados: [
        ...t.resultado.resultados.map((r) => r.projeto_id),
        ...(t.resultado.dados?.itens ?? []).map((i) => i.projeto_id),
        ...(t.resultado.dados?.ficha ? [t.resultado.dados.ficha.projeto_id] : []),
        ...(t.resultado.dados?.fichas ?? []).map((f) => f.projeto_id),
        ...(t.resultado.dados?.projetos ?? []).map((p) => p.projeto_id),
      ],
      entidades: t.resultado.entendimento?.entidades,
      resposta: t.resultado.resposta,
      resultados: t.resultado.resultados.map((r) => ({ projeto_id: r.projeto_id, titulo: r.titulo, cliente: r.cliente })),
      resultadosCompletos: t.resultado.resultados,
    }));
  }

  addTurn(c, { turnoId, pergunta, resultado }) {
    c.turnos.push({ turnoId, ts: new Date().toISOString(), pergunta, resultado });
    c.titulo ??= title(pergunta);
    c.oportunidadeId ??= resultado.oportunidade?.id ?? null;
    c.atualizadaEm = new Date().toISOString();
    if (c.salva) this.persist();
  }

  // UC05 — salvar (e renomear) a conversa.
  save(id, userId, titulo) {
    const c = this.get(id, userId);
    if (!c || !c.turnos.length) return null;
    c.salva = true;
    if (titulo?.trim()) c.titulo = title(titulo);
    c.atualizadaEm = new Date().toISOString();
    this.persist();
    return c;
  }

  // UC06 — favoritar/desfavoritar. Favoritar uma conversa não salva também a salva.
  favorite(id, userId, favorita) {
    const c = this.get(id, userId);
    if (!c || !c.turnos.length) return null;
    c.favorita = Boolean(favorita);
    if (c.favorita) c.salva = true;
    c.atualizadaEm = new Date().toISOString();
    this.persist();
    return c;
  }

  remove(id, userId) {
    const c = this.get(id, userId);
    if (!c) return false;
    this.items.delete(id);
    this.persist();
    return true;
  }

  // Lista das conversas salvas do usuário: favoritas primeiro, depois as mais recentes.
  list(userId, { soFavoritas = false, busca = '' } = {}) {
    const q = busca.trim().toLowerCase();
    return [...this.items.values()]
      .filter((c) => c.userId === userId && c.salva && (!soFavoritas || c.favorita))
      .filter((c) => !q || c.titulo.toLowerCase().includes(q) || c.turnos.some((t) => t.pergunta.toLowerCase().includes(q)))
      .sort((a, b) => Number(b.favorita) - Number(a.favorita) || b.atualizadaEm.localeCompare(a.atualizadaEm))
      .map(({ id, titulo, favorita, oportunidadeId, criadaEm, atualizadaEm, turnos }) => ({ id, titulo, favorita, oportunidadeId, criadaEm, atualizadaEm, turnos: turnos.length }));
  }
}
