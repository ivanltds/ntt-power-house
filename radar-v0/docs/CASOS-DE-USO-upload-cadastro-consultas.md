# NB-02 — Adendo 3: upload e processamento de documentos, cadastro de projetos e consultas

> Demanda: **radar-propostas-cases** · Etapa: NB-02 — Especificação de Requisitos (adendo 3)
> Status: **Solicitado pelo PO em 2026-10-29 — aguardando validação do comitê do time**, junto com NB-03 e a apresentação do V0 (ver DEC-0008)
> Base: `NB-02-especificacao-requisitos.md` (repositório ntt-power-house) (UC01, UC02, RNF08, RNF10, RNF11) e [`NB-02-adendo-memoria-conversas-ia.md`](./CASOS-DE-USO-memoria-conversas-ia.md)
> MER: [`DEV-01-insumo-MER-base-de-conhecimento.md`](./MER-base-de-conhecimento.md)
> Implementação de referência: protótipo `radar-v0`

## 0. Contexto

O PO pediu para o V0:
- deixar de simular o **upload** e implementar o **cadastro de novos projetos**;
- oferecer **muitas possibilidades de processamento** para gerar metadados;
- garantir **persistência** e **consultas complexas e eficientes**.

Este adendo:
1. detalha o **UC02** (já aprovado em nível macro) em sub-casos de uso;
2. cria o **UC07** (cadastrar e editar projeto), o **UC08** (explorar a base com filtros combinados) e o **UC09** (insights da base);
3. registra o MER da base como insumo de DEV-01.

Restrição mantida: a VM roda **somente Node**. A persistência usa o SQLite embutido no Node (`node:sqlite`, Node **22.13 ou superior**), sem instalar nada.

## 1. UC02 — Enviar e classificar documento (detalhamento)

Os critérios de aceite macro do UC02 continuam valendo. Os sub-casos abaixo detalham o pipeline. Cada envio vira um **processamento** com etapas registradas, mostradas ao vivo.

| # | Sub-UC | O que o sistema faz |
|---|---|---|
| UC02.1 | Receber arquivo | Aceita vários arquivos de uma vez, até 15 MB cada. Calcula o SHA-256 e detecta o formato real pelo conteúdo, não só pela extensão. |
| UC02.2 | Extrair texto multiformato | Extrai texto e propriedades do arquivo (título, autor, data, páginas, slides). Formatos e o que é extraído de cada um estão na tabela abaixo. |
| UC02.3 | Classificar tipo e status documental | Classifica o tipo: proposta, apresentação, estimativa, transcrição, case, ata/lições, SOW, e-mail, documento técnico ou outro. Usa pistas do nome, do formato e do conteúdo e dá até 3 alternativas. Também infere o status do documento e o status da proposta. |
| UC02.4 | Extrair metadados | Extrai: cliente, título e segmento; tecnologias e serviços (vocabulário controlado + termos novos); prazo (meses, semanas, sprints, soma de semanas em planilha); valor em R$ (com escala) e margem; data do conteúdo; idioma; objetivo. |
| UC02.5 | Extrair entidades | Extrai: pessoas (falantes, papéis declarados, remetente, autor do arquivo), organizações, resultados/KPIs, riscos, lições aprendidas, datas, prazos e valores citados. Cada uma vem com o trecho de evidência. |
| UC02.6 | Gerar resumo e palavras-chave | Resumo extrativo (TF-IDF) ou gerado pela IA. Palavras-chave por TF-IDF contra a base. |
| UC02.7 | Enriquecer com IA | Chama a DeepSeek para metadados semânticos. Quando IA e regras concordam, a confiança sobe. **Valores da IA que não aparecem no texto são descartados** (cliente, pessoas, prazo, valor). Se a IA falhar, segue só com regras. |
| UC02.8 | Detectar dados pessoais e sugerir confidencialidade | Detecta CPF, CNPJ, e-mail e telefone, mascarados na tela. Sugere "confidencial" quando o documento se declara restrito, quando contém CPF ou quando o projeto é confidencial. |
| UC02.9 | Sugerir vínculo com projeto | Ranqueia projetos existentes por mesmo cliente, conteúdo semelhante e título parecido, ou recomenda **criar projeto novo** com campos pré-preenchidos. |
| UC02.10 | Detectar duplicidade e conflitos | Bloqueia arquivo idêntico (mesmo hash). Alerta sobre conteúdo mais de 90% parecido e sobre divergência de prazo, valor ou cliente com o projeto, indicando qual fonte prevalece pela hierarquia de confiança. Também alerta quando o documento cita vários clientes. |
| UC02.11 | Avaliar qualidade dos metadados | Calcula a completude em % e lista o que falta revisar. |
| UC02.12 | Revisão humana | O revisor vê cada campo com selo de confiança e método, consulta o trecho que sustenta a sugestão e aplica alternativas com um clique. Pode editar tudo, escolher o destino e então **confirmar e indexar** ou **rejeitar**. |
| UC02.13 | Registrar correções (RNF08) | Cada campo alterado em relação à sugestão é gravado com o método que errou. Vira métrica em Insights. |
| UC02.14 | Indexar | Grava documento, entidades e trechos, atualiza a busca textual e o índice vetorial e recalcula os projetos relacionados. O documento passa a aparecer no chat, na exploração e nos insights. |
| UC02.15 | Complementar informações na revisão | Além de corrigir o que foi extraído, o revisor informa o que não está no arquivo: autor, versão, link do original (só http/https), **por que o documento é relevante** (nota que entra na busca) e se é um **bom modelo para reaproveitar**. Também edita as listas de pessoas (com papel), organizações, resultados, lições e riscos: remove o que não procede e acrescenta o que faltou (gravados com método "manual"). Cada lista alterada é registrada como correção (RNF08). Tudo aparece no detalhe do projeto. *(adicionado em 30/10/2026)* |

