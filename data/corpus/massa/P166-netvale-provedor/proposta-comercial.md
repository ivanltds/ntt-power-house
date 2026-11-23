---
projeto_id: P166
cliente: NetVale Provedor
titulo: Modernização de aplicações em containers com Kafka, GCP, AWS e Kubernetes
segmento: Telecom
tecnologias: ["Kafka","GCP","AWS","Kubernetes"]
servicos: ["Migração para Nuvem"]
area: Cloud & Infra
dono: Isabela Freitas
confidencialidade: confidencial
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P166
id: P166-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-10-27
prazo_meses: 5
valor: 1250000
margem: 0.34
---

# Proposta Comercial — Modernização de aplicações em containers com Kafka, GCP, AWS e Kubernetes

**Cliente:** NetVale Provedor
**Segmento:** Telecom
**Área responsável:** Cloud & Infra · **Dono da proposta:** Isabela Freitas
**Data:** 2026-10-27 · **Versão:** final

## 1. Contexto e desafio

A NetVale Provedor opera 38 sistemas de atendimento, billing e aprovisionamento de rede em servidores legados, com janelas de manutenção mensais de 6 horas e picos de indisponibilidade que afetam cerca de 420 mil assinantes. O crescimento de 22% no tráfego de dados nos últimos 12 meses tornou o modelo atual insustentável em custo e escalabilidade.

## 2. Objetivo

Modernizar as aplicações críticas do provedor migrando-as para containers em nuvem, com mensageria Kafka e orquestração Kubernetes, reduzindo o custo de infraestrutura e elevando a disponibilidade dos serviços.

## 3. Escopo da solução

- Containerização de 22 aplicações prioritárias de billing e atendimento, com padronização de imagens e pipelines CI/CD
- Implantação de cluster Kubernetes gerenciado no GCP com extensão para cargas no AWS
- Migração dos fluxos de eventos de aprovisionamento para Apache Kafka, com 14 tópicos e retenção de 7 dias
- Migração para Nuvem das cargas legadas em ondas, incluindo banco de dados e integrações via API
- Observabilidade integrada com métricas de disponibilidade, latência e consumo por aplicação

Tecnologias principais: Kafka, GCP, AWS, Kubernetes.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e desenho da arquitetura alvo (4 semanas)
- Implantação de Kubernetes, Kafka e pipelines CI/CD (6 semanas)
- Migração das aplicações em ondas para GCP e AWS (8 semanas)
- Estabilização, observabilidade e transferência de conhecimento (2 semanas)

## 5. Entregáveis

- Inventário técnico e plano de migração em ondas das 22 aplicações
- Cluster Kubernetes operacional no GCP com 3 ambientes (dev, homologação e produção)
- Plataforma Kafka com 14 tópicos e políticas de retenção configuradas
- 22 aplicações containerizadas e migradas para nuvem, com pipelines CI/CD ativos
- Relatório de ganhos com comparativo de custo e disponibilidade antes e depois

## 6. Equipe proposta

1 arquiteto de soluções cloud, 1 especialista em Kubernetes, 1 engenheiro de dados e mensageria, 2 engenheiros de migração e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Dependências de integrações legadas com sistemas de terceiros
- Risco: Janelas de manutenção restritas para corte das aplicações
- Risco: Curva de aprendizado da equipe do cliente em Kubernetes

## 8. Investimento

Investimento total: R$ 1.250.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 34%.
