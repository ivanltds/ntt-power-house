---
projeto_id: P532
cliente: Cooperativa Sicrédito Planalto
titulo: Lakehouse Databricks no Azure para Centralização de Dados Financeiros
segmento: Serviços Financeiros
tecnologias: ["Databricks","Azure"]
servicos: ["Migração para Nuvem"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P532
id: P532-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-01-20
prazo_meses: 11
valor: 1900000
margem: 0.3
---

# Proposta Comercial — Lakehouse Databricks no Azure para Centralização de Dados Financeiros

**Cliente:** Cooperativa Sicrédito Planalto
**Segmento:** Serviços Financeiros
**Área responsável:** Data & Analytics · **Dono da proposta:** Ana Beatriz Lopes
**Data:** 2026-01-20 · **Versão:** final

## 1. Contexto e desafio

A Cooperativa Sicrédito Planalto, com 480 mil cooperados e R$ 9,2 bilhões em ativos, opera com dados distribuídos em 7 sistemas legados e um data warehouse on-premises que leva até 36 horas para consolidar o fechamento diário. Isso limita a análise de risco de crédito em tempo real e atrasa a entrega de relatórios regulatórios ao Banco Central.

## 2. Objetivo

Construir uma plataforma lakehouse no Azure com Databricks, unificando dados de crédito, transações e cadastro para reduzir o tempo de consolidação para menos de 2 horas e habilitar analytics avançado.

## 3. Escopo da solução

- Migração do data warehouse on-premises para Azure Data Lake Storage Gen2 com ingestão incremental via Azure Data Factory
- Implementação de camadas bronze, silver e gold no Databricks com Delta Lake para 42 tabelas de negócio
- Criação de 18 pipelines de qualidade de dados e orquestração de jobs no Databricks Workflows
- Modelagem de 6 data marts de crédito, cobrança e compliance no Databricks SQL
- Configuração de governança e catálogo de dados com Unity Catalog no Databricks

Tecnologias principais: Databricks, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 11 meses, nas seguintes fases:

- Diagnóstico e arquitetura (8 semanas)
- Ingestão e migração de dados (16 semanas)
- Modelagem e data marts (12 semanas)
- Go-live e estabilização (8 semanas)

## 5. Entregáveis

- Documento de arquitetura lakehouse no Azure com Databricks aprovado
- 42 tabelas migradas e validadas com testes de reconciliação
- 18 pipelines de ingestão e qualidade em produção
- 6 data marts publicados para consumo das áreas de negócio
- Plano de capacitação e transferência de conhecimento para 12 analistas do cliente

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista Databricks, 1 analista de qualidade de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Atraso na liberação de acessos às fontes legadas pelo time de infraestrutura do cliente
- Risco: Qualidade dos dados de cadastro de cooperados abaixo do esperado
- Risco: Dependência de janelas noturnas curtas para extração dos sistemas core

## 8. Investimento

Investimento total: R$ 1.900.000, em parcelas mensais ao longo de 11 meses.

Margem praticada: 30%.
