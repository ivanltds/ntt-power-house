---
projeto_id: P451
cliente: Livrarias Página Viva
titulo: Detecção de Fraude em Transações de Varejo com Machine Learning no Azure
segmento: Varejo
tecnologias: ["Machine Learning","Python","Azure"]
servicos: ["Data Science / ML","Engenharia de Dados"]
area: AI & Automation
dono: Fábio Nunes
confidencialidade: confidencial
status_proposta: Em negociação
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P451
id: P451-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-10-14
prazo_meses: 6
valor: 850000
margem: 0.23
---

# Proposta Comercial — Detecção de Fraude em Transações de Varejo com Machine Learning no Azure

**Cliente:** Livrarias Página Viva
**Segmento:** Varejo
**Área responsável:** AI & Automation · **Dono da proposta:** Fábio Nunes
**Data:** 2026-10-14 · **Versão:** final

## 1. Contexto e desafio

A Livrarias Página Viva opera 68 lojas físicas e um e-commerce que processa cerca de 1,2 milhão de transações por mês, com 4,5% delas questionadas por estorno ou chargeback. O time de prevenção a fraudes atua hoje de forma manual em planilhas, com tempo médio de 36 horas para identificar um caso suspeito e perda estimada de R$ 1,8 milhão nos últimos 12 meses.

## 2. Objetivo

Implantar um modelo de detecção de fraude em tempo quase real sobre as transações do e-commerce e das lojas, reduzindo o tempo de identificação de casos suspeitos e o volume de perdas por fraude.

## 3. Escopo da solução

- Modelagem de Machine Learning para scoring de risco transacional por cartão, dispositivo e histórico de compra, treinada em Python sobre o Azure Machine Learning
- Pipeline de Engenharia de Dados no Azure Data Factory e Azure Databricks para ingestão de transações do ERP, gateway de pagamento e antifraude atual, com latência de até 5 minutos
- Feature store e camada analítica no Azure Synapse Analytics com histórico de 24 meses de transações
- API de scoring em contêiner no Azure Kubernetes Service para consulta em até 300 ms por transação no checkout
- Painel de monitoramento de fraude e deriva de modelo no Power BI, integrado ao Azure Monitor

Tecnologias principais: Machine Learning, Python, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e desenho da arquitetura (4 semanas)
- Engenharia de dados e feature store (6 semanas)
- Desenvolvimento e validação do modelo de ML (8 semanas)
- Integração, go-live e transferência de conhecimento (6 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e ML com desenho do fluxo transacional ponta a ponta
- Pipeline de ingestão e engenharia de dados operando com 1,2 milhão de transações mensais
- Modelo de detecção de fraude em produção com meta de recall mínimo de 85% para casos confirmados
- API de scoring integrada ao checkout do e-commerce e ao PDV das lojas
- Painel de acompanhamento de fraudes, falsos positivos e deriva de modelo para o time de prevenção

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 engenheiro de MLOps.

## 7. Premissas e riscos

- Risco: Qualidade e completude dos dados históricos de transações do ERP e do gateway
- Risco: Volume de falsos positivos acima do tolerado pela operação de atendimento
- Risco: Baixa adesão do time de prevenção às novas rotinas de análise

## 8. Investimento

Investimento total: R$ 850.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 23%.
