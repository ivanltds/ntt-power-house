---
projeto_id: P470
cliente: Banco Horizonte Sul
titulo: Plataforma Lakehouse com Kafka e Databricks para Análise de Crédito e Risco
segmento: Serviços Financeiros
tecnologias: ["Kafka","Databricks"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P470
id: P470-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-05-23
prazo_meses: 9
valor: 640000
---

# Estimativa financeira (GECO) — Banco Horizonte Sul

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão em streaming de eventos transacionais e de crédito via Apache Kafka, com tópicos segmentados por domínio de negócio; Implementação do lakehouse no Databricks com arquitetura medallion (bronze, silver e gold) sobre armazenamento em nuvem.
- Tecnologias assumidas: Kafka, Databricks.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 9 meses.

Equipe estimada: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em Kafka e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 640.000 (sem contingência).

## Pontos em aberto

- Latência e volume de eventos Kafka acima do previsto podem exigir redimensionamento do cluster
- Dependência de liberação de acessos às fontes legadas pelo time de infraestrutura do banco
- Mudanças em requisitos regulatórios durante a construção da camada gold
