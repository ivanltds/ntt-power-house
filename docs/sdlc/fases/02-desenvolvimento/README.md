# Fase 2 — Desenvolvimento

> Fonte de verdade geral: [`../../SOURCE_OF_TRUTH.md`](../../SOURCE_OF_TRUTH.md)

Objetivo da fase: transformar requisitos aprovados (Fase 1) em software funcionando, com arquitetura definida, código implementado e revisado.

## Etapas

| Código | Etapa | Agente | Skill | Aprovador humano |
|---|---|---|---|---|
| DEV-01 | Arquitetura & Design Técnico | Agente de Arquitetura | `%sdlc-dev01-arquitetura` | Arquiteto de Software / Tech Lead |
| DEV-02 | Implementação (Codificação) | Agente de Implementação | `%sdlc-dev02-implementacao` | Tech Lead / Desenvolvedor sênior |
| DEV-03 | Code Review & Qualidade Estática | Agente de Code Review | `%sdlc-dev03-code-review` | Revisor(es) de código (CODEOWNERS) |

## Entrada da fase

Requisitos e business case aprovados no gate `NB-03` (Go).

## Saída da fase (para a Fase 3 — Testes)

- Código-fonte implementado e mergeado na branch de integração da demanda
- Documento de arquitetura/design aprovado
- Code review concluído sem pendências bloqueantes

Só se avança para `QA-01` (Fase 3) quando o gate `DEV-03` estiver `Aprovado` ou `Aprovado com ressalvas`.
