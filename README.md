# Mobile Store Frontend

This repo holds all the frontend code for a test-app that allows users to buy mobile devices.
It consists on a 2-view (PLP:Product List Page; PDP: Product Details Page) SPA based on React vite's boilertemplate and React-Router for the CSR.

## Configuration

### Requirements

- Node.js
- pnpm

### Installation

```bash
pnpm install
```

This single command installs everything needed to run, build, lint and test the project (Vitest, React Testing Library, jsdom included).

### Environment variables

The app needs the base URL of the product API. Copy the following example (and fill it with the real host) in an .env file in this project:

```
VITE_API_BASE_URL=https://your-api-host-here
```


### Development

```bash
pnpm start
```

### Available scripts

```bash
pnpm start
pnpm build
pnpm test
pnpm lint
```

#### Testing

Tests are written with [Vitest](https://vitest.dev) and [React Testing Library](https://testing-library.com/react). Each test lives next to their respective code (`*.test.js` / `*.test.jsx`).

```bash
pnpm test         # runs the full suite once
pnpm test:watch   # re-runs on file changes (useful for developing)
```


### Technology

* React
* Vite
* React Router
* Vitest
* ESLint

## Other Info

### Template: React + Vite

The original template used at the very beginning of this project provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

#### React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

#### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

#### Required adaptations

* Vite's boilertemplate doesn't add a *START* script by default, but a *DEV* script. The script was renamed in the *package.json* file.