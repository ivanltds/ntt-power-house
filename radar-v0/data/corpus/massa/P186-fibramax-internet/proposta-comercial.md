---
projeto_id: P186
cliente: FibraMax Internet
titulo: Streaming de dados em tempo real para operações de rede e atendimento
segmento: Telecom
tecnologias: ["Databricks","Kafka","AWS","Python"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P186
id: P186-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-10-22
prazo_meses: 6
valor: 640000
margem: 0.33
---

# Proposta Comercial — Streaming de dados em tempo real para operações de rede e atendimento

**Cliente:** FibraMax Internet
**Segmento:** Telecom
**Área responsável:** Data & Analytics · **Dono da proposta:** Henrique Matos
**Data:** 2025-10-22 · **Versão:** final

## 1. Contexto e desafio

A FibraMax Internet, com 1,2 milhão de clientes residenciais e corporativos em 8 estados, enfrenta hoje uma latência média de 4 horas entre a geração de eventos de rede e a disponibilidade dos dados para análise, o que atrasa a detecção de falhas e a ação comercial. Cerca de 35% dos incidentes de qualidade só são identificados após reclamação do assinante, elevando o churn mensal para 1,8%.

## 2. Objetivo

Implantar uma plataforma de dados em tempo real para ingestão, processamento e analytics de eventos de rede e atendimento, reduzindo a latência de disponibilização de dados de horas para menos de 5 minutos.

## 3. Escopo da solução

- Ingestão contínua de eventos de rede e CRM via Apache Kafka, com tópicos particionados por região e retenção de 7 dias
- Pipeline de processamento em streaming no Databricks com notebooks e jobs em Python para limpeza, enriquecimento e agregação
- Camada analítica na AWS (S3, Glue Catalog e Databricks SQL) para dashboards operacionais e de qualidade
- Modelos de detecção de anomalias em Python sobre janelas deslizantes de 15 minutos para falhas de rede
- Integração dos indicadores em tempo real ao portal de atendimento e às rotinas de squads de operação

Tecnologias principais: Databricks, Kafka, AWS, Python.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Discovery e arquitetura (4 semanas)
- Construção dos pipelines de streaming (10 semanas)
- Analytics, BI e detecção de anomalias (7 semanas)
- Go-live, estabilização e treinamento (5 semanas)

## 5. Entregáveis

- Arquitetura de referência de streaming documentada e aprovada
- Pipelines Kafka-Databricks em produção para 12 fontes de eventos
- Painéis de Analytics & BI com 18 indicadores operacionais em tempo quase real
- Playbook de operação e monitoramento de pipelines com alertas automáticos
- Treinamento de 25 analistas e engenheiros do cliente em Databricks e Kafka

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Volume de eventos acima do previsto nos horários de pico
- Risco: Qualidade e padronização irregular dos eventos de rede legados
- Risco: Dependência de liberações de acesso e firewall pelo time de infraestrutura do cliente

## 8. Investimento

Investimento total: R$ 640.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 33%.
