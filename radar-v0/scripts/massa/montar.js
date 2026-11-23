// Massa de testes V0.0.3: monta os documentos (Markdown com frontmatter) em data/corpus/massa a partir do
// planejamento (fatos) e dos textos escritos pela IA. Mesmas seções da base piloto, para a busca, a ficha e a one page.
// Uso: node scripts/massa/montar.js

import fs from 'node:fs';
import path from 'node:path';
import { MASSA_DIR, ROTULO_MOTIVO } from './planejar.js';

const ROOT = path.resolve(MASSA_DIR, '..', '..');
const DESTINO = path.join(ROOT, 'data', 'corpus', 'massa');
const GANHO = ['Vendida', 'Em execução', 'Entregue'];

const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const pct = (v) => `${Math.round(v * 100)}%`;
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const lista = (itens) => itens.map((i) => `- ${i}`).join('\n');
const texto = (x) => (typeof x === 'string' ? x : x == null ? '' : Object.values(x).filter((v) => typeof v === 'string' || typeof v === 'number').join(' '));
// A IA às vezes devolve fases como objetos ({ fase, semanas }); vira "Nome (N semanas)".
const fase = (f) => {
  if (typeof f === 'string') return f;
  const nome = f.fase ?? f.nome ?? f.titulo ?? Object.values(f).find((v) => typeof v === 'string') ?? 'Fase';
  const sem = f.semanas ?? f.duracao_semanas ?? f.duracao;
  return sem ? `${nome} (${String(sem).replace(/\s*semanas?$/i, '')} semanas)` : nome;
};
const somaDias = (iso, dias) => new Date(Date.parse(iso) + dias * 864e5).toISOString().slice(0, 10);

function frontmatter(meta) {
  return `---\n${Object.entries(meta).filter(([, v]) => v != null).map(([k, v]) => `${k}: ${Array.isArray(v) ? JSON.stringify(v) : v}`).join('\n')}\n---\n\n`;
}
const base = (p, t, extra) => ({
  projeto_id: p.id, cliente: p.cliente, titulo: t.titulo, segmento: p.setor, tecnologias: p.tecnologias, servicos: p.servicos, area: p.area,
  dono: p.dono, confidencialidade: p.confidencialidade, status_proposta: p.status, link_sharepoint: `https://sharepoint.exemplo/sites/propostas/${p.id}`, ...extra,
});

function proposta(p, t, { v1 = false } = {}) {
  // Versão anterior (caso difícil): prazo e valor diferentes da versão final, confiança menor.
  const prazo = v1 ? p.prazo + 2 : p.prazo;
  const valor = v1 ? Math.round((p.valor * 0.82) / 10_000) * 10_000 : p.valor;
  const data = v1 ? somaDias(p.data, -21) : p.data;
  const meta = base(p, t, {
    id: `${p.id}-PROP${v1 ? 'V1' : ''}`, tipo_documental: 'proposta_comercial',
    status_documento: v1 ? 'rascunho' : GANHO.includes(p.status) ? 'final_aprovada' : p.status === 'Em elaboração' ? 'preliminar' : 'final_enviada',
    data, prazo_meses: prazo, valor, margem: p.margem,
  });
  const fases = (t.fases ?? []).map(fase);
  return frontmatter(meta) + `# Proposta Comercial — ${t.titulo}${v1 ? ' (versão 1, rascunho)' : ''}

**Cliente:** ${p.cliente}
**Segmento:** ${p.setor}
**Área responsável:** ${p.area} · **Dono da proposta:** ${p.dono}
**Data:** ${data} · **Versão:** ${v1 ? '1 (rascunho)' : 'final'}

## 1. Contexto e desafio

${t.problema}
${p.incompleto && !v1 ? '' : `
## 2. Objetivo

${t.objetivo}
`}
## 3. Escopo da solução

${lista(t.escopo)}

Tecnologias principais: ${p.tecnologias.join(', ')}.

## 4. Abordagem e cronograma

O projeto será executado em ${prazo} meses, nas seguintes fases:

${lista(fases)}

## 5. Entregáveis

${lista(t.entregaveis)}

## 6. Equipe proposta

${texto(t.equipe)}.

## 7. Premissas e riscos

${lista(t.riscos.map((r) => `Risco: ${texto(r)}`))}

## 8. Investimento

Investimento total: ${brl(valor)}, em parcelas mensais ao longo de ${prazo} meses.

Margem praticada: ${pct(p.margem)}.
`;
}

