---
projeto_id: P508
cliente: Escudo Auto Seguros
titulo: Migração do Data Warehouse para Snowflake no Azure com Engenharia de Dados
segmento: Seguros
tecnologias: ["Snowflake","Azure"]
servicos: ["Migração para Nuvem","Engenharia de Dados"]
area: Cloud & Infra
dono: Débora Castilho
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P508
id: P508-LICOES
tipo_documental: ata_validada
status_documento: validada
data: 2026-01-18
---

# Ata de Lições Aprendidas — Escudo Auto Seguros

## Resultado

A janela de carga noturna caiu de 7 horas para 1h20, e o custo mensal de infraestrutura de dados foi reduzido em 28%, cerca de R$ 41 mil por mês. O time de subscrição passou a acessar análises de sinistralidade com atualização de 15 minutos, contra o ciclo diário anterior.

## Lições aprendidas

A reescrita de 22 rotinas ETL com regras de negócio não documentadas atrasou a terceira onda em 3 semanas e exigiu esforço extra de engenharia reversa junto às áreas de negócio. Foi decisivo validar a paridade de dados por domínio de negócio a cada onda, com aceite formal da área financeira antes de avançar.
