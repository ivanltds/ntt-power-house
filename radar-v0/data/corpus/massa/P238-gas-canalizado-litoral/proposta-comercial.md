---
projeto_id: P238
cliente: Gás Canalizado Litoral
titulo: Plataforma de Indicadores ESG e Inventário de Emissões para Distribuidora de Gás
segmento: Utilities / Energia
tecnologias: ["Snowflake","Python","Power BI","Azure"]
servicos: ["Analytics & BI","Governança de Dados"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: interna
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P238
id: P238-PROP
tipo_documental: proposta_comercial
status_documento: preliminar
data: 2026-10-26
prazo_meses: 5
valor: 1450000
margem: 0.32
---

# Proposta Comercial — Plataforma de Indicadores ESG e Inventário de Emissões para Distribuidora de Gás

**Cliente:** Gás Canalizado Litoral
**Segmento:** Utilities / Energia
**Área responsável:** Data & Analytics · **Dono da proposta:** Nelson Barbosa
**Data:** 2026-10-26 · **Versão:** final

## 1. Contexto e desafio

A Gás Canalizada Litoral acompanha hoje cerca de 1.200 pontos de medição e 38 indicadores ESG em planilhas manuais, com fechamento mensal que consome 15 dias da equipe de sustentabilidade. A ausência de trilha de auditoria e de cálculo padronizado de emissões (Escopos 1, 2 e 3) gera retrabalho e risco de inconsistência nos relatórios regulatórios e no inventário anual de GEE.

## 2. Objetivo

Centralizar e automatizar o cálculo de indicadores ESG e emissões em uma plataforma analítica governada, reduzindo o ciclo de fechamento mensal de 15 para 5 dias úteis e garantindo rastreabilidade dos dados para auditoria.

## 3. Escopo da solução

- Ingestão de dados operacionais, de consumo de combustível e de faturas de energia em Snowflake, com rotinas de qualidade e versionamento em Python
- Modelagem dimensional dos indicadores ESG e do inventário de emissões (Escopos 1, 2 e 3) com fatores de emissão parametrizáveis
- Pipeline em Python para cálculo automatizado de 38 indicadores e reconciliação mensal dos 1.200 pontos de medição
- Camada semântica e 6 dashboards em Power BI para sustentabilidade, operações e diretoria
- Governança de Dados em Azure: catálogo, linhagem, políticas de acesso e dicionário de dados dos indicadores ESG

Tecnologias principais: Snowflake, Python, Power BI, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e arquitetura de dados (4 semanas)
- Ingestão e modelagem em Snowflake (6 semanas)
- Cálculo de indicadores e dashboards Power BI (8 semanas)
- Governança, testes integrados e go-live (4 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e dicionário dos 38 indicadores ESG
- Pipeline de ingestão e cálculo de emissões implantado em Snowflake com testes automatizados
- 6 dashboards em Power BI publicados e validados pelas áreas de negócio
- Catálogo de dados e linhagem configurados no Azure com políticas de acesso
- Relatório de reconciliação do primeiro fechamento mensal automatizado e plano de sustentação

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em BI, 1 analista de governança de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e dispersão das fontes de consumo e medição podem atrasar a ingestão
- Risco: Mudança nos fatores de emissão ou critérios regulatórios durante o projeto
- Risco: Baixa adoção dos dashboards pelas áreas operacionais no fechamento mensal

## 8. Investimento

Investimento total: R$ 1.450.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 32%.
