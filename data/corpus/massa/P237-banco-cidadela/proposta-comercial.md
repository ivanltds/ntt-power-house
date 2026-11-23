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
id: P237-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-12-19
prazo_meses: 4
valor: 630000
margem: 0.22
---

# Proposta Comercial — Migração multicloud de data warehouse para AWS, GCP e Azure

**Cliente:** Banco Cidadela
**Segmento:** Serviços Financeiros
**Área responsável:** Cloud & Infra · **Dono da proposta:** Débora Castilho
**Data:** 2025-12-19 · **Versão:** final

## 1. Contexto e desafio

O Banco Cidadela mantinha um data warehouse on-premises com 180 TB de dados históricos e janelas de carga noturna que chegavam a 7 horas, atrasando relatórios regulatórios do Banco Central. A operação sustentava 420 usuários analíticos e 65 pipelines críticos, com custo de infraestrutura física de R$ 3,2 milhões ao ano e risco crescente de obsolescência de hardware.

## 2. Objetivo

Migrar o data warehouse do Banco Cidadela para uma arquitetura multicloud em AWS, GCP e Azure em 4 meses, reduzindo a janela de carga para menos de 90 minutos e eliminando a dependência de infraestrutura física.

## 3. Escopo da solução

- Avaliação e desenho da arquitetura-alvo multicloud, definindo cargas analíticas em AWS (Redshift), GCP (BigQuery) e Azure (Synapse)
- Migração de 180 TB de dados históricos com validação de integridade e reconciliação de 100% dos registros
- Reengenharia de 65 pipelines de ETL com orquestração em nuvem e processamento incremental
- Implementação de camada de governança de dados e catálogo unificado entre as três nuvens
- Execução de testes de performance, paralelismo e cutover com janela de rollback de 48 horas

Tecnologias principais: AWS, GCP, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Diagnóstico e arquitetura-alvo (4 semanas)
- Migração e reengenharia de pipelines (8 semanas)
- Governança e testes integrados (3 semanas)
- Cutover e estabilização (1 semanas)

## 5. Entregáveis

- Documento de arquitetura-alvo multicloud aprovado pelo comitê de tecnologia do banco
- 180 TB migrados e reconciliados, com relatório de validação por domínio de dados
- 65 pipelines reengenhados em produção nas plataformas AWS, GCP e Azure
- Catálogo de dados e políticas de governança implantados
- Relatório de testes de performance e plano de cutover concluído

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em cloud e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Indisponibilidade de janela de cutover por conflito com fechamento contábil
- Risco: Divergências de reconciliação em bases legadas com dados duplicados
- Risco: Dependência de acessos e credenciais das três nuvens concedidos pelo cliente

## 8. Investimento

Investimento total: R$ 630.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 22%.
