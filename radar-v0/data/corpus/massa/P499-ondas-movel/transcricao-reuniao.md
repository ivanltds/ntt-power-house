---
projeto_id: P499
cliente: Ondas Móvel
titulo: Modernização de aplicações legadas com containers em Kubernetes na Ondas Móvel
segmento: Telecom
tecnologias: ["Kubernetes","AWS","GCP"]
servicos: ["Migração para Nuvem"]
area: Cloud & Infra
dono: Isabela Freitas
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P499
id: P499-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2024-08-22
---

# Transcrição — Kickoff Ondas Móvel

Transcrição automática, sem revisão.

[00:05] Isabela Freitas: Bom dia. Este é o kickoff de Modernização de aplicações legadas com containers em Kubernetes na Ondas Móvel. Vamos alinhar objetivo, fases e riscos.

[01:08] Renata Vasconcelos: O ponto principal para nós: A Ondas Móvel operava cerca de 140 aplicações de billing, atendimento e provisão em servidores virtuais monolíticos, com janelas de deploy de até 6 horas e indisponibilidade média de 4,2 horas por mês. O custo de infraestrutura crescia 18% ao ano e a baixa elasticidade limitava o lançamento de novas ofertas para 12 milhões de linhas ativas.

[01:53] Isabela Freitas: O objetivo combinado foi: Migrar e modernizar as aplicações críticas para containers gerenciados em Kubernetes na AWS e no GCP, reduzindo indisponibilidade e tempo de deploy, com continuidade da jornada de nuvem iniciada em projeto anterior.

[02:29] Felipe Andrade: Do lado técnico vamos usar Kubernetes, AWS, GCP. O primeiro passo é avaliação e priorização de 140 aplicações, com containerização das 60 de maior criticidade em imagens docker e manifests kubernetes..

[03:25] Renata Vasconcelos: Quais riscos vocês já enxergam?

[04:31] Felipe Andrade: Os principais são dependências legadas sem suporte a containers atrasam ondas de migração.; janelas de cutover conflitam com picos de tráfego de billing e recarga.; custos de nuvem acima do previsto por falta de governança de namespaces..

[06:04] Isabela Freitas: Fechado. Mando a ata com os próximos passos ainda hoje.
