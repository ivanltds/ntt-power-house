---
projeto_id: P398
cliente: Corretora Valor Alto
titulo: Modernização de Aplicações com Containers em Nuvem Híbrida para Corretora
segmento: Serviços Financeiros
tecnologias: ["Azure","AWS"]
servicos: ["Migração para Nuvem","Sustentação / AMS"]
area: Cloud & Infra
dono: Carla Menezes
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P398
id: P398-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2024-12-27
prazo_meses: 9
valor: 1460000
---

# Estimativa financeira (GECO) — Corretora Valor Alto

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Avaliação e priorização de 42 aplicações, com containerização das 15 cargas prioritárias em Azure Kubernetes Service e Amazon EKS; Migração para Nuvem das aplicações de mesa de operações e backoffice, incluindo bancos de dados e integrações via APIs.
- Tecnologias assumidas: Azure, AWS.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 9 meses.

Equipe estimada: 1 arquiteto de soluções cloud, 1 tech lead de containers, 4 engenheiros de cloud (2 Azure e 2 AWS), 2 engenheiros DevOps e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 1.460.000 (sem contingência).

## Pontos em aberto

- Dependência de janelas de mercado para cutover das aplicações de mesa
- Aplicações legadas com acoplamento forte ao datacenter dificultando containerização
- Dupla operação Azure/AWS elevando complexidade de governança e custos
