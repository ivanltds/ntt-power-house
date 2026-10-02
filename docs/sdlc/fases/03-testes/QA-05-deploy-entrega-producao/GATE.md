# Gate de Qualidade — QA-04 Deploy / Entrega em Ambiente Tecnológico

## Critérios de saída (checklist técnico — preenchido pelo agente de IA)

- [ ] Plano de deploy elaborado (passos, ordem, dependências, janela de mudança)
- [ ] Plano de rollback elaborado
- [ ] Checklist de pré-deploy concluído (backups, migrações, variáveis de ambiente, feature flags)
- [ ] Pipeline de CI/CD executado com sucesso
- [ ] Smoke test pós-deploy executado com sucesso

## Aprovação humana obrigatória

Nenhuma etapa avança (nem a entrega ocorre) sem aprovação humana explícita registrada abaixo. Este gate autoriza a subida real em produção.

## Registro de Aprovação Humana

| Campo | Valor |
|---|---|
| Aprovador (nome completo) | |
| Papel / cargo | Tech Lead / Responsável de Operações (change owner) |
| Data da decisão | |
| Decisão | Aprovado / Aprovado com ressalvas / Reprovado |
| Ressalvas (se houver) | |
| Evidências (link do PR / pipeline / tag de release) | |
| Referência em DECISIONS.md | DEC-XXXX |

## Efeito

- **Aprovado** → Agente GitHub executa/confirma o merge/tag de release; Maestro marca a execução como `Concluída` no `STATUS.md`. **Fim do SDLC para esta demanda.**
- **Reprovado** → deploy não ocorre (ou é revertido via plano de rollback); decisão e causa raiz registradas em `DECISIONS.md`; retorno à etapa causadora (DEV-02, QA-01 ou QA-02, conforme o caso).
