---
projeto_id: P595
cliente: Mútua Previdência Sul
titulo: Precificação Dinâmica com Machine Learning para Produtos de Previdência
segmento: Seguros
tecnologias: ["Python","Machine Learning"]
servicos: ["Analytics & BI"]
area: Data & Analytics
dono: Leonardo Pires
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P595
id: P595-SOW
tipo_documental: sow
status_documento: assinado
data: 2025-09-19
prazo_meses: 5
valor: 1210000
---

# SOW — Precificação Dinâmica com Machine Learning para Produtos de Previdência

**Contratante:** Mútua Previdência Sul · **Contratada:** NTT DATA Brasil · **Vigência:** 5 meses a partir do kickoff

## 1. Objeto

Implantar um motor de precificação dinâmica baseado em Python e Machine Learning que ajuste preços por perfil de risco e condições de mercado em ciclos diários, elevando a competitividade das propostas sem comprometer a margem técnica.

## 2. Escopo contratado

- Construção de pipelines de dados em Python para ingestão diária de sinistralidade, cancelamentos e dados de concorrência de 14 fontes internas e externas
- Desenvolvimento de modelos de Machine Learning de elasticidade-preço e propensão à contratação, com validação em backtesting sobre 24 meses de histórico
- Motor de regras de precificação dinâmica com limites de margem mínima e alçadas de aprovação por faixa de prêmio
- Dashboard de Analytics & BI para acompanhamento de conversão, margem e aderência de preço por produto e canal
- Integração do motor ao sistema de cotação via API, com monitoramento de drift dos modelos e retreino mensal

## 3. Entregáveis e aceite

- Documento de arquitetura de dados e modelo de governança de variáveis de precificação
- Três modelos de Machine Learning em produção (elasticidade, propensão e sinistralidade esperada) com relatório de performance
- Motor de precificação dinâmica integrado ao sistema de cotação por API
- Painel de Analytics & BI com 18 indicadores de conversão, margem e aderência de preço
- Manual de operação, plano de retreino e capacitação de 22 usuários das áreas comercial e atuarial

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 1.210.000, faturado mensalmente conforme o cronograma.
