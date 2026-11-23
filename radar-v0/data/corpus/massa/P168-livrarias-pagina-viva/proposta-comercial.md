---
projeto_id: P168
cliente: Livrarias Página Viva
titulo: Predição de churn e retenção para o programa de fidelidade
segmento: Varejo
tecnologias: ["Salesforce","Python","AWS"]
servicos: ["Analytics & BI","Data Science / ML"]
area: Data & Analytics
dono: Xênia Lacerda
confidencialidade: confidencial
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P168
id: P168-PROP
tipo_documental: proposta_comercial
status_documento: preliminar
data: 2026-10-09
prazo_meses: 6
valor: 1310000
margem: 0.22
---

# Proposta Comercial — Predição de churn e retenção para o programa de fidelidade

**Cliente:** Livrarias Página Viva
**Segmento:** Varejo
**Área responsável:** Data & Analytics · **Dono da proposta:** Xênia Lacerda
**Data:** 2026-10-09 · **Versão:** final

## 1. Contexto e desafio

A Livrarias Página Viva tem cerca de 480 mil clientes cadastrados no programa de fidelidade e observa taxa de churn anual de 27% na base ativa, com perda estimada de R$ 6,2 milhões em receita recorrente nos últimos 12 meses. A identificação de clientes em risco é hoje reativa, feita por relatórios manuais que levam até 10 dias para chegar aos times de CRM e loja.

## 2. Objetivo

Construir um modelo preditivo de churn com antecedência de 60 dias e mecanismos de acionamento de retenção integrados ao CRM, elevando a retenção da base ativa em 5 pontos percentuais em 12 meses.

## 3. Escopo da solução

- Diagnóstico e integração de dados transacionais de lojas e e-commerce ao Salesforce, com ingestão em AWS (S3 e Glue)
- Engenharia de atributos e treinamento de modelos de propensão a churn em Python, com validação cruzada e explicabilidade das variáveis
- Publicação de scores de churn e segmentos de risco no Salesforce para uso pelos times de CRM e lojas
- Dashboards de Analytics & BI em AWS QuickSight com indicadores de churn, coorte e efetividade das ações de retenção
- Definição de playbooks de retenção por faixa de risco e rotina de monitoramento de performance do modelo (MLOps básico)

Tecnologias principais: Salesforce, Python, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (6 semanas)
- Desenvolvimento e validação do modelo (8 semanas)
- Integração ao Salesforce e dashboards (6 semanas)
- Piloto de retenção e estabilização (4 semanas)

## 5. Entregáveis

- Relatório de diagnóstico de dados e mapa de integração Salesforce–AWS
- Modelo de propensão a churn em produção com AUC mínima de 0,78 e documentação das variáveis
- Scores e segmentos de risco disponíveis no Salesforce para 480 mil clientes
- Painéis de Analytics & BI com 12 indicadores de churn e retenção
- Playbook de retenção e plano de monitoramento mensal do modelo

## 6. Equipe proposta

1 gerente de projeto, 2 cientistas de dados, 1 engenheiro de dados, 1 consultor Salesforce e 1 analista de BI.

## 7. Premissas e riscos

- Risco: Qualidade e completude dos dados históricos de compras e cadastro
- Risco: Baixa adesão dos times de loja aos playbooks de retenção
- Risco: Limitações de API e governança de dados no Salesforce

## 8. Investimento

Investimento total: R$ 1.310.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 22%.
