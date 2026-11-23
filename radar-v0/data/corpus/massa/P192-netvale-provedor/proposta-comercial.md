---
projeto_id: P192
cliente: NetVale Provedor
titulo: Pipeline de Dados em Tempo Real com Streaming Kafka no Azure
segmento: Telecom
tecnologias: ["Kafka","Azure","Python"]
servicos: ["Engenharia de Dados","Analytics & BI"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P192
id: P192-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-09-20
prazo_meses: 5
valor: 1080000
margem: 0.21
---

# Proposta Comercial — Pipeline de Dados em Tempo Real com Streaming Kafka no Azure

**Cliente:** NetVale Provedor
**Segmento:** Telecom
**Área responsável:** Data & Analytics · **Dono da proposta:** Henrique Matos
**Data:** 2026-09-20 · **Versão:** final

## 1. Contexto e desafio

A NetVale Provedor monitora hoje cerca de 480 mil assinantes de banda larga e TV, mas os indicadores de consumo e qualidade de rede chegam aos painéis com atraso de até 6 horas, gerando retrabalho na operação e perda estimada de 3% em receita de upgrades. A base de dados atual também não suporta picos de 12 mil eventos por segundo durante janelas de manutenção e lançamentos comerciais.

## 2. Objetivo

Implantar uma plataforma de streaming de dados em tempo real no Azure para disponibilizar indicadores operacionais e comerciais em menos de 2 minutos após o evento, com processamento escalável e integração analítica.

## 3. Escopo da solução

- Implementação de cluster Kafka (Event Hubs compatível) no Azure para ingestão de eventos de rede e CRM, com throughput inicial de 12 mil mensagens por segundo
- Desenvolvimento de pipelines de processamento em Python para enriquecimento, deduplicação e agregação de eventos em janelas de 1 minuto
- Modelagem e carga em camada analítica (Azure Data Lake e Synapse) para consumo por ferramentas de BI
- Criação de 18 indicadores operacionais em tempo real (disponibilidade, consumo, falhas por região) com atualização a cada 60 segundos
- Configuração de monitoramento, alertas e política de retenção de 90 dias para tópicos de streaming

Tecnologias principais: Kafka, Azure, Python.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Discovery e arquitetura de streaming (4 semanas)
- Implementação de ingestão Kafka e pipelines Python (8 semanas)
- Modelagem analítica e painéis de BI em tempo real (6 semanas)
- Homologação, go-live e transferência de conhecimento (2 semanas)

## 5. Entregáveis

- Documento de arquitetura de referência do pipeline de streaming no Azure com Kafka e Python
- Pipeline de ingestão e processamento em produção suportando 12 mil eventos por segundo
- Camada analítica integrada com 18 indicadores operacionais em tempo real
- Painéis de BI com atualização automática a cada 60 segundos para 4 áreas de negócio
- Runbook de operação, monitoramento e plano de contingência para falhas de streaming

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Volume de eventos acima do previsto durante picos de tráfego
- Risco: Qualidade e padronização dos eventos originados em sistemas legados
- Risco: Dependência de janelas de manutenção para testes em ambiente produtivo

## 8. Investimento

Investimento total: R$ 1.080.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 21%.
