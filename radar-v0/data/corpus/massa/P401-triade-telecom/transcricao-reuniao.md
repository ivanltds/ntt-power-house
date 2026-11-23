---
projeto_id: P401
cliente: Tríade Telecom
titulo: Plataforma de Dados em Tempo Real para Streaming com Azure, AWS e Databricks
segmento: Telecom
tecnologias: ["Azure","AWS","Databricks"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P401
id: P401-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2026-11-01
---

# Transcrição — Reunião comercial Tríade Telecom

Transcrição automática, sem revisão.

[00:05] Henrique Matos: Obrigado pelo tempo. Queremos entender o cenário antes de fechar a proposta.

[00:56] Renata Vasconcelos: Hoje o problema é este: A Tríade Telecom processa cerca de 180 milhões de eventos de rede e bilhetagem por dia, mas apenas 12% desse volume é disponibilizado em tempo real para as áreas de operações e comercial. A latência atual de 4 a 6 horas entre a captura do evento e a consulta analítica impede a detecção proativa de falhas de cobertura e a ativação de ofertas personalizadas no momento da interação do cliente.

[02:28] Felipe Andrade: Já fizemos coisa parecida em Telecom. A ideia seria: Implantar uma arquitetura de streaming de dados em nuvem híbrida (Azure e AWS) com processamento no Databricks, reduzindo a latência de disponibilização de eventos de 6 horas para menos de 2 minutos e habilitando 8 novos casos de uso analíticos em tempo real.

[03:15] Renata Vasconcelos: E quanto tempo vocês imaginam?

[04:20] Henrique Matos: Algo em torno de 5 meses, dependendo do escopo final.

[05:48] Renata Vasconcelos: Uma preocupação nossa é latência de rede entre azure e aws acima do previsto para o volume de 4 mil eventos por segundo.

[06:23] Felipe Andrade: Entendido, vamos tratar isso como premissa.
