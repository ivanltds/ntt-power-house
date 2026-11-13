# NB-02 — Adendo 6: conversa cordial, ajuda de uso, leitura de arquivo e arquitetura de skills

> Cópia versionada de `radar-v0/docs/CASOS-DE-USO-conversa-assistente-skills.md` (protótipo), com os links ajustados para esta pasta.

> Demanda: **radar-propostas-cases** · Etapa: NB-02 — Especificação de Requisitos (adendo 6)
> Status: **Proposta para o PO em 2026-11-13 — aguarda decisões (seção 6) e validação do comitê**
> Base: feature de busca conversacional (UC03), [`CASOS-DE-USO-feedbacks-teste-2026-11-03.md`](./NB-02-adendo-feedbacks-teste-2026-11-03.md) (roteador UC03.17–UC03.23) e [`CASOS-DE-USO-upload-cadastro-consultas.md`](./NB-02-adendo-upload-cadastro-consultas.md) (UC02, envio de arquivos)
> Evidências: conversas do PO em produção (2026-11-13) e leitura do código do protótipo `radar-v0`

## 0. Contexto: o que falhou e por quê

O PO testou três conversas, e o Radar não soube responder a nenhuma delas:

| # | O que o usuário escreveu | O que o Radar fez | Causa no código |
|---|---|---|---|
| 1 | "olá" | Não soube responder | Não existe intenção de conversa. A IA só escolhe entre 9 intenções de dados (`src/deepseek.js`, `INTENCOES`). Uma saudação vira `buscar` ou `fora_dominio`, e as duas terminam em "Não encontrei nada relevante" ou "está fora do que a base pode responder". |
| 2 | "Boa noite, o que vc pode fazer?" | Não soube responder | O Radar não tem como descrever o que sabe fazer. Os textos de ajuda ("Como usar o Radar", "Como o Radar funciona", notas da versão) existem só como HTML no navegador (`public/ajuda.js`, `public/versao.js`). O chat não tem acesso a eles. |
| 3 | Anexou `Produto & Tecnico.docx` e pediu "leia esse arquivo" e depois "leia ele e me diga o que ele é" | Pediu um projeto de destino e depois buscou "leia ele e me diga o que ele é" na base: "Não encontrei nada relevante…" | O anexo só serve para **enviar à base**. A tela decide isso sozinha por expressão regular (`QUER_ENVIAR` e `projetoCitado` em `public/app.js`), e o servidor nunca recebe o arquivo como contexto da conversa. Não existe a skill "ler um arquivo para conversar". A frase então cai em `buscar`. |

**Causa comum:** o chat foi desenhado como um **buscador de projetos com intenções fixas**. Tudo o que não é consulta de dados cai na busca de semelhantes ou numa mensagem de recusa. Não há uma camada de conversa (cordialidade, ajuda, "não entendi, posso ajudar com…") nem uma forma padronizada de acrescentar skills novas.

## 1. Avaliação: estamos aderentes às boas práticas?

Legenda: ✅ aderente · ⚠️ parcial · ❌ ausente. A última coluna diz o que acontece quando acrescentamos skills.

### 1.1 RAG (recuperação com geração)

| Boa prática | Como está hoje | Situação | Impacto ao escalar |
|---|---|---|---|
| Filtrar por permissão **antes** de recuperar e de enviar à IA | `permissionWhere` na busca vetorial e remoção de preço e margem do contexto | ✅ | Nenhum. Manter igual em toda fonte nova. |
| Reescrever a pergunta com o histórico | `understand` devolve `consulta` autossuficiente, com memória de 8 turnos | ✅ | — |
| Citar a evidência sem deixar a IA inventar | A IA devolve o **id da frase**, e a tela mostra a frase literal | ✅ | Repetir o padrão na ajuda e no anexo. |
| Corte de relevância e resposta padrão sem evidência | `semResultado` abaixo do corte | ⚠️ | O corte vale também para frases que não são buscas ("olá"). Resultado: beco sem saída. |
| Reordenação pelo significado | A IA reavalia até 8 candidatos | ✅ | — |
| Embeddings semânticos | Hashing com TF-IDF (`src/embedder.js`), sem modelo neural; a semântica vem dos termos que a IA sugere | ⚠️ | Suficiente para 11 projetos. Com centenas de documentos, a qualidade da recuperação cai. A interface já permite trocar. |
| Uma coleção por fonte de conhecimento | Só existe o corpus de projetos | ❌ | Ajuda de uso e anexos não têm onde morar. Misturar tudo numa coleção só degradaria a busca de projetos. |
| Contexto efêmero por conversa (documento do usuário) | Inexistente | ❌ | Bloqueia o caso 3. |
| Conjunto de avaliação automática (perguntas → resposta esperada) | Só o roteiro manual (103 cenários) | ❌ | Cada skill nova pode quebrar as anteriores sem ninguém perceber. |

