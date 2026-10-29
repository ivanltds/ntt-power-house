# NB-03 — Viabilidade & Priorização (Business Case)

> Demanda: **radar-propostas-cases** · Etapa: NB-03 — Viabilidade & Priorização
> Status: **RASCUNHO** — pendente de aprovação humana (ver [`GATE-NB-03.md`](./GATE-NB-03.md))
> Base: [`NB-01-discovery.md`](./NB-01-discovery.md) (DEC-0005) e [`NB-02-especificacao-requisitos.md`](./NB-02-especificacao-requisitos.md) + [`NB-02-feature-busca-conversacional.md`](./NB-02-feature-busca-conversacional.md) (DEC-0006)
> Agente responsável: Agente de Viabilidade (`%sdlc-nb03-viabilidade`), orquestrado pelo Maestro

## 1. Resumo executivo

**Recomendação: GO COM RESSALVAS (faseamento).**

A demanda é viável e tem alto valor potencial, mas o escopo aprovado em NB-02 (36 RFs, 11 RNFs, UC03 com 15 sub-casos de uso) **não cabe com folga em 4–6 semanas com equipe reduzida**, especialmente porque esse prazo também precisa absorver as etapas restantes do fluxo SDLC (NB-04 a QA-05). A proposta é entregar o MVP em duas ondas, mantendo na Onda 1 tudo que é necessário para validar a hipótese de NB-01, e condicionar o Go às confirmações da seção 7.

## 2. Premissas da estimativa

As premissas abaixo **não foram confirmadas** pelo solicitante e devem ser validadas no gate. Se mudarem, a estimativa da seção 3 deve ser revista.

| # | Premissa | Impacto se falsa |
|---|---|---|
| P1 | Equipe efetiva de ~3 pessoas (1 dev backend/IA, 1 dev fullstack, ~0,5 QA e ~0,5 PO/curadoria) durante 6 semanas → **capacidade ≈ 15–18 pessoa-semana** | Com 2 pessoas a capacidade cai para ~10–12 pessoa-semana: só a Onda 1 é viável |
| P2 | Existe um provedor de LLM e embeddings já contratado pela organização (ex.: assinatura corporativa de nuvem/IA), utilizável sem novo orçamento | Sem isso, o requisito "sem orçamento externo" bloqueia RF07, RF12–RF19 e todo o UC03 — **impedimento para o Go** |
| P3 | Existe um ambiente de nuvem/hospedagem corporativo disponível para o piloto | Exigiria aprovação de infraestrutura nova, com atraso de prazo |
| P4 | A base piloto terá pequeno volume (ordem de dezenas a poucas centenas de documentos), curada e anonimizada por alguém do negócio | Base maior aumenta esforço de curadoria e custo de processamento; base menor pode não validar a hipótese |
| P5 | Autenticação: login simples ou SSO corporativo já disponível, sem integração complexa (RF26) | Integração de identidade nova pode adicionar 1–2 pessoa-semana |

## 3. Estimativa de esforço (ordem de grandeza)

Estimativa em **pessoa-semana**, em faixas. Não é estimativa de sprint, que será refinada em DEV-01/DEV-03.

