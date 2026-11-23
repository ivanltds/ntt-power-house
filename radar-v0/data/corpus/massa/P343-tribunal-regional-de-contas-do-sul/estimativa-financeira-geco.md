---
projeto_id: P343
cliente: Tribunal Regional de Contas do Sul
titulo: Migração do Data Warehouse do TCE-Sul para Nuvem com Databricks e Snowflake
segmento: Setor Público
tecnologias: ["Databricks","Snowflake","AWS","GCP"]
servicos: ["Migração para Nuvem"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: interna
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P343
id: P343-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-07-25
prazo_meses: 5
valor: 1070000
---

# Estimativa financeira (GECO) — Tribunal Regional de Contas do Sul

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Avaliação e desenho da arquitetura-alvo em nuvem, definindo a distribuição de workloads entre AWS e GCP e a integração do Databricks com o Snowflake como camada de serving analítico; Migração de 14 TB de dados históricos e 320 objetos de modelagem (tabelas, views e procedures) para o Snowflake, com validação de integridade e reconciliação de contagens.
- Tecnologias assumidas: Databricks, Snowflake, AWS, GCP.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 5 meses.

Equipe estimada: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em Snowflake, 1 especialista em Databricks e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 1.070.000 (sem contingência).

## Pontos em aberto

- Qualidade e consistência dos dados legados exigindo esforço adicional de limpeza e reconciliação
- Restrições de conformidade e segurança do setor público atrasando aprovações de trânsito de dados entre nuvens
- Indisponibilidade de usuários-chave do Tribunal durante as janelas de homologação
