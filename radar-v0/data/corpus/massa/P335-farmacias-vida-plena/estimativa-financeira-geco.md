---
projeto_id: P335
cliente: Farmácias Vida Plena
titulo: Lakehouse de Dados para Varejo Farmacêutico com Kafka, Databricks e Nuvem Híbrida
segmento: Varejo
tecnologias: ["Kafka","AWS","Azure","Databricks"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P335
id: P335-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-03-14
prazo_meses: 9
valor: 680000
---

# Estimativa financeira (GECO) — Farmácias Vida Plena

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão em streaming de eventos de PDV e e-commerce com Apache Kafka, com throughput estimado de 15 mil eventos por segundo em picos promocionais; Implementação de lakehouse no Databricks sobre armazenamento na AWS (S3) e Azure Data Lake Storage, com camadas bronze, silver e gold e governança via Unity Catalog.
- Tecnologias assumidas: Kafka, AWS, Azure, Databricks.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 9 meses.

Equipe estimada: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em streaming Kafka, 1 analista de governança de dados e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 680.000 (sem contingência).

## Pontos em aberto

- Qualidade inconsistente dos dados de estoque oriundos de 420 lojas com cadastros divergentes
- Latência ou indisponibilidade do CDC do ERP legado durante janelas de fechamento fiscal
- Baixa adoção das áreas de negócio por dependência de planilhas e relatórios manuais
