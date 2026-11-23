---
projeto_id: P552
cliente: Rede de Clínicas Bem Viver
titulo: Painéis executivos e BI para rede de clínicas com SAP, Snowflake e Power BI
segmento: Saúde
tecnologias: ["SAP","Snowflake","Azure","Power BI"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Leonardo Pires
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P552
id: P552-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-03-13
prazo_meses: 2
valor: 820000
margem: 0.23
---

# Proposta Comercial — Painéis executivos e BI para rede de clínicas com SAP, Snowflake e Power BI

**Cliente:** Rede de Clínicas Bem Viver
**Segmento:** Saúde
**Área responsável:** Data & Analytics · **Dono da proposta:** Leonardo Pires
**Data:** 2026-03-13 · **Versão:** final

## 1. Contexto e desafio

A Rede de Clínicas Bem Viver, com 38 unidades e cerca de 1,2 milhão de atendimentos por ano, consolidava indicadores financeiros e assistenciais em planilhas manuais, com fechamento gerencial levando até 12 dias úteis. A falta de uma visão única de faturamento, glosas, ocupação e produção por especialidade dificultava a decisão da diretoria e a gestão de 27 centros de custo.

## 2. Objetivo

Implantar uma camada analítica corporativa com painéis executivos no Power BI, apoiada em engenharia de dados no Snowflake e Azure, reduzindo o ciclo de fechamento gerencial e dando visibilidade diária aos indicadores estratégicos.

## 3. Escopo da solução

- Extração e integração de dados do SAP (financeiro, compras e controladoria) para o Snowflake via pipelines no Azure Data Factory
- Modelagem dimensional no Snowflake com camadas raw, tratada e analítica para indicadores assistenciais e financeiros
- Construção de 9 painéis executivos no Power BI (faturamento, glosas, ocupação de leitos, produção por especialidade, custos por centro)
- Governança de dados com catálogo, dicionário de indicadores e políticas de acesso por perfil no Power BI e Snowflake
- Automação de cargas diárias e monitoramento de qualidade de dados no Azure, com alertas de falha e SLA de atualização

Tecnologias principais: SAP, Snowflake, Azure, Power BI.

## 4. Abordagem e cronograma

O projeto será executado em 2 meses, nas seguintes fases:

- Discovery e arquitetura de dados (2 semanas)
- Engenharia de dados e integração SAP–Snowflake–Azure (3 semanas)
- Construção dos painéis no Power BI (2 semanas)
- Homologação, treinamento e go-live (1 semanas)

## 5. Entregáveis

- Pipeline automatizado SAP para Snowflake com carga diária e logs de execução
- Modelo dimensional documentado no Snowflake cobrindo 27 centros de custo e 38 unidades
- 9 painéis executivos publicados no Power BI com controle de acesso por perfil
- Dicionário de 45 indicadores e catálogo de dados corporativo
- Relatório de qualidade de dados e plano de monitoramento com alertas no Azure

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e padronização dos dados de origem no SAP
- Risco: Dependência de acessos e janelas de TI do cliente para extrações
- Risco: Mudanças de escopo nos indicadores durante a construção dos painéis

## 8. Investimento

Investimento total: R$ 820.000, em parcelas mensais ao longo de 2 meses.

Margem praticada: 23%.
