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
id: P133-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2024-07-25
prazo_meses: 6
valor: 620000
---

# Estimativa financeira (GECO) — Moda Leve Store

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Construção de pipelines de ingestão e tratamento de dados de vendas, estoque, clima e calendário promocional no Databricks, com camadas bronze, silver e gold; Desenvolvimento de modelos de previsão de demanda em Python (séries temporais e gradient boosting) por SKU, loja e horizonte de 1 a 8 semanas.
- Tecnologias assumidas: Python, Databricks.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 6 meses.

Equipe estimada: 1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 620.000 (sem contingência).

## Pontos em aberto

- Qualidade e inconsistência dos dados históricos de estoque por loja
- Baixa adesão dos gerentes regionais às sugestões automáticas de reposição
- Sazonalidade atípica no período de validação reduzindo a acurácia do modelo
