// Sinais do setor (CR-079, adendo 7 ponto 5): notícias e tendências de fontes curadas, junto dos Insights.
// R5P1: só leitura pública, sem dado do usuário nem da base, com User-Agent genérico.
// R5P2: só as fontes da lista curada (DATA_DIR/sinais-fontes.json), cada uma com dono e motivo.
// R5P3: guarda título, fonte, data, link e um trecho curto marcado como "resumo automático" — nunca o texto integral.
// R5P4: coleta uma vez por dia, de madrugada, com limite de itens por fonte. Itens com mais de 90 dias somem.
// Uma fonte que falha não derruba as outras: a falha fica registrada para a página de status.

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { normalize } from './text.js';

export const DIAS_VALIDADE = 90;
export const MAX_POR_FONTE = 20;
const TIMEOUT_MS = 15_000;
const USER_AGENT = 'RadarSinais/0.1 (+leitor de RSS)';
const RESUMO_MAX = 280;

const TIPOS = [
  ['regulacao', 'Regulação', /\b(regula\w*|resolucao|norma|lei|lgpd|susep|aneel|anatel|bacen|banco central|cvm|ans)\b/],
  ['evento', 'Evento', /\b(evento|congresso|feira|summit|conferencia|webinar|forum)\b/],
  ['cliente', 'Movimento de cliente', /\b(aquisicao|adquire|fusao|investe|investimento|expansao|contrata|anuncia|lanca)\b/],
  ['tendencia', 'Tendência', /./],
];

const texto = (s) => String(s ?? '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ').trim();
const tag = (xml, nome) => texto(xml.match(new RegExp(`<${nome}[^>]*>([\\s\\S]*?)</${nome}>`, 'i'))?.[1]);
const curto = (s) => (s.length <= RESUMO_MAX ? s : `${s.slice(0, RESUMO_MAX - 1).replace(/\s+\S*$/, '')}…`);

// Itens de um feed RSS 2.0 ou Atom.
export function lerFeed(xml) {
  const itens = [];
  for (const m of String(xml).matchAll(/<(item|entry)\b[\s\S]*?<\/\1>/gi)) {
    const bloco = m[0];
    const link = tag(bloco, 'link') || bloco.match(/<link[^>]*href="([^"]+)"/i)?.[1] || '';
    const titulo = tag(bloco, 'title');
    if (!titulo || !/^https?:\/\//i.test(link)) continue;
    const data = tag(bloco, 'pubDate') || tag(bloco, 'published') || tag(bloco, 'updated') || tag(bloco, 'dc:date');
    const quando = data && !Number.isNaN(Date.parse(data)) ? new Date(data).toISOString() : null;
    itens.push({ titulo: titulo.slice(0, 220), link, data: quando, resumo: curto(tag(bloco, 'description') || tag(bloco, 'summary') || '') });
  }
  return itens;
}

