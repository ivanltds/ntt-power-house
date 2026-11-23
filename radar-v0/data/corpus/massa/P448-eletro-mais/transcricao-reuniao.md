---
projeto_id: P448
cliente: Eletro Mais
titulo: Previsão de Demanda e Reposição Automatizada para Rede Varejista
segmento: Varejo
tecnologias: ["Machine Learning","Snowflake","Databricks"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: André Vasconcelos
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P448
id: P448-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2026-04-27
---

# Transcrição — Kickoff Eletro Mais

Transcrição automática, sem revisão.

[00:05] André Vasconcelos: Bom dia. Este é o kickoff de Previsão de Demanda e Reposição Automatizada para Rede Varejista. Vamos alinhar objetivo, fases e riscos.

[00:54] Renata Vasconcelos: O ponto principal para nós: A Eletro Mais opera 78 lojas e cerca de 4.200 SKUs ativos, com ruptura média de 11,3% nas categorias de maior giro e excesso de estoque em 18% dos itens de baixa rotação. A reposição é feita hoje por planilhas e regras manuais, gerando 23 mil ajustes de pedido por mês e perda estimada de R$ 6,8 milhões anuais em vendas não realizadas.

[01:33] André Vasconcelos: O objetivo combinado foi: Implantar um motor de previsão de demanda e reposição automatizada, integrado ao ERP e ao WMS, para reduzir ruptura e excesso de estoque com previsões por loja e SKU em horizonte semanal.

[02:41] Bruno Tavares: Do lado técnico vamos usar Machine Learning, Snowflake, Databricks. O primeiro passo é construção de pipeline de engenharia de dados no databricks para ingestão de histórico de vendas, estoque, promoções e sazonalidade de 36 meses.

[04:07] Renata Vasconcelos: Quais riscos vocês já enxergam?

[05:13] Bruno Tavares: Os principais são qualidade e dispersão do histórico de vendas e estoque entre lojas e erp; baixa adesão dos compradores às sugestões automáticas de reposição; atraso na liberação de acessos e integrações com o erp e o wms do cliente.

[06:42] André Vasconcelos: Fechado. Mando a ata com os próximos passos ainda hoje.
