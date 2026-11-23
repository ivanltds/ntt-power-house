---
projeto_id: P335
cliente: Farmácias Vida Plena
titulo: Lakehouse de Dados para Varejo Farmacêutico com Kafka, Databricks e Nuvem Híbrida
segmento: Varejo
tecnologias: ["Kafka","AWS","Azure","Databricks"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P335
id: P335-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-03-27
prazo_meses: 9
---

# Apresentação Comercial — Farmácias Vida Plena

## Slide 1 — Lakehouse de Dados para Varejo Farmacêutico com Kafka, Databricks e Nuvem Híbrida

Farmácias Vida Plena · Varejo

## Slide 2 — O desafio

As Farmácias Vida Plena operam 420 lojas e um e-commerce que gera cerca de 35 milhões de transações de venda por mês, mas os dados ficam dispersos entre ERP, PDV e sistemas de fidelidade, com relatórios consolidados levando até 5 dias úteis. A ausência de uma camada analítica única impede a gestão de estoque por loja e a personalização de promoções para 2,8 milhões de clientes do programa de fidelidade.

## Slide 3 — Nossa proposta

Construir uma plataforma de dados lakehouse na AWS e Azure com ingestão em tempo real via Kafka e processamento no Databricks, unificando dados de vendas, estoque e fidelidade para análises em até 1 hora.

## Slide 4 — Arquitetura e tecnologias

Kafka · AWS · Azure · Databricks

- Ingestão em streaming de eventos de PDV e e-commerce com Apache Kafka, com throughput estimado de 15 mil eventos por segundo em picos promocionais
- Implementação de lakehouse no Databricks sobre armazenamento na AWS (S3) e Azure Data Lake Storage, com camadas bronze, silver e gold e governança via Unity Catalog
- Pipeline de CDC do ERP e do sistema de fidelidade para carga incremental de 120 tabelas, com orquestração e monitoramento de qualidade de dados

## Slide 5 — Como vamos trabalhar

- Discovery e arquitetura (6 semanas)
- Fundação do lakehouse e ingestão em streaming (12 semanas)
- Modelagem analítica e governança (12 semanas)
- Go-live, estabilização e transferência de conhecimento (9 semanas)

Duração total: 9 meses.

## Slide 6 — Por que nós

Experiência em Engenharia de Dados, com projeto anterior entregue para a Farmácias Vida Plena. Equipe: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em streaming Kafka, 1 analista de governança de dados e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Alvarenga (Diretora de Tecnologia e Dados) e agendar o kickoff.
