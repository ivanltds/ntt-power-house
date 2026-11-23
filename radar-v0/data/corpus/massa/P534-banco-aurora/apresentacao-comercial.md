---
projeto_id: P534
cliente: Banco Aurora
titulo: Detecção de Fraude em Tempo Real com Machine Learning no Open Finance
segmento: Serviços Financeiros
tecnologias: ["Python","Databricks","Azure"]
servicos: ["Data Science / ML","Engenharia de Dados","Change Management"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P534
id: P534-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-02-12
prazo_meses: 6
---

# Apresentação Comercial — Banco Aurora

## Slide 1 — Detecção de Fraude em Tempo Real com Machine Learning no Open Finance

Banco Aurora · Serviços Financeiros

## Slide 2 — O desafio

O Banco Aurora registrou R$ 187 milhões em perdas por fraude em 2024, com 42% dos casos envolvendo transações PIX acima de R$ 5 mil detectadas apenas após a liquidação. A esteira atual de análise manual cobre somente 18% das transações suspeitas em menos de 15 minutos, gerando chargebacks e impacto regulatório.

## Slide 3 — Nossa proposta

Implantar um motor de detecção de fraude em tempo real com modelos de machine learning sobre Databricks no Azure, reduzindo a latência de detecção para menos de 2 segundos e ampliando a cobertura automatizada para 85% das transações de alto risco em 6 meses.

## Slide 4 — Arquitetura e tecnologias

Python · Databricks · Azure

- Ingestão em streaming de transações PIX e cartões via Azure Event Hubs com pipelines em Python e Databricks Structured Streaming
- Construção de feature store e engenharia de atributos comportamentais no Databricks Delta Lake sobre Azure Data Lake Storage
- Treinamento e validação de modelos supervisionados de detecção de fraude em Python (scikit-learn e MLflow) com explicabilidade por SHAP

## Slide 5 — Como vamos trabalhar

- Diagnóstico e desenho da arquitetura (5 semanas)
- Engenharia de dados e feature store (7 semanas)
- Modelagem, validação e integração em tempo real (8 semanas)
- Piloto assistido e change management (6 semanas)

Duração total: 6 meses.

## Slide 6 — Por que nós

Experiência em Data Science / ML, Engenharia de Dados, Change Management, com projeto anterior entregue para a Banco Aurora. Equipe: 1 arquiteto de soluções, 1 gerente de projeto, 2 engenheiros de dados, 2 cientistas de dados e 1 especialista em change management..

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Diretora de Riscos e Compliance) e agendar o kickoff.
