# NB-02 — Detalhamento da Feature: Busca e Recuperação Conversacional (UC03)

> Demanda: **radar-propostas-cases** · Etapa: NB-02 — Especificação de Requisitos (addendum)
> Status: **RASCUNHO EXPLORATÓRIO** — mesmo regime de `NB-02-especificacao-requisitos.md`: depende da aprovação de NB-01 e será avaliado junto com o gate NB-02 (ver `GATE-NB-02.md`, `DECISIONS.md` DEC-0002/DEC-0003).
> Base: [`NB-02-especificacao-requisitos.md`](./NB-02-especificacao-requisitos.md) (UC03, RF11–RF19) e [`NB-01-discovery.md`](./NB-01-discovery.md)

## 0. Por que este addendum existe

O UC03 ("Encontrar propostas similares") descrito em `NB-02-especificacao-requisitos.md` é, na prática, **a funcionalidade que entrega o maior valor do MVP** e a mais complexa: ela não é uma única ação, e sim uma cadeia de sub-casos de uso (interpretação da pergunta → enriquecimento de contexto → recuperação semântica → filtro de permissão → cálculo de score → resolução de conflito entre fontes → geração de justificativa → apresentação → feedback). Além disso, **é ela quem dita** o que precisa ser extraído/ingerido dos documentos e como os metadados devem ser modelados — por isso este detalhamento serve de insumo direto para NB-03 (viabilidade) e DEV-01 (arquitetura/modelo de dados).

Três decisões de escopo foram confirmadas com o solicitante e já estão refletidas abaixo (ver `DECISIONS.md`, DEC-0003):
1. O chat suporta **conversação com memória** (múltiplos turnos, refinamento) já no MVP.
2. Cada resultado permite **feedback de utilidade** (útil/não útil) — alimenta diretamente as métricas de validação do MVP.
3. Divergência entre fontes é **resolvida automaticamente pela hierarquia de confiança**, com explicação de qual fonte prevaleceu.

## 1. UC03 como feature: sub-casos de uso

| # | Sub-UC | Objetivo |
|---|---|---|
| UC03.1 | Iniciar/continuar sessão de busca conversacional | Abrir uma conversa, opcionalmente vinculada a uma oportunidade cadastrada |
| UC03.2 | Interpretar pergunta e extrair intenção/entidades | Entender o que o usuário está pedindo e sobre o quê |
| UC03.3 | Enriquecer consulta com contexto (briefing + histórico da conversa) | Combinar pergunta atual + metadados da oportunidade + turnos anteriores |
| UC03.4 | Recuperar candidatos via busca semântica | Obter o conjunto de documentos/trechos potencialmente relevantes |
| UC03.5 | Aplicar filtro de permissão e confidencialidade | Remover do conjunto qualquer item que o usuário não pode ver, antes de qualquer exibição ou cálculo |
| UC03.6 | Calcular score de similaridade multi-fator | Pontuar cada candidato remanescente nos 6 fatores ponderados |
| UC03.7 | Selecionar e ranquear resultados principais | Escolher os 3–5 melhores, com corte mínimo de relevância |
| UC03.8 | Resolver divergência entre fontes (hierarquia de confiança) | Quando fatos conflitam entre documentos, aplicar a hierarquia e explicitar a escolha |
| UC03.9 | Gerar justificativa da relação com a busca | Explicar por que cada resultado apareceu, com trechos reais como evidência |
| UC03.10 | Apresentar resultados resumidos (cards) | Exibir nome, score, status, segmento, tecnologias, resumo, justificativa, fontes |
| UC03.11 | Expandir detalhes de um resultado | Mostrar problema, objetivo, escopo, entregáveis, áreas, prazo/porte, evidências, link |
| UC03.12 | Informar ausência de evidência suficiente | Dizer claramente quando não há base para responder, sem inventar |
| UC03.13 | Capturar feedback de utilidade por resultado | Usuário marca cada resultado como útil/não útil |
| UC03.14 | Continuar a conversa (follow-up) refinando a busca | Pergunta de acompanhamento reaproveita contexto já estabelecido |
| UC03.15 | Registrar auditoria da busca | Guardar pergunta, resultados exibidos, fontes citadas, aberturas de detalhe e feedback, para as métricas do MVP |

