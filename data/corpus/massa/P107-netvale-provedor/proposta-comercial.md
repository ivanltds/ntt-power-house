---
projeto_id: P107
cliente: NetVale Provedor
titulo: Modelo de risco de crédito com governança de dados em Snowflake e AWS
segmento: Telecom
tecnologias: ["Snowflake","AWS"]
servicos: ["Governança de Dados"]
area: AI & Automation
dono: João Pedro Sales
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P107
id: P107-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-07-20
prazo_meses: 8
valor: 1640000
margem: 0.29
---

# Proposta Comercial — Modelo de risco de crédito com governança de dados em Snowflake e AWS

**Cliente:** NetVale Provedor
**Segmento:** Telecom
**Área responsável:** AI & Automation · **Dono da proposta:** João Pedro Sales
**Data:** 2026-07-20 · **Versão:** final

## 1. Contexto e desafio

A NetVale Provedor tem 180 mil clientes ativos e sofre com inadimplência de 9,2% na base de assinantes, concentrada em planos residenciais de baixo ticket. A análise de crédito hoje é manual e baseada em planilhas, com 4 dias de prazo médio para decisão de habilitação e sem rastreabilidade sobre os dados usados.

## 2. Objetivo

Implantar um modelo de risco de crédito automatizado sobre base governada em Snowflake e AWS, reduzindo o prazo de decisão para até 1 dia e a inadimplência em 2 pontos percentuais em 8 meses.

## 3. Escopo da solução

- Diagnóstico e catalogação das fontes de dados de cadastro, pagamento e uso em Snowflake, com definição de 120 atributos candidatos ao modelo
- Implementação de camada de governança de dados com data lineage, política de qualidade e dicionário de negócio para as tabelas críticas de crédito
- Construção de pipelines de ingestão e tratamento na AWS para alimentar o feature store do modelo de risco
- Desenvolvimento e validação do modelo de risco de crédito com backtesting sobre 24 meses de histórico
- Publicação de painéis de monitoramento de performance do modelo e de indicadores de inadimplência por segmento

Tecnologias principais: Snowflake, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Diagnóstico e governança de dados (8 semanas)
- Engenharia de dados e feature store (10 semanas)
- Desenvolvimento e validação do modelo (10 semanas)
- Monitoramento e transferência de conhecimento (4 semanas)

## 5. Entregáveis

- Catálogo de dados e dicionário de negócio das fontes de crédito aprovado pelo cliente
- Políticas de governança e qualidade de dados implantadas em Snowflake
- Pipeline de ingestão e feature store operacional na AWS
- Modelo de risco de crédito documentado com relatório de backtesting e métricas de AUC
- Painéis de monitoramento e manual de operação do modelo entregues

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade insuficiente do histórico de pagamentos para treinar o modelo
- Risco: Baixa adesão das áreas de crédito e cobrança às novas políticas de governança
- Risco: Atraso na liberação de acessos às fontes legadas na AWS

## 8. Investimento

Investimento total: R$ 1.640.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 29%.
