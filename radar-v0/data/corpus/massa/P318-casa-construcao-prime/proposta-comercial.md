---
projeto_id: P318
cliente: Casa & Construção Prime
titulo: Modernização de aplicações em containers com Kafka e GCP para varejo de materiais de construção
segmento: Varejo
tecnologias: ["Kafka","GCP"]
servicos: ["Sustentação / AMS","Migração para Nuvem"]
area: Cloud & Infra
dono: Carla Menezes
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P318
id: P318-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-05-15
prazo_meses: 10
valor: 1420000
margem: 0.3
---

# Proposta Comercial — Modernização de aplicações em containers com Kafka e GCP para varejo de materiais de construção

**Cliente:** Casa & Construção Prime
**Segmento:** Varejo
**Área responsável:** Cloud & Infra · **Dono da proposta:** Carla Menezes
**Data:** 2026-05-15 · **Versão:** final

## 1. Contexto e desafio

A Casa & Construção Prime opera 42 lojas físicas e um e-commerce que responde por 18% da receita, mas suas aplicações monolíticas em datacenter próprio limitam a escalabilidade em picos de campanha, quando o volume de pedidos chega a triplicar. A integração entre frente de loja, e-commerce e centro de distribuição depende de rotinas batch noturnas, gerando atrasos de até 6 horas na atualização de estoque e rupturas em 11% dos SKUs mais vendidos.

## 2. Objetivo

Migrar e modernizar o parque de aplicações para containers no GCP, com integração de eventos em tempo real via Kafka, reduzindo o tempo de atualização de estoque para menos de 5 minutos e sustentando o crescimento digital até 2027.

## 3. Escopo da solução

- Containerização das aplicações de frente de loja e e-commerce com orquestração no GCP (GKE), substituindo o ambiente de datacenter próprio
- Implantação de barramento de eventos com Kafka para sincronização em tempo real de estoque, pedidos e preços entre lojas, e-commerce e CD
- Migração de 14 aplicações críticas para a nuvem GCP em ondas, incluindo bancos de dados e integrações legadas
- Pipeline de CI/CD e observabilidade para os containers, com métricas de latência, throughput e disponibilidade
- Serviço de sustentação (AMS) com SLA de 99,9% e atendimento 24x7 para o ambiente containerizado

Tecnologias principais: Kafka, GCP.

## 4. Abordagem e cronograma

O projeto será executado em 10 meses, nas seguintes fases:

- Diagnóstico e arquitetura de destino (8 semanas)
- Implantação de Kafka e plataforma GKE (10 semanas)
- Migração das aplicações em ondas (18 semanas)
- Estabilização e transição para AMS (8 semanas)

## 5. Entregáveis

- Arquitetura de referência de containers e eventos aprovada, cobrindo as 14 aplicações do escopo
- Cluster GKE e cluster Kafka em produção, com sincronização de estoque abaixo de 5 minutos
- 14 aplicações migradas e operando em containers no GCP em regime de produção
- Pipeline de CI/CD e dashboards de observabilidade implantados para todas as aplicações migradas
- Contrato de sustentação AMS em vigor com catálogo de serviços, SLA e relatórios mensais de disponibilidade

## 6. Equipe proposta

1 arquiteto de soluções cloud, 1 especialista em Kafka, 3 engenheiros de plataforma/DevOps, 2 desenvolvedores de migração, 1 analista de sustentação e 1 gerente de projeto..

## 7. Premissas e riscos

- Risco: Dependências de integrações legadas com fornecedores de frente de loja podem atrasar ondas de migração
- Risco: Picos de campanha durante a janela do projeto exigem congelamentos e replanejamento de cutover
- Risco: Curva de aprendizado das equipes do cliente em GCP e Kafka pode sobrecarregar a transição para AMS

## 8. Investimento

Investimento total: R$ 1.420.000, em parcelas mensais ao longo de 10 meses.

Margem praticada: 30%.
