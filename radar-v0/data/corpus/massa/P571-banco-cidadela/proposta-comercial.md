---
projeto_id: P571
cliente: Banco Cidadela
titulo: Lakehouse Snowflake no Azure com Governança de Dados para Consolidação Analítica
segmento: Serviços Financeiros
tecnologias: ["Snowflake","Azure"]
servicos: ["Governança de Dados"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: confidencial
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P571
id: P571-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-10-26
prazo_meses: 6
valor: 930000
margem: 0.26
---

# Proposta Comercial — Lakehouse Snowflake no Azure com Governança de Dados para Consolidação Analítica

**Cliente:** Banco Cidadela
**Segmento:** Serviços Financeiros
**Área responsável:** Data & Analytics · **Dono da proposta:** Ana Beatriz Lopes
**Data:** 2026-10-26 · **Versão:** final

## 1. Contexto e desafio

O Banco Cidadela mantém hoje 14 bases analíticas dispersas em dois data centers e três provedores de nuvem, o que gera 38% de retrabalho na reconciliação de indicadores e atraso médio de 5 dias úteis na entrega de relatórios regulatórios. A ausência de um catálogo único e de políticas formais de linhagem impede que as áreas de Crédito e Risco auditem a origem dos números com agilidade.

## 3. Escopo da solução

- Migração das 14 bases analíticas para arquitetura lakehouse no Azure Data Lake Storage Gen2 com ingestão incremental via Azure Data Factory
- Modelagem dimensional e implementação de camadas Bronze, Silver e Gold no Snowflake, com 220 objetos mapeados e políticas de clustering por domínio
- Implantação de catálogo de dados, linhagem e dicionário corporativo com integração ao Snowflake e às fontes Azure
- Definição e operacionalização de políticas de qualidade de dados (12 regras críticas) e papéis de acesso por domínio de negócio
- Habilitação de 45 usuários das áreas de Crédito, Risco e Controladoria em autoatendimento analítico no Snowflake

Tecnologias principais: Snowflake, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e arquitetura de referência (5 semanas)
- Construção da ingestão e camadas Bronze/Silver no Azure (9 semanas)
- Modelagem Gold no Snowflake e governança de dados (8 semanas)
- Homologação, capacitação e go-live assistido (4 semanas)

## 5. Entregáveis

- Documento de arquitetura de referência do lakehouse Azure + Snowflake aprovado pelo comitê de arquitetura do cliente
- 14 pipelines de ingestão em produção no Azure Data Factory com monitoramento e alertas
- Modelo dimensional Gold com 220 objetos e 18 painéis de indicadores de Crédito, Risco e Varejo publicados
- Catálogo de dados corporativo com linhagem ponta a ponta e dicionário de 340 campos críticos
- Relatório de encerramento com métricas de qualidade de dados, plano de sustentação e trilha de capacitação dos 45 usuários

## 6. Equipe proposta

1 arquiteto de dados, 1 especialista em governança de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade das fontes legadas abaixo do esperado, exigindo esforço extra de saneamento
- Risco: Restrições de segurança e compliance do setor financeiro atrasando aprovações de acesso
- Risco: Baixa adesão das áreas de negócio ao autoatendimento no Snowflake após o go-live

## 8. Investimento

Investimento total: R$ 930.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 26%.
