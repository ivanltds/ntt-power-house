---
projeto_id: P595
cliente: Mútua Previdência Sul
titulo: Precificação Dinâmica com Machine Learning para Produtos de Previdência
segmento: Seguros
tecnologias: ["Python","Machine Learning"]
servicos: ["Analytics & BI"]
area: Data & Analytics
dono: Leonardo Pires
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P595
id: P595-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-08-25
prazo_meses: 5
valor: 1210000
margem: 0.24
---

# Proposta Comercial — Precificação Dinâmica com Machine Learning para Produtos de Previdência

**Cliente:** Mútua Previdência Sul
**Segmento:** Seguros
**Área responsável:** Data & Analytics · **Dono da proposta:** Leonardo Pires
**Data:** 2025-08-25 · **Versão:** final

## 1. Contexto e desafio

A Mútua Previdência Sul gerencia uma carteira de 38 mil planos de previdência e enfrentava forte pressão competitiva: 62% das propostas comerciais eram reprovadas por preço acima do mercado, enquanto 11% das vendas fechadas apresentavam margem negativa. O processo de precificação era manual, baseado em planilhas e revisões trimestrais, levando até 9 dias para ajustar uma tarifa por faixa de risco.

## 2. Objetivo

Implantar um motor de precificação dinâmica baseado em Python e Machine Learning que ajuste preços por perfil de risco e condições de mercado em ciclos diários, elevando a competitividade das propostas sem comprometer a margem técnica.

## 3. Escopo da solução

- Construção de pipelines de dados em Python para ingestão diária de sinistralidade, cancelamentos e dados de concorrência de 14 fontes internas e externas
- Desenvolvimento de modelos de Machine Learning de elasticidade-preço e propensão à contratação, com validação em backtesting sobre 24 meses de histórico
- Motor de regras de precificação dinâmica com limites de margem mínima e alçadas de aprovação por faixa de prêmio
- Dashboard de Analytics & BI para acompanhamento de conversão, margem e aderência de preço por produto e canal
- Integração do motor ao sistema de cotação via API, com monitoramento de drift dos modelos e retreino mensal

Tecnologias principais: Python, Machine Learning.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (6 semanas)
- Modelagem e backtesting (8 semanas)
- Integração e piloto em 2 canais (6 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e modelo de governança de variáveis de precificação
- Três modelos de Machine Learning em produção (elasticidade, propensão e sinistralidade esperada) com relatório de performance
- Motor de precificação dinâmica integrado ao sistema de cotação por API
- Painel de Analytics & BI com 18 indicadores de conversão, margem e aderência de preço
- Manual de operação, plano de retreino e capacitação de 22 usuários das áreas comercial e atuarial

## 6. Equipe proposta

1 arquiteto de dados, 2 cientistas de dados, 1 engenheiro de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e defasagem dos dados históricos de sinistralidade
- Risco: Baixa adesão dos corretores ao novo processo de cotação
- Risco: Drift dos modelos após mudanças bruscas de mercado

## 8. Investimento

Investimento total: R$ 1.210.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 24%.
