---
projeto_id: P335
cliente: Farmácias Vida Plena
titulo: Lakehouse de Dados para Varejo Farmacêutico com Kafka, Databricks e Nuvem Híbrida
segmento: Varejo
tecnologias: ["Kafka","AWS","Azure","Databricks"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P335
id: P335-SOW
tipo_documental: sow
status_documento: assinado
data: 2026-04-18
prazo_meses: 9
valor: 770000
---

# SOW — Lakehouse de Dados para Varejo Farmacêutico com Kafka, Databricks e Nuvem Híbrida

**Contratante:** Farmácias Vida Plena · **Contratada:** NTT DATA Brasil · **Vigência:** 9 meses a partir do kickoff

## 1. Objeto

Construir uma plataforma de dados lakehouse na AWS e Azure com ingestão em tempo real via Kafka e processamento no Databricks, unificando dados de vendas, estoque e fidelidade para análises em até 1 hora.

## 2. Escopo contratado

- Ingestão em streaming de eventos de PDV e e-commerce com Apache Kafka, com throughput estimado de 15 mil eventos por segundo em picos promocionais
- Implementação de lakehouse no Databricks sobre armazenamento na AWS (S3) e Azure Data Lake Storage, com camadas bronze, silver e gold e governança via Unity Catalog
- Pipeline de CDC do ERP e do sistema de fidelidade para carga incremental de 120 tabelas, com orquestração e monitoramento de qualidade de dados
- Modelagem dimensional de vendas, estoque por loja e clientes, com 45 tabelas de negócio e SLAs de atualização horária
- Integração com ferramentas de BI corporativo e APIs de consumo analítico para as áreas de comercial, supply chain e marketing

## 3. Entregáveis e aceite

- Plataforma lakehouse em produção na AWS e Azure com Databricks, cobrindo 100% das fontes priorizadas
- Pipeline de streaming Kafka operando com latência inferior a 5 minutos para eventos de venda e estoque
- Catálogo de dados governado com 120 tabelas catalogadas, dicionário de dados e políticas de acesso por perfil
- 45 tabelas analíticas modeladas com testes automatizados de qualidade e documentação de linhagem
- Painel de observabilidade com 20 indicadores de frescor, volume e falhas de pipeline, além de runbooks operacionais

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 770.000, faturado mensalmente conforme o cronograma.
