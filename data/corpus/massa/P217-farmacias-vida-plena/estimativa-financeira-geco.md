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
id: P217-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2025-11-29
prazo_meses: 7
valor: 3380000
---

# Estimativa financeira (GECO) — Farmácias Vida Plena

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Conteinerização das aplicações de estoque e fidelidade com empacotamento em imagens e padronização de pipelines CI/CD; Provisionamento e configuração de cluster Kubernetes no Azure (AKS) com políticas de autoescalonamento por demanda.
- Tecnologias assumidas: Kafka, Azure, Kubernetes.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 7 meses.

Equipe estimada: 1 arquiteto de soluções cloud, 2 engenheiros DevOps/Kubernetes, 1 engenheiro de dados para Kafka, 2 desenvolvedores de aplicações e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 3.380.000 (sem contingência).

## Pontos em aberto

- Dependência de janelas de loja para cutover das aplicações de estoque
- Latência na integração Kafka com sistemas legados de frente de caixa
- Capacidade limitada da equipe do cliente para validação funcional
