---
projeto_id: P277
cliente: Distribuidora Luz do Cerrado
titulo: Redução de Perdas Não Técnicas com Analytics Avançado em Utilities
segmento: Utilities / Energia
tecnologias: ["Machine Learning","Databricks","Azure"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: confidencial
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P277
id: P277-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-02-11
prazo_meses: 5
valor: 150000
margem: 0.28
---

# Proposta Comercial — Redução de Perdas Não Técnicas com Analytics Avançado em Utilities

**Cliente:** Distribuidora Luz do Cerrado
**Segmento:** Utilities / Energia
**Área responsável:** Data & Analytics · **Dono da proposta:** Nelson Barbosa
**Data:** 2026-02-11 · **Versão:** final

## 1. Contexto e desafio

A Distribuidora Luz do Cerrado opera com perdas não técnicas estimadas em 8,4% da energia distribuída, o que representa cerca de R$ 42 milhões anuais em receita não faturada. A detecção atual de fraudes e ligações irregulares é manual e cobre apenas 12% dos medidores por ciclo, com tempo médio de 45 dias entre a suspeita e a inspeção em campo.

## 2. Objetivo

Reduzir as perdas não técnicas em até 25% em 12 meses por meio de um modelo de priorização de inspeções baseado em Machine Learning sobre dados de consumo, cadastro e histórico de ocorrências.

## 3. Escopo da solução

- Construção de pipeline de ingestão e tratamento de dados de medidores, cadastro e inspeções no Databricks sobre Azure Data Lake
- Modelagem de features de consumo e detecção de anomalias com Machine Learning para priorização de inspeções
- Integração dos scores de suspeita ao processo de fiscalização e à ordem de serviço de campo
- Painéis de acompanhamento de perdas e efetividade das inspeções em Power BI sobre Azure Synapse
- Documentação técnica e transferência de conhecimento para a equipe de Engenharia de Dados do cliente

Tecnologias principais: Machine Learning, Databricks, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (5 semanas)
- Engenharia de dados e modelagem (8 semanas)
- Validação do modelo e integração operacional (5 semanas)
- Painéis, documentação e transferência (2 semanas)

## 5. Entregáveis

- Pipeline de dados de medidores e inspeções operacional no Databricks
- Modelo de Machine Learning de priorização de inspeções com AUC mínima de 0,78
- Ranking semanal de 5.000 medidores prioritários para fiscalização
- Painel de indicadores de perdas não técnicas e efetividade das inspeções
- Documentação técnica e sessão de transferência de conhecimento

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e cobertura incompletas dos dados históricos de inspeção
- Risco: Baixa adesão da área de fiscalização ao ranking de priorização
- Risco: Restrições de acesso e governança dos dados de medidores no Azure

## 8. Investimento

Investimento total: R$ 150.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 28%.
