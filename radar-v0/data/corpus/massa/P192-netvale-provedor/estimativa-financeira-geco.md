---
projeto_id: P192
cliente: NetVale Provedor
titulo: Pipeline de Dados em Tempo Real com Streaming Kafka no Azure
segmento: Telecom
tecnologias: ["Kafka","Azure","Python"]
servicos: ["Engenharia de Dados","Analytics & BI"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P192
id: P192-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-09-10
prazo_meses: 4
valor: 950000
---

# Estimativa financeira (GECO) — NetVale Provedor

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Implementação de cluster Kafka (Event Hubs compatível) no Azure para ingestão de eventos de rede e CRM, com throughput inicial de 12 mil mensagens por segundo; Desenvolvimento de pipelines de processamento em Python para enriquecimento, deduplicação e agregação de eventos em janelas de 1 minuto.
- Tecnologias assumidas: Kafka, Azure, Python.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 4 meses.

Equipe estimada: 1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 950.000 (sem contingência).

## Pontos em aberto

- Volume de eventos acima do previsto durante picos de tráfego
- Qualidade e padronização dos eventos originados em sistemas legados
- Dependência de janelas de manutenção para testes em ambiente produtivo
