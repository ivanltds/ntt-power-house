---
projeto_id: P597
cliente: Cargas Rodo Sul
titulo: Manutenção Preditiva de Ativos com Azure e SAP para Operação Logística
segmento: Logística
tecnologias: ["Azure","SAP"]
servicos: ["Data Science / ML","Change Management"]
area: AI & Automation
dono: Karina Duarte
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P597
id: P597-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-02-22
prazo_meses: 9
valor: 1130000
---

# Estimativa financeira (GECO) — Cargas Rodo Sul

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão e tratamento de telemetria de sensores (temperatura, vibração, pressão) e dados de ordens de manutenção do SAP em Azure Data Lake e Azure Data Factory; Construção de feature store e pipelines de dados em Azure Databricks para 1.850 ativos com histórico de 24 meses.
- Tecnologias assumidas: Azure, SAP.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 9 meses.

Equipe estimada: 1 arquiteto de dados Azure, 2 engenheiros de dados, 2 cientistas de dados, 1 consultor SAP PM, 1 especialista em Change Management e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 1.130.000 (sem contingência).

## Pontos em aberto

- Qualidade e lacunas na telemetria de ativos mais antigos, comprometendo a acurácia dos modelos
- Baixa adesão dos times de manutenção às ordens sugeridas pelo SAP
- Restrições de integração e janelas de manutenção no ambiente SAP do cliente
