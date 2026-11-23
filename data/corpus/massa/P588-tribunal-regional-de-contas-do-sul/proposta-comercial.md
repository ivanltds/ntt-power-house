---
projeto_id: P588
cliente: Tribunal Regional de Contas do Sul
titulo: Modernização de aplicações legadas em containers com GCP e Azure
segmento: Setor Público
tecnologias: ["GCP","Azure"]
servicos: ["Sustentação / AMS","Migração para Nuvem"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P588
id: P588-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2024-09-13
prazo_meses: 10
valor: 1730000
margem: 0.21
---

# Proposta Comercial — Modernização de aplicações legadas em containers com GCP e Azure

**Cliente:** Tribunal Regional de Contas do Sul
**Segmento:** Setor Público
**Área responsável:** Cloud & Infra · **Dono da proposta:** Igor Peixoto
**Data:** 2024-09-13 · **Versão:** final

## 1. Contexto e desafio

O Tribunal Regional de Contas do Sul opera 38 aplicações críticas de fiscalização e prestação de contas em servidores físicos com fim de vida útil em 2025, gerando 14 horas semanais de indisponibilidade não planejada e custo de manutenção 32% acima do orçado. A ausência de padronização de ambientes impede a adoção de práticas de DevOps e limita a escalabilidade nos picos de auditoria.

## 2. Objetivo

Modernizar as aplicações prioritárias migrando-as para containers em GCP e Azure, reduzindo indisponibilidade e custos operacionais, com sustentação contínua sob modelo AMS.

## 3. Escopo da solução

- Avaliação e priorização de 38 aplicações legadas para conteinerização, com definição de ondas de migração
- Implantação de clusters Kubernetes gerenciados no GCP (GKE) e no Azure (AKS), com padrões de segurança e observabilidade
- Migração de 22 aplicações prioritárias para containers, incluindo refatoração de dependências e pipelines CI/CD
- Configuração de backup, monitoramento e recuperação de desastres entre as duas nuvens
- Transição para o modelo de Sustentação / AMS com SLAs de disponibilidade e catálogo de serviços

Tecnologias principais: GCP, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 10 meses, nas seguintes fases:

- Assessment e planejamento (6 semanas)
- Fundação de plataforma em GCP e Azure (8 semanas)
- Migração das aplicações em ondas (24 semanas)
- Transição para AMS e estabilização (6 semanas)

## 5. Entregáveis

- Relatório de assessment das 38 aplicações com matriz de priorização e roadmap de migração
- Ambientes GKE e AKS provisionados com pipelines CI/CD padronizados
- 22 aplicações migradas e validadas em containers, com testes de carga e segurança
- Runbooks operacionais e plano de recuperação de desastres multi-nuvem
- Relatório mensal de sustentação com indicadores de SLA e custos de nuvem

## 6. Equipe proposta

1 arquiteto de soluções cloud, 2 engenheiros DevOps, 3 engenheiros de migração, 1 especialista em segurança e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Dependências legadas não documentadas atrasam a conteinerização
- Risco: Restrições de conformidade e LGPD na movimentação de dados entre nuvens
- Risco: Baixa disponibilidade das equipes do Tribunal para validações e homologações

## 8. Investimento

Investimento total: R$ 1.730.000, em parcelas mensais ao longo de 10 meses.

Margem praticada: 21%.
