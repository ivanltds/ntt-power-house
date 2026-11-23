---
projeto_id: P171
cliente: NetVale Provedor
titulo: Streaming de dados em tempo real para operações de rede e consumo
segmento: Telecom
tecnologias: ["AWS","Databricks"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P171
id: P171-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-07-15
prazo_meses: 8
---

# Apresentação Comercial — NetVale Provedor

## Slide 1 — Streaming de dados em tempo real para operações de rede e consumo

NetVale Provedor · Telecom

## Slide 2 — O desafio

A NetVale Provedor monitora cerca de 1,2 milhão de assinantes e enfrenta latência de até 6 horas na consolidação de dados de consumo e de eventos de rede, o que atrasa a detecção de anomalias e a ação comercial. Os relatórios atuais em lote não sustentam a meta de reduzir o churn mensal de 2,4% nem de priorizar investimentos em expansão de capacidade.

## Slide 3 — Nossa proposta

Implantar uma plataforma de streaming na AWS com Databricks para disponibilizar dados de rede e consumo em tempo real, com latência máxima de 5 minutos, apoiando analytics operacional e decisões comerciais.

## Slide 4 — Arquitetura e tecnologias

AWS · Databricks

- Ingestão contínua de eventos de rede e consumo via Amazon Kinesis e AWS Lambda, com volume estimado de 40 mil eventos por segundo
- Pipeline de dados em camadas bronze, silver e gold no Databricks com Delta Lake e processamento em streaming
- Modelagem de indicadores operacionais e comerciais em Databricks SQL para consumo por Analytics & BI

## Slide 5 — Como vamos trabalhar

- Diagnóstico e arquitetura (6 semanas)
- Construção dos pipelines de streaming (14 semanas)
- Analytics & BI e governança (10 semanas)
- Homologação e go-live assistido (4 semanas)

Duração total: 8 meses.

## Slide 6 — Por que nós

Experiência em Analytics & BI, Engenharia de Dados, com projeto anterior entregue para a NetVale Provedor. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Almeida (Diretora de Tecnologia) e agendar o kickoff.
