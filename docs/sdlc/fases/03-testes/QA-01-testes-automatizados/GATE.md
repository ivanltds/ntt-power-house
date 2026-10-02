# Gate de Qualidade — QA-01 Testes Automatizados

## Critérios de saída (checklist técnico — preenchido pelo agente de IA)

- [ ] Testes unitários cobrindo principais fluxos e casos de borda
- [ ] Testes de integração cobrindo pontos de integração relevantes
- [ ] Suíte de testes executada com 100% de sucesso (ou falhas justificadas e registradas)
- [ ] Matriz de rastreabilidade requisito (NB-02) → teste automatizado completa
- [ ] Cobertura mínima definida pelo time atingida

## Aprovação humana obrigatória

Nenhuma etapa avança sem aprovação humana explícita registrada abaixo. IA nunca aprova a própria saída.

## Registro de Aprovação Humana

| Campo | Valor |
|---|---|
| Aprovador (nome completo) | |
| Papel / cargo | QA Lead / Tech Lead |
| Data da decisão | |
| Decisão | Aprovado / Aprovado com ressalvas / Reprovado |
| Ressalvas (se houver) | |
| Evidências (link do PR / relatório de cobertura) | |
| Referência em DECISIONS.md | DEC-XXXX |

## Efeito

- **Aprovado** → Agente GitHub registra aprovação no commit/PR; Maestro libera **QA-02**.
- **Reprovado** → retorna ao Agente de Testes Automatizados (ou a DEV-02 se o problema for no código) com apontamentos; decisão registrada em `DECISIONS.md`.
