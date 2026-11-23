---
projeto_id: P309
cliente: Calçados Passo Firme
titulo: Painéis executivos e BI para rede de calçados com integração SAP e Power BI
segmento: Varejo
tecnologias: ["Power BI","SAP"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Eduarda Prado
confidencialidade: confidencial
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P309
id: P309-PROPV1
tipo_documental: proposta_comercial
status_documento: rascunho
data: 2025-06-17
prazo_meses: 8
valor: 390000
margem: 0.25
---

# Proposta Comercial — Painéis executivos e BI para rede de calçados com integração SAP e Power BI (versão 1, rascunho)

**Cliente:** Calçados Passo Firme
**Segmento:** Varejo
**Área responsável:** Data & Analytics · **Dono da proposta:** Eduarda Prado
**Data:** 2025-06-17 · **Versão:** 1 (rascunho)

## 1. Contexto e desafio

A Calçados Passo Firme opera 212 lojas próprias e 3 centros de distribuição, com fechamento gerencial feito em planilhas que levam até 9 dias úteis para consolidar vendas, estoque e margem por loja. A diretoria não tem visão confiável de ruptura e giro por SKU, e as decisões de compra e remanejamento são tomadas com dados defasados.

## 2. Objetivo

Implantar uma camada de painéis executivos em Power BI alimentada por dados integrados do SAP, reduzindo o ciclo de fechamento gerencial para até 1 dia útil e dando visibilidade diária de vendas, estoque, ruptura e margem por loja e por SKU.

## 3. Escopo da solução

- Extração e integração de dados de vendas, estoque e financeiro do SAP (ECC) para camada analítica, com ingestão incremental diária
- Modelagem dimensional em star schema no Power BI, com métricas de margem, giro, ruptura e sell-out por loja e por SKU
- Construção de 4 painéis executivos: Visão Diretoria, Vendas, Estoque/Ruptura e Margem por Canal
- Camada de governança de dados com catálogo de indicadores, dicionário de métricas e controle de acesso por perfil no Power BI
- Engenharia de dados para rotinas de qualidade e reconciliação entre SAP e a base analítica, com alertas de divergência acima de 0,5%

Tecnologias principais: Power BI, SAP.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Diagnóstico e desenho da arquitetura (4 semanas)
- Engenharia de dados e integração SAP (8 semanas)
- Construção e homologação dos painéis em Power BI (10 semanas)
- Go-live, treinamento e sustentação assistida (2 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e definição dos indicadores corporativos validado pela diretoria
- Pipeline de ingestão SAP para a camada analítica em operação diária
- 4 painéis executivos em Power BI publicados e homologados, com controle de acesso por perfil
- Dicionário de dados e catálogo de métricas com regras de cálculo de margem, giro e ruptura
- Relatório de reconciliação SAP x base analítica e plano de sustentação para a área de dados

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em Power BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e padronização dos cadastros de produto e loja no SAP
- Risco: Indisponibilidade das janelas de extração do SAP durante fechamento mensal
- Risco: Baixa adoção dos painéis pela diretoria e pelas gerências regionais

## 8. Investimento

Investimento total: R$ 390.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 25%.
