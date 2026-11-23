---
projeto_id: P577
cliente: Instituto de Previdência Municipal
titulo: Plataforma de Dados Lakehouse para Previdência Municipal
segmento: Setor Público
tecnologias: ["AWS","Azure"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Xênia Lacerda
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P577
id: P577-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-02-15
prazo_meses: 10
valor: 1340000
margem: 0.29
---

# Proposta Comercial — Plataforma de Dados Lakehouse para Previdência Municipal

**Cliente:** Instituto de Previdência Municipal
**Segmento:** Setor Público
**Área responsável:** Data & Analytics · **Dono da proposta:** Xênia Lacerda
**Data:** 2026-02-15 · **Versão:** final

## 1. Contexto e desafio

O Instituto de Previdência Municipal enfrenta dificuldades para consolidar dados de 12 mil servidores ativos e 5 mil inativos, espalhados em 8 sistemas legados, o que atrasa a geração de relatórios de arrecadação e concessão de benefícios em até 15 dias. Além disso, a falta de uma visão unificada impede análises preditivas para planejamento atuarial.

## 2. Objetivo

Implementar uma plataforma de dados lakehouse nas nuvens AWS e Azure para centralizar e governar os dados previdenciários, permitindo relatórios em tempo quase real e suporte à decisão atuarial.

## 3. Escopo da solução

- Ingestão de dados de 8 fontes legadas (batch e streaming) para camadas bronze, silver e gold no AWS S3 e Azure Data Lake Storage Gen2
- Implementação de catálogo de dados e governança com AWS Glue e Azure Purview
- Desenvolvimento de pipelines ETL/ELT com AWS Glue e Azure Data Factory para 50 tabelas críticas
- Modelagem dimensional no AWS Redshift e Azure Synapse Analytics para consumo analítico
- Configuração de segurança e compliance (LGPD) com AWS IAM e Azure Active Directory

Tecnologias principais: AWS, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 10 meses, nas seguintes fases:

- Discovery e Arquitetura (8 semanas)
- Implementação da Infraestrutura e Ingestão (16 semanas)
- Transformação e Modelagem (12 semanas)
- Governança e Entrega (4 semanas)

## 5. Entregáveis

- Documento de arquitetura lakehouse detalhado com diagramas de fluxo de dados
- Pipelines de ingestão automatizados para 8 fontes, com monitoramento e alertas
- Camada de dados curados (gold) com 20 visões analíticas para relatórios gerenciais
- Catálogo de dados populado com metadados de 50 tabelas e dicionário de dados
- Painéis de monitoramento de qualidade de dados e performance dos pipelines

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 analista de governança de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Atraso na liberação de acessos às fontes legadas pelo cliente
- Risco: Volume de dados subestimado para migração inicial
- Risco: Mudanças nos requisitos regulatórios durante a execução

## 8. Investimento

Investimento total: R$ 1.340.000, em parcelas mensais ao longo de 10 meses.

Margem praticada: 29%.
