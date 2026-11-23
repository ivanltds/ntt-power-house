---
projeto_id: P479
cliente: Corretora Valor Alto
titulo: Plataforma Lakehouse Multicloud para Análise de Dados Financeiros
segmento: Serviços Financeiros
tecnologias: ["Azure","AWS","Databricks","Python"]
servicos: ["Migração para Nuvem"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P479
id: P479-SOW
tipo_documental: sow
status_documento: assinado
data: 2025-07-01
prazo_meses: 9
valor: 620000
---

# SOW — Plataforma Lakehouse Multicloud para Análise de Dados Financeiros

**Contratante:** Corretora Valor Alto · **Contratada:** NTT DATA Brasil · **Vigência:** 9 meses a partir do kickoff

## 1. Objeto

Implementar uma plataforma lakehouse nas nuvens Azure e AWS para centralizar e governar dados financeiros, reduzindo o tempo de análise de 48 para 4 horas e suportando 300 usuários analíticos.

## 2. Escopo contratado

- Migração de 120 pipelines de dados legados para Databricks em Azure e AWS, com orquestração via Python.
- Construção de camada de armazenamento Delta Lake no Databricks para 2,5 TB diários, com versionamento e time travel.
- Implementação de catálogo de dados e governança unificado no Databricks Unity Catalog, cobrindo 500 tabelas.
- Desenvolvimento de 15 dashboards analíticos em Power BI conectados ao lakehouse para áreas de risco e compliance.
- Automação de ingestão de dados de 8 fontes externas (B3, bancos e sistemas internos) com Python e Databricks Workflows.

## 3. Entregáveis e aceite

- Plataforma lakehouse operacional em Azure e AWS, com 120 pipelines migrados e documentados.
- Catálogo de dados com 500 tabelas catalogadas e políticas de acesso implementadas.
- 15 dashboards de risco e compliance entregues e validados pelos usuários-chave.
- Documentação técnica completa (arquitetura, runbooks e manuais de operação).
- Treinamento para 40 colaboradores da Corretora em Databricks e Python.

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 620.000, faturado mensalmente conforme o cronograma.
