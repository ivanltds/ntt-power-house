---
projeto_id: P261
cliente: Secretaria Estadual de Saúde do Planalto
titulo: Migração do Data Warehouse da Saúde para Nuvem Multi-Cloud
segmento: Setor Público
tecnologias: ["GCP","Azure","Databricks","Snowflake"]
servicos: ["Engenharia de Dados","Migração para Nuvem"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: confidencial
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P261
id: P261-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-06-07
prazo_meses: 6
---

# Apresentação Comercial — Secretaria Estadual de Saúde do Planalto

## Slide 1 — Migração do Data Warehouse da Saúde para Nuvem Multi-Cloud

Secretaria Estadual de Saúde do Planalto · Setor Público

## Slide 2 — O desafio

A Secretaria Estadual de Saúde do Planalto mantém um data warehouse on-premises com 45 TB de dados que processa 1,2 milhão de atendimentos por mês, mas enfrenta lentidão nas consultas analíticas (tempo médio de 12 minutos) e custos crescentes de manutenção de hardware. A falta de escalabilidade impede a expansão de relatórios para 300 novos usuários previstos para 2025.

## Slide 3 — Nossa proposta

Migrar o data warehouse para uma arquitetura multi-cloud (GCP e Azure) com Databricks e Snowflake, reduzindo o tempo de consulta em 70% e permitindo escalabilidade elástica para até 2 milhões de atendimentos/mês.

## Slide 4 — Arquitetura e tecnologias

GCP · Azure · Databricks · Snowflake

- Avaliação e refatoração de 120 pipelines ETL legados para Databricks (PySpark) com orquestração no Azure Data Factory
- Migração de 45 TB de dados históricos para Snowflake na GCP, com modelagem dimensional e políticas de governança
- Implementação de camada de ingestão em tempo real via Pub/Sub (GCP) e Event Hubs (Azure) para 15 fontes de dados

## Slide 5 — Como vamos trabalhar

- Fase 1 – Assessment e Arquitetura: 6 semanas
- Fase 2 – Migração de Dados e Pipelines: 10 semanas
- Fase 3 – Validação e Go-Live: 6 semanas
- Fase 4 – Estabilização e Transferência: 4 semanas

Duração total: 6 meses.

## Slide 6 — Por que nós

Experiência em Engenharia de Dados, Migração para Nuvem, com projeto anterior entregue para a Secretaria Estadual de Saúde do Planalto. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em nuvem (GCP/Azure) e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Ricardo Almeida (Diretor de Tecnologia da Informação) e agendar o kickoff.
