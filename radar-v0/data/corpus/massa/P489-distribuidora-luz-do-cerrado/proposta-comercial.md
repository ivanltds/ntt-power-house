---
projeto_id: P489
cliente: Distribuidora Luz do Cerrado
titulo: Previsão de Demanda e Reposição de Estoque com Machine Learning para Distribuidora de Energia
segmento: Utilities / Energia
tecnologias: ["Machine Learning","SAP","Python"]
servicos: ["Engenharia de Dados","Data Science / ML"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P489
id: P489-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-08-23
prazo_meses: 6
valor: 1290000
margem: 0.28
---

# Proposta Comercial — Previsão de Demanda e Reposição de Estoque com Machine Learning para Distribuidora de Energia

**Cliente:** Distribuidora Luz do Cerrado
**Segmento:** Utilities / Energia
**Área responsável:** Data & Analytics · **Dono da proposta:** Nelson Barbosa
**Data:** 2026-08-23 · **Versão:** final

## 1. Contexto e desafio

A Distribuidora Luz do Cerrado opera 42 centros de distribuição de materiais elétricos e hidráulicos, com um estoque médio de R$ 38 milhões e perdas de cerca de R$ 4,2 milhões ao ano por ruptura e obsolescência. A reposição é feita hoje por planilhas e regras manuais, gerando cobertura irregular: 18% dos SKUs críticos ficam abaixo do ponto de pedido enquanto 23% do capital fica parado em itens de baixo giro.

## 2. Objetivo

Implantar um modelo de previsão de demanda e recomendação de reposição por SKU e centro de distribuição, integrado ao SAP, para reduzir rupturas e liberar capital de giro em até 6 meses de projeto.

## 3. Escopo da solução

- Engenharia de dados para extrair históricos de consumo, ordens de compra e níveis de estoque do SAP para um data lake em Python
- Construção de modelos de Machine Learning de previsão de demanda por SKU, sazonalidade e centro de distribuição
- Motor de recomendação de ponto de pedido e lote de reposição com lógica de criticidade e lead time de fornecedor
- Integração dos resultados ao SAP para apoiar o planejamento de compras e o MRP
- Dashboards de acuracidade do modelo, cobertura de estoque e capital liberado para a área de suprimentos

Tecnologias principais: Machine Learning, SAP, Python.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e engenharia de dados (6 semanas)
- Modelagem de previsão e validação com o negócio (8 semanas)
- Integração ao SAP e piloto em 8 centros de distribuição (6 semanas)
- Rollout, treinamento e sustentação (4 semanas)

## 5. Entregáveis

- Pipeline de dados de demanda e estoque validado com 36 meses de histórico
- Modelo de previsão de demanda com acuracidade MAPE abaixo de 15% nos SKUs de alto giro
- Relatório de recomendação de reposição por centro de distribuição, integrado ao SAP
- Painel gerencial de cobertura de estoque, rupturas e capital de giro
- Documentação técnica e treinamento de 12 analistas de suprimentos

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e granularidade insuficiente do histórico de consumo no SAP
- Risco: Baixa adesão dos planejadores de suprimentos ao novo processo de reposição
- Risco: Lead time dos fornecedores instável, afetando a recomendação de lote

## 8. Investimento

Investimento total: R$ 1.290.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 28%.
