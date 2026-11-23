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
id: P491-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-10-11
prazo_meses: 5
valor: 1400000
---

# Estimativa financeira (GECO) — Prefeitura de Nova Esperança

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Conteinerização de 12 aplicações prioritárias com imagens padronizadas e pipelines CI/CD executados em GCP e Azure; Implantação de malha de integração assíncrona com Kafka para 6 fluxos críticos entre secretarias, com tópicos e políticas de retenção definidos.
- Tecnologias assumidas: GCP, Azure, Kafka, AWS.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 5 meses.

Equipe estimada: 1 gerente de projeto, 1 arquiteto de cloud, 3 engenheiros de DevOps, 2 engenheiros de integração e 2 analistas de sustentação.

## Valor de referência

Valor preliminar: R$ 1.400.000 (sem contingência).

## Pontos em aberto

- Dependência de janelas de manutenção das secretarias para cutover das aplicações
- Aplicações legadas sem documentação e com regras de negócio não mapeadas
- Restrições de contratação e conformidade de dados públicos em ambientes multicloud
