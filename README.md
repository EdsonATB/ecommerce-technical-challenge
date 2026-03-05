# 🛒 Technical Challenge: E-Commerce API

API REST para um sistema de e-commerce desenvolvida com **Node.js,
Express e TypeScript**, integrada à **FakeStore API** para obtenção de
produtos.

O projeto foi criado com foco no desenvolvimento backend, incluindo organização em camadas, validação de dados e tratamento centralizado de erros. A aplicação utiliza **PostgreSQL com Prisma ORM** para persistência de dados e **Docker** para padronização do ambiente de execução.

------------------------------------------------------------------------

# 🚀 Tecnologias Utilizadas

-   Node.js
-   TypeScript
-   Express
-   Prisma ORM
-   PostgreSQL
-   Docker
-   FakeStore API

------------------------------------------------------------------------

# 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas para melhor organização do
código:

    src
    ├── controllers
    ├── services
    ├── middlewares
    ├── routes
    └── utils


**Routes**\
Responsáveis pelo redirecionamento do request para os controllers.

**Controllers**\
Responsáveis por receber as requisições HTTP e retornar as respostas.

**Services**\
Contêm a lógica de negócio da aplicação.

------------------------------------------------------------------------

# 📌 Funcionalidades

-   Integração com **FakeStore API** para listagem de produtos
-   Persistência de dados com **PostgreSQL**
-   Estrutura organizada em camadas
-   Validação de dados
-   Tratamento centralizado de erros
-   Containerização com Docker

------------------------------------------------------------------------

# ⚙️ Como Rodar o Projeto

## 1️⃣ Clonar o repositório

``` bash
git clone https://github.com/EdsonATB/ecommerce-technical-challenge.git
```

## 2️⃣ Entrar na pasta do projeto

``` bash
cd ecommerce-technical-challenge
```

## 3️⃣ Instalar dependências

``` bash
npm install
```

## 4️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com:

    DATABASE_URL="postgresql://usuario:senha@localhost:5432/database"

## 5️⃣ Rodar migrations do banco

``` bash
npx prisma migrate dev
```

## 6️⃣ Iniciar aplicação

``` bash
npx tsx src/server.ts
```

------------------------------------------------------------------------

# 🐳 Executando com Docker

Caso queira rodar o projeto utilizando Docker:

``` bash
docker-compose up --build
```

------------------------------------------------------------------------

# 🎯 Objetivo do Projeto

Este projeto foi desenvolvido com o objetivo de praticar conceitos
importantes do desenvolvimento backend, como:

-   criação de **APIs REST**
-   integração com **APIs externas**
-   organização de código em **arquitetura em camadas**
-   utilização de **ORM (Prisma)**
-   utilização de **Docker para containerização**

------------------------------------------------------------------------

# 📬 Contato

-   GitHub: https://github.com/EdsonATB
-   LinkedIn: https://www.linkedin.com/in/edson-augusto-999a7a253/
-   Email: edsonaugusto2006@gmail.com
