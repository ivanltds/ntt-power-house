---
projeto_id: P457
cliente: Escudo Auto Seguros
titulo: Assistente virtual com IA generativa para atendimento de seguros auto
segmento: Seguros
tecnologias: ["IA Generativa","Azure"]
servicos: ["IA Generativa"]
area: AI & Automation
dono: Karina Duarte
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P457
id: P457-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-03-09
prazo_meses: 3
valor: 420000
margem: 0.29
---

# Proposta Comercial — Assistente virtual com IA generativa para atendimento de seguros auto

**Cliente:** Escudo Auto Seguros
**Segmento:** Seguros
**Área responsável:** AI & Automation · **Dono da proposta:** Karina Duarte
**Data:** 2026-03-09 · **Versão:** final

## 1. Contexto e desafio

A Escudo Auto Seguros recebe cerca de 480 mil ligações e chats por ano, com 62% dos contatos concentrados em dúvidas repetitivas de apólice, sinistro e boleto. O tempo médio de espera chega a 9 minutos nos picos e o índice de abandono alcança 18%, pressionando o custo por atendimento e o NPS do segmento auto.

## 2. Objetivo

Implantar um assistente virtual com IA generativa no Azure para resolver de forma autônoma as dúvidas de maior volume do atendimento auto, reduzindo o tempo de espera e o volume de chamadas escaladas para atendentes humanos.

## 3. Escopo da solução

- Desenho da arquitetura do assistente em Azure, com Azure OpenAI Service, Azure AI Search e integração às bases de apólice e sinistro
- Construção de pipeline de ingestão e indexação de 1.200 documentos de produtos, condições gerais e scripts de atendimento
- Desenvolvimento do assistente conversacional com IA Generativa para os 25 intents de maior volume, com groundedness e citação de fontes
- Integração via API aos canais de chat e WhatsApp, com handoff para atendente humano e registro de transcrições
- Definição de guardrails, testes de aderência regulatória e painel de acompanhamento de acurácia e contenção

Tecnologias principais: IA Generativa, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 3 meses, nas seguintes fases:

- Discovery e arquitetura (3 semanas)
- Ingestão e base de conhecimento (3 semanas)
- Desenvolvimento e integração do assistente (4 semanas)
- Testes, go-live e transferência de conhecimento (2 semanas)

## 5. Entregáveis

- Documento de arquitetura e plano de segurança do assistente em Azure
- Base de conhecimento indexada e validada com os 1.200 documentos de produtos e atendimento
- Assistente virtual em produção para os 25 intents prioritários nos canais chat e WhatsApp
- Relatório de testes com meta de acurácia mínima de 90% nas respostas e taxa de handoff abaixo de 30%
- Painel de métricas e manual de operação e evolução do assistente

## 6. Equipe proposta

1 arquiteto de soluções de IA, 1 engenheiro de IA generativa, 1 desenvolvedor full-stack, 1 especialista de negócios em seguros e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa qualidade ou dispersão dos documentos de apólice e sinistro para a base de conhecimento
- Risco: Restrições regulatórias e de privacidade na exposição de dados de segurados
- Risco: Dependência de integrações com sistemas legados de sinistro do cliente

## 8. Investimento

Investimento total: R$ 420.000, em parcelas mensais ao longo de 3 meses.

Margem praticada: 29%.
