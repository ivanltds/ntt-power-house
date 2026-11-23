---
projeto_id: P454
cliente: Moda Leve Store
titulo: Precificação Dinâmica com Machine Learning em Databricks e GCP
segmento: Varejo
tecnologias: ["Databricks","GCP","Python","Machine Learning"]
servicos: ["Analytics & BI"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P454
id: P454-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-10-27
prazo_meses: 5
valor: 1440000
margem: 0.18
---

# Proposta Comercial — Precificação Dinâmica com Machine Learning em Databricks e GCP

**Cliente:** Moda Leve Store
**Segmento:** Varejo
**Área responsável:** Data & Analytics · **Dono da proposta:** Henrique Matos
**Data:** 2026-10-27 · **Versão:** final

## 1. Contexto e desafio

A Moda Leve Store opera 320 lojas físicas e um e-commerce que responde por 18% da receita, mas pratica preços definidos manualmente por regional, com revisões semanais que demoram até 6 dias para chegar ao PDV. Isso gera perda estimada de 4,2 pontos de margem em categorias sazonais e cerca de 12% de estoque encalhado no fim de cada coleção.

## 2. Objetivo

Implantar um motor de precificação dinâmica baseado em Machine Learning na Databricks sobre GCP, capaz de recalcular preços diariamente por SKU e loja, integrado ao e-commerce e ao sistema de PDV, aumentando a margem das categorias sazonais.

## 3. Escopo da solução

- Construção de data lakehouse no Databricks sobre GCP (BigQuery e Cloud Storage) com ingestão diária de dados de vendas, estoque, concorrência e clima
- Desenvolvimento de modelos de elasticidade-preço e otimização de receita em Python e MLflow, com retreino semanal
- Pipeline de features e scoring em Databricks Workflows para gerar recomendações de preço por SKU e loja em até 4 horas
- API de publicação de preços em Python integrada ao e-commerce e ao sistema de PDV das 320 lojas
- Dashboards de Analytics & BI em Databricks SQL para acompanhamento de margem, aderência às recomendações e elasticidade por categoria

Tecnologias principais: Databricks, GCP, Python, Machine Learning.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Discovery e diagnóstico de dados (5 semanas)
- Construção do lakehouse e engenharia de features (7 semanas)
- Modelagem de elasticidade e otimização de preços (6 semanas)
- Integração, piloto em 60 lojas e go-live (4 semanas)

## 5. Entregáveis

- Data lakehouse de precificação operacional com 18 meses de histórico tratado
- Modelo de elasticidade-preço validado em 3 categorias piloto (vestuário, calçados e acessórios)
- Motor de recomendação de preços em produção com scoring diário
- API de preços integrada ao e-commerce e ao PDV com SLA de 99,5%
- Painel executivo de Analytics & BI com KPIs de margem e aderência

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e cobertura dos dados históricos de preço e estoque por loja
- Risco: Baixa aderência dos gerentes regionais às recomendações automáticas
- Risco: Latência na integração com o sistema de PDV legado das 320 lojas

## 8. Investimento

Investimento total: R$ 1.440.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 18%.
