# Solverive – Landing

Landing moderna para vender el producto Solverive: gestión de clases y reservas por WhatsApp para estudios y profesores.

## Stack

- Next.js 15 (App Router)
- React 18
- Tailwind CSS
- Tipografías: Outfit, Syne (Google Fonts)

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3001](http://localhost:3001).

## Build

```bash
npm run build
npm run start
```

## Estructura

- `app/page.tsx` – Página única con: Hero, Funcionalidades, Cómo funciona, Contacto/CTA, Footer
- `app/layout.tsx` – Layout con fuentes y metadata
- `app/globals.css` – Estilos globales y utilidades de animación

El proyecto está en paralelo a `clases-bot` (mismo nivel de directorio). Para desplegar la landing en Cloudflare Pages o Vercel, conectá este repositorio o carpeta al proyecto correspondiente.
