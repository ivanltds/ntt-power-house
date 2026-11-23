---
projeto_id: P199
cliente: Operador Logístico Armazém Brasil
titulo: Streaming de dados em tempo real para operações logísticas
segmento: Logística
tecnologias: ["Python","Azure","AWS"]
servicos: ["Engenharia de Dados","Analytics & BI","Change Management"]
area: Data & Analytics
dono: Úrsula Campos
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P199
id: P199-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-09-03
prazo_meses: 4
---

# Apresentação Comercial — Operador Logístico Armazém Brasil

## Slide 1 — Streaming de dados em tempo real para operações logísticas

Operador Logístico Armazém Brasil · Logística

## Slide 2 — O desafio

O Operador Logístico Armazém Brasil opera 12 centros de distribuição e movimenta cerca de 85 mil pedidos por dia, mas os indicadores de estoque e de status de entrega chegam aos gestores com atraso de até 6 horas, gerando 18% de retrabalho na separação e perda de visibilidade sobre 3 mil veículos em rota. A área de operações não consegue reagir a desvios de SLA em tempo hábil e a diretoria cobra redução de 25% nas ocorrências de atraso até o fim do ano.

## Slide 3 — Nossa proposta

Implantar uma plataforma de streaming de dados em tempo real para consolidar eventos de WMS, TMS e telemetria, disponibilizando indicadores operacionais com latência inferior a 2 minutos para as equipes de operação e diretoria.

## Slide 4 — Arquitetura e tecnologias

Python · Azure · AWS

- Construção de pipelines de ingestão de eventos em Python sobre Azure Event Hubs, com replicação de dados para AWS Kinesis
- Modelagem de camada de streaming e near real-time no Azure Databricks, consumindo dados das origens WMS e TMS
- Criação de 8 dashboards operacionais no Power BI com atualização em janelas de 1 a 2 minutos

## Slide 5 — Como vamos trabalhar

- Discovery e arquitetura de streaming (4 semanas)
- Construção dos pipelines e integração de fontes (6 semanas)
- Dashboards, alertas e Analytics & BI (4 semanas)
- Change management e go-live assistido (2 semanas)

Duração total: 4 meses.

## Slide 6 — Por que nós

Experiência em Engenharia de Dados, Analytics & BI, Change Management, com projeto anterior entregue para a Operador Logístico Armazém Brasil. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 consultor de change management, com 1 gerente de projeto dedicado 50%.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Diretora de Operações Logísticas) e agendar o kickoff.
