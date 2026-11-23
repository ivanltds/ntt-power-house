---
projeto_id: P504
cliente: Seguradora Vértice
titulo: Programa de Governança de Dados e Adequação LGPD em Nuvem Híbrida
segmento: Seguros
tecnologias: ["Python","Snowflake","Databricks","Azure"]
servicos: ["Governança de Dados","Change Management"]
area: Data & Analytics
dono: Leonardo Pires
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P504
id: P504-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-04-06
prazo_meses: 5
valor: 210000
margem: 0.36
---

# Proposta Comercial — Programa de Governança de Dados e Adequação LGPD em Nuvem Híbrida

**Cliente:** Seguradora Vértice
**Segmento:** Seguros
**Área responsável:** Data & Analytics · **Dono da proposta:** Leonardo Pires
**Data:** 2026-04-06 · **Versão:** final

## 1. Contexto e desafio

A Seguradora Vértice opera com 14 bases analíticas dispersas entre Azure e ambientes on-premises, sem catálogo corporativo de dados nem classificação de informações pessoais em 62% dos campos mapeados. O passivo de LGPD inclui 37 processos de sinistros com dados sensíveis sem trilha de auditoria completa, elevando o risco de sanções da ANPD e de retrabalho regulatório.

## 3. Escopo da solução

- Diagnóstico e catálogo de dados corporativo em Snowflake, com classificação de PII automatizada via scripts Python
- Políticas de acesso, mascaramento e retenção implementadas no Databricks e no Azure Purview
- Pipelines de linhagem e trilha de auditoria LGPD em Python e Databricks para 14 bases analíticas
- Painel de conformidade e indicadores de qualidade de dados em Azure Synapse e Power BI
- Programa de change management com 8 workshops e treinamento de 120 usuários-chave em três ondas

Tecnologias principais: Python, Snowflake, Databricks, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e desenho do framework (6 semanas)
- Implementação de catálogo e classificação LGPD (8 semanas)
- Automação de trilhas de auditoria e painéis (5 semanas)
- Change management e sustentação (3 semanas)

## 5. Entregáveis

- Catálogo de dados com 100% das 14 bases classificadas e 62% dos campos sensíveis mapeados
- Framework de políticas de acesso e retenção publicado e aprovado pelo jurídico e DPO
- Trilhas de auditoria automatizadas para 37 processos de sinistros prioritários
- Painel executivo de conformidade LGPD com 12 indicadores monitorados mensalmente
- Plano de change management com material de treinamento e relatório de adesão por área

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em privacidade e LGPD e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa adesão das áreas de negócio aos workshops de change management
- Risco: Qualidade insuficiente dos metadados das bases legadas on-premises
- Risco: Mudanças de escopo regulatório da ANPD durante a execução

## 8. Investimento

Investimento total: R$ 210.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 36%.
