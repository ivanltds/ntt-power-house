# NB-02 — Adendo 7: one page, apresentação de cases, conversa na ficha, Insights e notícias

> Demanda: **radar-propostas-cases** · Etapa: NB-02 — Especificação de Requisitos (adendo 7)
> Status: **proposta para validação.** Tickets de sugestão CR-075 a CR-079 abertos no Radar em 19/11/2026 (seção 9). O PO ainda não aprovou, e Kelly e Renato ainda não validaram.
> Fonte: reunião "Alinhamento Executivo · Power House" de 19/11/2026, com Kelly Cristina (do) Nascimento, Renato Tost Fajardo, Isabelle Alves Silva, Vania (Aiko) Ogawa Yogui, Andre Yuji Oku, Pedro Rosa Santos, Marcelo Maccaferri e Ivan (Lucio) Teles (De) Souza.
> Evidências: resumo cronológico do Copilot da reunião completa, transcrição da primeira parte (08h01, 1h02) e leitura do código do `radar-v0` (V0.0.2).
> Limite da fonte: a segunda parte (demonstração do MVP e feedback da Kelly) só existe no **resumo do Copilot**, porque a transcrição foi parada aos 2 minutos. Não há falas literais nem marcas de tempo desse trecho. O que não está no resumo e foi inferido aparece como **[inferido]** e entra nas perguntas em aberto (seção 8).

## 0. Os 5 pontos e os casos de uso da Kelly

A Kelly organizou o Radar em **três grandes casos de uso**, nesta sequência: **cases → apresentação comercial → nova proposta**.

| Caso de uso da Kelly | O que ela pediu | Ponto deste adendo |
|---|---|---|
| **A. Cases / One Pages** | Achar rápido um case relevante para uma conversa com cliente e gerar uma one page: contexto, desafio, objetivo, solução, benefícios, resultados, duração, investimento, setor e cliente (quando permitido) e a origem da informação. Quando o cliente não pode ser citado: "grande cliente do setor financeiro". | **Ponto 1** |
| **B. Apresentações comerciais** | Gerar rápido uma apresentação para conversa com cliente. Exemplo dela: *"uma apresentação de uns 10 slides sobre fraude em seguros"* com cases internos. A dor: o executivo descobre poucas horas antes que terá a conversa. | **Ponto 2** |
| **C. Apoio à nova proposta** | Usar uma RFP nova junto com propostas parecidas anteriores para gerar conteúdo e insights para a nova proposta. | **Ponto 3** é o meio: a conversa na ficha, com o foco na proposta aberta, é onde o C acontece (ver 3.6). |

Os pontos 4 e 5 vêm do feedback dela sobre os Insights: filtros na linguagem da NTT DATA e ano fiscal (ponto 4), e notícias e tendências do setor (ponto 5). O ponto 4 também usa o que o Renato disse sobre ganhas e perdidas.

## 1. Dores levantadas na reunião

| # | Dor | Quem disse | Sustenta |
|---|---|---|---|
| D1 | A base é rica, mas o conhecimento é difícil de achar e reutilizar. No Maná, sem saber a oportunidade ou o cliente, é preciso abrir registro por registro. | Kelly e Renato (fechamento) | Todos |
| D2 | Achar uma referência leva **dias ou até uma semana**, não minutos (a pesquisa de campo foi ajustada por isso). | Renato | 1, 2, 3 |
| D3 | Achar rápido um case para citar numa conversa com cliente, em formato apresentável, sem expor um cliente que não pode ser citado. | Kelly | 1, 2 |
| D4 | Preparar em poucas horas uma conversa com cliente sobre um tema, com experiências da NTT DATA. | Kelly | 2 |
| D5 | Replicar o que deu certo: propostas **ganhas** como régua. Aprender com as **perdidas** (por que perdemos) e com os problemas de execução. | Andre e Renato | 2, 3, 4 |
| D6 | Os números e filtros precisam falar a língua da organização (setor, unidade, foundation, prisma, FY de abril a março). Do contrário, o executivo não confia nem usa. | Kelly | 4 |
| D7 | Ver só o histórico não basta. O executivo quer **sinais de oportunidade** do setor: eventos, notícias, tendências. | Kelly | 5 |
| D8 | **O Radar não pode criar trabalho manual.** O que depende de cadastro manual começa bem e depois é abandonado. Depois do MVP, o Radar deve consumir as fontes que já existem. | Renato | Restrição para todos |
| D9 | O valor deve ser **qualidade e menos risco**, não só velocidade: reaproveitar sem critério aumenta o risco. | Renato | 1, 2, 3 |

