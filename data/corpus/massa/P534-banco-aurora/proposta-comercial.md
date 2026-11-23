---
projeto_id: P534
cliente: Banco Aurora
titulo: Detecção de Fraude em Tempo Real com Machine Learning no Open Finance
segmento: Serviços Financeiros
tecnologias: ["Python","Databricks","Azure"]
servicos: ["Data Science / ML","Engenharia de Dados","Change Management"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P534
id: P534-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-02-09
prazo_meses: 6
valor: 1890000
margem: 0.24
---

# Proposta Comercial — Detecção de Fraude em Tempo Real com Machine Learning no Open Finance

**Cliente:** Banco Aurora
**Segmento:** Serviços Financeiros
**Área responsável:** AI & Automation · **Dono da proposta:** Bruno Tavares
**Data:** 2026-02-09 · **Versão:** final

## 1. Contexto e desafio

O Banco Aurora registrou R$ 187 milhões em perdas por fraude em 2024, com 42% dos casos envolvendo transações PIX acima de R$ 5 mil detectadas apenas após a liquidação. A esteira atual de análise manual cobre somente 18% das transações suspeitas em menos de 15 minutos, gerando chargebacks e impacto regulatório.

## 2. Objetivo

Implantar um motor de detecção de fraude em tempo real com modelos de machine learning sobre Databricks no Azure, reduzindo a latência de detecção para menos de 2 segundos e ampliando a cobertura automatizada para 85% das transações de alto risco em 6 meses.

## 3. Escopo da solução

- Ingestão em streaming de transações PIX e cartões via Azure Event Hubs com pipelines em Python e Databricks Structured Streaming
- Construção de feature store e engenharia de atributos comportamentais no Databricks Delta Lake sobre Azure Data Lake Storage
- Treinamento e validação de modelos supervisionados de detecção de fraude em Python (scikit-learn e MLflow) com explicabilidade por SHAP
- Orquestração de scoring em tempo real no Databricks com deploy em Azure Kubernetes Service e monitoramento de drift
- Programa de Change Management para 120 analistas de risco e definição de playbook de investigação assistida por alertas

Tecnologias principais: Python, Databricks, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e desenho da arquitetura (5 semanas)
- Engenharia de dados e feature store (7 semanas)
- Modelagem, validação e integração em tempo real (8 semanas)
- Piloto assistido e change management (6 semanas)

## 5. Entregáveis

- Motor de scoring de fraude em tempo real operando em ambiente Azure com SLA de 2 segundos
- Data lake governado com 38 features comportamentais documentadas e catálogo de dados
- Modelos de ML treinados com AUC superior a 0,92 e relatório de validação independente
- Dashboard executivo de KPIs de fraude e painel operacional de alertas para analistas
- Plano de change management com treinamentos, materiais e métricas de adoção para 120 usuários

## 6. Equipe proposta

1 arquiteto de soluções, 1 gerente de projeto, 2 engenheiros de dados, 2 cientistas de dados e 1 especialista em change management..

## 7. Premissas e riscos

- Risco: Baixa qualidade e atraso na liberação dos dados históricos de transações
- Risco: Restrições de LGPD na utilização de dados de clientes para treinamento
- Risco: Resistência dos analistas de risco à adoção do novo fluxo assistido por alertas

## 8. Investimento

Investimento total: R$ 1.890.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 24%.
