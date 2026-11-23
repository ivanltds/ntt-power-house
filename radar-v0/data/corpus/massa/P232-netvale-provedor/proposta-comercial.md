---
projeto_id: P232
cliente: NetVale Provedor
titulo: Plataforma Lakehouse na AWS com Kafka e Snowflake para Análise de Dados
segmento: Telecom
tecnologias: ["AWS","Kafka","Snowflake","Python"]
servicos: ["Engenharia de Dados","Governança de Dados","Migração para Nuvem"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P232
id: P232-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-11-12
prazo_meses: 6
valor: 1640000
margem: 0.23
---

# Proposta Comercial — Plataforma Lakehouse na AWS com Kafka e Snowflake para Análise de Dados

**Cliente:** NetVale Provedor
**Segmento:** Telecom
**Área responsável:** Data & Analytics · **Dono da proposta:** Henrique Matos
**Data:** 2026-11-12 · **Versão:** final

## 1. Contexto e desafio

A NetVale Provedor, com cerca de 480 mil assinantes de internet e TV, enfrenta dificuldades para consolidar dados de rede, atendimento e faturamento em um data warehouse legado que processa lotes noturnos de até 9 horas. Relatórios de churn e consumo levam mais de 24 horas para ficar disponíveis, atrasando decisões comerciais e de retenção.

## 2. Objetivo

Implantar uma plataforma de dados lakehouse na AWS com ingestão em streaming via Kafka e camada analítica em Snowflake, reduzindo a latência de dados de 24 horas para menos de 2 horas em 6 meses.

## 3. Escopo da solução

- Ingestão em streaming de eventos de rede e atendimento com Apache Kafka na AWS (Amazon MSK)
- Construção de camadas bronze, prata e ouro em Amazon S3 com pipelines em Python e AWS Glue
- Modelagem dimensional e cargas incrementais no Snowflake para consumo analítico
- Implementação de catálogo, linhagem e políticas de acesso com AWS Lake Formation e Snowflake RBAC
- Migração de 120 tabelas do data warehouse legado para a nova plataforma, com validação de paridade

Tecnologias principais: AWS, Kafka, Snowflake, Python.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Descoberta e Arquitetura (6 semanas)
- Ingestão e Lakehouse (10 semanas)
- Migração e Modelagem no Snowflake (6 semanas)
- Governança e Go-Live (4 semanas)

## 5. Entregáveis

- Pipeline de streaming Kafka operando com throughput de 15 mil eventos por segundo
- Camada ouro no Snowflake com 8 data marts de churn, consumo e faturamento
- Catálogo de dados com 250 ativos catalogados e 100% dos data marts com linhagem documentada
- Relatório de migração das 120 tabelas legadas com taxa de paridade superior a 99,5%
- Documentação técnica e plano de sustentação com 40 horas de transferência de conhecimento

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em governança de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade dos dados legados pode exigir esforço extra de limpeza
- Risco: Janela de migração limitada pela operação 24x7 do provedor
- Risco: Dependência de acesso à infraestrutura de rede do cliente para ingestão Kafka

## 8. Investimento

Investimento total: R$ 1.640.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 23%.
