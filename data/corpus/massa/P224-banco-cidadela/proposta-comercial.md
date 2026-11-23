---
projeto_id: P224
cliente: Banco Cidadela
titulo: Programa de FinOps e Otimização de Custos em Kubernetes na AWS
segmento: Serviços Financeiros
tecnologias: ["Kubernetes","Power BI","AWS"]
servicos: ["Analytics & BI","Migração para Nuvem"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P224
id: P224-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-09-09
prazo_meses: 4
valor: 2440000
margem: 0.28
---

# Proposta Comercial — Programa de FinOps e Otimização de Custos em Kubernetes na AWS

**Cliente:** Banco Cidadela
**Segmento:** Serviços Financeiros
**Área responsável:** Cloud & Infra · **Dono da proposta:** Igor Peixoto
**Data:** 2025-09-09 · **Versão:** final

## 1. Contexto e desafio

O Banco Cidadela opera 42 clusters Kubernetes na AWS e registrou crescimento de 38% no gasto de nuvem nos últimos 12 meses, chegando a R$ 6,2 milhões/ano sem visibilidade por squad. Cerca de 27% dos recursos de computação estão superdimensionados e não há rateio de custos por produto, o que dificulta decisões de investimento.

## 3. Escopo da solução

- Diagnóstico de custos e tagging dos 42 clusters Kubernetes na AWS, com mapa de alocação por squad e produto
- Redesenho de requests/limits, HPA e rightsizing de nodes, com meta de redução de 20% em instâncias EC2/EKS
- Implementação de dashboards de FinOps no Power BI com KPIs de custo unitário, budget vs. realizado e desvios
- Definição de políticas de governança de custos na AWS (budgets, alertas e guardrails em contas de workload)
- Plano de migração de workloads ociosos para instâncias Spot e Savings Plans, com análise de risco de disponibilidade

Tecnologias principais: Kubernetes, Power BI, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Diagnóstico e baseline de custos (4 semanas)
- Desenho de governança e dashboards Power BI (4 semanas)
- Otimização piloto em 15 clusters Kubernetes (6 semanas)
- Escala, medição de economia e transferência de conhecimento (2 semanas)

## 5. Entregáveis

- Relatório de diagnóstico de custos com baseline dos R$ 6,2 milhões/ano e oportunidades priorizadas por impacto
- Painéis Power BI de FinOps publicados para 12 squads, com atualização diária
- Catálogo de políticas de governança de custos AWS aprovado pelo comitê de tecnologia
- Plano de rightsizing e autoscaling aplicado a 15 clusters piloto, com evidência de economia
- Relatório final com economia realizada, roadmap de otimização contínua e modelo operacional de FinOps

## 6. Equipe proposta

1 arquiteto de soluções cloud, 2 engenheiros DevOps/Kubernetes, 1 analista de FinOps e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Resistência das squads à mudança de requests/limits e autoscaling
- Risco: Dados de custo e tagging incompletos na AWS comprometem o rateio
- Risco: Janelas de change congeladas no fechamento contábil atrasam otimizações

## 8. Investimento

Investimento total: R$ 2.440.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 28%.
