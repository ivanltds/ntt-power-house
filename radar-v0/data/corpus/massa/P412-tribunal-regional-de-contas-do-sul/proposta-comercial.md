---
projeto_id: P412
cliente: Tribunal Regional de Contas do Sul
titulo: Modernização de aplicações legadas com containers e integração via Kafka
segmento: Setor Público
tecnologias: ["Kafka","AWS","Kubernetes","Azure"]
servicos: ["Sustentação / AMS","Migração para Nuvem"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P412
id: P412-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-08-02
prazo_meses: 6
valor: 5140000
margem: 0.2
---

# Proposta Comercial — Modernização de aplicações legadas com containers e integração via Kafka

**Cliente:** Tribunal Regional de Contas do Sul
**Segmento:** Setor Público
**Área responsável:** Cloud & Infra · **Dono da proposta:** Igor Peixoto
**Data:** 2025-08-02 · **Versão:** final

## 1. Contexto e desafio

O Tribunal Regional de Contas do Sul opera 35 aplicações legadas em datacenter próprio, com janelas de manutenção de 8 horas e custo anual de R$ 12 milhões em infraestrutura. A integração entre sistemas é feita por arquivos batch noturnos, gerando atrasos de até 12 horas na consolidação de dados para auditoria.

## 2. Objetivo

Modernizar 15 aplicações críticas para containers em Kubernetes, com migração para nuvem AWS e Azure, e implementar barramento de eventos com Kafka para integração em tempo real, em 6 meses.

## 3. Escopo da solução

- Containerização de 15 aplicações Java e .NET com Docker e orquestração em Kubernetes (EKS na AWS e AKS no Azure)
- Implementação de cluster Kafka gerenciado (Amazon MSK) para ingestão e distribuição de eventos entre aplicações
- Migração de 8 aplicações para AWS e 7 para Azure, com definição de landing zones e políticas de segurança
- Configuração de pipeline CI/CD com GitOps para deploy automatizado nos dois provedores cloud
- Sustentação AMS 24x7 para as aplicações modernizadas, com SLA de 99,9% de disponibilidade

Tecnologias principais: Kafka, AWS, Kubernetes, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Fase 1 - Assessment e desenho de arquitetura: 6 semanas
- Fase 2 - Containerização e migração para cloud: 10 semanas
- Fase 3 - Implementação de Kafka e integração: 6 semanas
- Fase 4 - Estabilização e transição para AMS: 2 semanas

## 5. Entregáveis

- 15 aplicações containerizadas e em produção nos ambientes AWS e Azure
- Cluster Kafka operacional com 12 tópicos e throughput de 5.000 mensagens/segundo
- Documentação de arquitetura de referência e runbooks de operação
- Pipeline CI/CD implantado com 20 deploys semanais automatizados
- Relatório mensal de sustentação com indicadores de disponibilidade e incidentes

## 6. Equipe proposta

1 arquiteto de soluções cloud, 2 engenheiros DevOps, 1 especialista em Kafka, 2 desenvolvedores full-stack e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Dependência de janelas de manutenção do Tribunal para cutover das aplicações
- Risco: Latência na aprovação de acessos e políticas de segurança pelos órgãos de controle
- Risco: Complexidade na integração de aplicações legadas com o barramento Kafka

## 8. Investimento

Investimento total: R$ 5.140.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 20%.
