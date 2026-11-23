---
projeto_id: P419
cliente: Laboratório Diagnóstico Preciso
titulo: Painéis executivos e plataforma de BI para análise de exames e operação
segmento: Saúde
tecnologias: ["Azure","Power BI","Snowflake"]
servicos: ["Engenharia de Dados","Analytics & BI"]
area: Data & Analytics
dono: Quésia Ramos
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P419
id: P419-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-09-08
prazo_meses: 5
valor: 1720000
margem: 0.34
---

# Proposta Comercial — Painéis executivos e plataforma de BI para análise de exames e operação

**Cliente:** Laboratório Diagnóstico Preciso
**Segmento:** Saúde
**Área responsável:** Data & Analytics · **Dono da proposta:** Quésia Ramos
**Data:** 2026-09-08 · **Versão:** final

## 1. Contexto e desafio

O Laboratório Diagnóstico Preciso processa cerca de 180 mil exames por mês em 12 unidades e não consegue consolidar indicadores de produção, faturamento e SLA em um único painel. Hoje, 60% dos relatórios executivos são montados manualmente em planilhas, com atraso de até 9 dias para a diretoria.

## 2. Objetivo

Implantar uma plataforma de dados e BI em Azure, Snowflake e Power BI para entregar painéis executivos confiáveis em até 1 dia útil, cobrindo produção de exames, faturamento e tempos de laudo.

## 3. Escopo da solução

- Ingestão de dados dos sistemas LIS, ERP e planilhas operacionais em Azure Data Factory e armazenamento em Azure Data Lake Storage
- Modelagem dimensional e camadas analíticas no Snowflake, com 45 tabelas de fatos e dimensões
- Construção de 8 painéis executivos em Power BI (produção por unidade, mix de exames, faturamento, SLA de laudo, glosa e ocupação)
- Governança de dados com catálogo, dicionário de indicadores e políticas de acesso por perfil no Power BI
- Automação de atualização diária dos painéis e alertas de desvio de SLA para a diretoria

Tecnologias principais: Azure, Power BI, Snowflake.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e arquitetura (5 semanas)
- Engenharia de dados e ingestão (8 semanas)
- Modelagem e painéis em Power BI (6 semanas)
- Homologação e treinamento (3 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e definição dos 30 indicadores executivos prioritários
- Pipeline de ingestão automatizado no Azure com 12 fontes conectadas
- Modelo analítico no Snowflake validado com a área de negócio
- 8 painéis em Power BI publicados e homologados pela diretoria
- Treinamento de 20 usuários-chave e manual de operação dos painéis

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa qualidade dos dados históricos do LIS
- Risco: Indisponibilidade das áreas de negócio para validação dos indicadores
- Risco: Mudanças de escopo nos painéis durante a homologação

## 8. Investimento

Investimento total: R$ 1.720.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 34%.
