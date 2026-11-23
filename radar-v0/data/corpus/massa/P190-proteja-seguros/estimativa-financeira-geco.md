---
projeto_id: P190
cliente: Proteja Seguros
titulo: Motor de Precificação Dinâmica de Apólices com Dados em Tempo Real
segmento: Seguros
tecnologias: ["GCP","Databricks","Python"]
servicos: ["Analytics & BI"]
area: Data & Analytics
dono: Leonardo Pires
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P190
id: P190-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-06-06
prazo_meses: 4
valor: 1940000
---

# Estimativa financeira (GECO) — Proteja Seguros

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão de dados de sinistros, propostas e comportamento em GCP (Cloud Storage e Pub/Sub) com pipelines em Python; Camada analítica e modelos de precificação no Databricks, com Delta Lake e feature store para scoring em lote e quase real.
- Tecnologias assumidas: GCP, Databricks, Python.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 4 meses.

Equipe estimada: 1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados, 1 analista de BI e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 1.940.000 (sem contingência).

## Pontos em aberto

- Qualidade e defasagem dos dados históricos de sinistralidade
- Restrições regulatórias na alteração de prêmios por perfil
- Baixa adoção das novas faixas de prêmio pelas áreas comercial e de subscrição
