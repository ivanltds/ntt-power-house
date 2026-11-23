---
projeto_id: P409
cliente: Banco Ponte Firme
titulo: Streaming de Dados em Tempo Real para Análise de Transações
segmento: Serviços Financeiros
tecnologias: ["Kafka","Databricks"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: interna
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P409
id: P409-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-09-29
prazo_meses: 8
valor: 1300000
margem: 0.24
---

# Proposta Comercial — Streaming de Dados em Tempo Real para Análise de Transações

**Cliente:** Banco Ponte Firme
**Segmento:** Serviços Financeiros
**Área responsável:** Data & Analytics · **Dono da proposta:** Ana Beatriz Lopes
**Data:** 2026-09-29 · **Versão:** final

## 1. Contexto e desafio

O Banco Ponte Firme processa cerca de 2,5 milhões de transações por dia e enfrenta latência de até 4 horas para consolidar dados analíticos, impactando a detecção de fraudes e a experiência do cliente. A falta de uma arquitetura de streaming unificada impede a reação em tempo real a eventos críticos.

## 3. Escopo da solução

- Ingestão de eventos transacionais em tempo real usando Apache Kafka, com tópicos particionados para garantir ordem e throughput de até 10.000 mensagens por segundo.
- Processamento de streams com Databricks Structured Streaming para cálculos de agregações e detecção de anomalias em janelas de tempo.
- Integração dos dados processados com o data lake existente no Databricks, garantindo consistência e governança.
- Implementação de pipelines de dados para alimentar dashboards operacionais e modelos de risco em tempo quase real.
- Configuração de monitoramento e alertas para latência, falhas e qualidade dos dados na plataforma Kafka e Databricks.

Tecnologias principais: Kafka, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Planejamento e Arquitetura (4 semanas)
- Implementação da Ingestão com Kafka (10 semanas)
- Processamento e Análise com Databricks (12 semanas)
- Testes e Go-Live (6 semanas)

## 5. Entregáveis

- Arquitetura de referência de streaming validada e documentada.
- Cluster Kafka configurado e operacional com tópicos de transações e eventos.
- Pipelines de processamento em Databricks Structured Streaming implantados e testados.
- Dashboards de monitoramento de latência e volume de dados em tempo real.
- Relatório de testes de carga e desempenho com métricas de throughput e latência.

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em streaming e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Complexidade na integração com sistemas legados de origem.
- Risco: Volume de dados superior ao previsto durante picos de transação.
- Risco: Dependência de equipe do cliente para validação de regras de negócio.

## 8. Investimento

Investimento total: R$ 1.300.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 24%.
