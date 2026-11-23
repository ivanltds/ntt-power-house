---
projeto_id: P160
cliente: Gás Canalizado Litoral
titulo: Manutenção preditiva de ativos de distribuição com Azure, Databricks e SAP
segmento: Utilities / Energia
tecnologias: ["Azure","Databricks","SAP","Python"]
servicos: ["Data Science / ML"]
area: AI & Automation
dono: Yuri Monteiro
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P160
id: P160-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-06-12
prazo_meses: 6
---

# Apresentação Comercial — Gás Canalizado Litoral

## Slide 1 — Manutenção preditiva de ativos de distribuição com Azure, Databricks e SAP

Gás Canalizado Litoral · Utilities / Energia

## Slide 2 — O desafio

A Gás Canalizado Litoral opera cerca de 4.200 km de rede e 38 estações de redução de pressão, com paradas não programadas que consumiram 11.400 horas de operação no último ano e geraram R$ 7,8 milhões em custos de contingência. Hoje a manutenção é majoritariamente corretiva e preventiva por calendário, com dados de sensores dispersos entre o SAP PM e planilhas locais, sem modelo analítico para antecipar falhas.

## Slide 3 — Nossa proposta

Implantar uma solução de manutenção preditiva que antecipe falhas em ativos críticos (compressores, válvulas e reguladores) com horizonte de 7 a 15 dias, reduzindo paradas não programadas em pelo menos 25% em 12 meses.

## Slide 4 — Arquitetura e tecnologias

Azure · Databricks · SAP · Python

- Ingestão e orquestração dos dados de sensores IoT e histórico de manutenção do SAP PM no Azure Data Lake, com pipelines em Databricks
- Feature engineering e treinamento de modelos de classificação e regressão em Python no Databricks para previsão de falha e RUL (vida útil remanescente)
- Integração dos scores preditivos ao SAP PM para geração automática de ordens de serviço priorizadas

## Slide 5 — Como vamos trabalhar

- Diagnóstico e preparação de dados (6 semanas)
- Modelagem e validação com especialistas de manutenção (10 semanas)
- Integração com SAP PM e dashboards (6 semanas)
- Go-live assistido e transferência de conhecimento (2 semanas)

Duração total: 6 meses.

## Slide 6 — Por que nós

Experiência em Data Science / ML, com projeto anterior entregue para a Gás Canalizado Litoral. Equipe: 1 gerente de projeto, 1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 consultor SAP PM.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Gerente de Manutenção de Ativos) e agendar o kickoff.
