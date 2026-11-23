---
projeto_id: P543
cliente: Moda Leve Store
titulo: Precificação dinâmica com Databricks e GCP para rede de varejo de moda
segmento: Varejo
tecnologias: ["Databricks","GCP"]
servicos: ["Data Science / ML","Analytics & BI"]
area: Data & Analytics
dono: Eduarda Prado
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P543
id: P543-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-06-10
prazo_meses: 6
valor: 640000
margem: 0.32
---

# Proposta Comercial — Precificação dinâmica com Databricks e GCP para rede de varejo de moda

**Cliente:** Moda Leve Store
**Segmento:** Varejo
**Área responsável:** Data & Analytics · **Dono da proposta:** Eduarda Prado
**Data:** 2026-06-10 · **Versão:** final

## 1. Contexto e desafio

A Moda Leve Store opera 78 lojas físicas e um e-commerce que representa 22% da receita, mas pratica preços definidos manualmente por regional, com defasagem média de 9 dias frente à concorrência. Isso gera perda estimada de 4,5 pontos de margem em coleções sazonais e remanescentes de estoque acima de 18% ao fim de cada ciclo.

## 2. Objetivo

Implantar um motor de precificação dinâmica baseado em demanda, elasticidade e estoque, integrado aos canais de venda, para elevar a margem bruta em 2,8 pontos e reduzir remanescentes em 25% no ciclo de 6 meses.

## 3. Escopo da solução

- Ingestão de dados transacionais de vendas, estoque e concorrência no Databricks sobre GCP (BigQuery e Cloud Storage)
- Construção de modelos de elasticidade-preço e previsão de demanda em Data Science / ML no Databricks
- Camada de Analytics & BI com dashboards de margem, giro e aderência de preço no Looker
- Motor de regras de precificação com aprovação humana e simulação de cenários por categoria e regional
- Integração via APIs com o ERP e o e-commerce para atualização diária de preços em até 4 ciclos por dia

Tecnologias principais: Databricks, GCP.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Discovery e fundação de dados (6 semanas)
- Modelagem de elasticidade e previsão (8 semanas)
- Piloto em 30 lojas e ajuste de regras (6 semanas)
- Rollout para 78 lojas e e-commerce (6 semanas)

## 5. Entregáveis

- Pipeline de dados unificado no Databricks com 42 fontes mapeadas e atualização horária
- Modelo de elasticidade-preço validado para as 12 categorias principais, com MAPE abaixo de 12%
- Painéis de Analytics & BI de margem e giro por loja, categoria e regional
- Motor de precificação dinâmica em produção em 30 lojas piloto
- Playbook de governança de preços e treinamento para 15 analistas do cliente

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e atraso na entrega dos dados históricos de concorrência
- Risco: Resistência dos gerentes regionais à autonomia do motor de preços
- Risco: Latência de integração com o ERP legado

## 8. Investimento

Investimento total: R$ 640.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 32%.
