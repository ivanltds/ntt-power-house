---
projeto_id: P496
cliente: Agência Estadual de Trânsito
titulo: Migração do Data Warehouse para Snowflake na Nuvem AWS
segmento: Setor Público
tecnologias: ["Snowflake","AWS"]
servicos: ["Engenharia de Dados","Migração para Nuvem"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P496
id: P496-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2024-05-13
prazo_meses: 6
valor: 2120000
margem: 0.28
---

# Proposta Comercial — Migração do Data Warehouse para Snowflake na Nuvem AWS

**Cliente:** Agência Estadual de Trânsito
**Segmento:** Setor Público
**Área responsável:** Cloud & Infra · **Dono da proposta:** Igor Peixoto
**Data:** 2024-05-13 · **Versão:** final

## 1. Contexto e desafio

A Agência Estadual de Trânsito mantinha um data warehouse on-premises com 14 TB de dados históricos de condutores, veículos e infrações, com janelas de carga noturna que ultrapassavam 7 horas e indisponibilidade recorrente para relatórios de fiscalização. O ambiente legado não suportava o crescimento de 22% ao ano no volume de dados de arrecadação e demandava custos fixos de infraestrutura de R$ 1,8 milhão por ano.

## 2. Objetivo

Migrar o data warehouse legado para Snowflake na AWS em 6 meses, preservando a integridade histórica e reduzindo o tempo de carga e o custo operacional do ambiente analítico.

## 3. Escopo da solução

- Avaliação e inventário do data warehouse legado, com mapeamento de 180 tabelas e 320 processos ETL
- Modelagem dimensional no Snowflake com separação de camadas raw, staging e consumo
- Migração dos dados históricos para o Snowflake via AWS S3 e Snowpipe, com validação de reconciliação
- Reimplementação dos pipelines de carga em Snowflake e orquestração integrada ao ambiente AWS
- Configuração de governança de acesso, mascaramento de dados pessoais e monitoramento de custos na AWS

Tecnologias principais: Snowflake, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e arquitetura-alvo (6 semanas)
- Migração dos dados históricos (10 semanas)
- Reimplementação dos pipelines e validação (6 semanas)
- Go-live e estabilização (2 semanas)

## 5. Entregáveis

- Documento de arquitetura-alvo e plano de migração com cronograma por onda
- Data warehouse no Snowflake com 14 TB migrados e reconciliados
- 320 pipelines de carga reimplementados e validados em produção
- Painéis de monitoramento de performance e custo na AWS
- Relatório de encerramento com plano de sustentação e transferência de conhecimento

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em nuvem AWS e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e consistência dos dados históricos no legado
- Risco: Janelas de indisponibilidade limitadas para cutover
- Risco: Dependência de acessos e liberações de rede do cliente

## 8. Investimento

Investimento total: R$ 2.120.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 28%.
