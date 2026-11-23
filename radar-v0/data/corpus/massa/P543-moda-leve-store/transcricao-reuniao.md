---
projeto_id: P543
cliente: Moda Leve Store
titulo: Precificação dinâmica com Databricks e GCP para rede de varejo de moda
segmento: Varejo
tecnologias: ["Databricks","GCP"]
servicos: ["Data Science / ML","Analytics & BI"]
area: Data & Analytics
dono: Eduarda Prado
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P543
id: P543-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2026-07-10
---

# Transcrição — Kickoff Moda Leve Store

Transcrição automática, sem revisão.

[00:05] Eduarda Prado: Bom dia. Este é o kickoff de Precificação dinâmica com Databricks e GCP para rede de varejo de moda. Vamos alinhar objetivo, fases e riscos.

[01:00] Renata Vasconcelos: O ponto principal para nós: A Moda Leve Store opera 78 lojas físicas e um e-commerce que representa 22% da receita, mas pratica preços definidos manualmente por regional, com defasagem média de 9 dias frente à concorrência. Isso gera perda estimada de 4,5 pontos de margem em coleções sazonais e remanescentes de estoque acima de 18% ao fim de cada ciclo.

[02:30] Eduarda Prado: O objetivo combinado foi: Implantar um motor de precificação dinâmica baseado em demanda, elasticidade e estoque, integrado aos canais de venda, para elevar a margem bruta em 2,8 pontos e reduzir remanescentes em 25% no ciclo de 6 meses.

[04:02] Felipe Andrade: Do lado técnico vamos usar Databricks, GCP. O primeiro passo é ingestão de dados transacionais de vendas, estoque e concorrência no databricks sobre gcp (bigquery e cloud storage).

[04:37] Renata Vasconcelos: Quais riscos vocês já enxergam?

[05:43] Felipe Andrade: Os principais são qualidade e atraso na entrega dos dados históricos de concorrência; resistência dos gerentes regionais à autonomia do motor de preços; latência de integração com o erp legado.

[06:31] Eduarda Prado: Fechado. Mando a ata com os próximos passos ainda hoje.
