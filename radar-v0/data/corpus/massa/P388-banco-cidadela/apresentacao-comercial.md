---
projeto_id: P388
cliente: Banco Cidadela
titulo: Plataforma de Detecção de Fraude em Tempo Real com Machine Learning
segmento: Serviços Financeiros
tecnologias: ["Databricks","Azure","Python"]
servicos: ["Data Science / ML"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P388
id: P388-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2024-07-25
prazo_meses: 6
---

# Apresentação Comercial — Banco Cidadela

## Slide 1 — Plataforma de Detecção de Fraude em Tempo Real com Machine Learning

Banco Cidadela · Serviços Financeiros

## Slide 2 — O desafio

O Banco Cidadela registrou R$ 48 milhões em perdas por fraude em transações de cartão nos últimos 12 meses, com taxa de falsos positivos de 32% nos bloqueios preventivos, gerando atrito com clientes e custo operacional elevado. A base de 2,3 milhões de clientes ativos processa cerca de 9 milhões de transações mensais, hoje analisadas por regras estáticas que não acompanham novos padrões de fraude.

## Slide 3 — Nossa proposta

Construir um modelo de detecção de fraude em tempo real baseado em machine learning na plataforma Databricks sobre Azure, reduzindo falsos positivos em pelo menos 40% e aumentando a detecção de fraudes confirmadas em 25% em seis meses.

## Slide 4 — Arquitetura e tecnologias

Databricks · Azure · Python

- Ingestão e tratamento de dados transacionais e cadastrais em Databricks sobre Azure, com pipelines em Python para features de comportamento de uso
- Desenvolvimento e treinamento de modelos de classificação de fraude em Python (scikit-learn e MLflow) com validação temporal e explicabilidade
- Implementação de scoring em tempo real com latência alvo inferior a 300 ms por transação, integrado ao motor de decisão antifraude

## Slide 5 — Como vamos trabalhar

- Diagnóstico e desenho da arquitetura (4 semanas)
- Engenharia de dados e features no Databricks (6 semanas)
- Modelagem, validação e integração do scoring em tempo real (9 semanas)
- Monitoramento, documentação e transferência de conhecimento (5 semanas)

Duração total: 6 meses.

## Slide 6 — Por que nós

Experiência em Data Science / ML, com projeto anterior entregue para a Banco Cidadela. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Diretora de Prevenção a Fraudes) e agendar o kickoff.
