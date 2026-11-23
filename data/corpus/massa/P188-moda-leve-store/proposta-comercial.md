---
projeto_id: P188
cliente: Moda Leve Store
titulo: Modelo de risco de crédito com Machine Learning para o varejo
segmento: Varejo
tecnologias: ["Machine Learning","Python","AWS","Snowflake"]
servicos: ["Governança de Dados","Data Science / ML"]
area: AI & Automation
dono: Fábio Nunes
confidencialidade: confidencial
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P188
id: P188-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-09-02
prazo_meses: 6
valor: 710000
margem: 0.32
---

# Proposta Comercial — Modelo de risco de crédito com Machine Learning para o varejo

**Cliente:** Moda Leve Store
**Segmento:** Varejo
**Área responsável:** AI & Automation · **Dono da proposta:** Fábio Nunes
**Data:** 2026-09-02 · **Versão:** final

## 1. Contexto e desafio

A Moda Leve Store, rede de varejo com 180 lojas físicas e faturamento anual de R$ 1,2 bilhão, enfrenta inadimplência de 8,4% na carteira de crediário próprio, que responde por 32% das vendas. A análise de crédito atual é baseada em regras fixas e planilhas, levando até 48 horas para aprovação e gerando perda estimada de R$ 14 milhões ao ano.

## 2. Objetivo

Construir um modelo de risco de crédito baseado em Machine Learning para decisão em tempo real no crediário, reduzindo a inadimplência e o tempo de aprovação.

## 3. Escopo da solução

- Modelagem preditiva de propensão à inadimplência em Python com Machine Learning, usando histórico de 3 anos de vendas e pagamentos
- Pipeline de dados no Snowflake integrando cadastro, crediário e transações de 180 lojas
- Implantação dos modelos em AWS com inferência em tempo real via API para o ponto de venda
- Painéis de monitoramento de performance do modelo (KS, AUC, PSI) e governança de dados
- Definição de políticas de crédito e limites por score com o time de risco do cliente

Tecnologias principais: Machine Learning, Python, AWS, Snowflake.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e governança de dados (6 semanas)
- Desenvolvimento e validação do modelo (10 semanas)
- Implantação em AWS e integração com o PDV (6 semanas)
- Monitoramento, ajuste e transferência de conhecimento (2 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e modelo no Snowflake e AWS
- Modelo de score de crédito treinado e validado com AUC mínima de 0,78
- API de scoring em produção integrada ao sistema de crediário
- Painel de monitoramento de drift e performance do modelo
- Relatório de governança de dados com catálogo das 45 variáveis utilizadas

## 6. Equipe proposta

1 arquiteto de dados, 2 cientistas de dados, 1 engenheiro de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e completude dos dados históricos de crediário
- Risco: Baixa adesão das equipes de loja ao novo score
- Risco: Latência da API de scoring no ponto de venda

## 8. Investimento

Investimento total: R$ 710.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 32%.
