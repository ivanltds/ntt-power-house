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
id: P496-SOW
tipo_documental: sow
status_documento: assinado
data: 2024-06-07
prazo_meses: 6
valor: 2120000
---

# SOW — Migração do Data Warehouse para Snowflake na Nuvem AWS

**Contratante:** Agência Estadual de Trânsito · **Contratada:** NTT DATA Brasil · **Vigência:** 6 meses a partir do kickoff

## 1. Objeto

Migrar o data warehouse legado para Snowflake na AWS em 6 meses, preservando a integridade histórica e reduzindo o tempo de carga e o custo operacional do ambiente analítico.

## 2. Escopo contratado

- Avaliação e inventário do data warehouse legado, com mapeamento de 180 tabelas e 320 processos ETL
- Modelagem dimensional no Snowflake com separação de camadas raw, staging e consumo
- Migração dos dados históricos para o Snowflake via AWS S3 e Snowpipe, com validação de reconciliação
- Reimplementação dos pipelines de carga em Snowflake e orquestração integrada ao ambiente AWS
- Configuração de governança de acesso, mascaramento de dados pessoais e monitoramento de custos na AWS

## 3. Entregáveis e aceite

- Documento de arquitetura-alvo e plano de migração com cronograma por onda
- Data warehouse no Snowflake com 14 TB migrados e reconciliados
- 320 pipelines de carga reimplementados e validados em produção
- Painéis de monitoramento de performance e custo na AWS
- Relatório de encerramento com plano de sustentação e transferência de conhecimento

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 2.120.000, faturado mensalmente conforme o cronograma.