### 1.2 Ferramentas e MCP (Model Context Protocol)

O MCP organiza o que um assistente sabe fazer em três tipos: **ferramentas** (nome, descrição, schema de entrada e executor), **recursos** (fontes de leitura) e **prompts** (modelos de conversa). O servidor executa as ferramentas com as permissões de quem pediu.

| Boa prática | Como está hoje | Situação | Impacto ao escalar |
|---|---|---|---|
| A IA só pede, e o servidor executa com as permissões do usuário | `IntentTools` e `runTools` (UC03.23) | ✅ | — |
| Validar os argumentos da IA contra um schema e um vocabulário | `filtrosValidos`, enums de segmento, tecnologia e status | ✅ | — |
| **Um registro único de ferramentas** (nome, descrição, schema, permissão, executor, formato de resposta) | A mesma skill aparece em até 5 lugares: a lista `INTENCOES`, o texto do `UNDERSTAND_PROMPT`, a regra `classificar()`, o encadeamento de `if` em `route()` e outro encadeamento de `if` em `composite()`, que tem seus próprios `toolSchemas` | ❌ | **É o principal risco.** Acrescentar uma skill exige mexer em 5 a 6 pontos de 3 arquivos, e o roteador e a pergunta composta podem divergir. |
| Skills inteiras no servidor | O envio de arquivo pela conversa é decidido no navegador (`QUER_ENVIAR`) | ❌ | O servidor não sabe que existe um anexo. Uma skill que precise do arquivo é impossível hoje. |
| Descobrir capacidades (listar o que o assistente faz) | Inexistente | ❌ | Sem isso não dá para responder "o que você pode fazer?", nem filtrar a resposta por perfil. |
| Fontes de leitura declaradas (recursos) | Só o corpus de projetos, dentro do motor de busca | ⚠️ | Ajuda, notas da versão e anexo precisam entrar como fontes próprias. |

### 1.3 Chat conversacional

| Boa prática | Como está hoje | Situação | Impacto ao escalar |
|---|---|---|---|
| Persona e tom definidos (cordial, objetivo, em português) | Cada prompt descreve uma tarefa técnica; não há instrução de tom nem de apresentação | ❌ | Cada skill nova inventa o próprio tom. |
| Saudação, agradecimento e despedida | Caem na busca | ❌ | Primeira impressão ruim. É o caso 1. |
| Explicar o próprio funcionamento e onde achar ajuda | Inexistente no chat | ❌ | É o caso 2. |
| Saída útil quando não entende | `esclarecer` com opções (UC03.22) ✅, mas o padrão final é `buscar`, que termina em "Não encontrei" | ⚠️ | Quanto mais skills, mais frases caem no lugar errado. |
| Sugestões do próximo passo | Botões "Tente:" e "Explorar projetos" | ✅ | Passar a gerá-las a partir da skill usada. |
| Recusa com caminho | "Está fora do que a base pode responder…" sem oferecer nada | ⚠️ | — |
| Observabilidade por skill | `turnos.jsonl` grava a intenção | ⚠️ | Falta medir, por skill, a taxa de "sem evidência", de esclarecimento e de reformulação. |

### 1.4 Conclusão da avaliação

- **Segurança e fidelidade estão bem resolvidas:** permissão antes da IA, evidência literal e validação de argumentos. Isso deve ser preservado.
- **A estrutura não escala:** as intenções formam uma lista fechada, repetida em vários pontos e misturada com regras do navegador. Hoje, cada skill nova é uma cirurgia.
- **Falta a camada de conversa e faltam duas fontes de conhecimento:** a ajuda do produto e o arquivo do usuário.

Recomendação: antes de criar as skills novas, transformar as 9 intenções atuais num **registro de skills no formato do MCP** com um único despachante. As skills novas entram nesse registro, e a lista de capacidades, os exemplos do roteador e os testes passam a ser gerados dele.

