---
projeto_id: P406
cliente: Banco Ponte Firme
titulo: Implatação de plataforma lakehouse Databricks no Azure para dados financeiros
segmento: Serviços Financeiros
tecnologias: ["Databricks","Azure"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: confidencial
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P406
id: P406-PROP
tipo_documental: proposta_comercial
status_documento: preliminar
data: 2026-10-25
prazo_meses: 7
valor: 1040000
margem: 0.33
---

# Proposta Comercial — Implatação de plataforma lakehouse Databricks no Azure para dados financeiros

**Cliente:** Banco Ponte Firme
**Segmento:** Serviços Financeiros
**Área responsável:** Data & Analytics · **Dono da proposta:** Ana Beatriz Lopes
**Data:** 2026-10-25 · **Versão:** final

## 1. Contexto e desafio

O Banco Ponte Firme processa cerca de 12 milhões de transações diárias em sistemas legados que geram relatórios com atraso de até 48 horas para as áreas de crédito e risco. A ausência de uma camada analítica unificada impede a reconciliação automática de 8% dos lançamentos contábeis e limita a adoção de modelos de risco em tempo quase real.

## 3. Escopo da solução

- Provisionamento da infraestrutura no Azure (Data Lake Storage Gen2, Azure Data Factory e workspace Databricks) com rede privada e políticas de governança
- Construção de pipelines de ingestão incremental no Databricks para 14 fontes transacionais e cadastrais, com orquestração e controle de qualidade
- Modelagem das camadas bronze, silver e gold com tabelas Delta Lake e histórico de alterações para trilha de auditoria
- Implementação de 25 regras de qualidade e reconciliação de dados contábeis, com alertas automáticos para a equipe de risco
- Criação de catálogo de dados e controle de acesso por perfil no Databricks Unity Catalog para 6 áreas consumidoras

Tecnologias principais: Databricks, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Diagnóstico e arquitetura (4 semanas)
- Infraestrutura e ingestão (8 semanas)
- Modelagem e qualidade de dados (10 semanas)
- Governança, testes e go-live (6 semanas)

## 5. Entregáveis

- Infraestrutura Azure e workspace Databricks configurados e documentados em ambiente de produção
- 14 pipelines de ingestão em operação com monitoramento e SLA de carga definidos
- Modelo lakehouse em Delta Lake com camadas bronze, silver e gold homologado pela área de dados
- Painel de qualidade e reconciliação com 25 regras ativas e relatório diário de divergências
- Documentação técnica, runbooks operacionais e treinamento de 20 usuários das áreas de crédito e risco

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em governança e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Atraso na liberação de acessos às fontes legadas pelo time de segurança do banco
- Risco: Volume e qualidade irregulares em 3 das 14 fontes mapeadas
- Risco: Dependência de janelas noturnas curtas para cargas de dados críticas

## 8. Investimento

Investimento total: R$ 1.040.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 33%.
