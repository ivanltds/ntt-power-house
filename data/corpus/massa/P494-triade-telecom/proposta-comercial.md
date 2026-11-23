---
projeto_id: P494
cliente: Tríade Telecom
titulo: Governança de Dados e Conformidade LGPD em Plataforma Analítica Unificada
segmento: Telecom
tecnologias: ["Azure","Databricks","Snowflake"]
servicos: ["Change Management","Governança de Dados"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: confidencial
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P494
id: P494-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-08-26
prazo_meses: 5
valor: 2730000
margem: 0.33
---

# Proposta Comercial — Governança de Dados e Conformidade LGPD em Plataforma Analítica Unificada

**Cliente:** Tríade Telecom
**Segmento:** Telecom
**Área responsável:** Data & Analytics · **Dono da proposta:** Henrique Matos
**Data:** 2025-08-26 · **Versão:** final

## 1. Contexto e desafio

A Tríade Telecom operava com dados de 4,2 milhões de clientes distribuídos em 3 data marts isolados, sem catálogo corporativo nem classificação de dados pessoais. Isso gerava retrabalho de 18% nas áreas de BI e exposição a sanções da ANPD por tratamento de dados sensíveis sem base legal documentada.

## 2. Objetivo

Estruturar a governança de dados e adequar os fluxos analíticos à LGPD, criando catálogo único, políticas de acesso e trilhas de auditoria sobre Azure, Databricks e Snowflake.

## 3. Escopo da solução

- Catalogação e classificação de 320 tabelas e 1.100 campos com identificação de dados pessoais e sensíveis no Azure Purview
- Implementação de políticas de mascaramento e controle de acesso baseado em papéis no Databricks e no Snowflake
- Construção de trilhas de auditoria e linhagem de dados ponta a ponta entre as camadas de ingestão e consumo
- Definição de 22 políticas de retenção, descarte e base legal alinhadas à LGPD
- Programa de Change Management com treinamento de 140 usuários e rede de 12 data stewards

Tecnologias principais: Azure, Databricks, Snowflake.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e classificação de dados (6 semanas)
- Implementação de políticas e controles técnicos (8 semanas)
- Trilhas de auditoria, linhagem e retenção (4 semanas)
- Change Management e sustentação (4 semanas)

## 5. Entregáveis

- Catálogo corporativo de dados com 320 tabelas classificadas e glossário de negócio de 85 termos
- Matriz de acessos e políticas de mascaramento implementadas em produção no Databricks e Snowflake
- Relatório de linhagem e trilhas de auditoria para 100% das fontes críticas de clientes
- Manual de políticas de retenção e descarte com 22 regras aprovadas pelo jurídico
- Plano de Change Management com material de treinamento e 12 data stewards certificados

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em governança e LGPD e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa adesão das áreas de negócio à classificação de dados
- Risco: Atraso na validação jurídica das bases legais
- Risco: Qualidade inconsistente dos metadados nas fontes legadas

## 8. Investimento

Investimento total: R$ 2.730.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 33%.
