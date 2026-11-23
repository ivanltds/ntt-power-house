---
projeto_id: P156
cliente: Agência Estadual de Trânsito
titulo: Migração do Data Warehouse para Snowflake na Nuvem Azure
segmento: Setor Público
tecnologias: ["Snowflake","Azure"]
servicos: ["Engenharia de Dados","Migração para Nuvem"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P156
id: P156-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-05-17
prazo_meses: 8
valor: 1100000
---

# Estimativa financeira (GECO) — Agência Estadual de Trânsito

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Assessment e mapeamento dos 4,2 TB de dados e dos 180 processos de ETL existentes, com plano de migração para Snowflake; Reengenharia dos pipelines de ingestão e transformação com Azure Data Factory e Snowflake Tasks, adotando modelagem dimensional em camadas Bronze, Silver e Gold.
- Tecnologias assumidas: Snowflake, Azure.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 8 meses.

Equipe estimada: 1 gerente de projeto, 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em cloud Azure e 1 analista de qualidade de dados.

## Valor de referência

Valor preliminar: R$ 1.100.000 (sem contingência).

## Pontos em aberto

- Atraso na liberação de acessos e redes pelo órgão de TI do cliente
- Divergências de dados na reconciliação entre ambiente legado e Snowflake
- Janela de cutover limitada pelos períodos de maior demanda do órgão
