---
projeto_id: P476
cliente: Banco Meridiano
titulo: Modernização de Aplicações Financeiras com Containers em Nuvem Híbrida
segmento: Serviços Financeiros
tecnologias: ["AWS","GCP","Kubernetes","Kafka"]
servicos: ["Migração para Nuvem"]
area: Cloud & Infra
dono: Carla Menezes
confidencialidade: confidencial
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P476
id: P476-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-03-22
prazo_meses: 10
valor: 1080000
margem: 0.21
---

# Proposta Comercial — Modernização de Aplicações Financeiras com Containers em Nuvem Híbrida

**Cliente:** Banco Meridiano
**Segmento:** Serviços Financeiros
**Área responsável:** Cloud & Infra · **Dono da proposta:** Carla Menezes
**Data:** 2026-03-22 · **Versão:** final

## 1. Contexto e desafio

O Banco Meridiano opera 42 aplicações críticas de crédito e pagamentos em servidores on-premises com idade média de 9 anos, gerando 3,2 horas de indisponibilidade não planejada por mês e custo de manutenção 38% acima do benchmark do setor. A instituição precisa reduzir o time-to-market de novos produtos financeiros, hoje em 7 meses, e não possui padronização de ambientes entre desenvolvimento e produção.

## 2. Objetivo

Migrar e modernizar as aplicações prioritárias do banco para uma arquitetura de containers em AWS e GCP, com orquestração via Kubernetes e integração de eventos com Kafka, em 10 meses.

## 3. Escopo da solução

- Assessment e priorização de 42 aplicações, com ondas de migração para AWS e GCP
- Conteinerização das aplicações prioritárias e padronização de imagens com Kubernetes (EKS e GKE)
- Implantação de malha de eventos com Kafka para integração assíncrona entre serviços de crédito e pagamentos
- Pipeline CI/CD com GitOps, observabilidade e políticas de segurança para os clusters Kubernetes
- Plano de cutover, rollback e operação assistida durante a transição dos ambientes on-premises

Tecnologias principais: AWS, GCP, Kubernetes, Kafka.

## 4. Abordagem e cronograma

O projeto será executado em 10 meses, nas seguintes fases:

- Assessment e desenho da arquitetura-alvo (8 semanas)
- Fundação de plataforma: Kubernetes, CI/CD e Kafka (10 semanas)
- Migração das ondas 1 e 2 de aplicações (16 semanas)
- Onda 3, cutover e operação assistida (6 semanas)

## 5. Entregáveis

- Relatório de assessment com mapa de dependências das 42 aplicações e plano de ondas
- 12 aplicações prioritárias migradas e rodando em containers Kubernetes em AWS e GCP
- Plataforma de eventos Kafka operacional com tópicos, schemas e monitoramento
- Pipeline CI/CD padronizado e dashboards de observabilidade para todos os clusters
- Runbooks de operação, plano de cutover e transferência de conhecimento para o time do banco

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de soluções cloud, 2 engenheiros de plataforma Kubernetes, 2 engenheiros de migração e 1 especialista em Kafka.

## 7. Premissas e riscos

- Risco: Dependências legadas não mapeadas atrasarem as ondas de migração
- Risco: Janelas de mudança restritas no ambiente financeiro reduzirem a velocidade de cutover
- Risco: Diferenças de configuração entre AWS e GCP exigirem retrabalho na padronização Kubernetes

## 8. Investimento

Investimento total: R$ 1.080.000, em parcelas mensais ao longo de 10 meses.

Margem praticada: 21%.
