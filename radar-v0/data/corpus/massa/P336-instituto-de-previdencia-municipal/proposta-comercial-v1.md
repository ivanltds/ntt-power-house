---
projeto_id: P336
cliente: Instituto de Previdência Municipal
titulo: Leitura e Triagem de Documentos com IA Generativa para Previdência Municipal
segmento: Setor Público
tecnologias: ["Azure","RPA","Python","IA Generativa"]
servicos: ["IA Generativa"]
area: AI & Automation
dono: Paulo Henrique Dias
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P336
id: P336-PROPV1
tipo_documental: proposta_comercial
status_documento: rascunho
data: 2024-11-23
prazo_meses: 7
valor: 940000
margem: 0.33
---

# Proposta Comercial — Leitura e Triagem de Documentos com IA Generativa para Previdência Municipal (versão 1, rascunho)

**Cliente:** Instituto de Previdência Municipal
**Segmento:** Setor Público
**Área responsável:** AI & Automation · **Dono da proposta:** Paulo Henrique Dias
**Data:** 2024-11-23 · **Versão:** 1 (rascunho)

## 1. Contexto e desafio

O Instituto de Previdência Municipal recebe mensalmente cerca de 12.000 documentos previdenciários (requerimentos, certidões, comprovantes) que são triados manualmente por 15 servidores, gerando atraso médio de 7 dias úteis e alto índice de erros (12% de classificações incorretas).

## 2. Objetivo

Automatizar a leitura e triagem de documentos previdenciários com IA generativa, reduzindo o tempo de processamento em 60% e aumentando a acurácia para acima de 95% em 5 meses.

## 3. Escopo da solução

- Ingestão e OCR de documentos digitalizados usando Azure Form Recognizer e Python para extração de texto e metadados.
- Classificação e extração de informações com IA Generativa (Azure OpenAI) para identificar tipo de documento e campos relevantes.
- Orquestração de fluxo de triagem com RPA (Power Automate) integrado ao sistema de protocolo do Instituto.
- Interface de revisão humana com validação e correção assistida por IA para os casos de baixa confiança.
- Monitoramento e retreinamento contínuo do modelo com métricas de acurácia e volume processado.

Tecnologias principais: Azure, RPA, Python, IA Generativa.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Fase 1 – Discovery e preparação de dados: 6 semanas
- Fase 2 – Desenvolvimento do modelo de IA e pipeline de OCR: 10 semanas
- Fase 3 – Integração com RPA e sistema de protocolo: 6 semanas
- Fase 4 – Testes, treinamento e go-live assistido: 4 semanas

## 5. Entregáveis

- Pipeline de ingestão e OCR implantado no Azure, processando 100% dos documentos recebidos.
- Modelo de IA generativa customizado para classificação e extração de 20 tipos documentais, com acurácia mínima de 95%.
- Fluxo RPA de triagem automática integrado ao sistema de protocolo, com fallback para revisão humana.
- Painel de monitoramento de desempenho (volume, acurácia, tempo médio) em Power BI.
- Documentação técnica e treinamento para 15 servidores do Instituto.

## 6. Equipe proposta

1 arquiteto de soluções de IA, 1 cientista de dados, 1 engenheiro de RPA, 1 desenvolvedor Python e 1 gerente de projeto..

## 7. Premissas e riscos

- Risco: Baixa qualidade dos documentos digitalizados impactando a acurácia do OCR.
- Risco: Resistência dos servidores à mudança no processo de triagem.
- Risco: Integração complexa com o sistema de protocolo legado do Instituto.

## 8. Investimento

Investimento total: R$ 940.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 33%.
