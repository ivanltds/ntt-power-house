---
projeto_id: P548
cliente: Hospital Infantil Esperança
titulo: Assistente virtual com IA generativa para atendimento ao paciente pediátrico
segmento: Saúde
tecnologias: ["ServiceNow","Azure","Python"]
servicos: ["Automação de Processos","IA Generativa"]
area: AI & Automation
dono: Rafael Gonçalves
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P548
id: P548-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2024-12-27
prazo_meses: 7
valor: 6460000
margem: 0.25
---

# Proposta Comercial — Assistente virtual com IA generativa para atendimento ao paciente pediátrico

**Cliente:** Hospital Infantil Esperança
**Segmento:** Saúde
**Área responsável:** AI & Automation · **Dono da proposta:** Rafael Gonçalves
**Data:** 2024-12-27 · **Versão:** final

## 1. Contexto e desafio

O Hospital Infantil Esperança registra cerca de 18 mil atendimentos por mês, dos quais 62% passam pelo call center para agendamento, remarcação e dúvidas sobre preparo de exames. O tempo médio de espera na linha chega a 9 minutos e a taxa de abandono é de 21%, sobrecarregando 34 atendentes e gerando insatisfação das famílias.

## 2. Objetivo

Implantar um assistente virtual com IA generativa integrado ao atendimento, automatizando agendamentos, remarcações e orientações pré-exame, com meta de resolver 55% das interações sem intervenção humana em 7 meses.

## 3. Escopo da solução

- Assistente conversacional em Python com LLM orquestrado no Azure OpenAI Service, com guardrails clínicos e trilha de auditoria
- Integração com ServiceNow para abertura, atualização e roteamento de tickets de atendimento e incidentes
- Fluxos de automação de processos no ServiceNow para agendamento, remarcação e confirmação de consultas pediátricas
- Camada de dados e busca semântica no Azure (Azure AI Search e Azure SQL) sobre base de preparo de exames e FAQ institucional
- Painel de acompanhamento no ServiceNow com métricas de contenção, CSAT e transferências para atendimento humano

Tecnologias principais: ServiceNow, Azure, Python.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Discovery e desenho de experiência (6 semanas)
- Desenvolvimento do assistente e integrações ServiceNow/Azure (12 semanas)
- Piloto controlado e ajuste de modelos (6 semanas)
- Go-live e estabilização (4 semanas)

## 5. Entregáveis

- Assistente virtual em produção nos canais web e WhatsApp, com no mínimo 40 intenções mapeadas
- Integração ServiceNow–Azure publicada com 12 automações de processos de atendimento
- Base de conhecimento curada e pipeline de atualização semântica no Azure AI Search
- Relatório de testes de aceitação com taxa de acerto superior a 90% nos cenários validados
- Treinamento de 34 atendentes e documentação técnica de operação e evolução

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de soluções de IA, 2 engenheiros Python, 1 especialista ServiceNow e 1 analista de UX conversacional.

## 7. Premissas e riscos

- Risco: Baixa aderência das famílias ao canal digital
- Risco: Restrições de privacidade e LGPD no tratamento de dados de menores
- Risco: Latência das integrações ServiceNow–Azure fora do SLA

## 8. Investimento

Investimento total: R$ 6.460.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 25%.
