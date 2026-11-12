# Log de Decisões (DECISIONS.md)

> Arquivo **append-only** (somente adição). Nunca edite ou apague uma entrada já publicada — se uma decisão for revista, crie uma nova entrada referenciando a anterior em "Supersede". Toda decisão de negócio, técnica, de escopo, de risco ou de aprovação/reprovação de gate registrada aqui é definitiva para fins de auditoria.

Formato de cada entrada: use `templates/TEMPLATE_DECISAO.md`. ID sequencial `DEC-0001`, `DEC-0002`, ...

---

## DEC-0000 — Exemplo (remover ao usar o processo)

| Campo | Valor |
|---|---|
| ID | DEC-0000 |
| Data | AAAA-MM-DD |
| Fase / Etapa | Ex.: 1. Negócio / NB-03 |
| Tipo | Ex.: Aprovação de Gate / Decisão de Escopo / Decisão Técnica / Risco Aceito |
| Descrição | Descreva a decisão tomada em 1-3 frases |
| Justificativa | Por que essa decisão foi tomada |
| Responsável (autor da proposta) | Nome do agente/pessoa que propôs |
| Aprovador humano | Nome e papel de quem aprovou |
| Referências | Link do PR / Issue / GATE.md / STATUS.md |
| Supersede | DEC-XXXX (se aplicável) |

---

<!-- Novas decisões devem ser adicionadas ABAIXO desta linha, em ordem cronológica -->

## DEC-0001 — Recorte inicial do MVP radar-propostas-cases (NB-01)

| Campo | Valor |
|---|---|
| ID | DEC-0001 |
| Data | 2026-10-21 |
| Fase / Etapa | 1. Negócio / NB-01 |
| Tipo | Decisão de Escopo |
| Descrição | O MVP cobrirá apenas propostas comerciais e cases (sem sigilo ou anonimizados), com upload manual, extração/metadados sugeridos com revisão humana, busca conversacional com score explicável e 3–5 resultados, e controle básico de acesso. Integração com SharePoint é opcional/avaliada apenas se viável. Ciclo completo proposta→contrato→projeto→entrega, geração automática de proposta e dashboards de indicadores ficam fora do MVP. |
| Justificativa | Tempo e acesso a dados limitados; necessidade de validar a hipótese de valor (busca semântica + chat com fontes rastreáveis) antes de investir em integrações completas e automações. |
| Responsável (autor da proposta) | Agente de Ideação (NB-01) via Agente Maestro |
| Aprovador humano | Pendente — aguardando definição do Product Owner/Sponsor no gate NB-01 |
| Referências | `docs/sdlc/execucoes/radar-propostas-cases/NB-01-discovery.md`, `docs/sdlc/execucoes/radar-propostas-cases/GATE-NB-01.md` |
| Supersede | N/A |

## DEC-0002 — Geração exploratória de NB-02 antes da aprovação do gate NB-01

| Campo | Valor |
|---|---|
| ID | DEC-0002 |
| Data | 2026-10-21 |
| Fase / Etapa | 1. Negócio / NB-01 e NB-02 |
| Tipo | Decisão de Processo (exceção pontual, não altera o SOURCE_OF_TRUTH) |
| Descrição | A pedido explícito do solicitante, o Agente de Requisitos produziu `NB-02-especificacao-requisitos.md` e seu gate (`GATE-NB-02.md`) antes da aprovação formal do gate NB-01, para permitir avaliação conjunta das duas saídas antes de decidir sobre ambas. `STATUS.md` reflete NB-02 como "Em aprovação (exploratório)", e o Maestro não considera NB-02 oficialmente concluída até que NB-01 também seja aprovado. |
| Justificativa | Acelerar a validação do fluxo de SDLC e dar visibilidade das implicações de requisitos ao aprovador antes de formalizar a aprovação do discovery, reduzindo retrabalho. |
| Responsável (autor da proposta) | Agente Maestro, a pedido do solicitante |
| Aprovador humano | Pendente — nenhuma aprovação de gate foi concedida nesta decisão; ela apenas registra a exceção de sequenciamento |
| Referências | `docs/sdlc/execucoes/radar-propostas-cases/GATE-NB-01.md`, `GATE-NB-02.md`, `STATUS.md` |
| Supersede | N/A |

