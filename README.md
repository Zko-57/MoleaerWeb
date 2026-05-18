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
3. Opcional: variable **`NEXT_PUBLIC_SITE_URL`** = `https://tudominio.com` para metadata absoluta en producción. En Preview, Vercel usa `VERCEL_URL` automáticamente (vía `lib/site.ts`).

## Legacy

La carpeta `_legacy` es el sitio estático anterior; está excluida del `tsconfig` y no entra en el deploy de Next.

