---
projeto_id: P147
cliente: Agência Estadual de Trânsito
titulo: Migração do Data Warehouse da Agência Estadual de Trânsito para Arquitetura Multi-Cloud com Databricks
segmento: Setor Público
tecnologias: ["Databricks","GCP","AWS","Azure"]
servicos: ["Engenharia de Dados","Migração para Nuvem"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P147
id: P147-SOW
tipo_documental: sow
status_documento: assinado
data: 2026-01-15
prazo_meses: 9
valor: 1990000
---

# SOW — Migração do Data Warehouse da Agência Estadual de Trânsito para Arquitetura Multi-Cloud com Databricks

**Contratante:** Agência Estadual de Trânsito · **Contratada:** NTT DATA Brasil · **Vigência:** 9 meses a partir do kickoff

## 1. Objeto

Migrar o data warehouse on-premises para uma arquitetura em nuvem baseada em Databricks, com camadas de armazenamento e processamento distribuídas em GCP, AWS e Azure, reduzindo a janela de carga para menos de 90 minutos e ampliando a disponibilidade para 99,5%.

## 2. Escopo contratado

- Assessment e desenho da arquitetura lakehouse em Databricks com Delta Lake, definindo a distribuição de workloads entre GCP (BigQuery e Cloud Storage), AWS (S3 e Glue) e Azure (Data Lake Storage e Synapse)
- Migração de 42 pipelines ETL e 380 tabelas do data warehouse legado para o Databricks, com reescrita em PySpark e validação de paridade de dados
- Implementação de camadas bronze, silver e gold no Databricks, com catálogo unificado no Unity Catalog e governança de dados transversais às três nuvens
- Configuração de orquestração e monitoramento de cargas no Databricks Workflows, com alertas integrados e SLAs de execução por domínio de dados
- Migração de 65 dashboards e relatórios regulatórios para consumo direto das camadas gold, com testes de aceitação junto às áreas de negócio

## 3. Entregáveis e aceite

- Documento de arquitetura lakehouse multi-cloud aprovado, com mapa de 380 tabelas e 42 pipelines migrados
- Ambiente Databricks produtivo configurado em GCP, AWS e Azure, com Unity Catalog e políticas de acesso implementadas
- 42 pipelines ETL migrados e homologados, com relatório de paridade de dados superior a 99,9%
- Camadas bronze, silver e gold publicadas com 65 dashboards validados pelas áreas de negócio
- Plano de cutover e runbook operacional com janela de virada de 8 horas e rollback testado

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 1.990.000, faturado mensalmente conforme o cronograma.
