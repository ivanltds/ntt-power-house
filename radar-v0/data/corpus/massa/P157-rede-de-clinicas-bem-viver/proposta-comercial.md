---
projeto_id: P157
cliente: Rede de Clínicas Bem Viver
titulo: Leitura e triagem inteligente de documentos clínicos com IA generativa
segmento: Saúde
tecnologias: ["AWS","Azure","IA Generativa"]
servicos: ["IA Generativa"]
area: AI & Automation
dono: Rafael Gonçalves
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P157
id: P157-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-11-07
prazo_meses: 3
valor: 890000
margem: 0.38
---

# Proposta Comercial — Leitura e triagem inteligente de documentos clínicos com IA generativa

**Cliente:** Rede de Clínicas Bem Viver
**Segmento:** Saúde
**Área responsável:** AI & Automation · **Dono da proposta:** Rafael Gonçalves
**Data:** 2025-11-07 · **Versão:** final

## 1. Contexto e desafio

A Rede de Clínicas Bem Viver processa cerca de 48 mil documentos por mês entre laudos, guias de convênio e prontuários digitalizados, com 62% deles ainda triados manualmente por 14 analistas. Esse volume gera fila média de 2,5 dias úteis e índice de retrabalho de 18% por classificação incorreta.

## 2. Objetivo

Automatizar a leitura e a triagem de documentos clínicos com IA generativa, reduzindo o tempo de classificação para menos de 4 horas e o retrabalho para patamar inferior a 5% em 3 meses.

## 3. Escopo da solução

- Ingestão de documentos digitalizados em AWS S3 com extração de texto via Amazon Textract
- Pipeline de classificação e extração de entidades com IA Generativa em Azure OpenAI, integrado ao ambiente AWS
- Camada de orquestração e validação humana (human-in-the-loop) para casos de baixa confiança
- Painel de acompanhamento de acurácia, volume triado e fila residual em Amazon QuickSight
- Integração das saídas classificadas ao sistema de gestão clínica do cliente via API

Tecnologias principais: AWS, Azure, IA Generativa.

## 4. Abordagem e cronograma

O projeto será executado em 3 meses, nas seguintes fases:

- Discovery e desenho da solução (3 semanas)
- Protótipo e validação com amostra documental (4 semanas)
- Implantação do pipeline em produção (5 semanas)

## 5. Entregáveis

- Documento de arquitetura da solução de leitura e triagem em AWS e Azure
- Protótipo funcional de classificação com IA Generativa validado em amostra de 5 mil documentos
- Pipeline de ingestão e triagem em produção para 3 tipos de documento prioritários
- Painel de indicadores de acurácia e produtividade da triagem
- Relatório de resultados do piloto com recomendações de expansão

## 6. Equipe proposta

1 arquiteto de soluções de IA, 1 engenheiro de dados, 1 cientista de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade variável dos documentos digitalizados comprometer a acurácia da extração
- Risco: Baixa adesão dos analistas ao fluxo de validação humana
- Risco: Restrições de conformidade e LGPD no tratamento de dados clínicos sensíveis

## 8. Investimento

Investimento total: R$ 890.000, em parcelas mensais ao longo de 3 meses.

Margem praticada: 38%.
