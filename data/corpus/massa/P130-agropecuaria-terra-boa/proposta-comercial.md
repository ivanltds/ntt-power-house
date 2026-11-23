---
projeto_id: P130
cliente: Agropecuária Terra Boa
titulo: Modelo de risco de crédito com Machine Learning para o agronegócio
segmento: Agronegócio
tecnologias: ["Machine Learning","Python"]
servicos: ["Data Science / ML","Change Management"]
area: AI & Automation
dono: Paulo Henrique Dias
confidencialidade: confidencial
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P130
id: P130-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-06-14
prazo_meses: 4
valor: 2020000
margem: 0.29
---

# Proposta Comercial — Modelo de risco de crédito com Machine Learning para o agronegócio

**Cliente:** Agropecuária Terra Boa
**Segmento:** Agronegócio
**Área responsável:** AI & Automation · **Dono da proposta:** Paulo Henrique Dias
**Data:** 2026-06-14 · **Versão:** final

## 1. Contexto e desafio

A Agropecuária Terra Boa analisa hoje cerca de 1.200 propostas de crédito rural por safra em planilhas manuais, com prazo médio de 9 dias para decisão e índice de inadimplência de 7,8% na carteira. A ausência de um modelo estatístico impede priorizar produtores por risco e precificar corretamente as operações.

## 2. Objetivo

Construir e colocar em produção um modelo de risco de crédito baseado em Machine Learning em Python, com score de probabilidade de inadimplência por produtor, integrado ao processo de análise da área financeira.

## 3. Escopo da solução

- Análise exploratória e engenharia de atributos sobre 5 anos de histórico de crédito, produção e cadastro de produtores
- Desenvolvimento de modelos de classificação em Python (scikit-learn e XGBoost) com validação cruzada e explicabilidade via SHAP
- Definição de faixas de score e política de alçadas de aprovação junto à área de crédito
- Implantação do modelo em pipeline Python com monitoramento mensal de performance (AUC, KS e PSI)
- Trilha de Change Management: treinamento de 40 analistas e manual de uso do score no fluxo de decisão

Tecnologias principais: Machine Learning, Python.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (4 semanas)
- Modelagem e validação (6 semanas)
- Implantação e monitoramento (4 semanas)
- Change Management e encerramento (2 semanas)

## 5. Entregáveis

- Relatório de diagnóstico de dados e dicionário de atributos do modelo
- Modelo de risco de crédito documentado, com AUC mínima de 0,78 em base de teste
- Nota técnica de política de crédito com faixas de score e alçadas
- Pipeline Python em produção com rotina de reavaliação e monitoramento de drift
- Programa de treinamento aplicado a 40 analistas e material de apoio

## 6. Equipe proposta

1 cientista de dados sênior, 1 engenheiro de dados, 1 especialista em change management e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e cobertura incompletas do histórico de crédito
- Risco: Baixa adesão dos analistas ao novo score
- Risco: Drift do modelo após mudanças no perfil da safra

## 8. Investimento

Investimento total: R$ 2.020.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 29%.
