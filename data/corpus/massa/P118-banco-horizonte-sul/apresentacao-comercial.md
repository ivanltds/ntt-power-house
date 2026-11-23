---
projeto_id: P118
cliente: Banco Horizonte Sul
titulo: Migração do Data Warehouse para Nuvem com Arquitetura Multi-Cloud
segmento: Serviços Financeiros
tecnologias: ["Snowflake","Azure","AWS","GCP"]
servicos: ["Engenharia de Dados","Migração para Nuvem"]
area: Cloud & Infra
dono: Carla Menezes
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P118
id: P118-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-03-24
prazo_meses: 6
---

# Apresentação Comercial — Banco Horizonte Sul

## Slide 1 — Migração do Data Warehouse para Nuvem com Arquitetura Multi-Cloud

Banco Horizonte Sul · Serviços Financeiros

## Slide 2 — O desafio

O Banco Horizonte Sul opera um data warehouse on-premises com 42 TB de dados históricos e janelas de carga noturna que chegam a 7 horas, atrasando relatórios regulatórios e de risco de crédito. Cerca de 380 usuários analíticos enfrentam latência média de 12 minutos nas consultas mais pesadas, e o custo de manutenção da infraestrutura local cresceu 23% no último ano.

## Slide 3 — Nossa proposta

Migrar o data warehouse para uma arquitetura em nuvem baseada em Snowflake, com processamento distribuído em Azure, AWS e GCP, reduzindo a janela de carga para menos de 90 minutos e ampliando a escalabilidade analítica do banco.

## Slide 4 — Arquitetura e tecnologias

Snowflake · Azure · AWS · GCP

- Assessment e desenho da arquitetura-alvo em Snowflake, com definição de camadas raw, curated e consumption e estratégia de segurança e governança de dados
- Migração de 42 TB de dados históricos e de 1.240 objetos (tabelas, views e procedures) para o Snowflake, com validação de paridade de dados
- Implementação de pipelines de ingestão e transformação orquestrados em Azure Data Factory e serviços gerenciados em AWS e GCP para fontes externas

## Slide 5 — Como vamos trabalhar

- Assessment e arquitetura-alvo (5 semanas)
- Migração de dados e objetos (10 semanas)
- Pipelines e otimização de performance (6 semanas)
- Homologação e descomissionamento (5 semanas)

Duração total: 6 meses.

## Slide 6 — Por que nós

Experiência em Engenharia de Dados, Migração para Nuvem. Equipe: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista Snowflake, 1 analista de BI e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Almeida Vasconcelos (Diretora de Dados e Analytics) e agendar o kickoff.
