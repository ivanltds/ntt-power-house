---
projeto_id: P195
cliente: Financeira Rumo Certo
titulo: Migração de Data Warehouse para Nuvem com Databricks e GCP
segmento: Serviços Financeiros
tecnologias: ["GCP","Databricks","Azure"]
servicos: ["Engenharia de Dados"]
area: Cloud & Infra
dono: Carla Menezes
confidencialidade: interna
status_proposta: Em negociação
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P195
id: P195-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2026-09-02
---

# Transcrição — Reunião comercial Financeira Rumo Certo

Transcrição automática, sem revisão.

[00:05] Carla Menezes: Obrigado pelo tempo. Queremos entender o cenário antes de fechar a proposta.

[00:56] Mariana Vasconcelos: Hoje o problema é este: A Financeira Rumo Certo opera hoje um data warehouse on-premises com cerca de 3,2 TB de dados históricos e 180 tabelas, sustentando relatórios regulatórios e de crédito que levam até 9 horas para serem processados. A janela de carga noturna está saturada e a operação enfrenta 4 incidentes críticos por mês por falta de escalabilidade e de governança de dados.

[01:55] Rafael Andrade: Já fizemos coisa parecida em Serviços Financeiros. A ideia seria: Migrar o data warehouse on-premises para uma arquitetura em nuvem com Databricks sobre GCP e Azure, reduzindo o tempo de processamento dos relatórios regulatórios em pelo menos 60% e eliminando a dependência de infraestrutura local em 6 meses.

[02:39] Mariana Vasconcelos: E quanto tempo vocês imaginam?

[03:44] Carla Menezes: Algo em torno de 6 meses, dependendo do escopo final.

[05:12] Mariana Vasconcelos: Uma preocupação nossa é qualidade e consistência dos dados legados nas 180 tabelas mapeadas.

[06:19] Rafael Andrade: Entendido, vamos tratar isso como premissa.
