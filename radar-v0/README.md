# Radar de Propostas & Cases — V0

Protótipo local para validar a hipótese do discovery (NB-01 de `radar-propostas-cases`):

> Uma base de propostas e cases com busca semântica e fontes rastreáveis reduz o tempo para encontrar referências e aumenta o reaproveitamento de conhecimento em novas propostas.

**Tudo é fictício:** clientes, pessoas, valores e resultados foram inventados.

## Requisitos

- **Node.js 22.13 ou superior. Só isso.** O banco relacional é o SQLite que já vem dentro do Node (`node:sqlite`). Confira a versão na VM com `node -v`.
- **Zero dependências npm.** Não precisa de `npm install` nem de acesso à internet: tudo usa módulos nativos do Node.
- **IA (opcional):** DeepSeek, configurada no `.env` (copie de `.env.example`). Sem chave ou sem internet, o sistema funciona em modo offline, só com regras, e avisa na tela.

## Como rodar (na VM)

```bash
# 1. Gera os documentos fictícios e as amostras de upload, cria o banco e indexa
npm run setup             # apaga e recria o banco (data/radar.db)

# 2. Sobe a interface web
npm start                 # http://localhost:3000  (outra porta: PORT=8080 npm start)

# Opcional
npm run ask -- "propostas de utilities com plataforma de dados Databricks"
npm run ingest            # reindexa sem apagar o que foi cadastrado ou enviado
npm test                  # 30 testes automatizados
```

Para levar à VM, copie a pasta sem `data/radar.db*`, `data/vectorstore`, `data/uploads`, `data/conversas` e `data/auditoria`. Se essas pastas não existirem, o servidor recria o banco e o índice na primeira execução.

Sem `npm`, use os comandos equivalentes:
```bash
node scripts/generate-corpus.js
node scripts/generate-samples.js
node --disable-warning=ExperimentalWarning src/ingest.js --reset
node --disable-warning=ExperimentalWarning src/server.js
```

## Telas

| Aba | O que faz | Casos de uso |
|---|---|---|
| **Busca conversacional** | Chat com memória, IA, conversas salvas e favoritas | UC03, UC05, UC06 |
| **Projetos** | Exploração com texto e filtros combinados (facetas com contagem, "todas/qualquer", faixas, pessoa/KPI/risco citado), detalhe do projeto, cadastro e edição com sugestão inteligente | UC07, UC08 |
| **Upload** | Envio multiformato, fila com etapas ao vivo, revisão de metadados e confirmação ou rejeição | UC02 |
| **Insights da base** | Conversão por segmento e tecnologia, tecnologias que andam juntas, resultados de cases, lições de perdas, curadoria e correções | UC09 |
| **Documentos** | Lista de tudo o que o perfil pode ver | — |
| **Métricas da hipótese** | Buscas, utilidade, tempo até a primeira referência útil | NB-01 |

Os casos de uso estão em [`docs/`](docs/). O modelo de dados está em [`docs/MER-base-de-conhecimento.md`](docs/MER-base-de-conhecimento.md).

## Upload e processamento de metadados

Formatos: **DOCX, PPTX, XLSX, PDF, VTT/SRT, EML, HTML, CSV, JSON, MD e TXT**, com até 15 MB por arquivo. A pasta [`amostras/`](amostras/) tem um arquivo de cada formato para a demo.

Cada arquivo passa por estas etapas, visíveis na tela:

1. **Recebimento:** SHA-256, formato real e bloqueio de arquivo idêntico.
2. **Extração de texto:** títulos, listas, slides, notas do apresentador, planilhas, falas com falante e minuto, cabeçalhos de e-mail e propriedades do arquivo.
3. **Regras e vocabulário:**
   - tipo e status do documento (com alternativas);
   - cliente, título, segmento, tecnologias e serviços;
   - prazo (meses, semanas, sprints, soma de semanas em planilha), valor (com "mil" e "milhões") e margem;
   - data e idioma;
   - pessoas e papéis, organizações, KPIs, riscos e lições;
   - resumo e palavras-chave por TF-IDF;
   - dados pessoais (mascarados) e confidencialidade sugerida.
4. **IA (DeepSeek):** completa e confirma os metadados. O que a IA sugere e não está no texto é **descartado** (cliente, pessoas, prazo, valor).
5. **Vínculo:** sugere o projeto pelo cliente, pelo conteúdo e pelo título, ou propõe um **projeto novo** pré-preenchido.
6. **Duplicidade e conflitos:** avisa sobre conteúdo mais de 90% igual e sobre prazo, valor ou cliente divergentes, dizendo qual fonte prevalece.
7. **Qualidade:** mostra a completude e o que falta revisar.

