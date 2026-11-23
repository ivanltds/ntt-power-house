---
projeto_id: P190
cliente: Proteja Seguros
titulo: Motor de Precificação Dinâmica de Apólices com Dados em Tempo Real
segmento: Seguros
tecnologias: ["GCP","Databricks","Python"]
servicos: ["Analytics & BI"]
area: Data & Analytics
dono: Leonardo Pires
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P190
id: P190-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-06-19
prazo_meses: 6
---

# Apresentação Comercial — Proteja Seguros

## Slide 1 — Motor de Precificação Dinâmica de Apólices com Dados em Tempo Real

Proteja Seguros · Seguros

## Slide 2 — O desafio

A Proteja Seguros mantém hoje 38 tabelas tarifárias estáticas revisadas apenas duas vezes ao ano, o que gera perda estimada de 4,2 pontos de margem em segmentos de auto e residencial e uma taxa de conversão de propostas 12% abaixo da média do mercado. A ausência de dados de sinistralidade e comportamento em tempo quase real impede ajustes de prêmio por perfil e região.

## Slide 3 — Nossa proposta

Construir um motor de precificação dinâmica que atualize prêmios com base em sinistralidade, perfil e região, reduzindo o ciclo de revisão tarifária de 180 para 7 dias e elevando a conversão de propostas em 8%.

## Slide 4 — Arquitetura e tecnologias

GCP · Databricks · Python

- Ingestão de dados de sinistros, propostas e comportamento em GCP (Cloud Storage e Pub/Sub) com pipelines em Python
- Camada analítica e modelos de precificação no Databricks, com Delta Lake e feature store para scoring em lote e quase real
- Integração do motor de prêmio dinâmico às APIs de cotação existentes, com fallback para a tabela tarifária vigente

## Slide 5 — Como vamos trabalhar

- Diagnóstico e desenho da arquitetura de dados (4 semanas)
- Construção dos pipelines em GCP e Databricks (8 semanas)
- Desenvolvimento e backtest dos modelos de precificação (8 semanas)
- Integração, dashboards e go-live assistido (6 semanas)

Duração total: 6 meses.

## Slide 6 — Por que nós

Experiência em Analytics & BI, com projeto anterior entregue para a Proteja Seguros. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados, 1 analista de BI e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Diretora de Pricing e Produtos) e agendar o kickoff.
