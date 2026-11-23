---
projeto_id: P237
cliente: Banco Cidadela
titulo: Migração multicloud de data warehouse para AWS, GCP e Azure
segmento: Serviços Financeiros
tecnologias: ["AWS","GCP","Azure"]
servicos: ["Migração para Nuvem","Engenharia de Dados"]
area: Cloud & Infra
dono: Débora Castilho
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P237
id: P237-SOW
tipo_documental: sow
status_documento: assinado
data: 2026-01-13
prazo_meses: 4
valor: 630000
---

# SOW — Migração multicloud de data warehouse para AWS, GCP e Azure

**Contratante:** Banco Cidadela · **Contratada:** NTT DATA Brasil · **Vigência:** 4 meses a partir do kickoff

## 1. Objeto

Migrar o data warehouse do Banco Cidadela para uma arquitetura multicloud em AWS, GCP e Azure em 4 meses, reduzindo a janela de carga para menos de 90 minutos e eliminando a dependência de infraestrutura física.

## 2. Escopo contratado

- Avaliação e desenho da arquitetura-alvo multicloud, definindo cargas analíticas em AWS (Redshift), GCP (BigQuery) e Azure (Synapse)
- Migração de 180 TB de dados históricos com validação de integridade e reconciliação de 100% dos registros
- Reengenharia de 65 pipelines de ETL com orquestração em nuvem e processamento incremental
- Implementação de camada de governança de dados e catálogo unificado entre as três nuvens
- Execução de testes de performance, paralelismo e cutover com janela de rollback de 48 horas

## 3. Entregáveis e aceite

- Documento de arquitetura-alvo multicloud aprovado pelo comitê de tecnologia do banco
- 180 TB migrados e reconciliados, com relatório de validação por domínio de dados
- 65 pipelines reengenhados em produção nas plataformas AWS, GCP e Azure
- Catálogo de dados e políticas de governança implantados
- Relatório de testes de performance e plano de cutover concluído

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 630.000, faturado mensalmente conforme o cronograma.
