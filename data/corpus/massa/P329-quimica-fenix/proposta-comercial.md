---
projeto_id: P329
cliente: Química Fênix
titulo: Painéis executivos e BI integrados para a operação industrial
segmento: Manufatura
tecnologias: ["Snowflake","Power BI","SAP","Azure"]
servicos: ["Engenharia de Dados","Change Management"]
area: Data & Analytics
dono: Zilda Correia
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P329
id: P329-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-09-07
prazo_meses: 2
valor: 550000
margem: 0.26
---

# Proposta Comercial — Painéis executivos e BI integrados para a operação industrial

**Cliente:** Química Fênix
**Segmento:** Manufatura
**Área responsável:** Data & Analytics · **Dono da proposta:** Zilda Correia
**Data:** 2026-09-07 · **Versão:** final

## 1. Contexto e desafio

A Química Fênix consolidava indicadores de 4 plantas industriais em planilhas manuais, com fechamento gerencial levando até 12 dias e divergências entre as visões de produção, vendas e supply chain. A ausência de uma fonte única de verdade para 320 usuários gerenciais limitava a tomada de decisão sobre 18 mil SKUs ativos.

## 2. Objetivo

Implantar uma plataforma de dados e painéis executivos em Snowflake e Power BI que reduza o ciclo de fechamento gerencial para até 3 dias e entregue visão única de produção, vendas e cadeia de suprimentos.

## 3. Escopo da solução

- Extração e ingestão de dados do SAP (ECC e módulos de produção e vendas) para o Snowflake no Azure
- Modelagem dimensional em Snowflake para indicadores de produção, vendas, estoque e supply chain
- Construção de painéis executivos e operacionais em Power BI com governança e controle de acesso por perfil
- Orquestração e agendamento de cargas no Azure Data Factory com monitoramento de qualidade de dados
- Plano de Change Management com treinamento de 320 usuários e rede de 24 multiplicadores nas plantas

Tecnologias principais: Snowflake, Power BI, SAP, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 2 meses, nas seguintes fases:

- Discovery e arquitetura de dados (2 semanas)
- Engenharia de dados e ingestão SAP-Snowflake (3 semanas)
- Construção dos painéis Power BI e homologação (2 semanas)
- Go-live, treinamento e sustentação assistida (1 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e modelo dimensional aprovado
- Pipeline de ingestão SAP para Snowflake em produção com 99% de sucesso nas cargas diárias
- 8 painéis executivos e 12 painéis operacionais publicados no Power BI
- Catálogo de indicadores com 85 métricas homologadas pelas áreas de negócio
- Programa de treinamento executado com 320 usuários capacitados e material de apoio

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em Power BI, 1 analista de change management e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e padronização dos dados mestres do SAP entre as 4 plantas
- Risco: Baixa adesão dos gestores ao novo modelo de indicadores
- Risco: Janela curta de 2 meses para homologação e treinamento

## 8. Investimento

Investimento total: R$ 550.000, em parcelas mensais ao longo de 2 meses.

Margem praticada: 26%.
