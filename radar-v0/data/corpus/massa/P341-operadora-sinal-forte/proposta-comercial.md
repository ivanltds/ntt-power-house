---
projeto_id: P341
cliente: Operadora Sinal Forte
titulo: Predição de churn e retenção com Machine Learning para base pré-paga
segmento: Telecom
tecnologias: ["Machine Learning","AWS","Python"]
servicos: ["Data Science / ML"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P341
id: P341-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-06-01
prazo_meses: 3
valor: 1220000
margem: 0.23
---

# Proposta Comercial — Predição de churn e retenção com Machine Learning para base pré-paga

**Cliente:** Operadora Sinal Forte
**Segmento:** Telecom
**Área responsável:** Data & Analytics · **Dono da proposta:** Henrique Matos
**Data:** 2026-06-01 · **Versão:** final

## 1. Contexto e desafio

A Operadora Sinal Forte enfrenta churn mensal de 3,8% na base pré-paga, o que representa cerca de 420 mil linhas perdidas por ano e impacto estimado de R$ 28 milhões em receita. O time de retenção atua de forma reativa, sem modelo preditivo para priorizar os clientes com maior propensão ao cancelamento.

## 2. Objetivo

Construir um modelo de Machine Learning em AWS para prever churn com pelo menos 60 dias de antecedência e apoiar campanhas de retenção segmentadas por propensão.

## 3. Escopo da solução

- Análise exploratória e engenharia de features sobre dados de recarga, uso de voz/dados e reclamações em Python
- Desenvolvimento e validação de modelos de classificação de churn com Machine Learning, comparando pelo menos 3 algoritmos
- Implantação do pipeline de treino e scoring em AWS (SageMaker e S3) com execução mensal automatizada
- Definição de faixas de propensão e integração do scoring ao processo de retenção do cliente
- Painel de monitoramento de performance do modelo (AUC, lift) e das taxas de retenção por faixa

Tecnologias principais: Machine Learning, AWS, Python.

## 4. Abordagem e cronograma

O projeto será executado em 3 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (4 semanas)
- Modelagem e validação (5 semanas)
- Implantação em AWS e integração (3 semanas)

## 5. Entregáveis

- Relatório de diagnóstico de dados e dicionário de features
- Modelo de churn treinado e validado com AUC mínima de 0,75
- Pipeline de scoring em AWS documentado e automatizado
- Lista mensal de clientes priorizados por propensão ao churn
- Painel de acompanhamento de KPIs de retenção e performance do modelo

## 6. Equipe proposta

1 gerente de projeto, 1 cientista de dados sênior, 1 engenheiro de ML e 1 analista de dados.

## 7. Premissas e riscos

- Risco: Qualidade e cobertura histórica dos dados de recarga e reclamações
- Risco: Baixa adesão das áreas de retenção ao scoring gerado
- Risco: Restrições de tempo para implantação e validação em produção em 12 semanas

## 8. Investimento

Investimento total: R$ 1.220.000, em parcelas mensais ao longo de 3 meses.

Margem praticada: 23%.
