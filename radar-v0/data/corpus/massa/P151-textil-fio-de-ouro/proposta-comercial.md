---
projeto_id: P151
cliente: Têxtil Fio de Ouro
titulo: Painéis executivos e BI para gestão industrial com Power BI, Azure e Snowflake
segmento: Manufatura
tecnologias: ["Power BI","Azure","Snowflake","SAP"]
servicos: ["Engenharia de Dados","Analytics & BI"]
area: Data & Analytics
dono: Úrsula Campos
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P151
id: P151-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-06-25
prazo_meses: 6
valor: 2070000
margem: 0.22
---

# Proposta Comercial — Painéis executivos e BI para gestão industrial com Power BI, Azure e Snowflake

**Cliente:** Têxtil Fio de Ouro
**Segmento:** Manufatura
**Área responsável:** Data & Analytics · **Dono da proposta:** Úrsula Campos
**Data:** 2026-06-25 · **Versão:** final

## 1. Contexto e desafio

A Têxtil Fio de Ouro opera 3 plantas têxteis e cerca de 1.200 colaboradores, com indicadores de produção, custos e vendas consolidados manualmente em planilhas por 14 analistas, gerando atraso de até 12 dias na visão executiva e divergências de até 8% entre áreas. O SAP concentra transações de produção e financeiro, mas a falta de uma camada analítica integrada impede decisões rápidas sobre margem por linha de produto e eficiência de máquina.

## 2. Objetivo

Implantar uma plataforma de dados e painéis executivos que consolide informações de SAP e fontes industriais em uma única visão analítica, reduzindo o ciclo de apuração de indicadores de 12 para 2 dias úteis.

## 3. Escopo da solução

- Construção de pipelines de ingestão e transformação no Azure Data Factory e Azure Databricks, integrando SAP ECC e dados de chão de fábrica
- Modelagem dimensional e camada semântica no Snowflake para indicadores de produção, custos, qualidade e vendas
- Desenvolvimento de 8 painéis executivos e operacionais no Power BI com governança de métricas e segurança por unidade de negócio
- Implementação de catálogo de dados e políticas de qualidade no Azure Purview para 45 tabelas críticas
- Configuração de atualização incremental e monitoramento de cargas com alertas no Azure Monitor

Tecnologias principais: Power BI, Azure, Snowflake, SAP.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e arquitetura de dados (4 semanas)
- Engenharia de dados e integração SAP (8 semanas)
- Modelagem no Snowflake e painéis Power BI (8 semanas)
- Homologação, treinamento e go-live (4 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e dicionário de 120 indicadores corporativos
- 12 pipelines de dados produtivos no Azure com SLA de atualização diária até 6h
- Camada analítica no Snowflake com 6 data marts de produção, custos, qualidade, vendas, compras e pessoas
- 8 painéis no Power BI publicados e homologados pelas áreas de negócio
- Plano de sustentação e treinamento de 40 usuários-chave em Power BI e catálogo de dados

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em BI, 1 analista de negócios e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e padronização dos dados mestres do SAP
- Risco: Disponibilidade limitada das equipes de negócio para homologação
- Risco: Dependência de acesso e performance das APIs do SAP para extração

## 8. Investimento

Investimento total: R$ 2.070.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 22%.
