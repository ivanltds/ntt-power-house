---
projeto_id: P146
cliente: Proteja Seguros
titulo: Governança de Dados e Conformidade LGPD para Operadora de Seguros
segmento: Seguros
tecnologias: ["Azure","Databricks","Snowflake"]
servicos: ["Governança de Dados","Change Management"]
area: Data & Analytics
dono: Quésia Ramos
confidencialidade: interna
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P146
id: P146-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-07-29
prazo_meses: 7
valor: 2140000
margem: 0.22
---

# Proposta Comercial — Governança de Dados e Conformidade LGPD para Operadora de Seguros

**Cliente:** Proteja Seguros
**Segmento:** Seguros
**Área responsável:** Data & Analytics · **Dono da proposta:** Quésia Ramos
**Data:** 2026-07-29 · **Versão:** final

## 1. Contexto e desafio

A Proteja Seguros opera com 4,2 milhões de apólices ativas e dados de clientes distribuídos em 12 sistemas legados, sem catálogo único de dados nem classificação de informações pessoais sensíveis. O atual processo de atendimento a titulares da LGPD leva em média 18 dias úteis, expondo a companhia a sanções da ANPD e a riscos reputacionais em um setor com 38% de crescimento em reclamações de privacidade.

## 2. Objetivo

Implantar uma estrutura de governança de dados e adequação à LGPD em 7 meses, com catálogo centralizado, classificação automatizada de dados pessoais e processo de atendimento a titulares em até 5 dias úteis.

## 3. Escopo da solução

- Catalogação e classificação de dados pessoais dos 12 sistemas de origem em Azure Purview, com linhagem integrada ao Databricks
- Implementação de políticas de mascaramento e controle de acesso a dados sensíveis no Snowflake, com segregação por perfil de negócio
- Construção de pipelines no Databricks para inventário automatizado de bases com dados pessoais e registro de operações de tratamento (ROPA)
- Definição de papéis e comitê de governança de dados, com 24 indicadores de qualidade e conformidade monitorados em dashboards no Azure
- Programa de Change Management com treinamento em LGPD para 480 colaboradores das áreas de sinistros, subscrição e atendimento

Tecnologias principais: Azure, Databricks, Snowflake.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Diagnóstico e gap analysis LGPD (6 semanas)
- Desenho da arquitetura de governança e catálogo de dados (8 semanas)
- Implementação em Azure, Databricks e Snowflake (10 semanas)
- Change Management, treinamento e go-live (6 semanas)

## 5. Entregáveis

- Catálogo de dados corporativo com 100% dos sistemas críticos mapeados e classificação de dados pessoais concluída
- Matriz de políticas de acesso e mascaramento implantada no Snowflake para 8 perfis de usuário
- Fluxo automatizado de atendimento a titulares de dados com SLA de 5 dias úteis
- Relatório de gap analysis LGPD com plano de ação priorizado em 32 controles
- Kit de Change Management com trilhas de treinamento, materiais de comunicação e pesquisa de adesão aplicada a 480 colaboradores

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em privacidade e LGPD, 1 consultor de change management e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa adesão das áreas de negócio ao novo processo de classificação de dados
- Risco: Qualidade e completidão insuficientes dos metadados dos 12 sistemas legados
- Risco: Atraso na validação jurídica dos controles LGPD pelo comitê de privacidade do cliente

## 8. Investimento

Investimento total: R$ 2.140.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 22%.