## 2. Casos de uso novos

### UC14 — Camada de conversa do assistente

**Ator:** qualquer perfil com permissão de consulta.
**Princípio:** toda mensagem tem uma resposta útil. "Não encontrei" só aparece para uma busca de verdade, e sempre com um próximo passo.

#### UC14.1 — Cumprimentar e se apresentar
**Gatilhos (exemplos):** "olá", "oi", "bom dia", "boa noite", "tudo bem?", "e aí".
**Fluxo:**
1. O Radar responde de forma cordial, em uma ou duas frases, com o nome do usuário quando souber ("Boa noite, Marina!").
2. Diz em uma frase o que faz ("Sou o Radar: encontro propostas, cases e projetos da base e respondo sobre eles").
3. Oferece de 3 a 4 sugestões clicáveis adequadas ao perfil, por exemplo "Projetos parecidos com…", "Liste os projetos de 2025", "Como envio um arquivo?" e, para o gestor, "Criar projeto a partir de um arquivo".

**Regras:** não faz busca e não mostra "Não encontrei". Se a saudação vier junto com um pedido ("bom dia, quais projetos de varejo?"), cumprimenta em meia frase e atende o pedido.
**Critérios de aceite:**
- [ ] Dado que escrevo "olá", então recebo uma saudação com o que o Radar faz e sugestões clicáveis, sem a mensagem de falta de evidência.
- [ ] Dado que escrevo "bom dia, liste os projetos de varejo", então recebo a listagem, precedida de um cumprimento curto.

#### UC14.2 — Explicar o que sabe fazer
**Gatilhos:** "o que você pode fazer?", "como você funciona?", "ajuda", "o que dá pra perguntar?".
**Fluxo:**
1. O Radar lista as suas capacidades em blocos curtos (buscar parecidos, listar e contar, ficha e comparação, ler um arquivo, enviar arquivo a um projeto, dúvidas de uso), cada uma com um exemplo clicável.
2. Mostra só o que o perfil pode fazer: criar projeto e ver valores aparecem só para o gestor.
3. Termina com onde encontrar mais: links que abrem "Como usar o Radar" e "Como o Radar funciona".

**Regras:** a lista é **gerada do registro de skills** (seção 3), nunca escrita à mão. Uma skill nova aparece automaticamente.
**Critérios de aceite:**
- [ ] Dado o perfil consultor, quando pergunto "o que você pode fazer?", então vejo as capacidades com exemplos e sem as exclusivas do gestor.
- [ ] Dado que uma skill nova foi registrada, então ela aparece nessa resposta sem mudança de texto.

#### UC14.3 — Responder dúvidas de uso do produto
**Gatilhos:** "como envio um arquivo?", "como favorito uma conversa?", "o que é proposta em foco?", "quem pode criar projeto?", "o que mudou nesta versão?".
**Fluxo:**
1. O Radar busca na **base de ajuda** (Como usar, Como funciona, notas da versão e política de dados), numa coleção separada da base de projetos.
2. Responde em até 80 palavras, usando só os trechos encontrados.
3. Mostra a seção usada como fonte, com um link que abre a ajuda nessa seção.

**Regras:** não inventa funcionalidade. Sem trecho relevante, diz que não achou essa informação na ajuda e oferece "Enviar feedback" para registrar a dúvida.
**Critérios de aceite:**
- [ ] Dado que pergunto "como envio um arquivo para um projeto?", então a resposta descreve o bloco "Enviar arquivo" da ficha e o clipe da conversa, e cita a seção da ajuda.
- [ ] Dado que pergunto sobre uma função que não existe, então o Radar diz que não encontrou na ajuda e não inventa passos.

#### UC14.4 — Agradecimento, despedida e reação
**Gatilhos:** "obrigado", "valeu", "tchau", "não gostei", "errado".
**Fluxo:** responde em uma frase e se põe à disposição. Diante de uma crítica ("não gostei", "está errado"), pede desculpas, oferece reformular e mostra o botão "Enviar feedback".
**Critérios de aceite:**
- [ ] Dado que escrevo "valeu", então recebo uma resposta curta e cordial, sem busca.
- [ ] Dado que escrevo "essa resposta está errada", então recebo um pedido de desculpas e a opção de enviar feedback.

