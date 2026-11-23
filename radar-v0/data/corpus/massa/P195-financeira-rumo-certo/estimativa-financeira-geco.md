---
projeto_id: P195
cliente: Financeira Rumo Certo
titulo: Migração de Data Warehouse para Nuvem com Databricks e GCP
segmento: Serviços Financeiros
tecnologias: ["GCP","Databricks","Azure"]
servicos: ["Engenharia de Dados"]
area: Cloud & Infra
dono: Carla Menezes
confidencialidade: interna
status_proposta: Em negociação
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P195
id: P195-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-09-06
prazo_meses: 5
valor: 1730000
---

# Estimativa financeira (GECO) — Financeira Rumo Certo

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Assessment das 180 tabelas e definição da arquitetura-alvo lakehouse com Databricks sobre armazenamento em GCP (BigQuery e Cloud Storage); Migração e reengenharia dos pipelines ETL/ELT, com orquestração em Databricks Workflows e paralelização das cargas.
- Tecnologias assumidas: GCP, Databricks, Azure.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 5 meses.

Equipe estimada: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em Databricks e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 1.730.000 (sem contingência).

## Pontos em aberto

- Qualidade e consistência dos dados legados nas 180 tabelas mapeadas
- Janela de cutover curta para relatórios regulatórios sem interrupção
- Dependência de acessos e liberações de rede entre GCP e Azure
