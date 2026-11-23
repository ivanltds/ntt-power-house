---
projeto_id: P434
cliente: Distribuidora Luz do Cerrado
titulo: Streaming de dados em tempo real para operações de distribuição de energia
segmento: Utilities / Energia
tecnologias: ["Azure","AWS"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Leonardo Pires
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P434
id: P434-SOW
tipo_documental: sow
status_documento: assinado
data: 2026-03-08
prazo_meses: 9
valor: 1340000
---

# SOW — Streaming de dados em tempo real para operações de distribuição de energia

**Contratante:** Distribuidora Luz do Cerrado · **Contratada:** NTT DATA Brasil · **Vigência:** 9 meses a partir do kickoff

## 1. Objeto

Implantar uma plataforma de streaming de dados em nuvem que reduza a latência de ingestão e disponibilização de eventos de campo de horas para segundos, sustentando a operação e a análise em tempo quase real.

## 2. Escopo contratado

- Ingestão contínua de eventos de medidores e sensores via Azure Event Hubs e AWS Kinesis, com throughput projetado de 4.500 eventos por segundo no pico
- Camada de processamento em stream no Azure Databricks Structured Streaming e AWS Glue para cálculo de perdas, interrupções e indicadores de qualidade em janelas de 1 a 5 minutos
- Pipeline de dados em tempo real com armazenamento em camadas bronze, prata e ouro no Azure Data Lake Storage e Amazon S3, com catálogo unificado
- Integração dos fluxos em tempo real com os painéis operacionais e o data warehouse existente, disponibilizando 18 indicadores de rede atualizados a cada 2 minutos
- Monitoramento, alertas e observabilidade dos pipelines com métricas de latência, volume e falhas, incluindo política de retenção e reprocessamento

## 3. Entregáveis e aceite

- Plataforma de streaming em produção processando 4.500 eventos por segundo no pico, com latência média de 90 segundos
- 18 indicadores operacionais e de qualidade de energia publicados em painéis atualizados a cada 2 minutos
- Catálogo de dados unificado e documentação técnica dos pipelines em Azure e AWS
- Conjunto de alertas automatizados para falhas de ingestão e desvios de latência, com runbooks de operação
- Transferência de conhecimento para a equipe interna, com 6 sessões de capacitação e documentação de sustentação

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 1.340.000, faturado mensalmente conforme o cronograma.
