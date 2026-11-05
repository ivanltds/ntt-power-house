# Radar de Propostas & Cases — V0

Protótipo local para validar a hipótese do discovery (NB-01 de `radar-propostas-cases`):

> Uma base de propostas e cases com busca semântica e fontes rastreáveis reduz o tempo para encontrar referências e aumenta o reaproveitamento de conhecimento em novas propostas.

**Tudo é fictício:** clientes, pessoas, valores e resultados foram inventados.

## Como rodar localmente (passo a passo)

> Esta seção foi escrita para ser seguida **à risca por uma pessoa ou por um agente de IA**, sem conhecimento prévio do projeto. Cada passo diz o comando, o que esperar e o que fazer se der errado. Validada num clone limpo do GitHub em 05/11/2026 (Windows 11, Node 24.19).

### Resumo em 4 comandos

```bash
git clone --branch sdlc/negocio/nb-03/radar-propostas-cases https://github.com/ivanltds/ntt-power-house.git
cd ntt-power-house/radar-v0
node -v          # precisa ser v22.13.0 ou maior
npm start        # depois abra http://localhost:3000
```

Não existe `npm install`: o projeto tem **zero dependências**. Não precisa de banco externo, Docker, chave de IA nem internet (depois do clone).

### Regras para o agente de IA

