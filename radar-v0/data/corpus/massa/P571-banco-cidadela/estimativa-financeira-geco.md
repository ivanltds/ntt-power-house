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
id: P571-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-10-16
prazo_meses: 5
valor: 820000
---

# Estimativa financeira (GECO) — Banco Cidadela

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Migração das 14 bases analíticas para arquitetura lakehouse no Azure Data Lake Storage Gen2 com ingestão incremental via Azure Data Factory; Modelagem dimensional e implementação de camadas Bronze, Silver e Gold no Snowflake, com 220 objetos mapeados e políticas de clustering por domínio.
- Tecnologias assumidas: Snowflake, Azure.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 5 meses.

Equipe estimada: 1 arquiteto de dados, 1 especialista em governança de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 820.000 (sem contingência).

## Pontos em aberto

- Qualidade das fontes legadas abaixo do esperado, exigindo esforço extra de saneamento
- Restrições de segurança e compliance do setor financeiro atrasando aprovações de acesso
- Baixa adesão das áreas de negócio ao autoatendimento no Snowflake após o go-live
