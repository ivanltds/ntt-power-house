# NB-02 — Adendo: exportação de proposta, permissões de cadastro, registro de atividades e "Meus projetos"

> Demanda: **radar-propostas-cases** · Etapa: NB-02 — Especificação de Requisitos (adendo 4)
> Status: **Solicitado pelo PO em 2026-10-30 — aguardando validação do comitê do time** junto com a apresentação do V0
> Base: [`CASOS-DE-USO-upload-cadastro-consultas.md`](./CASOS-DE-USO-upload-cadastro-consultas.md) (UC02, UC07, UC08) e [`MER-base-de-conhecimento.md`](./MER-base-de-conhecimento.md)
> Implementação de referência: protótipo `radar-v0`

## 0. Contexto

O PO pediu:
1. **Exportar uma proposta** em dois formatos de documento, cada um com seu template de layout:
   - **apresentação para o cliente**, em PPTX ou PDF;
   - **resumo executivo**, em DOCX ou PDF.
   Antes de gerar, o usuário escolhe quais informações entram no documento.
2. **Cliente novo só pelo gestor:** o campo de cliente deve permitir cadastrar um cliente que ainda não existe, mas só para o gestor.
3. **Registro de atividades:** fica registrado quem criou cada item e quem editou campos ou criou opções. Há uma tela para consultar.
4. **Cadastro de projetos só pelo gestor.**
5. **Filtro "Meus projetos"** no topo dos filtros da exploração.

Os itens 1 e 3 são novos: entram como **UC10** e **UC11**. Os itens 2, 4 e 5 alteram **UC07**, **UC02.9** e **UC08**.

### Perfis e capacidades

| Capacidade | Consultor | Gestor |
|---|---|---|
| Consultar, perguntar, explorar e baixar | ✔ (sem valores e sem confidencial) | ✔ |
| Enviar documento para um projeto **existente** | ✔ | ✔ |
| Editar projeto e informações de documento | ✔ (sem valores) | ✔ |
| **Cadastrar projeto** (formulário, "Usar como base" ou "Criar projeto novo" no envio) | — | ✔ |
| **Cadastrar cliente novo** | — | ✔ |
| Exportar apresentação e resumo executivo | ✔ (sem valores e sem confidencial) | ✔ |
| **Consultar o registro de atividades** | — | ✔ |

As regras valem no servidor, não só na tela: um pedido de um perfil sem a capacidade é recusado com uma mensagem clara.

---

## 1. UC10 — Exportar proposta (apresentação e resumo executivo)

**Ator:** qualquer perfil com acesso ao projeto.
**Gatilho:** no detalhe do projeto, botão **Exportar**.

**Fluxo principal:**
1. O usuário escolhe o **modelo**:
   - **Apresentação para o cliente:** slides em 16:9, para apresentar ou enviar ao cliente.
   - **Resumo executivo:** documento A4 de uma a duas páginas, para decisores.
2. O usuário escolhe o **formato**: PPTX ou PDF para a apresentação; DOCX ou PDF para o resumo.
3. O sistema lista as **seções disponíveis**, já marcadas conforme o modelo. Seções sem conteúdo no projeto aparecem desabilitadas com o motivo (ex.: "sem riscos cadastrados").
4. O usuário desmarca o que não quer levar. Ele pode editar o **título** do documento e informar **para quem** é (nome do cliente ou da área).
5. O usuário clica em **Gerar**. O arquivo é baixado com nome no formato `Cliente - Titulo - Apresentacao.pptx`.
6. A exportação fica no registro de atividades (UC11) e nas métricas do piloto.

**Seções disponíveis:**

| Seção | Conteúdo | Apresentação | Resumo executivo |
|---|---|---|---|
| Capa | título, cliente, segmento, data e "Preparado por" | slide de capa | cabeçalho |
| Contexto e desafio | contexto (descrição) do projeto | ✔ | ✔ |
| Objetivo | objetivo do projeto | ✔ | ✔ |
| Solução proposta | tecnologias e serviços | ✔ | ✔ |
| Escopo e prazo | prazo em meses, status, responsável | ✔ | ✔ |
| Investimento | valor e margem | ✔ só gestor | ✔ só gestor |
| Resultados | resultados/KPIs dos documentos | ✔ | ✔ |
| Cases de referência | projetos parecidos (UC07) com cliente e status | ✔ | ✔ |
| Riscos e mitigação | riscos dos documentos | ✔ | ✔ |
| Lições aprendidas | lições dos documentos | — (desmarcada por padrão) | ✔ |
| Fontes | documentos usados, com tipo e rótulo de confiança | ✔ (último slide) | ✔ (rodapé) |

