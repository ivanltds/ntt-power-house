---
projeto_id: P259
cliente: Rede Hospitalar Santa Clara
titulo: Painéis executivos e BI para gestão hospitalar com Power BI e Azure
segmento: Saúde
tecnologias: ["Power BI","Azure"]
servicos: ["Engenharia de Dados","Change Management"]
area: Data & Analytics
dono: Quésia Ramos
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P259
id: P259-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-12-07
prazo_meses: 3
valor: 1260000
margem: 0.29
---

# Proposta Comercial — Painéis executivos e BI para gestão hospitalar com Power BI e Azure

**Cliente:** Rede Hospitalar Santa Clara
**Segmento:** Saúde
**Área responsável:** Data & Analytics · **Dono da proposta:** Quésia Ramos
**Data:** 2025-12-07 · **Versão:** final

## 1. Contexto e desafio

A Rede Hospitalar Santa Clara opera 4 unidades com cerca de 1.200 leitos e não dispõe de uma visão consolidada de indicadores assistenciais, financeiros e operacionais: os relatórios são extraídos manualmente de 6 sistemas distintos, com atraso de até 10 dias e retrabalho de aproximadamente 30 horas semanais da equipe de controladoria. A ausência de dados confiáveis em tempo hábil limita a tomada de decisão da diretoria e a gestão de custos por unidade.

## 2. Objetivo

Implantar uma plataforma de dados em Azure com painéis executivos em Power BI, entregando indicadores consolidados das 4 unidades em até 24 horas de atualização e uma única fonte de verdade para a diretoria.

## 3. Escopo da solução

- Ingestão e integração de dados dos 6 sistemas de origem (ERP, HIS, faturamento e folha) em camada de dados no Azure Data Lake Storage
- Modelagem dimensional em Azure Synapse Analytics com camada semântica única para indicadores assistenciais, financeiros e operacionais
- Construção de 8 painéis executivos em Power BI, incluindo ocupação de leitos, glosas, custo por atendimento e produtividade por unidade
- Definição de catálogo de indicadores e governança de dados com métricas versionadas e dicionário de dados
- Plano de Change Management com treinamento de 60 usuários-chave e comunicação às 4 unidades
- Configuração de atualização automática e monitoramento dos pipelines no Azure Data Factory

Tecnologias principais: Power BI, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 3 meses, nas seguintes fases:

- Diagnóstico e arquitetura de dados (4 semanas)
- Engenharia de dados e pipelines em Azure (5 semanas)
- Construção dos painéis em Power BI (3 semanas)
- Change Management, treinamento e go-live (1 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e catálogo com 45 indicadores priorizados
- Pipeline de ingestão automatizado cobrindo as 6 fontes com atualização diária
- Modelo semântico e 8 painéis executivos em Power BI validados pela diretoria
- Dicionário de dados e manual de governança dos indicadores
- Programa de treinamento executado para 60 usuários-chave com material de apoio e avaliação de adesão

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em Power BI, 1 analista de change management e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa qualidade e padronização dos dados nas 6 fontes de origem
- Risco: Indisponibilidade das áreas-chave do cliente para validação dos indicadores
- Risco: Resistência dos usuários à mudança de processo de reporte manual para os painéis

## 8. Investimento

Investimento total: R$ 1.260.000, em parcelas mensais ao longo de 3 meses.

Margem praticada: 29%.
