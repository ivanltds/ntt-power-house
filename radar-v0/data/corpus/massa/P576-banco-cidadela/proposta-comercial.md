---
projeto_id: P576
cliente: Banco Cidadela
titulo: Programa de FinOps e Otimização de Custos Multicloud para Banco Cidadela
segmento: Serviços Financeiros
tecnologias: ["GCP","Kubernetes","Azure"]
servicos: ["Analytics & BI","Migração para Nuvem","Change Management"]
area: Cloud & Infra
dono: Carla Menezes
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P576
id: P576-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2024-07-24
prazo_meses: 4
valor: 5150000
margem: 0.33
---

# Proposta Comercial — Programa de FinOps e Otimização de Custos Multicloud para Banco Cidadela

**Cliente:** Banco Cidadela
**Segmento:** Serviços Financeiros
**Área responsável:** Cloud & Infra · **Dono da proposta:** Carla Menezes
**Data:** 2024-07-24 · **Versão:** final

## 1. Contexto e desafio

O Banco Cidadela opera cargas críticas em GCP, Azure e clusters Kubernetes, com gasto mensal de nuvem de aproximadamente R$ 4,8 milhões e crescimento de 27% nos últimos 12 meses. Cerca de 38% dos ambientes de não produção ficam ligados 24x7 e não há visibilidade consolidada de custos por squad, o que dificulta decisões de otimização.

## 2. Objetivo

Implantar uma disciplina de FinOps com visibilidade unificada de custos multicloud e reduzir o gasto mensal de nuvem em 18% em 4 meses, sem afetar os SLAs das cargas críticas.

## 3. Escopo da solução

- Implantação de dashboards de Analytics & BI para custos por squad, produto e centro de custo, consolidando GCP e Azure
- Análise e rightsizing de clusters Kubernetes (GKE e AKS), incluindo políticas de desligamento de ambientes de não produção
- Avaliação de migração para Nuvem de cargas on-premises remanescentes para instâncias e serviços gerenciados mais econômicos
- Definição de guardrails de custo, budgets e alertas automatizados por projeto e por tag de responsabilidade
- Programa de Change Management com treinamento de 120 usuários e rituais mensais de revisão de custos com as squads

Tecnologias principais: GCP, Kubernetes, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Diagnóstico e visibilidade de custos (4 semanas)
- Otimização de Kubernetes e rightsizing (5 semanas)
- Guardrails, migração e automação (5 semanas)
- Change Management e sustentação (2 semanas)

## 5. Entregáveis

- Mapa de custos unificado de GCP e Azure com dashboards de Analytics & BI publicados
- Relatório de rightsizing com plano de ação para 100% dos clusters Kubernetes mapeados
- Catálogo de guardrails de custo e políticas de tagging implantado
- Plano de migração para Nuvem priorizado por retorno financeiro e risco
- Programa de capacitação em FinOps concluído com material e indicadores de adoção

## 6. Equipe proposta

1 arquiteto de cloud, 2 engenheiros de plataforma Kubernetes, 1 analista de FinOps, 1 especialista em change management e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Resistência das squads à mudança de práticas de provisionamento
- Risco: Dependência de dados de billing incompletos ou mal tagueados
- Risco: Impacto em SLAs durante o desligamento de ambientes de não produção

## 8. Investimento

Investimento total: R$ 5.150.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 33%.