| Bloco | Escopo (RFs) | Complexidade | Esforço |
|---|---|---|---|
| Fundação | Modelo de dados, perfis de acesso e autorização (RF22, RF23, RF26), ambiente, pipeline básico | Média | 2–3 |
| UC01 — Oportunidade | Cadastro/edição com metadados, ocultação de valor/margem (RF01–RF04) | Baixa | 0,5–1 |
| UC02 — Ingestão | Upload PDF/DOCX/PPTX, extração de texto, chunking, embeddings, sugestão de metadados por LLM, revisão humana, status, nível de confiança derivado (RF05–RF11, RF24, RF27) | Alta | 3–4 |
| UC03 — Núcleo da busca | Recuperação semântica, filtro de permissão antes do ranking, score de 6 fatores, threshold, justificativa com trecho literal, cards/detalhe, "sem evidência" (RF12–RF19) | Alta | 4–5 |
| UC03 — Feedback e auditoria | Útil/não útil e registro por turno para as métricas (RF34, RF36) | Baixa | 1 |
| UC03 — Memória multi-turno | Sessão persistida e follow-up ("e o segundo?") (RF33) | Média | 1–1,5 |
| UC03 — Conflito de fontes | Hierarquia de confiança aplicada e explicada (RF35) | Média/Alta | 1–1,5 |
| UC04 — Áreas complementares | Agregação de serviços recorrentes com evidência (RF20, RF21) | Média | 1–2 |
| Qualidade e entrega | Testes, homologação, CI/CD, deploy do piloto (QA-01–QA-05) | Média | 2–3 |
| **Total Must** | | | **≈ 15,5–22 pessoa-semana** |

Fora da conta: RF25, RF28–RF32 (Should/Could), que já estão marcados como não obrigatórios.

**Leitura:** com a capacidade de P1 (15–18), o escopo Must completo fica **no limite ou acima**, sem margem para calibração do score, que depende da base real (UC03.7), nem para retrabalho de gates reprovados.

## 4. Proposta de faseamento

| Onda | Janela-alvo | Conteúdo | Por quê |
|---|---|---|---|
| **Onda 1 — Validar a hipótese** | Semanas 1–4 | Fundação, UC01, UC02, UC03 núcleo, feedback + auditoria (RF34, RF36) | É o mínimo para medir as métricas de NB-01 (relevância dos 3 primeiros, tempo para achar referência, buscas sem resultado, correções manuais). ≈ 10,5–14 pessoa-semana |
| **Onda 2 — Experiência conversacional** | Semanas 5–6 | Memória multi-turno (RF33), conflito de fontes (RF35), UC04 (RF20, RF21) | Agregam valor, mas não são necessários para validar a hipótese; podem ser cortados sem invalidar o piloto. ≈ 3–5 pessoa-semana |
| Pós-MVP | — | RF25, RF28 (integração SharePoint), RF29–RF32 | Já classificados como Should/Could |

Na Onda 1, o UC03 funciona como busca conversacional de um turno: cada pergunta é independente, mas pode usar o briefing da oportunidade (RF14). A divergência entre fontes é apenas sinalizada ("há fontes divergentes"), sem resolução automática, até a Onda 2.

> Esse faseamento **revisa a ordem de entrega** de RF33 e RF35 (Must em DEC-0003), sem retirá-los do MVP. Se aprovado, deve gerar nova decisão de escopo em `DECISIONS.md`.

## 5. Business case (custo × benefício)

### Custo

| Item | Natureza | Ordem de grandeza |
|---|---|---|
| Equipe | Interna, já alocada | 15,5–22 pessoa-semana (seção 3); sem custo incremental de contratação |
| LLM + embeddings | Consumo por uso | Baixo no piloto: volume de poucas centenas de documentos e uso interno restrito. Depende de P2 |
| Hospedagem (app, banco, índice vetorial, storage) | Infra de nuvem | Baixo no piloto, desde que haja ambiente corporativo (P3) |
| Curadoria e anonimização da base piloto | Esforço do negócio | Relevante e muitas vezes subestimado; precisa de um responsável nomeado |
| Custo de oportunidade | Equipe deixa de atuar em outras demandas | Aceito pelo solicitante (prioridade alta) |

### Benefício esperado

- **Tempo:** redução do tempo para encontrar propostas/cases de referência.
  Fórmula de valor: `nº de usuários × horas/semana em busca × % de redução × custo-hora`. O baseline de horas/semana **ainda não foi medido** e deve ser coletado com os usuários do piloto antes do go-live (métrica de NB-01, "antes x depois").
