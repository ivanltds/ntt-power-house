---
projeto_id: P249
cliente: Calçados Passo Firme
titulo: Implantação de CRM e Jornada do Cliente Omnicanal
segmento: Varejo
tecnologias: ["Salesforce","Azure","Kafka"]
servicos: ["Engenharia de Dados"]
area: Digital & CRM
dono: Gabriela Rocha
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P249
id: P249-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-11-30
prazo_meses: 10
valor: 2920000
margem: 0.22
---

# Proposta Comercial — Implantação de CRM e Jornada do Cliente Omnicanal

**Cliente:** Calçados Passo Firme
**Segmento:** Varejo
**Área responsável:** Digital & CRM · **Dono da proposta:** Gabriela Rocha
**Data:** 2025-11-30 · **Versão:** final

## 1. Contexto e desafio

A Calçados Passo Firme, com 320 lojas físicas e faturamento anual de R$ 1,8 bilhão, não tinha visão unificada do cliente: dados de vendas, pós-venda e e-commerce viviam em silos distintos, e o CRM legado limitava campanhas a lotes semanais com taxa de resposta de apenas 2%. A jornada de compra era interrompida entre canais, com 41% dos carrinhos abandonados no e-commerce e sem histórico acessível ao vendedor de loja.

## 3. Escopo da solução

- Implementação do Salesforce Sales Cloud e Marketing Cloud com modelo de dados unificado de cliente
- Integração em tempo real via Apache Kafka entre ERP, e-commerce, PDV das 320 lojas e o CRM
- Pipeline de Engenharia de Dados no Azure (Data Lake e Data Factory) para ingestão e tratamento de 12 milhões de eventos mensais
- Motor de segmentação e orquestração de jornadas com APIs Salesforce expostas no Azure API Management
- Migração e deduplicação da base legada de 4,2 milhões de clientes com regras de qualidade de dados

Tecnologias principais: Salesforce, Azure, Kafka.

## 4. Abordagem e cronograma

O projeto será executado em 10 meses, nas seguintes fases:

- Diagnóstico e arquitetura de dados (10 semanas)
- Integrações Kafka e pipeline no Azure (14 semanas)
- Configuração de CRM e jornadas no Salesforce (12 semanas)
- Rollout, treinamento e estabilização (8 semanas)

## 5. Entregáveis

- Modelo de dados unificado de cliente e documentação de arquitetura no Azure
- Integrações Kafka em produção para 6 sistemas de origem
- 70 jornadas de cliente configuradas no Marketing Cloud
- Painel de KPIs de CRM e jornada em Power BI para 120 usuários
- Plano de governança de dados e treinamento de 90 usuários-chave

## 6. Equipe proposta

1 arquiteto de soluções, 1 engenheiro de dados sênior, 2 engenheiros de dados, 1 especialista Salesforce, 1 consultor de CRM e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade dos dados legados com 18% de cadastros duplicados
- Risco: Latência das integrações Kafka com o PDV das lojas
- Risco: Baixa adesão dos vendedores de loja ao novo CRM

## 8. Investimento

Investimento total: R$ 2.920.000, em parcelas mensais ao longo de 10 meses.

Margem praticada: 22%.
