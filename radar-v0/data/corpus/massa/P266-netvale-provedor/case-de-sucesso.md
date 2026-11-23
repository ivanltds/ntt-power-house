---
projeto_id: P266
cliente: NetVale Provedor
titulo: Migração do Data Warehouse para Nuvem com GCP, Snowflake e Databricks
segmento: Telecom
tecnologias: ["GCP","Snowflake","Databricks"]
servicos: ["Migração para Nuvem","Engenharia de Dados"]
area: Cloud & Infra
dono: Isabela Freitas
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P266
id: P266-CASE
tipo_documental: case_sucesso
status_documento: aprovado
data: 2026-07-02
prazo_meses: 8
---

# Case de Sucesso — NetVale Provedor

## Desafio

A NetVale Provedor operava um data warehouse on-premises com 14 TB de dados históricos e cerca de 380 milhões de registros de CDRs, faturas e eventos de rede, com janelas de carga noturna que chegavam a 6 horas e relatórios de churn disponíveis apenas no D+2. A base crescia 22% ao ano e o custo de manutenção do hardware comprometia o orçamento de analytics.

## Solução

Migrar o data warehouse para a nuvem em 8 meses, modernizando a plataforma com GCP, Snowflake e Databricks para reduzir o tempo de carga e ampliar a disponibilidade analítica. A solução usou GCP, Snowflake, Databricks e foi entregue em 8 meses.

## Resultados

O tempo de carga noturna caiu de 6 horas para 48 minutos (-87%) e os relatórios de churn passaram a estar disponíveis no D+0. A redução de custo de infraestrutura e licenciamento foi de R$ 1,9 milhão no primeiro ano.

## Lições aprendidas

A conversão das 120 rotinas ETL legadas levou 3 semanas a mais que o previsto por causa de regras de negócio não documentadas no ambiente on-premises. Foi decisivo manter o paralelo assistido por 8 semanas com validação diária junto à equipe de BI do cliente, o que permitiu o go-live sem incidentes críticos.
