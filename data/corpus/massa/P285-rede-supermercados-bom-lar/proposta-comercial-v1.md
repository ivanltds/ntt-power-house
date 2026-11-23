---
projeto_id: P285
cliente: Rede Supermercados Bom Lar
titulo: Implantação de Plataforma Lakehouse Databricks no Azure para Varejo Alimentar
segmento: Varejo
tecnologias: ["Databricks","Azure"]
servicos: ["Engenharia de Dados","Governança de Dados"]
area: Data & Analytics
dono: Eduarda Prado
confidencialidade: interna
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P285
id: P285-PROPV1
tipo_documental: proposta_comercial
status_documento: rascunho
data: 2026-10-13
prazo_meses: 8
valor: 550000
margem: 0.24
---

# Proposta Comercial — Implantação de Plataforma Lakehouse Databricks no Azure para Varejo Alimentar (versão 1, rascunho)

**Cliente:** Rede Supermercados Bom Lar
**Segmento:** Varejo
**Área responsável:** Data & Analytics · **Dono da proposta:** Eduarda Prado
**Data:** 2026-10-13 · **Versão:** 1 (rascunho)

## 1. Contexto e desafio

A Rede Supermercados Bom Lar opera 84 lojas e processa cerca de 3,2 milhões de transações de PDV por semana, mas os dados de vendas, estoque e fidelidade ficam dispersos em sistemas legados e planilhas, com relatórios gerenciais que levam até 5 dias para serem consolidados. Isso limita a visibilidade de ruptura de estoque e a análise de margem por categoria, hoje feita apenas mensalmente.

## 2. Objetivo

Construir uma plataforma de dados lakehouse em Databricks sobre Azure que unifique dados de vendas, estoque e fidelidade, reduzindo o tempo de consolidação de relatórios de 5 dias para menos de 4 horas e habilitando análises de margem por categoria em base diária.

## 3. Escopo da solução

- Ingestão batch e incremental de dados de PDV, ERP de estoque e programa de fidelidade no Azure Data Lake Storage Gen2
- Implementação de camadas bronze, silver e gold em Databricks com Delta Lake para 84 lojas e histórico de 24 meses
- Construção de 12 pipelines de Engenharia de Dados orquestrados no Databricks Workflows com monitoramento de qualidade de dados
- Definição de catálogo, linhagem e políticas de acesso no Unity Catalog como base de Governança de Dados
- Modelagem de 6 data marts de negócio (vendas por loja, margem por categoria, ruptura de estoque, comportamento de fidelidade) consumíveis via Power BI

Tecnologias principais: Databricks, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Discovery e arquitetura (5 semanas)
- Fundação lakehouse e ingestão (9 semanas)
- Engenharia de dados e data marts (8 semanas)
- Governança, testes e go-live (4 semanas)

## 5. Entregáveis

- Documento de arquitetura de referência lakehouse em Azure e Databricks aprovado
- Camadas bronze, silver e gold implementadas e validadas com 24 meses de histórico
- 12 pipelines de Engenharia de Dados em produção com testes de qualidade automatizados
- Catálogo de dados e políticas de Governança de Dados configurados no Unity Catalog
- 6 data marts publicados e dashboards de validação entregues às áreas de negócio

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em governança de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e padronização dos dados históricos dos sistemas legados de PDV e estoque
- Risco: Dependência de janelas de acesso aos sistemas de origem durante o horário comercial das lojas
- Risco: Baixa adoção inicial dos data marts pelas áreas de negócio

## 8. Investimento

Investimento total: R$ 550.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 24%.
