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
id: P217-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2026-01-08
---

# Transcrição — Kickoff Farmácias Vida Plena

Transcrição automática, sem revisão.

[00:05] Débora Castilho: Bom dia. Este é o kickoff de Modernização de aplicações em containers com Kafka, Azure e Kubernetes. Vamos alinhar objetivo, fases e riscos.

[01:00] Renata Almeida: O ponto principal para nós: A rede de Farmácias Vida Plena opera 320 lojas e processa cerca de 4,5 milhões de transações de venda por mês, com picos de 180 pedidos por minuto em datas sazonais. O parque de aplicações de gestão de estoque e fidelidade roda em servidores on-premises com janelas de manutenção de até 6 horas, limitando a escalabilidade e elevando o custo de infraestrutura em 22% ao ano.

[02:17] Débora Castilho: O objetivo combinado foi: Migrar e modernizar as aplicações críticas de estoque e fidelidade para uma arquitetura de containers em Azure com orquestração Kubernetes e integração orientada a eventos via Kafka, reduzindo indisponibilidade e ganhando elasticidade para os picos sazonais.

[03:36] Bruno Carvalho: Do lado técnico vamos usar Kafka, Azure, Kubernetes. O primeiro passo é conteinerização das aplicações de estoque e fidelidade com empacotamento em imagens e padronização de pipelines ci/cd.

[04:21] Renata Almeida: Quais riscos vocês já enxergam?

[05:27] Bruno Carvalho: Os principais são dependência de janelas de loja para cutover das aplicações de estoque; latência na integração kafka com sistemas legados de frente de caixa; capacidade limitada da equipe do cliente para validação funcional.

[06:47] Débora Castilho: Fechado. Mando a ata com os próximos passos ainda hoje.
