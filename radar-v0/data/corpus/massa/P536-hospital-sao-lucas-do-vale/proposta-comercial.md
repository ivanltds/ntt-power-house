---
projeto_id: P536
cliente: Hospital São Lucas do Vale
titulo: Governança de Dados e Adequação LGPD para Analytics Clínico
segmento: Saúde
tecnologias: ["Python","Azure","Databricks","Snowflake"]
servicos: ["Change Management","Governança de Dados"]
area: Data & Analytics
dono: Quésia Ramos
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P536
id: P536-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-03-23
prazo_meses: 6
valor: 560000
margem: 0.33
---

# Proposta Comercial — Governança de Dados e Adequação LGPD para Analytics Clínico

**Cliente:** Hospital São Lucas do Vale
**Segmento:** Saúde
**Área responsável:** Data & Analytics · **Dono da proposta:** Quésia Ramos
**Data:** 2026-03-23 · **Versão:** final

## 1. Contexto e desafio

O Hospital São Lucas do Vale mantém dados de 1,2 milhão de pacientes distribuídos entre sistemas de prontuário eletrônico, faturamento e laboratório, sem catálogo único nem classificação de dados sensíveis. A ausência de políticas formais de governança expõe o hospital a riscos de sanções da ANPD e a inconsistências em 38% dos relatórios gerenciais usados pela diretoria.

## 2. Objetivo

Implantar uma estrutura de governança de dados com base na LGPD, criando catálogo, classificação e políticas de acesso que sustentem a operação analítica do hospital em Azure, Databricks e Snowflake.

## 3. Escopo da solução

- Mapeamento e catalogação de 45 fontes de dados clínicos e administrativos com Databricks e Azure Purview
- Classificação de dados pessoais e sensíveis conforme a LGPD, com mascaramento aplicado em pipelines Python
- Definição de políticas de acesso baseadas em papéis (RBAC) no Snowflake para 6 perfis de usuários
- Construção de data products de indicadores assistenciais no Databricks, com linhagem e qualidade monitoradas
- Programa de Change Management com treinamento de 120 colaboradores em 4 trilhas de conscientização

Tecnologias principais: Python, Azure, Databricks, Snowflake.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e mapeamento de dados (6 semanas)
- Classificação LGPD e políticas de acesso (6 semanas)
- Implementação técnica em Azure, Databricks e Snowflake (8 semanas)
- Change Management e sustentação (4 semanas)

## 5. Entregáveis

- Catálogo de dados com 45 fontes catalogadas e 100% dos campos sensíveis classificados
- Matriz de políticas de acesso e mascaramento publicada e validada pelo jurídico e pelo DPO
- Painel de conformidade LGPD com 12 indicadores de monitoramento contínuo
- Plano de resposta a incidentes de dados e roteiro de notificação à ANPD
- Relatório de encerramento com plano de sustentação e capacitação de 120 colaboradores

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em privacidade e LGPD, 1 analista de change management e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa adesão das áreas clínicas aos novos processos de classificação
- Risco: Qualidade inconsistente dos metadados nas 45 fontes mapeadas
- Risco: Atraso na validação jurídica das políticas de tratamento de dados

## 8. Investimento

Investimento total: R$ 560.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 33%.
