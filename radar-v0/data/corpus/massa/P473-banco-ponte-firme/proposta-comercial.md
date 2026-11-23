---
projeto_id: P473
cliente: Banco Ponte Firme
titulo: Migração do Data Warehouse para Snowflake no Azure com Engenharia de Dados
segmento: Serviços Financeiros
tecnologias: ["Snowflake","Azure"]
servicos: ["Engenharia de Dados","Migração para Nuvem"]
area: Cloud & Infra
dono: Carla Menezes
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P473
id: P473-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-01-09
prazo_meses: 5
valor: 1320000
margem: 0.32
---

# Proposta Comercial — Migração do Data Warehouse para Snowflake no Azure com Engenharia de Dados

**Cliente:** Banco Ponte Firme
**Segmento:** Serviços Financeiros
**Área responsável:** Cloud & Infra · **Dono da proposta:** Carla Menezes
**Data:** 2025-01-09 · **Versão:** final

## 1. Contexto e desafio

O Banco Ponte Firme mantém um data warehouse on-premises com 18 TB de dados históricos e cerca de 240 tabelas, sustentando relatórios regulatórios e de crédito para 1,2 milhão de clientes. As janelas de carga noturna chegam a 7 horas e 40 minutos, atrasando a abertura do dia analítico e elevando o custo de infraestrutura em 32% ao ano.

## 2. Objetivo

Migrar o data warehouse on-premises para Snowflake no Azure em 5 meses, preservando a lógica analítica existente e reduzindo a janela de carga para no máximo 2 horas.

## 3. Escopo da solução

- Assessment das 240 tabelas e mapeamento de dependências para o modelo alvo em Snowflake
- Construção de pipelines de ingestão e transformação no Azure Data Factory com orquestração Snowflake Tasks
- Migração de dados históricos de 18 TB com validação de reconciliação por tabela
- Reimplementação de 60 rotinas analíticas e views materializadas em Snowflake
- Configuração de governança, controle de acesso por papel e monitoramento de custos no Azure

Tecnologias principais: Snowflake, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Assessment e desenho da arquitetura alvo (5 semanas)
- Construção de pipelines e migração da primeira onda (7 semanas)
- Migração das ondas restantes e reimplementação analítica (6 semanas)
- Homologação, corte e estabilização (4 semanas)

## 5. Entregáveis

- Relatório de assessment e plano de migração por onda
- Pipelines de ingestão e transformação operando em Azure e Snowflake
- Base histórica de 18 TB migrada e reconciliada com evidências de validação
- 60 rotinas analíticas reimplementadas e homologadas pelo time de dados do cliente
- Runbook de operação, monitoramento e controle de custos do ambiente cloud

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista Snowflake e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Atraso no acesso e liberação de dados sensíveis pelo time de segurança do banco
- Risco: Divergências de reconciliação em tabelas legadas sem documentação
- Risco: Dependência de janelas de homologação curtas com o time regulatório

## 8. Investimento

Investimento total: R$ 1.320.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 32%.
