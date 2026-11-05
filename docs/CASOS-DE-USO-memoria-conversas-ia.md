# NB-02 — Adendo: memória do chat, conversas salvas/favoritas e análise semântica por IA

> Demanda: **radar-propostas-cases** · Etapa: NB-02 — Especificação de Requisitos (adendo 2)
> Status: **Solicitado pelo PO em 2026-10-29 — aguardando validação do comitê do time** junto com a apresentação do V0 (ver DEC-0007)
> Base: [`NB-02-feature-busca-conversacional.md`](./NB-02-feature-busca-conversacional.md) (UC03.1, UC03.3, UC03.14) e [`NB-03-viabilidade.md`](./NB-03-viabilidade.md) (DeepSeek, R10)
> Implementação de referência: protótipo `radar-v0` (Node puro, fora deste repositório)

## 0. Contexto

O PO pediu, para o protótipo V0 que será apresentado ao comitê:
1. **Análise semântica com IA real** (DeepSeek), reduzindo as limitações da busca só por termos.
2. **Memória no chat conversacional**: perguntas de continuação usam o contexto da conversa.
3. **Salvar conversas** e **favoritá-las**.

O item 2 já estava especificado em UC03.3 e UC03.14 (DEC-0003), mas não havia sido implementado no V0. Os itens 1 e 3 são novos e entram como **UC03.16, UC05 e UC06**.

## 1. Casos de uso

### UC03.3 / UC03.14 — Memória da conversa (já especificados; agora implementados)
Os critérios de aceite de `NB-02-feature-busca-conversacional.md` não mudam. Este adendo acrescenta três regras:
- **Tamanho da memória:** a memória considera os **últimos 8 turnos** da conversa.
- **Visibilidade:** o sistema mostra ao usuário como interpretou a pergunta ("Entendi como …") e quais filtros vieram do contexto ("🧠 Contexto da conversa").
- **Escopo:** a memória vale **por conversa**. Uma conversa nova começa sem contexto.

### UC03.16 — Analisar semanticamente pergunta e candidatos com IA
**Ator:** sistema (a pedido de qualquer perfil com permissão de consulta).

**Fluxo principal:**
1. A IA interpreta a pergunta junto com o histórico da conversa e o briefing. Ela devolve:
   - a intenção: buscar, detalhar um resultado anterior ou fora do domínio;
   - a consulta reescrita de forma autossuficiente;
   - segmento, tecnologias, serviços e prazo, restritos ao vocabulário controlado da base;
   - termos relacionados para ampliar a recuperação.
2. A base vetorial recupera candidatos com a consulta enriquecida, **já filtrados por permissão** (UC03.5).
3. A IA reavalia os melhores candidatos (até 8) pelo **significado** e atribui a cada um:
   - uma relevância de 0 a 1;
   - uma justificativa;
   - o id da frase que serve de evidência.
4. A relevância da IA compõe o fator "Descrição / objetivo / escopo" do score (RF19): 65% IA + 35% vetorial. Os outros fatores e pesos não mudam.
5. A IA escreve a resposta com **insights para a nova proposta**: referências a reaproveitar, riscos e lições (inclusive de propostas perdidas) e áreas complementares, citando os projetos.

**Regras:**
- A IA recebe **apenas trechos que o usuário pode ver**. Para perfis sem acesso a valores, as linhas de preço e margem são removidas antes do envio.
- A evidência exibida é sempre uma **frase literal** da base. A IA escolhe o id da frase e não escreve o texto (UC03.9).
- Sem resultados acima do corte, a resposta é a mensagem padrão de falta de evidência, nunca um texto livre da IA (UC03.12).
- **Fallback:** se a IA estiver indisponível (sem internet, chave inválida ou timeout), a busca continua no modo offline e o usuário é avisado.

