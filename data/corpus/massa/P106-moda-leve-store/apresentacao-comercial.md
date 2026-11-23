---
projeto_id: P106
cliente: Moda Leve Store
titulo: Lakehouse Databricks para unificar dados de varejo omnichannel
segmento: Varejo
tecnologias: ["Python","Databricks"]
servicos: ["Migração para Nuvem","Governança de Dados","Engenharia de Dados"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P106
id: P106-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-04-01
prazo_meses: 9
---

# Apresentação Comercial — Moda Leve Store

## Slide 1 — Lakehouse Databricks para unificar dados de varejo omnichannel

Moda Leve Store · Varejo

## Slide 2 — O desafio

A Moda Leve Store operava com dados de vendas, estoque e e-commerce dispersos em 3 sistemas distintos e mais de 40 planilhas manuais, o que gerava fechamentos mensais com 6 dias de atraso e divergências de até 12% nos relatórios de estoque entre lojas físicas e canal online. A ausência de uma camada única de dados impedia análises confiáveis de ruptura e giro por SKU em uma base de mais de 350 mil clientes.

## Slide 3 — Nossa proposta

Construir uma plataforma lakehouse no Databricks que unifique dados transacionais e digitais em uma única fonte de verdade, com camadas de governança e engenharia de dados em Python, reduzindo o tempo de fechamento e habilitando análises de estoque e comportamento de compra em near real-time.

## Slide 4 — Arquitetura e tecnologias

Python · Databricks

- Ingestão incremental de dados de ERP, PDV e e-commerce em camadas bronze/silver/gold no Databricks com pipelines em Python
- Migração para Nuvem dos 3 sistemas de origem, com 14 pipelines de CDC e cargas batch noturnas
- Governança de Dados com Unity Catalog: catálogo, linhagem, classificação de PII de 350 mil clientes e políticas de acesso por perfil

## Slide 5 — Como vamos trabalhar

- Discovery e arquitetura (6 semanas)
- Migração para Nuvem e ingestão (12 semanas)
- Governança e modelagem gold (12 semanas)
- Estabilização, treinamento e go-live (6 semanas)

Duração total: 9 meses.

## Slide 6 — Por que nós

Experiência em Migração para Nuvem, Governança de Dados, Engenharia de Dados. Equipe: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em governança de dados e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Almeida (Diretora de Tecnologia e Dados) e agendar o kickoff.
