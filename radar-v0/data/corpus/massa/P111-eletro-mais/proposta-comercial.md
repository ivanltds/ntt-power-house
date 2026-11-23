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
id: P111-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2024-11-11
prazo_meses: 4
valor: 1230000
margem: 0.24
---

# Proposta Comercial — Predição de churn e retenção para varejo eletro com AWS e Databricks

**Cliente:** Eletro Mais
**Segmento:** Varejo
**Área responsável:** Data & Analytics · **Dono da proposta:** Eduarda Prado
**Data:** 2024-11-11 · **Versão:** final

## 1. Contexto e desafio

A Eletro Mais, rede de varejo com 180 lojas e 2,3 milhões de clientes ativos no CRM, vinha perdendo clientes de alto valor sem conseguir agir a tempo: a taxa de churn anual no segmento de crédito próprio chegava a 21% e as campanhas de retenção eram disparadas 45 dias após o último sinal de queda de compra. O time de CRM não tinha visão preditiva, apenas relatórios históricos, e o esforço de reativação consumia R$ 1,2 milhão por ano com retorno abaixo de 8%.

## 2. Objetivo

Implantar um modelo de propensão a churn com dados de compra, crédito e atendimento, integrado ao CRM, para antecipar a saída de clientes de alto valor e priorizar ações de retenção nas 180 lojas.

## 3. Escopo da solução

- Construção do data lake no AWS S3 com ingestão de dados transacionais do ERP, CRM e bureau de crédito via AWS Glue
- Engenharia de features e pipelines de modelo no Databricks com Delta Lake, incluindo histórico de 36 meses de compras
- Treinamento e validação de modelos de propensão a churn com explicabilidade das principais variáveis por cliente
- Criação de scores de risco e segmentação de clientes de alto valor no Databricks, atualizados semanalmente
- Integração dos scores ao CRM para disparo de jornadas de retenção e painéis de acompanhamento em Analytics & BI

Tecnologias principais: AWS, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Diagnóstico e arquitetura de dados (4 semanas)
- Engenharia de dados e features no Databricks (6 semanas)
- Modelagem preditiva e validação (4 semanas)
- Integração ao CRM e implantação (3 semanas)

## 5. Entregáveis

- Data lake estruturado no AWS S3 com 12 fontes integradas e catálogo de dados
- Pipeline de features e modelo de churn no Databricks com AUC acima de 0,80 em validação
- Score de propensão a churn por cliente, atualizado semanalmente para 2,3 milhões de registros
- Jornadas de retenção configuradas no CRM para os 3 segmentos de maior risco
- Painel executivo de Analytics & BI com taxa de churn, cobertura de contato e retorno das ações

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados, 1 consultor de CRM e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e dispersão dos dados históricos do ERP
- Risco: Baixa adesão das lojas às jornadas de retenção
- Risco: Janela curta de 4 meses para modelagem e integração

## 8. Investimento

Investimento total: R$ 1.230.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 24%.
