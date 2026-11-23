---
projeto_id: P129
cliente: Banco Ponte Firme
titulo: Detecção de Fraude em Tempo Real com Machine Learning e Kafka
segmento: Serviços Financeiros
tecnologias: ["Machine Learning","Kafka","Python","Azure"]
servicos: ["Data Science / ML"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P129
id: P129-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2026-09-15
---

# Transcrição — Kickoff Banco Ponte Firme

Transcrição automática, sem revisão.

[00:05] Bruno Tavares: Bom dia. Este é o kickoff de Detecção de Fraude em Tempo Real com Machine Learning e Kafka. Vamos alinhar objetivo, fases e riscos.

[00:51] Carlos Mendes: O ponto principal para nós: O Banco Ponte Firme processa 2,5 milhões de transações diárias e sofre com fraudes que representam 0,8% do volume, gerando perdas anuais de R$ 45 milhões. O atual sistema de regras fixas detecta apenas 60% dos casos, com alto índice de falsos positivos (35%), sobrecarregando a equipe de análise manual.

[01:57] Bruno Tavares: O objetivo combinado foi: Implantar um modelo de machine learning em tempo real para detecção de fraude, integrado via Kafka e Azure, visando reduzir perdas em 30% e diminuir falsos positivos para menos de 15% em 4 meses.

[03:13] Ana Beatriz Rocha: Do lado técnico vamos usar Machine Learning, Kafka, Python, Azure. O primeiro passo é desenvolvimento de modelos de ml (python, scikit-learn, xgboost) para classificação de transações fraudulentas.

[04:05] Carlos Mendes: Quais riscos vocês já enxergam?

[05:11] Ana Beatriz Rocha: Os principais são qualidade dos dados históricos insuficiente para treinamento; latência na integração kafka-azure impactando tempo real; resistência da equipe de negócio à adoção do modelo.

[05:56] Bruno Tavares: Fechado. Mando a ata com os próximos passos ainda hoje.
