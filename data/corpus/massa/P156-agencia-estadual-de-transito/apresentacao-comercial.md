---
projeto_id: P156
cliente: Agência Estadual de Trânsito
titulo: Migração do Data Warehouse para Snowflake na Nuvem Azure
segmento: Setor Público
tecnologias: ["Snowflake","Azure"]
servicos: ["Engenharia de Dados","Migração para Nuvem"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P156
id: P156-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-05-30
prazo_meses: 8
---

# Apresentação Comercial — Agência Estadual de Trânsito

## Slide 1 — Migração do Data Warehouse para Snowflake na Nuvem Azure

Agência Estadual de Trânsito · Setor Público

## Slide 2 — O desafio

A Agência Estadual de Trânsito opera hoje um data warehouse on-premises com cerca de 4,2 TB de dados históricos de habilitação, veículos e infrações, com janelas de carga noturna que chegam a 6 horas e relatórios gerenciais disponíveis apenas no dia seguinte. O ambiente atual apresenta indisponibilidade média de 3 horas por mês e custos crescentes de manutenção de servidores e licenças, limitando a análise de dados para fiscalização e atendimento ao cidadão.

## Slide 3 — Nossa proposta

Migrar o data warehouse on-premises para a plataforma Snowflake no Azure em 8 meses, reduzindo a janela de carga para até 90 minutos e disponibilizando dados analíticos próximos do tempo real para as áreas de fiscalização e gestão.

## Slide 4 — Arquitetura e tecnologias

Snowflake · Azure

- Assessment e mapeamento dos 4,2 TB de dados e dos 180 processos de ETL existentes, com plano de migração para Snowflake
- Reengenharia dos pipelines de ingestão e transformação com Azure Data Factory e Snowflake Tasks, adotando modelagem dimensional em camadas Bronze, Silver e Gold
- Configuração da infraestrutura Azure (Storage Accounts, Key Vault, Virtual Network e integração privada com Snowflake) com foco em segurança e LGPD

## Slide 5 — Como vamos trabalhar

- Assessment e arquitetura-alvo (6 semanas)
- Fundação Azure e Snowflake e reengenharia de pipelines (12 semanas)
- Migração e validação paralela dos data marts (10 semanas)
- Go-live, estabilização e transferência de conhecimento (4 semanas)

Duração total: 8 meses.

## Slide 6 — Por que nós

Experiência em Engenharia de Dados, Migração para Nuvem, com projeto anterior entregue para a Agência Estadual de Trânsito. Equipe: 1 gerente de projeto, 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em cloud Azure e 1 analista de qualidade de dados.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Diretora de Tecnologia da Informação) e agendar o kickoff.
