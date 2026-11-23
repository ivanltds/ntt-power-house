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
id: P261-SOW
tipo_documental: sow
status_documento: assinado
data: 2026-06-29
prazo_meses: 6
valor: 1330000
---

# SOW — Migração do Data Warehouse da Saúde para Nuvem Multi-Cloud

**Contratante:** Secretaria Estadual de Saúde do Planalto · **Contratada:** NTT DATA Brasil · **Vigência:** 6 meses a partir do kickoff

## 1. Objeto

Migrar o data warehouse para uma arquitetura multi-cloud (GCP e Azure) com Databricks e Snowflake, reduzindo o tempo de consulta em 70% e permitindo escalabilidade elástica para até 2 milhões de atendimentos/mês.

## 2. Escopo contratado

- Avaliação e refatoração de 120 pipelines ETL legados para Databricks (PySpark) com orquestração no Azure Data Factory
- Migração de 45 TB de dados históricos para Snowflake na GCP, com modelagem dimensional e políticas de governança
- Implementação de camada de ingestão em tempo real via Pub/Sub (GCP) e Event Hubs (Azure) para 15 fontes de dados
- Configuração de ambiente de Disaster Recovery em Azure com replicação assíncrona do Snowflake
- Treinamento de 40 usuários-chave e documentação técnica da nova arquitetura

## 3. Entregáveis e aceite

- Relatório de assessment e roadmap de migração em 4 semanas
- Pipeline de ingestão em tempo real operacional para 15 fontes
- Data warehouse migrado e validado com 45 TB e 120 pipelines refatorados
- Runbook de operação e plano de DR testado com RTO de 4 horas
- Workshops de capacitação realizados para 40 usuários e 10 técnicos da Secretaria

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 1.330.000, faturado mensalmente conforme o cronograma.
