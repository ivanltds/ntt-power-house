---
projeto_id: P428
cliente: Moda Leve Store
titulo: FinOps e Otimização de Custos Multicloud para Varejo
segmento: Varejo
tecnologias: ["AWS","Azure","GCP","Kubernetes"]
servicos: ["Analytics & BI","Migração para Nuvem","Change Management"]
area: Cloud & Infra
dono: Débora Castilho
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P428
id: P428-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2024-08-20
prazo_meses: 3
valor: 600000
margem: 0.2
---

# Proposta Comercial — FinOps e Otimização de Custos Multicloud para Varejo

**Cliente:** Moda Leve Store
**Segmento:** Varejo
**Área responsável:** Cloud & Infra · **Dono da proposta:** Débora Castilho
**Data:** 2024-08-20 · **Versão:** final

## 1. Contexto e desafio

A Moda Leve Store opera com 320 lojas físicas e um e-commerce que representa 28% da receita, mas enfrenta custos de nuvem crescentes: AWS, Azure e GCP somam R$ 1,2 milhão/mês, com 35% de desperdício identificado em clusters Kubernetes superprovisionados e recursos ociosos. A falta de visibilidade por unidade de negócio impede decisões de otimização e ameaça a margem operacional de 8%.

## 3. Escopo da solução

- Assessment de custos nas contas AWS, Azure e GCP com ferramentas nativas e AWS Cost Explorer, Azure Cost Management e GCP Billing
- Otimização de clusters Kubernetes (EKS, AKS e GKE) com rightsizing, HPA e políticas de desligamento programado
- Implementação de dashboards de FinOps e chargeback por unidade de negócio usando Analytics & BI
- Migração de cargas legadas para instâncias spot e reservadas nos três provedores
- Capacitação em Change Management para times de TI e negócio sobre cultura de custos

Tecnologias principais: AWS, Azure, GCP, Kubernetes.

## 4. Abordagem e cronograma

O projeto será executado em 3 meses, nas seguintes fases:

- Fase 1 – Diagnóstico e visibilidade: 4 semanas
- Fase 2 – Otimização de Kubernetes e migração para spot/reservado: 5 semanas
- Fase 3 – Dashboards de FinOps e chargeback: 3 semanas
- Fase 4 – Change management e encerramento: 1 semana

## 5. Entregáveis

- Relatório de diagnóstico com mapa de custos por serviço, conta e tag, e identificação de 35% de desperdício
- Plano de otimização com 20 ações priorizadas por impacto financeiro e esforço
- Dashboards de FinOps em Power BI com visão mensal de custos por loja e por canal
- Clusters Kubernetes reconfigurados com redução de 25% no custo computacional
- Playbook de governança de custos e treinamento de 40 pessoas em Change Management

## 6. Equipe proposta

1 arquiteto de nuvem sênior, 2 engenheiros DevOps, 1 analista de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Resistência dos times de produto à mudança de instâncias e desligamento de recursos
- Risco: Janela de otimização coincidir com pico de vendas (Black Friday)
- Risco: Dependência de aprovação financeira para reservas de longo prazo

## 8. Investimento

Investimento total: R$ 600.000, em parcelas mensais ao longo de 3 meses.

Margem praticada: 20%.
