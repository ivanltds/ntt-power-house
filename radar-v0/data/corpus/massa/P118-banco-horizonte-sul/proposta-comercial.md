---
projeto_id: P118
cliente: Banco Horizonte Sul
titulo: Migração do Data Warehouse para Nuvem com Arquitetura Multi-Cloud
segmento: Serviços Financeiros
tecnologias: ["Snowflake","Azure","AWS","GCP"]
servicos: ["Engenharia de Dados","Migração para Nuvem"]
area: Cloud & Infra
dono: Carla Menezes
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P118
id: P118-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-03-21
prazo_meses: 6
valor: 5110000
margem: 0.31
---

# Proposta Comercial — Migração do Data Warehouse para Nuvem com Arquitetura Multi-Cloud

**Cliente:** Banco Horizonte Sul
**Segmento:** Serviços Financeiros
**Área responsável:** Cloud & Infra · **Dono da proposta:** Carla Menezes
**Data:** 2026-03-21 · **Versão:** final

## 1. Contexto e desafio

O Banco Horizonte Sul opera um data warehouse on-premises com 42 TB de dados históricos e janelas de carga noturna que chegam a 7 horas, atrasando relatórios regulatórios e de risco de crédito. Cerca de 380 usuários analíticos enfrentam latência média de 12 minutos nas consultas mais pesadas, e o custo de manutenção da infraestrutura local cresceu 23% no último ano.

## 2. Objetivo

Migrar o data warehouse para uma arquitetura em nuvem baseada em Snowflake, com processamento distribuído em Azure, AWS e GCP, reduzindo a janela de carga para menos de 90 minutos e ampliando a escalabilidade analítica do banco.

## 3. Escopo da solução

- Assessment e desenho da arquitetura-alvo em Snowflake, com definição de camadas raw, curated e consumption e estratégia de segurança e governança de dados
- Migração de 42 TB de dados históricos e de 1.240 objetos (tabelas, views e procedures) para o Snowflake, com validação de paridade de dados
- Implementação de pipelines de ingestão e transformação orquestrados em Azure Data Factory e serviços gerenciados em AWS e GCP para fontes externas
- Otimização de performance e custos no Snowflake, incluindo warehouse sizing, clustering e políticas de retenção e Time Travel
- Migração de 210 relatórios e dashboards para as novas camadas, com testes de regressão e homologação junto às áreas de negócio

Tecnologias principais: Snowflake, Azure, AWS, GCP.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Assessment e arquitetura-alvo (5 semanas)
- Migração de dados e objetos (10 semanas)
- Pipelines e otimização de performance (6 semanas)
- Homologação e descomissionamento (5 semanas)

## 5. Entregáveis

- Documento de arquitetura-alvo e plano de migração detalhado por onda
- Ambiente Snowflake produtivo com 42 TB migrados e validados
- Catálogo com 1.240 objetos migrados e mapeamento de linhagem de dados
- Conjunto de pipelines de ingestão automatizados com monitoramento e alertas
- Relatório de homologação dos 210 relatórios migrados e plano de descomissionamento do ambiente local

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista Snowflake, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Atraso na liberação de acessos e redes entre Azure, AWS e GCP
- Risco: Divergências de dados em regras de negócio legadas durante a validação
- Risco: Indisponibilidade de especialistas do cliente para homologação dos relatórios

## 8. Investimento

Investimento total: R$ 5.110.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 31%.
