# NB-01 — Documento de Discovery

> Demanda: **radar-propostas-cases** · Etapa: NB-01 — Ideação & Discovery
> Status: **RASCUNHO** — pendente de aprovação humana (ver `GATE.md` da execução)
> Agente responsável: Agente de Ideação (`%sdlc-nb01-ideacao`), orquestrado pelo Maestro

## 1. Problema de negócio

Os times comerciais, de pré-vendas e de consultoria não têm uma base central e consultável que conecte os materiais produzidos ao longo do ciclo de uma proposta (e, futuramente, de um projeto) — propostas comerciais, apresentações, escopos, estimativas, contratos, atas, transcrições, entregas e cases.

Hoje, encontrar uma referência relevante para uma nova oportunidade depende de memória institucional, busca manual em pastas/SharePoint e contato informal com quem "lembra" de um projeto parecido. Isso gera:

- Perda de tempo na preparação de novas propostas.
- Baixo reaproveitamento de conhecimento e de boas soluções já entregues.
- Risco de inconsistência entre propostas (escopo, precificação, tecnologias) por falta de referência comparável.
- Dependência de poucas pessoas que concentram o conhecimento histórico.

O problema **não é genérico**: é a ausência de um mecanismo de busca por contexto/significado (não só por nome de arquivo) sobre uma base curada de propostas e cases, com rastreabilidade de fontes e respeito a permissões/confidencialidade.

## 2. Contexto

- Escopo de conteúdo inicial: **apenas propostas comerciais e cases** (não o ciclo completo proposta → contrato → projeto → entrega, que é visão futura).
- Existem limitações de acesso a informações e pouco tempo disponível — por isso o MVP não pressupõe integração completa nem ingestão automatizada desde o início.
- A base piloto deve conter apenas documentos sem sigilo ou devidamente anonimizados.
- Upload será inicialmente manual (drag-and-drop), com guarda opcional de link/origem no SharePoint; integração automatizada com pasta do SharePoint é avaliada apenas se viável, não é pré-requisito do MVP.
- O sistema deve extrair texto, sugerir tags/descrição/metadados, permitir busca via chat em linguagem natural e listar propostas/cases similares com score e justificativa explicável.

## 3. Stakeholders

| Papel | Interesse / participação |
|---|---|
| Times comerciais e de pré-vendas | Usuários finais primários — buscam referências para novas oportunidades |
| Consultoria | Usuário final — contribui com cases e consome referências de escopo/solução |
| Dono da proposta | Faz upload e mantém metadados das propostas sob sua responsabilidade |
| Curador/admin | Aprova conteúdos, cura a base piloto, gerencia taxonomia e acessos |
| Gestor | Consome agregados e referências permitidas, acompanha reaproveitamento de conhecimento |
| Product Owner / Sponsor | **A definir** — aprovador humano dos gates deste fluxo SDLC (ver pendência na seção 7) |

## 4. Objetivos de negócio

- Reduzir o tempo para encontrar uma proposta/case de referência para uma nova oportunidade.
- Aumentar o reaproveitamento de conhecimento comercial e de solução já produzido pela organização.
- Dar visibilidade, com explicação e rastreabilidade de fontes, sobre por que uma referência é relevante para a oportunidade em mãos.
- Apontar áreas/serviços complementares de escopo com base em padrões observados em propostas/cases semelhantes (sempre como sugestão, nunca como decisão automática).
- Validar, com uma base piloto pequena, a hipótese de que busca semântica + consulta em linguagem natural geram ganho real de produtividade antes de investir em integrações completas.

## 5. Hipótese a validar

> Se disponibilizarmos uma base confiável de propostas históricas e cases, com metadados mínimos, busca semântica e consulta em linguagem natural com fontes rastreáveis, os times reduzirão o tempo para encontrar referências e aumentarão o reaproveitamento de conhecimento em novas oportunidades.

## 6. Riscos iniciais

