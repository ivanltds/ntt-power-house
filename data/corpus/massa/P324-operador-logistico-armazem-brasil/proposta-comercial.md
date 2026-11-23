---
projeto_id: P324
cliente: Operador Logístico Armazém Brasil
titulo: Streaming de Dados em Tempo Real para Operações Logísticas
segmento: Logística
tecnologias: ["AWS","Python","Databricks"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Zilda Correia
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P324
id: P324-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-12-11
prazo_meses: 8
valor: 1750000
margem: 0.18
---

# Proposta Comercial — Streaming de Dados em Tempo Real para Operações Logísticas

**Cliente:** Operador Logístico Armazém Brasil
**Segmento:** Logística
**Área responsável:** Data & Analytics · **Dono da proposta:** Zilda Correia
**Data:** 2025-12-11 · **Versão:** final

## 1. Contexto e desafio

O Operador Logístico Armazém Brasil enfrenta latência de até 4 horas na consolidação de dados de suas 12 filiais, o que impacta a tomada de decisão sobre estoque e rotas. A operação movimenta 50 mil pedidos/dia e precisa de visibilidade em tempo real para reduzir custos e melhorar o nível de serviço.

## 2. Objetivo

Implementar uma plataforma de streaming de dados em tempo real na AWS com Databricks e Python, permitindo a ingestão e processamento contínuo de eventos logísticos para análises instantâneas e acionamento rápido.

## 3. Escopo da solução

- Ingestão de eventos em tempo real via AWS Kinesis e AWS Lambda para captura de dados de sensores e sistemas legados
- Processamento de streams com Databricks Structured Streaming e Python para cálculos de métricas operacionais
- Armazenamento em camada Delta Lake no AWS S3 para garantir consistência e histórico
- Orquestração de pipelines com Apache Airflow (MWAA) para integração com fontes batch
- Monitoramento e alertas com Amazon CloudWatch e Databricks SQL para dashboards em tempo real

Tecnologias principais: AWS, Python, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Discovery e Arquitetura (6 semanas)
- Implementação de Pipeline de Streaming (14 semanas)
- Integração e Testes (8 semanas)
- Go-live e Hypercare (4 semanas)

## 5. Entregáveis

- Pipeline de streaming de dados de pedidos e estoque em tempo real
- Dashboard operacional com latência inferior a 5 minutos
- Documentação técnica de arquitetura e runbooks de operação
- Testes de carga e validação de desempenho com 10 mil eventos/segundo
- Treinamento para equipe de TI do cliente em Databricks e AWS

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em streaming e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Atraso na integração com sistemas legados devido a protocolos proprietários
- Risco: Volume de dados acima do previsto impactando custos de processamento
- Risco: Resistência à mudança por parte das equipes operacionais

## 8. Investimento

Investimento total: R$ 1.750.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 18%.
