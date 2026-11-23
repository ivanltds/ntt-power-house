---
projeto_id: P180
cliente: Indústria de Embalagens Plastipack
titulo: Sustentação AMS para plataforma ServiceNow, Kubernetes e Azure na manufatura
segmento: Manufatura
tecnologias: ["ServiceNow","Kubernetes","Azure"]
servicos: ["Sustentação / AMS"]
area: Enterprise Apps
dono: Tiago Fernandes
confidencialidade: interna
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P180
id: P180-PROP
tipo_documental: proposta_comercial
status_documento: preliminar
data: 2026-10-09
prazo_meses: 27
valor: 11280000
margem: 0.3
---

# Proposta Comercial — Sustentação AMS para plataforma ServiceNow, Kubernetes e Azure na manufatura

**Cliente:** Indústria de Embalagens Plastipack
**Segmento:** Manufatura
**Área responsável:** Enterprise Apps · **Dono da proposta:** Tiago Fernandes
**Data:** 2026-10-09 · **Versão:** final

## 1. Contexto e desafio

A Plastipack opera 3 plantas com 12 linhas de extrusão e produção média de 480 toneladas/mês de embalagens plásticas, com cerca de 640 usuários ativos na plataforma de serviços. O ambiente ServiceNow sobre Kubernetes no Azure apresenta chamados recorrentes sem SLA formal, gerando indisponibilidade média de 9 horas/mês e risco de paradas não planejadas na cadeia produtiva.

## 2. Objetivo

Assumir a sustentação das aplicações ServiceNow, Kubernetes e Azure com SLA de 99,5% de disponibilidade e resolução de 90% dos incidentes em até 8 horas úteis, ao longo de 27 meses.

## 3. Escopo da solução

- Gestão de incidentes, requisições e problemas na plataforma ServiceNow, com fila dedicada e cumprimento de SLA por severidade
- Administração e monitoramento dos clusters Kubernetes no Azure, incluindo atualizações de versão, capacity planning e gestão de namespaces
- Sustentação da infraestrutura Azure (máquinas virtuais, AKS, bancos gerenciados e backup), com patching mensal e revisão de custos
- Manutenção evolutiva de baixa complexidade em workflows e integrações ServiceNow, limitada a 120 horas/mês
- Relatórios mensais de indicadores (disponibilidade, MTTR, volume de chamados) e condução de reuniões de revisão de serviço

Tecnologias principais: ServiceNow, Kubernetes, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 27 meses, nas seguintes fases:

- Transição e diagnóstico do ambiente atual: 8 semanas
- Estabilização e implantação do modelo de SLA: 10 semanas
- Operação em regime de sustentação AMS: 78 semanas
- Melhoria contínua e encerramento contratual: 12 semanas

## 5. Entregáveis

- Catálogo de serviços e matriz de SLA por severidade com prazos de atendimento definidos
- Relatório mensal de desempenho com disponibilidade, MTTR e volume de chamados por categoria
- Plano de continuidade e recuperação de desastre para os ambientes Kubernetes e Azure
- Backlog de melhorias contínuas priorizado trimestralmente com o cliente
- Base de conhecimento atualizada com no mínimo 40 artigos técnicos no primeiro ano

## 6. Equipe proposta

1 gerente de serviço, 1 arquiteto de soluções, 2 analistas de sustentação ServiceNow, 2 engenheiros de plataforma Kubernetes/Azure e 1 analista de suporte N1.

## 7. Premissas e riscos

- Risco: Indisponibilidade de acessos e documentação incompleta do ambiente legado na transição
- Risco: Dependência de janelas de mudança restritas nas 3 plantas industriais
- Risco: Volatilidade de demanda por chamados acima da capacidade contratada

## 8. Investimento

Investimento total: R$ 11.280.000, em parcelas mensais ao longo de 27 meses.

Margem praticada: 30%.
