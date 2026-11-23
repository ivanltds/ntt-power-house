---
projeto_id: P508
cliente: Escudo Auto Seguros
titulo: Migração do Data Warehouse para Snowflake no Azure com Engenharia de Dados
segmento: Seguros
tecnologias: ["Snowflake","Azure"]
servicos: ["Migração para Nuvem","Engenharia de Dados"]
area: Cloud & Infra
dono: Débora Castilho
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P508
id: P508-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2025-05-16
prazo_meses: 8
---

# Apresentação Comercial — Escudo Auto Seguros

## Slide 1 — Migração do Data Warehouse para Snowflake no Azure com Engenharia de Dados

Escudo Auto Seguros · Seguros

## Slide 2 — O desafio

A Escudo Auto Seguros processava 4,2 TB de dados de apólices e sinistros em um data warehouse on-premises com janelas de carga noturnas de 7 horas, o que atrasava a apuração de sinistralidade e limitava a análise a relatórios diários. Com 1,8 milhão de apólices ativas e 320 usuários de BI, a infraestrutura local não suportava o crescimento de 35% ao ano no volume de dados de telemetria de veículos.

## Slide 3 — Nossa proposta

Migrar o data warehouse da Escudo Auto Seguros para Snowflake no Azure em 8 meses, reduzindo a latência das cargas e habilitando análises quase em tempo real para as áreas de subscrição e sinistros.

## Slide 4 — Arquitetura e tecnologias

Snowflake · Azure

- Assessment e mapeamento de 240 objetos do data warehouse legado, incluindo 95 procedures e 60 cubos de relatórios
- Modelagem dimensional no Snowflake com camadas raw, trusted e refined e definição de warehouses virtuais por domínio de negócio
- Construção de pipelines de ingestão e transformação no Azure Data Factory e dbt para 38 fontes de dados de apólices, sinistros e telemetria

## Slide 5 — Como vamos trabalhar

- Assessment e desenho da arquitetura alvo (6 semanas)
- Provisionamento do Snowflake no Azure e construção dos pipelines (12 semanas)
- Migração das rotinas ETL por ondas e validação de paridade (10 semanas)
- Estabilização, governança e transferência de conhecimento (4 semanas)

Duração total: 8 meses.

## Slide 6 — Por que nós

Experiência em Migração para Nuvem, Engenharia de Dados, com projeto anterior entregue para a Escudo Auto Seguros. Equipe: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em Snowflake, 1 analista de governança de dados e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Diretora de Dados e Analytics) e agendar o kickoff.
