---
projeto_id: P373
cliente: Escudo Auto Seguros
titulo: Predição de churn e retenção com Data Science para carteira de seguros auto
segmento: Seguros
tecnologias: ["Salesforce","Databricks"]
servicos: ["Data Science / ML"]
area: Data & Analytics
dono: Leonardo Pires
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P373
id: P373-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-12-29
prazo_meses: 4
valor: 2880000
margem: 0.22
---

# Proposta Comercial — Predição de churn e retenção com Data Science para carteira de seguros auto

**Cliente:** Escudo Auto Seguros
**Segmento:** Seguros
**Área responsável:** Data & Analytics · **Dono da proposta:** Leonardo Pires
**Data:** 2025-12-29 · **Versão:** final

## 1. Contexto e desafio

A Escudo Auto Seguros tem 1,2 milhão de apólices ativas e enfrenta taxa de cancelamento de 18% ao ano na renovação, com perda estimada de R$ 240 milhões em prêmios. A base de dados de sinistros e interações está fragmentada entre sistemas, dificultando ações proativas de retenção sobre os 210 mil clientes com maior risco de churn.

## 2. Objetivo

Construir um modelo preditivo de churn integrado à operação de retenção, permitindo priorizar clientes de maior risco e reduzir em até 5 pontos percentuais a taxa de cancelamento em 12 meses.

## 3. Escopo da solução

- Diagnóstico e integração das bases de apólices, sinistros e atendimento no Databricks, com pipeline de dados em camadas bronze, prata e ouro
- Desenvolvimento de modelo de propensão a churn no Databricks (MLflow) com features comportamentais e de sinistralidade
- Publicação dos scores de risco e réguas de retenção no Salesforce, integrados ao CRM de atendimento
- Definição de gatilhos de ação e segmentação de ofertas de renovação no Salesforce para os 210 mil clientes de maior risco
- Painel de acompanhamento de churn, retenção e ROI das ações em Databricks SQL

Tecnologias principais: Salesforce, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Diagnóstico e integração de dados (4 semanas)
- Modelagem preditiva e validação (6 semanas)
- Integração com Salesforce e réguas de retenção (4 semanas)
- Homologação e transferência de conhecimento (2 semanas)

## 5. Entregáveis

- Relatório de diagnóstico de dados e arquitetura de integração no Databricks
- Modelo de churn treinado e validado com AUC mínima de 0,80 e documentação de features
- Scores de propensão a churn disponibilizados no Salesforce para a base ativa
- Réguas de retenção configuradas no Salesforce com 3 segmentos de risco
- Dashboard de monitoramento de churn e efetividade das ações de retenção

## 6. Equipe proposta

1 arquiteto de dados, 2 cientistas de dados, 1 engenheiro de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e completude dos dados históricos de sinistros e cancelamentos
- Risco: Baixa adoção das réguas de retenção pelos times comerciais
- Risco: Restrições de LGPD no uso de dados comportamentais para scoring

## 8. Investimento

Investimento total: R$ 2.880.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 22%.
