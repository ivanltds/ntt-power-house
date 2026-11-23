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
id: P370-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2024-06-26
prazo_meses: 6
valor: 2290000
---

# Estimativa financeira (GECO) — Banco Cidadela

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão e modelagem de dados de crédito no Snowflake, integrando fontes de cadastro, bureau e transações via pipelines em Python na AWS; Desenvolvimento e validação de modelos de Machine Learning de propensão à inadimplência com Python (scikit-learn e XGBoost), incluindo explicabilidade.
- Tecnologias assumidas: Snowflake, AWS, Python, Machine Learning.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 6 meses.

Equipe estimada: 1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados, 1 especialista em governança de dados e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 2.290.000 (sem contingência).

## Pontos em aberto

- Qualidade e dispersão das fontes de dados de bureau podem atrasar a modelagem
- Baixa adesão das áreas de crédito ao novo processo decisório
- Restrições de compliance e LGPD na utilização de variáveis transacionais
