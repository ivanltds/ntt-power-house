---
projeto_id: P005
cliente: Cooperativa de Crédito Horizonte
titulo: Migração do data warehouse para Azure Synapse com governança LGPD
segmento: Serviços Financeiros
tecnologias: ["Azure","Power BI","Python"]
servicos: ["Migração para Nuvem","Governança de Dados","Analytics & BI","Engenharia de Dados"]
area: Cloud & Data
dono: Thiago Ramos
confidencialidade: confidencial
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P005
id: P005-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-01-15
prazo_meses: 8
valor: 3100000
margem: 0.33
---

# Proposta Comercial — Migração do data warehouse para Azure Synapse com governança LGPD

**Cliente:** Cooperativa de Crédito Horizonte
**Segmento:** Serviços Financeiros
**Área responsável:** Cloud & Data · **Dono da proposta:** Thiago Ramos
**Data:** 2025-01-15 · **Versão:** final

## 1. Contexto e desafio

O data warehouse on-premises estava no limite de capacidade, com cargas noturnas de 9 horas e sem controle de acesso a dados pessoais exigido pela LGPD.

## 2. Objetivo

Migrar o data warehouse para Azure Synapse, reduzir a janela de carga e implantar governança de dados pessoais.

## 3. Escopo da solução

- Migração de 1.200 tabelas e 300 rotinas ETL para Azure Synapse e Data Factory
- Catálogo de dados e classificação de dados pessoais
- Mascaramento dinâmico e controle de acesso por perfil
- Reconstrução de 40 relatórios em Power BI

Tecnologias principais: Azure, Power BI, Python.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Assessment (4 semanas)
- Migração em ondas (20 semanas)
- Governança e LGPD (6 semanas, em paralelo)
- Desligamento do legado (4 semanas)

## 5. Entregáveis

- Data warehouse migrado
- Catálogo e classificação LGPD
- 40 relatórios migrados
- Desligamento do ambiente legado

## 6. Equipe proposta

1 arquiteto cloud, 4 engenheiros de dados, 1 especialista em governança, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Rotinas ETL sem documentação
- Risco: Congelamento de mudanças no fechamento contábil

## 8. Investimento

Investimento total: R$ 3.100.000, em parcelas mensais ao longo de 8 meses.
Margem praticada: 33%.
