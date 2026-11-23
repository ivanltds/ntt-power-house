---
projeto_id: P499
cliente: Ondas Móvel
titulo: Modernização de aplicações legadas com containers em Kubernetes na Ondas Móvel
segmento: Telecom
tecnologias: ["Kubernetes","AWS","GCP"]
servicos: ["Migração para Nuvem"]
area: Cloud & Infra
dono: Isabela Freitas
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P499
id: P499-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2024-07-23
prazo_meses: 12
valor: 3190000
margem: 0.26
---

# Proposta Comercial — Modernização de aplicações legadas com containers em Kubernetes na Ondas Móvel

**Cliente:** Ondas Móvel
**Segmento:** Telecom
**Área responsável:** Cloud & Infra · **Dono da proposta:** Isabela Freitas
**Data:** 2024-07-23 · **Versão:** final

## 1. Contexto e desafio

A Ondas Móvel operava cerca de 140 aplicações de billing, atendimento e provisão em servidores virtuais monolíticos, com janelas de deploy de até 6 horas e indisponibilidade média de 4,2 horas por mês. O custo de infraestrutura crescia 18% ao ano e a baixa elasticidade limitava o lançamento de novas ofertas para 12 milhões de linhas ativas.

## 3. Escopo da solução

- Avaliação e priorização de 140 aplicações, com containerização das 60 de maior criticidade em imagens Docker e manifests Kubernetes.
- Provisionamento de clusters Kubernetes gerenciados (EKS na AWS e GKE no GCP) com malha de serviços, políticas de autoescalonamento e observabilidade centralizada.
- Implantação de pipeline CI/CD com deploy blue-green e canário para as aplicações migradas, integrado ao repositório corporativo.
- Migração de bancos e filas associados para serviços gerenciados na AWS e no GCP, com plano de cutover por ondas e rollback testado.
- Definição de guardrails de segurança, gestão de custos por namespace e runbooks de operação para o time de plataforma do cliente.

Tecnologias principais: Kubernetes, AWS, GCP.

## 4. Abordagem e cronograma

O projeto será executado em 12 meses, nas seguintes fases:

- Diagnóstico e desenho da plataforma (10 semanas)
- Piloto com 8 aplicações e pipeline CI/CD (12 semanas)
- Migração em ondas das 52 aplicações restantes (22 semanas)
- Estabilização, otimização de custos e transferência de conhecimento (8 semanas)

## 5. Entregáveis

- Catálogo das 140 aplicações com matriz de priorização e plano de ondas de migração.
- 60 aplicações containerizadas em produção nos clusters Kubernetes da AWS e do GCP.
- Pipeline CI/CD padronizado com deploy automatizado e testes de fumaça por release.
- Dashboards de observabilidade e relatórios de custo por aplicação e por namespace.
- Runbooks operacionais e treinamento de 35 profissionais do cliente em Kubernetes e práticas DevOps.

## 6. Equipe proposta

1 arquiteto de soluções cloud, 1 especialista em Kubernetes, 4 engenheiros DevOps, 2 engenheiros de aplicação e 1 gerente de projeto..

## 7. Premissas e riscos

- Risco: Dependências legadas sem suporte a containers atrasam ondas de migração.
- Risco: Janelas de cutover conflitam com picos de tráfego de billing e recarga.
- Risco: Custos de nuvem acima do previsto por falta de governança de namespaces.

## 8. Investimento

Investimento total: R$ 3.190.000, em parcelas mensais ao longo de 12 meses.

Margem praticada: 26%.
