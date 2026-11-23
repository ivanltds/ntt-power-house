---
projeto_id: P461
cliente: Cimentos Rocha Firme
titulo: Previsão de demanda e reposição inteligente para operação industrial
segmento: Manufatura
tecnologias: ["SAP","Snowflake","Databricks","Python"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Úrsula Campos
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P461
id: P461-SOW
tipo_documental: sow
status_documento: assinado
data: 2026-09-21
prazo_meses: 8
valor: 1700000
---

# SOW — Previsão de demanda e reposição inteligente para operação industrial

**Contratante:** Cimentos Rocha Firme · **Contratada:** NTT DATA Brasil · **Vigência:** 8 meses a partir do kickoff

## 1. Objeto

Implantar uma plataforma de previsão de demanda e reposição automatizada que reduza o erro de previsão para menos de 12% e diminua o estoque excedente em 15% em 8 meses.

## 2. Escopo contratado

- Extração e integração dos históricos de vendas, produção e estoque do SAP para o Snowflake
- Construção de pipelines de engenharia de dados em Databricks para tratamento e feature engineering das séries de demanda
- Desenvolvimento de modelos de previsão de demanda em Python por SKU, canal e região, com granularidade semanal
- Motor de reposição e sugestão de transferências entre fábricas e CDs alimentado por regras de estoque mínimo e cobertura
- Painéis de acompanhamento de acurácia, rupturas e nível de estoque integrados ao ecossistema Snowflake

## 3. Entregáveis e aceite

- Pipeline de dados no Snowflake e Databricks com 24 meses de histórico consolidado de 3 fábricas e 12 CDs
- Modelos de previsão de demanda em Python validados com backtesting e acurácia mínima de 88%
- Motor de reposição automatizada com regras parametrizáveis por família de produto
- Painel gerencial de acurácia de previsão, rupturas e giro de estoque
- Documentação técnica e treinamento de 15 usuários das áreas de Planejamento e Logística

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 1.700.000, faturado mensalmente conforme o cronograma.
