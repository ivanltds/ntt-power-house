---
projeto_id: P516
cliente: Geradora Ventos do Nordeste
titulo: Streaming de dados em tempo real para operação e manutenção de parques eólicos
segmento: Utilities / Energia
tecnologias: ["Kafka","Azure"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: confidencial
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P516
id: P516-SOW
tipo_documental: sow
status_documento: assinado
data: 2026-08-10
prazo_meses: 8
valor: 6000000
---

# SOW — Streaming de dados em tempo real para operação e manutenção de parques eólicos

**Contratante:** Geradora Ventos do Nordeste · **Contratada:** NTT DATA Brasil · **Vigência:** 8 meses a partir do kickoff

## 1. Objeto

Implantar uma plataforma de streaming de dados na Azure com Kafka para ingestão e processamento em tempo real, permitindo analytics operacional e manutenção preditiva com latência inferior a 5 segundos.

## 2. Escopo contratado

- Configuração de cluster Kafka na Azure (HDInsight ou Confluent Cloud) para ingestão de telemetria de 480 aerogeradores
- Desenvolvimento de pipelines de streaming com Azure Stream Analytics e Kafka Streams para cálculo de KPIs em tempo real
- Integração com Azure Data Lake Storage Gen2 para armazenamento de dados brutos e processados
- Implementação de dashboards em Power BI conectados ao Azure Synapse Analytics para monitoramento operacional
- Modelos de machine learning para detecção de anomalias e manutenção preditiva usando Azure Machine Learning

## 3. Entregáveis e aceite

- Plataforma de streaming Kafka implantada e operacional na Azure
- Pipelines de ingestão e processamento em tempo real validados com latência < 5 segundos
- Dashboards de monitoramento operacional e de manutenção preditiva entregues
- Modelo de detecção de anomalias treinado e integrado ao fluxo de alertas
- Documentação técnica e transferência de conhecimento para a equipe do cliente

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 6.000.000, faturado mensalmente conforme o cronograma.
