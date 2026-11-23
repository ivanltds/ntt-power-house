---
projeto_id: P217
cliente: Farmácias Vida Plena
titulo: Modernização de aplicações em containers com Kafka, Azure e Kubernetes
segmento: Varejo
tecnologias: ["Kafka","Azure","Kubernetes"]
servicos: ["Sustentação / AMS","Migração para Nuvem"]
area: Cloud & Infra
dono: Débora Castilho
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P217
id: P217-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-12-09
prazo_meses: 8
valor: 3840000
margem: 0.26
---

# Proposta Comercial — Modernização de aplicações em containers com Kafka, Azure e Kubernetes

**Cliente:** Farmácias Vida Plena
**Segmento:** Varejo
**Área responsável:** Cloud & Infra · **Dono da proposta:** Débora Castilho
**Data:** 2025-12-09 · **Versão:** final

## 1. Contexto e desafio

A rede de Farmácias Vida Plena opera 320 lojas e processa cerca de 4,5 milhões de transações de venda por mês, com picos de 180 pedidos por minuto em datas sazonais. O parque de aplicações de gestão de estoque e fidelidade roda em servidores on-premises com janelas de manutenção de até 6 horas, limitando a escalabilidade e elevando o custo de infraestrutura em 22% ao ano.

## 2. Objetivo

Migrar e modernizar as aplicações críticas de estoque e fidelidade para uma arquitetura de containers em Azure com orquestração Kubernetes e integração orientada a eventos via Kafka, reduzindo indisponibilidade e ganhando elasticidade para os picos sazonais.

## 3. Escopo da solução

- Conteinerização das aplicações de estoque e fidelidade com empacotamento em imagens e padronização de pipelines CI/CD
- Provisionamento e configuração de cluster Kubernetes no Azure (AKS) com políticas de autoescalonamento por demanda
- Implantação de barramento de eventos com Kafka para integração entre estoque, fidelidade e frente de caixa, suportando 180 eventos por minuto em pico
- Migração de 14 workloads on-premises para nuvem Azure com plano de cutover por ondas e rollback definido
- Sustentação contínua em modelo AMS com monitoramento, gestão de incidentes e SLO de disponibilidade de 99,9%

Tecnologias principais: Kafka, Azure, Kubernetes.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Assessment e desenho da arquitetura alvo (6 semanas)
- Conteinerização e pipeline CI/CD (10 semanas)
- Migração por ondas para Azure e Kafka (12 semanas)
- Estabilização e transição para AMS (4 semanas)

## 5. Entregáveis

- Cluster Kubernetes em Azure operacional com 14 workloads migrados e validados em produção
- Pipeline CI/CD padronizado para build e deploy de containers das aplicações de estoque e fidelidade
- Topologia Kafka implantada com tópicos de integração documentados e testes de carga executados
- Plano de cutover por ondas com relatório de validação e rollback por aplicação
- Relatórios mensais de AMS com indicadores de disponibilidade, incidentes e capacidade do cluster

## 6. Equipe proposta

1 arquiteto de soluções cloud, 2 engenheiros DevOps/Kubernetes, 1 engenheiro de dados para Kafka, 2 desenvolvedores de aplicações e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Dependência de janelas de loja para cutover das aplicações de estoque
- Risco: Latência na integração Kafka com sistemas legados de frente de caixa
- Risco: Capacidade limitada da equipe do cliente para validação funcional

## 8. Investimento

Investimento total: R$ 3.840.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 26%.
