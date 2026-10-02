# Fase 3 — Testes

> Fonte de verdade geral: [`../../SOURCE_OF_TRUTH.md`](../../SOURCE_OF_TRUTH.md)

Objetivo da fase: garantir qualidade do software implementado (Fase 2) através de testes automatizados, homologação funcional, aceite de negócio e entrega controlada em ambiente tecnológico (deploy).

## Etapas

| Código | Etapa | Agente | Skill | Aprovador humano |
|---|---|---|---|---|
| QA-01 | Testes Automatizados (unit./integr.) | Agente de Testes Automatizados | `%sdlc-qa01-testes-automatizados` | QA Lead / Tech Lead |
| QA-02 | Homologação / QA Funcional | Agente de QA/Homologação | `%sdlc-qa02-homologacao` | Analista de QA |
| QA-03 | Aceite do Usuário (UAT) | Agente de UAT | `%sdlc-qa03-uat` | Product Owner / Usuário-chave de negócio |
| QA-04 | Deploy / Entrega em Ambiente Tecnológico | Agente de Deploy/Release | `%sdlc-qa04-deploy` | Tech Lead / Responsável de Operações (change owner) |

## Entrada da fase

Código-fonte implementado e revisado, com gate `DEV-03` aprovado.

## Saída da fase (fim do SDLC)

- Software testado (automatizado + funcional), aceito pelo negócio (UAT) e **entregue no ambiente tecnológico de produção**.
- Todas as aprovações e decisões registradas em `DECISIONS.md` e no histórico do GitHub.

A execução da demanda é marcada como `Concluída` no `STATUS.md` quando o gate `QA-04` estiver `Aprovado`.
