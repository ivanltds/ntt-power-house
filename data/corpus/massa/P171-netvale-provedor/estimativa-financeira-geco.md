---
projeto_id: P171
cliente: NetVale Provedor
titulo: Streaming de dados em tempo real para operações de rede e consumo
segmento: Telecom
tecnologias: ["AWS","Databricks"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P171
id: P171-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-07-02
prazo_meses: 7
valor: 1510000
---

# Estimativa financeira (GECO) — NetVale Provedor

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão contínua de eventos de rede e consumo via Amazon Kinesis e AWS Lambda, com volume estimado de 40 mil eventos por segundo; Pipeline de dados em camadas bronze, silver e gold no Databricks com Delta Lake e processamento em streaming.
- Tecnologias assumidas: AWS, Databricks.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 7 meses.

Equipe estimada: 1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 1.510.000 (sem contingência).

## Pontos em aberto

- Qualidade e atraso na disponibilização das fontes de eventos pela área de redes
- Volume de eventos acima do previsto elevando custos de AWS e Databricks
- Baixa adoção dos painéis pelas áreas de negócio
