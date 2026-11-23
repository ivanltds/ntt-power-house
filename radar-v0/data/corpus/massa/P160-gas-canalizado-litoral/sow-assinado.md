---
projeto_id: P160
cliente: Gás Canalizado Litoral
titulo: Manutenção preditiva de ativos de distribuição com Azure, Databricks e SAP
segmento: Utilities / Energia
tecnologias: ["Azure","Databricks","SAP","Python"]
servicos: ["Data Science / ML"]
area: AI & Automation
dono: Yuri Monteiro
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P160
id: P160-SOW
tipo_documental: sow
status_documento: assinado
data: 2026-07-04
prazo_meses: 6
valor: 1610000
---

# SOW — Manutenção preditiva de ativos de distribuição com Azure, Databricks e SAP

**Contratante:** Gás Canalizado Litoral · **Contratada:** NTT DATA Brasil · **Vigência:** 6 meses a partir do kickoff

## 1. Objeto

Implantar uma solução de manutenção preditiva que antecipe falhas em ativos críticos (compressores, válvulas e reguladores) com horizonte de 7 a 15 dias, reduzindo paradas não programadas em pelo menos 25% em 12 meses.

## 2. Escopo contratado

- Ingestão e orquestração dos dados de sensores IoT e histórico de manutenção do SAP PM no Azure Data Lake, com pipelines em Databricks
- Feature engineering e treinamento de modelos de classificação e regressão em Python no Databricks para previsão de falha e RUL (vida útil remanescente)
- Integração dos scores preditivos ao SAP PM para geração automática de ordens de serviço priorizadas
- Dashboard de saúde de ativos e alertas operacionais no Azure, consumindo tabelas Delta do Databricks
- Pipeline MLOps com versionamento, monitoramento de drift e retreino mensal dos modelos

## 3. Entregáveis e aceite

- Data lake estruturado com 18 meses de histórico de sensores e manutenção integrados
- Modelos preditivos treinados e validados para 3 famílias de ativos críticos, com métricas de recall e MAE documentadas
- Integração em produção entre scores preditivos e SAP PM, com 100% das ordens críticas priorizadas automaticamente
- Dashboard de saúde de ativos e alertas para a central de operações
- Documentação técnica, runbooks de MLOps e transferência de conhecimento para a equipe interna

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 1.610.000, faturado mensalmente conforme o cronograma.
