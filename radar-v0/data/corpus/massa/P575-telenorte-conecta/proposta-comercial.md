---
projeto_id: P575
cliente: TeleNorte Conecta
titulo: Manutenção Preditiva de Ativos de Rede com Machine Learning e SAP
segmento: Telecom
tecnologias: ["SAP","Python","Machine Learning"]
servicos: ["Data Science / ML","Engenharia de Dados"]
area: AI & Automation
dono: João Pedro Sales
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P575
id: P575-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-06-27
prazo_meses: 6
valor: 1730000
margem: 0.18
---

# Proposta Comercial — Manutenção Preditiva de Ativos de Rede com Machine Learning e SAP

**Cliente:** TeleNorte Conecta
**Segmento:** Telecom
**Área responsável:** AI & Automation · **Dono da proposta:** João Pedro Sales
**Data:** 2025-06-27 · **Versão:** final

## 1. Contexto e desafio

A TeleNorte Conecta opera cerca de 4.200 ativos críticos de rede (OLTs, roteadores de borda e equipamentos de transmissão) e registra hoje 18% de indisponibilidade não planejada por trimestre, com custo estimado de R$ 2,3 milhões em multas regulatórias e horas técnicas. A base de falhas está dispersa entre ordens de manutenção no SAP e planilhas de campo, sem modelo analítico que antecipe degradações.

## 2. Objetivo

Implantar um modelo de manutenção preditiva que antecipe falhas de ativos críticos com pelo menos 72 horas de antecedência, reduzindo a indisponibilidade não planejada em 25% em 6 meses.

## 3. Escopo da solução

- Diagnóstico e integração dos históricos de manutenção corretiva e preventiva do SAP (PM/CS) com telemetria de rede em pipeline Python
- Engenharia de dados para consolidação de 36 meses de eventos em data lake, com tratamento de dados faltantes e padronização de ativos
- Desenvolvimento de modelos de Machine Learning de classificação de risco de falha e regressão de tempo até a falha por família de equipamento
- Painel de priorização de ordens preditivas integrado ao SAP para a equipe de field service
- Definição de rotina de monitoramento de deriva dos modelos e retreino trimestral

Tecnologias principais: SAP, Python, Machine Learning.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (6 semanas)
- Engenharia de dados e feature store (8 semanas)
- Modelagem e validação com especialistas de campo (7 semanas)
- Integração com SAP, painel e transferência de conhecimento (5 semanas)

## 5. Entregáveis

- Relatório de diagnóstico de qualidade dos dados e mapa de ativos críticos
- Pipeline de engenharia de dados em Python para ingestão SAP e telemetria
- Modelos de Machine Learning treinados e validados para as 5 famílias de ativos prioritárias
- Painel de risco preditivo integrado ao SAP com alertas de 72 horas
- Documentação técnica, playbook de operação e treinamento de 12 analistas do cliente

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados sênior, 1 especialista SAP e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Histórico de falhas insuficiente em parte das famílias de ativos
- Risco: Baixa aderência da equipe de campo às ordens preditivas
- Risco: Qualidade e latência da telemetria de rede fora do controle do projeto

## 8. Investimento

Investimento total: R$ 1.730.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 18%.
