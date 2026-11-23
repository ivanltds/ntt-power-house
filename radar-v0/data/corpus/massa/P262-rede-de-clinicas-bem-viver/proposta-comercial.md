---
projeto_id: P262
cliente: Rede de Clínicas Bem Viver
titulo: Plataforma de Gestão de Saúde Populacional com Analytics e Machine Learning
segmento: Saúde
tecnologias: ["Azure","Python","Machine Learning"]
servicos: ["Governança de Dados","Analytics & BI","Data Science / ML"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P262
id: P262-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-01-26
prazo_meses: 9
valor: 1840000
margem: 0.27
---

# Proposta Comercial — Plataforma de Gestão de Saúde Populacional com Analytics e Machine Learning

**Cliente:** Rede de Clínicas Bem Viver
**Segmento:** Saúde
**Área responsável:** Data & Analytics · **Dono da proposta:** Nelson Barbosa
**Data:** 2025-01-26 · **Versão:** final

## 1. Contexto e desafio

A Rede de Clínicas Bem Viver atende cerca de 180 mil beneficiários em 27 unidades e não consegue estratificar o risco da população para priorizar ações preventivas. Os dados de prontuário, exames e sinistralidade estão dispersos em quatro sistemas distintos, o que eleva o custo assistencial em 12% ao ano e dificulta o cumprimento das metas de medicina preventiva.

## 2. Objetivo

Construir uma plataforma de gestão de saúde populacional no Azure que consolide os dados assistenciais e aplique modelos de Machine Learning para estratificação de risco e priorização de programas de prevenção.

## 3. Escopo da solução

- Ingestão e integração dos dados de prontuário, exames e sinistralidade em pipelines Python no Azure Data Factory e Azure Data Lake
- Modelagem dimensional e camada semântica para Analytics & BI no Power BI, com indicadores de risco e sinistralidade por coorte
- Desenvolvimento de modelos de Machine Learning em Python para estratificação de risco e predição de agravamento clínico
- Governança de Dados com catálogo, políticas de qualidade e linhagem no Microsoft Purview
- Painéis operacionais para as 27 unidades com alertas de pacientes elegíveis a programas preventivos

Tecnologias principais: Azure, Python, Machine Learning.

## 4. Abordagem e cronograma

O projeto será executado em 9 meses, nas seguintes fases:

- Diagnóstico e Governança de Dados (8 semanas)
- Engenharia e Integração de Dados (12 semanas)
- Modelos de Machine Learning e Analytics & BI (12 semanas)
- Implantação e Transferência de Conhecimento (4 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e plano de governança aprovado
- Data lake integrado com as quatro fontes assistenciais e rotinas de qualidade de dados
- Modelo de estratificação de risco validado com AUC mínima de 0,78
- Conjunto de dashboards de sinistralidade e prevenção publicado para 120 usuários
- Relatório de resultados com baseline e metas de redução de custo assistencial

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e padronização dos dados de prontuário das 27 unidades
- Risco: Baixa adesão das equipes assistenciais aos alertas de prevenção
- Risco: Restrições de privacidade e LGPD no uso de dados clínicos para ML

## 8. Investimento

Investimento total: R$ 1.840.000, em parcelas mensais ao longo de 9 meses.

Margem praticada: 27%.