**Formatos suportados (UC02.2):**

| Formato | O que é extraído |
|---|---|
| DOCX | Títulos, listas, parágrafos e propriedades |
| PPTX | Slides e notas do apresentador |
| XLSX | Planilhas e linhas como "coluna: valor" |
| PDF | Texto, com aviso se o PDF for escaneado |
| VTT e SRT | Falante e minuto de cada fala |
| EML | Cabeçalhos, corpo, quoted-printable/base64 e data |
| HTML | Títulos e listas, sem scripts |
| CSV, JSON, MD e TXT | Conteúdo; frontmatter, no caso de MD |

**Critérios de aceite adicionais:**
- [ ] Dado que envio DOCX, PPTX, XLSX, PDF, VTT, EML, HTML ou CSV, quando o processamento termina, então vejo o texto extraído e as etapas com status e tempo.
- [ ] Dado um documento sem revisão, quando qualquer usuário busca, então ele não aparece. Depois da confirmação, aparece na busca do chat e na exploração.
- [ ] Dado que a IA sugere um cliente, uma pessoa, um prazo ou um valor que não está no texto, quando o sistema consolida, então a sugestão é descartada e informada.
- [ ] Dado que envio um arquivo idêntico a outro já indexado, quando tento confirmar, então o sistema bloqueia.
- [ ] Dado um perfil sem permissão de valores, quando revisa um upload, então valor e margem sugeridos não são exibidos nem gravados.
- [ ] Dado que altero uma sugestão, quando confirmo, então a correção fica registrada com o campo, o valor sugerido, o valor final e o método.
- [ ] Dado que o documento é de um cliente novo, quando escolho "criar projeto novo", então o projeto nasce com os campos pré-preenchidos e revisados.

## 2. UC07 — Cadastrar e editar projeto

**Ator:** comercial, pré-vendas, consultor ou gestor.

**Fluxo principal:**
1. O usuário abre "Novo projeto". Pode descrever o projeto em texto livre e pedir **"Sugerir campos"**: regras e IA preenchem cliente, título, segmento, tecnologias, serviços, prazo, status e objetivo, e o sistema mostra **projetos parecidos** já existentes.
2. O usuário revisa e preenche os campos:
   - **obrigatórios:** cliente, título, segmento e status;
   - **opcionais:** confidencialidade, prazo, valor e margem (só para quem tem permissão), responsável, área, data, link, contexto e objetivo;
   - **tecnologias e serviços** escolhidos na taxonomia, com opção de termo novo.
3. O sistema valida e verifica **duplicata** (mesmo cliente e título parecido). Se houver, pede confirmação.
4. O projeto recebe um identificador (P0NN) e uma **ficha indexada**, para aparecer no chat mesmo sem documentos.
5. Na edição, cada alteração fica no **histórico** (quem, quando, antes e depois) e a ficha é atualizada.

**Regras:**
- O usuário não pode classificar um projeto com um nível de confidencialidade que ele não enxerga.
- Ao tornar um projeto confidencial, os documentos dele também ficam confidenciais.
- O detalhe do projeto mostra:
  - completude dos dados;
  - documentos com nível de confiança;
  - entidades agregadas (resultados, lições, riscos, pessoas);
  - divergências entre fontes;
  - projetos relacionados;
  - histórico.

**Critérios de aceite:**
- [ ] Dado que deixo de informar cliente, título, segmento ou status, quando salvo, então recebo as mensagens de validação.
- [ ] Dado que já existe um projeto do mesmo cliente com título parecido, quando salvo, então o sistema avisa e só cadastra se eu confirmar.
- [ ] Dado que cadastrei um projeto sem documentos, quando pergunto sobre o tema no chat, então ele aparece como referência.
- [ ] Dado que altero prazo e status, quando abro o detalhe, então vejo as duas alterações no histórico.
- [ ] Dado um perfil consultor, quando tenta marcar um projeto como confidencial, então a alteração é recusada.

