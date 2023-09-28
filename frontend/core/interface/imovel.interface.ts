interface IComodos {
  nome: string;
}

export interface Imovel {
  id: number;
  descricao: string;
  endereco: string;
  dataCompra: Date;
  comodos: IComodos[];
}
