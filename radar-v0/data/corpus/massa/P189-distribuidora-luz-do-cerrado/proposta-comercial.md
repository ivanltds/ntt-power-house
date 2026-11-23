---
projeto_id: P189
cliente: Distribuidora Luz do Cerrado
titulo: Plataforma de Indicadores ESG e Emissões para Distribuidora de Energia
segmento: Utilities / Energia
tecnologias: ["Azure","Snowflake","Python"]
servicos: ["Analytics & BI","Governança de Dados"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: interna
status_proposta: Em negociação
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P189
id: P189-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-09-29
prazo_meses: 4
valor: 3060000
margem: 0.27
---

# Proposta Comercial — Plataforma de Indicadores ESG e Emissões para Distribuidora de Energia

**Cliente:** Distribuidora Luz do Cerrado
**Segmento:** Utilities / Energia
**Área responsável:** Data & Analytics · **Dono da proposta:** Nelson Barbosa
**Data:** 2026-09-29 · **Versão:** final

## 1. Contexto e desafio

A Distribuidora Luz do Cerrado consolida mensalmente dados de emissões de 42 unidades operacionais em planilhas manuais, gerando atrasos de até 12 dias na divulgação de indicadores ESG e retrabalho em cerca de 30% dos registros. A ausência de uma camada única de governança impede a rastreabilidade dos cálculos de emissões Escopo 1 e 2 exigidos por órgãos reguladores e investidores.

## 3. Escopo da solução

- Ingestão automatizada em Azure Data Factory dos dados de consumo de combustível e energia de 42 unidades, com validação em Python
- Modelagem dimensional no Snowflake para emissões Escopo 1 e 2 e indicadores ESG corporativos
- Pipeline em Python para cálculo de fatores de emissão e reconciliação mensal com tolerância de 0,5%
- Camada semântica e dashboards de Analytics & BI para 5 painéis executivos de ESG
- Governança de Dados com catálogo, linhagem e dicionário de dados dos indicadores ESG

Tecnologias principais: Azure, Snowflake, Python.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Diagnóstico e desenho da arquitetura (4 semanas)
- Construção da ingestão e modelagem no Snowflake (6 semanas)
- Cálculos de emissões e dashboards de Analytics & BI (4 semanas)
- Governança de Dados, homologação e go-live (2 semanas)

## 5. Entregáveis

- Pipeline de ingestão e validação de dados operacionais em produção
- Modelo de dados ESG no Snowflake documentado e homologado
- Cinco dashboards executivos publicados com atualização mensal automatizada
- Catálogo de dados e linhagem dos 28 indicadores ESG prioritários
- Relatório de reconciliação dos cálculos de emissões validado pela área de Sustentabilidade

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade inconsistente dos dados operacionais das 42 unidades
- Risco: Mudanças nos critérios regulatórios de cálculo de emissões durante o projeto
- Risco: Baixa adoção dos painéis pelas áreas de Sustentabilidade e Operações

## 8. Investimento

Investimento total: R$ 3.060.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 27%.
