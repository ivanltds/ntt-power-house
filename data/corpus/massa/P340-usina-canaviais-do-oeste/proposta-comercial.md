---
projeto_id: P340
cliente: Usina Canaviais do Oeste
titulo: Painéis executivos e plataforma de BI para gestão sucroenergética
segmento: Agronegócio
tecnologias: ["SAP","Snowflake","Azure","Power BI"]
servicos: ["Engenharia de Dados","Analytics & BI"]
area: Data & Analytics
dono: André Vasconcelos
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P340
id: P340-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-06-02
prazo_meses: 4
valor: 930000
margem: 0.25
---

# Proposta Comercial — Painéis executivos e plataforma de BI para gestão sucroenergética

**Cliente:** Usina Canaviais do Oeste
**Segmento:** Agronegócio
**Área responsável:** Data & Analytics · **Dono da proposta:** André Vasconcelos
**Data:** 2026-06-02 · **Versão:** final

## 1. Contexto e desafio

A Usina Canaviais do Oeste acompanha safra, moagem e custos de produção em 14 planilhas distintas, com fechamento gerencial que leva até 12 dias após o corte mensal. A diretoria não tem visão consolidada de indicadores como ATR, produtividade por talhão e custo por tonelada, o que atrasa decisões de alocação de área e de compra de insumos.

## 2. Objetivo

Implantar uma plataforma de dados e painéis executivos que consolide informações de SAP, lavoura e logística em uma única camada analítica, reduzindo o ciclo de fechamento gerencial para até 3 dias.

## 3. Escopo da solução

- Extração e ingestão de dados do SAP (FI, CO, MM e PM) para o Azure Data Lake via pipelines de Engenharia de Dados
- Modelagem dimensional no Snowflake com camadas raw, tratada e analítica para indicadores de moagem, ATR e custo por tonelada
- Construção de 6 painéis executivos em Power BI cobrindo safra, produtividade agrícola, custos, logística e manutenção
- Implementação de governança de dados e catálogo no Azure, com definição de 40 indicadores corporativos e seus responsáveis
- Configuração de atualização automatizada diária e alertas de desvio sobre metas de ATR e custo operacional

Tecnologias principais: SAP, Snowflake, Azure, Power BI.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Discovery e arquitetura de dados (4 semanas)
- Engenharia de dados e ingestão SAP/Azure/Snowflake (6 semanas)
- Construção dos painéis em Power BI (4 semanas)
- Homologação, treinamento e go-live (2 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e dicionário com 40 indicadores corporativos
- Pipelines de ingestão SAP para Azure operando em carga diária automatizada
- Modelo dimensional no Snowflake validado com a área de controladoria
- 6 painéis executivos em Power BI publicados e homologados pela diretoria
- Treinamento de 20 usuários-chave e manual de operação da plataforma

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e padronização dos cadastros mestres no SAP
- Risco: Baixa disponibilidade das áreas de lavoura e controladoria para validação
- Risco: Restrições de conectividade no ambiente Azure do cliente

## 8. Investimento

Investimento total: R$ 930.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 25%.
