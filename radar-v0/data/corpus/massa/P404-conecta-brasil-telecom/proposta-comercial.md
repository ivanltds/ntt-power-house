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
id: P404-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2024-07-01
prazo_meses: 7
valor: 1700000
margem: 0.29
---

# Proposta Comercial — Migração de Data Warehouse para Nuvem com Snowflake e GCP

**Cliente:** Conecta Brasil Telecom
**Segmento:** Telecom
**Área responsável:** Cloud & Infra · **Dono da proposta:** Isabela Freitas
**Data:** 2024-07-01 · **Versão:** final

## 1. Contexto e desafio

A Conecta Brasil Telecom processa cerca de 4,5 TB de dados de billing, CDR e atendimento em um data warehouse on-premises com janelas de carga noturnas que ultrapassam 6 horas, atrasando relatórios regulatórios da ANATEL. A base cresce 30% ao ano e a infraestrutura atual não suporta a demanda de analytics de rede e churn dos 12 milhões de assinantes.

## 2. Objetivo

Migrar o data warehouse on-premises para Snowflake no GCP em 7 meses, reduzindo a janela de carga para menos de 1 hora e habilitando analytics escalável para as áreas de rede, comercial e regulatório.

## 3. Escopo da solução

- Assessment e mapeamento de 320 tabelas e 85 processos ETL do ambiente legado para o modelo Snowflake
- Implementação da plataforma Snowflake no GCP com pipelines de ingestão via Dataflow e Pub/Sub para dados de CDR e billing
- Migração e refatoração de 85 jobs ETL em esquema de paralelismo controlado por ondas de negócio
- Camada semântica e governança de dados com RBAC, mascaramento de PII e catálogo no GCP
- Testes de reconciliação de 100% dos indicadores regulatórios e cutover com rollback em 48 horas

Tecnologias principais: Snowflake, GCP.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Assessment e desenho da arquitetura (6 semanas)
- Provisionamento do Snowflake no GCP e pipelines de ingestão (8 semanas)
- Migração e refatoração dos ETLs por ondas (10 semanas)
- Testes, cutover e hypercare (4 semanas)

## 5. Entregáveis

- Relatório de assessment com inventário das 320 tabelas e plano de migração por onda
- Ambiente Snowflake no GCP provisionado com pipelines de ingestão operacionais
- 85 jobs ETL migrados e validados com reconciliação de dados acima de 99,9%
- Dashboards regulatórios ANATEL e de churn homologados pelas áreas de negócio
- Runbook de operação, plano de cutover e transferência de conhecimento para o time interno

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista Snowflake, 1 especialista GCP e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e consistência dos dados legados de CDR e billing
- Risco: Indisponibilidade de especialistas do cliente para validação das regras de negócio
- Risco: Janela de cutover restrita por compromissos regulatórios da ANATEL

## 8. Investimento

Investimento total: R$ 1.700.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 29%.