- **Confidencialidade/governança**: risco de vazamento de informação sensível (valor, margem, cliente) se classificação de segurança ou permissões de acesso falharem. Mitigação: base piloto só com documentos sem sigilo/anonimizados; controle de acesso é item *Must have*.
- **Qualidade da extração/classificação automática**: sugestões de tags/descrição/metadados podem vir incorretas. Mitigação: revisão humana obrigatória antes de o documento entrar na base (UC02).
- **Base piloto pequena/não representativa**: pode não gerar resultados relevantes o suficiente para validar a hipótese. Mitigação: curadoria deliberada da amostragem inicial.
- **Dependência de acesso ao SharePoint**: a integração automatizada pode não ser viável no prazo do MVP. Mitigação: já tratada como "avaliar se viável", não bloqueante — upload manual é o caminho garantido.
- **Alucinação do chat**: risco de o assistente "inventar" referências ou scores sem evidência. Mitigação: regra explícita de não inventar informação, sempre exibir fontes/trechos, e informar quando não houver evidência suficiente.
- **Adoção**: usuários podem não confiar no score/sugestões sem entender a justificativa. Mitigação: score sempre explicável com fatores (item *Must have* 7).

## 7. Pendências de informação crítica de negócio

Resolvidas com o solicitante nesta etapa de discovery:

| Item | Resposta |
|---|---|
| Prioridade estratégica / urgência | **Alta** — prioridade imediata no roadmap |
| Orçamento / equipe | Equipe reduzida já alocada; **sem orçamento externo** adicional previsto |
| Prazo desejado para o MVP | **4 a 6 semanas** |
| Aprovador humano (Product Owner / Sponsor) do gate | **Ainda não definido** — segue como pendência aberta, não bloqueia o início do discovery/requisitos, mas **bloqueia o fechamento do gate NB-01**, que exige aprovação humana nominal |

## 8. Critérios de sucesso (métricas) — validação do MVP

- Percentual de resultados de busca avaliados como úteis pelos usuários.
- Tempo para encontrar uma proposta de referência (antes x depois).
- Redução do tempo de pesquisa de materiais relevantes.
- Percentual de respostas do chat com fontes efetivamente verificadas pelo usuário.
- Número de buscas sem resultado relevante.
- Número de correções manuais de tags/classificações sugeridas automaticamente.
- Avaliação dos usuários sobre a relevância dos 3 primeiros resultados retornados.
- Comparação da relevância das buscas com e sem briefing/metadados da oportunidade preenchidos.

## 9. Recorte confirmado para o MVP (alinhado ao solicitante)

**Dentro do MVP:**
Cadastro de oportunidade + briefing · upload manual de PDF/DOCX/PPTX · base piloto curada com propostas e cases não confidenciais · extração de texto e metadados sugeridos com revisão humana · busca conversacional com 3–5 resultados similares · score de similaridade explicável · resumo da relação entre resultado e busca · fontes rastreáveis · controle básico de acesso · link de origem no SharePoint (opcional).

**Fora do MVP (Won't have):** propostas/dados sensíveis ou confidenciais na base, geração automática de proposta comercial completa, lições aprendidas de delivery, construção automatizada de proposta via chat, dashboard de indicadores, geração automática de casos de uso para download, seleção automática de propostas como base de redação de nova proposta, cobertura completa do ciclo proposta → contrato → projeto → entrega.

## 10. Maturidade para avançar

A demanda está madura para seguir para **NB-02 — Levantamento de Requisitos**: problema específico, hipótese, objetivos, métricas de sucesso, stakeholders e recorte MoSCoW já estão descritos com detalhe suficiente (o solicitante já trouxe um MoSCoW preliminar, casos de uso essenciais e telas mínimas, que serão formalizados como requisitos funcionais/não funcionais em NB-02). A única pendência (nome do aprovador humano do gate) não impede o avanço do trabalho técnico, mas deve ser resolvida antes do fechamento formal do gate NB-01.
