---
projeto_id: P141
cliente: Atacadão Popular Sul
titulo: Assistente virtual com IA generativa para atendimento no varejo
segmento: Varejo
tecnologias: ["Salesforce","Python"]
servicos: ["IA Generativa"]
area: AI & Automation
dono: Fábio Nunes
confidencialidade: confidencial
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P141
id: P141-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-11-06
prazo_meses: 5
valor: 1670000
margem: 0.31
---

# Proposta Comercial — Assistente virtual com IA generativa para atendimento no varejo

**Cliente:** Atacadão Popular Sul
**Segmento:** Varejo
**Área responsável:** AI & Automation · **Dono da proposta:** Fábio Nunes
**Data:** 2026-11-06 · **Versão:** final

## 1. Contexto e desafio

O Atacadão Popular Sul atende hoje cerca de 180 mil interações por mês entre lojas físicas e canais digitais, com 62% dos contatos concentrados em dúvidas repetitivas sobre preços, estoque e políticas de troca. O tempo médio de primeira resposta no WhatsApp é de 11 minutos e a taxa de abandono chega a 24% nos horários de pico, pressionando o custo por atendimento.

## 2. Objetivo

Implantar um assistente virtual com IA generativa integrado ao Salesforce para resolver de forma autônoma ao menos 55% dos atendimentos de nível 1 em 5 meses, reduzindo o tempo de primeira resposta para menos de 1 minuto.

## 3. Escopo da solução

- Integração do assistente virtual ao Salesforce Service Cloud para consumo de histórico de casos e dados de clientes
- Desenvolvimento dos serviços de orquestração e das rotas de IA generativa em Python, com camada de RAG sobre a base de políticas comerciais
- Configuração de fluxos de escalonamento humano no Salesforce com contexto da conversa e classificação de intenção
- Implementação de guardrails, logs de auditoria e painéis de acurácia e contenção no Salesforce
- Execução de testes A/B com 2 mil conversas reais e ajuste de prompts e limiares de confiança

Tecnologias principais: Salesforce, Python.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Descoberta e desenho da solução (4 semanas)
- Desenvolvimento e integração Salesforce/Python (8 semanas)
- Testes A/B e ajuste de modelos (5 semanas)
- Go-live assistido e transferência de conhecimento (3 semanas)

## 5. Entregáveis

- Assistente virtual em produção para os canais WhatsApp e chat do site
- Documento de arquitetura da solução com integração Salesforce e serviços Python
- Base de conhecimento estruturada para RAG com 350 artigos revisados
- Painel de KPIs de atendimento com taxa de contenção, CSAT e tempo de primeira resposta
- Relatório de testes A/B e plano de evolução para a fase seguinte

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de soluções de IA, 2 engenheiros Python, 1 consultor Salesforce e 1 especialista em experiência do cliente.

## 7. Premissas e riscos

- Risco: Baixa qualidade ou desatualização da base de conhecimento para RAG
- Risco: Resistência das equipes de atendimento à mudança de processo
- Risco: Latência ou limites de API do Salesforce em picos de 180 mil interações/mês

## 8. Investimento

Investimento total: R$ 1.670.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 31%.