**Restrição D8 aplicada aqui:** nenhuma das 5 soluções pede ao usuário um cadastro novo. Elas usam o que já está na base: ficha, documentos e entidades extraídas. Quando falta dado, a solução **mostra a lacuna**; não pede formulário nem inventa.

## 2. Personas

| Persona | Perfil no Radar | Momento |
|---|---|---|
| **Executivo comercial** (ex.: Kelly) | gestor | Vai encontrar um cliente amanhã ou daqui a algumas horas |
| **Gerente de proposta / pré-venda** | gestor ou consultor | Recebeu uma RFP e está montando a resposta |
| **Consultor** | consultor (sem preço e margem, sem confidenciais) | Precisa de um case para um material |
| **Diretoria e liderança comercial** | gestor | Revisão de carteira e definição de onde atacar |
| **Qualidade de propostas** (ex.: Renato) | gestor | Revisa riscos antes do L1 e do L2 |

---

## 3. Ponto 1 — Skill "gerar one page de case"

### 3.1 Problema
D3, D2 e D9. A exportação atual (UC10, `src/export/modelo.js`) tem dois modelos: **Apresentação para o cliente** (várias seções) e **Resumo executivo**. Nenhum dos dois é uma **página única de case** no formato que o comercial usa. Também não existe um pedido pelo chat ("faz a one page do P003"), nem tratamento de cliente que não pode ser citado.

### 3.2 O que existe hoje e pode ser reaproveitado
- `buildContent()` já monta contexto, objetivo, solução, escopo e prazo, investimento, resultados, cases, riscos, lições e fontes, respeitando permissões (R1 e R2).
- Renderizadores PPTX e PDF.
- Tipos documentais na análise de upload (proposta, case, apresentação…) e nível de confiança (Oficial, Enviado, Interno…).
- Registro de skills (`src/skills/index.js`, adendo 6).

### 3.3 Solução proposta
1. **Modelo novo `onepage`** em `MODELOS`. Uma página (1 slide PPTX ou 1 página PDF) com os blocos que a Kelly listou, em grade fixa:
   - cabeçalho: título do case, setor e cliente (ou cliente anônimo), duração;
   - **Contexto** · **Desafio** · **Objetivo**;
   - **Solução** (com tecnologias e serviços como selos);
   - **Benefícios** · **Resultados** (números em destaque quando houver);
   - **Investimento**: só para gestor, e só se o usuário marcar. Para consultor, o bloco não aparece (não aparece como "oculto");
   - rodapé **Fonte**: documentos usados, com tipo, versão e data, e link para o projeto no Radar.
2. **Prioridade das fontes [inferido]:** documento de tipo **case** anexado ao projeto, depois apresentação comercial, depois proposta, depois campos da ficha. Se o projeto tiver um "use case" anexado (pedido do PO), ele é a fonte principal e os demais só completam.
3. **Cliente citável:** se o projeto for confidencial, ou se o cliente não estiver liberado para citação, o cliente vira **"grande cliente do setor &lt;setor&gt;"** (ou "do segmento &lt;segmento&gt;"). O nome também é trocado no texto dos blocos (não basta tirar do cabeçalho). Antes de gerar, o usuário vê a opção "citar o nome do cliente", desmarcada por padrão e desabilitada quando não é permitido.
4. **Sem invenção:** um bloco sem evidência na base sai como "Não há registro de &lt;benefícios&gt; neste projeto". Na prévia, o bloco aparece destacado com o aviso "complete antes de enviar". A IA resume e reescreve; não cria fatos nem números.
5. **Acionamento:**
   - **chat:** skill `gerar_onepage` ("gera a one page do P003", "quero um case de antifraude em uma página");
   - **ficha do projeto:** Exportar → One page;
   - **card do resultado da busca:** ação "One page".
6. **Prévia antes de baixar:** a one page aparece na tela, com os blocos editáveis em texto curto (a edição vale só para este arquivo e não altera a base). Depois o usuário baixa em PPTX ou PDF.
7. **Template:** usar os exemplos que a Kelly ficou de enviar. Até lá, layout neutro. O design NTT DATA fica para quando houver o template corporativo, como já combinado na demonstração.

