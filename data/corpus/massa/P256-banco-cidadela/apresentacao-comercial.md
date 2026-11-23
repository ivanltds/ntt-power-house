---
projeto_id: P256
cliente: Banco Cidadela
titulo: Governança de Dados e Conformidade LGPD em Plataforma Analítica Unificada
segmento: Serviços Financeiros
tecnologias: ["Databricks","Snowflake","Azure"]
servicos: ["Governança de Dados"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: interna
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P256
id: P256-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-09-25
prazo_meses: 4
---

# Apresentação Comercial — Banco Cidadela

## Slide 1 — Governança de Dados e Conformidade LGPD em Plataforma Analítica Unificada

Banco Cidadela · Serviços Financeiros

## Slide 2 — O desafio

O Banco Cidadela opera com 4 fontes analíticas distintas (Databricks, Snowflake e Azure Synapse) sem catálogo corporativo único, o que gera cerca de 1.200 ativos de dados sem classificação de sensibilidade e 38% dos relatórios regulatórios sem linhagem documentada. O passivo de mapeamento de dados pessoais expõe o banco a riscos de autuação pela ANPD e a retrabalho estimado em 2.400 horas/ano em auditorias internas.

## Slide 3 — Nossa proposta

Implantar um framework de governança de dados e conformidade LGPD sobre Databricks, Snowflake e Azure, com catálogo, classificação de dados pessoais e linhagem ponta a ponta, reduzindo o esforço de auditoria em 60%.

## Slide 4 — Arquitetura e tecnologias

Databricks · Snowflake · Azure

- Implantação de catálogo corporativo de dados no Azure Purview integrado às camadas Databricks e Snowflake
- Classificação automática de dados pessoais e sensíveis (LGPD art. 5º) em 1.200 ativos via políticas de tagging no Databricks Unity Catalog
- Mapeamento de linhagem de dados ponta a ponta entre ingestão Azure Data Factory, Databricks e consumo em Snowflake

## Slide 5 — Como vamos trabalhar

- Diagnóstico e desenho do framework (4 semanas)
- Implantação do catálogo e classificação LGPD (6 semanas)
- Linhagem, políticas de acesso e ROPA (4 semanas)
- Sustentação, treinamento e go-live (2 semanas)

Duração total: 4 meses.

## Slide 6 — Por que nós

Experiência em Governança de Dados, com projeto anterior entregue para a Banco Cidadela. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em privacidade/LGPD e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Villaça (Diretora de Dados e Analytics) e agendar o kickoff.
