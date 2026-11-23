---
projeto_id: P492
cliente: TeleNorte Conecta
titulo: Predição de churn e retenção com Databricks e Machine Learning para operadora de telecom
segmento: Telecom
tecnologias: ["Databricks","Machine Learning","Python"]
servicos: ["CRM"]
area: Data & Analytics
dono: Quésia Ramos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P492
id: P492-SOW
tipo_documental: sow
status_documento: assinado
data: 2026-03-20
prazo_meses: 4
valor: 1770000
---

# SOW — Predição de churn e retenção com Databricks e Machine Learning para operadora de telecom

**Contratante:** TeleNorte Conecta · **Contratada:** NTT DATA Brasil · **Vigência:** 4 meses a partir do kickoff

## 1. Objeto

Construir um modelo de predição de churn por cliente, integrado ao CRM, para orientar ações de retenção segmentadas e reduzir a perda mensal de base em pelo menos 20% em 4 meses.

## 2. Escopo contratado

- Ingestão e tratamento de dados de consumo, faturamento, reclamações e interações do CRM em Databricks, com pipelines em Python para 18 fontes e histórico de 24 meses.
- Engenharia de atributos e treinamento de modelos de Machine Learning de classificação de churn (gradient boosting e regressão logística) com validação temporal e explicabilidade por variável.
- Publicação de scores de propensão ao churn e propensão de aceite de oferta diretamente no CRM, com atualização diária e regras de priorização para o time de retenção.
- Painéis de acompanhamento em Databricks para monitorar performance do modelo (AUC, precision@10%) e efetividade das campanhas de retenção.
- Definição de playbooks de retenção por faixa de risco e documentação de governança do modelo para uso contínuo pela área de CRM.

## 3. Entregáveis e aceite

- Modelo de churn em produção com AUC de 0,86 e lista diária de clientes priorizados por risco e valor.
- Integração do score de churn ao CRM, com atualização automática e fila de trabalho para 120 agentes de retenção.
- Dashboard de monitoramento de modelo e campanhas com 12 indicadores de performance e retenção.
- Playbooks de retenção segmentados em 4 faixas de risco, com ofertas e canais recomendados.
- Documentação técnica e de governança, incluindo dicionário de dados e rotina de retreinamento mensal.

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 1.770.000, faturado mensalmente conforme o cronograma.
