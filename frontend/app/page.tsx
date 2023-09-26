'use client';
import { useState } from 'react';
import './page.scss';

interface IComodo {
  nome: string;
}

export default function Index() {
  const [comodos, setComodos] = useState<IComodo[]>([{ nome: '' }]);

  const addComodo = (): void => {
    setComodos([...comodos, { nome: '' }]);
  };

  const removeComodo = (index: number): void => {
    const newComodos = [...comodos];
    newComodos.splice(index, 1);
    setComodos(newComodos);
  };

  const handleComodoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const newComodos = [...comodos];
    newComodos[index].nome = e.target.value;
    setComodos(newComodos);
  };

  return (
    <main className="main-container">
      <div className="center-container">
        <h2 className="form-title">Cadastro de Imóveis</h2>
      </div>

      <div className="form-container">
        <form className="form-space">
          <div className="input-section">
            <label htmlFor="descricao" className="form-label">
              Descrição
            </label>
            <div className="input-wrap">
              <input
                type="text"
                id="descricao"
                name="descricao"
                className="form-input"
                required
              />
            </div>
          </div>
          <div className="input-section">
            <label htmlFor="dataCompra" className="form-label">
              Data da Compra
            </label>
            <div className="input-wrap">
              <input
                type="date"
                id="dataCompra"
                name="dataCompra"
                className="form-input"
                required
              />
            </div>
          </div>
          <div className="input-section">
            <label htmlFor="endereco" className="form-label">
              Endereço
            </label>
            <div className="input-wrap">
              <input
                type="text"
                id="endereco"
                name="endereco"
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="input-section">
            <label className="form-label">Comodos</label>

            {comodos.map((comodo, index) => (
              <div key={index} className="input-wrap">
                <input
                  type="text"
                  value={comodo.nome}
                  onChange={(e) => handleComodoChange(e, index)}
                  className="form-input"
                  placeholder={`Nome do cômodo ${index + 1}`}
                />
                <button type="button" onClick={() => removeComodo(index)}>
                  Remover
                </button>
              </div>
            ))}

            <button
              className="button-adicionar-comodo"
              type="button"
              onClick={addComodo}
            >
              + Adicionar cômodo
            </button>
          </div>

          <div className="button-section">
            <button type="submit" className="submit-button">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
