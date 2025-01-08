export interface Paciente {
    id: string;
    nome: string;
    email: string;
    dataNascimento: string;
    ddd: string;
    telefone: string;
    endereco: Endereco;
    prontuario: Prontuario[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Endereco {
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
  }
  
  export interface Prontuario {
    data: string;
    descricao: string;
    observacoes: string;
  }
  