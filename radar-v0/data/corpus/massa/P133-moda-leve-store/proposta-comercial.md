---
projeto_id: P133
cliente: Moda Leve Store
titulo: Previsão de demanda e reposição de estoque com ML para rede de moda
segmento: Varejo
tecnologias: ["Python","Databricks"]
servicos: ["Data Science / ML","Engenharia de Dados"]
area: Data & Analytics
dono: Eduarda Prado
confidencialidade: confidencial
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P133
id: P133-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2024-08-04
prazo_meses: 7
valor: 710000
margem: 0.34
---

# Proposta Comercial — Previsão de demanda e reposição de estoque com ML para rede de moda

**Cliente:** Moda Leve Store
**Segmento:** Varejo
**Área responsável:** Data & Analytics · **Dono da proposta:** Eduarda Prado
**Data:** 2024-08-04 · **Versão:** final

## 1. Contexto e desafio

A Moda Leve Store, rede de varejo de vestuário com 48 lojas e 2 centros de distribuição, operava com previsão de demanda baseada em planilhas e médias históricas simples, gerando ruptura média de 14% nos itens de maior giro e excesso de estoque em 22% das SKUs sazonais. A reposição era feita por intuição dos gerentes regionais, sem considerar clima, calendário promocional e desempenho por loja.

## 2. Objetivo

Implantar um modelo de previsão de demanda por SKU e loja, com recomendações de reposição automatizadas, para reduzir rupturas e capital imobilizado em estoque.

## 3. Escopo da solução

- Construção de pipelines de ingestão e tratamento de dados de vendas, estoque, clima e calendário promocional no Databricks, com camadas bronze, silver e gold
- Desenvolvimento de modelos de previsão de demanda em Python (séries temporais e gradient boosting) por SKU, loja e horizonte de 1 a 8 semanas
- Motor de recomendação de reposição com regras de ponto de pedido, lote econômico e restrições de capacidade logística
- Integração dos resultados ao ERP e ao painel de compras via APIs e tabelas Delta no Databricks
- Monitoramento de acurácia (MAPE e WAPE) e rotina de retreino mensal dos modelos em Python

Tecnologias principais: Python, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (6 semanas)
- Modelagem e validação de previsão (10 semanas)
- Motor de reposição e integração com ERP (8 semanas)
- Go-live, treinamento e estabilização (4 semanas)

## 5. Entregáveis

- Pipeline de dados de demanda consolidado no Databricks com 100% das lojas e CDs integrados
- Modelo de previsão de demanda por SKU e loja com acurácia WAPE de 18% no horizonte de 4 semanas
- Motor de reposição com sugestões diárias de pedido por loja e CD
- Painel de acompanhamento de acurácia, ruptura e cobertura de estoque
- Documentação técnica e treinamento das equipes de Compras e Planejamento

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e inconsistência dos dados históricos de estoque por loja
- Risco: Baixa adesão dos gerentes regionais às sugestões automáticas de reposição
- Risco: Sazonalidade atípica no período de validação reduzindo a acurácia do modelo

## 8. Investimento

Investimento total: R$ 710.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 34%.
