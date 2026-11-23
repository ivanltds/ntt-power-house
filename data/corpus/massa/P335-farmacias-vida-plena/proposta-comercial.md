---
projeto_id: P335
cliente: Farmácias Vida Plena
titulo: Lakehouse de Dados para Varejo Farmacêutico com Kafka, Databricks e Nuvem Híbrida
segmento: Varejo
tecnologias: ["Kafka","AWS","Azure","Databricks"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P335
id: P335-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-03-24
prazo_meses: 9
valor: 770000
margem: 0.29
---

# Proposta Comercial — Lakehouse de Dados para Varejo Farmacêutico com Kafka, Databricks e Nuvem Híbrida

**Cliente:** Farmácias Vida Plena
**Segmento:** Varejo
**Área responsável:** Data & Analytics · **Dono da proposta:** Ana Beatriz Lopes
**Data:** 2026-03-24 · **Versão:** final

## 1. Contexto e desafio

As Farmácias Vida Plena operam 420 lojas e um e-commerce que gera cerca de 35 milhões de transações de venda por mês, mas os dados ficam dispersos entre ERP, PDV e sistemas de fidelidade, com relatórios consolidados levando até 5 dias úteis. A ausência de uma camada analítica única impede a gestão de estoque por loja e a personalização de promoções para 2,8 milhões de clientes do programa de fidelidade.

## 2. Objetivo

Construir uma plataforma de dados lakehouse na AWS e Azure com ingestão em tempo real via Kafka e processamento no Databricks, unificando dados de vendas, estoque e fidelidade para análises em até 1 hora.

## 3. Escopo da solução

- Ingestão em streaming de eventos de PDV e e-commerce com Apache Kafka, com throughput estimado de 15 mil eventos por segundo em picos promocionais
- Implementação de lakehouse no Databricks sobre armazenamento na AWS (S3) e Azure Data Lake Storage, com camadas bronze, silver e gold e governança via Unity Catalog
- Pipeline de CDC do ERP e do sistema de fidelidade para carga incremental de 120 tabelas, com orquestração e monitoramento de qualidade de dados
- Modelagem dimensional de vendas, estoque por loja e clientes, com 45 tabelas de negócio e SLAs de atualização horária
- Integração com ferramentas de BI corporativo e APIs de consumo analítico para as áreas de comercial, supply chain e marketing

Tecnologias principais: Kafka, AWS, Azure, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 9 meses, nas seguintes fases:

- Discovery e arquitetura (6 semanas)
- Fundação do lakehouse e ingestão em streaming (12 semanas)
- Modelagem analítica e governança (12 semanas)
- Go-live, estabilização e transferência de conhecimento (9 semanas)

## 5. Entregáveis

- Plataforma lakehouse em produção na AWS e Azure com Databricks, cobrindo 100% das fontes priorizadas
- Pipeline de streaming Kafka operando com latência inferior a 5 minutos para eventos de venda e estoque
- Catálogo de dados governado com 120 tabelas catalogadas, dicionário de dados e políticas de acesso por perfil
- 45 tabelas analíticas modeladas com testes automatizados de qualidade e documentação de linhagem
- Painel de observabilidade com 20 indicadores de frescor, volume e falhas de pipeline, além de runbooks operacionais

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em streaming Kafka, 1 analista de governança de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade inconsistente dos dados de estoque oriundos de 420 lojas com cadastros divergentes
- Risco: Latência ou indisponibilidade do CDC do ERP legado durante janelas de fechamento fiscal
- Risco: Baixa adoção das áreas de negócio por dependência de planilhas e relatórios manuais

## 8. Investimento

Investimento total: R$ 770.000, em parcelas mensais ao longo de 9 meses.

Margem praticada: 29%.
