# MoleaerWeb

Landing Next.js (App Router) para Moleaer.

## Desarrollo

```bash
npm install
npm run dev
```

- `npm run dev` — Webpack (recomendado; Turbopack opcional con `npm run dev:turbo`).
- `npm run lint` — ESLint (`eslint.config.mjs`).
- `npm run build` — Build de producción (incluye comprobación de tipos).

## Vercel

1. Importar el repo y dejar **Framework Preset: Next.js**.
2. **Build Command:** `npm run build` · **Install Command:** `npm install`.
3. **`vercel.json`** usa la región **`fra1`** (Frankfurt): menos latencia desde España en el optimizador de imágenes y funciones que un proyecto por defecto en EE. UU.
4. Opcional: variable **`NEXT_PUBLIC_SITE_URL`** = `https://tudominio.com` para metadata absoluta en producción. En Preview, Vercel usa `VERCEL_URL` automáticamente (vía `lib/site.ts`).

### Comparar fluidez como en producción

`npm run dev` no es idéntico a lo que sirve Vercel. Para probar el bundle real:

```bash
npm run build && npm run start
```

Abre `http://localhost:3000` en incógnito sin extensiones; debería acercarse más a **moleaer-web.vercel.app** que el modo desarrollo.

## Legacy

La carpeta `_legacy` es el sitio estático anterior; está excluida del `tsconfig` y no entra en el deploy de Next.

