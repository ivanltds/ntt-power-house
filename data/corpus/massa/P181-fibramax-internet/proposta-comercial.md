---
projeto_id: P181
cliente: FibraMax Internet
titulo: Precificação Dinâmica de Planos com Machine Learning e Databricks
segmento: Telecom
tecnologias: ["Machine Learning","Databricks"]
servicos: ["Analytics & BI"]
area: Data & Analytics
dono: Zilda Correia
confidencialidade: confidencial
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P181
id: P181-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-03-25
prazo_meses: 5
valor: 680000
margem: 0.21
---

# Proposta Comercial — Precificação Dinâmica de Planos com Machine Learning e Databricks

**Cliente:** FibraMax Internet
**Segmento:** Telecom
**Área responsável:** Data & Analytics · **Dono da proposta:** Zilda Correia
**Data:** 2026-03-25 · **Versão:** final

## 1. Contexto e desafio

A FibraMax Internet, com 480 mil assinantes residenciais e PMEs em 7 estados, praticava precificação estática por região, o que gerava perda de margem em campanhas promocionais e baixa conversão de upgrades. Cerca de 62% das ofertas eram definidas manualmente, levando até 9 dias para reagir a mudanças de demanda e concorrência.

## 2. Objetivo

Implantar um motor de precificação dinâmica baseado em Machine Learning na plataforma Databricks para ajustar preços e ofertas em ciclos diários, elevando margem e conversão.

## 3. Escopo da solução

- Construção de pipeline de dados no Databricks integrando CRM, billing e churn histórico de 36 meses
- Desenvolvimento de modelos de Machine Learning de elasticidade-preço e propensão a upgrade por segmento
- Motor de recomendação de preço com regras de negócio e guardrails de margem mínima
- Painéis de Analytics & BI para acompanhamento de conversão, ARPU e margem por oferta
- Testes A/B e monitoramento de drift dos modelos em produção

Tecnologias principais: Machine Learning, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Discovery e preparação de dados (5 semanas)
- Modelagem e treinamento de Machine Learning (7 semanas)
- Integração, testes A/B e dashboards (6 semanas)
- Go-live e estabilização (2 semanas)

## 5. Entregáveis

- Pipeline de dados unificado no Databricks com 42 tabelas catalogadas
- 3 modelos de Machine Learning validados (elasticidade, propensão e churn)
- API de precificação dinâmica integrada ao CRM
- Dashboard executivo de Analytics & BI com 18 indicadores
- Relatório de testes A/B e playbook de operação do motor

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e dispersão dos dados históricos de billing
- Risco: Baixa adesão das áreas comercial e pricing às recomendações
- Risco: Latência na integração da API com o CRM legado

## 8. Investimento

Investimento total: R$ 680.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 21%.