**Templates de layout:**
- **Apresentação:**
  - capa com faixa na cor da marca e título grande;
  - um slide por seção, com título, até 6 tópicos e numeração de página;
  - listas longas continuam no slide seguinte ("(cont.)");
  - rodapé com cliente e "Radar · dados fictícios".
- **Resumo executivo:**
  - cabeçalho com título, cliente e data;
  - quadro de "Ficha" (segmento, status, prazo, responsável e, para o gestor, investimento);
  - seções com título e texto corrido ou tópicos;
  - rodapé com as fontes e a data de geração.
- **O PDF segue o mesmo layout** do PPTX ou do DOCX correspondente.

**Regras:**
- **R1** Só entra o que o perfil pode ver: valores e margens nunca saem para quem não tem permissão, e documentos confidenciais não aparecem para quem não os enxerga, nem como fonte nem como projeto de referência.
- **R2** O conteúdo vem só da base (projeto, documentos e entidades). A exportação **não usa IA para criar texto**, então não há risco de inventar números.
- **R3** Os arquivos são gerados no servidor, sem dependências externas (PPTX e DOCX são OOXML; o PDF usa fontes padrão com acentuação em português).
- **R4** Nada é guardado no servidor: o arquivo é gerado e entregue na hora.

**Critérios de aceite:**
- [ ] Dado um projeto, quando exporto a apresentação em PPTX, então o arquivo abre no PowerPoint com capa e um slide por seção marcada.
- [ ] Dado que desmarco "Riscos", quando gero o resumo executivo, então a seção de riscos não aparece.
- [ ] Dado um consultor, quando exporta qualquer modelo, então não aparecem valor nem margem e a opção "Investimento" não é oferecida.
- [ ] Dado que escolho PDF, quando abro o arquivo, então os acentos aparecem corretamente e o layout segue o modelo escolhido.
- [ ] Dado que exportei, quando o gestor abre o registro de atividades, então vê quem exportou, qual modelo e formato e quando.

---

## 2. UC11 — Registro de atividades

**Ator:** sistema (grava) e gestor (consulta).

**O que é registrado** (quem, quando, o quê, antes e depois):

| Ação | Exemplos |
|---|---|
| **Criar** | projeto cadastrado (formulário, "Usar como base" ou envio), documento indexado, cliente novo, opção nova de tecnologia, serviço ou segmento |
| **Editar** | cada campo alterado em projeto ou documento, inclusive listas de entidades (já registrado em UC07.4) |
| **Excluir** | envio descartado |
| **Exportar** | apresentação ou resumo executivo gerado (modelo, formato e seções) |

**Tela "Registro de atividades"** (menu ⋮, só gestor):
- uma linha por evento, do mais recente ao mais antigo: data e hora, usuário, ação, item (com link para o projeto quando houver), campo, antes → depois;
- filtros por ação, tipo de item, usuário, período e texto livre;
- 50 eventos por página.

**Regras:**
- **R1** O registro é somente de inclusão: não há tela nem API para editar ou apagar eventos.
- **R2** O detalhe do projeto mostra **"Criado por … em …"** na ficha. O histórico do projeto continua mostrando as edições dele e dos documentos dele.
- **R3** Os itens criados pela carga inicial da base piloto aparecem como "Base piloto", sem usuário.
- **R4** Limitação do V0: o login é compartilhado. O usuário registrado é o perfil escolhido em "Ver como". Com SSO, passa a ser a pessoa.

**Critérios de aceite:**
- [ ] Dado que o gestor cadastra um cliente novo, quando abre o registro, então vê "Criar · cliente" com o nome e o usuário.
- [ ] Dado que alguém altera o prazo de um projeto, quando o gestor filtra por "Editar", então vê o campo, o valor antigo e o novo.
- [ ] Dado um consultor, quando tenta abrir o registro (tela ou API), então o acesso é negado.

---

