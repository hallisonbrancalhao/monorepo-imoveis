import { zodResolver } from '@hookform/resolvers/zod';
import { imovelSchema } from '../../app/zod-schema/cadastro-imovel';
import { useForm } from 'react-hook-form';
import { api } from '../api';
import { IImoveis } from '../../app/components/lista-imoveis';
import { z } from 'zod';

export default function useUpdateImovel(imovel: IImoveis) {
  type FormData = z.infer<typeof imovelSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(imovelSchema),
  });

  async function onSubmit(data: FormData) {
    try {
      await api.put(`/imovel/${imovel.id}`, data);
      alert('Imóvel atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar imóvel!');
    }
  }

  const removerComodo = (idx: number) => {
    setValue(`comodos.${idx}.nome`, '');
    numComodos--;
  };

  let numComodos = 0;

  return {
    handleSubmit,
    register,
    errors,
    isSubmitting,
    onSubmit,
    removerComodo,
    numComodos,
  };
}
