---
projeto_id: P291
cliente: Conecta Brasil Telecom
titulo: Plataforma de streaming de dados em tempo real para analytics de rede
segmento: Telecom
tecnologias: ["Python","Azure"]
servicos: ["Analytics & BI"]
area: Data & Analytics
dono: Zilda Correia
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P291
id: P291-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-02-20
prazo_meses: 7
---

# Apresentação Comercial — Conecta Brasil Telecom

## Slide 1 — Plataforma de streaming de dados em tempo real para analytics de rede

Conecta Brasil Telecom · Telecom

## Slide 2 — O desafio

A Conecta Brasil Telecom monitora cerca de 4,2 milhões de linhas móveis e 780 mil assinantes de banda larga, mas os painéis de qualidade de rede são atualizados apenas a cada 6 horas, gerando atraso na detecção de incidentes. Isso resulta em um tempo médio de resposta a falhas de 3h40 e em multas regulatórias de aproximadamente R$ 1,8 milhão no último ano.

## Slide 3 — Nossa proposta

Implantar uma plataforma de streaming em tempo real no Azure, com processamento em Python, para reduzir a latência dos indicadores de rede de horas para menos de 2 minutos e subsidiar ações proativas de operação e analytics.

## Slide 4 — Arquitetura e tecnologias

Python · Azure

- Ingestão contínua de eventos de rede (CDRs, KPIs de células e alarmes) via Azure Event Hubs, com volume estimado de 25 mil eventos por segundo
- Processamento de streams em Python com Azure Databricks Structured Streaming para cálculo de indicadores de qualidade em janelas de 1 e 5 minutos
- Camada analítica no Azure Synapse Analytics com tabelas Delta Lake para consultas históricas e em tempo quase real

## Slide 5 — Como vamos trabalhar

- Discovery e arquitetura (5 semanas)
- Ingestão e processamento de streams (10 semanas)
- Camada analítica e painéis de BI (9 semanas)
- Homologação, go-live e transferência de conhecimento (4 semanas)

Duração total: 7 meses.

## Slide 6 — Por que nós

Experiência em Analytics & BI, com projeto anterior entregue para a Conecta Brasil Telecom. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em BI e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Gerente de Operações de Rede) e agendar o kickoff.
