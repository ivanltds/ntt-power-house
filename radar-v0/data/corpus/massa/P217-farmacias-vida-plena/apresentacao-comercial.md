---
projeto_id: P217
cliente: Farmácias Vida Plena
titulo: Modernização de aplicações em containers com Kafka, Azure e Kubernetes
segmento: Varejo
tecnologias: ["Kafka","Azure","Kubernetes"]
servicos: ["Sustentação / AMS","Migração para Nuvem"]
area: Cloud & Infra
dono: Débora Castilho
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P217
id: P217-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2025-12-12
prazo_meses: 8
---

# Apresentação Comercial — Farmácias Vida Plena

## Slide 1 — Modernização de aplicações em containers com Kafka, Azure e Kubernetes

Farmácias Vida Plena · Varejo

## Slide 2 — O desafio

A rede de Farmácias Vida Plena opera 320 lojas e processa cerca de 4,5 milhões de transações de venda por mês, com picos de 180 pedidos por minuto em datas sazonais. O parque de aplicações de gestão de estoque e fidelidade roda em servidores on-premises com janelas de manutenção de até 6 horas, limitando a escalabilidade e elevando o custo de infraestrutura em 22% ao ano.

## Slide 3 — Nossa proposta

Migrar e modernizar as aplicações críticas de estoque e fidelidade para uma arquitetura de containers em Azure com orquestração Kubernetes e integração orientada a eventos via Kafka, reduzindo indisponibilidade e ganhando elasticidade para os picos sazonais.

## Slide 4 — Arquitetura e tecnologias

Kafka · Azure · Kubernetes

- Conteinerização das aplicações de estoque e fidelidade com empacotamento em imagens e padronização de pipelines CI/CD
- Provisionamento e configuração de cluster Kubernetes no Azure (AKS) com políticas de autoescalonamento por demanda
- Implantação de barramento de eventos com Kafka para integração entre estoque, fidelidade e frente de caixa, suportando 180 eventos por minuto em pico

## Slide 5 — Como vamos trabalhar

- Assessment e desenho da arquitetura alvo (6 semanas)
- Conteinerização e pipeline CI/CD (10 semanas)
- Migração por ondas para Azure e Kafka (12 semanas)
- Estabilização e transição para AMS (4 semanas)

Duração total: 8 meses.

## Slide 6 — Por que nós

Experiência em Sustentação / AMS, Migração para Nuvem, com projeto anterior entregue para a Farmácias Vida Plena. Equipe: 1 arquiteto de soluções cloud, 2 engenheiros DevOps/Kubernetes, 1 engenheiro de dados para Kafka, 2 desenvolvedores de aplicações e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Almeida (Gerente de TI do Varejo) e agendar o kickoff.
