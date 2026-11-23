---
projeto_id: P377
cliente: Gás Canalizado Litoral
titulo: Indicadores ESG e Emissões para Distribuidora de Gás Canalizado
segmento: Utilities / Energia
tecnologias: ["Power BI","Azure","Python","Snowflake"]
servicos: ["Governança de Dados","Analytics & BI"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P377
id: P377-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-12-17
prazo_meses: 6
valor: 610000
margem: 0.32
---

# Proposta Comercial — Indicadores ESG e Emissões para Distribuidora de Gás Canalizado

**Cliente:** Gás Canalizado Litoral
**Segmento:** Utilities / Energia
**Área responsável:** Data & Analytics · **Dono da proposta:** Nelson Barbosa
**Data:** 2025-12-17 · **Versão:** final

## 1. Contexto e desafio

A Gás Canalizada Litoral precisa consolidar dados de emissões de 12 unidades operacionais e 350 medidores para atender ao regulamento ESG do setor, mas os processos manuais em planilhas geram atrasos de 15 dias na divulgação de indicadores e riscos de inconsistência.

## 2. Objetivo

Implementar uma plataforma de dados ESG na nuvem para automatizar a coleta, o cálculo e a visualização de indicadores de emissões, garantindo relatórios mensais confiáveis em até 5 dias úteis.

## 3. Escopo da solução

- Ingestão de dados de emissões de 350 medidores e 12 unidades para o Snowflake via Azure Data Factory
- Desenvolvimento de pipelines de cálculo de indicadores ESG em Python e orquestração no Azure
- Modelagem dimensional no Snowflake para análises de emissões por escopo e unidade
- Criação de dashboards interativos no Power BI para acompanhamento de metas e tendências
- Implementação de governança de dados com catálogo e linhagem no Azure Purview

Tecnologias principais: Power BI, Azure, Python, Snowflake.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Fase 1 - Discovery e Arquitetura: 4 semanas
- Fase 2 - Implementação de Pipelines e Modelagem: 10 semanas
- Fase 3 - Dashboards e Governança: 8 semanas
- Fase 4 - Homologação e Go-live: 2 semanas

## 5. Entregáveis

- Documento de arquitetura de dados ESG e governança
- Pipeline de ingestão e transformação de dados de emissões no Snowflake
- Modelo analítico e 5 dashboards no Power BI para indicadores ESG
- Relatório de qualidade de dados e catálogo de metadados
- Manual de operação e transferência de conhecimento para a equipe do cliente

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade dos dados de origem inferior ao esperado
- Risco: Atraso na integração com sistemas legados de medição
- Risco: Mudanças nos requisitos regulatórios durante o projeto

## 8. Investimento

Investimento total: R$ 610.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 32%.
