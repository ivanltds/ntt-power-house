---
projeto_id: P500
cliente: Distribuidora Luz do Cerrado
titulo: Streaming de dados em tempo real para operações e analytics no setor elétrico
segmento: Utilities / Energia
tecnologias: ["Kafka","Databricks","AWS"]
servicos: ["Engenharia de Dados","Analytics & BI"]
area: Data & Analytics
dono: Leonardo Pires
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P500
id: P500-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-08-25
prazo_meses: 8
valor: 1360000
margem: 0.27
---

# Proposta Comercial — Streaming de dados em tempo real para operações e analytics no setor elétrico

**Cliente:** Distribuidora Luz do Cerrado
**Segmento:** Utilities / Energia
**Área responsável:** Data & Analytics · **Dono da proposta:** Leonardo Pires
**Data:** 2025-08-25 · **Versão:** final

## 1. Contexto e desafio

A Distribuidora Luz do Cerrado opera 2,3 milhões de unidades consumidoras e recebe cerca de 18 milhões de eventos diários de medidores e sensores, hoje processados em lotes com latência de até 6 horas. Isso limita a detecção de perdas não técnicas e a resposta a oscilações de rede, que representam cerca de 7% da energia distribuída.

## 2. Objetivo

Implantar uma plataforma de dados em tempo real na AWS com Kafka e Databricks para reduzir a latência de eventos críticos para menos de 2 minutos e habilitar analytics operacional contínuo.

## 3. Escopo da solução

- Ingestão de eventos de medidores e sensores via Apache Kafka na AWS, com capacidade para 25 mil mensagens por segundo e retenção de 72 horas
- Pipeline de streaming estruturado com Databricks para limpeza, deduplicação e enriquecimento de 18 milhões de eventos diários
- Camada analítica Delta Lake no Databricks com tabelas de perdas, qualidade de energia e disponibilidade de rede atualizadas a cada 2 minutos
- Painéis de Analytics & BI conectados ao Databricks para 120 usuários das áreas de operação e comercial
- Monitoramento, alertas e governança de dados com catálogo e políticas de acesso integradas à AWS

Tecnologias principais: Kafka, Databricks, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Diagnóstico e arquitetura (6 semanas)
- Construção dos pipelines de streaming (14 semanas)
- Camada analítica e painéis de BI (10 semanas)
- Estabilização e transferência de conhecimento (2 semanas)

## 5. Entregáveis

- Arquitetura de referência de streaming aprovada, cobrindo Kafka, Databricks e AWS
- Pipeline de ingestão e processamento em tempo real em produção para 3 fontes prioritárias
- Modelo analítico Delta Lake com 12 indicadores operacionais atualizados continuamente
- Conjunto de 6 painéis de BI publicados para as áreas de operação e comercial
- Plano de operação, runbooks e transferência de conhecimento para a equipe interna

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em analytics e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e padronização dos eventos das 3 fontes prioritárias
- Risco: Capacidade da equipe do cliente para validar regras de negócio em janelas curtas
- Risco: Dependências de rede e segurança na integração entre Kafka, Databricks e AWS

## 8. Investimento

Investimento total: R$ 1.360.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 27%.
