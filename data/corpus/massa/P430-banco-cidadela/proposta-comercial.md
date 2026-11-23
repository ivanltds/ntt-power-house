---
projeto_id: P430
cliente: Banco Cidadela
titulo: Plataforma de Indicadores ESG e Emissões para Reporte Regulatório
segmento: Serviços Financeiros
tecnologias: ["Power BI","Snowflake","Azure","Python"]
servicos: ["Governança de Dados"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: interna
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P430
id: P430-PROP
tipo_documental: proposta_comercial
status_documento: preliminar
data: 2026-11-17
prazo_meses: 5
valor: 2580000
margem: 0.23
---

# Proposta Comercial — Plataforma de Indicadores ESG e Emissões para Reporte Regulatório

**Cliente:** Banco Cidadela
**Segmento:** Serviços Financeiros
**Área responsável:** Data & Analytics · **Dono da proposta:** Ana Beatriz Lopes
**Data:** 2026-11-17 · **Versão:** final

## 1. Contexto e desafio

O Banco Cidadela consolida hoje os indicadores ESG de 3 carteiras de crédito e 2 unidades de operação em 14 planilhas manuais, com atraso médio de 18 dias na publicação do relatório trimestral e retrabalho em cerca de 30% dos cálculos de emissões Escopo 1 e 2. A ausência de linhagem e de regras únicas de cálculo eleva o risco de inconsistência perante auditoria externa e exigências do Banco Central.

## 2. Objetivo

Implantar uma plataforma de dados ESG que automatize o cálculo de emissões e a publicação de indicadores auditáveis, reduzindo o ciclo de reporte de 18 para 5 dias úteis.

## 3. Escopo da solução

- Ingestão de dados de emissões, consumo energético e carteira de crédito no Snowflake, com pipelines em Python para cálculo de Escopo 1, 2 e 3
- Modelagem dimensional e camada semântica de indicadores ESG no Snowflake, com regras de cálculo versionadas
- Painéis de indicadores ESG e emissões no Power BI para as áreas de Sustentabilidade, Riscos e Finanças
- Orquestração e governança no Azure, incluindo catálogo, linhagem e trilha de auditoria dos dados
- Definição de políticas de qualidade de dados e processo de validação mensal dos indicadores

Tecnologias principais: Power BI, Snowflake, Azure, Python.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e desenho da arquitetura (4 semanas)
- Construção dos pipelines e cálculos de emissões (8 semanas)
- Dashboards Power BI e governança de dados (6 semanas)
- Homologação, treinamento e go-live (2 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados ESG e dicionário de 45 indicadores
- Pipelines de ingestão e cálculo de emissões em produção no Snowflake
- 3 dashboards Power BI publicados: inventário de emissões, metas ESG e visão executiva
- Catálogo de dados e linhagem no Azure com rastreabilidade por indicador
- Relatório de qualidade de dados e plano de evolução para Escopo 3

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa qualidade dos dados históricos de consumo e emissões
- Risco: Mudança de critérios regulatórios durante a construção
- Risco: Dependência de validação tardia das áreas de Riscos e Sustentabilidade

## 8. Investimento

Investimento total: R$ 2.580.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 23%.
