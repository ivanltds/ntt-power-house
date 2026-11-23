---
projeto_id: P115
cliente: Operadora Sinal Forte
titulo: Streaming de dados em tempo real para operadora de telecom
segmento: Telecom
tecnologias: ["Databricks","Kafka"]
servicos: ["Engenharia de Dados","Analytics & BI","Change Management"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P115
id: P115-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2024-04-24
prazo_meses: 8
valor: 680000
---

# Estimativa financeira (GECO) — Operadora Sinal Forte

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão contínua de eventos de rede e de uso em tópicos Kafka, com volumes de 40 milhões de eventos/dia; Pipeline de streaming estruturado no Databricks com camadas bronze, silver e gold e governança de dados.
- Tecnologias assumidas: Databricks, Kafka.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 8 meses.

Equipe estimada: 1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 680.000 (sem contingência).

## Pontos em aberto

- Volume de eventos acima do previsto nos horários de pico
- Qualidade e padronização dos eventos de rede de múltiplos vendors
- Baixa adoção dos dashboards pelos times operacionais
