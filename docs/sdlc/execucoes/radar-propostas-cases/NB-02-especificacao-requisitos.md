# NB-02 — Especificação de Requisitos de Negócio

> Demanda: **radar-propostas-cases** · Etapa: NB-02 — Especificação de Requisitos
> Status: **RASCUNHO EXPLORATÓRIO** — gerado para apoiar a decisão de aprovação conjunta de NB-01 e NB-02 (ver nota abaixo). Pendente de aprovação humana em ambos os gates.
> Base: [`NB-01-discovery.md`](./NB-01-discovery.md) (ainda não aprovado formalmente)
> Agente responsável: Agente de Especificação de Requisitos (`%sdlc-nb02-requisitos`), orquestrado pelo Maestro

> ⚠️ **Nota de processo:** por decisão explícita do solicitante, este artefato foi produzido **antes** da aprovação formal do gate NB-01, para permitir avaliação conjunta das saídas de NB-01 e NB-02 antes de decidir sobre ambas. Isso é uma exceção pontual e registrada (ver `DECISIONS.md`, DEC-0002); o Maestro **não** considera NB-02 oficialmente iniciada nem concluída em `STATUS.md` até que o gate NB-01 seja aprovado. Se o conteúdo de NB-01 mudar após a revisão humana, este documento deverá ser revisado antes de qualquer aprovação.

## 1. Requisitos Funcionais (RF)

| ID | Requisito | Origem (MoSCoW) | Caso de uso relacionado |
|---|---|---|---|
| RF01 | O sistema deve permitir cadastrar uma nova oportunidade/briefing com os metadados: área responsável, nome do cliente, classificação de confidencialidade, dono da proposta, tecnologias principais, descrição, objetivo, segmento de negócio, data de envio, status, valor, margem e link/localização no SharePoint. | Must | UC01 |
| RF02 | O sistema deve gerar um identificador único para cada oportunidade cadastrada. | Must | UC01 |
| RF03 | O sistema deve permitir editar os metadados de uma oportunidade após o cadastro inicial. | Must | UC01 |
| RF04 | O sistema deve restringir a visualização dos campos "valor da proposta" e "margem praticada" conforme o perfil do usuário. | Should | UC01 |
| RF05 | O sistema deve permitir upload de arquivos (drag-and-drop) nos formatos PDF, DOCX e PPTX no MVP; XLSX e TXT/transcrições ficam como extensão futura. | Must | UC02 |
| RF06 | O sistema deve permitir classificar o tipo documental do arquivo enviado, priorizando no MVP: proposta comercial, apresentação comercial, escopo/SOW e case de sucesso. | Must | UC02 |
| RF07 | Após o upload, o sistema deve extrair o texto do documento, classificar automaticamente o tipo de arquivo, sugerir tags, tecnologias, segmento, serviços/palavras-chave e uma descrição curta. | Must | UC02 |
| RF08 | O sistema deve indicar ao usuário o status de processamento do arquivo: enviado, processando, processado ou erro. | Must | UC02 |
| RF09 | O sistema deve permitir que o usuário revise, aceite ou corrija as sugestões automáticas (tipo, tags, descrição, metadados) antes de o documento entrar na base pesquisável. | Must | UC02 |
| RF10 | O documento só deve ficar disponível para busca/indexação após ser processado, revisado e classificado. | Must | UC02 |
| RF11 | O sistema deve indexar o conteúdo extraído em trechos pesquisáveis para suportar busca semântica. | Must | UC02 / UC03 |
| RF12 | O sistema deve oferecer um chat conversacional em linguagem natural para consulta à base de propostas e cases permitidos ao usuário. | Must | UC03 |
| RF13 | O chat deve buscar por contexto/significado (busca semântica), não apenas por palavras-chave. | Must | UC03 |
| RF14 | O chat deve usar o briefing e os metadados da oportunidade atual como contexto adicional de busca. | Must | UC03 |
| RF15 | O chat deve informar explicitamente quando não houver evidência suficiente para responder, sem inventar informação. | Must | UC03 |
| RF16 | O sistema deve retornar inicialmente de 3 a 5 resultados prioritários por busca. | Must | UC03 |
| RF17 | Cada resultado deve exibir: nome/título, score de similaridade, status, segmento, tecnologias, resumo do escopo, relação com a busca (justificativa), origem/fontes e opção de expandir/ocultar detalhes. | Must | UC03 |
| RF18 | Ao expandir um resultado, o sistema deve mostrar: problema/desafio do cliente, objetivo, escopo, entregáveis, tecnologias, áreas envolvidas, prazo/porte (se permitido), status, trechos de evidência e link para a fonte/SharePoint. | Must | UC03 |
| RF19 | O score de similaridade deve ser apresentado com explicação dos fatores que o compõem (ex.: segmento, tecnologias, escopo, objetivo, prazo), seguindo os pesos iniciais: descrição/objetivo/escopo 40%, segmento 15%, tecnologias 15%, serviços/área 15%, prazo/valor/porte 10%, status/resultado 5%. | Must | UC03 |
| RF20 | O sistema deve identificar e sugerir áreas e serviços complementares de escopo frequentemente observados em propostas/cases semelhantes, sempre como possibilidade (não decisão), com rastreabilidade a pelo menos uma referência da base. | Must | UC04 |
| RF21 | O sistema deve permitir visualizar os documentos/fontes que sustentam cada sugestão de área complementar. | Must | UC04 |
| RF22 | O sistema deve aplicar controle de acesso de forma que um usuário só visualize/abra documentos para os quais tenha permissão, mesmo que semanticamente relevantes à busca. | Must | Transversal (segurança) |
| RF23 | O sistema deve suportar perfis de acesso: Consultor/pré-vendas, Dono da proposta, Curador/admin, Gestor — com permissões diferenciadas de consulta, upload, edição e aprovação. | Should | Transversal |
| RF24 | O sistema deve permitir classificar a relevância de um arquivo como principal, complementar, contextual ou baixa relevância. | Should | UC02 |
| RF25 | O sistema deve permitir favoritar propostas, cases ou documentos. | Should | — |
| RF26 | O sistema deve oferecer autenticação (login simples caso não haja autenticação corporativa disponível). | Should | Transversal |
| RF27 | O sistema deve suportar guarda de link/origem no SharePoint por documento/proposta. | Should | UC02 |
| RF28 | O sistema deve avaliar (não obrigatoriamente implementar no MVP) uma integração simples com uma pasta específica do SharePoint, condicionada à viabilidade técnica. | Should | — |
| RF29 | O sistema deve oferecer tela "Minhas propostas" com lista de oportunidades cadastradas pelo usuário. | Could | — |
| RF30 | O sistema deve manter histórico de buscas do usuário. | Could | — |
| RF31 | O sistema deve exibir o status de processamento de uploads em uma visão consolidada. | Could | — |
| RF32 | O sistema pode auxiliar na estruturação do briefing da oportunidade, sugerindo perguntas complementares (ex.: fontes de dados, dashboards, prazo, requisitos de compliance), sem gerar a proposta final. | Could ("Plus") | — |

