---
projeto_id: P140
cliente: Atacadão Popular Sul
titulo: Predição de churn e retenção com Machine Learning para atacarejo
segmento: Varejo
tecnologias: ["Machine Learning","Python","Salesforce","AWS"]
servicos: ["Analytics & BI"]
area: Data & Analytics
dono: Eduarda Prado
confidencialidade: interna
status_proposta: Em negociação
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P140
id: P140-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-06-19
prazo_meses: 6
valor: 1380000
margem: 0.26
---

# Proposta Comercial — Predição de churn e retenção com Machine Learning para atacarejo

**Cliente:** Atacadão Popular Sul
**Segmento:** Varejo
**Área responsável:** Data & Analytics · **Dono da proposta:** Eduarda Prado
**Data:** 2026-06-19 · **Versão:** final

## 1. Contexto e desafio

O Atacadão Popular Sul, rede de varejo alimentar com 42 lojas e cerca de 380 mil clientes ativos no programa de fidelidade, perde aproximadamente 18% da base de clientes recorrentes a cada trimestre. A operação não consegue identificar antecipadamente quais clientes estão em risco de churn, o que inviabiliza ações de retenção segmentadas e resulta em queda estimada de R$ 12 milhões em receita anual.

## 2. Objetivo

Construir um modelo preditivo de churn em Python na AWS, integrado ao Salesforce, capaz de identificar clientes com alto risco de evasão com antecedência de 60 dias e priorizar ações de retenção personalizadas.

## 3. Escopo da solução

- Modelagem de propensão a churn em Python com Machine Learning, treinada sobre histórico transacional e de fidelidade dos últimos 24 meses
- Pipeline de dados na AWS (ingestão, feature store e retraining mensal do modelo)
- Integração dos scores de risco ao Salesforce para acionamento de campanhas de retenção por gerentes de relacionamento
- Dashboards de Analytics & BI com indicadores de churn, taxa de retenção e ROI das ações por loja e por segmento
- Definição de regras de negócio e matriz de priorização de clientes para contato proativo

Tecnologias principais: Machine Learning, Python, Salesforce, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (6 semanas)
- Desenvolvimento e validação do modelo de Machine Learning (10 semanas)
- Integração com Salesforce e dashboards de Analytics & BI (6 semanas)
- Piloto em 8 lojas e rollout para as demais (4 semanas)

## 5. Entregáveis

- Modelo de predição de churn validado com AUC igual ou superior a 0,82 em base de teste
- Pipeline de dados automatizado na AWS em operação com retraining mensal
- Integração dos scores de risco ao Salesforce homologada em ambiente produtivo
- Painéis de Analytics & BI de churn e retenção publicados para 42 lojas
- Playbook de retenção com gatilhos, ofertas e scripts de abordagem para as equipes de CRM

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de dados, 2 cientistas de dados, 1 engenheiro de dados e 1 consultor de CRM Salesforce.

## 7. Premissas e riscos

- Risco: Qualidade e completude dos dados históricos de fidelidade
- Risco: Baixa adesão das equipes de loja às ações de retenção
- Risco: Restrições de privacidade e LGPD no uso de dados de clientes

## 8. Investimento

Investimento total: R$ 1.380.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 26%.
