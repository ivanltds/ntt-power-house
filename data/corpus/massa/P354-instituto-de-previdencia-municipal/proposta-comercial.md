---
projeto_id: P354
cliente: Instituto de Previdência Municipal
titulo: Leitura e triagem inteligente de documentos previdenciários com IA generativa
segmento: Setor Público
tecnologias: ["RPA","AWS"]
servicos: ["IA Generativa","Automação de Processos"]
area: AI & Automation
dono: Vinícius Batista
confidencialidade: confidencial
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P354
id: P354-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-03-27
prazo_meses: 6
valor: 2070000
margem: 0.19
---

# Proposta Comercial — Leitura e triagem inteligente de documentos previdenciários com IA generativa

**Cliente:** Instituto de Previdência Municipal
**Segmento:** Setor Público
**Área responsável:** AI & Automation · **Dono da proposta:** Vinícius Batista
**Data:** 2025-03-27 · **Versão:** final

## 1. Contexto e desafio

O Instituto de Previdência Municipal recebe cerca de 12 mil processos previdenciários por ano, com triagem manual de documentos que consome 35% do tempo das equipes de análise e gera prazo médio de 21 dias para abertura de processo. A continuidade do projeto anterior de automação no cliente exige evoluir a esteira para leitura e classificação automática de documentos.

## 2. Objetivo

Automatizar a leitura e a triagem de documentos previdenciários com IA generativa, RPA e AWS, reduzindo o prazo de triagem em 60% e liberando as equipes para análise de mérito.

## 3. Escopo da solução

- Ingestão de documentos digitalizados em bucket AWS S3 com OCR e extração de campos via IA generativa
- Orquestração de robôs RPA para coleta, movimentação e devolução de documentos aos sistemas do instituto
- Classificação automática por tipo de documento e roteamento para as filas de análise
- Painel de acompanhamento de volumes, acurácia de triagem e SLA em AWS
- Integração com a esteira de automação já implantada no cliente na fase anterior do projeto

Tecnologias principais: RPA, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Discovery e desenho da solução (6 semanas)
- Desenvolvimento do pipeline AWS e modelo de IA generativa (10 semanas)
- Implementação dos fluxos RPA e integração (6 semanas)
- Homologação, treinamento e go-live (2 semanas)

## 5. Entregáveis

- Pipeline de ingestão e OCR em AWS operacional para 1.000 documentos/dia
- Modelo de IA generativa para extração e classificação com acurácia mínima de 92%
- Fluxos RPA de triagem e roteamento em produção
- Painel gerencial de indicadores de triagem e SLA
- Documentação técnica e treinamento de 20 servidores do instituto

## 6. Equipe proposta

1 arquiteto de soluções de IA, 2 engenheiros de dados, 2 desenvolvedores RPA e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade irregular dos documentos digitalizados impacta a acurácia da IA generativa
- Risco: Baixa adesão das equipes de triagem ao novo fluxo de trabalho
- Risco: Restrições de segurança e LGPD na nuvem AWS atrasam aprovações internas

## 8. Investimento

Investimento total: R$ 2.070.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 19%.
