---
projeto_id: P434
cliente: Distribuidora Luz do Cerrado
titulo: Streaming de dados em tempo real para operações de distribuição de energia
segmento: Utilities / Energia
tecnologias: ["Azure","AWS"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Leonardo Pires
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P434
id: P434-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-02-14
prazo_meses: 9
---

# Apresentação Comercial — Distribuidora Luz do Cerrado

## Slide 1 — Streaming de dados em tempo real para operações de distribuição de energia

Distribuidora Luz do Cerrado · Utilities / Energia

## Slide 2 — O desafio

A Distribuidora Luz do Cerrado, com cerca de 1,2 milhão de unidades consumidoras e 3,5 mil medidores inteligentes gerando leituras a cada 15 minutos, não conseguia consolidar os eventos de campo em menos de 6 horas, atrasando a detecção de perdas e a resposta a oscilações de rede. A área de operações dependia de cargas batch noturnas e de planilhas manuais, o que elevava o índice de perdas não técnicas a 8,7% e impedia o acompanhamento em tempo real da qualidade da energia.

## Slide 3 — Nossa proposta

Implantar uma plataforma de streaming de dados em nuvem que reduza a latência de ingestão e disponibilização de eventos de campo de horas para segundos, sustentando a operação e a análise em tempo quase real.

## Slide 4 — Arquitetura e tecnologias

Azure · AWS

- Ingestão contínua de eventos de medidores e sensores via Azure Event Hubs e AWS Kinesis, com throughput projetado de 4.500 eventos por segundo no pico
- Camada de processamento em stream no Azure Databricks Structured Streaming e AWS Glue para cálculo de perdas, interrupções e indicadores de qualidade em janelas de 1 a 5 minutos
- Pipeline de dados em tempo real com armazenamento em camadas bronze, prata e ouro no Azure Data Lake Storage e Amazon S3, com catálogo unificado

## Slide 5 — Como vamos trabalhar

- Diagnóstico e arquitetura de streaming (6 semanas)
- Construção dos pipelines de ingestão e processamento (14 semanas)
- Integração com painéis e indicadores operacionais (10 semanas)
- Homologação, go-live e sustentação assistida (6 semanas)

Duração total: 9 meses.

## Slide 6 — Por que nós

Experiência em Engenharia de Dados, com projeto anterior entregue para a Distribuidora Luz do Cerrado. Equipe: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em streaming e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Gerente de Operações de Rede) e agendar o kickoff.
