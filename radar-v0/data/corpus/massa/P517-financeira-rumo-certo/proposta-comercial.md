---
projeto_id: P517
cliente: Financeira Rumo Certo
titulo: Lakehouse de Dados para Análise de Crédito e Cobrança
segmento: Serviços Financeiros
tecnologias: ["Python","Azure","Databricks","AWS"]
servicos: ["Engenharia de Dados","Governança de Dados"]
area: Data & Analytics
dono: Xênia Lacerda
confidencialidade: interna
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P517
id: P517-PROP
tipo_documental: proposta_comercial
status_documento: preliminar
data: 2026-10-20
prazo_meses: 6
valor: 930000
margem: 0.27
---

# Proposta Comercial — Lakehouse de Dados para Análise de Crédito e Cobrança

**Cliente:** Financeira Rumo Certo
**Segmento:** Serviços Financeiros
**Área responsável:** Data & Analytics · **Dono da proposta:** Xênia Lacerda
**Data:** 2026-10-20 · **Versão:** final

## 1. Contexto e desafio

A Financeira Rumo Certo processa cerca de 1,2 milhão de contratos de crédito ativos e recebe mais de 40 milhões de eventos transacionais por mês, hoje distribuídos entre bancos relacionais e planilhas departamentais. Esse cenário gera reconciliações manuais de até 15 dias para relatórios regulatórios e impede a análise em tempo quase real da inadimplência, que fechou o último trimestre em 7,8%.

## 2. Objetivo

Construir uma plataforma lakehouse na Azure com Databricks para unificar dados de crédito, cobrança e risco, reduzindo o tempo de disponibilização de dados de 15 dias para até 1 dia e criando base governada para analytics e modelos de risco.

## 3. Escopo da solução

- Ingestão batch e incremental de fontes transacionais em Azure Data Lake Storage Gen2, orquestrada com Databricks Workflows e pipelines em Python
- Construção de camadas bronze, silver e gold no Databricks com Delta Lake, incluindo histórico de alterações e tabelas de dimensão e fato para crédito e cobrança
- Integração de eventos de parceiros e serviços externos hospedados na AWS por meio de conectores seguros e rotinas Python de reconciliação
- Implementação de catálogo, linhagem e classificação de dados sensíveis com Databricks Unity Catalog e políticas de Governança de Dados alinhadas à LGPD
- Criação de 12 indicadores de inadimplência, aging de carteira e recuperação de crédito disponibilizados em dashboards para as áreas de risco e cobrança

Tecnologias principais: Python, Azure, Databricks, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e arquitetura (6 semanas)
- Fundação do lakehouse e governança (8 semanas)
- Pipelines de crédito e cobrança (8 semanas)
- Indicadores, validação e go-live (4 semanas)

## 5. Entregáveis

- Documento de arquitetura de referência do lakehouse em Azure e Databricks aprovado pelas áreas de TI e risco
- Pipelines de ingestão e transformação em produção para 9 fontes prioritárias, com monitoramento e alertas
- Camada gold com 12 indicadores de crédito e cobrança validados contra a base contábil
- Catálogo de dados com 100% das tabelas críticas classificadas e com linhagem documentada
- Plano de sustentação e transferência de conhecimento com treinamento de 20 usuários-chave

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em governança de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e padronização insuficientes nos dados legados de cobrança
- Risco: Dependência de acessos e liberações de rede entre Azure e AWS
- Risco: Baixa disponibilidade das áreas de negócio para validação dos indicadores

## 8. Investimento

Investimento total: R$ 930.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 27%.
