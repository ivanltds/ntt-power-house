# Gate de Qualidade — NB-02 Especificação de Requisitos

> Execução: **radar-propostas-cases** · Instância referente a `docs/sdlc/fases/01-negocio/NB-02-especificacao-requisitos/GATE.md`
> Artefatos avaliados: [`NB-02-especificacao-requisitos.md`](./NB-02-especificacao-requisitos.md), [`NB-02-feature-busca-conversacional.md`](./NB-02-feature-busca-conversacional.md) (detalhamento do UC03, RF33-RF36) e [`NB-02-fluxos-busca-conversacional.md`](./NB-02-fluxos-busca-conversacional.md) (diagramas dos sub-casos de uso UC03.1-UC03.15)

> ⚠️ **Pré-condição de processo não satisfeita:** o gate NB-01 ainda não foi aprovado (`GATE-NB-01.md`). Este gate NB-02 é apresentado como **exploratório**, para apoiar a decisão humana sobre as duas etapas em conjunto. Nenhuma aprovação aqui tem efeito enquanto NB-01 permanecer pendente — ver `DECISIONS.md` (DEC-0002) e `STATUS.md`.

## Critérios de saída (checklist técnico — preenchido pelo agente de IA)

- [x] Requisitos funcionais listados e numerados (RF01–RF36, sendo RF33–RF36 do detalhamento do UC03)
- [x] Requisitos não funcionais definidos (performance, segurança, disponibilidade, compliance/LGPD) (RNF01–RNF11)
- [x] Cada história/caso de uso (UC01–UC04) tem critérios de aceite testáveis
- [x] Dependências e integrações conhecidas mapeadas (seção 4)
- [x] Requisitos rastreáveis ao documento de discovery (NB-01) sem contradição não justificada (seção 5)

## Aprovação humana obrigatória

Nenhuma etapa avança sem aprovação humana explícita registrada abaixo. IA nunca aprova a própria saída.

**Bloqueio adicional:** mesmo com decisão preenchida abaixo, o Maestro só considera NB-02 oficialmente concluída depois que `GATE-NB-01.md` também estiver aprovado.

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

- **Aprovado** (com NB-01 também aprovado) → Agente GitHub registra aprovação no commit/PR; Maestro libera **NB-03**.
- **Reprovado** → retorna ao Agente de Requisitos com apontamentos; decisão registrada em `DECISIONS.md`.
