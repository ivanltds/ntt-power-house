# STATUS — radar-propostas-cases

> MVP de ingestão, organização e consulta de propostas e cases (busca semântica + chat com fontes rastreáveis) para times comerciais, pré-vendas e consultoria.

| Código | Etapa | Status | PR | Aprovador | Data |
|---|---|---|---|---|---|
| NB-01 | Ideação & Discovery | Aprovado | — | Ivan Lucio Teles de Souza (PO) | 2026-10-29 |
| NB-02 | Especificação de Requisitos | Aprovado | — | Ivan Lucio Teles de Souza (PO) | 2026-10-29 |
| NB-03 | Viabilidade & Priorização | Em aprovação (aguardando comitê do time) | — | | |
| NB-04 | UI/UX Design | Executada na POC (MVP 0) — formalização pendente | — | | |
| DEV-01 | Arquitetura & Design Técnico | Executada na POC (MVP 0) — formalização pendente | — | | |
| DEV-02 | Plano de Testes BDD | Executada na POC (MVP 0) — formalização pendente | — | | |
| DEV-03 | Implementação / TDD | Executada na POC (MVP 0) — formalização pendente | — | | |
| DEV-04 | Code Review & Qualidade | Executada na POC (MVP 0) — formalização pendente | — | | |
| QA-01 | Testes Automatizados | Executada na POC (MVP 0) — formalização pendente | — | | |
| QA-02 | Homologação Funcional | Executada na POC (MVP 0) — testes do time em andamento | — | | |
| QA-03 | CI/CD e Staging | Parcial na POC (ambiente de demonstração na AWS; falta pipeline de CI e artefato versionado) | — | | |
| QA-04 | UAT / Avaliação de Negócio | Pendente | | | |
| QA-05 | Deploy / Release em Produção | Pendente | | | |

Status geral da execução: **Em andamento — MVP 0 (POC) publicado para testes do time; NB-03 em aprovação**

> **Leitura da tabela:** a POC (MVP 0) foi construída antes do gate NB-03, como exceção registrada (DEC-0007, DEC-0008). Ela **ativou na prática** UI/UX, todas as etapas de desenvolvimento e parte das de teste, de forma compacta. "Executada na POC" significa que a etapa foi exercida e tem evidências no protótipo `radar-v0`, mas **ainda não tem gate formal** — a aprovação humana de cada gate continua pendente e não é preenchida pela IA. O fluxo é **iterativo** e a construção **incremental**: cada incremento percorre as etapas do SDLC, guiado por especificação (SDD).

## Notas

