// Gera a base piloto FICTÍCIA em data/corpus a partir de scripts/projects-data.js.
// Cada projeto vira de 3 a 5 documentos: proposta, apresentação, estimativa preliminar,
// transcrição de reunião e (se entregue) case de sucesso.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PROJECTS, OPPORTUNITIES, USERS } from './projects-data.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CORPUS = path.join(ROOT, 'data', 'corpus');

const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const pct = (v) => `${Math.round(v * 100)}%`;
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const bullets = (items) => items.map((i) => `- ${i}`).join('\n');
const SOLD = ['Vendida', 'Em execução', 'Entregue'];

function frontmatter(meta) {
  const lines = Object.entries(meta).map(([k, v]) => `${k}: ${Array.isArray(v) ? JSON.stringify(v) : v}`);
  return `---\n${lines.join('\n')}\n---\n\n`;
}

function baseMeta(p, extra) {
  return {
    projeto_id: p.id,
    cliente: p.cliente,
    titulo: p.titulo,
    segmento: p.segmento,
    tecnologias: p.tecnologias,
    servicos: p.servicos,
    area: p.area,
    dono: p.dono,
    confidencialidade: p.confidencialidade,
    status_proposta: p.status,
    link_sharepoint: `https://sharepoint.exemplo/sites/propostas/${p.id}`,
    ...extra,
  };
}

function proposta(p) {
  const meta = baseMeta(p, {
    id: `${p.id}-PROP`,
    tipo_documental: 'proposta_comercial',
    status_documento: SOLD.includes(p.status) ? 'final_aprovada' : 'final_enviada',
    data: p.data,
    prazo_meses: p.prazoMeses,
    valor: p.valor,
    margem: p.margem,
  });
  return frontmatter(meta) + `# Proposta Comercial — ${p.titulo}

**Cliente:** ${p.cliente}
**Segmento:** ${p.segmento}
**Área responsável:** ${p.area} · **Dono da proposta:** ${p.dono}
**Data:** ${p.data} · **Versão:** final

## 1. Contexto e desafio

${p.problema}

## 2. Objetivo

${p.objetivo}

## 3. Escopo da solução

${bullets(p.escopo)}

Tecnologias principais: ${p.tecnologias.join(', ')}.

## 4. Abordagem e cronograma

O projeto será executado em ${p.prazoMeses} meses, nas seguintes fases:

${bullets(p.fases)}

## 5. Entregáveis

${bullets(p.entregaveis)}

## 6. Equipe proposta

${p.equipe}.

## 7. Premissas e riscos

${bullets(p.riscos.map((r) => `Risco: ${r}`))}

## 8. Investimento

Investimento total: ${brl(p.valor)}, em parcelas mensais ao longo de ${p.prazoMeses} meses.
Margem praticada: ${pct(p.margem)}.
`;
}

function apresentacao(p) {
  const meta = baseMeta(p, {
    id: `${p.id}-APRES`,
    tipo_documental: 'apresentacao_comercial',
    status_documento: 'final',
    data: p.data,
    prazo_meses: p.prazoMeses,
  });
  return frontmatter(meta) + `# Apresentação Comercial — ${p.cliente}

## Slide 1 — ${p.titulo}
${p.cliente} · ${p.segmento}

## Slide 2 — O desafio
${p.problema}

## Slide 3 — Nossa proposta
${p.objetivo}

## Slide 4 — Arquitetura e tecnologias
${p.tecnologias.join(' · ')}
${bullets(p.escopo.slice(0, 3))}

## Slide 5 — Como vamos trabalhar
${bullets(p.fases)}
Duração total: ${p.prazoMeses} meses.

## Slide 6 — Por que nós
Experiência em ${p.servicos.join(', ')} no segmento ${p.segmento}, com equipe de ${p.equipe}.

## Slide 7 — Próximos passos
Validar escopo com ${p.pessoas.cliente} e agendar o kickoff.
`;
}

function estimativa(p) {
  const valorPreliminar = Math.round((p.valor * 0.85) / 10000) * 10000;
  const meta = baseMeta(p, {
    id: `${p.id}-EST`,
    tipo_documental: 'estimativa_preliminar',
    status_documento: 'preliminar',
    data: p.data,
    prazo_meses: p.prazoEstimativa,
    valor: valorPreliminar,
  });
  return frontmatter(meta) + `# Estimativa Preliminar — ${p.cliente}

Documento de trabalho da pré-venda. Versão preliminar, antes da proposta final.

## Premissas

- Escopo considerado: ${p.escopo.slice(0, 2).join('; ')}.
- Tecnologias assumidas: ${p.tecnologias.join(', ')}.

## Esforço e prazo

Prazo estimado: ${p.prazoEstimativa} meses.
Equipe estimada: ${p.equipe}.

## Valor de referência

Valor preliminar: ${brl(valorPreliminar)} (sem contingência).

## Pontos em aberto

${bullets(p.riscos)}
`;
}

