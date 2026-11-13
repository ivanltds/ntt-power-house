// Auditoria das buscas (UC03.15) e feedback (UC03.13) em arquivos JSONL, base das métricas do MVP.

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// Contagem por valor, da mais frequente para a menos: [{ valor, n }].
const count = (values) => [...values.reduce((m, v) => m.set(v, (m.get(v) ?? 0) + 1), new Map())]
  .map(([valor, n]) => ({ valor, n }))
  .sort((a, b) => b.n - a.n);

export class AuditLog {
  constructor(dir) {
    this.dir = dir;
    fs.mkdirSync(dir, { recursive: true });
    this.turnsFile = path.join(dir, 'turnos.jsonl');
    this.eventsFile = path.join(dir, 'eventos.jsonl');
  }

  append(file, record) {
    // Se a última gravação foi interrompida (ex.: disco cheio), a linha ficou sem "\n":
    // começa numa linha nova para não colar o registro novo no pedaço quebrado.
    let prefixo = '';
    if (fs.existsSync(file)) {
      const { size } = fs.statSync(file);
      if (size) {
        const fd = fs.openSync(file, 'r');
        const b = Buffer.alloc(1);
        fs.readSync(fd, b, 0, 1, size - 1);
        fs.closeSync(fd);
        if (b[0] !== 0x0a) prefixo = '\n';
      }
    }
    fs.appendFileSync(file, `${prefixo}${JSON.stringify(record)}\n`);
  }

  // Linhas corrompidas são ignoradas: um registro quebrado não pode derrubar as métricas.
  read(file) {
    if (!fs.existsSync(file)) return [];
    return fs.readFileSync(file, 'utf8').split('\n').filter(Boolean).flatMap((l) => {
      try { return [JSON.parse(l)]; } catch { return []; }
    });
  }

  logTurn({ sessionId, result }) {
    const turnoId = crypto.randomUUID();
    this.append(this.turnsFile, {
      turnoId,
      sessionId,
      ts: new Date().toISOString(),
      usuario: result.usuario.id,
      oportunidade: result.oportunidade?.id ?? null,
      pergunta: result.query,
      consulta: result.entendimento?.consulta ?? result.query,
      intencao: result.entendimento?.intencao ?? 'buscar',
      skill: result.entendimento?.skill ?? result.entendimento?.intencao ?? 'buscar',
      confianca: result.entendimento?.confianca ?? null,
      tipoResposta: result.tipoResposta ?? 'semelhantes',
      ferramentas: result.ferramentas ?? undefined,
      continuacao: result.entendimento?.continuacao ?? false,
      ia: result.ia?.fallback ? 'mock (fallback)' : result.ia?.provedor ?? 'mock',
      entidades: result.entidades,
      semEvidencia: result.semEvidencia,
      resultados: result.resultados.map((r) => ({ projeto_id: r.projeto_id, score: r.score, fontes: r.fontes.map((f) => f.doc_id) })),
      tempoMs: result.tempoMs,
    });
    return turnoId;
  }

  // tipo: 'feedback' (util: true|false), 'abrir_detalhe' ou 'abrir_fonte'.
  logEvent(event) {
    this.append(this.eventsFile, { ts: new Date().toISOString(), ...event });
  }

  metrics() {
    const turns = this.read(this.turnsFile);
    const events = this.read(this.eventsFile);
    const feedback = events.filter((e) => e.tipo === 'feedback');
    const turnById = new Map(turns.map((t) => [t.turnoId, t]));

    // Avaliação dos 3 primeiros resultados (métrica de NB-01).
    const top3 = feedback.filter((f) => {
      const t = turnById.get(f.turnoId);
      return t && t.resultados.slice(0, 3).some((r) => r.projeto_id === f.projeto_id);
    });

    // Tempo até a primeira referência marcada como útil, por sessão.
    const sessions = new Map();
    for (const t of turns) {
      const s = sessions.get(t.sessionId) ?? { inicio: t.ts, primeiroUtil: null };
      sessions.set(t.sessionId, s);
    }
    for (const f of feedback.filter((x) => x.util)) {
      const t = turnById.get(f.turnoId);
      const s = t && sessions.get(t.sessionId);
      if (s && !s.primeiroUtil) s.primeiroUtil = f.ts;
    }
    const tempos = [...sessions.values()].filter((s) => s.primeiroUtil).map((s) => (new Date(s.primeiroUtil) - new Date(s.inicio)) / 1000);

    const pct = (n, d) => (d ? Math.round((n / d) * 1000) / 10 : null);
    return {
      buscas: turns.length,
      sessoes: sessions.size,
      buscasSemResultado: turns.filter((t) => t.semEvidencia).length,
      percentualSemResultado: pct(turns.filter((t) => t.semEvidencia).length, turns.length),
      feedbacks: feedback.length,
      percentualUtil: pct(feedback.filter((f) => f.util).length, feedback.length),
      percentualUtilTop3: pct(top3.filter((f) => f.util).length, top3.length),
      aberturasDeFonte: events.filter((e) => e.tipo === 'abrir_fonte').length,
      aberturasDeDetalhe: events.filter((e) => e.tipo === 'abrir_detalhe').length,
      tempoMedioAtePrimeiraReferenciaUtilSeg: tempos.length ? Math.round(tempos.reduce((a, b) => a + b, 0) / tempos.length) : null,
      tempoMedioRespostaMs: turns.length ? Math.round(turns.reduce((a, t) => a + t.tempoMs, 0) / turns.length) : null,
      reaproveitamentos: events.filter((e) => e.tipo === 'reaproveitar').length,
      motivosNaoUtil: count(events.filter((e) => e.tipo === 'feedback_motivo').map((e) => e.motivo)),
      // Adendo 6: perguntas por skill do chat e quantas ficaram sem resposta (turnos antigos usam a intenção).
      porSkill: count(turns.map((t) => t.skill ?? t.intencao ?? 'buscar')).map((x) => ({
        skill: x.valor, n: x.n, semResposta: turns.filter((t) => (t.skill ?? t.intencao ?? 'buscar') === x.valor && t.semEvidencia).length,
      })),
    };
  }
}
