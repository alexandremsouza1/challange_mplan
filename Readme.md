# Desafio MPLAN

Todo List feito em Node e Vue para o desafio da MPLAN.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração do Projeto](#configuração-do-projeto)
- [Build](#instruções-de-build)
- [Migração](#migração)
- [Deploy](#pages)
- [Melhorias](#resolução-de-problemas)
- [Licença](#licença)

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados e configurados:

- Node.js 20
- Docker (para subir o banco de dados postgres)

## Funcionalidades

- Adicionar tarefas
- Editar tarefas
- Deletar tarefas
- Marcar tarefas como concluídas
- Pesquisar tarefas por titulo e descrição
- Paginação
- Internacionalização (pt-br e en)
- Sincronização de tarefas em tempo real
- Offline first - Possibilidade de trabalhar offline e sincronizar posteriormente


## Estrutura do Projeto
```bash
Directory structure:
└── alexandremsouza1-challange_mplan/
    ├── Readme.md
    ├── docker-compose.yml
    ├── backend/
    │   ├── api.http
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── shims-vue.d.ts
    │   ├── tsconfig.json
    │   ├── .env.example
    │   ├── .gitignore
    │   ├── migrations/
    │   │   └── migrate.ts
    │   └── src/
    │       ├── app.ts
    │       ├── server.ts
    │       ├── config/
    │       │   └── database.ts
    │       ├── controllers/
    │       │   └── taskController.ts
    │       ├── models/
    │       │   └── taskModel.ts
    │       └── routes/
    │           └── taskRoutes.ts
    ├── frontend/
    │   ├── auto-imports.d.ts
    │   ├── components.d.ts
    │   ├── env.d.ts
    │   ├── index.html
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── tsconfig.json
    │   ├── vite.config.ts
    │   ├── .env
    │   ├── .env.example
    │   ├── .eslintrc-auto-import.json
    │   ├── .eslintrc.cjs
    │   ├── .gitignore
    │   ├── public/
    │   └── src/
    │       ├── App.vue
    │       ├── main.ts
    │       ├── assets/
    │       │   ├── base.css
    │       │   └── main.css
    │       ├── components/
    │       │   ├── AddTask.vue
    │       │   ├── Footer.vue
    │       │   ├── Header.vue
    │       │   ├── Item.vue
    │       │   ├── List.vue
    │       │   └── ModalTask.vue
    │       ├── config/
    │       │   ├── axios.ts
    │       │   └── i18n.ts
    │       ├── locales/
    │       │   ├── en.json
    │       │   └── pt.json
    │       ├── services/
    │       │   ├── notificationService.ts
    │       │   └── taskService.ts
    │       └── stores/
    │           └── todos.ts
    └── .github/
        └── workflows/
            └── deploy.yml

```

## Instruções de Build

### Configuração do Projeto

Para configurar o projeto, siga as instruções abaixo:

1. Renomear os arquivos `.env.example` para `.env` e preencher as variáveis de ambiente conforme necessário. Tanto no backend quanto no frontend.
2. Instalar as dependências do projeto:

```bash
cd frontend
npm install
```
```bash
cd backend
npm install
```

### Build

Para subir o projeto é necessário rodar o comando abaixo:

```bash
cd frontend
npm run dev
```
```bash
cd backend
npm run dev
```

```bash
cd docker-compose up
```

## Migração

Para rodar as migrações é necessário rodar o comando abaixo:

```bash
cd backend
npm run migrate
```
Certifique-se de que o banco de dados esteja rodando e as variáveis de ambiente estejam corretas.
## Deploy

O deploy foi feito utilizando o Github Pages, para isso foi criado um workflow que faz o build do projeto e o deploy no github pages.

Url do projeto: [https://alexandremsouza1.github.io/challange_mplan/](https://alexandremsouza1.github.io/challange_mplan/)

## Melhorias

- Adicionar testes unitários e de integração
- Corrigir todas as tipagens do projeto (`npm run build` e `npm run lint`)

## Licença

Este projeto está licenciado sob a Licença MIT.
