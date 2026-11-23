---
projeto_id: P192
cliente: NetVale Provedor
titulo: Pipeline de Dados em Tempo Real com Streaming Kafka no Azure
segmento: Telecom
tecnologias: ["Kafka","Azure","Python"]
servicos: ["Engenharia de Dados","Analytics & BI"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P192
id: P192-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-09-23
prazo_meses: 5
---

# Apresentação Comercial — NetVale Provedor

## Slide 1 — Pipeline de Dados em Tempo Real com Streaming Kafka no Azure

NetVale Provedor · Telecom

## Slide 2 — O desafio

A NetVale Provedor monitora hoje cerca de 480 mil assinantes de banda larga e TV, mas os indicadores de consumo e qualidade de rede chegam aos painéis com atraso de até 6 horas, gerando retrabalho na operação e perda estimada de 3% em receita de upgrades. A base de dados atual também não suporta picos de 12 mil eventos por segundo durante janelas de manutenção e lançamentos comerciais.

## Slide 3 — Nossa proposta

Implantar uma plataforma de streaming de dados em tempo real no Azure para disponibilizar indicadores operacionais e comerciais em menos de 2 minutos após o evento, com processamento escalável e integração analítica.

## Slide 4 — Arquitetura e tecnologias

Kafka · Azure · Python

- Implementação de cluster Kafka (Event Hubs compatível) no Azure para ingestão de eventos de rede e CRM, com throughput inicial de 12 mil mensagens por segundo
- Desenvolvimento de pipelines de processamento em Python para enriquecimento, deduplicação e agregação de eventos em janelas de 1 minuto
- Modelagem e carga em camada analítica (Azure Data Lake e Synapse) para consumo por ferramentas de BI

## Slide 5 — Como vamos trabalhar

- Discovery e arquitetura de streaming (4 semanas)
- Implementação de ingestão Kafka e pipelines Python (8 semanas)
- Modelagem analítica e painéis de BI em tempo real (6 semanas)
- Homologação, go-live e transferência de conhecimento (2 semanas)

Duração total: 5 meses.

## Slide 6 — Por que nós

Experiência em Engenharia de Dados, Analytics & BI, com projeto anterior entregue para a NetVale Provedor. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Gerente de Operações de Rede) e agendar o kickoff.
