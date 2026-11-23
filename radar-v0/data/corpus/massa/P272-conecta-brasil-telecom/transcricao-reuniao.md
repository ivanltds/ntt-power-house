---
projeto_id: P272
cliente: Conecta Brasil Telecom
titulo: Predição de churn e retenção com analytics avançado na base pré-paga
segmento: Telecom
tecnologias: ["AWS","Databricks"]
servicos: ["Analytics & BI","CRM"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P272
id: P272-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2024-10-06
---

# Transcrição — Kickoff Conecta Brasil Telecom

Transcrição automática, sem revisão.

[00:05] Henrique Matos: Bom dia. Este é o kickoff de Predição de churn e retenção com analytics avançado na base pré-paga. Vamos alinhar objetivo, fases e riscos.

[00:58] Renata Vasconcelos: O ponto principal para nós: A Conecta Brasil Telecom perdia cerca de 2,3% da base pré-paga por mês, o equivalente a 180 mil linhas, sem conseguir identificar os clientes com maior propensão ao cancelamento. Os modelos de retenção eram reativos e baseados em regras fixas, com campanhas de retenção acertando apenas 11% dos casos abordados.

[02:12] Henrique Matos: O objetivo combinado foi: Implantar um modelo preditivo de churn na AWS e no Databricks para priorizar ações de retenção e aumentar a eficácia das campanhas de CRM sobre a base pré-paga.

[02:53] Felipe Andrade: Do lado técnico vamos usar AWS, Databricks. O primeiro passo é ingestão de dados de recarga, uso, atendimento e crm em data lake na aws (s3 e glue).

[03:56] Renata Vasconcelos: Quais riscos vocês já enxergam?

[05:02] Felipe Andrade: Os principais são qualidade e dispersão dos dados de recarga entre sistemas legados; baixa adesão das áreas de crm às novas réguas de retenção; latência na integração diária do score com o crm.

[05:50] Henrique Matos: Fechado. Mando a ata com os próximos passos ainda hoje.
