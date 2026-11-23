---
projeto_id: P256
cliente: Banco Cidadela
titulo: Governança de Dados e Conformidade LGPD em Plataforma Analítica Unificada
segmento: Serviços Financeiros
tecnologias: ["Databricks","Snowflake","Azure"]
servicos: ["Governança de Dados"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: interna
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P256
id: P256-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-09-22
prazo_meses: 4
valor: 1000000
margem: 0.28
---

# Proposta Comercial — Governança de Dados e Conformidade LGPD em Plataforma Analítica Unificada

**Cliente:** Banco Cidadela
**Segmento:** Serviços Financeiros
**Área responsável:** Data & Analytics · **Dono da proposta:** Ana Beatriz Lopes
**Data:** 2026-09-22 · **Versão:** final

## 1. Contexto e desafio

O Banco Cidadela opera com 4 fontes analíticas distintas (Databricks, Snowflake e Azure Synapse) sem catálogo corporativo único, o que gera cerca de 1.200 ativos de dados sem classificação de sensibilidade e 38% dos relatórios regulatórios sem linhagem documentada. O passivo de mapeamento de dados pessoais expõe o banco a riscos de autuação pela ANPD e a retrabalho estimado em 2.400 horas/ano em auditorias internas.

## 2. Objetivo

Implantar um framework de governança de dados e conformidade LGPD sobre Databricks, Snowflake e Azure, com catálogo, classificação de dados pessoais e linhagem ponta a ponta, reduzindo o esforço de auditoria em 60%.

## 3. Escopo da solução

- Implantação de catálogo corporativo de dados no Azure Purview integrado às camadas Databricks e Snowflake
- Classificação automática de dados pessoais e sensíveis (LGPD art. 5º) em 1.200 ativos via políticas de tagging no Databricks Unity Catalog
- Mapeamento de linhagem de dados ponta a ponta entre ingestão Azure Data Factory, Databricks e consumo em Snowflake
- Definição de 15 políticas de acesso baseadas em finalidade de tratamento e papéis (RBAC/ABAC) no Azure e Snowflake
- Estruturação de processo de atendimento a titulares e registro de operações de tratamento (ROPA) com trilhas de auditoria

Tecnologias principais: Databricks, Snowflake, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Diagnóstico e desenho do framework (4 semanas)
- Implantação do catálogo e classificação LGPD (6 semanas)
- Linhagem, políticas de acesso e ROPA (4 semanas)
- Sustentação, treinamento e go-live (2 semanas)

## 5. Entregáveis

- Catálogo de dados corporativo populado com 1.200 ativos classificados e 100% dos domínios críticos mapeados
- Matriz de classificação LGPD com 15 políticas de acesso implementadas e testadas
- Relatório de linhagem de dados dos 12 relatórios regulatórios prioritários
- ROPA completo e fluxo de atendimento a titulares documentado e operacionalizado
- Plano de sustentação de governança com papéis, ritos mensais e KPIs de qualidade de dados

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em privacidade/LGPD e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa adesão das áreas de negócio à classificação de dados
- Risco: Qualidade insuficiente dos metadados nas fontes legadas
- Risco: Mudanças regulatórias da ANPD durante a implantação

## 8. Investimento

Investimento total: R$ 1.000.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 28%.
