---
projeto_id: P592
cliente: Ondas Móvel
titulo: Lakehouse de Dados para Operadora de Telecom com AWS, Snowflake e Azure
segmento: Telecom
tecnologias: ["AWS","Snowflake","Azure"]
servicos: ["Engenharia de Dados","Governança de Dados"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P592
id: P592-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2025-04-30
prazo_meses: 9
valor: 1230000
---

# Estimativa financeira (GECO) — Ondas Móvel

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão em lote e incremental de 40 fontes (billing, CRM, OSS, rede) na camada de armazenamento AWS S3 com orquestração automatizada; Construção de camadas bronze, silver e gold no Snowflake, com 85 modelos dbt e SLAs de atualização de até 2 horas.
- Tecnologias assumidas: AWS, Snowflake, Azure.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 9 meses.

Equipe estimada: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em governança de dados e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 1.230.000 (sem contingência).

## Pontos em aberto

- Atraso na liberação de acessos às fontes legadas pelo time de infraestrutura do cliente
- Qualidade inconsistente dos dados de rede, exigindo regras adicionais de tratamento
- Mudança de escopo em requisitos de governança durante a fase de catálogo
