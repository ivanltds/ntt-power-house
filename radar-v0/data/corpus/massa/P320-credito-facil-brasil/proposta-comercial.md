---
projeto_id: P320
cliente: Crédito Fácil Brasil
titulo: Painel ESG e Inventário de Emissões com Power BI e Snowflake
segmento: Serviços Financeiros
tecnologias: ["Power BI","Snowflake"]
servicos: ["Governança de Dados","Analytics & BI"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: interna
status_proposta: Em negociação
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P320
id: P320-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-10-18
prazo_meses: 4
valor: 1170000
margem: 0.33
---

# Proposta Comercial — Painel ESG e Inventário de Emissões com Power BI e Snowflake

**Cliente:** Crédito Fácil Brasil
**Segmento:** Serviços Financeiros
**Área responsável:** Data & Analytics · **Dono da proposta:** Ana Beatriz Lopes
**Data:** 2026-10-18 · **Versão:** final

## 1. Contexto e desafio

O Crédito Fácil Brasil precisa reportar indicadores ESG a reguladores e investidores, mas hoje consolida dados de emissões de 3 fontes distintas em planilhas manuais, com cerca de 40 horas mensais de retrabalho e risco de inconsistência. A ausência de uma base única de dados dificulta a rastreabilidade das métricas de escopo 1 e 2 exigidas no relatório anual.

## 2. Objetivo

Estruturar uma base analítica centralizada em Snowflake e painéis em Power BI para automatizar o cálculo e a divulgação de indicadores ESG e emissões, garantindo rastreabilidade e redução do esforço manual de consolidação.

## 3. Escopo da solução

- Modelagem dimensional no Snowflake para fatos de emissões (escopos 1 e 2) e dimensões de unidade, período e fonte de dados
- Pipeline de ingestão e tratamento dos dados de consumo energético, frota e resíduos no Snowflake, com regras de qualidade e validação
- Camada semântica e dashboards em Power BI com indicadores ESG, comparativos trimestrais e drill-down por unidade de negócio
- Catálogo de dados e dicionário de métricas ESG com linhagem documentada no Snowflake
- Configuração de atualização agendada e alertas de inconsistência nos painéis Power BI

Tecnologias principais: Power BI, Snowflake.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Diagnóstico e arquitetura de dados (4 semanas)
- Implementação do pipeline e modelagem no Snowflake (6 semanas)
- Construção dos dashboards em Power BI (4 semanas)
- Homologação, treinamento e go-live (2 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados ESG em Snowflake aprovado
- Pipeline de ingestão e transformação das 3 fontes de emissões em produção
- 5 dashboards Power BI de indicadores ESG e emissões publicados
- Dicionário de dados e catálogo de métricas com linhagem
- Relatório de validação e plano de sustentação operacional

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa qualidade e padronização das fontes de emissões
- Risco: Atraso na validação das métricas ESG pelas áreas de negócio
- Risco: Mudanças de requisitos regulatórios durante o projeto

## 8. Investimento

Investimento total: R$ 1.170.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 33%.