## DEC-0003 — UC03 tratado como feature com sub-casos de uso e extensão de escopo (memória de conversa, feedback, resolução automática de conflito de fontes)

| Campo | Valor |
|---|---|
| ID | DEC-0003 |
| Data | 2026-10-21 |
| Fase / Etapa | 1. Negócio / NB-02 |
| Tipo | Decisão de Escopo |
| Descrição | UC03 ("Encontrar propostas similares") foi detalhado em `NB-02-feature-busca-conversacional.md` como 15 sub-casos de uso (UC03.1–UC03.15), por ser a principal entrega de valor do MVP e por definir o que precisa ser ingerido e como os metadados devem ser modelados. Três extensões de escopo foram confirmadas com o solicitante e tornadas requisitos explícitos: (1) chat com memória de conversa/multi-turno no MVP (RF33); (2) feedback de utilidade (útil/não útil) por resultado, alimentando as métricas de validação (RF34); (3) resolução automática de divergência entre fontes aplicando a hierarquia de confiança, com explicação da fonte priorizada (RF35). RF36 formaliza o registro de auditoria da busca necessário às métricas do MVP. |
| Justificativa | O MoSCoW original de NB-01 previa "score explicável" e "fontes rastreáveis", mas não detalhava memória de conversa, botão de feedback nem resolução automática de conflito; essas capacidades são necessárias para que UC03 entregue o valor esperado e para alimentar as métricas de validação já definidas (ex.: avaliação dos 3 primeiros resultados). |
| Responsável (autor da proposta) | Agente de Especificação de Requisitos (NB-02), a pedido do solicitante |
| Aprovador humano | Pendente — depende da aprovação conjunta de NB-01 e NB-02 (ver DEC-0002) |
| Referências | `docs/sdlc/execucoes/radar-propostas-cases/NB-02-feature-busca-conversacional.md`, `NB-02-especificacao-requisitos.md` (RF33-RF36), `GATE-NB-02.md` |
| Supersede | N/A |

## DEC-0004 — Definição do Product Owner da demanda radar-propostas-cases

| Campo | Valor |
|---|---|
| ID | DEC-0004 |
| Data | 2026-10-29 |
| Fase / Etapa | 1. Negócio / NB-01 |
| Tipo | Decisão de Governança |
| Descrição | Ivan Lucio Teles de Souza é definido como Product Owner da demanda e aprovador humano dos gates de negócio. Resolve a pendência aberta em `NB-01-discovery.md` (seção 7) e em `GATE-NB-01.md`. |
| Justificativa | O gate NB-01 exige aprovador humano nominal; a ausência dessa definição era a única pendência que impedia o fechamento do discovery. |
| Responsável (autor da proposta) | Solicitante da demanda |
| Aprovador humano | Ivan Lucio Teles de Souza (Product Owner) |
| Referências | `docs/sdlc/execucoes/radar-propostas-cases/NB-01-discovery.md`, `GATE-NB-01.md` |
| Supersede | N/A |

## DEC-0005 — Aprovação do gate NB-01 (radar-propostas-cases)

