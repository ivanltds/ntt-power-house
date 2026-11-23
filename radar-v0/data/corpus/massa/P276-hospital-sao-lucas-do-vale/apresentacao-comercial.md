---
projeto_id: P276
cliente: Hospital São Lucas do Vale
titulo: Lakehouse de dados clínicos e operacionais em Snowflake na nuvem híbrida
segmento: Saúde
tecnologias: ["Snowflake","AWS","Azure","Python"]
servicos: ["Migração para Nuvem","Engenharia de Dados"]
area: Data & Analytics
dono: Quésia Ramos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P276
id: P276-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-01-12
prazo_meses: 11
---

# Apresentação Comercial — Hospital São Lucas do Vale

## Slide 1 — Lakehouse de dados clínicos e operacionais em Snowflake na nuvem híbrida

Hospital São Lucas do Vale · Saúde

## Slide 2 — O desafio

O Hospital São Lucas do Vale operava com dados clínicos, financeiros e assistenciais dispersos em 14 sistemas legados, incluindo um data warehouse on-premises com janelas de carga noturnas de até 9 horas. Relatórios de ocupação de leitos e faturamento de convênios chegavam com 48 horas de atraso, prejudicando a gestão de 320 leitos e o ciclo de recebimento de R$ 38 milhões/mês.

## Slide 3 — Nossa proposta

Implantar uma plataforma lakehouse em Snowflake sobre AWS e Azure, unificando dados clínicos e administrativos para análises quase em tempo real e redução do custo de armazenamento e processamento.

## Slide 4 — Arquitetura e tecnologias

Snowflake · AWS · Azure · Python

- Migração do data warehouse on-premises para Snowflake, com ingestão via AWS S3 e pipelines em Python para 14 fontes de dados
- Integração híbrida com o ERP hospitalar e sistemas de prontuário eletrônico, usando Azure Data Factory para as fontes corporativas
- Modelagem em camadas (raw, curadoria e consumo) com 180 tabelas e visões semânticas para as áreas assistencial, financeira e operacional

## Slide 5 — Como vamos trabalhar

- Diagnóstico e arquitetura (8 semanas)
- Construção dos pipelines e migração das fontes (20 semanas)
- Modelagem analítica e migração de relatórios (14 semanas)
- Go-live, estabilização e transferência de conhecimento (6 semanas)

Duração total: 11 meses.

## Slide 6 — Por que nós

Experiência em Migração para Nuvem, Engenharia de Dados, com projeto anterior entregue para a Hospital São Lucas do Vale. Equipe: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em Snowflake, 1 analista de BI e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Diretora de Tecnologia e Informação) e agendar o kickoff.
