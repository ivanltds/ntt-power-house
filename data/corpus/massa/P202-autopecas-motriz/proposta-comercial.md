---
projeto_id: P202
cliente: Autopeças Motriz
titulo: Plataforma de Indicadores ESG e Monitoramento de Emissões para Manufatura
segmento: Manufatura
tecnologias: ["Python","Azure","Snowflake","Power BI"]
servicos: ["Governança de Dados","Analytics & BI"]
area: Data & Analytics
dono: Úrsula Campos
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P202
id: P202-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2024-09-17
prazo_meses: 5
valor: 690000
margem: 0.31
---

# Proposta Comercial — Plataforma de Indicadores ESG e Monitoramento de Emissões para Manufatura

**Cliente:** Autopeças Motriz
**Segmento:** Manufatura
**Área responsável:** Data & Analytics · **Dono da proposta:** Úrsula Campos
**Data:** 2024-09-17 · **Versão:** final

## 1. Contexto e desafio

A Autopeças Motriz precisa consolidar dados de emissões de 12 unidades fabris e 3 centros de distribuição, atualmente dispersos em planilhas e sistemas legados. A empresa enfrenta pressão de montadoras para reportar indicadores ESG trimestralmente, mas gasta 15 dias na consolidação manual, com risco de inconsistências e multas contratuais.

## 2. Objetivo

Implementar uma plataforma de dados ESG na Azure com Snowflake e Power BI para automatizar a coleta, o cálculo e a divulgação de indicadores de emissões (Escopos 1, 2 e 3) e outros KPIs de sustentabilidade, reduzindo o ciclo de reporte para 3 dias úteis.

## 3. Escopo da solução

- Governança de dados: definição de políticas, catálogo e linhagem para métricas ESG usando Python e Azure Purview.
- Pipeline de ingestão de dados de emissões de 12 plantas e 3 CDs, com integração a sensores IoT e planilhas, em Python e Azure Data Factory.
- Modelagem dimensional no Snowflake para cálculo de emissões (fatores de emissão, escopos) e histórico de indicadores.
- Desenvolvimento de dashboards no Power BI para acompanhamento mensal de emissões por unidade e metas de redução.
- Automação de relatórios regulatórios e auditoria de dados com validações e alertas no Azure Monitor.

Tecnologias principais: Python, Azure, Snowflake, Power BI.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Fase 1 – Diagnóstico e Governança: 4 semanas
- Fase 2 – Ingestão e Modelagem: 8 semanas
- Fase 3 – Analytics e Dashboards: 6 semanas
- Fase 4 – Validação e Rollout: 2 semanas

## 5. Entregáveis

- Documento de arquitetura de dados ESG e governança (políticas, catálogo e linhagem).
- Pipeline de ingestão automatizado para 15 fontes de dados de emissões, com validação de qualidade.
- Modelo dimensional no Snowflake e dicionário de dados de métricas ESG.
- Conjunto de 8 dashboards no Power BI (visão executiva, por unidade, por escopo e metas).
- Relatório de auditoria e plano de sustentação da plataforma.

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa qualidade dos dados históricos de emissões nas unidades.
- Risco: Resistência das áreas fabris em adotar novos processos de coleta.
- Risco: Mudanças nos requisitos regulatórios durante o projeto.

## 8. Investimento

Investimento total: R$ 690.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 31%.
