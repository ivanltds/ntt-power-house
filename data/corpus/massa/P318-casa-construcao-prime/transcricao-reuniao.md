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
id: P318-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2026-06-14
---

# Transcrição — Kickoff Casa & Construção Prime

Transcrição automática, sem revisão.

[00:05] Carla Menezes: Bom dia. Este é o kickoff de Modernização de aplicações em containers com Kafka e GCP para varejo de materiais de construção. Vamos alinhar objetivo, fases e riscos.

[01:25] Ricardo Tavares: O ponto principal para nós: A Casa & Construção Prime opera 42 lojas físicas e um e-commerce que responde por 18% da receita, mas suas aplicações monolíticas em datacenter próprio limitam a escalabilidade em picos de campanha, quando o volume de pedidos chega a triplicar. A integração entre frente de loja, e-commerce e centro de distribuição depende de rotinas batch noturnas, gerando atrasos de até 6 horas na atualização de estoque e rupturas em 11% dos SKUs mais vendidos.

[02:57] Carla Menezes: O objetivo combinado foi: Migrar e modernizar o parque de aplicações para containers no GCP, com integração de eventos em tempo real via Kafka, reduzindo o tempo de atualização de estoque para menos de 5 minutos e sustentando o crescimento digital até 2027.

[03:49] Fernanda Lopes: Do lado técnico vamos usar Kafka, GCP. O primeiro passo é containerização das aplicações de frente de loja e e-commerce com orquestração no gcp (gke), substituindo o ambiente de datacenter próprio.

[04:41] Ricardo Tavares: Quais riscos vocês já enxergam?

[05:47] Fernanda Lopes: Os principais são dependências de integrações legadas com fornecedores de frente de loja podem atrasar ondas de migração; picos de campanha durante a janela do projeto exigem congelamentos e replanejamento de cutover; curva de aprendizado das equipes do cliente em gcp e kafka pode sobrecarregar a transição para ams.

[06:39] Carla Menezes: Fechado. Mando a ata com os próximos passos ainda hoje.
