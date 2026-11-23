---
projeto_id: P571
cliente: Banco Cidadela
titulo: Lakehouse Snowflake no Azure com Governança de Dados para Consolidação Analítica
segmento: Serviços Financeiros
tecnologias: ["Snowflake","Azure"]
servicos: ["Governança de Dados"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: confidencial
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P571
id: P571-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-10-29
prazo_meses: 6
---

# Apresentação Comercial — Banco Cidadela

## Slide 1 — Lakehouse Snowflake no Azure com Governança de Dados para Consolidação Analítica

Banco Cidadela · Serviços Financeiros

## Slide 2 — O desafio

O Banco Cidadela mantém hoje 14 bases analíticas dispersas em dois data centers e três provedores de nuvem, o que gera 38% de retrabalho na reconciliação de indicadores e atraso médio de 5 dias úteis na entrega de relatórios regulatórios. A ausência de um catálogo único e de políticas formais de linhagem impede que as áreas de Crédito e Risco auditem a origem dos números com agilidade.

## Slide 3 — Nossa proposta

Implantar uma plataforma lakehouse em Azure com camada analítica em Snowflake e governança de dados corporativa, unificando as fontes de Crédito, Risco e Varejo e reduzindo o ciclo de entrega de relatórios regulatórios de 5 para 1 dia útil em 6 meses.

## Slide 4 — Arquitetura e tecnologias

Snowflake · Azure

- Migração das 14 bases analíticas para arquitetura lakehouse no Azure Data Lake Storage Gen2 com ingestão incremental via Azure Data Factory
- Modelagem dimensional e implementação de camadas Bronze, Silver e Gold no Snowflake, com 220 objetos mapeados e políticas de clustering por domínio
- Implantação de catálogo de dados, linhagem e dicionário corporativo com integração ao Snowflake e às fontes Azure

## Slide 5 — Como vamos trabalhar

- Diagnóstico e arquitetura de referência (5 semanas)
- Construção da ingestão e camadas Bronze/Silver no Azure (9 semanas)
- Modelagem Gold no Snowflake e governança de dados (8 semanas)
- Homologação, capacitação e go-live assistido (4 semanas)

Duração total: 6 meses.

## Slide 6 — Por que nós

Experiência em Governança de Dados, com projeto anterior entregue para a Banco Cidadela. Equipe: 1 arquiteto de dados, 1 especialista em governança de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Diretora de Dados e Analytics) e agendar o kickoff.
