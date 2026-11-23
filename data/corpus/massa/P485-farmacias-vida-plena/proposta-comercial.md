---
projeto_id: P485
cliente: Farmácias Vida Plena
titulo: Otimização de Rotas e Frota com Analytics Avançado para Rede de Farmácias
segmento: Varejo
tecnologias: ["Power BI","GCP","Python"]
servicos: ["Analytics & BI","Data Science / ML"]
area: AI & Automation
dono: Fábio Nunes
confidencialidade: confidencial
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P485
id: P485-PROP
tipo_documental: proposta_comercial
status_documento: preliminar
data: 2026-09-27
prazo_meses: 4
valor: 1750000
margem: 0.34
---

# Proposta Comercial — Otimização de Rotas e Frota com Analytics Avançado para Rede de Farmácias

**Cliente:** Farmácias Vida Plena
**Segmento:** Varejo
**Área responsável:** AI & Automation · **Dono da proposta:** Fábio Nunes
**Data:** 2026-09-27 · **Versão:** final

## 1. Contexto e desafio

A rede Farmácias Vida Plena opera hoje com 320 veículos de distribuição para abastecer 540 lojas em 7 estados, mas o planejamento de rotas é feito manualmente por 12 supervisores regionais, gerando cerca de 18% de quilometragem ociosa e um índice de ruptura de estoque de 9,4% nas lojas de interior. A frota tem consumo médio mensal de R$ 2,3 milhões em combustível, sem visibilidade consolidada sobre custo por entrega ou aderência ao plano de rota.

## 2. Objetivo

Reduzir em até 15% o custo logístico por entrega e elevar a aderência ao plano de rotas para 90% em 4 meses, por meio de modelos preditivos e painéis analíticos que apoiem a decisão diária das operações de distribuição.

## 3. Escopo da solução

- Ingestão e tratamento no GCP (BigQuery e Cloud Storage) dos dados de telemetria veicular, pedidos de loja e tabelas de rota dos últimos 24 meses
- Desenvolvimento de modelos de otimização e previsão de demanda em Python, com uso de scikit-learn e OR-Tools, para geração de rotas sugeridas por região
- Construção de dashboards em Power BI para acompanhamento de custo por entrega, aderência ao plano, ocupação de frota e consumo de combustível
- Implementação de pipeline de Data Science / ML para atualização diária das previsões de demanda por loja e por SKU
- Definição de indicadores e rotina de governança de dados com os supervisores regionais, incluindo alertas automáticos de desvio de rota

Tecnologias principais: Power BI, GCP, Python.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Diagnóstico e fundação de dados (5 semanas)
- Modelagem de demanda e otimização de rotas (7 semanas)
- Dashboards, pilotos e treinamento (4 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados no GCP e dicionário de indicadores logísticos
- Modelo preditivo de demanda por loja/SKU em Python com acurácia mínima de 85% validada em backtest
- Motor de sugestão de rotas integrado ao processo dos 12 supervisores regionais
- Conjunto de 6 dashboards em Power BI publicados e homologados pela área de logística
- Relatório final de ganhos com comparativo antes/depois de custo por entrega e aderência ao plano

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados e 1 analista de BI.

## 7. Premissas e riscos

- Risco: Qualidade e cobertura dos dados de telemetria veicular de parte da frota terceirizada
- Risco: Baixa adesão dos supervisores regionais às rotas sugeridas no período de piloto
- Risco: Restrições de conectividade nas lojas de interior que atrasam a atualização diária dos dados

## 8. Investimento

Investimento total: R$ 1.750.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 34%.