## 2. Detalhamento de cada sub-caso de uso

### UC03.1 — Iniciar/continuar sessão de busca conversacional
**Ator:** comercial, pré-vendas, consultor, dono da proposta ou gestor (qualquer perfil com permissão de consulta).

**Fluxo principal:**
1. Usuário abre o chat, opcionalmente a partir da tela de uma oportunidade já cadastrada.
2. Sistema cria uma sessão de conversa; se vinculada a uma oportunidade, herda os metadados do briefing como contexto inicial (segmento, tecnologias, objetivo, descrição).
3. Sessão permanece ativa enquanto o usuário interage, mantendo o histórico de turnos.

**Critérios de aceite:**
- [ ] Dado que abro o chat a partir de uma oportunidade, quando faço a primeira pergunta, então o sistema já considera segmento/tecnologias/objetivo do briefing sem eu precisar repetir.
- [ ] Dado que abro o chat sem vincular a uma oportunidade, quando pergunto algo, então o sistema busca sem contexto de briefing, mas ainda mantém o histórico da própria conversa.

### UC03.2 — Interpretar pergunta e extrair intenção/entidades
**Fluxo principal:**
1. Sistema recebe o texto da pergunta.
2. Extrai entidades relevantes quando presentes (segmento, tecnologia, cliente, prazo, tipo de documento, área de serviço).
3. Classifica a intenção: buscar referências similares (UC03 núcleo), pedir detalhe de um resultado já exibido (UC03.11), pedir áreas complementares (UC04), ou pergunta fora do domínio da base.

**Fluxo alternativo:** pergunta fora do domínio (ex.: não relacionada a propostas/cases) → sistema responde que esse tipo de pergunta está fora do que a base pode responder, sem tentar forçar um resultado.

**Critérios de aceite:**
- [ ] Dado que a pergunta cita tecnologia e segmento, quando o sistema interpreta, então esses valores entram como filtros/pesos explícitos na busca.
- [ ] Dado que a pergunta é claramente fora do domínio, quando o sistema responde, então ele comunica isso sem inventar uma resposta.

### UC03.3 — Enriquecer consulta com contexto (briefing + histórico da conversa)
**Fluxo principal:**
1. Sistema combina: entidades extraídas da pergunta atual + metadados do briefing (se a sessão estiver vinculada a uma oportunidade) + entidades/filtros estabelecidos em turnos anteriores da mesma conversa.
2. Monta a consulta efetiva de recuperação.

**Critérios de aceite:**
- [ ] Dado que já perguntei "propostas de utilities com plataforma de dados" e na sequência pergunto "e só com Databricks?", quando o sistema responde, então aplica o filtro adicional de tecnologia sobre o mesmo contexto anterior, sem exigir que eu repita "utilities" e "plataforma de dados".
- [ ] Dado que mudo completamente de assunto na conversa, quando pergunto algo não relacionado ao turno anterior, então o sistema não força contexto antigo irrelevante sobre a nova pergunta.

### UC03.4 — Recuperar candidatos via busca semântica
**Fluxo principal:**
1. Sistema executa busca semântica sobre os trechos indexados (ver seção 3 — modelo de dados) usando a consulta enriquecida.
2. Retorna um conjunto candidato ordenado por relevância textual bruta.

**Critérios de aceite:**
- [ ] Dado que a base tem documentos semanticamente relacionados mesmo sem palavras-chave idênticas à pergunta, quando busco, então esses documentos aparecem no conjunto candidato.

### UC03.5 — Aplicar filtro de permissão e confidencialidade
**Fluxo principal:**
1. Antes de qualquer exibição, cálculo de score ou menção na resposta, sistema remove do conjunto candidato qualquer documento/oportunidade cuja classificação de confidencialidade ou perfil de acesso não permita ao usuário atual.

**Critérios de aceite:**
- [ ] Dado que um documento confidencial é semanticamente muito relevante à pergunta, quando o usuário não tem permissão, então esse documento não aparece em nenhum resultado, score, justificativa ou menção indireta.
- [ ] Dado que o filtro remove todos os candidatos de maior relevância, quando isso ocorre, então o sistema ainda assim não "contorna" a regra mostrando algo equivalente sem permissão.

