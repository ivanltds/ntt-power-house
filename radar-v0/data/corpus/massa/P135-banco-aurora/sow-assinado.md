---
projeto_id: P135
cliente: Banco Aurora
titulo: Detecção de Fraude em Tempo Real com Databricks e Azure
segmento: Serviços Financeiros
tecnologias: ["Databricks","Azure"]
servicos: ["Data Science / ML"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: confidencial
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P135
id: P135-SOW
tipo_documental: sow
status_documento: assinado
data: 2026-07-12
prazo_meses: 7
valor: 860000
---

# SOW — Detecção de Fraude em Tempo Real com Databricks e Azure

**Contratante:** Banco Aurora · **Contratada:** NTT DATA Brasil · **Vigência:** 7 meses a partir do kickoff

## 1. Objeto

Implantar um modelo de detecção de fraude baseado em machine learning na plataforma Databricks sobre Azure, reduzindo falsos positivos e o tempo de resposta a transações suspeitas.

## 2. Escopo contratado

- Ingestão e tratamento de dados transacionais no Azure Data Lake Storage com pipelines no Databricks
- Desenvolvimento de modelos de ML para scoring de fraude em tempo quase real utilizando MLflow no Databricks
- Implementação de feature store e monitoramento de drift de modelos na plataforma Databricks
- Integração do scoring com os sistemas de autorização do banco via APIs no Azure API Management
- Dashboards de acompanhamento de métricas de fraude e alertas no Azure Monitor

## 3. Entregáveis e aceite

- Pipeline de dados transacionais consolidado no Databricks com latência inferior a 5 minutos
- Modelo de detecção de fraude treinado e validado com AUC superior a 0,92
- API de scoring integrada ao ambiente de autorização do banco
- Painel de monitoramento de modelos e métricas de fraude no Azure
- Documentação técnica e plano de retreinamento contínuo dos modelos

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 860.000, faturado mensalmente conforme o cronograma.
