---
projeto_id: P493
cliente: Companhia de Saneamento Rio Claro
titulo: Previsão de Demanda e Reposição de Ativos com Snowflake e Databricks
segmento: Utilities / Energia
tecnologias: ["Snowflake","Databricks","Python","Machine Learning"]
servicos: ["Engenharia de Dados","Data Science / ML"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P493
id: P493-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-12-31
prazo_meses: 5
valor: 670000
margem: 0.33
---

# Proposta Comercial — Previsão de Demanda e Reposição de Ativos com Snowflake e Databricks

**Cliente:** Companhia de Saneamento Rio Claro
**Segmento:** Utilities / Energia
**Área responsável:** Data & Analytics · **Dono da proposta:** Nelson Barbosa
**Data:** 2025-12-31 · **Versão:** final

## 1. Contexto e desafio

A Companhia de Saneamento Rio Claro gerencia cerca de 1,2 milhão de hidrômetros e mais de 3.500 km de rede, mas a reposição de materiais e a alocação de equipes de campo eram planejadas em planilhas manuais, com erros de até 18% entre a demanda prevista e a real. Isso gerava estoques excessivos em alguns almoxarifados e rupturas frequentes em itens críticos, elevando o custo de manutenção corretiva.

## 2. Objetivo

Implantar uma solução de previsão de demanda e reposição baseada em Machine Learning para os itens de manutenção de rede e hidrômetros, reduzindo o erro de previsão e otimizando os níveis de estoque nos almoxarifados regionais.

## 3. Escopo da solução

- Construção de pipelines de engenharia de dados no Snowflake para consolidar histórico de consumo, ordens de serviço e estoques de 5 almoxarifados regionais
- Desenvolvimento de modelos de previsão de demanda em Python e Machine Learning executados no Databricks, com granularidade semanal por item e regional
- Criação de camada analítica e features de sazonalidade, clima e criticidade de ativos no Snowflake
- Modelo de reposição com cálculo de ponto de pedido e estoque de segurança por item e prazo de entrega de fornecedores
- Painéis de acompanhamento de acurácia e aderência das previsões integrados ao ambiente Databricks

Tecnologias principais: Snowflake, Databricks, Python, Machine Learning.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e Engenharia de Dados (6 semanas)
- Modelagem e Experimentação de ML (8 semanas)
- Motor de Reposição e Validação (5 semanas)
- Go-live e Transferência de Conhecimento (3 semanas)

## 5. Entregáveis

- Pipeline de dados no Snowflake com 24 meses de histórico tratado de consumo e estoques
- Modelos de previsão de demanda treinados e versionados no Databricks para as 350 classes de materiais mais críticas
- Motor de reposição com ponto de pedido e estoque de segurança automatizados
- Relatório de acurácia por família de itens com backtesting de 12 semanas
- Painel de monitoramento de previsões e alertas de ruptura iminente

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e cobertura irregular do histórico de ordens de serviço em sistemas legados
- Risco: Baixa adesão dos gestores de almoxarifado às recomendações do motor de reposição
- Risco: Mudanças de calendário de manutenção e sazonalidade de consumo não capturadas nos modelos

## 8. Investimento

Investimento total: R$ 670.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 33%.