// Setor, tecnologias e tipo, pelo vocabulário da base (o mesmo dos Insights).
export function classificar(item, vocab) {
  const n = normalize(`${item.titulo} ${item.resumo}`);
  const tem = (nome) => normalize(nome).split(/[\s/]+/).filter((w) => w.length > 3).some((w) => new RegExp(`\\b${w}`).test(n));
  const setores = vocab.segmentos.filter(tem);
  const tecnologias = vocab.tecnologias.filter((t) => new RegExp(`\\b${normalize(t).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(n));
  const [tipo, tipoRotulo] = TIPOS.find(([, , re]) => re.test(n));
  return { setores, tecnologias, tipo, tipoRotulo };
}

export class SinaisStore {
  constructor(dir) {
    this.arquivo = path.join(dir, 'sinais.json');
    this.fontesArquivo = path.join(dir, 'sinais-fontes.json');
    this.data = fs.existsSync(this.arquivo) ? JSON.parse(fs.readFileSync(this.arquivo, 'utf8')) : { itens: [], falhas: [], ultimaColeta: null };
  }

  fontes() {
    try { return JSON.parse(fs.readFileSync(this.fontesArquivo, 'utf8')).filter((f) => f.ativa !== false && /^https?:\/\//.test(f.url ?? '')); } catch { return []; }
  }

  salvar() {
    const tmp = `${this.arquivo}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(this.data));
    fs.renameSync(tmp, this.arquivo);
  }

  expirar(hoje = new Date()) {
    const limite = hoje.getTime() - DIAS_VALIDADE * 864e5;
    this.data.itens = this.data.itens.filter((i) => Date.parse(i.data ?? i.coletadoEm) >= limite);
  }

  // Coleta todas as fontes; cada falha é registrada e não interrompe as demais (UC-P5.3).
  async coletar(vocab, { fetchFn = fetch, hoje = new Date() } = {}) {
    const fontes = this.fontes();
    const vistos = new Set(this.data.itens.map((i) => i.id));
    const falhas = [];
    let novos = 0;
    for (const f of fontes) {
      try {
        const ctl = new AbortController();
        const t = setTimeout(() => ctl.abort(), TIMEOUT_MS);
        const r = await fetchFn(f.url, { headers: { 'User-Agent': USER_AGENT, Accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml' }, signal: ctl.signal });
        clearTimeout(t);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const itens = lerFeed(await r.text()).slice(0, MAX_POR_FONTE);
        for (const i of itens) {
          const id = crypto.createHash('sha1').update(i.link).digest('hex').slice(0, 16);
          if (vistos.has(id)) continue;
          vistos.add(id);
          this.data.itens.push({ id, ...i, fonte: f.nome, fonteId: f.id, setorFonte: f.setor ?? null, coletadoEm: hoje.toISOString(), ...classificar(i, vocab) });
          novos += 1;
        }
      } catch (err) {
        falhas.push({ fonte: f.nome, erro: err.name === 'AbortError' ? 'tempo esgotado' : String(err.message).slice(0, 120), em: hoje.toISOString() });
      }
    }
    this.expirar(hoje);
    this.data.falhas = falhas;
    this.data.ultimaColeta = hoje.toISOString();
    this.data.fontes = fontes.length;
    this.salvar();
    return { fontes: fontes.length, novos, falhas, total: this.data.itens.length };
  }

  // Relevância para nós (adendo 7, 7.2.3): cliente atendido = alta; tecnologia já entregue no setor = média; só o setor = baixa.
  // projetos: os que o usuário pode ver. segmento: filtro de setor dos Insights.
  relevantes(projetos, { segmento = null, limite = 5 } = {}) {
    const clientes = [...new Set(projetos.map((p) => p.cliente))];
    const entregues = projetos.filter((p) => ['Vendida', 'Em execução', 'Entregue'].includes(p.status_proposta));
    const avaliar = (i) => {
      const n = normalize(`${i.titulo} ${i.resumo}`);
      const cliente = clientes.find((c) => n.includes(normalize(c)));
      if (cliente) {
        const ps = projetos.filter((p) => p.cliente === cliente);
        return { nivel: 'alta', nota: 3, porque: `cliente da carteira: ${ps.length} projeto(s) com ${cliente}`, contato: ps.find((p) => p.dono)?.dono ?? null, projetos: ps.map((p) => p.id) };
      }
      const tecs = i.tecnologias.filter((t) => entregues.some((p) => p.tecnologias.includes(t) && (!i.setores.length || i.setores.includes(p.segmento))));
      if (tecs.length) {
        const ps = entregues.filter((p) => p.tecnologias.some((t) => tecs.includes(t)) && (!i.setores.length || i.setores.includes(p.segmento)));
        return { nivel: 'media', nota: 2, porque: `já entregamos ${tecs.join(', ')}${i.setores.length ? ` em ${i.setores.join(', ')}` : ''} (${ps.length} projeto(s))`, projetos: ps.map((p) => p.id) };
      }
      return { nivel: 'baixa', nota: 1, porque: i.setores.length ? `notícia do setor ${i.setores.join(', ')}` : 'notícia geral', projetos: [] };
    };
    return this.data.itens
      .filter((i) => !segmento || i.setores.includes(segmento) || i.setorFonte === segmento)
      .map((i) => ({ ...i, relevancia: avaliar(i) }))
      .sort((a, b) => b.relevancia.nota - a.relevancia.nota || String(b.data ?? '').localeCompare(String(a.data ?? '')))
      .slice(0, limite);
  }

  saude() {
    return { fontes: this.fontes().length, itens: this.data.itens.length, ultimaColeta: this.data.ultimaColeta, falhas: this.data.falhas ?? [] };
  }
}

// Agenda a coleta para a madrugada (3h, horário do servidor), uma vez por dia. Confere a cada hora.
export function agendarColeta(store, vocabFn, { hora = 3 } = {}) {
  const tick = async () => {
    const agora = new Date();
    const hoje = agora.toISOString().slice(0, 10);
    if (agora.getHours() !== hora || store.data.ultimaColeta?.slice(0, 10) === hoje || !store.fontes().length) return;
    try { await store.coletar(vocabFn()); } catch { /* a falha fica no próximo tick */ }
  };
  const t = setInterval(tick, 3600_000);
  t.unref?.();
  return t;
}
