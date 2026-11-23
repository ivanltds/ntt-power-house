---
projeto_id: P557
cliente: Fintech Pagaí
titulo: Predição de churn e retenção para base de clientes PJ
segmento: Serviços Financeiros
tecnologias: ["Python","Salesforce","AWS","Databricks"]
servicos: ["Data Science / ML","CRM","Analytics & BI","Change Management"]
area: Data & Analytics
dono: André Vasconcelos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P557
id: P557-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2025-05-15
prazo_meses: 5
---

# Apresentação Comercial — Fintech Pagaí

## Slide 1 — Predição de churn e retenção para base de clientes PJ

Fintech Pagaí · Serviços Financeiros

## Slide 2 — O desafio

A Fintech Pagaí, com carteira de 180 mil clientes PJ e R$ 2,4 bi em volume transacionado anual, vinha perdendo 3,1% da base ativa por trimestre sem conseguir antecipar quais contas migrariam para concorrentes. Os sinais de risco estavam dispersos entre o CRM Salesforce, o data lake na AWS e extratos transacionais, sem modelo preditivo que priorizasse a ação dos times de relacionamento.

## Slide 3 — Nossa proposta

Construir e operacionalizar um modelo de propensão a churn com 90 dias de antecedência, integrado ao CRM, para direcionar campanhas de retenção sobre os segmentos de maior valor e reduzir a perda de receita recorrente.

## Slide 4 — Arquitetura e tecnologias

Python · Salesforce · AWS · Databricks

- Diagnóstico e engenharia de features sobre dados transacionais e cadastrais no Databricks, com pipelines em Python e armazenamento na AWS (S3 e Redshift)
- Desenvolvimento de modelos de classificação de churn em Python (XGBoost e regressão logística) com explicabilidade via SHAP e monitoramento de drift
- Integração dos scores ao Salesforce para acionar jornadas de retenção e filas de priorização para os gerentes de conta

## Slide 5 — Como vamos trabalhar

- Descoberta e diagnóstico de dados (4 semanas)
- Engenharia de dados e modelagem preditiva (9 semanas)
- Integração ao Salesforce e dashboards (5 semanas)
- Piloto, rollout e change management (4 semanas)

Duração total: 5 meses.

## Slide 6 — Por que nós

Experiência em Data Science / ML, CRM, Analytics & BI, Change Management, com projeto anterior entregue para a Fintech Pagaí. Equipe: 1 arquiteto de dados, 2 cientistas de dados, 1 engenheiro de dados, 1 consultor de CRM Salesforce e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Diretora de Experiência do Cliente) e agendar o kickoff.
