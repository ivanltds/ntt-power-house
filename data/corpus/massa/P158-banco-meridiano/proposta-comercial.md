---
projeto_id: P158
cliente: Banco Meridiano
titulo: Programa de Governança de Dados e Adequação LGPD para Banco Meridiano
segmento: Serviços Financeiros
tecnologias: ["Azure","Databricks","Snowflake","Python"]
servicos: ["Governança de Dados","Change Management"]
area: Data & Analytics
dono: Leonardo Pires
confidencialidade: interna
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P158
id: P158-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-08-12
prazo_meses: 4
valor: 940000
margem: 0.26
---

# Proposta Comercial — Programa de Governança de Dados e Adequação LGPD para Banco Meridiano

**Cliente:** Banco Meridiano
**Segmento:** Serviços Financeiros
**Área responsável:** Data & Analytics · **Dono da proposta:** Leonardo Pires
**Data:** 2026-08-12 · **Versão:** final

## 1. Contexto e desafio

O Banco Meridiano opera com 14 sistemas de origem distintos e cerca de 2,3 milhões de clientes ativos, mas não possui catálogo corporativo de dados nem mapeamento consolidado de informações pessoais. A ausência de classificação padronizada e de trilhas de auditoria expõe o banco a riscos de conformidade com a LGPD e a retrabalho em solicitações de titulares, hoje respondidas em até 12 dias úteis.

## 2. Objetivo

Estruturar a governança de dados do banco com catálogo corporativo, classificação de dados pessoais e controles de conformidade LGPD, reduzindo o prazo de atendimento a titulares para até 5 dias úteis em 4 meses.

## 3. Escopo da solução

- Levantamento e catalogação de ativos de dados de 14 sistemas de origem em Databricks, com metadados técnicos e de negócio
- Classificação de dados pessoais e sensíveis conforme a LGPD, com políticas versionadas e linhagem de dados em Snowflake e Azure Purview
- Implementação de rotinas em Python para varredura automatizada de PII e geração de relatórios de conformidade no Azure
- Definição de papéis e comitê de governança de dados, com 3 rituais mensais de acompanhamento
- Plano de change management com treinamento de 180 colaboradores das áreas de crédito, riscos e atendimento

Tecnologias principais: Azure, Databricks, Snowflake, Python.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Diagnóstico e mapeamento de dados (5 semanas)
- Classificação e políticas de governança (5 semanas)
- Implementação técnica e automação (4 semanas)
- Capacitação e sustentação (3 semanas)

## 5. Entregáveis

- Catálogo corporativo de dados com no mínimo 400 ativos catalogados e classificados
- Matriz de classificação de dados pessoais e relatório de lacunas LGPD por sistema de origem
- Políticas de governança de dados aprovadas pelo comitê e publicadas no Azure
- Painel de conformidade com 10 indicadores de qualidade e privacidade de dados
- Plano de change management executado com trilha de treinamento e pesquisa de adoção acima de 80%

## 6. Equipe proposta

1 arquiteto de dados, 1 especialista em privacidade e LGPD, 2 engenheiros de dados, 1 analista de change management e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa qualidade dos metadados dos 14 sistemas de origem
- Risco: Resistência das áreas de negócio à classificação de dados
- Risco: Atraso no acesso aos ambientes Azure e Snowflake para implementação

## 8. Investimento

Investimento total: R$ 940.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 26%.
