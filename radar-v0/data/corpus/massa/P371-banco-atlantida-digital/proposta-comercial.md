---
projeto_id: P371
cliente: Banco Atlântida Digital
titulo: Plataforma Lakehouse para Análise de Dados Financeiros
segmento: Serviços Financeiros
tecnologias: ["Python","Snowflake"]
servicos: ["Governança de Dados","Engenharia de Dados","Migração para Nuvem"]
area: Data & Analytics
dono: Leonardo Pires
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P371
id: P371-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2024-04-30
prazo_meses: 7
valor: 3200000
margem: 0.31
---

# Proposta Comercial — Plataforma Lakehouse para Análise de Dados Financeiros

**Cliente:** Banco Atlântida Digital
**Segmento:** Serviços Financeiros
**Área responsável:** Data & Analytics · **Dono da proposta:** Leonardo Pires
**Data:** 2024-04-30 · **Versão:** final

## 1. Contexto e desafio

O Banco Atlântida Digital, com 2,5 milhões de clientes ativos e processamento diário de 1,2 TB de transações, enfrentava lentidão nas consultas analíticas (tempo médio de 8 horas para relatórios regulatórios) e falta de governança sobre os dados armazenados em silos departamentais. A migração para nuvem era urgente para reduzir custos de infraestrutura em 30% até o final do ano.

## 2. Objetivo

Implementar uma plataforma de dados lakehouse na nuvem, utilizando Python e Snowflake, para centralizar e governar os dados financeiros, reduzindo o tempo de consulta para menos de 1 hora e garantindo conformidade regulatória.

## 3. Escopo da solução

- Migração de 15 bases de dados legadas para o Snowflake, com pipelines de ingestão em Python
- Implementação de catálogo de dados e políticas de governança no Snowflake
- Desenvolvimento de 20 pipelines de engenharia de dados para integração de fontes transacionais e de risco
- Configuração de camada semântica e modelos de dados dimensionais para relatórios regulatórios
- Automação de testes de qualidade de dados e monitoramento de performance

Tecnologias principais: Python, Snowflake.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Diagnóstico e Arquitetura (4 semanas)
- Migração e Governança (10 semanas)
- Engenharia e Pipelines (8 semanas)
- Otimização e Entrega (6 semanas)

## 5. Entregáveis

- Documento de arquitetura lakehouse e plano de migração
- Ambiente Snowflake configurado com 15 bases migradas e validadas
- Catálogo de dados com 200 ativos catalogados e políticas de acesso definidas
- 20 pipelines de dados em produção com orquestração e monitoramento
- Relatórios regulatórios automatizados com tempo de execução inferior a 1 hora

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em governança de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Resistência à mudança por parte das áreas de negócio
- Risco: Complexidade na integração de fontes legadas com o Snowflake
- Risco: Atraso na obtenção de aprovações regulatórias para migração

## 8. Investimento

Investimento total: R$ 3.200.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 31%.
