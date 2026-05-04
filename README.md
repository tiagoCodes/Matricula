# Sistema de Matrículas

Projeto completo de **Sistema de Matrículas**, composto por:
- **Frontend** desenvolvido com Vue 3 + Vite
- **Backend (API)** desenvolvido com Node.js, Express e TypeScript

---

## Visão geral

Este projeto é dividido em duas partes:

- **Frontend**: interface do usuário
- **Backend (API)**: responsável pelos dados e regras de negócio

O frontend se comunica com o backend através de requisições HTTP (Axios).

---

## Estrutura do projeto

```text
sistema-matriculas/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── router/
│   │   ├── App.vue
│   │   └── main.js
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── index.ts
│   ├── dist/
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
└── README.md
````

***

## Tecnologias utilizadas

### Frontend

*   Vue 3
*   Vite
*   Axios
*   JavaScript

### Backend (API)

*   Node.js
*   Express
*   TypeScript
*   CORS

***

## Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

*   Node.js (versão 18 ou superior)
*   npm

Verifique com:

```bash
node -v
npm -v
```

***

## Como rodar o Backend (API)

### 1. Entrar na pasta do backend

```bash
cd backend
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Rodar em modo desenvolvimento

```bash
npm run dev
```

A API ficará disponível em:

    https://matricula-ixtqixhqf-tiagocodes-projects.vercel.app
    

***

## Como rodar o Frontend

### 1. Entrar na pasta do frontend

```bash
cd frontend
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Rodar em modo desenvolvimento

```bash
npm run dev
```

O frontend ficará disponível em:

    https://matricula-ixtqixhqf-tiagocodes-projects.vercel.app
    
***

## Comunicação Frontend ↔ Backend

O frontend se comunica com a API através do Axios.

Arquivo de configuração:

```text
frontend/src/services/api.js
```

Exemplo:

```js
import axios from 'axios'

export const api = axios.create({
  baseURL: https://matricula-ixtqixhqf-tiagocodes-projects.vercel.app
  
})
```

Exemplo de uso:

```js
api.get('/matriculas')
```

***

## Observações importantes

*   O backend deve estar rodando antes do frontend
*   As rotas da API ficam organizadas em `backend/src/routes`
*   O código TypeScript do backend é compilado para a pasta `dist`
*   O frontend consome apenas a API, não acessa o banco diretamente

***




