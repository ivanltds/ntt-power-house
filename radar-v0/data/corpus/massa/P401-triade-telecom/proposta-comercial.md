---
projeto_id: P401
cliente: Tríade Telecom
titulo: Plataforma de Dados em Tempo Real para Streaming com Azure, AWS e Databricks
segmento: Telecom
tecnologias: ["Azure","AWS","Databricks"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P401
id: P401-PROP
tipo_documental: proposta_comercial
status_documento: preliminar
data: 2026-11-15
prazo_meses: 5
valor: 310000
margem: 0.34
---

# Proposta Comercial — Plataforma de Dados em Tempo Real para Streaming com Azure, AWS e Databricks

**Cliente:** Tríade Telecom
**Segmento:** Telecom
**Área responsável:** Data & Analytics · **Dono da proposta:** Henrique Matos
**Data:** 2026-11-15 · **Versão:** final

## 1. Contexto e desafio

A Tríade Telecom processa cerca de 180 milhões de eventos de rede e bilhetagem por dia, mas apenas 12% desse volume é disponibilizado em tempo real para as áreas de operações e comercial. A latência atual de 4 a 6 horas entre a captura do evento e a consulta analítica impede a detecção proativa de falhas de cobertura e a ativação de ofertas personalizadas no momento da interação do cliente.

## 2. Objetivo

Implantar uma arquitetura de streaming de dados em nuvem híbrida (Azure e AWS) com processamento no Databricks, reduzindo a latência de disponibilização de eventos de 6 horas para menos de 2 minutos e habilitando 8 novos casos de uso analíticos em tempo real.

## 3. Escopo da solução

- Ingestão contínua de eventos de rede e bilhetagem via Azure Event Hubs e AWS Kinesis, com throughput de até 4 mil eventos por segundo
- Pipeline de processamento em camadas Bronze, Silver e Gold com Databricks e Delta Lake, incluindo deduplicação e enriquecimento com cadastro de assinantes
- Orquestração de fluxos e governança de dados em Azure Data Factory e AWS Step Functions, com catálogo unificado no Unity Catalog
- Modelagem de indicadores em tempo real (QoS por região, consumo por assinante, churn score) expostos em dashboards de Analytics & BI
- Implementação de monitoramento de pipelines, alertas de SLA de latência e política de retenção de 90 dias para dados quentes

Tecnologias principais: Azure, AWS, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Fase 1 - Descoberta e arquitetura de referência: 5 semanas
- Fase 2 - Construção dos pipelines de ingestão e processamento: 9 semanas
- Fase 3 - Analytics & BI, governança e catálogo de dados: 4 semanas
- Fase 4 - Homologação, go-live e operação assistida: 2 semanas

## 5. Entregáveis

- Arquitetura de referência de streaming documentada, cobrindo Azure, AWS e Databricks
- 12 pipelines de ingestão e processamento em produção com SLA de latência inferior a 2 minutos
- Modelo semântico com 25 indicadores de QoS e consumo publicados em dashboards de Analytics & BI
- Catálogo de dados governado com 40 entidades mapeadas e políticas de acesso por perfil
- Plano de operação assistida e runbook de monitoramento com 15 alertas configurados

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em Databricks, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Latência de rede entre Azure e AWS acima do previsto para o volume de 4 mil eventos por segundo
- Risco: Qualidade e padronização dos eventos de bilhetagem nas fontes legadas
- Risco: Dependência de janelas de acesso e liberação de firewall pelos times de infraestrutura do cliente

## 8. Investimento

Investimento total: R$ 310.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 34%.
