---
projeto_id: P195
cliente: Financeira Rumo Certo
titulo: Migração de Data Warehouse para Nuvem com Databricks e GCP
segmento: Serviços Financeiros
tecnologias: ["GCP","Databricks","Azure"]
servicos: ["Engenharia de Dados"]
area: Cloud & Infra
dono: Carla Menezes
confidencialidade: interna
status_proposta: Em negociação
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P195
id: P195-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-09-19
prazo_meses: 6
---

# Apresentação Comercial — Financeira Rumo Certo

## Slide 1 — Migração de Data Warehouse para Nuvem com Databricks e GCP

Financeira Rumo Certo · Serviços Financeiros

## Slide 2 — O desafio

A Financeira Rumo Certo opera hoje um data warehouse on-premises com cerca de 3,2 TB de dados históricos e 180 tabelas, sustentando relatórios regulatórios e de crédito que levam até 9 horas para serem processados. A janela de carga noturna está saturada e a operação enfrenta 4 incidentes críticos por mês por falta de escalabilidade e de governança de dados.

## Slide 3 — Nossa proposta

Migrar o data warehouse on-premises para uma arquitetura em nuvem com Databricks sobre GCP e Azure, reduzindo o tempo de processamento dos relatórios regulatórios em pelo menos 60% e eliminando a dependência de infraestrutura local em 6 meses.

## Slide 4 — Arquitetura e tecnologias

GCP · Databricks · Azure

- Assessment das 180 tabelas e definição da arquitetura-alvo lakehouse com Databricks sobre armazenamento em GCP (BigQuery e Cloud Storage)
- Migração e reengenharia dos pipelines ETL/ELT, com orquestração em Databricks Workflows e paralelização das cargas
- Implementação de camada de governança e catálogo de dados (Unity Catalog) com políticas de acesso por perfil de crédito e compliance

## Slide 5 — Como vamos trabalhar

- Assessment e arquitetura-alvo (6 semanas)
- Reengenharia e migração de pipelines (10 semanas)
- Governança, integração e testes de paridade (6 semanas)
- Cutover e descomissionamento assistido (4 semanas)

Duração total: 6 meses.

## Slide 6 — Por que nós

Experiência em Engenharia de Dados. Equipe: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em Databricks e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Mariana Vasconcelos (Diretora de Tecnologia e Dados) e agendar o kickoff.
