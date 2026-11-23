---
projeto_id: P462
cliente: NetVale Provedor
titulo: Modernização de aplicações legadas com containers em Kubernetes na nuvem híbrida
segmento: Telecom
tecnologias: ["Azure","AWS","Kubernetes"]
servicos: ["Sustentação / AMS","Migração para Nuvem"]
area: Cloud & Infra
dono: Isabela Freitas
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P462
id: P462-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-04-18
prazo_meses: 9
valor: 600000
margem: 0.28
---

# Proposta Comercial — Modernização de aplicações legadas com containers em Kubernetes na nuvem híbrida

**Cliente:** NetVale Provedor
**Segmento:** Telecom
**Área responsável:** Cloud & Infra · **Dono da proposta:** Isabela Freitas
**Data:** 2025-04-18 · **Versão:** final

## 1. Contexto e desafio

A NetVale Provedor opera 38 aplicações de atendimento e billing em VMs legadas, com 22 delas fora de suporte e janelas de manutenção de até 6 horas por release. A base de 1,4 milhão de assinantes exige escalabilidade em picos de 3x no tráfego, e o custo de infraestrutura cresceu 27% em 12 meses sem ganho proporcional de disponibilidade.

## 2. Objetivo

Modernizar o portfólio de aplicações críticas para containers orquestrados em Kubernetes, com migração para Azure e AWS, reduzindo o tempo de release e o custo de infraestrutura.

## 3. Escopo da solução

- Avaliação e priorização de 38 aplicações, com definição do padrão de containers e imagens Docker para 22 aplicações fora de suporte
- Provisionamento de clusters Kubernetes gerenciados em Azure (AKS) e AWS (EKS), com malha de serviço, observabilidade e política de auto-scaling
- Migração de 12 aplicações prioritárias para containers, incluindo refatoração de configuração, secrets e pipelines CI/CD
- Implementação de sustentação / AMS com SLA de 99,9%, runbooks e plantão 24x7 para o ambiente containerizado
- Plano de cutover e rollback por onda, com testes de carga simulando picos de 3x a base atual de assinantes

Tecnologias principais: Azure, AWS, Kubernetes.

## 4. Abordagem e cronograma

O projeto será executado em 9 meses, nas seguintes fases:

- Diagnóstico e arquitetura de referência (8 semanas)
- Provisionamento dos clusters e pipelines (10 semanas)
- Migração por ondas e testes de carga (14 semanas)
- Estabilização e transição para sustentação / AMS (8 semanas)

## 5. Entregáveis

- Inventário técnico das 38 aplicações com matriz de priorização e roadmap de ondas
- Arquitetura de referência multi-cloud com clusters Kubernetes em Azure e AWS documentada
- 12 aplicações migradas e em produção em containers, com pipelines CI/CD ativos
- Catálogo de serviços de sustentação / AMS com SLA 99,9%, indicadores e runbooks operacionais
- Relatório de testes de carga e plano de cutover/rollback validado por onda

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de cloud, 3 engenheiros de plataforma Kubernetes e 2 engenheiros de aplicação.

## 7. Premissas e riscos

- Risco: Dependências entre aplicações legadas atrasam a migração por ondas
- Risco: Janelas de manutenção restritas em horário de pico de assinantes
- Risco: Curva de aprendizado interna em Kubernetes reduz a adoção do modelo AMS

## 8. Investimento

Investimento total: R$ 600.000, em parcelas mensais ao longo de 9 meses.

Margem praticada: 28%.
