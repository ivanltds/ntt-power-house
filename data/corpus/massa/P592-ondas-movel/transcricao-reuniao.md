---
projeto_id: P592
cliente: Ondas Móvel
titulo: Lakehouse de Dados para Operadora de Telecom com AWS, Snowflake e Azure
segmento: Telecom
tecnologias: ["AWS","Snowflake","Azure"]
servicos: ["Engenharia de Dados","Governança de Dados"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P592
id: P592-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2025-06-09
---

# Transcrição — Kickoff Ondas Móvel

Transcrição automática, sem revisão.

[00:05] Henrique Matos: Bom dia. Este é o kickoff de Lakehouse de Dados para Operadora de Telecom com AWS, Snowflake e Azure. Vamos alinhar objetivo, fases e riscos.

[01:01] Renata Vilaça: O ponto principal para nós: A Ondas Móvel operava com mais de 40 fontes de dados dispersas entre sistemas de billing, rede e atendimento, gerando relatórios de churn com atraso de até 5 dias e 18% de divergência entre áreas. O time de analytics consumia 60% do tempo em extração e tratamento manual, sem camada única de governança sobre 12 milhões de linhas de CDR diárias.

[01:49] Henrique Matos: O objetivo combinado foi: Construir uma plataforma lakehouse unificada em AWS, Snowflake e Azure, com engenharia e governança de dados, reduzindo o tempo de disponibilização de dados analíticos e garantindo rastreabilidade ponta a ponta.

[03:21] Bruno Tavares: Do lado técnico vamos usar AWS, Snowflake, Azure. O primeiro passo é ingestão em lote e incremental de 40 fontes (billing, crm, oss, rede) na camada de armazenamento aws s3 com orquestração automatizada.

[04:19] Renata Vilaça: Quais riscos vocês já enxergam?

[05:25] Bruno Tavares: Os principais são atraso na liberação de acessos às fontes legadas pelo time de infraestrutura do cliente; qualidade inconsistente dos dados de rede, exigindo regras adicionais de tratamento; mudança de escopo em requisitos de governança durante a fase de catálogo.

[06:25] Henrique Matos: Fechado. Mando a ata com os próximos passos ainda hoje.