| Campo | Valor |
|---|---|
| ID | DEC-0005 |
| Data | 2026-10-29 |
| Fase / Etapa | 1. Negócio / NB-01 |
| Tipo | Aprovação de Gate |
| Descrição | Gate NB-01 (Ideação & Discovery) aprovado sem ressalvas. Com isso, o recorte de MVP registrado em DEC-0001 passa a ter aprovação humana. |
| Justificativa | Revisão realizada pelo time; discovery considerado completo (problema, stakeholders, hipótese, riscos, métricas e recorte MoSCoW). Aprovação comunicada pelo PO. |
| Responsável (autor da proposta) | Agente de Ideação (NB-01) via Agente Maestro |
| Aprovador humano | Ivan Lucio Teles de Souza (Product Owner), em nome do time |
| Referências | `docs/sdlc/execucoes/radar-propostas-cases/GATE-NB-01.md`, DEC-0001, DEC-0004 |
| Supersede | N/A |

## DEC-0006 — Aprovação do gate NB-02 (radar-propostas-cases)

| Campo | Valor |
|---|---|
| ID | DEC-0006 |
| Data | 2026-10-29 |
| Fase / Etapa | 1. Negócio / NB-02 |
| Tipo | Aprovação de Gate |
| Descrição | Gate NB-02 (Especificação de Requisitos) aprovado sem ressalvas, em avaliação conjunta com NB-01 conforme a exceção DEC-0002. Inclui o detalhamento do UC03 e as extensões de escopo RF33–RF36 registradas em DEC-0003. Como NB-01 e NB-02 foram produzidas na mesma branch (`sdlc/negocio/nb-01/radar-propostas-cases`), a entrega de NB-02 permanece nela; a próxima etapa segue a convenção normal de uma branch por etapa. |
| Justificativa | Revisão realizada pelo time; requisitos rastreáveis ao discovery aprovado, sem contradição identificada. Aprovação comunicada pelo PO. |
| Responsável (autor da proposta) | Agente de Especificação de Requisitos (NB-02) via Agente Maestro |
| Aprovador humano | Ivan Lucio Teles de Souza (Product Owner), em nome do time |
| Referências | `docs/sdlc/execucoes/radar-propostas-cases/GATE-NB-02.md`, DEC-0002, DEC-0003, DEC-0005 |
| Supersede | N/A |

## DEC-0007 — Protótipo V0 com IA real (DeepSeek), memória de conversa e conversas salvas/favoritas (radar-propostas-cases)

| Campo | Valor |
|---|---|
| ID | DEC-0007 |
| Data | 2026-10-29 |
| Fase / Etapa | 1. Negócio / NB-02 (adendo) e NB-03 (apoio à apresentação ao comitê) |
| Tipo | Mudança de escopo / exceção de processo |
| Descrição | Por solicitação do PO, o protótipo `radar-v0` (Node puro, sem dependências, pensado para a VM com acesso restrito) passou a: (1) usar a DeepSeek para interpretar perguntas, reavaliar candidatos e redigir respostas com insights (UC03.16), com fallback offline; (2) implementar a memória de conversa já especificada em UC03.3/UC03.14; (3) permitir salvar, retomar e favoritar conversas (UC05, UC06). Os casos de uso estão em `NB-02-adendo-memoria-conversas-ia.md`. O protótipo foi construído antes dos gates NB-04 e DEV-01 e serve somente para a apresentação e os testes do comitê (NB-03); não substitui DEV-01 a DEV-04. Upload continua simulado. |
| Justificativa | Validar a hipótese do NB-01 (base de documentos aumenta produtividade e acesso a referências) com uma demo realista. A busca só por termos tinha limitações para perguntas com vocabulário diferente da base. |
| Restrições | Somente dados fictícios podem ser enviados à DeepSeek até haver aprovação de segurança/jurídico (R10). A chave fica apenas no `.env` local, nunca em commit. A chave compartilhada em chat deve ser rotacionada depois da demo. |
| Responsável (autor da proposta) | Ivan Lucio Teles de Souza (PO), implementado via agente |
| Aprovador humano | Pendente: validação do adendo pelo comitê do time, junto com o gate NB-03 |
| Referências | `docs/sdlc/execucoes/radar-propostas-cases/NB-02-adendo-memoria-conversas-ia.md`, DEC-0003, `NB-03-viabilidade.md` (R10) |
| Supersede | N/A |