- Prioridade: alta (prioridade imediata no roadmap).
- Prazo-alvo do MVP (recorte final): 4–6 semanas.
- Equipe: reduzida, já alocada; sem orçamento externo adicional.
- Product Owner / aprovador dos gates de negócio: Ivan Lucio Teles de Souza (DEC-0004).
- Tabela alinhada ao fluxo de 13 etapas (NB-01–NB-04, DEV-01–DEV-04, QA-01–QA-05) definido no `README.md` e nas pastas de `docs/sdlc/fases/`.
- **Exceção de processo (DEC-0002):** NB-02 foi produzida antes da aprovação formal de NB-01 e as duas foram avaliadas em conjunto; ambas aprovadas em 2026-10-29 (DEC-0005, DEC-0006). As duas etapas foram entregues na branch `sdlc/negocio/nb-01/radar-propostas-cases`.
- Artefato NB-01: [`NB-01-discovery.md`](./NB-01-discovery.md) · Gate: [`GATE-NB-01.md`](./GATE-NB-01.md).
- Artefato NB-02: [`NB-02-especificacao-requisitos.md`](./NB-02-especificacao-requisitos.md) + detalhamento [`NB-02-feature-busca-conversacional.md`](./NB-02-feature-busca-conversacional.md) (UC03) + diagramas [`NB-02-fluxos-busca-conversacional.md`](./NB-02-fluxos-busca-conversacional.md) · Gate: [`GATE-NB-02.md`](./GATE-NB-02.md).
- UC03 foi tratado como feature própria (15 sub-casos de uso) por ser a principal entrega de valor do MVP e base para o modelo de ingestão/metadados; RF33-RF36 adicionados (DEC-0003).
- Artefato NB-03: [`NB-03-viabilidade.md`](./NB-03-viabilidade.md) · Gate: [`GATE-NB-03.md`](./GATE-NB-03.md). Recomendação: **Go com ressalvas** (faseamento em 2 ondas aceito pelo PO; LLM: DeepSeek; curador: PO). Aprovação pelo comitê do time após apresentação e testes.
- **Adendo NB-02 (DEC-0007):** [`NB-02-adendo-memoria-conversas-ia.md`](./NB-02-adendo-memoria-conversas-ia.md). Traz a análise semântica com DeepSeek (UC03.16), a implementação da memória (UC03.3/UC03.14) e as conversas salvas/favoritas (UC05/UC06), todas implementadas no protótipo `radar-v0`. Aguarda validação do comitê junto com NB-03.
- **Adendo 3 NB-02 (DEC-0008):** [`NB-02-adendo-upload-cadastro-consultas.md`](./NB-02-adendo-upload-cadastro-consultas.md). Cobre upload e processamento reais (UC02.1–UC02.14), cadastro de projetos (UC07), exploração com filtros combinados (UC08) e insights (UC09). MER em [`DEV-01-insumo-MER-base-de-conhecimento.md`](./DEV-01-insumo-MER-base-de-conhecimento.md). Aguarda validação do comitê junto com NB-03.
- **Adendo 4 NB-02 (DEC-0009):** [`NB-02-adendo-exportacao-permissoes-auditoria.md`](./NB-02-adendo-exportacao-permissoes-auditoria.md). Exportação de proposta (UC10), registro de atividades (UC11), cadastro só pelo gestor (UC07.5/UC07.6), "Meus projetos" (UC08.6) e regra RN-V0-01. Aguarda validação do comitê junto com NB-03.
- **Adendo 5 NB-02 (DEC-0010):** [`NB-02-adendo-feedbacks-teste-2026-11-03.md`](./NB-02-adendo-feedbacks-teste-2026-11-03.md). Análise dos feedbacks do teste com o time e decisões do PO:
  - **F3:** chat por intenção (listagem, contagem, ficha, comparação, ferramentas da IA para perguntas compostas, esclarecimento). Implementado.
  - **F2:** boas-vindas com termo e mascaramento automático sem bloqueio; altera a forma de aplicar a RN-V0-01. Implementado.
  - **F1:** card rápido implementado; taxonomia "Área do cliente" e visão Executiva/Técnica aguardam o discovery.
  - Avaliação de intenções: 30/30 com regras e 30/30 com DeepSeek (`radar-v0/test/avaliacao-intencoes.js`).
- **Discovery, rodada 2 (DEC-0010):** [`NB-01-discovery-r2-projetos-listagem-ficha.md`](./NB-01-discovery-r2-projetos-listagem-ficha.md) (plano: perfis, entrevistas, tarefas, hipóteses) e [`NB-01-discovery-r2-catalogo-informacoes-projeto.md`](./NB-01-discovery-r2-catalogo-informacoes-projeto.md) (cerca de 80 informações em 10 dimensões, com origem e custo). Inclui executivos e diretoria, ausentes nos stakeholders do NB-01. **Aguardando o PO indicar os entrevistados.**
- **Incrementos da POC (MVP 0):**
  1. Busca conversacional com score explicável (base do NB-02).
  2. IA e memória (adendo 2, DEC-0007).
  3. Base real: upload, cadastro, exploração, insights e MER (adendo 3, DEC-0008).
  4. Login próprio, tema claro/escuro, guias de uso, tela de processo SDLC e melhorias do "Preencher com IA" (ajustes de usabilidade a partir dos testes).
  5. Exportação de proposta, permissões de cadastro, registro de atividades, "Meus projetos" e aviso de dados sensíveis RN-V0-01 (adendo 4, DEC-0009).
  6. Feedbacks do teste: chat por intenção, política de dados com mascaramento e card rápido de projeto (adendo 5, DEC-0010).
- **Evidências de QA na POC:** 48 testes automatizados (`node --test`) passando; conjunto de avaliação de intenções com as perguntas reais do teste; homologação manual em computador e celular nos dois temas; ambiente de demonstração publicado na AWS com login.
- **Pendências de processo:** abrir o PR do NB-03; alinhar a tabela do `SOURCE_OF_TRUTH.md` às 13 etapas; formalizar os gates das etapas executadas na POC após o Go do comitê; decidir a questão 2.5 do adendo 5 (arquivos binários originais).
