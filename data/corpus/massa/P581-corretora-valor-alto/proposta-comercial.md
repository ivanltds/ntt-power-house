---
projeto_id: P581
cliente: Corretora Valor Alto
titulo: Modelo de risco de crédito com Snowflake e AWS para corretora
segmento: Serviços Financeiros
tecnologias: ["Snowflake","AWS"]
servicos: ["Data Science / ML"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: interna
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P581
id: P581-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-10-30
prazo_meses: 8
valor: 2280000
margem: 0.18
---

# Proposta Comercial — Modelo de risco de crédito com Snowflake e AWS para corretora

**Cliente:** Corretora Valor Alto
**Segmento:** Serviços Financeiros
**Área responsável:** AI & Automation · **Dono da proposta:** Bruno Tavares
**Data:** 2026-10-30 · **Versão:** final

## 1. Contexto e desafio

A Corretora Valor Alto analisa cerca de 12 mil propostas de crédito por mês de forma majoritariamente manual, com prazo médio de 48 horas e taxa de inadimplência de 7,3% na carteira de crédito estruturado. A ausência de um modelo analítico padronizado limita a expansão para novos produtos e gera perdas estimadas em R$ 4,2 milhões anuais.

## 2. Objetivo

Desenvolver e colocar em produção um modelo de risco de crédito em Snowflake e AWS que reduza o prazo de decisão para até 4 horas e eleve a precisão na identificação de tomadores de alto risco.

## 3. Escopo da solução

- Ingestão e modelagem dos dados históricos de crédito em Snowflake, com camadas raw, trusted e refined
- Engenharia de atributos e treinamento de modelos de scoring de crédito em AWS SageMaker
- Pipeline de MLOps para versionamento, monitoramento de drift e reprocessamento mensal dos modelos
- Integração do scoring em API na AWS consumida pelo sistema de análise de propostas da corretora
- Painel de acompanhamento de performance do modelo e indicadores de inadimplência em Snowflake

Tecnologias principais: Snowflake, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (6 semanas)
- Desenvolvimento e validação do modelo (12 semanas)
- Industrialização e MLOps (10 semanas)
- Integração, testes e go-live (6 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e ML em Snowflake e AWS
- Modelo de risco de crédito validado com métricas de AUC e KS documentadas
- Pipeline de MLOps operacional com monitoramento de drift
- API de scoring integrada ao fluxo de análise de propostas
- Painel de indicadores de performance do modelo e da carteira

## 6. Equipe proposta

1 arquiteto de dados, 2 cientistas de dados, 1 engenheiro de MLOps e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e completude dos dados históricos de crédito
- Risco: Baixa adoção do scoring pelas áreas de análise da corretora
- Risco: Mudança de regras regulatórias durante o projeto

## 8. Investimento

Investimento total: R$ 2.280.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 18%.
