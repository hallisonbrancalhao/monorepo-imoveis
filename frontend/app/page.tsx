'use client';
import CadastroForm from './components/create-form';
import ListaImoveis from './components/lista-imoveis';
import './page.scss';

export default function RootPage() {
  return (
    <main className="flex">
      <CadastroForm />
      <ListaImoveis />
    </main>
  );
}
