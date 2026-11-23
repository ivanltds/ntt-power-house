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
id: P257-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2026-08-05
---

# Transcrição — Kickoff Livrarias Página Viva

Transcrição automática, sem revisão.

[00:05] Eduarda Prado: Bom dia. Este é o kickoff de Precificação Dinâmica com Ciência de Dados no Varejo Livreiro. Vamos alinhar objetivo, fases e riscos.

[00:51] Renata Vasconcelos: O ponto principal para nós: A Livrarias Página Viva opera 87 lojas físicas e um e-commerce que responde por 32% da receita, mas pratica hoje uma política de preços estática revisada apenas uma vez por trimestre. Com cerca de 45 mil SKUs ativos, a defasagem de preços frente à concorrência e à demanda sazonal tem corroído a margem bruta em 2,8 pontos percentuais nos últimos 12 meses.

[01:50] Eduarda Prado: O objetivo combinado foi: Implantar um motor de precificação dinâmica baseado em machine learning que ajuste preços por SKU, canal e região em ciclos diários, elevando a margem bruta e mantendo a competitividade.

[02:57] Bruno Tavares: Do lado técnico vamos usar Databricks, GCP. O primeiro passo é ingestão e tratamento de dados históricos de vendas, estoque e concorrência no databricks sobre gcp (bigquery e cloud storage).

[03:42] Renata Vasconcelos: Quais riscos vocês já enxergam?

[04:48] Bruno Tavares: Os principais são qualidade e cobertura dos dados históricos de concorrência; baixa adesão das equipes de categoria às recomendações de preço; latência na integração diária com o erp legado.

[05:33] Eduarda Prado: Fechado. Mando a ata com os próximos passos ainda hoje.
