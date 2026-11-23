---
projeto_id: P163
cliente: Geradora Ventos do Nordeste
titulo: Redução de Perdas Não Técnicas com Machine Learning e Databricks
segmento: Utilities / Energia
tecnologias: ["Databricks","Machine Learning"]
servicos: ["Data Science / ML"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P163
id: P163-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-09-28
prazo_meses: 7
valor: 1890000
margem: 0.28
---

# Proposta Comercial — Redução de Perdas Não Técnicas com Machine Learning e Databricks

**Cliente:** Geradora Ventos do Nordeste
**Segmento:** Utilities / Energia
**Área responsável:** Data & Analytics · **Dono da proposta:** Nelson Barbosa
**Data:** 2025-09-28 · **Versão:** final

## 1. Contexto e desafio

A Geradora Ventos do Nordeste enfrenta perdas não técnicas estimadas em 8,5% da energia distribuída, o que representa cerca de R$ 12 milhões anuais. A detecção manual de fraudes e ligações clandestinas cobre apenas 30% dos casos suspeitos, deixando um passivo significativo de recuperação de receita.

## 2. Objetivo

Desenvolver modelos de machine learning para identificar e priorizar casos de perdas não técnicas, integrados em uma plataforma Databricks, visando reduzir as perdas em 2 pontos percentuais em 12 meses.

## 3. Escopo da solução

- Análise exploratória e engenharia de features em Databricks para 2,5 milhões de unidades consumidoras.
- Desenvolvimento de modelos de classificação (gradient boosting e redes neurais) para detecção de anomalias de consumo.
- Implementação de pipeline de ML em Databricks para treinamento e inferência em lote diário.
- Criação de dashboards de priorização de inspeções com scores de risco e explicações via SHAP.
- Integração dos resultados com o sistema de gestão de inspeções existente via API.

Tecnologias principais: Databricks, Machine Learning.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Fase 1 – Diagnóstico e preparação de dados: 6 semanas
- Fase 2 – Desenvolvimento e validação de modelos: 10 semanas
- Fase 3 – Implantação do pipeline e dashboards: 8 semanas
- Fase 4 – Treinamento e go-live assistido: 4 semanas

## 5. Entregáveis

- Relatório de diagnóstico de dados e qualidade com recomendações de melhorias.
- Modelo preditivo de perdas não técnicas com AUC superior a 0,85 e matriz de confusão calibrada.
- Pipeline de ML automatizado em Databricks com orquestração de tarefas e monitoramento de drift.
- Dashboard de priorização de inspeções com lista diária dos 500 casos de maior risco.
- Documentação técnica e treinamento para a equipe de ciência de dados do cliente.

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 especialista em Databricks..

## 7. Premissas e riscos

- Risco: Qualidade dos dados de consumo e cadastro incompleta ou inconsistente.
- Risco: Resistência das equipes de campo à priorização baseada em modelo.
- Risco: Prazo de 7 meses pode ser insuficiente para ciclo completo de ML e implantação.

## 8. Investimento

Investimento total: R$ 1.890.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 28%.
