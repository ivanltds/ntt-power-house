---
projeto_id: P475
cliente: Proteja Seguros
titulo: Motor de detecção de fraude em seguros com ML em tempo quase real
segmento: Seguros
tecnologias: ["Databricks","Azure","Kafka","Python"]
servicos: ["Data Science / ML"]
area: AI & Automation
dono: Vinícius Batista
confidencialidade: interna
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P475
id: P475-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-10-17
prazo_meses: 8
---

# Apresentação Comercial — Proteja Seguros

## Slide 1 — Motor de detecção de fraude em seguros com ML em tempo quase real

Proteja Seguros · Seguros

## Slide 2 — O desafio

A Proteja Seguros processa cerca de 1,2 milhão de sinistros por ano e identifica apenas 38% das fraude por meio de regras manuais, com índice de falso positivo de 27% e tempo médio de análise de 6 dias. O crescimento de 18% na carteira de automóvel e residencial nos últimos 12 meses pressiona a área de sinistros, que hoje dedica 45% do esforço operacional à triagem de casos suspeitos.

## Slide 3 — Nossa proposta

Implantar um motor de detecção de fraude baseado em machine learning, com score de risco em tempo quase real na abertura do sinistro, reduzindo falsos positivos e o tempo de triagem.

## Slide 4 — Arquitetura e tecnologias

Databricks · Azure · Kafka · Python

- Ingestão de eventos de sinistros e dados cadastrais via Kafka, com streaming no Azure Event Hubs
- Camada analítica e feature store no Databricks sobre Azure Data Lake Storage
- Treinamento e versionamento de modelos supervisionados de score de fraude em Python (MLflow e scikit-learn)

## Slide 5 — Como vamos trabalhar

- Diagnóstico e arquitetura (6 semanas)
- Engenharia de dados e features (10 semanas)
- Modelagem e validação (10 semanas)
- Implantação e transferência (6 semanas)

Duração total: 8 meses.

## Slide 6 — Por que nós

Experiência em Data Science / ML, com projeto anterior entregue para a Proteja Seguros. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados, 1 especialista em MLOps e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Diretora de Sinistros) e agendar o kickoff.
