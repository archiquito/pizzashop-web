# Pizza Shop Web

#### Frontend application for the Pizza Shop project, built with React + TypeScript + Vite. I created one adaptation to use Docker to run the API, making it easier to run the API without manual configurations.

## 🧪 Testes Automatizados

Este projeto conta com cobertura de **testes unitários**, **testes de integração** e **testes E2E** completos, além de mocks de API para facilitar o desenvolvimento e a validação de fluxos.

- **Testes Unitários e de Integração:**  
  Utilizamos [Vitest](https://vitest.dev/) e [@testing-library/react](https://testing-library.com/) para testar componentes, hooks e lógicas de negócio.
  - Exemplo de teste de componente paginado: [`src/components/pagination.spec.tsx`](src/components/pagination.spec.tsx)

- **Testes E2E:**  
  Os testes end-to-end são realizados com [Playwright](https://playwright.dev/), garantindo que toda a aplicação funciona como esperado do ponto de vista do usuário final.

- **Mock de API com MSW:**  
  Utilizamos o [MSW (Mock Service Worker)](https://mswjs.io/) para simular respostas da API durante o desenvolvimento e os testes. Isso permite testar casos como autenticação e fluxos protegidos sem a necessidade de um backend real.
    - O mock de autenticação pode ser encontrado em [`src/api/mocks/sign-in-mock.ts`](src/api/mocks/sign-in-mock.ts)
    - A inicialização do MSW ocorre em [`src/api/mocks/index.ts`](src/api/mocks/index.ts) e é ativada em modo de teste.
    - O serviço worker é registrado automaticamente em [`src/main.tsx`](src/main.tsx).

### Como rodar os testes

- Testes unitários/integrados:
  ```bash
  npm run test
  ```
- Testes E2E com Playwright:
  ```bash
  npm run test:e2e
  ```

---

## Docker Setup

Este projeto depende da Pizza Shop API. Você pode obtê-la em [pizzashop-api](https://github.com/rocketseat-education/pizzashop-api).

### Arquivos Docker necessários

- `files-docker-api/docker-compose.yml`: Configuração dos serviços PostgreSQL e API
- `files-docker-api/Dockerfile`: Setup do container da API
- `files-docker-api/.dockerignore`: Arquivos a serem ignorados no build

### Passos de setup

1. Clone o repositório da API:
   ```bash
   git clone https://github.com/rocketseat-education/pizzashop-api
   ```

2. Copie os arquivos Docker para a raiz do projeto da API:
   ```bash
   cp files-docker-api/* pizzashop-api/
   ```

3. Inicialize os containers:
   ```bash
   cd pizzashop-api
   docker-compose up -d
   ```

---

## Desenvolvimento

Este template fornece uma configuração mínima para rodar React com Vite, HMR e algumas regras de ESLint.

Atualmente, dois plugins oficiais estão disponíveis:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) (Babel + Fast Refresh)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) (SWC + Fast Refresh)

## Configuração do ESLint

Confira os exemplos de configuração no README original, ou veja [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) e [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) para regras adicionais.

---

> ⚠️ Os resultados exibidos sobre mocks e testes são limitados à busca de código do GitHub. Veja mais detalhes e arquivos relacionados em [code search](https://github.com/archiquito/pizzashop-web/search?q=mock) e [code search](https://github.com/archiquito/pizzashop-web/search?q=e2e).