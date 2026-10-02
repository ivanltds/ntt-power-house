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
