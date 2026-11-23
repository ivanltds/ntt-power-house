---
projeto_id: P356
cliente: Operadora Saúde Total
titulo: Plataforma de Dados Lakehouse para Análise de Saúde Populacional
segmento: Saúde
tecnologias: ["AWS","Kafka"]
servicos: ["Migração para Nuvem"]
area: Data & Analytics
dono: Eduarda Prado
confidencialidade: confidencial
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P356
id: P356-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2025-08-31
prazo_meses: 7
---

# Apresentação Comercial — Operadora Saúde Total

## Slide 1 — Plataforma de Dados Lakehouse para Análise de Saúde Populacional

Operadora Saúde Total · Saúde

## Slide 2 — O desafio

A Operadora Saúde Total gerencia 2,3 milhões de beneficiários e enfrenta dificuldades para consolidar dados de sinistros, autorizações e prontuários eletrônicos espalhados em 12 sistemas legados. O tempo médio para gerar relatórios analíticos é de 5 dias, impactando a agilidade na tomada de decisão e a personalização de programas de saúde.

## Slide 3 — Nossa proposta

Implementar uma plataforma de dados lakehouse na AWS com ingestão em tempo real via Kafka, unificando fontes de dados e reduzindo o tempo de acesso analítico para menos de 1 hora.

## Slide 4 — Arquitetura e tecnologias

AWS · Kafka

- Migração de 12 fontes de dados legadas para um data lake na AWS S3, com catalogação no AWS Glue.
- Implementação de pipeline de ingestão em tempo real utilizando Apache Kafka para eventos de sinistros e autorizações.
- Construção de camada de armazenamento lakehouse com Delta Lake no AWS EMR, integrando dados estruturados e não estruturados.

## Slide 5 — Como vamos trabalhar

- Fase 1 - Discovery e Arquitetura: 4 semanas
- Fase 2 - Implementação de Ingestão e Lakehouse: 10 semanas
- Fase 3 - Desenvolvimento Analítico e Governança: 8 semanas
- Fase 4 - Testes, Treinamento e Go-live: 6 semanas

Duração total: 7 meses.

## Slide 6 — Por que nós

Experiência em Migração para Nuvem, com projeto anterior entregue para a Operadora Saúde Total. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em Kafka e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Mariana Costa (Diretora de Tecnologia da Informação) e agendar o kickoff.
