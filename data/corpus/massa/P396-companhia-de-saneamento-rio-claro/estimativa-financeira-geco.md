---
projeto_id: P396
cliente: Companhia de Saneamento Rio Claro
titulo: Detecção de Fraude em Tempo Real com Machine Learning e Kafka
segmento: Utilities / Energia
tecnologias: ["Machine Learning","Kafka"]
servicos: ["Data Science / ML"]
area: AI & Automation
dono: Karina Duarte
confidencialidade: confidencial
status_proposta: Em negociação
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P396
id: P396-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-07-03
prazo_meses: 6
valor: 880000
---

# Estimativa financeira (GECO) — Companhia de Saneamento Rio Claro

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão contínua de leituras de hidrômetros e eventos de campo via Apache Kafka, com tópicos segregados por região e latência máxima de 5 segundos; Modelos de Machine Learning para scoring de anomalias de consumo, com explicabilidade das variáveis e retreino mensal.
- Tecnologias assumidas: Machine Learning, Kafka.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 6 meses.

Equipe estimada: 1 arquiteto de dados, 2 cientistas de dados, 1 engenheiro de dados, 1 especialista em Kafka e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 880.000 (sem contingência).

## Pontos em aberto

- Qualidade e atraso na entrega das bases históricas de consumo e vistorias
- Baixa adesão das equipes de campo ao novo ranking de priorização
- Deriva de comportamento de fraude que reduza a precisão do modelo após o go-live
