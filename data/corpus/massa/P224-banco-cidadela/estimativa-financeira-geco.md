---
projeto_id: P224
cliente: Banco Cidadela
titulo: Programa de FinOps e Otimização de Custos em Kubernetes na AWS
segmento: Serviços Financeiros
tecnologias: ["Kubernetes","Power BI","AWS"]
servicos: ["Analytics & BI","Migração para Nuvem"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P224
id: P224-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2025-08-30
prazo_meses: 3
valor: 2150000
---

# Estimativa financeira (GECO) — Banco Cidadela

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Diagnóstico de custos e tagging dos 42 clusters Kubernetes na AWS, com mapa de alocação por squad e produto; Redesenho de requests/limits, HPA e rightsizing de nodes, com meta de redução de 20% em instâncias EC2/EKS.
- Tecnologias assumidas: Kubernetes, Power BI, AWS.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 3 meses.

Equipe estimada: 1 arquiteto de soluções cloud, 2 engenheiros DevOps/Kubernetes, 1 analista de FinOps e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 2.150.000 (sem contingência).

## Pontos em aberto

- Resistência das squads à mudança de requests/limits e autoscaling
- Dados de custo e tagging incompletos na AWS comprometem o rateio
- Janelas de change congeladas no fechamento contábil atrasam otimizações
