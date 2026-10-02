# Gate de Qualidade — QA-03 Aceite do Usuário (UAT)

## Critérios de saída (checklist técnico — preenchido pelo agente de IA)

- [ ] Roteiro de aceite em linguagem de negócio preparado
- [ ] Sessão/rodada de UAT realizada com usuário(s)-chave
- [ ] Feedback consolidado e classificado (bloqueante x melhoria futura)
- [ ] Critérios de sucesso originais (NB-01) revalidados contra o resultado entregue
- [ ] Pendências não bloqueantes registradas para backlog futuro

## Aprovação humana obrigatória

Nenhuma etapa avança sem aprovação humana explícita registrada abaixo. Este gate representa o próprio aceite de negócio — só pode ser aprovado pelo Product Owner/usuário-chave, nunca pela IA.

## Registro de Aprovação Humana

| Campo | Valor |
|---|---|
| Aprovador (nome completo) | |
| Papel / cargo | Product Owner / Usuário-chave de negócio |
| Data da decisão | |
| Decisão | Aprovado (Aceite) / Aprovado com ressalvas / Reprovado |
| Ressalvas (se houver) | |
| Evidências (link do PR / ata de UAT) | |
| Referência em DECISIONS.md | DEC-XXXX |

## Efeito

- **Aprovado** → Agente GitHub registra aprovação no commit/PR; Maestro libera **QA-04** (deploy).
- **Reprovado** → retorna a DEV-02/QA-02 conforme a causa raiz do apontamento; decisão registrada em `DECISIONS.md`.
