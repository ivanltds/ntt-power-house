---
projeto_id: P186
cliente: FibraMax Internet
titulo: Streaming de dados em tempo real para operações de rede e atendimento
segmento: Telecom
tecnologias: ["Databricks","Kafka","AWS","Python"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P186
id: P186-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2025-10-25
prazo_meses: 6
---

# Apresentação Comercial — FibraMax Internet

## Slide 1 — Streaming de dados em tempo real para operações de rede e atendimento

FibraMax Internet · Telecom

## Slide 2 — O desafio

A FibraMax Internet, com 1,2 milhão de clientes residenciais e corporativos em 8 estados, enfrenta hoje uma latência média de 4 horas entre a geração de eventos de rede e a disponibilidade dos dados para análise, o que atrasa a detecção de falhas e a ação comercial. Cerca de 35% dos incidentes de qualidade só são identificados após reclamação do assinante, elevando o churn mensal para 1,8%.

## Slide 3 — Nossa proposta

Implantar uma plataforma de dados em tempo real para ingestão, processamento e analytics de eventos de rede e atendimento, reduzindo a latência de disponibilização de dados de horas para menos de 5 minutos.

## Slide 4 — Arquitetura e tecnologias

Databricks · Kafka · AWS · Python

- Ingestão contínua de eventos de rede e CRM via Apache Kafka, com tópicos particionados por região e retenção de 7 dias
- Pipeline de processamento em streaming no Databricks com notebooks e jobs em Python para limpeza, enriquecimento e agregação
- Camada analítica na AWS (S3, Glue Catalog e Databricks SQL) para dashboards operacionais e de qualidade

## Slide 5 — Como vamos trabalhar

- Discovery e arquitetura (4 semanas)
- Construção dos pipelines de streaming (10 semanas)
- Analytics, BI e detecção de anomalias (7 semanas)
- Go-live, estabilização e treinamento (5 semanas)

Duração total: 6 meses.

## Slide 6 — Por que nós

Experiência em Analytics & BI, Engenharia de Dados, com projeto anterior entregue para a FibraMax Internet. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Diretora de Tecnologia e Operações) e agendar o kickoff.
