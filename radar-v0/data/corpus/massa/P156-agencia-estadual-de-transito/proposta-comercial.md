---
projeto_id: P156
cliente: Agência Estadual de Trânsito
titulo: Migração do Data Warehouse para Snowflake na Nuvem Azure
segmento: Setor Público
tecnologias: ["Snowflake","Azure"]
servicos: ["Engenharia de Dados","Migração para Nuvem"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P156
id: P156-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-05-27
prazo_meses: 8
valor: 1250000
margem: 0.19
---

# Proposta Comercial — Migração do Data Warehouse para Snowflake na Nuvem Azure

**Cliente:** Agência Estadual de Trânsito
**Segmento:** Setor Público
**Área responsável:** Cloud & Infra · **Dono da proposta:** Igor Peixoto
**Data:** 2026-05-27 · **Versão:** final

## 1. Contexto e desafio

A Agência Estadual de Trânsito opera hoje um data warehouse on-premises com cerca de 4,2 TB de dados históricos de habilitação, veículos e infrações, com janelas de carga noturna que chegam a 6 horas e relatórios gerenciais disponíveis apenas no dia seguinte. O ambiente atual apresenta indisponibilidade média de 3 horas por mês e custos crescentes de manutenção de servidores e licenças, limitando a análise de dados para fiscalização e atendimento ao cidadão.

## 2. Objetivo

Migrar o data warehouse on-premises para a plataforma Snowflake no Azure em 8 meses, reduzindo a janela de carga para até 90 minutos e disponibilizando dados analíticos próximos do tempo real para as áreas de fiscalização e gestão.

## 3. Escopo da solução

- Assessment e mapeamento dos 4,2 TB de dados e dos 180 processos de ETL existentes, com plano de migração para Snowflake
- Reengenharia dos pipelines de ingestão e transformação com Azure Data Factory e Snowflake Tasks, adotando modelagem dimensional em camadas Bronze, Silver e Gold
- Configuração da infraestrutura Azure (Storage Accounts, Key Vault, Virtual Network e integração privada com Snowflake) com foco em segurança e LGPD
- Migração e validação paralela dos data marts de habilitação, veículos e infrações, com reconciliação de 100% dos indicadores críticos
- Implementação de governança de dados, controle de acesso por perfil e monitoramento de custos e performance no Snowflake

Tecnologias principais: Snowflake, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Assessment e arquitetura-alvo (6 semanas)
- Fundação Azure e Snowflake e reengenharia de pipelines (12 semanas)
- Migração e validação paralela dos data marts (10 semanas)
- Go-live, estabilização e transferência de conhecimento (4 semanas)

## 5. Entregáveis

- Documento de assessment e arquitetura-alvo da solução Snowflake no Azure aprovado
- Pipelines de ingestão e transformação reengenheirados e em produção no Azure Data Factory e Snowflake
- Data marts de habilitação, veículos e infrações migrados e validados com relatório de reconciliação
- Painéis de monitoramento de performance, custos e qualidade de dados no Snowflake
- Plano de sustentação, runbook operacional e capacitação de 12 profissionais do cliente

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em cloud Azure e 1 analista de qualidade de dados.

## 7. Premissas e riscos

- Risco: Atraso na liberação de acessos e redes pelo órgão de TI do cliente
- Risco: Divergências de dados na reconciliação entre ambiente legado e Snowflake
- Risco: Janela de cutover limitada pelos períodos de maior demanda do órgão

## 8. Investimento

Investimento total: R$ 1.250.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 19%.
