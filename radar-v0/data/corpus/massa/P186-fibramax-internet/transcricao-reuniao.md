---
projeto_id: P186
cliente: FibraMax Internet
titulo: Streaming de dados em tempo real para operações de rede e atendimento
segmento: Telecom
tecnologias: ["Databricks","Kafka","AWS","Python"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P186
id: P186-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2025-11-21
---

# Transcrição — Kickoff FibraMax Internet

Transcrição automática, sem revisão.

[00:05] Henrique Matos: Bom dia. Este é o kickoff de Streaming de dados em tempo real para operações de rede e atendimento. Vamos alinhar objetivo, fases e riscos.

[00:59] Renata Vasconcelos: O ponto principal para nós: A FibraMax Internet, com 1,2 milhão de clientes residenciais e corporativos em 8 estados, enfrenta hoje uma latência média de 4 horas entre a geração de eventos de rede e a disponibilidade dos dados para análise, o que atrasa a detecção de falhas e a ação comercial. Cerca de 35% dos incidentes de qualidade só são identificados após reclamação do assinante, elevando o churn mensal para 1,8%.

[01:35] Henrique Matos: O objetivo combinado foi: Implantar uma plataforma de dados em tempo real para ingestão, processamento e analytics de eventos de rede e atendimento, reduzindo a latência de disponibilização de dados de horas para menos de 5 minutos.

[03:02] Bruno Tavares: Do lado técnico vamos usar Databricks, Kafka, AWS, Python. O primeiro passo é ingestão contínua de eventos de rede e crm via apache kafka, com tópicos particionados por região e retenção de 7 dias.

[03:54] Renata Vasconcelos: Quais riscos vocês já enxergam?

[05:00] Bruno Tavares: Os principais são volume de eventos acima do previsto nos horários de pico; qualidade e padronização irregular dos eventos de rede legados; dependência de liberações de acesso e firewall pelo time de infraestrutura do cliente.

[06:21] Henrique Matos: Fechado. Mando a ata com os próximos passos ainda hoje.
