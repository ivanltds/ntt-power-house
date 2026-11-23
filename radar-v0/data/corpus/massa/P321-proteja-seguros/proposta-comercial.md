---
projeto_id: P321
cliente: Proteja Seguros
titulo: Predição de churn e retenção de segurados com ML na AWS
segmento: Seguros
tecnologias: ["AWS","Machine Learning"]
servicos: ["Analytics & BI","Data Science / ML","CRM"]
area: Data & Analytics
dono: Quésia Ramos
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P321
id: P321-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-10-27
prazo_meses: 7
valor: 530000
margem: 0.37
---

# Proposta Comercial — Predição de churn e retenção de segurados com ML na AWS

**Cliente:** Proteja Seguros
**Segmento:** Seguros
**Área responsável:** Data & Analytics · **Dono da proposta:** Quésia Ramos
**Data:** 2026-10-27 · **Versão:** final

## 1. Contexto e desafio

A Proteja Seguros enfrenta taxa de churn de 18% ao ano na carteira de seguros de vida individual, com perda estimada de R$ 42 milhões em prêmios anuais. A base de 1,2 milhão de segurados não tem modelo preditivo para identificar risco de cancelamento com antecedência.

## 2. Objetivo

Construir modelo de predição de churn em AWS com Machine Learning para antecipar cancelamentos em até 90 dias e direcionar ações de retenção via CRM.

## 3. Escopo da solução

- Modelagem preditiva de churn com Machine Learning em Amazon SageMaker, usando histórico de 36 meses de apólices e sinistros
- Pipeline de dados em AWS (S3, Glue, Redshift) para consolidar fontes de seguros, cobrança e atendimento
- Painel de Analytics & BI com indicadores de risco de churn por segmento, canal e produto
- Integração dos scores de propensão ao churn com o CRM para acionar jornadas de retenção
- Definição de políticas de retenção e testes A/B com ofertas personalizadas

Tecnologias principais: AWS, Machine Learning.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (6 semanas)
- Desenvolvimento do modelo de ML (10 semanas)
- Integração com CRM e BI (8 semanas)
- Piloto de retenção e ajustes (6 semanas)

## 5. Entregáveis

- Modelo de churn treinado e validado com AUC superior a 0,80
- Pipeline de dados automatizado em AWS
- Dashboard de risco de churn com visões por segmento e canal
- Integração dos scores com o CRM em produção
- Relatório de resultados e plano de evolução do modelo

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de dados, 1 cientista de dados sênior, 1 engenheiro de dados e 1 analista de CRM.

## 7. Premissas e riscos

- Risco: Qualidade e dispersão dos dados históricos de apólices
- Risco: Baixa adesão das áreas comerciais às ações de retenção
- Risco: Prazo apertado para integração com o CRM legado

## 8. Investimento

Investimento total: R$ 530.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 37%.
