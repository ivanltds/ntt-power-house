---
projeto_id: P448
cliente: Eletro Mais
titulo: Previsão de Demanda e Reposição Automatizada para Rede Varejista
segmento: Varejo
tecnologias: ["Machine Learning","Snowflake","Databricks"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: André Vasconcelos
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P448
id: P448-SOW
tipo_documental: sow
status_documento: assinado
data: 2026-04-22
prazo_meses: 6
valor: 3610000
---

# SOW — Previsão de Demanda e Reposição Automatizada para Rede Varejista

**Contratante:** Eletro Mais · **Contratada:** NTT DATA Brasil · **Vigência:** 6 meses a partir do kickoff

## 1. Objeto

Implantar um motor de previsão de demanda e reposição automatizada, integrado ao ERP e ao WMS, para reduzir ruptura e excesso de estoque com previsões por loja e SKU em horizonte semanal.

## 2. Escopo contratado

- Construção de pipeline de engenharia de dados no Databricks para ingestão de histórico de vendas, estoque, promoções e sazonalidade de 36 meses
- Modelagem de camadas analíticas no Snowflake com dados de 78 lojas e 4.200 SKUs, incluindo calendário promocional e rupturas censuradas
- Desenvolvimento e treinamento de modelos de Machine Learning para previsão de demanda semanal por loja e SKU, com meta de MAPE abaixo de 22%
- Motor de sugestão de reposição e ponto de pedido com regras de estoque de segurança, lead time de fornecedor e restrições de lote mínimo
- Integração das sugestões com o ERP para geração automática de pedidos de compra e painéis de acompanhamento para 120 usuários das áreas de compras e lojas

## 3. Entregáveis e aceite

- Documento de arquitetura de dados e modelo de governança no Snowflake e Databricks
- Pipeline de dados em produção com atualização diária e 99% de completude das fontes críticas
- Modelos de previsão de demanda treinados e validados para as 10 categorias prioritárias
- Motor de reposição automatizada integrado ao ERP em 3 lojas piloto antes do rollout para as 78 lojas
- Painéis de acurácia, ruptura e cobertura de estoque e material de treinamento para 120 usuários

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 3.610.000, faturado mensalmente conforme o cronograma.
