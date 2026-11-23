---
projeto_id: P183
cliente: Banco Horizonte Sul
titulo: Pipeline de dados em tempo real para análise de risco e crédito com Azure e Python
segmento: Serviços Financeiros
tecnologias: ["Python","Azure"]
servicos: ["Engenharia de Dados","Analytics & BI"]
area: Data & Analytics
dono: Úrsula Campos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P183
id: P183-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2024-06-26
prazo_meses: 6
---

# Apresentação Comercial — Banco Horizonte Sul

## Slide 1 — Pipeline de dados em tempo real para análise de risco e crédito com Azure e Python

Banco Horizonte Sul · Serviços Financeiros

## Slide 2 — O desafio

O Banco Horizonte Sul processava cerca de 4,2 milhões de transações por dia em lotes noturnos, com latência média de 9 horas para relatórios de risco e crédito. Isso limitava a detecção de fraudes e a gestão de limites de exposição em tempo quase real, gerando perdas estimadas em R$ 3,8 milhões anuais.

## Slide 3 — Nossa proposta

Implantar uma plataforma de streaming de dados no Azure, com engenharia em Python, para disponibilizar eventos financeiros em até 2 minutos e alimentar análises de risco e crédito em tempo real.

## Slide 4 — Arquitetura e tecnologias

Python · Azure

- Ingestão contínua de eventos transacionais via Azure Event Hubs, com 15 mil mensagens por segundo de pico
- Processamento e transformação em streaming com Python no Azure Databricks, aplicando regras de qualidade e deduplicação
- Camada analítica em Azure Synapse Analytics com tabelas Delta para risco e crédito, atualizadas a cada 90 segundos

## Slide 5 — Como vamos trabalhar

- Diagnóstico e arquitetura de streaming (5 semanas)
- Construção dos pipelines de ingestão e processamento (9 semanas)
- Camada analítica e painéis de BI (7 semanas)
- Go-live assistido e transferência de conhecimento (5 semanas)

Duração total: 6 meses.

## Slide 6 — Por que nós

Experiência em Engenharia de Dados, Analytics & BI, com projeto anterior entregue para a Banco Horizonte Sul. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Marina Cordeiro (Gerente de Risco de Crédito) e agendar o kickoff.
