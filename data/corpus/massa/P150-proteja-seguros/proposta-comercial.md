---
projeto_id: P150
cliente: Proteja Seguros
titulo: Migração de Data Warehouse para Nuvem com Databricks, AWS e Azure
segmento: Seguros
tecnologias: ["Databricks","AWS","Azure"]
servicos: ["Engenharia de Dados","Migração para Nuvem"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: confidencial
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P150
id: P150-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2024-11-13
prazo_meses: 7
valor: 2280000
margem: 0.26
---

# Proposta Comercial — Migração de Data Warehouse para Nuvem com Databricks, AWS e Azure

**Cliente:** Proteja Seguros
**Segmento:** Seguros
**Área responsável:** Cloud & Infra · **Dono da proposta:** Igor Peixoto
**Data:** 2024-11-13 · **Versão:** final

## 1. Contexto e desafio

O data warehouse on-premises da Proteja Seguros, com 12 TB de dados e 45 milhões de apólices ativas, apresentava lentidão nas análises e custos de manutenção de R$ 1,2 milhão/ano. A necessidade de escalar para 30% mais volume nos próximos dois anos exigia uma solução em nuvem.

## 2. Objetivo

Migrar o data warehouse para uma arquitetura lakehouse em nuvem, utilizando Databricks, AWS e Azure, garantindo escalabilidade, redução de custos e maior agilidade analítica.

## 3. Escopo da solução

- Avaliação e desenho da arquitetura lakehouse nas nuvens AWS e Azure, com Databricks como plataforma unificada de dados.
- Migração de 12 TB de dados históricos e 45 milhões de registros de apólices para o Databricks Delta Lake, com pipelines de ingestão batch e streaming.
- Implementação de camadas bronze, silver e gold no Databricks, com governança via Unity Catalog e integração com AWS S3 e Azure Data Lake Storage.
- Otimização de consultas e jobs Spark, com ajuste de partições e caching, visando redução de 40% no tempo de processamento.
- Configuração de segurança e compliance (LGPD) com controle de acesso baseado em funções e criptografia em repouso e em trânsito.

Tecnologias principais: Databricks, AWS, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Fase 1 – Descoberta e Planejamento: 4 semanas
- Fase 2 – Migração e Implementação: 12 semanas
- Fase 3 – Otimização e Testes: 8 semanas
- Fase 4 – Go Live e Suporte: 4 semanas

## 5. Entregáveis

- Documento de arquitetura de referência e plano de migração detalhado.
- Data warehouse migrado e validado, com 100% dos dados históricos e incrementais disponíveis no Databricks.
- Conjunto de 25 pipelines de dados automatizados e monitorados.
- Relatórios de desempenho e custos comparativos (on-premises vs. nuvem).
- Treinamento e transferência de conhecimento para 15 profissionais da equipe de dados do cliente.

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em nuvem AWS/Azure e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Complexidade na integração de fontes legadas com Databricks.
- Risco: Janela de migração curta para 12 TB de dados.
- Risco: Resistência à mudança por parte das equipes de BI.

## 8. Investimento

Investimento total: R$ 2.280.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 26%.
