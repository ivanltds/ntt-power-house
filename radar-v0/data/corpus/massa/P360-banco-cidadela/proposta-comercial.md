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
id: P360-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-08-28
prazo_meses: 5
valor: 590000
margem: 0.19
---

# Proposta Comercial — Detecção de Fraude em Tempo Real com Databricks e Kafka

**Cliente:** Banco Cidadela
**Segmento:** Serviços Financeiros
**Área responsável:** AI & Automation · **Dono da proposta:** Bruno Tavares
**Data:** 2026-08-28 · **Versão:** final

## 1. Contexto e desafio

O Banco Cidadela registrou um aumento de 28% em tentativas de fraude transacional no último ano, com prejuízo estimado de R$ 45 milhões. Atualmente, a detecção é baseada em regras estáticas com latência de até 15 minutos, inviabilizando a prevenção em tempo real.

## 2. Objetivo

Implementar uma solução de detecção de fraude em tempo real utilizando Databricks e Kafka, reduzindo a latência para menos de 5 segundos e aumentando a precisão na identificação de transações fraudulentas.

## 3. Escopo da solução

- Ingestão de eventos transacionais via Kafka, com tópicos dedicados e schema registry.
- Processamento de streams em tempo real no Databricks (Spark Structured Streaming) para cálculo de features e scoring.
- Desenvolvimento de modelos de machine learning para detecção de anomalias, treinados e versionados no Databricks MLflow.
- Integração com sistemas de decisão do banco para bloqueio ou desafio de transações suspeitas.
- Monitoramento contínuo de performance do modelo e da pipeline, com alertas no Databricks e Grafana.

Tecnologias principais: Databricks, Kafka.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Fase 1 - Discovery e Arquitetura: 4 semanas
- Fase 2 - Implementação da Pipeline de Ingestão e Processamento: 8 semanas
- Fase 3 - Desenvolvimento e Treinamento do Modelo: 6 semanas
- Fase 4 - Integração, Testes e Go-live: 2 semanas

## 5. Entregáveis

- Pipeline de ingestão Kafka-Databricks operacional, com latência inferior a 5 segundos.
- Modelo de detecção de fraude treinado e validado, com AUC superior a 0,92.
- Dashboard de monitoramento em tempo real com métricas de fraude e performance do modelo.
- Documentação técnica completa da arquitetura e dos processos.
- Transferência de conhecimento e treinamento para a equipe do Banco Cidadela.

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Atraso na disponibilização de dados históricos pelo cliente.
- Risco: Complexidade na integração com sistemas legados de decisão.
- Risco: Dificuldade na obtenção de rótulos confiáveis para treinamento do modelo.

## 8. Investimento

Investimento total: R$ 590.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 19%.
