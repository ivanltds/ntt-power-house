---
projeto_id: P525
cliente: Escudo Auto Seguros
titulo: Detecção de Fraude em Tempo Real com Kafka, Databricks e Azure
segmento: Seguros
tecnologias: ["Kafka","Databricks","Azure"]
servicos: ["Data Science / ML"]
area: AI & Automation
dono: Karina Duarte
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P525
id: P525-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2024-11-23
prazo_meses: 6
valor: 970000
margem: 0.29
---

# Proposta Comercial — Detecção de Fraude em Tempo Real com Kafka, Databricks e Azure

**Cliente:** Escudo Auto Seguros
**Segmento:** Seguros
**Área responsável:** AI & Automation · **Dono da proposta:** Karina Duarte
**Data:** 2024-11-23 · **Versão:** final

## 1. Contexto e desafio

A Escudo Auto Seguros processa cerca de 1,2 milhão de sinistros por ano e enfrenta um índice de fraude estimado em 12%, gerando perdas anuais superiores a R$ 180 milhões. O processo atual de detecção é manual e baseado em regras estáticas, com tempo médio de análise de 5 dias, o que atrasa pagamentos legítimos e permite que fraudes passem despercebidas.

## 3. Escopo da solução

- Ingestão de dados de sinistros e interações em tempo real via Apache Kafka
- Construção de pipeline de dados e feature engineering no Databricks (Delta Lake)
- Desenvolvimento de modelos de ML para scoring de fraude em tempo real
- Integração com Azure (Event Hubs, Data Lake, Synapse) para armazenamento e processamento
- Dashboard de monitoramento de fraudes e alertas para a equipe de análise

Tecnologias principais: Kafka, Databricks, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e Design (4 semanas)
- Desenvolvimento de Pipeline e Modelo (10 semanas)
- Integração e Testes (6 semanas)
- Deploy e Treinamento (4 semanas)

## 5. Entregáveis

- Pipeline de ingestão Kafka configurado para 10 mil eventos/segundo
- Modelo de ML treinado e validado com AUC > 0,85
- API de scoring em tempo real integrada ao sistema de sinistros
- Dashboard de monitoramento com indicadores de fraude e performance do modelo
- Documentação técnica e treinamento para equipe interna

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade dos dados históricos de sinistros
- Risco: Resistência à mudança por parte da equipe de análise
- Risco: Latência na integração com sistemas legados

## 8. Investimento

Investimento total: R$ 970.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 29%.
