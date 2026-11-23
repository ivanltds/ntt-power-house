---
projeto_id: P346
cliente: Distribuidora Luz do Cerrado
titulo: Pipeline de dados em tempo real com streaming para analytics operacional
segmento: Utilities / Energia
tecnologias: ["AWS","Databricks"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: confidencial
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P346
id: P346-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-03-01
prazo_meses: 7
valor: 1470000
margem: 0.23
---

# Proposta Comercial — Pipeline de dados em tempo real com streaming para analytics operacional

**Cliente:** Distribuidora Luz do Cerrado
**Segmento:** Utilities / Energia
**Área responsável:** Data & Analytics · **Dono da proposta:** Nelson Barbosa
**Data:** 2026-03-01 · **Versão:** final

## 1. Contexto e desafio

A Distribuidora Luz do Cerrado, atuando no setor de utilities/energia, enfrentava dificuldades para consolidar dados operacionais de medição e consumo que chegavam em volumes elevados e com latência indesejada, impactando a análise de faturamento e a detecção de anomalias. A base de dados histórica e os processos batch existentes não suportavam a necessidade de visibilidade em tempo quase real sobre cerca de 1,2 milhão de pontos de medição.

## 3. Escopo da solução

- Ingestão de eventos de medição em streaming na AWS utilizando serviços gerenciados de mensageria e processamento
- Construção de pipelines de Engenharia de Dados no Databricks com processamento incremental e Delta Lake
- Camada de Analytics & BI com tabelas otimizadas para consultas analíticas e dashboards operacionais
- Orquestração, monitoramento e alertas de falha nos pipelines de streaming
- Governança de dados com controle de qualidade, lineage e catálogo sobre os ativos no Databricks

Tecnologias principais: AWS, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Discovery e arquitetura (6 semanas)
- Construção dos pipelines de streaming (12 semanas)
- Analytics & BI e governança (8 semanas)
- Estabilização e go-live (2 semanas)

## 5. Entregáveis

- Arquitetura de referência de streaming documentada e validada na AWS
- Pipelines de ingestão e transformação em produção no Databricks
- Dashboards de Analytics & BI com indicadores operacionais em tempo quase real
- Painel de monitoramento e alertas dos jobs de streaming
- Documentação técnica, runbooks e transferência de conhecimento para o time do cliente

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em Analytics & BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Volume e picos de eventos acima do previsto comprometendo a latência
- Risco: Qualidade e padronização dos dados de origem
- Risco: Dependência de integrações com sistemas legados do cliente

## 8. Investimento

Investimento total: R$ 1.470.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 23%.
