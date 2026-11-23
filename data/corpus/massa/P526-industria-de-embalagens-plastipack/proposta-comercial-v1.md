---
projeto_id: P526
cliente: Indústria de Embalagens Plastipack
titulo: Plataforma de Indicadores ESG e Emissões para Manufatura
segmento: Manufatura
tecnologias: ["Azure","Python","Snowflake","Power BI"]
servicos: ["Governança de Dados","Analytics & BI"]
area: Data & Analytics
dono: Úrsula Campos
confidencialidade: interna
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P526
id: P526-PROPV1
tipo_documental: proposta_comercial
status_documento: rascunho
data: 2026-09-21
prazo_meses: 5
valor: 600000
margem: 0.29
---

# Proposta Comercial — Plataforma de Indicadores ESG e Emissões para Manufatura (versão 1, rascunho)

**Cliente:** Indústria de Embalagens Plastipack
**Segmento:** Manufatura
**Área responsável:** Data & Analytics · **Dono da proposta:** Úrsula Campos
**Data:** 2026-09-21 · **Versão:** 1 (rascunho)

## 1. Contexto e desafio

A Plastipack opera 4 plantas industriais com consumo anual de cerca de 38 GWh de energia e produção de aproximadamente 12 mil toneladas de embalagens plásticas por ano, mas os dados de emissões e indicadores ESG estão dispersos em planilhas e sistemas desconectados. O fechamento do inventário de emissões leva hoje em torno de 45 dias e apresenta inconsistências que dificultam a reportagem a clientes e a auditoria externa.

## 2. Objetivo

Centralizar e governar os dados de ESG e emissões em uma plataforma analítica única, automatizando o cálculo de indicadores e reduzindo o ciclo de fechamento mensal de 45 para até 10 dias úteis.

## 3. Escopo da solução

- Ingestão automatizada em Python dos dados de consumo de energia, água, resíduos e combustíveis das 4 plantas para o Snowflake
- Modelagem dimensional no Snowflake e camada semântica no Power BI para cálculo de escopos 1, 2 e 3 de emissões
- Pipeline de orquestração e monitoramento em Azure Data Factory e Azure Monitor com validações de qualidade de dados
- Dashboards executivos e operacionais no Power BI com indicadores ESG mensais por planta e por linha de produto
- Governança de dados com catálogo, dicionário de indicadores e definição de papéis e responsabilidades sobre os dados ESG

Tecnologias principais: Azure, Python, Snowflake, Power BI.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e desenho da arquitetura (3 semanas)
- Governança de dados e modelagem no Snowflake (4 semanas)
- Construção dos pipelines e dashboards Power BI (4 semanas)
- Homologação, treinamento e go-live (1 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e modelo de governança ESG aprovado
- Pipelines de ingestão e transformação em produção no Snowflake cobrindo as 4 plantas
- Painéis Power BI de indicadores ESG e emissões validados pelas áreas de sustentabilidade e controladoria
- Dicionário de dados e catálogo de indicadores ESG com cerca de 60 métricas mapeadas
- Relatório de fechamento automatizado do inventário de emissões com trilha de auditoria

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa qualidade e padronização dos dados históricos das plantas
- Risco: Dependência de áreas do cliente para validação dos indicadores ESG
- Risco: Mudanças de escopo nos critérios de cálculo de emissões durante o projeto

## 8. Investimento

Investimento total: R$ 600.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 29%.
