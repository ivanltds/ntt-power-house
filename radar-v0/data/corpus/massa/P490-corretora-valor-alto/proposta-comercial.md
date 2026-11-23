---
projeto_id: P490
cliente: Corretora Valor Alto
titulo: Motor de detecção de fraude em transações com Machine Learning e Azure
segmento: Serviços Financeiros
tecnologias: ["Machine Learning","Python","Azure"]
servicos: ["Engenharia de Dados","Data Science / ML"]
area: AI & Automation
dono: Yuri Monteiro
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P490
id: P490-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-09-21
prazo_meses: 7
valor: 2290000
margem: 0.2
---

# Proposta Comercial — Motor de detecção de fraude em transações com Machine Learning e Azure

**Cliente:** Corretora Valor Alto
**Segmento:** Serviços Financeiros
**Área responsável:** AI & Automation · **Dono da proposta:** Yuri Monteiro
**Data:** 2026-09-21 · **Versão:** final

## 1. Contexto e desafio

A Corretora Valor Alto processa cerca de 2,3 milhões de transações por mês em seus canais digitais e registra hoje uma taxa de fraude de 0,42%, com perdas estimadas em R$ 9,6 milhões nos últimos 12 meses. A análise atual é baseada em regras fixas, com 38% dos alertas sendo falsos positivos e tempo médio de 26 horas para bloqueio de um caso confirmado.

## 2. Objetivo

Construir um motor de detecção de fraude baseado em Machine Learning, integrado aos canais transacionais, para identificar operações suspeitas em tempo quase real e reduzir falsos positivos e perdas financeiras.

## 3. Escopo da solução

- Construção de pipelines de Engenharia de Dados em Azure Data Factory e Azure Databricks para ingestão de 2,3 milhões de transações mensais e dados cadastrais
- Desenvolvimento de modelos de Data Science / ML em Python (scikit-learn e XGBoost) para scoring de risco por transação, com meta de AUC acima de 0,90
- Implantação do scoring em Azure Machine Learning com endpoint em tempo quase real, latência alvo inferior a 300 ms por transação
- Painel de monitoramento de deriva de modelo e alertas no Power BI, com revisão semanal de performance
- Definição de regras de bloqueio automático e fila de revisão manual integradas ao processo antifraude da corretora

Tecnologias principais: Machine Learning, Python, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Diagnóstico e Engenharia de Dados (8 semanas)
- Desenvolvimento e validação de modelos de ML (10 semanas)
- Implantação em Azure e integração transacional (6 semanas)
- Monitoramento, ajuste fino e transferência de conhecimento (4 semanas)

## 5. Entregáveis

- Pipeline de dados transacionais e cadastrais em Azure, com documentação e testes de qualidade
- Modelo de detecção de fraude treinado e validado, com relatório de métricas e explicabilidade
- Endpoint de scoring em produção no Azure Machine Learning integrado aos canais digitais
- Painel de monitoramento de modelo e indicadores de fraude no Power BI
- Manual de operação, playbook de revisão de alertas e capacitação do time de risco

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e histórico insuficiente dos dados de fraude rotulados
- Risco: Latência do scoring acima do aceitável nos canais digitais
- Risco: Baixa adesão do time de risco às novas regras de bloqueio

## 8. Investimento

Investimento total: R$ 2.290.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 20%.
