---
projeto_id: P370
cliente: Banco Cidadela
titulo: Modernização do modelo de risco de crédito com Snowflake e ML na nuvem AWS
segmento: Serviços Financeiros
tecnologias: ["Snowflake","AWS","Python","Machine Learning"]
servicos: ["Governança de Dados","Data Science / ML","Change Management"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P370
id: P370-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2024-07-09
prazo_meses: 7
---

# Apresentação Comercial — Banco Cidadela

## Slide 1 — Modernização do modelo de risco de crédito com Snowflake e ML na nuvem AWS

Banco Cidadela · Serviços Financeiros

## Slide 2 — O desafio

O Banco Cidadela opera com um modelo de risco de crédito baseado em planilhas e rotinas batch noturnas, o que gera atraso de até 36 horas na atualização do score de 2,4 milhões de clientes PF e PJ. A taxa de inadimplência acima de 90 dias cresceu para 5,8% na carteira de crédito pessoal, e a área de riscos não consegue testar novas variáveis com a agilidade exigida pelo regulador.

## Slide 3 — Nossa proposta

Construir um novo modelo de risco de crédito em Machine Learning sobre Snowflake e AWS, com governança de dados e gestão de mudança, reduzindo o ciclo de atualização do score para menos de 4 horas e elevando o poder discriminatório do modelo (Gini) em pelo menos 8 pontos percentuais.

## Slide 4 — Arquitetura e tecnologias

Snowflake · AWS · Python · Machine Learning

- Ingestão e modelagem de dados de crédito no Snowflake, integrando fontes de cadastro, bureau e transações via pipelines em Python na AWS
- Desenvolvimento e validação de modelos de Machine Learning de propensão à inadimplência com Python (scikit-learn e XGBoost), incluindo explicabilidade
- Implantação de esteira MLOps na AWS para treino, versionamento e monitoramento de deriva dos modelos

## Slide 5 — Como vamos trabalhar

- Diagnóstico e arquitetura de dados (6 semanas)
- Desenvolvimento e validação dos modelos de ML (10 semanas)
- Implantação em produção e MLOps (8 semanas)
- Governança e change management (4 semanas)

Duração total: 7 meses.

## Slide 6 — Por que nós

Experiência em Governança de Dados, Data Science / ML, Change Management, com projeto anterior entregue para a Banco Cidadela. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados, 1 especialista em governança de dados e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Diretora de Riscos de Crédito) e agendar o kickoff.