### UC03.6 — Calcular score de similaridade multi-fator
**Fluxo principal:**
1. Para cada candidato remanescente (pós-filtro de permissão), calcular os 6 fatores ponderados (RF19): descrição/objetivo/escopo (40%), segmento (15%), tecnologias (15%), serviços/área (15%), prazo/valor/porte (10%), status/resultado (5%).
2. Compor o score final e manter o detalhamento de cada fator individualmente.

**Critérios de aceite:**
- [ ] Dado qualquer resultado exibido, quando peço a explicação do score, então cada um dos fatores usados é individualmente identificável (não apenas o número final).

### UC03.7 — Selecionar e ranquear resultados principais
**Fluxo principal:**
1. Ordenar candidatos pelo score final.
2. Selecionar os 3 a 5 melhores que atingem um corte mínimo de relevância (threshold a definir em DEV-01/NB-03).

**Fluxo alternativo:** menos de 3 candidatos atingem o corte mínimo → exibir os que existem e informar explicitamente que há poucas referências fortes disponíveis.

**Critérios de aceite:**
- [ ] Dado que existem 10 candidatos mas só 2 têm relevância mínima aceitável, quando o sistema responde, então exibe só os 2 e avisa que não há mais referências fortes, em vez de completar até 3–5 com resultados fracos.

### UC03.8 — Resolver divergência entre fontes (hierarquia de confiança)
**Fluxo principal:**
1. Ao montar a justificativa/resumo de um resultado, se dados usados (ex.: prazo, valor, escopo) vierem de documentos diferentes com informação conflitante, aplicar a hierarquia: contrato assinado/proposta final aprovada/SOW > case aprovado/apresentação final/arquitetura validada > estimativas/versões preliminares/atas validadas > e-mails/transcrições/anotações internas > rascunhos sem autoria/não validados.
2. Priorizar o dado da fonte de maior confiança e declarar explicitamente qual fonte foi usada e por quê, quando houver conflito.

**Critérios de aceite:**
- [ ] Dado que a estimativa preliminar diz "4 meses" e a proposta final aprovada diz "6 meses", quando o sistema responde sobre prazo, então usa "6 meses" e explica que a proposta final aprovada tem precedência sobre a estimativa.
- [ ] Dado que não há conflito entre fontes, quando o sistema responde, então não exibe nenhuma nota de resolução de conflito (não polui a resposta sem necessidade).

### UC03.9 — Gerar justificativa da relação com a busca
**Fluxo principal:**
1. Para cada resultado selecionado, compor um texto curto explicando a relação com a busca, citando os fatores de maior peso no score e ao menos um trecho real de evidência.

**Critérios de aceite:**
- [ ] Dado qualquer justificativa exibida, quando verifico o trecho citado, então ele existe literalmente no documento de origem (sem invenção/paráfrase que distorça o sentido).

### UC03.10 — Apresentar resultados resumidos (cards)
Já coberto por RF17; aqui a adição é que o card deve sinalizar visualmente quando UC03.8 (resolução de conflito) foi aplicada naquele resultado.

**Critérios de aceite:**
- [ ] Dado que houve resolução de conflito de fontes para aquele resultado, quando vejo o card, então há uma indicação de "informação consolidada de múltiplas fontes" com acesso ao detalhe.

### UC03.11 — Expandir detalhes de um resultado
Já coberto por RF18; mantido aqui para rastreabilidade da cadeia completa.

### UC03.12 — Informar ausência de evidência suficiente
**Fluxo principal:**
1. Quando nenhum candidato atinge relevância mínima após os filtros, ou quando a pergunta não pode ser respondida com a base disponível, o sistema comunica isso de forma clara.
2. Sugere uma ação construtiva (ex.: refinar a busca, revisar/completar o briefing, considerar que pode ser necessário enviar mais referências à base).

**Critérios de aceite:**
- [ ] Dado que não há evidência suficiente, quando o sistema responde, então a resposta não contém nenhuma referência "forçada" nem número de score inventado.

### UC03.13 — Capturar feedback de utilidade por resultado
**Fluxo principal:**
1. Cada resultado exibido oferece uma ação simples de feedback (ex.: útil / não útil).
2. O feedback é opcional e não bloqueia a continuidade da conversa.
3. Feedback é persistido associado a: sessão, turno, pergunta, documento avaliado e usuário.

