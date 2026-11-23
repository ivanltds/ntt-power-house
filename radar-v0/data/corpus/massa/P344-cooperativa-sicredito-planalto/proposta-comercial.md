---
projeto_id: P344
cliente: Cooperativa Sicrédito Planalto
titulo: Indicadores ESG e Inventário de Emissões com Snowflake e Power BI
segmento: Serviços Financeiros
tecnologias: ["Python","Power BI","Snowflake"]
servicos: ["Governança de Dados","Analytics & BI"]
area: Data & Analytics
dono: Quésia Ramos
confidencialidade: interna
status_proposta: Em negociação
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P344
id: P344-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-06-09
prazo_meses: 4
valor: 2010000
margem: 0.2
---

# Proposta Comercial — Indicadores ESG e Inventário de Emissões com Snowflake e Power BI

**Cliente:** Cooperativa Sicrédito Planalto
**Segmento:** Serviços Financeiros
**Área responsável:** Data & Analytics · **Dono da proposta:** Quésia Ramos
**Data:** 2026-06-09 · **Versão:** final

## 1. Contexto e desafio

A Cooperativa Sicrédito Planalto reporta hoje seus indicadores ESG em planilhas manuais, consolidando dados de 48 agências e mais de 320 mil cooperados, com atraso médio de 25 dias e retrabalho estimado em 30% do esforço da área de sustentabilidade. A ausência de uma base única de emissões (escopos 1, 2 e 3) dificulta a auditoria externa e a prestação de contas a órgãos reguladores e cooperados.

## 2. Objetivo

Implantar uma plataforma de dados ESG no Snowflake, com pipelines em Python e dashboards em Power BI, para automatizar o cálculo de emissões e a publicação mensal de indicadores auditáveis em até 4 meses.

## 3. Escopo da solução

- Construção de pipelines em Python para ingestão e tratamento dos dados de consumo energético, combustível, resíduos e viagens das 48 agências
- Modelagem dimensional no Snowflake com camadas raw, tratada e analítica para os indicadores ESG e fatores de emissão versionados
- Implementação dos cálculos de escopos 1, 2 e 3 conforme GHG Protocol dentro do Snowflake, com trilha de auditoria
- Desenvolvimento de dashboards em Power BI para comitê executivo, área de sustentabilidade e relatório a cooperados
- Definição de catálogo de dados, regras de qualidade e política de acesso na camada de Governança de Dados

Tecnologias principais: Python, Power BI, Snowflake.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Diagnóstico e arquitetura de dados ESG (4 semanas)
- Ingestão e modelagem no Snowflake (6 semanas)
- Cálculo de emissões e dashboards Power BI (4 semanas)
- Homologação, governança e go-live (2 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados ESG e dicionário de indicadores com 60 métricas priorizadas
- Pipeline Python em produção com 12 fontes integradas ao Snowflake e carga diária automatizada
- Modelo analítico de emissões com fatores GHG Protocol versionados e trilha de auditoria
- Painéis Power BI: visão executiva, visão por agência e relatório anual de sustentabilidade
- Relatório de qualidade de dados com metas de completude e acuracidade acima de 98%

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa qualidade e dispersão dos dados de consumo nas 48 agências
- Risco: Mudanças nos fatores de emissão do GHG Protocol durante o projeto
- Risco: Dependência de validação da área de sustentabilidade e auditoria externa

## 8. Investimento

Investimento total: R$ 2.010.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 20%.
