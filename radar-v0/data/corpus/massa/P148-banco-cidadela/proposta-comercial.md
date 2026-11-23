---
projeto_id: P148
cliente: Banco Cidadela
titulo: Programa de Governança de Dados e Conformidade LGPD em Azure e Databricks
segmento: Serviços Financeiros
tecnologias: ["Azure","Databricks"]
servicos: ["Governança de Dados"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P148
id: P148-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-08-10
prazo_meses: 4
valor: 1980000
margem: 0.23
---

# Proposta Comercial — Programa de Governança de Dados e Conformidade LGPD em Azure e Databricks

**Cliente:** Banco Cidadela
**Segmento:** Serviços Financeiros
**Área responsável:** Data & Analytics · **Dono da proposta:** Ana Beatriz Lopes
**Data:** 2026-08-10 · **Versão:** final

## 1. Contexto e desafio

O Banco Cidadela mantém dados de 2,4 milhões de clientes distribuídos em 14 sistemas transacionais, sem catálogo corporativo e com políticas de acesso heterogêneas. A ausência de linhagem e classificação de dados expõe o banco a riscos de multas de até 2% do faturamento sob a LGPD e a atrasos no atendimento de solicitações de titulares.

## 2. Objetivo

Implantar um framework de governança de dados com catálogo, classificação e linhagem automatizados em Azure e Databricks, garantindo rastreabilidade e conformidade LGPD para os dados de clientes do banco.

## 3. Escopo da solução

- Implantação de catálogo de dados corporativo em Azure Purview com varredura inicial de 14 fontes
- Classificação automática de dados pessoais e sensíveis nos lakehouses Databricks
- Mapeamento de linhagem de dados ponta a ponta nos pipelines Databricks e Azure Data Factory
- Definição de políticas de acesso baseadas em papéis integradas ao Azure Active Directory
- Estruturação de processo de atendimento a titulares e registro de operações de tratamento (ROPA)

Tecnologias principais: Azure, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Diagnóstico e desenho do framework (4 semanas)
- Implantação do catálogo e classificação em Azure (5 semanas)
- Linhagem e políticas de acesso em Databricks (5 semanas)
- Processos LGPD e transferência de conhecimento (2 semanas)

## 5. Entregáveis

- Catálogo de dados corporativo com 1.200 ativos catalogados e classificados
- Matriz de classificação de dados pessoais e sensíveis aprovada pelo DPO
- Relatórios de linhagem de dados para 25 pipelines críticos
- Políticas de acesso e segregação de funções documentadas e implementadas
- Plano de adequação LGPD com cronograma de 90 dias pós-projeto

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em privacidade e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e padronização insuficiente dos metadados nas 14 fontes
- Risco: Baixa adesão das áreas de negócio à classificação de dados
- Risco: Mudanças regulatórias da LGPD durante a execução

## 8. Investimento

Investimento total: R$ 1.980.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 23%.
