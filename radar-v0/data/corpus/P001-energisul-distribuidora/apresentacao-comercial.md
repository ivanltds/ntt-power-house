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
id: P001-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2025-03-10
prazo_meses: 6
---

# Apresentação Comercial — Energisul Distribuidora

## Slide 1 — Plataforma de dados para redução de perdas não técnicas
Energisul Distribuidora · Utilities / Energia

## Slide 2 — O desafio
A distribuidora perdia cerca de 11% da energia injetada por perdas não técnicas (furto de energia, fraude em medidores e erros de cadastro). As inspeções de campo eram escolhidas por amostragem manual, com taxa de acerto abaixo de 15%.

## Slide 3 — Nossa proposta
Criar uma plataforma de dados lakehouse que consolide leituras de medidores, cadastro comercial e histórico de inspeções, e usar modelos de machine learning para priorizar as inspeções com maior probabilidade de irregularidade.

## Slide 4 — Arquitetura e tecnologias
Databricks · Azure · Power BI · Python
- Ingestão de leituras de medidores (cerca de 3 milhões de unidades consumidoras) e dados do sistema comercial em Azure Data Factory
- Lakehouse em Databricks com camadas bronze, prata e ouro sobre Delta Lake
- Modelo preditivo de propensão a irregularidade com PySpark e MLflow

## Slide 5 — Como vamos trabalhar
- Discovery e desenho da arquitetura (4 semanas)
- Construção do lakehouse (10 semanas)
- Modelagem e piloto em 2 regionais (8 semanas)
- Rollout e operação assistida (4 semanas)
Duração total: 6 meses.

## Slide 6 — Por que nós
Experiência em Engenharia de Dados, Data Science / ML, Analytics & BI, Governança de Dados no segmento Utilities / Energia, com equipe de 1 arquiteto de dados, 3 engenheiros de dados, 2 cientistas de dados, 1 analista de BI e 1 gerente de projeto.

## Slide 7 — Próximos passos
Validar escopo com Roberto Lima (Gerente de Recuperação de Energia) e agendar o kickoff.