#### UC14.5 — Fora do escopo, com cordialidade
**Gatilhos:** "qual a previsão do tempo?", "escreva um poema", "quem ganhou o jogo?".
**Fluxo:** explica em uma frase que isso foge do que o Radar faz, diz o que ele faz e oferece duas sugestões.
**Critério de aceite:**
- [ ] Dado um pedido fora do escopo, então a resposta explica o limite e oferece um caminho, nunca só a recusa.

#### UC14.6 — Não entendi
**Quando:** a frase não se encaixa em nenhuma skill com confiança e não é uma busca clara (frases curtas sem assunto, por exemplo "e isso?" sem contexto, "faz aí").
**Fluxo:** reconhece que não entendeu e, se houver contexto, pergunta qual destas interpretações vale (UC03.22). Sem contexto, mostra 3 capacidades com exemplos.
**Regra:** **a skill padrão deixa de ser `buscar`.** A busca só roda quando a frase tem assunto (`temAssunto`) ou a IA a classifica como busca com confiança.
**Critério de aceite:**
- [ ] Dado que escrevo "faz aí" numa conversa nova, então recebo "Não entendi bem…" com exemplos, e não "Não encontrei nada relevante".

### UC15 — Entender um arquivo anexado para começar a conversa

**Ator:** qualquer perfil com permissão de consulta.
**Princípio:** anexar na conversa **não é o mesmo que enviar à base**. O arquivo vira contexto da conversa, e o envio a um projeto passa a ser uma ação explícita.

#### UC15.1 — Ler e resumir o arquivo anexado
**Gatilhos:** anexar um arquivo junto com "leia", "resuma", "o que é isso?", "me explica esse documento", ou anexar sem texto.
**Fluxo:**
1. O servidor extrai o texto com os mesmos extratores do envio (PDF, PPTX, DOCX, XLSX…; mesmo limite de 15 MB).
2. O texto fica guardado como **contexto efêmero da conversa**: não entra na base, não aparece para outras pessoas e expira com a conversa (ver decisão D2).
3. O Radar responde com:
   - o que o documento é (proposta, apresentação técnica, transcrição…);
   - o cliente e o tema, quando aparecerem;
   - de 3 a 5 pontos principais;
   - as tecnologias citadas.
4. Oferece em seguida: "Buscar projetos parecidos", "Perguntar algo sobre o arquivo", "Enviar para um projeto" e, para o gestor, "Criar projeto com este arquivo".

**Regras:**
- O texto passa pelo filtro de dados sensíveis antes de ir para a IA.
- Um documento longo é dividido em trechos, e só os trechos relevantes vão para a IA.
- A resposta cita trechos literais do arquivo, pelo id, como já é feito com as frases da base.
- Anexar sem texto equivale a "resuma este arquivo".

**Critérios de aceite:**
- [ ] Dado que anexo um DOCX e escrevo "leia esse arquivo", então recebo um resumo com o tipo, o tema e os pontos principais, e **nenhuma pergunta sobre projeto de destino**.
- [ ] Dado que anexei um arquivo na conversa, então ele não aparece na base, nem na lista de projetos, nem para outros usuários.

#### UC15.2 — Perguntar sobre o arquivo
**Gatilhos:** "qual o prazo?", "quais os riscos?", "tem valor?", "quem é o cliente?", quando há um anexo na conversa.
**Fluxo:** a busca é feita nos trechos do anexo (RAG efêmero). O Radar responde com a frase literal como evidência. Sem trecho relevante, diz que o arquivo não traz essa informação.
**Regra:** com anexo ativo, a pergunta vale para o arquivo, a menos que fale explicitamente da base ("e na base, tem algo assim?").
**Critério de aceite:**
- [ ] Dado um arquivo com prazo de 6 meses, quando pergunto "qual o prazo?", então a resposta diz 6 meses e mostra a frase do arquivo.

#### UC15.3 — Usar o arquivo como briefing para buscar parecidos
**Gatilhos:** "tem algo parecido com isso na base?", "já fizemos algo assim?".
**Fluxo:** o resumo do arquivo vira a consulta da busca de semelhantes, igual a uma "Proposta em foco", e a resposta segue o UC03.16.
**Critério de aceite:**
- [ ] Dado um anexo sobre previsão de churn em varejo, quando peço "tem algo parecido na base?", então recebo projetos parecidos e a justificativa cita o tema do arquivo.