- Rode todos os comandos **dentro da pasta `radar-v0`** (a que tem o `package.json`).
- **Não** rode `npm install`, `npm audit fix` nem adicione pacotes: não há dependências e o projeto deve continuar sem elas.
- **Não** crie nem edite arquivos de código para "fazer funcionar". Se um passo falhar, use a tabela [Problemas comuns](#problemas-comuns); se não resolver, pare e mostre o erro para a pessoa.
- **Nunca** escreva uma chave de API em arquivo versionado nem a mostre no chat. A chave, se houver, vai só no `.env`, que o git ignora.
- **Não** faça commit dos arquivos gerados ao usar o app (banco, índice, conversas). O `.gitignore` já os exclui; não force com `git add -f`.
- O servidor fica rodando em primeiro plano. Para continuar usando o terminal, rode-o em segundo plano, guarde o PID e pare só esse processo no fim (passo 6).

### Passo 1. Conferir o Node.js

```bash
node -v
```

- Esperado: `v22.13.0` ou maior (ex.: `v22.14.0`, `v24.19.0`).
- Se o comando não existir ou a versão for menor, instale o Node.js LTS: https://nodejs.org (Windows: `winget install OpenJS.NodeJS.LTS`; macOS: `brew install node`; Linux: `nvm install --lts`). Feche e reabra o terminal e confira de novo.
- Motivo: o banco é o SQLite embutido no Node (`node:sqlite`), disponível sem flag a partir da 22.13.

### Passo 2. Baixar o código

```bash
git clone --branch sdlc/negocio/nb-03/radar-propostas-cases https://github.com/ivanltds/ntt-power-house.git
cd ntt-power-house/radar-v0
```

- O app fica na pasta `radar-v0` do repositório `ntt-power-house`; o resto do repositório é a documentação do processo SDLC.
- Quando o código estiver na `main`, o `--branch ...` deixa de ser necessário.
- Se já tiver o repositório: `git fetch`, `git checkout sdlc/negocio/nb-03/radar-propostas-cases`, `git pull` e entre em `radar-v0`.

### Passo 3 (opcional). Ligar a IA DeepSeek

Sem este passo o Radar funciona em **modo offline**: respostas por regras e busca local, e o topo da tela mostra o selo "IA offline". Para usar a IA:

```bash
cp .env.example .env          # Windows PowerShell: Copy-Item .env.example .env
```

Abra o `.env` e preencha `DEEPSEEK_API_KEY=` com a chave que a pessoa fornecer. O resto pode ficar como está. Use só dados fictícios com a IA externa (regra do projeto: DEC-0007 e DEC-0008).

Variáveis aceitas, todas opcionais (no `.env` ou na linha de comando):

| Variável | Para que serve | Padrão |
|---|---|---|
| `DEEPSEEK_API_KEY` | Liga a IA. Vazio = modo offline | vazio |
| `LLM_PROVIDER` | `deepseek` ou `mock` (força o modo offline) | `deepseek` |
| `DEEPSEEK_MODEL`, `DEEPSEEK_BASE_URL`, `DEEPSEEK_TIMEOUT_MS` | Modelo, endereço e tempo máximo da IA | ver `.env.example` |
| `PORT` | Porta do servidor | `3000` |
| `HOST` | Interface de rede (`127.0.0.1` = só esta máquina) | todas |
| `RADAR_DATA_DIR` | Pasta do banco, índice, conversas e uploads | `data/` |
| `RADAR_LOGIN_USER`, `RADAR_LOGIN_PASS`, `RADAR_LOGIN_SECRET` | Exigem login na tela. Sem elas, não há login | sem login |

### Passo 4. Subir o servidor

```bash
npm start
```

Saída esperada. Na primeira execução o banco e o índice são preparados sozinhos, em cerca de 1 s:

```
Base preparada: 11 projetos, 51 documentos, 118 trechos
Radar V0 em http://localhost:3000
Login: desligado (defina RADAR_LOGIN_USER e RADAR_LOGIN_PASS para exigir)
IA: mock offline (defina DEEPSEEK_API_KEY no .env para usar a DeepSeek)
```

O número de trechos pode variar em 1 (118 ou 119). Com a chave configurada, a última linha é `IA: DeepSeek (deepseek-chat)`. Nas execuções seguintes a linha "Base preparada" não aparece, porque o banco já existe.

Outra porta: `PORT=8080 npm start` (bash) ou `$env:PORT=8080; npm start` (PowerShell).

### Passo 5. Conferir que está funcionando

Com o servidor rodando, em outro terminal:

```bash
curl -s http://localhost:3000/api/sessao
# esperado: {"login":false}

curl -s -H "Content-Type: application/json" -d '{"query":"propostas de utilities com Databricks","userId":"u-consultor"}' http://localhost:3000/api/buscar
# esperado: JSON que começa com {"query":"propostas de utilities com Databricks","entendimento":{"intencao":"buscar"
```

No Windows PowerShell, `curl` é outro comando e o `curl.exe` perde as aspas do JSON. Use:

```powershell
Invoke-RestMethod http://localhost:3000/api/sessao
# esperado: uma coluna "login" com o valor False

(Invoke-RestMethod -Method Post -Uri http://localhost:3000/api/buscar -ContentType 'application/json' -Body '{"query":"propostas de utilities com Databricks","userId":"u-consultor"}').entendimento.intencao
# esperado: buscar
```

Depois abra **http://localhost:3000** no navegador. Deve aparecer "O que você procura?" e o selo **V0.0.1** ao lado de "Radar". A página `http://localhost:3000/status` mostra versões, tickets e feedbacks.

Perfis de teste (troque no menu ⋮ do canto superior direito, campo "Ver como"):

| id | Perfil | Diferença |
|---|---|---|
| `u-consultor` | Consultor(a) de pré-vendas | Não vê valores nem documentos confidenciais; não cadastra projetos |
| `u-gestor` | Gestor(a) comercial | Vê valores e confidenciais; cadastra e edita projetos |

### Passo 6. Parar o servidor

- No terminal onde ele roda: `Ctrl+C`.
- Se rodou em segundo plano, pare **só** esse processo pelo PID: `kill <PID>` (bash) ou `Stop-Process -Id <PID>` (PowerShell). Para achar o PID pela porta: `lsof -i :3000` (macOS/Linux) ou `Get-NetTCPConnection -LocalPort 3000 | Select-Object OwningProcess` (PowerShell) ou `netstat -ano | findstr :3000` (Windows; o PID é o último número). Não mate todos os processos `node` da máquina.

### Comandos úteis

```bash
npm test                  # 52 testes automatizados; esperado: "pass 52" e "fail 0"
npm run setup             # recria a base fictícia do zero (apaga o que foi cadastrado ou enviado localmente)
npm run ingest            # reindexa sem apagar o que foi cadastrado ou enviado
npm run ask -- "propostas de utilities com Databricks"   # pergunta pelo terminal, sem navegador
```

Os testes gravam numa pasta temporária e não mexem nos seus dados. O `npm run setup` regenera `data/corpus/` e `amostras/` com o mesmo conteúdo, então o `git status` continua limpo.

Sem `npm`: `node --disable-warning=ExperimentalWarning src/server.js` (start) e `node --disable-warning=ExperimentalWarning --test test/radar.test.js` (testes).

### Onde ficam os dados locais

O que você cria ao usar (conversas, uploads, projetos cadastrados, avaliações, tickets) fica em `data/` (ou em `RADAR_DATA_DIR`) e fora do git: `radar.db*`, `vectorstore/`, `conversas/`, `auditoria/`, `uploads/`, `termos.json` e `qualidade.json`. Para voltar ao estado inicial: pare o servidor, apague esses itens e rode `npm start` de novo, ou rode `npm run setup`.

### Problemas comuns

| Sintoma | Causa | O que fazer |
|---|---|---|
| `No such built-in module: node:sqlite` ou `ERR_UNKNOWN_BUILTIN_MODULE` | Node antigo | Passo 1: instale o Node 22.13 ou maior |
| `EADDRINUSE: address already in use :::3000` | Porta ocupada | Use outra porta (`PORT=3001 npm start`) ou pare o processo que usa a 3000 |
| `npm` não encontrado, mas `node` funciona | Instalação sem npm | Use os comandos "Sem `npm`" acima |
| O topo da tela mostra "IA offline" | Sem `DEEPSEEK_API_KEY`, sem internet ou chave inválida | Normal sem chave. Com chave, confira o `.env` e reinicie o servidor |
| Cada pergunta leva 5 a 10 s | IA ligada (chamada à DeepSeek) | Esperado. No modo offline é instantâneo |
| Redireciona para `/login` | `RADAR_LOGIN_USER` e `RADAR_LOGIN_PASS` definidos | Entre com esses valores ou remova-os do `.env` |
| `git status` mostra muitos arquivos alterados depois do `setup` | Clone anterior ao `.gitattributes` (diferença só de fim de linha) | `git rm --cached -r -q . && git reset --hard` dentro de `radar-v0`, ou clone de novo |
| Página em branco ou 404 | Servidor iniciado fora de `radar-v0` ou ainda subindo | Rode `npm start` dentro de `radar-v0` e espere a linha "Radar V0 em ..." |

### Publicar numa VM (opcional)

Copie a pasta sem `data/radar.db*`, `data/vectorstore`, `data/uploads`, `data/conversas`, `data/auditoria`, `data/termos.json` e `data/qualidade.json`, e rode `npm start`: banco e índice são recriados na primeira execução. Atrás de um proxy reverso, use `HOST=127.0.0.1` e defina `RADAR_LOGIN_*` para exigir login.

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