### 3.4 Regras de negócio
- R1P1. A one page respeita o perfil: o consultor nunca recebe valor nem margem, e projeto confidencial não pode ser escolhido por quem não tem acesso.
- R1P2. O cliente só aparece pelo nome quando o projeto não é confidencial **e** o gestor marca "citar o cliente" **[inferido: confirmar a regra de citação com a Kelly]**.
- R1P3. Todo fato da one page tem uma fonte na base. O rodapé lista os documentos usados.
- R1P4. Só se gera one page de projetos **Vendida, Em execução ou Entregue**. Para outros status, o Radar avisa "este projeto não é um case (status: Perdida)" e oferece "gerar mesmo assim como referência interna", com o selo **"Uso interno"** **[inferido]**.
- R1P5. A geração fica na auditoria (quem, qual projeto, se o cliente foi citado).

### 3.5 Casos de uso

**UC-P1.1 — Executivo pede uma one page pelo chat antes de uma reunião**
- *Persona:* executivo comercial (gestor). *Gatilho:* reunião amanhã com uma seguradora.
1. No chat: "tem algum case de antifraude em seguros? gera uma one page".
2. O Radar busca os parecidos, filtrando os ganhos e entregues, e mostra os 3 melhores com o percentual de semelhança.
3. O executivo escolhe o P007. O Radar abre a prévia: o cliente aparece como "grande cliente do setor de seguros", porque o projeto é confidencial, e o bloco Benefícios tem o aviso "sem registro".
4. Ele completa Benefícios na prévia e baixa o PPTX.
- *Resultado esperado:* uma one page em menos de 2 minutos, com fonte e sem expor o cliente. *Dores:* D2, D3.

**UC-P1.2 — Projeto com use case anexado**
- *Persona:* gerente de proposta. *Pré-condição:* o P003 tem o documento "Use case – churn.pdf" (tipo case).
1. Na ficha do P003: Exportar → One page.
2. O Radar usa o use case como fonte principal e completa duração e tecnologias pela ficha.
3. O rodapé mostra "Fonte: Use case – churn.pdf (Oficial, v2, 10/09/2026) · ficha P003".
- *Resultado esperado:* o conteúdo do use case não é contrariado pela ficha. Se houver conflito (ex.: duração diferente), a prévia aponta a divergência, como o upload já faz. *Dor:* D9.

**UC-P1.3 — Consultor gera uma one page**
1. O consultor pede a one page de um projeto não confidencial.
2. O bloco Investimento não aparece, e a opção "citar o cliente" fica desabilitada **[inferido]**.
- *Resultado esperado:* nenhum valor nem margem no arquivo, em nenhum formato.

**UC-P1.4 — Projeto sem dados suficientes**
1. O usuário pede a one page de um projeto que só tem a ficha, sem documentos.
2. O Radar avisa: "só há dados da ficha: Desafio, Benefícios e Resultados ficarão vazios" e oferece enviar um documento ou gerar mesmo assim.
- *Resultado esperado:* nada é inventado, e o usuário entende o que falta (D8: o Radar mostra a lacuna, mas não obriga a cadastrar).

### 3.6 Critérios de aceitação
- Dado um projeto Entregue com um documento case, quando o gestor pede "one page do P00X", então o Radar mostra a prévia com os 10 blocos e a fonte, e permite baixar PPTX e PDF com 1 página.
- Dado um projeto confidencial, quando a one page é gerada, então o nome do cliente não aparece em nenhum bloco nem nos metadados do arquivo.
- Dado o perfil consultor, quando a one page é gerada, então o arquivo não contém valor nem margem.
- Dado um bloco sem evidência, quando a prévia abre, então o bloco aparece marcado como vazio e o texto não traz números que não estejam na base.

---

## 4. Ponto 2 — Skill "apresentação de cases" (propostas ganhas parecidas → deck de one pages)

### 4.1 Problema
D4 e D5. O exemplo da Kelly: *"10 slides sobre fraude em seguros com cases internos"*, para uma conversa marcada em poucas horas. Hoje o usuário consegue buscar os parecidos e exportar **um projeto por vez**. Não há como juntar vários cases num só material.

