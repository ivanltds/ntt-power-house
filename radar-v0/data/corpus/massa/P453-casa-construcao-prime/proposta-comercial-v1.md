---
projeto_id: P453
cliente: Casa & Construção Prime
titulo: Motor de precificação dinâmica para rede varejista de materiais de construção
segmento: Varejo
tecnologias: ["GCP","Databricks"]
servicos: ["Data Science / ML"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P453
id: P453-PROPV1
tipo_documental: proposta_comercial
status_documento: rascunho
data: 2025-03-22
prazo_meses: 6
valor: 890000
margem: 0.23
---

# Proposta Comercial — Motor de precificação dinâmica para rede varejista de materiais de construção (versão 1, rascunho)

**Cliente:** Casa & Construção Prime
**Segmento:** Varejo
**Área responsável:** Data & Analytics · **Dono da proposta:** Henrique Matos
**Data:** 2025-03-22 · **Versão:** 1 (rascunho)

## 1. Contexto e desafio

A Casa & Construção Prime opera 38 lojas e um e-commerce com cerca de 12 mil SKUs ativos, e hoje revisa preços de forma manual e semanal, o que gera margens inconsistentes entre regiões e perda estimada de 3,5 pontos percentuais em categorias de alta concorrência. A base de vendas históricas e de preços de concorrentes já existe em Databricks, mas não há modelo de elasticidade nem rotina automatizada de ajuste.

## 2. Objetivo

Implantar um motor de precificação dinâmica em GCP e Databricks que recomende preços por SKU, loja e canal, com atualização diária e ganho projetado de 2 a 3 pontos de margem nas categorias piloto.

## 3. Escopo da solução

- Modelagem de elasticidade-preço por SKU e região a partir do histórico de vendas no Databricks, com features de sazonalidade e preços de concorrentes
- Pipeline de ingestão e orquestração no GCP (Cloud Storage, Dataflow e BigQuery) para dados de PDV, e-commerce e coleta de preços concorrentes
- Treinamento e validação de modelos de ML no Databricks MLflow com backtesting em 18 meses de histórico
- Camada de recomendação de preços com regras de guarda-corpo de margem mínima e aprovação humana para variações acima de 8%
- Dashboard de acompanhamento de margem e aderência às recomendações para as áreas de categoria e pricing

Tecnologias principais: GCP, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e desenho da arquitetura (4 semanas)
- Engenharia de dados e feature store (5 semanas)
- Modelagem e backtesting (5 semanas)
- Piloto em produção e transferência de conhecimento (2 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e ML em GCP e Databricks
- Modelo de elasticidade-preço validado para 3 categorias piloto (cerca de 1.800 SKUs)
- Pipeline automatizado de ingestão e scoring diário em produção
- Painel de margem e aderência com visão por loja, canal e categoria
- Relatório de resultados do piloto com ganho de margem medido e plano de expansão para as demais categorias

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados sênior, 1 analista de ML e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e cobertura dos dados históricos de preço e concorrência
- Risco: Baixa adesão das áreas de categoria às recomendações do modelo
- Risco: Restrições de custo e governança no ambiente GCP do cliente

## 8. Investimento

Investimento total: R$ 890.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 23%.