O documento **só entra na base depois da revisão humana**. Cada sugestão alterada fica registrada como correção (RNF08) e aparece em Insights.

## Persistência e consultas

| Camada | Onde | Para quê |
|---|---|---|
| Relacional | `data/radar.db` (SQLite embutido no Node, WAL) | Projetos, clientes, documentos, entidades, taxonomia, usuários, uploads, correções e histórico |
| Busca textual | FTS5 (BM25, sem acento) | Busca por palavras com trecho destacado |
| Vetorial | `data/vectorstore/radar.json` (API no estilo Chroma) | Similaridade semântica dos trechos. É derivada do banco e reconstruída a cada confirmação |

- **Busca do chat:** híbrida (vetor + BM25).
- **Exploração:** combina texto, facetas, faixas e entidades em uma única consulta SQL indexada, em 3 a 8 ms na base piloto.
- **Permissão:** confidencialidade e valores são filtrados **dentro** de todas as consultas: chat, exploração, detalhe, insights e lista de clientes.

## O que está real e o que está simulado

| Parte | No V0 | Caminho para produção |
|---|---|---|
| Banco, busca textual e base vetorial | **Real**, só com Node | PostgreSQL + pgvector (ou Chroma) |
| Embeddings | **Real, porém simples:** TF-IDF com hashing, offline | Modelo multilíngue (ex.: `multilingual-e5`) |
| IA | **Real com DeepSeek**, com fallback por regras | Modelo hospedado internamente para dados reais (R10) |
| Upload, extração e metadados | **Real** | OCR para PDF escaneado; arquivos do SharePoint |
| Usuários e perfis | **Fixos** (consultor e gestor) | SSO |

## Base piloto

- **Projetos e documentos:** 11 projetos e 51 documentos (propostas, apresentações, estimativas, transcrições, cases e atas de perda), em 8 segmentos. Um dos projetos é **confidencial**.
- **Oportunidades:** 2 oportunidades com briefing.
- **Perfis:**
  - **Consultor:** não vê o projeto confidencial nem valores e margens.
  - **Gestor:** vê tudo.

## Roteiro de demo

1. **Busca (consultor):**
   - Pergunte *"propostas de utilities com plataforma de dados Databricks"* e depois *"e o segundo?"*. Mostre a memória, o score por fator e o conflito de prazo.
   - Pergunte *"receita de bolo"*: o sistema diz que está fora do domínio, em vez de inventar.
2. **Upload (gestor):**
   - Envie `amostras/proposta-banco-aurora-antifraude.docx`.
   - Mostre as etapas, os selos de confiança e as entidades extraídas. O documento é marcado como **confidencial**, e o sistema recomenda criar o projeto novo "Banco Aurora".
   - Confirme. Pergunte no chat *"fraude em PIX"* e o projeto aparece.
   - Troque para **consultor**: o projeto some de todas as telas.
3. **Upload de um cliente existente:** envie `amostras/apresentacao-energisul-fase2.pptx`. O sistema vincula ao P001 e aponta o conflito de prazo (5 contra 6 meses).
4. **Projetos:**
   - Filtre "Databricks" + "Azure" (todas) e troque para "qualquer".
   - Busque o texto "perdas" e filtre "Citado nos documentos › Pessoa: Marina".
   - Clique em **+ Novo projeto**, descreva em uma frase e use **✨ Sugerir campos**.
5. **Insights:** conversão por segmento e tecnologia, lições de propostas perdidas e correções feitas nas sugestões.

## Limitações conhecidas do V0

- Os embeddings são locais (hashing), porque a DeepSeek não tem API de embeddings. A semântica entra na interpretação, na reavaliação e na extração.
- Com a DeepSeek, cada pergunta leva de 5 a 10 s e cada upload de 2 a 5 s. No modo offline, os dois são instantâneos.
- **Dados enviados à DeepSeek** (perguntas, trechos e documentos enviados): só dados fictícios até haver aprovação de segurança/jurídico (DEC-0007, DEC-0008, R10).
- PDF escaneado (imagem) não tem OCR: o sistema avisa e pede revisão manual.
- As amostras DOCX, PPTX e XLSX são arquivos mínimos, gerados para teste. Arquivos reais do Office usam a mesma estrutura e são lidos pelo mesmo extrator.
- A base vetorial é reconstruída inteira a cada confirmação (cerca de 200 ms para 50 documentos). Para milhares de documentos, o próximo passo é a indexação incremental.
- Conversas não salvas ficam só na memória do servidor.
