---
projeto_id: P330
cliente: TeleNorte Conecta
titulo: Streaming de dados em tempo real para operações de rede e atendimento
segmento: Telecom
tecnologias: ["Azure","Databricks"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: confidencial
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P330
id: P330-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2024-07-12
prazo_meses: 7
valor: 1690000
---

# Estimativa financeira (GECO) — TeleNorte Conecta

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão de eventos de rede e atendimento via Azure Event Hubs e Kafka, com processamento em streaming no Databricks (Structured Streaming).; Construção de pipelines de dados em tempo real com Delta Lake na Azure, garantindo confiabilidade e escalabilidade para 1,8 TB/dia..
- Tecnologias assumidas: Azure, Databricks.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 7 meses.

Equipe estimada: 1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em BI e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 1.690.000 (sem contingência).

## Pontos em aberto

- Volume de dados acima do previsto durante picos de tráfego
- Integração com sistemas legados de rede com protocolos proprietários
- Resistência à mudança por parte das equipes operacionais
