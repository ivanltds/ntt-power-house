---
projeto_id: P167
cliente: Cooperativa Agro Vale Verde
titulo: Manutenção Preditiva de Ativos Industriais com SAP, Azure e Databricks
segmento: Agronegócio
tecnologias: ["SAP","Azure","Kafka","Databricks"]
servicos: ["Data Science / ML"]
area: AI & Automation
dono: Rafael Gonçalves
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P167
id: P167-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-03-05
prazo_meses: 8
valor: 1960000
margem: 0.38
---

# Proposta Comercial — Manutenção Preditiva de Ativos Industriais com SAP, Azure e Databricks

**Cliente:** Cooperativa Agro Vale Verde
**Segmento:** Agronegócio
**Área responsável:** AI & Automation · **Dono da proposta:** Rafael Gonçalves
**Data:** 2026-03-05 · **Versão:** final

## 1. Contexto e desafio

A Cooperativa Agro Vale Verde opera 3 unidades industriais com cerca de 1.200 ativos críticos monitorados apenas por manutenção corretiva e preventiva baseada em calendário, gerando 14% de paradas não planejadas e R$ 6,8 milhões/ano em perdas de produção. A ausência de dados integrados entre o SAP EAM e os sensores de campo impede prever falhas com antecedência.

## 2. Objetivo

Implantar uma plataforma de manutenção preditiva que antecipe falhas de ativos críticos em até 72 horas, reduzindo paradas não planejadas em 25% e conectando dados de sensores ao SAP em tempo quase real.

## 3. Escopo da solução

- Integração de dados de sensores e do SAP EAM via Apache Kafka para streaming contínuo de telemetria
- Pipeline de dados em Databricks no Azure para tratamento e feature engineering de séries temporais
- Desenvolvimento de modelos de ML para previsão de falhas (RUL) em 5 classes de ativos críticos
- Publicação de alertas e recomendações de manutenção no SAP PM por meio de APIs
- Dashboards de acompanhamento de indicadores de disponibilidade e acurácia dos modelos no Azure

Tecnologias principais: SAP, Azure, Kafka, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Diagnóstico e arquitetura de dados (6 semanas)
- Construção do pipeline e integração SAP/Kafka (10 semanas)
- Desenvolvimento e validação dos modelos de ML (12 semanas)
- Rollout em produção e transferência de conhecimento (4 semanas)

## 5. Entregáveis

- Arquitetura de dados e streaming documentada (Kafka + Azure + Databricks)
- Pipeline de dados de telemetria em produção para 1.200 ativos
- 5 modelos preditivos validados com acurácia mínima de 85%
- Integração de alertas preditivos no SAP PM em ambiente produtivo
- Painel de KPIs e relatório de ganhos de manutenção preditiva

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 especialista funcional SAP.

## 7. Premissas e riscos

- Risco: Qualidade e cobertura insuficiente dos sensores em parte dos ativos críticos
- Risco: Baixa adesão dos times de manutenção às recomendações do modelo
- Risco: Latência na integração com o SAP EAM em ambiente legado

## 8. Investimento

Investimento total: R$ 1.960.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 38%.
