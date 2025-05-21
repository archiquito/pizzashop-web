# Pizza Shop Web

#### Frontend application for the Pizza Shop project, built with React + TypeScript + Vite. I created one adaptation to use docker to run api, this way is better to run api without configurtions in yout machine, just install docker, or docker desktop if you use windows, and follow instructions bellow.

## Docker Setup

This project requires the Pizza Shop API to run. You can get the API from [pizzashop-api](https://github.com/rocketseat-education/pizzashop-api).

### Required Docker Files

The following Docker files are required to run the API:

- `files-docker-api/docker-compose.yml`: Contains the PostgreSQL and API service configurations
- `files-docker-api/Dockerfile`: Defines the API container setup
- `files-docker-api/.dockerignore`: Specifies which files to exclude from the Docker build

### Setup Steps

1. Clone the API repository:

```bash
git clone https://github.com/rocketseat-education/pizzashop-api
```

2. Copy the Docker files from `files-docker-api` to the API project root:

```bash
cp files-docker-api/* pizzashop-api/
```

3. Start the Docker containers:

```bash
cd pizzashop-api
docker-compose up -d
```

## Development

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
