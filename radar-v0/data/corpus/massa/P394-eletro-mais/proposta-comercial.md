---
projeto_id: P394
cliente: Eletro Mais
titulo: Plataforma Lakehouse para Dados de Varejo com Kafka, Databricks e Nuvem Híbrida
segmento: Varejo
tecnologias: ["Kafka","Databricks","Azure","AWS"]
servicos: ["Migração para Nuvem","Engenharia de Dados","Governança de Dados"]
area: Data & Analytics
dono: André Vasconcelos
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P394
id: P394-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-10-21
prazo_meses: 9
valor: 12000000
margem: 0.33
---

# Proposta Comercial — Plataforma Lakehouse para Dados de Varejo com Kafka, Databricks e Nuvem Híbrida

**Cliente:** Eletro Mais
**Segmento:** Varejo
**Área responsável:** Data & Analytics · **Dono da proposta:** André Vasconcelos
**Data:** 2026-10-21 · **Versão:** final

## 1. Contexto e desafio

A Eletro Mais, com 320 lojas e faturamento anual de R$ 4,2 bilhões, enfrenta dados fragmentados em sistemas legados e planilhas, levando a decisões lentas e perda de oportunidades. O time de BI gasta 70% do tempo em extração manual, sem visão unificada de estoque e vendas em tempo real.

## 2. Objetivo

Implementar uma plataforma lakehouse em 9 meses para unificar dados de vendas, estoque e clientes, permitindo analytics em tempo real e governança centralizada.

## 3. Escopo da solução

- Migração de 12 fontes de dados on-premises para Azure e AWS, com ingestão via Kafka para eventos de vendas e estoque
- Construção de camadas bronze, silver e gold no Databricks, com Delta Lake para armazenamento
- Implementação de catálogo de dados e linhagem no Databricks Unity Catalog para governança
- Integração de dados de 320 lojas e e-commerce, com pipelines em tempo real para 50 mil eventos/minuto
- Treinamento de 40 usuários de negócio e TI para autoatendimento analítico

Tecnologias principais: Kafka, Databricks, Azure, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 9 meses, nas seguintes fases:

- Diagnóstico e Arquitetura (8 semanas)
- Migração e Ingestão (14 semanas)
- Governança e Analytics (10 semanas)
- Go-live e Suporte (4 semanas)

## 5. Entregáveis

- Documento de arquitetura de referência do lakehouse com diagramas de fluxo de dados
- Pipelines de ingestão Kafka-Databricks operacionais para 12 fontes
- Catálogo de dados com 200 ativos catalogados e políticas de acesso
- Dashboards de vendas e estoque em tempo real para 5 áreas de negócio
- Relatório de migração e corte de 8 sistemas legados, com plano de descomissionamento

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em governança e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Atraso na migração de fontes legadas devido à complexidade dos sistemas
- Risco: Resistência dos usuários à mudança para autoatendimento
- Risco: Integração de dados em tempo real com latência acima do esperado

## 8. Investimento

Investimento total: R$ 12.000.000, em parcelas mensais ao longo de 9 meses.

Margem praticada: 33%.
