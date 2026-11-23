---
projeto_id: P147
cliente: Agência Estadual de Trânsito
titulo: Migração do Data Warehouse da Agência Estadual de Trânsito para Arquitetura Multi-Cloud com Databricks
segmento: Setor Público
tecnologias: ["Databricks","GCP","AWS","Azure"]
servicos: ["Engenharia de Dados","Migração para Nuvem"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P147
id: P147-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2025-12-24
prazo_meses: 9
---

# Apresentação Comercial — Agência Estadual de Trânsito

## Slide 1 — Migração do Data Warehouse da Agência Estadual de Trânsito para Arquitetura Multi-Cloud com Databricks

Agência Estadual de Trânsito · Setor Público

## Slide 2 — O desafio

A Agência Estadual de Trânsito opera um data warehouse on-premises que processa cerca de 180 milhões de registros mensais de veículos, condutores e infrações, com janelas de carga noturna de até 7 horas e relatórios gerenciais disponíveis apenas no dia seguinte. O ambiente atual não suporta o crescimento de 35% ao ano no volume de dados e apresenta indisponibilidade média de 6 horas por mês, comprometendo a prestação de contas e a fiscalização.

## Slide 3 — Nossa proposta

Migrar o data warehouse on-premises para uma arquitetura em nuvem baseada em Databricks, com camadas de armazenamento e processamento distribuídas em GCP, AWS e Azure, reduzindo a janela de carga para menos de 90 minutos e ampliando a disponibilidade para 99,5%.

## Slide 4 — Arquitetura e tecnologias

Databricks · GCP · AWS · Azure

- Assessment e desenho da arquitetura lakehouse em Databricks com Delta Lake, definindo a distribuição de workloads entre GCP (BigQuery e Cloud Storage), AWS (S3 e Glue) e Azure (Data Lake Storage e Synapse)
- Migração de 42 pipelines ETL e 380 tabelas do data warehouse legado para o Databricks, com reescrita em PySpark e validação de paridade de dados
- Implementação de camadas bronze, silver e gold no Databricks, com catálogo unificado no Unity Catalog e governança de dados transversais às três nuvens

## Slide 5 — Como vamos trabalhar

- Assessment e arquitetura (8 semanas)
- Migração de pipelines e dados (16 semanas)
- Governança e dashboards (8 semanas)
- Homologação e cutover (4 semanas)

Duração total: 9 meses.

## Slide 6 — Por que nós

Experiência em Engenharia de Dados, Migração para Nuvem. Equipe: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em cloud multi-nuvem, 1 analista de BI e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Diretora de Tecnologia da Informação) e agendar o kickoff.
