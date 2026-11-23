---
projeto_id: P424
cliente: Crédito Fácil Brasil
titulo: Pipeline de detecção de fraude em tempo real com Databricks e Kafka
segmento: Serviços Financeiros
tecnologias: ["Databricks","Kafka"]
servicos: ["Engenharia de Dados"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P424
id: P424-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2025-03-05
prazo_meses: 5
valor: 990000
---

# Estimativa financeira (GECO) — Crédito Fácil Brasil

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão de eventos transacionais em streaming com Apache Kafka, com tópicos segregados por canal e retenção de 7 dias; Construção de camadas bronze, silver e gold no Databricks com Delta Lake, incluindo histórico de 18 meses de transações.
- Tecnologias assumidas: Databricks, Kafka.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 5 meses.

Equipe estimada: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em streaming e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 990.000 (sem contingência).

## Pontos em aberto

- Qualidade e atraso na entrega dos eventos pelos sistemas de origem
- Latência do motor antifraude do cliente incompatível com o SLA de 2 minutos
- Dependência de aprovação de segurança para tráfego de dados sensíveis
