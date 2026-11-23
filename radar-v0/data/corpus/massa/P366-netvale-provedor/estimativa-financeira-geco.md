---
projeto_id: P366
cliente: NetVale Provedor
titulo: Detecção de Fraude em Tempo Real com Machine Learning para Provedor de Telecom
segmento: Telecom
tecnologias: ["Machine Learning","Kafka","Databricks"]
servicos: ["Data Science / ML","Engenharia de Dados"]
area: AI & Automation
dono: João Pedro Sales
confidencialidade: confidencial
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P366
id: P366-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-09-29
prazo_meses: 5
valor: 3160000
---

# Estimativa financeira (GECO) — NetVale Provedor

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão de eventos de recarga, ativação e uso em streaming com Apache Kafka, processando picos de 1.200 eventos por segundo.; Construção de pipeline de dados em camadas bronze/silver/gold no Databricks com governança e histórico de features..
- Tecnologias assumidas: Machine Learning, Kafka, Databricks.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 5 meses.

Equipe estimada: 1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 3.160.000 (sem contingência).

## Pontos em aberto

- Qualidade e atraso na disponibilização dos eventos históricos de recarga.
- Latência da API do cliente acima do alvo para scoring em tempo real.
- Volume elevado de falsos positivos impactando clientes legítimos.
