# Discovery — Listagem e ficha de projeto (rodada 2)

> Cópia versionada de `radar-v0/docs/DISCOVERY-projetos-listagem-ficha.md` (protótipo), com os links ajustados para esta pasta.

> Demanda: **radar-propostas-cases** · Etapa: NB-01 — Ideação & Discovery (rodada focada, iterativa)
> Status: **Plano proposto em 2026-11-03 — aguardando o PO aprovar o início.** Nenhuma tela será alterada antes do fechamento.
> Origem: feedback F1 do teste com o time ([`NB-02-adendo-feedbacks-teste-2026-11-03.md`](./NB-02-adendo-feedbacks-teste-2026-11-03.md)) e a decisão do PO de rever a listagem e a ficha com o público-alvo.
> Saída esperada: inventário de informações **validado por perfil**, que alimenta o NB-04 (wireframes) e fecha o conteúdo de UC12.

## 1. Por que voltar ao discovery

O PO não tem segurança de que a listagem e a ficha trazem as informações relevantes para o público-alvo: gestores, executivos e consultores.

**Lacuna encontrada no NB-01 original:**
- A lista de stakeholders tem comercial, pré-vendas, consultoria, dono da proposta, curador e gestor. **Executivos e diretoria não aparecem.**
- O objetivo do NB-01 era "**encontrar uma referência para uma nova proposta**". Esse é o trabalho do consultor e do pré-vendas.
- O executivo usa a mesma base para **outras decisões**:
  - onde o portfólio é forte;
  - o que levar a uma reunião com um cliente;
  - quais cases podem ser citados;
  - onde ganhamos e onde perdemos.
- A listagem e a ficha foram desenhadas para o primeiro trabalho. É provável que isso seja o "algo que ainda não foi pensado".

## 2. Perguntas que o discovery deve responder

1. **Quem** usa a listagem e a ficha, em **que momento** e para tomar **que decisão**?
2. Para cada perfil, quais informações são:
   - **indispensáveis no card**, para decidir se abre o projeto;
   - **indispensáveis na ficha**;
   - **dispensáveis**?
3. Que informações **não existem hoje** na base e fazem falta? De onde viriam e quem as mantém?
4. O que o usuário faz **depois** de achar o projeto: liga para alguém, exporta, apresenta, copia o escopo?
5. Que informação, se estiver **errada ou desatualizada**, destrói a confiança na ferramenta?

## 3. Perfis e momentos de uso (hipóteses a validar)

| Perfil | Momento de uso | Decisão ou tarefa | Informação que provavelmente importa |
|---|---|---|---|
| **Executivo / diretoria** | Antes de uma reunião com o cliente ou prospect, e em revisões de portfólio | "O que já fizemos para esse cliente ou segmento?", "Que case posso citar?", "Onde somos fortes?" | segmento, áreas do cliente, **resultado de negócio** (impacto, KPI), **se o case pode ser citado**, relação com o cliente (quantos projetos, desde quando), status, ano |
| **Gestor comercial** | Revisão de pipeline, preparação de proposta e precificação | "Vale a pena ir atrás?", "Qual preço e margem praticamos?", "Por que perdemos?" | status, **motivo de ganho ou perda**, **concorrentes**, valor, margem, prazo, **modelo comercial** (preço fechado, alocação), responsável, data |
| **Consultor / pré-vendas** | Montagem da proposta e da solução | "Que escopo e arquitetura reaproveitar?", "Quem sabe sobre isso?", "Que riscos aconteceram?" | escopo, tecnologias, serviços, **ativos e aceleradores reaproveitáveis**, lições, riscos, **contato interno de referência**, documentos |
| **Gerente de projeto / delivery** (a confirmar) | Início de um projeto parecido | "Como foi a execução?", "O prazo previsto se cumpriu?" | **fase de execução** (em andamento, concluído), **prazo previsto × realizado**, equipe e papéis, lições |
| **Marketing / alianças** (a confirmar) | Produção de cases e conteúdo com parceiros | "Que cases públicos temos com o parceiro X?" | **autorização para uso público**, **parceiros e fabricantes** (Microsoft, AWS, Databricks), resultado |

