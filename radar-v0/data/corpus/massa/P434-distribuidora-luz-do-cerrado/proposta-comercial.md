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
id: P434-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-02-11
prazo_meses: 9
valor: 1340000
margem: 0.27
---

# Proposta Comercial — Streaming de dados em tempo real para operações de distribuição de energia

**Cliente:** Distribuidora Luz do Cerrado
**Segmento:** Utilities / Energia
**Área responsável:** Data & Analytics · **Dono da proposta:** Leonardo Pires
**Data:** 2026-02-11 · **Versão:** final

## 1. Contexto e desafio

A Distribuidora Luz do Cerrado, com cerca de 1,2 milhão de unidades consumidoras e 3,5 mil medidores inteligentes gerando leituras a cada 15 minutos, não conseguia consolidar os eventos de campo em menos de 6 horas, atrasando a detecção de perdas e a resposta a oscilações de rede. A área de operações dependia de cargas batch noturnas e de planilhas manuais, o que elevava o índice de perdas não técnicas a 8,7% e impedia o acompanhamento em tempo real da qualidade da energia.

## 2. Objetivo

Implantar uma plataforma de streaming de dados em nuvem que reduza a latência de ingestão e disponibilização de eventos de campo de horas para segundos, sustentando a operação e a análise em tempo quase real.

## 3. Escopo da solução

- Ingestão contínua de eventos de medidores e sensores via Azure Event Hubs e AWS Kinesis, com throughput projetado de 4.500 eventos por segundo no pico
- Camada de processamento em stream no Azure Databricks Structured Streaming e AWS Glue para cálculo de perdas, interrupções e indicadores de qualidade em janelas de 1 a 5 minutos
- Pipeline de dados em tempo real com armazenamento em camadas bronze, prata e ouro no Azure Data Lake Storage e Amazon S3, com catálogo unificado
- Integração dos fluxos em tempo real com os painéis operacionais e o data warehouse existente, disponibilizando 18 indicadores de rede atualizados a cada 2 minutos
- Monitoramento, alertas e observabilidade dos pipelines com métricas de latência, volume e falhas, incluindo política de retenção e reprocessamento

Tecnologias principais: Azure, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 9 meses, nas seguintes fases:

- Diagnóstico e arquitetura de streaming (6 semanas)
- Construção dos pipelines de ingestão e processamento (14 semanas)
- Integração com painéis e indicadores operacionais (10 semanas)
- Homologação, go-live e sustentação assistida (6 semanas)

## 5. Entregáveis

- Plataforma de streaming em produção processando 4.500 eventos por segundo no pico, com latência média de 90 segundos
- 18 indicadores operacionais e de qualidade de energia publicados em painéis atualizados a cada 2 minutos
- Catálogo de dados unificado e documentação técnica dos pipelines em Azure e AWS
- Conjunto de alertas automatizados para falhas de ingestão e desvios de latência, com runbooks de operação
- Transferência de conhecimento para a equipe interna, com 6 sessões de capacitação e documentação de sustentação

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em streaming e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Volume de eventos acima do previsto nos horários de pico
- Risco: Qualidade e padronização irregular dos dados de medidores legados
- Risco: Dependência de janelas de manutenção dos sistemas de campo do cliente

## 8. Investimento

Investimento total: R$ 1.340.000, em parcelas mensais ao longo de 9 meses.

Margem praticada: 27%.
