---
projeto_id: P261
cliente: Secretaria Estadual de Saúde do Planalto
titulo: Migração do Data Warehouse da Saúde para Nuvem Multi-Cloud
segmento: Setor Público
tecnologias: ["GCP","Azure","Databricks","Snowflake"]
servicos: ["Engenharia de Dados","Migração para Nuvem"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: confidencial
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P261
id: P261-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2026-07-04
---

# Transcrição — Kickoff Secretaria Estadual de Saúde do Planalto

Transcrição automática, sem revisão.

[00:05] Igor Peixoto: Bom dia. Este é o kickoff de Migração do Data Warehouse da Saúde para Nuvem Multi-Cloud. Vamos alinhar objetivo, fases e riscos.

[00:48] Ricardo Almeida: O ponto principal para nós: A Secretaria Estadual de Saúde do Planalto mantém um data warehouse on-premises com 45 TB de dados que processa 1,2 milhão de atendimentos por mês, mas enfrenta lentidão nas consultas analíticas (tempo médio de 12 minutos) e custos crescentes de manutenção de hardware. A falta de escalabilidade impede a expansão de relatórios para 300 novos usuários previstos para 2025.

[02:03] Igor Peixoto: O objetivo combinado foi: Migrar o data warehouse para uma arquitetura multi-cloud (GCP e Azure) com Databricks e Snowflake, reduzindo o tempo de consulta em 70% e permitindo escalabilidade elástica para até 2 milhões de atendimentos/mês.

[03:36] Fernanda Lima: Do lado técnico vamos usar GCP, Azure, Databricks, Snowflake. O primeiro passo é avaliação e refatoração de 120 pipelines etl legados para databricks (pyspark) com orquestração no azure data factory.

[04:30] Ricardo Almeida: Quais riscos vocês já enxergam?

[05:36] Fernanda Lima: Os principais são atraso na liberação de acessos e credenciais pelos órgãos de segurança do estado; qualidade dos dados legados com 15% de registros inconsistentes; resistência à mudança por parte das equipes técnicas da secretaria.

[07:03] Igor Peixoto: Fechado. Mando a ata com os próximos passos ainda hoje.
