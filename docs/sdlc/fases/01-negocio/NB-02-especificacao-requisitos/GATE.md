# Gate de Qualidade — NB-02 Levantamento de Requisitos

## Critérios de saída (checklist técnico — preenchido pelo agente de IA)

- [ ] Requisitos funcionais listados e numerados
- [ ] Requisitos não funcionais definidos (performance, segurança, disponibilidade, compliance/LGPD)
- [ ] Cada história/caso de uso tem critérios de aceite testáveis
- [ ] Dependências e integrações conhecidas mapeadas
- [ ] Requisitos rastreáveis ao documento de discovery (NB-01) sem contradição não justificada

## Aprovação humana obrigatória

Nenhuma etapa avança sem aprovação humana explícita registrada abaixo. IA nunca aprova a própria saída.

## Registro de Aprovação Humana

| Campo | Valor |
|---|---|
| Aprovador (nome completo) | |
| Papel / cargo | Product Owner / Business Analyst líder |
| Data da decisão | |
| Decisão | Aprovado / Aprovado com ressalvas / Reprovado |
| Ressalvas (se houver) | |
| Evidências (link do PR) | |
| Referência em DECISIONS.md | DEC-XXXX |

## Efeito

- **Aprovado** → Agente GitHub registra aprovação no commit/PR; Maestro libera **NB-03**.
- **Reprovado** → retorna ao Agente de Requisitos com apontamentos; decisão registrada em `DECISIONS.md`.
