---
projeto_id: P492
cliente: TeleNorte Conecta
titulo: Predição de churn e retenção com Databricks e Machine Learning para operadora de telecom
segmento: Telecom
tecnologias: ["Databricks","Machine Learning","Python"]
servicos: ["CRM"]
area: Data & Analytics
dono: Quésia Ramos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P492
id: P492-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-02-23
prazo_meses: 4
valor: 1770000
margem: 0.22
---

# Proposta Comercial — Predição de churn e retenção com Databricks e Machine Learning para operadora de telecom

**Cliente:** TeleNorte Conecta
**Segmento:** Telecom
**Área responsável:** Data & Analytics · **Dono da proposta:** Quésia Ramos
**Data:** 2026-02-23 · **Versão:** final

## 1. Contexto e desafio

A TeleNorte Conecta, operadora de telecom com 2,3 milhões de clientes residenciais e empresariais, vinha perdendo cerca de 1,8% da base por mês (aproximadamente 41 mil clientes), com impacto estimado de R$ 12 milhões mensais em receita recorrente. O CRM não conseguia priorizar ações de retenção: as campanhas eram disparadas em massa, com taxa de resposta inferior a 4%, e o time de relacionamento não tinha visibilidade do risco de cancelamento por cliente.

## 2. Objetivo

Construir um modelo de predição de churn por cliente, integrado ao CRM, para orientar ações de retenção segmentadas e reduzir a perda mensal de base em pelo menos 20% em 4 meses.

## 3. Escopo da solução

- Ingestão e tratamento de dados de consumo, faturamento, reclamações e interações do CRM em Databricks, com pipelines em Python para 18 fontes e histórico de 24 meses.
- Engenharia de atributos e treinamento de modelos de Machine Learning de classificação de churn (gradient boosting e regressão logística) com validação temporal e explicabilidade por variável.
- Publicação de scores de propensão ao churn e propensão de aceite de oferta diretamente no CRM, com atualização diária e regras de priorização para o time de retenção.
- Painéis de acompanhamento em Databricks para monitorar performance do modelo (AUC, precision@10%) e efetividade das campanhas de retenção.
- Definição de playbooks de retenção por faixa de risco e documentação de governança do modelo para uso contínuo pela área de CRM.

Tecnologias principais: Databricks, Machine Learning, Python.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (5 semanas)
- Modelagem e validação de Machine Learning (6 semanas)
- Integração ao CRM e piloto de retenção (4 semanas)
- Rollout, monitoramento e transferência de conhecimento (3 semanas)

## 5. Entregáveis

- Modelo de churn em produção com AUC de 0,86 e lista diária de clientes priorizados por risco e valor.
- Integração do score de churn ao CRM, com atualização automática e fila de trabalho para 120 agentes de retenção.
- Dashboard de monitoramento de modelo e campanhas com 12 indicadores de performance e retenção.
- Playbooks de retenção segmentados em 4 faixas de risco, com ofertas e canais recomendados.
- Documentação técnica e de governança, incluindo dicionário de dados e rotina de retreinamento mensal.

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados, 1 consultor de CRM e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e dispersão dos dados históricos do CRM, exigindo tratamento adicional.
- Risco: Baixa adesão dos agentes de retenção às novas filas priorizadas.
- Risco: Mudanças de oferta comercial durante o projeto afetando as regras de retenção.

## 8. Investimento

Investimento total: R$ 1.770.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 22%.
