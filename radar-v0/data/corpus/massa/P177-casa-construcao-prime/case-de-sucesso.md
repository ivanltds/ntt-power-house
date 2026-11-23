---
projeto_id: P177
cliente: Casa & Construção Prime
titulo: Modernização de aplicações do varejo com containers, Kafka e GCP
segmento: Varejo
tecnologias: ["Kafka","GCP"]
servicos: ["Migração para Nuvem","Sustentação / AMS"]
area: Cloud & Infra
dono: Débora Castilho
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P177
id: P177-CASE
tipo_documental: case_sucesso
status_documento: aprovado
data: 2025-05-23
prazo_meses: 7
---

# Case de Sucesso — Casa & Construção Prime

## Desafio

A Casa & Construção Prime operava 42 lojas físicas e um e-commerce com picos de 380 mil sessões em datas promocionais, sustentados por aplicações monolíticas em servidores legados que geravam indisponibilidades de até 6 horas por mês. O custo de infraestrutura on-premise crescia 18% ao ano e os deploys levavam em média 9 dias, limitando a velocidade de lançamento de novas campanhas.

## Solução

Modernizar as aplicações críticas de vendas e catálogo para uma arquitetura em containers na GCP, com integração de eventos via Kafka, reduzindo indisponibilidade e acelerando o ciclo de entrega. A solução usou Kafka, GCP e foi entregue em 7 meses.

## Resultados

A indisponibilidade mensal caiu de 6 horas para 25 minutos e o custo de infraestrutura foi reduzido em 32%, gerando economia anual estimada de R$ 1,4 milhão. O tempo médio de deploy passou de 9 dias para 4 horas.

## Lições aprendidas

A migração de dois sistemas legados sem documentação atrasou a fase de go-live em 3 semanas e exigiu esforço extra de engenharia reversa. A realização de testes de carga com o volume real de picos promocionais foi decisiva para dimensionar o cluster Kafka e evitar incidentes na Black Friday.
