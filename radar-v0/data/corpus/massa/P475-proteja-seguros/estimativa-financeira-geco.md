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
id: P475-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-10-04
prazo_meses: 7
valor: 1040000
---

# Estimativa financeira (GECO) — Proteja Seguros

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão de eventos de sinistros e dados cadastrais via Kafka, com streaming no Azure Event Hubs; Camada analítica e feature store no Databricks sobre Azure Data Lake Storage.
- Tecnologias assumidas: Databricks, Azure, Kafka, Python.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 7 meses.

Equipe estimada: 1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados, 1 especialista em MLOps e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 1.040.000 (sem contingência).

## Pontos em aberto

- Qualidade e dispersão dos dados históricos de sinistros
- Baixa adoção do score pela equipe de triagem
- Latência e estabilidade da integração em tempo quase real
