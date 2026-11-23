---
projeto_id: P568
cliente: Química Fênix
titulo: Manutenção Preditiva de Ativos Industriais com Azure e Databricks
segmento: Manufatura
tecnologias: ["Azure","Databricks"]
servicos: ["Engenharia de Dados"]
area: AI & Automation
dono: Vinícius Batista
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P568
id: P568-PROPV1
tipo_documental: proposta_comercial
status_documento: rascunho
data: 2024-07-25
prazo_meses: 8
valor: 1360000
margem: 0.26
---

# Proposta Comercial — Manutenção Preditiva de Ativos Industriais com Azure e Databricks (versão 1, rascunho)

**Cliente:** Química Fênix
**Segmento:** Manufatura
**Área responsável:** AI & Automation · **Dono da proposta:** Vinícius Batista
**Data:** 2024-07-25 · **Versão:** 1 (rascunho)

## 1. Contexto e desafio

A Química Fênix enfrenta paradas não planejadas que geram perdas anuais de R$ 8,5 milhões, com 120 horas/mês de inatividade e 15% da produção comprometida. A falta de monitoramento contínuo e análise preditiva impede ações proativas, resultando em manutenções corretivas caras e riscos de segurança.

## 2. Objetivo

Implementar uma solução de manutenção preditiva baseada em dados de sensores, utilizando Azure e Databricks, para reduzir em 30% as paradas não planejadas e diminuir em 20% os custos de manutenção em 12 meses.

## 3. Escopo da solução

- Ingestão de dados de 500 sensores industriais via Azure IoT Hub e armazenamento no Azure Data Lake Storage Gen2
- Processamento e limpeza de dados com Databricks (PySpark) para criação de features e séries temporais
- Desenvolvimento de modelos de machine learning para previsão de falhas usando Databricks ML e Azure Machine Learning
- Integração dos alertas preditivos ao sistema de manutenção existente (SAP PM) via APIs
- Dashboard de monitoramento em tempo real no Power BI com indicadores de saúde dos ativos

Tecnologias principais: Azure, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Fase 1 - Discovery e Planejamento: 4 semanas
- Fase 2 - Engenharia de Dados e Ingestão: 8 semanas
- Fase 3 - Modelagem Preditiva e Validação: 8 semanas
- Fase 4 - Implantação e Treinamento: 6 semanas

## 5. Entregáveis

- Pipeline de dados automatizado no Azure Data Factory para ingestão de dados dos sensores
- Modelo preditivo treinado e validado com acurácia mínima de 85% para previsão de falhas em 30 dias
- Documentação técnica da arquitetura e dos processos de engenharia de dados
- Dashboard interativo no Power BI com visualização de alertas e tendências
- Relatório de resultados com análise de impacto e recomendações de melhoria contínua

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade dos dados dos sensores (ruídos e falhas de leitura)
- Risco: Resistência dos operadores à mudança de processo
- Risco: Integração com sistemas legados (SAP PM) complexa

## 8. Investimento

Investimento total: R$ 1.360.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 26%.
