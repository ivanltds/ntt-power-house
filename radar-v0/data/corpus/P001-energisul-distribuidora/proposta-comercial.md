---
projeto_id: P001
cliente: Energisul Distribuidora
titulo: Plataforma de dados para redução de perdas não técnicas
segmento: Utilities / Energia
tecnologias: ["Databricks","Azure","Power BI","Python"]
servicos: ["Engenharia de Dados","Data Science / ML","Analytics & BI","Governança de Dados"]
area: Data & Analytics
dono: Marina Costa
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P001
id: P001-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-03-10
prazo_meses: 6
valor: 2400000
margem: 0.28
---

# Proposta Comercial — Plataforma de dados para redução de perdas não técnicas

**Cliente:** Energisul Distribuidora
**Segmento:** Utilities / Energia
**Área responsável:** Data & Analytics · **Dono da proposta:** Marina Costa
**Data:** 2025-03-10 · **Versão:** final

## 1. Contexto e desafio

A distribuidora perdia cerca de 11% da energia injetada por perdas não técnicas (furto de energia, fraude em medidores e erros de cadastro). As inspeções de campo eram escolhidas por amostragem manual, com taxa de acerto abaixo de 15%.

## 2. Objetivo

Criar uma plataforma de dados lakehouse que consolide leituras de medidores, cadastro comercial e histórico de inspeções, e usar modelos de machine learning para priorizar as inspeções com maior probabilidade de irregularidade.

## 3. Escopo da solução

- Ingestão de leituras de medidores (cerca de 3 milhões de unidades consumidoras) e dados do sistema comercial em Azure Data Factory
- Lakehouse em Databricks com camadas bronze, prata e ouro sobre Delta Lake
- Modelo preditivo de propensão a irregularidade com PySpark e MLflow
- Dashboards em Power BI para a equipe de recuperação de energia
- Catálogo de dados e regras de qualidade para os dados de medição

Tecnologias principais: Databricks, Azure, Power BI, Python.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Discovery e desenho da arquitetura (4 semanas)
- Construção do lakehouse (10 semanas)
- Modelagem e piloto em 2 regionais (8 semanas)
- Rollout e operação assistida (4 semanas)

## 5. Entregáveis

- Lakehouse em produção
- Modelo de priorização de inspeções
- 6 dashboards operacionais
- Catálogo de dados
- Runbook de operação

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 2 cientistas de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade do cadastro comercial
- Risco: Disponibilidade das áreas de campo para o piloto
- Risco: Volume de dados de medição acima do previsto

## 8. Investimento

Investimento total: R$ 2.400.000, em parcelas mensais ao longo de 6 meses.
Margem praticada: 28%.
