---
projeto_id: P501
cliente: Casa & Construção Prime
titulo: Modernização de Aplicações com Containers em Multicloud para o Varejo
segmento: Varejo
tecnologias: ["GCP","Azure","AWS","Kafka"]
servicos: ["Migração para Nuvem"]
area: Cloud & Infra
dono: Débora Castilho
confidencialidade: interna
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P501
id: P501-PROP
tipo_documental: proposta_comercial
status_documento: preliminar
data: 2026-11-02
prazo_meses: 6
valor: 740000
margem: 0.31
---

# Proposta Comercial — Modernização de Aplicações com Containers em Multicloud para o Varejo

**Cliente:** Casa & Construção Prime
**Segmento:** Varejo
**Área responsável:** Cloud & Infra · **Dono da proposta:** Débora Castilho
**Data:** 2026-11-02 · **Versão:** final

## 1. Contexto e desafio

A Casa & Construção Prime opera 148 lojas físicas e um e-commerce que responde por 27% da receita, mas mantém 62 aplicações em servidores on-premises com janelas de manutenção de até 9 horas e indisponibilidade média de 4,2 horas por mês. O parque legado limita a escalabilidade em picos sazonais, quando o volume de pedidos cresce 3,5 vezes, e eleva o custo de infraestrutura em 18% ao ano.

## 2. Objetivo

Modernizar as aplicações críticas de varejo com conteinerização e orquestração em ambiente multicloud (GCP, Azure e AWS), reduzindo indisponibilidade e tempo de deploy, com integração de eventos via Kafka.

## 3. Escopo da solução

- Avaliação e priorização de 62 aplicações, selecionando 24 para conteinerização na primeira onda
- Conteinerização das aplicações prioritárias com orquestração em GCP (GKE) e Azure (AKS), incluindo imagens e pipelines CI/CD
- Implantação de malha de integração orientada a eventos com Apache Kafka para pedidos, estoque e pagamentos
- Definição de landing zone e governança multicloud, com workloads complementares em AWS para analytics e DR
- Migração para nuvem das cargas conteinerizadas, com cutover assistido e descomissionamento do legado

Tecnologias principais: GCP, Azure, AWS, Kafka.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Assessment e desenho da arquitetura-alvo (6 semanas)
- Landing zone multicloud e implantação do Kafka (6 semanas)
- Conteinerização e migração da primeira onda de 12 aplicações (8 semanas)
- Migração da segunda onda de 12 aplicações e descomissionamento (6 semanas)

## 5. Entregáveis

- Relatório de assessment das 62 aplicações com matriz de priorização e roadmap de 6 meses
- 24 aplicações conteinerizadas e em produção em GCP e Azure, com pipelines CI/CD automatizados
- Cluster Kafka em produção com 3 tópicos principais integrando pedidos, estoque e pagamentos
- Landing zone multicloud documentada com políticas de segurança, custos e DR em AWS
- Plano de cutover e descomissionamento do legado, com runbooks e transferência de conhecimento

## 6. Equipe proposta

1 arquiteto de soluções cloud, 1 especialista em containers e Kubernetes, 1 engenheiro de integração Kafka, 2 engenheiros de cloud e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Dependências entre aplicações legadas atrasam a conteinerização
- Risco: Janelas de cutover restritas impactam o e-commerce em picos sazonais
- Risco: Custos multicloud acima do previsto sem governança de FinOps

## 8. Investimento

Investimento total: R$ 740.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 31%.