## 4. Inventário atual × candidatos

### 4.1 O que já existe na base

| Informação | Card hoje | Ficha hoje |
|---|---|---|
| Título, cliente, status da proposta | ✔ | ✔ |
| Segmento | — | ✔ |
| Prática NTT ("Área") | — | ✔ |
| Tecnologias | ✔ (até 3) | ✔ |
| Serviços | — | ✔ |
| Prazo, valor, margem (valor e margem conforme a permissão) | — | ✔ |
| Responsável, data de referência, link | — | ✔ |
| Descrição e objetivo | — | ✔ |
| Documentos, com download e edição | contagem | ✔ |
| Resultados, riscos e lições (vindos dos documentos) | — | ✔ quando extraídos |
| Projetos parecidos | — | ✔ |
| Histórico de alterações e "criado por" | — | ✔ |

### 4.2 Candidatos que não existem hoje (para priorizar com os usuários)

> **Aprofundamento completo:** [`NB-01-discovery-r2-catalogo-informacoes-projeto.md`](./NB-01-discovery-r2-catalogo-informacoes-projeto.md). Ele traz 10 dimensões, cerca de 80 informações classificadas por origem e custo, as perguntas de cada público, 12 informações calculáveis sem cadastro novo, visões além do card, esboços e a priorização preliminar. A tabela abaixo é o resumo.

| Informação candidata | Para quem | Origem provável | Observação |
|---|---|---|---|
| **Área do cliente** (TI, RH, produção, canais de venda…) | Executivo, gestor | Cadastro e IA (UC12) | Já decidida. |
| **Resultado de negócio estruturado** (KPI, antes → depois) | Executivo, marketing | Cases e IA, com revisão | Hoje fica solto nas frases dos documentos. |
| **Pode ser citado?** (público / só interno / sob NDA) | Executivo, marketing | Gestor ou jurídico | Evita citar um cliente indevidamente. **É risco de credibilidade.** |
| **Motivo de ganho ou perda** | Gestor | Dono da proposta | Hoje só aparece em lições, quando aparece. |
| **Concorrentes** na disputa | Gestor | Dono da proposta | Sensível: avaliar permissão. |
| **Modelo comercial** (preço fechado, alocação, sustentação) | Gestor | Cadastro | |
| **Fase de execução** (proposta, em execução, concluído) e **prazo previsto × realizado** | Gestor, delivery | Cadastro | Hoje só existe o status da proposta. O ciclo do projeto é "visão futura" no NB-01. |
| **Contato interno de referência** (quem conhece o projeto) | Consultor | Cadastro | Responde "com quem eu falo?". |
| **Ativos e aceleradores reaproveitáveis** | Consultor | Documentos e cadastro | Aumenta o reaproveitamento, o objetivo do NB-01. |
| **Parceiros e fabricantes** envolvidos | Marketing, executivo | Cadastro e IA | |
| **Relação com o cliente** (nº de projetos, primeiro projeto, valor acumulado) | Executivo | Calculado | Não precisa de cadastro novo. |
| **Completude e atualização** da ficha ("80% preenchida, atualizada há 3 dias") | Todos | Calculado | Mostra quão confiável é a ficha. |
| **Porte do cliente** e **região** | Gestor, executivo | Cadastro do cliente | |

## 5. Método

A rodada dura de 1 a 2 semanas e é iterativa: cada passo pode corrigir o anterior.

