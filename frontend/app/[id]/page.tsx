'use client';
import { api } from '../../core';
import { imovelSchema } from '../zod-schema/cadastro-imovel';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IImoveis } from '../components/lista-imoveis';

export default async function Page({ imovel }: { imovel: IImoveis }) {
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

  return (
    <>
      <form className="mt-12" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <input
            {...register('descricao', { required: true })}
            id="descricao"
            name="descricao"
            type="text"
            className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-cyan-600 focus:outline-none"
            placeholder="john@doe.com"
            autoComplete="off"
          />
          {errors?.descricao && (
            <p className="text-red-600 text-sm">{errors?.descricao?.message}</p>
          )}
          <label
            htmlFor="descricao"
            className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
          >
            Descricao
          </label>
        </div>

        <div className="relative mt-10">
          <input
            {...register('endereco', { required: true })}
            id="endereco"
            type="endereco"
            name="endereco"
            className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-cyan-600 focus:outline-none"
            placeholder="Endereço"
            autoComplete="off"
          />
          {errors?.endereco && (
            <p className="text-red-600 text-sm">{errors?.endereco?.message}</p>
          )}
          <label
            htmlFor="endereco"
            className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
          >
            Endereço
          </label>
        </div>

        <div className="relative mt-10">
          <input
            {...register('dataCompra', { required: true })}
            id="dataCompra"
            type="date"
            name="dataCompra"
            className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-cyan-600 focus:outline-none"
            placeholder="Data da Compra"
            autoComplete="off"
          />
          {errors?.dataCompra && (
            <p className="text-red-600 text-sm">
              {errors?.dataCompra?.message}
            </p>
          )}
          <label
            htmlFor="dataCompra"
            className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
          >
            Data da Compra
          </label>
        </div>

        {[...Array(numComodos)].map((_, idx) => (
          <div className="relative mt-10 flex gap-2" key={idx}>
            <input
              {...register(`comodos.${idx}.nome`, { required: true })}
              id={`comodos[${idx}].nome`}
              type="text"
              name={`comodos[${idx}].nome`}
              className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-cyan-600 focus:outline-none"
              placeholder="nome do comodo"
              autoComplete="off"
            />
            {errors?.comodos?.[idx]?.nome && (
              <p className="text-red-600 text-sm">
                {errors?.comodos?.[idx]?.nome?.message}
              </p>
            )}
            <label
              htmlFor={`comodos[${idx}].nome`}
              className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
            >
              Nome do comodo
            </label>
            <button
              type="button"
              onClick={() => removerComodo(idx)}
              className="rounded-lg pl-2 pt-1 bg-red-400 text-center items-center justify-center flex w-10 h-10 text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                id="trash"
              >
                <g
                  fill="none"
                  fillRule="evenodd"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="M1 5h18M17 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5m3 0V3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M8 10v6M12 10v6"></path>
                </g>
              </svg>
            </button>
          </div>
        ))}
        <section className="flex items-start flex-col">
          <button
            type="button"
            className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => numComodos++}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="plus"
              className="w-7 h-7 mr-2"
              aria-hidden="true"
            >
              <g data-name="Layer 2">
                <g data-name="plus-circle">
                  <path
                    fill="currentColor"
                    d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M15 11h-2V9a1 1 0 0 0-2 0v2H9a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0-2z"
                  ></path>
                </g>
              </g>
            </svg>
            Adicionar comodo
          </button>

          <button
            type="submit"
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 hover:cursor-pointer mt-10"
          >
            {isSubmitting ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-6 h-6 mr-2 text-white animate-spin fill-cyan-600 opacity-100"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                ></svg>
              </div>
            ) : (
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                Cadastrar
              </span>
            )}
          </button>
        </section>
      </form>
    </>
  );
}
