---
projeto_id: P424
cliente: Crédito Fácil Brasil
titulo: Pipeline de detecção de fraude em tempo real com Databricks e Kafka
segmento: Serviços Financeiros
tecnologias: ["Databricks","Kafka"]
servicos: ["Engenharia de Dados"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P424
id: P424-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2025-03-01
---

# Transcrição — Reunião comercial Crédito Fácil Brasil

Transcrição automática, sem revisão.

[00:05] Bruno Tavares: Obrigado pelo tempo. Queremos entender o cenário antes de fechar a proposta.

[00:56] Renata Villaça: Hoje o problema é este: O Crédito Fácil Brasil processa cerca de 2,4 milhões de transações de crédito por mês e sofre com um índice de fraude de 1,8%, o que representa perdas estimadas em R$ 38 milhões ao ano. A análise atual é majoritariamente batch, com latência de até 24 horas, impedindo o bloqueio de operações suspeitas antes da liquidação financeira.

[02:28] Bruno Tavares: Já fizemos coisa parecida em Serviços Financeiros. A ideia seria: Construir um pipeline de engenharia de dados em tempo real que ingira eventos transacionais via Kafka e disponibilize features e sinais de risco no Databricks em menos de 2 minutos, subsidiando a detecção de fraude.

[03:44] Renata Villaça: E quanto tempo vocês imaginam?

[04:49] Bruno Tavares: Algo em torno de 7 meses, dependendo do escopo final.

[06:17] Renata Villaça: Uma preocupação nossa é qualidade e atraso na entrega dos eventos pelos sistemas de origem.

[07:23] Bruno Tavares: Entendido, vamos tratar isso como premissa.
