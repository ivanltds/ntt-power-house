---
projeto_id: P228
cliente: Escudo Auto Seguros
titulo: Predição de churn e retenção de segurados com Machine Learning e Databricks
segmento: Seguros
tecnologias: ["Machine Learning","Databricks"]
servicos: ["Data Science / ML","CRM"]
area: Data & Analytics
dono: Leonardo Pires
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P228
id: P228-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2024-04-24
prazo_meses: 5
valor: 500000
margem: 0.21
---

# Proposta Comercial — Predição de churn e retenção de segurados com Machine Learning e Databricks

**Cliente:** Escudo Auto Seguros
**Segmento:** Seguros
**Área responsável:** Data & Analytics · **Dono da proposta:** Leonardo Pires
**Data:** 2024-04-24 · **Versão:** final

## 1. Contexto e desafio

A Escudo Auto Seguros enfrentava uma taxa de cancelamento de apólices de 18% ao ano na carteira de automóvel, com perda estimada de R$ 42 milhões em prêmios anuais. A área de CRM não conseguia priorizar ações de retenção porque não havia modelo preditivo confiável e os dados de sinistros, pagamentos e atendimento estavam dispersos em quatro sistemas distintos.

## 2. Objetivo

Construir um modelo de propensão ao churn e uma esteira de ativação no CRM que permitisse à área de retenção agir de forma proativa sobre os segurados com maior risco de cancelamento.

## 3. Escopo da solução

- Engenharia de dados no Databricks para consolidar sinistros, pagamentos, atendimento e renovações em uma camada analítica única
- Análise exploratória e definição de features de comportamento de pagamento, histórico de sinistros e interações com o atendimento
- Treinamento e validação de modelos de Machine Learning de propensão ao churn com métricas de AUC e lift por faixa de risco
- Integração dos scores de churn ao CRM para segmentação das campanhas de retenção
- Painéis de acompanhamento de efetividade das ações de retenção e monitoramento de drift do modelo

Tecnologias principais: Machine Learning, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e engenharia de dados (6 semanas)
- Modelagem e validação de Machine Learning (8 semanas)
- Integração com CRM e dashboards (4 semanas)
- Homologação e transferência de conhecimento (2 semanas)

## 5. Entregáveis

- Modelo de propensão ao churn validado com AUC de 0,82 e lift de 3,1 no decil de maior risco
- Pipeline de dados no Databricks documentado e em produção com atualização diária dos scores
- Integração dos scores ao CRM com segmentação em cinco faixas de risco
- Dashboard de monitoramento de performance do modelo e das campanhas de retenção
- Documentação técnica e sessão de transferência de conhecimento para o time de dados do cliente

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de dados, 1 cientista de dados sênior, 1 engenheiro de dados e 1 analista de CRM.

## 7. Premissas e riscos

- Risco: Qualidade e completude dos dados históricos de sinistros
- Risco: Baixa adesão das áreas comerciais às campanhas de retenção
- Risco: Mudança de comportamento dos segurados após o início das ações, gerando drift do modelo

## 8. Investimento

Investimento total: R$ 500.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 21%.
