---
projeto_id: P411
cliente: TeleNorte Conecta
titulo: Pipeline de streaming em tempo real para rede e faturamento
segmento: Telecom
tecnologias: ["Kafka","Databricks","Python","Azure"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P411
id: P411-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2026-10-03
---

# Transcrição — Reunião comercial TeleNorte Conecta

Transcrição automática, sem revisão.

[00:05] Henrique Matos: Obrigado pelo tempo. Queremos entender o cenário antes de fechar a proposta.

[00:56] Renata Vasconcelos: Hoje o problema é este: A TeleNorte Conecta processa cerca de 2,3 bilhões de eventos de rede e bilhetagem por mês, mas a integração entre sistemas ocorre em lotes noturnos, gerando latência de até 8 horas na visão de consumo e na detecção de falhas. Isso atrasa a cobrança de serviços digitais e limita a identificação proativa de incidentes que afetam 1,4 milhão de assinantes.

[01:49] Bruno Tavares: Já fizemos coisa parecida em Telecom. A ideia seria: Implantar uma plataforma de dados em tempo real no Azure com ingestão via Kafka e processamento com Databricks, reduzindo a latência de disponibilização de eventos de rede e faturamento para menos de 5 minutos.

[02:47] Renata Vasconcelos: E quanto tempo vocês imaginam?

[03:52] Henrique Matos: Algo em torno de 7 meses, dependendo do escopo final.

[05:20] Renata Vasconcelos: Uma preocupação nossa é volume de eventos acima do previsto pode exigir reparticionamento dos tópicos kafka..

[06:44] Bruno Tavares: Entendido, vamos tratar isso como premissa.