## 2. Requisitos Não Funcionais (RNF)

| ID | Categoria | Requisito |
|---|---|---|
| RNF01 | Segurança / Confidencialidade | Documentos confidenciais não devem aparecer em resultados de busca para usuários sem autorização, mesmo que semanticamente similares. Controle de acesso é mandatório, não best-effort. |
| RNF02 | Segurança / Dados sensíveis | A base piloto do MVP deve conter apenas documentos sem sigilo ou devidamente anonimizados; nenhum dado confidencial real deve ser ingerido nesta fase. |
| RNF03 | Compliance / LGPD | Dados pessoais eventualmente presentes nos documentos (nomes de contatos, e-mails) devem ser tratados conforme política de anonimização antes da ingestão na base piloto. |
| RNF04 | Confiabilidade da resposta (IA) | O chat não deve inventar informações (sem alucinação); toda resposta deve ser rastreável a uma fonte/trecho real da base. |
| RNF05 | Explicabilidade | Todo score de similaridade e toda sugestão de área complementar devem vir acompanhados de justificativa e fonte, nunca como "caixa-preta". |
| RNF06 | Desempenho (percepção de uso) | O retorno de resultados de busca/chat deve ser percebido como rápido o suficiente para uso interativo (meta a validar na fase de arquitetura — DEV-01), evitando a sensação de travamento. |
| RNF07 | Usabilidade | O volume de resultados exibido por busca deve ser limitado (3–5 principais) para evitar sobrecarga de informação. |
| RNF08 | Auditabilidade | Toda correção manual de tags/metadados sugeridos automaticamente deve ser registrável, para suportar as métricas de validação do MVP (nº de correções). |
| RNF09 | Disponibilidade | Por ser um MVP/piloto, não há meta de disponibilidade 24/7 formalizada nesta fase; nível de serviço aceitável será definido em DEV-01 caso necessário. |
| RNF10 | Portabilidade de formatos | O sistema deve suportar extração de texto de PDF, DOCX e PPTX no MVP sem perda relevante de conteúdo textual. |
| RNF11 | Governança de taxonomia | A lista de tags, tecnologias e segmentos sugeridos deve ser gerenciável por um perfil curador/admin, evitando proliferação descontrolada de categorias. |

## 3. Histórias de usuário / Casos de uso com critérios de aceite

### UC01 — Cadastrar oportunidade
**Como** comercial, pré-vendas ou consultor, **quero** registrar uma nova demanda com seus metadados essenciais **para** ter contexto estruturado que alimente as buscas por referências.

