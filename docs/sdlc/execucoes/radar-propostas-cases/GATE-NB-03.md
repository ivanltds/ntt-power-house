# Gate de Qualidade — NB-03 Viabilidade & Priorização

> Execução: **radar-propostas-cases** · Instância referente a `docs/sdlc/fases/01-negocio/NB-03-viabilidade-priorizacao/GATE.md`
> Artefato avaliado: [`NB-03-viabilidade.md`](./NB-03-viabilidade.md)

## Critérios de saída (checklist técnico — preenchido pelo agente de IA)

- [x] Estimativa de esforço/complexidade em alto nível registrada (seção 3: ≈ 15,5–22 pessoa-semana para o escopo Must)
- [x] Riscos de negócio e técnicos preliminares listados com mitigação proposta (seção 6: R1–R9)
- [x] Business case (custo x benefício) documentado (seção 5); baseline de horas de busca ainda a medir
- [x] Recomendação explícita: Go / No-Go / Go com ressalvas (seção 7: **Go com ressalvas**, com 4 condições)
- [x] Priorização relativa a outras demandas do portfólio informada (se aplicável) (seção 8: sem portfólio informado; vale a prioridade alta de NB-01)

Pontos que dependem de decisão humana neste gate:
- Confirmar as premissas P1 (equipe) e P2 (provedor de LLM/embeddings sem orçamento novo). P2 é bloqueante.
- Aceitar ou rejeitar o faseamento (RF33, RF35 e UC04 na Onda 2).
- Nomear o curador da base piloto.
- Confirmar quem aprova este gate (papel típico: Sponsor / Comitê de priorização).

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

- **Aprovado (Go)** → Agente GitHub registra aprovação no commit/PR; Maestro libera **NB-04 — UI/UX Design**.
- **Reprovado (No-Go)** → execução encerrada; decisão registrada em `DECISIONS.md`; `STATUS.md` marcado como `Encerrada - No-Go`.
