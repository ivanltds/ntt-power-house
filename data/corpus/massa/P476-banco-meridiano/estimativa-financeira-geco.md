---
projeto_id: P476
cliente: Banco Meridiano
titulo: Modernização de Aplicações Financeiras com Containers em Nuvem Híbrida
segmento: Serviços Financeiros
tecnologias: ["AWS","GCP","Kubernetes","Kafka"]
servicos: ["Migração para Nuvem"]
area: Cloud & Infra
dono: Carla Menezes
confidencialidade: confidencial
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P476
id: P476-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-03-12
prazo_meses: 9
valor: 950000
---

# Estimativa financeira (GECO) — Banco Meridiano

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Assessment e priorização de 42 aplicações, com ondas de migração para AWS e GCP; Conteinerização das aplicações prioritárias e padronização de imagens com Kubernetes (EKS e GKE).
- Tecnologias assumidas: AWS, GCP, Kubernetes, Kafka.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 9 meses.

Equipe estimada: 1 gerente de projeto, 1 arquiteto de soluções cloud, 2 engenheiros de plataforma Kubernetes, 2 engenheiros de migração e 1 especialista em Kafka.

## Valor de referência

Valor preliminar: R$ 950.000 (sem contingência).

## Pontos em aberto

- Dependências legadas não mapeadas atrasarem as ondas de migração
- Janelas de mudança restritas no ambiente financeiro reduzirem a velocidade de cutover
- Diferenças de configuração entre AWS e GCP exigirem retrabalho na padronização Kubernetes
