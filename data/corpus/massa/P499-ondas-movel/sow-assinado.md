---
projeto_id: P499
cliente: Ondas Móvel
titulo: Modernização de aplicações legadas com containers em Kubernetes na Ondas Móvel
segmento: Telecom
tecnologias: ["Kubernetes","AWS","GCP"]
servicos: ["Migração para Nuvem"]
area: Cloud & Infra
dono: Isabela Freitas
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P499
id: P499-SOW
tipo_documental: sow
status_documento: assinado
data: 2024-08-17
prazo_meses: 12
valor: 3190000
---

# SOW — Modernização de aplicações legadas com containers em Kubernetes na Ondas Móvel

**Contratante:** Ondas Móvel · **Contratada:** NTT DATA Brasil · **Vigência:** 12 meses a partir do kickoff

## 1. Objeto

Migrar e modernizar as aplicações críticas para containers gerenciados em Kubernetes na AWS e no GCP, reduzindo indisponibilidade e tempo de deploy, com continuidade da jornada de nuvem iniciada em projeto anterior.

## 2. Escopo contratado

- Avaliação e priorização de 140 aplicações, com containerização das 60 de maior criticidade em imagens Docker e manifests Kubernetes.
- Provisionamento de clusters Kubernetes gerenciados (EKS na AWS e GKE no GCP) com malha de serviços, políticas de autoescalonamento e observabilidade centralizada.
- Implantação de pipeline CI/CD com deploy blue-green e canário para as aplicações migradas, integrado ao repositório corporativo.
- Migração de bancos e filas associados para serviços gerenciados na AWS e no GCP, com plano de cutover por ondas e rollback testado.
- Definição de guardrails de segurança, gestão de custos por namespace e runbooks de operação para o time de plataforma do cliente.

## 3. Entregáveis e aceite

- Catálogo das 140 aplicações com matriz de priorização e plano de ondas de migração.
- 60 aplicações containerizadas em produção nos clusters Kubernetes da AWS e do GCP.
- Pipeline CI/CD padronizado com deploy automatizado e testes de fumaça por release.
- Dashboards de observabilidade e relatórios de custo por aplicação e por namespace.
- Runbooks operacionais e treinamento de 35 profissionais do cliente em Kubernetes e práticas DevOps.

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 3.190.000, faturado mensalmente conforme o cronograma.