#### UC15.4 — Enviar o arquivo à base só por ação explícita
**Fluxo:**
1. O envio ao projeto acontece quando o usuário clica em "Enviar para um projeto" ou diz claramente que quer enviar ("coloca no projeto P003").
2. A partir daí vale o fluxo atual: confirmação do projeto, cartão e aprovação (UC02 e V0.0.2).

**Regra:** a decisão sai do navegador. O servidor recebe o anexo, e a skill de envio é escolhida pelo roteador como qualquer outra.
**Critério de aceite:**
- [ ] Dado que anexo um arquivo e escrevo "leia", então nada é enviado à base. Dado que escrevo "coloca no projeto P003", então o fluxo de envio começa.

## 3. Arquitetura proposta: registro de skills no formato do MCP

### 3.1 Contrato de uma skill

Cada skill é um módulo em `src/skills/<id>.js` que exporta:

| Campo | Para que serve |
|---|---|
| `id`, `nome`, `descricao` | Roteador, lista de capacidades (UC14.2) e futura exposição como ferramenta MCP |
| `exemplos` | Frases que ativam a skill. Alimentam o roteador, a resposta "o que você pode fazer?" e os testes automáticos |
| `naoAtiva` | Frases que **não** devem ativar a skill (testes negativos) |
| `perfis` / `permissao` | Quem pode usar (ex.: `criarProjeto` só para o gestor) |
| `entrada` | Schema JSON dos argumentos, validado antes de executar |
| `requer` | Fontes de que precisa: `projetos`, `ajuda`, `anexo`, `historico` |
| `executar(ctx, args)` | Executa com as permissões do usuário e devolve `{ tipoResposta, dados, resposta, evidencias, sugestoes }` |
| `sugestoesDepois` | Próximos passos mostrados após a resposta |

### 3.2 Peças

1. **Registro** (`src/skills/index.js`): carrega as skills. Dele saem os `toolSchemas`, o catálogo do roteador e a lista de capacidades.
2. **Roteador em dois passos:**
   - Passo 1: a IA escolhe a skill a partir de um catálogo **gerado do registro** (nome, descrição, 3 exemplos), em vez do prompt único que cresce a cada skill. Sem IA, o roteador por regras usa os `exemplos` de cada skill.
   - Passo 2: a skill escolhida extrai os próprios argumentos com o seu schema (chamada de ferramenta).
   - A pergunta composta (UC03.23) usa **o mesmo registro e o mesmo despachante**.
3. **Fontes de conhecimento (recursos):**
   - `projetos`: a coleção atual;
   - `ajuda`: coleção nova, gerada de arquivos Markdown versionados (`conhecimento/ajuda/*.md`), que também passam a alimentar a tela de ajuda, para o texto existir num lugar só;
   - `anexo:<conversa>`: coleção efêmera por conversa.
4. **Persona única:** um trecho de sistema compartilhado (tom cordial, português, limites, nunca inventar) aplicado a toda resposta gerada.
5. **Skill padrão `conversa`:** atende o UC14 e substitui `buscar` como destino de quem não se encaixa em nada.
6. **Avaliação automática:** `test/skills.eval.test.js` percorre os `exemplos` e `naoAtiva` de todas as skills pelo roteador por regras a cada `npm test`. Um `npm run eval` faz o mesmo com a IA real e gera um relatório de acerto por skill.
7. **Observabilidade:** `turnos.jsonl` passa a registrar a skill, a confiança, se houve fallback e se a resposta ficou sem evidência. O painel ganha a taxa por skill.

### 3.3 Por que esse formato

- Acrescentar uma skill vira **criar um arquivo e registrar**, com exemplos e testes no mesmo lugar.
- O prompt do roteador não cresce sem controle: ele recebe só o catálogo enxuto.
- O formato espelha ferramentas e recursos do MCP. Se um dia o Radar for exposto a outros assistentes (Copilot, Claude, Teams), o registro vira um servidor MCP sem reescrita.
- A segurança atual (permissão antes da IA, evidência por id, validação) fica centralizada no despachante, em vez de repetida em cada `if`.

## 4. Plano de desenvolvimento

Cada fase termina com testes automáticos, cenários no roteiro, notas da versão e deploy com o OK do PO.

