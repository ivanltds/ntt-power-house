---
projeto_id: P106
cliente: Moda Leve Store
titulo: Lakehouse Databricks para unificar dados de varejo omnichannel
segmento: Varejo
tecnologias: ["Python","Databricks"]
servicos: ["Migração para Nuvem","Governança de Dados","Engenharia de Dados"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P106
id: P106-SOW
tipo_documental: sow
status_documento: assinado
data: 2026-04-23
prazo_meses: 9
valor: 2110000
---

# SOW — Lakehouse Databricks para unificar dados de varejo omnichannel

**Contratante:** Moda Leve Store · **Contratada:** NTT DATA Brasil · **Vigência:** 9 meses a partir do kickoff

## 1. Objeto

Construir uma plataforma lakehouse no Databricks que unifique dados transacionais e digitais em uma única fonte de verdade, com camadas de governança e engenharia de dados em Python, reduzindo o tempo de fechamento e habilitando análises de estoque e comportamento de compra em near real-time.

## 2. Escopo contratado

- Ingestão incremental de dados de ERP, PDV e e-commerce em camadas bronze/silver/gold no Databricks com pipelines em Python
- Migração para Nuvem dos 3 sistemas de origem, com 14 pipelines de CDC e cargas batch noturnas
- Governança de Dados com Unity Catalog: catálogo, linhagem, classificação de PII de 350 mil clientes e políticas de acesso por perfil
- Modelagem dimensional de vendas, estoque e clientes em Delta Lake, com 28 tabelas gold documentadas
- Orquestração e monitoramento dos jobs em Python com alertas de SLA e testes de qualidade em 42 regras de negócio

## 3. Entregáveis e aceite

- Plataforma lakehouse Databricks em produção com 14 pipelines de ingestão ativos
- Catálogo de dados no Unity Catalog com linhagem e 28 tabelas gold documentadas
- Painéis de estoque e giro por SKU atualizados a cada 4 horas
- Relatório executivo de vendas omnichannel com fechamento em D+1
- Documentação técnica, runbooks operacionais e treinamento de 18 usuários-chave

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 2.110.000, faturado mensalmente conforme o cronograma.
