---
projeto_id: P554
cliente: Ondas Móvel
titulo: Governança de dados e conformidade LGPD em base analítica Databricks
segmento: Telecom
tecnologias: ["Python","Databricks","Azure"]
servicos: ["Change Management"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P554
id: P554-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-01-08
prazo_meses: 5
valor: 1540000
margem: 0.23
---

# Proposta Comercial — Governança de dados e conformidade LGPD em base analítica Databricks

**Cliente:** Ondas Móvel
**Segmento:** Telecom
**Área responsável:** Data & Analytics · **Dono da proposta:** Henrique Matos
**Data:** 2026-01-08 · **Versão:** final

## 1. Contexto e desafio

A Ondas Móvel opera com 4,2 milhões de clientes e acumula cerca de 38 TB de dados de navegação, faturamento e suporte distribuídos entre sistemas legados e o data lake no Azure. O time jurídico apontou 17 lacunas de conformidade com a LGPD no último diagnóstico interno, incluindo ausência de catálogo de dados pessoais e de trilhas de consentimento rastreáveis.

## 2. Objetivo

Implantar uma estrutura de governança de dados e adequação à LGPD sobre a plataforma Databricks no Azure, com catálogo de dados pessoais, políticas de acesso e trilhas de consentimento auditáveis em 5 meses.

## 3. Escopo da solução

- Catalogação de 320 tabelas com classificação de dados pessoais e sensíveis usando Unity Catalog no Databricks
- Implementação de políticas de mascaramento e controle de acesso baseado em papéis em Python sobre o Azure Data Lake
- Construção de trilhas de consentimento e registro de tratamento de dados integradas ao Databricks
- Implantação de 24 indicadores de qualidade e conformidade de dados em dashboards no Azure
- Programa de Change Management com 6 workshops e treinamento de 180 usuários em práticas de proteção de dados

Tecnologias principais: Python, Databricks, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e desenho de governança (6 semanas)
- Catalogação e classificação de dados (6 semanas)
- Políticas de acesso e trilhas de consentimento (5 semanas)
- Indicadores, treinamento e sustentação (5 semanas)

## 5. Entregáveis

- Catálogo de dados pessoais com 320 tabelas classificadas e 3 níveis de sensibilidade
- Matriz de políticas de acesso e mascaramento publicada e aplicada no ambiente Databricks
- Registro de operações de tratamento e trilhas de consentimento auditáveis
- Painel de conformidade com 24 indicadores de qualidade e aderência à LGPD
- Plano de comunicação e capacitação com 180 colaboradores treinados e materiais de apoio

## 6. Equipe proposta

1 arquiteto de dados, 1 especialista em privacidade e LGPD, 2 engenheiros de dados, 1 analista de change management e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa adesão das áreas de negócio ao programa de treinamento
- Risco: Qualidade e completude dos metadados das 320 tabelas mapeadas
- Risco: Dependência de aprovações jurídicas para as trilhas de consentimento

## 8. Investimento

Investimento total: R$ 1.540.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 23%.
