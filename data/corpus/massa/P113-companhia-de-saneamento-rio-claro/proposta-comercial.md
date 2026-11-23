---
projeto_id: P113
cliente: Companhia de Saneamento Rio Claro
titulo: Previsão de Demanda e Reposição de Ativos com Analytics Avançado
segmento: Utilities / Energia
tecnologias: ["SAP","Snowflake","Databricks"]
servicos: ["Data Science / ML","Engenharia de Dados","Change Management"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P113
id: P113-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-04-03
prazo_meses: 6
valor: 2360000
margem: 0.24
---

# Proposta Comercial — Previsão de Demanda e Reposição de Ativos com Analytics Avançado

**Cliente:** Companhia de Saneamento Rio Claro
**Segmento:** Utilities / Energia
**Área responsável:** Data & Analytics · **Dono da proposta:** Nelson Barbosa
**Data:** 2026-04-03 · **Versão:** final

## 1. Contexto e desafio

A Companhia de Saneamento Rio Claro opera com cerca de 1.200 pontos de medição e enfrenta desabastecimento em 18% das ordens de reposição de materiais críticos, gerando paralisações de equipes de campo e multas regulatórias. A previsão de demanda atual é feita em planilhas, com acurácia média de 62%, sem integração entre consumo, estoque e cronograma de manutenção.

## 2. Objetivo

Elevar a acurácia da previsão de demanda de materiais e insumos para 85% em 6 meses, integrando dados de SAP, consumo em campo e histórico de manutenção para automatizar a reposição de estoque.

## 3. Escopo da solução

- Extração e modelagem de dados de consumo e estoque a partir do SAP (MM/PM) para o Snowflake
- Construção de pipelines de engenharia de dados no Databricks com processamento em camadas bronze, prata e ouro
- Desenvolvimento de modelos de previsão de demanda por material, regional e sazonalidade em Databricks ML
- Integração do motor de previsão ao SAP para geração automática de propostas de reposição
- Programa de Change Management com treinamento de 60 usuários das áreas de Suprimentos e Operações

Tecnologias principais: SAP, Snowflake, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e Fundação de Dados (6 semanas)
- Engenharia de Dados e Modelagem (8 semanas)
- Modelos de ML e Integração com SAP (8 semanas)
- Rollout e Change Management (4 semanas)

## 5. Entregáveis

- Data lake Snowflake com 5 anos de histórico de consumo integrado ao SAP
- Pipeline Databricks de atualização diária de previsões de demanda
- Modelo de ML de previsão por família de materiais com acurácia mínima de 85%
- Dashboard de acompanhamento de acurácia e ruptura de estoque
- Plano de Change Management com 4 workshops e material de treinamento

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados, 1 analista de change management e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e dispersão dos dados históricos do SAP
- Risco: Baixa adesão das áreas de Suprimentos ao novo processo
- Risco: Restrições de janela para integração em produção no SAP

## 8. Investimento

Investimento total: R$ 2.360.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 24%.
