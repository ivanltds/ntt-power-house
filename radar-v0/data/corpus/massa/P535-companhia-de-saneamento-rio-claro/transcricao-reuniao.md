---
projeto_id: P535
cliente: Companhia de Saneamento Rio Claro
titulo: Manutenção preditiva de ativos com Kafka e Machine Learning
segmento: Utilities / Energia
tecnologias: ["Kafka","Machine Learning"]
servicos: ["Data Science / ML"]
area: AI & Automation
dono: Paulo Henrique Dias
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P535
id: P535-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2026-02-28
---

# Transcrição — Kickoff Companhia de Saneamento Rio Claro

Transcrição automática, sem revisão.

[00:05] Paulo Henrique Dias: Bom dia. Este é o kickoff de Manutenção preditiva de ativos com Kafka e Machine Learning. Vamos alinhar objetivo, fases e riscos.

[00:49] Marcelo Tavares: O ponto principal para nós: A Companhia de Saneamento Rio Claro opera cerca de 1.200 ativos críticos (bombas, motores e válvulas) distribuídos em 34 unidades, com paradas não planejadas que consomem aproximadamente 18% das horas de manutenção e elevam o custo operacional em cerca de R$ 2,4 milhões por ano. O histórico de falhas está fragmentado em planilhas e sistemas legados, sem telemetria em tempo real que permita antecipar degradações.

[01:47] Paulo Henrique Dias: O objetivo combinado foi: Implantar uma plataforma de manutenção preditiva que ingira telemetria dos ativos em tempo real via Kafka e aplique modelos de Machine Learning para prever falhas com antecedência mínima de 72 horas, reduzindo paradas não planejadas em 25% ao longo do projeto.

[03:08] Fernanda Queiroz: Do lado técnico vamos usar Kafka, Machine Learning. O primeiro passo é ingestão de telemetria de sensores de vibração, temperatura e pressão de 1.200 ativos em tópicos kafka com latência inferior a 5 segundos.

[04:12] Marcelo Tavares: Quais riscos vocês já enxergam?

[05:18] Fernanda Queiroz: Os principais são qualidade e cobertura irregular dos sensores em parte dos ativos; baixa maturidade dos registros históricos de manutenção; resistência operacional à adoção dos alertas preditivos.

[06:10] Paulo Henrique Dias: Fechado. Mando a ata com os próximos passos ainda hoje.
