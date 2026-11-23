---
projeto_id: P496
cliente: Agência Estadual de Trânsito
titulo: Migração do Data Warehouse para Snowflake na Nuvem AWS
segmento: Setor Público
tecnologias: ["Snowflake","AWS"]
servicos: ["Engenharia de Dados","Migração para Nuvem"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P496
id: P496-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2024-05-03
prazo_meses: 5
valor: 1870000
---

# Estimativa financeira (GECO) — Agência Estadual de Trânsito

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Avaliação e inventário do data warehouse legado, com mapeamento de 180 tabelas e 320 processos ETL; Modelagem dimensional no Snowflake com separação de camadas raw, staging e consumo.
- Tecnologias assumidas: Snowflake, AWS.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 5 meses.

Equipe estimada: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em nuvem AWS e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 1.870.000 (sem contingência).

## Pontos em aberto

- Qualidade e consistência dos dados históricos no legado
- Janelas de indisponibilidade limitadas para cutover
- Dependência de acessos e liberações de rede do cliente
