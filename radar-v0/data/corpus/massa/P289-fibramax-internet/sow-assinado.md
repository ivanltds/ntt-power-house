---
projeto_id: P289
cliente: FibraMax Internet
titulo: Precificação dinâmica com Machine Learning para planos de banda larga
segmento: Telecom
tecnologias: ["Machine Learning","Python","Databricks","GCP"]
servicos: ["Analytics & BI"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P289
id: P289-SOW
tipo_documental: sow
status_documento: assinado
data: 2026-04-07
prazo_meses: 6
valor: 2010000
---

# SOW — Precificação dinâmica com Machine Learning para planos de banda larga

**Contratante:** FibraMax Internet · **Contratada:** NTT DATA Brasil · **Vigência:** 6 meses a partir do kickoff

## 1. Objeto

Implantar um motor de precificação dinâmica baseado em Machine Learning para ajustar preços de planos residenciais e PMEs com granularidade por região e perfil de cliente, reduzindo churn e elevando a margem por assinante.

## 2. Escopo contratado

- Construção de pipelines de dados no Databricks e GCP para consolidar histórico de vendas, churn, inadimplência e concorrência em uma base analítica única
- Desenvolvimento de modelos de propensão a churn e elasticidade-preço em Python e Machine Learning, com treinamento e validação sobre 36 meses de histórico
- Implementação de motor de recomendação de preços por cluster de CEP, perfil de consumo e canal de venda
- Painéis de Analytics & BI para acompanhamento de margem, churn e aderência das ofertas em tempo quase real
- Integração das recomendações ao CRM e ao portal de vendas com regras de aprovação e limites de variação de preço

## 3. Entregáveis e aceite

- Base analítica unificada no Databricks com 36 meses de dados tratados e dicionário de métricas
- Modelos de churn e elasticidade-preço documentados, com AUC superior a 0,82 em validação
- Motor de precificação dinâmica em produção no GCP, cobrindo 100% das regiões de atuação
- Painéis de Analytics & BI com 12 indicadores de margem, churn e aderência comercial
- Manual de governança de preços e plano de evolução para os próximos 12 meses

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 2.010.000, faturado mensalmente conforme o cronograma.
