# Gate de Qualidade — NB-03 Viabilidade & Priorização

> Execução: **radar-propostas-cases** · Instância referente a `docs/sdlc/fases/01-negocio/NB-03-viabilidade-priorizacao/GATE.md`
> Artefato avaliado: [`NB-03-viabilidade.md`](./NB-03-viabilidade.md)

## Critérios de saída (checklist técnico — preenchido pelo agente de IA)

- [x] Estimativa de esforço/complexidade em alto nível registrada (seção 3: ≈ 15,5–22 pessoa-semana para o escopo Must)
- [x] Riscos de negócio e técnicos preliminares listados com mitigação proposta (seção 6: R1–R9)
- [x] Business case (custo x benefício) documentado (seção 5); baseline de horas de busca ainda a medir
- [x] Recomendação explícita: Go / No-Go / Go com ressalvas (seção 7: **Go com ressalvas**, com 4 condições)
- [x] Priorização relativa a outras demandas do portfólio informada (se aplicável) (seção 8: sem portfólio informado; vale a prioridade alta de NB-01)

Condições respondidas pelo PO em 2026-10-29 (seção 7.1 do artefato):
- P2: chave de API DeepSeek com crédito; embeddings via modelo local (a decidir em DEV-01).
- P1: não se aplica; desenvolvimento pelo PO com apoio de IA, time testa.
- Faseamento em duas ondas: aceito.
- Curador da base piloto: o PO.

Pendente para a decisão do comitê:
- Avaliar a ressalva R10 (envio de conteúdo a API externa / política de segurança / LGPD).
- Decisão Go / No-Go após apresentação e testes.

## Aprovação humana obrigatória

Nenhuma etapa avança sem aprovação humana explícita registrada abaixo. IA nunca aprova a própria saída.

## Registro de Aprovação Humana

| Campo | Valor |
|---|---|
| Aprovador (nome completo) | |
| Papel / cargo | Comitê do time (após apresentação e testes) |
| Data da decisão | |
| Decisão | Aprovado (Go) / Aprovado com ressalvas / Reprovado (No-Go) |
| Ressalvas (se houver) | |
| Evidências (link do PR) | |
| Referência em DECISIONS.md | DEC-XXXX |

## Efeito

- **Aprovado (Go)** → Agente GitHub registra aprovação no commit/PR; Maestro libera **NB-04 — UI/UX Design**.
- **Reprovado (No-Go)** → execução encerrada; decisão registrada em `DECISIONS.md`; `STATUS.md` marcado como `Encerrada - No-Go`.
