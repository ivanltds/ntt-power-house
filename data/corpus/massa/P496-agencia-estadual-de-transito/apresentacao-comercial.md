---
projeto_id: P496
cliente: Agência Estadual de Trânsito
titulo: Migração do Data Warehouse para Snowflake na Nuvem AWS
segmento: Setor Público
tecnologias: ["Snowflake","AWS"]
servicos: ["Engenharia de Dados","Migração para Nuvem"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P496
id: P496-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2024-05-16
prazo_meses: 6
---

# Apresentação Comercial — Agência Estadual de Trânsito

## Slide 1 — Migração do Data Warehouse para Snowflake na Nuvem AWS

Agência Estadual de Trânsito · Setor Público

## Slide 2 — O desafio

A Agência Estadual de Trânsito mantinha um data warehouse on-premises com 14 TB de dados históricos de condutores, veículos e infrações, com janelas de carga noturna que ultrapassavam 7 horas e indisponibilidade recorrente para relatórios de fiscalização. O ambiente legado não suportava o crescimento de 22% ao ano no volume de dados de arrecadação e demandava custos fixos de infraestrutura de R$ 1,8 milhão por ano.

## Slide 3 — Nossa proposta

Migrar o data warehouse legado para Snowflake na AWS em 6 meses, preservando a integridade histórica e reduzindo o tempo de carga e o custo operacional do ambiente analítico.

## Slide 4 — Arquitetura e tecnologias

Snowflake · AWS

- Avaliação e inventário do data warehouse legado, com mapeamento de 180 tabelas e 320 processos ETL
- Modelagem dimensional no Snowflake com separação de camadas raw, staging e consumo
- Migração dos dados históricos para o Snowflake via AWS S3 e Snowpipe, com validação de reconciliação

## Slide 5 — Como vamos trabalhar

- Diagnóstico e arquitetura-alvo (6 semanas)
- Migração dos dados históricos (10 semanas)
- Reimplementação dos pipelines e validação (6 semanas)
- Go-live e estabilização (2 semanas)

Duração total: 6 meses.

## Slide 6 — Por que nós

Experiência em Engenharia de Dados, Migração para Nuvem, com projeto anterior entregue para a Agência Estadual de Trânsito. Equipe: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em nuvem AWS e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Marcelo Tavares (Diretor de Tecnologia da Informação) e agendar o kickoff.
