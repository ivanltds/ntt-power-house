---
projeto_id: P553
cliente: Banco Atlântida Digital
titulo: Detecção de Fraude em Tempo Real com Databricks e Kafka no Banco Atlântida Digital
segmento: Serviços Financeiros
tecnologias: ["Kafka","Databricks","Azure","Python"]
servicos: ["Data Science / ML","Change Management"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P553
id: P553-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-05-17
prazo_meses: 2
valor: 740000
---

# Estimativa financeira (GECO) — Banco Atlântida Digital

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão de eventos transacionais via Kafka com throughput estimado de 60 msg/s e retenção de 7 dias; Pipeline de features e treinamento de modelos de ML em Databricks com Python (scikit-learn e MLflow).
- Tecnologias assumidas: Kafka, Databricks, Azure, Python.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 2 meses.

Equipe estimada: 1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados sênior, 1 especialista em Change Management e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 740.000 (sem contingência).

## Pontos em aberto

- Qualidade e atraso na entrega dos dados históricos de transações pelo cliente
- Latência do scoring em tempo real acima de 200 ms
- Baixa adesão dos analistas de risco ao novo fluxo de decisão
