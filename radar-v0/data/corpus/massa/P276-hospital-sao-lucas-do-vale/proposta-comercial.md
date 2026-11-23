---
projeto_id: P276
cliente: Hospital São Lucas do Vale
titulo: Lakehouse de dados clínicos e operacionais em Snowflake na nuvem híbrida
segmento: Saúde
tecnologias: ["Snowflake","AWS","Azure","Python"]
servicos: ["Migração para Nuvem","Engenharia de Dados"]
area: Data & Analytics
dono: Quésia Ramos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P276
id: P276-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-01-09
prazo_meses: 11
valor: 1260000
margem: 0.23
---

# Proposta Comercial — Lakehouse de dados clínicos e operacionais em Snowflake na nuvem híbrida

**Cliente:** Hospital São Lucas do Vale
**Segmento:** Saúde
**Área responsável:** Data & Analytics · **Dono da proposta:** Quésia Ramos
**Data:** 2026-01-09 · **Versão:** final

## 1. Contexto e desafio

O Hospital São Lucas do Vale operava com dados clínicos, financeiros e assistenciais dispersos em 14 sistemas legados, incluindo um data warehouse on-premises com janelas de carga noturnas de até 9 horas. Relatórios de ocupação de leitos e faturamento de convênios chegavam com 48 horas de atraso, prejudicando a gestão de 320 leitos e o ciclo de recebimento de R$ 38 milhões/mês.

## 2. Objetivo

Implantar uma plataforma lakehouse em Snowflake sobre AWS e Azure, unificando dados clínicos e administrativos para análises quase em tempo real e redução do custo de armazenamento e processamento.

## 3. Escopo da solução

- Migração do data warehouse on-premises para Snowflake, com ingestão via AWS S3 e pipelines em Python para 14 fontes de dados
- Integração híbrida com o ERP hospitalar e sistemas de prontuário eletrônico, usando Azure Data Factory para as fontes corporativas
- Modelagem em camadas (raw, curadoria e consumo) com 180 tabelas e visões semânticas para as áreas assistencial, financeira e operacional
- Orquestração e monitoramento de cargas com alertas automatizados e SLA de atualização de 30 minutos para indicadores críticos
- Governança de dados com catálogo, linhagem e políticas de acesso a dados sensíveis de pacientes (LGPD)

Tecnologias principais: Snowflake, AWS, Azure, Python.

## 4. Abordagem e cronograma

O projeto será executado em 11 meses, nas seguintes fases:

- Diagnóstico e arquitetura (8 semanas)
- Construção dos pipelines e migração das fontes (20 semanas)
- Modelagem analítica e migração de relatórios (14 semanas)
- Go-live, estabilização e transferência de conhecimento (6 semanas)

## 5. Entregáveis

- Plataforma lakehouse em produção no Snowflake com 14 fontes integradas e 99,5% de disponibilidade
- 120 dashboards e relatórios migrados, incluindo ocupação de leitos, produção assistencial e faturamento de convênios
- Pipeline de dados em Python com 240 execuções diárias automatizadas e logs centralizados
- Documentação técnica, runbooks operacionais e catálogo de dados com 180 tabelas catalogadas
- Treinamento de 45 usuários-chave e 8 analistas internos em Snowflake e boas práticas de engenharia de dados

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em Snowflake, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Indisponibilidade das equipes de TI do hospital para validação das fontes legadas
- Risco: Qualidade e inconsistência dos dados históricos de prontuário
- Risco: Restrições de acesso e conformidade LGPD para dados sensíveis de pacientes

## 8. Investimento

Investimento total: R$ 1.260.000, em parcelas mensais ao longo de 11 meses.

Margem praticada: 23%.
