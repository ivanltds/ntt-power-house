---
projeto_id: P002
cliente: Águas do Vale Saneamento
titulo: Previsão de demanda de água e manutenção preditiva de bombas
segmento: Utilities / Energia
tecnologias: ["AWS","Python","Machine Learning","Power BI"]
servicos: ["Engenharia de Dados","Data Science / ML","Analytics & BI"]
area: Data & Analytics
dono: Thiago Ramos
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P002
id: P002-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-02-18
prazo_meses: 5
valor: 1350000
margem: 0.25
---

# Proposta Comercial — Previsão de demanda de água e manutenção preditiva de bombas

**Cliente:** Águas do Vale Saneamento
**Segmento:** Utilities / Energia
**Área responsável:** Data & Analytics · **Dono da proposta:** Thiago Ramos
**Data:** 2026-02-18 · **Versão:** final

## 1. Contexto e desafio

A companhia de saneamento sofria com paradas não programadas de estações elevatórias e com desperdício de energia elétrica por bombeamento fora do horário ideal.

## 2. Objetivo

Prever a demanda de água por setor de abastecimento e antecipar falhas de bombas a partir de dados de telemetria (vibração, corrente e pressão).

## 3. Escopo da solução

- Ingestão de telemetria SCADA em AWS (S3, Glue e Kinesis)
- Modelo de previsão de demanda horária por setor de abastecimento
- Modelo de manutenção preditiva de bombas no SageMaker
- Painel de operação com alertas de risco de falha

Tecnologias principais: AWS, Python, Machine Learning, Power BI.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Discovery (3 semanas)
- Data lake de telemetria (6 semanas)
- Modelos e validação com a operação (8 semanas)
- Implantação (3 semanas)

## 5. Entregáveis

- Data lake de telemetria
- Dois modelos preditivos em produção
- Painel de operação
- Plano de sustentação

## 6. Equipe proposta

1 arquiteto cloud, 2 engenheiros de dados, 2 cientistas de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Lacunas na telemetria de estações antigas
- Risco: Resistência da operação a recomendações automáticas

## 8. Investimento

Investimento total: R$ 1.350.000, em parcelas mensais ao longo de 5 meses.
Margem praticada: 25%.