**Critérios de aceite:**
- [ ] Dado que marco um resultado como "não útil", quando sigo a conversa, então o fluxo continua normalmente (feedback não é obrigatório para avançar).
- [ ] Dado que feedbacks foram registrados, quando se calcula a métrica "avaliação dos usuários sobre os 3 primeiros resultados", então os dados estão disponíveis para esse cálculo.

### UC03.14 — Continuar a conversa (follow-up) refinando a busca
**Fluxo principal:**
1. Usuário faz uma pergunta de acompanhamento que faz referência implícita a turnos anteriores (ex.: "e o segundo?", "só esses com Azure", "tem algum mais recente?").
2. Sistema resolve a referência usando o histórico da sessão (UC03.3) e ajusta a busca/resposta.

**Critérios de aceite:**
- [ ] Dado que peço detalhe do "segundo resultado" da resposta anterior, quando o sistema responde, então identifica corretamente qual resultado era o segundo e expande seus detalhes.

### UC03.15 — Registrar auditoria da busca
**Fluxo principal:**
1. Cada turno da conversa registra: pergunta, entidades/intenção extraídas, candidatos considerados, resultados exibidos com score, fontes citadas, se o usuário expandiu detalhes ou abriu a fonte original, e feedback dado.

**Critérios de aceite:**
- [ ] Dado qualquer sessão de busca, quando se extrai os dados para as métricas de validação do MVP (tempo para achar referência, nº de buscas sem resultado relevante, % de fontes verificadas), então os dados necessários já estão registrados pelo sistema, sem depender de levantamento manual.

## 3. O que isso implica para ingestão e modelo de metadados (insumo para DEV-01)

Esta feature define, na prática, **tudo que precisa existir na base** para que UC03 funcione. Proposta conceitual de entidades (nível de requisito de negócio — o desenho técnico/DDL fica em DEV-01):

| Entidade | Papel | Atributos-chave (conceituais) | Alimentada por |
|---|---|---|---|
| **Oportunidade** | Contexto da busca (briefing) | id, área, cliente, confidencialidade, dono, tecnologias, descrição, objetivo, segmento, data envio, status, valor, margem, link SharePoint | UC01 |
| **Documento** | Unidade de conteúdo ingerido | id, oportunidade/proposta/case vinculado, nome do arquivo, tipo documental, nível de confiança (derivado do tipo + status de aprovação — ver hierarquia), confidencialidade, status de processamento, relevância (principal/complementar/contextual/baixa), tags, tecnologias, segmento, serviços, descrição curta/completa, data do conteúdo, link/origem SharePoint | UC02 |
| **Trecho pesquisável (Chunk)** | Unidade indexada para busca semântica | id, documento_id, texto, posição/página, vetor de embedding, metadados herdados do documento (confidencialidade, tipo, tecnologia, segmento) para filtro rápido | UC02 (processamento) |
| **Fator de Score** | Explicabilidade do ranking | busca/turno_id, documento_id, fator (dos 6 pesos), valor calculado, evidência usada | UC03.6 |
| **Sessão de Conversa** | Memória do chat | id, usuário, oportunidade vinculada (opcional), data início, lista de turnos | UC03.1 |
| **Turno de Conversa** | Cada pergunta/resposta | id, sessão_id, pergunta, intenção/entidades extraídas, resultados retornados, trechos citados, timestamp | UC03.2–UC03.12 |
| **Feedback de Resultado** | Insumo das métricas | id, turno_id, documento_id, usuário, útil/não útil, timestamp | UC03.13 |
| **Registro de Conflito de Fonte** | Rastreabilidade da resolução de divergência | id, turno_id, campo em conflito, valores por documento, documento priorizado, motivo (regra de hierarquia aplicada) | UC03.8 |
| **Sugestão de Escopo Complementar** | Áreas/serviços recorrentes (UC04) | id, sessão/turno_id, área ou serviço sugerido, documentos de evidência | UC04 (relacionado) |
| **Perfil de Acesso** | Base do filtro de permissão | id, nome do perfil, regras de visibilidade por confidencialidade, visibilidade de valor/margem, usuários vinculados | UC03.5 / RF22-RF23 |

