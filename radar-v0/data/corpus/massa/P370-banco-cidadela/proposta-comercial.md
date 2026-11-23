---
projeto_id: P370
cliente: Banco Cidadela
titulo: Modernização do modelo de risco de crédito com Snowflake e ML na nuvem AWS
segmento: Serviços Financeiros
tecnologias: ["Snowflake","AWS","Python","Machine Learning"]
servicos: ["Governança de Dados","Data Science / ML","Change Management"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P370
id: P370-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2024-07-06
prazo_meses: 7
valor: 2600000
margem: 0.29
---

# Proposta Comercial — Modernização do modelo de risco de crédito com Snowflake e ML na nuvem AWS

**Cliente:** Banco Cidadela
**Segmento:** Serviços Financeiros
**Área responsável:** AI & Automation · **Dono da proposta:** Bruno Tavares
**Data:** 2024-07-06 · **Versão:** final

## 1. Contexto e desafio

O Banco Cidadela opera com um modelo de risco de crédito baseado em planilhas e rotinas batch noturnas, o que gera atraso de até 36 horas na atualização do score de 2,4 milhões de clientes PF e PJ. A taxa de inadimplência acima de 90 dias cresceu para 5,8% na carteira de crédito pessoal, e a área de riscos não consegue testar novas variáveis com a agilidade exigida pelo regulador.

## 2. Objetivo

Construir um novo modelo de risco de crédito em Machine Learning sobre Snowflake e AWS, com governança de dados e gestão de mudança, reduzindo o ciclo de atualização do score para menos de 4 horas e elevando o poder discriminatório do modelo (Gini) em pelo menos 8 pontos percentuais.

## 3. Escopo da solução

- Ingestão e modelagem de dados de crédito no Snowflake, integrando fontes de cadastro, bureau e transações via pipelines em Python na AWS
- Desenvolvimento e validação de modelos de Machine Learning de propensão à inadimplência com Python (scikit-learn e XGBoost), incluindo explicabilidade
- Implantação de esteira MLOps na AWS para treino, versionamento e monitoramento de deriva dos modelos
- Estruturação de governança de dados: catálogo, linhagem, políticas de qualidade e dicionário de variáveis de crédito
- Plano de change management para as áreas de riscos, crédito e compliance, com treinamentos e comunicação da nova esteira decisória

Tecnologias principais: Snowflake, AWS, Python, Machine Learning.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Diagnóstico e arquitetura de dados (6 semanas)
- Desenvolvimento e validação dos modelos de ML (10 semanas)
- Implantação em produção e MLOps (8 semanas)
- Governança e change management (4 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e solução analítica em Snowflake e AWS
- Modelo de risco de crédito em produção com relatório de validação e métricas (Gini, KS e PSI)
- Pipeline MLOps operacional com monitoramento de deriva e reprodutibilidade de experimentos
- Catálogo de dados e políticas de governança implantados para o domínio de crédito
- Plano de change management executado, com 6 turmas de treinamento e material de apoio

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados, 1 especialista em governança de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e dispersão das fontes de dados de bureau podem atrasar a modelagem
- Risco: Baixa adesão das áreas de crédito ao novo processo decisório
- Risco: Restrições de compliance e LGPD na utilização de variáveis transacionais

## 8. Investimento

Investimento total: R$ 2.600.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 29%.
