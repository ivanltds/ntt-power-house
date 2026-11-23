---
projeto_id: P434
cliente: Distribuidora Luz do Cerrado
titulo: Streaming de dados em tempo real para operações de distribuição de energia
segmento: Utilities / Energia
tecnologias: ["Azure","AWS"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Leonardo Pires
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P434
id: P434-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-02-01
prazo_meses: 7
valor: 1180000
---

# Estimativa financeira (GECO) — Distribuidora Luz do Cerrado

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão contínua de eventos de medidores e sensores via Azure Event Hubs e AWS Kinesis, com throughput projetado de 4.500 eventos por segundo no pico; Camada de processamento em stream no Azure Databricks Structured Streaming e AWS Glue para cálculo de perdas, interrupções e indicadores de qualidade em janelas de 1 a 5 minutos.
- Tecnologias assumidas: Azure, AWS.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 7 meses.

Equipe estimada: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em streaming e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 1.180.000 (sem contingência).

## Pontos em aberto

- Volume de eventos acima do previsto nos horários de pico
- Qualidade e padronização irregular dos dados de medidores legados
- Dependência de janelas de manutenção dos sistemas de campo do cliente
