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
id: P508-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2025-05-03
prazo_meses: 8
valor: 720000
---

# Estimativa financeira (GECO) — Escudo Auto Seguros

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Assessment e mapeamento de 240 objetos do data warehouse legado, incluindo 95 procedures e 60 cubos de relatórios; Modelagem dimensional no Snowflake com camadas raw, trusted e refined e definição de warehouses virtuais por domínio de negócio.
- Tecnologias assumidas: Snowflake, Azure.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 8 meses.

Equipe estimada: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em Snowflake, 1 analista de governança de dados e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 720.000 (sem contingência).

## Pontos em aberto

- Divergência de dados entre o legado e o Snowflake durante a reconciliação de sinistralidade
- Dependência de janelas de acesso restritas aos sistemas de origem para extração de dados
- Consumo do Snowflake acima do previsto por consultas mal otimizadas de usuários de BI
