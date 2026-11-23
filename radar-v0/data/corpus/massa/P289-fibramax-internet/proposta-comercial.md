---
projeto_id: P289
cliente: FibraMax Internet
titulo: Precificação dinâmica com Machine Learning para planos de banda larga
segmento: Telecom
tecnologias: ["Machine Learning","Python","Databricks","GCP"]
servicos: ["Analytics & BI"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P289
id: P289-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-03-13
prazo_meses: 6
valor: 2010000
margem: 0.33
---

# Proposta Comercial — Precificação dinâmica com Machine Learning para planos de banda larga

**Cliente:** FibraMax Internet
**Segmento:** Telecom
**Área responsável:** Data & Analytics · **Dono da proposta:** Henrique Matos
**Data:** 2026-03-13 · **Versão:** final

## 1. Contexto e desafio

A FibraMax Internet, com 480 mil assinantes residenciais e 32 mil clientes empresariais, praticava preços fixos por região há mais de três anos, o que gerava perda de margem em bairros de alta demanda e churn elevado de 2,8% ao mês em áreas com concorrência agressiva. A empresa não conseguia reagir a variações de demanda, sazonalidade e ações de concorrentes em menos de 45 dias.

## 2. Objetivo

Implantar um motor de precificação dinâmica baseado em Machine Learning para ajustar preços de planos residenciais e PMEs com granularidade por região e perfil de cliente, reduzindo churn e elevando a margem por assinante.

## 3. Escopo da solução

- Construção de pipelines de dados no Databricks e GCP para consolidar histórico de vendas, churn, inadimplência e concorrência em uma base analítica única
- Desenvolvimento de modelos de propensão a churn e elasticidade-preço em Python e Machine Learning, com treinamento e validação sobre 36 meses de histórico
- Implementação de motor de recomendação de preços por cluster de CEP, perfil de consumo e canal de venda
- Painéis de Analytics & BI para acompanhamento de margem, churn e aderência das ofertas em tempo quase real
- Integração das recomendações ao CRM e ao portal de vendas com regras de aprovação e limites de variação de preço

Tecnologias principais: Machine Learning, Python, Databricks, GCP.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (6 semanas)
- Modelagem e validação de Machine Learning (8 semanas)
- Integração e piloto em 3 regiões (6 semanas)
- Rollout nacional e transferência de conhecimento (6 semanas)

## 5. Entregáveis

- Base analítica unificada no Databricks com 36 meses de dados tratados e dicionário de métricas
- Modelos de churn e elasticidade-preço documentados, com AUC superior a 0,82 em validação
- Motor de precificação dinâmica em produção no GCP, cobrindo 100% das regiões de atuação
- Painéis de Analytics & BI com 12 indicadores de margem, churn e aderência comercial
- Manual de governança de preços e plano de evolução para os próximos 12 meses

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e dispersão dos dados históricos de vendas entre sistemas legados
- Risco: Resistência da área comercial à variação de preços por região
- Risco: Latência na integração com o CRM durante o rollout nacional

## 8. Investimento

Investimento total: R$ 2.010.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 33%.
