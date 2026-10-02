# Template — Bloco de Aprovação de Gate

Todo arquivo `GATE.md` de etapa deve conter, ao final, uma tabela igual a esta, preenchida **apenas por um humano**. Nenhum agente de IA preenche as linhas abaixo de "Aprovador".

```markdown
## Registro de Aprovação Humana

| Campo | Valor |
|---|---|
| Aprovador (nome completo) | |
| Papel / cargo | |
| Data da decisão | |
| Decisão | Aprovado / Aprovado com ressalvas / Reprovado |
| Ressalvas (se houver) | |
| Evidências (link do PR, relatório, print) | |
| Referência em DECISIONS.md | DEC-XXXX |
```

Regras:
- Só existe **uma** linha de decisão vigente por rodada de avaliação. Se reprovado e reenviado, cria-se uma nova tabela abaixo da anterior (histórico completo permanece no arquivo).
- "Aprovado com ressalvas" exige que as ressalvas fiquem registradas como itens de acompanhamento na etapa seguinte.
- Toda decisão aqui **deve** ter uma entrada correspondente em `DECISIONS.md` (mesmo ID referenciado).
