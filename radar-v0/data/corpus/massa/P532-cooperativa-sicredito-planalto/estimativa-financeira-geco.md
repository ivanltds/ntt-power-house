---
projeto_id: P532
cliente: Cooperativa Sicrédito Planalto
titulo: Lakehouse Databricks no Azure para Centralização de Dados Financeiros
segmento: Serviços Financeiros
tecnologias: ["Databricks","Azure"]
servicos: ["Migração para Nuvem"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P532
id: P532-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-01-10
prazo_meses: 9
valor: 1670000
---

# Estimativa financeira (GECO) — Cooperativa Sicrédito Planalto

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Migração do data warehouse on-premises para Azure Data Lake Storage Gen2 com ingestão incremental via Azure Data Factory; Implementação de camadas bronze, silver e gold no Databricks com Delta Lake para 42 tabelas de negócio.
- Tecnologias assumidas: Databricks, Azure.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 9 meses.

Equipe estimada: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista Databricks, 1 analista de qualidade de dados e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 1.670.000 (sem contingência).

## Pontos em aberto

- Atraso na liberação de acessos às fontes legadas pelo time de infraestrutura do cliente
- Qualidade dos dados de cadastro de cooperados abaixo do esperado
- Dependência de janelas noturnas curtas para extração dos sistemas core
