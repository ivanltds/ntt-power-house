---
projeto_id: P272
cliente: Conecta Brasil Telecom
titulo: Predição de churn e retenção com analytics avançado na base pré-paga
segmento: Telecom
tecnologias: ["AWS","Databricks"]
servicos: ["Analytics & BI","CRM"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P272
id: P272-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2024-09-06
prazo_meses: 4
valor: 840000
margem: 0.26
---

# Proposta Comercial — Predição de churn e retenção com analytics avançado na base pré-paga

**Cliente:** Conecta Brasil Telecom
**Segmento:** Telecom
**Área responsável:** Data & Analytics · **Dono da proposta:** Henrique Matos
**Data:** 2024-09-06 · **Versão:** final

## 1. Contexto e desafio

A Conecta Brasil Telecom perdia cerca de 2,3% da base pré-paga por mês, o equivalente a 180 mil linhas, sem conseguir identificar os clientes com maior propensão ao cancelamento. Os modelos de retenção eram reativos e baseados em regras fixas, com campanhas de retenção acertando apenas 11% dos casos abordados.

## 2. Objetivo

Implantar um modelo preditivo de churn na AWS e no Databricks para priorizar ações de retenção e aumentar a eficácia das campanhas de CRM sobre a base pré-paga.

## 3. Escopo da solução

- Ingestão de dados de recarga, uso, atendimento e CRM em data lake na AWS (S3 e Glue)
- Construção de pipeline de features e treinamento de modelos de churn no Databricks (MLflow)
- Score de propensão ao churn atualizado diariamente e integrado ao CRM para acionamento de campanhas
- Dashboards de monitoramento de churn e efetividade de retenção em Analytics & BI
- Definição de réguas de retenção e testes A/B com times de CRM

Tecnologias principais: AWS, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Diagnóstico e desenho de dados (4 semanas)
- Engenharia de dados e features (5 semanas)
- Modelagem e integração com CRM (5 semanas)
- Piloto de campanhas e handover (2 semanas)

## 5. Entregáveis

- Data lake e pipeline de features documentados na AWS
- Modelo de churn em produção com AUC acima de 0,82
- Score diário de propensão integrado ao CRM para 180 mil clientes elegíveis
- Painéis de BI com indicadores de churn, retenção e ROI das campanhas
- Playbook de réguas de retenção e relatório de testes A/B

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e dispersão dos dados de recarga entre sistemas legados
- Risco: Baixa adesão das áreas de CRM às novas réguas de retenção
- Risco: Latência na integração diária do score com o CRM

## 8. Investimento

Investimento total: R$ 840.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 26%.
