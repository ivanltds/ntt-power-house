---
projeto_id: P139
cliente: Eletro Mais
titulo: Predição de churn e retenção para o varejo
segmento: Varejo
tecnologias: ["Databricks","AWS","Salesforce","Python"]
servicos: ["Analytics & BI","CRM","Data Science / ML"]
area: Data & Analytics
dono: Eduarda Prado
confidencialidade: interna
status_proposta: Em negociação
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P139
id: P139-PROPV1
tipo_documental: proposta_comercial
status_documento: rascunho
data: 2026-08-16
prazo_meses: 5
valor: 620000
margem: 0.25
---

# Proposta Comercial — Predição de churn e retenção para o varejo (versão 1, rascunho)

**Cliente:** Eletro Mais
**Segmento:** Varejo
**Área responsável:** Data & Analytics · **Dono da proposta:** Eduarda Prado
**Data:** 2026-08-16 · **Versão:** 1 (rascunho)

## 1. Contexto e desafio

A Eletro Mais, varejista com 4,2 milhões de clientes cadastrados no programa de fidelidade, enfrenta taxa de churn anual de 27% na base ativa e perde cerca de R$ 18 milhões por ano em receita recorrente. A empresa não consegue identificar os clientes com maior propensão a abandonar a marca antes que a evasão aconteça, e as ações de retenção são hoje genéricas e sem priorização.

## 2. Objetivo

Construir um modelo de predição de churn e uma esteira de ações de retenção priorizadas, aumentando a taxa de retenção da base ativa em pelo menos 8 pontos percentuais em 12 meses.

## 3. Escopo da solução

- Modelagem de propensão a churn em Databricks com features de comportamento de compra, recência e engajamento no programa de fidelidade
- Pipeline de ingestão e tratamento de dados na AWS (S3, Glue e EMR) com orquestração de jobs em Python
- Desenvolvimento e validação de modelos de machine learning em Python (scikit-learn e MLflow) com explicabilidade das variáveis
- Integração dos scores de churn ao Salesforce CRM para acionamento automático de campanhas de retenção
- Dashboards de acompanhamento de churn, coortes e efetividade das ações em Analytics & BI
- 

Tecnologias principais: Databricks, AWS, Salesforce, Python.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico de dados e definição de indicadores (3 semanas)
- Engenharia de dados e feature store (4 semanas)
- Modelagem de churn e validação (3 semanas)
- Integração com CRM e dashboards (2 semanas)

## 5. Entregáveis

- Modelo de churn treinado e validado com AUC superior a 0,80 e documentação de variáveis
- Pipeline de dados automatizado na AWS e Databricks com monitoramento de qualidade
- Scores de propensão integrados ao Salesforce CRM e regras de priorização de ofertas de retenção
- Painéis de BI com indicadores de churn, retenção e ROI das campanhas
- Relatório de recomendação de próximos passos e plano de evolução do modelo

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados, 1 consultor de CRM e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e completude dos dados históricos de compra e engajamento
- Risco: Baixa adoção das ações de retenção pelas equipes de loja e CRM
- Risco: Prazo curto de 3 meses para integração com o Salesforce

## 8. Investimento

Investimento total: R$ 620.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 25%.
