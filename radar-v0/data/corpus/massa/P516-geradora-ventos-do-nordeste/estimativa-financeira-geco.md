---
projeto_id: P516
cliente: Geradora Ventos do Nordeste
titulo: Streaming de dados em tempo real para operação e manutenção de parques eólicos
segmento: Utilities / Energia
tecnologias: ["Kafka","Azure"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: confidencial
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P516
id: P516-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-07-06
prazo_meses: 6
valor: 5280000
---

# Estimativa financeira (GECO) — Geradora Ventos do Nordeste

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Configuração de cluster Kafka na Azure (HDInsight ou Confluent Cloud) para ingestão de telemetria de 480 aerogeradores; Desenvolvimento de pipelines de streaming com Azure Stream Analytics e Kafka Streams para cálculo de KPIs em tempo real.
- Tecnologias assumidas: Kafka, Azure.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 6 meses.

Equipe estimada: 1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 5.280.000 (sem contingência).

## Pontos em aberto

- Volume e velocidade dos dados podem exigir ajustes no dimensionamento do cluster Kafka
- Integração com sistemas legados de SCADA pode apresentar incompatibilidades de protocolo
- Disponibilidade de dados históricos para treinamento dos modelos preditivos
