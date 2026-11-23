---
projeto_id: P491
cliente: Prefeitura de Nova Esperança
titulo: Modernização de aplicações em containers e sustentação multicloud para a gestão pública
segmento: Setor Público
tecnologias: ["GCP","Azure","Kafka","AWS"]
servicos: ["Sustentação / AMS"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: interna
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P491
id: P491-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-10-21
prazo_meses: 6
valor: 1590000
margem: 0.22
---

# Proposta Comercial — Modernização de aplicações em containers e sustentação multicloud para a gestão pública

**Cliente:** Prefeitura de Nova Esperança
**Segmento:** Setor Público
**Área responsável:** Cloud & Infra · **Dono da proposta:** Igor Peixoto
**Data:** 2026-10-21 · **Versão:** final

## 1. Contexto e desafio

A Prefeitura de Nova Esperança opera 38 sistemas legados de secretarias (tributação, saúde, educação e obras), sendo 14 deles sem suporte do fornecedor original e com indisponibilidade média de 9 horas por mês. O parque atual roda em servidores físicos no datacenter municipal, com 72% das aplicações em versões de runtime fora de suporte, elevando o risco de incidentes e o custo de manutenção em cerca de 27% ao ano.

## 3. Escopo da solução

- Conteinerização de 12 aplicações prioritárias com imagens padronizadas e pipelines CI/CD executados em GCP e Azure
- Implantação de malha de integração assíncrona com Kafka para 6 fluxos críticos entre secretarias, com tópicos e políticas de retenção definidos
- Migração de cargas de processamento em lote para AWS, com ambientes isolados por secretaria e controle de custos por centro de custo
- Observabilidade centralizada com painéis de disponibilidade, SLOs e alertas para as 38 aplicações do parque municipal
- Operação de sustentação / AMS em modelo 8x5 com plantão estendido para incidentes críticos e gestão de mudanças

Tecnologias principais: GCP, Azure, Kafka, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e desenho da arquitetura (4 semanas)
- Conteinerização e pipeline CI/CD (8 semanas)
- Integração com Kafka e migração de cargas para AWS (8 semanas)
- Estabilização e transição para sustentação / AMS (4 semanas)

## 5. Entregáveis

- Catálogo de 12 aplicações modernizadas em containers, com manifesto de implantação e documentação de rollback
- Pipeline CI/CD único com etapas de build, teste e deploy aprovadas para GCP e Azure
- Cluster Kafka em produção com 6 fluxos integrados e documentação de tópicos, schemas e políticas de retenção
- Relatório mensal de AMS com indicadores de disponibilidade, tempo médio de resolução e consumo de nuvem por secretaria
- Plano de continuidade e runbooks operacionais para os 38 sistemas do parque municipal

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de cloud, 3 engenheiros de DevOps, 2 engenheiros de integração e 2 analistas de sustentação.

## 7. Premissas e riscos

- Risco: Dependência de janelas de manutenção das secretarias para cutover das aplicações
- Risco: Aplicações legadas sem documentação e com regras de negócio não mapeadas
- Risco: Restrições de contratação e conformidade de dados públicos em ambientes multicloud

## 8. Investimento

Investimento total: R$ 1.590.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 22%.
