---
projeto_id: P597
cliente: Cargas Rodo Sul
titulo: Manutenção Preditiva de Ativos com Azure e SAP para Operação Logística
segmento: Logística
tecnologias: ["Azure","SAP"]
servicos: ["Data Science / ML","Change Management"]
area: AI & Automation
dono: Karina Duarte
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P597
id: P597-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-03-04
prazo_meses: 10
valor: 1280000
margem: 0.24
---

# Proposta Comercial — Manutenção Preditiva de Ativos com Azure e SAP para Operação Logística

**Cliente:** Cargas Rodo Sul
**Segmento:** Logística
**Área responsável:** AI & Automation · **Dono da proposta:** Karina Duarte
**Data:** 2026-03-04 · **Versão:** final

## 1. Contexto e desafio

A Cargas Rodo Sul opera uma frota de 1.850 ativos entre cavalos mecânicos, carretas e empilhadeiras, com 14% de paradas não planejadas que geram R$ 2,3 milhões/ano em custos de manutenção corretiva e perda de SLA. A manutenção hoje é preventiva por calendário, sem uso dos dados de telemetria e de ordens do SAP, o que antecipa trocas desnecessárias e não evita falhas críticas em rota.

## 2. Objetivo

Implantar modelos de manutenção preditiva que antecipem falhas em 7 a 15 dias, reduzindo paradas não planejadas em 30% e o custo de manutenção corretiva em 20% até o fim do projeto.

## 3. Escopo da solução

- Ingestão e tratamento de telemetria de sensores (temperatura, vibração, pressão) e dados de ordens de manutenção do SAP em Azure Data Lake e Azure Data Factory
- Construção de feature store e pipelines de dados em Azure Databricks para 1.850 ativos com histórico de 24 meses
- Desenvolvimento de modelos de ML de classificação de falha e regressão de vida útil restante (RUL) em Azure Machine Learning, com acurácia mínima de 85%
- Integração dos scores preditivos ao SAP PM via APIs, gerando alertas e ordens de manutenção sugeridas automaticamente
- Plano de Change Management com treinamento de 120 usuários de manutenção e oficinas com gestores de frota em 6 filiais

Tecnologias principais: Azure, SAP.

## 4. Abordagem e cronograma

O projeto será executado em 10 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (10 semanas)
- Modelagem e validação de ML (14 semanas)
- Integração com SAP e piloto em 2 filiais (10 semanas)
- Rollout, treinamento e sustentação (6 semanas)

## 5. Entregáveis

- Pipeline de dados de telemetria e SAP operacional em produção no Azure, com SLA de atualização de 15 minutos
- Dois modelos preditivos validados (classificação de falha e RUL) com relatório de performance e matriz de confusão
- Integração dos alertas preditivos ao SAP PM com 3 cenários de manutenção automatizados
- Dashboard de gestão de ativos com indicadores de risco e economia gerada, em Power BI sobre Azure
- Programa de Change Management concluído: 120 usuários treinados, 6 filiais engajadas e plano de adoção com metas de uso

## 6. Equipe proposta

1 arquiteto de dados Azure, 2 engenheiros de dados, 2 cientistas de dados, 1 consultor SAP PM, 1 especialista em Change Management e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e lacunas na telemetria de ativos mais antigos, comprometendo a acurácia dos modelos
- Risco: Baixa adesão dos times de manutenção às ordens sugeridas pelo SAP
- Risco: Restrições de integração e janelas de manutenção no ambiente SAP do cliente

## 8. Investimento

Investimento total: R$ 1.280.000, em parcelas mensais ao longo de 10 meses.

Margem praticada: 24%.
