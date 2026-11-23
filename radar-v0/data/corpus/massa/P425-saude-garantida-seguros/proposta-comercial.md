---
projeto_id: P425
cliente: Saúde Garantida Seguros
titulo: Implantação de CRM Salesforce e Jornada do Cliente Omnicanal
segmento: Seguros
tecnologias: ["Salesforce","Kafka","Azure"]
servicos: ["CRM","Change Management","Engenharia de Dados"]
area: Digital & CRM
dono: Mariana Teixeira
confidencialidade: interna
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P425
id: P425-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-08-17
prazo_meses: 9
valor: 750000
margem: 0.24
---

# Proposta Comercial — Implantação de CRM Salesforce e Jornada do Cliente Omnicanal

**Cliente:** Saúde Garantida Seguros
**Segmento:** Seguros
**Área responsável:** Digital & CRM · **Dono da proposta:** Mariana Teixeira
**Data:** 2026-08-17 · **Versão:** final

## 1. Contexto e desafio

A Saúde Garantida Seguros atende 1,2 milhão de segurados e opera com 4 sistemas legados de atendimento, o que gera duplicidade de cadastros em cerca de 18% dos contatos e tempo médio de resolução de sinistros de 11 dias. A ausência de uma visão unificada da jornada impede ações de retenção proativas sobre uma base com churn anual de 14%.

## 2. Objetivo

Implantar o Salesforce como CRM único e orquestrar a jornada do cliente em canais digitais e de atendimento, reduzindo o tempo de resolução de sinistros em 30% e aumentando a retenção em 5 pontos percentuais em 9 meses.

## 3. Escopo da solução

- Configuração do Salesforce Sales e Service Cloud com modelo de dados unificado de segurados, apólices e sinistros
- Integração em tempo real entre sistemas legados e Salesforce via Apache Kafka, com 12 tópicos e SLA de latência inferior a 2 segundos
- Construção de camada de engenharia de dados no Azure (Data Lake e Synapse) para visão 360 do cliente e indicadores de jornada
- Desenho e automação de 8 jornadas do cliente (onboarding, renovação, sinistro e retenção) com gatilhos de next best action
- Programa de Change Management com treinamento de 320 usuários em 3 ondas e plano de adoção por squads de negócio

Tecnologias principais: Salesforce, Kafka, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 9 meses, nas seguintes fases:

- Fase 1 - Discovery e arquitetura: 8 semanas
- Fase 2 - Configuração do Salesforce e integrações Kafka: 14 semanas
- Fase 3 - Engenharia de dados no Azure e jornadas: 10 semanas
- Fase 4 - Change Management, go-live e hipercare: 4 semanas

## 5. Entregáveis

- CRM Salesforce configurado e em produção para 320 usuários em 3 squads de atendimento
- Pipeline de integração Kafka operando 12 tópicos entre legados e Salesforce com monitoramento no Azure
- Painéis de visão 360 do cliente e de jornada no Azure Synapse entregues para 5 diretorias
- 8 jornadas do cliente automatizadas e documentadas em playbook operacional
- Relatório final de adoção com metas de change management e plano de sustentação de 90 dias

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de soluções Salesforce, 2 consultores funcionais de CRM, 2 engenheiros de dados Azure, 1 especialista em integração Kafka e 1 analista de change management.

## 7. Premissas e riscos

- Risco: Baixa adesão dos 320 usuários ao novo CRM no go-live
- Risco: Atraso na exposição de APIs dos 4 sistemas legados para integração Kafka
- Risco: Qualidade e duplicidade dos dados históricos de segurados migrados

## 8. Investimento

Investimento total: R$ 750.000, em parcelas mensais ao longo de 9 meses.

Margem praticada: 24%.
