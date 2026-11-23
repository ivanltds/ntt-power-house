---
projeto_id: P557
cliente: Fintech Pagaí
titulo: Predição de churn e retenção para base de clientes PJ
segmento: Serviços Financeiros
tecnologias: ["Python","Salesforce","AWS","Databricks"]
servicos: ["Data Science / ML","CRM","Analytics & BI","Change Management"]
area: Data & Analytics
dono: André Vasconcelos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P557
id: P557-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-05-12
prazo_meses: 5
valor: 1550000
margem: 0.27
---

# Proposta Comercial — Predição de churn e retenção para base de clientes PJ

**Cliente:** Fintech Pagaí
**Segmento:** Serviços Financeiros
**Área responsável:** Data & Analytics · **Dono da proposta:** André Vasconcelos
**Data:** 2025-05-12 · **Versão:** final

## 1. Contexto e desafio

A Fintech Pagaí, com carteira de 180 mil clientes PJ e R$ 2,4 bi em volume transacionado anual, vinha perdendo 3,1% da base ativa por trimestre sem conseguir antecipar quais contas migrariam para concorrentes. Os sinais de risco estavam dispersos entre o CRM Salesforce, o data lake na AWS e extratos transacionais, sem modelo preditivo que priorizasse a ação dos times de relacionamento.

## 2. Objetivo

Construir e operacionalizar um modelo de propensão a churn com 90 dias de antecedência, integrado ao CRM, para direcionar campanhas de retenção sobre os segmentos de maior valor e reduzir a perda de receita recorrente.

## 3. Escopo da solução

- Diagnóstico e engenharia de features sobre dados transacionais e cadastrais no Databricks, com pipelines em Python e armazenamento na AWS (S3 e Redshift)
- Desenvolvimento de modelos de classificação de churn em Python (XGBoost e regressão logística) com explicabilidade via SHAP e monitoramento de drift
- Integração dos scores ao Salesforce para acionar jornadas de retenção e filas de priorização para os gerentes de conta
- Dashboards de Analytics & BI com coortes de churn, valor em risco e efetividade das ações de retenção
- Plano de Change Management com treinamento de 120 usuários de CRM e relacionamento em três ondas regionais

Tecnologias principais: Python, Salesforce, AWS, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Descoberta e diagnóstico de dados (4 semanas)
- Engenharia de dados e modelagem preditiva (9 semanas)
- Integração ao Salesforce e dashboards (5 semanas)
- Piloto, rollout e change management (4 semanas)

## 5. Entregáveis

- Modelo de propensão a churn em produção com AUC de 0,87 e atualização diária dos scores
- Score de risco e valor em risco embarcados no Salesforce para 180 mil contas PJ
- Painéis de monitoramento de churn, coortes e ROI das campanhas de retenção
- Playbook de retenção por segmento com gatilhos, ofertas e cadência de contato
- Programa de capacitação e material de apoio para os times comerciais e de CRM

## 6. Equipe proposta

1 arquiteto de dados, 2 cientistas de dados, 1 engenheiro de dados, 1 consultor de CRM Salesforce e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e defasagem dos dados cadastrais de clientes PJ
- Risco: Baixa adesão dos gerentes de conta ao uso dos scores no CRM
- Risco: Drift do modelo após mudanças sazonais no comportamento transacional

## 8. Investimento

Investimento total: R$ 1.550.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 27%.
