---
projeto_id: P418
cliente: NetVale Provedor
titulo: Streaming de dados em tempo real para operações de telecom
segmento: Telecom
tecnologias: ["Kafka","Azure","Python"]
servicos: ["Engenharia de Dados","Analytics & BI"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P418
id: P418-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-10-06
prazo_meses: 9
valor: 1000000
margem: 0.18
---

# Proposta Comercial — Streaming de dados em tempo real para operações de telecom

**Cliente:** NetVale Provedor
**Segmento:** Telecom
**Área responsável:** Data & Analytics · **Dono da proposta:** Henrique Matos
**Data:** 2026-10-06 · **Versão:** final

## 1. Contexto e desafio

A NetVale Provedor processa hoje cerca de 180 milhões de eventos mensais de rede e consumo em lotes noturnos, com latência média de 6 a 8 horas para relatórios operacionais. Isso limita a detecção de falhas de rede e o monitoramento de consumo em quase tempo real, impactando a experiência de aproximadamente 420 mil assinantes.

## 2. Objetivo

Implantar uma plataforma de streaming de dados em tempo real na Azure com Kafka e Python, reduzindo a latência de eventos críticos para menos de 5 minutos e habilitando analytics operacional contínuo.

## 3. Escopo da solução

- Provisionamento e configuração de cluster Kafka gerenciado na Azure para ingestão de eventos de rede e consumo
- Desenvolvimento de produtores e consumidores em Python para captura e normalização de streams
- Construção de pipelines de engenharia de dados com camadas bronze, prata e ouro em armazenamento Azure
- Modelagem de indicadores operacionais e dashboards de Analytics & BI atualizados em janelas de até 5 minutos
- Configuração de monitoramento, alertas e políticas de retenção e segurança dos tópicos Kafka

Tecnologias principais: Kafka, Azure, Python.

## 4. Abordagem e cronograma

O projeto será executado em 9 meses, nas seguintes fases:

- Discovery e arquitetura (6 semanas)
- Implementação da ingestão Kafka e pipelines Python (14 semanas)
- Analytics, dashboards e integração de indicadores (12 semanas)
- Homologação, go-live e estabilização (4 semanas)

## 5. Entregáveis

- Cluster Kafka em produção na Azure com capacidade para 250 mil eventos por minuto
- Conjunto de jobs Python de ingestão e transformação documentados e versionados
- Camada analítica com 12 indicadores operacionais atualizados em tempo quase real
- Dashboards de Analytics & BI publicados para as áreas de operações e comercial
- Runbook de operação, alertas e plano de contingência da plataforma de streaming

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Volume de eventos acima do previsto nos horários de pico
- Risco: Qualidade e padronização dos eventos emitidos pelos sistemas de origem
- Risco: Dependência de liberações de acesso e rede pela equipe de infraestrutura do cliente

## 8. Investimento

Investimento total: R$ 1.000.000, em parcelas mensais ao longo de 9 meses.

Margem praticada: 18%.
