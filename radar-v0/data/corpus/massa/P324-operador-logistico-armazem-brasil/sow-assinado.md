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
id: P324-SOW
tipo_documental: sow
status_documento: assinado
data: 2026-01-05
prazo_meses: 8
valor: 1750000
---

# SOW — Streaming de Dados em Tempo Real para Operações Logísticas

**Contratante:** Operador Logístico Armazém Brasil · **Contratada:** NTT DATA Brasil · **Vigência:** 8 meses a partir do kickoff

## 1. Objeto

Implementar uma plataforma de streaming de dados em tempo real na AWS com Databricks e Python, permitindo a ingestão e processamento contínuo de eventos logísticos para análises instantâneas e acionamento rápido.

## 2. Escopo contratado

- Ingestão de eventos em tempo real via AWS Kinesis e AWS Lambda para captura de dados de sensores e sistemas legados
- Processamento de streams com Databricks Structured Streaming e Python para cálculos de métricas operacionais
- Armazenamento em camada Delta Lake no AWS S3 para garantir consistência e histórico
- Orquestração de pipelines com Apache Airflow (MWAA) para integração com fontes batch
- Monitoramento e alertas com Amazon CloudWatch e Databricks SQL para dashboards em tempo real

## 3. Entregáveis e aceite

- Pipeline de streaming de dados de pedidos e estoque em tempo real
- Dashboard operacional com latência inferior a 5 minutos
- Documentação técnica de arquitetura e runbooks de operação
- Testes de carga e validação de desempenho com 10 mil eventos/segundo
- Treinamento para equipe de TI do cliente em Databricks e AWS

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 1.750.000, faturado mensalmente conforme o cronograma.
