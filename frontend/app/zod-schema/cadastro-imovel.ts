import z from 'zod';

export const imovelSchema = z.object({
  descricao: z.string().min(3).max(255),
  dataCompra: z.string(),
  endereco: z.string().min(3).max(255),
  comodos: z.array(
    z.object({
      nome: z.string().min(3).max(255),
    })
  ),
});

export type User = z.infer<typeof imovelSchema>;
