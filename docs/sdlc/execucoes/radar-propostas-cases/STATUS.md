# STATUS — radar-propostas-cases

> MVP de ingestão, organização e consulta de propostas e cases (busca semântica + chat com fontes rastreáveis) para times comerciais, pré-vendas e consultoria.

| Código | Etapa | Status | PR | Aprovador | Data |
|---|---|---|---|---|---|
| NB-01 | Ideação & Discovery | Aprovado | — | Ivan Lucio Teles de Souza (PO) | 2026-10-29 |
| NB-02 | Especificação de Requisitos | Aprovado | — | Ivan Lucio Teles de Souza (PO) | 2026-10-29 |
| NB-03 | Viabilidade & Priorização | Em aprovação (aguardando comitê do time) | — | | |
| NB-04 | UI/UX Design | Pendente | | | |
| DEV-01 | Arquitetura & Design Técnico | Pendente | | | |
| DEV-02 | Plano de Testes BDD | Pendente | | | |
| DEV-03 | Implementação / TDD | Pendente | | | |
| DEV-04 | Code Review & Qualidade | Pendente | | | |
| QA-01 | Testes Automatizados | Pendente | | | |
| QA-02 | Homologação Funcional | Pendente | | | |
| QA-03 | CI/CD e Staging | Pendente | | | |
| QA-04 | UAT / Avaliação de Negócio | Pendente | | | |
| QA-05 | Deploy / Release em Produção | Pendente | | | |

Status geral da execução: **Em andamento**

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
