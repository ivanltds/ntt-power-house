---
projeto_id: P260
cliente: TeleNorte Conecta
titulo: Migração do Data Warehouse para Nuvem com Pipeline Unificado
segmento: Telecom
tecnologias: ["Azure","Snowflake","Databricks","GCP"]
servicos: ["Engenharia de Dados","Migração para Nuvem"]
area: Cloud & Infra
dono: Isabela Freitas
confidencialidade: interna
status_proposta: Em negociação
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P260
id: P260-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-07-16
prazo_meses: 3
valor: 2580000
---

# Estimativa financeira (GECO) — TeleNorte Conecta

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Assessment e desenho da arquitetura-alvo em Azure, definindo landing zone, governança e integração com Snowflake como camada de armazenamento analítico; Migração de 48 TB de dados históricos e 320 pipelines ETL para Snowflake, com validação de paridade de dados e reconciliação de faturamento.
- Tecnologias assumidas: Azure, Snowflake, Databricks, GCP.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 3 meses.

Equipe estimada: 1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em Snowflake, 1 especialista em Databricks e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 2.580.000 (sem contingência).

## Pontos em aberto

- Janela de corte limitada para migração de 48 TB sem impacto ao faturamento
- Qualidade e padronização inconsistente dos dados legados
- Dependência de times internos para liberação de acessos e redes em Azure e GCP
