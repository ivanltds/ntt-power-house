---
projeto_id: P565
cliente: Ondas Móvel
titulo: Streaming de Dados em Tempo Real para Análise de Rede
segmento: Telecom
tecnologias: ["Kafka","Databricks","AWS","Python"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: André Vasconcelos
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P565
id: P565-PROPV1
tipo_documental: proposta_comercial
status_documento: rascunho
data: 2026-05-20
prazo_meses: 10
valor: 1070000
margem: 0.31
---

# Proposta Comercial — Streaming de Dados em Tempo Real para Análise de Rede (versão 1, rascunho)

**Cliente:** Ondas Móvel
**Segmento:** Telecom
**Área responsável:** Data & Analytics · **Dono da proposta:** André Vasconcelos
**Data:** 2026-05-20 · **Versão:** 1 (rascunho)

## 1. Contexto e desafio

A Ondas Móvel precisa monitorar 12 milhões de dispositivos em tempo real para reduzir falhas de rede que impactam 8% dos usuários mensalmente. Os sistemas atuais processam dados com latência de 15 minutos, inviabilizando ações proativas.

## 2. Objetivo

Implementar uma plataforma de streaming com Kafka e Databricks na AWS para ingestão e análise de eventos em tempo real, reduzindo a latência para menos de 5 segundos e aumentando a precisão na detecção de anomalias.

## 3. Escopo da solução

- Configuração de clusters Kafka na AWS para ingestão de 500 mil eventos/segundo
- Desenvolvimento de pipelines de dados com Databricks e Python para processamento em tempo real
- Integração com fontes de dados de rede e sistemas legados via conectores Kafka
- Implementação de dashboards de monitoramento com Analytics & BI para visualização de métricas
- Otimização de custos e performance na AWS com auto scaling e políticas de retenção

Tecnologias principais: Kafka, Databricks, AWS, Python.

## 4. Abordagem e cronograma

O projeto será executado em 10 meses, nas seguintes fases:

- Fase 1 - Discovery e Arquitetura: 4 semanas
- Fase 2 - Implementação de Ingestão e Processamento: 12 semanas
- Fase 3 - Integração e Visualização: 8 semanas
- Fase 4 - Testes, Go-live e Estabilização: 8 semanas

## 5. Entregáveis

- Documento de arquitetura de streaming validado
- Pipeline de ingestão Kafka operacional com 99,9% de disponibilidade
- Jobs Databricks para processamento de eventos em tempo real
- Dashboard de monitoramento de rede com alertas automatizados
- Relatório de testes de carga e performance

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em streaming e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Volatilidade no volume de eventos durante picos de tráfego
- Risco: Integração com sistemas legados com protocolos proprietários
- Risco: Dependência de serviços AWS para escalabilidade

## 8. Investimento

Investimento total: R$ 1.070.000, em parcelas mensais ao longo de 10 meses.

Margem praticada: 31%.
