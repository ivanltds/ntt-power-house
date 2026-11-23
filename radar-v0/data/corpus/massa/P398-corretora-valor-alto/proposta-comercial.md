---
projeto_id: P398
cliente: Corretora Valor Alto
titulo: Modernização de Aplicações com Containers em Nuvem Híbrida para Corretora
segmento: Serviços Financeiros
tecnologias: ["Azure","AWS"]
servicos: ["Migração para Nuvem","Sustentação / AMS"]
area: Cloud & Infra
dono: Carla Menezes
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P398
id: P398-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-01-06
prazo_meses: 9
valor: 1660000
margem: 0.3
---

# Proposta Comercial — Modernização de Aplicações com Containers em Nuvem Híbrida para Corretora

**Cliente:** Corretora Valor Alto
**Segmento:** Serviços Financeiros
**Área responsável:** Cloud & Infra · **Dono da proposta:** Carla Menezes
**Data:** 2025-01-06 · **Versão:** final

## 1. Contexto e desafio

A Corretora Valor Alto opera 42 aplicações críticas de backoffice e mesa de operações, das quais 27 ainda rodam em servidores on-premises com janelas de manutenção que geram até 6 horas de indisponibilidade por mês. O crescimento de 38% no volume de ordens nos últimos 12 meses expôs limitações de escalabilidade e elevou o custo de infraestrutura em 22%, pressionando a margem operacional.

## 2. Objetivo

Modernizar o portfólio de aplicações da corretora migrando as cargas prioritárias para containers em Azure e AWS em 9 meses, com sustentação contínua sob contrato AMS.

## 3. Escopo da solução

- Avaliação e priorização de 42 aplicações, com containerização das 15 cargas prioritárias em Azure Kubernetes Service e Amazon EKS
- Migração para Nuvem das aplicações de mesa de operações e backoffice, incluindo bancos de dados e integrações via APIs
- Implantação de pipeline CI/CD e observabilidade unificada para os ambientes Azure e AWS
- Definição de arquitetura híbrida com conectividade segura entre datacenter remanescente e as duas nuvens
- Transição para Sustentação / AMS com SLA 24x7 e catálogo de serviços para as cargas migradas

Tecnologias principais: Azure, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 9 meses, nas seguintes fases:

- Assessment e arquitetura-alvo (8 semanas)
- Containerização e migração das cargas prioritárias (18 semanas)
- Migração das cargas remanescentes e CI/CD (10 semanas)
- Transição para AMS e hipercare (3 semanas)

## 5. Entregáveis

- Relatório de assessment das 42 aplicações com matriz de priorização e roadmap de containerização
- 15 aplicações containerizadas e em produção em Azure e AWS
- Pipeline CI/CD implantado com cobertura de 100% das cargas migradas
- Runbook operacional e dashboard de observabilidade unificado
- Contrato de AMS ativado com SLA 24x7 e 3 meses de hipercare embutidos

## 6. Equipe proposta

1 arquiteto de soluções cloud, 1 tech lead de containers, 4 engenheiros de cloud (2 Azure e 2 AWS), 2 engenheiros DevOps e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Dependência de janelas de mercado para cutover das aplicações de mesa
- Risco: Aplicações legadas com acoplamento forte ao datacenter dificultando containerização
- Risco: Dupla operação Azure/AWS elevando complexidade de governança e custos

## 8. Investimento

Investimento total: R$ 1.660.000, em parcelas mensais ao longo de 9 meses.

Margem praticada: 30%.
