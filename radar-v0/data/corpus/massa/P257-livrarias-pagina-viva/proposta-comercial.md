---
projeto_id: P257
cliente: Livrarias Página Viva
titulo: Precificação Dinâmica com Ciência de Dados no Varejo Livreiro
segmento: Varejo
tecnologias: ["Databricks","GCP"]
servicos: ["Data Science / ML","Analytics & BI"]
area: Data & Analytics
dono: Eduarda Prado
confidencialidade: confidencial
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P257
id: P257-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-07-06
prazo_meses: 4
valor: 1140000
margem: 0.23
---

# Proposta Comercial — Precificação Dinâmica com Ciência de Dados no Varejo Livreiro

**Cliente:** Livrarias Página Viva
**Segmento:** Varejo
**Área responsável:** Data & Analytics · **Dono da proposta:** Eduarda Prado
**Data:** 2026-07-06 · **Versão:** final

## 1. Contexto e desafio

A Livrarias Página Viva opera 87 lojas físicas e um e-commerce que responde por 32% da receita, mas pratica hoje uma política de preços estática revisada apenas uma vez por trimestre. Com cerca de 45 mil SKUs ativos, a defasagem de preços frente à concorrência e à demanda sazonal tem corroído a margem bruta em 2,8 pontos percentuais nos últimos 12 meses.

## 2. Objetivo

Implantar um motor de precificação dinâmica baseado em machine learning que ajuste preços por SKU, canal e região em ciclos diários, elevando a margem bruta e mantendo a competitividade.

## 3. Escopo da solução

- Ingestão e tratamento de dados históricos de vendas, estoque e concorrência no Databricks sobre GCP (BigQuery e Cloud Storage)
- Construção de modelo de elasticidade-preço e otimização de margem por SKU com Data Science / ML em MLflow no Databricks
- Pipeline de features e retraining automatizado com Delta Lake e Databricks Workflows
- Dashboards de acompanhamento de margem, volume e aderência de preços em Analytics & BI (Power BI conectado ao Databricks SQL)
- Definição de regras de guardrails de preço (pisos, tetos e aprovações por categoria) integradas ao ERP da livraria

Tecnologias principais: Databricks, GCP.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Discovery e preparação de dados (4 semanas)
- Modelagem de elasticidade e otimização (6 semanas)
- Piloto em 20 lojas e integração ao ERP (4 semanas)
- Rollout e capacitação (2 semanas)

## 5. Entregáveis

- Modelo de precificação dinâmica validado em backtest com ganho projetado de margem de 1,5 a 2,2 p.p.
- Pipeline de dados orquestrado no Databricks com atualização diária de preços para 45 mil SKUs
- Painel de Analytics & BI com visão por loja, canal e categoria para 120 usuários
- Documentação de guardrails de preço e playbook de operação do motor
- Relatório executivo de resultados do piloto em 20 lojas e roadmap de expansão

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e cobertura dos dados históricos de concorrência
- Risco: Baixa adesão das equipes de categoria às recomendações de preço
- Risco: Latência na integração diária com o ERP legado

## 8. Investimento

Investimento total: R$ 1.140.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 23%.
