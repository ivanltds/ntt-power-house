# Gate de Qualidade — NB-03 Viabilidade & Priorização

## Critérios de saída (checklist técnico — preenchido pelo agente de IA)

- [ ] Estimativa de esforço/complexidade em alto nível registrada
- [ ] Riscos de negócio e técnicos preliminares listados com mitigação proposta
- [ ] Business case (custo x benefício) documentado
- [ ] Recomendação explícita: Go / No-Go / Go com ressalvas
- [ ] Priorização relativa a outras demandas do portfólio informada (se aplicável)

## Aprovação humana obrigatória

Nenhuma etapa avança sem aprovação humana explícita registrada abaixo. IA nunca aprova a própria saída.

## Registro de Aprovação Humana

| Campo | Valor |
|---|---|
| Aprovador (nome completo) | |
| Papel / cargo | Sponsor / Comitê de priorização |
| Data da decisão | |
| Decisão | Aprovado (Go) / Aprovado com ressalvas / Reprovado (No-Go) |
| Ressalvas (se houver) | |
| Evidências (link do PR) | |
| Referência em DECISIONS.md | DEC-XXXX |

## Efeito

- **Aprovado (Go)** → Agente GitHub registra aprovação no commit/PR; Maestro libera **DEV-01** (início da Fase 2 — Desenvolvimento).
- **Reprovado (No-Go)** → execução encerrada; decisão registrada em `DECISIONS.md`; `STATUS.md` marcado como `Encerrada - No-Go`.
