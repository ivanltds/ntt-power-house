# Template — Mensagem de Commit com Metadados de Aprovação

Usado pelo `%github-agent-sdlc` para todo commit que finaliza/mergeia uma etapa. Os trailers (linhas `Chave: valor` no final da mensagem) são obrigatórios — é assim que fica registrado no histórico do git quem aprovou o quê.

```
<tipo>(<codigo-etapa>): <resumo curto no imperativo>

<corpo opcional explicando o que mudou e por quê>

Gate: <CODIGO-ETAPA>
Gate-Status: Aprovado | Aprovado-com-ressalvas
Approved-by: <Nome Completo> <email@empresa.com> (<papel>)
Approved-at: <AAAA-MM-DD>
Decision-ref: DEC-XXXX
Agent: <skill que gerou o conteudo, ex.: sdlc-dev02-implementacao>
```

Exemplo real:

```
feat(dev-02): implementa fluxo de pagamento via PIX

Implementa o endpoint de criacao de cobranca PIX conforme
especificacao aprovada em NB-02 e design aprovado em DEV-01.

Gate: DEV-02
Gate-Status: Aprovado
Approved-by: Carlos Souza <carlos.souza@empresa.com> (Tech Lead)
Approved-at: 2025-03-14
Decision-ref: DEC-0027
Agent: sdlc-dev02-implementacao
```

Regras:
- `tipo` segue Conventional Commits (`feat`, `fix`, `docs`, `test`, `chore`, `refactor`).
- Nunca commitar em nome do aprovador — o Agente GitHub apenas registra o que está preenchido no `GATE.md`; a assinatura de fato é a pessoa preenchendo a tabela de aprovação.
- `Decision-ref` deve sempre existir em `DECISIONS.md`.
