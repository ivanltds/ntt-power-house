---
projeto_id: P471
cliente: Laboratório Diagnóstico Preciso
titulo: Predição de Churn e Retenção para Laboratório de Diagnósticos
segmento: Saúde
tecnologias: ["Databricks","Salesforce"]
servicos: ["Data Science / ML"]
area: Data & Analytics
dono: Quésia Ramos
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P471
id: P471-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-03-02
prazo_meses: 5
valor: 220000
margem: 0.32
---

# Proposta Comercial — Predição de Churn e Retenção para Laboratório de Diagnósticos

**Cliente:** Laboratório Diagnóstico Preciso
**Segmento:** Saúde
**Área responsável:** Data & Analytics · **Dono da proposta:** Quésia Ramos
**Data:** 2026-03-02 · **Versão:** final

## 1. Contexto e desafio

O Laboratório Diagnóstico Preciso enfrenta uma taxa de churn de 18% ao ano em sua base de 42 mil pacientes ativos, com perda estimada de R$ 6,3 milhões em receita recorrente. A maior parte das evasões só é identificada quando o paciente já migrou para concorrentes, sem mecanismo preditivo para ação proativa.

## 2. Objetivo

Implantar um modelo preditivo de churn e uma esteira de retenção integrada ao CRM, reduzindo a taxa de evasão em 5 pontos percentuais nos próximos 12 meses.

## 3. Escopo da solução

- Modelagem de propensão a churn no Databricks com features de frequência de exames, sinistralidade e histórico de contato
- Pipeline de dados no Databricks para ingestão de dados de LIS, faturamento e interações de atendimento
- Integração dos scores de churn com o Salesforce para acionamento automático de jornadas de retenção
- Painéis de monitoramento de acurácia do modelo e taxas de conversão das ações de retenção
- Definição de regras de negócio e playbooks de retenção por faixa de risco e segmento de paciente

Tecnologias principais: Databricks, Salesforce.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (5 semanas)
- Desenvolvimento e validação do modelo (7 semanas)
- Integração com Salesforce e jornadas de retenção (6 semanas)
- Go-live assistido e estabilização (4 semanas)

## 5. Entregáveis

- Modelo de propensão a churn validado com AUC acima de 0,80
- Pipeline de dados no Databricks em produção com atualização diária dos scores
- Integração Salesforce-Databricks com 3 jornadas de retenção ativas
- Dashboard executivo de retenção com 12 indicadores-chave
- Documentação técnica e transferência de conhecimento para o time interno

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de dados, 1 cientista de dados sênior, 1 engenheiro de dados e 1 especialista Salesforce.

## 7. Premissas e riscos

- Risco: Qualidade e completude dos dados históricos de LIS e faturamento
- Risco: Baixa adesão das equipes de atendimento às jornadas de retenção
- Risco: Mudanças de escopo durante a integração com Salesforce

## 8. Investimento

Investimento total: R$ 220.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 32%.
