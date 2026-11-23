---
projeto_id: P123
cliente: Gás Canalizado Litoral
titulo: Plataforma de streaming de dados em tempo real para distribuição de gás canalizado
segmento: Utilities / Energia
tecnologias: ["AWS","Azure"]
servicos: ["Analytics & BI"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: confidencial
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P123
id: P123-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-02-25
prazo_meses: 8
valor: 660000
margem: 0.3
---

# Proposta Comercial — Plataforma de streaming de dados em tempo real para distribuição de gás canalizado

**Cliente:** Gás Canalizado Litoral
**Segmento:** Utilities / Energia
**Área responsável:** Data & Analytics · **Dono da proposta:** Nelson Barbosa
**Data:** 2026-02-25 · **Versão:** final

## 1. Contexto e desafio

A Gás Canalizada Litoral opera 1.850 km de rede e 320 mil unidades consumidoras, mas a telemetria de pressão e vazão chega com atraso de até 4 horas, em lotes noturnos. Isso impede a detecção imediata de anomalias e gera perdas estimadas em 2,3% do volume distribuído por ano.

## 2. Objetivo

Implantar uma plataforma de ingestão e processamento de dados em tempo real na AWS e no Azure, com painéis de Analytics & BI para monitoramento operacional contínuo da rede.

## 3. Escopo da solução

- Ingestão de eventos de 1.200 sensores de pressão e vazão via AWS Kinesis e Azure Event Hubs
- Processamento de streams em tempo quase real com camada de dados unificada entre AWS e Azure
- Catálogo de dados e governança para 45 tabelas operacionais críticas
- Painéis de Analytics & BI com latência máxima de 30 segundos para o centro de controle
- Alertas automáticos de anomalia de pressão com integração ao sistema de despacho de campo

Tecnologias principais: AWS, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Diagnóstico e arquitetura (6 semanas)
- Construção dos pipelines de streaming (12 semanas)
- Painéis de BI e alertas (10 semanas)
- Homologação e go-live assistido (4 semanas)

## 5. Entregáveis

- Arquitetura de referência de streaming multi-cloud documentada
- Pipeline de ingestão e processamento em tempo real em produção
- Catálogo de dados com 45 tabelas governadas
- Conjunto de 8 painéis operacionais no centro de controle
- Plano de alertas automatizados e runbook de operação

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Latência de rede nos 1.200 sensores de campo
- Risco: Integração entre as camadas AWS e Azure
- Risco: Baixa adesão dos operadores ao novo centro de controle

## 8. Investimento

Investimento total: R$ 660.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 30%.