| Fase | Entrega | Casos de uso | Tamanho | Depende de |
|---|---|---|---|---|
| **0. Fundação** (sem mudar o comportamento) | Registro de skills; as 9 intenções migradas para `src/skills/`; despachante único para o roteador e a pergunta composta; golden set com as frases de teste atuais (cerca de 60) rodando no `npm test` | — | M | — |
| **1. Conversa** | Skill `conversa` (saudação, capacidades, agradecimento, fora do escopo, não entendi) com persona; capacidades geradas do registro e filtradas por perfil; sugestões clicáveis | UC14.1, 14.2, 14.4, 14.5, 14.6 | P | Fase 0 |
| **2. Ajuda no chat** | Ajuda movida para `conhecimento/ajuda/*.md` (a mesma fonte da tela); coleção `ajuda`; skill `duvida_de_uso` com citação e link para a seção | UC14.3 | M | Fase 0 |
| **3. Arquivo na conversa** | Rota que recebe o anexo da conversa, extrai e guarda o texto efêmero; skills `resumir_anexo`, `perguntar_anexo` e `parecidos_com_anexo`; envio à base só por ação explícita; tirar `QUER_ENVIAR` do navegador | UC15.1–15.4 | G | Fase 0 (recomendado depois da 1) |
| **4. Escala** | Roteador em dois passos com chamada de ferramenta para tudo; painel por skill (fallback, sem evidência, esclarecimento); avaliar um modelo de embeddings real quando a base passar de cerca de 100 projetos | — | M | Fases 1–3 |

**Ordem sugerida:** 0 → 1 → 3 → 2 → 4. A fase 1 resolve logo os casos 1 e 2 com pouco esforço, e a 3 resolve o caso 3, que é o que mais atrapalha o uso. A fase 2 melhora a 1, que já aponta para a ajuda por link.

### 4.1 Cenários de roteiro a acrescentar

| Id | Cenário | Esperado |
|---|---|---|
| C46 | "olá" numa conversa nova | Saudação, o que o Radar faz e sugestões; sem "Não encontrei" |
| C47 | "boa noite, o que você pode fazer?" como consultor e depois como gestor | Lista de capacidades com exemplos; criar projeto só para o gestor |
| C48 | "como envio um arquivo para um projeto?" | Resposta curta com a fonte na ajuda e um link que abre a seção |
| C49 | "valeu" e depois "essa resposta está errada" | Agradecimento curto; desculpas com a opção de enviar feedback |
| C50 | "qual a previsão do tempo?" | Explica o limite e oferece um caminho |
| C51 | Anexar um DOCX e escrever "leia esse arquivo" | Resumo do documento; nenhuma pergunta sobre projeto; nada enviado à base |
| C52 | Com o anexo, perguntar "qual o prazo?" e depois "tem algo parecido na base?" | Resposta com a frase do arquivo; depois, projetos parecidos |
| C53 | Com o anexo, escrever "coloca no projeto P003" | Começa o fluxo de envio com confirmação e cartão |

## 5. Riscos e cuidados

- **Dados do arquivo do usuário:** podem ser confidenciais. Por isso o arquivo fica só na conversa de quem anexou, passa pelo filtro de sensíveis e tem prazo para ser apagado (D2).
- **Custo da IA:** resumir um arquivo longo consome mais tokens. Isso é mitigado com trechos e com limite de tamanho, como no envio.
- **Regressão do roteador:** mudar o padrão de `buscar` para `conversa` pode tirar da busca frases que deveriam ir para ela. O golden set da fase 0 é a proteção contra isso.
- **Respostas de ajuda desatualizadas:** com a ajuda vindo dos mesmos arquivos Markdown que alimentam a tela, a tela e o chat não divergem.

## 6. Decisões do PO

| # | Decisão | Opções | Recomendação |
|---|---|---|---|
| D1 | Aprovar a fase 0 (registro de skills) antes das skills novas | Sim / Fazer as skills direto | **Sim.** Custa uma fase, mas cada skill seguinte fica barata e testada. |
| D2 | Por quanto tempo o arquivo anexado fica guardado | Só enquanto a conversa existir / 24 horas / não guardar (reenviar a cada pergunta) | **Enquanto a conversa existir**, e apagado junto com ela. |
| D3 | A resposta de dúvidas de uso pode ser escrita pela IA ou só cita trechos | IA resume os trechos / Só trechos | **A IA resume**, sempre mostrando a seção de origem. |
| D4 | Ordem das fases | 0→1→3→2→4 / outra | **0→1→3→2→4** |
