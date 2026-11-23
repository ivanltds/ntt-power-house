---
projeto_id: P363
cliente: Casa & Construção Prime
titulo: Detecção de Fraude em Transações no Varejo de Materiais de Construção
segmento: Varejo
tecnologias: ["Azure","Python","Databricks"]
servicos: ["Data Science / ML","Engenharia de Dados"]
area: AI & Automation
dono: Paulo Henrique Dias
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P363
id: P363-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-07-09
prazo_meses: 6
valor: 460000
margem: 0.29
---

# Proposta Comercial — Detecção de Fraude em Transações no Varejo de Materiais de Construção

**Cliente:** Casa & Construção Prime
**Segmento:** Varejo
**Área responsável:** AI & Automation · **Dono da proposta:** Paulo Henrique Dias
**Data:** 2026-07-09 · **Versão:** final

## 1. Contexto e desafio

A Casa & Construção Prime processa cerca de 1,2 milhão de transações por mês em 87 lojas físicas e no canal e-commerce, com perdas estimadas em 0,9% do faturamento por fraudes em pedidos e estornos indevidos. A análise manual atual cobre apenas 15% dos casos suspeitos, com tempo médio de detecção de 72 horas e alto índice de falsos positivos.

## 2. Objetivo

Implantar um motor de detecção de fraude em tempo quase real que reduza as perdas por fraude e aumente a precisão na identificação de transações suspeitas, priorizando os casos de maior risco para análise humana.

## 3. Escopo da solução

- Construção de pipelines de ingestão e tratamento de dados transacionais no Azure Data Lake e Databricks, integrando 87 lojas e o e-commerce
- Desenvolvimento de modelos de machine learning em Python para scoring de risco de fraude por transação, com explicabilidade das features
- Implementação de camada de feature engineering e orquestração de jobs no Databricks para atualização diária dos scores
- Criação de painéis de monitoramento e fila priorizada de alertas integrada aos sistemas de análise de pedidos
- Definição de métricas de avaliação, testes de backtesting e rotina de retreinamento dos modelos

Tecnologias principais: Azure, Python, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e arquitetura de dados (5 semanas)
- Engenharia de dados e feature engineering (7 semanas)
- Desenvolvimento e validação dos modelos de ML (8 semanas)
- Go-live, monitoramento e transferência de conhecimento (6 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e modelo de detecção de fraude
- Pipelines de dados em produção no Azure e Databricks com 1,2 milhão de transações/mês processadas
- Modelo de scoring de fraude em Python com AUC superior a 0,85 em validação
- Painel operacional de alertas com fila priorizada para o time de prevenção a fraudes
- Relatório de backtesting e plano de retreinamento mensal dos modelos

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e completude dos dados históricos de transações
- Risco: Volume elevado de falsos positivos impactando a operação
- Risco: Baixa adoção da fila de alertas pelo time de prevenção a fraudes

## 8. Investimento

Investimento total: R$ 460.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 29%.
