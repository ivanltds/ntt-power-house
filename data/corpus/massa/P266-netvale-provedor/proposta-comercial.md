---
projeto_id: P266
cliente: NetVale Provedor
titulo: Migração do Data Warehouse para Nuvem com GCP, Snowflake e Databricks
segmento: Telecom
tecnologias: ["GCP","Snowflake","Databricks"]
servicos: ["Migração para Nuvem","Engenharia de Dados"]
area: Cloud & Infra
dono: Isabela Freitas
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P266
id: P266-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-10-15
prazo_meses: 8
valor: 3070000
margem: 0.22
---

# Proposta Comercial — Migração do Data Warehouse para Nuvem com GCP, Snowflake e Databricks

**Cliente:** NetVale Provedor
**Segmento:** Telecom
**Área responsável:** Cloud & Infra · **Dono da proposta:** Isabela Freitas
**Data:** 2025-10-15 · **Versão:** final

## 1. Contexto e desafio

A NetVale Provedor operava um data warehouse on-premises com 14 TB de dados históricos e cerca de 380 milhões de registros de CDRs, faturas e eventos de rede, com janelas de carga noturna que chegavam a 6 horas e relatórios de churn disponíveis apenas no D+2. A base crescia 22% ao ano e o custo de manutenção do hardware comprometia o orçamento de analytics.

## 2. Objetivo

Migrar o data warehouse para a nuvem em 8 meses, modernizando a plataforma com GCP, Snowflake e Databricks para reduzir o tempo de carga e ampliar a disponibilidade analítica.

## 3. Escopo da solução

- Assessment e desenho da arquitetura-alvo em GCP, com landing zone, governança de IAM e rede privada para ingestão dos dados de telecom
- Migração de 14 TB e 380 milhões de registros para o Snowflake, com modelagem dimensional e conversão de 120 rotinas ETL legadas
- Construção de pipelines de engenharia de dados no Databricks para ingestão incremental de CDRs, eventos de rede e faturamento
- Implementação de camada semântica e orquestração de cargas com monitoramento de SLA e alertas de qualidade de dados
- Execução de testes de paridade, paralelo assistido e descomissionamento do ambiente on-premises

Tecnologias principais: GCP, Snowflake, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Assessment e arquitetura (6 semanas)
- Migração e engenharia de pipelines (16 semanas)
- Testes de paridade e paralelo assistido (8 semanas)
- Go-live e descomissionamento (4 semanas)

## 5. Entregáveis

- Arquitetura-alvo documentada e aprovada, com plano de migração por ondas
- Data warehouse no Snowflake com 14 TB migrados e validados por testes de paridade
- 42 pipelines no Databricks em produção com cargas incrementais e monitoramento de SLA
- Catálogo de dados e painéis de qualidade cobrindo as 12 tabelas críticas de negócio
- Relatório de descomissionamento do ambiente legado e runbook de operação

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em Snowflake, 1 especialista em GCP e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade dos dados legados exigir retrabalho nas rotinas de conversão
- Risco: Janela de paralelo assistido coincidir com o fechamento fiscal mensal
- Risco: Dependência de acessos e liberações de rede do cliente para a landing zone no GCP

## 8. Investimento

Investimento total: R$ 3.070.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 22%.
