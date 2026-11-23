---
projeto_id: P351
cliente: Financeira Rumo Certo
titulo: Programa de Governança de Dados e Adequação LGPD para Operações de Crédito
segmento: Serviços Financeiros
tecnologias: ["Python","Snowflake","Databricks"]
servicos: ["Governança de Dados","Change Management"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: confidencial
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P351
id: P351-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-07-19
prazo_meses: 5
valor: 1920000
margem: 0.23
---

# Proposta Comercial — Programa de Governança de Dados e Adequação LGPD para Operações de Crédito

**Cliente:** Financeira Rumo Certo
**Segmento:** Serviços Financeiros
**Área responsável:** Data & Analytics · **Dono da proposta:** Ana Beatriz Lopes
**Data:** 2026-07-19 · **Versão:** final

## 1. Contexto e desafio

A Financeira Rumo Certo opera 42 milhões de registros de clientes distribuídos em 7 sistemas legados, sem catálogo único de dados nem classificação de informações pessoais sensíveis. O último diagnóstico interno apontou 63% dos campos de dados pessoais sem mapeamento de base legal, expondo a empresa a sanções da ANPD e a retrabalho em auditorias trimestrais.

## 2. Objetivo

Implantar uma estrutura de governança de dados com classificação LGPD, linhagem e controles de acesso sobre Python, Snowflake e Databricks, além de conduzir a mudança organizacional para adoção sustentada pelos times de negócio e tecnologia.

## 3. Escopo da solução

- Mapeamento e classificação de dados pessoais e sensíveis em 7 sistemas de origem, com pipelines de catalogação em Python e carga no Snowflake
- Implementação de linhagem de dados e política de retenção no Databricks, cobrindo 42 milhões de registros e 120 tabelas críticas
- Definição de papéis e matriz RACI de governança, com 4 bases legais documentadas e fluxo de atendimento a titulares em até 15 dias
- Configuração de controles de acesso baseados em perfil e mascaramento de dados sensíveis no Snowflake para 180 usuários
- Plano de Change Management com 8 workshops, treinamento de 60 colaboradores-chave e rede de 12 data stewards por área de negócio

Tecnologias principais: Python, Snowflake, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e mapeamento de dados (6 semanas)
- Implementação de catálogo, linhagem e controles (8 semanas)
- Capacitação e Change Management (4 semanas)
- Estabilização e entrega de indicadores (2 semanas)

## 5. Entregáveis

- Catálogo de dados com classificação LGPD de 120 tabelas críticas e dicionário de dados publicado
- Relatório de linhagem e mapa de fluxo de dados pessoais entre os 7 sistemas de origem
- Política de governança de dados e matriz RACI aprovada pelo comitê executivo
- Painel de monitoramento de conformidade LGPD com 15 indicadores no Snowflake
- Programa de capacitação executado com 60 colaboradores treinados e 12 data stewards certificados

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em governança e LGPD e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa qualidade e padronização dos metadados nos 7 sistemas legados
- Risco: Resistência dos times de negócio à mudança de papéis e responsabilidades
- Risco: Indisponibilidade de especialistas jurídicos do cliente para validação das bases legais

## 8. Investimento

Investimento total: R$ 1.920.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 23%.
