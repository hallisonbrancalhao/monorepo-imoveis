import Link from 'next/link';
import { api } from '../core/api';
import { Imovel } from '../core/interface/imovel.interface';

async function getImoveis() {
  try {
    const response = await api.get('/imovel');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function ListaImoveis() {
  async function handleDelete(id: number) {
    api.delete(`/imovel/${id}`);
  }

  const imoveis: Imovel[] | null = await getImoveis();

  return (
    <section className="w-full p-16 bg-slate-50">
      <h2 className="mb-8 text-4xl font-bold tracking-tight text-gray-900">
        Imóveis
      </h2>

      {imoveis &&
        imoveis.map((imovel) => (
          <div
            key={imovel.id}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow"
          >
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight ">
                  {imovel.descricao}
                </h5>
              </a>
              <ul className="list-group list-group-flush bg-slate-100 border-gray-200 p-2">
                <h6 className="font-semibold">Cômodos:</h6>
                {imovel.comodos.map((comodo, index) => (
                  <li key={`${imovel.id}-${index}`} className="list-group-item">
                    {comodo.nome}
                  </li>
                ))}
              </ul>

              <p className="py-6 font-normal">
                <svg
                  className="w-6 h-6 mr-1 inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 101 101"
                  id="pin"
                >
                  <path d="M50.5 16.4c-15 0-27.2 12.2-27.2 27.2 0 1.8.2 3.6.5 5.4 0 .1 0 .3.1.4 3 13.4 24.1 33.6 25 34.5.5.4 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9 21.8-21 24.8-34.2 0-.1 0-.2.1-.4.4-1.9.6-3.8.6-5.8-.1-14.9-12.3-27.1-27.3-27.1zm21.9 32.1v.2c-2.2 9.8-16.8 25.1-21.8 30.1-5-5-19.6-20.3-21.9-30.3v-.3c-.3-1.5-.5-3-.5-4.6 0-12.3 10-22.4 22.4-22.4C63 21.2 73 31.2 73 43.6c-.1 1.7-.3 3.3-.6 4.9z"></path>
                  <path d="M50.5 31.7c-5 0-9.1 4.1-9.1 9.1s4.1 9.1 9.1 9.1 9.1-4.1 9.1-9.1-4.1-9.1-9.1-9.1zm0 13.4c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3 4.3 1.9 4.3 4.3-1.9 4.3-4.3 4.3z"></path>
                </svg>
                {imovel.endereco}
              </p>
              <section className="flex flex-row justify-between">
                <Link href={`/${imovel.id}`}>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none"
                  >
                    Editar
                    <svg
                      className="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none"
                  onClick={async () => {
                    await handleDelete(imovel.id);
                  }}
                >
                  Excluir
                  <svg
                    className="w-4 h-4 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    id="x"
                  >
                    <g
                      fill="none"
                      fillRule="evenodd"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <g
                        stroke="#fff"
                        strokeWidth="2"
                        transform="translate(-1447 -2191)"
                      >
                        <g transform="translate(1448 2192)">
                          <circle cx="10" cy="10" r="10"></circle>
                          <path d="M13 7l-6 6M7 7l6 6"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </button>
              </section>
            </div>
          </div>
        ))}
    </section>
  );
}
