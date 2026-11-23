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
id: P454-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-10-30
prazo_meses: 5
---

# Apresentação Comercial — Moda Leve Store

## Slide 1 — Precificação Dinâmica com Machine Learning em Databricks e GCP

Moda Leve Store · Varejo

## Slide 2 — O desafio

A Moda Leve Store opera 320 lojas físicas e um e-commerce que responde por 18% da receita, mas pratica preços definidos manualmente por regional, com revisões semanais que demoram até 6 dias para chegar ao PDV. Isso gera perda estimada de 4,2 pontos de margem em categorias sazonais e cerca de 12% de estoque encalhado no fim de cada coleção.

## Slide 3 — Nossa proposta

Implantar um motor de precificação dinâmica baseado em Machine Learning na Databricks sobre GCP, capaz de recalcular preços diariamente por SKU e loja, integrado ao e-commerce e ao sistema de PDV, aumentando a margem das categorias sazonais.

## Slide 4 — Arquitetura e tecnologias

Databricks · GCP · Python · Machine Learning

- Construção de data lakehouse no Databricks sobre GCP (BigQuery e Cloud Storage) com ingestão diária de dados de vendas, estoque, concorrência e clima
- Desenvolvimento de modelos de elasticidade-preço e otimização de receita em Python e MLflow, com retreino semanal
- Pipeline de features e scoring em Databricks Workflows para gerar recomendações de preço por SKU e loja em até 4 horas

## Slide 5 — Como vamos trabalhar

- Discovery e diagnóstico de dados (5 semanas)
- Construção do lakehouse e engenharia de features (7 semanas)
- Modelagem de elasticidade e otimização de preços (6 semanas)
- Integração, piloto em 60 lojas e go-live (4 semanas)

Duração total: 5 meses.

## Slide 6 — Por que nós

Experiência em Analytics & BI, com projeto anterior entregue para a Moda Leve Store. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados, 1 analista de BI e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Diretora de Pricing e Receita) e agendar o kickoff.
