'use client';
import CadastroForm from '../components/create-form';
import ListaImoveis from '../components/lista-imoveis';

export default function RootPage() {
  return (
    <main className="flex">
      <CadastroForm />
      <ListaImoveis />
    </main>
  );
}
