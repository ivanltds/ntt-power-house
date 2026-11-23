---
projeto_id: P411
cliente: TeleNorte Conecta
titulo: Pipeline de streaming em tempo real para rede e faturamento
segmento: Telecom
tecnologias: ["Kafka","Databricks","Python","Azure"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P411
id: P411-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-10-07
prazo_meses: 5
valor: 760000
---

# Estimativa financeira (GECO) — TeleNorte Conecta

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão contínua de eventos de rede e bilhetagem com Apache Kafka no Azure Event Hubs, com tópicos particionados por domínio e retenção de 7 dias.; Processamento de streams com Databricks Structured Streaming e pipelines em Python para enriquecimento, deduplicação e agregação de consumo por assinante..
- Tecnologias assumidas: Kafka, Databricks, Python, Azure.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 5 meses.

Equipe estimada: 1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em streaming e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 760.000 (sem contingência).

## Pontos em aberto

- Volume de eventos acima do previsto pode exigir reparticionamento dos tópicos Kafka.
- Dependência de liberação de acessos e conectividade com sistemas legados de bilhetagem.
- Qualidade inconsistente dos eventos de origem pode gerar retrabalho nas regras de deduplicação.
