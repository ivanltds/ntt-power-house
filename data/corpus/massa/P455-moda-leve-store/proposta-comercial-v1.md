---
projeto_id: P455
cliente: Moda Leve Store
titulo: FinOps e otimização de custos multicloud para varejo omnicanal
segmento: Varejo
tecnologias: ["Kubernetes","Azure","AWS","GCP"]
servicos: ["Migração para Nuvem"]
area: Cloud & Infra
dono: Débora Castilho
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P455
id: P455-PROPV1
tipo_documental: proposta_comercial
status_documento: rascunho
data: 2025-04-02
prazo_meses: 4
valor: 250000
margem: 0.22
---

# Proposta Comercial — FinOps e otimização de custos multicloud para varejo omnicanal (versão 1, rascunho)

**Cliente:** Moda Leve Store
**Segmento:** Varejo
**Área responsável:** Cloud & Infra · **Dono da proposta:** Débora Castilho
**Data:** 2025-04-02 · **Versão:** 1 (rascunho)

## 1. Contexto e desafio

A Moda Leve Store opera 140 lojas físicas e um e-commerce que representa 38% da receita, com ambientes em Kubernetes distribuídos entre Azure, AWS e GCP após uma migração recente. O gasto mensal de nuvem cresceu 27% em seis meses, chegando a R$ 1,8 milhão, sem visibilidade por centro de custo nem governança de tags.

## 2. Objetivo

Reduzir em até 22% o custo mensal de nuvem em 2 meses, implantando práticas de FinOps e otimização de workloads Kubernetes nas três nuvens.

## 3. Escopo da solução

- Diagnóstico de custos e inventário de workloads Kubernetes em Azure (AKS), AWS (EKS) e GCP (GKE)
- Implementação de tagging e alocação de custos por loja, canal e squad
- Rightsizing de clusters, ajuste de requests/limits e políticas de HPA e cluster autoscaler
- Configuração de reservas e savings plans no Azure e AWS, com análise de compromissos no GCP
- Dashboard de FinOps com alertas de anomalia e relatório mensal de economia realizada

Tecnologias principais: Kubernetes, Azure, AWS, GCP.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Diagnóstico e baseline de custos (3 semanas)
- Plano de otimização e governança de tags (2 semanas)
- Execução de otimizações em Kubernetes e compromissos de nuvem (3 semanas)

## 5. Entregáveis

- Relatório de baseline de custos com 12 meses de histórico e mapa de desperdícios
- Plano de otimização priorizado com economia estimada por iniciativa
- Política de governança de tags e centros de custo publicada
- Clusters Kubernetes otimizados nas três nuvens com ganho medido
- Dashboard de FinOps e rotina mensal de revisão com o time financeiro

## 6. Equipe proposta

1 arquiteto de cloud, 2 engenheiros de plataforma Kubernetes, 1 analista de FinOps e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Resistência das squads de produto a alterações em limites de recursos
- Risco: Dados de billing incompletos ou sem tags confiáveis
- Risco: Janela curta de 2 meses para medir economia realizada

## 8. Investimento

Investimento total: R$ 250.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 22%.
