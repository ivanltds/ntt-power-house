---
projeto_id: P232
cliente: NetVale Provedor
titulo: Plataforma Lakehouse na AWS com Kafka e Snowflake para Análise de Dados
segmento: Telecom
tecnologias: ["AWS","Kafka","Snowflake","Python"]
servicos: ["Engenharia de Dados","Governança de Dados","Migração para Nuvem"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P232
id: P232-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-11-15
prazo_meses: 6
---

# Apresentação Comercial — NetVale Provedor

## Slide 1 — Plataforma Lakehouse na AWS com Kafka e Snowflake para Análise de Dados

NetVale Provedor · Telecom

## Slide 2 — O desafio

A NetVale Provedor, com cerca de 480 mil assinantes de internet e TV, enfrenta dificuldades para consolidar dados de rede, atendimento e faturamento em um data warehouse legado que processa lotes noturnos de até 9 horas. Relatórios de churn e consumo levam mais de 24 horas para ficar disponíveis, atrasando decisões comerciais e de retenção.

## Slide 3 — Nossa proposta

Implantar uma plataforma de dados lakehouse na AWS com ingestão em streaming via Kafka e camada analítica em Snowflake, reduzindo a latência de dados de 24 horas para menos de 2 horas em 6 meses.

## Slide 4 — Arquitetura e tecnologias

AWS · Kafka · Snowflake · Python

- Ingestão em streaming de eventos de rede e atendimento com Apache Kafka na AWS (Amazon MSK)
- Construção de camadas bronze, prata e ouro em Amazon S3 com pipelines em Python e AWS Glue
- Modelagem dimensional e cargas incrementais no Snowflake para consumo analítico

## Slide 5 — Como vamos trabalhar

- Descoberta e Arquitetura (6 semanas)
- Ingestão e Lakehouse (10 semanas)
- Migração e Modelagem no Snowflake (6 semanas)
- Governança e Go-Live (4 semanas)

Duração total: 6 meses.

## Slide 6 — Por que nós

Experiência em Engenharia de Dados, Governança de Dados, Migração para Nuvem, com projeto anterior entregue para a NetVale Provedor. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em governança de dados e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Coelho (Diretora de Tecnologia) e agendar o kickoff.