### 4.2 Solução proposta
1. **Skill `apresentacao_cases`** no chat. Aceita um tema ("fraude em seguros"), um cliente ou oportunidade em foco, ou "a lista acima" (a última resposta de busca).
2. **Seleção dos cases:**
   - a busca de semelhantes filtra **status ganho** (Vendida, Em execução, Entregue);
   - a ordem segue a semelhança, com bônus para "Entregue com resultado" e para ⭐ bom modelo;
   - o Radar mostra a lista com caixas de seleção (padrão: os 5 melhores), o percentual e o motivo de cada um;
   - o usuário tira ou inclui cases antes de gerar.
3. **Estrutura do deck** (cerca de 8 a 12 slides, ajustável):
   1. Capa: tema, cliente-alvo (opcional) e data;
   2. **"O que a NTT DATA já fez em &lt;tema&gt;"**: visão consolidada com nº de projetos, setores, tecnologias recorrentes e resultados em destaque, tudo da base;
   3. a N: **uma one page por case** (o mesmo modelo do ponto 1, com as mesmas regras de cliente citável e de permissão);
   - N+1. **Aprendizados** (opcional, desmarcado por padrão): lições e riscos que se repetem nos cases. O Radar avisa que este slide é para uso interno;
   - N+2. Fontes.
4. **Prévia em lista de slides,** com opção de reordenar, remover um slide e regenerar um case.
5. **Formato:** PPTX (para editar no PowerPoint) e PDF.
6. **Sem cases ganhos suficientes:** o Radar avisa "só achei 1 case ganho em fraude em seguros; há 2 em fraude bancária: quer incluir?". Ele amplia por setor ou tecnologia vizinha, deixando claro de onde veio cada caso.

### 4.3 Regras de negócio
- R2P1. Só entram cases com status ganho. Perdidas não viram slide de cliente. Elas podem alimentar o slide de Aprendizados, que é interno.
- R2P2. Cada one page do deck segue as regras R1P1 a R1P3.
- R2P3. O slide consolidado só usa números contados na base, e a contagem respeita o perfil (o consultor não conta confidenciais).
- R2P4. Limite inicial de **8 cases por deck**, por causa do tempo de geração e da memória do servidor (t3.micro, 220 MB) **[inferido]**.

### 4.4 Casos de uso

**UC-P2.1 — Conversa com cliente em poucas horas (o exemplo da Kelly)**
- *Persona:* executivo comercial. *Gatilho:* às 14h ele descobre que às 17h fala com uma seguradora sobre fraude.
1. No chat: "monta uma apresentação de uns 10 slides sobre fraude em seguros com nossos cases".
2. O Radar lista 6 cases ganhos (2 de seguros e 4 de antifraude bancária), com semelhança e motivo, e 5 vêm marcados.
3. Ele desmarca um case de 2021 e gera.
4. A prévia mostra capa, consolidado, 4 one pages e fontes. Ele reordena e baixa o PPTX.
- *Resultado esperado:* um deck pronto em menos de 5 minutos, que ele ajusta no PowerPoint. *Dores:* D4, D2.

**UC-P2.2 — A partir de uma busca já feita**
1. O usuário pergunta "projetos parecidos com a oportunidade da Seguradora X" e recebe a lista.
2. Em seguida: "transforma esses em apresentação".
3. O Radar usa a lista da última resposta e já tira os não ganhos, avisando quantos saíram e por quê.
- *Resultado esperado:* continuidade da conversa, sem refazer a busca.

**UC-P2.3 — Tema sem cases ganhos**
1. "Apresentação sobre computação quântica em varejo".
2. O Radar diz que não há case ganho, mostra o que existe (propostas em aberto ou perdidas, só para consulta interna) e não gera o deck de cliente.
- *Resultado esperado:* o Radar não monta um material comercial sem prova (o risco do quadrante "Risco" dos Insights). *Dor:* D9.

### 4.5 Critérios de aceitação
- Dado um tema com 3 ou mais cases ganhos, quando o usuário pede a apresentação, então o Radar pede a confirmação da seleção antes de gerar, e o PPTX tem capa, consolidado, uma one page por case e fontes.
- Dado um case confidencial no deck, então o cliente aparece anônimo naquele slide e no slide consolidado.
- Dada uma lista com projetos perdidos, quando o usuário pede "transforma em apresentação", então os perdidos não entram nos slides de case e o Radar diz quantos saíram.

---

