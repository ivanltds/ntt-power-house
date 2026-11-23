---
projeto_id: P589
cliente: Financeira Rumo Certo
titulo: Modelo de risco de crédito com dados governados em Python, AWS e Snowflake
segmento: Serviços Financeiros
tecnologias: ["Python","AWS","Snowflake"]
servicos: ["Governança de Dados","Data Science / ML"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P589
id: P589-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-04-18
prazo_meses: 5
valor: 1600000
margem: 0.24
---

# Proposta Comercial — Modelo de risco de crédito com dados governados em Python, AWS e Snowflake

**Cliente:** Financeira Rumo Certo
**Segmento:** Serviços Financeiros
**Área responsável:** AI & Automation · **Dono da proposta:** Bruno Tavares
**Data:** 2025-04-18 · **Versão:** final

## 1. Contexto e desafio

A Financeira Rumo Certo, com carteira de R$ 2,3 bilhões em crédito pessoal e consignado, decide hoje 68% das concessões com um scorecard legado em planilhas e regras manuais, o que gera taxa de inadimplência de 9,4% acima da meta de 7%. A base de dados está fragmentada entre sistemas de originação e cobrança, sem linhagem nem catálogo, impedindo a recalibragem mensal do modelo.

## 2. Objetivo

Construir um modelo de risco de crédito em Python, com dados integrados no Snowflake e processamento na AWS, sob governança de dados formalizada, elevando o poder preditivo e reduzindo a inadimplência da carteira de crédito pessoal.

## 3. Escopo da solução

- Diagnóstico e catálogo das fontes de crédito e cobrança no Snowflake, com linhagem e dicionário de dados
- Engenharia de features e treinamento de modelo de score em Python, com validação estatística e monitoramento de drift
- Implantação do pipeline de scoring na AWS, com versionamento de modelos e trilha de auditoria
- Definição de políticas de Governança de Dados: stewardship, qualidade e segregação de acessos
- Painéis de acompanhamento de performance do modelo e da inadimplência por safra

Tecnologias principais: Python, AWS, Snowflake.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e governança de dados (6 semanas)
- Desenvolvimento e validação do modelo (8 semanas)
- Implantação do pipeline e monitoramento (6 semanas)

## 5. Entregáveis

- Catálogo de dados de crédito com 100% das fontes críticas mapeadas e linhagem documentada
- Modelo de score de crédito validado, com KS e AUC reportados e comparativo ao scorecard atual
- Pipeline de scoring em produção na AWS consumindo dados do Snowflake
- Política de governança de dados aprovada, com papéis e indicadores de qualidade definidos
- Relatório de monitoramento mensal do modelo e da inadimplência por safra

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 especialista em governança de dados.

## 7. Premissas e riscos

- Risco: Qualidade e cobertura insuficiente dos dados históricos de crédito
- Risco: Baixa adesão das áreas de negócio às novas políticas de governança
- Risco: Prazo apertado para validação estatística e aprovação do modelo pelo comitê de risco

## 8. Investimento

Investimento total: R$ 1.600.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 24%.
