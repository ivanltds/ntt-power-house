---
projeto_id: P260
cliente: TeleNorte Conecta
titulo: Migração do Data Warehouse para Nuvem com Pipeline Unificado
segmento: Telecom
tecnologias: ["Azure","Snowflake","Databricks","GCP"]
servicos: ["Engenharia de Dados","Migração para Nuvem"]
area: Cloud & Infra
dono: Isabela Freitas
confidencialidade: interna
status_proposta: Em negociação
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P260
id: P260-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-07-29
prazo_meses: 4
---

# Apresentação Comercial — TeleNorte Conecta

## Slide 1 — Migração do Data Warehouse para Nuvem com Pipeline Unificado

TeleNorte Conecta · Telecom

## Slide 2 — O desafio

A TeleNorte Conecta opera um data warehouse on-premises com 48 TB de dados históricos de 6,2 milhões de assinantes, cujo processamento noturno de faturamento e churn leva mais de 9 horas e sofre indisponibilidades recorrentes. A infraestrutura atual não suporta o crescimento de 35% ao ano no volume de dados de rede e atendimento, limitando a análise em near real-time.

## Slide 3 — Nossa proposta

Migrar o data warehouse legado para uma arquitetura em nuvem com Azure, Snowflake e Databricks em 4 meses, reduzindo o tempo de processamento noturno em pelo menos 60% e habilitando analytics escalável para as áreas de negócio.

## Slide 4 — Arquitetura e tecnologias

Azure · Snowflake · Databricks · GCP

- Assessment e desenho da arquitetura-alvo em Azure, definindo landing zone, governança e integração com Snowflake como camada de armazenamento analítico
- Migração de 48 TB de dados históricos e 320 pipelines ETL para Snowflake, com validação de paridade de dados e reconciliação de faturamento
- Implementação de pipelines de engenharia de dados no Databricks para ingestão incremental e transformação em camadas bronze, silver e gold

## Slide 5 — Como vamos trabalhar

- Assessment e arquitetura-alvo (4 semanas)
- Migração de dados e pipelines para Snowflake (7 semanas)
- Engenharia de dados no Databricks e avaliação GCP (4 semanas)
- Estabilização, FinOps e transferência de conhecimento (3 semanas)

Duração total: 4 meses.

## Slide 6 — Por que nós

Experiência em Engenharia de Dados, Migração para Nuvem, com projeto anterior entregue para a TeleNorte Conecta. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em Snowflake, 1 especialista em Databricks e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Diretora de Dados e Analytics) e agendar o kickoff.
