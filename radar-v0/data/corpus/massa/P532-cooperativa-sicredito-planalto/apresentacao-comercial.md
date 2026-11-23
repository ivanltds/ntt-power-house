---
projeto_id: P532
cliente: Cooperativa Sicrédito Planalto
titulo: Lakehouse Databricks no Azure para Centralização de Dados Financeiros
segmento: Serviços Financeiros
tecnologias: ["Databricks","Azure"]
servicos: ["Migração para Nuvem"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P532
id: P532-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-01-23
prazo_meses: 11
---

# Apresentação Comercial — Cooperativa Sicrédito Planalto

## Slide 1 — Lakehouse Databricks no Azure para Centralização de Dados Financeiros

Cooperativa Sicrédito Planalto · Serviços Financeiros

## Slide 2 — O desafio

A Cooperativa Sicrédito Planalto, com 480 mil cooperados e R$ 9,2 bilhões em ativos, opera com dados distribuídos em 7 sistemas legados e um data warehouse on-premises que leva até 36 horas para consolidar o fechamento diário. Isso limita a análise de risco de crédito em tempo real e atrasa a entrega de relatórios regulatórios ao Banco Central.

## Slide 3 — Nossa proposta

Construir uma plataforma lakehouse no Azure com Databricks, unificando dados de crédito, transações e cadastro para reduzir o tempo de consolidação para menos de 2 horas e habilitar analytics avançado.

## Slide 4 — Arquitetura e tecnologias

Databricks · Azure

- Migração do data warehouse on-premises para Azure Data Lake Storage Gen2 com ingestão incremental via Azure Data Factory
- Implementação de camadas bronze, silver e gold no Databricks com Delta Lake para 42 tabelas de negócio
- Criação de 18 pipelines de qualidade de dados e orquestração de jobs no Databricks Workflows

## Slide 5 — Como vamos trabalhar

- Diagnóstico e arquitetura (8 semanas)
- Ingestão e migração de dados (16 semanas)
- Modelagem e data marts (12 semanas)
- Go-live e estabilização (8 semanas)

Duração total: 11 meses.

## Slide 6 — Por que nós

Experiência em Migração para Nuvem, com projeto anterior entregue para a Cooperativa Sicrédito Planalto. Equipe: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista Databricks, 1 analista de qualidade de dados e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Diretora de Tecnologia e Dados) e agendar o kickoff.