## DEC-0008 — V0 com upload real, processamento de metadados, cadastro de projetos e base relacional (radar-propostas-cases)

| Campo | Valor |
|---|---|
| ID | DEC-0008 |
| Data | 2026-10-29 |
| Fase / Etapa | 1. Negócio / NB-02 (adendo 3) e NB-03 (apoio à apresentação ao comitê) |
| Tipo | Mudança de escopo / exceção de processo |
| Descrição | Por solicitação do PO, o protótipo `radar-v0` deixa de simular o upload e passa a ter: (1) upload multiformato (DOCX, PPTX, XLSX, PDF, VTT/SRT, EML, HTML, CSV, JSON, MD, TXT) com pipeline de processamento em etapas, extração de metadados e entidades por regras + IA (DeepSeek) com proteção contra alucinação, vínculo com projeto, duplicidade, conflitos e revisão humana obrigatória antes da indexação (UC02 detalhado); (2) cadastro e edição de projetos com sugestão inteligente e histórico (UC07); (3) exploração com filtros combinados, facetas e busca textual BM25 (UC08); (4) insights agregados (UC09). A persistência passa a ser relacional, com o SQLite embutido no Node (`node:sqlite`) e FTS5. O MER foi registrado como insumo de DEV-01. Casos de uso em `NB-02-adendo-upload-cadastro-consultas.md`. Continua sendo protótipo de apoio à decisão do comitê; não substitui NB-04 nem DEV-01 a DEV-04. |
| Justificativa | Demonstrar ao comitê o ciclo completo (alimentar a base → organizar → consultar → gerar insights), que é o núcleo da hipótese do NB-01. |
| Restrições | A VM precisa de Node 22.13 ou superior (ver R11 abaixo). Documentos enviados à DeepSeek: só dados fictícios até aprovação de segurança/jurídico (R10). PDF escaneado sem OCR no V0. |
| Riscos novos | R11 — Versão do Node da VM inferior a 22.13 impede o uso do banco embutido; mitigação: confirmar a versão antes da demo ou usar SQLite em WebAssembly empacotado com o projeto. |
| Responsável (autor da proposta) | Ivan Lucio Teles de Souza (PO), implementado via agente |
| Aprovador humano | Pendente: validação do adendo pelo comitê do time, junto com o gate NB-03 |
| Referências | `docs/sdlc/execucoes/radar-propostas-cases/NB-02-adendo-upload-cadastro-consultas.md`, `docs/sdlc/execucoes/radar-propostas-cases/DEV-01-insumo-MER-base-de-conhecimento.md`, DEC-0007 |
| Supersede | N/A |

## DEC-0009 — V0 com exportação de proposta, permissões de cadastro, registro de atividades e aviso de dados sensíveis (radar-propostas-cases)

| Campo | Valor |
|---|---|
| ID | DEC-0009 |
| Data | 2026-10-30 (registrada em 2026-11-04) |
| Fase / Etapa | 1. Negócio / NB-02 (adendo 4) e NB-03 (apoio à apresentação ao comitê) |
| Tipo | Mudança de escopo / exceção de processo |
| Descrição | Por solicitação do PO, o protótipo `radar-v0` passou a ter: (1) exportação de proposta em apresentação para o cliente (PPTX/PDF) e resumo executivo (DOCX/PDF), com escolha das seções (UC10); (2) registro de atividades com tela de consulta para o gestor (UC11); (3) cadastro de projeto e de cliente novo só para o gestor (UC07.5, UC07.6); (4) filtro "Meus projetos" (UC08.6); (5) regra RN-V0-01, que proíbe dados sensíveis da NTT enquanto houver LLM externa, com confirmação a cada envio. Casos de uso em `NB-02-adendo-exportacao-permissoes-auditoria.md`. Continua sendo protótipo de apoio ao comitê. |
| Justificativa | Pedidos do PO a partir dos primeiros testes com o time. |
| Restrições | Permissões verificadas no servidor, não só na tela. Valores e conteúdo confidencial seguem as regras de perfil. |
| Responsável (autor da proposta) | Ivan Lucio Teles de Souza (PO), implementado via agente |
| Aprovador humano | Pendente: validação do adendo pelo comitê do time, junto com o gate NB-03 |
| Referências | `docs/sdlc/execucoes/radar-propostas-cases/NB-02-adendo-exportacao-permissoes-auditoria.md`, DEC-0007, DEC-0008 |
| Supersede | N/A |

