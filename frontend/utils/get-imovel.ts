export default function getImovel(id: string) {
  return fetch(`http://localhost:3000/api/imovel/${id}`)
    .then((response) => response.json())
    .then((data) => data);
}
