---
projeto_id: P466
cliente: Distribuidora Luz do Cerrado
titulo: Streaming de dados em tempo real para operações de distribuição de energia
segmento: Utilities / Energia
tecnologias: ["Azure","AWS"]
servicos: ["Engenharia de Dados","Analytics & BI"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P466
id: P466-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2024-07-14
prazo_meses: 8
valor: 3610000
margem: 0.21
---

# Proposta Comercial — Streaming de dados em tempo real para operações de distribuição de energia

**Cliente:** Distribuidora Luz do Cerrado
**Segmento:** Utilities / Energia
**Área responsável:** Data & Analytics · **Dono da proposta:** Henrique Matos
**Data:** 2024-07-14 · **Versão:** final

## 1. Contexto e desafio

A Distribuidora Luz do Cerrado opera 1,2 milhão de unidades consumidoras e enfrenta latência de até 6 horas na consolidação de dados de medição e eventos de rede, o que atrasa a detecção de perdas e a resposta a anomalias. Cerca de 18% dos eventos críticos chegam ao centro de operações sem contexto analítico em tempo hábil.

## 2. Objetivo

Implantar uma plataforma de streaming de dados em tempo real para ingestão, processamento e analytics de eventos de medição e rede, reduzindo a latência de dados de horas para menos de 2 minutos.

## 3. Escopo da solução

- Ingestão contínua de eventos de medidores e sensores de rede via Azure Event Hubs e AWS Kinesis, com volume estimado de 4 TB/dia
- Pipeline de processamento em streaming com Azure Stream Analytics e AWS Lambda para enriquecimento e detecção de anomalias
- Camada analítica em tempo real com Azure Synapse Analytics e Amazon Redshift para dashboards operacionais
- Integração com sistemas legados de medição e gestão de ativos via APIs e conectores CDC
- Monitoramento e observabilidade do fluxo com Azure Monitor e Amazon CloudWatch, incluindo alertas de latência e falhas

Tecnologias principais: Azure, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Discovery e arquitetura (6 semanas)
- Construção dos pipelines de streaming (14 semanas)
- Analytics e dashboards em tempo real (8 semanas)
- Homologação e go-live assistido (4 semanas)

## 5. Entregáveis

- Arquitetura de referência de streaming multi-cloud documentada e validada
- Pipeline de ingestão e processamento em tempo real em produção para 100% dos medidores prioritários
- Painéis de Analytics & BI com latência inferior a 2 minutos para o centro de operações
- Catálogo de dados e políticas de governança para os fluxos em streaming
- Plano de operação assistida e runbook de incidentes para a plataforma de streaming

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em analytics e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Latência e throughput dos conectores legados de medição
- Risco: Complexidade de operação simultânea em Azure e AWS
- Risco: Dependência de janelas de manutenção dos sistemas de campo

## 8. Investimento

Investimento total: R$ 3.610.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 21%.
