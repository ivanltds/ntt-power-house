---
projeto_id: P292
cliente: Consórcio União Nacional
titulo: Detecção de Fraude com Azure Databricks e Python para Consórcio União Nacional
segmento: Serviços Financeiros
tecnologias: ["Azure","Databricks","Python"]
servicos: ["Engenharia de Dados","Data Science / ML"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: confidencial
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P292
id: P292-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-06-11
prazo_meses: 8
valor: 2290000
margem: 0.32
---

# Proposta Comercial — Detecção de Fraude com Azure Databricks e Python para Consórcio União Nacional

**Cliente:** Consórcio União Nacional
**Segmento:** Serviços Financeiros
**Área responsável:** AI & Automation · **Dono da proposta:** Bruno Tavares
**Data:** 2026-06-11 · **Versão:** final

## 1. Contexto e desafio

O Consórcio União Nacional, atuante em serviços financeiros, processa cerca de 2,5 milhões de transações mensais e enfrenta um índice de fraude de 0,8%, resultando em perdas anuais estimadas em R$ 12 milhões. O atual modelo de detecção, baseado em regras estáticas, não consegue acompanhar o crescimento de 20% ao ano no volume de transações e apresenta alta taxa de falsos positivos (35%), sobrecarregando a equipe de análise manual.

## 2. Objetivo

Desenvolver e implantar uma solução de detecção de fraude em tempo real utilizando machine learning e engenharia de dados nas plataformas Azure e Databricks, visando reduzir perdas financeiras em 25% e diminuir falsos positivos em 40% em 8 meses.

## 3. Escopo da solução

- Construção de pipeline de ingestão e processamento de dados transacionais em Azure Databricks, integrando fontes como core bancário e sistemas de pagamento.
- Desenvolvimento de modelos de machine learning em Python (scikit-learn, XGBoost) para detecção de anomalias e classificação de fraudes, com treinamento e validação usando dados históricos.
- Implementação de feature store no Databricks para engenharia de atributos em tempo real e governança de dados.
- Criação de API de scoring em Azure Functions para integração com sistemas de autorização em tempo real, com latência inferior a 200 ms.
- Monitoramento contínuo de performance dos modelos e retreinamento automatizado utilizando MLflow e Azure DevOps.

Tecnologias principais: Azure, Databricks, Python.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Fase 1 - Discovery e Arquitetura: 6 semanas
- Fase 2 - Engenharia de Dados e Feature Store: 10 semanas
- Fase 3 - Desenvolvimento e Validação de Modelos: 12 semanas
- Fase 4 - Implantação e Go-Live: 4 semanas

## 5. Entregáveis

- Documento de arquitetura de dados e ML na Azure, incluindo diagramas de fluxo e definições de infraestrutura como código.
- Pipeline de dados batch e streaming no Databricks, com testes de qualidade e catálogo de dados.
- Modelos de detecção de fraude treinados e validados, com relatório de métricas (AUC > 0,90, recall > 0,80).
- API de scoring em produção, integrada ao sistema de autorização, com testes de carga e segurança.
- Dashboard de monitoramento de fraudes e performance dos modelos no Power BI, com alertas automatizados.

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade dos dados históricos insuficiente para treinamento dos modelos.
- Risco: Resistência das áreas de negócio à mudança de processo de análise de fraudes.
- Risco: Latência da API de scoring acima do exigido, impactando autorizações em tempo real.

## 8. Investimento

Investimento total: R$ 2.290.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 32%.
