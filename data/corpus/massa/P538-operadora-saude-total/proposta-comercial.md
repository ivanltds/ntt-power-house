---
projeto_id: P538
cliente: Operadora Saúde Total
titulo: Painéis executivos e BI para gestão assistencial e financeira
segmento: Saúde
tecnologias: ["Azure","Power BI","Snowflake"]
servicos: ["Analytics & BI"]
area: Data & Analytics
dono: Quésia Ramos
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P538
id: P538-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-02-17
prazo_meses: 2
valor: 700000
margem: 0.35
---

# Proposta Comercial — Painéis executivos e BI para gestão assistencial e financeira

**Cliente:** Operadora Saúde Total
**Segmento:** Saúde
**Área responsável:** Data & Analytics · **Dono da proposta:** Quésia Ramos
**Data:** 2025-02-17 · **Versão:** final

## 1. Contexto e desafio

A Operadora Saúde Total, com 850 mil beneficiários ativos e 12 mil prestadores credenciados, consolida indicadores assistenciais e financeiros em planilhas manuais de 14 áreas, gerando atraso de até 9 dias na divulgação dos números à diretoria. A ausência de uma visão única eleva o custo administrativo em cerca de 6% e dificulta a detecção de desvios de sinistralidade.

## 2. Objetivo

Implantar uma plataforma de analytics com painéis executivos em Azure, Power BI e Snowflake, unificando dados assistenciais e financeiros para a diretoria em até 2 meses.

## 3. Escopo da solução

- Ingestão e integração de dados de sinistros, autorizações e faturamento no Snowflake via pipelines no Azure Data Factory
- Modelagem dimensional de indicadores de sinistralidade, glosa e custo assistencial no Snowflake
- Construção de 8 painéis executivos no Power BI para diretoria, financeiro e gestão de rede
- Publicação e governança dos datasets no Azure, com controle de acesso por perfil e atualização diária
- Migração dos relatórios manuais das 14 áreas para os novos painéis, com validação de paridade de dados

Tecnologias principais: Azure, Power BI, Snowflake.

## 4. Abordagem e cronograma

O projeto será executado em 2 meses, nas seguintes fases:

- Diagnóstico e arquitetura (3 semanas)
- Implementação de pipelines e modelagem no Snowflake (3 semanas)
- Construção dos painéis no Power BI e validação (2 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e catálogo de indicadores homologado
- Pipeline de ingestão no Azure operando com carga diária de 3 milhões de registros
- Modelo dimensional no Snowflake com 45 métricas de negócio certificadas
- 8 painéis executivos publicados no Power BI com tempos de resposta abaixo de 5 segundos
- Manual de governança e treinamento de 30 usuários-chave nas áreas de negócio

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em Power BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e padronização dos dados legados de sinistros
- Risco: Dependência de aprovação de acessos às bases assistenciais
- Risco: Escopo de indicadores expandido durante a execução

## 8. Investimento

Investimento total: R$ 700.000, em parcelas mensais ao longo de 2 meses.

Margem praticada: 35%.
