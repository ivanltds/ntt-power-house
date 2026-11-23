---
projeto_id: P535
cliente: Companhia de Saneamento Rio Claro
titulo: Manutenção preditiva de ativos com Kafka e Machine Learning
segmento: Utilities / Energia
tecnologias: ["Kafka","Machine Learning"]
servicos: ["Data Science / ML"]
area: AI & Automation
dono: Paulo Henrique Dias
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P535
id: P535-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-01-29
prazo_meses: 6
valor: 1010000
margem: 0.23
---

# Proposta Comercial — Manutenção preditiva de ativos com Kafka e Machine Learning

**Cliente:** Companhia de Saneamento Rio Claro
**Segmento:** Utilities / Energia
**Área responsável:** AI & Automation · **Dono da proposta:** Paulo Henrique Dias
**Data:** 2026-01-29 · **Versão:** final

## 1. Contexto e desafio

A Companhia de Saneamento Rio Claro opera cerca de 1.200 ativos críticos (bombas, motores e válvulas) distribuídos em 34 unidades, com paradas não planejadas que consomem aproximadamente 18% das horas de manutenção e elevam o custo operacional em cerca de R$ 2,4 milhões por ano. O histórico de falhas está fragmentado em planilhas e sistemas legados, sem telemetria em tempo real que permita antecipar degradações.

## 3. Escopo da solução

- Ingestão de telemetria de sensores de vibração, temperatura e pressão de 1.200 ativos em tópicos Kafka com latência inferior a 5 segundos
- Construção de pipeline de features e data lake para histórico de falhas e eventos de manutenção
- Treinamento e validação de modelos de Machine Learning de classificação de risco e estimativa de vida útil remanescente por família de ativos
- Integração dos alertas preditivos ao sistema de ordens de serviço do cliente via API, com priorização automática
- Painel de monitoramento de saúde dos ativos e acompanhamento de indicadores de manutenção em tempo quase real

Tecnologias principais: Kafka, Machine Learning.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (6 semanas)
- Ingestão Kafka e engenharia de features (6 semanas)
- Modelagem e validação de Machine Learning (8 semanas)
- Integração, painéis e go-live assistido (4 semanas)

## 5. Entregáveis

- Pipeline Kafka de ingestão de telemetria em produção para as 34 unidades
- Catálogo de features e base histórica tratada cobrindo 24 meses de eventos de manutenção
- Modelos de Machine Learning treinados e validados para as 5 famílias de ativos prioritárias, com precisão mínima de 85%
- Integração dos alertas preditivos ao sistema de ordens de serviço e painel de saúde dos ativos
- Relatório de resultados parciais e plano de expansão para os demais ativos

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e cobertura irregular dos sensores em parte dos ativos
- Risco: Baixa maturidade dos registros históricos de manutenção
- Risco: Resistência operacional à adoção dos alertas preditivos

## 8. Investimento

Investimento total: R$ 1.010.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 23%.
