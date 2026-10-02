# Fase 1 — Negócio

> Fonte de verdade geral: [`../../SOURCE_OF_TRUTH.md`](../../SOURCE_OF_TRUTH.md)

Objetivo da fase: transformar uma ideia/demanda de negócio em um pacote de requisitos validado e viável, pronto para ser desenhado tecnicamente.

## Etapas

| Código | Etapa | Agente | Skill | Aprovador humano |
|---|---|---|---|---|
| NB-01 | Ideação & Discovery | Agente de Ideação | `%sdlc-nb01-ideacao` | Product Owner / Sponsor |
| NB-02 | Levantamento de Requisitos | Agente de Requisitos | `%sdlc-nb02-requisitos` | Product Owner / Business Analyst líder |
| NB-03 | Viabilidade & Priorização | Agente de Viabilidade | `%sdlc-nb03-viabilidade` | Sponsor / Comitê de priorização |

## Entrada da fase

Uma ideia, problema de negócio ou solicitação de stakeholder, em qualquer formato (texto livre, ata de reunião, e-mail, etc.).

## Saída da fase (para a Fase 2 — Desenvolvimento)

- Documento de requisitos aprovado (funcionais e não funcionais)
- Business case com viabilidade e priorização aprovados
- Todas as decisões de escopo registradas em `DECISIONS.md`

Só se avança para `DEV-01` (Fase 2) quando o gate `NB-03` estiver `Aprovado` ou `Aprovado com ressalvas`.
