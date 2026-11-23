---
projeto_id: P291
cliente: Conecta Brasil Telecom
titulo: Plataforma de streaming de dados em tempo real para analytics de rede
segmento: Telecom
tecnologias: ["Python","Azure"]
servicos: ["Analytics & BI"]
area: Data & Analytics
dono: Zilda Correia
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P291
id: P291-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-02-17
prazo_meses: 7
valor: 720000
margem: 0.21
---

# Proposta Comercial — Plataforma de streaming de dados em tempo real para analytics de rede

**Cliente:** Conecta Brasil Telecom
**Segmento:** Telecom
**Área responsável:** Data & Analytics · **Dono da proposta:** Zilda Correia
**Data:** 2026-02-17 · **Versão:** final

## 1. Contexto e desafio

A Conecta Brasil Telecom monitora cerca de 4,2 milhões de linhas móveis e 780 mil assinantes de banda larga, mas os painéis de qualidade de rede são atualizados apenas a cada 6 horas, gerando atraso na detecção de incidentes. Isso resulta em um tempo médio de resposta a falhas de 3h40 e em multas regulatórias de aproximadamente R$ 1,8 milhão no último ano.

## 2. Objetivo

Implantar uma plataforma de streaming em tempo real no Azure, com processamento em Python, para reduzir a latência dos indicadores de rede de horas para menos de 2 minutos e subsidiar ações proativas de operação e analytics.

## 3. Escopo da solução

- Ingestão contínua de eventos de rede (CDRs, KPIs de células e alarmes) via Azure Event Hubs, com volume estimado de 25 mil eventos por segundo
- Processamento de streams em Python com Azure Databricks Structured Streaming para cálculo de indicadores de qualidade em janelas de 1 e 5 minutos
- Camada analítica no Azure Synapse Analytics com tabelas Delta Lake para consultas históricas e em tempo quase real
- Painéis de Analytics & BI no Power BI conectados ao Synapse, com atualização automática a cada 2 minutos e alertas de anomalia
- Pipeline CI/CD para deploy dos jobs Python, monitoramento com Azure Monitor e política de retenção de 13 meses

Tecnologias principais: Python, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Discovery e arquitetura (5 semanas)
- Ingestão e processamento de streams (10 semanas)
- Camada analítica e painéis de BI (9 semanas)
- Homologação, go-live e transferência de conhecimento (4 semanas)

## 5. Entregáveis

- Arquitetura de referência de streaming aprovada, incluindo dimensionamento de Event Hubs e Databricks
- Pipeline de ingestão e processamento em Python operando com latência ponta a ponta inferior a 2 minutos
- Modelo analítico no Synapse com 18 indicadores de qualidade de rede e histórico de 13 meses
- Conjunto de 6 painéis de Analytics & BI no Power BI com alertas automáticos de degradação
- Documentação técnica, runbooks de operação e treinamento de 16 horas para 8 analistas do cliente

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Volume real de eventos acima do estimado, exigindo redimensionamento do Event Hubs
- Risco: Qualidade e padronização dos dados de origem de diferentes sistemas de rede
- Risco: Baixa adoção dos novos painéis pelas áreas operacionais

## 8. Investimento

Investimento total: R$ 720.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 21%.