## 5. Ponto 3 — Conversa dentro da ficha do projeto

### 5.1 Problema
Hoje o botão **Perguntar** da ficha leva o usuário para a tela de Conversas, com o título e o cliente escritos na caixa. Ele perde a ficha de vista, precisa terminar a frase e a pergunta não fica ligada ao projeto. Para o caso C da Kelly (apoiar a nova proposta), o natural é conversar **sobre a proposta aberta, ao lado dela**.

### 5.2 Solução proposta
1. **Seção "Conversar sobre este projeto"** na ficha, recolhível, no fim da coluna principal ou como painel lateral:
   - mostra as **últimas 3 trocas** da conversa ligada ao projeto e uma caixa de mensagem;
   - atalhos de acordo com o status:
     - **proposta aberta:** "Projetos parecidos", "Riscos de projetos parecidos", "Quem já fez algo parecido", "Montar apresentação de cases", "Comparar com a RFP anexada";
     - **projeto ganho ou entregue:** "Gerar one page", "Resumir resultados";
   - botão **"Abrir em Conversas"**, que leva à mesma conversa em tela cheia.
2. **Foco fixo no projeto.** A conversa nasce com `foco = <projeto>`. Toda skill recebe o projeto como contexto: "parecidos" significa parecidos **com este**, "riscos" significa riscos de projetos parecidos com este, e "one page" é a deste projeto. Um selo no topo mostra "Foco: P012 · Seguradora X". O usuário pode tirar o foco, e aí a conversa passa a valer para a base toda.
3. **Uma conversa só, dois lugares.** É a mesma conversa do histórico: o mesmo armazenamento (`src/conversations.js`), as mesmas skills e o mesmo registro (`src/skills/index.js`), sem um segundo motor. Na lista de Conversas, ela aparece com o selo do projeto. Reabrir a ficha retoma a última conversa daquele projeto. "Nova conversa" na seção cria outra, já com o foco.
4. **Anexos:** um arquivo anexado na conversa da ficha (ex.: a RFP nova) fica **na conversa**, como hoje (adendo 6), e não vai para a base. Isso permite perguntas como "o que esta RFP pede que os projetos parecidos não tinham?" **[inferido: conecta com o caso C da Kelly]**. Enviar à base continua sendo uma ação explícita.
5. **Permissões:** são as mesmas do chat. Se o usuário perder acesso ao projeto, a seção some, e a conversa fica no histórico sem o conteúdo do projeto.

### 5.3 Casos de uso

**UC-P3.1 — Montar a nova proposta a partir da RFP (caso C da Kelly)**
- *Persona:* gerente de proposta. *Pré-condição:* ele criou a oportunidade "Seguradora X – antifraude" (status Em elaboração).
1. Na ficha, na seção de conversa, anexa a RFP e escreve "o que essa RFP pede e quais projetos nossos já fizeram isso?".
2. O Radar resume a RFP e cruza com os parecidos: requisito, projeto que já atendeu e trecho de evidência.
3. Ele clica em "Riscos de projetos parecidos" e depois em "Quem já fez algo parecido" (D5, R19-05).
4. Clica em "Abrir em Conversas" para continuar em tela cheia, e a conversa continua lá.
- *Resultado esperado:* tudo fica ligado à oportunidade, sem perder a ficha de vista. *Dores:* D1, D5.

**UC-P3.2 — Executivo gera a one page sem sair da ficha**
1. Na ficha de um projeto Entregue, clica no atalho "Gerar one page".
2. A prévia abre (ponto 1), e a troca fica registrada na conversa do projeto.

**UC-P3.3 — Voltar dias depois**
1. O gerente reabre a ficha da oportunidade.
2. A seção mostra o resumo da última conversa e as 3 últimas trocas.
- *Resultado esperado:* a memória da proposta fica junto da proposta.

**UC-P3.4 — Tirar o foco**
1. Na conversa da ficha: "e na base toda, quantos projetos de antifraude temos?".
2. O Radar responde pela base toda, sem confundir com o foco, porque a pergunta é de inventário. Se houver dúvida, ele pergunta "Só parecidos com este projeto ou na base toda?" (esclarecer, UC03.22).