### Consequências diretas para o que precisa ser ingerido (NB-02 → DEV-01)

- Cada documento ingerido precisa, no mínimo: **tipo documental**, **nível de confiança/hierarquia de fonte**, **classificação de confidencialidade**, **tecnologias**, **segmento**, **data do conteúdo** (para saber qual versão é mais atual) e **vínculo com oportunidade/proposta/case**. Sem esses campos, UC03.5 (permissão), UC03.6 (score) e UC03.8 (conflito) não funcionam.
- O "nível de confiança" de cada documento (RF/RNF da hierarquia de fontes do briefing) deve ser **derivável automaticamente** do tipo documental + status de aprovação (ex.: "proposta comercial" + "aprovada/vendida" → alta confiança; "estimativa" + rascunho → média confiança) — isso precisa ser uma regra explícita de classificação em UC02, não apenas um campo livre.
- É necessário granularidade de **trecho (chunk)**, não só de documento inteiro, para que a justificativa (UC03.9) cite evidência específica e não o documento genérico.
- Sessões e turnos de conversa precisam ser persistidos (não é um chat "stateless"), pois UC03.3/UC03.14 dependem de histórico.
- Feedback por resultado precisa de um modelo simples (binário útil/não útil) vinculado a usuário+turno+documento, para às métricas definidas em NB-01/NB-02 sem precisar de coleta manual.

## 4. Requisitos funcionais adicionados por este detalhamento

Estes RFs complementam (não substituem) os RF11–RF19 já existentes em `NB-02-especificacao-requisitos.md`:

| ID | Requisito | Origem (MoSCoW) | Sub-UC |
|---|---|---|---|
| RF33 | O chat deve manter memória de conversa dentro de uma sessão, permitindo perguntas de acompanhamento que reaproveitam contexto de turnos anteriores. | Must (confirmado nesta etapa) | UC03.3 / UC03.14 |
| RF34 | O sistema deve permitir que o usuário marque cada resultado exibido como útil/não útil, persistindo esse feedback vinculado à busca, ao documento e ao usuário. | Must (confirmado nesta etapa) | UC03.13 |
| RF35 | Quando houver informação divergente entre fontes relevantes a um resultado, o sistema deve aplicar automaticamente a hierarquia de confiança de fontes e declarar explicitamente qual fonte foi priorizada e por quê. | Must (confirmado nesta etapa) | UC03.8 |
| RF36 | O sistema deve registrar, por sessão/turno de conversa, os resultados exibidos, fontes citadas, aberturas de detalhe e feedback recebido, para suportar as métricas de validação do MVP sem levantamento manual. | Must | UC03.15 |

> Nota: RF33, RF34 e RF35 tornam **explícitas** decisões de escopo que não estavam literalmente no MoSCoW original de NB-01 (que previa "score explicável" e "fontes rastreáveis", mas não detalhava memória de conversa, botão de feedback nem resolução automática de conflito). Ver `DECISIONS.md`, DEC-0003, para o registro formal dessa extensão de escopo.

## 5. Questões técnicas abertas (não decidir aqui — encaminhar para DEV-01/NB-03)

- Escolha do motor de busca vetorial/embeddings e do modelo de linguagem para extração de intenção e geração de justificativa.
- Threshold mínimo de relevância para exibir menos de 3 resultados (UC03.7) — valor exato a calibrar com a base piloto real.
- Até quando uma sessão de conversa permanece "viva" (expiração) e se o histórico é reaproveitado entre sessões diferentes do mesmo usuário.
- Estratégia de chunking (tamanho/sobreposição dos trechos) por tipo de documento.
- Como versionar/atualizar o nível de confiança de um documento se seu status mudar (ex.: estimativa que se torna proposta aprovada).

## 6. Rastreabilidade

Este documento detalha e refina o UC03 de `NB-02-especificacao-requisitos.md` sem contradizer o discovery (`NB-01-discovery.md`). As extensões de escopo (RF33–RF36) foram confirmadas explicitamente com o solicitante e registradas em `DECISIONS.md` (DEC-0003). Este addendum deve ser avaliado junto com `NB-02-especificacao-requisitos.md` no mesmo gate (`GATE-NB-02.md`).
