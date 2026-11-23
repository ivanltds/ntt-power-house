---
projeto_id: P104
cliente: Ondas Móvel
titulo: Programa de Governança de Dados e Adequação à LGPD em Base Analítica
segmento: Telecom
tecnologias: ["Azure","Python","Databricks","Snowflake"]
servicos: ["Governança de Dados"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: confidencial
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P104
id: P104-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-01-27
prazo_meses: 8
valor: 1550000
margem: 0.29
---

# Proposta Comercial — Programa de Governança de Dados e Adequação à LGPD em Base Analítica

**Cliente:** Ondas Móvel
**Segmento:** Telecom
**Área responsável:** Data & Analytics · **Dono da proposta:** Henrique Matos
**Data:** 2026-01-27 · **Versão:** final

## 1. Contexto e desafio

A Ondas Móvel operava com dados de 12,4 milhões de clientes espalhados em silos de CRM, faturamento e rede, sem catálogo único nem classificação de dados pessoais. A ausência de políticas formais de retenção e mascaramento expunha a operadora a riscos de sanção da ANPD e a retrabalho em auditorias internas, que consumiam cerca de 1.800 horas por ano.

## 2. Objetivo

Implantar um framework de governança de dados com classificação de dados pessoais, catálogo corporativo e controles de acesso e retenção, garantindo conformidade com a LGPD nas bases analíticas da operadora.

## 3. Escopo da solução

- Diagnóstico e classificação de dados pessoais em 34 tabelas críticas de faturamento, CRM e rede, com mapeamento de bases legais e finalidades
- Construção de catálogo de dados e linhagem no Azure Purview integrado ao Databricks e ao Snowflake
- Implementação de políticas de mascaramento, pseudonimização e controle de acesso baseado em papéis via Python e Azure Key Vault
- Definição e automação de regras de retenção e descarte seguro de dados em pipelines Databricks e rotinas Python
- Painel de conformidade LGPD com indicadores de atendimento a titulares e trilhas de auditoria em Snowflake

Tecnologias principais: Azure, Python, Databricks, Snowflake.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Diagnóstico e classificação de dados (6 semanas)
- Desenho do framework e catálogo (8 semanas)
- Implementação de controles e automações (12 semanas)
- Homologação, treinamento e sustentação assistida (6 semanas)

## 5. Entregáveis

- Catálogo de dados corporativo com 34 tabelas classificadas e 100% dos campos sensíveis mapeados
- Matriz de bases legais e finalidades por processo de negócio, validada pelo jurídico do cliente
- Políticas de acesso e mascaramento implantadas em produção no Databricks e Snowflake
- Conjunto de 18 regras automatizadas de retenção e descarte com evidências de execução
- Dashboard de conformidade LGPD com trilhas de auditoria e relatório executivo de aderência

## 6. Equipe proposta

1 arquiteto de dados, 1 especialista em privacidade e LGPD, 2 engenheiros de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e dispersão dos metadados nas fontes legadas de CRM e faturamento
- Risco: Baixa adesão das áreas de negócio à classificação e às novas políticas de acesso
- Risco: Mudanças regulatórias ou reinterpretação de bases legais durante o projeto

## 8. Investimento

Investimento total: R$ 1.550.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 29%.
