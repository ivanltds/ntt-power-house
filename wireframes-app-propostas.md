# Wireframes — App de Gestão de Propostas

Proposta de 5 telas: 3 telas de cadastro (texto, mídia audio/video, arquivos/transcrições), 1 tela de consulta e 1 agente conversacional.

---

## Tela 1 — Cadastro: Informações da Proposta

```
┌──────────────────────────────────────────────────────────────────┐
│  [Logo]   Gestão de Propostas                     [👤 Usuário ▾]  │
├──────────────────────────────────────────────────────────────────┤
│  ① Informações  →  ② Mídia  →  ③ Arquivos  →  ④ Revisão          │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Nova Proposta                                                    │
│  ────────────────────────────────────────────────────────────    │
│  Título da proposta *                                             │
│  [________________________________________________]               │
│                                                                    │
│  Cliente *                 Responsável *                          │
│  [______________________]  [______________________]               │
│                                                                    │
│  Valor estimado             Prazo de validade                     │
│  [R$ ________________]      [__ /__ /____]                        │
│                                                                    │
│  Categoria / Tipo de serviço                                      │
│  [ Dropdown ▾ ]                                                    │
│                                                                    │
│  Descrição / Escopo *                                             │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │ (área de texto livre - rich text)                         │    │
│  │                                                            │    │
│  │                                                            │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                    │
│  Observações / Notas internas                                     │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │                                                            │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                    │
│  Tags: [ + adicionar tag ]   ex: urgente, renovação, premium      │
│                                                                    │
│                                                                    │
│                               [ Cancelar ]   [ Salvar e continuar →] │
└──────────────────────────────────────────────────────────────────┘
```

**Notas de UX**
- Campos com `*` são obrigatórios; validação inline.
- "Salvar e continuar" grava rascunho (status `draft`) e avança para a Tela 2.
- Breadcrumb superior (①②③④) permite voltar a qualquer etapa sem perder dados.

---

## Tela 2 — Cadastro: Upload de Áudio/Vídeo + Transcrição

```
┌──────────────────────────────────────────────────────────────────┐
│  [Logo]   Gestão de Propostas                     [👤 Usuário ▾]  │
├──────────────────────────────────────────────────────────────────┤
│  ① Informações  →  ② Mídia  →  ③ Arquivos  →  ④ Revisão          │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Mídias da Proposta — "Proposta ACME 2026"                        │
│  ────────────────────────────────────────────────────────────    │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │        ⬆  Arraste arquivos de áudio/vídeo aqui             │    │
│  │        ou  [ Selecionar arquivo ]   [ 🎙 Gravar agora ]     │    │
│  │        Formatos: mp3, wav, mp4, mov · máx 500MB            │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                    │
│  Itens enviados                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │ 🎧 reuniao_kickoff.mp3        03:42   [▶] [⟳Transcrever]  │    │
│  │     Status: ✅ Transcrito                                  │    │
│  │     ┌────────────────────────────────────────────────┐    │    │
│  │     │ "Bom dia a todos, vamos revisar o escopo..."    │    │    │
│  │     │ [ Ver transcrição completa ▾ ] [ Editar ]        │    │    │
│  │     └────────────────────────────────────────────────┘    │    │
│  │                                                            │    │
│  │ 🎬 apresentacao_cliente.mp4   12:10   [▶] [⟳Transcrever]  │    │
│  │     Status: ⏳ Processando transcrição... (62%)           │    │
│  │                                                            │    │
│  │ 🎧 followup_ligacao.wav       05:03   [▶] [⟳Transcrever]  │    │
│  │     Status: ⚠ Falhou — [ Tentar novamente ]               │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                    │
│  Idioma da transcrição: [ Português ▾ ]   Gerar resumo automático [●  ] │
│                                                                    │
│                     [ ← Voltar ]      [ Salvar e continuar → ]    │
└──────────────────────────────────────────────────────────────────┘
```

**Notas de UX**
- Upload múltiplo com barra de progresso por arquivo.
- Transcrição assíncrona (fila); status visível em tempo real (processando/concluído/falha).
- Transcrição é editável manualmente após gerada (correção humana).
- Toggle para gerar resumo automático do conteúdo transcrito (via IA).

---

## Tela 3 — Cadastro: Upload de Arquivos e Documentos Gerais

```
┌──────────────────────────────────────────────────────────────────┐
│  [Logo]   Gestão de Propostas                     [👤 Usuário ▾]  │
├──────────────────────────────────────────────────────────────────┤
│  ① Informações  →  ② Mídia  →  ③ Arquivos  →  ④ Revisão          │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Arquivos da Proposta — "Proposta ACME 2026"                      │
│  ────────────────────────────────────────────────────────────    │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │        ⬆  Arraste PDFs, planilhas, docs, imagens aqui       │    │
│  │        ou  [ Selecionar arquivos ]                         │    │
│  │        Formatos: pdf, docx, xlsx, pptx, png, jpg · máx 50MB│    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                    │
│  Documentos anexados                              [ Buscar... ]   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │ 📄 escopo_tecnico.pdf        1.2MB   [👁 Ver] [⬇] [🗑]      │    │
│  │ 📊 orcamento_v3.xlsx         340KB   [👁 Ver] [⬇] [🗑]      │    │
│  │ 📝 contrato_rascunho.docx    88KB    [👁 Ver] [⬇] [🗑]      │    │
│  │ 🖼 diagrama_arquitetura.png  2.1MB   [👁 Ver] [⬇] [🗑]      │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                    │
│  Categorizar documento:  [ Contrato ▾ ] aplicar à seleção          │
│                                                                    │
│  Resumo automático de conteúdo (IA):                               │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │ "O escopo técnico cobre 3 fases de implantação..."         │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                    │
│                     [ ← Voltar ]      [ Finalizar cadastro ✓ ]    │
└──────────────────────────────────────────────────────────────────┘
```

