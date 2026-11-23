---
projeto_id: P300
cliente: Financeira Rumo Certo
titulo: Plataforma de Indicadores ESG e Emissões para Serviços Financeiros
segmento: Serviços Financeiros
tecnologias: ["Power BI","Snowflake","Azure"]
servicos: ["Governança de Dados"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: confidencial
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P300
id: P300-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2025-09-12
prazo_meses: 5
---

# Apresentação Comercial — Financeira Rumo Certo

## Slide 1 — Plataforma de Indicadores ESG e Emissões para Serviços Financeiros

Financeira Rumo Certo · Serviços Financeiros

## Slide 2 — O desafio

A Financeira Rumo Certo reporta hoje seus indicadores ESG em 14 planilhas mantidas por 5 áreas, com fechamento mensal que consome 9 dias úteis e divergências de até 12% nos números de emissões entre relatórios internos e o reporte ao regulador. A ausência de uma base única de dados de emissões (Escopos 1, 2 e 3) expõe a companhia a ressalvas em auditorias e a riscos de reputação junto a investidores.

## Slide 3 — Nossa proposta

Centralizar e governar os dados de indicadores ESG e emissões em uma plataforma analítica única, reduzindo o ciclo de fechamento mensal para até 3 dias úteis e garantindo rastreabilidade dos números reportados.

## Slide 4 — Arquitetura e tecnologias

Power BI · Snowflake · Azure

- Ingestão no Snowflake de 11 fontes de dados (ERP, planilhas de facilities, frotas, energia e RH) com pipelines orquestrados no Azure Data Factory
- Modelagem dimensional de emissões por Escopo 1, 2 e 3 e de indicadores sociais e de governança no Snowflake
- Camada semântica e 6 dashboards no Power BI para reporte mensal, auditoria e comitê de sustentabilidade

## Slide 5 — Como vamos trabalhar

- Diagnóstico e arquitetura de dados (5 semanas)
- Ingestão e modelagem no Snowflake (7 semanas)
- Dashboards Power BI e camada semântica (5 semanas)
- Governança, qualidade e rollout (5 semanas)

Duração total: 5 meses.

## Slide 6 — Por que nós

Experiência em Governança de Dados, com projeto anterior entregue para a Financeira Rumo Certo. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Marina Toledo (Gerente de Sustentabilidade e Reporte) e agendar o kickoff.
