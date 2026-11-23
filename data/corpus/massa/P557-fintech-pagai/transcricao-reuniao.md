---
projeto_id: P557
cliente: Fintech Pagaí
titulo: Predição de churn e retenção para base de clientes PJ
segmento: Serviços Financeiros
tecnologias: ["Python","Salesforce","AWS","Databricks"]
servicos: ["Data Science / ML","CRM","Analytics & BI","Change Management"]
area: Data & Analytics
dono: André Vasconcelos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P557
id: P557-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2025-06-11
---

# Transcrição — Kickoff Fintech Pagaí

Transcrição automática, sem revisão.

[00:05] André Vasconcelos: Bom dia. Este é o kickoff de Predição de churn e retenção para base de clientes PJ. Vamos alinhar objetivo, fases e riscos.

[00:43] Renata Vasconcelos: O ponto principal para nós: A Fintech Pagaí, com carteira de 180 mil clientes PJ e R$ 2,4 bi em volume transacionado anual, vinha perdendo 3,1% da base ativa por trimestre sem conseguir antecipar quais contas migrariam para concorrentes. Os sinais de risco estavam dispersos entre o CRM Salesforce, o data lake na AWS e extratos transacionais, sem modelo preditivo que priorizasse a ação dos times de relacionamento.

[02:14] André Vasconcelos: O objetivo combinado foi: Construir e operacionalizar um modelo de propensão a churn com 90 dias de antecedência, integrado ao CRM, para direcionar campanhas de retenção sobre os segmentos de maior valor e reduzir a perda de receita recorrente.

[02:53] Bruno Tavares: Do lado técnico vamos usar Python, Salesforce, AWS, Databricks. O primeiro passo é diagnóstico e engenharia de features sobre dados transacionais e cadastrais no databricks, com pipelines em python e armazenamento na aws (s3 e redshift).

[04:25] Renata Vasconcelos: Quais riscos vocês já enxergam?

[05:31] Bruno Tavares: Os principais são qualidade e defasagem dos dados cadastrais de clientes pj; baixa adesão dos gerentes de conta ao uso dos scores no crm; drift do modelo após mudanças sazonais no comportamento transacional.

[06:33] André Vasconcelos: Fechado. Mando a ata com os próximos passos ainda hoje.