Critérios de aceite:
- [ ] Dado que preencho área, descrição, objetivo e segmento, quando salvo a oportunidade, então ela recebe um identificador único.
- [ ] Dado que a oportunidade já existe, quando edito seus metadados, então as alterações são persistidas e versionadas minimamente (quem/quando alterou).
- [ ] Dado que não tenho permissão para ver valor/margem, quando visualizo a oportunidade, então esses campos não são exibidos.

### UC02 — Enviar e classificar documento
**Como** dono da proposta ou curador, **quero** enviar materiais e receber sugestões de classificação **para** alimentar a base piloto com qualidade e sem necessidade de preenchimento manual completo.

Critérios de aceite:
- [ ] Dado que envio um arquivo PDF/DOCX/PPTX, quando o upload é concluído, então vejo o status mudar entre enviado → processando → processado (ou erro).
- [ ] Dado que o processamento termina, quando visualizo o documento, então vejo tipo sugerido, tags sugeridas e descrição sugerida.
- [ ] Dado que discordo de uma sugestão, quando edito o metadado, então a correção é salva e o documento entra na base com os dados revisados.
- [ ] Dado que o documento é confidencial ou meu perfil não tem permissão, quando outro usuário busca, então o documento não aparece nos resultados dele.
- [ ] Dado que o documento ainda não foi processado/revisado, quando qualquer usuário busca, então ele não aparece como resultado pesquisável.

### UC03 — Encontrar propostas similares
**Como** comercial, pré-vendas ou consultor, **quero** consultar a base via chat em linguagem natural **para** localizar rapidamente referências relevantes para uma nova oportunidade.

Critérios de aceite:
- [ ] Dado que faço uma pergunta relacionada à minha oportunidade, quando o sistema responde, então recebo de 3 a 5 referências priorizadas.
- [ ] Dado que recebo um resultado, quando o visualizo, então vejo score, resumo, justificativa da relação com a busca e fontes.
- [ ] Dado que clico em "exibir detalhes", quando o card expande, então vejo problema, objetivo, escopo, entregáveis, tecnologias, áreas, prazo/porte (se permitido), status e trechos de evidência.
- [ ] Dado que não há conteúdo suficiente na base para responder, quando o sistema processa a pergunta, então ele informa claramente a ausência de evidência, sem inventar resultado.
- [ ] Dado que um resultado é confidencial para meu perfil, quando a busca é semanticamente relevante, então esse resultado não é exibido para mim.

### UC04 — Comparar projetos e identificar áreas agregáveis
**Como** pré-vendas ou consultor, **quero** visualizar áreas e serviços complementares recorrentes em projetos semelhantes **para** ampliar o escopo da nova oportunidade com base em evidência histórica.

Critérios de aceite:
- [ ] Dado que uma busca retorna resultados similares, quando visualizo a tela de comparação, então vejo uma lista de áreas/serviços frequentemente envolvidos nessas referências.
- [ ] Dado que uma área complementar é sugerida, quando peço para ver a origem, então o sistema aponta pelo menos um documento/proposta/case da base que sustenta a sugestão.
- [ ] Dado que a sugestão é apresentada, quando leio o texto, então está claro que é uma possibilidade baseada em referências, não uma recomendação obrigatória.

## 4. Dependências e integrações conhecidas

- Dependência de uma base piloto curada (propostas e cases não confidenciais/anonimizados) — pré-requisito operacional antes de QA-01/QA-02, não bloqueia o desenho técnico.
- Integração opcional com SharePoint (link de origem e, se viável, leitura de pasta específica) — a confirmar viabilidade técnica em DEV-01.
- Depende de um motor de busca semântica/embeddings e de um modelo de linguagem para o chat conversacional e para a extração/sugestão de metadados — escolha de stack é objeto de DEV-01, não desta etapa.
- Depende de definição de perfis de acesso e de como a classificação de confidencialidade é verificada no momento da consulta (RF22/RNF01) — crítico para DEV-01 e para a arquitetura de segurança.

## 5. Rastreabilidade com NB-01

Todos os requisitos acima derivam diretamente do recorte MoSCoW e dos casos de uso descritos em `NB-01-discovery.md` (seção 9) e no briefing original do solicitante. Nenhuma contradição foi identificada entre este documento e o discovery. Caso o conteúdo do discovery seja alterado durante a aprovação humana do gate NB-01, este documento de requisitos deve ser revisto antes de qualquer aprovação do gate NB-02.

## 6. Itens explicitamente fora de escopo (Won't have) — reafirmados

Propostas com dados sensíveis/confidenciais reais, geração automática de proposta comercial completa, lições aprendidas de delivery, construção automatizada de proposta via chat, dashboard de indicadores, geração automática de casos de uso para download, seleção automática de propostas como base de redação de nova proposta, cobertura completa do ciclo proposta → contrato → projeto → entrega.
