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
id: P177-SOW
tipo_documental: sow
status_documento: assinado
data: 2024-10-30
prazo_meses: 7
valor: 910000
---

# SOW — Modernização de aplicações do varejo com containers, Kafka e GCP

**Contratante:** Casa & Construção Prime · **Contratada:** NTT DATA Brasil · **Vigência:** 7 meses a partir do kickoff

## 1. Objeto

Modernizar as aplicações críticas de vendas e catálogo para uma arquitetura em containers na GCP, com integração de eventos via Kafka, reduzindo indisponibilidade e acelerando o ciclo de entrega.

## 2. Escopo contratado

- Conteinerização das aplicações de catálogo, carrinho e checkout com orquestração em GKE na GCP
- Implantação de cluster Kafka para streaming de eventos de pedidos, estoque e preço entre lojas físicas e e-commerce
- Migração de 14 workloads legados para a GCP com pipeline CI/CD automatizado
- Configuração de observabilidade, autoscaling e políticas de backup nos ambientes GCP
- Operação de sustentação AMS com SLA de atendimento e monitoramento contínuo dos containers e tópicos Kafka

## 3. Entregáveis e aceite

- 14 aplicações migradas e em execução em containers no GKE
- Cluster Kafka em produção com 3 tópicos principais e retenção de 7 dias
- Pipeline CI/CD com deploys automatizados e rollback em até 15 minutos
- Runbooks de operação, dashboard de observabilidade e plano de DR
- Relatório de encerramento com métricas de disponibilidade e custo mensal

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 910.000, faturado mensalmente conforme o cronograma.
