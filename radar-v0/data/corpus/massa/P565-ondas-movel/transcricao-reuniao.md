---
projeto_id: P565
cliente: Ondas Móvel
titulo: Streaming de Dados em Tempo Real para Análise de Rede
segmento: Telecom
tecnologias: ["Kafka","Databricks","AWS","Python"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: André Vasconcelos
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P565
id: P565-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2026-07-10
---

# Transcrição — Kickoff Ondas Móvel

Transcrição automática, sem revisão.

[00:05] André Vasconcelos: Bom dia. Este é o kickoff de Streaming de Dados em Tempo Real para Análise de Rede. Vamos alinhar objetivo, fases e riscos.

[00:43] Carla Mendes: O ponto principal para nós: A Ondas Móvel precisa monitorar 12 milhões de dispositivos em tempo real para reduzir falhas de rede que impactam 8% dos usuários mensalmente. Os sistemas atuais processam dados com latência de 15 minutos, inviabilizando ações proativas.

[01:43] André Vasconcelos: O objetivo combinado foi: Implementar uma plataforma de streaming com Kafka e Databricks na AWS para ingestão e análise de eventos em tempo real, reduzindo a latência para menos de 5 segundos e aumentando a precisão na detecção de anomalias.

[02:19] Rafael Oliveira: Do lado técnico vamos usar Kafka, Databricks, AWS, Python. O primeiro passo é configuração de clusters kafka na aws para ingestão de 500 mil eventos/segundo.

[03:31] Carla Mendes: Quais riscos vocês já enxergam?

[04:37] Rafael Oliveira: Os principais são volatilidade no volume de eventos durante picos de tráfego; integração com sistemas legados com protocolos proprietários; dependência de serviços aws para escalabilidade.

[05:20] André Vasconcelos: Fechado. Mando a ata com os próximos passos ainda hoje.