| # | Atividade | Com quem | Como | Saída |
|---|---|---|---|---|
| 1 | **Entrevistas curtas**, de 30 minutos | 6 a 8 pessoas: 2 executivos, 2 gestores, 2 a 3 consultores e, se possível, 1 de delivery | Roteiro da seção 6 | Momentos de uso, decisões e informações citadas espontaneamente |
| 2 | **Priorização de informações** (card sorting) | As mesmas pessoas, no fim da entrevista | Cada pessoa classifica as 14 informações priorizadas na seção 8 do catálogo em "no card", "na ficha" e "não preciso" | Ranking por perfil |
| 3 | **Teste de tarefas no app atual e num protótipo navegável** (itens 1 a 7 da seção 8 do catálogo) | 3 a 5 pessoas | 4 tarefas cronometradas, com a pessoa pensando em voz alta (seção 7) | Onde travam e o que procuram e não acham |
| 4 | **Dados de uso** | — | Eventos de abertura de detalhe, exportação e "usar como base" já registrados, e perguntas do chat sobre projetos | Que informações são pedidas no chat e não estão no card |
| 5 | **Síntese e validação com o PO** | PO | Inventário final por perfil, com prioridade MoSCoW | Entrada para NB-02 (UC12 revisado) e NB-04 (wireframes) |

**Evidência que já temos:**
- No teste de hoje, o gestor perguntou no chat por **prazo, valor, margem, responsável e link** de um projeto.
- Um consultor perguntou por **"todas as áreas que têm projetos"**.
- Isso indica que essas informações são buscadas e não estão à vista na listagem.

## 6. Roteiro de entrevista (30 minutos)

1. **Contexto (5 min):** "Conte a última vez que você precisou saber o que a NTT já fez para um cliente ou um tema. O que você estava tentando decidir?"
2. **Fontes atuais (5 min):** "Onde você procurou? Com quem falou? O que foi difícil?"
3. **Informação decisiva (10 min):**
   - "Olhando a lista de projetos, o que você precisa ver para saber se vale abrir um deles?"
   - "Ao abrir, o que precisa estar lá para você agir?"
   - "O que você faria em seguida?"
4. **Confiança (5 min):** "Que informação, se estivesse errada, faria você deixar de usar a ferramenta?"
5. **Priorização (5 min):** card sorting com a lista das seções 4.1 e 4.2.

## 7. Tarefas do teste no app atual

1. "Você tem uma reunião amanhã com uma seguradora. Encontre o que podemos apresentar." Mede: o que a pessoa abre, o que procura e se encontra resultado e autorização de uso.
2. "Encontre uma proposta perdida em varejo e descubra por quê." Mede: se o motivo de perda está acessível.
3. "Descubra com quem falar sobre o projeto de churn." Mede: responsável e contato.
4. "Monte em 2 minutos um resumo do que fizemos em Energia." Mede: se a listagem permite ver o conjunto.

## 8. Hipóteses a confirmar ou derrubar

- **H1:** executivos decidem pelo **resultado de negócio** e pela **possibilidade de citar o cliente**, não pela tecnologia.
- **H2:** gestores precisam ver **status, valor e motivo de ganho ou perda** já na listagem.
- **H3:** consultores querem a visão técnica no card, com tecnologias e serviços. Isso justificaria a alternância Executiva / Técnica (UC12.5).
- **H4:** "com quem eu falo sobre isso" é uma necessidade forte e não está atendida.
- **H5:** sem um sinal de completude e atualização, os usuários desconfiam das fichas cadastradas por outros.
- **H6:** a listagem precisa de uma **visão agrupada** (por cliente ou segmento), além da lista de cards. Isso é coerente com as perguntas de agregação do chat (F3).

## 9. Critérios para fechar o discovery

- Pelo menos 6 entrevistas, cobrindo os 3 perfis principais.
- Inventário de informações com prioridade **por perfil** (MoSCoW) aprovado pelo PO.
- Para cada informação nova "Must": origem do dado, quem mantém e regra de permissão definidos.
- Hipóteses H1 a H6 marcadas como confirmadas, derrubadas ou inconclusivas.
- Decisões registradas no `DECISIONS.md` e o UC12 revisado (adendo NB-02).

## 10. Questões para o PO

1. Quem são os executivos e gestores disponíveis para as entrevistas, e em que janela?
2. Delivery e Marketing / alianças entram nesta rodada ou ficam para depois?
3. Informações como **concorrentes** e **motivo de perda** podem existir na base piloto, considerando a política de dados?
