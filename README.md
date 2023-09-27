# Documentação do Projeto de Tema 5 - Nx com NestJS e NextJS

## Visão Geral

Este projeto utiliza o Nx Workspace para criar um monorepo contendo uma API feita em NestJS e uma aplicação frontend em NextJS. O banco de dados é gerenciado usando Docker.

---

## Pré-requisitos

- Node.js
- Nx CLI
- Docker
- Yarn ou npm

---

## Configuração Inicial

### Clone o Repositório

```bash
git clone [http://escoladeti.unicesumar.edu.br:8083/escoladeti2023/008timeescoladeti2023/hallison-brancalhao---tema-5/projeto-tema-5]
```

### Instale as Dependências

Navegue até a pasta do projeto e instale as dependências:

```bash
cd [NOME_DO_PROJETO]
npm install # ou npm install
```

---

## Docker

### Inicializando o Banco de Dados

Para inicializar o banco de dados, siga os passos abaixo:

1. Navegue até a pasta onde o `docker-compose.yml` está localizado.
2. Execute o comando para subir o container do banco de dados:

```bash
docker-compose up -d
```

---

## Executando as Aplicações

### Backend (NestJS)

Para iniciar a aplicação backend, execute o seguinte comando:

```bash
npx nx run-many -t serve
```

A API estará disponível em `http://localhost:3000/`.

### Modelo do `.env`

```bash
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=db
MYSQL_USER=user
MYSQL_PASSWORD=password

```

### Frontend (NextJS)

Para iniciar a aplicação frontend, execute o seguinte comando:

```bash
nx serve app-frontend
```

O Frontend estará disponível em `http://localhost:4200/`.

---

## Autores

- [Hallison Brancalhao](https://github.com/hallisonbrancalhao)

---
