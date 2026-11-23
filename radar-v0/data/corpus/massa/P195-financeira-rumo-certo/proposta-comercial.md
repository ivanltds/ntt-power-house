---
projeto_id: P195
cliente: Financeira Rumo Certo
titulo: Migração de Data Warehouse para Nuvem com Databricks e GCP
segmento: Serviços Financeiros
tecnologias: ["GCP","Databricks","Azure"]
servicos: ["Engenharia de Dados"]
area: Cloud & Infra
dono: Carla Menezes
confidencialidade: interna
status_proposta: Em negociação
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P195
id: P195-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-09-16
prazo_meses: 6
valor: 1970000
margem: 0.21
---

# Proposta Comercial — Migração de Data Warehouse para Nuvem com Databricks e GCP

**Cliente:** Financeira Rumo Certo
**Segmento:** Serviços Financeiros
**Área responsável:** Cloud & Infra · **Dono da proposta:** Carla Menezes
**Data:** 2026-09-16 · **Versão:** final

## 1. Contexto e desafio

A Financeira Rumo Certo opera hoje um data warehouse on-premises com cerca de 3,2 TB de dados históricos e 180 tabelas, sustentando relatórios regulatórios e de crédito que levam até 9 horas para serem processados. A janela de carga noturna está saturada e a operação enfrenta 4 incidentes críticos por mês por falta de escalabilidade e de governança de dados.

## 2. Objetivo

Migrar o data warehouse on-premises para uma arquitetura em nuvem com Databricks sobre GCP e Azure, reduzindo o tempo de processamento dos relatórios regulatórios em pelo menos 60% e eliminando a dependência de infraestrutura local em 6 meses.

## 3. Escopo da solução

- Assessment das 180 tabelas e definição da arquitetura-alvo lakehouse com Databricks sobre armazenamento em GCP (BigQuery e Cloud Storage)
- Migração e reengenharia dos pipelines ETL/ELT, com orquestração em Databricks Workflows e paralelização das cargas
- Implementação de camada de governança e catálogo de dados (Unity Catalog) com políticas de acesso por perfil de crédito e compliance
- Integração dos ambientes de consumo em Azure (Azure Data Factory e Power BI) para relatórios regulatórios e de risco
- Execução de testes de paridade de dados, tuning de performance e descomissionamento assistido do data warehouse on-premises

Tecnologias principais: GCP, Databricks, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Assessment e arquitetura-alvo (6 semanas)
- Reengenharia e migração de pipelines (10 semanas)
- Governança, integração e testes de paridade (6 semanas)
- Cutover e descomissionamento assistido (4 semanas)

## 5. Entregáveis

- Relatório de assessment das 180 tabelas com mapa de migração e priorização por criticidade
- Arquitetura lakehouse documentada em Databricks com desenho de redes e segurança em GCP e Azure
- Pipelines ETL/ELT migrados e validados para 100% das tabelas críticas de crédito e regulação
- Painéis de monitoramento de qualidade de dados e SLAs de carga em Databricks
- Plano de cutover e descomissionamento do ambiente on-premises com checklist de rollback

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em Databricks e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e consistência dos dados legados nas 180 tabelas mapeadas
- Risco: Janela de cutover curta para relatórios regulatórios sem interrupção
- Risco: Dependência de acessos e liberações de rede entre GCP e Azure

## 8. Investimento

Investimento total: R$ 1.970.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 21%.
