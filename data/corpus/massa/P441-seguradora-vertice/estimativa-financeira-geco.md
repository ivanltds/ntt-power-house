---
projeto_id: P441
cliente: Seguradora Vértice
titulo: Detecção de Fraude em Tempo Real com Dados e Machine Learning
segmento: Seguros
tecnologias: ["Kafka","Databricks","Machine Learning","Azure"]
servicos: ["Engenharia de Dados"]
area: AI & Automation
dono: Karina Duarte
confidencialidade: confidencial
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P441
id: P441-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-10-02
prazo_meses: 5
valor: 1280000
---

# Estimativa financeira (GECO) — Seguradora Vértice

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão contínua de eventos de sinistros, apólices e pagamentos via Apache Kafka, com tópicos segregados por domínio e retenção de 30 dias; Construção de pipeline de dados em Databricks (medallion architecture) com tabelas Delta nas camadas bronze, silver e gold, incluindo histórico de 36 meses.
- Tecnologias assumidas: Kafka, Databricks, Machine Learning, Azure.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 5 meses.

Equipe estimada: 1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados, 1 engenheiro de MLOps e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 1.280.000 (sem contingência).

## Pontos em aberto

- Qualidade e completude dos dados históricos de sinistros pode exigir esforço extra de tratamento
- Baixa adesão dos analistas de sinistro ao novo score durante o período de transição
- Restrições de latência e segurança na integração via API com o sistema legado de sinistros
