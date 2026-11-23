---
projeto_id: P472
cliente: Banco Atlântida Digital
titulo: Migração do Data Warehouse do Banco Atlântida Digital para AWS e Databricks
segmento: Serviços Financeiros
tecnologias: ["AWS","Databricks"]
servicos: ["Migração para Nuvem","Engenharia de Dados"]
area: Cloud & Infra
dono: Isabela Freitas
confidencialidade: confidencial
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P472
id: P472-PROP
tipo_documental: proposta_comercial
status_documento: preliminar
data: 2026-11-04
prazo_meses: 6
valor: 2220000
margem: 0.31
---

# Proposta Comercial — Migração do Data Warehouse do Banco Atlântida Digital para AWS e Databricks

**Cliente:** Banco Atlântida Digital
**Segmento:** Serviços Financeiros
**Área responsável:** Cloud & Infra · **Dono da proposta:** Isabela Freitas
**Data:** 2026-11-04 · **Versão:** final

## 1. Contexto e desafio

O Banco Atlântida Digital mantém um data warehouse on-premises com 45 TB de dados históricos e cerca de 1.200 rotinas noturnas de ETL, cuja janela de carga já ultrapassa 8 horas e compromete a abertura do dia. A operação sofre com custos fixos de infraestrutura e com a dificuldade de escalar o processamento analítico para as áreas de crédito, fraudes e cobrança, que respondem por 70% das consultas.

## 2. Objetivo

Migrar o data warehouse on-premises para uma arquitetura em nuvem na AWS com processamento Databricks em até 6 meses, reduzindo a janela de carga para menos de 2 horas e liberando a infraestrutura local.

## 3. Escopo da solução

- Assessment e mapeamento dos 45 TB de dados e das 1.200 rotinas de ETL para o plano de migração
- Implantação do data lake na AWS com Amazon S3, AWS Glue e orquestração de pipelines
- Construção do lakehouse em Databricks com Delta Lake e camadas bronze, prata e ouro
- Reprocessamento e validação de cargas históricas com reconciliação de dados entre origem e destino
- Configuração de governança, catálogo de dados e controle de acessos na AWS e no Databricks

Tecnologias principais: AWS, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Assessment e planejamento (6 semanas)
- Fundação AWS e governança (6 semanas)
- Migração dos pipelines para Databricks (8 semanas)
- Validação, cutover e estabilização (6 semanas)

## 5. Entregáveis

- Relatório de assessment com inventário de fontes, volumes e plano de ondas de migração
- Ambiente AWS provisionado com data lake, catálogo e políticas de segurança
- Pipelines de ETL migrados e executados no Databricks com documentação técnica
- Relatório de reconciliação de dados com 100% das tabelas críticas validadas
- Plano de cutover e desativação gradual do data warehouse on-premises

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em nuvem AWS e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Atraso na liberação de acessos e credenciais pelas áreas de segurança do cliente
- Risco: Divergências de dados nas reconciliações que exijam reprocessamento de cargas
- Risco: Dependência de janelas noturnas limitadas para testes paralelos com o ambiente on-premises

## 8. Investimento

Investimento total: R$ 2.220.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 31%.