- **Qualidade e consistência:** propostas com referência comparável de escopo, tecnologia e porte, o que reduz o risco de subprecificação ou de escopo incompleto.
- **Ampliação de escopo:** sugestões de áreas complementares (UC04) podem abrir receita adicional por oportunidade.
- **Redução de dependência de pessoas-chave** que concentram a memória institucional.
- **Aprendizado barato:** o piloto valida a hipótese antes de investir em integrações completas (SharePoint, ciclo proposta→contrato→projeto).

### Avaliação

A relação custo × benefício é **favorável**. O custo incremental é baixo (equipe já alocada, infraestrutura de piloto pequena) e o risco financeiro é limitado ao esforço da equipe. O benefício depende de adoção e da qualidade da base piloto, que são os principais riscos a gerenciar.

## 6. Riscos e mitigação

| # | Risco | Tipo | Prob. | Impacto | Mitigação proposta |
|---|---|---|---|---|---|
| R1 | Escopo Must não cabe no prazo | Negócio/Entrega | Alta | Alto | Faseamento em ondas (seção 4); critério explícito de corte da Onda 2 |
| R2 | Não existe provedor de LLM/embeddings sem custo novo (P2) | Negócio/Técnico | Média | **Bloqueante** | Confirmar antes do Go; alternativa: solicitar orçamento mínimo de consumo para o piloto |
| R3 | Vazamento de informação confidencial pela busca ou pelo chat | Segurança | Média | Muito alto | Filtro de permissão **antes** da recuperação/ranking (UC03.5), base piloto só anonimizada (RNF02), testes específicos de autorização em DEV-02/QA-01 |
| R4 | Alucinação: trechos ou scores inventados | Técnico (IA) | Média | Alto | Justificativa só com trecho literal verificado (UC03.9), resposta "sem evidência" (UC03.12), avaliação com conjunto de perguntas de referência |
| R5 | Base piloto pequena ou pouco representativa | Negócio | Média | Alto | Nomear curador; definir composição mínima por segmento/tecnologia antes de DEV-03 |
| R6 | Score e threshold mal calibrados, com resultados pouco úteis | Técnico | Alta | Médio | Pesos de RF19 como ponto de partida; calibrar com feedback RF34 durante a homologação |
| R7 | Baixa qualidade de extração de PPTX/PDF escaneado | Técnico | Média | Médio | Fora do MVP: PDF sem camada de texto (OCR); revisão humana obrigatória (RF09) |
| R8 | Baixa adoção e desconfiança do score | Negócio | Média | Alto | Score explicável por fator (RNF05); envolver usuários-chave em NB-04 e QA-04 |
| R9 | Overhead do processo SDLC (13 gates) consome o prazo | Processo | Média | Médio | Aprovar gates em lote quando possível (como em DEC-0002) e manter SLA curto de revisão |

## 7. Recomendação Go/No-Go

**GO COM RESSALVAS**, condicionado a:

1. **Confirmação de P2:** há provedor de LLM e embeddings utilizável sem orçamento novo, ou é aprovado um orçamento mínimo de consumo para o piloto. *(bloqueante)*
2. **Confirmação de P1:** tamanho real da equipe. Com menos de 3 pessoas efetivas, o MVP passa a ser só a Onda 1.
3. **Aceite do faseamento** da seção 4 (RF33, RF35 e UC04 na Onda 2), registrado como nova decisão de escopo.
4. **Nomeação de um curador** responsável pela base piloto anonimizada (R5).

## 8. Priorização relativa ao portfólio

Nenhum contexto de portfólio foi informado nesta execução. Vale a prioridade declarada em NB-01: **alta, imediata no roadmap**, com equipe já alocada. Se houver outras demandas concorrendo pela mesma equipe, o Sponsor/Comitê deve indicá-las no gate.

## 9. Próxima etapa

Se aprovado (Go): **NB-04 — UI/UX Design**, já considerando o faseamento. As telas da Onda 1 têm prioridade: cadastro de oportunidade, upload/revisão de documento, chat com cards de resultado e detalhe.
