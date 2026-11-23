---
projeto_id: P516
cliente: Geradora Ventos do Nordeste
titulo: Streaming de dados em tempo real para operação e manutenção de parques eólicos
segmento: Utilities / Energia
tecnologias: ["Kafka","Azure"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: confidencial
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P516
id: P516-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-07-19
prazo_meses: 8
---

# Apresentação Comercial — Geradora Ventos do Nordeste

## Slide 1 — Streaming de dados em tempo real para operação e manutenção de parques eólicos

Geradora Ventos do Nordeste · Utilities / Energia

## Slide 2 — O desafio

A Geradora Ventos do Nordeste opera 12 parques eólicos com 480 aerogeradores e enfrenta latência de até 4 horas na consolidação de dados de sensores, dificultando a detecção de anomalias e a manutenção preditiva. A empresa precisa processar 2,5 TB/dia de telemetria em tempo real para reduzir paradas não planejadas, que hoje representam 8% da geração.

## Slide 3 — Nossa proposta

Implantar uma plataforma de streaming de dados na Azure com Kafka para ingestão e processamento em tempo real, permitindo analytics operacional e manutenção preditiva com latência inferior a 5 segundos.

## Slide 4 — Arquitetura e tecnologias

Kafka · Azure

- Configuração de cluster Kafka na Azure (HDInsight ou Confluent Cloud) para ingestão de telemetria de 480 aerogeradores
- Desenvolvimento de pipelines de streaming com Azure Stream Analytics e Kafka Streams para cálculo de KPIs em tempo real
- Integração com Azure Data Lake Storage Gen2 para armazenamento de dados brutos e processados

## Slide 5 — Como vamos trabalhar

- Discovery e arquitetura (6 semanas)
- Implementação da plataforma de streaming (12 semanas)
- Analytics e modelos preditivos (10 semanas)
- Go-live e estabilização (4 semanas)

Duração total: 8 meses.

## Slide 6 — Por que nós

Experiência em Analytics & BI, Engenharia de Dados, com projeto anterior entregue para a Geradora Ventos do Nordeste. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Mariana Costa (Gerente de Operações) e agendar o kickoff.
