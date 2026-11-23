---
projeto_id: P291
cliente: Conecta Brasil Telecom
titulo: Plataforma de streaming de dados em tempo real para analytics de rede
segmento: Telecom
tecnologias: ["Python","Azure"]
servicos: ["Analytics & BI"]
area: Data & Analytics
dono: Zilda Correia
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P291
id: P291-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-02-07
prazo_meses: 6
valor: 630000
---

# Estimativa financeira (GECO) — Conecta Brasil Telecom

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão contínua de eventos de rede (CDRs, KPIs de células e alarmes) via Azure Event Hubs, com volume estimado de 25 mil eventos por segundo; Processamento de streams em Python com Azure Databricks Structured Streaming para cálculo de indicadores de qualidade em janelas de 1 e 5 minutos.
- Tecnologias assumidas: Python, Azure.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 6 meses.

Equipe estimada: 1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em BI e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 630.000 (sem contingência).

## Pontos em aberto

- Volume real de eventos acima do estimado, exigindo redimensionamento do Event Hubs
- Qualidade e padronização dos dados de origem de diferentes sistemas de rede
- Baixa adoção dos novos painéis pelas áreas operacionais
