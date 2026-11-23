---
projeto_id: P300
cliente: Financeira Rumo Certo
titulo: Plataforma de Indicadores ESG e Emissões para Serviços Financeiros
segmento: Serviços Financeiros
tecnologias: ["Power BI","Snowflake","Azure"]
servicos: ["Governança de Dados"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: confidencial
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P300
id: P300-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-09-09
prazo_meses: 5
valor: 1610000
margem: 0.28
---

# Proposta Comercial — Plataforma de Indicadores ESG e Emissões para Serviços Financeiros

**Cliente:** Financeira Rumo Certo
**Segmento:** Serviços Financeiros
**Área responsável:** Data & Analytics · **Dono da proposta:** Ana Beatriz Lopes
**Data:** 2025-09-09 · **Versão:** final

## 1. Contexto e desafio

A Financeira Rumo Certo reporta hoje seus indicadores ESG em 14 planilhas mantidas por 5 áreas, com fechamento mensal que consome 9 dias úteis e divergências de até 12% nos números de emissões entre relatórios internos e o reporte ao regulador. A ausência de uma base única de dados de emissões (Escopos 1, 2 e 3) expõe a companhia a ressalvas em auditorias e a riscos de reputação junto a investidores.

## 2. Objetivo

Centralizar e governar os dados de indicadores ESG e emissões em uma plataforma analítica única, reduzindo o ciclo de fechamento mensal para até 3 dias úteis e garantindo rastreabilidade dos números reportados.

## 3. Escopo da solução

- Ingestão no Snowflake de 11 fontes de dados (ERP, planilhas de facilities, frotas, energia e RH) com pipelines orquestrados no Azure Data Factory
- Modelagem dimensional de emissões por Escopo 1, 2 e 3 e de indicadores sociais e de governança no Snowflake
- Camada semântica e 6 dashboards no Power BI para reporte mensal, auditoria e comitê de sustentabilidade
- Governança de Dados: catálogo, dicionário de dados, linhagem e definição de 40 indicadores com owners por área
- Política de qualidade de dados no Azure com 25 regras de validação e alertas automáticos de divergência

Tecnologias principais: Power BI, Snowflake, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e arquitetura de dados (5 semanas)
- Ingestão e modelagem no Snowflake (7 semanas)
- Dashboards Power BI e camada semântica (5 semanas)
- Governança, qualidade e rollout (5 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e modelo dimensional de ESG aprovado
- Pipelines de ingestão das 11 fontes em produção no Snowflake
- 6 dashboards Power BI publicados com controle de acesso por área
- Catálogo de dados e dicionário dos 40 indicadores ESG com linhagem documentada
- Relatório de qualidade de dados com as 25 regras ativas e plano de correção

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa qualidade e padronização das planilhas de origem de facilities e frotas
- Risco: Indefinição de owners dos indicadores durante a fase de governança
- Risco: Dependência de aprovação do reporte regulatório dentro da janela de 5 meses

## 8. Investimento

Investimento total: R$ 1.610.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 28%.
