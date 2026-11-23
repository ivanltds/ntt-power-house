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
id: P453-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2025-04-15
prazo_meses: 4
---

# Apresentação Comercial — Casa & Construção Prime

## Slide 1 — Motor de precificação dinâmica para rede varejista de materiais de construção

Casa & Construção Prime · Varejo

## Slide 2 — O desafio

A Casa & Construção Prime opera 38 lojas e um e-commerce com cerca de 12 mil SKUs ativos, e hoje revisa preços de forma manual e semanal, o que gera margens inconsistentes entre regiões e perda estimada de 3,5 pontos percentuais em categorias de alta concorrência. A base de vendas históricas e de preços de concorrentes já existe em Databricks, mas não há modelo de elasticidade nem rotina automatizada de ajuste.

## Slide 3 — Nossa proposta

Implantar um motor de precificação dinâmica em GCP e Databricks que recomende preços por SKU, loja e canal, com atualização diária e ganho projetado de 2 a 3 pontos de margem nas categorias piloto.

## Slide 4 — Arquitetura e tecnologias

GCP · Databricks

- Modelagem de elasticidade-preço por SKU e região a partir do histórico de vendas no Databricks, com features de sazonalidade e preços de concorrentes
- Pipeline de ingestão e orquestração no GCP (Cloud Storage, Dataflow e BigQuery) para dados de PDV, e-commerce e coleta de preços concorrentes
- Treinamento e validação de modelos de ML no Databricks MLflow com backtesting em 18 meses de histórico

## Slide 5 — Como vamos trabalhar

- Diagnóstico e desenho da arquitetura (4 semanas)
- Engenharia de dados e feature store (5 semanas)
- Modelagem e backtesting (5 semanas)
- Piloto em produção e transferência de conhecimento (2 semanas)

Duração total: 4 meses.

## Slide 6 — Por que nós

Experiência em Data Science / ML, com projeto anterior entregue para a Casa & Construção Prime. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados sênior, 1 analista de ML e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Gerente de Pricing e Categoria) e agendar o kickoff.
