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
id: P147-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-12-21
prazo_meses: 9
valor: 1990000
margem: 0.29
---

# Proposta Comercial — Migração do Data Warehouse da Agência Estadual de Trânsito para Arquitetura Multi-Cloud com Databricks

**Cliente:** Agência Estadual de Trânsito
**Segmento:** Setor Público
**Área responsável:** Cloud & Infra · **Dono da proposta:** Igor Peixoto
**Data:** 2025-12-21 · **Versão:** final

## 1. Contexto e desafio

A Agência Estadual de Trânsito opera um data warehouse on-premises que processa cerca de 180 milhões de registros mensais de veículos, condutores e infrações, com janelas de carga noturna de até 7 horas e relatórios gerenciais disponíveis apenas no dia seguinte. O ambiente atual não suporta o crescimento de 35% ao ano no volume de dados e apresenta indisponibilidade média de 6 horas por mês, comprometendo a prestação de contas e a fiscalização.

## 2. Objetivo

Migrar o data warehouse on-premises para uma arquitetura em nuvem baseada em Databricks, com camadas de armazenamento e processamento distribuídas em GCP, AWS e Azure, reduzindo a janela de carga para menos de 90 minutos e ampliando a disponibilidade para 99,5%.

## 3. Escopo da solução

- Assessment e desenho da arquitetura lakehouse em Databricks com Delta Lake, definindo a distribuição de workloads entre GCP (BigQuery e Cloud Storage), AWS (S3 e Glue) e Azure (Data Lake Storage e Synapse)
- Migração de 42 pipelines ETL e 380 tabelas do data warehouse legado para o Databricks, com reescrita em PySpark e validação de paridade de dados
- Implementação de camadas bronze, silver e gold no Databricks, com catálogo unificado no Unity Catalog e governança de dados transversais às três nuvens
- Configuração de orquestração e monitoramento de cargas no Databricks Workflows, com alertas integrados e SLAs de execução por domínio de dados
- Migração de 65 dashboards e relatórios regulatórios para consumo direto das camadas gold, com testes de aceitação junto às áreas de negócio

Tecnologias principais: Databricks, GCP, AWS, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 9 meses, nas seguintes fases:

- Assessment e arquitetura (8 semanas)
- Migração de pipelines e dados (16 semanas)
- Governança e dashboards (8 semanas)
- Homologação e cutover (4 semanas)

## 5. Entregáveis

- Documento de arquitetura lakehouse multi-cloud aprovado, com mapa de 380 tabelas e 42 pipelines migrados
- Ambiente Databricks produtivo configurado em GCP, AWS e Azure, com Unity Catalog e políticas de acesso implementadas
- 42 pipelines ETL migrados e homologados, com relatório de paridade de dados superior a 99,9%
- Camadas bronze, silver e gold publicadas com 65 dashboards validados pelas áreas de negócio
- Plano de cutover e runbook operacional com janela de virada de 8 horas e rollback testado

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em cloud multi-nuvem, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Atraso na liberação de acessos e credenciais nas três nuvens pelo órgão de TI do cliente
- Risco: Divergências de qualidade nos dados legados que ampliem o esforço de paridade
- Risco: Restrições orçamentárias que reduzam o escopo de dashboards na fase final

## 8. Investimento

Investimento total: R$ 1.990.000, em parcelas mensais ao longo de 9 meses.

Margem praticada: 29%.
