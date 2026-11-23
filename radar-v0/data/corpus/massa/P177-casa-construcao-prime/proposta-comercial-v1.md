---
projeto_id: P177
cliente: Casa & Construção Prime
titulo: Modernização de aplicações do varejo com containers, Kafka e GCP
segmento: Varejo
tecnologias: ["Kafka","GCP"]
servicos: ["Migração para Nuvem","Sustentação / AMS"]
area: Cloud & Infra
dono: Débora Castilho
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P177
id: P177-PROPV1
tipo_documental: proposta_comercial
status_documento: rascunho
data: 2024-09-14
prazo_meses: 9
valor: 750000
margem: 0.23
---

# Proposta Comercial — Modernização de aplicações do varejo com containers, Kafka e GCP (versão 1, rascunho)

**Cliente:** Casa & Construção Prime
**Segmento:** Varejo
**Área responsável:** Cloud & Infra · **Dono da proposta:** Débora Castilho
**Data:** 2024-09-14 · **Versão:** 1 (rascunho)

## 1. Contexto e desafio

A Casa & Construção Prime operava 42 lojas físicas e um e-commerce com picos de 380 mil sessões em datas promocionais, sustentados por aplicações monolíticas em servidores legados que geravam indisponibilidades de até 6 horas por mês. O custo de infraestrutura on-premise crescia 18% ao ano e os deploys levavam em média 9 dias, limitando a velocidade de lançamento de novas campanhas.

## 2. Objetivo

Modernizar as aplicações críticas de vendas e catálogo para uma arquitetura em containers na GCP, com integração de eventos via Kafka, reduzindo indisponibilidade e acelerando o ciclo de entrega.

## 3. Escopo da solução

- Conteinerização das aplicações de catálogo, carrinho e checkout com orquestração em GKE na GCP
- Implantação de cluster Kafka para streaming de eventos de pedidos, estoque e preço entre lojas físicas e e-commerce
- Migração de 14 workloads legados para a GCP com pipeline CI/CD automatizado
- Configuração de observabilidade, autoscaling e políticas de backup nos ambientes GCP
- Operação de sustentação AMS com SLA de atendimento e monitoramento contínuo dos containers e tópicos Kafka

Tecnologias principais: Kafka, GCP.

## 4. Abordagem e cronograma

O projeto será executado em 9 meses, nas seguintes fases:

- Assessment e desenho da arquitetura alvo (6 semanas)
- Conteinerização e implantação do Kafka (10 semanas)
- Migração dos workloads para GCP e go-live (8 semanas)
- Estabilização e transição para AMS (4 semanas)

## 5. Entregáveis

- 14 aplicações migradas e em execução em containers no GKE
- Cluster Kafka em produção com 3 tópicos principais e retenção de 7 dias
- Pipeline CI/CD com deploys automatizados e rollback em até 15 minutos
- Runbooks de operação, dashboard de observabilidade e plano de DR
- Relatório de encerramento com métricas de disponibilidade e custo mensal

## 6. Equipe proposta

1 arquiteto de soluções cloud, 3 engenheiros DevOps, 2 engenheiros de dados especialistas em Kafka e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Janela de congelamento de vendas em datas promocionais reduz o período útil de migração
- Risco: Dependências de sistemas legados sem documentação atualizada
- Risco: Curva de aprendizado das equipes do cliente em GCP e Kafka

## 8. Investimento

Investimento total: R$ 750.000, em parcelas mensais ao longo de 9 meses.

Margem praticada: 23%.