### 5.4 Critérios de aceitação
- Dada a ficha de um projeto, quando o usuário envia uma mensagem na seção de conversa, então a conversa aparece na lista de Conversas com o selo do projeto, e "Abrir em Conversas" mostra o mesmo histórico.
- Dada uma conversa com foco, quando o usuário pede "projetos parecidos", então a busca usa o projeto em foco como consulta e não o projeto aparece no próprio resultado.
- Todas as skills disponíveis no chat (incluindo as novas dos pontos 1 e 2) funcionam na seção, com a mesma resposta "o que você pode fazer?".
- Um consultor sem acesso a um projeto confidencial não vê a seção nem consegue abrir a conversa ligada a ele.

---

## 6. Ponto 4 — Insights na linguagem da NTT DATA, com ganhas e perdidas

### 6.1 Problema
D6 e D5. A Kelly pediu:
- filtros como a organização se vê: **setor, unidade, foundation, prisma e ano fiscal**;
- trocar "prática", que não serve em alguns contextos;
- usar o **FY da companhia (abril a março; o FY26 termina em março de 2027)**.

Hoje os filtros da aba Visões são `segmento`, `area` (exibida como prática) e `desde` (data). Os anos são civis. Sobre ganhas e perdidas, a visão Negócio mostra a taxa de ganho por segmento, e a Pipeline mostra as lições de perdidas. Não existe uma leitura **"por que ganhamos × por que perdemos"**, e o Renato destacou que esse é o aprendizado que dá qualidade (lição de perda por preço, escopo maior que a necessidade).

### 6.2 Solução proposta
1. **Filtros novos no topo dos Insights:**
   - **Ano fiscal (FY):** FY25 (abr/2025–mar/2026), FY26 (abr/2026–mar/2027)… O FY atual vem como padrão, com uma opção de período livre. Em toda a tela, "ano" passa a ser FY (gráficos por ano, "desde").
   - **Setor** (a classificação da NTT DATA, que pode ser diferente do "segmento" atual), **Unidade**, **Foundation** e **Prisma.** Os valores e o significado de cada um vêm da Kelly (seção 8). Enquanto não houver dados reais, valem como campos da ficha preenchidos pela IA a partir dos documentos, e mais tarde pelo Maná (D8: nada de cadastro manual novo).
   - Trocar o rótulo **"prática"** pelo termo que a Kelly indicar, em toda a interface e no chat.
2. **Bloco "Ganhamos × perdemos"** na visão Negócio, também abrindo pela Pipeline:
   - lado a lado, para o recorte filtrado, **o que as ganhas têm em comum** (tecnologias, serviços, faixa de prazo e de valor para o gestor, presença de case de referência) e **o que as perdidas têm em comum**;
   - **motivos de perda e de ganho** em lista controlada (preço, escopo, concorrente, relacionamento, prazo, capacidade técnica, desistência do cliente). A IA sugere o motivo a partir dos documentos e da lição registrada, e o curador confirma (liga com o R19-06 do relatório de 19/11);
   - **"Perdidas que viraram aprendizado":** a lição de cada perda, com link para quem conduziu (R19-05);
   - cada número abre a lista de projetos (drill), como já acontece hoje.
3. **Taxa de ganho com método explícito:** coorte por data de criação, denominador só com decididas e FY no período (R19-16). Quando houver dados reais, alinhar o cálculo com Cristiane Divino.

### 6.3 Casos de uso

**UC-P4.1 — Diretoria olha o FY atual por unidade**
1. Abre Insights → Negócio. O FY26 já vem selecionado.
2. Filtra Unidade e Setor (ex.: Financeiro).
3. Vê a taxa de ganho, a carteira e o bloco "Ganhamos × perdemos": as perdidas do setor concentram o motivo "preço", e as ganhas têm um case de referência em 80% das vezes.
- *Resultado esperado:* os números batem com o calendário e a estrutura que a diretoria usa. *Dor:* D6.

**UC-P4.2 — Gerente de proposta aprende com as perdas antes de precificar**
1. Na Pipeline, a oportunidade dele está marcada como "parecida com perdida".
2. Ele abre "Ganhamos × perdemos" para o setor e vê duas perdas por preço, com as lições e o responsável.
3. Ele contata o responsável (R19-05).
- *Resultado esperado:* o risco é tratado na proposta (D9, os 4 eixos do Renato).

**UC-P4.3 — Comparar FYs**
1. Seleciona FY25 e FY26.
2. Vê a taxa de ganho e o motivo de perda por FY.

