---
projeto_id: P147
cliente: Agência Estadual de Trânsito
titulo: Migração do Data Warehouse da Agência Estadual de Trânsito para Arquitetura Multi-Cloud com Databricks
segmento: Setor Público
tecnologias: ["Databricks","GCP","AWS","Azure"]
servicos: ["Engenharia de Dados","Migração para Nuvem"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P147
id: P147-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2025-12-11
prazo_meses: 9
valor: 1750000
---

# Estimativa financeira (GECO) — Agência Estadual de Trânsito

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Assessment e desenho da arquitetura lakehouse em Databricks com Delta Lake, definindo a distribuição de workloads entre GCP (BigQuery e Cloud Storage), AWS (S3 e Glue) e Azure (Data Lake Storage e Synapse); Migração de 42 pipelines ETL e 380 tabelas do data warehouse legado para o Databricks, com reescrita em PySpark e validação de paridade de dados.
- Tecnologias assumidas: Databricks, GCP, AWS, Azure.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 9 meses.

Equipe estimada: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em cloud multi-nuvem, 1 analista de BI e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 1.750.000 (sem contingência).

## Pontos em aberto

- Atraso na liberação de acessos e credenciais nas três nuvens pelo órgão de TI do cliente
- Divergências de qualidade nos dados legados que ampliem o esforço de paridade
- Restrições orçamentárias que reduzam o escopo de dashboards na fase final
