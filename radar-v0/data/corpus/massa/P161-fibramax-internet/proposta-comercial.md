---
projeto_id: P161
cliente: FibraMax Internet
titulo: Detecção de Fraude em Tempo Real com Machine Learning para Operadora de Internet
segmento: Telecom
tecnologias: ["Machine Learning","Python","Azure"]
servicos: ["Engenharia de Dados","Data Science / ML"]
area: AI & Automation
dono: João Pedro Sales
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P161
id: P161-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-04-08
prazo_meses: 5
valor: 2510000
margem: 0.32
---

# Proposta Comercial — Detecção de Fraude em Tempo Real com Machine Learning para Operadora de Internet

**Cliente:** FibraMax Internet
**Segmento:** Telecom
**Área responsável:** AI & Automation · **Dono da proposta:** João Pedro Sales
**Data:** 2025-04-08 · **Versão:** final

## 1. Contexto e desafio

A FibraMax Internet, operadora de telecom com 480 mil assinantes residenciais e 12 mil clientes corporativos, registra perdas anuais estimadas em R$ 9,2 milhões com fraudes em cobranças, uso indevido de franquias e abertura de contratos com documentos falsos. O time de prevenção a fraudes analisa manualmente apenas 18% dos alertas gerados, com tempo médio de detecção de 72 horas, o que agrava o impacto financeiro e a experiência do cliente legítimo.

## 2. Objetivo

Implantar uma solução de detecção de fraude baseada em Machine Learning sobre Azure, capaz de classificar eventos de risco em tempo real e reduzir em 40% o tempo médio de detecção no prazo de 5 meses.

## 3. Escopo da solução

- Ingestão e tratamento de dados de cobrança, cadastro e uso de rede em pipelines Python e Azure Data Factory, com volume estimado de 6 TB/mês.
- Construção de feature store e engenharia de atributos para modelos de detecção de fraude em Python e bibliotecas de Machine Learning.
- Treinamento e validação de modelos de classificação supervisionada e não supervisionada no Azure Machine Learning, com meta de AUC acima de 0,85.
- Implementação de scoring em tempo real via Azure Functions e integração com o sistema de prevenção a fraudes existente.
- Painéis de monitoramento de deriva de modelo e alertas operacionais no Azure Monitor e Power BI.

Tecnologias principais: Machine Learning, Python, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e arquitetura de dados (4 semanas)
- Engenharia de dados e feature store (6 semanas)
- Modelagem e validação de Machine Learning (6 semanas)
- Deploy do scoring em tempo real e transferência de conhecimento (4 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e definição dos 35 atributos de risco priorizados.
- Pipelines de dados reprodutíveis em Python e Azure Data Factory, com testes automatizados.
- Modelos de Machine Learning treinados e validados, com relatório de performance e matriz de confusão.
- API de scoring em tempo real publicada no Azure, com latência inferior a 300 ms por evento.
- Dashboard de monitoramento de fraude e plano de retreinamento trimestral dos modelos.

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 gerente de projeto..

## 7. Premissas e riscos

- Risco: Baixa qualidade e atraso na entrega dos dados históricos de fraude pelo cliente.
- Risco: Falta de rótulos confiáveis de fraude para treinamento dos modelos.
- Risco: Resistência do time de prevenção a fraudes à adoção do scoring automatizado.

## 8. Investimento

Investimento total: R$ 2.510.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 32%.