### 6.4 Critérios de aceitação
- A data 15/03/2027 conta no FY26, e 01/04/2027 conta no FY27, em todos os gráficos e filtros.
- Os filtros Setor, Unidade, Foundation e Prisma aparecem com os valores definidos pela Kelly e combinam com os filtros que já existem.
- O termo "prática" não aparece mais na interface nem nas respostas do chat (se a Kelly confirmar a troca).
- O bloco Ganhamos × perdemos respeita o perfil: o consultor não vê valor e não conta confidenciais.

---

## 7. Ponto 5 — Notícias e tendências do setor junto dos Insights

### 7.1 Problema
D7. A Kelly quer que, ao analisar um setor, o executivo veja também **eventos, notícias e tendências**, internos e externos, que possam virar oportunidade. Na reunião de 12/11, a Isabelle já tinha citado o site global da NTT DATA com tendências por segmento. Contato indicado para fontes de comunicação e marketing: **Bruno Miranda**. A restrição D8 (Renato) vale aqui: o consumo tem de ser **automático**.

### 7.2 Solução proposta
1. **Coletor agendado** (uma vez por dia, de madrugada):
   - lê uma lista **curada** de fontes: RSS ou páginas de insights da NTT DATA global, imprensa setorial e, mais tarde, as fontes internas de comunicação e marketing indicadas por Bruno Miranda;
   - guarda **título, fonte, data, link e um resumo curto** gerado pela IA. Não guarda o texto integral (direitos autorais e espaço em disco);
   - expira após 90 dias.
2. **Classificação:** a IA classifica cada notícia por setor (o mesmo vocabulário do ponto 4), tecnologias e tipo (evento, regulação, tendência, movimento de cliente).
3. **Relevância para nós:** cada notícia ganha uma nota pela proximidade com a base:
   - cita um **cliente que já atendemos**: alta;
   - fala de uma **tecnologia ou serviço que já entregamos** no setor: média;
   - é só do setor: baixa.

   A notícia mostra o porquê ("você tem 3 projetos entregues com este cliente").
4. **Na tela:** um painel **"Sinais do setor"** nos Insights, que segue o filtro de setor, com as 5 mais relevantes da semana. Cada uma tem link para a fonte e o botão **"O que já fizemos sobre isso?"**, que abre o chat com a busca de semelhantes (liga os sinais à base).
5. **Opcional, numa fase seguinte:** o mesmo bloco na ficha do cliente ou da oportunidade ("notícias recentes deste cliente").

### 7.3 Regras e restrições
- R5P1. Nenhum dado do usuário nem da base sai para as fontes. O coletor só faz leituras públicas, sem identificar o usuário (User-Agent genérico).
- R5P2. Só fontes da lista curada. Cada fonte tem dono e motivo registrados.
- R5P3. O resumo da IA é marcado como "resumo automático". O link original é sempre a referência.
- R5P4. Infraestrutura: o coletor roda fora do horário de uso, com limite de itens por fonte, por causa do servidor pequeno (t3.micro, 220 MB para o Radar).
- R5P5. No piloto, com base fictícia, a relevância "cliente que já atendemos" fica limitada, porque os clientes são inventados. Para a demonstração, usar setor e tecnologia **[inferido]**.

### 7.4 Casos de uso

**UC-P5.1 — Executivo prepara a semana**
1. Abre Insights, setor Seguros.
2. Vê em "Sinais do setor" uma notícia sobre uma regulação nova antifraude da SUSEP, com relevância média porque temos 2 projetos de antifraude entregues.
3. Clica em "O que já fizemos sobre isso?" e chega aos cases. Daí pode gerar o deck (ponto 2).
- *Resultado esperado:* o sinal externo leva direto ao material de prova interno. *Dores:* D7, D4.

**UC-P5.2 — Notícia sobre um cliente da carteira**
1. Uma notícia cita um cliente com projeto em execução.
2. Ela aparece no topo, com o selo "cliente da carteira".
3. O responsável pelo projeto é mostrado como contato (R19-05).

**UC-P5.3 — Fonte fora do ar**
1. A coleta de uma fonte falha.
2. O painel mostra as demais, e o painel de saúde (status) registra a falha. Nada quebra na tela.

