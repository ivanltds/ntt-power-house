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
id: P266-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2025-10-18
prazo_meses: 8
---

# Apresentação Comercial — NetVale Provedor

## Slide 1 — Migração do Data Warehouse para Nuvem com GCP, Snowflake e Databricks

NetVale Provedor · Telecom

## Slide 2 — O desafio

A NetVale Provedor operava um data warehouse on-premises com 14 TB de dados históricos e cerca de 380 milhões de registros de CDRs, faturas e eventos de rede, com janelas de carga noturna que chegavam a 6 horas e relatórios de churn disponíveis apenas no D+2. A base crescia 22% ao ano e o custo de manutenção do hardware comprometia o orçamento de analytics.

## Slide 3 — Nossa proposta

Migrar o data warehouse para a nuvem em 8 meses, modernizando a plataforma com GCP, Snowflake e Databricks para reduzir o tempo de carga e ampliar a disponibilidade analítica.

## Slide 4 — Arquitetura e tecnologias

GCP · Snowflake · Databricks

- Assessment e desenho da arquitetura-alvo em GCP, com landing zone, governança de IAM e rede privada para ingestão dos dados de telecom
- Migração de 14 TB e 380 milhões de registros para o Snowflake, com modelagem dimensional e conversão de 120 rotinas ETL legadas
- Construção de pipelines de engenharia de dados no Databricks para ingestão incremental de CDRs, eventos de rede e faturamento

## Slide 5 — Como vamos trabalhar

- Assessment e arquitetura (6 semanas)
- Migração e engenharia de pipelines (16 semanas)
- Testes de paridade e paralelo assistido (8 semanas)
- Go-live e descomissionamento (4 semanas)

Duração total: 8 meses.

## Slide 6 — Por que nós

Experiência em Migração para Nuvem, Engenharia de Dados, com projeto anterior entregue para a NetVale Provedor. Equipe: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em Snowflake, 1 especialista em GCP e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Coelho (Gerente de BI e Dados) e agendar o kickoff.
