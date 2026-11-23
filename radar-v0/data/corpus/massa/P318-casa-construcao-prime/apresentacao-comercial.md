---
projeto_id: P318
cliente: Casa & Construção Prime
titulo: Modernização de aplicações em containers com Kafka e GCP para varejo de materiais de construção
segmento: Varejo
tecnologias: ["Kafka","GCP"]
servicos: ["Sustentação / AMS","Migração para Nuvem"]
area: Cloud & Infra
dono: Carla Menezes
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P318
id: P318-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-05-18
prazo_meses: 10
---

# Apresentação Comercial — Casa & Construção Prime

## Slide 1 — Modernização de aplicações em containers com Kafka e GCP para varejo de materiais de construção

Casa & Construção Prime · Varejo

## Slide 2 — O desafio

A Casa & Construção Prime opera 42 lojas físicas e um e-commerce que responde por 18% da receita, mas suas aplicações monolíticas em datacenter próprio limitam a escalabilidade em picos de campanha, quando o volume de pedidos chega a triplicar. A integração entre frente de loja, e-commerce e centro de distribuição depende de rotinas batch noturnas, gerando atrasos de até 6 horas na atualização de estoque e rupturas em 11% dos SKUs mais vendidos.

## Slide 3 — Nossa proposta

Migrar e modernizar o parque de aplicações para containers no GCP, com integração de eventos em tempo real via Kafka, reduzindo o tempo de atualização de estoque para menos de 5 minutos e sustentando o crescimento digital até 2027.

## Slide 4 — Arquitetura e tecnologias

Kafka · GCP

- Containerização das aplicações de frente de loja e e-commerce com orquestração no GCP (GKE), substituindo o ambiente de datacenter próprio
- Implantação de barramento de eventos com Kafka para sincronização em tempo real de estoque, pedidos e preços entre lojas, e-commerce e CD
- Migração de 14 aplicações críticas para a nuvem GCP em ondas, incluindo bancos de dados e integrações legadas

## Slide 5 — Como vamos trabalhar

- Diagnóstico e arquitetura de destino (8 semanas)
- Implantação de Kafka e plataforma GKE (10 semanas)
- Migração das aplicações em ondas (18 semanas)
- Estabilização e transição para AMS (8 semanas)

Duração total: 10 meses.

## Slide 6 — Por que nós

Experiência em Sustentação / AMS, Migração para Nuvem, com projeto anterior entregue para a Casa & Construção Prime. Equipe: 1 arquiteto de soluções cloud, 1 especialista em Kafka, 3 engenheiros de plataforma/DevOps, 2 desenvolvedores de migração, 1 analista de sustentação e 1 gerente de projeto..

## Slide 7 — Próximos passos

Validar escopo com Ricardo Tavares (Diretor de Tecnologia) e agendar o kickoff.
