---
projeto_id: P156
cliente: Agência Estadual de Trânsito
titulo: Migração do Data Warehouse para Snowflake na Nuvem Azure
segmento: Setor Público
tecnologias: ["Snowflake","Azure"]
servicos: ["Engenharia de Dados","Migração para Nuvem"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P156
id: P156-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2026-06-26
---

# Transcrição — Kickoff Agência Estadual de Trânsito

Transcrição automática, sem revisão.

[00:05] Igor Peixoto: Bom dia. Este é o kickoff de Migração do Data Warehouse para Snowflake na Nuvem Azure. Vamos alinhar objetivo, fases e riscos.

[00:46] Renata Vasconcelos: O ponto principal para nós: A Agência Estadual de Trânsito opera hoje um data warehouse on-premises com cerca de 4,2 TB de dados históricos de habilitação, veículos e infrações, com janelas de carga noturna que chegam a 6 horas e relatórios gerenciais disponíveis apenas no dia seguinte. O ambiente atual apresenta indisponibilidade média de 3 horas por mês e custos crescentes de manutenção de servidores e licenças, limitando a análise de dados para fiscalização e atendimento ao cidadão.

[01:31] Igor Peixoto: O objetivo combinado foi: Migrar o data warehouse on-premises para a plataforma Snowflake no Azure em 8 meses, reduzindo a janela de carga para até 90 minutos e disponibilizando dados analíticos próximos do tempo real para as áreas de fiscalização e gestão.

[02:23] Marcelo Tavares: Do lado técnico vamos usar Snowflake, Azure. O primeiro passo é assessment e mapeamento dos 4,2 tb de dados e dos 180 processos de etl existentes, com plano de migração para snowflake.

[03:02] Renata Vasconcelos: Quais riscos vocês já enxergam?

[04:08] Marcelo Tavares: Os principais são atraso na liberação de acessos e redes pelo órgão de ti do cliente; divergências de dados na reconciliação entre ambiente legado e snowflake; janela de cutover limitada pelos períodos de maior demanda do órgão.

[05:31] Igor Peixoto: Fechado. Mando a ata com os próximos passos ainda hoje.