**Notas de UX**
- Lista de arquivos com preview, download e exclusão.
- Categorização por tipo de documento para facilitar busca posterior.
- "Finalizar cadastro" muda status da proposta de `draft` para `ativa`/`em análise`.

---

## Tela 4 — Consulta de Propostas

```
┌──────────────────────────────────────────────────────────────────┐
│  [Logo]   Gestão de Propostas                     [👤 Usuário ▾]  │
├──────────────────────────────────────────────────────────────────┤
│  [ Dashboard ]  [ Propostas ]  [ Agente IA ]       [ + Nova ]     │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Consultar Propostas                                              │
│  ────────────────────────────────────────────────────────────    │
│  [ 🔎 Buscar por título, cliente, tag... ]                         │
│                                                                    │
│  Filtros:  Status[▾]  Cliente[▾]  Responsável[▾]  Período[▾]       │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │ Título             Cliente     Status      Valor   Atualiz. │  │
│  ├──────────────────────────────────────────────────────────┤    │
│  │ Proposta ACME 2026  ACME       🟢 Ativa    R$120k  2d atrás │  │
│  │ Expansão Beta Corp  Beta Corp  🟡 Análise  R$45k   5h atrás │  │
│  │ Renovação XPTO      XPTO Ltda  🔴 Reprov.  R$30k   1 sem    │  │
│  │ Projeto Delta       Delta SA   🟢 Ativa    R$80k   3d atrás │  │
│  └──────────────────────────────────────────────────────────┘    │
│                                              [ ‹ 1 2 3 › ]        │
│                                                                    │
│  ── Detalhe da proposta selecionada ──────────────────────────    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │ Proposta ACME 2026                           [ ✎ Editar ] │    │
│  │ Cliente: ACME · Responsável: João · Status: 🟢 Ativa       │    │
│  │ Descrição: "Implantação de plataforma..."                 │    │
│  │                                                            │    │
│  │ [ 📝 Informações ] [ 🎧 Mídias/Transcrições ] [ 📎 Arquivos]│   │
│  │                                                            │    │
│  │ Linha do tempo:                                           │    │
│  │  • 10/01 - Proposta criada                                │    │
│  │  • 11/01 - Áudio de kickoff transcrito                    │    │
│  │  • 13/01 - Documento de contrato anexado                  │    │
│  └──────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
```

**Notas de UX**
- Tabela com busca full-text (inclui conteúdo de transcrições e documentos indexados).
- Painel de detalhe abre inline (sem sair da lista) com abas para cada tipo de conteúdo cadastrado nas Telas 1-3.
- Linha do tempo mostra histórico de atividades da proposta.

---

## Tela 5 — Agente Conversacional

```
┌──────────────────────────────────────────────────────────────────┐
│  [Logo]   Gestão de Propostas                     [👤 Usuário ▾]  │
├──────────────────────────────────────────────────────────────────┤
│  [ Dashboard ]  [ Propostas ]  [ Agente IA ]       [ + Nova ]     │
├──────────────────────────────────────────────────────────────────┤
│  Contexto: [ Todas as propostas ▾ ]  ou  [ Proposta ACME 2026 ▾ ] │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │ 🤖 Olá! Posso ajudar a consultar propostas, resumir       │    │
│  │    transcrições ou comparar documentos. O que precisa?    │    │
│  │                                                            │    │
│  │                         Quais propostas vencem este mês? 🧑│    │
│  │                                                            │    │
│  │ 🤖 Encontrei 3 propostas com validade em janeiro/2026:     │    │
│  │    • Proposta ACME 2026 — vence 28/01                     │    │
│  │    • Renovação XPTO — vence 15/01                         │    │
│  │    • Projeto Delta — vence 30/01                          │    │
│  │    [ Ver detalhes ACME ] [ Ver detalhes XPTO ] [ Ver Delta]│    │
│  │                                                            │    │
│  │             Resuma a transcrição da reunião de kickoff 🧑  │    │
│  │                                                            │    │
│  │ 🤖 Resumo (reuniao_kickoff.mp3):                           │    │
│  │    "Equipe alinhou escopo em 3 fases, prazo de 6 meses,    │    │
│  │     próximos passos: enviar cronograma até 15/01."         │    │
│  │    Fonte: 📎 Proposta ACME 2026 → Mídias                   │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                    │
│  Sugestões:  [ Comparar 2 propostas ]  [ Status geral ]           │
│              [ Gerar relatório semanal ]                           │
│                                                                    │
│  [ 💬 Digite sua pergunta...                          ] [ Enviar ]│
│  [ 🎤 ]  [ 📎 Anexar ]                                             │
└──────────────────────────────────────────────────────────────────┘
```

**Notas de UX**
- Agente responde com citação da fonte (proposta/documento/transcrição) para rastreabilidade.
- Seletor de contexto limita a busca do agente a uma proposta específica ou à base completa.
- Respostas trazem ações rápidas (links para abrir o registro na Tela de Consulta).
- Suporta input por voz e anexos para perguntas sobre arquivos específicos.

---

## Fluxo de navegação resumido

```
Tela 1 (Informações) → Tela 2 (Mídia/Transcrição) → Tela 3 (Arquivos)
        │                                                   │
        └──────────────► Finalizar cadastro ◄───────────────┘
                                 │
                                 ▼
                    Tela 4 (Consulta de Propostas)
                                 │
                                 ▼
                 Tela 5 (Agente Conversacional)
```
