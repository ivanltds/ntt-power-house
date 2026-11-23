---
projeto_id: P491
cliente: Prefeitura de Nova Esperança
titulo: Modernização de aplicações em containers e sustentação multicloud para a gestão pública
segmento: Setor Público
tecnologias: ["GCP","Azure","Kafka","AWS"]
servicos: ["Sustentação / AMS"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P491
id: P491-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-10-24
prazo_meses: 6
---

# Apresentação Comercial — Prefeitura de Nova Esperança

## Slide 1 — Modernização de aplicações em containers e sustentação multicloud para a gestão pública

Prefeitura de Nova Esperança · Setor Público

## Slide 2 — O desafio

A Prefeitura de Nova Esperança opera 38 sistemas legados de secretarias (tributação, saúde, educação e obras), sendo 14 deles sem suporte do fornecedor original e com indisponibilidade média de 9 horas por mês. O parque atual roda em servidores físicos no datacenter municipal, com 72% das aplicações em versões de runtime fora de suporte, elevando o risco de incidentes e o custo de manutenção em cerca de 27% ao ano.

## Slide 3 — Nossa proposta

Modernizar as aplicações prioritárias em arquitetura de containers com orquestração multicloud e assumir a sustentação contínua, reduzindo indisponibilidade e custo operacional.

## Slide 4 — Arquitetura e tecnologias

GCP · Azure · Kafka · AWS

- Conteinerização de 12 aplicações prioritárias com imagens padronizadas e pipelines CI/CD executados em GCP e Azure
- Implantação de malha de integração assíncrona com Kafka para 6 fluxos críticos entre secretarias, com tópicos e políticas de retenção definidos
- Migração de cargas de processamento em lote para AWS, com ambientes isolados por secretaria e controle de custos por centro de custo

## Slide 5 — Como vamos trabalhar

- Diagnóstico e desenho da arquitetura (4 semanas)
- Conteinerização e pipeline CI/CD (8 semanas)
- Integração com Kafka e migração de cargas para AWS (8 semanas)
- Estabilização e transição para sustentação / AMS (4 semanas)

Duração total: 6 meses.

## Slide 6 — Por que nós

Experiência em Sustentação / AMS, com projeto anterior entregue para a Prefeitura de Nova Esperança. Equipe: 1 gerente de projeto, 1 arquiteto de cloud, 3 engenheiros de DevOps, 2 engenheiros de integração e 2 analistas de sustentação.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Secretária de Tecnologia da Informação) e agendar o kickoff.
