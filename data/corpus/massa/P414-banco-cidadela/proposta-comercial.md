---
projeto_id: P414
cliente: Banco Cidadela
titulo: Implantação de CRM Salesforce e Jornada do Cliente com Dados Integrados via Kafka
segmento: Serviços Financeiros
tecnologias: ["Azure","Salesforce","Kafka"]
servicos: ["CRM","Engenharia de Dados","Change Management"]
area: Digital & CRM
dono: Diego Albuquerque
confidencialidade: confidencial
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P414
id: P414-PROP
tipo_documental: proposta_comercial
status_documento: preliminar
data: 2026-10-24
prazo_meses: 10
valor: 2060000
margem: 0.25
---

# Proposta Comercial — Implantação de CRM Salesforce e Jornada do Cliente com Dados Integrados via Kafka

**Cliente:** Banco Cidadela
**Segmento:** Serviços Financeiros
**Área responsável:** Digital & CRM · **Dono da proposta:** Diego Albuquerque
**Data:** 2026-10-24 · **Versão:** final

## 1. Contexto e desafio

O Banco Cidadela atende 2,3 milhões de clientes em canais digitais e físicos, mas mantém dados de relacionamento fragmentados em 4 sistemas legados, o que limita a visão 360º e a personalização de ofertas. Com isso, a taxa de conversão de campanhas gira em torno de 1,8% e o tempo médio de resposta a demandas de clientes chega a 48 horas.

## 2. Objetivo

Implantar uma plataforma de CRM no Salesforce integrada por streaming de dados com Azure e Kafka, unificando a jornada do cliente e elevando a conversão de campanhas para 3,5% e reduzindo o tempo de resposta para 12 horas em 10 meses.

## 3. Escopo da solução

- Configuração do Salesforce Financial Services Cloud para visão 360º de 2,3 milhões de clientes e gestão de jornadas
- Construção de pipeline de engenharia de dados no Azure Data Lake e Azure Data Factory para ingestão de 4 fontes legadas
- Integração em tempo real via Apache Kafka entre os sistemas transacionais do banco e o Salesforce, com SLA de latência inferior a 3 segundos
- Implementação de automação de campanhas e next best action no Salesforce com 12 jornadas prioritárias
- Programa de Change Management para 320 usuários em 3 regionais, incluindo treinamento e comunicação corporativa

Tecnologias principais: Azure, Salesforce, Kafka.

## 4. Abordagem e cronograma

O projeto será executado em 10 meses, nas seguintes fases:

- Descoberta e arquitetura (8 semanas)
- Engenharia de dados e integração Kafka (14 semanas)
- Configuração de CRM e jornadas no Salesforce (12 semanas)
- Rollout, treinamento e estabilização (9 semanas)

## 5. Entregáveis

- Blueprint de arquitetura de integração Salesforce, Azure e Kafka aprovado em 6 semanas
- Pipeline de dados operacional com 4 fontes integradas e monitoramento de qualidade de dados
- 12 jornadas de cliente configuradas e homologadas no Salesforce
- Painel de indicadores de conversão, tempo de resposta e NPS com 15 métricas
- Plano de change management executado com 320 usuários treinados e pesquisa de adoção com meta de 85%

## 6. Equipe proposta

1 arquiteto de soluções, 1 tech lead Salesforce, 2 engenheiros de dados, 1 especialista Kafka, 1 consultor de change management e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e duplicidade dos dados dos 4 sistemas legados
- Risco: Baixa adesão dos 320 usuários às novas jornadas de CRM
- Risco: Latência e disponibilidade da integração Kafka em horário de pico

## 8. Investimento

Investimento total: R$ 2.060.000, em parcelas mensais ao longo de 10 meses.

Margem praticada: 25%.
