# Gate de Qualidade — QA-02 Homologação / QA Funcional

## Critérios de saída (checklist técnico — preenchido pelo agente de IA)

- [ ] Roteiros de teste funcional elaborados cobrindo cenários ponta a ponta
- [ ] Roteiros executados em ambiente de homologação com evidências registradas
- [ ] Defeitos encontrados registrados com severidade e passos de reprodução
- [ ] Nenhum defeito crítico/bloqueante em aberto
- [ ] Não regressão de funcionalidades existentes verificada

## Aprovação humana obrigatória

Nenhuma etapa avança sem aprovação humana explícita registrada abaixo. IA nunca aprova a própria saída.

## Registro de Aprovação Humana

| Campo | Valor |
|---|---|
| Aprovador (nome completo) | |
| Papel / cargo | Analista de QA |
| Data da decisão | |
| Decisão | Aprovado / Aprovado com ressalvas / Reprovado |
| Ressalvas (se houver) | |
| Evidências (link do PR / roteiros) | |
| Referência em DECISIONS.md | DEC-XXXX |

## Efeito

- **Aprovado** → Agente GitHub registra aprovação no commit/PR; Maestro libera **QA-03**.
- **Reprovado** → retorna a DEV-02 (correção) e/ou ao Agente de QA/Homologação com apontamentos; decisão registrada em `DECISIONS.md`.
