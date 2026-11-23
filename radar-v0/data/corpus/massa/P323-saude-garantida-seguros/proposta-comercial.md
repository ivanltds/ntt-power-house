---
projeto_id: P323
cliente: Saúde Garantida Seguros
titulo: Precificação Dinâmica com Databricks e Machine Learning no setor de Seguros
segmento: Seguros
tecnologias: ["Databricks","Machine Learning"]
servicos: ["Analytics & BI","Data Science / ML"]
area: Data & Analytics
dono: Leonardo Pires
confidencialidade: confidencial
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P323
id: P323-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-11-06
prazo_meses: 3
valor: 620000
margem: 0.22
---

# Proposta Comercial — Precificação Dinâmica com Databricks e Machine Learning no setor de Seguros

**Cliente:** Saúde Garantida Seguros
**Segmento:** Seguros
**Área responsável:** Data & Analytics · **Dono da proposta:** Leonardo Pires
**Data:** 2025-11-06 · **Versão:** final

## 1. Contexto e desafio

A Saúde Garantida Seguros, com carteira de 420 mil apólices e R$ 1,8 bilhão em prêmios anuais, ainda define preços com tabelas estáticas revisadas apenas duas vezes por ano, o que gera perda de competitividade em 18% das cotações e prêmios subavaliados em segmentos de maior sinistralidade. A defasagem entre a sinistralidade observada e a tarifa praticada chega a 90 dias em produtos de saúde e odontológico.

## 2. Objetivo

Implantar um motor de precificação dinâmica baseado em Databricks e Machine Learning para recalcular prêmios com granularidade por perfil de risco, atualizando os modelos a cada ciclo semanal e reduzindo a defasagem tarifária.

## 3. Escopo da solução

- Modelagem de features de risco (sinistralidade, faixa etária, região, histórico de utilização) em camada Delta Lake no Databricks
- Desenvolvimento e treinamento de modelos de Machine Learning de propensão a sinistro e elasticidade de preço por produto
- Pipeline de scoring em lote e near real-time no Databricks para atualização semanal das tarifas
- Painéis de Analytics & BI para monitoramento de prêmio médio, taxa de conversão e loss ratio por segmento
- Governança de modelos com versionamento, monitoramento de drift e trilha de auditoria no Databricks

Tecnologias principais: Databricks, Machine Learning.

## 4. Abordagem e cronograma

O projeto será executado em 3 meses, nas seguintes fases:

- Diagnóstico e engenharia de dados (4 semanas)
- Desenvolvimento de modelos de Machine Learning (5 semanas)
- Integração, scoring e painéis de Analytics & BI (3 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e desenho do motor de precificação
- Três modelos de Machine Learning treinados e validados com métricas de AUC e Gini
- Pipeline de scoring automatizado rodando em ambiente de produção no Databricks
- Dashboard de Analytics & BI com 12 indicadores de precificação e conversão
- Relatório de governança de modelos e plano de monitoramento de drift

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e cobertura histórica dos dados de sinistralidade no Databricks
- Risco: Resistência das áreas de subscrição à adoção de tarifas dinâmicas
- Risco: Prazo de 3 meses pressionado pela validação regulatória dos modelos

## 8. Investimento

Investimento total: R$ 620.000, em parcelas mensais ao longo de 3 meses.

Margem praticada: 22%.
