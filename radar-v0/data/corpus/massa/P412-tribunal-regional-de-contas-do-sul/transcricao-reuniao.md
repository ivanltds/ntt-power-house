---
projeto_id: P412
cliente: Tribunal Regional de Contas do Sul
titulo: Modernização de aplicações legadas com containers e integração via Kafka
segmento: Setor Público
tecnologias: ["Kafka","AWS","Kubernetes","Azure"]
servicos: ["Sustentação / AMS","Migração para Nuvem"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P412
id: P412-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2025-09-01
---

# Transcrição — Kickoff Tribunal Regional de Contas do Sul

Transcrição automática, sem revisão.

[00:05] Igor Peixoto: Bom dia. Este é o kickoff de Modernização de aplicações legadas com containers e integração via Kafka. Vamos alinhar objetivo, fases e riscos.

[01:02] Ricardo Almeida: O ponto principal para nós: O Tribunal Regional de Contas do Sul opera 35 aplicações legadas em datacenter próprio, com janelas de manutenção de 8 horas e custo anual de R$ 12 milhões em infraestrutura. A integração entre sistemas é feita por arquivos batch noturnos, gerando atrasos de até 12 horas na consolidação de dados para auditoria.

[02:17] Igor Peixoto: O objetivo combinado foi: Modernizar 15 aplicações críticas para containers em Kubernetes, com migração para nuvem AWS e Azure, e implementar barramento de eventos com Kafka para integração em tempo real, em 6 meses.

[03:28] Fernanda Lima: Do lado técnico vamos usar Kafka, AWS, Kubernetes, Azure. O primeiro passo é containerização de 15 aplicações java e .net com docker e orquestração em kubernetes (eks na aws e aks no azure).

[04:13] Ricardo Almeida: Quais riscos vocês já enxergam?

[05:19] Fernanda Lima: Os principais são dependência de janelas de manutenção do tribunal para cutover das aplicações; latência na aprovação de acessos e políticas de segurança pelos órgãos de controle; complexidade na integração de aplicações legadas com o barramento kafka.

[06:06] Igor Peixoto: Fechado. Mando a ata com os próximos passos ainda hoje.
