---
projeto_id: P369
cliente: Agropecuária Terra Boa
titulo: Manutenção preditiva de ativos com streaming e ML para operação agropecuária
segmento: Agronegócio
tecnologias: ["Python","Kafka","Machine Learning"]
servicos: ["Engenharia de Dados","Data Science / ML"]
area: AI & Automation
dono: Yuri Monteiro
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P369
id: P369-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-05-10
prazo_meses: 7
valor: 1230000
margem: 0.26
---

# Proposta Comercial — Manutenção preditiva de ativos com streaming e ML para operação agropecuária

**Cliente:** Agropecuária Terra Boa
**Segmento:** Agronegócio
**Área responsável:** AI & Automation · **Dono da proposta:** Yuri Monteiro
**Data:** 2026-05-10 · **Versão:** final

## 1. Contexto e desafio

A Agropecuária Terra Boa opera 42 unidades produtivas com cerca de 380 ativos críticos (bombas, tratores, ordenhadeiras e sistemas de climatização) monitorados de forma reativa, o que gera em média 9 horas de parada não planejada por mês e custo estimado de R$ 1,2 milhão por ano. Os dados de sensores chegam em planilhas e sistemas isolados, sem padronização ou histórico confiável para apoiar decisões de manutenção.

## 2. Objetivo

Implantar uma plataforma de manutenção preditiva que ingira telemetria em tempo real e aplique modelos de Machine Learning para antecipar falhas em ativos críticos, reduzindo paradas não planejadas em pelo menos 25% em 7 meses.

## 3. Escopo da solução

- Construção de pipeline de ingestão de telemetria em Python e Kafka, com capacidade para 5 mil eventos por segundo e janelas de até 30 segundos de latência
- Padronização e modelagem de dados históricos de sensores e ordens de serviço em camadas bronze, prata e ouro
- Desenvolvimento de modelos de Machine Learning de detecção de anomalias e previsão de falha para 6 classes de ativos, com meta de acurácia mínima de 85%
- Integração dos alertas preditivos ao processo de manutenção por meio de API e painel de acompanhamento de saúde dos ativos
- Definição de rotinas de retreinamento e monitoramento de deriva dos modelos em produção

Tecnologias principais: Python, Kafka, Machine Learning.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Diagnóstico e engenharia de dados (8 semanas)
- Desenvolvimento e validação dos modelos de ML (10 semanas)
- Integração, piloto em 3 unidades e treinamento (7 semanas)
- Go-live e estabilização (3 semanas)

## 5. Entregáveis

- Pipeline de streaming em Kafka e Python em operação para 100% dos ativos críticos priorizados
- Catálogo de dados e dicionário de variáveis dos sensores das 42 unidades produtivas
- Seis modelos de Machine Learning validados com relatório de desempenho e limiares de alerta
- Painel de saúde de ativos e API de alertas integrada ao fluxo de manutenção
- Plano de operação, retreinamento e governança dos modelos para os 12 meses seguintes

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 especialista de integração.

## 7. Premissas e riscos

- Risco: Qualidade e cobertura insuficiente da telemetria histórica dos sensores
- Risco: Baixa adesão das equipes de campo aos alertas preditivos
- Risco: Atraso na liberação de acesso aos sistemas de manutenção e ordens de serviço

## 8. Investimento

Investimento total: R$ 1.230.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 26%.
