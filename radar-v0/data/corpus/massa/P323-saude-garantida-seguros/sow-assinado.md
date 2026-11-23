---
projeto_id: P323
cliente: Saúde Garantida Seguros
titulo: Precificação Dinâmica com Databricks e Machine Learning no setor de Seguros
segmento: Seguros
tecnologias: ["Databricks","Machine Learning"]
servicos: ["Analytics & BI","Data Science / ML"]
area: Data & Analytics
dono: Leonardo Pires
confidencialidade: confidencial
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P323
id: P323-SOW
tipo_documental: sow
status_documento: assinado
data: 2025-12-01
prazo_meses: 3
valor: 620000
---

# SOW — Precificação Dinâmica com Databricks e Machine Learning no setor de Seguros

**Contratante:** Saúde Garantida Seguros · **Contratada:** NTT DATA Brasil · **Vigência:** 3 meses a partir do kickoff

## 1. Objeto

Implantar um motor de precificação dinâmica baseado em Databricks e Machine Learning para recalcular prêmios com granularidade por perfil de risco, atualizando os modelos a cada ciclo semanal e reduzindo a defasagem tarifária.

## 2. Escopo contratado

- Modelagem de features de risco (sinistralidade, faixa etária, região, histórico de utilização) em camada Delta Lake no Databricks
- Desenvolvimento e treinamento de modelos de Machine Learning de propensão a sinistro e elasticidade de preço por produto
- Pipeline de scoring em lote e near real-time no Databricks para atualização semanal das tarifas
- Painéis de Analytics & BI para monitoramento de prêmio médio, taxa de conversão e loss ratio por segmento
- Governança de modelos com versionamento, monitoramento de drift e trilha de auditoria no Databricks

## 3. Entregáveis e aceite

- Documento de arquitetura de dados e desenho do motor de precificação
- Três modelos de Machine Learning treinados e validados com métricas de AUC e Gini
- Pipeline de scoring automatizado rodando em ambiente de produção no Databricks
- Dashboard de Analytics & BI com 12 indicadores de precificação e conversão
- Relatório de governança de modelos e plano de monitoramento de drift

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 620.000, faturado mensalmente conforme o cronograma.
