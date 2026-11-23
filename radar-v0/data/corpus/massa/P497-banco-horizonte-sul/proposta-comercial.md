---
projeto_id: P497
cliente: Banco Horizonte Sul
titulo: Modernização do modelo de risco de crédito com Machine Learning na AWS e Snowflake
segmento: Serviços Financeiros
tecnologias: ["AWS","Python","Snowflake","Machine Learning"]
servicos: ["Data Science / ML"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P497
id: P497-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-07-09
prazo_meses: 6
valor: 2540000
margem: 0.34
---

# Proposta Comercial — Modernização do modelo de risco de crédito com Machine Learning na AWS e Snowflake

**Cliente:** Banco Horizonte Sul
**Segmento:** Serviços Financeiros
**Área responsável:** AI & Automation · **Dono da proposta:** Bruno Tavares
**Data:** 2026-07-09 · **Versão:** final

## 1. Contexto e desafio

O Banco Horizonte Sul processa manualmente 12 mil propostas de crédito por mês, com tempo médio de análise de 48 horas e taxa de inadimplência de 8,5% na carteira de pessoas físicas. O modelo atual, baseado em regras fixas, não captura padrões complexos e limita a expansão para novos segmentos.

## 2. Objetivo

Desenvolver um modelo de risco de crédito baseado em Machine Learning, utilizando AWS, Python e Snowflake, para reduzir o tempo de decisão para até 2 horas e diminuir a inadimplência em 15% em seis meses.

## 3. Escopo da solução

- Análise exploratória dos dados históricos de crédito armazenados no Snowflake, com 5 anos de registros e 2 milhões de operações.
- Desenvolvimento de features e treinamento de modelos de classificação (gradient boosting e regressão logística) em Python, utilizando instâncias AWS SageMaker.
- Implementação de pipeline de MLOps para monitoramento e retreinamento automático do modelo, com versionamento no Snowflake e orquestração via AWS Step Functions.
- Criação de API para integração do modelo com o sistema de decisão de crédito existente, garantindo latência inferior a 500 ms por consulta.
- Documentação técnica e transferência de conhecimento para a equipe de risco do banco, incluindo workshops práticos.

Tecnologias principais: AWS, Python, Snowflake, Machine Learning.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Fase 1 – Descoberta e preparação de dados: 6 semanas
- Fase 2 – Desenvolvimento e validação do modelo: 10 semanas
- Fase 3 – Implementação de MLOps e API: 6 semanas
- Fase 4 – Homologação e transferência de conhecimento: 4 semanas

## 5. Entregáveis

- Relatório de análise exploratória e engenharia de features com as principais variáveis preditoras.
- Modelo de risco de crédito treinado e validado, com métricas de AUC acima de 0,85 e KS acima de 40.
- Pipeline de MLOps implantado na AWS, com monitoramento de drift e retreinamento automatizado.
- API de scoring de crédito documentada e integrada ao ambiente de homologação do banco.
- Manual de operação e sessão de treinamento para 15 analistas de risco.

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de dados, 2 cientistas de dados e 1 engenheiro de MLOps..

## 7. Premissas e riscos

- Risco: Qualidade dos dados históricos insuficiente para treinamento robusto.
- Risco: Resistência da área de risco à adoção de modelo caixa-preta.
- Risco: Prazo curto para integração com sistemas legados do banco.

## 8. Investimento

Investimento total: R$ 2.540.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 34%.
