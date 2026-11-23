---
projeto_id: P508
cliente: Escudo Auto Seguros
titulo: Migração do Data Warehouse para Snowflake no Azure com Engenharia de Dados
segmento: Seguros
tecnologias: ["Snowflake","Azure"]
servicos: ["Migração para Nuvem","Engenharia de Dados"]
area: Cloud & Infra
dono: Débora Castilho
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P508
id: P508-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-05-13
prazo_meses: 8
valor: 820000
margem: 0.26
---

# Proposta Comercial — Migração do Data Warehouse para Snowflake no Azure com Engenharia de Dados

**Cliente:** Escudo Auto Seguros
**Segmento:** Seguros
**Área responsável:** Cloud & Infra · **Dono da proposta:** Débora Castilho
**Data:** 2025-05-13 · **Versão:** final

## 1. Contexto e desafio

A Escudo Auto Seguros processava 4,2 TB de dados de apólices e sinistros em um data warehouse on-premises com janelas de carga noturnas de 7 horas, o que atrasava a apuração de sinistralidade e limitava a análise a relatórios diários. Com 1,8 milhão de apólices ativas e 320 usuários de BI, a infraestrutura local não suportava o crescimento de 35% ao ano no volume de dados de telemetria de veículos.

## 2. Objetivo

Migrar o data warehouse da Escudo Auto Seguros para Snowflake no Azure em 8 meses, reduzindo a latência das cargas e habilitando análises quase em tempo real para as áreas de subscrição e sinistros.

## 3. Escopo da solução

- Assessment e mapeamento de 240 objetos do data warehouse legado, incluindo 95 procedures e 60 cubos de relatórios
- Modelagem dimensional no Snowflake com camadas raw, trusted e refined e definição de warehouses virtuais por domínio de negócio
- Construção de pipelines de ingestão e transformação no Azure Data Factory e dbt para 38 fontes de dados de apólices, sinistros e telemetria
- Migração e reescrita de 180 rotinas ETL e validação de paridade de dados com reconciliação financeira de sinistralidade
- Implementação de governança de dados, controle de acesso por perfil e monitoramento de custos de consumo no Snowflake

Tecnologias principais: Snowflake, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Assessment e desenho da arquitetura alvo (6 semanas)
- Provisionamento do Snowflake no Azure e construção dos pipelines (12 semanas)
- Migração das rotinas ETL por ondas e validação de paridade (10 semanas)
- Estabilização, governança e transferência de conhecimento (4 semanas)

## 5. Entregáveis

- Documento de assessment com inventário dos 240 objetos legados e plano de migração por onda
- Ambiente Snowflake no Azure provisionado com camadas raw, trusted e refined e políticas de acesso
- 38 pipelines de ingestão e transformação em produção no Azure Data Factory e dbt
- 180 rotinas ETL migradas com relatório de paridade e reconciliação de sinistralidade aprovado pela área financeira
- Painéis de monitoramento de custos e desempenho do Snowflake e runbook operacional de sustentação

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em Snowflake, 1 analista de governança de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Divergência de dados entre o legado e o Snowflake durante a reconciliação de sinistralidade
- Risco: Dependência de janelas de acesso restritas aos sistemas de origem para extração de dados
- Risco: Consumo do Snowflake acima do previsto por consultas mal otimizadas de usuários de BI

## 8. Investimento

Investimento total: R$ 820.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 26%.
