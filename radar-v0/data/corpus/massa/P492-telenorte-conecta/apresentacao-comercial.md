---
projeto_id: P492
cliente: TeleNorte Conecta
titulo: Predição de churn e retenção com Databricks e Machine Learning para operadora de telecom
segmento: Telecom
tecnologias: ["Databricks","Machine Learning","Python"]
servicos: ["CRM"]
area: Data & Analytics
dono: Quésia Ramos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P492
id: P492-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-02-26
prazo_meses: 4
---

# Apresentação Comercial — TeleNorte Conecta

## Slide 1 — Predição de churn e retenção com Databricks e Machine Learning para operadora de telecom

TeleNorte Conecta · Telecom

## Slide 2 — O desafio

A TeleNorte Conecta, operadora de telecom com 2,3 milhões de clientes residenciais e empresariais, vinha perdendo cerca de 1,8% da base por mês (aproximadamente 41 mil clientes), com impacto estimado de R$ 12 milhões mensais em receita recorrente. O CRM não conseguia priorizar ações de retenção: as campanhas eram disparadas em massa, com taxa de resposta inferior a 4%, e o time de relacionamento não tinha visibilidade do risco de cancelamento por cliente.

## Slide 3 — Nossa proposta

Construir um modelo de predição de churn por cliente, integrado ao CRM, para orientar ações de retenção segmentadas e reduzir a perda mensal de base em pelo menos 20% em 4 meses.

## Slide 4 — Arquitetura e tecnologias

Databricks · Machine Learning · Python

- Ingestão e tratamento de dados de consumo, faturamento, reclamações e interações do CRM em Databricks, com pipelines em Python para 18 fontes e histórico de 24 meses.
- Engenharia de atributos e treinamento de modelos de Machine Learning de classificação de churn (gradient boosting e regressão logística) com validação temporal e explicabilidade por variável.
- Publicação de scores de propensão ao churn e propensão de aceite de oferta diretamente no CRM, com atualização diária e regras de priorização para o time de retenção.

## Slide 5 — Como vamos trabalhar

- Diagnóstico e preparação de dados (5 semanas)
- Modelagem e validação de Machine Learning (6 semanas)
- Integração ao CRM e piloto de retenção (4 semanas)
- Rollout, monitoramento e transferência de conhecimento (3 semanas)

Duração total: 4 meses.

## Slide 6 — Por que nós

Experiência em CRM, com projeto anterior entregue para a TeleNorte Conecta. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados, 1 consultor de CRM e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Diretora de CRM e Retenção) e agendar o kickoff.
