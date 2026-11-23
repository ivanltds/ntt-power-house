---
projeto_id: P151
cliente: Têxtil Fio de Ouro
titulo: Painéis executivos e BI para gestão industrial com Power BI, Azure e Snowflake
segmento: Manufatura
tecnologias: ["Power BI","Azure","Snowflake","SAP"]
servicos: ["Engenharia de Dados","Analytics & BI"]
area: Data & Analytics
dono: Úrsula Campos
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P151
id: P151-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2026-07-25
---

# Transcrição — Kickoff Têxtil Fio de Ouro

Transcrição automática, sem revisão.

[00:05] Úrsula Campos: Bom dia. Este é o kickoff de Painéis executivos e BI para gestão industrial com Power BI, Azure e Snowflake. Vamos alinhar objetivo, fases e riscos.

[01:08] Renata Vasconcelos: O ponto principal para nós: A Têxtil Fio de Ouro opera 3 plantas têxteis e cerca de 1.200 colaboradores, com indicadores de produção, custos e vendas consolidados manualmente em planilhas por 14 analistas, gerando atraso de até 12 dias na visão executiva e divergências de até 8% entre áreas. O SAP concentra transações de produção e financeiro, mas a falta de uma camada analítica integrada impede decisões rápidas sobre margem por linha de produto e eficiência de máquina.

[02:37] Úrsula Campos: O objetivo combinado foi: Implantar uma plataforma de dados e painéis executivos que consolide informações de SAP e fontes industriais em uma única visão analítica, reduzindo o ciclo de apuração de indicadores de 12 para 2 dias úteis.

[04:06] Marcelo Tavares: Do lado técnico vamos usar Power BI, Azure, Snowflake, SAP. O primeiro passo é construção de pipelines de ingestão e transformação no azure data factory e azure databricks, integrando sap ecc e dados de chão de fábrica.

[05:20] Renata Vasconcelos: Quais riscos vocês já enxergam?

[06:26] Marcelo Tavares: Os principais são qualidade e padronização dos dados mestres do sap; disponibilidade limitada das equipes de negócio para homologação; dependência de acesso e performance das apis do sap para extração.

[07:22] Úrsula Campos: Fechado. Mando a ata com os próximos passos ainda hoje.
