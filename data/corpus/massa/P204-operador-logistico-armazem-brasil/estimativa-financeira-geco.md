---
projeto_id: P204
cliente: Operador Logístico Armazém Brasil
titulo: Streaming de dados em tempo real para operação logística com Databricks e Kafka
segmento: Logística
tecnologias: ["Databricks","Kafka"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Zilda Correia
confidencialidade: confidencial
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P204
id: P204-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2025-12-27
prazo_meses: 5
valor: 1220000
---

# Estimativa financeira (GECO) — Operador Logístico Armazém Brasil

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão de eventos de WMS, TMS e rastreadores de frota em tópicos Kafka, com 14 fluxos e volume estimado de 2.500 eventos por segundo no pico; Construção de pipelines de streaming no Databricks (Delta Live Tables) em camadas bronze, prata e ouro, com regras de deduplicação e tratamento de eventos fora de ordem.
- Tecnologias assumidas: Databricks, Kafka.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 5 meses.

Equipe estimada: 1 arquiteto de dados, 3 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 1.220.000 (sem contingência).

## Pontos em aberto

- Latência e indisponibilidade dos sistemas de origem (WMS e TMS) comprometendo a ingestão contínua
- Qualidade e padronização dos eventos de rastreamento de frota enviados por operadores terceiros
- Capacidade do cluster Databricks durante picos sazonais de volume logístico
