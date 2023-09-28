'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Imovel, api } from '../core/';
import { imovelSchema } from '../zod-schema/cadastro-imovel';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from './input/form-input';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import AlertErro from './alerts/error';
import AlertSuccess from './alerts/success';

type FormData = z.infer<typeof imovelSchema>;

export default function EditImovel({ data: params }: { data: Imovel }) {
  const [alertError, setAlertError] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);

  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(imovelSchema),
  });

  useEffect(() => {
    setValue('descricao', params.descricao);
    setValue('endereco', params.endereco);
    setValue('dataCompra', params.dataCompra.toString());
    setValue('comodos', params.comodos);
    setNumComodos(params.comodos.length);
  }, [params, setValue]);

  const removerComodo = (idx: number) => {
    setValue(`comodos.${idx}.nome`, '');
    setNumComodos((prev) => prev - 1);
  };

  const [numComodos, setNumComodos] = useState(0);

  async function onSubmit(data: FormData) {
    console.log(params.id);
    try {
      await api.put(`/imovel/${params.id}`, data);
      setAlertError(false);
      setAlertSuccess(true);
    } catch (error) {
      console.log(error);

      setAlertError(true);
      setAlertSuccess(false);
    }
  }
  return (
    <div className="border-r- selection:text-white">
      <div className="flex min-h-screen items-center justify-center bg-slate-100 border-r-slate-300 border">
        <div className="flex-1 p-8">
          <div className="mx-auto w-[42rem] overflow-hidden rounded-3xl bg-white shadow-md">
            <div className="rounded-bl-4xl relative h-44 bg-blue-600">
              <svg
                className="absolute bottom-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
              >
                <path
                  fill="#ffffff"
                  fillOpacity="1"
                  d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
            </div>

            <div className="rounded-tr-4xl bg-white px-10 pb-8 pt-4 text-center">
              <h1 className="font-semibold text-blue-950 text-3xl">
                Faça suas alterações
              </h1>
              <form className="mt-12" onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                  type="text"
                  placeholder="Descrição"
                  register={register('descricao', { required: true })}
                  errors={errors?.descricao}
                  label="descricao"
                />

                <FormInput
                  type="text"
                  placeholder="Endereço"
                  register={register('endereco', { required: true })}
                  errors={errors?.endereco}
                  label="endereco"
                />

                <FormInput
                  type="date"
                  placeholder="Data da Compra"
                  register={register('dataCompra', { required: true })}
                  errors={errors?.dataCompra}
                  label="dataCompra"
                />

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
                    onClick={() => setNumComodos((prev) => prev + 1)}
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
                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 hover:cursor-pointer mt-10"
                    >
                      {isSubmitting ? (
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="inline w-6 h-6 mr-2 text-white animate-spin fill-green-600 opacity-100"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          ></svg>
                        </div>
                      ) : (
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                          Salvar
                        </span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => router.replace('/')}
                      className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-600 to-green-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 hover:cursor-pointer mt-10"
                    >
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                        Voltar
                      </span>
                    </button>
                  </div>
                </section>
              </form>
              {alertError && <AlertErro message="Falha ao alterar" />}
              {alertSuccess && <AlertSuccess message="Alterado com sucesso" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
