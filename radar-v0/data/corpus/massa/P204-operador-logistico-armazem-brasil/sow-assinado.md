---
projeto_id: P204
cliente: Operador Logístico Armazém Brasil
titulo: Streaming de dados em tempo real para operação logística com Databricks e Kafka
segmento: Logística
tecnologias: ["Databricks","Kafka"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Zilda Correia
confidencialidade: confidencial
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P204
id: P204-SOW
tipo_documental: sow
status_documento: assinado
data: 2026-01-31
prazo_meses: 7
valor: 1390000
---

# SOW — Streaming de dados em tempo real para operação logística com Databricks e Kafka

**Contratante:** Operador Logístico Armazém Brasil · **Contratada:** NTT DATA Brasil · **Vigência:** 7 meses a partir do kickoff

## 1. Objeto

Implantar uma plataforma de dados em tempo real com ingestão via Kafka e processamento no Databricks, reduzindo a latência de visibilidade operacional de horas para menos de 5 minutos e habilitando painéis de acompanhamento contínuo da cadeia logística.

## 2. Escopo contratado

- Ingestão de eventos de WMS, TMS e rastreadores de frota em tópicos Kafka, com 14 fluxos e volume estimado de 2.500 eventos por segundo no pico
- Construção de pipelines de streaming no Databricks (Delta Live Tables) em camadas bronze, prata e ouro, com regras de deduplicação e tratamento de eventos fora de ordem
- Modelagem de indicadores operacionais em near real time: ocupação de doca, acuracidade de estoque, tempo de ciclo de separação e aderência de janelas de entrega
- Integração dos dados tratados ao Databricks SQL e ao conector de BI corporativo, com 6 dashboards operacionais e alertas automáticos por limiar
- Implementação de monitoramento de pipelines, contratos de dados e política de retenção e qualidade sobre os tópicos Kafka e tabelas Delta

## 3. Entregáveis e aceite

- Ambiente Databricks provisionado com 3 workspaces (dev, homologação e produção) e governança via Unity Catalog
- 14 pipelines de streaming Kafka–Databricks em produção, com SLA de latência inferior a 5 minutos
- 6 dashboards operacionais de acompanhamento de doca, estoque e entregas, publicados para 120 usuários
- Catálogo de dados com 85 campos críticos documentados e regras de qualidade automatizadas
- Runbook operacional, plano de sustentação e treinamento de 20 analistas e engenheiros do cliente

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 1.390.000, faturado mensalmente conforme o cronograma.
