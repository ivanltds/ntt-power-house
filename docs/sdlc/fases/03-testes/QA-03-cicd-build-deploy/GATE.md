# Gate de Qualidade — QA-03 CI/CD (Build & Deploy em Homologação)

## Critérios de saída (checklist técnico — preenchido pelo agente de IA)

- [ ] Pipeline de CI/CD configurado/validado (build, lint, testes, empacotamento, deploy)
- [ ] Pipeline executado com sucesso ("verde") para o ambiente de homologação/staging
- [ ] Suíte de testes automatizados (QA-01) e cenários Gherkin (DEV-02) executados dentro do pipeline
- [ ] Artefato gerado versionado/taggeado para rastreabilidade
- [ ] Nenhuma falha de pipeline em aberto (ou causa raiz identificada e devolvida à etapa de origem)

## Aprovação humana obrigatória

Nenhuma etapa avança sem aprovação humana explícita registrada abaixo. IA nunca aprova a própria saída.

## Registro de Aprovação Humana

| Campo | Valor |
|---|---|
| Aprovador (nome completo) | |
| Papel / cargo | Tech Lead / Responsável de DevOps |
| Data da decisão | |
| Decisão | Aprovado / Aprovado com ressalvas / Reprovado |
| Ressalvas (se houver) | |
| Evidências (link da execução do pipeline) | |
| Referência em DECISIONS.md | DEC-XXXX |

## Efeito

- **Aprovado** → Agente GitHub registra aprovação no commit/PR; Maestro libera **QA-04**.
- **Reprovado** → retorna à etapa de origem da falha (DEV-03, DEV-04 ou QA-01); decisão registrada em `DECISIONS.md`.
