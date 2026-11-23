---
projeto_id: P522
cliente: Rede de Clínicas Bem Viver
titulo: Plataforma de Dados Lakehouse para Análise Clínica e Operacional
segmento: Saúde
tecnologias: ["Python","Snowflake"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Eduarda Prado
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P522
id: P522-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-04-26
prazo_meses: 7
---

# Apresentação Comercial — Rede de Clínicas Bem Viver

## Slide 1 — Plataforma de Dados Lakehouse para Análise Clínica e Operacional

Rede de Clínicas Bem Viver · Saúde

## Slide 2 — O desafio

A Rede de Clínicas Bem Viver possui 42 unidades e atende 380 mil pacientes por ano, mas os dados de prontuários, faturamento e estoque ficam dispersos em 7 sistemas distintos, gerando relatórios manuais que consomem 120 horas mensais da equipe de TI e atrasam a tomada de decisão em até 5 dias.

## Slide 3 — Nossa proposta

Implementar uma plataforma de dados lakehouse em Snowflake e Python para centralizar e integrar os dados das clínicas, permitindo análises em tempo quase real e reduzindo o tempo de geração de relatórios estratégicos de 5 dias para menos de 4 horas.

## Slide 4 — Arquitetura e tecnologias

Python · Snowflake

- Ingestão de dados de 7 fontes (prontuário eletrônico, ERP financeiro, sistema de estoque, CRM, entre outros) usando Python e conectores nativos Snowflake.
- Modelagem dimensional no Snowflake com camadas bronze, prata e ouro para dados clínicos, financeiros e operacionais.
- Implementação de pipelines de dados orquestrados com Python (Airflow) para carga incremental diária e streaming de eventos críticos.

## Slide 5 — Como vamos trabalhar

- Fase 1 - Descoberta e Arquitetura: 4 semanas
- Fase 2 - Implementação de Pipelines e Modelagem: 10 semanas
- Fase 3 - Data Marts e Visualização: 8 semanas
- Fase 4 - Governança, Testes e Go-live: 6 semanas

Duração total: 7 meses.

## Slide 6 — Por que nós

Experiência em Engenharia de Dados, com projeto anterior entregue para a Rede de Clínicas Bem Viver. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em Snowflake e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Mariana Costa (Diretora de Tecnologia da Informação) e agendar o kickoff.
