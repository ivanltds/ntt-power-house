---
projeto_id: P363
cliente: Casa & Construção Prime
titulo: Detecção de Fraude em Transações no Varejo de Materiais de Construção
segmento: Varejo
tecnologias: ["Azure","Python","Databricks"]
servicos: ["Data Science / ML","Engenharia de Dados"]
area: AI & Automation
dono: Paulo Henrique Dias
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P363
id: P363-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2026-08-08
---

# Transcrição — Kickoff Casa & Construção Prime

Transcrição automática, sem revisão.

[00:05] Paulo Henrique Dias: Bom dia. Este é o kickoff de Detecção de Fraude em Transações no Varejo de Materiais de Construção. Vamos alinhar objetivo, fases e riscos.

[00:59] Renata Vasconcelos: O ponto principal para nós: A Casa & Construção Prime processa cerca de 1,2 milhão de transações por mês em 87 lojas físicas e no canal e-commerce, com perdas estimadas em 0,9% do faturamento por fraudes em pedidos e estornos indevidos. A análise manual atual cobre apenas 15% dos casos suspeitos, com tempo médio de detecção de 72 horas e alto índice de falsos positivos.

[01:46] Paulo Henrique Dias: O objetivo combinado foi: Implantar um motor de detecção de fraude em tempo quase real que reduza as perdas por fraude e aumente a precisão na identificação de transações suspeitas, priorizando os casos de maior risco para análise humana.

[03:19] Bruno Tavares: Do lado técnico vamos usar Azure, Python, Databricks. O primeiro passo é construção de pipelines de ingestão e tratamento de dados transacionais no azure data lake e databricks, integrando 87 lojas e o e-commerce.

[04:27] Renata Vasconcelos: Quais riscos vocês já enxergam?

[05:33] Bruno Tavares: Os principais são qualidade e completude dos dados históricos de transações; volume elevado de falsos positivos impactando a operação; baixa adoção da fila de alertas pelo time de prevenção a fraudes.

[06:28] Paulo Henrique Dias: Fechado. Mando a ata com os próximos passos ainda hoje.
