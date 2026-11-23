---
projeto_id: P366
cliente: NetVale Provedor
titulo: Detecção de Fraude em Tempo Real com Machine Learning para Provedor de Telecom
segmento: Telecom
tecnologias: ["Machine Learning","Kafka","Databricks"]
servicos: ["Data Science / ML","Engenharia de Dados"]
area: AI & Automation
dono: João Pedro Sales
confidencialidade: confidencial
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P366
id: P366-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2026-11-08
---

# Transcrição — Kickoff NetVale Provedor

Transcrição automática, sem revisão.

[00:05] João Pedro Sales: Bom dia. Este é o kickoff de Detecção de Fraude em Tempo Real com Machine Learning para Provedor de Telecom. Vamos alinhar objetivo, fases e riscos.

[01:08] Renata Coelho: O ponto principal para nós: O NetVale Provedor registra cerca de 480 mil eventos de recarga e ativação por mês e perde aproximadamente 3,2% da receita bruta com fraudes de recarga, clonagem de linha e uso indevido de créditos. A análise atual é manual e reativa, com detecção apenas após 48 horas, o que inviabiliza o bloqueio preventivo.

[02:21] João Pedro Sales: O objetivo combinado foi: Implantar uma plataforma de detecção de fraude em tempo real com modelos de Machine Learning sobre streaming de eventos, reduzindo a perda por fraude em pelo menos 40% em 6 meses.

[03:21] Felipe Andrade: Do lado técnico vamos usar Machine Learning, Kafka, Databricks. O primeiro passo é ingestão de eventos de recarga, ativação e uso em streaming com apache kafka, processando picos de 1.200 eventos por segundo..

[04:25] Renata Coelho: Quais riscos vocês já enxergam?

[05:31] Felipe Andrade: Os principais são qualidade e atraso na disponibilização dos eventos históricos de recarga.; latência da api do cliente acima do alvo para scoring em tempo real.; volume elevado de falsos positivos impactando clientes legítimos..

[06:55] João Pedro Sales: Fechado. Mando a ata com os próximos passos ainda hoje.
