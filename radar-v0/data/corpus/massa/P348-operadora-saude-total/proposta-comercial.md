---
projeto_id: P348
cliente: Operadora Saúde Total
titulo: Plataforma Lakehouse para Dados de Saúde com Kafka e Databricks
segmento: Saúde
tecnologias: ["Kafka","Python","Databricks"]
servicos: ["Engenharia de Dados","Governança de Dados"]
area: Data & Analytics
dono: Quésia Ramos
confidencialidade: confidencial
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P348
id: P348-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-01-11
prazo_meses: 10
valor: 2710000
margem: 0.24
---

# Proposta Comercial — Plataforma Lakehouse para Dados de Saúde com Kafka e Databricks

**Cliente:** Operadora Saúde Total
**Segmento:** Saúde
**Área responsável:** Data & Analytics · **Dono da proposta:** Quésia Ramos
**Data:** 2026-01-11 · **Versão:** final

## 1. Contexto e desafio

A Operadora Saúde Total gerencia 1,2 milhão de beneficiários e recebe diariamente 4 TB de dados de sinistros, autorizações e prontuários eletrônicos. Os dados estão dispersos em 12 sistemas legados, com relatórios gerenciais que levam até 48 horas para serem consolidados, impactando a tomada de decisão e a detecção de fraudes.

## 3. Escopo da solução

- Ingestão de dados em tempo real de 8 fontes críticas (sinistros, autorizações, prontuários) usando Apache Kafka
- Construção de pipeline de dados com Python e Databricks para transformação e enriquecimento
- Implementação de camadas bronze, prata e ouro no lakehouse Databricks
- Definição e implementação de políticas de governança de dados (catálogo, linhagem, qualidade) com ferramentas Databricks
- Migração de 12 relatórios legados para dashboards analíticos na plataforma

Tecnologias principais: Kafka, Python, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 10 meses, nas seguintes fases:

- Fase 1 - Discovery e Arquitetura: 6 semanas
- Fase 2 - Implementação da Ingestão e Lakehouse: 20 semanas
- Fase 3 - Governança e Migração de Relatórios: 10 semanas
- Fase 4 - Testes e Go-live: 4 semanas

## 5. Entregáveis

- Documento de arquitetura da plataforma lakehouse
- Pipeline de ingestão Kafka configurado para 8 fontes
- Camada de dados governada com catálogo e políticas de acesso
- Conjunto de 12 dashboards analíticos migrados
- Treinamento para 20 usuários-chave e documentação técnica

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em governança de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Complexidade na integração com sistemas legados
- Risco: Resistência à mudança por parte das áreas usuárias
- Risco: Atraso na obtenção de acessos e dados das fontes

## 8. Investimento

Investimento total: R$ 2.710.000, em parcelas mensais ao longo de 10 meses.

Margem praticada: 24%.
