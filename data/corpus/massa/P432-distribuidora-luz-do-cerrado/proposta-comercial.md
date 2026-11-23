---
projeto_id: P432
cliente: Distribuidora Luz do Cerrado
titulo: Previsão de demanda e reposição de estoque com Data Science para distribuidora de energia
segmento: Utilities / Energia
tecnologias: ["SAP","Snowflake","Databricks","Python"]
servicos: ["Data Science / ML"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P432
id: P432-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-07-01
prazo_meses: 7
valor: 1860000
margem: 0.27
---

# Proposta Comercial — Previsão de demanda e reposição de estoque com Data Science para distribuidora de energia

**Cliente:** Distribuidora Luz do Cerrado
**Segmento:** Utilities / Energia
**Área responsável:** Data & Analytics · **Dono da proposta:** Nelson Barbosa
**Data:** 2026-07-01 · **Versão:** final

## 1. Contexto e desafio

A Distribuidora Luz do Cerrado atende cerca de 1,2 milhão de unidades consumidoras e opera 38 centros de distribuição de materiais, com um estoque médio de R$ 210 milhões. O planejamento de demanda é feito hoje em planilhas, gerando rupturas em 14% dos itens críticos e excesso de estoque em 22% do portfólio.

## 2. Objetivo

Implantar modelos de previsão de demanda e recomendação de reposição para reduzir rupturas e capital imobilizado nos centros de distribuição.

## 3. Escopo da solução

- Modelos de previsão de demanda em Python com features históricas de consumo extraídas do SAP
- Pipeline de dados no Snowflake e processamento no Databricks para séries temporais por SKU e centro de distribuição
- Motor de recomendação de reposição com políticas de estoque de segurança e ponto de pedido
- Painéis de acurácia e acompanhamento de KPIs integrados ao SAP para 1.800 SKUs ativos
- Rotina de retreinamento e monitoramento de drift dos modelos

Tecnologias principais: SAP, Snowflake, Databricks, Python.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (6 semanas)
- Desenvolvimento e validação dos modelos de previsão (10 semanas)
- Motor de reposição e integração com SAP (8 semanas)
- Go-live, treinamento e estabilização (4 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e modelo analítico
- Modelos de previsão de demanda validados com MAPE alvo abaixo de 18%
- Motor de recomendação de reposição em produção no Databricks
- Painéis de acurácia e KPIs de estoque no Snowflake
- Manual de operação e plano de retreinamento dos modelos

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de dados, 2 cientistas de dados e 1 engenheiro de dados.

## 7. Premissas e riscos

- Risco: Qualidade e granularidade dos históricos de consumo no SAP
- Risco: Baixa adesão dos planejadores às recomendações automáticas
- Risco: Prazo curto para integração com os processos de compras

## 8. Investimento

Investimento total: R$ 1.860.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 27%.
