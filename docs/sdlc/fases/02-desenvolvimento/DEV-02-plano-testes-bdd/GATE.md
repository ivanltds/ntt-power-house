# Gate de Qualidade — DEV-02 Plano de Testes (BDD/Gherkin)

## Critérios de saída (checklist técnico — preenchido pelo agente de IA)

- [ ] Todos os critérios de aceite relevantes de NB-02 convertidos em cenários Gherkin
- [ ] Fluxo principal, fluxos alternativos e casos de borda/erro cobertos
- [ ] Cenários nomeados de forma rastreável ao requisito de origem
- [ ] Cenários testáveis, sem ambiguidade de linguagem
- [ ] Matriz de rastreabilidade requisito → cenário Gherkin completa

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
| Evidências (link do PR / arquivos .feature) | |
| Referência em DECISIONS.md | DEC-XXXX |

## Efeito

- **Aprovado** → Agente GitHub registra aprovação no commit/PR; Maestro libera **DEV-03**.
- **Reprovado** → retorna ao Agente de Plano de Testes (ou a NB-02 se a causa for requisito ambíguo) com apontamentos; decisão registrada em `DECISIONS.md`.
