---
projeto_id: P409
cliente: Banco Ponte Firme
titulo: Streaming de Dados em Tempo Real para Análise de Transações
segmento: Serviços Financeiros
tecnologias: ["Kafka","Databricks"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: interna
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P409
id: P409-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-10-02
prazo_meses: 8
---

# Apresentação Comercial — Banco Ponte Firme

## Slide 1 — Streaming de Dados em Tempo Real para Análise de Transações

Banco Ponte Firme · Serviços Financeiros

## Slide 2 — O desafio

O Banco Ponte Firme processa cerca de 2,5 milhões de transações por dia e enfrenta latência de até 4 horas para consolidar dados analíticos, impactando a detecção de fraudes e a experiência do cliente. A falta de uma arquitetura de streaming unificada impede a reação em tempo real a eventos críticos.

## Slide 3 — Nossa proposta

Implementar uma plataforma de dados em tempo real com Kafka e Databricks para reduzir a latência de ingestão e processamento para menos de 5 minutos, permitindo análises contínuas e acionáveis.

## Slide 4 — Arquitetura e tecnologias

Kafka · Databricks

- Ingestão de eventos transacionais em tempo real usando Apache Kafka, com tópicos particionados para garantir ordem e throughput de até 10.000 mensagens por segundo.
- Processamento de streams com Databricks Structured Streaming para cálculos de agregações e detecção de anomalias em janelas de tempo.
- Integração dos dados processados com o data lake existente no Databricks, garantindo consistência e governança.

## Slide 5 — Como vamos trabalhar

- Planejamento e Arquitetura (4 semanas)
- Implementação da Ingestão com Kafka (10 semanas)
- Processamento e Análise com Databricks (12 semanas)
- Testes e Go-Live (6 semanas)

Duração total: 8 meses.

## Slide 6 — Por que nós

Experiência em Engenharia de Dados, com projeto anterior entregue para a Banco Ponte Firme. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em streaming e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Mariana Costa (Diretora de Tecnologia) e agendar o kickoff.
