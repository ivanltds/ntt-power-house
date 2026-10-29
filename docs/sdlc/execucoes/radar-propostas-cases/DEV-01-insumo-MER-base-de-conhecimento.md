# MER — Base de conhecimento do Radar de Propostas & Cases

> Modelo entidade-relacionamento do protótipo `radar-v0`.
> Implementação física: SQLite embutido no Node (`node:sqlite`) com busca textual FTS5. DDL em `radar-v0/src/db/schema.sql`.
> Insumo para DEV-01 (arquitetura e modelo de dados) — não substitui o artefato da etapa, que depende do gate NB-04. No MVP, o banco tende a ser PostgreSQL com pgvector, com o mesmo desenho lógico.

## 1. Visão geral

A base é organizada em três camadas:

| Camada | Onde fica | Papel |
|---|---|---|
| Relacional (sistema de registro) | `data/radar.db` | Projetos, clientes, documentos, metadados, entidades, taxonomia, usuários, processamento de uploads, correções e histórico |
| Textual | Tabela virtual `trecho_fts` (FTS5) | Busca por palavras com ranking BM25, sem acento e sem diferença de maiúsculas |
| Vetorial (derivada) | `data/vectorstore/radar.json` | Embeddings dos trechos para busca por similaridade. É reconstruída a partir do banco por `npm run ingest` ou ao confirmar um upload ou cadastro |

Conversas do chat (`data/conversas/`) e auditoria das buscas (`data/auditoria/*.jsonl`) ficam em arquivos, fora deste modelo, como no V0 anterior.

## 2. Diagrama

```mermaid
erDiagram
    SEGMENTO ||--o{ CLIENTE : "classifica"
    SEGMENTO ||--o{ PROJETO : "classifica"
    SEGMENTO ||--o{ OPORTUNIDADE : "classifica"
    CLIENTE ||--o{ PROJETO : "contrata"
    PROJETO ||--o{ PROJETO_TECNOLOGIA : "usa"
    TECNOLOGIA ||--o{ PROJETO_TECNOLOGIA : "é usada em"
    PROJETO ||--o{ PROJETO_SERVICO : "envolve"
    SERVICO ||--o{ PROJETO_SERVICO : "é prestado em"
    PROJETO ||--o{ PROJETO_RELACIONADO : "origem"
    PROJETO ||--o{ PROJETO_RELACIONADO : "relacionado"
    PROJETO ||--o{ DOCUMENTO : "possui"
    DOCUMENTO ||--o{ TRECHO : "é dividido em"
    TRECHO ||--|| TRECHO_FTS : "indexado em"
    DOCUMENTO ||--o{ DOCUMENTO_ENTIDADE : "menciona"
    USUARIO ||--o{ USUARIO_CONFIDENCIALIDADE : "pode ver"
    USUARIO ||--o{ PROCESSAMENTO : "envia"
    USUARIO ||--o{ DOCUMENTO : "revisa"
    USUARIO ||--o{ PROJETO : "cadastra"
    PROJETO ||--o{ PROCESSAMENTO : "destino escolhido"
    PROCESSAMENTO |o--o| DOCUMENTO : "gera"
    PROCESSAMENTO ||--o{ CORRECAO_METADADO : "registra"
    USUARIO ||--o{ CORRECAO_METADADO : "corrige"
    USUARIO ||--o{ HISTORICO_ALTERACAO : "altera"

    SEGMENTO {
        int id PK
        text nome UK
        text status "ativo | pendente_curadoria"
    }
    TECNOLOGIA {
        int id PK
        text nome UK
        text status "ativo | pendente_curadoria"
    }
    SERVICO {
        int id PK
        text nome UK
        text status "ativo | pendente_curadoria"
    }
    CLIENTE {
        int id PK
        text nome
        text nome_normalizado UK
        int segmento_id FK
        text criado_em
    }
    OPORTUNIDADE {
        text id PK
        text cliente_nome
        text titulo
        int segmento_id FK
        text descricao
        real prazo_meses
        json tecnologias_json
        json servicos_json
    }
    PROJETO {
        text id PK "P001..."
        int cliente_id FK
        text titulo
        int segmento_id FK
        text area
        text dono
        text status_proposta "Em elaboração ... Entregue, Perdida"
        text confidencialidade "publica | interna | confidencial"
        real prazo_meses
        real valor "restrito"
        real margem "restrito"
        text data_referencia
        text descricao
        text objetivo
        text link_sharepoint
        text origem "seed | cadastro | upload"
        text criado_por FK
        text criado_em
        text atualizado_em
    }
    PROJETO_TECNOLOGIA {
        text projeto_id PK, FK
        int tecnologia_id PK, FK
    }
    PROJETO_SERVICO {
        text projeto_id PK, FK
        int servico_id PK, FK
    }
    PROJETO_RELACIONADO {
        text projeto_id PK, FK
        text relacionado_id PK, FK
        real similaridade
        text motivo
    }
    DOCUMENTO {
        text id PK "P001-PROP, P001-UP1, P012-FICHA"
        text projeto_id FK
        text titulo
        text tipo_documental
        text status_documento
        int nivel_confianca "1 a 5"
        text confidencialidade
        text arquivo
        text formato "md, docx, pptx, pdf..."
        int tamanho_bytes
        text hash_sha256 UK
        text idioma
        text data_conteudo
        real prazo_meses
        real valor
        real margem
        text resumo
        json palavras_chave_json
        real qualidade_metadados
        int contem_pii
        text texto
        text origem "seed | upload | cadastro"
        text enviado_por FK
        text revisado_por FK
        text revisado_em
    }
    TRECHO {
        int rowid PK "liga ao FTS5"
        text id UK "DOC#n"
        text documento_id FK
        int ordem
        text texto
        int contem_valores "restringe a perfis com valores"
    }
    TRECHO_FTS {
        text texto "FTS5 unicode61 remove_diacritics"
    }
    DOCUMENTO_ENTIDADE {
        int id PK
        text documento_id FK
        text tipo "pessoa, organizacao, kpi, risco, licao, data, prazo, valor_monetario, palavra_chave, pii"
        text valor
        text valor_normalizado
        text trecho "evidência"
        real confianca
        text metodo "regras, estrutura, lexico, ia, tfidf..."
    }
    USUARIO {
        text id PK
        text nome
        text perfil
        int ver_valores
    }
    USUARIO_CONFIDENCIALIDADE {
        text usuario_id PK, FK
        text nivel PK
    }
    PROCESSAMENTO {
        text id PK
        text nome_arquivo
        text formato
        int tamanho_bytes
        text hash_sha256
        text caminho_arquivo
        text projeto_alvo_id FK
        text documento_id FK
        text status "enviado, processando, aguardando_revisao, indexado, rejeitado, erro"
        json etapas_json
        json sugestao_json
        text texto_extraido
        text erro
        text enviado_por FK
        text criado_em
        text concluido_em
    }
    CORRECAO_METADADO {
        int id PK
        text processamento_id FK
        text campo
        text valor_sugerido
        text valor_final
        text metodo_sugestao
        text usuario_id FK
        text em
    }
    HISTORICO_ALTERACAO {
        int id PK
        text entidade
        text entidade_id
        text campo
        text antes
        text depois
        text usuario_id FK
        text em
    }
```

