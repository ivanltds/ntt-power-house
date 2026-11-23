---
projeto_id: P463
cliente: Financeira Rumo Certo
titulo: Painel de Indicadores ESG e Emissões para Financeira Rumo Certo
segmento: Serviços Financeiros
tecnologias: ["Snowflake","Python","Azure"]
servicos: ["Analytics & BI"]
area: Data & Analytics
dono: Leonardo Pires
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P463
id: P463-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-09-22
prazo_meses: 6
valor: 640000
margem: 0.2
---

# Proposta Comercial — Painel de Indicadores ESG e Emissões para Financeira Rumo Certo

**Cliente:** Financeira Rumo Certo
**Segmento:** Serviços Financeiros
**Área responsável:** Data & Analytics · **Dono da proposta:** Leonardo Pires
**Data:** 2025-09-22 · **Versão:** final

## 1. Contexto e desafio

A Financeira Rumo Certo precisa reportar indicadores ESG e emissões de gases de efeito estufa para seus 2,5 milhões de clientes e para o mercado financeiro, mas os dados estão dispersos em planilhas e sistemas legados, sem integração e com baixa confiabilidade. Atualmente, o processo de consolidação leva 15 dias e não atende aos prazos regulatórios.

## 2. Objetivo

Implementar uma solução de analytics na plataforma Snowflake, com pipelines em Python e Azure, para consolidar e visualizar indicadores ESG e emissões em até 6 meses, garantindo relatórios mensais confiáveis e tempestivos.

## 3. Escopo da solução

- Ingestão e integração de dados de emissões e indicadores ESG provenientes de sistemas internos e planilhas para o Snowflake
- Desenvolvimento de pipelines de ETL/ELT em Python para limpeza, transformação e carga dos dados no Snowflake
- Configuração de orquestração e agendamento no Azure Data Factory para atualização diária dos dados
- Construção de dashboards e relatórios analíticos no Power BI conectado ao Snowflake para visualização de KPIs ESG
- Implementação de governança de dados e catálogo no Azure Purview para rastreabilidade e qualidade dos indicadores

Tecnologias principais: Snowflake, Python, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Fase 1 - Discovery e Arquitetura: 4 semanas
- Fase 2 - Desenvolvimento de Pipelines e Integração: 10 semanas
- Fase 3 - Modelagem e Dashboards: 8 semanas
- Fase 4 - Testes e Go-live: 2 semanas

## 5. Entregáveis

- Documento de arquitetura de dados e fluxos de integração
- Pipelines de dados em Python operacionais e agendados no Azure
- Modelo dimensional no Snowflake com tabelas de fatos e dimensões ESG
- Dashboards de indicadores ESG e emissões no Power BI validados pelo cliente
- Relatório de qualidade de dados e plano de monitoramento contínuo

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa qualidade dos dados de emissões provenientes de fontes não estruturadas
- Risco: Atraso na disponibilização de acessos e credenciais pela equipe de TI do cliente
- Risco: Mudanças nos requisitos regulatórios durante o projeto

## 8. Investimento

Investimento total: R$ 640.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 20%.
