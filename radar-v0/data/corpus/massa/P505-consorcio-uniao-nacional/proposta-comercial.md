---
projeto_id: P505
cliente: Consórcio União Nacional
titulo: Modernização de aplicações com containers e integração via Kafka em multi-cloud
segmento: Serviços Financeiros
tecnologias: ["Kafka","GCP","Azure","AWS"]
servicos: ["Sustentação / AMS"]
area: Cloud & Infra
dono: Carla Menezes
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P505
id: P505-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-07-03
prazo_meses: 12
valor: 1920000
margem: 0.36
---

# Proposta Comercial — Modernização de aplicações com containers e integração via Kafka em multi-cloud

**Cliente:** Consórcio União Nacional
**Segmento:** Serviços Financeiros
**Área responsável:** Cloud & Infra · **Dono da proposta:** Carla Menezes
**Data:** 2025-07-03 · **Versão:** final

## 1. Contexto e desafio

O Consórcio União Nacional opera 38 aplicações críticas de consórcio e cobrança em ambientes legados, com janelas de manutenção de até 9 horas mensais e custo de infraestrutura 27% acima do benchmark do setor. A ausência de padronização entre GCP, Azure e AWS gera 14 incidentes críticos por trimestre e dificulta a sustentação contínua.

## 2. Objetivo

Modernizar o parque de aplicações para containers com integração orientada a eventos via Kafka, reduzindo indisponibilidade e padronizando a operação multi-cloud em 12 meses.

## 3. Escopo da solução

- Containerização de 38 aplicações prioritárias com migração progressiva para GKE (GCP), AKS (Azure) e EKS (AWS)
- Implantação de malha de eventos com Kafka para integração entre sistemas de consórcio, cobrança e cadastro
- Pipeline CI/CD padronizado multi-cloud com observabilidade centralizada e políticas de segurança unificadas
- Modelo de sustentação / AMS 24x7 com SLA de 99,9% e gestão de incidentes integrada às três nuvens
- Plano de continuidade e disaster recovery cross-cloud com RTO de 4 horas e RPO de 15 minutos

Tecnologias principais: Kafka, GCP, Azure, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 12 meses, nas seguintes fases:

- Assessment e arquitetura alvo (10 semanas)
- Piloto de containerização e Kafka em GCP (14 semanas)
- Ondas de migração para Azure e AWS (20 semanas)
- Estabilização e transição para AMS 24x7 (8 semanas)

## 5. Entregáveis

- Relatório de assessment e roadmap de containerização das 38 aplicações
- Ambiente Kubernetes multi-cloud operacional com Kafka em produção para 12 aplicações piloto
- Pipeline CI/CD e dashboards de observabilidade implantados nas três nuvens
- Catálogo de serviços e runbooks de sustentação / AMS com SLA contratado
- Relatório final de migração com métricas de redução de custo e indisponibilidade

## 6. Equipe proposta

1 arquiteto de soluções cloud, 1 especialista Kafka, 3 engenheiros DevOps, 2 engenheiros de sustentação e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Dependência de janelas de mudança rígidas do cliente
- Risco: Complexidade de governança entre três provedores cloud
- Risco: Curva de aprendizado das equipes internas em containers e Kafka

## 8. Investimento

Investimento total: R$ 1.920.000, em parcelas mensais ao longo de 12 meses.

Margem praticada: 36%.
