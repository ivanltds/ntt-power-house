---
projeto_id: P186
cliente: FibraMax Internet
titulo: Streaming de dados em tempo real para operações de rede e atendimento
segmento: Telecom
tecnologias: ["Databricks","Kafka","AWS","Python"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P186
id: P186-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2025-10-12
prazo_meses: 6
valor: 560000
---

# Estimativa financeira (GECO) — FibraMax Internet

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão contínua de eventos de rede e CRM via Apache Kafka, com tópicos particionados por região e retenção de 7 dias; Pipeline de processamento em streaming no Databricks com notebooks e jobs em Python para limpeza, enriquecimento e agregação.
- Tecnologias assumidas: Databricks, Kafka, AWS, Python.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 6 meses.

Equipe estimada: 1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 560.000 (sem contingência).

## Pontos em aberto

- Volume de eventos acima do previsto nos horários de pico
- Qualidade e padronização irregular dos eventos de rede legados
- Dependência de liberações de acesso e firewall pelo time de infraestrutura do cliente
