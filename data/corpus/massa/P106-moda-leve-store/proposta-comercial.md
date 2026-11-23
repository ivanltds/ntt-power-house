---
projeto_id: P106
cliente: Moda Leve Store
titulo: Lakehouse Databricks para unificar dados de varejo omnichannel
segmento: Varejo
tecnologias: ["Python","Databricks"]
servicos: ["Migração para Nuvem","Governança de Dados","Engenharia de Dados"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P106
id: P106-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-03-29
prazo_meses: 9
valor: 2110000
margem: 0.2
---

# Proposta Comercial — Lakehouse Databricks para unificar dados de varejo omnichannel

**Cliente:** Moda Leve Store
**Segmento:** Varejo
**Área responsável:** Data & Analytics · **Dono da proposta:** Nelson Barbosa
**Data:** 2026-03-29 · **Versão:** final

## 1. Contexto e desafio

A Moda Leve Store operava com dados de vendas, estoque e e-commerce dispersos em 3 sistemas distintos e mais de 40 planilhas manuais, o que gerava fechamentos mensais com 6 dias de atraso e divergências de até 12% nos relatórios de estoque entre lojas físicas e canal online. A ausência de uma camada única de dados impedia análises confiáveis de ruptura e giro por SKU em uma base de mais de 350 mil clientes.

## 3. Escopo da solução

- Ingestão incremental de dados de ERP, PDV e e-commerce em camadas bronze/silver/gold no Databricks com pipelines em Python
- Migração para Nuvem dos 3 sistemas de origem, com 14 pipelines de CDC e cargas batch noturnas
- Governança de Dados com Unity Catalog: catálogo, linhagem, classificação de PII de 350 mil clientes e políticas de acesso por perfil
- Modelagem dimensional de vendas, estoque e clientes em Delta Lake, com 28 tabelas gold documentadas
- Orquestração e monitoramento dos jobs em Python com alertas de SLA e testes de qualidade em 42 regras de negócio

Tecnologias principais: Python, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 9 meses, nas seguintes fases:

- Discovery e arquitetura (6 semanas)
- Migração para Nuvem e ingestão (12 semanas)
- Governança e modelagem gold (12 semanas)
- Estabilização, treinamento e go-live (6 semanas)

## 5. Entregáveis

- Plataforma lakehouse Databricks em produção com 14 pipelines de ingestão ativos
- Catálogo de dados no Unity Catalog com linhagem e 28 tabelas gold documentadas
- Painéis de estoque e giro por SKU atualizados a cada 4 horas
- Relatório executivo de vendas omnichannel com fechamento em D+1
- Documentação técnica, runbooks operacionais e treinamento de 18 usuários-chave

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em governança de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade dos dados legados do PDV com cadastros duplicados
- Risco: Janelas de acesso restritas aos sistemas de origem durante a temporada de vendas
- Risco: Baixa adoção dos painéis pelas áreas de negócio após o go-live

## 8. Investimento

Investimento total: R$ 2.110.000, em parcelas mensais ao longo de 9 meses.

Margem praticada: 20%.