## 3. Regras de negócio no modelo

| Regra | Como o modelo garante |
|---|---|
| **Permissão (UC03.5).** Ninguém vê o que não pode. | `projeto.confidencialidade` e `documento.confidencialidade` são cruzadas com `usuario_confidencialidade` em toda consulta: busca do chat, exploração, detalhe, insights e lista de clientes. O documento nunca é menos restrito que o projeto. Ao tornar o projeto confidencial, os documentos acompanham. |
| **Valores e margens.** | `projeto.valor/margem` e `documento.valor/margem` só saem para perfis com `ver_valores = 1`. `trecho.contem_valores` tira das buscas os trechos com preço. |
| **Hierarquia de fontes (UC03.8).** | `documento.nivel_confianca` é derivado do tipo e do status: 5 = proposta final aprovada ou SOW … 1 = rascunho. As divergências de prazo e valor entre documentos e cadastro são resolvidas por esse nível. |
| **Só indexa o que foi revisado (UC02).** | O upload vira `processamento` e fica em `aguardando_revisao`. Só a confirmação cria o `documento`, com os trechos, o FTS e o índice vetorial. |
| **Duplicidade.** | `documento.hash_sha256` é único, o que bloqueia o mesmo arquivo duas vezes. Arquivos quase idênticos (similaridade acima de 90%) geram alerta na revisão. |
| **Taxonomia controlada (RNF11).** | Segmento, tecnologia e serviço são tabelas próprias. Um termo novo entra como `pendente_curadoria` e aparece em Insights › Curadoria. |
| **Auditoria de correções (RNF08).** | Cada campo sugerido que o revisor altera gera uma linha em `correcao_metadado`, com o método que errou. |
| **Versionamento mínimo (UC01/UC07).** | Cada alteração de projeto gera uma linha em `historico_alteracao`: quem, quando, antes e depois. |
| **Projeto sem documentos também é encontrável.** | Projetos cadastrados ganham um `documento` do tipo `ficha_cadastro`, recriado a cada edição. |

## 4. Índices e consultas eficientes

- **Índices B-tree** em todas as chaves de filtro, cobrindo as facetas e os JOINs:
  - `projeto`: segmento, status, cliente, confidencialidade e data;
  - `projeto_tecnologia` e `projeto_servico`: o termo da taxonomia;
  - `documento`: projeto e tipo;
  - `documento_entidade`: (tipo, valor_normalizado);
  - `trecho`: documento;
  - `processamento`: (status, enviado_por).
- **Busca textual:** FTS5 com BM25 e trecho destacado (`snippet`). Uma *window function* escolhe o melhor trecho por projeto.
- **Modo "todas" / "qualquer"** em tecnologias e serviços: `GROUP BY ... HAVING count(DISTINCT) = N` contra `IN (...)`.
- **Facetas** contam sobre o conjunto já filtrado, com a mesma subconsulta de IDs.
- **Insights:** agregações (`GROUP BY`) com taxa de conversão, médias e co-ocorrência de tecnologias (auto-junção em `projeto_tecnologia`).
- **Desempenho medido na base piloto:**
  - consultas de exploração em 3 a 8 ms;
  - reindexação completa (51 documentos, 118 trechos) em cerca de 200 ms.
- **Concorrência:** WAL ligado, para leitura concorrente durante a gravação.
