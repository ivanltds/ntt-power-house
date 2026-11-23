---
projeto_id: P317
cliente: Metalúrgica Forja Forte
titulo: Previsão de demanda e reposição inteligente para indústria metalúrgica
segmento: Manufatura
tecnologias: ["Machine Learning","Python","Databricks","Snowflake"]
servicos: ["Data Science / ML","Engenharia de Dados"]
area: Data & Analytics
dono: Úrsula Campos
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P317
id: P317-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-08-29
prazo_meses: 5
valor: 830000
margem: 0.22
---

# Proposta Comercial — Previsão de demanda e reposição inteligente para indústria metalúrgica

**Cliente:** Metalúrgica Forja Forte
**Segmento:** Manufatura
**Área responsável:** Data & Analytics · **Dono da proposta:** Úrsula Campos
**Data:** 2025-08-29 · **Versão:** final

## 1. Contexto e desafio

A Metalúrgica Forja Forte opera com cerca de 1.200 SKUs ativos e enfrenta rupturas de estoque em 18% dos itens de alta rotação, enquanto mantém capital imobilizado de R$ 42 milhões em estoque. A reposição é feita hoje por planilhas e regras manuais, sem considerar sazonalidade e variações de pedidos dos 35 maiores clientes.

## 2. Objetivo

Implantar modelos de previsão de demanda por SKU e uma rotina automatizada de sugestão de reposição, reduzindo rupturas e o capital imobilizado em estoque.

## 3. Escopo da solução

- Modelagem de previsão de demanda por SKU e por cliente com Machine Learning em Python, considerando sazonalidade e histórico de 36 meses
- Construção de pipelines de ingestão e tratamento de dados de vendas, produção e estoque no Databricks
- Disponibilização das camadas analíticas e features de previsão no Snowflake
- Motor de sugestão de reposição com regras de ponto de pedido e estoque de segurança calculados por modelo
- Painéis de acompanhamento de acurácia da previsão e aderência das sugestões de compra

Tecnologias principais: Machine Learning, Python, Databricks, Snowflake.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (4 semanas)
- Desenvolvimento dos modelos de previsão (6 semanas)
- Motor de reposição e integração no Snowflake (6 semanas)
- Homologação e transferência de conhecimento (4 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e modelo analítico no Snowflake e Databricks
- Modelos de previsão de demanda treinados e validados para os SKUs de maior giro, com acurácia medida por MAPE
- Rotina automatizada de geração de sugestões de reposição por SKU
- Painel de monitoramento de acurácia e de rupturas por família de produto
- Manual de operação e transferência de conhecimento para a equipe de supply chain

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de dados, 2 engenheiros de dados e 2 cientistas de dados.

## 7. Premissas e riscos

- Risco: Qualidade e granularidade insuficiente do histórico de vendas e estoque
- Risco: Baixa adesão da área de supply chain às sugestões automatizadas
- Risco: Mudanças de demanda por sazonalidade não capturadas no período de modelagem

## 8. Investimento

Investimento total: R$ 830.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 22%.
