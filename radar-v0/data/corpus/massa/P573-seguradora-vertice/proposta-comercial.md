---
projeto_id: P573
cliente: Seguradora Vértice
titulo: Implantação de CRM e Jornada do Cliente com Azure e Kafka
segmento: Seguros
tecnologias: ["Azure","Kafka"]
servicos: ["Engenharia de Dados","Change Management"]
area: Digital & CRM
dono: Mariana Teixeira
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P573
id: P573-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-09-16
prazo_meses: 5
valor: 1260000
margem: 0.35
---

# Proposta Comercial — Implantação de CRM e Jornada do Cliente com Azure e Kafka

**Cliente:** Seguradora Vértice
**Segmento:** Seguros
**Área responsável:** Digital & CRM · **Dono da proposta:** Mariana Teixeira
**Data:** 2025-09-16 · **Versão:** final

## 1. Contexto e desafio

A Seguradora Vértice enfrenta dificuldades para integrar dados de clientes provenientes de 5 sistemas legados, resultando em uma visão fragmentada e em uma taxa de retenção de apenas 68%. Além disso, o tempo médio de resposta em canais digitais é de 48 horas, impactando a satisfação do cliente.

## 2. Objetivo

Implementar uma solução de CRM integrada que unifique o cadastro de clientes e automatize a jornada de atendimento, reduzindo o tempo de resposta para até 4 horas e aumentando a retenção em 10 pontos percentuais.

## 3. Escopo da solução

- Integração de fontes de dados legadas (5 sistemas) via Apache Kafka para ingestão em tempo real
- Construção de pipeline de dados na plataforma Azure (Data Factory, Databricks) para enriquecimento e deduplicação de clientes
- Implementação de módulo de CRM com visão 360 do cliente, incluindo histórico de interações e preferências
- Automação de jornadas de onboarding e retenção com gatilhos baseados em eventos
- Capacitação de equipes e gestão de mudança para adoção do novo processo de atendimento

Tecnologias principais: Azure, Kafka.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Fase 1 - Diagnóstico e Arquitetura: 4 semanas
- Fase 2 - Implementação de Pipeline de Dados: 8 semanas
- Fase 3 - Configuração do CRM e Jornadas: 6 semanas
- Fase 4 - Testes e Rollout: 4 semanas

## 5. Entregáveis

- Documento de arquitetura de integração e fluxos de dados
- Pipeline de dados operacional com ingestão via Kafka e processamento no Azure
- Módulo de CRM configurado e integrado às fontes
- Relatórios de acompanhamento de KPIs (tempo de resposta, retenção, NPS)
- Plano de change management executado com treinamentos e comunicados

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em CRM, 1 analista de change management e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Resistência dos usuários à mudança de processo
- Risco: Complexidade na integração com sistemas legados
- Risco: Atraso na disponibilização de ambientes Azure pelo cliente

## 8. Investimento

Investimento total: R$ 1.260.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 35%.
