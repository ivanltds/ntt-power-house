---
projeto_id: P267
cliente: Conecta Brasil Telecom
titulo: Precificação Dinâmica de Planos com Machine Learning em Databricks
segmento: Telecom
tecnologias: ["Databricks","Machine Learning","GCP","Python"]
servicos: ["Data Science / ML"]
area: Data & Analytics
dono: Leonardo Pires
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P267
id: P267-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-06-09
prazo_meses: 7
valor: 5760000
margem: 0.23
---

# Proposta Comercial — Precificação Dinâmica de Planos com Machine Learning em Databricks

**Cliente:** Conecta Brasil Telecom
**Segmento:** Telecom
**Área responsável:** Data & Analytics · **Dono da proposta:** Leonardo Pires
**Data:** 2026-06-09 · **Versão:** final

## 1. Contexto e desafio

A Conecta Brasil Telecom gerencia um portfólio de mais de 180 planos e enfrenta perda de margem em cerca de 12% das ofertas comerciais, pois a precificação ainda é feita em planilhas com revisões manuais a cada 30 dias. A defasagem entre o comportamento de consumo dos 4,2 milhões de clientes e a tabela de preços vigente reduz a competitividade em segmentos de alta concorrência.

## 2. Objetivo

Implantar um motor de precificação dinâmica baseado em Machine Learning que recalcula preços e descontos de forma automatizada, elevando a margem das ofertas e reduzindo o ciclo de revisão de 30 dias para até 24 horas.

## 3. Escopo da solução

- Construção de pipelines de ingestão e tratamento de dados de consumo, ARPU e churn no Databricks com Python
- Desenvolvimento de modelos de propensão e elasticidade-preço com Machine Learning para segmentação de clientes
- Orquestração da arquitetura analítica em GCP, integrada ao data lake corporativo da operadora
- Criação de camada de serving com API de recomendação de preços consumida pelos canais comerciais
- Monitoramento de deriva de modelo e painéis de acompanhamento de margem e conversão

Tecnologias principais: Databricks, Machine Learning, GCP, Python.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Descoberta e preparação de dados (6 semanas)
- Modelagem e validação de algoritmos (10 semanas)
- Integração em GCP e API de serving (8 semanas)
- Piloto nos canais comerciais e rollout (4 semanas)

## 5. Entregáveis

- Pipeline de dados de precificação em Databricks com 45 tabelas integradas
- Modelos de elasticidade-preço e propensão à contratação validados em backtesting
- API de recomendação de preços publicada em GCP com SLA de 300 ms
- Painel gerencial de margem por segmento e plano com atualização diária
- Documentação técnica e transferência de conhecimento para o time de Pricing

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de dados, 2 cientistas de dados, 1 engenheiro de dados e 1 especialista em MLOps.

## 7. Premissas e riscos

- Risco: Qualidade e dispersão dos dados históricos de preço nos sistemas legados
- Risco: Baixa adesão das equipes comerciais ao novo motor de preços
- Risco: Restrições de latência na integração da API com os canais de venda

## 8. Investimento

Investimento total: R$ 5.760.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 23%.
