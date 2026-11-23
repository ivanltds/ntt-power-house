---
projeto_id: P234
cliente: Autopeças Motriz
titulo: Plataforma de Indicadores ESG e Emissões para Manufatura Automotiva
segmento: Manufatura
tecnologias: ["Snowflake","Azure","Power BI","Python"]
servicos: ["Governança de Dados","Analytics & BI"]
area: Data & Analytics
dono: Úrsula Campos
confidencialidade: confidencial
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P234
id: P234-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-04-13
prazo_meses: 6
valor: 830000
margem: 0.19
---

# Proposta Comercial — Plataforma de Indicadores ESG e Emissões para Manufatura Automotiva

**Cliente:** Autopeças Motriz
**Segmento:** Manufatura
**Área responsável:** Data & Analytics · **Dono da proposta:** Úrsula Campos
**Data:** 2025-04-13 · **Versão:** final

## 1. Contexto e desafio

A Autopeças Motriz acompanhava emissões de CO2e e indicadores ESG em 14 planilhas descentralizadas mantidas por 6 áreas, com fechamento mensal de 18 dias e divergências de até 12% entre relatórios de sustentabilidade e a base financeira. A ausência de trilha de auditoria comprometia a publicação do relatório anual e a resposta a questionários de clientes montadoras.

## 2. Objetivo

Centralizar dados de emissões Escopos 1, 2 e 3 e indicadores ESG em uma plataforma analítica única, com fechamento mensal automatizado e relatórios auditáveis para 3 plantas industriais.

## 3. Escopo da solução

- Ingestão de dados de consumo de energia, combustíveis e logística das 3 plantas em Snowflake, com pipelines em Python para cálculo de CO2e conforme GHG Protocol
- Camada de governança de dados no Azure com catálogo, linhagem e definição de 48 indicadores ESG e 22 métricas de emissões
- Modelagem dimensional no Snowflake para consolidação mensal e histórico de 36 meses de emissões por planta, linha e centro de custo
- Painéis Power BI para diretoria, sustentabilidade e controladoria, com drill-down por escopo, planta e período
- Rotinas de validação e conciliação automática entre dados de sustentabilidade e base contábil, com alertas de desvio acima de 2%

Tecnologias principais: Snowflake, Azure, Power BI, Python.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e governança de dados (6 semanas)
- Engenharia de dados e cálculo de emissões em Snowflake e Python (10 semanas)
- Analytics e dashboards em Power BI (6 semanas)
- Homologação, treinamento e go-live (4 semanas)

## 5. Entregáveis

- Catálogo de dados ESG com 48 indicadores documentados e regras de cálculo rastreáveis
- Pipeline automatizado de cálculo de emissões Escopos 1, 2 e 3 em produção
- 7 dashboards Power BI publicados para 3 perfis de usuários
- Relatório mensal de fechamento ESG gerado em 1 dia útil, contra 18 dias anteriores
- Documentação técnica e treinamento de 25 usuários-chave em 4 sessões

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e padronização dos dados de consumo das 3 plantas
- Risco: Mudanças nas regras de cálculo do GHG Protocol durante o projeto
- Risco: Baixa adoção dos dashboards pela área de sustentabilidade

## 8. Investimento

Investimento total: R$ 830.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 19%.
