---
projeto_id: P472
cliente: Banco Atlântida Digital
titulo: Migração do Data Warehouse do Banco Atlântida Digital para AWS e Databricks
segmento: Serviços Financeiros
tecnologias: ["AWS","Databricks"]
servicos: ["Migração para Nuvem","Engenharia de Dados"]
area: Cloud & Infra
dono: Isabela Freitas
confidencialidade: confidencial
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P472
id: P472-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-10-25
prazo_meses: 5
valor: 1950000
---

# Estimativa financeira (GECO) — Banco Atlântida Digital

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Assessment e mapeamento dos 45 TB de dados e das 1.200 rotinas de ETL para o plano de migração; Implantação do data lake na AWS com Amazon S3, AWS Glue e orquestração de pipelines.
- Tecnologias assumidas: AWS, Databricks.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 5 meses.

Equipe estimada: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em nuvem AWS e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 1.950.000 (sem contingência).

## Pontos em aberto

- Atraso na liberação de acessos e credenciais pelas áreas de segurança do cliente
- Divergências de dados nas reconciliações que exijam reprocessamento de cargas
- Dependência de janelas noturnas limitadas para testes paralelos com o ambiente on-premises
