---
projeto_id: P360
cliente: Banco Cidadela
titulo: Detecção de Fraude em Tempo Real com Databricks e Kafka
segmento: Serviços Financeiros
tecnologias: ["Databricks","Kafka"]
servicos: ["Engenharia de Dados"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: interna
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P360
id: P360-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-08-31
prazo_meses: 5
---

# Apresentação Comercial — Banco Cidadela

## Slide 1 — Detecção de Fraude em Tempo Real com Databricks e Kafka

Banco Cidadela · Serviços Financeiros

## Slide 2 — O desafio

O Banco Cidadela registrou um aumento de 28% em tentativas de fraude transacional no último ano, com prejuízo estimado de R$ 45 milhões. Atualmente, a detecção é baseada em regras estáticas com latência de até 15 minutos, inviabilizando a prevenção em tempo real.

## Slide 3 — Nossa proposta

Implementar uma solução de detecção de fraude em tempo real utilizando Databricks e Kafka, reduzindo a latência para menos de 5 segundos e aumentando a precisão na identificação de transações fraudulentas.

## Slide 4 — Arquitetura e tecnologias

Databricks · Kafka

- Ingestão de eventos transacionais via Kafka, com tópicos dedicados e schema registry.
- Processamento de streams em tempo real no Databricks (Spark Structured Streaming) para cálculo de features e scoring.
- Desenvolvimento de modelos de machine learning para detecção de anomalias, treinados e versionados no Databricks MLflow.

## Slide 5 — Como vamos trabalhar

- Fase 1 - Discovery e Arquitetura: 4 semanas
- Fase 2 - Implementação da Pipeline de Ingestão e Processamento: 8 semanas
- Fase 3 - Desenvolvimento e Treinamento do Modelo: 6 semanas
- Fase 4 - Integração, Testes e Go-live: 2 semanas

Duração total: 5 meses.

## Slide 6 — Por que nós

Experiência em Engenharia de Dados, com projeto anterior entregue para a Banco Cidadela. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Mariana Costa (Diretora de Prevenção a Fraudes) e agendar o kickoff.
