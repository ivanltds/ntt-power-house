---
projeto_id: P135
cliente: Banco Aurora
titulo: Detecção de Fraude em Tempo Real com Databricks e Azure
segmento: Serviços Financeiros
tecnologias: ["Databricks","Azure"]
servicos: ["Data Science / ML"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: confidencial
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P135
id: P135-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-06-17
prazo_meses: 7
valor: 860000
margem: 0.27
---

# Proposta Comercial — Detecção de Fraude em Tempo Real com Databricks e Azure

**Cliente:** Banco Aurora
**Segmento:** Serviços Financeiros
**Área responsável:** AI & Automation · **Dono da proposta:** Bruno Tavares
**Data:** 2026-06-17 · **Versão:** final

## 1. Contexto e desafio

O Banco Aurora, do setor de Serviços Financeiros, enfrenta um volume crescente de transações suspeitas, com cerca de 2,4 milhões de transações diárias e uma taxa de falsos positivos de 38% no motor de regras atual. O processo de análise manual leva em média 26 horas para conclusão, impactando a experiência do cliente e gerando perdas estimadas em R$ 18 milhões anuais.

## 2. Objetivo

Implantar um modelo de detecção de fraude baseado em machine learning na plataforma Databricks sobre Azure, reduzindo falsos positivos e o tempo de resposta a transações suspeitas.

## 3. Escopo da solução

- Ingestão e tratamento de dados transacionais no Azure Data Lake Storage com pipelines no Databricks
- Desenvolvimento de modelos de ML para scoring de fraude em tempo quase real utilizando MLflow no Databricks
- Implementação de feature store e monitoramento de drift de modelos na plataforma Databricks
- Integração do scoring com os sistemas de autorização do banco via APIs no Azure API Management
- Dashboards de acompanhamento de métricas de fraude e alertas no Azure Monitor

Tecnologias principais: Databricks, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Descoberta e preparação de dados (6 semanas)
- Desenvolvimento e treinamento de modelos (10 semanas)
- Integração e testes em ambiente controlado (8 semanas)
- Go-live e estabilização (4 semanas)

## 5. Entregáveis

- Pipeline de dados transacionais consolidado no Databricks com latência inferior a 5 minutos
- Modelo de detecção de fraude treinado e validado com AUC superior a 0,92
- API de scoring integrada ao ambiente de autorização do banco
- Painel de monitoramento de modelos e métricas de fraude no Azure
- Documentação técnica e plano de retreinamento contínuo dos modelos

## 6. Equipe proposta

1 arquiteto de dados, 2 cientistas de dados, 1 engenheiro de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e completude dos dados históricos de transações
- Risco: Latência na integração com sistemas legados de autorização
- Risco: Mudança no comportamento de fraude durante o projeto

## 8. Investimento

Investimento total: R$ 860.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 27%.
