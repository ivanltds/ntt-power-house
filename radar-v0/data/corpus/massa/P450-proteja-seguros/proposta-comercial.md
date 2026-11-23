---
projeto_id: P450
cliente: Proteja Seguros
titulo: Leitura e triagem inteligente de documentos com IA generativa para seguros
segmento: Seguros
tecnologias: ["AWS","IA Generativa","Python","Azure"]
servicos: ["Automação de Processos","Change Management"]
area: AI & Automation
dono: Yuri Monteiro
confidencialidade: interna
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P450
id: P450-PROP
tipo_documental: proposta_comercial
status_documento: preliminar
data: 2026-10-16
prazo_meses: 4
valor: 1080000
margem: 0.2
---

# Proposta Comercial — Leitura e triagem inteligente de documentos com IA generativa para seguros

**Cliente:** Proteja Seguros
**Segmento:** Seguros
**Área responsável:** AI & Automation · **Dono da proposta:** Yuri Monteiro
**Data:** 2026-10-16 · **Versão:** final

## 1. Contexto e desafio

A Proteja Seguros recebe cerca de 18 mil documentos por mês entre propostas, apólices, laudos e sinistros, e a triagem é feita manualmente por 32 analistas, com prazo médio de 3 dias úteis e índice de retrabalho de 14%. O volume cresce 11% ao ano e pressiona o SLA de regulação de sinistros.

## 2. Objetivo

Automatizar a leitura, classificação e triagem de documentos com IA generativa, reduzindo o prazo de triagem para até 1 dia útil e o retrabalho para menos de 5% em 4 meses.

## 3. Escopo da solução

- Pipeline de ingestão e OCR de documentos em Python sobre AWS, com extração de campos estruturados de propostas, apólices e laudos
- Modelos de IA generativa para classificação, sumarização e triagem automática por tipo e criticidade de documento
- Camada de orquestração e validação humana integrada ao ambiente Azure do cliente, com trilha de auditoria por documento
- Painel de indicadores de acurácia, volume triado e tempo médio de triagem para a área de sinistros
- Automação de Processos para roteamento dos documentos triados aos fluxos de regulação e subscrição

Tecnologias principais: AWS, IA Generativa, Python, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Diagnóstico e desenho da solução (4 semanas)
- Desenvolvimento do pipeline e do modelo de triagem (7 semanas)
- Piloto com lote real e ajuste de acurácia (3 semanas)
- Rollout, treinamento e sustentação inicial (2 semanas)

## 5. Entregáveis

- Documento de arquitetura da solução de leitura e triagem com IA generativa em AWS e Azure
- Pipeline de ingestão e extração de campos em produção para 3 tipos de documento prioritários
- Modelo de triagem com acurácia mínima de 92% validada em lote de 2 mil documentos históricos
- Painel de indicadores operacionais e relatório de desempenho do piloto
- Plano de Change Management com treinamento de 32 analistas em 4 turmas e material de apoio

## 6. Equipe proposta

1 arquiteto de soluções de IA, 2 engenheiros de dados, 1 cientista de dados, 1 especialista em change management e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e padronização dos documentos digitalizados pode reduzir a acurácia do modelo
- Risco: Baixa adesão dos analistas à nova triagem automatizada
- Risco: Integração com sistemas legados do cliente pode atrasar o cronograma

## 8. Investimento

Investimento total: R$ 1.080.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 20%.
