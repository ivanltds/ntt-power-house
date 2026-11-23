---
projeto_id: P479
cliente: Corretora Valor Alto
titulo: Plataforma Lakehouse Multicloud para Análise de Dados Financeiros
segmento: Serviços Financeiros
tecnologias: ["Azure","AWS","Databricks","Python"]
servicos: ["Migração para Nuvem"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P479
id: P479-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-06-06
prazo_meses: 9
valor: 620000
margem: 0.3
---

# Proposta Comercial — Plataforma Lakehouse Multicloud para Análise de Dados Financeiros

**Cliente:** Corretora Valor Alto
**Segmento:** Serviços Financeiros
**Área responsável:** Data & Analytics · **Dono da proposta:** Nelson Barbosa
**Data:** 2025-06-06 · **Versão:** final

## 1. Contexto e desafio

A Corretora Valor Alto processava 2,5 TB de dados diários em sistemas legados, com relatórios gerenciais levando até 48 horas para serem consolidados. A falta de uma visão unificada de risco e compliance comprometia a tomada de decisão em um mercado que movimenta R$ 12 bilhões/ano.

## 2. Objetivo

Implementar uma plataforma lakehouse nas nuvens Azure e AWS para centralizar e governar dados financeiros, reduzindo o tempo de análise de 48 para 4 horas e suportando 300 usuários analíticos.

## 3. Escopo da solução

- Migração de 120 pipelines de dados legados para Databricks em Azure e AWS, com orquestração via Python.
- Construção de camada de armazenamento Delta Lake no Databricks para 2,5 TB diários, com versionamento e time travel.
- Implementação de catálogo de dados e governança unificado no Databricks Unity Catalog, cobrindo 500 tabelas.
- Desenvolvimento de 15 dashboards analíticos em Power BI conectados ao lakehouse para áreas de risco e compliance.
- Automação de ingestão de dados de 8 fontes externas (B3, bancos e sistemas internos) com Python e Databricks Workflows.

Tecnologias principais: Azure, AWS, Databricks, Python.

## 4. Abordagem e cronograma

O projeto será executado em 9 meses, nas seguintes fases:

- Fase 1 – Discovery e Arquitetura: 6 semanas
- Fase 2 – Construção da Plataforma e Migração de Pipelines: 16 semanas
- Fase 3 – Governança, Dashboards e Treinamento: 10 semanas
- Fase 4 – Estabilização e Go-Live: 4 semanas

## 5. Entregáveis

- Plataforma lakehouse operacional em Azure e AWS, com 120 pipelines migrados e documentados.
- Catálogo de dados com 500 tabelas catalogadas e políticas de acesso implementadas.
- 15 dashboards de risco e compliance entregues e validados pelos usuários-chave.
- Documentação técnica completa (arquitetura, runbooks e manuais de operação).
- Treinamento para 40 colaboradores da Corretora em Databricks e Python.

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em governança e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Atraso na liberação de acessos às fontes de dados legadas.
- Risco: Volume de dados subestimado durante a migração dos pipelines.
- Risco: Resistência dos usuários à mudança para os novos dashboards.

## 8. Investimento

Investimento total: R$ 620.000, em parcelas mensais ao longo de 9 meses.

Margem praticada: 30%.
