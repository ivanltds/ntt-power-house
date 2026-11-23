---
projeto_id: P261
cliente: Secretaria Estadual de Saúde do Planalto
titulo: Migração do Data Warehouse da Saúde para Nuvem Multi-Cloud
segmento: Setor Público
tecnologias: ["GCP","Azure","Databricks","Snowflake"]
servicos: ["Engenharia de Dados","Migração para Nuvem"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: confidencial
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P261
id: P261-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-06-04
prazo_meses: 6
valor: 1330000
margem: 0.28
---

# Proposta Comercial — Migração do Data Warehouse da Saúde para Nuvem Multi-Cloud

**Cliente:** Secretaria Estadual de Saúde do Planalto
**Segmento:** Setor Público
**Área responsável:** Cloud & Infra · **Dono da proposta:** Igor Peixoto
**Data:** 2026-06-04 · **Versão:** final

## 1. Contexto e desafio

A Secretaria Estadual de Saúde do Planalto mantém um data warehouse on-premises com 45 TB de dados que processa 1,2 milhão de atendimentos por mês, mas enfrenta lentidão nas consultas analíticas (tempo médio de 12 minutos) e custos crescentes de manutenção de hardware. A falta de escalabilidade impede a expansão de relatórios para 300 novos usuários previstos para 2025.

## 2. Objetivo

Migrar o data warehouse para uma arquitetura multi-cloud (GCP e Azure) com Databricks e Snowflake, reduzindo o tempo de consulta em 70% e permitindo escalabilidade elástica para até 2 milhões de atendimentos/mês.

## 3. Escopo da solução

- Avaliação e refatoração de 120 pipelines ETL legados para Databricks (PySpark) com orquestração no Azure Data Factory
- Migração de 45 TB de dados históricos para Snowflake na GCP, com modelagem dimensional e políticas de governança
- Implementação de camada de ingestão em tempo real via Pub/Sub (GCP) e Event Hubs (Azure) para 15 fontes de dados
- Configuração de ambiente de Disaster Recovery em Azure com replicação assíncrona do Snowflake
- Treinamento de 40 usuários-chave e documentação técnica da nova arquitetura

Tecnologias principais: GCP, Azure, Databricks, Snowflake.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Fase 1 – Assessment e Arquitetura: 6 semanas
- Fase 2 – Migração de Dados e Pipelines: 10 semanas
- Fase 3 – Validação e Go-Live: 6 semanas
- Fase 4 – Estabilização e Transferência: 4 semanas

## 5. Entregáveis

- Relatório de assessment e roadmap de migração em 4 semanas
- Pipeline de ingestão em tempo real operacional para 15 fontes
- Data warehouse migrado e validado com 45 TB e 120 pipelines refatorados
- Runbook de operação e plano de DR testado com RTO de 4 horas
- Workshops de capacitação realizados para 40 usuários e 10 técnicos da Secretaria

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em nuvem (GCP/Azure) e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Atraso na liberação de acessos e credenciais pelos órgãos de segurança do Estado
- Risco: Qualidade dos dados legados com 15% de registros inconsistentes
- Risco: Resistência à mudança por parte das equipes técnicas da Secretaria

## 8. Investimento

Investimento total: R$ 1.330.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 28%.