## DEC-0010 — Feedbacks do teste com o time: chat por intenção, política de dados sem bloqueio, card rápido e novo discovery da listagem e ficha (radar-propostas-cases)

| Campo | Valor |
|---|---|
| ID | DEC-0010 |
| Data | 2026-11-04 |
| Fase / Etapa | 1. Negócio / NB-01 (discovery, rodada 2) e NB-02 (adendo 5) |
| Tipo | Mudança de escopo / mudança de regra de negócio / exceção de processo |
| Descrição | A partir dos feedbacks do teste de 2026-11-03, o PO decidiu: **F1 (cards de projeto)**: taxonomia "Área do cliente" e visão Executiva/Técnica, depois de uma nova rodada de discovery da listagem e da ficha que inclui executivos e diretoria (ausentes nos stakeholders do NB-01); antes disso, só o card rápido sem cadastro novo (segmento, kit de documentos, porte por faixa de valor, relação com o cliente). **F2 (avisos de dados sensíveis)**: boas-vindas amigáveis com termo aceito uma vez por perfil e versão, e mascaramento automático, sem bloqueio, de dados pessoais, cartões, senhas e chaves antes de gravar e antes de enviar texto à IA. **Isso altera a forma de aplicar a RN-V0-01 (DEC-0009)**: sai a confirmação a cada ação; a regra de não usar dados sensíveis da NTT continua, comunicada como boa prática e reforçada pelo mascaramento. **F3 (chat)**: roteador de intenção (listagem, contagem, ficha, comparação), ferramentas da IA para perguntas compostas, esclarecimento e sugestões por tipo na interface. F2, F3 e o card rápido foram implementados no protótipo (incremento 6). Casos de uso em `NB-02-adendo-feedbacks-teste-2026-11-03.md`; discovery em `NB-01-discovery-r2-projetos-listagem-ficha.md` e `NB-01-discovery-r2-catalogo-informacoes-projeto.md`. |
| Justificativa | Respostas inadequadas do chat em 4 de 5 perguntas reais; 13 confirmações de aviso em 72 minutos (fadiga de alerta e perda de credibilidade); cards com informação técnica pouco útil para executivos. |
| Restrições | Arquivos binários originais (PDF, DOCX, PPTX, XLSX) continuam guardados como enviados (questão 2.5 do adendo 5, em aberto). O mascaramento cobre padrões conhecidos; dados sensíveis sem padrão (ex.: estratégia comercial) dependem da boa prática do usuário. Números, listas e fichas do chat vêm sempre do banco, com as permissões do usuário. |
| Responsável (autor da proposta) | Ivan Lucio Teles de Souza (PO), análise e implementação via agente |
| Aprovador humano | Pendente: validação pelo comitê do time, junto com o gate NB-03 |
| Referências | `docs/sdlc/execucoes/radar-propostas-cases/NB-02-adendo-feedbacks-teste-2026-11-03.md`, `NB-01-discovery-r2-projetos-listagem-ficha.md`, `NB-01-discovery-r2-catalogo-informacoes-projeto.md`, DEC-0009 |
| Supersede | Altera a forma de aplicação da RN-V0-01 descrita em DEC-0009 (a regra permanece) |