### 7.5 Critérios de aceitação
- Com o filtro de setor aplicado, o painel mostra só notícias daquele setor, ordenadas por relevância, cada uma com fonte, data, link e motivo.
- "O que já fizemos sobre isso?" abre o chat com uma busca de semelhantes coerente com a notícia.
- O coletor não guarda texto integral, e os itens com mais de 90 dias somem.
- Uma falha no coletor não afeta o restante dos Insights.

---

## 8. Perguntas em aberto (validar com a Kelly e com o Renato)

| # | Pergunta | Para | Afeta |
|---|---|---|---|
| Q1 | A Kelly vai enviar exemplos de one page. Os blocos e a ordem estão certos? Investimento entra na one page que vai ao cliente? | Kelly | 1, 2 |
| Q2 | Qual é a regra para citar o cliente? Existe uma lista de clientes autorizados ou um campo no Maná? Quem decide? | Kelly | 1, 2 |
| Q3 | O deck precisa de algum slide fixo da NTT DATA (quem somos, ofertas)? Com qual template? | Kelly | 2 |
| Q4 | O que são **Foundation** e **Prisma**, e quais são os valores? De onde vêm (Maná, SAP, outra base)? | Kelly | 4 |
| Q5 | O "setor" da NTT DATA é diferente do nosso "segmento"? Qual é a lista oficial? | Kelly | 4, 5 |
| Q6 | Qual termo substitui "prática"? | Kelly | 4 |
| Q7 | Quais fontes de notícias e eventos interessam? Bruno Miranda pode indicar as internas? | Kelly e Bruno Miranda | 5 |
| Q8 | A conversa na ficha deve ser visível para outras pessoas do projeto (compartilhada) ou é pessoal, como as Conversas de hoje? | PO | 3 |
| Q9 | O caso C (nova proposta a partir da RFP) precisa de um ticket próprio, além da conversa na ficha? | PO | 3 |
| Q10 | O que entra na **demonstração** da apresentação (daqui a 1,5 a 2 semanas) e o que fica para depois? Marcelo pediu essa separação. | Time | Todos |

## 9. Tickets de sugestão

Prioridade **sugerida** pensando na demonstração. A prioridade oficial é definida na triagem.

| Ticket | Ponto | Título | Área | Prioridade sugerida | Por quê |
|---|---|---|---|---|---|
| CR-075 | 1 | Skill e exportação "One page de case" | Projetos | **Crítica** | É o caso A da Kelly. Reusa a exportação que já existe e mostra bem na demo. |
| CR-076 | 2 | Skill "Apresentação de cases" (deck com uma one page por case ganho) | Conversas | **Alta** | É o exemplo exato da Kelly ("10 slides sobre fraude em seguros"). Depende do 1. |
| CR-077 | 3 | Conversa na ficha do projeto, com foco no projeto | Projetos | **Alta** | Liga os pontos 1 e 2 à ficha e cobre o caso C. Reusa o chat e as skills. |
| CR-078 | 4 | Insights: FY abr–mar, filtros setor, unidade, foundation e prisma, "Ganhamos × perdemos" | Insights | **Média** (FY: **Alta**, é barato e dá credibilidade) | Os filtros dependem de Q4 a Q6. |
| CR-079 | 5 | Sinais do setor: notícias e tendências relevantes nos Insights | Insights | **Baixa no MVP** (demo com poucas fontes fixas) | Depende de fontes (Q7) e de um coletor novo. Grande para 2 semanas. |

### Validação: cada dor tem uma solução?

| Dor | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| D1 conhecimento difícil de achar | ● | ● | ● | ● | ○ |
| D2 dias para achar referência | ● | ● | ● | | |
| D3 case apresentável e sem expor o cliente | ● | ● | | | |
| D4 conversa com cliente em poucas horas | ○ | ● | ○ | | ○ |
| D5 replicar ganhas, aprender com perdidas | | ● | ● | ● | |
| D6 linguagem da organização | | | | ● | ○ |
| D7 sinais de oportunidade | | | | | ● |
| D8 sem trabalho manual | ● | ● | ● | ● | ● |
| D9 qualidade e risco | ● | ● | ● | ● | |

● atende diretamente · ○ contribui

**Lacuna:** o caso C da Kelly (nova proposta a partir da RFP) só é coberto em parte, pela conversa na ficha com a RFP anexada. Se o comitê quiser **gerar o rascunho da nova proposta**, isso é um sexto ticket (Q9).
