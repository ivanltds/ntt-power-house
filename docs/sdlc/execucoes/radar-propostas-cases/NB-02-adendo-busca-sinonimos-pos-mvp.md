# NB-02 · Adendo · Busca tolerante a sinônimos e erros de digitação (pós-MVP)

**Origem:** CR-012 (crítico). "preciso de propostas com aws" e "preiso de propostas de energia" voltaram vazias no teste.
**Decisão de 12/11/2026 (Ivan):** no MVP a IA resolve de forma paliativa. Ela reescreve a pergunta, corrige a digitação e infere sinônimos de segmento e tecnologia antes da busca, sem lista curada pelo produto. A implementação mais assertiva, descrita abaixo, fica para depois do MVP.

## Por que o paliativo não basta

- **Pouco previsível.** A mesma pergunta pode ser interpretada de jeitos diferentes, e não há como auditar por que um termo virou outro.
- **Vocabulário incompleto e sem dono.** Já existe um vocabulário de domínio no código (`radar-v0/src/lexicon.js`: segmentos, tecnologias e expansões como energia → utilities), mas ele foi escrito pelo time técnico e não cobre todas as torres e jargões das propostas.
- **Sem sinal de melhoria.** O Radar não registra quais buscas voltam vazias. Por isso não dá para saber quais sinônimos faltam.

## UC03.16 — Encontrar propostas mesmo com sinônimos, jargão ou erro de digitação

**Como** comercial, pré-vendas ou consultor, **quero** que o Radar entenda a pergunta mesmo quando uso outro nome para o segmento ou a tecnologia, ou digito errado, **para** não perder referências que existem na base.

Critérios de aceite:
- [ ] Dado que escrevo um sinônimo cadastrado de um segmento (ex.: "energia", "saneamento" → Utilities), quando busco, então recebo os mesmos resultados da busca pelo nome canônico.
- [ ] Dado que digito uma palavra com até 2 letras trocadas (ex.: "preiso", "propsotas", "databriks"), quando busco, então o Radar corrige e mostra "Buscando por: …".
- [ ] Dado que uso a palavra "propostas" ou "projetos" como termo genérico, quando busco, então ela não vira um filtro de tipo de documento que esvazia o resultado.
- [ ] Dado que a busca não encontra nada relevante, quando o Radar responde, então diz que não encontrou nada relevante e sugere até 3 buscas próximas, testadas antes de serem oferecidas, que trazem resultado (decisão D06).
- [ ] Dado que uma busca volta vazia, quando ela termina, então fica registrada (pergunta, termos interpretados, perfil), sem dados pessoais, para a curadoria do vocabulário.
- [ ] Dado que sou gestor, quando abro a lista de buscas vazias da semana, então posso cadastrar o sinônimo que faltou, e ele passa a valer na próxima busca.

## Vocabulário curado (dono: produto)

| Item | Responsável | Observação |
|---|---|---|
| Sinônimos por torre e segmento | Vania e Isabelle | Começar pelas torres atendidas (Utilities, Banking, Varejo, Saúde, Telecom...). |
| Sinônimos e siglas de tecnologia | Time técnico com pré-vendas | Inclui tecnologias de segurança, que faltam hoje (CR-030). |
| Revisão periódica | Gestor do Radar | A partir da lista de buscas vazias. |

## Fora do escopo deste adendo

- Busca em documentos soltos fora de projetos (CR-011, fora do MVP).
- Novas classificações de negócio, como Capability e Governança de IA (CR-014, fora do MVP).

## Tickets relacionados

CR-012 (origem), CR-013 (filtros por tags), CR-030 (tags de tecnologia e segurança), CR-014.
