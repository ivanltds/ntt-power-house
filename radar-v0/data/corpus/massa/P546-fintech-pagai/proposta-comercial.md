---
projeto_id: P546
cliente: Fintech Pagaí
titulo: Modelo de risco de crédito com Python e AWS para fintech de serviços financeiros
segmento: Serviços Financeiros
tecnologias: ["Python","AWS"]
servicos: ["Data Science / ML"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P546
id: P546-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-09-19
prazo_meses: 5
valor: 850000
margem: 0.26
---

# Proposta Comercial — Modelo de risco de crédito com Python e AWS para fintech de serviços financeiros

**Cliente:** Fintech Pagaí
**Segmento:** Serviços Financeiros
**Área responsável:** AI & Automation · **Dono da proposta:** Bruno Tavares
**Data:** 2025-09-19 · **Versão:** final

## 1. Contexto e desafio

A Fintech Pagaí, atuante em serviços financeiros, precisa elevar a assertividade da concessão de crédito em um cenário de 1,2 milhão de propostas de crédito avaliadas por ano e inadimplência de 7,8% na carteira de empréstimos pessoais. O modelo atual, baseado em regras manuais, leva até 36 horas para decisão e não incorpora dados transacionais recentes.

## 2. Objetivo

Desenvolver e implantar um modelo de risco de crédito em Python na AWS, com decisão automatizada em até 30 segundos, integrado ao processo de aprovação da fintech.

## 3. Escopo da solução

- Análise exploratória e engenharia de atributos sobre 24 meses de histórico de crédito e transações em Python
- Desenvolvimento e validação de modelos de machine learning (gradient boosting e regressão logística) em Python, com métricas de KS e AUC
- Implantação do modelo em produção na AWS (SageMaker e Lambda) com endpoint de scoring em tempo real
- Pipeline de monitoramento de performance e deriva do modelo na AWS (CloudWatch e S3)
- Documentação técnica e de governança do modelo, incluindo explicabilidade das variáveis mais relevantes

Tecnologias principais: Python, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (5 semanas)
- Modelagem e validação (7 semanas)
- Implantação em produção na AWS (6 semanas)
- Monitoramento e transferência de conhecimento (4 semanas)

## 5. Entregáveis

- Relatório de diagnóstico de dados e atributos candidatos
- Modelo de risco de crédito validado com KS mínimo de 0,42 e AUC de 0,78 em base de teste
- Endpoint de scoring em produção na AWS com latência média inferior a 30 segundos
- Dashboard de monitoramento de performance e deriva do modelo
- Documentação de governança e plano de retreinamento trimestral

## 6. Equipe proposta

1 cientista de dados sênior, 1 engenheiro de machine learning, 1 engenheiro de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e cobertura insuficiente dos dados históricos de crédito
- Risco: Restrições de latência na integração com o sistema de decisão legado
- Risco: Baixa adesão das áreas de crédito e compliance ao novo modelo

## 8. Investimento

Investimento total: R$ 850.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 26%.
