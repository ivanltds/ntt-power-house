---
projeto_id: P339
cliente: Escudo Auto Seguros
titulo: Modelo preditivo de gestão de saúde populacional para carteira de seguros auto
segmento: Seguros
tecnologias: ["Machine Learning","Azure","Power BI","Python"]
servicos: ["Data Science / ML","Analytics & BI"]
area: Data & Analytics
dono: Zilda Correia
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P339
id: P339-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-01-16
prazo_meses: 7
valor: 1040000
margem: 0.23
---

# Proposta Comercial — Modelo preditivo de gestão de saúde populacional para carteira de seguros auto

**Cliente:** Escudo Auto Seguros
**Segmento:** Seguros
**Área responsável:** Data & Analytics · **Dono da proposta:** Zilda Correia
**Data:** 2026-01-16 · **Versão:** final

## 1. Contexto e desafio

A Escudo Auto Seguros, com cerca de 1,2 milhão de segurados ativos e 780 mil vidas expostas em assistência veicular e saúde ocupacional, não conseguia priorizar ações preventivas porque os indicadores de sinistralidade estavam dispersos em 14 planilhas e dois sistemas legados. O custo médio por sinistro de saúde havia crescido 18% em 24 meses, pressionando a margem técnica do ramo auto.

## 2. Objetivo

Construir um modelo de propensão a eventos de saúde e uma camada analítica que permita à seguradora identificar grupos de risco, direcionar programas preventivos e reduzir a sinistralidade da carteira em até 12 meses.

## 3. Escopo da solução

- Modelagem de propensão a eventos de saúde com Machine Learning em Python, a partir de 36 meses de histórico de sinistros, beneficiários e utilização
- Pipeline de dados em Azure Data Factory e Azure Databricks, com governança em Azure Purview e armazenamento em Azure Data Lake Storage Gen2
- Painéis de acompanhamento de sinistralidade e indicadores populacionais em Power BI para 4 diretorias e 12 regionais
- Segmentação da carteira em 6 clusters de risco e definição de regras de elegibilidade para programas preventivos
- Rotinas de monitoramento de drift e reavaliação mensal dos modelos em Python, integradas ao ambiente Azure

Tecnologias principais: Machine Learning, Azure, Power BI, Python.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (6 semanas)
- Desenvolvimento e validação de modelos (10 semanas)
- Construção dos painéis e integração (8 semanas)
- Homologação, treinamento e go-live (4 semanas)

## 5. Entregáveis

- Modelo preditivo de propensão a eventos de saúde com AUC de 0,81 na base de validação
- Dashboard executivo em Power BI com 28 indicadores de sinistralidade e saúde populacional
- Documentação técnica do pipeline Azure e do ciclo de vida dos modelos
- Relatório de segmentação da carteira em 6 clusters com recomendações de ação preventiva
- Manual de operação e transferência de conhecimento para a equipe de dados do cliente

## 6. Equipe proposta

1 arquiteto de dados, 2 cientistas de dados, 1 engenheiro de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e completude dos dados históricos de sinistros
- Risco: Baixa adesão das áreas de negócio às recomendações do modelo
- Risco: Restrições de privacidade e anonimização de dados de beneficiários

## 8. Investimento

Investimento total: R$ 1.040.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 23%.
