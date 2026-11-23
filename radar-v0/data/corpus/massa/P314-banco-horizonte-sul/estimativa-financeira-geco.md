---
projeto_id: P314
cliente: Banco Horizonte Sul
titulo: Pipeline de dados em tempo real com Kafka e Databricks para analytics financeiro
segmento: Serviços Financeiros
tecnologias: ["Kafka","Databricks","Python","AWS"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P314
id: P314-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2024-07-04
prazo_meses: 7
valor: 630000
---

# Estimativa financeira (GECO) — Banco Horizonte Sul

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão de eventos transacionais com Kafka (MSK) a partir dos 3 sistemas de origem, com tópicos por domínio e retenção de 7 dias; Camada de processamento e qualidade com Databricks (Delta Live Tables) e jobs em Python para deduplicação e enriquecimento.
- Tecnologias assumidas: Kafka, Databricks, Python, AWS.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 7 meses.

Equipe estimada: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em streaming e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 630.000 (sem contingência).

## Pontos em aberto

- Latência dos sistemas legados comprometer o SLA de 5 segundos
- Qualidade e duplicidade dos eventos de origem
- Baixa adoção das áreas de risco e tesouraria no novo modelo em tempo real
