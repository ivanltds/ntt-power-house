---
projeto_id: P566
cliente: Banco Atlântida Digital
titulo: Predição de Churn e Retenção com Machine Learning para Banco Digital
segmento: Serviços Financeiros
tecnologias: ["Machine Learning","AWS","Python"]
servicos: ["Analytics & BI"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: confidencial
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P566
id: P566-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-05-02
prazo_meses: 5
valor: 630000
margem: 0.25
---

# Proposta Comercial — Predição de Churn e Retenção com Machine Learning para Banco Digital

**Cliente:** Banco Atlântida Digital
**Segmento:** Serviços Financeiros
**Área responsável:** Data & Analytics · **Dono da proposta:** Ana Beatriz Lopes
**Data:** 2026-05-02 · **Versão:** final

## 1. Contexto e desafio

O Banco Atlântida Digital, com 2,3 milhões de clientes ativos e crescimento de 18% ao ano, enfrenta taxa de churn de 9,4% ao ano na base de varejo, o que representa cerca de 216 mil clientes perdidos e R$ 48 milhões em receita anual. A área de marketing não consegue priorizar ações de retenção por falta de modelos preditivos confiáveis, atuando de forma reativa e com campanhas genéricas de baixa conversão (2,1%).

## 2. Objetivo

Construir modelo de predição de churn em Machine Learning na AWS para identificar clientes com propensão de evasão nos próximos 90 dias, elevando a conversão das ações de retenção para 8% e reduzindo o churn em 1,5 ponto percentual em 12 meses.

## 3. Escopo da solução

- Análise exploratória e engenharia de features sobre 24 meses de histórico transacional e cadastral em Python
- Desenvolvimento e treinamento de modelos de classificação (gradient boosting e regressão logística) em Python
- Implantação do pipeline de scoring em AWS (SageMaker, S3 e Lambda) com execução semanal
- Dashboard de Analytics & BI para priorização de clientes por probabilidade de churn e valor de vida
- Documentação de governança de modelos e transferência de conhecimento para o time de dados do cliente

Tecnologias principais: Machine Learning, AWS, Python.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (5 semanas)
- Desenvolvimento e validação de modelos (7 semanas)
- Implantação em AWS e dashboard (6 semanas)
- Capacitação e transferência de conhecimento (4 semanas)

## 5. Entregáveis

- Relatório de diagnóstico de dados e dicionário de features com 45 variáveis
- Modelo de churn treinado e validado com AUC mínima de 0,82 e relatório de métricas
- Pipeline de scoring automatizado em AWS com execução semanal
- Dashboard de retenção com segmentação por propensão e valor do cliente
- Workshop de capacitação de 16 horas para 8 analistas do cliente

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de dados, 2 cientistas de dados e 1 analista de BI.

## 7. Premissas e riscos

- Risco: Qualidade e completude dos dados históricos de transações
- Risco: Baixa adoção das recomendações do modelo pelas equipes de retenção
- Risco: Restrições de privacidade e LGPD no uso de dados de clientes

## 8. Investimento

Investimento total: R$ 630.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 25%.
