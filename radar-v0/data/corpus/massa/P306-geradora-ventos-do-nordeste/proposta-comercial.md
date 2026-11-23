---
projeto_id: P306
cliente: Geradora Ventos do Nordeste
titulo: Redução de Perdas Não Técnicas com Analytics Avançado em Databricks e Azure
segmento: Utilities / Energia
tecnologias: ["Databricks","Power BI","Machine Learning","Azure"]
servicos: ["Engenharia de Dados","Data Science / ML"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P306
id: P306-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-08-09
prazo_meses: 6
valor: 790000
margem: 0.18
---

# Proposta Comercial — Redução de Perdas Não Técnicas com Analytics Avançado em Databricks e Azure

**Cliente:** Geradora Ventos do Nordeste
**Segmento:** Utilities / Energia
**Área responsável:** Data & Analytics · **Dono da proposta:** Nelson Barbosa
**Data:** 2026-08-09 · **Versão:** final

## 1. Contexto e desafio

A Geradora Ventos do Nordeste opera 14 usinas eólicas com 1,2 GW de capacidade instalada e enfrenta perdas não técnicas estimadas em 3,8% da energia distribuída, o equivalente a R$ 9,4 milhões por ano. A detecção atual de fraude e irregularidades é manual, cobre apenas 12% dos medidores por ciclo e leva até 45 dias para gerar ação em campo.

## 2. Objetivo

Implantar uma plataforma analítica no Azure e Databricks com modelos de Machine Learning para identificar padrões de perda não técnica e priorizar inspeções, reduzindo o índice de perdas em até 1,5 ponto percentual em 6 meses.

## 3. Escopo da solução

- Ingestão e tratamento de dados de medição, faturamento e inspeções no Azure Data Lake e Databricks, com pipelines em Delta Lake
- Desenvolvimento de modelos de Machine Learning para detecção de anomalias e scoring de risco de fraude por unidade consumidora
- Construção de dashboards no Power BI para acompanhamento de perdas por alimentador, município e classe de consumo
- Integração do scoring de risco ao processo de priorização de inspeções em campo, com API de consulta
- Governança de dados e monitoramento de drift dos modelos em Azure Machine Learning

Tecnologias principais: Databricks, Power BI, Machine Learning, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e arquitetura de dados (6 semanas)
- Engenharia de dados e pipelines no Databricks (8 semanas)
- Modelagem de Machine Learning e dashboards Power BI (8 semanas)
- Piloto de priorização de inspeções e handover (2 semanas)

## 5. Entregáveis

- Pipeline de dados de medição e faturamento operando em Databricks com 98% de completude
- Modelo de scoring de risco de perda não técnica com AUC superior a 0,80 em validação
- Dashboard executivo no Power BI com 12 indicadores de perdas e ranking de unidades suspeitas
- Relatório de priorização de inspeções com lista mensal de 5.000 unidades de maior risco
- Documentação técnica e transferência de conhecimento para a equipe de dados do cliente

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa qualidade e atraso na liberação dos dados históricos de medição
- Risco: Resistência das áreas de campo à mudança no processo de inspeção
- Risco: Prazo curto de 6 meses para treinar e validar modelos com sazonalidade limitada

## 8. Investimento

Investimento total: R$ 790.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 18%.
