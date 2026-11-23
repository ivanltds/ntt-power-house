---
projeto_id: P401
cliente: Tríade Telecom
titulo: Plataforma de Dados em Tempo Real para Streaming com Azure, AWS e Databricks
segmento: Telecom
tecnologias: ["Azure","AWS","Databricks"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P401
id: P401-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-11-05
prazo_meses: 3
valor: 270000
---

# Estimativa financeira (GECO) — Tríade Telecom

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão contínua de eventos de rede e bilhetagem via Azure Event Hubs e AWS Kinesis, com throughput de até 4 mil eventos por segundo; Pipeline de processamento em camadas Bronze, Silver e Gold com Databricks e Delta Lake, incluindo deduplicação e enriquecimento com cadastro de assinantes.
- Tecnologias assumidas: Azure, AWS, Databricks.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 3 meses.

Equipe estimada: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em Databricks, 1 analista de BI e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 270.000 (sem contingência).

## Pontos em aberto

- Latência de rede entre Azure e AWS acima do previsto para o volume de 4 mil eventos por segundo
- Qualidade e padronização dos eventos de bilhetagem nas fontes legadas
- Dependência de janelas de acesso e liberação de firewall pelos times de infraestrutura do cliente
