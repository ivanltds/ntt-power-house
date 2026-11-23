---
projeto_id: P124
cliente: Rede de Clínicas Bem Viver
titulo: Plataforma de Dados Lakehouse para Rede de Clínicas Bem Viver
segmento: Saúde
tecnologias: ["Snowflake","Azure","AWS"]
servicos: ["Engenharia de Dados","Governança de Dados"]
area: Data & Analytics
dono: Quésia Ramos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P124
id: P124-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2024-12-24
prazo_meses: 12
valor: 2210000
margem: 0.34
---

# Proposta Comercial — Plataforma de Dados Lakehouse para Rede de Clínicas Bem Viver

**Cliente:** Rede de Clínicas Bem Viver
**Segmento:** Saúde
**Área responsável:** Data & Analytics · **Dono da proposta:** Quésia Ramos
**Data:** 2024-12-24 · **Versão:** final

## 1. Contexto e desafio

A Rede de Clínicas Bem Viver, com 45 unidades e 1,2 milhão de atendimentos anuais, enfrentava dados fragmentados em 12 sistemas distintos, gerando relatórios manuais que levavam até 5 dias para consolidar indicadores de ocupação e faturamento. A falta de governança impedia a visão unificada do paciente e a análise preditiva de demanda.

## 2. Objetivo

Implementar uma plataforma de dados lakehouse integrada para centralizar e governar os dados clínicos e operacionais, permitindo análises em tempo quase real e suporte à decisão baseada em dados.

## 3. Escopo da solução

- Migração e integração de dados de 12 fontes para o Snowflake, utilizando pipelines ELT orquestrados no Azure Data Factory.
- Implementação de camada de governança de dados com catálogo, linhagem e políticas de acesso no Azure Purview.
- Construção de data lake na AWS S3 para armazenamento de dados brutos e semi-estruturados, com integração ao Snowflake via Snowpipe.
- Desenvolvimento de modelos dimensionais e camada semântica para áreas de negócio: operações clínicas, financeiro e experiência do paciente.
- Configuração de monitoramento e alertas de qualidade de dados com Azure Monitor e Snowflake Alerts.

Tecnologias principais: Snowflake, Azure, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 12 meses, nas seguintes fases:

- Fase 1 - Discovery e Arquitetura: 8 semanas
- Fase 2 - Implementação da Plataforma e Ingestão: 20 semanas
- Fase 3 - Governança e Modelagem: 12 semanas
- Fase 4 - Entrega e Sustentação: 8 semanas

## 5. Entregáveis

- Documento de arquitetura de dados lakehouse e plano de governança.
- Pipeline de ingestão automatizado para 12 fontes, com SLA de atualização de até 1 hora.
- Catálogo de dados com 200 ativos catalogados e políticas de acesso definidas.
- Dashboard executivo com 15 indicadores-chave para acompanhamento diário.
- Relatório de qualidade de dados com métricas e plano de correção.

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em governança de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Resistência à mudança por parte das equipes das clínicas na adoção de novos processos de dados.
- Risco: Complexidade na integração de sistemas legados com diferentes formatos e qualidades de dados.
- Risco: Dependência de aprovações de segurança e conformidade para dados sensíveis de saúde.

## 8. Investimento

Investimento total: R$ 2.210.000, em parcelas mensais ao longo de 12 meses.

Margem praticada: 34%.
