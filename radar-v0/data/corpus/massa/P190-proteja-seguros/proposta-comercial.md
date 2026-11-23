---
projeto_id: P190
cliente: Proteja Seguros
titulo: Motor de Precificação Dinâmica de Apólices com Dados em Tempo Real
segmento: Seguros
tecnologias: ["GCP","Databricks","Python"]
servicos: ["Analytics & BI"]
area: Data & Analytics
dono: Leonardo Pires
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P190
id: P190-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-06-16
prazo_meses: 6
valor: 2210000
margem: 0.21
---

# Proposta Comercial — Motor de Precificação Dinâmica de Apólices com Dados em Tempo Real

**Cliente:** Proteja Seguros
**Segmento:** Seguros
**Área responsável:** Data & Analytics · **Dono da proposta:** Leonardo Pires
**Data:** 2026-06-16 · **Versão:** final

## 1. Contexto e desafio

A Proteja Seguros mantém hoje 38 tabelas tarifárias estáticas revisadas apenas duas vezes ao ano, o que gera perda estimada de 4,2 pontos de margem em segmentos de auto e residencial e uma taxa de conversão de propostas 12% abaixo da média do mercado. A ausência de dados de sinistralidade e comportamento em tempo quase real impede ajustes de prêmio por perfil e região.

## 2. Objetivo

Construir um motor de precificação dinâmica que atualize prêmios com base em sinistralidade, perfil e região, reduzindo o ciclo de revisão tarifária de 180 para 7 dias e elevando a conversão de propostas em 8%.

## 3. Escopo da solução

- Ingestão de dados de sinistros, propostas e comportamento em GCP (Cloud Storage e Pub/Sub) com pipelines em Python
- Camada analítica e modelos de precificação no Databricks, com Delta Lake e feature store para scoring em lote e quase real
- Integração do motor de prêmio dinâmico às APIs de cotação existentes, com fallback para a tabela tarifária vigente
- Dashboards de acompanhamento de margem, conversão e sinistralidade por segmento em Analytics & BI
- Governança de dados, versionamento de modelos e trilha de auditoria das decisões de precificação

Tecnologias principais: GCP, Databricks, Python.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e desenho da arquitetura de dados (4 semanas)
- Construção dos pipelines em GCP e Databricks (8 semanas)
- Desenvolvimento e backtest dos modelos de precificação (8 semanas)
- Integração, dashboards e go-live assistido (6 semanas)

## 5. Entregáveis

- Pipeline de ingestão e tratamento de dados de sinistros e propostas em GCP operando com SLA de 99,5%
- Modelos de precificação dinâmica validados em backtest sobre 24 meses de histórico de sinistralidade
- API de cálculo de prêmio dinâmico integrada ao ambiente de cotação em homologação
- Painel de Analytics & BI com indicadores de margem, conversão e elasticidade de prêmio por segmento
- Documentação técnica, runbook operacional e treinamento de 3 squads do cliente

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e defasagem dos dados históricos de sinistralidade
- Risco: Restrições regulatórias na alteração de prêmios por perfil
- Risco: Baixa adoção das novas faixas de prêmio pelas áreas comercial e de subscrição

## 8. Investimento

Investimento total: R$ 2.210.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 21%.
