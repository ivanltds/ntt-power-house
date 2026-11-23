---
projeto_id: P483
cliente: Fintech Pagaí
titulo: Plataforma de detecção de fraude em tempo real com Databricks e Kafka
segmento: Serviços Financeiros
tecnologias: ["Databricks","Azure","Kafka"]
servicos: ["Engenharia de Dados","Change Management"]
area: AI & Automation
dono: Karina Duarte
confidencialidade: interna
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P483
id: P483-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-11-06
prazo_meses: 6
valor: 310000
---

# Estimativa financeira (GECO) — Fintech Pagaí

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão de eventos transacionais em streaming com Apache Kafka no Azure, com tópicos particionados por canal de pagamento e retenção de 7 dias; Construção de pipelines de Engenharia de Dados no Databricks (Delta Lake) para camadas bronze, prata e ouro, com orquestração horária e qualidade de dados automatizada.
- Tecnologias assumidas: Databricks, Azure, Kafka.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 6 meses.

Equipe estimada: 1 arquiteto de dados, 3 engenheiros de dados, 1 cientista de dados, 1 especialista em change management e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 310.000 (sem contingência).

## Pontos em aberto

- Qualidade e completude dos eventos transacionais enviados ao Kafka
- Latência da infraestrutura Azure acima do SLA de 2 minutos
- Baixa adoção dos novos alertas priorizados pelos analistas de risco
