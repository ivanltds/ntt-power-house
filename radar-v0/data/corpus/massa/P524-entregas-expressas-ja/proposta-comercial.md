---
projeto_id: P524
cliente: Entregas Expressas Já
titulo: Manutenção Preditiva de Ativos Logísticos com Data Science e Databricks
segmento: Logística
tecnologias: ["Python","Databricks","SAP"]
servicos: ["Data Science / ML","Engenharia de Dados"]
area: AI & Automation
dono: Yuri Monteiro
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P524
id: P524-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-09-09
prazo_meses: 5
valor: 900000
margem: 0.2
---

# Proposta Comercial — Manutenção Preditiva de Ativos Logísticos com Data Science e Databricks

**Cliente:** Entregas Expressas Já
**Segmento:** Logística
**Área responsável:** AI & Automation · **Dono da proposta:** Yuri Monteiro
**Data:** 2026-09-09 · **Versão:** final

## 1. Contexto e desafio

A Entregas Expressas Já opera com cerca de 1.200 ativos críticos (empilhadeiras, esteiras e veículos de pátio) e registra hoje uma taxa de paradas não planejadas de 14% ao mês, gerando atrasos em 8% das entregas e um custo estimado de R$ 2,3 milhões por ano em manutenção corretiva e horas perdidas. Os dados de sensores e ordens de manutenção estão dispersos entre SAP e planilhas, sem um modelo analítico que antecipe falhas.

## 2. Objetivo

Implantar um modelo de manutenção preditiva que antecipe falhas em ativos críticos com pelo menos 72 horas de antecedência, reduzindo as paradas não planejadas em 25% ao longo do projeto.

## 3. Escopo da solução

- Ingestão e integração dos dados de sensores IoT e ordens de manutenção do SAP em pipeline de Engenharia de Dados no Databricks
- Desenvolvimento de modelos de Data Science / ML em Python para previsão de falha por ativo, com janela de 72 horas
- Construção de camada de features e histórico de manutenção no Databricks, com governança e versionamento
- Integração dos alertas preditivos ao fluxo de ordens do SAP para acionamento da manutenção
- Dashboard de acompanhamento de acurácia, recall e impacto nas paradas não planejadas

Tecnologias principais: Python, Databricks, SAP.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e engenharia de dados (6 semanas)
- Modelagem e validação em Python (8 semanas)
- Integração com SAP e piloto em 200 ativos (4 semanas)
- Rollout e transferência de conhecimento (2 semanas)

## 5. Entregáveis

- Pipeline de dados de sensores e SAP operando em rotina diária no Databricks
- Modelo preditivo treinado e validado para as 3 famílias de ativos críticos, com recall mínimo de 80%
- Integração dos alertas ao SAP com regras de priorização de ordens
- Relatório de avaliação de impacto com comparativo de paradas antes e depois
- Documentação técnica e treinamento de 2 analistas do cliente para operar os modelos

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e cobertura irregular dos dados de sensores em parte da frota
- Risco: Baixa adesão dos times de manutenção aos alertas preditivos
- Risco: Restrições de acesso e latência na integração com o SAP

## 8. Investimento

Investimento total: R$ 900.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 20%.
