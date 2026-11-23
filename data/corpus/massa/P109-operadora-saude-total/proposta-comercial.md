---
projeto_id: P109
cliente: Operadora Saúde Total
titulo: Implantação de CRM e Jornada do Cliente com Engenharia de Dados em Azure e Kafka
segmento: Saúde
tecnologias: ["Kafka","Azure"]
servicos: ["Engenharia de Dados","Change Management","CRM"]
area: Digital & CRM
dono: Sabrina Moura
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P109
id: P109-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-01-02
prazo_meses: 10
valor: 280000
margem: 0.23
---

# Proposta Comercial — Implantação de CRM e Jornada do Cliente com Engenharia de Dados em Azure e Kafka

**Cliente:** Operadora Saúde Total
**Segmento:** Saúde
**Área responsável:** Digital & CRM · **Dono da proposta:** Sabrina Moura
**Data:** 2025-01-02 · **Versão:** final

## 1. Contexto e desafio

A Operadora Saúde Total, com cerca de 1,2 milhão de beneficiários e 4.800 colaboradores, operava com dados de clientes dispersos em 7 sistemas legados, gerando atendimentos duplicados e tempo médio de resolução de chamados de 9 dias. A ausência de uma visão unificada da jornada impedia ações de retenção e elevava o churn anual para 14,8% na carteira de planos individuais.

## 2. Objetivo

Implantar uma plataforma de CRM unificada com jornada do cliente integrada, apoiada em streaming de dados no Kafka e serviços Azure, para reduzir o tempo de atendimento e aumentar a retenção de beneficiários.

## 3. Escopo da solução

- Integração de 7 sistemas legados via Kafka, com tópicos de eventos de beneficiários e sinistros em streaming near real-time
- Construção de pipeline de dados no Azure Data Factory e Azure Databricks para consolidar a visão 360º do cliente
- Implantação do CRM com cadastro único, histórico de interações e régua de relacionamento para 1,2 milhão de beneficiários
- Modelagem de jornada do cliente com 12 pontos de contato mapeados e painéis de indicadores no Power BI
- Programa de Change Management com treinamento de 1.800 usuários em 3 ondas e comunicação interna estruturada

Tecnologias principais: Kafka, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 10 meses, nas seguintes fases:

- Descoberta e Arquitetura
- Construção dos Pipelines de Dados e Integrações Kafka/Azure
- Implantação do CRM e Modelagem da Jornada
- Rollout, Treinamento e Estabilização

## 5. Entregáveis

- Plataforma de CRM em produção com cadastro único de beneficiários e histórico unificado de interações
- Pipeline de streaming Kafka e camada analítica em Azure operando com latência inferior a 5 minutos
- Mapa da jornada do cliente com 12 pontos de contato e 24 indicadores de monitoramento
- Painéis gerenciais de retenção, churn e tempo de atendimento no Power BI
- Plano de Change Management concluído, com 1.800 usuários treinados e material de apoio publicado

## 6. Equipe proposta

1 arquiteto de soluções, 2 engenheiros de dados, 1 especialista em CRM, 1 analista de change management e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e padronização dos dados dos 7 sistemas legados
- Risco: Resistência dos 1.800 usuários à adoção do novo CRM
- Risco: Dependência de janelas de integração com sistemas de terceiros

## 8. Investimento

Investimento total: R$ 280.000, em parcelas mensais ao longo de 10 meses.

Margem praticada: 23%.
