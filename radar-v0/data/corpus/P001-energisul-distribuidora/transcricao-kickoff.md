---
projeto_id: P001
cliente: Energisul Distribuidora
titulo: Plataforma de dados para redução de perdas não técnicas
segmento: Utilities / Energia
tecnologias: ["Databricks","Azure","Power BI","Python"]
servicos: ["Engenharia de Dados","Data Science / ML","Analytics & BI","Governança de Dados"]
area: Data & Analytics
dono: Marina Costa
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P001
id: P001-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2025-03-10
---

# Transcrição — Kickoff Energisul Distribuidora

Transcrição automática, sem revisão.

[00:05] Marina Costa: Bom dia a todos. Esse é o kickoff do projeto Plataforma de dados para redução de perdas não técnicas. A ideia é alinhar objetivo, fases e riscos.

[01:30] Roberto Lima: Pra nós o ponto principal é o seguinte: A distribuidora perdia cerca de 11% da energia injetada por perdas não técnicas (furto de energia, fraude em medidores e erros de cadastro). As inspeções de campo eram escolhidas por amostragem manual, com taxa de acerto abaixo de 15%.

[02:35] Marina Costa: Perfeito. O objetivo que combinamos foi: Criar uma plataforma de dados lakehouse que consolide leituras de medidores, cadastro comercial e histórico de inspeções, e usar modelos de machine learning para priorizar as inspeções com maior probabilidade de irregularidade.

[03:33] Felipe Andrade: Do lado técnico, a gente vai usar Databricks, Azure, Power BI, Python. O primeiro passo é ingestão de leituras de medidores (cerca de 3 milhões de unidades consumidoras) e dados do sistema comercial em azure data factory.

[04:34] Roberto Lima: E quais são os riscos que vocês já enxergam?

[05:58] Felipe Andrade: Os principais são qualidade do cadastro comercial e disponibilidade das áreas de campo para o piloto e volume de dados de medição acima do previsto. Vamos acompanhar isso semanalmente.

[07:12] Marina Costa: O cronograma tem as fases: Discovery e desenho da arquitetura (4 semanas); Construção do lakehouse (10 semanas); Modelagem e piloto em 2 regionais (8 semanas); Rollout e operação assistida (4 semanas).

[07:53] Roberto Lima: Combinado. A gente precisa que a equipe de vocês fale com as áreas de negócio desde o começo.

[09:16] Marina Costa: Fechado. Mando a ata com os próximos passos ainda hoje.