### UC07.4 — Editar informações de um documento *(adicionado em 30/10/2026)*

No detalhe do projeto, cada documento tem **Editar informações**. O formulário traz os mesmos campos da revisão do upload (UC02.15):
- título, tipo, status, data e acesso;
- autor, versão, link do original, nota "por que é relevante" e a marca "bom modelo";
- resumo, palavras-chave, prazo, idioma, e valor e margem (só para quem tem permissão);
- listas editáveis de pessoas, organizações, resultados, lições e riscos.

**Regras:**
- Só edita quem enxerga o nível de acesso do documento. O acesso nunca fica mais aberto que o do projeto.
- Perfis sem permissão de valores não alteram valor nem margem, mesmo que enviem esses campos.
- Mudar tipo ou status recalcula o nível de confiança da fonte.
- Cada alteração vai para o histórico do projeto como "documento · campo". Itens de entidade mantidos preservam o trecho e o método de origem; os novos ficam como "manual".
- Ao salvar, a busca é reindexada: a nota do revisor passa a ser encontrada no chat.

**Critérios de aceite:**
- [ ] Dado que adiciono uma lição a um documento, quando salvo, então ela aparece nas Lições do projeto.
- [ ] Dado que altero o autor, quando abro o histórico do projeto, então vejo "documento · autor" com antes e depois.
- [ ] Dado um consultor, quando tenta alterar o valor de um documento, então o valor não muda.

## 3. UC08 — Explorar a base com filtros combinados

**Ator:** qualquer perfil com permissão de consulta.

**Fluxo principal:**
1. Na aba **Projetos**, o usuário combina livremente:
   - **texto** nos documentos (todas ou qualquer palavra, ranking BM25 e trecho destacado);
   - **cliente**;
   - **facetas** com contagem: segmento, status, tecnologias (todas ou qualquer), serviços (todas ou qualquer) e tipo de documento existente;
   - **faixas** de prazo, valor (só com permissão) e data;
   - **"citado nos documentos"**: pessoa, organização, KPI, risco, lição ou palavra-chave.
2. O sistema devolve os projetos paginados, com ordenação, total, tempo da consulta e facetas recalculadas sobre o resultado.
3. Clicar em um projeto abre o detalhe (UC07).

**Critérios de aceite:**
- [ ] Dado que filtro Databricks **e** Azure, quando o resultado aparece, então todos os projetos têm as duas tecnologias. Com "qualquer", aparecem os que têm pelo menos uma.
- [ ] Dado que combino texto, segmento e status, quando busco, então só aparecem projetos que atendem a tudo, com o trecho encontrado destacado.
- [ ] Dado um perfil consultor, quando busco um termo que só existe em projeto confidencial, então nada aparece. O filtro de valor é ignorado.
- [ ] Dado qualquer consulta na base piloto, quando executada, então responde em menos de 50 ms.

## 4. UC09 — Insights da base para novas propostas

**Ator:** qualquer perfil com permissão de consulta. Os números consideram apenas o que o perfil pode ver.

**O que é exibido:**
- Totais e **taxa de conversão** (ganhos / (ganhos + perdidos)).
- **Por segmento** e **por tecnologia:** projetos, conversão, prazo médio e valor médio (só com permissão).
- **Tecnologias que aparecem juntas**, como candidatas a pacotes de oferta.
- **Documentos por tipo**, com a completude média dos metadados.
- **Resultados comprovados** em cases e **lições de propostas perdidas**.
- **Curadoria:**
  - termos novos pendentes;
  - projetos sem fonte de alta confiança;
  - uploads aguardando revisão.
- **Correções nas sugestões automáticas** (RNF08), por campo e método.
- Clicar em um segmento ou tecnologia abre a exploração já filtrada.

**Critérios de aceite:**
- [ ] Dado o perfil consultor, quando abro os insights, então o projeto confidencial não entra em nenhum total ou média, e o valor médio não aparece.
- [ ] Dado que corrigi sugestões em uploads, quando abro os insights, então vejo as correções por campo e método.

## 5. Impactos

| Item | Impacto |
|---|---|
| Requisito de ambiente | A VM precisa de **Node 22.13 ou superior** (por causa do `node:sqlite`). Sem isso, o servidor avisa a versão mínima e não sobe. |
| Modelo de dados | O MER completo vira insumo de DEV-01. No MVP, a tendência é PostgreSQL com pgvector, mantendo o desenho lógico. |
| Riscos | **R10 (API externa / LGPD):** documentos enviados vão para a DeepSeek quando a IA está ligada. Só usar dados fictícios até haver aprovação. A detecção de PII ajuda, mas não substitui a revisão. **Novo risco R11:** a extração de PDF escaneado não tem OCR no V0. |
| Métricas da hipótese | O nº de correções por campo (RNF08) aparece em Insights. O tempo entre upload e indexação fica registrado (`processamento.criado_em` e `documento.revisado_em`), mas ainda não é exibido. |
