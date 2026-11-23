---
projeto_id: P193
cliente: Laboratório Diagnóstico Preciso
titulo: Plataforma de Gestão de Saúde Populacional com Machine Learning para Análise de Risco
segmento: Saúde
tecnologias: ["Python","Azure","Machine Learning"]
servicos: ["Data Science / ML"]
area: Data & Analytics
dono: Quésia Ramos
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P193
id: P193-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-04-05
prazo_meses: 8
valor: 3220000
margem: 0.21
---

# Proposta Comercial — Plataforma de Gestão de Saúde Populacional com Machine Learning para Análise de Risco

**Cliente:** Laboratório Diagnóstico Preciso
**Segmento:** Saúde
**Área responsável:** Data & Analytics · **Dono da proposta:** Quésia Ramos
**Data:** 2026-04-05 · **Versão:** final

## 1. Contexto e desafio

O Laboratório Diagnóstico Preciso atende cerca de 320 mil beneficiários de planos de saúde e 45 unidades de coleta, mas não consegue identificar de forma proativa os pacientes de maior risco crônico. Cerca de 28% dos exames realizados são repetições evitáveis e a taxa de no-show em exames de acompanhamento chega a 19%, elevando o custo assistencial em aproximadamente R$ 6,2 milhões por ano.

## 2. Objetivo

Construir uma plataforma de gestão de saúde populacional baseada em Python, Azure e Machine Learning para estratificar risco dos beneficiários e priorizar ações de acompanhamento e prevenção.

## 3. Escopo da solução

- Pipeline de ingestão e tratamento de dados históricos de exames e beneficiários em Python, com orquestração no Azure Data Factory
- Modelos de Machine Learning para estratificação de risco crônico e predição de no-show em exames de acompanhamento
- Camada analítica no Azure Synapse com painéis de indicadores populacionais por unidade e por perfil de risco
- API em Python para integração dos escores de risco aos sistemas de agendamento e à central de relacionamento
- Monitoramento de drift e reavaliação periódica dos modelos com métricas de desempenho e governança de dados no Azure

Tecnologias principais: Python, Azure, Machine Learning.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Discovery e arquitetura de dados (6 semanas)
- Construção de pipelines e engenharia de dados no Azure (10 semanas)
- Desenvolvimento e validação dos modelos de Machine Learning (10 semanas)
- Integração, painéis e transferência de conhecimento (6 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e modelo de governança no Azure
- Pipeline de dados populacionais implantado e validado com histórico de 24 meses
- Modelos de estratificação de risco e predição de no-show com relatório de métricas (AUC, precisão e recall)
- Painéis analíticos de saúde populacional publicados no Azure Synapse
- Plano de operação assistida e treinamento das equipes de dados e negócio do laboratório

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados sênior e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e dispersão dos dados históricos de exames entre unidades
- Risco: Baixa adesão das equipes assistenciais ao uso dos escores de risco
- Risco: Restrições de privacidade e LGPD no tratamento de dados sensíveis de saúde

## 8. Investimento

Investimento total: R$ 3.220.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 21%.
