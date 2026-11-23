---
projeto_id: P204
cliente: Operador Logístico Armazém Brasil
titulo: Streaming de dados em tempo real para operação logística com Databricks e Kafka
segmento: Logística
tecnologias: ["Databricks","Kafka"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Zilda Correia
confidencialidade: confidencial
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P204
id: P204-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-01-09
prazo_meses: 7
---

# Apresentação Comercial — Operador Logístico Armazém Brasil

## Slide 1 — Streaming de dados em tempo real para operação logística com Databricks e Kafka

Operador Logístico Armazém Brasil · Logística

## Slide 2 — O desafio

O Operador Logístico Armazém Brasil acompanha a movimentação de 1,2 milhão de volumes por mês em 9 centros de distribuição, mas os relatórios de estoque e expedição chegam com até 6 horas de atraso, gerando rupturas e retrabalho de separação em cerca de 8% dos pedidos. A operação também não consegue reagir a desvios de rota e atrasos de doca em tempo hábil, o que pressiona o SLA contratado com os embarcadores.

## Slide 3 — Nossa proposta

Implantar uma plataforma de dados em tempo real com ingestão via Kafka e processamento no Databricks, reduzindo a latência de visibilidade operacional de horas para menos de 5 minutos e habilitando painéis de acompanhamento contínuo da cadeia logística.

## Slide 4 — Arquitetura e tecnologias

Databricks · Kafka

- Ingestão de eventos de WMS, TMS e rastreadores de frota em tópicos Kafka, com 14 fluxos e volume estimado de 2.500 eventos por segundo no pico
- Construção de pipelines de streaming no Databricks (Delta Live Tables) em camadas bronze, prata e ouro, com regras de deduplicação e tratamento de eventos fora de ordem
- Modelagem de indicadores operacionais em near real time: ocupação de doca, acuracidade de estoque, tempo de ciclo de separação e aderência de janelas de entrega

## Slide 5 — Como vamos trabalhar

- Discovery e arquitetura de streaming (6 semanas)
- Construção dos pipelines Kafka–Databricks e camadas bronze/prata (12 semanas)
- Camada ouro, dashboards e alertas operacionais (8 semanas)
- Homologação, go-live e transferência de conhecimento (4 semanas)

Duração total: 7 meses.

## Slide 6 — Por que nós

Experiência em Analytics & BI, Engenharia de Dados, com projeto anterior entregue para a Operador Logístico Armazém Brasil. Equipe: 1 arquiteto de dados, 3 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Gerente de Operações Logísticas) e agendar o kickoff.
