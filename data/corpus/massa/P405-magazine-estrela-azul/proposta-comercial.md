---
projeto_id: P405
cliente: Magazine Estrela Azul
titulo: FinOps e otimização de custos multicloud para operação de varejo
segmento: Varejo
tecnologias: ["AWS","Kubernetes","Azure","Power BI"]
servicos: ["Migração para Nuvem","Analytics & BI"]
area: Cloud & Infra
dono: Débora Castilho
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P405
id: P405-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2024-05-29
prazo_meses: 3
valor: 630000
margem: 0.31
---

# Proposta Comercial — FinOps e otimização de custos multicloud para operação de varejo

**Cliente:** Magazine Estrela Azul
**Segmento:** Varejo
**Área responsável:** Cloud & Infra · **Dono da proposta:** Débora Castilho
**Data:** 2024-05-29 · **Versão:** final

## 1. Contexto e desafio

O Magazine Estrela Azul opera 42 lojas físicas e um e-commerce que representa 38% da receita, com ambientes em AWS e Azure crescendo 27% ao ano em custo sem visibilidade por produto ou squad. A ausência de governança de FinOps impede identificar desperdícios estimados em R$ 1,8 milhão anuais em recursos ociosos e clusters Kubernetes superdimensionados.

## 2. Objetivo

Implantar uma disciplina de FinOps com visibilidade, alocação e otimização contínua dos custos de nuvem, reduzindo o gasto mensal em 22% em 3 meses sem afetar a performance das aplicações de varejo.

## 3. Escopo da solução

- Diagnóstico de custos e tagging em AWS e Azure, com mapa de alocação por produto, loja e squad
- Redimensionamento de clusters Kubernetes (EKS e AKS) e políticas de rightsizing e desligamento de ambientes ociosos
- Definição de guardrails de orçamento, alertas e chargeback por área de negócio
- Dashboard de FinOps em Power BI com custo unitário por pedido, por loja e por transação
- Plano de otimização com reservas, savings plans e recomendações priorizadas por impacto

Tecnologias principais: AWS, Kubernetes, Azure, Power BI.

## 4. Abordagem e cronograma

O projeto será executado em 3 meses, nas seguintes fases:

- Diagnóstico e baseline de custos (4 semanas)
- Tagging, alocação e guardrails (4 semanas)
- Otimização de Kubernetes e recursos ociosos (3 semanas)
- Dashboard Power BI e handover do playbook (1 semanas)

## 5. Entregáveis

- Relatório de diagnóstico com baseline de custos e 30 recomendações priorizadas
- Modelo de tagging e dicionário de alocação de custos implantado em AWS e Azure
- Dashboard de FinOps em Power BI publicado para 6 áreas consumidoras
- Playbook de FinOps com rituais mensais, papéis e guardrails de orçamento
- Relatório final com economia realizada e plano de continuidade de 12 meses

## 6. Equipe proposta

1 arquiteto de cloud, 1 especialista FinOps, 2 engenheiros de cloud (AWS e Azure) e 1 analista de BI.

## 7. Premissas e riscos

- Risco: Resistência das squads de produto à mudança de alocação de custos
- Risco: Dados de billing incompletos ou inconsistentes entre AWS e Azure
- Risco: Janelas de otimização conflitantes com picos de varejo (Black Friday)

## 8. Investimento

Investimento total: R$ 630.000, em parcelas mensais ao longo de 3 meses.

Margem praticada: 31%.
