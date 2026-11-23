---
projeto_id: P234
cliente: Autopeças Motriz
titulo: Plataforma de Indicadores ESG e Emissões para Manufatura Automotiva
segmento: Manufatura
tecnologias: ["Snowflake","Azure","Power BI","Python"]
servicos: ["Governança de Dados","Analytics & BI"]
area: Data & Analytics
dono: Úrsula Campos
confidencialidade: confidencial
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P234
id: P234-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2025-05-13
---

# Transcrição — Kickoff Autopeças Motriz

Transcrição automática, sem revisão.

[00:05] Úrsula Campos: Bom dia. Este é o kickoff de Plataforma de Indicadores ESG e Emissões para Manufatura Automotiva. Vamos alinhar objetivo, fases e riscos.

[00:57] Renata Vasconcelos: O ponto principal para nós: A Autopeças Motriz acompanhava emissões de CO2e e indicadores ESG em 14 planilhas descentralizadas mantidas por 6 áreas, com fechamento mensal de 18 dias e divergências de até 12% entre relatórios de sustentabilidade e a base financeira. A ausência de trilha de auditoria comprometia a publicação do relatório anual e a resposta a questionários de clientes montadoras.

[02:08] Úrsula Campos: O objetivo combinado foi: Centralizar dados de emissões Escopos 1, 2 e 3 e indicadores ESG em uma plataforma analítica única, com fechamento mensal automatizado e relatórios auditáveis para 3 plantas industriais.

[03:15] Bruno Tavares: Do lado técnico vamos usar Snowflake, Azure, Power BI, Python. O primeiro passo é ingestão de dados de consumo de energia, combustíveis e logística das 3 plantas em snowflake, com pipelines em python para cálculo de co2e conforme ghg protocol.

[03:53] Renata Vasconcelos: Quais riscos vocês já enxergam?

[04:59] Bruno Tavares: Os principais são qualidade e padronização dos dados de consumo das 3 plantas; mudanças nas regras de cálculo do ghg protocol durante o projeto; baixa adoção dos dashboards pela área de sustentabilidade.

[05:57] Úrsula Campos: Fechado. Mando a ata com os próximos passos ainda hoje.
