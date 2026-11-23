---
projeto_id: P160
cliente: Gás Canalizado Litoral
titulo: Manutenção preditiva de ativos de distribuição com Azure, Databricks e SAP
segmento: Utilities / Energia
tecnologias: ["Azure","Databricks","SAP","Python"]
servicos: ["Data Science / ML"]
area: AI & Automation
dono: Yuri Monteiro
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P160
id: P160-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-06-09
prazo_meses: 6
valor: 1610000
margem: 0.19
---

# Proposta Comercial — Manutenção preditiva de ativos de distribuição com Azure, Databricks e SAP

**Cliente:** Gás Canalizado Litoral
**Segmento:** Utilities / Energia
**Área responsável:** AI & Automation · **Dono da proposta:** Yuri Monteiro
**Data:** 2026-06-09 · **Versão:** final

## 1. Contexto e desafio

A Gás Canalizado Litoral opera cerca de 4.200 km de rede e 38 estações de redução de pressão, com paradas não programadas que consumiram 11.400 horas de operação no último ano e geraram R$ 7,8 milhões em custos de contingência. Hoje a manutenção é majoritariamente corretiva e preventiva por calendário, com dados de sensores dispersos entre o SAP PM e planilhas locais, sem modelo analítico para antecipar falhas.

## 3. Escopo da solução

- Ingestão e orquestração dos dados de sensores IoT e histórico de manutenção do SAP PM no Azure Data Lake, com pipelines em Databricks
- Feature engineering e treinamento de modelos de classificação e regressão em Python no Databricks para previsão de falha e RUL (vida útil remanescente)
- Integração dos scores preditivos ao SAP PM para geração automática de ordens de serviço priorizadas
- Dashboard de saúde de ativos e alertas operacionais no Azure, consumindo tabelas Delta do Databricks
- Pipeline MLOps com versionamento, monitoramento de drift e retreino mensal dos modelos

Tecnologias principais: Azure, Databricks, SAP, Python.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (6 semanas)
- Modelagem e validação com especialistas de manutenção (10 semanas)
- Integração com SAP PM e dashboards (6 semanas)
- Go-live assistido e transferência de conhecimento (2 semanas)

## 5. Entregáveis

- Data lake estruturado com 18 meses de histórico de sensores e manutenção integrados
- Modelos preditivos treinados e validados para 3 famílias de ativos críticos, com métricas de recall e MAE documentadas
- Integração em produção entre scores preditivos e SAP PM, com 100% das ordens críticas priorizadas automaticamente
- Dashboard de saúde de ativos e alertas para a central de operações
- Documentação técnica, runbooks de MLOps e transferência de conhecimento para a equipe interna

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 consultor SAP PM.

## 7. Premissas e riscos

- Risco: Qualidade e lacunas nos dados históricos de sensores de algumas estações
- Risco: Baixa adesão dos times de manutenção às recomendações do modelo
- Risco: Janelas de indisponibilidade limitadas para deploy em ambiente SAP produtivo

## 8. Investimento

Investimento total: R$ 1.610.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 19%.
