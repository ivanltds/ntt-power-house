---
projeto_id: P186
cliente: FibraMax Internet
titulo: Streaming de dados em tempo real para operações de rede e atendimento
segmento: Telecom
tecnologias: ["Databricks","Kafka","AWS","Python"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P186
id: P186-SOW
tipo_documental: sow
status_documento: assinado
data: 2025-11-16
prazo_meses: 6
valor: 640000
---

# SOW — Streaming de dados em tempo real para operações de rede e atendimento

**Contratante:** FibraMax Internet · **Contratada:** NTT DATA Brasil · **Vigência:** 6 meses a partir do kickoff

## 1. Objeto

Implantar uma plataforma de dados em tempo real para ingestão, processamento e analytics de eventos de rede e atendimento, reduzindo a latência de disponibilização de dados de horas para menos de 5 minutos.

## 2. Escopo contratado

- Ingestão contínua de eventos de rede e CRM via Apache Kafka, com tópicos particionados por região e retenção de 7 dias
- Pipeline de processamento em streaming no Databricks com notebooks e jobs em Python para limpeza, enriquecimento e agregação
- Camada analítica na AWS (S3, Glue Catalog e Databricks SQL) para dashboards operacionais e de qualidade
- Modelos de detecção de anomalias em Python sobre janelas deslizantes de 15 minutos para falhas de rede
- Integração dos indicadores em tempo real ao portal de atendimento e às rotinas de squads de operação

## 3. Entregáveis e aceite

- Arquitetura de referência de streaming documentada e aprovada
- Pipelines Kafka-Databricks em produção para 12 fontes de eventos
- Painéis de Analytics & BI com 18 indicadores operacionais em tempo quase real
- Playbook de operação e monitoramento de pipelines com alertas automáticos
- Treinamento de 25 analistas e engenheiros do cliente em Databricks e Kafka

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 640.000, faturado mensalmente conforme o cronograma.
