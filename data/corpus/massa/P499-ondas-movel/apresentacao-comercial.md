---
projeto_id: P499
cliente: Ondas Móvel
titulo: Modernização de aplicações legadas com containers em Kubernetes na Ondas Móvel
segmento: Telecom
tecnologias: ["Kubernetes","AWS","GCP"]
servicos: ["Migração para Nuvem"]
area: Cloud & Infra
dono: Isabela Freitas
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P499
id: P499-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2024-07-26
prazo_meses: 12
---

# Apresentação Comercial — Ondas Móvel

## Slide 1 — Modernização de aplicações legadas com containers em Kubernetes na Ondas Móvel

Ondas Móvel · Telecom

## Slide 2 — O desafio

A Ondas Móvel operava cerca de 140 aplicações de billing, atendimento e provisão em servidores virtuais monolíticos, com janelas de deploy de até 6 horas e indisponibilidade média de 4,2 horas por mês. O custo de infraestrutura crescia 18% ao ano e a baixa elasticidade limitava o lançamento de novas ofertas para 12 milhões de linhas ativas.

## Slide 3 — Nossa proposta

Migrar e modernizar as aplicações críticas para containers gerenciados em Kubernetes na AWS e no GCP, reduzindo indisponibilidade e tempo de deploy, com continuidade da jornada de nuvem iniciada em projeto anterior.

## Slide 4 — Arquitetura e tecnologias

Kubernetes · AWS · GCP

- Avaliação e priorização de 140 aplicações, com containerização das 60 de maior criticidade em imagens Docker e manifests Kubernetes.
- Provisionamento de clusters Kubernetes gerenciados (EKS na AWS e GKE no GCP) com malha de serviços, políticas de autoescalonamento e observabilidade centralizada.
- Implantação de pipeline CI/CD com deploy blue-green e canário para as aplicações migradas, integrado ao repositório corporativo.

## Slide 5 — Como vamos trabalhar

- Diagnóstico e desenho da plataforma (10 semanas)
- Piloto com 8 aplicações e pipeline CI/CD (12 semanas)
- Migração em ondas das 52 aplicações restantes (22 semanas)
- Estabilização, otimização de custos e transferência de conhecimento (8 semanas)

Duração total: 12 meses.

## Slide 6 — Por que nós

Experiência em Migração para Nuvem, com projeto anterior entregue para a Ondas Móvel. Equipe: 1 arquiteto de soluções cloud, 1 especialista em Kubernetes, 4 engenheiros DevOps, 2 engenheiros de aplicação e 1 gerente de projeto..

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Diretora de Tecnologia da Ondas Móvel) e agendar o kickoff.
