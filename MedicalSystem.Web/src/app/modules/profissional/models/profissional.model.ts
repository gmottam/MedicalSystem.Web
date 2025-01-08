export interface Profissional {
    id: string;
    nome: string;
    email: string;
    dataNascimento: string;
    ddd: string;
    telefone: string;
    especialidade: string;
    registroProfissional: string;
    endereco: Endereco;
  }
  
  export interface Endereco {
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
  }
  