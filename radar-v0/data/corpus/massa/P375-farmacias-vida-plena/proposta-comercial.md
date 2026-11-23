---
projeto_id: P375
cliente: Farmácias Vida Plena
titulo: Previsão de demanda e reposição inteligente para rede de farmácias
segmento: Varejo
tecnologias: ["Python","Databricks","Machine Learning","Snowflake"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Leonardo Pires
confidencialidade: confidencial
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P375
id: P375-PROP
tipo_documental: proposta_comercial
status_documento: preliminar
data: 2026-11-06
prazo_meses: 4
valor: 1710000
margem: 0.21
---

# Proposta Comercial — Previsão de demanda e reposição inteligente para rede de farmácias

**Cliente:** Farmácias Vida Plena
**Segmento:** Varejo
**Área responsável:** Data & Analytics · **Dono da proposta:** Leonardo Pires
**Data:** 2026-11-06 · **Versão:** final

## 1. Contexto e desafio

A Farmácias Vida Plena opera 312 lojas e cerca de 4.800 SKUs ativos, com rupturas de estoque que chegam a 11% nas categorias de maior giro e excesso de cobertura em itens de baixa rotação. A reposição é feita hoje por planilhas e regras fixas de ponto de pedido, sem considerar sazonalidade, promoções e variações regionais de demanda.

## 2. Objetivo

Implantar um modelo de previsão de demanda por loja e SKU, integrado ao processo de reposição, para reduzir rupturas em 30% e o estoque em excesso em 15% em 12 meses.

## 3. Escopo da solução

- Construção de pipelines de ingestão e tratamento de dados históricos de vendas, estoque e cadastro de produtos em Databricks com PySpark e Python
- Modelagem dimensional e camada analítica no Snowflake, consolidando 24 meses de histórico de 312 lojas
- Desenvolvimento de modelos de Machine Learning de previsão de demanda por loja, SKU e horizonte semanal, com validação e monitoramento de acurácia (MAPE)
- Definição de regras de reposição e sugestão de pedido a partir das previsões, integradas ao ERP do cliente
- Dashboards de acompanhamento de acurácia, ruptura e cobertura de estoque para as áreas de suprimentos e operações

Tecnologias principais: Python, Databricks, Machine Learning, Snowflake.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (4 semanas)
- Desenvolvimento dos modelos de previsão (6 semanas)
- Motor de reposição e integração com o ERP (4 semanas)
- Homologação, treinamento e go-live (3 semanas)

## 5. Entregáveis

- Pipeline de dados de vendas e estoque operando em Databricks com atualização diária
- Modelo de previsão de demanda em produção, com MAPE alvo abaixo de 18% para itens de alto giro
- Motor de sugestão de reposição parametrizado por loja e categoria
- Camada analítica no Snowflake documentada e disponível para consumo pelas áreas de negócio
- Painel de indicadores de demanda, ruptura e cobertura com treinamento das equipes do cliente

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 analista de BI.

## 7. Premissas e riscos

- Risco: Qualidade e granularidade dos dados históricos de estoque por loja
- Risco: Baixa adesão das equipes de suprimentos às sugestões automáticas de pedido
- Risco: Prazo de integração com o ERP do cliente fora do controle da equipe

## 8. Investimento

Investimento total: R$ 1.710.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 21%.
