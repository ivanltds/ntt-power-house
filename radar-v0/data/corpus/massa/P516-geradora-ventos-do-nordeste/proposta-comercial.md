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
id: P516-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-07-16
prazo_meses: 8
valor: 6000000
margem: 0.29
---

# Proposta Comercial — Streaming de dados em tempo real para operação e manutenção de parques eólicos

**Cliente:** Geradora Ventos do Nordeste
**Segmento:** Utilities / Energia
**Área responsável:** Data & Analytics · **Dono da proposta:** Nelson Barbosa
**Data:** 2026-07-16 · **Versão:** final

## 1. Contexto e desafio

A Geradora Ventos do Nordeste opera 12 parques eólicos com 480 aerogeradores e enfrenta latência de até 4 horas na consolidação de dados de sensores, dificultando a detecção de anomalias e a manutenção preditiva. A empresa precisa processar 2,5 TB/dia de telemetria em tempo real para reduzir paradas não planejadas, que hoje representam 8% da geração.

## 2. Objetivo

Implantar uma plataforma de streaming de dados na Azure com Kafka para ingestão e processamento em tempo real, permitindo analytics operacional e manutenção preditiva com latência inferior a 5 segundos.

## 3. Escopo da solução

- Configuração de cluster Kafka na Azure (HDInsight ou Confluent Cloud) para ingestão de telemetria de 480 aerogeradores
- Desenvolvimento de pipelines de streaming com Azure Stream Analytics e Kafka Streams para cálculo de KPIs em tempo real
- Integração com Azure Data Lake Storage Gen2 para armazenamento de dados brutos e processados
- Implementação de dashboards em Power BI conectados ao Azure Synapse Analytics para monitoramento operacional
- Modelos de machine learning para detecção de anomalias e manutenção preditiva usando Azure Machine Learning

Tecnologias principais: Kafka, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Discovery e arquitetura (6 semanas)
- Implementação da plataforma de streaming (12 semanas)
- Analytics e modelos preditivos (10 semanas)
- Go-live e estabilização (4 semanas)

## 5. Entregáveis

- Plataforma de streaming Kafka implantada e operacional na Azure
- Pipelines de ingestão e processamento em tempo real validados com latência < 5 segundos
- Dashboards de monitoramento operacional e de manutenção preditiva entregues
- Modelo de detecção de anomalias treinado e integrado ao fluxo de alertas
- Documentação técnica e transferência de conhecimento para a equipe do cliente

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Volume e velocidade dos dados podem exigir ajustes no dimensionamento do cluster Kafka
- Risco: Integração com sistemas legados de SCADA pode apresentar incompatibilidades de protocolo
- Risco: Disponibilidade de dados históricos para treinamento dos modelos preditivos

## 8. Investimento

Investimento total: R$ 6.000.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 29%.
