---
projeto_id: P285
cliente: Rede Supermercados Bom Lar
titulo: Implantação de Plataforma Lakehouse Databricks no Azure para Varejo Alimentar
segmento: Varejo
tecnologias: ["Databricks","Azure"]
servicos: ["Engenharia de Dados","Governança de Dados"]
area: Data & Analytics
dono: Eduarda Prado
confidencialidade: interna
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P285
id: P285-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-10-24
prazo_meses: 5
valor: 590000
---

# Estimativa financeira (GECO) — Rede Supermercados Bom Lar

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão batch e incremental de dados de PDV, ERP de estoque e programa de fidelidade no Azure Data Lake Storage Gen2; Implementação de camadas bronze, silver e gold em Databricks com Delta Lake para 84 lojas e histórico de 24 meses.
- Tecnologias assumidas: Databricks, Azure.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 5 meses.

Equipe estimada: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em governança de dados e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 590.000 (sem contingência).

## Pontos em aberto

- Qualidade e padronização dos dados históricos dos sistemas legados de PDV e estoque
- Dependência de janelas de acesso aos sistemas de origem durante o horário comercial das lojas
- Baixa adoção inicial dos data marts pelas áreas de negócio
