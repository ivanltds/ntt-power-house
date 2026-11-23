---
projeto_id: P199
cliente: Operador Logístico Armazém Brasil
titulo: Streaming de dados em tempo real para operações logísticas
segmento: Logística
tecnologias: ["Python","Azure","AWS"]
servicos: ["Engenharia de Dados","Analytics & BI","Change Management"]
area: Data & Analytics
dono: Úrsula Campos
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P199
id: P199-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-08-21
prazo_meses: 3
valor: 380000
---

# Estimativa financeira (GECO) — Operador Logístico Armazém Brasil

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Construção de pipelines de ingestão de eventos em Python sobre Azure Event Hubs, com replicação de dados para AWS Kinesis; Modelagem de camada de streaming e near real-time no Azure Databricks, consumindo dados das origens WMS e TMS.
- Tecnologias assumidas: Python, Azure, AWS.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 3 meses.

Equipe estimada: 1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 consultor de change management, com 1 gerente de projeto dedicado 50%.

## Valor de referência

Valor preliminar: R$ 380.000 (sem contingência).

## Pontos em aberto

- Qualidade e padronização dos eventos emitidos pelos sistemas WMS e TMS legados
- Latência de rede entre os 12 centros de distribuição e os serviços de nuvem
- Baixa adesão dos operadores aos novos rituais de gestão à vista
