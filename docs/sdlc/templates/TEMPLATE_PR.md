# Template — Descrição de Pull Request de Etapa

Usado pelo `%github-agent-sdlc` ao abrir o PR de cada etapa. Branch de origem: `sdlc/<fase>/<codigo-etapa>/<slug-da-demanda>`.

```markdown
### Etapa: <CODIGO> — <nome da etapa>

**Fase:** <1. Negócio | 2. Desenvolvimento | 3. Testes>
**Demanda:** <nome/slug da demanda>
**Agente responsável:** <nome do agente de IA / skill usada>

#### O que foi feito
- <resumo objetivo dos artefatos gerados/alterados>

#### Artefatos desta etapa
- <lista de arquivos/caminhos alterados>

#### Checklist técnico do Gate (`GATE.md`)
- [ ] Critério 1
- [ ] Critério 2
- [ ] ...

> ⚠️ Este PR **não pode ser mergeado** sem a tabela "Registro de Aprovação Humana" preenchida no `GATE.md` da etapa, com decisão "Aprovado" ou "Aprovado com ressalvas".

#### Aprovação
- Aprovador esperado: <papel, ex.: Product Owner>
- Referência da decisão: `DEC-XXXX` (preencher após aprovação)

#### Próxima etapa (se aprovado)
<código e nome da próxima etapa que o Maestro irá acionar>
```
