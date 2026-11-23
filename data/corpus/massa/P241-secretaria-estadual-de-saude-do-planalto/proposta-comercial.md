---
projeto_id: P241
cliente: Secretaria Estadual de Saúde do Planalto
titulo: Governança de dados e conformidade LGPD para rede estadual de saúde
segmento: Setor Público
tecnologias: ["Databricks","Python","Azure","Snowflake"]
servicos: ["Governança de Dados","Change Management"]
area: Data & Analytics
dono: Xênia Lacerda
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P241
id: P241-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-03-10
prazo_meses: 8
valor: 1100000
margem: 0.33
---

# Proposta Comercial — Governança de dados e conformidade LGPD para rede estadual de saúde

**Cliente:** Secretaria Estadual de Saúde do Planalto
**Segmento:** Setor Público
**Área responsável:** Data & Analytics · **Dono da proposta:** Xênia Lacerda
**Data:** 2026-03-10 · **Versão:** final

## 1. Contexto e desafio

A Secretaria Estadual de Saúde do Planalto mantinha dados de 4,2 milhões de cidadãos distribuídos em 37 sistemas legados, sem catálogo único nem classificação de dados pessoais, o que gerava risco de sanções da ANPD e retrabalho em 60% das solicitações de informação. Além disso, os processos de anonimização e consentimento não eram auditáveis, comprometendo a prestação de contas exigida pela LGPD.

## 2. Objetivo

Implantar uma estrutura de governança de dados com classificação, catálogo e políticas de privacidade auditáveis, adequando os fluxos de dados de saúde à LGPD em 8 meses.

## 3. Escopo da solução

- Implantação de catálogo e linhagem de dados no Databricks para 37 fontes legadas, com classificação automática de dados pessoais sensíveis via Python
- Construção de camada de dados governada no Azure com integração ao Snowflake para consumo analítico seguro e mascaramento por perfil de acesso
- Definição e operacionalização de políticas de retenção, anonimização e consentimento para 4,2 milhões de titulares cadastrados
- Estruturação do comitê de governança de dados e dos papéis de steward e owner em 12 áreas da Secretaria
- Programa de change management com treinamento de 480 servidores e 6 campanhas de comunicação sobre LGPD

Tecnologias principais: Databricks, Python, Azure, Snowflake.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Diagnóstico e desenho de governança (8 semanas)
- Implantação técnica de catálogo e políticas (14 semanas)
- Integração, anonimização e trilhas de auditoria (8 semanas)
- Capacitação e sustentação (2 semanas)

## 5. Entregáveis

- Catálogo de dados com 1.240 ativos classificados e mapa de linhagem das 37 fontes
- Política de governança de dados e privacidade aprovada e publicada em portaria estadual
- Painel de conformidade LGPD com 18 indicadores de monitoramento contínuo
- Trilhas de auditoria de acesso e anonimização implantadas no Azure e Snowflake
- Plano de change management com 480 servidores capacitados e material de apoio

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em governança e LGPD, 1 analista de change management e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa qualidade e inconsistência dos dados nas 37 fontes legadas
- Risco: Resistência de 480 servidores à mudança de processos de acesso à informação
- Risco: Atraso na aprovação jurídica das políticas de retenção e consentimento

## 8. Investimento

Investimento total: R$ 1.100.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 33%.
