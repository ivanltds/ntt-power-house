---
projeto_id: P388
cliente: Banco Cidadela
titulo: Plataforma de Detecção de Fraude em Tempo Real com Machine Learning
segmento: Serviços Financeiros
tecnologias: ["Databricks","Azure","Python"]
servicos: ["Data Science / ML"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P388
id: P388-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2024-07-22
prazo_meses: 6
valor: 380000
margem: 0.28
---

# Proposta Comercial — Plataforma de Detecção de Fraude em Tempo Real com Machine Learning

**Cliente:** Banco Cidadela
**Segmento:** Serviços Financeiros
**Área responsável:** AI & Automation · **Dono da proposta:** Bruno Tavares
**Data:** 2024-07-22 · **Versão:** final

## 1. Contexto e desafio

O Banco Cidadela registrou R$ 48 milhões em perdas por fraude em transações de cartão nos últimos 12 meses, com taxa de falsos positivos de 32% nos bloqueios preventivos, gerando atrito com clientes e custo operacional elevado. A base de 2,3 milhões de clientes ativos processa cerca de 9 milhões de transações mensais, hoje analisadas por regras estáticas que não acompanham novos padrões de fraude.

## 2. Objetivo

Construir um modelo de detecção de fraude em tempo real baseado em machine learning na plataforma Databricks sobre Azure, reduzindo falsos positivos em pelo menos 40% e aumentando a detecção de fraudes confirmadas em 25% em seis meses.

## 3. Escopo da solução

- Ingestão e tratamento de dados transacionais e cadastrais em Databricks sobre Azure, com pipelines em Python para features de comportamento de uso
- Desenvolvimento e treinamento de modelos de classificação de fraude em Python (scikit-learn e MLflow) com validação temporal e explicabilidade
- Implementação de scoring em tempo real com latência alvo inferior a 300 ms por transação, integrado ao motor de decisão antifraude
- Painéis de monitoramento de drift, performance do modelo e fila de alertas para o time de prevenção a fraudes
- Documentação técnica e transferência de conhecimento para as equipes de dados e riscos do banco

Tecnologias principais: Databricks, Azure, Python.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e desenho da arquitetura (4 semanas)
- Engenharia de dados e features no Databricks (6 semanas)
- Modelagem, validação e integração do scoring em tempo real (9 semanas)
- Monitoramento, documentação e transferência de conhecimento (5 semanas)

## 5. Entregáveis

- Documento de arquitetura da solução de detecção de fraude em Databricks/Azure
- Pipeline de dados e engenharia de features em produção no Databricks
- Modelo de ML campeão validado com relatório de métricas (AUC, precisão, recall e taxa de falsos positivos)
- API de scoring em tempo real integrada ao motor antifraude com testes de carga
- Dashboard de monitoramento contínuo e manual de operação do modelo

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e completude dos dados históricos de fraude rotulados
- Risco: Latência da integração com o motor antifraude legado do banco
- Risco: Baixa adesão do time de prevenção a fraudes ao novo fluxo de alertas

## 8. Investimento

Investimento total: R$ 380.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 28%.
