---
projeto_id: P431
cliente: Rede de Clínicas Bem Viver
titulo: Implantação de CRM Salesforce e Jornada do Cliente Omnicanal
segmento: Saúde
tecnologias: ["Azure","Kafka","Salesforce"]
servicos: ["CRM"]
area: Digital & CRM
dono: Sabrina Moura
confidencialidade: confidencial
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P431
id: P431-PROPV1
tipo_documental: proposta_comercial
status_documento: rascunho
data: 2026-06-20
prazo_meses: 12
valor: 770000
margem: 0.2
---

# Proposta Comercial — Implantação de CRM Salesforce e Jornada do Cliente Omnicanal (versão 1, rascunho)

**Cliente:** Rede de Clínicas Bem Viver
**Segmento:** Saúde
**Área responsável:** Digital & CRM · **Dono da proposta:** Sabrina Moura
**Data:** 2026-06-20 · **Versão:** 1 (rascunho)

## 1. Contexto e desafio

A Rede de Clínicas Bem Viver atende cerca de 180 mil pacientes/ano em 42 unidades e não possui visão unificada do histórico de atendimentos, agendamentos e relacionamento. Cerca de 35% das oportunidades de retorno e exames periódicos se perdem por falta de acompanhamento estruturado, e o tempo médio de resposta a solicitações pelo canal digital ultrapassa 24 horas.

## 2. Objetivo

Implantar o Salesforce como plataforma única de CRM e orquestrar a jornada do paciente em canais digitais e presenciais, elevando a taxa de retorno e a conversão de agendamentos com dados integrados em tempo real.

## 3. Escopo da solução

- Configuração do Salesforce Sales/Service Cloud com modelo de dados de pacientes, unidades e convênios
- Integração do Salesforce com sistemas de agendamento e prontuário via APIs e barramento Kafka para eventos em tempo real
- Construção de camada de dados e integrações no Azure (Data Factory, API Management) para consolidação da visão 360 do paciente
- Desenho e automação da jornada do cliente com régua de relacionamento, lembretes de retorno e NPS pós-atendimento
- Dashboards e indicadores de conversão, retenção e tempo de resposta no Power BI sobre dados do Azure e Salesforce

Tecnologias principais: Azure, Kafka, Salesforce.

## 4. Abordagem e cronograma

O projeto será executado em 12 meses, nas seguintes fases:

- Discovery e desenho da jornada (8 semanas)
- Configuração do Salesforce e integrações Azure/Kafka (18 semanas)
- Piloto em 6 unidades e ajustes (10 semanas)
- Rollout para as 42 unidades e estabilização (8 semanas)

## 5. Entregáveis

- Blueprint da jornada do paciente e matriz de canais aprovados
- Salesforce configurado e integrado aos sistemas de agendamento e prontuário
- Pipeline de eventos Kafka e integrações Azure em produção
- Réguas de relacionamento e automações de retorno ativas em 42 unidades
- Painéis de indicadores de conversão, retenção e SLA de atendimento

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de soluções, 2 consultores Salesforce, 2 engenheiros de integração (Azure/Kafka) e 1 analista de negócios de saúde.

## 7. Premissas e riscos

- Risco: Qualidade e duplicidade dos dados de pacientes legados
- Risco: Dependência de fornecedores dos sistemas de prontuário para APIs
- Risco: Baixa adesão das equipes das unidades ao novo processo de relacionamento

## 8. Investimento

Investimento total: R$ 770.000, em parcelas mensais ao longo de 12 meses.

Margem praticada: 20%.
