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
id: P318-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-05-05
prazo_meses: 8
valor: 1250000
---

# Estimativa financeira (GECO) — Casa & Construção Prime

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Containerização das aplicações de frente de loja e e-commerce com orquestração no GCP (GKE), substituindo o ambiente de datacenter próprio; Implantação de barramento de eventos com Kafka para sincronização em tempo real de estoque, pedidos e preços entre lojas, e-commerce e CD.
- Tecnologias assumidas: Kafka, GCP.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 8 meses.

Equipe estimada: 1 arquiteto de soluções cloud, 1 especialista em Kafka, 3 engenheiros de plataforma/DevOps, 2 desenvolvedores de migração, 1 analista de sustentação e 1 gerente de projeto..

## Valor de referência

Valor preliminar: R$ 1.250.000 (sem contingência).

## Pontos em aberto

- Dependências de integrações legadas com fornecedores de frente de loja podem atrasar ondas de migração
- Picos de campanha durante a janela do projeto exigem congelamentos e replanejamento de cutover
- Curva de aprendizado das equipes do cliente em GCP e Kafka pode sobrecarregar a transição para AMS
