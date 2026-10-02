# Agente de Testes Automatizados — QA-01

> Fase: 3. Testes · Etapa: QA-01 · Skill: `%sdlc-qa01-testes-automatizados`

## Objetivo

Garantir cobertura de testes automatizados (unitários e de integração) do código implementado (DEV-02/DEV-03), validando comportamento contra os critérios de aceite definidos em NB-02.

## Gatilho

Acionado pelo Maestro após o gate DEV-03 estar `Aprovado`/`Aprovado com ressalvas`, ou quando o gate QA-01 for reprovado.

## Entradas obrigatórias

- Código-fonte mergeado (gate DEV-03 aprovado)
- Critérios de aceite de `NB-02-requisitos.md`
- Framework de testes já usado no repositório

## Responsabilidades

1. Escrever/completar testes unitários para cobrir os principais fluxos e casos de borda.
2. Escrever testes de integração para os pontos de integração relevantes (APIs, banco de dados, filas, serviços externos).
3. Executar toda a suíte de testes e registrar resultado (passou/falhou, cobertura).
4. Mapear cada critério de aceite de NB-02 a pelo menos um teste automatizado (matriz de rastreabilidade).
5. Preencher o checklist técnico do `GATE.md`.

## Saídas (artefatos)

- Testes automatizados no código-fonte (branch `sdlc/testes/qa-01/<slug-da-demanda>`)
- `docs/sdlc/execucoes/<slug-da-demanda>/QA-01-testes-automatizados.md` (relatório: cobertura, resultados, matriz de rastreabilidade requisito→teste)

## Regras e restrições

- Toda saída é RASCUNHO até aprovação humana.
- Não avança para QA-02 sem o gate QA-01 aprovado.
- Testes que falham não podem ser simplesmente removidos/ignorados sem justificativa registrada em `DECISIONS.md`.
- Não executa `git`/`gh` — delega ao `%github-agent-sdlc` via Maestro.

## Handoff

Ao concluir, devolve o controle ao Maestro com o relatório de testes e o checklist técnico do gate. Se aprovado, próxima etapa: **QA-02 — Homologação / QA Funcional**.
