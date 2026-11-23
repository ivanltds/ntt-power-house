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
id: P454-SOW
tipo_documental: sow
status_documento: assinado
data: 2026-11-21
prazo_meses: 5
valor: 1440000
---

# SOW — Precificação Dinâmica com Machine Learning em Databricks e GCP

**Contratante:** Moda Leve Store · **Contratada:** NTT DATA Brasil · **Vigência:** 5 meses a partir do kickoff

## 1. Objeto

Implantar um motor de precificação dinâmica baseado em Machine Learning na Databricks sobre GCP, capaz de recalcular preços diariamente por SKU e loja, integrado ao e-commerce e ao sistema de PDV, aumentando a margem das categorias sazonais.

## 2. Escopo contratado

- Construção de data lakehouse no Databricks sobre GCP (BigQuery e Cloud Storage) com ingestão diária de dados de vendas, estoque, concorrência e clima
- Desenvolvimento de modelos de elasticidade-preço e otimização de receita em Python e MLflow, com retreino semanal
- Pipeline de features e scoring em Databricks Workflows para gerar recomendações de preço por SKU e loja em até 4 horas
- API de publicação de preços em Python integrada ao e-commerce e ao sistema de PDV das 320 lojas
- Dashboards de Analytics & BI em Databricks SQL para acompanhamento de margem, aderência às recomendações e elasticidade por categoria

## 3. Entregáveis e aceite

- Data lakehouse de precificação operacional com 18 meses de histórico tratado
- Modelo de elasticidade-preço validado em 3 categorias piloto (vestuário, calçados e acessórios)
- Motor de recomendação de preços em produção com scoring diário
- API de preços integrada ao e-commerce e ao PDV com SLA de 99,5%
- Painel executivo de Analytics & BI com KPIs de margem e aderência

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 1.440.000, faturado mensalmente conforme o cronograma.
