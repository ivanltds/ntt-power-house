---
projeto_id: P152
cliente: Operador Logístico Armazém Brasil
titulo: Painéis executivos e BI para operação logística com Power BI, Azure e Snowflake
segmento: Logística
tecnologias: ["Power BI","Azure","SAP","Snowflake"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Zilda Correia
confidencialidade: interna
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P152
id: P152-PROP
tipo_documental: proposta_comercial
status_documento: preliminar
data: 2026-10-09
prazo_meses: 3
valor: 810000
margem: 0.22
---

# Proposta Comercial — Painéis executivos e BI para operação logística com Power BI, Azure e Snowflake

**Cliente:** Operador Logístico Armazém Brasil
**Segmento:** Logística
**Área responsável:** Data & Analytics · **Dono da proposta:** Zilda Correia
**Data:** 2026-10-09 · **Versão:** final

## 1. Contexto e desafio

O Operador Logístico Armazém Brasil acompanha 42 indicadores operacionais em planilhas manuais e relatórios SAP extraídos sob demanda, o que gera até 5 dias de defasagem na visão de custo por entrega e ocupação de armazém. A diretoria não dispõe de uma camada única confiável para decisões sobre 18 centros de distribuição e cerca de 2,3 mil veículos/dia.

## 3. Escopo da solução

- Integração dos dados de SAP (SD, MM e TM) ao Azure Data Lake via pipelines de ingestão incremental
- Modelagem dimensional e camada semântica no Snowflake para custo por entrega, ocupação de armazém e nível de serviço
- Construção de 8 painéis executivos em Power BI com segurança por centro de distribuição e atualização diária
- Orquestração e monitoramento de cargas no Azure Data Factory com alertas de falha e SLA de execução
- Definição de catálogo de indicadores e regras de qualidade de dados para 42 KPIs prioritários

Tecnologias principais: Power BI, Azure, SAP, Snowflake.

## 4. Abordagem e cronograma

O projeto será executado em 3 meses, nas seguintes fases:

- Diagnóstico e arquitetura de dados (3 semanas)
- Ingestão e engenharia de dados no Azure e Snowflake (5 semanas)
- Construção e homologação dos painéis em Power BI (3 semanas)
- Go-live assistido e transferência de conhecimento (1 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e catálogo dos 42 KPIs com regras de cálculo
- Pipelines de ingestão SAP para Azure e Snowflake em produção
- Modelo semântico e camada de dados publicada no Snowflake
- 8 painéis executivos em Power BI homologados pela diretoria
- Manual de operação, monitoramento e plano de sustentação da plataforma

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista Power BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e padronização dos dados extraídos do SAP
- Risco: Restrições de acesso e janelas de extração nos sistemas legados
- Risco: Baixa adoção dos painéis pelas áreas operacionais

## 8. Investimento

Investimento total: R$ 810.000, em parcelas mensais ao longo de 3 meses.

Margem praticada: 22%.