## 3. Alterações em casos existentes

### UC07 — Cadastrar projeto: só gestor
- **UC07.5** "+ Projeto", "Usar como base" e "Cadastrar projeto" (estado vazio) só aparecem para o gestor. Para o consultor, "Usar como base" vira **"Copiar escopo"**.
- No envio (UC02.9), a opção **"Criar projeto novo"** só aparece para o gestor. Se o Radar não achar um projeto compatível, o consultor escolhe um existente ou pede o cadastro a um gestor.
- O servidor recusa o cadastro de projeto feito por um perfil que não seja gestor.

### UC07.6 — Seletor de cliente com cadastro de cliente novo (só gestor)
- O campo **Cliente** vira um seletor com busca entre os clientes existentes, sem diferenciar acentos e maiúsculas.
- Se o texto digitado não corresponder a nenhum cliente:
  - **gestor:** aparece **"+ Cadastrar cliente “…”"**, que cria o cliente ao salvar o projeto e registra a criação (UC11);
  - **consultor:** aparece "Cliente não encontrado. Peça a um gestor para cadastrar."
- O servidor recusa um cliente inexistente enviado por quem não é gestor, inclusive na edição de projeto.
- O mesmo vale para opções novas de **tecnologia e serviço**: só o gestor cria termos novos, e os demais escolhem da lista.
  - No cadastro e na edição, o servidor recusa termos novos vindos de quem não é gestor.
  - No envio (UC02), termos novos sugeridos pela leitura automática aparecem para o consultor como "sugestão para o gestor". Eles não são adicionados ao projeto, mas ficam no registro para avaliação.

### UC08.6 — Filtro "Meus projetos"
- No topo do painel de filtros, um botão liga e desliga **Meus projetos**.
- "Meus" são os projetos em que o usuário:
  - **criou** o projeto, ou
  - é o **responsável** (o nome do responsável é igual ao nome do usuário), ou
  - **enviou ou revisou** um documento.
- O filtro se combina com os demais e conta no indicador de filtros ativos.
- Sem projetos nessa condição, o estado vazio explica o critério.

**Critérios de aceite:**
- [ ] Dado que o gestor cadastrou um projeto, quando ativa "Meus projetos", então o projeto aparece.
- [ ] Dado um consultor que enviou um documento para o P003, quando ativa o filtro, então vê o P003.

---

## 4. RN-V0-01 — Aviso de dados sensíveis (IA externa)

> Solicitado pelo PO em 2026-10-30. Vale enquanto o Radar usar uma LLM externa à NTT (DeepSeek).

**Motivo:** o texto dos documentos enviados, as descrições usadas em "Sugerir campos" e o conteúdo dos projetos (nas respostas do chat) são enviados à IA externa. Dados sensíveis da NTT ou de clientes poderiam sair da empresa.

**Regras:**
- **Aviso fixo:** a área de envio e o formulário de projeto mostram sempre a faixa **"Não envie dados sensíveis da NTT"**, com o motivo e a orientação de usar só dados fictícios ou públicos.
- **Confirmação no envio:** a cada envio de arquivos (botão ou arrastar), uma janela lista o que não pode ser enviado e os nomes dos arquivos. O botão **Enviar** só habilita depois de marcar "Confirmo que o conteúdo não tem dados sensíveis da NTT nem de clientes". Cancelar não envia nada.
- **Confirmação no cadastro:** o formulário de projeto novo tem a mesma caixa, obrigatória para **Cadastrar** e para **Sugerir campos**.
- **No servidor:** envio, cadastro de projeto e sugestão de campos sem a confirmação são recusados. Cada aceite fica registrado nos eventos de auditoria (`aceite_dados_sensiveis`, com contexto e usuário).

**Critérios de aceite:**
- [ ] Dado que escolho um arquivo, quando a janela de aviso abre, então só consigo enviar depois de marcar a confirmação.
- [ ] Dado que cancelo o aviso, quando volto à tela, então nenhum arquivo foi enviado.
- [ ] Dado o formulário de projeto novo sem a confirmação marcada, quando clico em Cadastrar ou Sugerir campos, então o navegador pede a confirmação e nada é enviado.
- [ ] Dado uma chamada direta à API sem a confirmação, quando envio um arquivo, então recebo erro 400 com o motivo.
