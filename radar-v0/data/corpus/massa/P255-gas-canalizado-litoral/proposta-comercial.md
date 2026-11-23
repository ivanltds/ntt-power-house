---
projeto_id: P255
cliente: Gás Canalizado Litoral
titulo: Plataforma de Indicadores ESG e Monitoramento de Emissões
segmento: Utilities / Energia
tecnologias: ["Python","Azure","Snowflake"]
servicos: ["Analytics & BI"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P255
id: P255-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-12-23
prazo_meses: 6
valor: 1040000
margem: 0.19
---

# Proposta Comercial — Plataforma de Indicadores ESG e Monitoramento de Emissões

**Cliente:** Gás Canalizado Litoral
**Segmento:** Utilities / Energia
**Área responsável:** Data & Analytics · **Dono da proposta:** Nelson Barbosa
**Data:** 2025-12-23 · **Versão:** final

## 1. Contexto e desafio

A Gás Canalizada Litoral acompanha hoje 42 indicadores ESG em planilhas manuais, com consolidação mensal que leva 15 dias e alto risco de inconsistência nos dados de emissões. A empresa precisa reportar emissões de Escopo 1 e 2 para 3 distribuidoras parceiras e para o regulador, com corte trimestral e trilha de auditoria.

## 2. Objetivo

Implantar uma plataforma de dados e BI que consolide automaticamente os indicadores ESG e as emissões, reduzindo o ciclo de fechamento de 15 para 3 dias úteis e garantindo rastreabilidade para auditoria.

## 3. Escopo da solução

- Pipeline de ingestão em Python para coleta de dados operacionais, de combustível e de sensores de emissões
- Camada analítica no Snowflake com modelagem dimensional de indicadores ESG e fatores de emissão versionados
- Orquestração e governança no Azure Data Factory e Microsoft Purview, com linhagem de dados e controle de acesso
- Dashboards de Analytics & BI para acompanhamento mensal de Escopo 1 e 2 e dos 42 indicadores ESG
- Motor de cálculo de emissões em Python com validação automatizada e trilha de auditoria por registro

Tecnologias principais: Python, Azure, Snowflake.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e desenho da arquitetura (5 semanas)
- Construção dos pipelines e camada analítica (11 semanas)
- Dashboards, motor de emissões e validação (6 semanas)
- Homologação, treinamento e go-live (4 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e dicionário dos 42 indicadores ESG
- Pipeline de ingestão e camada analítica no Snowflake em produção
- Painéis de BI com visão executiva, operacional e de auditoria de emissões
- Motor de cálculo de emissões validado contra o relatório do último trimestre
- Manual de operação, treinamento de 12 usuários e plano de sustentação

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa qualidade e padronização dos dados históricos de emissões
- Risco: Dependência de áreas operacionais para envio de dados de combustível
- Risco: Mudanças nos critérios de reporte do regulador durante o projeto

## 8. Investimento

Investimento total: R$ 1.040.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 19%.
