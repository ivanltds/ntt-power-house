---
projeto_id: P376
cliente: Corretora Valor Alto
titulo: Programa de Governança de Dados e Conformidade LGPD para Corretora
segmento: Serviços Financeiros
tecnologias: ["Snowflake","Python","Databricks","Azure"]
servicos: ["Governança de Dados","Change Management"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: confidencial
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P376
id: P376-PROP
tipo_documental: proposta_comercial
status_documento: preliminar
data: 2026-09-23
prazo_meses: 7
valor: 1290000
margem: 0.24
---

# Proposta Comercial — Programa de Governança de Dados e Conformidade LGPD para Corretora

**Cliente:** Corretora Valor Alto
**Segmento:** Serviços Financeiros
**Área responsável:** Data & Analytics · **Dono da proposta:** Ana Beatriz Lopes
**Data:** 2026-09-23 · **Versão:** final

## 1. Contexto e desafio

A Corretora Valor Alto opera com cerca de 1,2 milhão de clientes ativos e um volume mensal de 480 mil transações, mas seus dados estão distribuídos em 14 sistemas legados sem catálogo unificado. O mapeamento de dados pessoais é parcial, com 37% dos campos sensíveis sem classificação, o que eleva o risco de sanções da ANPD e de incidentes de vazamento.

## 2. Objetivo

Implantar um framework de governança de dados e conformidade com a LGPD sobre Azure e Snowflake, com catálogo, classificação e políticas de acesso rastreáveis, em 7 meses.

## 3. Escopo da solução

- Catalogação e classificação de dados pessoais em 14 fontes, com pipelines em Python e Databricks para carga contínua no Snowflake
- Definição de políticas de acesso e mascaramento no Azure, com RBAC e trilhas de auditoria para 100% dos dados sensíveis
- Implantação de data lineage e dicionário de dados para 320 tabelas críticas, com validações automatizadas
- Estruturação do comitê de governança e do processo de atendimento a titulares, integrado ao fluxo de 480 mil transações mensais
- Programa de change management com treinamento de 180 colaboradores em 6 trilhas de capacitação

Tecnologias principais: Snowflake, Python, Databricks, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Diagnóstico e desenho do framework (6 semanas)
- Catalogação e classificação de dados (10 semanas)
- Políticas de acesso, lineage e painéis (8 semanas)
- Change management e sustentação (6 semanas)

## 5. Entregáveis

- Catálogo de dados com 320 tabelas classificadas e 100% dos campos sensíveis mapeados
- Política de governança e privacidade aprovada, com matriz de acessos por perfil
- Painel de conformidade LGPD no Azure com 12 indicadores de monitoramento contínuo
- Relatório de lineage das 14 fontes integradas ao Snowflake
- Plano de change management com 6 trilhas e métricas de adoção por área

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em privacidade e LGPD, 1 analista de change management e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa qualidade dos metadados nas 14 fontes legadas
- Risco: Resistência das áreas de negócio à mudança de processos
- Risco: Atraso na aprovação jurídica das políticas de privacidade

## 8. Investimento

Investimento total: R$ 1.290.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 24%.
