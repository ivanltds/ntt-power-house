---
projeto_id: P241
cliente: Secretaria Estadual de Saúde do Planalto
titulo: Governança de dados e conformidade LGPD para rede estadual de saúde
segmento: Setor Público
tecnologias: ["Databricks","Python","Azure","Snowflake"]
servicos: ["Governança de Dados","Change Management"]
area: Data & Analytics
dono: Xênia Lacerda
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P241
id: P241-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2026-04-09
---

# Transcrição — Kickoff Secretaria Estadual de Saúde do Planalto

Transcrição automática, sem revisão.

[00:05] Xênia Lacerda: Bom dia. Este é o kickoff de Governança de dados e conformidade LGPD para rede estadual de saúde. Vamos alinhar objetivo, fases e riscos.

[00:57] Marina Cavalcanti: O ponto principal para nós: A Secretaria Estadual de Saúde do Planalto mantinha dados de 4,2 milhões de cidadãos distribuídos em 37 sistemas legados, sem catálogo único nem classificação de dados pessoais, o que gerava risco de sanções da ANPD e retrabalho em 60% das solicitações de informação. Além disso, os processos de anonimização e consentimento não eram auditáveis, comprometendo a prestação de contas exigida pela LGPD.

[01:40] Xênia Lacerda: O objetivo combinado foi: Implantar uma estrutura de governança de dados com classificação, catálogo e políticas de privacidade auditáveis, adequando os fluxos de dados de saúde à LGPD em 8 meses.

[02:31] Rafael Bittencourt: Do lado técnico vamos usar Databricks, Python, Azure, Snowflake. O primeiro passo é implantação de catálogo e linhagem de dados no databricks para 37 fontes legadas, com classificação automática de dados pessoais sensíveis via python.

[04:00] Marina Cavalcanti: Quais riscos vocês já enxergam?

[05:06] Rafael Bittencourt: Os principais são baixa qualidade e inconsistência dos dados nas 37 fontes legadas; resistência de 480 servidores à mudança de processos de acesso à informação; atraso na aprovação jurídica das políticas de retenção e consentimento.

[06:33] Xênia Lacerda: Fechado. Mando a ata com os próximos passos ainda hoje.
