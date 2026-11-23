---
projeto_id: P111
cliente: Eletro Mais
titulo: Predição de churn e retenção para varejo eletro com AWS e Databricks
segmento: Varejo
tecnologias: ["AWS","Databricks"]
servicos: ["Analytics & BI","CRM"]
area: Data & Analytics
dono: Eduarda Prado
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P111
id: P111-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2024-11-14
prazo_meses: 4
---

# Apresentação Comercial — Eletro Mais

## Slide 1 — Predição de churn e retenção para varejo eletro com AWS e Databricks

Eletro Mais · Varejo

## Slide 2 — O desafio

A Eletro Mais, rede de varejo com 180 lojas e 2,3 milhões de clientes ativos no CRM, vinha perdendo clientes de alto valor sem conseguir agir a tempo: a taxa de churn anual no segmento de crédito próprio chegava a 21% e as campanhas de retenção eram disparadas 45 dias após o último sinal de queda de compra. O time de CRM não tinha visão preditiva, apenas relatórios históricos, e o esforço de reativação consumia R$ 1,2 milhão por ano com retorno abaixo de 8%.

## Slide 3 — Nossa proposta

Implantar um modelo de propensão a churn com dados de compra, crédito e atendimento, integrado ao CRM, para antecipar a saída de clientes de alto valor e priorizar ações de retenção nas 180 lojas.

## Slide 4 — Arquitetura e tecnologias

AWS · Databricks

- Construção do data lake no AWS S3 com ingestão de dados transacionais do ERP, CRM e bureau de crédito via AWS Glue
- Engenharia de features e pipelines de modelo no Databricks com Delta Lake, incluindo histórico de 36 meses de compras
- Treinamento e validação de modelos de propensão a churn com explicabilidade das principais variáveis por cliente

## Slide 5 — Como vamos trabalhar

- Diagnóstico e arquitetura de dados (4 semanas)
- Engenharia de dados e features no Databricks (6 semanas)
- Modelagem preditiva e validação (4 semanas)
- Integração ao CRM e implantação (3 semanas)

Duração total: 4 meses.

## Slide 6 — Por que nós

Experiência em Analytics & BI, CRM. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados, 1 consultor de CRM e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Gerente de CRM e Retenção) e agendar o kickoff.