function financeiro(p, t) {
  // Documento financeiro (toda oportunidade tem um no Maná): estimativa em formato GECO, valor sem contingência.
  const valor = Math.round((p.valor * 0.88) / 10_000) * 10_000;
  const meta = base(p, t, { id: `${p.id}-FIN`, tipo_documental: 'estimativa_preliminar', status_documento: 'preliminar', data: somaDias(p.data, -10), prazo_meses: p.prazoEstimativa, valor });
  return frontmatter(meta) + `# Estimativa financeira (GECO) — ${p.cliente}

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: ${t.escopo.slice(0, 2).map(texto).join('; ')}.
- Tecnologias assumidas: ${p.tecnologias.join(', ')}.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: ${p.prazoEstimativa} meses.

Equipe estimada: ${texto(t.equipe)}.

## Valor de referência

Valor preliminar: ${brl(valor)} (sem contingência).

## Pontos em aberto

${lista(t.riscos.map(texto))}
`;
}

function apresentacao(p, t) {
  const meta = base(p, t, { id: `${p.id}-APRES`, tipo_documental: 'apresentacao_comercial', status_documento: 'final', data: somaDias(p.data, 3), prazo_meses: p.prazo });
  return frontmatter(meta) + `# Apresentação Comercial — ${p.cliente}

## Slide 1 — ${t.titulo}

${p.cliente} · ${p.setor}

## Slide 2 — O desafio

${t.problema}

## Slide 3 — Nossa proposta

${t.objetivo}

## Slide 4 — Arquitetura e tecnologias

${p.tecnologias.join(' · ')}

${lista(t.escopo.slice(0, 3).map(texto))}

## Slide 5 — Como vamos trabalhar

${lista((t.fases ?? []).map(fase))}

Duração total: ${p.prazo} meses.

## Slide 6 — Por que nós

Experiência em ${p.servicos.join(', ')}${p.continuidade ? `, com projeto anterior entregue para a ${p.cliente}` : ''}. Equipe: ${texto(t.equipe)}.

## Slide 7 — Próximos passos

Validar escopo com ${texto(t.pessoas?.cliente) || 'o patrocinador do cliente'} e agendar o kickoff.
`;
}

