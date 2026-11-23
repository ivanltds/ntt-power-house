---
projeto_id: P160
cliente: Gás Canalizado Litoral
titulo: Manutenção preditiva de ativos de distribuição com Azure, Databricks e SAP
segmento: Utilities / Energia
tecnologias: ["Azure","Databricks","SAP","Python"]
servicos: ["Data Science / ML"]
area: AI & Automation
dono: Yuri Monteiro
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P160
id: P160-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2026-07-09
---

# Transcrição — Kickoff Gás Canalizado Litoral

Transcrição automática, sem revisão.

[00:05] Yuri Monteiro: Bom dia. Este é o kickoff de Manutenção preditiva de ativos de distribuição com Azure, Databricks e SAP. Vamos alinhar objetivo, fases e riscos.

[01:04] Renata Vasconcelos: O ponto principal para nós: A Gás Canalizado Litoral opera cerca de 4.200 km de rede e 38 estações de redução de pressão, com paradas não programadas que consumiram 11.400 horas de operação no último ano e geraram R$ 7,8 milhões em custos de contingência. Hoje a manutenção é majoritariamente corretiva e preventiva por calendário, com dados de sensores dispersos entre o SAP PM e planilhas locais, sem modelo analítico para antecipar falhas.

[02:01] Yuri Monteiro: O objetivo combinado foi: Implantar uma solução de manutenção preditiva que antecipe falhas em ativos críticos (compressores, válvulas e reguladores) com horizonte de 7 a 15 dias, reduzindo paradas não programadas em pelo menos 25% em 12 meses.

[02:40] Bruno Tavares: Do lado técnico vamos usar Azure, Databricks, SAP, Python. O primeiro passo é ingestão e orquestração dos dados de sensores iot e histórico de manutenção do sap pm no azure data lake, com pipelines em databricks.

[03:47] Renata Vasconcelos: Quais riscos vocês já enxergam?

[04:53] Bruno Tavares: Os principais são qualidade e lacunas nos dados históricos de sensores de algumas estações; baixa adesão dos times de manutenção às recomendações do modelo; janelas de indisponibilidade limitadas para deploy em ambiente sap produtivo.

[06:22] Yuri Monteiro: Fechado. Mando a ata com os próximos passos ainda hoje.
