---
projeto_id: P567
cliente: Transportadora Rota Livre
titulo: Streaming de dados em tempo real para operação logística
segmento: Logística
tecnologias: ["Python","Azure"]
servicos: ["Analytics & BI"]
area: Data & Analytics
dono: André Vasconcelos
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P567
id: P567-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-08-27
prazo_meses: 5
valor: 3880000
margem: 0.24
---

# Proposta Comercial — Streaming de dados em tempo real para operação logística

**Cliente:** Transportadora Rota Livre
**Segmento:** Logística
**Área responsável:** Data & Analytics · **Dono da proposta:** André Vasconcelos
**Data:** 2025-08-27 · **Versão:** final

## 1. Contexto e desafio

A Transportadora Rota Livre opera com cerca de 1.200 veículos e mais de 3.500 entregas diárias, mas os dados de rastreamento chegam à gestão com até 6 horas de atraso, consolidados em planilhas manuais. Isso impede a reação rápida a desvios de rota e a medição confiável do nível de serviço (OTIF atual de 82%).

## 2. Objetivo

Implantar uma plataforma de streaming em Python e Azure para disponibilizar eventos operacionais em tempo real e alimentar indicadores logísticos atualizados a cada minuto.

## 3. Escopo da solução

- Ingestão de eventos de telemetria e status de entregas via Azure Event Hubs
- Processamento de streams em tempo real com Python (Apache Spark Structured Streaming)
- Camada analítica em Azure Synapse Analytics para indicadores de OTIF e ocupação de frota
- Painéis de monitoramento operacional atualizados a cada 60 segundos
- Pipeline de qualidade de dados com alertas de eventos fora de SLA

Tecnologias principais: Python, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Discovery e arquitetura (6 semanas)
- Construção dos pipelines de streaming (10 semanas)
- Camada analítica e dashboards (4 semanas)

## 5. Entregáveis

- Arquitetura de referência de streaming documentada e validada
- Pipeline de ingestão e processamento em tempo real em produção
- Modelo analítico de indicadores logísticos no Synapse
- Dashboard operacional com latência inferior a 2 minutos
- Relatório de qualidade de dados e plano de evolução

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade dos eventos de telemetria da frota
- Risco: Latência de integração com sistemas legados (TMS)
- Risco: Baixa adoção dos dashboards pelas áreas operacionais

## 8. Investimento

Investimento total: R$ 3.880.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 24%.
