---
projeto_id: P404
cliente: Conecta Brasil Telecom
titulo: Migração de Data Warehouse para Nuvem com Snowflake e GCP
segmento: Telecom
tecnologias: ["Snowflake","GCP"]
servicos: ["Migração para Nuvem"]
area: Cloud & Infra
dono: Isabela Freitas
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P404
id: P404-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2024-06-17
---

# Transcrição — Reunião comercial Conecta Brasil Telecom

Transcrição automática, sem revisão.

[00:05] Isabela Freitas: Obrigado pelo tempo. Queremos entender o cenário antes de fechar a proposta.

[00:56] Renata Vasconcelos: Hoje o problema é este: A Conecta Brasil Telecom processa cerca de 4,5 TB de dados de billing, CDR e atendimento em um data warehouse on-premises com janelas de carga noturnas que ultrapassam 6 horas, atrasando relatórios regulatórios da ANATEL. A base cresce 30% ao ano e a infraestrutura atual não suporta a demanda de analytics de rede e churn dos 12 milhões de assinantes. Meu e-mail é renata.vasconcelos@cliente-exemplo.com.br e o celular (11) 98765-1404.

[02:11] Felipe Andrade: Já fizemos coisa parecida em Telecom. A ideia seria: Migrar o data warehouse on-premises para Snowflake no GCP em 7 meses, reduzindo a janela de carga para menos de 1 hora e habilitando analytics escalável para as áreas de rede, comercial e regulatório.

[02:59] Renata Vasconcelos: E quanto tempo vocês imaginam?

[04:04] Isabela Freitas: Algo em torno de 7 meses, dependendo do escopo final.

[05:32] Renata Vasconcelos: Uma preocupação nossa é qualidade e consistência dos dados legados de cdr e billing.

[06:31] Felipe Andrade: Entendido, vamos tratar isso como premissa.
