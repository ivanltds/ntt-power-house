---
projeto_id: P475
cliente: Proteja Seguros
titulo: Motor de detecção de fraude em seguros com ML em tempo quase real
segmento: Seguros
tecnologias: ["Databricks","Azure","Kafka","Python"]
servicos: ["Data Science / ML"]
area: AI & Automation
dono: Vinícius Batista
confidencialidade: interna
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P475
id: P475-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-10-14
prazo_meses: 8
valor: 1180000
margem: 0.24
---

# Proposta Comercial — Motor de detecção de fraude em seguros com ML em tempo quase real

**Cliente:** Proteja Seguros
**Segmento:** Seguros
**Área responsável:** AI & Automation · **Dono da proposta:** Vinícius Batista
**Data:** 2026-10-14 · **Versão:** final

## 1. Contexto e desafio

A Proteja Seguros processa cerca de 1,2 milhão de sinistros por ano e identifica apenas 38% das fraude por meio de regras manuais, com índice de falso positivo de 27% e tempo médio de análise de 6 dias. O crescimento de 18% na carteira de automóvel e residencial nos últimos 12 meses pressiona a área de sinistros, que hoje dedica 45% do esforço operacional à triagem de casos suspeitos.

## 2. Objetivo

Implantar um motor de detecção de fraude baseado em machine learning, com score de risco em tempo quase real na abertura do sinistro, reduzindo falsos positivos e o tempo de triagem.

## 3. Escopo da solução

- Ingestão de eventos de sinistros e dados cadastrais via Kafka, com streaming no Azure Event Hubs
- Camada analítica e feature store no Databricks sobre Azure Data Lake Storage
- Treinamento e versionamento de modelos supervisionados de score de fraude em Python (MLflow e scikit-learn)
- API de scoring em tempo quase real integrada ao sistema de abertura de sinistro
- Painéis de monitoramento de performance do modelo e regras de alerta para a equipe de sinistros

Tecnologias principais: Databricks, Azure, Kafka, Python.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Diagnóstico e arquitetura (6 semanas)
- Engenharia de dados e features (10 semanas)
- Modelagem e validação (10 semanas)
- Implantação e transferência (6 semanas)

## 5. Entregáveis

- Documento de arquitetura de referência e plano de governança de dados
- Pipeline de ingestão e engenharia de features em Databricks com 120 features derivadas
- Modelo inicial de score de fraude com AUC >= 0,82 e lift de 3x na base de validação
- API de scoring implantada em Azure com latência p95 inferior a 400 ms
- Relatório de avaliação, playbook de retraining e treinamento de 15 analistas de sinistros

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados, 1 especialista em MLOps e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e dispersão dos dados históricos de sinistros
- Risco: Baixa adoção do score pela equipe de triagem
- Risco: Latência e estabilidade da integração em tempo quase real

## 8. Investimento

Investimento total: R$ 1.180.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 24%.
