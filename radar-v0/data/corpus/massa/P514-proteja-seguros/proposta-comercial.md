---
projeto_id: P514
cliente: Proteja Seguros
titulo: Governança de dados e conformidade LGPD em seguradora com Snowflake
segmento: Seguros
tecnologias: ["Python","Snowflake"]
servicos: ["Governança de Dados","Change Management"]
area: Data & Analytics
dono: André Vasconcelos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P514
id: P514-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-03-09
prazo_meses: 5
valor: 1940000
margem: 0.19
---

# Proposta Comercial — Governança de dados e conformidade LGPD em seguradora com Snowflake

**Cliente:** Proteja Seguros
**Segmento:** Seguros
**Área responsável:** Data & Analytics · **Dono da proposta:** André Vasconcelos
**Data:** 2025-03-09 · **Versão:** final

## 1. Contexto e desafio

A Proteja Seguros mantinha dados de 1,2 milhão de segurados distribuídos em 14 sistemas legados, sem catálogo único e com controles de acesso heterogêneos. A ausência de rastreabilidade sobre dados pessoais expunha a companhia a riscos de sanção da ANPD e a retrabalho em auditorias internas que consumiam cerca de 320 horas por trimestre.

## 2. Objetivo

Implantar uma estrutura de governança de dados e adequação à LGPD sobre base Snowflake, com classificação de dados pessoais, políticas de acesso e processo contínuo de change management.

## 3. Escopo da solução

- Mapeamento e classificação de dados pessoais em 14 fontes, com scripts Python de extração e profiling automatizado
- Implantação de catálogo e linhagem de dados no Snowflake, cobrindo 100% das tabelas com dados sensíveis
- Definição de 22 políticas de acesso, mascaramento e retenção alinhadas à LGPD
- Automação em Python de rotinas de varredura de dados pessoais e geração de evidências para auditoria
- Programa de change management com 6 workshops e capacitação de 85 usuários-chave

Tecnologias principais: Python, Snowflake.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e classificação de dados (6 semanas)
- Implementação de catálogo e políticas no Snowflake (8 semanas)
- Automação de varreduras e evidências em Python (4 semanas)
- Change management e transferência de conhecimento (4 semanas)

## 5. Entregáveis

- Catálogo de dados com 100% das tabelas críticas classificadas por sensibilidade
- Matriz de políticas de acesso e mascaramento publicada e aplicada no Snowflake
- Relatório de lacunas LGPD com plano de remediação priorizado em 3 ondas
- Conjunto de rotinas Python de varredura e monitoramento contínuo de dados pessoais
- Kit de capacitação e 6 sessões de treinamento realizadas com registro de presença

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em privacidade e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa adesão das áreas de negócio ao novo processo de classificação
- Risco: Qualidade inconsistente dos metadados nas 14 fontes legadas
- Risco: Mudanças regulatórias da ANPD durante a execução

## 8. Investimento

Investimento total: R$ 1.940.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 19%.
