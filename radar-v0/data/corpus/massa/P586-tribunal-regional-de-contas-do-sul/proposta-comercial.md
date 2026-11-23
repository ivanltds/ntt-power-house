---
projeto_id: P586
cliente: Tribunal Regional de Contas do Sul
titulo: Modernização de aplicações com containers e multi-cloud para tribunal de contas
segmento: Setor Público
tecnologias: ["Kubernetes","AWS","GCP","Azure"]
servicos: ["Sustentação / AMS","Migração para Nuvem"]
area: Cloud & Infra
dono: Débora Castilho
confidencialidade: confidencial
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P586
id: P586-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-08-17
prazo_meses: 12
valor: 1130000
margem: 0.32
---

# Proposta Comercial — Modernização de aplicações com containers e multi-cloud para tribunal de contas

**Cliente:** Tribunal Regional de Contas do Sul
**Segmento:** Setor Público
**Área responsável:** Cloud & Infra · **Dono da proposta:** Débora Castilho
**Data:** 2026-08-17 · **Versão:** final

## 1. Contexto e desafio

O Tribunal Regional de Contas do Sul opera 45 aplicações críticas de fiscalização em infraestrutura legada, com custo anual de manutenção de R$ 18 milhões e tempo médio de indisponibilidade de 6 horas por mês. A ausência de padrões de containers e a dependência de fornecedores dificultam a evolução e a escalabilidade para atender 2.500 servidores públicos e 120 municípios fiscalizados.

## 2. Objetivo

Modernizar o parque de aplicações do Tribunal, migrando 30 sistemas prioritários para containers em nuvem (AWS, GCP e Azure) com orquestração Kubernetes, garantindo sustentação contínua e redução de 30% no custo total de propriedade em 12 meses.

## 3. Escopo da solução

- Avaliação e priorização de 30 aplicações para conteinerização, com análise de dependências e definição de arquitetura de referência em Kubernetes
- Migração e modernização de 15 aplicações para clusters Kubernetes gerenciados na AWS (EKS), GCP (GKE) e Azure (AKS), incluindo pipeline CI/CD
- Implementação de observabilidade e monitoramento com Prometheus, Grafana e ferramentas nativas de cada nuvem
- Estabelecimento de modelo de sustentação 24x7 com SLA de 99,9% e transição de conhecimento para equipe interna
- Automação de provisionamento de infraestrutura como código (Terraform) e políticas de segurança e conformidade

Tecnologias principais: Kubernetes, AWS, GCP, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 12 meses, nas seguintes fases:

- Avaliação e planejamento (12 semanas)
- Migração de aplicações prioritárias (24 semanas)
- Sustentação e otimização contínua (16 semanas)

## 5. Entregáveis

- Relatório de avaliação e roadmap de migração das 30 aplicações, com priorização e análise de custos
- Ambiente Kubernetes multi-cloud operacional com 15 aplicações migradas e pipelines CI/CD implantados
- Documentação de arquitetura de referência, runbooks operacionais e plano de disaster recovery
- Dashboard de monitoramento e relatórios mensais de desempenho e custos (FinOps)
- Programa de transferência de conhecimento e treinamento para 20 profissionais do Tribunal

## 6. Equipe proposta

1 arquiteto de soluções cloud, 2 engenheiros DevOps, 1 especialista em segurança, 1 gerente de projeto e 3 analistas de sustentação.

## 7. Premissas e riscos

- Risco: Resistência à mudança cultural e à adoção de práticas DevOps pela equipe interna
- Risco: Complexidade de integração entre as três nuvens e sistemas legados
- Risco: Janelas de manutenção restritas e impacto em serviços críticos durante a migração

## 8. Investimento

Investimento total: R$ 1.130.000, em parcelas mensais ao longo de 12 meses.

Margem praticada: 32%.
