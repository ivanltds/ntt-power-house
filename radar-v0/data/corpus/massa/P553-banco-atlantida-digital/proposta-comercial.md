---
projeto_id: P553
cliente: Banco Atlântida Digital
titulo: Detecção de Fraude em Tempo Real com Databricks e Kafka no Banco Atlântida Digital
segmento: Serviços Financeiros
tecnologias: ["Kafka","Databricks","Azure","Python"]
servicos: ["Data Science / ML","Change Management"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P553
id: P553-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-05-27
prazo_meses: 4
valor: 840000
margem: 0.28
---

# Proposta Comercial — Detecção de Fraude em Tempo Real com Databricks e Kafka no Banco Atlântida Digital

**Cliente:** Banco Atlântida Digital
**Segmento:** Serviços Financeiros
**Área responsável:** AI & Automation · **Dono da proposta:** Bruno Tavares
**Data:** 2026-05-27 · **Versão:** final

## 1. Contexto e desafio

O Banco Atlântida Digital registra 2,3 milhões de transações/dia em canais digitais e enfrenta uma taxa de fraude de 0,42% do volume financeiro, com tempo médio de detecção de 36 horas. O modelo atual, baseado em regras estáticas, gera 1.800 falsos positivos por semana, sobrecarregando o time de análise e degradando a experiência de 480 mil clientes ativos.

## 2. Objetivo

Implantar uma plataforma de detecção de fraude em tempo real com modelos de ML, reduzindo o tempo de detecção para menos de 5 minutos e os falsos positivos em 40% em 4 meses.

## 3. Escopo da solução

- Ingestão de eventos transacionais via Kafka com throughput estimado de 60 msg/s e retenção de 7 dias
- Pipeline de features e treinamento de modelos de ML em Databricks com Python (scikit-learn e MLflow)
- Deploy de scoring em tempo real no Azure (AKS e Event Hubs) com latência alvo de 200 ms por transação
- Dashboard de monitoramento de modelos e alertas de drift no Azure Monitor
- Programa de Change Management para 35 analistas de risco e 12 engenheiros de dados

Tecnologias principais: Kafka, Databricks, Azure, Python.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Discovery e arquitetura (4 semanas)
- Desenvolvimento de modelos e pipelines (8 semanas)
- Piloto em produção e Change Management (4 semanas)

## 5. Entregáveis

- Arquitetura de referência da plataforma de fraude em tempo real em Azure
- Modelo de ML campeão com AUC >= 0,92 validado em backtest de 90 dias
- Pipeline de ingestão Kafka e processamento Databricks em produção
- Runbook operacional e painéis de monitoramento de fraude
- Plano de Change Management com treinamentos e comunicação para 47 colaboradores

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados sênior, 1 especialista em Change Management e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e atraso na entrega dos dados históricos de transações pelo cliente
- Risco: Latência do scoring em tempo real acima de 200 ms
- Risco: Baixa adesão dos analistas de risco ao novo fluxo de decisão

## 8. Investimento

Investimento total: R$ 840.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 28%.
