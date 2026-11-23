---
projeto_id: P119
cliente: Atacadão Popular Sul
titulo: Migração do Data Warehouse para Nuvem Multiplataforma no Varejo
segmento: Varejo
tecnologias: ["GCP","Databricks","Snowflake","Azure"]
servicos: ["Engenharia de Dados","Migração para Nuvem"]
area: Cloud & Infra
dono: Gustavo Lemos
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P119
id: P119-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-08-06
prazo_meses: 7
valor: 1180000
margem: 0.26
---

# Proposta Comercial — Migração do Data Warehouse para Nuvem Multiplataforma no Varejo

**Cliente:** Atacadão Popular Sul
**Segmento:** Varejo
**Área responsável:** Cloud & Infra · **Dono da proposta:** Gustavo Lemos
**Data:** 2026-08-06 · **Versão:** final

## 1. Contexto e desafio

O Atacadão Popular Sul opera hoje com um data warehouse on-premises que processa cerca de 4,2 TB/dia e leva mais de 9 horas para consolidar o fechamento diário de vendas de 87 lojas. A base cresce 18% ao ano e a janela de carga já compromete relatórios de estoque e abastecimento nas manhãs.

## 2. Objetivo

Migrar o data warehouse para uma arquitetura em nuvem com GCP, Databricks, Snowflake e Azure, reduzindo o tempo de carga diária para até 90 minutos e ampliando a capacidade analítica do varejo.

## 3. Escopo da solução

- Assessment e desenho da arquitetura alvo em GCP e Azure, com definição do lakehouse em Databricks e do data warehouse no Snowflake
- Migração de 340 pipelines e 1.800 tabelas do ambiente on-premises para a nuvem, com reengenharia dos processos críticos
- Implementação de ingestão CDC para 12 sistemas de origem (ERP, PDV e WMS) usando Databricks e serviços gerenciados GCP
- Configuração de governança, catálogo de dados e controle de custos nas plataformas Azure e GCP
- Testes de reconciliação, paralelo assistido de 4 semanas e descomissionamento do ambiente legado

Tecnologias principais: GCP, Databricks, Snowflake, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Assessment e arquitetura (6 semanas)
- Migração e reengenharia de pipelines (14 semanas)
- Paralelo assistido e validação (6 semanas)
- Descomissionamento e sustentação (2 semanas)

## 5. Entregáveis

- Documento de arquitetura alvo multi-cloud aprovado
- 340 pipelines migrados e validados em produção
- Painéis de reconciliação com aderência mínima de 99,5% entre origem e destino
- Catálogo de dados e políticas de governança publicados
- Relatório de descomissionamento do data warehouse on-premises

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em nuvem e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e padronização dos dados legados de PDV
- Risco: Janela de paralelo insuficiente para validação completa
- Risco: Dependência de times internos para liberação de acessos e redes

## 8. Investimento

Investimento total: R$ 1.180.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 26%.
