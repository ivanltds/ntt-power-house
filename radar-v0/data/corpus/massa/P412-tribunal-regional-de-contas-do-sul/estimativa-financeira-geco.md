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
id: P412-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2025-07-23
prazo_meses: 6
valor: 4520000
---

# Estimativa financeira (GECO) — Tribunal Regional de Contas do Sul

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Containerização de 15 aplicações Java e .NET com Docker e orquestração em Kubernetes (EKS na AWS e AKS no Azure); Implementação de cluster Kafka gerenciado (Amazon MSK) para ingestão e distribuição de eventos entre aplicações.
- Tecnologias assumidas: Kafka, AWS, Kubernetes, Azure.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 6 meses.

Equipe estimada: 1 arquiteto de soluções cloud, 2 engenheiros DevOps, 1 especialista em Kafka, 2 desenvolvedores full-stack e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 4.520.000 (sem contingência).

## Pontos em aberto

- Dependência de janelas de manutenção do Tribunal para cutover das aplicações
- Latência na aprovação de acessos e políticas de segurança pelos órgãos de controle
- Complexidade na integração de aplicações legadas com o barramento Kafka
