---
projeto_id: P266
cliente: NetVale Provedor
titulo: Migração do Data Warehouse para Nuvem com GCP, Snowflake e Databricks
segmento: Telecom
tecnologias: ["GCP","Snowflake","Databricks"]
servicos: ["Migração para Nuvem","Engenharia de Dados"]
area: Cloud & Infra
dono: Isabela Freitas
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P266
id: P266-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2025-10-05
prazo_meses: 6
valor: 2700000
---

# Estimativa financeira (GECO) — NetVale Provedor

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Assessment e desenho da arquitetura-alvo em GCP, com landing zone, governança de IAM e rede privada para ingestão dos dados de telecom; Migração de 14 TB e 380 milhões de registros para o Snowflake, com modelagem dimensional e conversão de 120 rotinas ETL legadas.
- Tecnologias assumidas: GCP, Snowflake, Databricks.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 6 meses.

Equipe estimada: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em Snowflake, 1 especialista em GCP e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 2.700.000 (sem contingência).

## Pontos em aberto

- Qualidade dos dados legados exigir retrabalho nas rotinas de conversão
- Janela de paralelo assistido coincidir com o fechamento fiscal mensal
- Dependência de acessos e liberações de rede do cliente para a landing zone no GCP
