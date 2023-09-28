import EditImovel from 'frontend/components/edit-imovel';
import { getImovel } from '../../core/api/get-imovel';

export default async function EditPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const imovel = await getImovel(id);
  return <EditImovel data={imovel} />;
}
