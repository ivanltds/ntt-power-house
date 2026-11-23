---
projeto_id: P295
cliente: Indústria de Embalagens Plastipack
titulo: Painel ESG e Inventário de Emissões para a Indústria de Embalagens Plastipack
segmento: Manufatura
tecnologias: ["Power BI","Snowflake","Azure"]
servicos: ["Analytics & BI"]
area: Data & Analytics
dono: Úrsula Campos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P295
id: P295-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-08-12
prazo_meses: 5
valor: 1090000
margem: 0.18
---

# Proposta Comercial — Painel ESG e Inventário de Emissões para a Indústria de Embalagens Plastipack

**Cliente:** Indústria de Embalagens Plastipack
**Segmento:** Manufatura
**Área responsável:** Data & Analytics · **Dono da proposta:** Úrsula Campos
**Data:** 2025-08-12 · **Versão:** final

## 1. Contexto e desafio

A Plastipack opera 4 plantas industriais com produção anual de cerca de 38 mil toneladas de embalagens plásticas e não conseguia consolidar, de forma auditável, os dados de consumo de energia, água e emissões de GEE espalhados em planilhas de cada unidade. O fechamento do relatório ESG anual levava 45 dias e gerava retrabalho em cerca de 30% dos indicadores, expondo a empresa a questionamentos de clientes e financiadores.

## 2. Objetivo

Centralizar e automatizar a apuração de indicadores ESG e de emissões de escopo 1 e 2 em uma plataforma analítica única, reduzindo o ciclo de fechamento e dando rastreabilidade aos dados reportados.

## 3. Escopo da solução

- Ingestão dos dados de consumo de energia, água, resíduos e combustíveis das 4 plantas em Snowflake, com rotinas de qualidade e linhagem
- Modelagem dimensional dos indicadores ESG e cálculo de emissões conforme fatores do GHG Protocol em modelos SQL no Snowflake
- Construção de dashboards executivos e operacionais no Power BI para as áreas de Sustentabilidade, Operações e Diretoria
- Orquestração e monitoramento dos pipelines em Azure Data Factory e Azure Monitor, com alertas de falha e atualização diária
- Trilha de auditoria e versionamento dos fatores de emissão e das premissas de cálculo para suportar auditoria externa

Tecnologias principais: Power BI, Snowflake, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Fase 1 - Discovery e definição de indicadores: 4 semanas
- Fase 2 - Engenharia de dados e modelagem em Snowflake: 8 semanas
- Fase 3 - Dashboards em Power BI e validação com usuários: 6 semanas
- Fase 4 - Homologação, treinamento e go-live: 2 semanas

## 5. Entregáveis

- Data warehouse ESG em Snowflake com 12 tabelas de fato e dimensões de planta, período e fonte de emissão
- 5 dashboards no Power BI: visão executiva, emissões por escopo, energia, água e resíduos
- Documento de premissas e metodologia de cálculo de emissões validado pela área de Sustentabilidade
- Pipeline automatizado em Azure com atualização diária e painel de monitoramento de qualidade de dados
- Trilha de auditoria e manual de operação para o time interno de dados

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em Power BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa qualidade e padronização dos dados históricos das plantas
- Risco: Mudanças nos fatores de emissão durante o projeto
- Risco: Disponibilidade limitada dos pontos focais das plantas para validação

## 8. Investimento

Investimento total: R$ 1.090.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 18%.
