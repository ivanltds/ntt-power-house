---
projeto_id: P129
cliente: Banco Ponte Firme
titulo: Detecção de Fraude em Tempo Real com Machine Learning e Kafka
segmento: Serviços Financeiros
tecnologias: ["Machine Learning","Kafka","Python","Azure"]
servicos: ["Data Science / ML"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P129
id: P129-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-08-16
prazo_meses: 4
valor: 1120000
margem: 0.28
---

# Proposta Comercial — Detecção de Fraude em Tempo Real com Machine Learning e Kafka

**Cliente:** Banco Ponte Firme
**Segmento:** Serviços Financeiros
**Área responsável:** AI & Automation · **Dono da proposta:** Bruno Tavares
**Data:** 2026-08-16 · **Versão:** final

## 1. Contexto e desafio

O Banco Ponte Firme processa 2,5 milhões de transações diárias e sofre com fraudes que representam 0,8% do volume, gerando perdas anuais de R$ 45 milhões. O atual sistema de regras fixas detecta apenas 60% dos casos, com alto índice de falsos positivos (35%), sobrecarregando a equipe de análise manual.

## 2. Objetivo

Implantar um modelo de machine learning em tempo real para detecção de fraude, integrado via Kafka e Azure, visando reduzir perdas em 30% e diminuir falsos positivos para menos de 15% em 4 meses.

## 3. Escopo da solução

- Desenvolvimento de modelos de ML (Python, scikit-learn, XGBoost) para classificação de transações fraudulentas
- Integração do modelo com stream de transações via Apache Kafka para inferência em tempo real
- Deploy e orquestração do modelo em Azure Machine Learning com monitoramento contínuo
- Criação de pipeline de features e retreinamento automatizado com dados históricos
- Dashboard de acompanhamento de métricas de fraude e performance do modelo

Tecnologias principais: Machine Learning, Kafka, Python, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Discovery e preparação de dados (4 semanas)
- Desenvolvimento e validação do modelo (6 semanas)
- Integração e deploy em produção (4 semanas)
- Monitoramento e ajustes finais (2 semanas)

## 5. Entregáveis

- Modelo de ML treinado e validado com AUC-ROC superior a 0,95
- API de scoring em tempo real integrada ao Kafka
- Pipeline de MLOps para retreinamento semanal automático
- Documentação técnica e manual de operação
- Relatório de resultados com comparação baseline vs. modelo implantado

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de dados, 2 cientistas de dados e 1 engenheiro de ML.

## 7. Premissas e riscos

- Risco: Qualidade dos dados históricos insuficiente para treinamento
- Risco: Latência na integração Kafka-Azure impactando tempo real
- Risco: Resistência da equipe de negócio à adoção do modelo

## 8. Investimento

Investimento total: R$ 1.120.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 28%.
