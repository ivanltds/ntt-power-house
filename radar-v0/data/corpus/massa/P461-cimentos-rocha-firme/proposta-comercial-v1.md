---
projeto_id: P461
cliente: Cimentos Rocha Firme
titulo: Previsão de demanda e reposição inteligente para operação industrial
segmento: Manufatura
tecnologias: ["SAP","Snowflake","Databricks","Python"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Úrsula Campos
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P461
id: P461-PROPV1
tipo_documental: proposta_comercial
status_documento: rascunho
data: 2026-08-06
prazo_meses: 10
valor: 1390000
margem: 0.25
---

# Proposta Comercial — Previsão de demanda e reposição inteligente para operação industrial (versão 1, rascunho)

**Cliente:** Cimentos Rocha Firme
**Segmento:** Manufatura
**Área responsável:** Data & Analytics · **Dono da proposta:** Úrsula Campos
**Data:** 2026-08-06 · **Versão:** 1 (rascunho)

## 1. Contexto e desafio

A Cimentos Rocha Firme opera 3 fábricas e 12 centros de distribuição com previsão de demanda ainda baseada em planilhas, gerando erro médio de 22% e excesso de estoque em cerca de 18% dos SKUs. A reposição manual entre fábricas e CDs provoca rupturas pontuais e custos logísticos emergenciais que consomem R$ 4,2 milhões por ano.

## 2. Objetivo

Implantar uma plataforma de previsão de demanda e reposição automatizada que reduza o erro de previsão para menos de 12% e diminua o estoque excedente em 15% em 8 meses.

## 3. Escopo da solução

- Extração e integração dos históricos de vendas, produção e estoque do SAP para o Snowflake
- Construção de pipelines de engenharia de dados em Databricks para tratamento e feature engineering das séries de demanda
- Desenvolvimento de modelos de previsão de demanda em Python por SKU, canal e região, com granularidade semanal
- Motor de reposição e sugestão de transferências entre fábricas e CDs alimentado por regras de estoque mínimo e cobertura
- Painéis de acompanhamento de acurácia, rupturas e nível de estoque integrados ao ecossistema Snowflake

Tecnologias principais: SAP, Snowflake, Databricks, Python.

## 4. Abordagem e cronograma

O projeto será executado em 10 meses, nas seguintes fases:

- Diagnóstico e integração de dados (8 semanas)
- Engenharia de dados e feature engineering (10 semanas)
- Modelagem de previsão e motor de reposição (10 semanas)
- Homologação, rollout e treinamento (4 semanas)

## 5. Entregáveis

- Pipeline de dados no Snowflake e Databricks com 24 meses de histórico consolidado de 3 fábricas e 12 CDs
- Modelos de previsão de demanda em Python validados com backtesting e acurácia mínima de 88%
- Motor de reposição automatizada com regras parametrizáveis por família de produto
- Painel gerencial de acurácia de previsão, rupturas e giro de estoque
- Documentação técnica e treinamento de 15 usuários das áreas de Planejamento e Logística

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e dispersão dos históricos de vendas no SAP
- Risco: Baixa adesão dos planejadores às sugestões automáticas de reposição
- Risco: Mudanças de demanda sazonais durante a fase de modelagem

## 8. Investimento

Investimento total: R$ 1.390.000, em parcelas mensais ao longo de 10 meses.

Margem praticada: 25%.
