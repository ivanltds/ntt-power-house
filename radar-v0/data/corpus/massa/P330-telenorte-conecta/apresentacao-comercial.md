---
projeto_id: P330
cliente: TeleNorte Conecta
titulo: Streaming de dados em tempo real para operações de rede e atendimento
segmento: Telecom
tecnologias: ["Azure","Databricks"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: confidencial
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P330
id: P330-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2024-07-25
prazo_meses: 7
---

# Apresentação Comercial — TeleNorte Conecta

## Slide 1 — Streaming de dados em tempo real para operações de rede e atendimento

TeleNorte Conecta · Telecom

## Slide 2 — O desafio

A TeleNorte Conecta processava dados de rede e atendimento em lotes diários, com latência de até 24 horas, dificultando a detecção de falhas e a personalização de ofertas. Com 4,2 milhões de clientes e picos de 1,8 TB/dia, a empresa precisava de visibilidade em tempo real para reduzir churn e melhorar a experiência.

## Slide 3 — Nossa proposta

Implementar uma plataforma de streaming de dados em tempo real na Azure com Databricks para ingestão, processamento e análise contínua de eventos de rede e atendimento, permitindo reação imediata a incidentes e ofertas personalizadas.

## Slide 4 — Arquitetura e tecnologias

Azure · Databricks

- Ingestão de eventos de rede e atendimento via Azure Event Hubs e Kafka, com processamento em streaming no Databricks (Structured Streaming).
- Construção de pipelines de dados em tempo real com Delta Lake na Azure, garantindo confiabilidade e escalabilidade para 1,8 TB/dia.
- Integração com Azure Data Lake Storage Gen2 para armazenamento de dados brutos e curados, com governança via Unity Catalog.

## Slide 5 — Como vamos trabalhar

- Fase 1 - Discovery e arquitetura: 4 semanas
- Fase 2 - Implementação de pipelines de streaming: 12 semanas
- Fase 3 - Integração de analytics e dashboards: 8 semanas
- Fase 4 - Testes, treinamento e go-live: 4 semanas

Duração total: 7 meses.

## Slide 6 — Por que nós

Experiência em Analytics & BI, Engenharia de Dados, com projeto anterior entregue para a TeleNorte Conecta. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em BI e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Mariana Costa (Diretora de Tecnologia da Informação) e agendar o kickoff.
