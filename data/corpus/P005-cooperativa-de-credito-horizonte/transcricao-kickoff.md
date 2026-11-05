---
projeto_id: P005
cliente: Cooperativa de Crédito Horizonte
titulo: Migração do data warehouse para Azure Synapse com governança LGPD
segmento: Serviços Financeiros
tecnologias: ["Azure","Power BI","Python"]
servicos: ["Migração para Nuvem","Governança de Dados","Analytics & BI","Engenharia de Dados"]
area: Cloud & Data
dono: Thiago Ramos
confidencialidade: confidencial
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P005
id: P005-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2025-01-15
---

# Transcrição — Kickoff Cooperativa de Crédito Horizonte

Transcrição automática, sem revisão.

[00:05] Thiago Ramos: Bom dia a todos. Esse é o kickoff do projeto Migração do data warehouse para Azure Synapse com governança LGPD. A ideia é alinhar objetivo, fases e riscos.

[00:50] Sérgio Almeida: Pra nós o ponto principal é o seguinte: O data warehouse on-premises estava no limite de capacidade, com cargas noturnas de 9 horas e sem controle de acesso a dados pessoais exigido pela LGPD.

[02:12] Thiago Ramos: Perfeito. O objetivo que combinamos foi: Migrar o data warehouse para Azure Synapse, reduzir a janela de carga e implantar governança de dados pessoais.

[02:54] Renata Dias: Do lado técnico, a gente vai usar Azure, Power BI, Python. O primeiro passo é migração de 1.200 tabelas e 300 rotinas etl para azure synapse e data factory.

[03:40] Sérgio Almeida: E quais são os riscos que vocês já enxergam?

[05:04] Renata Dias: Os principais são rotinas etl sem documentação e congelamento de mudanças no fechamento contábil. Vamos acompanhar isso semanalmente.

[06:17] Thiago Ramos: O cronograma tem as fases: Assessment (4 semanas); Migração em ondas (20 semanas); Governança e LGPD (6 semanas, em paralelo); Desligamento do legado (4 semanas).

[07:09] Sérgio Almeida: Combinado. A gente precisa que a equipe de vocês fale com as áreas de negócio desde o começo.

[08:32] Thiago Ramos: Fechado. Mando a ata com os próximos passos ainda hoje.
