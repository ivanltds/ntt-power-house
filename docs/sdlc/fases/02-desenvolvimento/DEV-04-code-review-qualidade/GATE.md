# Gate de Qualidade — DEV-03 Code Review & Qualidade Estática

## Critérios de saída (checklist técnico — preenchido pelo agente de IA)

- [ ] Lint e análise estática executados sem erros bloqueantes
- [ ] Aderência ao design (DEV-01) e requisitos (NB-02) verificada
- [ ] Nenhum problema de segurança crítico identificado (ou registrado e mitigado)
- [ ] Sugestões de melhoria de legibilidade/complexidade apresentadas
- [ ] Testes existentes (unitários) executados e passando

## Aprovação humana obrigatória

Nenhuma etapa avança sem aprovação humana explícita registrada abaixo. IA nunca aprova a própria saída — a revisão de código assistida por IA sempre exige confirmação de um revisor humano (CODEOWNERS).

## Registro de Aprovação Humana

| Campo | Valor |
|---|---|
| Aprovador (nome completo) | |
| Papel / cargo | Revisor de código (CODEOWNERS) |
| Data da decisão | |
| Decisão | Aprovado / Aprovado com ressalvas / Reprovado |
| Ressalvas (se houver) | |
| Evidências (link do PR) | |
| Referência em DECISIONS.md | DEC-XXXX |

## Efeito

- **Aprovado** → Agente GitHub registra aprovação no commit/PR; Maestro libera **QA-01** (início da Fase 3 — Testes).
- **Reprovado** → retorna ao Agente de Implementação (DEV-02) para correções; decisão registrada em `DECISIONS.md`.
