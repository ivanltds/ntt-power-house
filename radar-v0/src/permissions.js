// Capacidades por perfil (adendo 4: cadastro de projeto, cliente e termos novos e registro de atividades só para o gestor).
// As regras valem no servidor; a tela só esconde o que o perfil não pode fazer.

const GESTOR = new Set(['cadastrarProjeto', 'cadastrarCliente', 'criarTermo', 'verAtividades', 'marcarTeste']);

export const can = (user, capacidade) => user?.perfil === 'gestor' && GESTOR.has(capacidade);

// Mapa enviado à tela junto com o usuário.
export const capabilities = (user) => Object.fromEntries([...GESTOR].map((c) => [c, can(user, c)]));

export const PROIBIDO = {
  cadastrarProjeto: 'Só o gestor pode cadastrar projetos. Peça a um gestor ou envie o documento para um projeto existente.',
  cadastrarCliente: 'Cliente não encontrado. Só o gestor pode cadastrar clientes novos.',
  criarTermo: 'Só o gestor pode criar opções novas de tecnologia, serviço ou segmento.',
  verAtividades: 'Só o gestor pode consultar o registro de atividades.',
  marcarTeste: 'Só o gestor pode marcar um projeto como teste.',
};

// D19 (12/11), opção A "demo coerente": cada usuário de demonstração representa uma pessoa responsável por projetos da
// base piloto, para "Meus projetos" mostrar listas diferentes em cada perfil. Some quando houver login individual (SSO).
export const PESSOA_DEMO = { 'u-consultor': 'Marina Costa', 'u-gestor': 'Thiago Ramos' };
