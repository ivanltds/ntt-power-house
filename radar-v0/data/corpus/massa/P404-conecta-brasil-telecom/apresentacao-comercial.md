---
projeto_id: P404
cliente: Conecta Brasil Telecom
titulo: Migração de Data Warehouse para Nuvem com Snowflake e GCP
segmento: Telecom
tecnologias: ["Snowflake","GCP"]
servicos: ["Migração para Nuvem"]
area: Cloud & Infra
dono: Isabela Freitas
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P404
id: P404-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2024-07-04
prazo_meses: 7
---

# Apresentação Comercial — Conecta Brasil Telecom

## Slide 1 — Migração de Data Warehouse para Nuvem com Snowflake e GCP

Conecta Brasil Telecom · Telecom

## Slide 2 — O desafio

A Conecta Brasil Telecom processa cerca de 4,5 TB de dados de billing, CDR e atendimento em um data warehouse on-premises com janelas de carga noturnas que ultrapassam 6 horas, atrasando relatórios regulatórios da ANATEL. A base cresce 30% ao ano e a infraestrutura atual não suporta a demanda de analytics de rede e churn dos 12 milhões de assinantes.

## Slide 3 — Nossa proposta

Migrar o data warehouse on-premises para Snowflake no GCP em 7 meses, reduzindo a janela de carga para menos de 1 hora e habilitando analytics escalável para as áreas de rede, comercial e regulatório.

## Slide 4 — Arquitetura e tecnologias

Snowflake · GCP

- Assessment e mapeamento de 320 tabelas e 85 processos ETL do ambiente legado para o modelo Snowflake
- Implementação da plataforma Snowflake no GCP com pipelines de ingestão via Dataflow e Pub/Sub para dados de CDR e billing
- Migração e refatoração de 85 jobs ETL em esquema de paralelismo controlado por ondas de negócio

## Slide 5 — Como vamos trabalhar

- Assessment e desenho da arquitetura (6 semanas)
- Provisionamento do Snowflake no GCP e pipelines de ingestão (8 semanas)
- Migração e refatoração dos ETLs por ondas (10 semanas)
- Testes, cutover e hypercare (4 semanas)

Duração total: 7 meses.

## Slide 6 — Por que nós

Experiência em Migração para Nuvem, com projeto anterior entregue para a Conecta Brasil Telecom. Equipe: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista Snowflake, 1 especialista GCP e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Diretora de TI e Dados) e agendar o kickoff.
