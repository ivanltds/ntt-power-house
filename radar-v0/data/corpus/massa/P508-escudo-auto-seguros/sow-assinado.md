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
id: P508-SOW
tipo_documental: sow
status_documento: assinado
data: 2025-06-07
prazo_meses: 8
valor: 820000
---

# SOW — Migração do Data Warehouse para Snowflake no Azure com Engenharia de Dados

**Contratante:** Escudo Auto Seguros · **Contratada:** NTT DATA Brasil · **Vigência:** 8 meses a partir do kickoff

## 1. Objeto

Migrar o data warehouse da Escudo Auto Seguros para Snowflake no Azure em 8 meses, reduzindo a latência das cargas e habilitando análises quase em tempo real para as áreas de subscrição e sinistros.

## 2. Escopo contratado

- Assessment e mapeamento de 240 objetos do data warehouse legado, incluindo 95 procedures e 60 cubos de relatórios
- Modelagem dimensional no Snowflake com camadas raw, trusted e refined e definição de warehouses virtuais por domínio de negócio
- Construção de pipelines de ingestão e transformação no Azure Data Factory e dbt para 38 fontes de dados de apólices, sinistros e telemetria
- Migração e reescrita de 180 rotinas ETL e validação de paridade de dados com reconciliação financeira de sinistralidade
- Implementação de governança de dados, controle de acesso por perfil e monitoramento de custos de consumo no Snowflake

## 3. Entregáveis e aceite

- Documento de assessment com inventário dos 240 objetos legados e plano de migração por onda
- Ambiente Snowflake no Azure provisionado com camadas raw, trusted e refined e políticas de acesso
- 38 pipelines de ingestão e transformação em produção no Azure Data Factory e dbt
- 180 rotinas ETL migradas com relatório de paridade e reconciliação de sinistralidade aprovado pela área financeira
- Painéis de monitoramento de custos e desempenho do Snowflake e runbook operacional de sustentação

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 820.000, faturado mensalmente conforme o cronograma.
