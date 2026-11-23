---
projeto_id: P328
cliente: Banco Atlântida Digital
titulo: Modelo de risco de crédito com ML em AWS e Snowflake
segmento: Serviços Financeiros
tecnologias: ["AWS","Machine Learning","Snowflake"]
servicos: ["Data Science / ML"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P328
id: P328-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-02-02
prazo_meses: 5
valor: 3060000
margem: 0.38
---

# Proposta Comercial — Modelo de risco de crédito com ML em AWS e Snowflake

**Cliente:** Banco Atlântida Digital
**Segmento:** Serviços Financeiros
**Área responsável:** AI & Automation · **Dono da proposta:** Bruno Tavares
**Data:** 2025-02-02 · **Versão:** final

## 1. Contexto e desafio

O Banco Atlântida Digital processa 1,2 milhão de propostas de crédito por mês, das quais 38% são analisadas manualmente, gerando prazo médio de decisão de 4,5 dias e inadimplência de 7,8% na carteira de crédito pessoal. O modelo atual, baseado em regras estáticas, não captura o comportamento transacional recente dos clientes digitais.

## 3. Escopo da solução

- Diagnóstico e preparação de features a partir de dados transacionais e cadastrais no Snowflake
- Desenvolvimento e treinamento de modelos de Machine Learning de score de crédito na AWS (SageMaker)
- Pipeline de MLOps para versionamento, monitoramento de drift e retreinamento mensal do modelo
- Camada de explicabilidade do score (SHAP) para atendimento às exigências regulatórias de crédito responsável
- Integração do score ao motor de decisão de crédito via API, com testes A/B em produção

Tecnologias principais: AWS, Machine Learning, Snowflake.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (5 semanas)
- Desenvolvimento e validação dos modelos (7 semanas)
- MLOps, explicabilidade e integração via API (6 semanas)
- Testes A/B e rollout assistido (4 semanas)

## 5. Entregáveis

- Relatório de diagnóstico de dados e dicionário de features do modelo
- Modelo campeão de score de crédito com métricas de KS, AUC e Gini documentadas
- Pipeline de MLOps em AWS com monitoramento de performance e drift
- Documento de explicabilidade e conformidade regulatória do modelo
- Relatório de testes A/B e plano de rollout para 100% das propostas

## 6. Equipe proposta

1 cientista de dados sênior, 1 engenheiro de machine learning, 1 engenheiro de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e cobertura dos dados históricos de crédito no Snowflake
- Risco: Restrições regulatórias para uso de variáveis sensíveis no modelo
- Risco: Baixa adesão das áreas de crédito ao novo score no rollout

## 8. Investimento

Investimento total: R$ 3.060.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 38%.
