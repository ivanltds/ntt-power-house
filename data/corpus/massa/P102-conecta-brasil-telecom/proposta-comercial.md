---
projeto_id: P102
cliente: Conecta Brasil Telecom
titulo: Modernização de aplicações com containers em ambiente multicloud
segmento: Telecom
tecnologias: ["Azure","AWS","GCP"]
servicos: ["Sustentação / AMS","Migração para Nuvem","Change Management"]
area: Cloud & Infra
dono: Isabela Freitas
confidencialidade: confidencial
status_proposta: Em negociação
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P102
id: P102-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-10-02
prazo_meses: 8
valor: 1480000
margem: 0.28
---

# Proposta Comercial — Modernização de aplicações com containers em ambiente multicloud

**Cliente:** Conecta Brasil Telecom
**Segmento:** Telecom
**Área responsável:** Cloud & Infra · **Dono da proposta:** Isabela Freitas
**Data:** 2026-10-02 · **Versão:** final

## 1. Contexto e desafio

A Conecta Brasil Telecom opera 38 aplicações legadas de atendimento e billing em servidores físicos com janelas de manutenção de até 6 horas e taxa de indisponibilidade mensal de 1,8%, impactando cerca de 2,4 milhões de clientes. O parque atual limita a elasticidade para picos de tráfego e eleva o custo de sustentação em 22% ao ano.

## 3. Escopo da solução

- Avaliação e refatoração de 38 aplicações legadas para containers, com definição de padrão de imagens e pipelines CI/CD
- Implantação de clusters Kubernetes gerenciados em Azure (AKS), AWS (EKS) e GCP (GKE), com política de distribuição de cargas por criticidade
- Migração para Nuvem das cargas prioritárias com cutover planejado e rollback documentado
- Sustentação / AMS com SLA de 99,9%, plantão 24x7 e gestão de incidentes em ambiente multicloud
- Change Management com treinamento de 180 profissionais e plano de comunicação para as áreas de operações e engenharia

Tecnologias principais: Azure, AWS, GCP.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Diagnóstico e desenho da arquitetura multicloud (6 semanas)
- Piloto de containers e pipelines CI/CD (8 semanas)
- Migração das aplicações prioritárias (14 semanas)
- Estabilização, AMS e Change Management (4 semanas)

## 5. Entregáveis

- Inventário técnico e plano de modernização das 38 aplicações com priorização por criticidade
- Ambientes Kubernetes padronizados em Azure, AWS e GCP com pipelines CI/CD operacionais
- Migração concluída das 12 aplicações prioritárias com testes de carga e aceite formal
- Catálogo de serviços AMS com SLA, indicadores e runbooks de operação
- Plano de Change Management executado com trilhas de capacitação e relatório de adesão

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de soluções cloud, 4 engenheiros de plataforma/DevOps, 2 engenheiros de migração e 1 especialista em change management.

## 7. Premissas e riscos

- Risco: Dependências entre aplicações legadas atrasam a migração
- Risco: Restrições de segurança e compliance em ambiente multicloud
- Risco: Baixa adesão das equipes do cliente ao novo modelo operacional

## 8. Investimento

Investimento total: R$ 1.480.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 28%.
