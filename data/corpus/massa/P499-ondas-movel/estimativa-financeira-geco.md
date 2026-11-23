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
id: P499-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2024-07-13
prazo_meses: 11
valor: 2810000
---

# Estimativa financeira (GECO) — Ondas Móvel

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Avaliação e priorização de 140 aplicações, com containerização das 60 de maior criticidade em imagens Docker e manifests Kubernetes.; Provisionamento de clusters Kubernetes gerenciados (EKS na AWS e GKE no GCP) com malha de serviços, políticas de autoescalonamento e observabilidade centralizada..
- Tecnologias assumidas: Kubernetes, AWS, GCP.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 11 meses.

Equipe estimada: 1 arquiteto de soluções cloud, 1 especialista em Kubernetes, 4 engenheiros DevOps, 2 engenheiros de aplicação e 1 gerente de projeto..

## Valor de referência

Valor preliminar: R$ 2.810.000 (sem contingência).

## Pontos em aberto

- Dependências legadas sem suporte a containers atrasam ondas de migração.
- Janelas de cutover conflitam com picos de tráfego de billing e recarga.
- Custos de nuvem acima do previsto por falta de governança de namespaces.
