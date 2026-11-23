---
projeto_id: P517
cliente: Financeira Rumo Certo
titulo: Lakehouse de Dados para Análise de Crédito e Cobrança
segmento: Serviços Financeiros
tecnologias: ["Python","Azure","Databricks","AWS"]
servicos: ["Engenharia de Dados","Governança de Dados"]
area: Data & Analytics
dono: Xênia Lacerda
confidencialidade: interna
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P517
id: P517-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-10-10
prazo_meses: 5
valor: 820000
---

# Estimativa financeira (GECO) — Financeira Rumo Certo

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão batch e incremental de fontes transacionais em Azure Data Lake Storage Gen2, orquestrada com Databricks Workflows e pipelines em Python; Construção de camadas bronze, silver e gold no Databricks com Delta Lake, incluindo histórico de alterações e tabelas de dimensão e fato para crédito e cobrança.
- Tecnologias assumidas: Python, Azure, Databricks, AWS.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 5 meses.

Equipe estimada: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em governança de dados e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 820.000 (sem contingência).

## Pontos em aberto

- Qualidade e padronização insuficientes nos dados legados de cobrança
- Dependência de acessos e liberações de rede entre Azure e AWS
- Baixa disponibilidade das áreas de negócio para validação dos indicadores
