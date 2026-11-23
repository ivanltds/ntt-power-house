---
projeto_id: P469
cliente: Metalúrgica Forja Forte
titulo: Painéis executivos e BI para gestão industrial com Power BI e Azure
segmento: Manufatura
tecnologias: ["Power BI","Azure"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Úrsula Campos
confidencialidade: confidencial
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P469
id: P469-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-12-05
prazo_meses: 5
valor: 610000
margem: 0.19
---

# Proposta Comercial — Painéis executivos e BI para gestão industrial com Power BI e Azure

**Cliente:** Metalúrgica Forja Forte
**Segmento:** Manufatura
**Área responsável:** Data & Analytics · **Dono da proposta:** Úrsula Campos
**Data:** 2025-12-05 · **Versão:** final

## 1. Contexto e desafio

A Metalúrgica Forja Forte acompanha indicadores de produção, qualidade e custo em planilhas manuais consolidadas por três analistas, com fechamento mensal de até 12 dias e divergências entre as áreas. A liderança não tem visão única em tempo real sobre OEE e refugo, hoje em torno de 4,2% na linha de forjaria.

## 2. Objetivo

Implantar uma plataforma de dados em Azure e painéis executivos em Power BI que unifiquem indicadores de produção, qualidade e custo, reduzindo o ciclo de fechamento e apoiando decisões diárias da diretoria industrial.

## 3. Escopo da solução

- Ingestão e orquestração de dados de ERP, MES e apontamentos de produção em Azure Data Lake e Azure Data Factory
- Modelagem dimensional em camadas bronze, prata e ouro no Azure Synapse para indicadores de OEE, refugo e custo por ordem
- Construção de painéis executivos e operacionais em Power BI com drill-down por planta, linha e turno
- Implementação de governança de dados, catálogo e controle de acesso por perfil no Azure
- Automação de atualização incremental dos painéis em Power BI com monitoramento de falhas de carga

Tecnologias principais: Power BI, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e arquitetura de dados (4 semanas)
- Engenharia de dados e pipelines em Azure (8 semanas)
- Construção dos painéis em Power BI (6 semanas)
- Homologação, treinamento e go-live (2 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e dicionário de indicadores validado com as áreas de produção e qualidade
- Pipelines de ingestão e transformação em Azure operando com atualização diária automatizada
- Cinco painéis em Power BI: visão executiva, OEE, qualidade e refugo, custos industriais e produtividade por turno
- Relatório de homologação com testes de reconciliação dos números contra o fechamento manual
- Treinamento de 20 usuários-chave e material de apoio para uso dos painéis executivos

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em Power BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa qualidade dos apontamentos de produção no MES
- Risco: Dependência de acessos e credenciais de sistemas legados
- Risco: Mudanças de escopo nos indicadores durante a construção dos painéis

## 8. Investimento

Investimento total: R$ 610.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 19%.
