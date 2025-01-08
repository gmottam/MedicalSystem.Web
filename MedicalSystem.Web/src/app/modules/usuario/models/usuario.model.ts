export enum Cargo {
  Usuario = 0,
  Admin = 1
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  username: string;
  cargo: Cargo;
  ddd: string;
  telefone: string;
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
