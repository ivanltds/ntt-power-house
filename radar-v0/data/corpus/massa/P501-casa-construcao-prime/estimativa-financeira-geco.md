---
projeto_id: P501
cliente: Casa & Construção Prime
titulo: Modernização de Aplicações com Containers em Multicloud para o Varejo
segmento: Varejo
tecnologias: ["GCP","Azure","AWS","Kafka"]
servicos: ["Migração para Nuvem"]
area: Cloud & Infra
dono: Débora Castilho
confidencialidade: interna
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P501
id: P501-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-10-23
prazo_meses: 5
valor: 650000
---

# Estimativa financeira (GECO) — Casa & Construção Prime

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Avaliação e priorização de 62 aplicações, selecionando 24 para conteinerização na primeira onda; Conteinerização das aplicações prioritárias com orquestração em GCP (GKE) e Azure (AKS), incluindo imagens e pipelines CI/CD.
- Tecnologias assumidas: GCP, Azure, AWS, Kafka.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 5 meses.

Equipe estimada: 1 arquiteto de soluções cloud, 1 especialista em containers e Kubernetes, 1 engenheiro de integração Kafka, 2 engenheiros de cloud e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 650.000 (sem contingência).

## Pontos em aberto

- Dependências entre aplicações legadas atrasam a conteinerização
- Janelas de cutover restritas impactam o e-commerce em picos sazonais
- Custos multicloud acima do previsto sem governança de FinOps
