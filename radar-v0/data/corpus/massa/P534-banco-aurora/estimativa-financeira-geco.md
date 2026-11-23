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
id: P534-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-01-30
prazo_meses: 5
valor: 1660000
---

# Estimativa financeira (GECO) — Banco Aurora

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão em streaming de transações PIX e cartões via Azure Event Hubs com pipelines em Python e Databricks Structured Streaming; Construção de feature store e engenharia de atributos comportamentais no Databricks Delta Lake sobre Azure Data Lake Storage.
- Tecnologias assumidas: Python, Databricks, Azure.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 5 meses.

Equipe estimada: 1 arquiteto de soluções, 1 gerente de projeto, 2 engenheiros de dados, 2 cientistas de dados e 1 especialista em change management..

## Valor de referência

Valor preliminar: R$ 1.660.000 (sem contingência).

## Pontos em aberto

- Baixa qualidade e atraso na liberação dos dados históricos de transações
- Restrições de LGPD na utilização de dados de clientes para treinamento
- Resistência dos analistas de risco à adoção do novo fluxo assistido por alertas
