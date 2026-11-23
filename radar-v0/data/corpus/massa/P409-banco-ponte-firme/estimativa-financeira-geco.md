---
projeto_id: P409
cliente: Banco Ponte Firme
titulo: Streaming de Dados em Tempo Real para Análise de Transações
segmento: Serviços Financeiros
tecnologias: ["Kafka","Databricks"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: interna
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P409
id: P409-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-09-19
prazo_meses: 8
valor: 1140000
---

# Estimativa financeira (GECO) — Banco Ponte Firme

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão de eventos transacionais em tempo real usando Apache Kafka, com tópicos particionados para garantir ordem e throughput de até 10.000 mensagens por segundo.; Processamento de streams com Databricks Structured Streaming para cálculos de agregações e detecção de anomalias em janelas de tempo..
- Tecnologias assumidas: Kafka, Databricks.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 8 meses.

Equipe estimada: 1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em streaming e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 1.140.000 (sem contingência).

## Pontos em aberto

- Complexidade na integração com sistemas legados de origem.
- Volume de dados superior ao previsto durante picos de transação.
- Dependência de equipe do cliente para validação de regras de negócio.
