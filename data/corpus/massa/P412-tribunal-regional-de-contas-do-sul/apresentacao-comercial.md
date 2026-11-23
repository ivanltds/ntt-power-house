---
projeto_id: P412
cliente: Tribunal Regional de Contas do Sul
titulo: Modernização de aplicações legadas com containers e integração via Kafka
segmento: Setor Público
tecnologias: ["Kafka","AWS","Kubernetes","Azure"]
servicos: ["Sustentação / AMS","Migração para Nuvem"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P412
id: P412-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2025-08-05
prazo_meses: 6
---

# Apresentação Comercial — Tribunal Regional de Contas do Sul

## Slide 1 — Modernização de aplicações legadas com containers e integração via Kafka

Tribunal Regional de Contas do Sul · Setor Público

## Slide 2 — O desafio

O Tribunal Regional de Contas do Sul opera 35 aplicações legadas em datacenter próprio, com janelas de manutenção de 8 horas e custo anual de R$ 12 milhões em infraestrutura. A integração entre sistemas é feita por arquivos batch noturnos, gerando atrasos de até 12 horas na consolidação de dados para auditoria.

## Slide 3 — Nossa proposta

Modernizar 15 aplicações críticas para containers em Kubernetes, com migração para nuvem AWS e Azure, e implementar barramento de eventos com Kafka para integração em tempo real, em 6 meses.

## Slide 4 — Arquitetura e tecnologias

Kafka · AWS · Kubernetes · Azure

- Containerização de 15 aplicações Java e .NET com Docker e orquestração em Kubernetes (EKS na AWS e AKS no Azure)
- Implementação de cluster Kafka gerenciado (Amazon MSK) para ingestão e distribuição de eventos entre aplicações
- Migração de 8 aplicações para AWS e 7 para Azure, com definição de landing zones e políticas de segurança

## Slide 5 — Como vamos trabalhar

- Fase 1 - Assessment e desenho de arquitetura: 6 semanas
- Fase 2 - Containerização e migração para cloud: 10 semanas
- Fase 3 - Implementação de Kafka e integração: 6 semanas
- Fase 4 - Estabilização e transição para AMS: 2 semanas

Duração total: 6 meses.

## Slide 6 — Por que nós

Experiência em Sustentação / AMS, Migração para Nuvem, com projeto anterior entregue para a Tribunal Regional de Contas do Sul. Equipe: 1 arquiteto de soluções cloud, 2 engenheiros DevOps, 1 especialista em Kafka, 2 desenvolvedores full-stack e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Ricardo Almeida (Diretor de Tecnologia da Informação) e agendar o kickoff.
