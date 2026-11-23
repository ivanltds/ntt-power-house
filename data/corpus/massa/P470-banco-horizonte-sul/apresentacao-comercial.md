---
projeto_id: P470
cliente: Banco Horizonte Sul
titulo: Plataforma Lakehouse com Kafka e Databricks para Análise de Crédito e Risco
segmento: Serviços Financeiros
tecnologias: ["Kafka","Databricks"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P470
id: P470-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-06-05
prazo_meses: 9
---

# Apresentação Comercial — Banco Horizonte Sul

## Slide 1 — Plataforma Lakehouse com Kafka e Databricks para Análise de Crédito e Risco

Banco Horizonte Sul · Serviços Financeiros

## Slide 2 — O desafio

O Banco Horizonte Sul processa cerca de 12 milhões de transações mensais em sistemas legados, com relatórios gerenciais que levam até 48 horas para consolidar dados de crédito e risco. A ausência de uma camada analítica unificada gera divergências em 8% dos indicadores reportados à diretoria e à área regulatória.

## Slide 3 — Nossa proposta

Construir uma plataforma de dados lakehouse em Databricks alimentada por streaming Kafka, reduzindo o tempo de disponibilização de dados analíticos de 48 para até 2 horas e unificando os indicadores de crédito e risco em uma única fonte confiável.

## Slide 4 — Arquitetura e tecnologias

Kafka · Databricks

- Ingestão em streaming de eventos transacionais e de crédito via Apache Kafka, com tópicos segmentados por domínio de negócio
- Implementação do lakehouse no Databricks com arquitetura medallion (bronze, silver e gold) sobre armazenamento em nuvem
- Modelagem de dados analíticos de crédito, risco e inadimplência na camada gold, com tabelas Delta otimizadas

## Slide 5 — Como vamos trabalhar

- Discovery e arquitetura (6 semanas)
- Ingestão Kafka e camada bronze/silver (14 semanas)
- Modelagem gold e qualidade de dados (12 semanas)
- Go-live, estabilização e transferência de conhecimento (8 semanas)

Duração total: 9 meses.

## Slide 6 — Por que nós

Experiência em Engenharia de Dados, com projeto anterior entregue para a Banco Horizonte Sul. Equipe: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em Kafka e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Diretora de Dados e Analytics) e agendar o kickoff.
