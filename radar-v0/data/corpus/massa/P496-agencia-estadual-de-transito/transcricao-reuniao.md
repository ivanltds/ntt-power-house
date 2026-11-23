---
projeto_id: P496
cliente: Agência Estadual de Trânsito
titulo: Migração do Data Warehouse para Snowflake na Nuvem AWS
segmento: Setor Público
tecnologias: ["Snowflake","AWS"]
servicos: ["Engenharia de Dados","Migração para Nuvem"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P496
id: P496-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2024-06-12
---

# Transcrição — Kickoff Agência Estadual de Trânsito

Transcrição automática, sem revisão.

[00:05] Igor Peixoto: Bom dia. Este é o kickoff de Migração do Data Warehouse para Snowflake na Nuvem AWS. Vamos alinhar objetivo, fases e riscos.

[00:44] Marcelo Tavares: O ponto principal para nós: A Agência Estadual de Trânsito mantinha um data warehouse on-premises com 14 TB de dados históricos de condutores, veículos e infrações, com janelas de carga noturna que ultrapassavam 7 horas e indisponibilidade recorrente para relatórios de fiscalização. O ambiente legado não suportava o crescimento de 22% ao ano no volume de dados de arrecadação e demandava custos fixos de infraestrutura de R$ 1,8 milhão por ano.

[01:45] Igor Peixoto: O objetivo combinado foi: Migrar o data warehouse legado para Snowflake na AWS em 6 meses, preservando a integridade histórica e reduzindo o tempo de carga e o custo operacional do ambiente analítico.

[02:40] Fernanda Queiroz: Do lado técnico vamos usar Snowflake, AWS. O primeiro passo é avaliação e inventário do data warehouse legado, com mapeamento de 180 tabelas e 320 processos etl.

[03:56] Marcelo Tavares: Quais riscos vocês já enxergam?

[05:02] Fernanda Queiroz: Os principais são qualidade e consistência dos dados históricos no legado; janelas de indisponibilidade limitadas para cutover; dependência de acessos e liberações de rede do cliente.

[05:40] Igor Peixoto: Fechado. Mando a ata com os próximos passos ainda hoje.
