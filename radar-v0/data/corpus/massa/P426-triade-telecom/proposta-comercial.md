---
projeto_id: P426
cliente: Tríade Telecom
titulo: Predição de churn e retenção para base de 1,2 milhão de assinantes
segmento: Telecom
tecnologias: ["Python","Machine Learning"]
servicos: ["Data Science / ML"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: confidencial
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P426
id: P426-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2024-12-14
prazo_meses: 3
valor: 1690000
margem: 0.19
---

# Proposta Comercial — Predição de churn e retenção para base de 1,2 milhão de assinantes

**Cliente:** Tríade Telecom
**Segmento:** Telecom
**Área responsável:** Data & Analytics · **Dono da proposta:** Henrique Matos
**Data:** 2024-12-14 · **Versão:** final

## 1. Contexto e desafio

A Tríade Telecom perde cerca de 2,4% da base móvel pós-paga por mês, o equivalente a aproximadamente 28 mil linhas, com custo de aquisição de R$ 180 por cliente. A retenção hoje é reativa, sem modelo preditivo que identifique assinantes com risco de cancelamento nas próximas janelas de renovação.

## 2. Objetivo

Construir um modelo de Machine Learning em Python que estime a probabilidade de churn por assinante com antecedência de 60 dias, priorizando as ações de retenção da equipe de CRM.

## 3. Escopo da solução

- Análise exploratória e engenharia de features sobre 18 meses de histórico de uso, recarga, reclamações e atendimento
- Desenvolvimento de modelos de classificação em Python (scikit-learn e XGBoost) com validação temporal e meta de AUC acima de 0,78
- Segmentação da base em faixas de risco e construção de matriz de propensão com regras de acionamento para retenção
- Painel de monitoramento de performance do modelo e deriva de dados, com reavaliação mensal
- Documentação técnica e transferência de conhecimento para o time de Data & Analytics da Tríade Telecom

Tecnologias principais: Python, Machine Learning.

## 4. Abordagem e cronograma

O projeto será executado em 3 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (4 semanas)
- Modelagem e validação (5 semanas)
- Operacionalização e handover (3 semanas)

## 5. Entregáveis

- Relatório de diagnóstico de dados e dicionário de features do modelo de churn
- Modelo de propensão a churn em Python versionado, com AUC e lift reportados por segmento
- Lista mensal de assinantes priorizados por risco e valor esperado para a operação de retenção
- Painel de acompanhamento de métricas do modelo e das taxas de retenção pós-acionamento
- Workshop de handover e documentação de reprodutibilidade do pipeline

## 6. Equipe proposta

1 cientista de dados sênior, 1 engenheiro de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e dispersão dos dados de uso entre sistemas legados
- Risco: Baixa adesão da área de retenção às listas priorizadas
- Risco: Prazo de 3 meses curto para validação em produção

## 8. Investimento

Investimento total: R$ 1.690.000, em parcelas mensais ao longo de 3 meses.

Margem praticada: 19%.
