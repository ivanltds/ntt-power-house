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
id: P500-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2025-08-28
prazo_meses: 8
---

# Apresentação Comercial — Distribuidora Luz do Cerrado

## Slide 1 — Streaming de dados em tempo real para operações e analytics no setor elétrico

Distribuidora Luz do Cerrado · Utilities / Energia

## Slide 2 — O desafio

A Distribuidora Luz do Cerrado opera 2,3 milhões de unidades consumidoras e recebe cerca de 18 milhões de eventos diários de medidores e sensores, hoje processados em lotes com latência de até 6 horas. Isso limita a detecção de perdas não técnicas e a resposta a oscilações de rede, que representam cerca de 7% da energia distribuída.

## Slide 3 — Nossa proposta

Implantar uma plataforma de dados em tempo real na AWS com Kafka e Databricks para reduzir a latência de eventos críticos para menos de 2 minutos e habilitar analytics operacional contínuo.

## Slide 4 — Arquitetura e tecnologias

Kafka · Databricks · AWS

- Ingestão de eventos de medidores e sensores via Apache Kafka na AWS, com capacidade para 25 mil mensagens por segundo e retenção de 72 horas
- Pipeline de streaming estruturado com Databricks para limpeza, deduplicação e enriquecimento de 18 milhões de eventos diários
- Camada analítica Delta Lake no Databricks com tabelas de perdas, qualidade de energia e disponibilidade de rede atualizadas a cada 2 minutos

## Slide 5 — Como vamos trabalhar

- Diagnóstico e arquitetura (6 semanas)
- Construção dos pipelines de streaming (14 semanas)
- Camada analítica e painéis de BI (10 semanas)
- Estabilização e transferência de conhecimento (2 semanas)

Duração total: 8 meses.

## Slide 6 — Por que nós

Experiência em Engenharia de Dados, Analytics & BI, com projeto anterior entregue para a Distribuidora Luz do Cerrado. Equipe: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em analytics e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Gerente de Tecnologia da Informação) e agendar o kickoff.
