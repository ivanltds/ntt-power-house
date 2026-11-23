---
projeto_id: P550
cliente: Financeira Rumo Certo
titulo: Migração do Data Warehouse para Nuvem com Databricks e Multicloud
segmento: Serviços Financeiros
tecnologias: ["Databricks","GCP","AWS"]
servicos: ["Engenharia de Dados"]
area: Cloud & Infra
dono: Carla Menezes
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P550
id: P550-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-05-11
prazo_meses: 10
valor: 280000
margem: 0.32
---

# Proposta Comercial — Migração do Data Warehouse para Nuvem com Databricks e Multicloud

**Cliente:** Financeira Rumo Certo
**Segmento:** Serviços Financeiros
**Área responsável:** Cloud & Infra · **Dono da proposta:** Carla Menezes
**Data:** 2025-05-11 · **Versão:** final

## 1. Contexto e desafio

A Financeira Rumo Certo processa 2,5 TB de dados financeiros diariamente em um data warehouse legado, com custos de manutenção 30% acima do orçado e tempo de indisponibilidade de 8 horas/mês. A empresa precisa migrar para a nuvem para reduzir custos e aumentar a agilidade analítica.

## 2. Objetivo

Migrar o data warehouse on-premises para uma arquitetura em nuvem utilizando Databricks nos provedores GCP e AWS, garantindo escalabilidade, redução de custos operacionais e disponibilidade dos dados.

## 3. Escopo da solução

- Avaliação e desenho da arquitetura alvo no Databricks sobre GCP e AWS, incluindo definição de camadas (raw, trusted, refined) e políticas de governança.
- Migração de 120 tabelas e 45 pipelines ETL do ambiente legado para o Databricks, com reengenharia para processamento distribuído.
- Implementação de ingestão incremental e streaming com Delta Lake para dados transacionais e de eventos.
- Configuração de clusters elásticos e políticas de auto-scaling para otimização de custos em GCP e AWS.
- Estabelecimento de práticas de segurança e conformidade (LGPD) com controle de acesso baseado em funções e criptografia em repouso e em trânsito.

Tecnologias principais: Databricks, GCP, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 10 meses, nas seguintes fases:

- Fase 1 - Descoberta e Arquitetura: 8 semanas
- Fase 2 - Migração Piloto e Validação: 12 semanas
- Fase 3 - Migração em Larga Escala: 16 semanas
- Fase 4 - Corte e Encerramento: 4 semanas

## 5. Entregáveis

- Documento de arquitetura alvo detalhado, com diagramas e justificativa de escolhas tecnológicas.
- Ambiente Databricks provisionado e configurado em GCP e AWS, com workspaces e clusters operacionais.
- Pipeline de migração executado para 120 tabelas, com validação de dados e relatório de reconciliação.
- Conjunto de 45 pipelines ETL reengenhados e documentados, prontos para operação.
- Plano de corte e runbook para descomissionamento do data warehouse legado, incluindo testes de carga e performance.

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em nuvem e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Resistência à mudança por parte das equipes de TI do cliente.
- Risco: Complexidade na integração entre ambientes GCP e AWS.
- Risco: Atrasos na obtenção de aprovações de segurança e conformidade.

## 8. Investimento

Investimento total: R$ 280.000, em parcelas mensais ao longo de 10 meses.

Margem praticada: 32%.
