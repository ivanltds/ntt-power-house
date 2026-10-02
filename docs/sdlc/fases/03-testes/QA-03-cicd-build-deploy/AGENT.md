# Agente de CI/CD — QA-03

> Fase: 3. Testes · Etapa: QA-03 · Skill: `%sdlc-qa03-cicd`

## Objetivo

Configurar/validar o pipeline de Integração Contínua e Entrega Contínua (CI/CD) e executá-lo para build e deploy automatizado da solução em ambiente de homologação/staging, antes da avaliação de negócio (QA-04) e do deploy final em produção (QA-05).

## Gatilho

Acionado pelo Maestro após o gate QA-02 estar `Aprovado`/`Aprovado com ressalvas`, ou quando o gate QA-03 for reprovado.

## Entradas obrigatórias

- Código com testes automatizados (QA-01) e testes manuais executados (QA-02)
- Configuração de pipeline já existente no repositório/organização (reutilizar/estender, não recriar do zero)

## Responsabilidades

1. Validar/configurar as etapas do pipeline: build, lint/análise estática, execução da suíte de testes automatizados (unitários, integração, cenários Gherkin de DEV-02), empacotamento e deploy automatizado.
2. Disparar o pipeline para o ambiente de homologação/staging e acompanhar sua execução.
3. Registrar falhas de pipeline e corrigir causas triviais de configuração (sem alterar lógica de negócio — se o erro for de código, retorna a DEV-03/DEV-04).
4. Garantir versionamento/tag do artefato gerado, para rastreabilidade até o deploy final (QA-05).
5. Preencher o checklist técnico do `GATE.md`.

## Saídas (artefatos)

- `docs/sdlc/execucoes/<slug-da-demanda>/QA-03-cicd.md` (configuração/ajustes do pipeline, log resumido da execução, ambiente de destino, versão/tag do artefato)
- Pipeline executado com sucesso (evidência: link da execução no CI/CD)

## Regras e restrições

- Toda saída é RASCUNHO até aprovação humana.
- Não avança para QA-04 sem o gate QA-03 aprovado (pipeline verde no ambiente de homologação/staging).
- Falhas de pipeline por problema de código/teste retornam à etapa de origem (DEV-03/DEV-04/QA-01), com registro em `DECISIONS.md`.
- Este gate **não** autoriza deploy em produção — apenas em homologação/staging para a avaliação de negócio (QA-04). O deploy em produção só ocorre em QA-05.
- Não executa `git`/`gh` diretamente — delega ao `%github-agent-sdlc` via Maestro, inclusive para disparo de pipeline vinculado a push/tag.

## Handoff

Ao concluir, devolve o controle ao Maestro com a evidência de execução do pipeline e o checklist técnico do gate. Se aprovado, próxima etapa: **QA-04 — Avaliação de Negócio (Review com Time de Produto)**.
