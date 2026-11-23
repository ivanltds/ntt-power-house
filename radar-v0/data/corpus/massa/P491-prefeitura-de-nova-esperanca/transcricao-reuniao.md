---
projeto_id: P491
cliente: Prefeitura de Nova Esperança
titulo: Modernização de aplicações em containers e sustentação multicloud para a gestão pública
segmento: Setor Público
tecnologias: ["GCP","Azure","Kafka","AWS"]
servicos: ["Sustentação / AMS"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P491
id: P491-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2026-11-20
---

# Transcrição — Kickoff Prefeitura de Nova Esperança

Transcrição automática, sem revisão.

[00:05] Igor Peixoto: Bom dia. Este é o kickoff de Modernização de aplicações em containers e sustentação multicloud para a gestão pública. Vamos alinhar objetivo, fases e riscos.

[01:17] Renata Vasconcelos: O ponto principal para nós: A Prefeitura de Nova Esperança opera 38 sistemas legados de secretarias (tributação, saúde, educação e obras), sendo 14 deles sem suporte do fornecedor original e com indisponibilidade média de 9 horas por mês. O parque atual roda em servidores físicos no datacenter municipal, com 72% das aplicações em versões de runtime fora de suporte, elevando o risco de incidentes e o custo de manutenção em cerca de 27% ao ano.

[02:18] Igor Peixoto: O objetivo combinado foi: Modernizar as aplicações prioritárias em arquitetura de containers com orquestração multicloud e assumir a sustentação contínua, reduzindo indisponibilidade e custo operacional.

[03:16] Marcos Tavares: Do lado técnico vamos usar GCP, Azure, Kafka, AWS. O primeiro passo é conteinerização de 12 aplicações prioritárias com imagens padronizadas e pipelines ci/cd executados em gcp e azure.

[03:56] Renata Vasconcelos: Quais riscos vocês já enxergam?

[05:02] Marcos Tavares: Os principais são dependência de janelas de manutenção das secretarias para cutover das aplicações; aplicações legadas sem documentação e com regras de negócio não mapeadas; restrições de contratação e conformidade de dados públicos em ambientes multicloud.

[05:54] Igor Peixoto: Fechado. Mando a ata com os próximos passos ainda hoje.
