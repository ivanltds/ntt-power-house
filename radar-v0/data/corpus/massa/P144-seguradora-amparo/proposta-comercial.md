---
projeto_id: P144
cliente: Seguradora Amparo
titulo: Predição de churn e retenção para carteira de seguros com Salesforce e AWS
segmento: Seguros
tecnologias: ["Salesforce","AWS"]
servicos: ["Analytics & BI","CRM","Data Science / ML"]
area: Data & Analytics
dono: Leonardo Pires
confidencialidade: interna
status_proposta: Em negociação
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P144
id: P144-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-11-01
prazo_meses: 3
valor: 3000000
margem: 0.33
---

# Proposta Comercial — Predição de churn e retenção para carteira de seguros com Salesforce e AWS

**Cliente:** Seguradora Amparo
**Segmento:** Seguros
**Área responsável:** Data & Analytics · **Dono da proposta:** Leonardo Pires
**Data:** 2026-11-01 · **Versão:** final

## 1. Contexto e desafio

A Seguradora Amparo opera com cerca de 1,2 milhão de apólices ativas e enfrenta taxa de cancelamento de 18% ao ano nos ramos de auto e residencial, concentrada nos primeiros 12 meses de contrato. A base de dados de sinistros, renovações e interações de atendimento está fragmentada entre o CRM e sistemas legados, impedindo ações de retenção proativas e causando perda estimada de R$ 45 milhões em prêmios anuais.

## 2. Objetivo

Construir um modelo de predição de churn e uma esteira de retenção integrada ao Salesforce e à AWS, elevando a efetividade das ações de retenção em 25% e reduzindo o cancelamento em 4 pontos percentuais em 12 meses.

## 3. Escopo da solução

- Diagnóstico e integração das bases de apólices, sinistros e atendimento no AWS (S3, Glue e Redshift)
- Desenvolvimento de modelo de propensão a churn com features de comportamento de pagamento, sinistralidade e interações, em SageMaker
- Definição de segmentos de risco e regras de próxima melhor ação no Salesforce Sales/Service Cloud
- Painéis de monitoramento de churn e retenção em Amazon QuickSight para as áreas Comercial e Atuária
- Implantação de rotina de re-treino mensal do modelo e governança de dados com Data Catalog na AWS

Tecnologias principais: Salesforce, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 3 meses, nas seguintes fases:

- Diagnóstico e integração de dados (4 semanas)
- Modelagem de churn e validação (4 semanas)
- Integração com Salesforce e dashboards (3 semanas)
- Homologação e transferência de conhecimento (1 semanas)

## 5. Entregáveis

- Relatório de diagnóstico de dados e arquitetura de integração AWS
- Modelo de churn treinado e validado, com AUC mínima de 0,78 e matriz de explicabilidade
- Configuração de segmentos e jornadas de retenção no Salesforce
- Dashboards de monitoramento de indicadores de churn e retenção
- Documentação de governança, playbook de re-treino e transferência de conhecimento

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados e 1 consultor de CRM Salesforce.

## 7. Premissas e riscos

- Risco: Qualidade e completude dos dados históricos de sinistros e renovações
- Risco: Baixa adesão das áreas Comercial e Atendimento às ações de retenção
- Risco: Restrições de privacidade e LGPD no uso de dados de clientes para modelagem

## 8. Investimento

Investimento total: R$ 3.000.000, em parcelas mensais ao longo de 3 meses.

Margem praticada: 33%.
