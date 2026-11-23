---
projeto_id: P473
cliente: Banco Ponte Firme
titulo: Migração do Data Warehouse para Snowflake no Azure com Engenharia de Dados
segmento: Serviços Financeiros
tecnologias: ["Snowflake","Azure"]
servicos: ["Engenharia de Dados","Migração para Nuvem"]
area: Cloud & Infra
dono: Carla Menezes
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P473
id: P473-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2025-01-12
prazo_meses: 5
---

# Apresentação Comercial — Banco Ponte Firme

## Slide 1 — Migração do Data Warehouse para Snowflake no Azure com Engenharia de Dados

Banco Ponte Firme · Serviços Financeiros

## Slide 2 — O desafio

O Banco Ponte Firme mantém um data warehouse on-premises com 18 TB de dados históricos e cerca de 240 tabelas, sustentando relatórios regulatórios e de crédito para 1,2 milhão de clientes. As janelas de carga noturna chegam a 7 horas e 40 minutos, atrasando a abertura do dia analítico e elevando o custo de infraestrutura em 32% ao ano.

## Slide 3 — Nossa proposta

Migrar o data warehouse on-premises para Snowflake no Azure em 5 meses, preservando a lógica analítica existente e reduzindo a janela de carga para no máximo 2 horas.

## Slide 4 — Arquitetura e tecnologias

Snowflake · Azure

- Assessment das 240 tabelas e mapeamento de dependências para o modelo alvo em Snowflake
- Construção de pipelines de ingestão e transformação no Azure Data Factory com orquestração Snowflake Tasks
- Migração de dados históricos de 18 TB com validação de reconciliação por tabela

## Slide 5 — Como vamos trabalhar

- Assessment e desenho da arquitetura alvo (5 semanas)
- Construção de pipelines e migração da primeira onda (7 semanas)
- Migração das ondas restantes e reimplementação analítica (6 semanas)
- Homologação, corte e estabilização (4 semanas)

Duração total: 5 meses.

## Slide 6 — Por que nós

Experiência em Engenharia de Dados, Migração para Nuvem, com projeto anterior entregue para a Banco Ponte Firme. Equipe: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista Snowflake e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Gerente de Dados e Analytics) e agendar o kickoff.
