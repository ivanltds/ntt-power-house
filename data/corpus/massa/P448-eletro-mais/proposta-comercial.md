---
projeto_id: P448
cliente: Eletro Mais
titulo: Previsão de Demanda e Reposição Automatizada para Rede Varejista
segmento: Varejo
tecnologias: ["Machine Learning","Snowflake","Databricks"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: André Vasconcelos
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P448
id: P448-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-03-28
prazo_meses: 6
valor: 3610000
margem: 0.24
---

# Proposta Comercial — Previsão de Demanda e Reposição Automatizada para Rede Varejista

**Cliente:** Eletro Mais
**Segmento:** Varejo
**Área responsável:** Data & Analytics · **Dono da proposta:** André Vasconcelos
**Data:** 2026-03-28 · **Versão:** final

## 1. Contexto e desafio

A Eletro Mais opera 78 lojas e cerca de 4.200 SKUs ativos, com ruptura média de 11,3% nas categorias de maior giro e excesso de estoque em 18% dos itens de baixa rotação. A reposição é feita hoje por planilhas e regras manuais, gerando 23 mil ajustes de pedido por mês e perda estimada de R$ 6,8 milhões anuais em vendas não realizadas.

## 2. Objetivo

Implantar um motor de previsão de demanda e reposição automatizada, integrado ao ERP e ao WMS, para reduzir ruptura e excesso de estoque com previsões por loja e SKU em horizonte semanal.

## 3. Escopo da solução

- Construção de pipeline de engenharia de dados no Databricks para ingestão de histórico de vendas, estoque, promoções e sazonalidade de 36 meses
- Modelagem de camadas analíticas no Snowflake com dados de 78 lojas e 4.200 SKUs, incluindo calendário promocional e rupturas censuradas
- Desenvolvimento e treinamento de modelos de Machine Learning para previsão de demanda semanal por loja e SKU, com meta de MAPE abaixo de 22%
- Motor de sugestão de reposição e ponto de pedido com regras de estoque de segurança, lead time de fornecedor e restrições de lote mínimo
- Integração das sugestões com o ERP para geração automática de pedidos de compra e painéis de acompanhamento para 120 usuários das áreas de compras e lojas

Tecnologias principais: Machine Learning, Snowflake, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e arquitetura de dados (5 semanas)
- Engenharia de dados e camadas no Snowflake (7 semanas)
- Modelagem de previsão e motor de reposição com Machine Learning (8 semanas)
- Piloto em 3 lojas, rollout e treinamento (6 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e modelo de governança no Snowflake e Databricks
- Pipeline de dados em produção com atualização diária e 99% de completude das fontes críticas
- Modelos de previsão de demanda treinados e validados para as 10 categorias prioritárias
- Motor de reposição automatizada integrado ao ERP em 3 lojas piloto antes do rollout para as 78 lojas
- Painéis de acurácia, ruptura e cobertura de estoque e material de treinamento para 120 usuários

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados, 1 especialista de negócio em varejo e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e dispersão do histórico de vendas e estoque entre lojas e ERP
- Risco: Baixa adesão dos compradores às sugestões automáticas de reposição
- Risco: Atraso na liberação de acessos e integrações com o ERP e o WMS do cliente

## 8. Investimento

Investimento total: R$ 3.610.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 24%.