function transcricao(p, t) {
  const kickoff = GANHO.includes(p.status);
  const c = texto(t.pessoas?.cliente).split(' (')[0] || 'Cliente';
  const tec = texto(t.pessoas?.tecnico).split(' (')[0] || 'Arquiteto';
  const meta = base(p, t, { id: `${p.id}-TRANS`, tipo_documental: 'transcricao_reuniao', status_documento: 'bruta', data: somaDias(p.data, kickoff ? 30 : -14) });
  const contato = p.pii ? ` Meu e-mail é ${slug(c).replace(/-/g, '.')}@cliente-exemplo.com.br e o celular (11) 98765-${String(1000 + (Number(p.id.slice(1)) % 9000)).padStart(4, '0')}.` : '';
  const falas = kickoff
    ? [[p.dono, `Bom dia. Este é o kickoff de ${t.titulo}. Vamos alinhar objetivo, fases e riscos.`], [c, `O ponto principal para nós: ${t.problema}${contato}`], [p.dono, `O objetivo combinado foi: ${t.objetivo}`],
      [tec, `Do lado técnico vamos usar ${p.tecnologias.join(', ')}. O primeiro passo é ${texto(t.escopo[0]).toLowerCase()}.`], [c, 'Quais riscos vocês já enxergam?'], [tec, `Os principais são ${t.riscos.map(texto).join('; ').toLowerCase()}.`],
      [p.dono, 'Fechado. Mando a ata com os próximos passos ainda hoje.']]
    : [[p.dono, 'Obrigado pelo tempo. Queremos entender o cenário antes de fechar a proposta.'], [c, `Hoje o problema é este: ${t.problema}${contato}`], [tec, `Já fizemos coisa parecida em ${p.setor}. A ideia seria: ${t.objetivo}`],
      [c, 'E quanto tempo vocês imaginam?'], [p.dono, `Algo em torno de ${p.prazo} meses, dependendo do escopo final.`], [c, `Uma preocupação nossa é ${texto(t.riscos[0]).toLowerCase()}.`], [tec, 'Entendido, vamos tratar isso como premissa.']];
  let s = 5;
  const corpo = falas.map(([quem, fala]) => { const st = `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; s += 35 + (fala.length % 60); return `[${st}] ${quem}: ${fala}`; }).join('\n\n');
  return frontmatter(meta) + `# Transcrição — ${kickoff ? 'Kickoff' : 'Reunião comercial'} ${p.cliente}\n\nTranscrição automática, sem revisão.\n\n${corpo}\n`;
}

function sow(p, t) {
  const meta = base(p, t, { id: `${p.id}-SOW`, tipo_documental: 'sow', status_documento: 'assinado', data: somaDias(p.data, 25), prazo_meses: p.prazo, valor: p.valor });
  return frontmatter(meta) + `# SOW — ${t.titulo}

**Contratante:** ${p.cliente} · **Contratada:** NTT DATA Brasil · **Vigência:** ${p.prazo} meses a partir do kickoff

## 1. Objeto

${t.objetivo}

## 2. Escopo contratado

${lista(t.escopo.map(texto))}

## 3. Entregáveis e aceite

${lista(t.entregaveis.map(texto))}

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: ${brl(p.valor)}, faturado mensalmente conforme o cronograma.
`;
}

function caseSucesso(p, t) {
  const meta = base(p, t, { id: `${p.id}-CASE`, tipo_documental: 'case_sucesso', status_documento: 'aprovado', data: somaDias(p.data, 30 * p.prazo + 20), prazo_meses: p.prazo });
  return frontmatter(meta) + `# Case de Sucesso — ${p.cliente}

## Desafio

${t.problema}

## Solução

${t.objetivo} A solução usou ${p.tecnologias.join(', ')} e foi entregue em ${p.prazo} meses.

## Resultados

${t.resultados}

## Lições aprendidas

${t.licoes}
`;
}

function licoes(p, t) {
  const meta = base(p, t, { id: `${p.id}-LICOES`, tipo_documental: 'ata_validada', status_documento: 'validada', data: somaDias(p.data, 30 * p.prazo + 10) });
  return frontmatter(meta) + `# Ata de Lições Aprendidas — ${p.cliente}

## Resultado

${t.resultados}

## Lições aprendidas

${t.licoes}
`;
}

function analisePerda(p, t) {
  const meta = base(p, t, { id: `${p.id}-PERDA`, tipo_documental: 'ata_validada', status_documento: 'validada', data: somaDias(p.data, 45) });
  return frontmatter(meta) + `# Ata de Análise de Perda — ${p.cliente}

## Resultado

${t.resultados}

Motivo principal registrado: ${ROTULO_MOTIVO[p.motivoPerda]}.

## Lições aprendidas

${t.licoes}
`;
}

function emailRetorno(p, t) {
  const meta = base(p, t, { id: `${p.id}-EMAIL`, tipo_documental: 'email', status_documento: 'recebido', data: somaDias(p.data, 40) });
  return frontmatter(meta) + `# E-mail — Retorno do cliente sobre a proposta

**De:** ${texto(t.pessoas?.cliente) || p.cliente} · **Para:** ${p.dono}
**Assunto:** Decisão sobre a proposta ${t.titulo}

${texto(t.retorno) || t.resultados}
`;
}

const MODELOS = { proposta, financeiro, apresentacao, transcricao, sow, case: caseSucesso, licoes, analise_perda: analisePerda, email_retorno: emailRetorno, proposta_v1: (p, t) => proposta(p, t, { v1: true }) };
const ARQUIVO = { proposta: 'proposta-comercial', financeiro: 'estimativa-financeira-geco', apresentacao: 'apresentacao-comercial', transcricao: 'transcricao-reuniao', sow: 'sow-assinado', case: 'case-de-sucesso', licoes: 'ata-licoes-aprendidas', analise_perda: 'ata-analise-de-perda', email_retorno: 'email-retorno-cliente', proposta_v1: 'proposta-comercial-v1' };

const plano = JSON.parse(fs.readFileSync(path.join(MASSA_DIR, 'planejamento.json'), 'utf8'));
fs.rmSync(DESTINO, { recursive: true, force: true });
let projetos = 0, docs = 0;
const faltando = [];
for (const p of plano.projetos) {
  const arq = path.join(MASSA_DIR, 'textos', `${p.id}.json`);
  if (!fs.existsSync(arq)) { faltando.push(p.id); continue; }
  const t = JSON.parse(fs.readFileSync(arq, 'utf8'));
  // Textos obrigatórios para o modelo do documento; sem eles o documento é pulado (nunca inventado aqui).
  const precisa = { case: ['resultados', 'licoes'], licoes: ['resultados', 'licoes'], analise_perda: ['resultados', 'licoes'] };
  const dir = path.join(DESTINO, `${p.id}-${slug(p.cliente)}`);
  fs.mkdirSync(dir, { recursive: true });
  for (const d of p.docs) {
    if ((precisa[d] ?? []).some((k) => !t[k])) continue;
    fs.writeFileSync(path.join(dir, `${ARQUIVO[d]}.md`), MODELOS[d](p, t));
    docs += 1;
  }
  projetos += 1;
}
console.log(`Massa montada: ${projetos} projetos, ${docs} documentos em ${path.relative(ROOT, DESTINO)}${faltando.length ? ` · sem texto ainda: ${faltando.length}` : ''}`);
