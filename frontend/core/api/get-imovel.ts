import { Imovel } from '../interface/imovel.interface';

export async function getImovel(id: string): Promise<Imovel> {
  const res = await fetch(`http://localhost:3000/api/imovel/${id}`);
  const imovel = await res.json();
  return imovel;
}
