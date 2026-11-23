---
projeto_id: P111
cliente: Eletro Mais
titulo: Predição de churn e retenção para varejo eletro com AWS e Databricks
segmento: Varejo
tecnologias: ["AWS","Databricks"]
servicos: ["Analytics & BI","CRM"]
area: Data & Analytics
dono: Eduarda Prado
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P111
id: P111-SOW
tipo_documental: sow
status_documento: assinado
data: 2024-12-06
prazo_meses: 4
valor: 1230000
---

# SOW — Predição de churn e retenção para varejo eletro com AWS e Databricks

**Contratante:** Eletro Mais · **Contratada:** NTT DATA Brasil · **Vigência:** 4 meses a partir do kickoff

## 1. Objeto

Implantar um modelo de propensão a churn com dados de compra, crédito e atendimento, integrado ao CRM, para antecipar a saída de clientes de alto valor e priorizar ações de retenção nas 180 lojas.

## 2. Escopo contratado

- Construção do data lake no AWS S3 com ingestão de dados transacionais do ERP, CRM e bureau de crédito via AWS Glue
- Engenharia de features e pipelines de modelo no Databricks com Delta Lake, incluindo histórico de 36 meses de compras
- Treinamento e validação de modelos de propensão a churn com explicabilidade das principais variáveis por cliente
- Criação de scores de risco e segmentação de clientes de alto valor no Databricks, atualizados semanalmente
- Integração dos scores ao CRM para disparo de jornadas de retenção e painéis de acompanhamento em Analytics & BI

## 3. Entregáveis e aceite

- Data lake estruturado no AWS S3 com 12 fontes integradas e catálogo de dados
- Pipeline de features e modelo de churn no Databricks com AUC acima de 0,80 em validação
- Score de propensão a churn por cliente, atualizado semanalmente para 2,3 milhões de registros
- Jornadas de retenção configuradas no CRM para os 3 segmentos de maior risco
- Painel executivo de Analytics & BI com taxa de churn, cobertura de contato e retorno das ações

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 1.230.000, faturado mensalmente conforme o cronograma.
