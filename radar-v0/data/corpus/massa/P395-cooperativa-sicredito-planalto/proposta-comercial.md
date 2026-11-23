---
projeto_id: P395
cliente: Cooperativa Sicrédito Planalto
titulo: Detecção de Fraude com Machine Learning para Cooperativa de Crédito
segmento: Serviços Financeiros
tecnologias: ["Machine Learning","Python","Azure"]
servicos: ["Engenharia de Dados","Data Science / ML"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: confidencial
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P395
id: P395-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-08-09
prazo_meses: 6
valor: 790000
margem: 0.2
---

# Proposta Comercial — Detecção de Fraude com Machine Learning para Cooperativa de Crédito

**Cliente:** Cooperativa Sicrédito Planalto
**Segmento:** Serviços Financeiros
**Área responsável:** AI & Automation · **Dono da proposta:** Bruno Tavares
**Data:** 2025-08-09 · **Versão:** final

## 1. Contexto e desafio

A Cooperativa Sicrédito Planalto, com 45 mil cooperados e R$ 1,2 bilhão em ativos, enfrenta um aumento de 18% nas tentativas de fraude em transações de crédito e PIX nos últimos 12 meses, resultando em perdas estimadas em R$ 3,5 milhões. O processo atual de análise é manual e reativo, com tempo médio de detecção de 48 horas, comprometendo a segurança e a experiência dos cooperados.

## 2. Objetivo

Implementar um modelo de detecção de fraude em tempo real utilizando Machine Learning e Python na plataforma Azure, reduzindo o tempo de detecção para menos de 5 minutos e diminuindo as perdas financeiras em 40%.

## 3. Escopo da solução

- Análise exploratória e engenharia de features em bases históricas de transações (últimos 24 meses) usando Python e Azure Data Lake.
- Desenvolvimento de modelos de classificação (gradient boosting e redes neurais) para detecção de anomalias em transações de crédito e PIX.
- Construção de pipeline de dados em Azure Data Factory e Azure Databricks para ingestão e processamento em tempo real.
- Integração do modelo em ambiente de produção via API REST em Azure Kubernetes Service, com monitoramento contínuo de performance.
- Documentação técnica e treinamento da equipe de risco do cliente para operação do sistema.

Tecnologias principais: Machine Learning, Python, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Fase 1 - Descoberta e preparação de dados: 6 semanas
- Fase 2 - Desenvolvimento e validação de modelos: 10 semanas
- Fase 3 - Implantação e integração: 6 semanas
- Fase 4 - Treinamento e go-live: 2 semanas

## 5. Entregáveis

- Relatório de diagnóstico de dados e features relevantes para detecção de fraude.
- Modelo de Machine Learning treinado e validado com métricas de AUC > 0,90 e precisão > 85%.
- Pipeline de dados automatizado para ingestão e processamento em tempo real.
- API de scoring de fraude integrada ao sistema de transações da cooperativa.
- Manual de operação e sessão de treinamento para 10 analistas de risco.

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 gerente de projeto..

## 7. Premissas e riscos

- Risco: Qualidade e disponibilidade dos dados históricos de transações.
- Risco: Resistência da equipe de risco em adotar o modelo automatizado.
- Risco: Complexidade de integração com sistemas legados da cooperativa.

## 8. Investimento

Investimento total: R$ 790.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 20%.
