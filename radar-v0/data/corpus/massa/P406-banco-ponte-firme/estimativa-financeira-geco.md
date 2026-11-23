---
projeto_id: P406
cliente: Banco Ponte Firme
titulo: Implatação de plataforma lakehouse Databricks no Azure para dados financeiros
segmento: Serviços Financeiros
tecnologias: ["Databricks","Azure"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: confidencial
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P406
id: P406-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-10-15
prazo_meses: 6
valor: 920000
---

# Estimativa financeira (GECO) — Banco Ponte Firme

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Provisionamento da infraestrutura no Azure (Data Lake Storage Gen2, Azure Data Factory e workspace Databricks) com rede privada e políticas de governança; Construção de pipelines de ingestão incremental no Databricks para 14 fontes transacionais e cadastrais, com orquestração e controle de qualidade.
- Tecnologias assumidas: Databricks, Azure.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 6 meses.

Equipe estimada: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em governança e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 920.000 (sem contingência).

## Pontos em aberto

- Atraso na liberação de acessos às fontes legadas pelo time de segurança do banco
- Volume e qualidade irregulares em 3 das 14 fontes mapeadas
- Dependência de janelas noturnas curtas para cargas de dados críticas
