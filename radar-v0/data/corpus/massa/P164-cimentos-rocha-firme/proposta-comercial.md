---
projeto_id: P164
cliente: Cimentos Rocha Firme
titulo: Painéis executivos e BI para gestão comercial e operacional
segmento: Manufatura
tecnologias: ["SAP","Snowflake","Azure","Power BI"]
servicos: ["Analytics & BI"]
area: Data & Analytics
dono: Eduarda Prado
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P164
id: P164-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2024-05-20
prazo_meses: 3
valor: 1120000
margem: 0.34
---

# Proposta Comercial — Painéis executivos e BI para gestão comercial e operacional

**Cliente:** Cimentos Rocha Firme
**Segmento:** Manufatura
**Área responsável:** Data & Analytics · **Dono da proposta:** Eduarda Prado
**Data:** 2024-05-20 · **Versão:** final

## 1. Contexto e desafio

A Cimentos Rocha Firme, com 12 unidades industriais e faturamento anual de R$ 2,8 bilhões, enfrentava dispersão de dados entre SAP e planilhas manuais, levando até 5 dias para consolidar indicadores de produção e vendas. A diretoria não tinha visão em tempo real para decisões sobre mix de produtos e alocação de carga.

## 2. Objetivo

Implementar uma plataforma de analytics integrada para fornecer painéis executivos em tempo quase real, unificando dados de SAP, Snowflake, Azure e Power BI para suportar decisões estratégicas.

## 3. Escopo da solução

- Integração dos dados do SAP ECC com o Snowflake via Azure Data Factory para ingestão batch e incremental
- Modelagem dimensional no Snowflake para as áreas comercial, produção e logística
- Construção de 8 painéis executivos no Power BI com indicadores de vendas, margem, OEE e entregas
- Configuração de governança de dados no Azure Purview e catálogo de métricas
- Treinamento de 40 usuários-chave e documentação técnica das pipelines

Tecnologias principais: SAP, Snowflake, Azure, Power BI.

## 4. Abordagem e cronograma

O projeto será executado em 3 meses, nas seguintes fases:

- Fase 1 – Diagnóstico e arquitetura: 3 semanas
- Fase 2 – Implementação de pipelines e modelagem: 6 semanas
- Fase 3 – Desenvolvimento dos dashboards e validação: 3 semanas

## 5. Entregáveis

- Documento de arquitetura de dados e fluxos de integração
- Pipeline de ingestão automatizada SAP para Snowflake com 15 tabelas principais
- Modelo dimensional e camada semântica no Snowflake
- Conjunto de 8 dashboards no Power BI validados pela diretoria
- Manual de operação e sessão de treinamento para 40 usuários

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Atraso na liberação de acessos ao SAP pelo time de TI do cliente
- Risco: Qualidade dos dados de produção com inconsistências históricas
- Risco: Baixa adoção dos painéis por usuários acostumados a relatórios manuais

## 8. Investimento

Investimento total: R$ 1.120.000, em parcelas mensais ao longo de 3 meses.

Margem praticada: 34%.
