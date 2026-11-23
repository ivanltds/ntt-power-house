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
id: P133-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2024-08-07
prazo_meses: 7
---

# Apresentação Comercial — Moda Leve Store

## Slide 1 — Previsão de demanda e reposição de estoque com ML para rede de moda

Moda Leve Store · Varejo

## Slide 2 — O desafio

A Moda Leve Store, rede de varejo de vestuário com 48 lojas e 2 centros de distribuição, operava com previsão de demanda baseada em planilhas e médias históricas simples, gerando ruptura média de 14% nos itens de maior giro e excesso de estoque em 22% das SKUs sazonais. A reposição era feita por intuição dos gerentes regionais, sem considerar clima, calendário promocional e desempenho por loja.

## Slide 3 — Nossa proposta

Implantar um modelo de previsão de demanda por SKU e loja, com recomendações de reposição automatizadas, para reduzir rupturas e capital imobilizado em estoque.

## Slide 4 — Arquitetura e tecnologias

Python · Databricks

- Construção de pipelines de ingestão e tratamento de dados de vendas, estoque, clima e calendário promocional no Databricks, com camadas bronze, silver e gold
- Desenvolvimento de modelos de previsão de demanda em Python (séries temporais e gradient boosting) por SKU, loja e horizonte de 1 a 8 semanas
- Motor de recomendação de reposição com regras de ponto de pedido, lote econômico e restrições de capacidade logística

## Slide 5 — Como vamos trabalhar

- Diagnóstico e preparação de dados (6 semanas)
- Modelagem e validação de previsão (10 semanas)
- Motor de reposição e integração com ERP (8 semanas)
- Go-live, treinamento e estabilização (4 semanas)

Duração total: 7 meses.

## Slide 6 — Por que nós

Experiência em Data Science / ML, Engenharia de Dados, com projeto anterior entregue para a Moda Leve Store. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Diretora de Planejamento e Compras) e agendar o kickoff.