**Critérios de aceite:**
- [ ] Dado que pergunto "distribuidora de luz que reduziu furto de energia" sem usar os termos da base, quando a IA está ativa, então o projeto de perdas não técnicas aparece em 1º lugar.
- [ ] Dado um perfil consultor, quando a busca envia contexto para a IA, então nenhum trecho de projeto confidencial nem linha de preço ou margem é enviado.
- [ ] Dado que a IA está indisponível, quando pergunto algo, então recebo resultados do modo offline e um aviso de que a IA não respondeu.
- [ ] Dado que pergunto algo fora do domínio, quando a IA classifica a intenção, então o sistema informa que está fora do escopo da base, sem resultados.

### UC05 — Salvar e retomar conversa
**Ator:** qualquer perfil com permissão de consulta.

**Fluxo principal:**
1. A conversa é **salva automaticamente** na primeira pergunta. O título padrão é a primeira pergunta e pode ser editado.
2. O sistema grava a conversa com perguntas, respostas, resultados, oportunidade vinculada e datas.
3. A conversa aparece na lista "Conversas" do usuário, ordenada por favoritas e, depois, pelas mais recentes. A lista pode ser filtrada por texto.
4. Ao abrir uma conversa salva, o sistema restaura todo o histórico. Novas perguntas **continuam com a memória** da conversa.
5. O usuário pode renomear (editar o título e pressionar Enter) ou excluir a conversa. A exclusão pede confirmação com um segundo clique.

**Regras:**
- Não existe mais botão "Salvar" (revisão de UX de 30/10/2026): o usuário só decide se a conversa é **favorita** (UC06).
- A barra de pergunta mostra "lembrando N perguntas" e permite **esquecer** o contexto, o que começa uma conversa nova.
- Uma conversa pertence ao usuário que a criou: **outro perfil não lista, não abre, não altera e não continua** essa conversa.
- Uma conversa salva continua sendo atualizada automaticamente a cada nova pergunta.

**Critérios de aceite:**
- [ ] Dado que fiz perguntas e salvei a conversa, quando reinicio o sistema e abro a lista, então ela está lá com todos os turnos.
- [ ] Dado que reabro uma conversa salva, quando faço uma pergunta de continuação, então o sistema usa o contexto dos turnos anteriores.
- [ ] Dado que uma conversa foi salva pelo perfil gestor, quando o consultor lista ou tenta abrir pelo id, então ela não aparece e o acesso é negado.

### UC06 — Favoritar conversa
**Ator:** qualquer perfil com permissão de consulta.

**Fluxo principal:**
1. O usuário clica na ☆ da conversa atual ou de um item da lista.
2. A conversa fica marcada com ★ e passa para o topo da lista.
3. O filtro "Só favoritas" mostra apenas as favoritas.
4. Clicar de novo na ★ remove a conversa dos favoritos. Ela continua salva.

**Regras:** favoritar uma conversa ainda não salva também a salva.

**Critérios de aceite:**
- [ ] Dado que favoritei uma conversa, quando abro a lista, então ela aparece no topo com ★.
- [ ] Dado que marquei "Só favoritas", quando a lista carrega, então só as conversas favoritas aparecem.

## 2. Impactos

| Item | Impacto |
|---|---|
| Modelo de dados (insumo DEV-01) | "Sessão de Conversa" ganha título, salva, favorita e data de atualização. "Turno" guarda a consulta reescrita, a intenção e o provedor de IA usado. |
| Auditoria (UC03.15) | Cada turno registra a consulta interpretada, a intenção, se foi continuação e se a IA respondeu ou houve fallback. |
| Riscos | R10 (API externa / LGPD) se concretiza no V0: trechos da base são enviados à DeepSeek. No V0 os dados são **fictícios**. Com dados reais, depende de aprovação de segurança/jurídico ou de um modelo hospedado internamente. |
| Segredos | A chave da DeepSeek fica só no `.env` local, ignorado pelo controle de versão. A chave foi compartilhada em chat e deve ser **rotacionada** depois da demo. |
| Embeddings | DeepSeek não oferece API de embeddings. A recuperação continua com o embedder local; a semântica entra na interpretação e na reavaliação dos candidatos. |
