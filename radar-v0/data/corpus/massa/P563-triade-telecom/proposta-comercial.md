---
projeto_id: P563
cliente: Tríade Telecom
titulo: FinOps e otimização de custos multicloud para operadora de telecom
segmento: Telecom
tecnologias: ["Kubernetes","AWS","Power BI","Azure"]
servicos: ["Migração para Nuvem","Change Management"]
area: Cloud & Infra
dono: Flávia Guimarães
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P563
id: P563-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-02-18
prazo_meses: 3
valor: 620000
margem: 0.25
---

# Proposta Comercial — FinOps e otimização de custos multicloud para operadora de telecom

**Cliente:** Tríade Telecom
**Segmento:** Telecom
**Área responsável:** Cloud & Infra · **Dono da proposta:** Flávia Guimarães
**Data:** 2025-02-18 · **Versão:** final

## 1. Contexto e desafio

A Tríade Telecom opera 38 clusters Kubernetes distribuídos entre AWS e Azure, com gasto mensal de nuvem de R$ 4,2 milhões e variação de até 22% entre meses, sem visibilidade por produto ou centro de custo. Cerca de 31% das instâncias não têm owner definido e o time financeiro recebe a fatura sem conseguir atribuí-la às squads.

## 2. Objetivo

Reduzir em 18% o custo mensal de nuvem em 3 meses, implantando governança FinOps com visibilidade por squad e rightsizing contínuo das cargas em Kubernetes.

## 3. Escopo da solução

- Assessment de custos AWS e Azure com taggeamento e alocação por centro de custo
- Rightsizing e ajuste de requests/limits dos clusters Kubernetes
- Dashboards de FinOps em Power BI com custo por produto, squad e tendência mensal
- Definição de guardrails de orçamento e alertas de anomalia nas duas nuvens
- Plano de Change Management com squads de engenharia e financeiro para cultura de custo

Tecnologias principais: Kubernetes, AWS, Power BI, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 3 meses, nas seguintes fases:

- Diagnóstico e baseline de custos (4 semanas)
- Governança, tags e dashboards Power BI (4 semanas)
- Otimização de Kubernetes e AWS/Azure (4 semanas)

## 5. Entregáveis

- Relatório de baseline de custos com mapa de 38 clusters e instâncias sem owner
- Catálogo de tags e política de alocação de custos publicada
- Painéis Power BI de custo por squad, produto e forecast mensal
- Backlog priorizado de 25 a 40 ações de otimização com economia estimada
- Plano de comunicação e treinamento FinOps para 6 squads

## 6. Equipe proposta

1 arquiteto de cloud, 1 especialista FinOps, 1 engenheiro Kubernetes, 1 analista de dados Power BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Resistência das squads à mudança de alocação de custos
- Risco: Dados de billing incompletos ou inconsistentes entre AWS e Azure
- Risco: Janela curta de 3 meses para maturar a cultura FinOps

## 8. Investimento

Investimento total: R$ 620.000, em parcelas mensais ao longo de 3 meses.

Margem praticada: 25%.
