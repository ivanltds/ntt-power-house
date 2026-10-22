# STATUS — radar-propostas-cases

> MVP de ingestão, organização e consulta de propostas e cases (busca semântica + chat com fontes rastreáveis) para times comerciais, pré-vendas e consultoria.

| Código | Etapa | Status | PR | Aprovador | Data |
|---|---|---|---|---|---|
| NB-01 | Ideação & Discovery | Em aprovação | — | — (pendente de definição) | |
| NB-02 | Especificação de Requisitos | Em aprovação (exploratório — depende de NB-01) | — | | |
| NB-03 | Viabilidade & Priorização | Pendente | | | |
| DEV-01 | Arquitetura & Design | Pendente | | | |
| DEV-02 | Implementação | Pendente | | | |
| DEV-03 | Code Review & Qualidade | Pendente | | | |
| QA-01 | Testes Automatizados | Pendente | | | |
| QA-02 | Homologação | Pendente | | | |
| QA-03 | Aceite UAT | Pendente | | | |
| QA-04 | Deploy / Entrega | Pendente | | | |

Status geral da execução: **Em andamento**

## Notas

- Prioridade: alta (prioridade imediata no roadmap).
- Prazo-alvo do MVP (recorte final): 4–6 semanas.
- Equipe: reduzida, já alocada; sem orçamento externo adicional.
- Pendência aberta para o fechamento do gate NB-01: definição do nome do aprovador humano (Product Owner / Sponsor).
- **Exceção de processo (DEC-0002):** a saída de NB-02 foi gerada antes da aprovação formal de NB-01, a pedido do solicitante, para permitir avaliação conjunta dos dois gates. O Maestro só considerará NB-02 oficialmente concluída quando NB-01 também estiver aprovado; se o discovery mudar na revisão humana, o requisito deve ser revisado.
- Artefato NB-01: [`NB-01-discovery.md`](./NB-01-discovery.md) · Gate: [`GATE-NB-01.md`](./GATE-NB-01.md).
- Artefato NB-02: [`NB-02-especificacao-requisitos.md`](./NB-02-especificacao-requisitos.md) + detalhamento [`NB-02-feature-busca-conversacional.md`](./NB-02-feature-busca-conversacional.md) (UC03) · Gate: [`GATE-NB-02.md`](./GATE-NB-02.md).
- UC03 foi tratado como feature própria (15 sub-casos de uso) por ser a principal entrega de valor do MVP e base para o modelo de ingestão/metadados; RF33-RF36 adicionados (DEC-0003).
