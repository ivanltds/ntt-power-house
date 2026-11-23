---
projeto_id: P153
cliente: Moda Leve Store
titulo: Otimização de rotas e frota com Machine Learning para rede de lojas
segmento: Varejo
tecnologias: ["Machine Learning","GCP","Python"]
servicos: ["Data Science / ML","Change Management"]
area: AI & Automation
dono: Fábio Nunes
confidencialidade: interna
status_proposta: Em negociação
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P153
id: P153-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-10-08
prazo_meses: 4
valor: 430000
margem: 0.28
---

# Proposta Comercial — Otimização de rotas e frota com Machine Learning para rede de lojas

**Cliente:** Moda Leve Store
**Segmento:** Varejo
**Área responsável:** AI & Automation · **Dono da proposta:** Fábio Nunes
**Data:** 2026-10-08 · **Versão:** final

## 1. Contexto e desafio

A Moda Leve Store opera 48 lojas próprias e um centro de distribuição, com frota terceirizada de 22 veículos e cerca de 1.800 entregas por mês. O planejamento de rotas é feito manualmente em planilhas, gerando 14% de ocupação ociosa média por viagem e atrasos em 9% das entregas nas regiões metropolitanas.

## 2. Objetivo

Reduzir o custo logístico por entrega em 12% e elevar a pontualidade para 96% em 4 meses, por meio de otimização de rotas e alocação de frota baseada em Machine Learning na GCP.

## 3. Escopo da solução

- Modelagem preditiva de demanda de entregas por loja e região em Python, treinada com Machine Learning sobre o histórico de 24 meses
- Motor de otimização de rotas e alocação de frota em Python executado em serviços GCP (Cloud Run e BigQuery)
- Pipeline de ingestão e tratamento de dados de pedidos, estoque e telemetria dos veículos no BigQuery
- Painel operacional de acompanhamento de rotas, ocupação e pontualidade em ambiente GCP
- Trilha de Change Management para 35 usuários das áreas de logística e operações de loja

Tecnologias principais: Machine Learning, GCP, Python.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (4 semanas)
- Desenvolvimento dos modelos de ML e otimização (6 semanas)
- Integração e piloto em 12 lojas (4 semanas)
- Rollout para as 48 lojas e Change Management (2 semanas)

## 5. Entregáveis

- Modelo de previsão de demanda de entregas validado com MAPE inferior a 10%
- Motor de otimização de rotas em produção cobrindo as 48 lojas
- Pipeline de dados no BigQuery documentado e monitorado
- Painel operacional de rotas e ocupação entregue aos times de logística
- Plano de Change Management com treinamentos e materiais de adoção para 35 usuários

## 6. Equipe proposta

1 arquiteto de dados, 2 cientistas de dados, 1 engenheiro de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e dispersão dos dados históricos de entregas
- Risco: Baixa adesão dos operadores de logística às novas rotas
- Risco: Integração limitada com sistemas da transportadora terceirizada

## 8. Investimento

Investimento total: R$ 430.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 28%.
