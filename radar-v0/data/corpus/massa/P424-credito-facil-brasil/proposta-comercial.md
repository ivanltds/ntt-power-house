---
projeto_id: P424
cliente: Crédito Fácil Brasil
titulo: Pipeline de detecção de fraude em tempo real com Databricks e Kafka
segmento: Serviços Financeiros
tecnologias: ["Databricks","Kafka"]
servicos: ["Engenharia de Dados"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P424
id: P424-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-03-15
prazo_meses: 7
valor: 1130000
margem: 0.38
---

# Proposta Comercial — Pipeline de detecção de fraude em tempo real com Databricks e Kafka

**Cliente:** Crédito Fácil Brasil
**Segmento:** Serviços Financeiros
**Área responsável:** AI & Automation · **Dono da proposta:** Bruno Tavares
**Data:** 2025-03-15 · **Versão:** final

## 1. Contexto e desafio

O Crédito Fácil Brasil processa cerca de 2,4 milhões de transações de crédito por mês e sofre com um índice de fraude de 1,8%, o que representa perdas estimadas em R$ 38 milhões ao ano. A análise atual é majoritariamente batch, com latência de até 24 horas, impedindo o bloqueio de operações suspeitas antes da liquidação financeira.

## 2. Objetivo

Construir um pipeline de engenharia de dados em tempo real que ingira eventos transacionais via Kafka e disponibilize features e sinais de risco no Databricks em menos de 2 minutos, subsidiando a detecção de fraude.

## 3. Escopo da solução

- Ingestão de eventos transacionais em streaming com Apache Kafka, com tópicos segregados por canal e retenção de 7 dias
- Construção de camadas bronze, silver e gold no Databricks com Delta Lake, incluindo histórico de 18 meses de transações
- Implementação de jobs de engenharia de dados em Databricks para cálculo de features de risco em janelas de 1h, 24h e 7 dias
- Integração dos datasets gold com o motor antifraude do cliente via API, com SLA de atualização de 2 minutos
- Monitoramento de qualidade de dados e linhagem no Databricks, com alertas para desvios acima de 3% no volume esperado

Tecnologias principais: Databricks, Kafka.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Discovery e arquitetura (4 semanas)
- Ingestão Kafka e camadas bronze/silver (8 semanas)
- Features e camada gold no Databricks (10 semanas)
- Integração, testes e go-live (6 semanas)

## 5. Entregáveis

- Pipeline de streaming Kafka-Databricks em produção para 100% dos eventos de crédito
- Catálogo de 45 features de risco documentadas e versionadas no Databricks
- Camada gold integrada ao motor antifraude com SLA de 2 minutos
- Dashboards de monitoramento de qualidade e linhagem de dados
- Documentação técnica e transferência de conhecimento para o time interno

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em streaming e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e atraso na entrega dos eventos pelos sistemas de origem
- Risco: Latência do motor antifraude do cliente incompatível com o SLA de 2 minutos
- Risco: Dependência de aprovação de segurança para tráfego de dados sensíveis

## 8. Investimento

Investimento total: R$ 1.130.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 38%.
