---
projeto_id: P411
cliente: TeleNorte Conecta
titulo: Pipeline de streaming em tempo real para rede e faturamento
segmento: Telecom
tecnologias: ["Kafka","Databricks","Python","Azure"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P411
id: P411-PROP
tipo_documental: proposta_comercial
status_documento: preliminar
data: 2026-10-17
prazo_meses: 7
valor: 860000
margem: 0.22
---

# Proposta Comercial — Pipeline de streaming em tempo real para rede e faturamento

**Cliente:** TeleNorte Conecta
**Segmento:** Telecom
**Área responsável:** Data & Analytics · **Dono da proposta:** Henrique Matos
**Data:** 2026-10-17 · **Versão:** final

## 1. Contexto e desafio

A TeleNorte Conecta processa cerca de 2,3 bilhões de eventos de rede e bilhetagem por mês, mas a integração entre sistemas ocorre em lotes noturnos, gerando latência de até 8 horas na visão de consumo e na detecção de falhas. Isso atrasa a cobrança de serviços digitais e limita a identificação proativa de incidentes que afetam 1,4 milhão de assinantes.

## 3. Escopo da solução

- Ingestão contínua de eventos de rede e bilhetagem com Apache Kafka no Azure Event Hubs, com tópicos particionados por domínio e retenção de 7 dias.
- Processamento de streams com Databricks Structured Streaming e pipelines em Python para enriquecimento, deduplicação e agregação de consumo por assinante.
- Camada analítica em Delta Lake no Azure Data Lake Storage, com tabelas silver e gold e atualização incremental em micro-lotes de 1 minuto.
- Orquestração e monitoramento de jobs no Azure Data Factory e Databricks Workflows, com alertas de lag de consumo e falhas de checkpoint.
- Governança de dados com Unity Catalog, incluindo linhagem, controle de acesso por domínio e catálogo de eventos em tempo real.

Tecnologias principais: Kafka, Databricks, Python, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Discovery e arquitetura de streaming (4 semanas)
- Construção dos pipelines de ingestão e processamento (10 semanas)
- Integração, qualidade de dados e monitoramento (8 semanas)
- Homologação, go-live e transferência de conhecimento (6 semanas)

## 5. Entregáveis

- Arquitetura de referência de streaming em Azure e Kafka aprovada em workshop técnico com as áreas de rede e faturamento.
- Pipelines de ingestão e processamento em Databricks e Python operando 24x7 em ambiente de produção.
- Tabelas Delta Lake silver e gold com dados de consumo e eventos de rede disponíveis em até 5 minutos.
- Painéis de monitoramento de lag, throughput e qualidade de dados com alertas configurados no Azure Monitor.
- Documentação de runbooks, playbooks de operação e transferência de conhecimento para a equipe interna de dados.

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em streaming e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Volume de eventos acima do previsto pode exigir reparticionamento dos tópicos Kafka.
- Risco: Dependência de liberação de acessos e conectividade com sistemas legados de bilhetagem.
- Risco: Qualidade inconsistente dos eventos de origem pode gerar retrabalho nas regras de deduplicação.

## 8. Investimento

Investimento total: R$ 860.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 22%.
