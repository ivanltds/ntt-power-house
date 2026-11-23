---
projeto_id: P424
cliente: Crédito Fácil Brasil
titulo: Pipeline de detecção de fraude em tempo real com Databricks e Kafka
segmento: Serviços Financeiros
tecnologias: ["Databricks","Kafka"]
servicos: ["Engenharia de Dados"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P424
id: P424-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2025-03-18
prazo_meses: 7
---

# Apresentação Comercial — Crédito Fácil Brasil

## Slide 1 — Pipeline de detecção de fraude em tempo real com Databricks e Kafka

Crédito Fácil Brasil · Serviços Financeiros

## Slide 2 — O desafio

O Crédito Fácil Brasil processa cerca de 2,4 milhões de transações de crédito por mês e sofre com um índice de fraude de 1,8%, o que representa perdas estimadas em R$ 38 milhões ao ano. A análise atual é majoritariamente batch, com latência de até 24 horas, impedindo o bloqueio de operações suspeitas antes da liquidação financeira.

## Slide 3 — Nossa proposta

Construir um pipeline de engenharia de dados em tempo real que ingira eventos transacionais via Kafka e disponibilize features e sinais de risco no Databricks em menos de 2 minutos, subsidiando a detecção de fraude.

## Slide 4 — Arquitetura e tecnologias

Databricks · Kafka

- Ingestão de eventos transacionais em streaming com Apache Kafka, com tópicos segregados por canal e retenção de 7 dias
- Construção de camadas bronze, silver e gold no Databricks com Delta Lake, incluindo histórico de 18 meses de transações
- Implementação de jobs de engenharia de dados em Databricks para cálculo de features de risco em janelas de 1h, 24h e 7 dias

## Slide 5 — Como vamos trabalhar

- Discovery e arquitetura (4 semanas)
- Ingestão Kafka e camadas bronze/silver (8 semanas)
- Features e camada gold no Databricks (10 semanas)
- Integração, testes e go-live (6 semanas)

Duração total: 7 meses.

## Slide 6 — Por que nós

Experiência em Engenharia de Dados, com projeto anterior entregue para a Crédito Fácil Brasil. Equipe: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em streaming e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Villaça (Diretora de Risco e Prevenção a Fraudes) e agendar o kickoff.
