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
id: P493-SOW
tipo_documental: sow
status_documento: assinado
data: 2026-01-25
prazo_meses: 5
valor: 670000
---

# SOW — Previsão de Demanda e Reposição de Ativos com Snowflake e Databricks

**Contratante:** Companhia de Saneamento Rio Claro · **Contratada:** NTT DATA Brasil · **Vigência:** 5 meses a partir do kickoff

## 1. Objeto

Implantar uma solução de previsão de demanda e reposição baseada em Machine Learning para os itens de manutenção de rede e hidrômetros, reduzindo o erro de previsão e otimizando os níveis de estoque nos almoxarifados regionais.

## 2. Escopo contratado

- Construção de pipelines de engenharia de dados no Snowflake para consolidar histórico de consumo, ordens de serviço e estoques de 5 almoxarifados regionais
- Desenvolvimento de modelos de previsão de demanda em Python e Machine Learning executados no Databricks, com granularidade semanal por item e regional
- Criação de camada analítica e features de sazonalidade, clima e criticidade de ativos no Snowflake
- Modelo de reposição com cálculo de ponto de pedido e estoque de segurança por item e prazo de entrega de fornecedores
- Painéis de acompanhamento de acurácia e aderência das previsões integrados ao ambiente Databricks

## 3. Entregáveis e aceite

- Pipeline de dados no Snowflake com 24 meses de histórico tratado de consumo e estoques
- Modelos de previsão de demanda treinados e versionados no Databricks para as 350 classes de materiais mais críticas
- Motor de reposição com ponto de pedido e estoque de segurança automatizados
- Relatório de acurácia por família de itens com backtesting de 12 semanas
- Painel de monitoramento de previsões e alertas de ruptura iminente

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 670.000, faturado mensalmente conforme o cronograma.
