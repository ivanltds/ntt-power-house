---
projeto_id: P204
cliente: Operador Logístico Armazém Brasil
titulo: Streaming de dados em tempo real para operação logística com Databricks e Kafka
segmento: Logística
tecnologias: ["Databricks","Kafka"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Zilda Correia
confidencialidade: confidencial
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P204
id: P204-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2026-02-05
---

# Transcrição — Kickoff Operador Logístico Armazém Brasil

Transcrição automática, sem revisão.

[00:05] Zilda Correia: Bom dia. Este é o kickoff de Streaming de dados em tempo real para operação logística com Databricks e Kafka. Vamos alinhar objetivo, fases e riscos.

[01:09] Renata Vasconcelos: O ponto principal para nós: O Operador Logístico Armazém Brasil acompanha a movimentação de 1,2 milhão de volumes por mês em 9 centros de distribuição, mas os relatórios de estoque e expedição chegam com até 6 horas de atraso, gerando rupturas e retrabalho de separação em cerca de 8% dos pedidos. A operação também não consegue reagir a desvios de rota e atrasos de doca em tempo hábil, o que pressiona o SLA contratado com os embarcadores.

[02:05] Zilda Correia: O objetivo combinado foi: Implantar uma plataforma de dados em tempo real com ingestão via Kafka e processamento no Databricks, reduzindo a latência de visibilidade operacional de horas para menos de 5 minutos e habilitando painéis de acompanhamento contínuo da cadeia logística.

[03:19] Felipe Andrade: Do lado técnico vamos usar Databricks, Kafka. O primeiro passo é ingestão de eventos de wms, tms e rastreadores de frota em tópicos kafka, com 14 fluxos e volume estimado de 2.500 eventos por segundo no pico.

[04:22] Renata Vasconcelos: Quais riscos vocês já enxergam?

[05:28] Felipe Andrade: Os principais são latência e indisponibilidade dos sistemas de origem (wms e tms) comprometendo a ingestão contínua; qualidade e padronização dos eventos de rastreamento de frota enviados por operadores terceiros; capacidade do cluster databricks durante picos sazonais de volume logístico.

[06:53] Zilda Correia: Fechado. Mando a ata com os próximos passos ainda hoje.
