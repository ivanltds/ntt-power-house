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
id: P177-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2024-11-04
---

# Transcrição — Kickoff Casa & Construção Prime

Transcrição automática, sem revisão.

[00:05] Débora Castilho: Bom dia. Este é o kickoff de Modernização de aplicações do varejo com containers, Kafka e GCP. Vamos alinhar objetivo, fases e riscos.

[00:54] Renata Vasconcelos: O ponto principal para nós: A Casa & Construção Prime operava 42 lojas físicas e um e-commerce com picos de 380 mil sessões em datas promocionais, sustentados por aplicações monolíticas em servidores legados que geravam indisponibilidades de até 6 horas por mês. O custo de infraestrutura on-premise crescia 18% ao ano e os deploys levavam em média 9 dias, limitando a velocidade de lançamento de novas campanhas.

[02:22] Débora Castilho: O objetivo combinado foi: Modernizar as aplicações críticas de vendas e catálogo para uma arquitetura em containers na GCP, com integração de eventos via Kafka, reduzindo indisponibilidade e acelerando o ciclo de entrega.

[03:38] Felipe Andrade: Do lado técnico vamos usar Kafka, GCP. O primeiro passo é conteinerização das aplicações de catálogo, carrinho e checkout com orquestração em gke na gcp.

[04:46] Renata Vasconcelos: Quais riscos vocês já enxergam?

[05:52] Felipe Andrade: Os principais são janela de congelamento de vendas em datas promocionais reduz o período útil de migração; dependências de sistemas legados sem documentação atualizada; curva de aprendizado das equipes do cliente em gcp e kafka.

[07:15] Débora Castilho: Fechado. Mando a ata com os próximos passos ainda hoje.
