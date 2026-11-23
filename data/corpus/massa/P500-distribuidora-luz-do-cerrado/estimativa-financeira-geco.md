---
projeto_id: P500
cliente: Distribuidora Luz do Cerrado
titulo: Streaming de dados em tempo real para operações e analytics no setor elétrico
segmento: Utilities / Energia
tecnologias: ["Kafka","Databricks","AWS"]
servicos: ["Engenharia de Dados","Analytics & BI"]
area: Data & Analytics
dono: Leonardo Pires
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P500
id: P500-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2025-08-15
prazo_meses: 7
valor: 1200000
---

# Estimativa financeira (GECO) — Distribuidora Luz do Cerrado

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão de eventos de medidores e sensores via Apache Kafka na AWS, com capacidade para 25 mil mensagens por segundo e retenção de 72 horas; Pipeline de streaming estruturado com Databricks para limpeza, deduplicação e enriquecimento de 18 milhões de eventos diários.
- Tecnologias assumidas: Kafka, Databricks, AWS.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 7 meses.

Equipe estimada: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em analytics e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 1.200.000 (sem contingência).

## Pontos em aberto

- Qualidade e padronização dos eventos das 3 fontes prioritárias
- Capacidade da equipe do cliente para validar regras de negócio em janelas curtas
- Dependências de rede e segurança na integração entre Kafka, Databricks e AWS
