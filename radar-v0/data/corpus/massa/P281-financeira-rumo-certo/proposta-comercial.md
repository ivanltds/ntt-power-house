---
projeto_id: P281
cliente: Financeira Rumo Certo
titulo: Modernização de aplicações em containers com Azure e GCP
segmento: Serviços Financeiros
tecnologias: ["Azure","GCP"]
servicos: ["Sustentação / AMS"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: interna
status_proposta: Em negociação
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P281
id: P281-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-10-05
prazo_meses: 8
valor: 1110000
margem: 0.24
---

# Proposta Comercial — Modernização de aplicações em containers com Azure e GCP

**Cliente:** Financeira Rumo Certo
**Segmento:** Serviços Financeiros
**Área responsável:** Cloud & Infra · **Dono da proposta:** Igor Peixoto
**Data:** 2026-10-05 · **Versão:** final

## 1. Contexto e desafio

A Financeira Rumo Certo opera 14 aplicações críticas de crédito e cobrança em servidores legados, com janelas de manutenção de até 6 horas e custo de infraestrutura 22% acima do orçado. O ambiente híbrido atual gera indisponibilidade média de 4,5 horas por mês e dificulta a escalabilidade em picos de demanda, que crescem 18% ao ano.

## 2. Objetivo

Modernizar as aplicações críticas para containers em Azure e GCP, reduzindo indisponibilidade e custo de infraestrutura, com sustentação contínua sob modelo AMS ao longo de 8 meses.

## 3. Escopo da solução

- Avaliação e priorização de 14 aplicações legadas para conteinerização em Azure AKS e GCP GKE
- Migração de 8 aplicações prioritárias para clusters Kubernetes gerenciados em Azure e GCP
- Implementação de pipeline CI/CD e observabilidade integrada para os ambientes conteinerizados
- Definição de padrões de segurança, backup e recuperação para cargas em containers nas duas nuvens
- Operação de sustentação AMS com SLA de 99,9% e atendimento 24x7 para o ambiente modernizado

Tecnologias principais: Azure, GCP.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Assessment e desenho da arquitetura alvo (6 semanas)
- Migração da primeira onda de 4 aplicações (10 semanas)
- Migração da segunda onda de 4 aplicações (10 semanas)
- Estabilização e transição para sustentação AMS (6 semanas)

## 5. Entregáveis

- Relatório de assessment das 14 aplicações com mapa de priorização e ondas de migração
- 8 aplicações migradas e em produção em containers no Azure e no GCP
- Pipeline CI/CD padronizado e dashboards de observabilidade implantados
- Runbooks operacionais e plano de recuperação de desastres validado
- Relatórios mensais de sustentação AMS com indicadores de SLA e incidentes

## 6. Equipe proposta

1 arquiteto de cloud, 3 engenheiros de plataforma, 2 engenheiros DevOps e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Dependências entre aplicações legadas atrasarem as ondas de migração
- Risco: Janelas de manutenção restritas impactarem os testes de cutover
- Risco: Adoção incompleta dos novos padrões operacionais pelas equipes do cliente

## 8. Investimento

Investimento total: R$ 1.110.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 24%.
