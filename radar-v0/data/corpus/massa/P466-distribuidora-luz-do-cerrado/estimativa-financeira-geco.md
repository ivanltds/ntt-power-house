---
projeto_id: P466
cliente: Distribuidora Luz do Cerrado
titulo: Streaming de dados em tempo real para operações de distribuição de energia
segmento: Utilities / Energia
tecnologias: ["Azure","AWS"]
servicos: ["Engenharia de Dados","Analytics & BI"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P466
id: P466-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2024-07-04
prazo_meses: 7
valor: 3180000
---

# Estimativa financeira (GECO) — Distribuidora Luz do Cerrado

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão contínua de eventos de medidores e sensores de rede via Azure Event Hubs e AWS Kinesis, com volume estimado de 4 TB/dia; Pipeline de processamento em streaming com Azure Stream Analytics e AWS Lambda para enriquecimento e detecção de anomalias.
- Tecnologias assumidas: Azure, AWS.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 7 meses.

Equipe estimada: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em analytics e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 3.180.000 (sem contingência).

## Pontos em aberto

- Latência e throughput dos conectores legados de medição
- Complexidade de operação simultânea em Azure e AWS
- Dependência de janelas de manutenção dos sistemas de campo
