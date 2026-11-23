---
projeto_id: P580
cliente: Financeira Rumo Certo
titulo: Leitura e triagem inteligente de documentos financeiros com IA generativa
segmento: Serviços Financeiros
tecnologias: ["Azure","AWS","IA Generativa","Python"]
servicos: ["IA Generativa","Automação de Processos"]
area: AI & Automation
dono: Paulo Henrique Dias
confidencialidade: interna
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P580
id: P580-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-07-22
prazo_meses: 4
valor: 1750000
margem: 0.2
---

# Proposta Comercial — Leitura e triagem inteligente de documentos financeiros com IA generativa

**Cliente:** Financeira Rumo Certo
**Segmento:** Serviços Financeiros
**Área responsável:** AI & Automation · **Dono da proposta:** Paulo Henrique Dias
**Data:** 2026-07-22 · **Versão:** final

## 1. Contexto e desafio

A Financeira Rumo Certo recebe cerca de 12 mil documentos por mês entre contratos, comprovantes e propostas de crédito, e a triagem manual consome 1.800 horas mensais da equipe de backoffice, com 18% de retrabalho por classificação incorreta. O processo atual atrasa a análise de crédito em até 3 dias úteis e limita a escalabilidade da operação.

## 2. Objetivo

Automatizar a leitura, classificação e triagem de documentos com IA generativa, reduzindo o tempo médio de processamento em 70% e o retrabalho de classificação para menos de 5% em 4 meses.

## 3. Escopo da solução

- Pipeline de ingestão e OCR de documentos em Python integrado ao Azure Blob Storage e AWS S3
- Classificação e extração de campos com modelos de IA Generativa no Azure OpenAI, com fallback em serviços AWS
- Motor de triagem e roteamento automático por tipo de documento e criticidade, integrado ao sistema de crédito
- Painel de monitoramento de acurácia, volume processado e filas de exceção
- Automação de processos com orquestração de fluxos e trilha de auditoria dos documentos triados

Tecnologias principais: Azure, AWS, IA Generativa, Python.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Diagnóstico e desenho da solução (3 semanas)
- Desenvolvimento do protótipo de IA Generativa (5 semanas)
- Integração, automação e testes com usuários (5 semanas)
- Go-live assistido e estabilização (3 semanas)

## 5. Entregáveis

- Documento de arquitetura da solução e plano de integração com os sistemas da Financeira Rumo Certo
- Protótipo funcional de leitura e classificação para 5 tipos de documentos prioritários
- Pipeline de IA Generativa em produção processando 100% dos documentos do escopo piloto
- Painel de indicadores de acurácia, SLA e volume com metas validadas
- Relatório de encerramento com resultados, lições aprendidas e roadmap de expansão

## 6. Equipe proposta

1 arquiteto de soluções de IA, 2 engenheiros de dados, 1 desenvolvedor Python, 1 especialista em IA Generativa e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e padronização dos documentos de entrada podem reduzir a acurácia da extração
- Risco: Restrições de acesso e conformidade de dados financeiros podem atrasar integrações
- Risco: Baixa adesão da equipe de backoffice ao novo fluxo de triagem

## 8. Investimento

Investimento total: R$ 1.750.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 20%.
