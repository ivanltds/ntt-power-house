---
projeto_id: P592
cliente: Ondas Móvel
titulo: Lakehouse de Dados para Operadora de Telecom com AWS, Snowflake e Azure
segmento: Telecom
tecnologias: ["AWS","Snowflake","Azure"]
servicos: ["Engenharia de Dados","Governança de Dados"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P592
id: P592-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2025-05-13
prazo_meses: 9
---

# Apresentação Comercial — Ondas Móvel

## Slide 1 — Lakehouse de Dados para Operadora de Telecom com AWS, Snowflake e Azure

Ondas Móvel · Telecom

## Slide 2 — O desafio

A Ondas Móvel operava com mais de 40 fontes de dados dispersas entre sistemas de billing, rede e atendimento, gerando relatórios de churn com atraso de até 5 dias e 18% de divergência entre áreas. O time de analytics consumia 60% do tempo em extração e tratamento manual, sem camada única de governança sobre 12 milhões de linhas de CDR diárias.

## Slide 3 — Nossa proposta

Construir uma plataforma lakehouse unificada em AWS, Snowflake e Azure, com engenharia e governança de dados, reduzindo o tempo de disponibilização de dados analíticos e garantindo rastreabilidade ponta a ponta.

## Slide 4 — Arquitetura e tecnologias

AWS · Snowflake · Azure

- Ingestão em lote e incremental de 40 fontes (billing, CRM, OSS, rede) na camada de armazenamento AWS S3 com orquestração automatizada
- Construção de camadas bronze, silver e gold no Snowflake, com 85 modelos dbt e SLAs de atualização de até 2 horas
- Integração de pipelines híbridos com Azure Data Factory para fontes corporativas e aplicações legadas

## Slide 5 — Como vamos trabalhar

- Fase 1 – Discovery e arquitetura: 6 semanas
- Fase 2 – Ingestão e camada bronze/silver: 14 semanas
- Fase 3 – Camada gold, governança e catálogo: 12 semanas
- Fase 4 – Estabilização, hipercare e handover: 4 semanas

Duração total: 9 meses.

## Slide 6 — Por que nós

Experiência em Engenharia de Dados, Governança de Dados, com projeto anterior entregue para a Ondas Móvel. Equipe: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em governança de dados e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vilaça (Diretora de Data & Analytics) e agendar o kickoff.
