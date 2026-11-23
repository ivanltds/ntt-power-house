---
projeto_id: P183
cliente: Banco Horizonte Sul
titulo: Pipeline de dados em tempo real para análise de risco e crédito com Azure e Python
segmento: Serviços Financeiros
tecnologias: ["Python","Azure"]
servicos: ["Engenharia de Dados","Analytics & BI"]
area: Data & Analytics
dono: Úrsula Campos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P183
id: P183-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2024-06-13
prazo_meses: 5
valor: 580000
---

# Estimativa financeira (GECO) — Banco Horizonte Sul

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão contínua de eventos transacionais via Azure Event Hubs, com 15 mil mensagens por segundo de pico; Processamento e transformação em streaming com Python no Azure Databricks, aplicando regras de qualidade e deduplicação.
- Tecnologias assumidas: Python, Azure.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 5 meses.

Equipe estimada: 1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 580.000 (sem contingência).

## Pontos em aberto

- Volume de picos transacionais acima do previsto comprometer a latência
- Qualidade inconsistente nos eventos de origem gerar descartes indevidos
- Dependência de janelas de mudança em sistemas legados do banco