function transcricao(p) {
  const kickoff = SOLD.includes(p.status);
  const tipo = kickoff ? 'kickoff' : 'reuniao-comercial';
  const meta = baseMeta(p, {
    id: `${p.id}-TRANS`,
    tipo_documental: 'transcricao_reuniao',
    status_documento: 'bruta',
    data: p.data,
  });
  const c = p.pessoas.cliente.split(' (')[0];
  const g = p.pessoas.gp;
  const t = p.pessoas.tecnico.split(' (')[0];
  const lines = kickoff
    ? [
        [g, `Bom dia a todos. Esse é o kickoff do projeto ${p.titulo}. A ideia é alinhar objetivo, fases e riscos.`],
        [c, `Pra nós o ponto principal é o seguinte: ${p.problema}`],
        [g, `Perfeito. O objetivo que combinamos foi: ${p.objetivo}`],
        [t, `Do lado técnico, a gente vai usar ${p.tecnologias.join(', ')}. O primeiro passo é ${p.escopo[0].toLowerCase()}.`],
        [c, `E quais são os riscos que vocês já enxergam?`],
        [t, `Os principais são ${p.riscos.join(' e ').toLowerCase()}. Vamos acompanhar isso semanalmente.`],
        [g, `O cronograma tem as fases: ${p.fases.join('; ')}.`],
        [c, `Combinado. A gente precisa que a equipe de vocês fale com as áreas de negócio desde o começo.`],
        [g, `Fechado. Mando a ata com os próximos passos ainda hoje.`],
      ]
    : [
        [p.dono, `Obrigado pelo tempo. Queremos entender melhor o cenário antes de fechar a proposta.`],
        [c, `O nosso problema hoje é esse: ${p.problema}`],
        [t, `Faz sentido. Já fizemos coisa parecida no segmento ${p.segmento}. A ideia seria: ${p.objetivo}`],
        [c, `E quanto tempo vocês imaginam?`],
        [p.dono, `Algo em torno de ${p.prazoMeses} meses, dependendo do escopo final.`],
        [c, `Uma preocupação nossa é com ${p.riscos[0].toLowerCase()}.`],
        [t, `Entendido, vamos tratar isso como premissa na proposta.`],
      ];
  let seconds = 5;
  const body = lines
    .map(([who, text]) => {
      const stamp = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
      seconds += 40 + text.length % 50;
      return `[${stamp}] ${who}: ${text}`;
    })
    .join('\n\n');
  return {
    name: `transcricao-${tipo}.md`,
    content: frontmatter(meta) + `# Transcrição — ${kickoff ? 'Kickoff' : 'Reunião comercial'} ${p.cliente}\n\nTranscrição automática, sem revisão.\n\n${body}\n`,
  };
}

function caseSucesso(p) {
  const meta = baseMeta(p, {
    id: `${p.id}-CASE`,
    tipo_documental: 'case_sucesso',
    status_documento: 'aprovado',
    data: p.data,
    prazo_meses: p.prazoMeses,
  });
  return frontmatter(meta) + `# Case de Sucesso — ${p.cliente}

## Desafio

${p.problema}

## Solução

${p.objetivo} A solução usou ${p.tecnologias.join(', ')} e foi entregue em ${p.prazoMeses} meses.

## Resultados

${p.resultados}

## Lições aprendidas

${p.licoes}
`;
}

function licoesPerdida(p) {
  const meta = baseMeta(p, {
    id: `${p.id}-LICOES`,
    tipo_documental: 'ata_validada',
    status_documento: 'validada',
    data: p.data,
  });
  return frontmatter(meta) + `# Ata de Análise de Perda — ${p.cliente}

## Resultado

${p.resultados}

## Lições aprendidas

${p.licoes}
`;
}

fs.rmSync(CORPUS, { recursive: true, force: true });
let count = 0;
for (const p of PROJECTS) {
  const dir = path.join(CORPUS, `${p.id}-${slug(p.cliente)}`);
  fs.mkdirSync(dir, { recursive: true });
  const files = [
    { name: 'proposta-comercial.md', content: proposta(p) },
    { name: 'apresentacao-comercial.md', content: apresentacao(p) },
    { name: 'estimativa-preliminar.md', content: estimativa(p) },
    transcricao(p),
  ];
  if (p.status === 'Entregue') files.push({ name: 'case-de-sucesso.md', content: caseSucesso(p) });
  if (p.status === 'Perdida') files.push({ name: 'ata-analise-de-perda.md', content: licoesPerdida(p) });
  for (const f of files) {
    fs.writeFileSync(path.join(dir, f.name), f.content);
    count++;
  }
}
fs.writeFileSync(path.join(ROOT, 'data', 'oportunidades.json'), JSON.stringify(OPPORTUNITIES, null, 2));
fs.writeFileSync(path.join(ROOT, 'data', 'usuarios.json'), JSON.stringify(USERS, null, 2));
console.log(`Base piloto gerada: ${PROJECTS.length} projetos, ${count} documentos em ${path.relative(ROOT, CORPUS)}`);
