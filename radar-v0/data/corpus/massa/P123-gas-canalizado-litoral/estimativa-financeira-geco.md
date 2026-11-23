---
projeto_id: P123
cliente: Gás Canalizado Litoral
titulo: Plataforma de streaming de dados em tempo real para distribuição de gás canalizado
segmento: Utilities / Energia
tecnologias: ["AWS","Azure"]
servicos: ["Analytics & BI"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: confidencial
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P123
id: P123-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-02-15
prazo_meses: 7
valor: 580000
---

# Estimativa financeira (GECO) — Gás Canalizado Litoral

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão de eventos de 1.200 sensores de pressão e vazão via AWS Kinesis e Azure Event Hubs; Processamento de streams em tempo quase real com camada de dados unificada entre AWS e Azure.
- Tecnologias assumidas: AWS, Azure.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 7 meses.

Equipe estimada: 1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 580.000 (sem contingência).

## Pontos em aberto

- Latência de rede nos 1.200 sensores de campo
- Integração entre as camadas AWS e Azure
- Baixa adesão dos operadores ao novo centro de controle
