# Log de Decisões (DECISIONS.md)

> Arquivo **append-only** (somente adição). Nunca edite ou apague uma entrada já publicada — se uma decisão for revista, crie uma nova entrada referenciando a anterior em "Supersede". Toda decisão de negócio, técnica, de escopo, de risco ou de aprovação/reprovação de gate registrada aqui é definitiva para fins de auditoria.

Formato de cada entrada: use `templates/TEMPLATE_DECISAO.md`. ID sequencial `DEC-0001`, `DEC-0002`, ...

---

## DEC-0000 — Exemplo (remover ao usar o processo)

| Campo | Valor |
|---|---|
| ID | DEC-0000 |
| Data | AAAA-MM-DD |
| Fase / Etapa | Ex.: 1. Negócio / NB-03 |
| Tipo | Ex.: Aprovação de Gate / Decisão de Escopo / Decisão Técnica / Risco Aceito |
| Descrição | Descreva a decisão tomada em 1-3 frases |
| Justificativa | Por que essa decisão foi tomada |
| Responsável (autor da proposta) | Nome do agente/pessoa que propôs |
| Aprovador humano | Nome e papel de quem aprovou |
| Referências | Link do PR / Issue / GATE.md / STATUS.md |
| Supersede | DEC-XXXX (se aplicável) |

---

<!-- Novas decisões devem ser adicionadas ABAIXO desta linha, em ordem cronológica -->

## DEC-0001 — Recorte inicial do MVP radar-propostas-cases (NB-01)

| Campo | Valor |
|---|---|
| ID | DEC-0001 |
| Data | 2026-10-21 |
| Fase / Etapa | 1. Negócio / NB-01 |
| Tipo | Decisão de Escopo |
| Descrição | O MVP cobrirá apenas propostas comerciais e cases (sem sigilo ou anonimizados), com upload manual, extração/metadados sugeridos com revisão humana, busca conversacional com score explicável e 3–5 resultados, e controle básico de acesso. Integração com SharePoint é opcional/avaliada apenas se viável. Ciclo completo proposta→contrato→projeto→entrega, geração automática de proposta e dashboards de indicadores ficam fora do MVP. |
| Justificativa | Tempo e acesso a dados limitados; necessidade de validar a hipótese de valor (busca semântica + chat com fontes rastreáveis) antes de investir em integrações completas e automações. |
| Responsável (autor da proposta) | Agente de Ideação (NB-01) via Agente Maestro |
| Aprovador humano | Pendente — aguardando definição do Product Owner/Sponsor no gate NB-01 |
| Referências | `docs/sdlc/execucoes/radar-propostas-cases/NB-01-discovery.md`, `docs/sdlc/execucoes/radar-propostas-cases/GATE-NB-01.md` |
| Supersede | N/A |

## DEC-0002 — Geração exploratória de NB-02 antes da aprovação do gate NB-01

| Campo | Valor |
|---|---|
| ID | DEC-0002 |
| Data | 2026-10-21 |
| Fase / Etapa | 1. Negócio / NB-01 e NB-02 |
| Tipo | Decisão de Processo (exceção pontual, não altera o SOURCE_OF_TRUTH) |
| Descrição | A pedido explícito do solicitante, o Agente de Requisitos produziu `NB-02-especificacao-requisitos.md` e seu gate (`GATE-NB-02.md`) antes da aprovação formal do gate NB-01, para permitir avaliação conjunta das duas saídas antes de decidir sobre ambas. `STATUS.md` reflete NB-02 como "Em aprovação (exploratório)", e o Maestro não considera NB-02 oficialmente concluída até que NB-01 também seja aprovado. |
| Justificativa | Acelerar a validação do fluxo de SDLC e dar visibilidade das implicações de requisitos ao aprovador antes de formalizar a aprovação do discovery, reduzindo retrabalho. |
| Responsável (autor da proposta) | Agente Maestro, a pedido do solicitante |
| Aprovador humano | Pendente — nenhuma aprovação de gate foi concedida nesta decisão; ela apenas registra a exceção de sequenciamento |
| Referências | `docs/sdlc/execucoes/radar-propostas-cases/GATE-NB-01.md`, `GATE-NB-02.md`, `STATUS.md` |
| Supersede | N/A |

## DEC-0003 — UC03 tratado como feature com sub-casos de uso e extensão de escopo (memória de conversa, feedback, resolução automática de conflito de fontes)

| Campo | Valor |
|---|---|
| ID | DEC-0003 |
| Data | 2026-10-21 |
| Fase / Etapa | 1. Negócio / NB-02 |
| Tipo | Decisão de Escopo |
| Descrição | UC03 ("Encontrar propostas similares") foi detalhado em `NB-02-feature-busca-conversacional.md` como 15 sub-casos de uso (UC03.1–UC03.15), por ser a principal entrega de valor do MVP e por definir o que precisa ser ingerido e como os metadados devem ser modelados. Três extensões de escopo foram confirmadas com o solicitante e tornadas requisitos explícitos: (1) chat com memória de conversa/multi-turno no MVP (RF33); (2) feedback de utilidade (útil/não útil) por resultado, alimentando as métricas de validação (RF34); (3) resolução automática de divergência entre fontes aplicando a hierarquia de confiança, com explicação da fonte priorizada (RF35). RF36 formaliza o registro de auditoria da busca necessário às métricas do MVP. |
| Justificativa | O MoSCoW original de NB-01 previa "score explicável" e "fontes rastreáveis", mas não detalhava memória de conversa, botão de feedback nem resolução automática de conflito; essas capacidades são necessárias para que UC03 entregue o valor esperado e para alimentar as métricas de validação já definidas (ex.: avaliação dos 3 primeiros resultados). |
| Responsável (autor da proposta) | Agente de Especificação de Requisitos (NB-02), a pedido do solicitante |
| Aprovador humano | Pendente — depende da aprovação conjunta de NB-01 e NB-02 (ver DEC-0002) |
| Referências | `docs/sdlc/execucoes/radar-propostas-cases/NB-02-feature-busca-conversacional.md`, `NB-02-especificacao-requisitos.md` (RF33-RF36), `GATE-NB-02.md` |
| Supersede | N/A |
