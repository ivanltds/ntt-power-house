---
projeto_id: P453
cliente: Casa & Construção Prime
titulo: Motor de precificação dinâmica para rede varejista de materiais de construção
segmento: Varejo
tecnologias: ["GCP","Databricks"]
servicos: ["Data Science / ML"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P453
id: P453-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2025-04-02
prazo_meses: 3
valor: 950000
---

# Estimativa financeira (GECO) — Casa & Construção Prime

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Modelagem de elasticidade-preço por SKU e região a partir do histórico de vendas no Databricks, com features de sazonalidade e preços de concorrentes; Pipeline de ingestão e orquestração no GCP (Cloud Storage, Dataflow e BigQuery) para dados de PDV, e-commerce e coleta de preços concorrentes.
- Tecnologias assumidas: GCP, Databricks.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 3 meses.

Equipe estimada: 1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados sênior, 1 analista de ML e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 950.000 (sem contingência).

## Pontos em aberto

- Qualidade e cobertura dos dados históricos de preço e concorrência
- Baixa adesão das áreas de categoria às recomendações do modelo
- Restrições de custo e governança no ambiente GCP do cliente
