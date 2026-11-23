---
projeto_id: P343
cliente: Tribunal Regional de Contas do Sul
titulo: Migração do Data Warehouse do TCE-Sul para Nuvem com Databricks e Snowflake
segmento: Setor Público
tecnologias: ["Databricks","Snowflake","AWS","GCP"]
servicos: ["Migração para Nuvem"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: interna
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P343
id: P343-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-08-07
prazo_meses: 6
---

# Apresentação Comercial — Tribunal Regional de Contas do Sul

## Slide 1 — Migração do Data Warehouse do TCE-Sul para Nuvem com Databricks e Snowflake

Tribunal Regional de Contas do Sul · Setor Público

## Slide 2 — O desafio

O Tribunal Regional de Contas do Sul opera um data warehouse on-premises com 14 TB de dados históricos de fiscalização e prestação de contas, sustentado por hardware com 7 anos de uso e janelas de manutenção que travam a operação por até 36 horas mensais. Consultas analíticas de auditoria levam em média 45 minutos para serem concluídas, comprometendo prazos de relatórios de controle externo e a capacidade de resposta a órgãos de fiscalização.

## Slide 3 — Nossa proposta

Migrar o data warehouse para a nuvem em 6 meses, modernizando a plataforma analítica com Databricks e Snowflake sobre AWS e GCP, reduzindo o tempo médio de consultas analíticas em pelo menos 60% e eliminando as paradas de manutenção da infraestrutura local.

## Slide 4 — Arquitetura e tecnologias

Databricks · Snowflake · AWS · GCP

- Avaliação e desenho da arquitetura-alvo em nuvem, definindo a distribuição de workloads entre AWS e GCP e a integração do Databricks com o Snowflake como camada de serving analítico
- Migração de 14 TB de dados históricos e 320 objetos de modelagem (tabelas, views e procedures) para o Snowflake, com validação de integridade e reconciliação de contagens
- Reimplementação de 85 pipelines ETL/ELT em Databricks, substituindo jobs legados e aplicando orquestração e monitoramento automatizados

## Slide 5 — Como vamos trabalhar

- Diagnóstico e desenho de arquitetura (6 semanas)
- Migração de dados e pipelines (12 semanas)
- Testes, homologação e ajustes de performance (4 semanas)
- Cutover, treinamento e estabilização (4 semanas)

Duração total: 6 meses.

## Slide 6 — Por que nós

Experiência em Migração para Nuvem. Equipe: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em Snowflake, 1 especialista em Databricks e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Helena Vasconcelos (Diretora de Tecnologia da Informação) e agendar o kickoff.
