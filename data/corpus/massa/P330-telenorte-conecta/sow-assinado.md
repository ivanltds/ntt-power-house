---
projeto_id: P330
cliente: TeleNorte Conecta
titulo: Streaming de dados em tempo real para operações de rede e atendimento
segmento: Telecom
tecnologias: ["Azure","Databricks"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: confidencial
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P330
id: P330-SOW
tipo_documental: sow
status_documento: assinado
data: 2024-08-16
prazo_meses: 7
valor: 1920000
---

# SOW — Streaming de dados em tempo real para operações de rede e atendimento

**Contratante:** TeleNorte Conecta · **Contratada:** NTT DATA Brasil · **Vigência:** 7 meses a partir do kickoff

## 1. Objeto

Implementar uma plataforma de streaming de dados em tempo real na Azure com Databricks para ingestão, processamento e análise contínua de eventos de rede e atendimento, permitindo reação imediata a incidentes e ofertas personalizadas.

## 2. Escopo contratado

- Ingestão de eventos de rede e atendimento via Azure Event Hubs e Kafka, com processamento em streaming no Databricks (Structured Streaming).
- Construção de pipelines de dados em tempo real com Delta Lake na Azure, garantindo confiabilidade e escalabilidade para 1,8 TB/dia.
- Integração com Azure Data Lake Storage Gen2 para armazenamento de dados brutos e curados, com governança via Unity Catalog.
- Implementação de dashboards em tempo real no Power BI conectados ao Databricks SQL para monitoramento de KPIs operacionais.
- Automação de alertas de anomalias de rede e atendimento usando Azure Functions e Logic Apps, integrados aos pipelines de streaming.

## 3. Entregáveis e aceite

- Plataforma de streaming operacional com latência inferior a 5 segundos para eventos críticos de rede.
- Pipeline de dados em tempo real com 99,9% de disponibilidade e processamento de 1,8 TB/dia.
- Dashboards em tempo real para 5 áreas de negócio (Operações, Atendimento, Marketing, Engenharia e Diretoria).
- Documentação técnica e manuais de operação para sustentação da plataforma.
- Treinamento para 25 usuários-chave e 10 desenvolvedores internos sobre a arquitetura e uso das ferramentas.

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 1.920.000, faturado mensalmente conforme o cronograma.
